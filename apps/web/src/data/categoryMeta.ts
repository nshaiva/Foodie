import type { DishCategory, BeverageCategory } from './types';

// Plate-dot color per dish category — muted tones from the app palette family.
// Replaces the category emoji on Eat & Drink cards (#24).
export const DISH_CATEGORY_COLORS: Record<DishCategory, string> = {
  appetizer: '#C99A2E',     // saffron
  soup: '#C2654A',          // terracotta
  salad: '#7C8B6F',         // sage
  main: '#33302A',          // ink
  side: '#9B968A',          // warm gray
  'street-food': '#D07A3F', // amber-orange
  dessert: '#C46A88',       // rose
  beverage: '#5E7E9B',      // slate blue
  breakfast: '#D9B25A',     // light amber
  condiment: '#6B4F3A',     // brown
};

export const BEVERAGE_CATEGORY_COLORS: Record<BeverageCategory, string> = {
  tea: '#6E8B5E',
  coffee: '#6B4F3A',
  juice: '#C99A2E',
  soda: '#5E7E9B',
  beer: '#D9B25A',
  wine: '#8E4A5B',
  spirit: '#A9503A',
  cocktail: '#C46A88',
  street: '#D07A3F',
  ceremonial: '#7C8B6F',
};

export const BEVERAGE_DEFAULT_COLOR = '#5E7E9B';
