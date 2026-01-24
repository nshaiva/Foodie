import { useMemo } from 'react';
import { countries } from '../data/countries';
import type { Restaurant, UserDish } from '../data/types';

export type ActivityState = 'noProfile' | 'hasProfile' | 'hasRestaurants' | 'hasBoth';

export interface CountryActivity {
  countryId: string;
  state: ActivityState;
  restaurantCount: number;
  dishCount: number;
}

export function useCountryActivity(restaurants: Restaurant[], dishes: UserDish[]) {
  const profiledCountryIds = useMemo(
    () => new Set(countries.map((c) => c.id)),
    []
  );

  const restaurantsByCountry = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of restaurants) {
      map.set(r.countryId, (map.get(r.countryId) || 0) + 1);
    }
    return map;
  }, [restaurants]);

  const dishesByCountry = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of dishes) {
      map.set(d.countryId, (map.get(d.countryId) || 0) + 1);
    }
    return map;
  }, [dishes]);

  const getActivityState = useMemo(() => {
    return (countryId: string): ActivityState => {
      const hasProfile = profiledCountryIds.has(countryId);
      const hasRestaurants = (restaurantsByCountry.get(countryId) || 0) > 0;
      const hasDishes = (dishesByCountry.get(countryId) || 0) > 0;

      if (!hasProfile) return 'noProfile';
      if (hasRestaurants && hasDishes) return 'hasBoth';
      if (hasRestaurants) return 'hasRestaurants';
      return 'hasProfile';
    };
  }, [profiledCountryIds, restaurantsByCountry, dishesByCountry]);

  const getCountryActivity = useMemo(() => {
    return (countryId: string): CountryActivity => ({
      countryId,
      state: getActivityState(countryId),
      restaurantCount: restaurantsByCountry.get(countryId) || 0,
      dishCount: dishesByCountry.get(countryId) || 0,
    });
  }, [getActivityState, restaurantsByCountry, dishesByCountry]);

  return {
    getActivityState,
    getCountryActivity,
    profiledCountryIds,
  };
}
