import { useState } from 'react';
import { WantToTryButton } from '../../WantToTryButton';
import { FavoriteButton } from '../../FavoriteButton';
import { MyActivitySection } from '../MyActivitySection';
import { systemColors } from '../../../data/systemColors';
import type { Dish, Beverage, UserDish, RestaurantTry, RegionalCuisine, ColorPalette } from '../../../data/types';

interface EatDrinkSlideProps {
  countryId: string;
  countryName: string;
  popularDishes: Dish[];
  popularBeverages?: Beverage[];
  regionalVariations?: RegionalCuisine[];
  colors: ColorPalette;
  // Logged dishes + CRUD (logging now lives here, in context)
  countryDishes: UserDish[];
  onAddDish: (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
  }) => void;
  onUpdateDish: (id: string, data: Partial<UserDish>) => void;
  onDeleteDish: (id: string) => void;
  onAddRestaurantTry: (dishId: string, data: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, data: Partial<RestaurantTry>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
  // Favorites / wishlist
  isOnWishlist: (countryId: string, dishName: string) => boolean;
  isFavorite: (countryId: string, dishName: string) => boolean;
  addToWishlist: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromWishlist: (id: string) => void;
  findWishlistItem: (countryId: string, dishName: string) => { id: string } | undefined;
  addToFavorites: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromFavorites: (id: string) => void;
  findFavoriteItem: (countryId: string, dishName: string) => { id: string } | undefined;
}

const DISH_EMOJI: Record<Dish['category'], string> = {
  appetizer: '🥟', soup: '🍲', salad: '🥗', main: '🍽️', side: '🍚',
  'street-food': '🥢', dessert: '🍰', beverage: '🥤', breakfast: '🍳', condiment: '🥣',
};

const BEVERAGE_EMOJI: Record<string, string> = {
  tea: '🍵', coffee: '☕', juice: '🧃', soda: '🥤', beer: '🍺',
  wine: '🍷', spirit: '🥃', cocktail: '🍸', street: '🥤', ceremonial: '🍵',
};

function spiceChip(level: Dish['spiceLevel']) {
  if (!level || level === 'none') return null;
  const cls =
    level === 'mild' ? 'bg-yellow-100 text-yellow-800' :
    level === 'medium' ? 'bg-orange-100 text-orange-800' :
    level === 'hot' ? 'bg-red-100 text-red-800' :
    'bg-red-200 text-red-900';
  const label = level === 'very-hot' ? 'Very Hot' : level.charAt(0).toUpperCase() + level.slice(1);
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`}>{label}</span>;
}

function difficultyChip(difficulty: Dish['difficulty']) {
  if (!difficulty) return null;
  const cls =
    difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
    difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
    'bg-rose-100 text-rose-700';
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>;
}

function detectRegion(dish: Dish, regionalVariations?: RegionalCuisine[]): string | undefined {
  if (dish.regionalOrigin) return dish.regionalOrigin.includes('(') ? dish.regionalOrigin.split('(')[0].trim() : dish.regionalOrigin;
  if (!regionalVariations) return undefined;
  const nameLower = dish.name.toLowerCase();
  for (const region of regionalVariations) {
    for (const sig of region.signatureDishes) {
      const s = sig.toLowerCase();
      if (nameLower.includes(s) || s.includes(nameLower)) {
        return region.name.includes('(') ? region.name.split('(')[0].trim() : region.name;
      }
    }
  }
  return undefined;
}

function dishRating(ud: UserDish): number | undefined {
  if (ud.tasteRating) return ud.tasteRating;
  const ratings = (ud.restaurantTries || []).map(t => t.rating).filter((r): r is number => !!r);
  if (ratings.length === 0) return undefined;
  return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
}

const typeChipClass: Record<Beverage['type'], string> = {
  alcoholic: 'bg-purple-100 text-purple-800',
  'non-alcoholic': 'bg-green-100 text-green-800',
  both: 'bg-blue-100 text-blue-800',
};
const typeLabel: Record<Beverage['type'], string> = {
  alcoholic: 'Alcoholic', 'non-alcoholic': 'Non-Alcoholic', both: 'Optional Alcohol',
};

export function EatDrinkSlide(props: EatDrinkSlideProps) {
  const {
    countryId, countryName, popularDishes, popularBeverages, regionalVariations, colors,
    countryDishes, onAddDish, onUpdateDish, onDeleteDish,
    onAddRestaurantTry, onUpdateRestaurantTry, onDeleteRestaurantTry,
    isOnWishlist, isFavorite, addToWishlist, removeFromWishlist, findWishlistItem,
    addToFavorites, removeFromFavorites, findFavoriteItem,
  } = props;

  const hasBeverages = !!popularBeverages && popularBeverages.length > 0;
  const [mode, setMode] = useState<'food' | 'drink'>('food');

  // Map logged dishes by name so popular cards can show a "Tried" marker
  const triedByName = new Map<string, UserDish>();
  countryDishes.forEach(d => triedByName.set(d.name.toLowerCase(), d));
  const triedFor = (dish: Dish) =>
    triedByName.get(dish.name.toLowerCase()) ||
    (dish.englishName ? triedByName.get(dish.englishName.toLowerCase()) : undefined);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-xl font-semibold" style={{ color: systemColors.navy }}>
          Eat &amp; Drink
        </h2>
        {hasBeverages && (
          <div className="inline-flex rounded-lg border overflow-hidden" style={{ borderColor: systemColors.border }}>
            <button
              onClick={() => setMode('food')}
              className="px-4 py-1.5 text-sm font-semibold transition-colors"
              style={mode === 'food' ? { backgroundColor: systemColors.navy, color: '#fff' } : { backgroundColor: '#fff', color: systemColors.navy }}
            >
              🍽 Food
            </button>
            <button
              onClick={() => setMode('drink')}
              className="px-4 py-1.5 text-sm font-semibold transition-colors"
              style={mode === 'drink' ? { backgroundColor: systemColors.navy, color: '#fff' } : { backgroundColor: '#fff', color: systemColors.navy }}
            >
              🥤 Drinks
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {mode === 'food' ? (
          <>
            {/* Your log — prominent, in context (logging lives here) */}
            <MyActivitySection
              embedded
              countryId={countryId}
              countryName={countryName}
              regions={regionalVariations?.map(r => r.name)}
              regionalVariations={regionalVariations}
              popularDishes={popularDishes}
              dishes={countryDishes}
              onAddDish={onAddDish}
              onUpdateDish={onUpdateDish}
              onDeleteDish={onDeleteDish}
              onAddRestaurantTry={onAddRestaurantTry}
              onUpdateRestaurantTry={onUpdateRestaurantTry}
              onDeleteRestaurantTry={onDeleteRestaurantTry}
            />

            {/* Popular dishes — discovery, with "tried" markers */}
            <h3 className="text-sm font-semibold mt-6 mb-3" style={{ color: systemColors.navy }}>
              Popular dishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularDishes.map((dish) => {
                const region = detectRegion(dish, regionalVariations);
                const tried = triedFor(dish);
                const rating = tried ? dishRating(tried) : undefined;
                return (
                  <div key={dish.name} className="relative bg-white rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md">
                    <div className="absolute top-3 right-3 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <FavoriteButton
                        isFavorite={isFavorite(countryId, dish.name)}
                        onAdd={() => addToFavorites({ countryId, dishName: dish.name, englishName: dish.englishName })}
                        onRemove={() => { const i = findFavoriteItem(countryId, dish.name); if (i) removeFromFavorites(i.id); }}
                        compact
                      />
                      <WantToTryButton
                        isOnWishlist={isOnWishlist(countryId, dish.name)}
                        onAdd={() => addToWishlist({ countryId, dishName: dish.name, englishName: dish.englishName })}
                        onRemove={() => { const i = findWishlistItem(countryId, dish.name); if (i) removeFromWishlist(i.id); }}
                        compact
                      />
                    </div>

                    <div className="text-3xl mb-1.5">{DISH_EMOJI[dish.category] || '🍽️'}</div>
                    <h4 className="font-semibold text-gray-900 pr-12 leading-tight">{dish.name}</h4>
                    {dish.englishName && <p className="text-xs text-gray-400 mb-1">{dish.englishName}</p>}
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{dish.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tried && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: systemColors.herb, color: '#fff' }}>
                          ✓ Tried{rating ? ` · ${'★'.repeat(rating)}` : ''}
                        </span>
                      )}
                      {spiceChip(dish.spiceLevel)}
                      {difficultyChip(dish.difficulty)}
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded capitalize">{dish.category}</span>
                      {region && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>{region}</span>
                      )}
                      {dish.dietary?.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegan</span>}
                      {dish.dietary?.isVegetarian && !dish.dietary?.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Vegetarian</span>}
                      {dish.dietary?.isGlutenFree && <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">GF</span>}
                      {dish.isStreetFood && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street</span>
                      )}
                    </div>

                    {!tried && (
                      <button
                        onClick={() => onAddDish({ countryId, name: dish.name })}
                        className="mt-3 text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: systemColors.herb }}
                      >
                        + I tried this
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(popularBeverages || []).map((bev) => (
              <div key={bev.name} className="bg-white rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md">
                <div className="text-3xl mb-1.5">{(bev.category && BEVERAGE_EMOJI[bev.category]) || '🥤'}</div>
                <h4 className="font-semibold text-gray-900 leading-tight">{bev.name}</h4>
                {bev.englishName && <p className="text-xs text-gray-400 mb-1">{bev.englishName}</p>}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bev.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${typeChipClass[bev.type]}`}>{typeLabel[bev.type]}</span>
                  {bev.category && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded capitalize">{bev.category}</span>
                  )}
                  {bev.servedHow && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
                      {bev.servedHow === 'room temperature' ? 'Room Temp' : `Served ${bev.servedHow.charAt(0).toUpperCase() + bev.servedHow.slice(1)}`}
                    </span>
                  )}
                  {bev.isTraditional && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>Traditional</span>
                  )}
                  {bev.isStreetDrink && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>Street</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
