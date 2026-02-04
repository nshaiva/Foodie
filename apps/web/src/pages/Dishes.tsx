import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDishes } from '../hooks/useDishes';
import { useRestaurants } from '../hooks/useRestaurants';
import { countries } from '../data/countries';
import { DishCard } from '../components/DishCard';
import type { Continent, RestaurantTry, CookingAttempt } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'name' | 'country' | 'updated' | 'most-tried' | 'most-cooked';

export function Dishes() {
  const {
    dishes,
    addDish,
    updateDish,
    deleteDish,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
    addCookingAttempt,
    updateCookingAttempt,
    deleteCookingAttempt,
  } = useDishes();
  const { restaurants, findOrCreateRestaurant } = useRestaurants();
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Initial try type for form
  type InitialTryType = 'none' | 'restaurant' | 'cooked';
  const [initialTryType, setInitialTryType] = useState<InitialTryType>('none');

  // Restaurant try fields
  const [useLinkedRestaurant, setUseLinkedRestaurant] = useState(true);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantRating, setRestaurantRating] = useState('');
  const [restaurantNotes, setRestaurantNotes] = useState('');

  // Cooking attempt fields
  const [cookingDate, setCookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [cookingRating, setCookingRating] = useState('');
  const [recipeSource, setRecipeSource] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');

  const getCountry = (countryId: string) => {
    return countries.find(c => c.id === countryId);
  };

  const getCountryName = (countryId: string) => {
    return getCountry(countryId)?.name || countryId;
  };

  const getCountryContinent = (countryId: string) => {
    return getCountry(countryId)?.continent;
  };

  const getRegionsForCountry = (countryId: string) => {
    const country = getCountry(countryId);
    return country?.regionalVariations?.map(r => r.name) || [];
  };

  const getRestaurantsForCountry = (countryId: string) => {
    return restaurants.filter(r => r.countryId === countryId);
  };

  const resetForm = () => {
    setFormCountryId('');
    setFormName('');
    setFormRegion('');
    setFormNotes('');
    setInitialTryType('none');
    setUseLinkedRestaurant(true);
    setRestaurantId('');
    setRestaurantName('');
    setRestaurantDate(new Date().toISOString().split('T')[0]);
    setRestaurantRating('');
    setRestaurantNotes('');
    setCookingDate(new Date().toISOString().split('T')[0]);
    setCookingRating('');
    setRecipeSource('');
    setCookingNotes('');
    setShowAddForm(false);
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    // Validate restaurant try if selected
    if (initialTryType === 'restaurant') {
      if (useLinkedRestaurant && !restaurantId) return;
      if (!useLinkedRestaurant && !restaurantName.trim()) return;
    }

    let initialRestaurantTry: RestaurantTry | undefined;
    let initialCookingAttempt: CookingAttempt | undefined;

    if (initialTryType === 'restaurant') {
      const tryDate = new Date(restaurantDate).toISOString();

      // Auto-create restaurant if name provided without ID
      let finalRestaurantId = useLinkedRestaurant ? restaurantId : undefined;
      if (!useLinkedRestaurant && restaurantName.trim()) {
        const restaurant = findOrCreateRestaurant(formCountryId, restaurantName.trim(), tryDate);
        finalRestaurantId = restaurant.id;
      }

      initialRestaurantTry = {
        id: crypto.randomUUID(),
        restaurantId: finalRestaurantId,
        restaurantName: undefined, // Always link to restaurant now
        date: tryDate,
        rating: restaurantRating ? parseInt(restaurantRating, 10) : undefined,
        notes: restaurantNotes.trim() || undefined,
      };
    } else if (initialTryType === 'cooked') {
      initialCookingAttempt = {
        id: crypto.randomUUID(),
        date: new Date(cookingDate).toISOString(),
        successRating: cookingRating ? parseInt(cookingRating, 10) : undefined,
        recipeSource: recipeSource.trim() || undefined,
        notes: cookingNotes.trim() || undefined,
      };
    }

    addDish({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      notes: formNotes.trim() || undefined,
      restaurantTries: initialRestaurantTry ? [initialRestaurantTry] : [],
      cookingAttempts: initialCookingAttempt ? [initialCookingAttempt] : [],
    });

    resetForm();
  };

  // Wrapper for addRestaurantTry that auto-creates restaurants
  const handleAddRestaurantTry = (dishId: string, data: Omit<RestaurantTry, 'id'>) => {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;

    // Auto-create restaurant if name provided without ID
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

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];
  const selectedCountryRestaurants = formCountryId ? getRestaurantsForCountry(formCountryId) : [];

  const filteredDishes = dishes
    .filter(d => filterCountry === 'all' || d.countryId === filterCountry)
    .filter(d => {
      if (filterContinent === 'all') return true;
      return getCountryContinent(d.countryId) === filterContinent;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'country':
          return getCountryName(a.countryId).localeCompare(getCountryName(b.countryId));
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'most-tried':
          return (b.restaurantTries?.length || 0) - (a.restaurantTries?.length || 0);
        case 'most-cooked':
          return (b.cookingAttempts?.length || 0) - (a.cookingAttempts?.length || 0);
        default:
          return 0;
      }
    });

  const countriesWithDishes = [...new Set(dishes.map(d => d.countryId))];
  const continentsWithDishes = [...new Set(
    countriesWithDishes
      .map(id => getCountryContinent(id))
      .filter((c): c is Continent => c !== undefined)
  )];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            ← Back to countries
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dishes I've Tried</h1>
              <p className="text-gray-600 mt-1">
                {dishes.length} dish{dishes.length !== 1 ? 'es' : ''} logged
              </p>
            </div>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                + Add Dish
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Dish Form */}
        {showAddForm && (
          <form onSubmit={handleAddDish} className="bg-white rounded-lg border border-emerald-300 p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Log a Dish</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="formCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="formCountry"
                    value={formCountryId}
                    onChange={(e) => {
                      setFormCountryId(e.target.value);
                      setFormRegion('');
                      setRestaurantId('');
                      setUseLinkedRestaurant(getRestaurantsForCountry(e.target.value).length > 0);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="">Select a country</option>
                    {countries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </div>

                {selectedCountryRegions.length > 0 && (
                  <div>
                    <label htmlFor="formRegion" className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <select
                      id="formRegion"
                      value={formRegion}
                      onChange={(e) => setFormRegion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select a region (optional)</option>
                      {selectedCountryRegions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="formName" className="block text-sm font-medium text-gray-700 mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  id="formName"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Pad Thai"
                  required
                />
              </div>

              <div>
                <label htmlFor="formNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="formNotes"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="General notes about this dish..."
                />
              </div>

              {/* Initial try type selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you try this dish?
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setInitialTryType('none')}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      initialTryType === 'none'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Just logging
                  </button>
                  <button
                    type="button"
                    onClick={() => setInitialTryType('restaurant')}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      initialTryType === 'restaurant'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    At a restaurant
                  </button>
                  <button
                    type="button"
                    onClick={() => setInitialTryType('cooked')}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      initialTryType === 'cooked'
                        ? 'bg-violet-600 text-white'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                    }`}
                  >
                    I cooked it
                  </button>
                </div>
              </div>

              {/* Restaurant try form */}
              {initialTryType === 'restaurant' && (
                <div className="bg-amber-50 rounded-lg border border-amber-200 p-3 space-y-3">
                  {selectedCountryRestaurants.length > 0 && (
                    <div className="flex gap-4 mb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={useLinkedRestaurant}
                          onChange={() => setUseLinkedRestaurant(true)}
                          className="text-amber-600"
                        />
                        <span className="text-sm text-gray-700">My restaurants</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={!useLinkedRestaurant}
                          onChange={() => setUseLinkedRestaurant(false)}
                          className="text-amber-600"
                        />
                        <span className="text-sm text-gray-700">Enter name</span>
                      </label>
                    </div>
                  )}

                  {useLinkedRestaurant && selectedCountryRestaurants.length > 0 ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Restaurant *
                      </label>
                      <select
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      >
                        <option value="">Select a restaurant</option>
                        {selectedCountryRestaurants.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Restaurant Name *
                      </label>
                      <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g., Little Bangkok"
                        required
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={restaurantDate}
                        onChange={(e) => setRestaurantDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <select
                        value={restaurantRating}
                        onChange={(e) => setRestaurantRating(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">No rating</option>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={restaurantNotes}
                      onChange={(e) => setRestaurantNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="How was it at this restaurant?"
                    />
                  </div>
                </div>
              )}

              {/* Cooking attempt form */}
              {initialTryType === 'cooked' && (
                <div className="bg-violet-50 rounded-lg border border-violet-200 p-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={cookingDate}
                        onChange={(e) => setCookingDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How did it turn out?
                      </label>
                      <select
                        value={cookingRating}
                        onChange={(e) => setCookingRating(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">No rating</option>
                        <option value="5">5 - Nailed it!</option>
                        <option value="4">4 - Pretty good</option>
                        <option value="3">3 - Decent</option>
                        <option value="2">2 - Needs work</option>
                        <option value="1">1 - Disaster</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipe Source
                    </label>
                    <input
                      type="text"
                      value={recipeSource}
                      onChange={(e) => setRecipeSource(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="e.g., YouTube, cookbook, family recipe..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={cookingNotes}
                      onChange={(e) => setCookingNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="What worked? What would you change?"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={!formCountryId || !formName.trim()}
                className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Dish
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {dishes.length > 0 ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label htmlFor="filterContinent" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  id="filterContinent"
                  value={filterContinent}
                  onChange={(e) => {
                    setFilterContinent(e.target.value);
                    setFilterCountry('all');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Regions</option>
                  {continentsWithDishes.map(continent => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filterCountry" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="filterCountry"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Countries</option>
                  {countriesWithDishes
                    .filter(id => filterContinent === 'all' || getCountryContinent(id) === filterContinent)
                    .sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)))
                    .map(countryId => (
                      <option key={countryId} value={countryId}>
                        {getCountryName(countryId)}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="updated">Recently Updated</option>
                  <option value="country">Country A-Z</option>
                  <option value="name">Name A-Z</option>
                  <option value="most-tried">Most Restaurant Tries</option>
                  <option value="most-cooked">Most Cooking Attempts</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {filteredDishes.map((dish) => (
                <div key={dish.id}>
                  <div className="mb-1">
                    <Link
                      to={`/country/${dish.countryId}`}
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      {getCountryName(dish.countryId)}
                    </Link>
                  </div>
                  <DishCard
                    dish={dish}
                    restaurants={getRestaurantsForCountry(dish.countryId)}
                    onUpdate={updateDish}
                    onDelete={deleteDish}
                    onAddRestaurantTry={handleAddRestaurantTry}
                    onUpdateRestaurantTry={updateRestaurantTry}
                    onDeleteRestaurantTry={deleteRestaurantTry}
                    onAddCookingAttempt={addCookingAttempt}
                    onUpdateCookingAttempt={updateCookingAttempt}
                    onDeleteCookingAttempt={deleteCookingAttempt}
                  />
                </div>
              ))}

              {filteredDishes.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No dishes match your filters.
                </p>
              )}
            </div>
          </>
        ) : (
          !showAddForm && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">You haven't logged any dishes yet.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  + Add Dish
                </button>
                <Link
                  to="/"
                  className="inline-block border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Browse Countries
                </Link>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
