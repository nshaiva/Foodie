import { Link } from 'react-router-dom';
import { useCuisinePreferences } from '../hooks/useCuisinePreferences';
import type { CuisinePreference } from '../hooks/useCuisinePreferences';

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <span className="text-amber-500">
      {'★'.repeat(fullStars)}
      {hasHalf && '½'}
      {'☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0))}
    </span>
  );
}

function CuisineList({ cuisines, color }: { cuisines: CuisinePreference[]; color: 'amber' | 'violet' }) {
  const colorClasses = {
    amber: {
      first: 'bg-amber-100 text-amber-700',
      second: 'bg-gray-100 text-gray-600',
      third: 'bg-orange-100 text-orange-700',
      rest: 'bg-gray-50 text-gray-500',
    },
    violet: {
      first: 'bg-violet-100 text-violet-700',
      second: 'bg-gray-100 text-gray-600',
      third: 'bg-purple-100 text-purple-700',
      rest: 'bg-gray-50 text-gray-500',
    },
  };

  return (
    <div className="space-y-2">
      {cuisines.slice(0, 5).map((cuisine, index) => (
        <div key={cuisine.countryId} className="flex items-center gap-3">
          <span className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
            ${index === 0 ? colorClasses[color].first : ''}
            ${index === 1 ? colorClasses[color].second : ''}
            ${index === 2 ? colorClasses[color].third : ''}
            ${index > 2 ? colorClasses[color].rest : ''}
          `}>
            {index + 1}
          </span>

          <div className="flex-1 min-w-0">
            <Link
              to={`/country/${cuisine.countryId}`}
              className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors"
            >
              {cuisine.countryName}
            </Link>
            <div className="flex items-center gap-2 text-xs">
              <RatingStars rating={cuisine.avgRating} />
              <span className="text-gray-400">
                {cuisine.dishCount} dish{cuisine.dishCount !== 1 ? 'es' : ''}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CuisinePreferences() {
  const { rankedEatingCuisines, rankedCookingCuisines, unratedCuisines } = useCuisinePreferences();

  if (rankedEatingCuisines.length === 0 && rankedCookingCuisines.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Favorite to Eat */}
      {rankedEatingCuisines.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-amber-500">★</span>
            Favorite to Eat
          </h3>
          <CuisineList cuisines={rankedEatingCuisines} color="amber" />
        </div>
      )}

      {/* Favorite to Cook */}
      {rankedCookingCuisines.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Favorite to Cook
          </h3>
          <CuisineList cuisines={rankedCookingCuisines} color="violet" />
        </div>
      )}

      {/* Full width tip if only one column */}
      {unratedCuisines.length > 0 && (rankedEatingCuisines.length === 0 || rankedCookingCuisines.length === 0) && (
        <div className={`${rankedEatingCuisines.length > 0 && rankedCookingCuisines.length === 0 ? '' : 'md:col-span-2'}`}>
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <span className="font-medium">Tip:</span> Rate dishes from{' '}
            {unratedCuisines.slice(0, 2).map(c => c.countryName).join(', ')}
            {unratedCuisines.length > 2 && ` and ${unratedCuisines.length - 2} more`}
            {' '}to see them ranked!
          </p>
        </div>
      )}
    </div>
  );
}
