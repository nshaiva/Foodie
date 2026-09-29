import { useLocalStorage } from './useLocalStorage';
import { findAnswerForDish, findDishForAnswer } from '../utils/surveyDishes';
import type { UserDish, RestaurantTry } from '../data/types';
import type { SurveyAnswer } from './useTasteSurvey';
import { newId } from '../utils/newId';

export function useDishes() {
  const [dishes, setDishes] = useLocalStorage<UserDish[]>('foodie-dishes', []);
  const [, setSurveyAnswers] = useLocalStorage<SurveyAnswer[]>('foodie-taste-survey', []);

  const addDish = (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();

    // Logging a dish the survey already logged adds to that entry rather than
    // creating a second one.
    const fromSurvey = findDishForAnswer(
      dishes.filter(d => d.source === 'survey'),
      dish.countryId,
      dish.name
    );
    if (fromSurvey) {
      const merged: UserDish = {
        ...fromSurvey,
        region: fromSurvey.region ?? dish.region,
        kind: fromSurvey.kind ?? dish.kind,
        notes: dish.notes ?? fromSurvey.notes,
        tasteRating: dish.tasteRating ?? fromSurvey.tasteRating,
        restaurantTries: [...(fromSurvey.restaurantTries || []), ...(dish.restaurantTries || [])],
        updatedAt: now,
      };
      setDishes(prev => prev.map(d => (d.id === fromSurvey.id ? merged : d)));
      return merged;
    }

    const newDish: UserDish = {
      ...dish,
      id: newId(),
      restaurantTries: dish.restaurantTries || [],
      createdAt: now,
      updatedAt: now,
    };
    setDishes(prev => [...prev, newDish]);
    return newDish;
  };

  const updateDish = (id: string, updates: Partial<Omit<UserDish, 'id' | 'createdAt'>>) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, ...updates, updatedAt: new Date().toISOString() }
          : d
      )
    );
  };

  // Removing a dish also clears its survey answer, which would otherwise log
  // the dish again on the next reconcile.
  const deleteDish = (id: string) => {
    const dish = dishes.find(d => d.id === id);
    setDishes(prev => prev.filter(d => d.id !== id));
    if (!dish) return;
    setSurveyAnswers(prev => {
      const answer = findAnswerForDish(prev, dish);
      return answer && answer.sentiment !== 'skip' ? prev.filter(a => a !== answer) : prev;
    });
  };

  const getDishesByCountry = (countryId: string) => {
    return dishes.filter(d => d.countryId === countryId);
  };

  // Restaurant Try CRUD — a "try" records when/where you tried a dish.
  const addRestaurantTry = (dishId: string, data: Omit<RestaurantTry, 'id'>) => {
    const newTry: RestaurantTry = {
      ...data,
      id: newId(),
    };
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              restaurantTries: [...(d.restaurantTries || []), newTry],
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
    return newTry;
  };

  const updateRestaurantTry = (dishId: string, tryId: string, updates: Partial<Omit<RestaurantTry, 'id'>>) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              restaurantTries: (d.restaurantTries || []).map(t =>
                t.id === tryId ? { ...t, ...updates } : t
              ),
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
  };

  const deleteRestaurantTry = (dishId: string, tryId: string) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              restaurantTries: (d.restaurantTries || []).filter(t => t.id !== tryId),
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
  };

  return {
    dishes,
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
  };
}
