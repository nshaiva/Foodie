import type { Beverage } from '../data/types';
import type { RankedDish } from './orderRanking';

/**
 * How the what-to-order list is arranged at a table.
 *
 * Two different questions get two different treatments. **"Just tell me what to
 * get"** is answered by rank, so the top few sit alone at the top. **"What else
 * goes on the table"** is answered by course, because once the first decision is
 * made you're assembling an order, not picking a single dish — and rank is a
 * poor guide to whether something is a starter or a dessert.
 *
 * Courses are coarser than the raw `category` field: fifteen dishes split eight
 * ways gives sections of one, which is worse than no sections at all.
 */
export interface OrderSection {
  id: string;
  label: string;
  items: RankedDish[];
}

/** Presentation levels for #29 (First plate · Second helping · Off-menu). */
export type CuisineLevel = 'first-plate' | 'second-helping' | 'off-menu';

export interface OrderShape {
  /** How many dishes lead the list. */
  startHere: number;
  /** Cap on everything below, or null for no cap. */
  restLimit: number | null;
}

/**
 * The seam #29 plugs into.
 *
 * Familiarity levels change *how much* you're offered, not how it's arranged,
 * so they resolve to a shape here rather than touching the grouping below or
 * the ranking in `orderRanking.ts`. Until #29 ships, every caller gets the
 * `off-menu` shape — the full list — which is what the screen does today.
 */
export const ORDER_SHAPES: Record<CuisineLevel, OrderShape> = {
  'first-plate': { startHere: 3, restLimit: 2 },
  'second-helping': { startHere: 3, restLimit: 7 },
  'off-menu': { startHere: 3, restLimit: null },
};

export const DEFAULT_SHAPE = ORDER_SHAPES['off-menu'];

/** category → course. Anything unlisted falls into Mains. */
const COURSE_OF: Record<string, string> = {
  appetizer: 'start',
  'street-food': 'start',
  salad: 'start',
  soup: 'start',
  side: 'side',
  dessert: 'sweet',
};

const COURSE_ORDER = ['start', 'main', 'side', 'sweet'] as const;
const COURSE_LABELS: Record<string, string> = {
  start: 'To start',
  main: 'Mains',
  side: 'Sides',
  sweet: 'Sweet',
};

export interface GroupedOrder {
  startHere: RankedDish[];
  courses: OrderSection[];
  /** Dishes held back by the level cap, so the UI can offer to show them. */
  hidden: number;
}

export function groupForOrdering(
  ranked: RankedDish[],
  shape: OrderShape = DEFAULT_SHAPE
): GroupedOrder {
  const startHere = ranked.slice(0, shape.startHere);
  let rest = ranked.slice(shape.startHere);
  const hidden = shape.restLimit === null ? 0 : Math.max(0, rest.length - shape.restLimit);
  if (shape.restLimit !== null) rest = rest.slice(0, shape.restLimit);

  const byCourse = new Map<string, RankedDish[]>();
  rest.forEach(entry => {
    const course = COURSE_OF[entry.dish.category] ?? 'main';
    if (!byCourse.has(course)) byCourse.set(course, []);
    byCourse.get(course)!.push(entry);
  });

  const courses = COURSE_ORDER.filter(c => byCourse.has(c)).map(c => ({
    id: c,
    label: COURSE_LABELS[c],
    items: byCourse.get(c)!,
  }));

  return { startHere, courses, hidden };
}

/** Drinks aren't ranked — there are about five per country, so all of them show. */
export function drinksFor(beverages: Beverage[] | undefined): Beverage[] {
  return beverages ?? [];
}
