import { useNavigate } from 'react-router-dom';
import type { Country, ColorPalette } from '../../../data/types';
import { countries } from '../../../data/countries';
import { getSimilarCuisines } from '../../../utils/cuisineSimilarity';

interface SimilarCuisinesSectionProps {
  country: Country;
  colors: ColorPalette;
}

export function SimilarCuisinesSection({ country, colors }: SimilarCuisinesSectionProps) {
  const navigate = useNavigate();
  const similarCuisines = getSimilarCuisines(country, countries, 3);

  if (similarCuisines.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        Similar Cuisines
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {similarCuisines.map(({ country: similarCountry, score, reasons }) => (
          <button
            key={similarCountry.id}
            onClick={() => navigate(`/country/${similarCountry.id}`)}
            className="group text-left p-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-sm font-medium"
                style={{ color: colors.text }}
              >
                {similarCountry.name}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {score}% match
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {reasons.map((reason, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                >
                  {reason}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
