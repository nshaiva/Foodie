import type { UserDish } from '../data/types';

/**
 * The dish's rating under the verdict model: an explicit tasteRating is the
 * user's declared verdict and always wins; otherwise the average of rated
 * visits fills in; undefined when nothing is rated.
 */
export function dishVerdictRating(dish: UserDish): number | undefined {
  if (dish.tasteRating) return dish.tasteRating;
  const ratings = (dish.restaurantTries || [])
    .map(t => t.rating)
    .filter((r): r is number => !!r);
  if (ratings.length === 0) return undefined;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

/** True when the displayed rating is derived from visits, not a declared verdict. */
export function isDerivedRating(dish: UserDish): boolean {
  return !dish.tasteRating && (dish.restaurantTries || []).some(t => !!t.rating);
}

/** Count of rated visits, for the "avg of N tries" label. */
export function ratedTryCount(dish: UserDish): number {
  return (dish.restaurantTries || []).filter(t => !!t.rating).length;
}

/**
 * Centered rating signal: 3★ is neutral. Range −1 (1★) to +1 (5★);
 * 0 when the dish has no rating at all.
 */
export function ratingSignal(dish: UserDish): number {
  const verdict = dishVerdictRating(dish);
  if (verdict === undefined) return 0;
  return (verdict - 3) / 2;
}
