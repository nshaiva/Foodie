import { useState } from 'react';
import { WantToTryButton } from '../../WantToTryButton';
import { FavoriteButton } from '../../FavoriteButton';
import { systemColors } from '../../../data/systemColors';
import type { Dish, RegionalCuisine, ColorPalette } from '../../../data/types';

interface DishesSlideProps {
  popularDishes: Dish[];
  regionalVariations?: RegionalCuisine[];
  colors: ColorPalette;
  countryId: string;
  isOnWishlist: (countryId: string, dishName: string) => boolean;
  isFavorite: (countryId: string, dishName: string) => boolean;
  addToWishlist: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromWishlist: (id: string) => void;
  findWishlistItem: (countryId: string, dishName: string) => { id: string } | undefined;
  addToFavorites: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromFavorites: (id: string) => void;
  findFavoriteItem: (countryId: string, dishName: string) => { id: string } | undefined;
}

// Helper to detect region from dish name by matching against regional signature dishes
function detectRegionForDish(
  dish: Dish,
  regionalVariations?: RegionalCuisine[]
): string | undefined {
  if (dish.regionalOrigin) {
    return dish.regionalOrigin;
  }

  if (!regionalVariations || regionalVariations.length === 0) {
    return undefined;
  }

  const dishNameLower = dish.name.toLowerCase();
  for (const region of regionalVariations) {
    for (const signatureDish of region.signatureDishes) {
      const signatureLower = signatureDish.toLowerCase();
      if (
        dishNameLower.includes(signatureLower) ||
        signatureLower.includes(dishNameLower)
      ) {
        return region.name;
      }
    }
  }

  return undefined;
}

// Get a shortened region name for display
function getShortRegionName(regionName: string): string {
  if (regionName.includes('(')) {
    return regionName.split('(')[0].trim();
  }
  if (regionName.includes(' & ')) {
    const parts = regionName.split(' & ');
    return parts[0];
  }
  return regionName;
}

export function DishesSlide({
  popularDishes,
  regionalVariations,
  colors,
  countryId,
  isOnWishlist,
  isFavorite,
  addToWishlist,
  removeFromWishlist,
  findWishlistItem,
  addToFavorites,
  removeFromFavorites,
  findFavoriteItem,
}: DishesSlideProps) {
  const [expandedDishes, setExpandedDishes] = useState<Set<string>>(new Set());

  const toggleExpanded = (dishName: string) => {
    setExpandedDishes(prev => {
      const next = new Set(prev);
      if (next.has(dishName)) {
        next.delete(dishName);
      } else {
        next.add(dishName);
      }
      return next;
    });
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: colors.text }}
      >
        Popular Dishes
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 flex-1 overflow-y-auto">
        {popularDishes.map((dish) => {
          const detectedRegion = detectRegionForDish(dish, regionalVariations);
          const isExpanded = expandedDishes.has(dish.name);

          return (
            <div key={dish.name}>
              {/* Collapsed row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(dish.name)}
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

                {/* Dish name */}
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900">{dish.name}</span>
                  {dish.englishName && (
                    <span className="text-gray-400 text-sm ml-2">({dish.englishName})</span>
                  )}
                </div>

                {/* Tags */}
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  {dish.keyTraits?.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${colors.secondary}20`,
                        color: colors.secondary,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                  {detectedRegion && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      {getShortRegionName(detectedRegion)}
                    </span>
                  )}
                  {dish.spiceLevel && dish.spiceLevel !== 'none' && (
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      dish.spiceLevel === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                      dish.spiceLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                      dish.spiceLevel === 'hot' ? 'bg-red-100 text-red-800' :
                      'bg-red-200 text-red-900'
                    }`}>
                      {dish.spiceLevel === 'very-hot' ? 'Very Hot' : dish.spiceLevel.charAt(0).toUpperCase() + dish.spiceLevel.slice(1)}
                    </span>
                  )}
                  {dish.isStreetFood && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street</span>
                  )}
                </div>

                {/* Favorite & Want to Try buttons */}
                <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <FavoriteButton
                    isFavorite={isFavorite(countryId, dish.name)}
                    onAdd={() => addToFavorites({
                      countryId,
                      dishName: dish.name,
                      englishName: dish.englishName,
                    })}
                    onRemove={() => {
                      const item = findFavoriteItem(countryId, dish.name);
                      if (item) removeFromFavorites(item.id);
                    }}
                    compact
                  />
                  <WantToTryButton
                    isOnWishlist={isOnWishlist(countryId, dish.name)}
                    onAdd={() => addToWishlist({
                      countryId,
                      dishName: dish.name,
                      englishName: dish.englishName,
                    })}
                    onRemove={() => {
                      const item = findWishlistItem(countryId, dish.name);
                      if (item) removeFromWishlist(item.id);
                    }}
                    compact
                  />
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 pl-11 bg-gray-50">
                  <p className="text-gray-600 text-sm mb-3">{dish.description}</p>

                  {/* Mobile tags (shown on expand) */}
                  <div className="flex flex-wrap gap-1.5 sm:hidden mb-3">
                    {dish.keyTraits?.map((trait) => (
                      <span
                        key={trait}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${colors.secondary}20`,
                          color: colors.secondary,
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                    {detectedRegion && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                        }}
                      >
                        {getShortRegionName(detectedRegion)}
                      </span>
                    )}
                    {dish.spiceLevel && dish.spiceLevel !== 'none' && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        dish.spiceLevel === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                        dish.spiceLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                        dish.spiceLevel === 'hot' ? 'bg-red-100 text-red-800' :
                        'bg-red-200 text-red-900'
                      }`}>
                        {dish.spiceLevel === 'very-hot' ? 'Very Hot' : dish.spiceLevel.charAt(0).toUpperCase() + dish.spiceLevel.slice(1)}
                      </span>
                    )}
                    {dish.isStreetFood && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street Food</span>
                    )}
                  </div>

                  {/* Category and dietary info */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded capitalize">
                      {dish.category}
                    </span>
                    {dish.dietary?.isVegan && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegan</span>
                    )}
                    {dish.dietary?.isVegetarian && !dish.dietary?.isVegan && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegetarian</span>
                    )}
                    {dish.dietary?.isVegetarianFriendly && !dish.dietary?.isVegetarian && !dish.dietary?.isVegan && (
                      <span className="text-xs bg-lime-100 text-lime-800 px-2 py-0.5 rounded">Veg-Friendly</span>
                    )}
                    {dish.dietary?.isGlutenFree && (
                      <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">GF</span>
                    )}
                    {dish.dietary?.isDairyFree && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">DF</span>
                    )}
                    {dish.dietary?.isHalal && (
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Halal</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
