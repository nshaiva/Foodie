import { countries } from '../data/countries';
import { dishVerdictRating } from './ratings';
import type { UserDish } from '../data/types';
import type { SurveyAnswer, SurveySentiment } from '../hooks/useTasteSurvey';

/** A sentiment that means "I've eaten this" (everything but "haven't tried"). */
export function isTriedSentiment(sentiment: SurveySentiment): boolean {
  return sentiment !== 'skip';
}

/** A popular dish's name and English name, lowercased; just `dishName` otherwise. */
function namesFor(countryId: string, dishName: string): Set<string> {
  const lower = dishName.toLowerCase();
  const names = new Set([lower]);
  const dish = countries
    .find(c => c.id === countryId)
    ?.popularDishes.find(d => d.name.toLowerCase() === lower || d.englishName?.toLowerCase() === lower);
  if (dish) {
    names.add(dish.name.toLowerCase());
    if (dish.englishName) names.add(dish.englishName.toLowerCase());
  }
  return names;
}

/**
 * The logged dish a survey answer refers to: same country, and the name or
 * English name of the survey's dish. A (countryId, dishName) pair names at most
 * one survey question, so this is the key everything reconciles on.
 */
export function findDishForAnswer(
  dishes: UserDish[],
  countryId: string,
  dishName: string
): UserDish | undefined {
  const names = namesFor(countryId, dishName);
  return dishes.find(d => d.countryId === countryId && names.has(d.name.toLowerCase()));
}

/** The survey answer a logged dish corresponds to, if any. */
export function findAnswerForDish(answers: SurveyAnswer[], dish: UserDish): SurveyAnswer | undefined {
  return answers.find(
    a => a.countryId === dish.countryId && namesFor(a.countryId, a.dishName).has(dish.name.toLowerCase())
  );
}

/** Nothing added beyond what the survey created: no rating, tries or notes. */
export function isUntouchedSurveyDish(dish: UserDish): boolean {
  return (
    dish.source === 'survey' &&
    !dish.tasteRating &&
    !dish.notes &&
    (dish.restaurantTries?.length ?? 0) === 0
  );
}

/** Survey sentiment implied by a star verdict: 5★ love, 3–4★ like, 1–2★ nope. */
export function sentimentForRating(rating: number): Exclude<SurveySentiment, 'skip'> {
  const stars = Math.round(rating);
  if (stars >= 5) return 'love';
  if (stars >= 3) return 'like';
  return 'nope';
}

/**
 * Bring `foodie-dishes` in line with the survey. Every tried answer has a
 * logged dish (created with `source: 'survey'` and no rating); a survey-created
 * dish whose answer is gone or "haven't tried" is removed unless the user has
 * added to it. Returns the input array itself when nothing changes, so running
 * it on every load is a no-op once reconciled.
 */
export function reconcileSurveyDishes(
  dishes: UserDish[],
  answers: SurveyAnswer[],
  now: string = new Date().toISOString()
): UserDish[] {
  const kept = dishes.filter(d => {
    if (!isUntouchedSurveyDish(d)) return true;
    const answer = findAnswerForDish(answers, d);
    return !!answer && isTriedSentiment(answer.sentiment);
  });

  const added: UserDish[] = [];
  answers.forEach(a => {
    if (!isTriedSentiment(a.sentiment)) return;
    if (findDishForAnswer(kept, a.countryId, a.dishName)) return;
    if (findDishForAnswer(added, a.countryId, a.dishName)) return;
    added.push({
      id: crypto.randomUUID(),
      countryId: a.countryId,
      name: a.dishName,
      source: 'survey',
      restaurantTries: [],
      createdAt: a.answeredAt || now,
      updatedAt: now,
    });
  });

  if (added.length === 0 && kept.length === dishes.length) return dishes;
  return [...kept, ...added];
}

/**
 * Keep answers consistent with star ratings: when a rated dish was edited after
 * its answer was given, the answer follows the verdict. An answer changed after
 * the rating stands until the dish is edited again — the later edit wins. Only
 * existing answers are touched. Returns the input array itself when nothing
 * changes.
 */
export function syncAnswersFromRatings(
  answers: SurveyAnswer[],
  dishes: UserDish[],
  now: string = new Date().toISOString()
): SurveyAnswer[] {
  let changed = false;
  const next = answers.map(a => {
    const dish = findDishForAnswer(dishes, a.countryId, a.dishName);
    if (!dish || dish.updatedAt <= a.answeredAt) return a;
    const verdict = dishVerdictRating(dish);
    if (verdict === undefined) return a;
    const sentiment = sentimentForRating(verdict);
    if (sentiment === a.sentiment) return a;
    changed = true;
    return { ...a, sentiment, answeredAt: now };
  });
  return changed ? next : answers;
}
