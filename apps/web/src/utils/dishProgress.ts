import type { Country, UserDish } from '../data/types';

export interface DishProgress {
  tried: number;
  total: number;
  percent: number; // 0-100, rounded
}

/**
 * % of a country's popular (food) dishes the user has tried. Matches by
 * name or englishName, same rule the Eat & Drink cards use for tried-state.
 */
export function countryDishProgress(country: Country, userDishes: UserDish[]): DishProgress {
  const total = country.popularDishes.length;
  if (total === 0) return { tried: 0, total: 0, percent: 0 };

  const loggedNames = new Set(userDishes.map(d => d.name.toLowerCase()));
  const tried = country.popularDishes.filter(dish =>
    loggedNames.has(dish.name.toLowerCase()) ||
    (dish.englishName && loggedNames.has(dish.englishName.toLowerCase()))
  ).length;

  return { tried, total, percent: Math.round((tried / total) * 100) };
}
