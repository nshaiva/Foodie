import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { reconcileSurveyDishes, syncAnswersFromRatings } from '../utils/surveyDishes';
import { migrateFavoritesToDishes, takeLegacyFavorites } from '../utils/favoritesMigration';
import type { UserDish } from '../data/types';
import type { SurveyAnswer } from './useTasteSurvey';

/**
 * Keeps survey answers and logged dishes telling one story (#34): a Love, Like
 * or Nope answer is a tried dish, and a star rating updates the answer. Runs on
 * load and after every change to either key — including a cloud pull — and is
 * idempotent, keyed on (countryId, dish name), so it never duplicates a dish.
 * Also drains the retired `foodie-favorites` key into tried dishes first (#40).
 */
export function useSurveyDishSync() {
  const [dishes, setDishes] = useLocalStorage<UserDish[]>('foodie-dishes', []);
  const [answers, setAnswers] = useLocalStorage<SurveyAnswer[]>('foodie-taste-survey', []);

  useEffect(() => {
    // Functional updates so overlapping effect runs compose instead of one
    // clobbering the other; the legacy key is taken exactly once.
    const legacy = takeLegacyFavorites();
    setDishes(prev => {
      const migrated = legacy ? migrateFavoritesToDishes(prev, legacy) : prev;
      return reconcileSurveyDishes(migrated, answers);
    });
    setAnswers(prev => syncAnswersFromRatings(prev, dishes));
  }, [dishes, answers, setDishes, setAnswers]);
}
