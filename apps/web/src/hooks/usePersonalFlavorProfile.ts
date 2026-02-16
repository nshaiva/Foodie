import { useMemo } from 'react';
import { useDishes } from './useDishes';
import { useFavorites } from './useFavorites';
import { useWishlist } from './useWishlist';
import { countries } from '../data/countries';
import type { FlavorIntensity, UserDish, Dish, SpiceLevel, DishDifficulty } from '../data/types';

export interface PersonalFlavorIntensity extends FlavorIntensity {
  dataPoints: number;
}

export interface AffinitySpectrum {
  position: number; // 0-100
  label: string;
  confidence: number; // 0-1
  leftLabel: string;
  rightLabel: string;
}

export interface CuisineContribution {
  countryId: string;
  countryName: string;
  weight: number;
  dishCount: number;
}

export interface PersonalFlavorProfile {
  personalFlavor: PersonalFlavorIntensity | null;
  spectrums: {
    spice: AffinitySpectrum;
    complexity: AffinitySpectrum;
    activity: AffinitySpectrum;
    sweetSavory: AffinitySpectrum;
    richness: AffinitySpectrum;
  } | null;
  topCuisines: CuisineContribution[];
  totalDishes: number;
  hasEnoughData: boolean;
  hasEnoughForSpectrums: boolean;
  hasEnoughForTimeline: boolean;
}

// Helper to find static dish data from user dish
function findStaticDish(userDish: UserDish): Dish | undefined {
  const country = countries.find(c => c.id === userDish.countryId);
  if (!country) return undefined;

  return country.popularDishes.find(
    d => d.name.toLowerCase() === userDish.name.toLowerCase() ||
         d.englishName?.toLowerCase() === userDish.name.toLowerCase()
  );
}

// Get all ratings from a dish (taste, restaurant tries, cooking attempts)
function collectAllRatings(dish: UserDish): number[] {
  const ratings: number[] = [];

  if (dish.tasteRating) {
    ratings.push(dish.tasteRating);
  }

  (dish.restaurantTries || []).forEach(t => {
    if (t.rating) ratings.push(t.rating);
  });

  (dish.cookingAttempts || []).forEach(a => {
    if (a.successRating) ratings.push(a.successRating);
  });

  return ratings;
}

// Get average rating for a dish
function getAvgRating(dish: UserDish): number {
  const ratings = collectAllRatings(dish);
  if (ratings.length === 0) return 3; // Default neutral
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

// Count total engagements (tries + attempts)
function countEngagements(dishes: UserDish[]): number {
  return dishes.reduce((total, dish) => {
    const tries = dish.restaurantTries?.length || 0;
    const attempts = dish.cookingAttempts?.length || 0;
    return total + tries + attempts + 1; // +1 for the dish itself
  }, 0);
}

// Get most recent date from dishes
function getMostRecentDate(dishes: UserDish[]): Date {
  let mostRecent = new Date(0);

  dishes.forEach(dish => {
    const dishDate = new Date(dish.updatedAt);
    if (dishDate > mostRecent) mostRecent = dishDate;

    (dish.restaurantTries || []).forEach(t => {
      const tryDate = new Date(t.date);
      if (tryDate > mostRecent) mostRecent = tryDate;
    });

    (dish.cookingAttempts || []).forEach(a => {
      const attemptDate = new Date(a.date);
      if (attemptDate > mostRecent) mostRecent = attemptDate;
    });
  });

  return mostRecent;
}

// Days since a date
function daysSince(date: Date): number {
  return Math.max(0, (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

// Group dishes by country
function groupByCountry(dishes: UserDish[]): Map<string, UserDish[]> {
  const grouped = new Map<string, UserDish[]>();

  dishes.forEach(dish => {
    const existing = grouped.get(dish.countryId) || [];
    existing.push(dish);
    grouped.set(dish.countryId, existing);
  });

  return grouped;
}

// Calculate spice affinity
function calculateSpiceAffinity(dishes: UserDish[]): AffinitySpectrum {
  const spiceValues: Record<SpiceLevel, number> = {
    'none': 0,
    'mild': 25,
    'medium': 50,
    'hot': 75,
    'very-hot': 100
  };

  let totalWeight = 0;
  let weightedSpice = 0;

  dishes.forEach(dish => {
    const staticDish = findStaticDish(dish);
    if (staticDish?.spiceLevel) {
      const spiceValue = spiceValues[staticDish.spiceLevel];
      const rating = getAvgRating(dish);
      const weight = rating / 3;
      totalWeight += weight;
      weightedSpice += spiceValue * weight;
    }
  });

  const position = totalWeight > 0 ? weightedSpice / totalWeight : 50;

  let label: string;
  if (position < 33) label = 'Mild Seeker';
  else if (position < 66) label = 'Heat Explorer';
  else label = 'Spice Adventurer';

  return {
    position,
    label,
    confidence: Math.min(1, totalWeight / 5),
    leftLabel: 'Mild',
    rightLabel: 'Spicy'
  };
}

// Calculate complexity affinity
function calculateComplexityAffinity(dishes: UserDish[]): AffinitySpectrum {
  const difficultyValues: Record<DishDifficulty, number> = {
    'easy': 0,
    'medium': 50,
    'hard': 100
  };

  let totalWeight = 0;
  let weightedComplexity = 0;

  dishes.forEach(dish => {
    const staticDish = findStaticDish(dish);
    if (staticDish?.difficulty) {
      const complexityValue = difficultyValues[staticDish.difficulty];
      const rating = getAvgRating(dish);
      const weight = rating / 3;
      totalWeight += weight;
      weightedComplexity += complexityValue * weight;
    }
  });

  const position = totalWeight > 0 ? weightedComplexity / totalWeight : 50;

  let label: string;
  if (position < 33) label = 'Comfort Food Lover';
  else if (position < 66) label = 'Balanced Explorer';
  else label = 'Challenge Seeker';

  return {
    position,
    label,
    confidence: Math.min(1, totalWeight / 5),
    leftLabel: 'Simple',
    rightLabel: 'Complex'
  };
}

// Calculate activity style (dining out vs home cooking)
function calculateActivityAffinity(dishes: UserDish[]): AffinitySpectrum {
  let totalTries = 0;
  let totalAttempts = 0;

  dishes.forEach(dish => {
    totalTries += dish.restaurantTries?.length || 0;
    totalAttempts += dish.cookingAttempts?.length || 0;
  });

  const total = totalTries + totalAttempts;

  // Position: 0 = all dining out, 100 = all home cooking
  const position = total > 0 ? (totalAttempts / total) * 100 : 50;

  let label: string;
  if (position < 33) label = 'Restaurant Explorer';
  else if (position < 66) label = 'Balanced Foodie';
  else label = 'Home Chef';

  return {
    position,
    label,
    confidence: Math.min(1, total / 10),
    leftLabel: 'Dining Out',
    rightLabel: 'Home Cooking'
  };
}

// Calculate sweet/savory affinity using cuisine flavor intensities
function calculateSweetSavoryAffinity(cuisineWeights: Map<string, number>): AffinitySpectrum {
  let totalWeight = 0;
  let weightedSweet = 0;

  cuisineWeights.forEach((weight, countryId) => {
    const country = countries.find(c => c.id === countryId);
    if (country?.cuisineProfile.flavorIntensity) {
      const sweetness = country.cuisineProfile.flavorIntensity.sweetness;
      totalWeight += weight;
      weightedSweet += sweetness * weight;
    }
  });

  const avgSweet = totalWeight > 0 ? weightedSweet / totalWeight : 5;
  // Invert: high sweetness = low position (Sweet side on left)
  const position = ((10 - avgSweet) / 10) * 100;

  let label: string;
  if (position < 33) label = 'Sweet Tooth';
  else if (position < 66) label = 'Balanced Palate';
  else label = 'Savory Seeker';

  return {
    position,
    label,
    confidence: Math.min(1, totalWeight / 3),
    leftLabel: 'Sweet',
    rightLabel: 'Savory'
  };
}

// Calculate flavor richness affinity
function calculateRichnessAffinity(cuisineWeights: Map<string, number>): AffinitySpectrum {
  let totalWeight = 0;
  let weightedRich = 0;
  let weightedBright = 0;

  cuisineWeights.forEach((weight, countryId) => {
    const country = countries.find(c => c.id === countryId);
    if (country?.cuisineProfile.flavorIntensity) {
      const fi = country.cuisineProfile.flavorIntensity;
      const richScore = (fi.umami + fi.smokeEarth) / 2;
      const brightScore = fi.acidity;

      totalWeight += weight;
      weightedRich += richScore * weight;
      weightedBright += brightScore * weight;
    }
  });

  const avgRich = totalWeight > 0 ? weightedRich / totalWeight : 5;
  const avgBright = totalWeight > 0 ? weightedBright / totalWeight : 5;

  // Position: 0 = Rich, 100 = Bright
  const ratio = avgBright / (avgRich + avgBright);
  const position = ratio * 100;

  let label: string;
  if (position < 33) label = 'Rich & Hearty';
  else if (position < 66) label = 'Balanced';
  else label = 'Bright & Fresh';

  return {
    position,
    label,
    confidence: Math.min(1, totalWeight / 3),
    leftLabel: 'Rich',
    rightLabel: 'Bright'
  };
}

export function usePersonalFlavorProfile(): PersonalFlavorProfile {
  const { dishes } = useDishes();
  const { favorites } = useFavorites();
  const { wishlist } = useWishlist();

  return useMemo(() => {
    const totalDishes = dishes.length;
    const hasEnoughData = totalDishes >= 3;
    const hasEnoughForSpectrums = totalDishes >= 5;
    const hasEnoughForTimeline = totalDishes >= 10;

    if (!hasEnoughData) {
      return {
        personalFlavor: null,
        spectrums: null,
        topCuisines: [],
        totalDishes,
        hasEnoughData,
        hasEnoughForSpectrums,
        hasEnoughForTimeline,
      };
    }

    // Group dishes by country and calculate cuisine weights
    const groupedDishes = groupByCountry(dishes);
    const cuisineWeights = new Map<string, number>();

    groupedDishes.forEach((countryDishes, countryId) => {
      // Calculate rating weight
      const allRatings = countryDishes.flatMap(d => collectAllRatings(d));
      const avgRating = allRatings.length > 0
        ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length
        : 3;
      const ratingWeight = avgRating / 5;

      // Calculate frequency weight (log scale, capped)
      const engagements = countEngagements(countryDishes);
      const frequencyWeight = Math.min(1, Math.log(engagements + 1) / Math.log(20));

      // Calculate recency weight (6-month half-life)
      const mostRecent = getMostRecentDate(countryDishes);
      const recencyWeight = Math.exp(-daysSince(mostRecent) / 180);

      // Combined weight
      const weight = (ratingWeight * 0.5) + (frequencyWeight * 0.3) + (recencyWeight * 0.2);
      cuisineWeights.set(countryId, weight);
    });

    // Calculate personal flavor intensity (weighted average)
    let totalWeight = 0;
    const flavorSums = {
      heat: 0,
      acidity: 0,
      sweetness: 0,
      umami: 0,
      aromatic: 0,
      smokeEarth: 0
    };

    cuisineWeights.forEach((weight, countryId) => {
      const country = countries.find(c => c.id === countryId);
      if (country?.cuisineProfile.flavorIntensity) {
        const fi = country.cuisineProfile.flavorIntensity;
        totalWeight += weight;
        flavorSums.heat += fi.heat * weight;
        flavorSums.acidity += fi.acidity * weight;
        flavorSums.sweetness += fi.sweetness * weight;
        flavorSums.umami += fi.umami * weight;
        flavorSums.aromatic += fi.aromatic * weight;
        flavorSums.smokeEarth += fi.smokeEarth * weight;
      }
    });

    const personalFlavor: PersonalFlavorIntensity = {
      heat: totalWeight > 0 ? flavorSums.heat / totalWeight : 5,
      acidity: totalWeight > 0 ? flavorSums.acidity / totalWeight : 5,
      sweetness: totalWeight > 0 ? flavorSums.sweetness / totalWeight : 5,
      umami: totalWeight > 0 ? flavorSums.umami / totalWeight : 5,
      aromatic: totalWeight > 0 ? flavorSums.aromatic / totalWeight : 5,
      smokeEarth: totalWeight > 0 ? flavorSums.smokeEarth / totalWeight : 5,
      dataPoints: totalDishes
    };

    // Calculate spectrums
    const spectrums = hasEnoughForSpectrums ? {
      spice: calculateSpiceAffinity(dishes),
      complexity: calculateComplexityAffinity(dishes),
      activity: calculateActivityAffinity(dishes),
      sweetSavory: calculateSweetSavoryAffinity(cuisineWeights),
      richness: calculateRichnessAffinity(cuisineWeights),
    } : null;

    // Get top contributing cuisines
    const topCuisines: CuisineContribution[] = Array.from(cuisineWeights.entries())
      .map(([countryId, weight]) => {
        const country = countries.find(c => c.id === countryId);
        const dishCount = groupedDishes.get(countryId)?.length || 0;
        return {
          countryId,
          countryName: country?.name || countryId,
          weight,
          dishCount
        };
      })
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);

    return {
      personalFlavor,
      spectrums,
      topCuisines,
      totalDishes,
      hasEnoughData,
      hasEnoughForSpectrums,
      hasEnoughForTimeline,
    };
  }, [dishes, favorites, wishlist]);
}
