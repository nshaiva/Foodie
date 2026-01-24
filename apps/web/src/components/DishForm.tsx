import { useState } from 'react';
import type { Restaurant } from '../data/types';

interface DishFormProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  restaurants: Restaurant[];
  onSubmit: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    restaurantIds?: string[];
  }) => void;
  onCancel: () => void;
}

export function DishForm({ countryId, countryName, regions, restaurants, onSubmit, onCancel }: DishFormProps) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      countryId,
      region: region || undefined,
      name: name.trim(),
      notes: notes.trim() || undefined,
      restaurantIds: selectedRestaurants.length > 0 ? selectedRestaurants : undefined,
    });
  };

  const toggleRestaurant = (restaurantId: string) => {
    setSelectedRestaurants(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-4">Log a Dish from {countryName}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="dishName" className="block text-sm font-medium text-gray-700 mb-1">
            Dish Name *
          </label>
          <input
            type="text"
            id="dishName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., Pad Thai"
            required
          />
        </div>

        {regions && regions.length > 0 && (
          <div>
            <label htmlFor="dishRegion" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              id="dishRegion"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select a region (optional)</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="dishNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="dishNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="How was it? Any thoughts?"
          />
        </div>

        {restaurants.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tried at these restaurants (optional)
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {restaurants.map((restaurant) => (
                <label
                  key={restaurant.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRestaurants.includes(restaurant.id)}
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
          className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Save Dish
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
