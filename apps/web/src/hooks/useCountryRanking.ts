import { useMemo } from 'react';
import type { Country, Dish, UserDish } from '../data/types';
import { rankDishesForOrdering, type RankedDish } from '../utils/orderRanking';
import { useDietPrefs } from './useDietPrefs';
import { usePersonalFlavorProfile } from './usePersonalFlavorProfile';

export interface DishRank {
  /** 1-based position among the country's dishes. */
  rank: number;
  /** Short reasons behind the rank, best first (`orderRanking.ts`). */
  reasons: string[];
}

export interface CountryRanking {
  /** Every dish of the country, best first. */
  ranked: RankedDish[];
  /** Rank and reasons by dish name (and English name), for tiles and the detail sheet. */
  rankOf: (dish: Dish) => DishRank | undefined;
  /**
   * The four to start with: the top of the ranking with at most two from one
   * category, so the strip shows the range of the cuisine rather than four
   * mains. The cap relaxes if the country can't fill four otherwise.
   */
  startWith: Dish[];
  /**
   * Whether anything personal shaped the order: a logged dish anywhere, a
   * bookmark, or a diet preference. Without any of these the order is plain
   * popularity, and the strip shouldn't claim it was picked for you.
   */
  personalized: boolean;
}

const START_WITH = 4;
const PER_CATEGORY = 2;

/**
 * One ranking for the Explore panel (2026-10-02): the same scoring Order well
 * uses (`rankDishesForOrdering`: popularity, your verdicts, want-to-try, spice
 * fit, diet preferences) so the overview's "Start with these", the Ranked
 * arrangement of All dishes and the dish sheet's "why" line all agree. Pass
 * the user's dishes for this country, the wishlist check, and whether the
 * user has logged or bookmarked anything at all.
 */
export function useCountryRanking(
  country: Country | undefined,
  countryDishes: UserDish[],
  isOnWishlist: (countryId: string, dishName: string) => boolean,
  hasAnyActivity: boolean,
): CountryRanking {
  const { personalFlavor } = usePersonalFlavorProfile();
  const { prefs, hasAnyPrefs } = useDietPrefs();

  return useMemo(() => {
    if (!country) return { ranked: [], rankOf: () => undefined, startWith: [], personalized: false };
    const ranked = rankDishesForOrdering(country, countryDishes, isOnWishlist, personalFlavor?.heat ?? null, prefs);
    const byName = new Map<string, DishRank>();
    ranked.forEach((r, i) => {
      const entry = { rank: i + 1, reasons: r.reasons };
      byName.set(r.dish.name.toLowerCase(), entry);
      if (r.dish.englishName) byName.set(r.dish.englishName.toLowerCase(), entry);
    });
    const rankOf = (dish: Dish) => byName.get(dish.name.toLowerCase()) ?? (dish.englishName ? byName.get(dish.englishName.toLowerCase()) : undefined);

    const startWith: Dish[] = [];
    const perCategory = new Map<string, number>();
    for (const { dish } of ranked) {
      if (startWith.length === START_WITH) break;
      const n = perCategory.get(dish.category) ?? 0;
      if (n >= PER_CATEGORY) continue;
      startWith.push(dish);
      perCategory.set(dish.category, n + 1);
    }
    for (const { dish } of ranked) {
      if (startWith.length === START_WITH) break;
      if (!startWith.includes(dish)) startWith.push(dish);
    }

    return { ranked, rankOf, startWith, personalized: hasAnyActivity || hasAnyPrefs };
  }, [country, countryDishes, isOnWishlist, personalFlavor, prefs, hasAnyActivity, hasAnyPrefs]);
}
