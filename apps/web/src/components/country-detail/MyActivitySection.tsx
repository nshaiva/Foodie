import { useState } from 'react';
import { DishForm } from '../DishForm';
import { DishCard } from '../DishCard';
import { systemColors } from '../../data/systemColors';
import type { UserDish, RestaurantTry, RegionalCuisine, Dish } from '../../data/types';

interface MyActivitySectionProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  regionalVariations?: RegionalCuisine[];
  popularDishes?: Dish[];
  dishes: UserDish[];
  /** When embedded inside another section, drop the top border/margin. */
  embedded?: boolean;
  onAddDish: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
  }) => void;
  onUpdateDish: (id: string, data: Partial<UserDish>) => void;
  onDeleteDish: (id: string) => void;
  onAddRestaurantTry: (dishId: string, data: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, data: Partial<RestaurantTry>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
}

export function MyActivitySection({
  countryId,
  countryName,
  regions,
  regionalVariations,
  popularDishes,
  dishes,
  embedded = false,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  onAddRestaurantTry,
  onUpdateRestaurantTry,
  onDeleteRestaurantTry,
}: MyActivitySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);

  const collapsedCount = 4;
  const hasMore = dishes.length > collapsedCount;
  const displayedDishes = isExpanded ? dishes : dishes.slice(0, collapsedCount);

  const handleAddDish = (data: Parameters<typeof onAddDish>[0]) => {
    onAddDish(data);
    setShowDishForm(false);
  };

  return (
    <section className={embedded ? '' : 'border-t border-gray-200 pt-6 mt-6'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: systemColors.herb }} />
          Dishes I've Tried
          {dishes.length > 0 && (
            <span className="text-sm font-normal text-gray-500">({dishes.length})</span>
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
            countryId={countryId}
            countryName={countryName}
            regions={regions}
            regionalVariations={regionalVariations}
            popularDishes={popularDishes}
            onSubmit={handleAddDish}
            onCancel={() => setShowDishForm(false)}
          />
        </div>
      )}

      {displayedDishes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayedDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onUpdate={onUpdateDish}
              onDelete={onDeleteDish}
              onAddRestaurantTry={onAddRestaurantTry}
              onUpdateRestaurantTry={onUpdateRestaurantTry}
              onDeleteRestaurantTry={onDeleteRestaurantTry}
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

      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
          >
            {isExpanded ? 'Show less' : `Show all (${dishes.length})`}
          </button>
        </div>
      )}
    </section>
  );
}
