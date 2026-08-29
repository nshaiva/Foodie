// Menu-item lookup (roadmap #3): "what is this thing on the menu?"
//
// Runs as a Supabase Edge Function so the Anthropic key never reaches the
// browser. Three guards, cheapest first: a cache keyed by (country, dish name),
// a per-caller daily cap (Supabase user id when signed in, IP otherwise), and
// a global monthly cap that refuses everything once the month's budget is spent.
// The Anthropic console's own monthly spend limit is the backstop behind all of
// this — set it (docs/supabase-setup.md) before deploying.
//
// Deploy:  supabase functions deploy menu-lookup
// Secrets: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...

import Anthropic from 'npm:@anthropic-ai/sdk@0.122.0';
import { createClient } from 'npm:@supabase/supabase-js@2.112.4';

const MODEL = 'claude-haiku-4-5';
const DAILY_CAP_ANON = 3;
const DAILY_CAP_USER = 20;
const MONTHLY_CAP_GLOBAL = 2000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Plain JSON schema for structured output (no zod: Deno's npm resolution gave
// the SDK's zod helper a different zod instance than ours and it crashed).
const SPICE = ['none', 'mild', 'medium', 'hot', 'very-hot'] as const;
const CATEGORY = ['appetizer', 'soup', 'salad', 'main', 'side', 'street-food', 'dessert', 'beverage', 'breakfast', 'condiment'] as const;
const DISH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'englishName', 'description', 'keyIngredients', 'spiceLevel', 'category', 'dietary', 'confidence'],
  properties: {
    name: { type: 'string', description: 'The dish name as a diner would say it, corrected for spelling' },
    englishName: { type: ['string', 'null'], description: 'Plain-English name if the name is not English' },
    description: { type: 'string', description: 'One or two sentences, at most 150 characters: what it is and how it tastes' },
    keyIngredients: { type: 'array', items: { type: 'string' }, description: 'At most six ingredients that define it' },
    spiceLevel: { type: 'string', enum: [...SPICE] },
    category: { type: 'string', enum: [...CATEGORY] },
    dietary: {
      type: 'object',
      additionalProperties: false,
      required: ['isVegetarian', 'isVegan', 'isGlutenFree'],
      properties: { isVegetarian: { type: 'boolean' }, isVegan: { type: 'boolean' }, isGlutenFree: { type: 'boolean' } },
    },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'], description: 'low if this may not be a real dish or is ambiguous' },
  },
} as const;

export interface DishLookupResult {
  name: string;
  englishName: string | null;
  description: string;
  keyIngredients: string[];
  spiceLevel: (typeof SPICE)[number];
  category: (typeof CATEGORY)[number];
  dietary: { isVegetarian: boolean; isVegan: boolean; isGlutenFree: boolean };
  confidence: 'high' | 'medium' | 'low';
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function normalize(name: string) {
  return name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const { query, countryId, countryName } = await req.json().catch(() => ({}));
  if (typeof query !== 'string' || query.trim().length < 2 || query.length > 80) {
    return json({ error: 'bad_query' }, 400);
  }
  if (typeof countryId !== 'string' || typeof countryName !== 'string') {
    return json({ error: 'bad_country' }, 400);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // Who is asking. The browser sends the session JWT when signed in, else the
  // anon key; getUser() validates the JWT server-side.
  const authHeader = req.headers.get('Authorization') ?? '';
  const asCaller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: { user } } = await asCaller.auth.getUser();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const callerKey = user ? `user:${user.id}` : `ip:${ip}`;
  const dailyCap = user ? DAILY_CAP_USER : DAILY_CAP_ANON;

  const db = createClient(supabaseUrl, serviceKey);
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  const key = normalize(query);

  // 1. Cache: a dish someone already asked about costs nothing and is instant
  const { data: cached } = await db
    .from('dish_lookups')
    .select('result')
    .eq('country_id', countryId)
    .eq('query_key', key)
    .maybeSingle();

  // Remaining for the caller today (cache hits don't count against it)
  const { data: usage } = await db
    .from('lookup_usage')
    .select('n')
    .eq('caller', callerKey)
    .eq('day', today)
    .maybeSingle();
  const used = usage?.n ?? 0;

  if (cached) {
    return json({ result: cached.result, cached: true, remaining: Math.max(0, dailyCap - used), signedIn: !!user });
  }

  // 2. Per-caller daily cap
  if (used >= dailyCap) {
    return json({ error: 'daily_limit', remaining: 0, cap: dailyCap, signedIn: !!user }, 429);
  }

  // 3. Global monthly kill-switch
  const { data: budget } = await db
    .from('lookup_budget')
    .select('n')
    .eq('month', month)
    .maybeSingle();
  if ((budget?.n ?? 0) >= MONTHLY_CAP_GLOBAL) {
    return json({ error: 'monthly_limit' }, 503);
  }

  // Count before calling, so a crash mid-request still burns the attempt
  const { error: bumpErr } = await db.rpc('bump_lookup_counters', { p_caller: callerKey, p_day: today, p_month: month });
  if (bumpErr) console.error('bump_lookup_counters failed', bumpErr.message);

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) return json({ error: 'not_configured' }, 503);
  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system:
        `You identify dishes and drinks a diner might see on a ${countryName} menu, so they can decide whether to order. ` +
        'Be concrete about what it is and how it tastes; keep the description under 150 characters. ' +
        'If the name is not a real dish, or is too ambiguous to identify with reasonable confidence, set confidence to "low" and describe the most likely reading. ' +
        'Never invent a dish to please the request.',
      messages: [{ role: 'user', content: `Menu item: "${query.trim()}"` }],
      output_config: { format: { type: 'json_schema', schema: DISH_SCHEMA } },
    });

    const text = response.content.find(b => b.type === 'text')?.text;
    if (!text) return json({ error: 'no_result' }, 502);
    const result = JSON.parse(text) as DishLookupResult;

    const { error: cacheErr } = await db.from('dish_lookups').upsert({
      country_id: countryId,
      query_key: key,
      query: query.trim(),
      result,
    });
    if (cacheErr) console.error('dish_lookups upsert failed', cacheErr.message);

    return json({ result, cached: false, remaining: Math.max(0, dailyCap - used - 1), signedIn: !!user });
  } catch (err) {
    const e = err as { status?: number; message?: string; name?: string };
    console.error('menu-lookup failed', e?.name, e?.status, e?.message);
    if (err instanceof Anthropic.RateLimitError || e?.status === 429) return json({ error: 'upstream_busy' }, 503);
    if (err instanceof Anthropic.APIError || typeof e?.status === 'number') return json({ error: 'upstream_error', status: e.status }, 502);
    return json({ error: 'unknown', message: String(e?.message ?? err).slice(0, 300) }, 500);
  }
});
