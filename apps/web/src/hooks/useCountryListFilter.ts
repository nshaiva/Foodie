import { useState } from 'react';
import { getCountryContinent } from '../data/countryHelpers';
import type { Continent } from '../data/types';

/**
 * Shared list filtering/sorting for the Dishes, Restaurants, and Wishlist pages.
 *
 * Handles the country + continent filters and the derivation of the available
 * countries/continents (the parts that were duplicated verbatim across pages).
 * Page-specific sorting is supplied via `compare`, and any additional filters
 * (e.g. min rating, visit count) via `extraFilter`.
 */
export function useCountryListFilter<T extends { countryId: string }, S extends string>(
  items: T[],
  initialSort: S,
  compare: (a: T, b: T, sortBy: S) => number,
  extraFilter?: (item: T) => boolean,
) {
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContinent, setFilterContinentState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<S>(initialSort);

  // Changing the continent resets the country filter (shared behavior across pages).
  const setFilterContinent = (continent: string) => {
    setFilterContinentState(continent);
    setFilterCountry('all');
  };

  const filteredItems = items
    .filter(item => filterCountry === 'all' || item.countryId === filterCountry)
    .filter(item => filterContinent === 'all' || getCountryContinent(item.countryId) === filterContinent)
    .filter(item => (extraFilter ? extraFilter(item) : true))
    .sort((a, b) => compare(a, b, sortBy));

  const availableCountryIds = [...new Set(items.map(item => item.countryId))];
  const availableContinents = [...new Set(
    availableCountryIds
      .map(id => getCountryContinent(id))
      .filter((c): c is Continent => c !== undefined)
  )];

  return {
    filterCountry,
    setFilterCountry,
    filterContinent,
    setFilterContinent,
    sortBy,
    setSortBy,
    filteredItems,
    availableCountryIds,
    availableContinents,
  };
}
