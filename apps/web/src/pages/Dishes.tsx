import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDishes } from '../hooks/useDishes';
import { useRestaurants } from '../hooks/useRestaurants';
import { countries } from '../data/countries';
import { DishCard } from '../components/DishCard';
import type { Continent } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'name' | 'country' | 'updated';

export function Dishes() {
  const { dishes, addDish, updateDish, deleteDish, getRestaurantLinksForDish, linkDishToRestaurant } = useDishes();
  const { restaurants } = useRestaurants();
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formSelectedRestaurants, setFormSelectedRestaurants] = useState<string[]>([]);

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
    setFormSelectedRestaurants([]);
    setShowAddForm(false);
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    const newDish = addDish({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      notes: formNotes.trim() || undefined,
    });

    formSelectedRestaurants.forEach(restaurantId => {
      linkDishToRestaurant(newDish.id, restaurantId);
    });

    resetForm();
  };

  const toggleRestaurant = (restaurantId: string) => {
    setFormSelectedRestaurants(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];
  const selectedCountryRestaurants = formCountryId ? getRestaurantsForCountry(formCountryId) : [];

  const getLinkedRestaurantsForDish = (dishId: string) => {
    const links = getRestaurantLinksForDish(dishId);
    return links
      .map(link => restaurants.find(r => r.id === link.restaurantId))
      .filter((r): r is NonNullable<typeof r> => r !== undefined);
  };

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
                      setFormSelectedRestaurants([]);
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
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="How was it? Any thoughts?"
                />
              </div>

              {selectedCountryRestaurants.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tried at these restaurants (optional)
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedCountryRestaurants.map((restaurant) => (
                      <label
                        key={restaurant.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formSelectedRestaurants.includes(restaurant.id)}
                          onChange={() => toggleRestaurant(restaurant.id)}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">{restaurant.name}</span>
                      </label>
                    ))}
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
                    linkedRestaurants={getLinkedRestaurantsForDish(dish.id)}
                    onUpdate={updateDish}
                    onDelete={deleteDish}
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
