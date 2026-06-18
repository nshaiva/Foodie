import { useState } from 'react';
import { countries } from '../../data/countries';
import { getRegionsForCountry } from '../../data/countryHelpers';
import { systemColors } from '../../data/systemColors';
import type { UserDish, RestaurantTry } from '../../data/types';

type InitialTryType = 'none' | 'restaurant';

interface AddDishFormProps {
  onAddDish: (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function AddDishForm({ onAddDish, onCancel }: AddDishFormProps) {
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const [initialTryType, setInitialTryType] = useState<InitialTryType>('none');

  // Taste rating (used when "just logging")
  const [tasteRating, setTasteRating] = useState('');

  // "Where I ate it" fields
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantRating, setRestaurantRating] = useState('');
  const [restaurantNotes, setRestaurantNotes] = useState('');

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    let initialRestaurantTry: RestaurantTry | undefined;
    if (initialTryType === 'restaurant') {
      initialRestaurantTry = {
        id: crypto.randomUUID(),
        restaurantName: restaurantName.trim() || undefined,
        date: new Date(restaurantDate).toISOString(),
        rating: restaurantRating ? parseInt(restaurantRating, 10) : undefined,
        notes: restaurantNotes.trim() || undefined,
      };
    }

    onAddDish({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      notes: formNotes.trim() || undefined,
      tasteRating: initialTryType === 'none' && tasteRating ? parseInt(tasteRating, 10) : undefined,
      restaurantTries: initialRestaurantTry ? [initialRestaurantTry] : [],
    });

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 mb-6" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.herb }}>
      <h3 className="font-medium text-gray-900 mb-4">Log a Dish</h3>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
              required
            >
              <option value="">Select a country</option>
              {countries
                .slice()
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
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
            Dish Name *
          </label>
          <input
            type="text"
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
            placeholder="e.g., Pad Thai"
            required
          />
        </div>

        {/* Taste rating (when just logging) */}
        {initialTryType === 'none' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How much did you like it?</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setTasteRating(tasteRating === star.toString() ? '' : star.toString())}
                  className="text-2xl transition-colors"
                  style={{ color: parseInt(tasteRating) >= star ? systemColors.saffron : '#d1d5db' }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="formNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="formNotes"
            value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
            placeholder="General notes about this dish..."
          />
        </div>

        {/* How did you have it */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How did you have it?
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInitialTryType('none')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                initialTryType === 'none'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Just logging
            </button>
            <button
              type="button"
              onClick={() => setInitialTryType('restaurant')}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: initialTryType === 'restaurant' ? systemColors.saffron : systemColors.saffronLight,
                color: initialTryType === 'restaurant' ? 'white' : systemColors.navy
              }}
            >
              I ate out
            </button>
          </div>
        </div>

        {/* Where details */}
        {initialTryType === 'restaurant' && (
          <div className="rounded-lg p-3 space-y-3" style={{ backgroundColor: systemColors.saffronLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.saffron }}>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={restaurantDate}
                  onChange={(e) => setRestaurantDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={restaurantRating}
                  onChange={(e) => setRestaurantRating(e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={restaurantNotes}
                onChange={(e) => setRestaurantNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder="How was it?"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={!formCountryId || !formName.trim()}
          className="flex-1 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: systemColors.herb }}
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
