import type { Dish, RegionalCuisine } from '../data/types';
import type { Entry } from './groupDishes';
import { resolveRegion } from './dishRegion';
import { regionLabelName } from './regionAreas';

/**
 * Food or drink: the one type filter in Explore (#39), and the split the
 * All-dishes list is built on. Deliberately just two; finer courses were
 * tried and dropped as overcomplicated. A dish filed under `beverage`
 * (Matcha, Buna, Pisco Sour) is a drink wherever it sits in the data.
 */
export type Course = 'food' | 'drinks';

export const COURSES: { id: Course; label: string }[] = [
  { id: 'food', label: 'Food' },
  { id: 'drinks', label: 'Drinks' },
];

export const dishCourse = (dish: Dish): Course => (dish.category === 'beverage' ? 'drinks' : 'food');

/** The course of any entry; your own logs carry no category, only food or drink. */
export function entryCourse(entry: Entry): Course | undefined {
  if (entry.kind === 'drink') return 'drinks';
  if (entry.kind === 'dish') return dishCourse(entry.dish);
  return entry.userDish.kind === 'drink' ? 'drinks' : undefined;
}

export const isDrinkEntry = (entry: Entry) => entryCourse(entry) === 'drinks';

/** A drink tile's one-line "where": its region's map label, else "Everywhere". */
export function entryWhere(entry: Entry, regions: RegionalCuisine[] | undefined, countryId: string): string {
  if (entry.kind === 'custom') return entry.userDish.region ?? 'Everywhere';
  const m = resolveRegion(entry.kind === 'dish' ? entry.dish : entry.drink, regions, countryId);
  return m.kind === 'region' ? regionLabelName(m.region.name) : 'Everywhere';
}
