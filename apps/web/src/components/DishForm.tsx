import { useState, useEffect } from 'react';
import type { RestaurantTry, RegionalCuisine, Dish } from '../data/types';
import { systemColors } from '../data/systemColors';

type TryType = 'none' | 'restaurant';

interface DishFormProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  regionalVariations?: RegionalCuisine[];
  popularDishes?: Dish[];
  onSubmit: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
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
  onSubmit,
  onCancel
}: DishFormProps) {
  const [name, setName] = useState('');
  const [tasteRating, setTasteRating] = useState('');
  const [notes, setNotes] = useState('');
  const [region, setRegion] = useState('');
  const [showRegion, setShowRegion] = useState(false);
  const [detectedRegion, setDetectedRegion] = useState<string | undefined>();

  const [tryType, setTryType] = useState<TryType>('none');

  // "Where I ate it" fields
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantNotes, setRestaurantNotes] = useState('');

  // Auto-detect region when dish name changes
  useEffect(() => {
    const detected = detectRegion(name, regionalVariations, popularDishes);
    setDetectedRegion(detected);
    if (detected && !region) {
      setRegion(detected);
    }
  }, [name, regionalVariations, popularDishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let initialRestaurantTry: Omit<RestaurantTry, 'id'> | undefined;

    if (tryType === 'restaurant') {
      initialRestaurantTry = {
        restaurantName: restaurantName.trim() || undefined,
        date: new Date(restaurantDate).toISOString(),
        rating: tasteRating ? parseInt(tasteRating, 10) : undefined,
        notes: restaurantNotes.trim() || undefined,
      };
    }

    onSubmit({
      countryId,
      region: region || undefined,
      name: name.trim(),
      notes: notes.trim() || undefined,
      // Only save tasteRating on the dish when "just logging" — tries store their own rating
      tasteRating: tryType === 'none' && tasteRating ? parseInt(tasteRating, 10) : undefined,
      initialRestaurantTry,
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
            {tryType === 'restaurant' ? 'How was it where you had it?' : 'How much did you like it?'}
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
            placeholder="Your thoughts, what made it special..."
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
              I ate out
            </button>
          </div>
        </div>

        {/* Where details */}
        {tryType === 'restaurant' && (
          <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: systemColors.saffronLight, borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.saffron }}>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Where did you eat it? <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder="e.g., Little Bangkok"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={restaurantDate}
                  onChange={(e) => setRestaurantDate(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes about this visit</label>
                <input
                  type="text"
                  value={restaurantNotes}
                  onChange={(e) => setRestaurantNotes(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="How was it?"
                />
              </div>
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
