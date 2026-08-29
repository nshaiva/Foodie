import { useState, useEffect } from 'react';
import type { RestaurantTry, RegionalCuisine, Dish } from '../data/types';
import { systemColors } from '../data/systemColors';
import { regionNameFor } from '../utils/dishRegion';
import { isCloudConfigured } from '../lib/supabase';
import { lookupMenuItem, type LookupOutcome } from '../lib/menuLookup';

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
    kind?: 'food' | 'drink';
    /** Set when the details came from an AI menu lookup */
    source?: 'lookup';
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
  }) => void;
  onCancel: () => void;
}

/**
 * Best guess at a region for a hand-entered dish name.
 *
 * Two signals, in order: an exact name match against one of the country's
 * popular dishes (whose `regionalOrigin` then runs through the shared resolver),
 * or a name that appears in some region's `signatureDishes`. Falls back to the
 * raw origin string when we know where it's from but not which region that is.
 */
function detectRegion(
  dishName: string,
  countryId: string,
  regionalVariations?: RegionalCuisine[],
  popularDishes?: Dish[]
): string | undefined {
  if (!dishName.trim()) return undefined;
  const normalizedName = dishName.trim().toLowerCase();

  const matchedDish = popularDishes?.find(
    d => d.name.toLowerCase() === normalizedName ||
         d.englishName?.toLowerCase() === normalizedName
  );
  if (matchedDish?.regionalOrigin) {
    return regionNameFor(matchedDish, regionalVariations, countryId);
  }

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

  // "Fill in with AI": the same menu lookup as the at-the-restaurant search,
  // used to draft this form. What it fills stays editable; the entry is
  // marked source: 'lookup' so its guessed traits never feed the profile.
  const [fill, setFill] = useState<{ kind: 'idle' } | { kind: 'loading' } | { kind: 'done'; outcome: LookupOutcome; for: string }>({ kind: 'idle' });
  const [kind, setKind] = useState<'food' | 'drink' | undefined>(undefined);
  const [fromLookup, setFromLookup] = useState(false);
  const knownDish = !!popularDishes?.some(
    d => d.name.toLowerCase() === name.trim().toLowerCase() || d.englishName?.toLowerCase() === name.trim().toLowerCase()
  );
  const canFill = isCloudConfigured && name.trim().length >= 2 && !knownDish && fill.kind !== 'loading';

  const fillWithAI = async () => {
    const q = name.trim();
    setFill({ kind: 'loading' });
    const outcome = await lookupMenuItem(q, countryId, countryName);
    setFill({ kind: 'done', outcome, for: q });
    if (!outcome.ok) return;
    const r = outcome.result;
    // A category ("casserole") becomes its most likely specific dish; still editable
    if (r.scope === 'generic' && r.likelyDishes?.[0]) setName(r.likelyDishes[0]);
    else if (r.name && r.confidence !== 'low') setName(r.name);
    const draft = `${r.description}${r.keyIngredients.length ? ` Likely ingredients: ${r.keyIngredients.join(', ')}.` : ''}`;
    setNotes(prev => (prev.trim() ? prev : draft));
    setKind(r.category === 'beverage' ? 'drink' : 'food');
    setFromLookup(true);
  };

  // "Where I ate it" fields
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDate, setRestaurantDate] = useState(new Date().toISOString().split('T')[0]);
  const [restaurantNotes, setRestaurantNotes] = useState('');

  // Auto-detect region when dish name changes
  useEffect(() => {
    const detected = detectRegion(name, countryId, regionalVariations, popularDishes);
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
      kind,
      source: fromLookup ? 'lookup' : undefined,
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
          {isCloudConfigured && !knownDish && name.trim().length >= 2 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <button
                type="button"
                onClick={fillWithAI}
                disabled={!canFill}
                className="tap btn-press text-xs font-semibold disabled:opacity-60"
                style={{ color: systemColors.tomato }}
              >
                {fill.kind === 'loading' ? 'Asking…' : '✦ Fill in with AI'}
              </button>
              {fill.kind === 'done' && fill.for && (
                <span className="text-xs" style={{ color: fill.outcome.ok ? systemColors.navyMuted : systemColors.tomato }}>
                  {fill.outcome.ok
                    ? `Drafted from a lookup — edit anything. ${fill.outcome.cached ? 'From a previous lookup.' : `${fill.outcome.remaining} left today.`}${fill.outcome.result.scope === 'generic' && fill.outcome.result.likelyDishes?.length > 1 ? ` Could also be: ${fill.outcome.result.likelyDishes.slice(1).join(', ')}.` : ''}`
                    : fill.outcome.error === 'daily_limit'
                      ? (fill.outcome.signedIn ? `Today's ${fill.outcome.cap} lookups are used.` : `Guests get ${fill.outcome.cap} lookups a day; sign in for more.`)
                      : 'Lookup unavailable right now.'}
                </span>
              )}
            </div>
          )}
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
