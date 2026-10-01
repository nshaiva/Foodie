import type { Beverage, Dish, RegionalCuisine, UserDish, Country } from '../data/types';
import { resolveRegion } from './dishRegion';

/**
 * How the list is arranged. Deliberately excludes "tried" — that's a *filter*
 * (the All / Tried / Want control), and having it in both places meant the word
 * appeared twice on screen meaning two different things.
 */
export type Lens = 'region' | 'category' | 'none';

/** One renderable thing in the list: a popular dish, a drink, or a custom log. */
export type Entry =
  | { kind: 'dish'; key: string; dish: Dish; tried?: UserDish }
  | { kind: 'drink'; key: string; drink: Beverage; tried?: UserDish }
  | { kind: 'custom'; key: string; userDish: UserDish };

export interface Group {
  /** Stable id — a region slug, a category, or a bucket name. */
  id: string;
  label: string;
  entries: Entry[];
  /** Present only under the region lens, and only for real regions. */
  region?: RegionalCuisine;
  /** True for buckets that aren't a region: nationwide, elsewhere, uncategorised. */
  isBucket?: boolean;
}

/**
 * "Across {country}" as a region of its own (Nikita, 2026-10-01): the
 * nationwide dishes open like any region, in the sheet and on the map, with
 * the sea cluster as their place. It is never stored; it is made from the
 * country on the way in.
 */
export const ACROSS_GROUP_ID = '__everywhere';
export function acrossRegion(country: Pick<Country, 'name'>): RegionalCuisine {
  const name = countryInSentence(country.name);
  return {
    name: `Across ${name}`,
    description: `Dishes eaten all over ${name} rather than in one region: the ones every table knows.`,
    signatureDishes: [],
    keyIngredients: [],
  };
}
export const isAcrossRegion = (region: RegionalCuisine) => region.name.startsWith('Across ');

/** Country names that read with "the" in a sentence ("Across the United States"). */
const TAKES_THE = new Set(['United States', 'United Kingdom', 'Philippines', 'Netherlands', 'United Arab Emirates', 'Czech Republic', 'Dominican Republic']);
export function countryInSentence(name: string): string {
  return TAKES_THE.has(name) ? `the ${name}` : name;
}

export function entryName(entry: Entry): string {
  if (entry.kind === 'dish') return entry.dish.name;
  if (entry.kind === 'drink') return entry.drink.name;
  return entry.userDish.name;
}

const CATEGORY_LABELS: Record<string, string> = {
  main: 'Mains',
  appetizer: 'Appetizers',
  'street-food': 'Street food',
  soup: 'Soups',
  dessert: 'Desserts',
  side: 'Sides',
  breakfast: 'Breakfast',
};

function categoryOf(entry: Entry): { id: string; label: string } {
  if (entry.kind === 'drink') return { id: 'drink', label: 'Drinks' };
  if (entry.kind === 'custom') {
    return entry.userDish.kind === 'drink'
      ? { id: 'drink', label: 'Drinks' }
      : { id: 'yours', label: 'Your own additions' };
  }
  const c = entry.dish.category;
  return { id: c, label: CATEGORY_LABELS[c] ?? c.charAt(0).toUpperCase() + c.slice(1) };
}

/**
 * Reduce the already-filtered entries into display groups.
 *
 * Grouping is deliberately orthogonal to filtering: this runs over whatever
 * survived the filters, so switching lens never changes which dishes are shown,
 * only how they're arranged.
 *
 * Under the region lens, everything that isn't in a region still gets a home.
 * Items marked "Nationwide" and items with no origin recorded share one bucket —
 * the distinction matters to the resolver but not to someone reading the page —
 * while an origin we failed to match lands in "Elsewhere" so the gap is visible.
 */
export function groupEntries(
  entries: Entry[],
  lens: Lens,
  ctx: {
    regions?: RegionalCuisine[];
    countryId: string;
    countryName: string;
    /** File unmatched origins under "Across {country}" instead of an
     *  "Elsewhere" header (Explore). The miss is still logged in dev. */
    orphansAcross?: boolean;
  }
): Group[] {
  if (lens === 'none') {
    return [{ id: 'all', label: '', entries }];
  }

  if (lens === 'category') {
    const order: string[] = [];
    const byId = new Map<string, Group>();
    entries.forEach(entry => {
      const { id, label } = categoryOf(entry);
      if (!byId.has(id)) {
        byId.set(id, { id, label, entries: [], isBucket: true });
        order.push(id);
      }
      byId.get(id)!.entries.push(entry);
    });
    return order.map(id => byId.get(id)!);
  }

  // ---- region ----
  const regions = ctx.regions ?? [];
  const groups: Group[] = regions.map(region => ({
    id: region.name,
    label: region.name,
    region,
    entries: [],
  }));
  const byName = new Map(groups.map(g => [g.id, g]));

  const everywhere: Entry[] = [];
  const elsewhere: Entry[] = [];

  entries.forEach(entry => {
    if (entry.kind === 'custom') {
      everywhere.push(entry);
      return;
    }
    const source = entry.kind === 'dish' ? entry.dish : entry.drink;
    const match = resolveRegion(source, regions, ctx.countryId);
    if (match.kind === 'region') byName.get(match.region.name)?.entries.push(entry);
    else if (match.kind === 'orphan' && !ctx.orphansAcross) elsewhere.push(entry);
    else if (match.kind === 'orphan') {
      if (import.meta.env.DEV) console.warn(`[groupEntries] ${ctx.countryId}: no region matches origin "${match.origin}" (${entryName(entry)}); filed under Across ${countryInSentence(ctx.countryName)}`);
      everywhere.push(entry);
    }
    else everywhere.push(entry);
  });

  if (everywhere.length) {
    groups.push({
      id: ACROSS_GROUP_ID,
      label: `Across ${countryInSentence(ctx.countryName)}`,
      entries: everywhere,
      isBucket: true,
    });
  }
  if (elsewhere.length) {
    groups.push({ id: '__elsewhere', label: 'Elsewhere', entries: elsewhere, isBucket: true });
  }
  return groups;
}

/** Dish counts per region name, for the map bubbles. */
export function regionCounts(
  entries: Entry[],
  regions: RegionalCuisine[] | undefined,
  countryId: string
): Record<string, number> {
  const counts: Record<string, number> = {};
  (regions ?? []).forEach(r => (counts[r.name] = 0));
  entries.forEach(entry => {
    if (entry.kind === 'custom') return;
    const source = entry.kind === 'dish' ? entry.dish : entry.drink;
    const match = resolveRegion(source, regions, countryId);
    if (match.kind === 'region') counts[match.region.name] = (counts[match.region.name] ?? 0) + 1;
  });
  return counts;
}
