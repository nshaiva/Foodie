import { useLocalStorage } from './useLocalStorage';
import type { UserDish, RestaurantTry, CookingAttempt } from '../data/types';
import { useEffect, useRef } from 'react';

interface DishRestaurantLinkData {
  id: string;
  dishId: string;
  restaurantId: string;
  notes?: string;
  createdAt: string;
}

const SCHEMA_VERSION_KEY = 'foodie-dishes-schema-version';
const CURRENT_SCHEMA_VERSION = 2;

export function useDishes() {
  const [dishes, setDishes] = useLocalStorage<UserDish[]>('foodie-dishes', []);
  const [dishLinks, setDishLinks] = useLocalStorage<DishRestaurantLinkData[]>('foodie-dish-links', []);
  const migrationRan = useRef(false);

  // Migration: convert legacy dishLinks to restaurantTries
  useEffect(() => {
    if (migrationRan.current) return;

    const storedVersion = localStorage.getItem(SCHEMA_VERSION_KEY);
    const currentVersion = storedVersion ? parseInt(storedVersion, 10) : 1;

    if (currentVersion < CURRENT_SCHEMA_VERSION && dishLinks.length > 0) {
      migrationRan.current = true;

      // Build a map of dishId -> links
      const linksByDish = new Map<string, DishRestaurantLinkData[]>();
      dishLinks.forEach(link => {
        const existing = linksByDish.get(link.dishId) || [];
        existing.push(link);
        linksByDish.set(link.dishId, existing);
      });

      // Migrate dishes that have links
      const migratedDishes = dishes.map(dish => {
        const links = linksByDish.get(dish.id);
        if (!links || links.length === 0) {
          // No links, just ensure arrays exist
          return {
            ...dish,
            restaurantTries: dish.restaurantTries || [],
            cookingAttempts: dish.cookingAttempts || [],
          };
        }

        // Convert links to restaurantTries
        const newTries: RestaurantTry[] = links.map(link => ({
          id: crypto.randomUUID(),
          restaurantId: link.restaurantId,
          date: link.createdAt,
          notes: link.notes,
        }));

        return {
          ...dish,
          restaurantTries: [...(dish.restaurantTries || []), ...newTries],
          cookingAttempts: dish.cookingAttempts || [],
          updatedAt: new Date().toISOString(),
        };
      });

      setDishes(migratedDishes);
      setDishLinks([]); // Clear legacy links
      localStorage.setItem(SCHEMA_VERSION_KEY, CURRENT_SCHEMA_VERSION.toString());
    } else if (!storedVersion) {
      // First time running v2, just set the version
      localStorage.setItem(SCHEMA_VERSION_KEY, CURRENT_SCHEMA_VERSION.toString());
    }
  }, [dishes, dishLinks, setDishes, setDishLinks]);

  const addDish = (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDish: UserDish = {
      ...dish,
      id: crypto.randomUUID(),
      restaurantTries: dish.restaurantTries || [],
      cookingAttempts: dish.cookingAttempts || [],
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
    setDishLinks(prev => prev.filter(link => link.dishId !== id));
  };

  const getDishesByCountry = (countryId: string) => {
    return dishes.filter(d => d.countryId === countryId);
  };

  // Restaurant Try CRUD
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

  // Cooking Attempt CRUD
  const addCookingAttempt = (dishId: string, data: Omit<CookingAttempt, 'id'>) => {
    const newAttempt: CookingAttempt = {
      ...data,
      id: crypto.randomUUID(),
    };
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              cookingAttempts: [...(d.cookingAttempts || []), newAttempt],
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
    return newAttempt;
  };

  const updateCookingAttempt = (dishId: string, attemptId: string, updates: Partial<Omit<CookingAttempt, 'id'>>) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              cookingAttempts: (d.cookingAttempts || []).map(a =>
                a.id === attemptId ? { ...a, ...updates } : a
              ),
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
  };

  const deleteCookingAttempt = (dishId: string, attemptId: string) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === dishId
          ? {
              ...d,
              cookingAttempts: (d.cookingAttempts || []).filter(a => a.id !== attemptId),
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
  };

  // Legacy methods for backward compatibility during transition
  const linkDishToRestaurant = (dishId: string, restaurantId: string, notes?: string) => {
    // Now just adds a restaurant try
    return addRestaurantTry(dishId, {
      restaurantId,
      date: new Date().toISOString(),
      notes,
    });
  };

  const unlinkDishFromRestaurant = (dishId: string, restaurantId: string) => {
    // Find and remove the try with this restaurantId
    const dish = dishes.find(d => d.id === dishId);
    const tryToDelete = dish?.restaurantTries?.find(t => t.restaurantId === restaurantId);
    if (tryToDelete) {
      deleteRestaurantTry(dishId, tryToDelete.id);
    }
  };

  const getRestaurantLinksForDish = (dishId: string) => {
    // Return restaurant tries in legacy format for backward compatibility
    const dish = dishes.find(d => d.id === dishId);
    return (dish?.restaurantTries || [])
      .filter(t => t.restaurantId)
      .map(t => ({
        id: t.id,
        dishId,
        restaurantId: t.restaurantId!,
        notes: t.notes,
        createdAt: t.date,
      }));
  };

  const getDishLinksForRestaurant = (restaurantId: string) => {
    // Search all dishes for tries at this restaurant
    const results: { id: string; dishId: string; restaurantId: string; notes?: string; createdAt: string }[] = [];
    dishes.forEach(dish => {
      (dish.restaurantTries || [])
        .filter(t => t.restaurantId === restaurantId)
        .forEach(t => {
          results.push({
            id: t.id,
            dishId: dish.id,
            restaurantId: t.restaurantId!,
            notes: t.notes,
            createdAt: t.date,
          });
        });
    });
    return results;
  };

  return {
    dishes,
    dishLinks: [], // Legacy, now always empty after migration
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    // Restaurant Try methods
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
    // Cooking Attempt methods
    addCookingAttempt,
    updateCookingAttempt,
    deleteCookingAttempt,
    // Legacy methods (for backward compatibility)
    linkDishToRestaurant,
    unlinkDishFromRestaurant,
    getRestaurantLinksForDish,
    getDishLinksForRestaurant,
  };
}
