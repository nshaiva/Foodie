import { useState } from 'react';
import { countries } from '../../data/countries';
import { getRegionsForCountry } from '../../data/countryHelpers';
import { systemColors } from '../../data/systemColors';
import type { Restaurant, UserDish, RestaurantTry, CookingAttempt } from '../../data/types';

type InitialTryType = 'none' | 'restaurant' | 'cooked';

interface AddDishFormProps {
  /** All logged restaurants — used to offer linking a try to an existing restaurant. */
  restaurants: Restaurant[];
  onAddDish: (dish: Omit<UserDish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  findOrCreateRestaurant: (countryId: string, name: string, dateVisited?: string) => Restaurant;
  onCancel: () => void;
}

export function AddDishForm({ restaurants, onAddDish, findOrCreateRestaurant, onCancel }: AddDishFormProps) {
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const [initialTryType, setInitialTryType] = useState<InitialTryType>('none');

  // Restaurant try fields
  const [useLinkedRestaurant, setUseLinkedRestaurant] = useState(true);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantRating, setRestaurantRating] = useState('');
  const [restaurantNotes, setRestaurantNotes] = useState('');

  // Cooking attempt fields
  const [cookingDate, setCookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [cookingRating, setCookingRating] = useState('');
  const [recipeSource, setRecipeSource] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');

  const getRestaurantsForCountry = (countryId: string) =>
    restaurants.filter(r => r.countryId === countryId);

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];
  const selectedCountryRestaurants = formCountryId ? getRestaurantsForCountry(formCountryId) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    // Validate restaurant try if selected
    if (initialTryType === 'restaurant') {
      if (useLinkedRestaurant && !restaurantId) return;
      if (!useLinkedRestaurant && !restaurantName.trim()) return;
    }

    let initialRestaurantTry: RestaurantTry | undefined;
    let initialCookingAttempt: CookingAttempt | undefined;

    if (initialTryType === 'restaurant') {
      const tryDate = new Date(restaurantDate).toISOString();

      // Auto-create restaurant if name provided without ID
      let finalRestaurantId = useLinkedRestaurant ? restaurantId : undefined;
      if (!useLinkedRestaurant && restaurantName.trim()) {
        const restaurant = findOrCreateRestaurant(formCountryId, restaurantName.trim(), tryDate);
        finalRestaurantId = restaurant.id;
      }

      initialRestaurantTry = {
        id: crypto.randomUUID(),
        restaurantId: finalRestaurantId,
        restaurantName: undefined, // Always link to restaurant now
        date: tryDate,
        rating: restaurantRating ? parseInt(restaurantRating, 10) : undefined,
        notes: restaurantNotes.trim() || undefined,
      };
    } else if (initialTryType === 'cooked') {
      initialCookingAttempt = {
        id: crypto.randomUUID(),
        date: new Date(cookingDate).toISOString(),
        successRating: cookingRating ? parseInt(cookingRating, 10) : undefined,
        recipeSource: recipeSource.trim() || undefined,
        notes: cookingNotes.trim() || undefined,
      };
    }

    onAddDish({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      notes: formNotes.trim() || undefined,
      restaurantTries: initialRestaurantTry ? [initialRestaurantTry] : [],
      cookingAttempts: initialCookingAttempt ? [initialCookingAttempt] : [],
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
                setRestaurantId('');
                setUseLinkedRestaurant(getRestaurantsForCountry(e.target.value).length > 0);
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

        {/* Initial try type selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How did you try this dish?
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
              At a restaurant
            </button>
            <button
              type="button"
              onClick={() => setInitialTryType('cooked')}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: initialTryType === 'cooked' ? systemColors.herb : systemColors.herbLight,
                color: initialTryType === 'cooked' ? 'white' : systemColors.navy
              }}
            >
              I cooked it
            </button>
          </div>
        </div>

        {/* Restaurant try form */}
        {initialTryType === 'restaurant' && (
          <div className="rounded-lg p-3 space-y-3" style={{ backgroundColor: systemColors.saffronLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.saffron }}>
            {selectedCountryRestaurants.length > 0 && (
              <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useLinkedRestaurant}
                    onChange={() => setUseLinkedRestaurant(true)}
                    style={{ accentColor: systemColors.saffron }}
                  />
                  <span className="text-sm text-gray-700">My restaurants</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useLinkedRestaurant}
                    onChange={() => setUseLinkedRestaurant(false)}
                    style={{ accentColor: systemColors.saffron }}
                  />
                  <span className="text-sm text-gray-700">Enter name</span>
                </label>
              </div>
            )}

            {useLinkedRestaurant && selectedCountryRestaurants.length > 0 ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant *
                </label>
                <select
                  value={restaurantId}
                  onChange={(e) => setRestaurantId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                  required
                >
                  <option value="">Select a restaurant</option>
                  {selectedCountryRestaurants.map((r) => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
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
                  value={restaurantDate}
                  onChange={(e) => setRestaurantDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={restaurantNotes}
                onChange={(e) => setRestaurantNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder="How was it at this restaurant?"
              />
            </div>
          </div>
        )}

        {/* Cooking attempt form */}
        {initialTryType === 'cooked' && (
          <div className="rounded-lg p-3 space-y-3" style={{ backgroundColor: systemColors.herbLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.herb }}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={cookingDate}
                  onChange={(e) => setCookingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How did it turn out?
                </label>
                <select
                  value={cookingRating}
                  onChange={(e) => setCookingRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                >
                  <option value="">No rating</option>
                  <option value="5">5 - Nailed it!</option>
                  <option value="4">4 - Pretty good</option>
                  <option value="3">3 - Decent</option>
                  <option value="2">2 - Needs work</option>
                  <option value="1">1 - Disaster</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Source
              </label>
              <input
                type="text"
                value={recipeSource}
                onChange={(e) => setRecipeSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                placeholder="e.g., YouTube, cookbook, family recipe..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={cookingNotes}
                onChange={(e) => setCookingNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                placeholder="What worked? What would you change?"
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
