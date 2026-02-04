import { useMemo } from 'react';
import { useDishes } from './useDishes';
import { getCountryById } from '../data/countries';

export interface CuisinePreference {
  countryId: string;
  countryName: string;
  continent: string;
  score: number;
  avgRating: number;
  totalRatings: number;
  dishCount: number;
  topDishes: { name: string; avgRating: number }[];
}

export function useCuisinePreferences() {
  const { dishes } = useDishes();

  // Calculate eating preferences (tasteRating + restaurantTry ratings)
  const eatingPreferences = useMemo(() => {
    const countryData = new Map<string, {
      ratings: number[];
      dishRatings: Map<string, number[]>;
    }>();

    dishes.forEach(dish => {
      if (!countryData.has(dish.countryId)) {
        countryData.set(dish.countryId, {
          ratings: [],
          dishRatings: new Map(),
        });
      }

      const data = countryData.get(dish.countryId)!;

      if (!data.dishRatings.has(dish.name)) {
        data.dishRatings.set(dish.name, []);
      }

      // Collect taste rating from the dish itself
      if (dish.tasteRating) {
        data.ratings.push(dish.tasteRating);
        data.dishRatings.get(dish.name)!.push(dish.tasteRating);
      }

      // Collect ratings from restaurant tries
      (dish.restaurantTries || []).forEach(tryItem => {
        if (tryItem.rating) {
          data.ratings.push(tryItem.rating);
          data.dishRatings.get(dish.name)!.push(tryItem.rating);
        }
      });
    });

    return calculatePreferences(countryData);
  }, [dishes]);

  // Calculate cooking preferences (cooking attempt success ratings)
  const cookingPreferences = useMemo(() => {
    const countryData = new Map<string, {
      ratings: number[];
      dishRatings: Map<string, number[]>;
    }>();

    dishes.forEach(dish => {
      const cookingAttempts = dish.cookingAttempts || [];
      if (cookingAttempts.length === 0) return;

      if (!countryData.has(dish.countryId)) {
        countryData.set(dish.countryId, {
          ratings: [],
          dishRatings: new Map(),
        });
      }

      const data = countryData.get(dish.countryId)!;

      if (!data.dishRatings.has(dish.name)) {
        data.dishRatings.set(dish.name, []);
      }

      // Collect ratings from cooking attempts
      cookingAttempts.forEach(attempt => {
        if (attempt.successRating) {
          data.ratings.push(attempt.successRating);
          data.dishRatings.get(dish.name)!.push(attempt.successRating);
        }
      });
    });

    return calculatePreferences(countryData);
  }, [dishes]);

  // Get cuisines with at least one eating rating
  const rankedEatingCuisines = eatingPreferences.filter(p => p.totalRatings > 0);

  // Get cuisines with at least one cooking rating
  const rankedCookingCuisines = cookingPreferences.filter(p => p.totalRatings > 0);

  // Get cuisines explored but not yet rated (for eating)
  const unratedCuisines = eatingPreferences.filter(p => p.totalRatings === 0 && p.dishCount > 0);

  return {
    // Eating preferences (legacy "preferences" for backward compat)
    preferences: eatingPreferences,
    rankedCuisines: rankedEatingCuisines,
    topCuisine: rankedEatingCuisines[0] || null,

    // Separate eating preferences
    eatingPreferences,
    rankedEatingCuisines,
    topEatingCuisine: rankedEatingCuisines[0] || null,

    // Cooking preferences
    cookingPreferences,
    rankedCookingCuisines,
    topCookingCuisine: rankedCookingCuisines[0] || null,

    unratedCuisines,
  };
}

function calculatePreferences(
  countryData: Map<string, { ratings: number[]; dishRatings: Map<string, number[]> }>
): CuisinePreference[] {
  const results: CuisinePreference[] = [];

  countryData.forEach((data, countryId) => {
    const country = getCountryById(countryId);
    if (!country) return;

    const dishCount = data.dishRatings.size;
    const totalRatings = data.ratings.length;

    if (totalRatings === 0) {
      results.push({
        countryId,
        countryName: country.name,
        continent: country.continent,
        score: 0,
        avgRating: 0,
        totalRatings: 0,
        dishCount,
        topDishes: [],
      });
      return;
    }

    const avgRating = data.ratings.reduce((sum, r) => sum + r, 0) / totalRatings;
    const engagementFactor = Math.min(dishCount / 5, 1);
    const engagementBonus = engagementFactor * 5;
    const score = (avgRating * 0.7) + (engagementBonus * 0.3);

    const topDishes: { name: string; avgRating: number }[] = [];
    data.dishRatings.forEach((ratings, dishName) => {
      if (ratings.length > 0) {
        const dishAvg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        topDishes.push({ name: dishName, avgRating: dishAvg });
      }
    });
    topDishes.sort((a, b) => b.avgRating - a.avgRating);

    results.push({
      countryId,
      countryName: country.name,
      continent: country.continent,
      score,
      avgRating,
      totalRatings,
      dishCount,
      topDishes: topDishes.slice(0, 3),
    });
  });

  results.sort((a, b) => b.score - a.score);
  return results;
}
