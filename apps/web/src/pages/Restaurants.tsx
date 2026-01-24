import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurants } from '../hooks/useRestaurants';
import { countries } from '../data/countries';
import { RestaurantCard } from '../components/RestaurantCard';
import { StarRating } from '../components/StarRating';
import type { Continent } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc' | 'name' | 'most-visited' | 'country' | 'updated';

export function Restaurants() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, addVisit, updateVisit, deleteVisit } = useRestaurants();
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterVisits, setFilterVisits] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formGoogleMapsLink, setFormGoogleMapsLink] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formNotes, setFormNotes] = useState('');
  const [formDateVisited, setFormDateVisited] = useState('');

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

  const resetForm = () => {
    setFormCountryId('');
    setFormName('');
    setFormRegion('');
    setFormGoogleMapsLink('');
    setFormRating(0);
    setFormNotes('');
    setFormDateVisited('');
    setShowAddForm(false);
  };

  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    addRestaurant({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      googleMapsLink: formGoogleMapsLink.trim() || undefined,
      rating: formRating || undefined,
      notes: formNotes.trim() || undefined,
      dateVisited: formDateVisited || undefined,
    });
    resetForm();
  };

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];

  const filteredRestaurants = restaurants
    .filter(r => filterCountry === 'all' || r.countryId === filterCountry)
    .filter(r => {
      if (filterContinent === 'all') return true;
      return getCountryContinent(r.countryId) === filterContinent;
    })
    .filter(r => {
      if (filterRating === 'all') return true;
      const rating = r.rating || 0;
      return rating >= parseInt(filterRating);
    })
    .filter(r => {
      if (filterVisits === 'all') return true;
      const visitCount = r.visits?.length || 0;
      return visitCount >= parseInt(filterVisits);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'most-visited':
          return (b.visits?.length || 0) - (a.visits?.length || 0);
        case 'country':
          return getCountryName(a.countryId).localeCompare(getCountryName(b.countryId));
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

  const countriesWithRestaurants = [...new Set(restaurants.map(r => r.countryId))];
  const continentsWithRestaurants = [...new Set(
    countriesWithRestaurants
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
              <h1 className="text-3xl font-bold text-gray-900">My Restaurants</h1>
              <p className="text-gray-600 mt-1">
                {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} logged
              </p>
            </div>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Restaurant
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Restaurant Form */}
        {showAddForm && (
          <form onSubmit={handleAddRestaurant} className="bg-white rounded-lg border border-blue-300 p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Add a Restaurant</h3>
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
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  id="formName"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Siam Garden"
                  required
                />
              </div>

              <div>
                <label htmlFor="formGoogleMapsLink" className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  id="formGoogleMapsLink"
                  value={formGoogleMapsLink}
                  onChange={(e) => setFormGoogleMapsLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <StarRating rating={formRating} onChange={setFormRating} />
                </div>

                <div>
                  <label htmlFor="formDateVisited" className="block text-sm font-medium text-gray-700 mb-1">
                    Date Visited
                  </label>
                  <input
                    type="date"
                    id="formDateVisited"
                    value={formDateVisited}
                    onChange={(e) => setFormDateVisited(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What did you enjoy? Any recommendations?"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={!formCountryId || !formName.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Restaurant
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

        {restaurants.length > 0 ? (
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
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  {continentsWithRestaurants.map(continent => (
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
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Countries</option>
                  {countriesWithRestaurants
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
                <label htmlFor="filterRating" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rating
                </label>
                <select
                  id="filterRating"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Any Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              <div>
                <label htmlFor="filterVisits" className="block text-sm font-medium text-gray-700 mb-1">
                  Visits
                </label>
                <select
                  id="filterVisits"
                  value={filterVisits}
                  onChange={(e) => setFilterVisits(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Any</option>
                  <option value="2">2+ visits</option>
                  <option value="3">3+ visits</option>
                  <option value="5">5+ visits</option>
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
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="updated">Recently Updated</option>
                  <option value="most-visited">Most Visited</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                  <option value="country">Country A-Z</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id}>
                  <div className="mb-1">
                    <Link
                      to={`/country/${restaurant.countryId}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {getCountryName(restaurant.countryId)}
                    </Link>
                  </div>
                  <RestaurantCard
                    restaurant={restaurant}
                    onUpdate={updateRestaurant}
                    onDelete={deleteRestaurant}
                    onAddVisit={addVisit}
                    onUpdateVisit={updateVisit}
                    onDeleteVisit={deleteVisit}
                  />
                </div>
              ))}

              {filteredRestaurants.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No restaurants match your filters.
                </p>
              )}
            </div>
          </>
        ) : (
          !showAddForm && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">You haven't logged any restaurants yet.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  + Add Restaurant
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
