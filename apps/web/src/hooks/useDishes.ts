import { useLocalStorage } from './useLocalStorage';
import type { UserDish } from '../data/types';

interface DishRestaurantLinkData {
  id: string;
  dishId: string;
  restaurantId: string;
  notes?: string;
  createdAt: string;
}

export function useDishes() {
  const [dishes, setDishes] = useLocalStorage<UserDish[]>('foodie-dishes', []);
  const [dishLinks, setDishLinks] = useLocalStorage<DishRestaurantLinkData[]>('foodie-dish-links', []);

  const addDish = (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDish: UserDish = {
      ...dish,
      id: crypto.randomUUID(),
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

  const linkDishToRestaurant = (dishId: string, restaurantId: string, notes?: string) => {
    const now = new Date().toISOString();
    const newLink: DishRestaurantLinkData = {
      id: crypto.randomUUID(),
      dishId,
      restaurantId,
      notes,
      createdAt: now,
    };
    setDishLinks(prev => [...prev, newLink]);
    return newLink;
  };

  const unlinkDishFromRestaurant = (dishId: string, restaurantId: string) => {
    setDishLinks(prev => prev.filter(link => !(link.dishId === dishId && link.restaurantId === restaurantId)));
  };

  const getRestaurantLinksForDish = (dishId: string) => {
    return dishLinks.filter(link => link.dishId === dishId);
  };

  const getDishLinksForRestaurant = (restaurantId: string) => {
    return dishLinks.filter(link => link.restaurantId === restaurantId);
  };

  return {
    dishes,
    dishLinks,
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    linkDishToRestaurant,
    unlinkDishFromRestaurant,
    getRestaurantLinksForDish,
    getDishLinksForRestaurant,
  };
}
