import { useMemo } from 'react';
import { useDishes } from './useDishes';
import { useTasteSurvey, SENTIMENT_RATING, type SurveyAnswer } from './useTasteSurvey';
import { countries } from '../data/countries';
import { dishVerdictRating, ratingSignal } from '../utils/ratings';
import type { FlavorIntensity, UserDish, Dish, SpiceLevel, DishDifficulty } from '../data/types';

// Survey answers count at half the strength of a logged dish
const SURVEY_WEIGHT = 0.5;

function surveyRating(answer: SurveyAnswer): number {
  return SENTIMENT_RATING[answer.sentiment as keyof typeof SENTIMENT_RATING] ?? 3;
}

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
    sweetSavory: AffinitySpectrum;
    richness: AffinitySpectrum;
  } | null;
  topCuisines: CuisineContribution[];
  totalDishes: number;
  surveyCount: number;
  hasEnoughData: boolean;
  hasEnoughForSpectrums: boolean;
  hasEnoughForTimeline: boolean;
}

// Helper to find static dish data by country + name
function findStaticDishByName(countryId: string, name: string): Dish | undefined {
  const country = countries.find(c => c.id === countryId);
  if (!country) return undefined;

  return country.popularDishes.find(
    d => d.name.toLowerCase() === name.toLowerCase() ||
         d.englishName?.toLowerCase() === name.toLowerCase()
  );
}

// Helper to find static dish data from user dish
function findStaticDish(userDish: UserDish): Dish | undefined {
  return findStaticDishByName(userDish.countryId, userDish.name);
}

// Count total engagements (dish + its tries)
function countEngagements(dishes: UserDish[]): number {
  return dishes.reduce((total, dish) => {
    const tries = dish.restaurantTries?.length || 0;
    return total + tries + 1; // +1 for the dish itself
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
function calculateSpiceAffinity(dishes: UserDish[], survey: SurveyAnswer[]): AffinitySpectrum {
  const spiceValues: Record<SpiceLevel, number> = {
    'none': 0,
    'mild': 25,
    'medium': 50,
    'hot': 75,
    'very-hot': 100
  };

  // Signed contributions around the midpoint: loving a hot dish pushes toward
  // Spicy, hating one pushes toward Mild; unrated dishes don't move the slider.
  let totalSignal = 0;
  let signedSum = 0;

  dishes.forEach(dish => {
    const staticDish = findStaticDish(dish);
    if (staticDish?.spiceLevel) {
      const spiceValue = spiceValues[staticDish.spiceLevel];
      const signal = ratingSignal(dish);
      totalSignal += Math.abs(signal);
      signedSum += signal * (spiceValue - 50);
    }
  });

  survey.forEach(answer => {
    const staticDish = findStaticDishByName(answer.countryId, answer.dishName);
    if (staticDish?.spiceLevel) {
      const spiceValue = spiceValues[staticDish.spiceLevel];
      const signal = ((surveyRating(answer) - 3) / 2) * SURVEY_WEIGHT;
      totalSignal += Math.abs(signal);
      signedSum += signal * (spiceValue - 50);
    }
  });

  const position = totalSignal > 0
    ? Math.min(100, Math.max(0, 50 + signedSum / totalSignal))
    : 50;

  let label: string;
  if (position < 33) label = 'Mild Seeker';
  else if (position < 66) label = 'Heat Explorer';
  else label = 'Spice Adventurer';

  return {
    position,
    label,
    confidence: Math.min(1, totalSignal / 5),
    leftLabel: 'Mild',
    rightLabel: 'Spicy'
  };
}

// Calculate complexity affinity
function calculateComplexityAffinity(dishes: UserDish[], survey: SurveyAnswer[]): AffinitySpectrum {
  const difficultyValues: Record<DishDifficulty, number> = {
    'easy': 0,
    'medium': 50,
    'hard': 100
  };

  let totalSignal = 0;
  let signedSum = 0;

  dishes.forEach(dish => {
    const staticDish = findStaticDish(dish);
    if (staticDish?.difficulty) {
      const complexityValue = difficultyValues[staticDish.difficulty];
      const signal = ratingSignal(dish);
      totalSignal += Math.abs(signal);
      signedSum += signal * (complexityValue - 50);
    }
  });

  survey.forEach(answer => {
    const staticDish = findStaticDishByName(answer.countryId, answer.dishName);
    if (staticDish?.difficulty) {
      const complexityValue = difficultyValues[staticDish.difficulty];
      const signal = ((surveyRating(answer) - 3) / 2) * SURVEY_WEIGHT;
      totalSignal += Math.abs(signal);
      signedSum += signal * (complexityValue - 50);
    }
  });

  const position = totalSignal > 0
    ? Math.min(100, Math.max(0, 50 + signedSum / totalSignal))
    : 50;

  let label: string;
  if (position < 33) label = 'Comfort Food Lover';
  else if (position < 66) label = 'Balanced Explorer';
  else label = 'Challenge Seeker';

  return {
    position,
    label,
    confidence: Math.min(1, totalSignal / 5),
    leftLabel: 'Simple',
    rightLabel: 'Complex'
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
  const { ratedAnswers } = useTasteSurvey();

  return useMemo(() => {
    // A survey answer for a dish you've also logged is redundant — the log wins
    const loggedKeys = new Set(dishes.map(d => `${d.countryId}:${d.name.toLowerCase()}`));
    const survey = ratedAnswers.filter(
      a => !loggedKeys.has(`${a.countryId}:${a.dishName.toLowerCase()}`)
    );

    const totalDishes = dishes.length;
    const surveyCount = survey.length;
    const totalSignals = totalDishes + surveyCount;
    const hasEnoughData = totalSignals >= 3;
    const hasEnoughForSpectrums = totalSignals >= 5;
    const hasEnoughForTimeline = totalDishes >= 10;

    if (!hasEnoughData) {
      return {
        personalFlavor: null,
        spectrums: null,
        topCuisines: [],
        totalDishes,
        surveyCount,
        hasEnoughData,
        hasEnoughForSpectrums,
        hasEnoughForTimeline,
      };
    }

    // Group both signal sources by country and calculate cuisine weights
    const groupedDishes = groupByCountry(dishes);
    const groupedSurvey = new Map<string, SurveyAnswer[]>();
    survey.forEach(a => {
      const existing = groupedSurvey.get(a.countryId) || [];
      existing.push(a);
      groupedSurvey.set(a.countryId, existing);
    });

    const cuisineWeights = new Map<string, number>();
    const countryIds = new Set([...groupedDishes.keys(), ...groupedSurvey.keys()]);

    countryIds.forEach(countryId => {
      const countryDishes = groupedDishes.get(countryId) || [];
      const countrySurvey = groupedSurvey.get(countryId) || [];

      // Centered rating signal: weighted mean of verdicts, 3★ neutral → −1..+1.
      // Logged dishes count fully; survey answers at half weight.
      let verdictSum = 0;
      let verdictWeight = 0;
      countryDishes.forEach(d => {
        verdictSum += dishVerdictRating(d) ?? 3;
        verdictWeight += 1;
      });
      countrySurvey.forEach(a => {
        verdictSum += surveyRating(a) * SURVEY_WEIGHT;
        verdictWeight += SURVEY_WEIGHT;
      });
      const avgVerdict = verdictWeight > 0 ? verdictSum / verdictWeight : 3;
      const signal = (avgVerdict - 3) / 2;

      // Calculate frequency weight (log scale, capped)
      const engagements = countEngagements(countryDishes) + countrySurvey.length * SURVEY_WEIGHT;
      const frequencyWeight = Math.min(1, Math.log(engagements + 1) / Math.log(20));

      // Calculate recency weight (6-month half-life)
      let mostRecent = getMostRecentDate(countryDishes);
      countrySurvey.forEach(a => {
        const answeredAt = new Date(a.answeredAt);
        if (answeredAt > mostRecent) mostRecent = answeredAt;
      });
      const recencyWeight = Math.exp(-daysSince(mostRecent) / 180);

      // Ratings dominate; a disliked cuisine's weight clamps to zero rather
      // than contributing negative terms to the weighted vector average.
      const weight = Math.max(0, (signal * 0.7) + (frequencyWeight * 0.1) + (recencyWeight * 0.2));
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
      dataPoints: totalSignals
    };

    // Calculate spectrums
    const spectrums = hasEnoughForSpectrums ? {
      spice: calculateSpiceAffinity(dishes, survey),
      complexity: calculateComplexityAffinity(dishes, survey),
      sweetSavory: calculateSweetSavoryAffinity(cuisineWeights),
      richness: calculateRichnessAffinity(cuisineWeights),
    } : null;

    // Get top contributing cuisines
    const topCuisines: CuisineContribution[] = Array.from(cuisineWeights.entries())
      .filter(([, weight]) => weight > 0)
      .map(([countryId, weight]) => {
        const country = countries.find(c => c.id === countryId);
        const dishCount = (groupedDishes.get(countryId)?.length || 0) +
          (groupedSurvey.get(countryId)?.length || 0);
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
      surveyCount,
      hasEnoughData,
      hasEnoughForSpectrums,
      hasEnoughForTimeline,
    };
  }, [dishes, ratedAnswers]);
}
