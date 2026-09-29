import type { Country, Dish } from '../data/types';

const POP_SCORE: Record<string, number> = { both: 3, 'local-favorite': 2, 'tourist-classic': 1 };
const HEADLINE_CATEGORY = new Set(['main', 'soup', 'street-food']);

/**
 * Four food dishes to start with: known and loved first (`both`), then local
 * favorites, with mains, soups and street food ahead of sides and sweets. At
 * most two from one category, so the strip shows the range of the cuisine
 * rather than four mains; the cap relaxes if a country can't fill four.
 */
export function signatureDishes(country: Country, count = 4): Dish[] {
  const ranked = country.popularDishes
    .map((dish, i) => ({ dish, i, score: (POP_SCORE[dish.popularity ?? ''] ?? 0) + (HEADLINE_CATEGORY.has(dish.category) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map(r => r.dish);
  const picked: Dish[] = [];
  const perCategory = new Map<string, number>();
  for (const dish of ranked) {
    if (picked.length === count) break;
    const n = perCategory.get(dish.category) ?? 0;
    if (n >= 2) continue;
    picked.push(dish);
    perCategory.set(dish.category, n + 1);
  }
  for (const dish of ranked) {
    if (picked.length === count) break;
    if (!picked.includes(dish)) picked.push(dish);
  }
  return picked;
}
