import { useState } from 'react';
import type { UserDish, Restaurant, RestaurantTry, CookingAttempt } from '../data/types';
import { RestaurantTryForm } from './RestaurantTryForm';
import { CookingAttemptForm } from './CookingAttemptForm';
import { systemColors } from '../data/systemColors';

interface DishCardProps {
  dish: UserDish;
  restaurants: Restaurant[];
  onUpdate: (id: string, updates: Partial<Omit<UserDish, 'id' | 'createdAt' | 'countryId'>>) => void;
  onDelete: (id: string) => void;
  onAddRestaurantTry: (dishId: string, data: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, updates: Partial<Omit<RestaurantTry, 'id'>>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
  onAddCookingAttempt: (dishId: string, data: Omit<CookingAttempt, 'id'>) => void;
  onUpdateCookingAttempt: (dishId: string, attemptId: string, updates: Partial<Omit<CookingAttempt, 'id'>>) => void;
  onDeleteCookingAttempt: (dishId: string, attemptId: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span style={{ color: systemColors.saffron }}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

export function DishCard({
  dish,
  restaurants,
  onUpdate,
  onDelete,
  onAddRestaurantTry,
  onUpdateRestaurantTry,
  onDeleteRestaurantTry,
  onAddCookingAttempt,
  onUpdateCookingAttempt,
  onDeleteCookingAttempt,
}: DishCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(dish.name);
  const [editNotes, setEditNotes] = useState(dish.notes || '');

  // Form states
  const [showAddTry, setShowAddTry] = useState(false);
  const [showAddAttempt, setShowAddAttempt] = useState(false);
  const [editingTryId, setEditingTryId] = useState<string | null>(null);
  const [editingAttemptId, setEditingAttemptId] = useState<string | null>(null);

  const restaurantTries = dish.restaurantTries || [];
  const cookingAttempts = dish.cookingAttempts || [];

  const getRestaurantName = (tryItem: RestaurantTry): string => {
    if (tryItem.restaurantName) return tryItem.restaurantName;
    if (tryItem.restaurantId) {
      const restaurant = restaurants.find(r => r.id === tryItem.restaurantId);
      return restaurant?.name || 'Unknown restaurant';
    }
    return 'Unknown restaurant';
  };

  const handleSaveEdit = () => {
    onUpdate(dish.id, {
      name: editName.trim(),
      notes: editNotes.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(dish.name);
    setEditNotes(dish.notes || '');
    setIsEditing(false);
  };

  const handleAddTry = (data: Omit<RestaurantTry, 'id'>) => {
    onAddRestaurantTry(dish.id, data);
    setShowAddTry(false);
  };

  const handleUpdateTry = (tryId: string, data: Omit<RestaurantTry, 'id'>) => {
    onUpdateRestaurantTry(dish.id, tryId, data);
    setEditingTryId(null);
  };

  const handleAddAttempt = (data: Omit<CookingAttempt, 'id'>) => {
    onAddCookingAttempt(dish.id, data);
    setShowAddAttempt(false);
  };

  const handleUpdateAttempt = (attemptId: string, data: Omit<CookingAttempt, 'id'>) => {
    onUpdateCookingAttempt(dish.id, attemptId, data);
    setEditingAttemptId(null);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-4" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.herb }}>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': systemColors.herb } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': systemColors.herb } as React.CSSProperties}
              placeholder="Your thoughts on this dish..."
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 text-white py-2 px-4 rounded-md transition-colors"
              style={{ backgroundColor: systemColors.herb }}
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{dish.name}</h4>
          {dish.region && (
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>
              {dish.region}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.herb)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(dish.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {dish.notes && (
        <p className="text-sm text-gray-600 mb-3">{dish.notes}</p>
      )}

      {/* Restaurant Tries Section */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-medium flex items-center gap-1" style={{ color: systemColors.saffron }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Restaurant Tries ({restaurantTries.length})
          </h5>
          {!showAddTry && !editingTryId && (
            <button
              onClick={() => setShowAddTry(true)}
              className="text-xs transition-colors"
              style={{ color: systemColors.saffron }}
            >
              + Add Try
            </button>
          )}
        </div>

        {showAddTry && (
          <div className="mb-2">
            <RestaurantTryForm
              restaurants={restaurants}
              onSubmit={handleAddTry}
              onCancel={() => setShowAddTry(false)}
            />
          </div>
        )}

        {restaurantTries.length > 0 && (
          <div className="space-y-2">
            {restaurantTries.map((tryItem) => (
              <div key={tryItem.id}>
                {editingTryId === tryItem.id ? (
                  <RestaurantTryForm
                    restaurants={restaurants}
                    existingTry={tryItem}
                    onSubmit={(data) => handleUpdateTry(tryItem.id, data)}
                    onCancel={() => setEditingTryId(null)}
                  />
                ) : (
                  <div className="rounded-md p-2 text-sm" style={{ backgroundColor: systemColors.saffronLight }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-medium text-gray-800">
                          {getRestaurantName(tryItem)}
                        </span>
                        <span className="text-gray-500 ml-2">
                          {formatDate(tryItem.date)}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingTryId(tryItem.id)}
                          className="text-gray-400 transition-colors p-1"
                          onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.saffron)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteRestaurantTry(dish.id, tryItem.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {tryItem.rating && (
                      <div className="mt-1">
                        <RatingStars rating={tryItem.rating} />
                      </div>
                    )}
                    {tryItem.notes && (
                      <p className="text-gray-600 mt-1">{tryItem.notes}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {restaurantTries.length === 0 && !showAddTry && (
          <p className="text-xs text-gray-400">No restaurant tries logged</p>
        )}
      </div>

      {/* Cooking Attempts Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-medium flex items-center gap-1" style={{ color: systemColors.herb }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cooking Attempts ({cookingAttempts.length})
          </h5>
          {!showAddAttempt && !editingAttemptId && (
            <button
              onClick={() => setShowAddAttempt(true)}
              className="text-xs transition-colors"
              style={{ color: systemColors.herb }}
            >
              + Add Attempt
            </button>
          )}
        </div>

        {showAddAttempt && (
          <div className="mb-2">
            <CookingAttemptForm
              onSubmit={handleAddAttempt}
              onCancel={() => setShowAddAttempt(false)}
            />
          </div>
        )}

        {cookingAttempts.length > 0 && (
          <div className="space-y-2">
            {cookingAttempts.map((attempt) => (
              <div key={attempt.id}>
                {editingAttemptId === attempt.id ? (
                  <CookingAttemptForm
                    existingAttempt={attempt}
                    onSubmit={(data) => handleUpdateAttempt(attempt.id, data)}
                    onCancel={() => setEditingAttemptId(null)}
                  />
                ) : (
                  <div className="rounded-md p-2 text-sm" style={{ backgroundColor: systemColors.herbLight }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-gray-500">
                          {formatDate(attempt.date)}
                        </span>
                        {attempt.recipeSource && (
                          <span className="ml-2" style={{ color: systemColors.herb }}>
                            from {attempt.recipeSource}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingAttemptId(attempt.id)}
                          className="text-gray-400 transition-colors p-1"
                          onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.herb)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteCookingAttempt(dish.id, attempt.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {attempt.successRating && (
                      <div className="mt-1">
                        <span style={{ color: systemColors.herb }}>
                          {'★'.repeat(attempt.successRating)}
                          {'☆'.repeat(5 - attempt.successRating)}
                        </span>
                      </div>
                    )}
                    {attempt.notes && (
                      <p className="text-gray-600 mt-1">{attempt.notes}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {cookingAttempts.length === 0 && !showAddAttempt && (
          <p className="text-xs text-gray-400">No cooking attempts logged</p>
        )}
      </div>
    </div>
  );
}
