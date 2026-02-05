import { Link } from 'react-router-dom';
import { useCuisinePreferences } from '../hooks/useCuisinePreferences';
import type { CuisinePreference } from '../hooks/useCuisinePreferences';
import { systemColors } from '../data/systemColors';

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <span style={{ color: systemColors.saffron }}>
      {'★'.repeat(fullStars)}
      {hasHalf && '½'}
      {'☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0))}
    </span>
  );
}

function CuisineList({ cuisines, color }: { cuisines: CuisinePreference[]; color: 'saffron' | 'herb' }) {
  const colorStyles = {
    saffron: {
      first: { backgroundColor: systemColors.saffronLight, color: systemColors.navy },
      second: { backgroundColor: '#f3f4f6', color: '#4b5563' },
      third: { backgroundColor: `${systemColors.saffron}30`, color: systemColors.navy },
      rest: { backgroundColor: '#f9fafb', color: '#6b7280' },
    },
    herb: {
      first: { backgroundColor: systemColors.herbLight, color: systemColors.navy },
      second: { backgroundColor: '#f3f4f6', color: '#4b5563' },
      third: { backgroundColor: `${systemColors.herb}30`, color: systemColors.navy },
      rest: { backgroundColor: '#f9fafb', color: '#6b7280' },
    },
  };

  const getStyle = (index: number) => {
    if (index === 0) return colorStyles[color].first;
    if (index === 1) return colorStyles[color].second;
    if (index === 2) return colorStyles[color].third;
    return colorStyles[color].rest;
  };

  return (
    <div className="space-y-2">
      {cuisines.slice(0, 5).map((cuisine, index) => (
        <div key={cuisine.countryId} className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
            style={getStyle(index)}
          >
            {index + 1}
          </span>

          <div className="flex-1 min-w-0">
            <Link
              to={`/country/${cuisine.countryId}`}
              className="text-sm font-medium text-gray-900 transition-colors"
              style={{ '--hover-color': systemColors.herb } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.herb)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
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
            <span style={{ color: systemColors.saffron }}>★</span>
            Favorite to Eat
          </h3>
          <CuisineList cuisines={rankedEatingCuisines} color="saffron" />
        </div>
      )}

      {/* Favorite to Cook */}
      {rankedCookingCuisines.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: systemColors.herb }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Favorite to Cook
          </h3>
          <CuisineList cuisines={rankedCookingCuisines} color="herb" />
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
