import { Link } from 'react-router-dom';
import type { Country } from '../data/types';

interface CountryCardProps {
  country: Country;
}

const continentColors: Record<string, string> = {
  'Africa': 'bg-amber-100 text-amber-800',
  'Asia': 'bg-rose-100 text-rose-800',
  'Europe': 'bg-blue-100 text-blue-800',
  'North America': 'bg-emerald-100 text-emerald-800',
  'South America': 'bg-purple-100 text-purple-800',
  'Oceania': 'bg-cyan-100 text-cyan-800',
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
          <span className={`text-xs px-2 py-1 rounded-full ${continentColors[country.continent] || 'bg-gray-100 text-gray-800'}`}>
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
