import type { RankedDish } from './orderRanking';

/**
 * How much of the what-to-order list to show.
 *
 * The arrangement itself isn't configurable: the list is one ranked sequence,
 * because at a table the question is "the menu has things on it, which should I
 * get", and rank is the only ordering that answers it. An earlier version
 * grouped by course, which fought that question and fragmented badly — there
 * are about nine dishes per country and only nine `side` dishes in the entire
 * dataset, so most countries got a section of one.
 *
 * What *is* configurable is length, which is the seam #29 (First plate ·
 * Second helping · Off-menu) plugs into: familiarity changes how much you're
 * offered, not how it's arranged.
 */
export type CuisineLevel = 'first-plate' | 'second-helping' | 'off-menu';

export interface OrderShape {
  /** How many dishes to show, or null for all of them. */
  limit: number | null;
}

export const ORDER_SHAPES: Record<CuisineLevel, OrderShape> = {
  'first-plate': { limit: 5 },
  'second-helping': { limit: 10 },
  'off-menu': { limit: null },
};

/** Until #29 ships, everyone sees the whole list. */
export const DEFAULT_SHAPE = ORDER_SHAPES['off-menu'];

export interface ShapedOrder {
  shown: RankedDish[];
  /** Held back by the level cap, so the page can offer to show them. */
  hidden: number;
}

export function shapeOrderList(
  ranked: RankedDish[],
  shape: OrderShape = DEFAULT_SHAPE
): ShapedOrder {
  if (shape.limit === null || ranked.length <= shape.limit) {
    return { shown: ranked, hidden: 0 };
  }
  return { shown: ranked.slice(0, shape.limit), hidden: ranked.length - shape.limit };
}

/**
 * Does this dish match what someone typed off a menu?
 *
 * Deliberately loose: menus abbreviate, translate and misspell, so name,
 * English name and the dish's traits all count as a hit.
 */
export function matchesMenuSearch(entry: RankedDish, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const { dish } = entry;
  return (
    dish.name.toLowerCase().includes(q) ||
    !!dish.englishName?.toLowerCase().includes(q) ||
    !!dish.keyTraits?.some(t => t.toLowerCase().includes(q)) ||
    dish.category.toLowerCase().includes(q)
  );
}
