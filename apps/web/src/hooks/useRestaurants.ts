import { useLocalStorage } from './useLocalStorage';
import type { Restaurant, RestaurantVisit } from '../data/types';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useLocalStorage<Restaurant[]>('foodie-restaurants', []);

  const addRestaurant = (restaurant: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt' | 'visits'> & { dateVisited?: string }) => {
    const now = new Date().toISOString();
    const visits: RestaurantVisit[] = restaurant.dateVisited
      ? [{ id: crypto.randomUUID(), date: restaurant.dateVisited, notes: undefined }]
      : [];

    const newRestaurant: Restaurant = {
      countryId: restaurant.countryId,
      region: restaurant.region,
      name: restaurant.name,
      googleMapsLink: restaurant.googleMapsLink,
      rating: restaurant.rating,
      notes: restaurant.notes,
      visits,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setRestaurants(prev => [...prev, newRestaurant]);
    return newRestaurant;
  };

  const updateRestaurant = (id: string, updates: Partial<Omit<Restaurant, 'id' | 'createdAt' | 'visits'>>) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, ...updates, updatedAt: new Date().toISOString() }
          : r
      )
    );
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
  };

  const getRestaurantsByCountry = (countryId: string) => {
    return restaurants.filter(r => r.countryId === countryId);
  };

  const addVisit = (restaurantId: string, date: string, notes?: string) => {
    const newVisit: RestaurantVisit = {
      id: crypto.randomUUID(),
      date,
      notes,
    };
    setRestaurants(prev =>
      prev.map(r =>
        r.id === restaurantId
          ? { ...r, visits: [...(r.visits || []), newVisit], updatedAt: new Date().toISOString() }
          : r
      )
    );
    return newVisit;
  };

  const updateVisit = (restaurantId: string, visitId: string, updates: Partial<Omit<RestaurantVisit, 'id'>>) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === restaurantId
          ? {
              ...r,
              visits: (r.visits || []).map(v =>
                v.id === visitId ? { ...v, ...updates } : v
              ),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const deleteVisit = (restaurantId: string, visitId: string) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === restaurantId
          ? {
              ...r,
              visits: (r.visits || []).filter(v => v.id !== visitId),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  return {
    restaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsByCountry,
    addVisit,
    updateVisit,
    deleteVisit,
  };
}
