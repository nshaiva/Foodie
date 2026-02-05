import { useState, useEffect } from 'react';
import type { Restaurant, RestaurantTry, CookingAttempt, RegionalCuisine, Dish } from '../data/types';
import { systemColors } from '../data/systemColors';

type TryType = 'none' | 'restaurant' | 'cooked';

interface DishFormProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  regionalVariations?: RegionalCuisine[];
  popularDishes?: Dish[];
  restaurants: Restaurant[];
  onSubmit: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
    initialCookingAttempt?: Omit<CookingAttempt, 'id'>;
  }) => void;
  onCancel: () => void;
}

// Detect region from dish name
function detectRegion(
  dishName: string,
  regionalVariations?: RegionalCuisine[],
  popularDishes?: Dish[]
): string | undefined {
  if (!dishName.trim()) return undefined;
  const normalizedName = dishName.trim().toLowerCase();

  // Check popular dishes for regional origin
  if (popularDishes) {
    const matchedDish = popularDishes.find(
      d => d.name.toLowerCase() === normalizedName ||
           d.englishName?.toLowerCase() === normalizedName
    );
    if (matchedDish?.regionalOrigin) {
      // Extract just the region name (e.g., "Isan (Northeastern Thailand)" -> "Northeastern Thailand (Isan)")
      // Try to match with regional variations
      if (regionalVariations) {
        const matchedRegion = regionalVariations.find(r =>
          matchedDish.regionalOrigin!.toLowerCase().includes(r.name.toLowerCase())
        );
        if (matchedRegion) return matchedRegion.name;
      }
      return matchedDish.regionalOrigin;
    }
  }

  // Check regional signature dishes
  if (regionalVariations) {
    for (const region of regionalVariations) {
      const isSignatureDish = region.signatureDishes.some(
        dish => dish.toLowerCase() === normalizedName ||
                normalizedName.includes(dish.toLowerCase())
      );
      if (isSignatureDish) return region.name;
    }
  }

  return undefined;
}

export function DishForm({
  countryId,
  countryName,
  regions,
  regionalVariations,
  popularDishes,
  restaurants,
  onSubmit,
  onCancel
}: DishFormProps) {
  const [name, setName] = useState('');
  const [tasteRating, setTasteRating] = useState('');
  const [notes, setNotes] = useState('');
  const [region, setRegion] = useState('');
  const [showRegion, setShowRegion] = useState(false);
  const [detectedRegion, setDetectedRegion] = useState<string | undefined>();

  // Try type
  const [tryType, setTryType] = useState<TryType>('none');

  // Restaurant fields
  const [useLinkedRestaurant, setUseLinkedRestaurant] = useState(restaurants.length > 0);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantNotes, setRestaurantNotes] = useState('');

  // Cooking fields
  const [cookingDate, setCookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [cookingRating, setCookingRating] = useState('');
  const [recipeSource, setRecipeSource] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');

  // Auto-detect region when dish name changes
  useEffect(() => {
    const detected = detectRegion(name, regionalVariations, popularDishes);
    setDetectedRegion(detected);
    // Only auto-fill if user hasn't manually selected a region
    if (detected && !region) {
      setRegion(detected);
    }
  }, [name, regionalVariations, popularDishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Validate restaurant try if selected
    if (tryType === 'restaurant') {
      if (useLinkedRestaurant && !restaurantId) return;
      if (!useLinkedRestaurant && !restaurantName.trim()) return;
    }

    let initialRestaurantTry: Omit<RestaurantTry, 'id'> | undefined;
    let initialCookingAttempt: Omit<CookingAttempt, 'id'> | undefined;

    if (tryType === 'restaurant') {
      initialRestaurantTry = {
        restaurantId: useLinkedRestaurant ? restaurantId : undefined,
        restaurantName: useLinkedRestaurant ? undefined : restaurantName.trim(),
        date: new Date(restaurantDate).toISOString(),
        rating: tasteRating ? parseInt(tasteRating, 10) : undefined,
        notes: restaurantNotes.trim() || undefined,
      };
    } else if (tryType === 'cooked') {
      initialCookingAttempt = {
        date: new Date(cookingDate).toISOString(),
        successRating: cookingRating ? parseInt(cookingRating, 10) : undefined,
        recipeSource: recipeSource.trim() || undefined,
        notes: cookingNotes.trim() || undefined,
      };
    }

    onSubmit({
      countryId,
      region: region || undefined,
      name: name.trim(),
      notes: notes.trim() || undefined,
      // Only save tasteRating on dish when "just logging" - restaurant tries store their own rating
      tasteRating: tryType === 'none' && tasteRating ? parseInt(tasteRating, 10) : undefined,
      initialRestaurantTry,
      initialCookingAttempt,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-4">Log a Dish from {countryName}</h3>

      <div className="space-y-4">
        {/* Dish Name */}
        <div>
          <label htmlFor="dishName" className="block text-sm font-medium text-gray-700 mb-1">
            Dish Name *
          </label>
          <input
            type="text"
            id="dishName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb focus:border-transparent"
            placeholder="e.g., Pad Thai"
            required
          />
        </div>

        {/* Taste Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tryType === 'restaurant' ? 'How was it at this restaurant?' : 'How much did you like it?'}
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setTasteRating(tasteRating === star.toString() ? '' : star.toString())}
                className="text-2xl transition-colors"
                style={{
                  color: parseInt(tasteRating) >= star ? systemColors.saffron : '#d1d5db'
                }}
              >
                ★
              </button>
            ))}
            {tasteRating && (
              <span className="ml-2 text-sm text-gray-500 self-center">
                {tasteRating === '5' && 'Loved it!'}
                {tasteRating === '4' && 'Really good'}
                {tasteRating === '3' && 'It was okay'}
                {tasteRating === '2' && 'Not great'}
                {tasteRating === '1' && "Didn't like it"}
              </span>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="dishNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="dishNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb focus:border-transparent"
            placeholder="Your thoughts, where you had it, what made it special..."
          />
        </div>

        {/* How did you try it */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How did you try it?
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTryType('none')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                tryType === 'none'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Just logging
            </button>
            <button
              type="button"
              onClick={() => setTryType('restaurant')}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: tryType === 'restaurant' ? systemColors.saffron : systemColors.saffronLight,
                color: tryType === 'restaurant' ? 'white' : systemColors.navy
              }}
            >
              At a restaurant
            </button>
            <button
              type="button"
              onClick={() => setTryType('cooked')}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: tryType === 'cooked' ? systemColors.herb : systemColors.herbLight,
                color: tryType === 'cooked' ? 'white' : systemColors.navy
              }}
            >
              I cooked it
            </button>
          </div>
        </div>

        {/* Restaurant details */}
        {tryType === 'restaurant' && (
          <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: systemColors.saffronLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.saffron }}>
            {restaurants.length > 0 && (
              <div className="flex gap-4">
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
                  <span className="text-sm text-gray-700">New restaurant</span>
                </label>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {useLinkedRestaurant && restaurants.length > 0 ? (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Restaurant *</label>
                  <select
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                    required
                  >
                    <option value="">Select restaurant</option>
                    {restaurants.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Restaurant Name *</label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                    placeholder="e.g., Little Bangkok"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={restaurantDate}
                  onChange={(e) => setRestaurantDate(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Notes about this visit</label>
              <input
                type="text"
                value={restaurantNotes}
                onChange={(e) => setRestaurantNotes(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder="How was it here?"
              />
            </div>
          </div>
        )}

        {/* Cooking details */}
        {tryType === 'cooked' && (
          <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: systemColors.herbLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.herb }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={cookingDate}
                  onChange={(e) => setCookingDate(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">How did it turn out?</label>
                <select
                  value={cookingRating}
                  onChange={(e) => setCookingRating(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                >
                  <option value="">No rating</option>
                  <option value="5">Nailed it!</option>
                  <option value="4">Pretty good</option>
                  <option value="3">Decent</option>
                  <option value="2">Needs work</option>
                  <option value="1">Disaster</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Recipe Source</label>
                <input
                  type="text"
                  value={recipeSource}
                  onChange={(e) => setRecipeSource(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                  placeholder="YouTube, cookbook..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Notes about this attempt</label>
              <input
                type="text"
                value={cookingNotes}
                onChange={(e) => setCookingNotes(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb"
                placeholder="What worked? What would you change?"
              />
            </div>
          </div>
        )}

        {/* Region - collapsed by default unless detected */}
        {regions && regions.length > 0 && (
          <div>
            {!showRegion && !detectedRegion ? (
              <button
                type="button"
                onClick={() => setShowRegion(true)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                + Add region (optional)
              </button>
            ) : (
              <div>
                <label htmlFor="dishRegion" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                  {detectedRegion && (
                    <span className="ml-2 font-normal" style={{ color: systemColors.herb }}>
                      (auto-detected)
                    </span>
                  )}
                </label>
                <select
                  id="dishRegion"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb focus:border-transparent"
                >
                  <option value="">Select a region (optional)</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="flex-1 text-white py-2 px-4 rounded-md transition-colors"
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
