import { useState } from 'react';
import type { UserDish, Restaurant } from '../data/types';

interface DishCardProps {
  dish: UserDish;
  linkedRestaurants: Restaurant[];
  onUpdate: (id: string, updates: Partial<Omit<UserDish, 'id' | 'createdAt' | 'countryId'>>) => void;
  onDelete: (id: string) => void;
}

export function DishCard({ dish, linkedRestaurants, onUpdate, onDelete }: DishCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(dish.name);
  const [editNotes, setEditNotes] = useState(dish.notes || '');

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

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg border border-emerald-300 p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your thoughts on this dish..."
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
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
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{dish.name}</h4>
          {dish.region && (
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
              {dish.region}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-emerald-500 transition-colors"
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
        <p className="text-sm text-gray-600 mb-2">{dish.notes}</p>
      )}

      {linkedRestaurants.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-xs text-gray-500">Tried at:</span>
          {linkedRestaurants.map((restaurant) => (
            <span
              key={restaurant.id}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
            >
              {restaurant.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
