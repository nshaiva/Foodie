import { useMemo } from 'react';
import { useDishes } from './useDishes';
import { countries } from '../data/countries';
import type { Dish, UserDish, DishCategory } from '../data/types';

export interface DishHealthScore {
  userDish: UserDish;
  staticDish: Dish | null;
  healthScore: number;
  healthFactors: string[];
  countryName: string;
}

export interface DietaryBreakdown {
  vegan: number;
  vegetarian: number;
  glutenFree: number;
  dairyFree: number;
  halal: number;
  other: number;
}

export interface CategoryBreakdown {
  category: DishCategory | 'unknown';
  count: number;
  percentage: number;
}

export interface HealthyRecommendation {
  dish: Dish;
  countryId: string;
  countryName: string;
  healthScore: number;
  healthFactors: string[];
}

export interface HealthStats {
  // Overview
  averageHealthScore: number;
  totalDishesLogged: number;
  healthiestDishes: DishHealthScore[];

  // Breakdowns
  dietaryBreakdown: DietaryBreakdown;
  categoryBreakdown: CategoryBreakdown[];

  // Recommendations
  healthyRecommendations: HealthyRecommendation[];

  // Flags
  hasEnoughData: boolean;
}

// Category health modifiers
const categoryHealthModifiers: Record<DishCategory | 'unknown', number> = {
  'salad': 3,
  'soup': 2,
  'appetizer': 1,
  'breakfast': 1,
  'side': 1,
  'main': 0,
  'street-food': -1,
  'condiment': 0,
  'beverage': 0,
  'dessert': -2,
  'unknown': 0,
};

// Healthy cooking method keywords (from keyTraits)
const healthyKeywords = ['grilled', 'steamed', 'fresh', 'raw', 'light', 'broth', 'poached', 'baked'];
const unhealthyKeywords = ['fried', 'deep-fried', 'crispy', 'creamy', 'rich', 'sweet', 'syrup'];

// Calculate health score for a dish (1-10 scale)
function calculateHealthScore(dish: Dish): { score: number; factors: string[] } {
  let score = 5; // Base score
  const factors: string[] = [];

  // Category modifier
  const categoryMod = categoryHealthModifiers[dish.category] || 0;
  score += categoryMod;
  if (categoryMod > 0) factors.push(`${dish.category} (+${categoryMod})`);
  if (categoryMod < 0) factors.push(`${dish.category} (${categoryMod})`);

  // Dietary flags
  if (dish.dietary?.isVegan) {
    score += 2;
    factors.push('vegan (+2)');
  } else if (dish.dietary?.isVegetarian) {
    score += 1;
    factors.push('vegetarian (+1)');
  }

  if (dish.dietary?.isGlutenFree) {
    score += 0.5;
    factors.push('gluten-free (+0.5)');
  }

  if (dish.dietary?.isDairyFree) {
    score += 0.5;
    factors.push('dairy-free (+0.5)');
  }

  // Key traits analysis
  const traits = (dish.keyTraits || []).map(t => t.toLowerCase());

  healthyKeywords.forEach(keyword => {
    if (traits.some(t => t.includes(keyword))) {
      score += 1;
      factors.push(`${keyword} (+1)`);
    }
  });

  unhealthyKeywords.forEach(keyword => {
    if (traits.some(t => t.includes(keyword))) {
      score -= 1;
      factors.push(`${keyword} (-1)`);
    }
  });

  // Clamp to 1-10
  score = Math.max(1, Math.min(10, score));

  return { score: Math.round(score * 10) / 10, factors };
}

// Find static dish data from user dish
function findStaticDish(userDish: UserDish): Dish | null {
  const country = countries.find(c => c.id === userDish.countryId);
  if (!country) return null;

  return country.popularDishes.find(
    d => d.name.toLowerCase() === userDish.name.toLowerCase() ||
         d.englishName?.toLowerCase() === userDish.name.toLowerCase()
  ) || null;
}

// Get country name
function getCountryName(countryId: string): string {
  return countries.find(c => c.id === countryId)?.name || countryId;
}

export function useHealthStats(): HealthStats {
  const { dishes } = useDishes();

  return useMemo(() => {
    const hasEnoughData = dishes.length >= 1;

    if (!hasEnoughData) {
      return {
        averageHealthScore: 0,
        totalDishesLogged: 0,
        healthiestDishes: [],
        dietaryBreakdown: { vegan: 0, vegetarian: 0, glutenFree: 0, dairyFree: 0, halal: 0, other: 0 },
        categoryBreakdown: [],
        healthyRecommendations: [],
        hasEnoughData: false,
      };
    }

    // Calculate health scores for all logged dishes
    const dishScores: DishHealthScore[] = dishes.map(userDish => {
      const staticDish = findStaticDish(userDish);
      const { score, factors } = staticDish
        ? calculateHealthScore(staticDish)
        : { score: 5, factors: ['no data available'] };

      return {
        userDish,
        staticDish,
        healthScore: score,
        healthFactors: factors,
        countryName: getCountryName(userDish.countryId),
      };
    });

    // Average health score
    const averageHealthScore = dishScores.length > 0
      ? Math.round((dishScores.reduce((sum, d) => sum + d.healthScore, 0) / dishScores.length) * 10) / 10
      : 0;

    // Top 5 healthiest dishes
    const healthiestDishes = [...dishScores]
      .filter(d => d.staticDish) // Only include dishes we have data for
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, 5);

    // Dietary breakdown
    const dietaryBreakdown: DietaryBreakdown = {
      vegan: 0,
      vegetarian: 0,
      glutenFree: 0,
      dairyFree: 0,
      halal: 0,
      other: 0,
    };

    dishScores.forEach(({ staticDish }) => {
      if (!staticDish?.dietary) {
        dietaryBreakdown.other++;
        return;
      }

      if (staticDish.dietary.isVegan) dietaryBreakdown.vegan++;
      else if (staticDish.dietary.isVegetarian) dietaryBreakdown.vegetarian++;
      else dietaryBreakdown.other++;

      if (staticDish.dietary.isGlutenFree) dietaryBreakdown.glutenFree++;
      if (staticDish.dietary.isDairyFree) dietaryBreakdown.dairyFree++;
      if (staticDish.dietary.isHalal) dietaryBreakdown.halal++;
    });

    // Category breakdown
    const categoryCounts = new Map<DishCategory | 'unknown', number>();
    dishScores.forEach(({ staticDish }) => {
      const category = staticDish?.category || 'unknown';
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });

    const categoryBreakdown: CategoryBreakdown[] = Array.from(categoryCounts.entries())
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / dishes.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    // Healthy recommendations from countries user has explored
    const exploredCountryIds = new Set(dishes.map(d => d.countryId));
    const loggedDishNames = new Set(dishes.map(d => d.name.toLowerCase()));

    const healthyRecommendations: HealthyRecommendation[] = [];

    exploredCountryIds.forEach(countryId => {
      const country = countries.find(c => c.id === countryId);
      if (!country) return;

      country.popularDishes.forEach(dish => {
        // Skip if already logged
        if (loggedDishNames.has(dish.name.toLowerCase())) return;
        if (dish.englishName && loggedDishNames.has(dish.englishName.toLowerCase())) return;

        const { score, factors } = calculateHealthScore(dish);

        // Only recommend dishes with health score >= 6
        if (score >= 6) {
          healthyRecommendations.push({
            dish,
            countryId,
            countryName: country.name,
            healthScore: score,
            healthFactors: factors,
          });
        }
      });
    });

    // Sort by health score and take top 6
    healthyRecommendations.sort((a, b) => b.healthScore - a.healthScore);
    healthyRecommendations.splice(6);

    return {
      averageHealthScore,
      totalDishesLogged: dishes.length,
      healthiestDishes,
      dietaryBreakdown,
      categoryBreakdown,
      healthyRecommendations,
      hasEnoughData,
    };
  }, [dishes]);
}
