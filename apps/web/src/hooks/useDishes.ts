import { useLocalStorage } from './useLocalStorage';
import type { UserDish, RestaurantTry } from '../data/types';

export function useDishes() {
  const [dishes, setDishes] = useLocalStorage<UserDish[]>('foodie-dishes', []);

  const addDish = (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDish: UserDish = {
      ...dish,
      id: crypto.randomUUID(),
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

  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  const getDishesByCountry = (countryId: string) => {
    return dishes.filter(d => d.countryId === countryId);
  };

  // Restaurant Try CRUD — a "try" records when/where you tried a dish.
  const addRestaurantTry = (dishId: string, data: Omit<RestaurantTry, 'id'>) => {
    const newTry: RestaurantTry = {
      ...data,
      id: crypto.randomUUID(),
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
