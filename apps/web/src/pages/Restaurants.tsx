import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurants } from '../hooks/useRestaurants';
import { useCountryListFilter } from '../hooks/useCountryListFilter';
import { getCountryName } from '../data/countryHelpers';
import { systemColors } from '../data/systemColors';
import { RestaurantCard } from '../components/RestaurantCard';
import { ListControls, FilterSelect } from '../components/ListControls';
import { AddRestaurantForm } from '../components/forms/AddRestaurantForm';
import type { Restaurant } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc' | 'name' | 'most-visited' | 'country' | 'updated';

function compareRestaurants(a: Restaurant, b: Restaurant, sortBy: SortOption): number {
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
}

export function Restaurants() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, addVisit, updateVisit, deleteVisit } = useRestaurants();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterVisits, setFilterVisits] = useState<string>('all');

  const {
    filterCountry,
    setFilterCountry,
    filterContinent,
    setFilterContinent,
    sortBy,
    setSortBy,
    filteredItems: filteredRestaurants,
    availableCountryIds,
    availableContinents,
  } = useCountryListFilter<Restaurant, SortOption>(
    restaurants,
    'date-desc',
    compareRestaurants,
    (r) => {
      if (filterRating !== 'all' && (r.rating || 0) < parseInt(filterRating)) return false;
      if (filterVisits !== 'all' && (r.visits?.length || 0) < parseInt(filterVisits)) return false;
      return true;
    },
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.navy }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="text-sm mb-2 inline-block opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: systemColors.seaSalt }}
          >
            ← Back to countries
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: systemColors.seaSalt }}>
                My Restaurants
              </h1>
              <p className="mt-1" style={{ color: `${systemColors.seaSalt}99` }}>
                {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} logged
              </p>
            </div>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-md transition-colors"
                style={{ backgroundColor: systemColors.saffron, color: systemColors.navy }}
              >
                + Add Restaurant
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {showAddForm && (
          <AddRestaurantForm
            onAddRestaurant={addRestaurant}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {restaurants.length > 0 ? (
          <>
            <ListControls
              continents={availableContinents}
              countryIds={availableCountryIds}
              filterContinent={filterContinent}
              onContinentChange={setFilterContinent}
              filterCountry={filterCountry}
              onCountryChange={setFilterCountry}
              ringClass="focus:ring-navy"
            >
              <FilterSelect
                id="filterRating"
                label="Min Rating"
                value={filterRating}
                onChange={setFilterRating}
                ringClass="focus:ring-navy"
              >
                <option value="all">Any Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </FilterSelect>

              <FilterSelect
                id="filterVisits"
                label="Visits"
                value={filterVisits}
                onChange={setFilterVisits}
                ringClass="focus:ring-navy"
              >
                <option value="all">Any</option>
                <option value="2">2+ visits</option>
                <option value="3">3+ visits</option>
                <option value="5">5+ visits</option>
              </FilterSelect>

              <FilterSelect
                id="sortBy"
                label="Sort By"
                value={sortBy}
                onChange={(v) => setSortBy(v as SortOption)}
                ringClass="focus:ring-navy"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="most-visited">Most Visited</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="country">Country A-Z</option>
                <option value="name">Name A-Z</option>
              </FilterSelect>
            </ListControls>

            {/* Results */}
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id}>
                  <div className="mb-1">
                    <Link
                      to={`/country/${restaurant.countryId}`}
                      className="text-sm hover:underline"
                      style={{ color: systemColors.navy }}
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
                  className="text-white px-4 py-2 rounded-md transition-colors"
                  style={{ backgroundColor: systemColors.navy }}
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
