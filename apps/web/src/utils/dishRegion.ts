import type { Beverage, Dish, FlavorAxisId, IngredientTiers, RegionalCuisine } from '../data/types';

/**
 * Resolving a dish to one of its country's regions.
 *
 * The data doesn't make this easy. A dish's `regionalOrigin` is free text naming
 * a city or area ("Beijing", "Foynes / Shannon"), while regions are named for the
 * culinary tradition ("Northern China (Beijing & Shandong)", "Dublin & the East").
 * Comparing the two directly — which is what the old `detectRegion` helpers did —
 * places 8 of China's 15 items, 1 of Mexico's 13, and none of Ireland's 15.
 *
 * Reading a region's name as a list of aliases fixes most of it. Both the main
 * name and any parenthetical are split on separators, so "Dublin & the East" also
 * answers to "dublin", and "Northern China (Beijing & Shandong)" to "beijing".
 * A small per-country alias map covers the residue.
 *
 * Two outcomes are deliberately not failures: an item marked "Nationwide" belongs
 * to the whole country rather than any region, and an item with no origin at all
 * simply can't be placed. Both are distinct from an origin we failed to match,
 * which surfaces as an orphan rather than vanishing.
 */

type Placed = Pick<Dish, 'regionalOrigin'> | Pick<Beverage, 'regionalOrigin'>;

/** Origins meaning "the whole country", not a region. */
const NATIONWIDE = new Set(['nationwide', 'countrywide', 'throughout', 'all over', 'everywhere']);

/**
 * Origins that name a real place no region's tokens cover.
 * Keyed by country id, then by the lowercased origin fragment.
 *
 * This is the residue after token matching, not the primary mechanism. Per the
 * sandbox rule it covers MX/CN/IE only; elsewhere unmatched origins fall through
 * to `orphan`, which still renders.
 */
const REGION_ALIASES: Record<string, Record<string, string>> = {
  CN: {
    hangzhou: 'Jiangnan (Shanghai & Huaiyang)',   // Zhejiang, covered by Jiangnan
    shaoxing: 'Jiangnan (Shanghai & Huaiyang)',
  },
  MX: {
    puebla: 'Central Mexico',
    jalisco: 'Central Mexico',                     // west-central; nearest tradition
  },
  IE: {
    galway: 'Connacht & the Wild Atlantic Way',
    'atlantic coast': 'Connacht & the Wild Atlantic Way',
    shannon: 'Munster (Cork & Kerry)',             // Foynes / Shannon, Co. Limerick
    foynes: 'Munster (Cork & Kerry)',
    cavan: 'Ulster & the North',
  },
};

/** Drop a trailing parenthetical: "Sichuan (Chengdu)" -> "Sichuan". */
export function stripQualifier(value: string): string {
  return value.includes('(') ? value.split('(')[0].trim() : value.trim();
}

const SEPARATORS = /&|,|\/| and /i;

/**
 * The names a region answers to: its full name, its name without the
 * parenthetical, and each separator-delimited term from both.
 */
export function regionAliases(region: RegionalCuisine): string[] {
  const out = new Set<string>([region.name.toLowerCase()]);

  const main = stripQualifier(region.name);
  out.add(main.toLowerCase());
  main.split(SEPARATORS).forEach(part => {
    const p = part.trim().toLowerCase();
    // "the East" on its own is too generic to match anything usefully.
    if (p && p.length > 3 && !p.startsWith('the ')) out.add(p);
  });

  const inner = region.name.match(/\(([^)]+)\)/);
  if (inner) {
    inner[1].split(SEPARATORS).forEach(part => {
      const p = part.trim().toLowerCase();
      if (p) out.add(p);
    });
  }

  return [...out];
}

/** The candidate place names in a free-text origin: the whole thing, then parts. */
function originFragments(origin: string): string[] {
  const base = stripQualifier(origin).toLowerCase();
  const parts = base.split(SEPARATORS).map(p => p.trim()).filter(Boolean);
  const inner = origin.match(/\(([^)]+)\)/);
  const extra = inner ? inner[1].split(SEPARATORS).map(p => p.trim().toLowerCase()) : [];
  return [...new Set([base, ...parts, ...extra])].filter(Boolean);
}

export type RegionMatch =
  | { kind: 'region'; region: RegionalCuisine }
  /** Explicitly belongs to the whole country. */
  | { kind: 'nationwide' }
  /** Names a place, but nothing matched it. Renders under "Elsewhere". */
  | { kind: 'orphan'; origin: string }
  /** No origin recorded at all. */
  | { kind: 'none' };

export function resolveRegion(
  item: Placed,
  regions: RegionalCuisine[] | undefined,
  countryId?: string
): RegionMatch {
  const origin = item.regionalOrigin?.trim();
  if (!origin) return { kind: 'none' };

  const fragments = originFragments(origin);
  if (fragments.some(f => NATIONWIDE.has(f))) return { kind: 'nationwide' };

  if (!regions || regions.length === 0) return { kind: 'orphan', origin };

  const aliasTable = countryId ? REGION_ALIASES[countryId] : undefined;

  for (const fragment of fragments) {
    const byToken = regions.find(r => regionAliases(r).includes(fragment));
    if (byToken) return { kind: 'region', region: byToken };

    const aliased = aliasTable?.[fragment];
    if (aliased) {
      const target = regions.find(r => r.name === aliased);
      if (target) return { kind: 'region', region: target };
    }
  }

  return { kind: 'orphan', origin };
}

/** Display string for a dish's origin — the region name where we have one. */
export function regionNameFor(
  item: Placed,
  regions: RegionalCuisine[] | undefined,
  countryId?: string
): string | undefined {
  const match = resolveRegion(item, regions, countryId);
  if (match.kind === 'region') return match.region.name;
  if (match.kind === 'orphan') return match.origin;
  if (match.kind === 'nationwide') return 'Nationwide';
  return undefined;
}

/** URL-safe id for a region, used for `?region=` deep links. */
export function regionSlug(name: string): string {
  return stripQualifier(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // Yucatán -> yucatan, not yucat-n
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function regionFromSlug(
  slug: string,
  regions: RegionalCuisine[] | undefined
): RegionalCuisine | undefined {
  // A region's parenthetical is a name people use too: "The South (Gaúcho
  // Country)" answers to ?region=gaucho-country as well as ?region=the-south.
  return regions?.find(r => {
    if (regionSlug(r.name) === slug) return true;
    const alias = r.name.match(/\(([^)]+)\)/)?.[1];
    return !!alias && regionSlug(alias) === slug;
  });
}

/* ------------------------------------------------------------------ */
/* Derived region flavor fingerprint                                    */
/* ------------------------------------------------------------------ */

export interface RegionFingerprint {
  axes: FlavorAxisId[];
  /** How many of the region's keyIngredients mapped to an ingredient we know. */
  matched: number;
  total: number;
}

/**
 * Regions carry no flavor data of their own, but their `keyIngredients` often
 * name ingredients that do. Coverage is uneven and worth surfacing rather than
 * hiding — on China, Sichuan maps 5 of 5 while Xinjiang manages none — so callers
 * get the match count and can decline to show chips for a thin result.
 */
export function regionFingerprint(
  region: RegionalCuisine,
  tiers: IngredientTiers | undefined
): RegionFingerprint {
  const total = region.keyIngredients.length;
  if (!tiers) return { axes: [], matched: 0, total };

  const known: { name: string; axes: FlavorAxisId[] }[] = [];
  (Object.keys(tiers) as (keyof IngredientTiers)[]).forEach(tier => {
    tiers[tier].forEach(ingredient => {
      if (ingredient.flavorAxes?.length) {
        known.push({
          name: ingredient.name.toLowerCase(),
          axes: ingredient.flavorAxes.map(a => a.axis),
        });
      }
    });
  });

  const weights = new Map<FlavorAxisId, number>();
  let matched = 0;

  region.keyIngredients.forEach(raw => {
    const key = stripQualifier(raw).toLowerCase();
    const hit = known.find(k => k.name === key || key.includes(k.name) || k.name.includes(key));
    if (!hit) return;
    matched++;
    hit.axes.forEach(axis => weights.set(axis, (weights.get(axis) ?? 0) + 1));
  });

  const axes = [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([axis]) => axis);
  return { axes, matched, total };
}

/** Below this, the fingerprint is too thin to be worth showing as chips. */
export const FINGERPRINT_MIN_MATCHES = 2;
