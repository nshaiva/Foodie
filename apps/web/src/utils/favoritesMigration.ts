import { findDishForAnswer } from './surveyDishes';
import type { UserDish } from '../data/types';

/** The retired `foodie-favorites` key (#40). Read only to migrate, never written. */
export const LEGACY_FAVORITES_KEY = 'foodie-favorites';

/** Shape of an entry under the retired key, kept only for migration. */
export interface LegacyFavorite {
  countryId: string;
  dishName: string;
  englishName?: string;
  createdAt?: string;
}

/**
 * Fold hearted favorites into tried dishes (#40): a favorite whose dish is
 * already logged is dropped — the verdict wins; one with no logged dish becomes
 * a tried dish rated 5, since a heart meant you loved it. Keyed on (countryId,
 * dish name) exactly like the survey reconcile, so two synced devices migrating
 * the same list can't duplicate. Returns the input array when nothing changes.
 */
export function migrateFavoritesToDishes(
  dishes: UserDish[],
  favorites: LegacyFavorite[],
  now: string = new Date().toISOString()
): UserDish[] {
  const added: UserDish[] = [];
  favorites.forEach(fav => {
    if (!fav || typeof fav.countryId !== 'string' || typeof fav.dishName !== 'string') return;
    if (findDishForAnswer(dishes, fav.countryId, fav.dishName)) return;
    if (findDishForAnswer(added, fav.countryId, fav.dishName)) return;
    added.push({
      id: crypto.randomUUID(),
      countryId: fav.countryId,
      name: fav.dishName,
      tasteRating: 5,
      restaurantTries: [],
      createdAt: fav.createdAt || now,
      updatedAt: now,
    });
  });
  return added.length > 0 ? [...dishes, ...added] : dishes;
}

/**
 * One-shot on load: read the legacy key and delete it so the migration never
 * re-runs; null when there is nothing to migrate. Reads localStorage directly
 * on purpose — the key is leaving the system and must not rejoin sync or
 * backup via a hook.
 */
export function takeLegacyFavorites(): LegacyFavorite[] | null {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(LEGACY_FAVORITES_KEY);
  } catch {
    return null;
  }
  if (raw === null) return null;

  let favorites: LegacyFavorite[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) favorites = parsed;
  } catch {
    // A corrupt entry has nothing to migrate; still clear the key below.
  }

  try {
    window.localStorage.removeItem(LEGACY_FAVORITES_KEY);
  } catch {
    // If the delete fails the next load retries; key matching keeps it safe.
  }
  return favorites;
}
