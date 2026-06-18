import { useMemo } from 'react';
import { countries } from '../data/countries';
import type { UserDish } from '../data/types';

export type ActivityState = 'noProfile' | 'hasProfile' | 'hasDishes';

export interface CountryActivity {
  countryId: string;
  state: ActivityState;
  dishCount: number;
}

export function useCountryActivity(dishes: UserDish[]) {
  const profiledCountryIds = useMemo(
    () => new Set(countries.map((c) => c.id)),
    []
  );

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
      const hasDishes = (dishesByCountry.get(countryId) || 0) > 0;

      if (!hasProfile) return 'noProfile';
      if (hasDishes) return 'hasDishes';
      return 'hasProfile';
    };
  }, [profiledCountryIds, dishesByCountry]);

  const getCountryActivity = useMemo(() => {
    return (countryId: string): CountryActivity => ({
      countryId,
      state: getActivityState(countryId),
      dishCount: dishesByCountry.get(countryId) || 0,
    });
  }, [getActivityState, dishesByCountry]);

  return {
    getActivityState,
    getCountryActivity,
    profiledCountryIds,
  };
}
