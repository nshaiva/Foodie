import { getCountryById } from './countries';

/**
 * Shared, pure helpers for looking up static country data by id.
 * Used across the Dishes, Restaurants, and Wishlist pages.
 */

export function getCountryName(countryId: string): string {
  return getCountryById(countryId)?.name || countryId;
}

export function getCountryContinent(countryId: string) {
  return getCountryById(countryId)?.continent;
}

export function getRegionsForCountry(countryId: string): string[] {
  return getCountryById(countryId)?.regionalVariations?.map(r => r.name) || [];
}
