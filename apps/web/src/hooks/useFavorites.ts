import { useLocalStorage } from './useLocalStorage';
import type { FavoriteItem } from '../data/types';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('foodie-favorites', []);

  const addToFavorites = (item: Omit<FavoriteItem, 'id' | 'createdAt'>) => {
    // Prevent duplicates
    if (isFavorite(item.countryId, item.dishName)) {
      return null;
    }

    const newItem: FavoriteItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setFavorites(prev => [...prev, newItem]);
    return newItem;
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const getFavoritesByCountry = (countryId: string) => {
    return favorites.filter(item => item.countryId === countryId);
  };

  const isFavorite = (countryId: string, dishName: string) => {
    return favorites.some(
      item => item.countryId === countryId && item.dishName === dishName
    );
  };

  const findFavoriteItem = (countryId: string, dishName: string) => {
    return favorites.find(
      item => item.countryId === countryId && item.dishName === dishName
    );
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    getFavoritesByCountry,
    isFavorite,
    findFavoriteItem,
  };
}
