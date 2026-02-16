import { useState } from 'react';
import { systemColors } from '../../../data/systemColors';
import type { Beverage, ColorPalette } from '../../../data/types';

interface BeveragesSlideProps {
  beverages: Beverage[];
  colors: ColorPalette;
  countryId: string;
}

export function BeveragesSlide({
  beverages,
  colors,
}: BeveragesSlideProps) {
  const [expandedBeverages, setExpandedBeverages] = useState<Set<string>>(new Set());

  const toggleExpanded = (beverageName: string) => {
    setExpandedBeverages(prev => {
      const next = new Set(prev);
      if (next.has(beverageName)) {
        next.delete(beverageName);
      } else {
        next.add(beverageName);
      }
      return next;
    });
  };

  const getTypeColor = (type: Beverage['type']) => {
    switch (type) {
      case 'alcoholic':
        return 'bg-purple-100 text-purple-800';
      case 'non-alcoholic':
        return 'bg-green-100 text-green-800';
      case 'both':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeLabel = (type: Beverage['type']) => {
    switch (type) {
      case 'alcoholic':
        return 'Alcoholic';
      case 'non-alcoholic':
        return 'Non-Alcoholic';
      case 'both':
        return 'Optional Alcohol';
    }
  };

  const getServedLabel = (served: Beverage['servedHow']) => {
    switch (served) {
      case 'hot':
        return 'Served Hot';
      case 'cold':
        return 'Served Cold';
      case 'iced':
        return 'Served Iced';
      case 'room temperature':
        return 'Room Temp';
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: Beverage['category']) => {
    if (!category) return null;
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: colors.text }}
      >
        Traditional Beverages
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 flex-1 overflow-y-auto">
        {beverages.map((beverage) => {
          const isExpanded = expandedBeverages.has(beverage.name);

          return (
            <div key={beverage.name}>
              {/* Collapsed row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(beverage.name)}
              >
                {/* Expand chevron */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>

                {/* Beverage name */}
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900">{beverage.name}</span>
                  {beverage.englishName && (
                    <span className="text-gray-400 text-sm ml-2">({beverage.englishName})</span>
                  )}
                  {beverage.pronunciation && (
                    <span className="text-gray-400 text-xs ml-2 italic">[{beverage.pronunciation}]</span>
                  )}
                </div>

                {/* Tags */}
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  {/* Type: Alcoholic/Non-Alcoholic */}
                  <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(beverage.type)}`}>
                    {getTypeLabel(beverage.type)}
                  </span>
                  {/* Dietary flags */}
                  {beverage.dietary?.isGlutenFree && (
                    <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">GF</span>
                  )}
                  {beverage.dietary?.isDairyFree && (
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">DF</span>
                  )}
                  {beverage.dietary?.isVegan && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegan</span>
                  )}
                  {/* Category */}
                  {beverage.category && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {getCategoryLabel(beverage.category)}
                    </span>
                  )}
                  {/* Region */}
                  {beverage.regionalOrigin && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      {beverage.regionalOrigin}
                    </span>
                  )}
                  {/* Street drink */}
                  {beverage.isStreetDrink && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street</span>
                  )}
                  {/* Served how */}
                  {beverage.servedHow && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${colors.secondary}20`,
                        color: colors.secondary,
                      }}
                    >
                      {getServedLabel(beverage.servedHow)}
                    </span>
                  )}
                  {/* Traditional */}
                  {beverage.isTraditional && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      Traditional
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 pl-11 bg-gray-50">
                  <p className="text-gray-600 text-sm mb-3">{beverage.description}</p>

                  {/* Mobile tags (shown on expand) */}
                  <div className="flex flex-wrap gap-1.5 sm:hidden mb-3">
                    {/* Type: Alcoholic/Non-Alcoholic */}
                    <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(beverage.type)}`}>
                      {getTypeLabel(beverage.type)}
                    </span>
                    {/* Dietary flags */}
                    {beverage.dietary?.isGlutenFree && (
                      <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">GF</span>
                    )}
                    {beverage.dietary?.isDairyFree && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">DF</span>
                    )}
                    {beverage.dietary?.isVegan && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegan</span>
                    )}
                    {/* Category */}
                    {beverage.category && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        {getCategoryLabel(beverage.category)}
                      </span>
                    )}
                    {/* Region */}
                    {beverage.regionalOrigin && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                        }}
                      >
                        {beverage.regionalOrigin}
                      </span>
                    )}
                    {/* Street drink */}
                    {beverage.isStreetDrink && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street</span>
                    )}
                    {/* Served how */}
                    {beverage.servedHow && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${colors.secondary}20`,
                          color: colors.secondary,
                        }}
                      >
                        {getServedLabel(beverage.servedHow)}
                      </span>
                    )}
                    {/* Traditional */}
                    {beverage.isTraditional && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                        }}
                      >
                        Traditional
                      </span>
                    )}
                  </div>

                  {/* Key ingredients */}
                  {beverage.keyIngredients && beverage.keyIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-gray-500 mr-1">Key ingredients:</span>
                      {beverage.keyIngredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
