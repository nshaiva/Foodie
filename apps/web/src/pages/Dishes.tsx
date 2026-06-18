import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDishes } from '../hooks/useDishes';
import { useCountryListFilter } from '../hooks/useCountryListFilter';
import { getCountryName } from '../data/countryHelpers';
import { systemColors } from '../data/systemColors';
import { DishCard } from '../components/DishCard';
import { Wordmark } from '../components/Wordmark';
import { ListControls, FilterSelect } from '../components/ListControls';
import { AddDishForm } from '../components/forms/AddDishForm';
import type { UserDish } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'name' | 'country' | 'updated' | 'most-tried';

function compareDishes(a: UserDish, b: UserDish, sortBy: SortOption): number {
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
    default:
      return 0;
  }
}

export function Dishes() {
  const {
    dishes,
    addDish,
    updateDish,
    deleteDish,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
  } = useDishes();
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    filterCountry,
    setFilterCountry,
    filterContinent,
    setFilterContinent,
    sortBy,
    setSortBy,
    filteredItems: filteredDishes,
    availableCountryIds,
    availableContinents,
  } = useCountryListFilter<UserDish, SortOption>(dishes, 'date-desc', compareDishes);

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="mb-2">
            <Wordmark className="text-2xl" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: systemColors.navy }}>
                Dishes I've Tried
              </h1>
              <p className="mt-1" style={{ color: systemColors.navyMuted }}>
                {dishes.length} dish{dishes.length !== 1 ? 'es' : ''} logged
              </p>
            </div>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-md transition-colors"
                style={{ backgroundColor: systemColors.herb, color: systemColors.seaSalt }}
              >
                + Add Dish
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {showAddForm && (
          <AddDishForm
            onAddDish={addDish}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {dishes.length > 0 ? (
          <>
            <ListControls
              continents={availableContinents}
              countryIds={availableCountryIds}
              filterContinent={filterContinent}
              onContinentChange={setFilterContinent}
              filterCountry={filterCountry}
              onCountryChange={setFilterCountry}
              ringClass="focus:ring-herb"
            >
              <FilterSelect
                id="sortBy"
                label="Sort By"
                value={sortBy}
                onChange={(v) => setSortBy(v as SortOption)}
                ringClass="focus:ring-herb"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="country">Country A-Z</option>
                <option value="name">Name A-Z</option>
                <option value="most-tried">Most Tries</option>
              </FilterSelect>
            </ListControls>

            {/* Results */}
            <div className="space-y-4">
              {filteredDishes.map((dish) => (
                <div key={dish.id}>
                  <div className="mb-1">
                    <Link
                      to={`/country/${dish.countryId}`}
                      className="text-sm hover:underline"
                      style={{ color: systemColors.herb }}
                    >
                      {getCountryName(dish.countryId)}
                    </Link>
                  </div>
                  <DishCard
                    dish={dish}
                    onUpdate={updateDish}
                    onDelete={deleteDish}
                    onAddRestaurantTry={addRestaurantTry}
                    onUpdateRestaurantTry={updateRestaurantTry}
                    onDeleteRestaurantTry={deleteRestaurantTry}
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
                  className="text-white px-4 py-2 rounded-md transition-colors"
                  style={{ backgroundColor: systemColors.herb }}
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
