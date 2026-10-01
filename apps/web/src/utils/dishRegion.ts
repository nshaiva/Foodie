import type { Beverage, Dish, FlavorAxisId, IngredientTiers, RegionalCuisine } from '../data/types';
import { regionCoordinates } from '../data/regionMapConfig';

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

type Placed = Pick<Dish, 'regionalOrigin' | 'origin'> | Pick<Beverage, 'regionalOrigin' | 'origin'>;

/** Origins meaning "the whole country", not a region. */
const NATIONWIDE = new Set(['nationwide', 'countrywide', 'throughout', 'all over', 'everywhere']);

/**
 * Origins that name a real place no region's tokens cover.
 * Keyed by country id, then by the lowercased origin fragment.
 *
 * This is the residue after token matching, not the primary mechanism. It is
 * code, not content, so it may cover any country; entries outside the sandbox
 * trio (MX/CN/IE) were added 2026-09-29 only where the geography is
 * unambiguous (a city or state inside exactly one region). Anything ambiguous
 * stays an orphan, which Explore files under "Across {country}".
 *
 * `NATIONWIDE_ALIAS` resolves an origin to the whole country: for a real place
 * that no region covers, where any region would be the wrong answer.
 */
export const NATIONWIDE_ALIAS = '*';
const REGION_ALIASES: Record<string, Record<string, string>> = {
  CN: {
    hangzhou: 'Jiangnan (Shanghai & Huaiyang)',   // Zhejiang, covered by Jiangnan
    shaoxing: 'Jiangnan (Shanghai & Huaiyang)',
  },
  MX: {
    puebla: 'Central Mexico',
    guadalajara: 'Western Mexico (Jalisco)',
    ensenada: 'Pacific Coast (Sinaloa & Baja)',
    'baja california': 'Pacific Coast (Sinaloa & Baja)',
    mazatlan: 'Pacific Coast (Sinaloa & Baja)',
    mazatlán: 'Pacific Coast (Sinaloa & Baja)',
    veracruz: NATIONWIDE_ALIAS,                    // Gulf coast, no region of its own (wave 1 decision)
  },
  IE: {
    galway: 'Connacht & the Wild Atlantic Way',
    'atlantic coast': 'Connacht & the Wild Atlantic Way',
    shannon: 'Munster (Cork & Kerry)',             // Foynes / Shannon, Co. Limerick
    foynes: 'Munster (Cork & Kerry)',
    cavan: 'Ulster & the North',
  },
  US: {
    'central texas': 'The Southwest',
    texas: 'The Southwest',
    louisiana: 'The South',
    kentucky: 'The South',
    'buffalo, new york': NATIONWIDE_ALIAS,        // no Northeast/Mid-Atlantic region
  },
  IT: {
    rome: 'Central Italy',
    naples: 'Southern Italy & Sicily',
    'amalfi coast': 'Southern Italy & Sicily',
    milan: 'Northern Italy',
    bologna: 'Northern Italy',
    veneto: 'Northern Italy',
  },
  AZ: { sheki: 'Sheki-Zagatala' },
  IN: {
    kashmir: 'North India (Punjab & Delhi)',
    lucknow: 'North India (Punjab & Delhi)',
    amritsar: 'North India (Punjab & Delhi)',
    'uttar pradesh': 'North India (Punjab & Delhi)',
    jaipur: 'West India (Rajasthan & Gujarat)',
    jodhpur: 'West India (Rajasthan & Gujarat)',
    ahmedabad: 'West India (Rajasthan & Gujarat)',
    goa: 'Mumbai & Goa (Maharashtra & the Konkan)',      // three letters: too short for the token split
    pune: 'Mumbai & Goa (Maharashtra & the Konkan)',
    konkan: 'Mumbai & Goa (Maharashtra & the Konkan)',
    kolkata: 'East India (Bengal & Bihar)',
    calcutta: 'East India (Bengal & Bihar)',
    deccan: 'Hyderabad & the Deccan',
    telangana: 'Hyderabad & the Deccan',
    andhra: 'Hyderabad & the Deccan',
    'andhra pradesh': 'Hyderabad & the Deccan',
    chennai: 'South India (Tamil Nadu, Kerala & Karnataka)',
    chettinad: 'South India (Tamil Nadu, Kerala & Karnataka)',
    kochi: 'South India (Tamil Nadu, Kerala & Karnataka)',
    bangalore: 'South India (Tamil Nadu, Kerala & Karnataka)',
    bengaluru: 'South India (Tamil Nadu, Kerala & Karnataka)',
    udupi: 'South India (Tamil Nadu, Kerala & Karnataka)',
  },
  PK: { peshawar: 'Khyber Pakhtunkhwa (Pashtun)', lahore: 'Punjab' },
  ID: { jakarta: 'Java', 'west java': 'Java', yogyakarta: 'Java', 'central java': 'Java' },
  MY: { selangor: 'Kuala Lumpur & Central' },
  FR: { bordeaux: 'Southwest (Gascony & Périgord)' },
  GR: { thessaloniki: 'Macedonia & Thrace' },
  NG: {
    'northern nigeria': 'North (Hausa-Fulani)',
    'northern nigeria (fulani)': 'North (Hausa-Fulani)',
    lagos: 'Southwest (Yoruba)',
  },
  BR: { 'rio grande do sul': 'The South (Gaúcho Country)' },
  PT: { porto: 'Minho & Douro', 'douro valley': 'Minho & Douro' },
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
    // "the East" on its own is too generic to match anything usefully, but a
    // longer name keeps its meaning without the article: "the Nile Delta"
    // also answers to "nile delta", "The West Coast" to "west coast"
    if (p && p.length > 3 && !p.startsWith('the ')) out.add(p);
    else if (p.startsWith('the ') && p.slice(4).includes(' ')) out.add(p.slice(4));
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
  // No written origin but a city: the region whose centre is nearest, so the
  // list files a dish where the map draws it
  if (!origin && item.origin?.coordinates && countryId) {
    const [lon, lat] = item.origin.coordinates;
    const centres = regionCoordinates[countryId];
    let best: RegionalCuisine | undefined, bestD = Infinity;
    for (const r of regions ?? []) {
      const c = centres?.[r.name]; if (!c) continue;
      const d = (c[0] - lon) ** 2 * Math.cos((lat * Math.PI) / 180) ** 2 + (c[1] - lat) ** 2;
      if (d < bestD) { bestD = d; best = r; }
    }
    if (best) return { kind: 'region', region: best };
  }
  if (!origin) return { kind: 'none' };

  const fragments = originFragments(origin);
  if (fragments.some(f => NATIONWIDE.has(f))) return { kind: 'nationwide' };

  if (!regions || regions.length === 0) return { kind: 'orphan', origin };

  const aliasTable = countryId ? REGION_ALIASES[countryId] : undefined;

  for (const fragment of fragments) {
    const byToken = regions.find(r => regionAliases(r).includes(fragment));
    if (byToken) return { kind: 'region', region: byToken };

    const aliased = aliasTable?.[fragment];
    if (aliased === NATIONWIDE_ALIAS) return { kind: 'nationwide' };
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

/**
 * Slugs of regions that were renamed or merged, so old links keep landing.
 * Keyed by country id, then old slug -> current slug.
 */
const RETIRED_REGION_SLUGS: Record<string, Record<string, string>> = {
  MX: { 'coastal-regions': 'pacific-coast' },   // wave 1 of #9, 2026-10-01
  CN: { xinjiang: 'northwest' },                 // renamed to cover Gansu, same day
};

export function regionFromSlug(
  slug: string,
  regions: RegionalCuisine[] | undefined,
  countryId?: string
): RegionalCuisine | undefined {
  const retired = countryId ? RETIRED_REGION_SLUGS[countryId]?.[slug] : undefined;
  if (retired) slug = retired;
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
