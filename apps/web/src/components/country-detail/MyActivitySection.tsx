import { useState } from 'react';
import { RestaurantForm } from '../RestaurantForm';
import { DishForm } from '../DishForm';
import { RestaurantCard } from '../RestaurantCard';
import { DishCard } from '../DishCard';
import { systemColors } from '../../data/systemColors';
import type { Restaurant, UserDish, RestaurantTry, CookingAttempt, RegionalCuisine, Dish } from '../../data/types';

interface MyActivitySectionProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  regionalVariations?: RegionalCuisine[];
  popularDishes?: Dish[];
  restaurants: Restaurant[];
  dishes: UserDish[];
  onAddRestaurant: (data: { countryId: string; name: string; region?: string; googleMapsLink?: string; rating?: number; notes?: string }) => void;
  onUpdateRestaurant: (id: string, data: Partial<Restaurant>) => void;
  onDeleteRestaurant: (id: string) => void;
  onAddVisit: (restaurantId: string, date: string, notes?: string) => void;
  onUpdateVisit: (restaurantId: string, visitId: string, updates: Partial<{ date: string; notes: string }>) => void;
  onDeleteVisit: (restaurantId: string, visitId: string) => void;
  onAddDish: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
    initialCookingAttempt?: Omit<CookingAttempt, 'id'>;
  }) => void;
  onUpdateDish: (id: string, data: Partial<UserDish>) => void;
  onDeleteDish: (id: string) => void;
  onAddRestaurantTry: (dishId: string, data: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, data: Partial<RestaurantTry>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
  onAddCookingAttempt: (dishId: string, data: Omit<CookingAttempt, 'id'>) => void;
  onUpdateCookingAttempt: (dishId: string, attemptId: string, data: Partial<CookingAttempt>) => void;
  onDeleteCookingAttempt: (dishId: string, attemptId: string) => void;
}

export function MyActivitySection({
  countryId,
  countryName,
  regions,
  regionalVariations,
  popularDishes,
  restaurants,
  dishes,
  onAddRestaurant,
  onUpdateRestaurant,
  onDeleteRestaurant,
  onAddVisit,
  onUpdateVisit,
  onDeleteVisit,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  onAddRestaurantTry,
  onUpdateRestaurantTry,
  onDeleteRestaurantTry,
  onAddCookingAttempt,
  onUpdateCookingAttempt,
  onDeleteCookingAttempt,
}: MyActivitySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);

  const totalItems = restaurants.length + dishes.length;
  const collapsedCount = 2;
  const hasMore = restaurants.length > collapsedCount || dishes.length > collapsedCount;

  const displayedRestaurants = isExpanded ? restaurants : restaurants.slice(0, collapsedCount);
  const displayedDishes = isExpanded ? dishes : dishes.slice(0, collapsedCount);

  const handleAddRestaurant = (data: Parameters<typeof onAddRestaurant>[0]) => {
    onAddRestaurant(data);
    setShowRestaurantForm(false);
  };

  const handleAddDish = (data: Parameters<typeof onAddDish>[0]) => {
    onAddDish(data);
    setShowDishForm(false);
  };

  return (
    <section className="border-t border-gray-200 pt-6 mt-6">
      {/* Header with expand/collapse */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">My Activity</h2>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Show all ({totalItems})
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurants Column */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: systemColors.navy }} />
              My Restaurants
              {restaurants.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({restaurants.length})
                </span>
              )}
            </h3>
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
                countryId={countryId}
                countryName={countryName}
                regions={regions}
                onSubmit={handleAddRestaurant}
                onCancel={() => setShowRestaurantForm(false)}
              />
            </div>
          )}

          {displayedRestaurants.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onUpdate={onUpdateRestaurant}
                  onDelete={onDeleteRestaurant}
                  onAddVisit={onAddVisit}
                  onUpdateVisit={onUpdateVisit}
                  onDeleteVisit={onDeleteVisit}
                />
              ))}
              {!isExpanded && restaurants.length > collapsedCount && (
                <p className="text-sm text-gray-500 text-center py-2">
                  +{restaurants.length - collapsedCount} more...
                </p>
              )}
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
            <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: systemColors.herb }} />
              Dishes I've Tried
              {dishes.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({dishes.length})
                </span>
              )}
            </h3>
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
                countryId={countryId}
                countryName={countryName}
                regions={regions}
                regionalVariations={regionalVariations}
                popularDishes={popularDishes}
                restaurants={restaurants}
                onSubmit={handleAddDish}
                onCancel={() => setShowDishForm(false)}
              />
            </div>
          )}

          {displayedDishes.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayedDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  restaurants={restaurants}
                  onUpdate={onUpdateDish}
                  onDelete={onDeleteDish}
                  onAddRestaurantTry={onAddRestaurantTry}
                  onUpdateRestaurantTry={onUpdateRestaurantTry}
                  onDeleteRestaurantTry={onDeleteRestaurantTry}
                  onAddCookingAttempt={onAddCookingAttempt}
                  onUpdateCookingAttempt={onUpdateCookingAttempt}
                  onDeleteCookingAttempt={onDeleteCookingAttempt}
                />
              ))}
              {!isExpanded && dishes.length > collapsedCount && (
                <p className="text-sm text-gray-500 text-center py-2">
                  +{dishes.length - collapsedCount} more...
                </p>
              )}
            </div>
          ) : (
            !showDishForm && (
              <p className="text-gray-500 text-sm py-4 text-center">
                No dishes logged yet
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
