import type { Country, Dish, UserDish } from '../data/types';
import { dishVerdictRating } from './ratings';
import type { DietPrefs } from '../hooks/useDietPrefs';

// Approximate a dish's spice level on the personal 1-10 heat axis
const SPICE_HEAT: Record<string, number> = {
  none: 0, mild: 2, medium: 5, hot: 7.5, 'very-hot': 9.5,
};

// Explicit spice preference → target heat (overrides the inferred axis)
const SPICE_PREF_HEAT: Record<string, number> = { mild: 2, medium: 5, hot: 8 };

// Protein detection is keyword-based until the content batch adds real
// protein tags per dish — good enough for ranking nudges, not for allergy
// guarantees.
const SEAFOOD_WORDS = ['fish', 'seafood', 'shrimp', 'prawn', 'crab', 'squid', 'octopus', 'ceviche', 'salmon', 'tuna', 'anchov', 'clam', 'mussel', 'oyster', 'eel', 'sardine', 'cod', 'snapper', 'mackerel'];
const RED_MEAT_WORDS = ['beef', 'pork', 'lamb', 'goat', 'mutton', 'veal', 'steak', 'brisket', 'ribs', 'carnitas', 'chorizo', 'sausage', 'bacon', 'ham', 'carne', 'oxtail'];

function dishText(dish: Dish): string {
  return [dish.name, dish.englishName, dish.description, ...(dish.keyTraits || [])]
    .filter(Boolean).join(' ').toLowerCase();
}

const hasWord = (text: string, words: string[]) => words.some(w => text.includes(w));

const isVegetarianDish = (d: Dish) => !!(d.dietary?.isVegetarian || d.dietary?.isVegan);

export interface RankedDish {
  dish: Dish;
  score: number;
  /** Short human-readable reasons behind the rank, best first */
  reasons: string[];
  tried?: UserDish;
  verdict?: number;
}

/**
 * V1 what-to-order ranking (#1): popularity + the user's own verdicts +
 * wishlist + spice fit against the personal heat axis. True per-dish
 * taste-match arrives with the content batch; this stays explainable.
 */
export function rankDishesForOrdering(
  country: Country,
  userDishes: UserDish[],
  isOnWishlist: (countryId: string, dishName: string) => boolean,
  personalHeat: number | null,
  prefs?: DietPrefs
): RankedDish[] {
  const byName = new Map<string, UserDish>();
  userDishes.forEach(d => byName.set(d.name.toLowerCase(), d));
  const triedFor = (dish: Dish) =>
    byName.get(dish.name.toLowerCase()) ||
    (dish.englishName ? byName.get(dish.englishName.toLowerCase()) : undefined);

  const ranked = country.popularDishes.map((dish): RankedDish => {
    let score = 0;
    const reasons: string[] = [];

    const tried = triedFor(dish);
    const verdict = tried ? dishVerdictRating(tried) : undefined;

    // Your own verdict outranks everything
    if (verdict !== undefined && verdict >= 4) {
      score += 2.5;
      reasons.push(`You rated it ${'★'.repeat(Math.round(verdict))}`);
    } else if (verdict !== undefined && verdict <= 2) {
      score -= 2.5;
      reasons.push("You weren't a fan last time");
    } else if (tried) {
      reasons.push("You've tried this");
    }

    if (dish.popularity === 'local-favorite') {
      score += 2;
      reasons.push('What locals actually order');
    } else if (dish.popularity === 'both') {
      score += 1.5;
      reasons.push('Loved by locals and visitors alike');
    } else if (dish.popularity === 'tourist-classic') {
      score += 1;
      reasons.push('The iconic classic');
    }

    if (!tried && isOnWishlist(country.id, dish.name)) {
      score += 1.5;
      reasons.push('On your want-to-try list');
    }

    // Spice fit: an explicit preference beats the inferred heat axis
    const targetHeat = prefs && prefs.spice !== 'any' ? SPICE_PREF_HEAT[prefs.spice] : personalHeat;
    if (targetHeat !== null && targetHeat !== undefined && dish.spiceLevel && dish.spiceLevel !== 'none') {
      const over = SPICE_HEAT[dish.spiceLevel] - targetHeat;
      if (over > 3) {
        score -= 1;
        reasons.push('Spicier than your usual');
      } else if (Math.abs(over) <= 2) {
        score += 0.5;
        reasons.push('Matches your spice comfort');
      }
    }

    // Dietary preferences: "prefer" nudges, "only" sinks non-matches hard
    if (prefs) {
      const text = dishText(dish);
      const veg = isVegetarianDish(dish);
      const seafood = hasWord(text, SEAFOOD_WORDS);
      const redMeat = hasWord(text, RED_MEAT_WORDS);

      const applyLevel = (level: string, matches: boolean, label: string) => {
        if (level === 'only' && !matches) {
          score -= 5;
          reasons.push(`Not ${label}`);
        } else if (level === 'prefer' && matches) {
          score += 1;
          reasons.push(`${label.charAt(0).toUpperCase() + label.slice(1)} — your preference`);
        }
      };

      applyLevel(prefs.vegetarian, veg, 'vegetarian');
      applyLevel(prefs.vegan, !!dish.dietary?.isVegan, 'vegan');
      applyLevel(prefs.pescatarian, veg || seafood, 'pescatarian-friendly');
      applyLevel(prefs.glutenFree, !!dish.dietary?.isGlutenFree, 'gluten-free');
      applyLevel(prefs.dairyFree, !!dish.dietary?.isDairyFree, 'dairy-free');

      if (prefs.redMeat === 'prefer' && redMeat) {
        score += 1;
        reasons.push('Red meat — your preference');
      } else if (prefs.redMeat === 'avoid' && redMeat) {
        score -= 1.5;
        reasons.push('Red meat — you avoid it');
      }
    }

    return { dish, score, reasons, tried, verdict };
  });

  return ranked.sort((a, b) => b.score - a.score);
}
