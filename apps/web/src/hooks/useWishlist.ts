import { useLocalStorage } from './useLocalStorage';
import type { WishlistItem } from '../data/types';

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>('foodie-wishlist', []);

  const addToWishlist = (item: Omit<WishlistItem, 'id' | 'createdAt'>) => {
    // Prevent duplicates
    if (isOnWishlist(item.countryId, item.dishName)) {
      return null;
    }

    const newItem: WishlistItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setWishlist(prev => [...prev, newItem]);
    return newItem;
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const getWishlistByCountry = (countryId: string) => {
    return wishlist.filter(item => item.countryId === countryId);
  };

  const isOnWishlist = (countryId: string, dishName: string) => {
    return wishlist.some(
      item => item.countryId === countryId && item.dishName === dishName
    );
  };

  const findWishlistItem = (countryId: string, dishName: string) => {
    return wishlist.find(
      item => item.countryId === countryId && item.dishName === dishName
    );
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    getWishlistByCountry,
    isOnWishlist,
    findWishlistItem,
  };
}
