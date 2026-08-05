import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { countries } from '../data/countries';
import type { Dish } from '../data/types';

export type SurveySentiment = 'love' | 'like' | 'nope' | 'skip';

export interface SurveyAnswer {
  countryId: string;
  dishName: string;
  sentiment: SurveySentiment;
  answeredAt: string;
}

export interface SurveyDish {
  countryId: string;
  countryName: string;
  dish: Dish;
}

// Ratings a sentiment contributes to the flavor profile (skip contributes nothing)
export const SENTIMENT_RATING: Record<Exclude<SurveySentiment, 'skip'>, number> = {
  love: 5,
  like: 4,
  nope: 1.5,
};

const POPULARITY_RANK: Record<string, number> = {
  both: 3,
  'tourist-classic': 2,
  'local-favorite': 1,
};

function recognizability(dish: Dish): number {
  return POPULARITY_RANK[dish.popularity ?? ''] ?? 0;
}

// Pick up to 2 dishes per country: the most recognizable one, then the most
// recognizable one that differs in category and spice level (maximizes what
// the second answer tells us).
function pickCountryDishes(dishes: Dish[]): Dish[] {
  if (dishes.length === 0) return [];
  const sorted = [...dishes].sort((a, b) => recognizability(b) - recognizability(a));
  const first = sorted[0];
  const rest = sorted.slice(1);
  const second =
    rest.find(d => d.category !== first.category && d.spiceLevel !== first.spiceLevel) ??
    rest.find(d => d.category !== first.category) ??
    rest[0];
  return second ? [first, second] : [first];
}

// Deterministic survey deck: round-robin countries (everyone's first pick,
// then second picks) so consecutive questions hop between cuisines.
export function getSurveyDishes(): SurveyDish[] {
  const picks = countries.map(c => ({
    countryId: c.id,
    countryName: c.name,
    dishes: pickCountryDishes(c.popularDishes),
  }));
  const deck: SurveyDish[] = [];
  for (let round = 0; round < 2; round++) {
    for (const p of picks) {
      if (p.dishes[round]) deck.push({ countryId: p.countryId, countryName: p.countryName, dish: p.dishes[round] });
    }
  }
  return deck;
}

export function useTasteSurvey() {
  const [answers, setAnswers] = useLocalStorage<SurveyAnswer[]>('foodie-taste-survey', []);

  const setAnswer = (countryId: string, dishName: string, sentiment: SurveySentiment) => {
    setAnswers(prev => [
      ...prev.filter(a => !(a.countryId === countryId && a.dishName === dishName)),
      { countryId, dishName, sentiment, answeredAt: new Date().toISOString() },
    ]);
  };

  const getAnswer = (countryId: string, dishName: string): SurveyAnswer | undefined =>
    answers.find(a => a.countryId === countryId && a.dishName === dishName);

  // Answers that carry taste signal (everything except skips)
  const ratedAnswers = useMemo(() => answers.filter(a => a.sentiment !== 'skip'), [answers]);

  return { answers, ratedAnswers, setAnswer, getAnswer };
}
