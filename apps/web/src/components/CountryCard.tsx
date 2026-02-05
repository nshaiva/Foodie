import { Link } from 'react-router-dom';
import type { Country } from '../data/types';
import { systemColors } from '../data/systemColors';

interface CountryCardProps {
  country: Country;
}

// Using system colors for continent badges
const continentColors: Record<string, { bg: string; text: string }> = {
  'Africa': { bg: systemColors.saffronLight, text: systemColors.navy },
  'Asia': { bg: systemColors.tomatoLight, text: systemColors.navy },
  'Europe': { bg: `${systemColors.navy}15`, text: systemColors.navy },
  'North America': { bg: systemColors.herbLight, text: systemColors.navy },
  'South America': { bg: `${systemColors.tomato}20`, text: systemColors.navy },
  'Oceania': { bg: `${systemColors.herb}20`, text: systemColors.navy },
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      to={`/country/${country.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: continentColors[country.continent]?.bg || '#f3f4f6',
              color: continentColors[country.continent]?.text || systemColors.navy
            }}
          >
            {country.continent}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {country.capital} · {country.region}
        </p>

        <p className="text-sm text-gray-700 line-clamp-2 mb-4">
          {country.cuisineProfile.summary}
        </p>

        <div className="flex flex-wrap gap-1">
          {country.cuisineProfile.flavorProfile.slice(0, 3).map((flavor) => (
            <span
              key={flavor}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {flavor.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
