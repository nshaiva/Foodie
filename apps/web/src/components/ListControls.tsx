import type { ReactNode } from 'react';
import type { Continent } from '../data/types';
import { getCountryName, getCountryContinent } from '../data/countryHelpers';

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Tailwind focus-ring color class, e.g. "focus:ring-herb". */
  ringClass: string;
  children: ReactNode;
}

/** A labeled <select> used for the list filter/sort controls. */
export function FilterSelect({ id, label, value, onChange, ringClass, children }: FilterSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${ringClass}`}
      >
        {children}
      </select>
    </div>
  );
}

interface ListControlsProps {
  continents: Continent[];
  countryIds: string[];
  filterContinent: string;
  onContinentChange: (value: string) => void;
  filterCountry: string;
  onCountryChange: (value: string) => void;
  ringClass: string;
  /** Page-specific controls (sort, and any extra filters) rendered after the country select. */
  children?: ReactNode;
}

/** Region + Country filter selects shared by the Dishes, Restaurants, and Wishlist pages. */
export function ListControls({
  continents,
  countryIds,
  filterContinent,
  onContinentChange,
  filterCountry,
  onCountryChange,
  ringClass,
  children,
}: ListControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <FilterSelect
        id="filterContinent"
        label="Region"
        value={filterContinent}
        onChange={onContinentChange}
        ringClass={ringClass}
      >
        <option value="all">All Regions</option>
        {continents.map(continent => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        id="filterCountry"
        label="Country"
        value={filterCountry}
        onChange={onCountryChange}
        ringClass={ringClass}
      >
        <option value="all">All Countries</option>
        {countryIds
          .filter(id => filterContinent === 'all' || getCountryContinent(id) === filterContinent)
          .sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)))
          .map(countryId => (
            <option key={countryId} value={countryId}>
              {getCountryName(countryId)}
            </option>
          ))}
      </FilterSelect>

      {children}
    </div>
  );
}
