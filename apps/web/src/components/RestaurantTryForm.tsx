import { useState } from 'react';
import type { RestaurantTry } from '../data/types';
import { systemColors } from '../data/systemColors';

interface RestaurantTryFormProps {
  existingTry?: RestaurantTry;
  onSubmit: (data: Omit<RestaurantTry, 'id'>) => void;
  onCancel: () => void;
}

export function RestaurantTryForm({ existingTry, onSubmit, onCancel }: RestaurantTryFormProps) {
  const [restaurantName, setRestaurantName] = useState(existingTry?.restaurantName || '');
  const [date, setDate] = useState(
    existingTry?.date
      ? new Date(existingTry.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [rating, setRating] = useState(existingTry?.rating?.toString() || '');
  const [notes, setNotes] = useState(existingTry?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      restaurantName: restaurantName.trim() || undefined,
      date: new Date(date).toISOString(),
      rating: rating ? parseInt(rating, 10) : undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg p-4" style={{ backgroundColor: systemColors.saffronLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.saffron }}>
      <h4 className="font-medium text-gray-900 mb-3">
        {existingTry ? 'Edit Try' : 'Add a Try'}
      </h4>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Where did you eat it? <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            placeholder="e.g., Little Bangkok"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            placeholder="How was it?"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 text-white py-2 px-4 rounded-md transition-colors"
          style={{ backgroundColor: systemColors.saffron }}
        >
          {existingTry ? 'Save' : 'Add Try'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
