#!/usr/bin/env node
// Generate dish illustrations from the frozen prompt set in
// docs/design/prompts/dish-images.json via the OpenAI image API.
//
//   node scripts/generate-dish-images.mjs --country MX --dry-run
//   node scripts/generate-dish-images.mjs --country MX
//   node scripts/generate-dish-images.mjs --country MX --only tamales,elote --force
//
// Needs OPENAI_API_KEY in the environment or in a gitignored .env at the repo
// root. Never put it in apps/web/.env under a VITE_ name: that ships it to the
// browser. One country per run, missing images only, capped at MAX_PER_RUN, so
// a typo can't turn into a bulk run.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS = join(ROOT, 'docs/design/prompts/dish-images.json');
const OUT_ROOT = join(ROOT, 'docs/design/prototypes/image-pilot/finals');
const MAX_PER_RUN = 15;

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const country = opt('country');
const only = opt('only')?.split(',').map((s) => s.trim());
const model = opt('model', 'gpt-image-2.5-sunburst');
const quality = opt('quality', 'medium');
const size = opt('size', '1152x768');
const skipPilot = flag('skip-pilot');
const force = flag('force');
const dryRun = flag('dry-run');
// --ref <png>: an approved image the model matches for style (not content).
// Defaults to the approved C2 set; --no-ref turns it off.
const ref = flag('no-ref') ? undefined : opt('ref', join(ROOT, 'docs/design/prototypes/image-pilot/GF-c2-set-768.png'));
// --suffix <s>: save as <slug>-<s>.png, so a retry doesn't overwrite.
const suffix = opt('suffix');
const fileFor = (d) => `${d.slug}${suffix ? `-${suffix}` : ''}.png`;
const REF_PREFIX =
  'Use the attached image only as a style reference: match its ink line weight, flat gouache fills, colour palette, level of detail and plain cream background exactly. Do not copy its dishes or its 2x2 layout; draw one new dish.';

if (!country) {
  console.error('Pass --country, e.g. --country MX');
  process.exit(1);
}

const set = JSON.parse(readFileSync(PROMPTS, 'utf8'));
const items = set.countries[country];
if (!items) {
  console.error(`No prompts for ${country} in ${PROMPTS}`);
  process.exit(1);
}

const outDir = join(OUT_ROOT, country);
const todo = items
  .filter((d) => !only || only.includes(d.slug))
  .filter((d) => !(skipPilot && d.pilot))
  .filter((d) => force || !existsSync(join(outDir, fileFor(d))));

if (only) {
  const unknown = only.filter((s) => !items.some((d) => d.slug === s));
  if (unknown.length) {
    console.error(`Unknown slug(s): ${unknown.join(', ')}`);
    process.exit(1);
  }
}
if (todo.length === 0) {
  console.log('Nothing to generate: every image already exists (use --force to redo).');
  process.exit(0);
}
if (todo.length > MAX_PER_RUN) {
  console.error(`${todo.length} images exceeds the ${MAX_PER_RUN}-per-run cap. Narrow with --only.`);
  process.exit(1);
}
// More than one paid image needs an explicit --confirm, so a run of several
// is always a deliberate choice.
if (todo.length > 1 && !dryRun && !flag('confirm')) {
  console.error(`This would generate ${todo.length} images (${todo.map((d) => d.slug).join(', ')}).`);
  console.error('Rough cost at the defaults: ~2¢ each (measured). Re-run with --confirm to go ahead.');
  process.exit(1);
}

const promptFor = (d) => `${ref ? REF_PREFIX + ' ' : ''}${set.style} ${d.subject} ${set.framing}`;

console.log(`${todo.length} image(s) for ${country} → ${outDir}`);
console.log(`model ${model}, quality ${quality}, ${size}, prompt set ${set.version}\n`);

if (dryRun) {
  for (const d of todo) console.log(`# ${d.slug}\n${promptFor(d)}\n`);
  process.exit(0);
}

try {
  process.loadEnvFile(join(ROOT, '.env'));
} catch {
  // No root .env: rely on the shell environment.
}
const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('OPENAI_API_KEY is not set. Add it to .env at the repo root or export it.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const failed = [];
const usage = {};

for (const d of todo) {
  process.stdout.write(`${d.slug} … `);
  try {
    let res;
    if (ref) {
      const form = new FormData();
      form.append('model', model);
      form.append('prompt', promptFor(d));
      form.append('size', size);
      form.append('quality', quality);
      form.append('image', new Blob([readFileSync(ref)], { type: 'image/png' }), 'reference.png');
      res = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}` },
        body: form,
      });
    } else {
      res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt: promptFor(d), size, quality, n: 1 }),
      });
    }
    const body = await res.json();
    if (!res.ok) throw new Error(body.error?.message ?? `HTTP ${res.status}`);
    const b64 = body.data?.[0]?.b64_json;
    if (!b64) throw new Error('response had no image data');
    writeFileSync(join(outDir, fileFor(d)), Buffer.from(b64, 'base64'));
    const u = body.usage;
    usage[fileFor(d)] = u ?? null;
    console.log(u ? `saved (tokens: ${u.input_tokens ?? '?'} in, ${u.output_tokens ?? '?'} out)` : 'saved');
  } catch (err) {
    console.log(`failed: ${err.message}`);
    failed.push(d.slug);
  }
}

// Record exactly what produced these images next to them.
const logPath = join(outDir, 'prompts-used.json');
const log = existsSync(logPath) ? JSON.parse(readFileSync(logPath, 'utf8')) : {};
for (const d of todo.filter((d) => !failed.includes(d.slug))) {
  log[fileFor(d)] = { version: set.version, model, quality, size, ref: ref ?? null, usage: usage[fileFor(d)] ?? null, date: new Date().toISOString().slice(0, 10), prompt: promptFor(d) };
}
writeFileSync(logPath, JSON.stringify(log, null, 2) + '\n');

console.log(`\nDone: ${todo.length - failed.length} saved${failed.length ? `, ${failed.length} failed (${failed.join(', ')})` : ''}.`);
console.log('Review each against mustShow / wrong in the prompt file before using it.');
if (failed.length) process.exit(1);
