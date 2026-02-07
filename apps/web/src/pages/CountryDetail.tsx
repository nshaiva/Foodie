import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { useRestaurants } from '../hooks/useRestaurants';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import { RestaurantForm } from '../components/RestaurantForm';
import { DishForm } from '../components/DishForm';
import { RestaurantCard } from '../components/RestaurantCard';
import { DishCard } from '../components/DishCard';
import { WantToTryButton } from '../components/WantToTryButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { RegionalMap } from '../components/RegionalMap';
import { FlavorRadarChart } from '../components/FlavorRadarChart';
import { IngredientBubbles } from '../components/IngredientBubbles';
import type { RestaurantTry, CookingAttempt, RegionalCuisine, Dish } from '../data/types';

// Helper to detect region from dish name by matching against regional signature dishes
function detectRegionForDish(
  dish: Dish,
  regionalVariations?: RegionalCuisine[]
): string | undefined {
  // If dish already has regionalOrigin set, use that
  if (dish.regionalOrigin) {
    return dish.regionalOrigin;
  }

  // If no regional variations, can't detect
  if (!regionalVariations || regionalVariations.length === 0) {
    return undefined;
  }

  // Check each region's signature dishes for a match
  const dishNameLower = dish.name.toLowerCase();
  for (const region of regionalVariations) {
    for (const signatureDish of region.signatureDishes) {
      // Check if dish name contains the signature dish name or vice versa
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
  // Remove parenthetical descriptions and simplify
  if (regionName.includes('(')) {
    return regionName.split('(')[0].trim();
  }
  // Shorten common patterns
  if (regionName.includes(' & ')) {
    const parts = regionName.split(' & ');
    return parts[0];
  }
  return regionName;
}

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  const { addRestaurant, updateRestaurant, deleteRestaurant, getRestaurantsByCountry, findOrCreateRestaurant, addVisit, updateVisit, deleteVisit } = useRestaurants();
  const {
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
    addCookingAttempt,
    updateCookingAttempt,
    deleteCookingAttempt,
  } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();

  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);
  const [expandedDishes, setExpandedDishes] = useState<Set<string>>(new Set());

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Country not found</h1>
          <Link to="/" className="hover:underline" style={{ color: systemColors.navy }}>
            Back to all countries
          </Link>
        </div>
      </div>
    );
  }

  const countryRestaurants = getRestaurantsByCountry(country.id);
  const countryDishes = getDishesByCountry(country.id);
  const colors = country.colorPalette;

  const handleAddRestaurant = (data: Parameters<typeof addRestaurant>[0]) => {
    addRestaurant(data);
    setShowRestaurantForm(false);
  };

  const handleAddDish = (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
    initialCookingAttempt?: Omit<CookingAttempt, 'id'>;
  }) => {
    let processedTry = data.initialRestaurantTry;
    if (processedTry?.restaurantName && !processedTry.restaurantId) {
      const restaurant = findOrCreateRestaurant(data.countryId, processedTry.restaurantName, processedTry.date);
      processedTry = {
        ...processedTry,
        restaurantId: restaurant.id,
        restaurantName: undefined,
      };
    }

    const newDish = addDish({
      countryId: data.countryId,
      region: data.region,
      name: data.name,
      notes: data.notes,
      tasteRating: data.tasteRating,
      restaurantTries: processedTry ? [{ ...processedTry, id: crypto.randomUUID() }] : [],
      cookingAttempts: data.initialCookingAttempt ? [{ ...data.initialCookingAttempt, id: crypto.randomUUID() }] : [],
    });
    setShowDishForm(false);
    return newDish;
  };

  const handleAddRestaurantTry = (dishId: string, data: Omit<RestaurantTry, 'id'>) => {
    const dish = countryDishes.find(d => d.id === dishId);
    if (!dish) return;

    if (data.restaurantName && !data.restaurantId) {
      const restaurant = findOrCreateRestaurant(dish.countryId, data.restaurantName, data.date);
      addRestaurantTry(dishId, {
        ...data,
        restaurantId: restaurant.id,
        restaurantName: undefined,
      });
    } else {
      addRestaurantTry(dishId, data);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header with country colors */}
      <header
        className="border-b"
        style={{
          backgroundColor: colors.primary,
          borderColor: `${colors.primary}40`
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link
            to="/"
            className="text-sm mb-2 inline-block opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: colors.background }}
          >
            ← Back to all countries
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: colors.background }}>
            {country.name}
          </h1>
          <p className="mt-1 opacity-90" style={{ color: colors.background }}>
            {country.capital} · {country.region}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Cuisine Summary - brief intro */}
        <section>
          <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
            {country.cuisineProfile.summary}
          </p>
        </section>

        {/* My Activity: Restaurants & Dishes - 2 column layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Restaurants Column */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: systemColors.navy }} />
                My Restaurants
                {countryRestaurants.length > 0 && (
                  <span className="text-sm font-normal text-gray-500">
                    ({countryRestaurants.length})
                  </span>
                )}
              </h2>
              {!showRestaurantForm && (
                <button
                  onClick={() => setShowRestaurantForm(true)}
                  className="text-sm text-white px-3 py-1.5 rounded-md transition-colors"
                  style={{ backgroundColor: systemColors.navy }}
                >
                  + Add
                </button>
              )}
            </div>

            {showRestaurantForm && (
              <div className="mb-4">
                <RestaurantForm
                  countryId={country.id}
                  countryName={country.name}
                  regions={country.regionalVariations?.map(r => r.name)}
                  onSubmit={handleAddRestaurant}
                  onCancel={() => setShowRestaurantForm(false)}
                />
              </div>
            )}

            {countryRestaurants.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {countryRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onUpdate={updateRestaurant}
                    onDelete={deleteRestaurant}
                    onAddVisit={addVisit}
                    onUpdateVisit={updateVisit}
                    onDeleteVisit={deleteVisit}
                  />
                ))}
              </div>
            ) : (
              !showRestaurantForm && (
                <p className="text-gray-500 text-sm py-4 text-center">
                  No restaurants logged yet
                </p>
              )
            )}
          </div>

          {/* Dishes Column */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: systemColors.herb }} />
                Dishes I've Tried
                {countryDishes.length > 0 && (
                  <span className="text-sm font-normal text-gray-500">
                    ({countryDishes.length})
                  </span>
                )}
              </h2>
              {!showDishForm && (
                <button
                  onClick={() => setShowDishForm(true)}
                  className="text-sm text-white px-3 py-1.5 rounded-md transition-colors"
                  style={{ backgroundColor: systemColors.herb }}
                >
                  + Add
                </button>
              )}
            </div>

            {showDishForm && (
              <div className="mb-4">
                <DishForm
                  countryId={country.id}
                  countryName={country.name}
                  regions={country.regionalVariations?.map(r => r.name)}
                  regionalVariations={country.regionalVariations}
                  popularDishes={country.popularDishes}
                  restaurants={countryRestaurants}
                  onSubmit={handleAddDish}
                  onCancel={() => setShowDishForm(false)}
                />
              </div>
            )}

            {countryDishes.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {countryDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    restaurants={countryRestaurants}
                    onUpdate={updateDish}
                    onDelete={deleteDish}
                    onAddRestaurantTry={handleAddRestaurantTry}
                    onUpdateRestaurantTry={updateRestaurantTry}
                    onDeleteRestaurantTry={deleteRestaurantTry}
                    onAddCookingAttempt={addCookingAttempt}
                    onUpdateCookingAttempt={updateCookingAttempt}
                    onDeleteCookingAttempt={deleteCookingAttempt}
                  />
                ))}
              </div>
            ) : (
              !showDishForm && (
                <p className="text-gray-500 text-sm py-4 text-center">
                  No dishes logged yet
                </p>
              )
            )}
          </div>
        </section>

        {/* Food Culture - Overview + 3 cards */}
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text }}
          >
            Food Culture
          </h2>

          {/* Overview prose */}
          <div className="prose prose-gray max-w-none mb-6">
            {country.foodCulture.overview.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* 3-column details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {country.foodCulture.mealStructure && (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: `${colors.primary}10` }}
              >
                <h3
                  className="font-medium mb-2 text-sm"
                  style={{ color: colors.primary }}
                >
                  Meal Structure
                </h3>
                <p className="text-gray-700 text-sm">{country.foodCulture.mealStructure}</p>
              </div>
            )}

            {country.foodCulture.diningCustoms && (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: `${colors.secondary}10` }}
              >
                <h3
                  className="font-medium mb-2 text-sm"
                  style={{ color: colors.secondary }}
                >
                  Dining Customs
                </h3>
                <p className="text-gray-700 text-sm">{country.foodCulture.diningCustoms}</p>
              </div>
            )}

            {country.foodCulture.historicalInfluences && (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: `${colors.accent}20` }}
              >
                <h3
                  className="font-medium mb-2 text-sm"
                  style={{ color: colors.text }}
                >
                  Historical Influences
                </h3>
                <p className="text-gray-700 text-sm">{country.foodCulture.historicalInfluences}</p>
              </div>
            )}
          </div>
        </section>

        {/* Cuisine Profile - Radar Chart + Tag Cloud */}
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text }}
          >
            Cuisine Profile
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            {/* 2-column layout on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Flavor Fingerprint</h3>
                <FlavorRadarChart
                  flavorIntensity={country.cuisineProfile.flavorIntensity}
                  colors={colors}
                />
              </div>

              {/* Ingredient Bubbles */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Ingredients & Spices</h3>
                <IngredientBubbles
                  keyIngredients={country.cuisineProfile.keyIngredients}
                  spicesAndSeasonings={country.cuisineProfile.spicesAndSeasonings}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Dishes - Compact accordion rows */}
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text }}
          >
            Popular Dishes
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {country.popularDishes.map((dish) => {
              const detectedRegion = detectRegionForDish(dish, country.regionalVariations);
              const isExpanded = expandedDishes.has(dish.name);

              const toggleExpanded = () => {
                setExpandedDishes(prev => {
                  const next = new Set(prev);
                  if (next.has(dish.name)) {
                    next.delete(dish.name);
                  } else {
                    next.add(dish.name);
                  }
                  return next;
                });
              };

              return (
                <div key={dish.name}>
                  {/* Collapsed row */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={toggleExpanded}
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
                      {/* Key traits */}
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
                        isFavorite={isFavorite(country.id, dish.name)}
                        onAdd={() => addToFavorites({
                          countryId: country.id,
                          dishName: dish.name,
                          englishName: dish.englishName,
                        })}
                        onRemove={() => {
                          const item = findFavoriteItem(country.id, dish.name);
                          if (item) removeFromFavorites(item.id);
                        }}
                        compact
                      />
                      <WantToTryButton
                        isOnWishlist={isOnWishlist(country.id, dish.name)}
                        onAdd={() => addToWishlist({
                          countryId: country.id,
                          dishName: dish.name,
                          englishName: dish.englishName,
                        })}
                        onRemove={() => {
                          const item = findWishlistItem(country.id, dish.name);
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
                        {/* Key traits */}
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
        </section>

        {/* Regional Cuisines - Stylized Map */}
        {country.regionalVariations && country.regionalVariations.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Regional Cuisines
            </h2>
            <RegionalMap
              countryId={country.id}
              regions={country.regionalVariations}
              colors={colors}
            />
          </section>
        )}
      </main>
    </div>
  );
}
