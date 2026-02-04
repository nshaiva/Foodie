import { useState } from 'react';
import type { Restaurant, RestaurantTry } from '../data/types';

interface RestaurantTryFormProps {
  restaurants: Restaurant[];
  existingTry?: RestaurantTry;
  onSubmit: (data: Omit<RestaurantTry, 'id'>) => void;
  onCancel: () => void;
}

export function RestaurantTryForm({ restaurants, existingTry, onSubmit, onCancel }: RestaurantTryFormProps) {
  const [useLinkedRestaurant, setUseLinkedRestaurant] = useState(
    existingTry ? !!existingTry.restaurantId : restaurants.length > 0
  );
  const [restaurantId, setRestaurantId] = useState(existingTry?.restaurantId || '');
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

    if (useLinkedRestaurant && !restaurantId) return;
    if (!useLinkedRestaurant && !restaurantName.trim()) return;

    onSubmit({
      restaurantId: useLinkedRestaurant ? restaurantId : undefined,
      restaurantName: useLinkedRestaurant ? undefined : restaurantName.trim(),
      date: new Date(date).toISOString(),
      rating: rating ? parseInt(rating, 10) : undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 rounded-lg border border-amber-200 p-4">
      <h4 className="font-medium text-gray-900 mb-3">
        {existingTry ? 'Edit Restaurant Try' : 'Add Restaurant Try'}
      </h4>

      <div className="space-y-3">
        {restaurants.length > 0 && (
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={useLinkedRestaurant}
                onChange={() => setUseLinkedRestaurant(true)}
                className="text-amber-600"
              />
              <span className="text-sm text-gray-700">Choose from my restaurants</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!useLinkedRestaurant}
                onChange={() => setUseLinkedRestaurant(false)}
                className="text-amber-600"
              />
              <span className="text-sm text-gray-700">Enter name manually</span>
            </label>
          </div>
        )}

        {useLinkedRestaurant && restaurants.length > 0 ? (
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
              {restaurants.map((r) => (
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="How was it at this restaurant?"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
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
