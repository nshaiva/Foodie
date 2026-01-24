import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { useRestaurants } from '../hooks/useRestaurants';
import { useDishes } from '../hooks/useDishes';
import { RestaurantForm } from '../components/RestaurantForm';
import { DishForm } from '../components/DishForm';
import { RestaurantCard } from '../components/RestaurantCard';
import { DishCard } from '../components/DishCard';

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, getRestaurantsByCountry, addVisit, updateVisit, deleteVisit } = useRestaurants();
  const { addDish, updateDish, deleteDish, getDishesByCountry, linkDishToRestaurant, getRestaurantLinksForDish } = useDishes();

  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Country not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to all countries
          </Link>
        </div>
      </div>
    );
  }

  const countryRestaurants = getRestaurantsByCountry(country.id);
  const countryDishes = getDishesByCountry(country.id);

  const handleAddRestaurant = (data: Parameters<typeof addRestaurant>[0]) => {
    addRestaurant(data);
    setShowRestaurantForm(false);
  };

  const handleAddDish = (data: { countryId: string; region?: string; name: string; notes?: string; restaurantIds?: string[] }) => {
    const newDish = addDish({
      countryId: data.countryId,
      region: data.region,
      name: data.name,
      notes: data.notes,
    });
    if (data.restaurantIds) {
      data.restaurantIds.forEach(restaurantId => {
        linkDishToRestaurant(newDish.id, restaurantId);
      });
    }
    setShowDishForm(false);
  };

  const getLinkedRestaurantsForDish = (dishId: string) => {
    const links = getRestaurantLinksForDish(dishId);
    return links
      .map(link => restaurants.find(r => r.id === link.restaurantId))
      .filter((r): r is NonNullable<typeof r> => r !== undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            ← Back to all countries
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{country.name}</h1>
          <p className="text-gray-600 mt-1">
            {country.capital} · {country.region}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Cuisine Summary */}
        <section>
          <p className="text-lg text-gray-700 leading-relaxed">
            {country.cuisineProfile.summary}
          </p>
        </section>

        {/* My Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              My Restaurants
              {countryRestaurants.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({countryRestaurants.length})
                </span>
              )}
            </h2>
            {!showRestaurantForm && (
              <button
                onClick={() => setShowRestaurantForm(true)}
                className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Restaurant
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
            <div className="space-y-3">
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
              <p className="text-gray-500 text-sm">
                No restaurants logged yet. Add your first one!
              </p>
            )
          )}
        </section>

        {/* My Dishes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Dishes I've Tried
              {countryDishes.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({countryDishes.length})
                </span>
              )}
            </h2>
            {!showDishForm && (
              <button
                onClick={() => setShowDishForm(true)}
                className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700 transition-colors"
              >
                + Add Dish
              </button>
            )}
          </div>

          {showDishForm && (
            <div className="mb-4">
              <DishForm
                countryId={country.id}
                countryName={country.name}
                regions={country.regionalVariations?.map(r => r.name)}
                restaurants={countryRestaurants}
                onSubmit={handleAddDish}
                onCancel={() => setShowDishForm(false)}
              />
            </div>
          )}

          {countryDishes.length > 0 ? (
            <div className="space-y-3">
              {countryDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  linkedRestaurants={getLinkedRestaurantsForDish(dish.id)}
                  onUpdate={updateDish}
                  onDelete={deleteDish}
                />
              ))}
            </div>
          ) : (
            !showDishForm && (
              <p className="text-gray-500 text-sm">
                No dishes logged yet. Add the first dish you've tried!
              </p>
            )
          )}
        </section>

        {/* Food Culture */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Food Culture</h2>
          <div className="prose prose-gray max-w-none">
            {country.foodCulture.overview.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {country.foodCulture.mealStructure && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-2">Meal Structure</h3>
              <p className="text-gray-700 text-sm">{country.foodCulture.mealStructure}</p>
            </div>
          )}

          {country.foodCulture.diningCustoms && (
            <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-2">Dining Customs</h3>
              <p className="text-gray-700 text-sm">{country.foodCulture.diningCustoms}</p>
            </div>
          )}

          {country.foodCulture.historicalInfluences && (
            <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-2">Historical Influences</h3>
              <p className="text-gray-700 text-sm">{country.foodCulture.historicalInfluences}</p>
            </div>
          )}
        </section>

        {/* Regional Cuisines */}
        {country.regionalVariations && country.regionalVariations.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Regional Cuisines</h2>
            <div className="space-y-6">
              {country.regionalVariations.map((region) => (
                <div key={region.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{region.name}</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{region.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Signature Dishes</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {region.signatureDishes.map((dish) => (
                            <span key={dish} className="bg-rose-50 text-rose-700 text-xs px-2 py-1 rounded">
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Key Ingredients</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {region.keyIngredients.map((ingredient) => (
                            <span key={ingredient} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {region.distinctiveTraits && region.distinctiveTraits.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">What Makes It Distinctive</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {region.distinctiveTraits.map((trait) => (
                            <span key={trait} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cuisine Profile */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cuisine Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2">
                {country.cuisineProfile.flavorProfile.map((flavor) => (
                  <span key={flavor} className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded-full">
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {country.cuisineProfile.keyIngredients.map((ingredient) => (
                  <span key={ingredient} className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Cooking Techniques</h3>
              <div className="flex flex-wrap gap-2">
                {country.cuisineProfile.cookingTechniques.map((technique) => (
                  <span key={technique} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {technique}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Spices & Seasonings</h3>
              <div className="flex flex-wrap gap-2">
                {country.cuisineProfile.spicesAndSeasonings.map((spice) => (
                  <span key={spice} className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                    {spice}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Dishes */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Dishes</h2>

          <div className="space-y-4">
            {country.popularDishes.map((dish) => (
              <div key={dish.name} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{dish.name}</h3>
                    {dish.englishName && (
                      <p className="text-sm text-gray-500">{dish.englishName}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {/* Popularity */}
                    {dish.popularity === 'local-favorite' && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        Local Favorite
                      </span>
                    )}
                    {dish.popularity === 'tourist-classic' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Tourist Classic
                      </span>
                    )}
                    {/* Spice Level */}
                    {dish.spiceLevel === 'mild' && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                        Mild
                      </span>
                    )}
                    {dish.spiceLevel === 'medium' && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                        Medium
                      </span>
                    )}
                    {dish.spiceLevel === 'hot' && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                        Hot
                      </span>
                    )}
                    {dish.spiceLevel === 'very-hot' && (
                      <span className="text-xs bg-red-200 text-red-900 px-2 py-0.5 rounded">
                        Very Hot
                      </span>
                    )}
                    {/* Street Food */}
                    {dish.isStreetFood && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Street Food
                      </span>
                    )}
                    {/* Category */}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                      {dish.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{dish.description}</p>

                {/* Dietary Info & Region */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {dish.dietary?.isVegan && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Vegan
                    </span>
                  )}
                  {dish.dietary?.isVegetarian && !dish.dietary?.isVegan && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Vegetarian
                    </span>
                  )}
                  {dish.dietary?.isVegetarianFriendly && !dish.dietary?.isVegetarian && !dish.dietary?.isVegan && (
                    <span className="text-xs bg-lime-100 text-lime-800 px-2 py-0.5 rounded">
                      Veg-Friendly
                    </span>
                  )}
                  {dish.dietary?.isGlutenFree && (
                    <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                      GF
                    </span>
                  )}
                  {dish.dietary?.isDairyFree && (
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                      DF
                    </span>
                  )}
                  {dish.dietary?.isHalal && (
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                      Halal
                    </span>
                  )}
                  {dish.regionalOrigin && (
                    <span className="text-xs text-gray-500">
                      Region: {dish.regionalOrigin}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
