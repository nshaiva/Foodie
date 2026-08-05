import { useState } from 'react';
import { WantToTryButton } from '../../WantToTryButton';
import { FavoriteButton } from '../../FavoriteButton';
import { DishForm } from '../../DishForm';
import { UnifiedDishCard } from '../UnifiedDishCard';
import { PlateDot } from '../../Wordmark';
import { systemColors } from '../../../data/systemColors';
import { DISH_CATEGORY_COLORS, BEVERAGE_CATEGORY_COLORS, BEVERAGE_DEFAULT_COLOR } from '../../../data/categoryMeta';
import type { Dish, Beverage, DietaryInfo, UserDish, RestaurantTry, RegionalCuisine, ColorPalette } from '../../../data/types';

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
    kind?: 'food' | 'drink';
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

// Card marker: brand plate dot colored by category (replaced emoji, #24)
function CategoryPlate({ color }: { color: string }) {
  return <div className="mb-2"><PlateDot color={color} size={20} /></div>;
}

// Compact chips: icon/abbreviation only, full meaning in the tooltip
function spiceChip(level: Dish['spiceLevel']) {
  if (!level || level === 'none') return null;
  const cls =
    level === 'mild' ? 'bg-yellow-100' :
    level === 'medium' ? 'bg-orange-100' :
    level === 'hot' ? 'bg-red-100' :
    'bg-red-200';
  const label = level === 'very-hot' ? 'Very hot' : level.charAt(0).toUpperCase() + level.slice(1);
  const chilies = { mild: 1, medium: 2, hot: 3, 'very-hot': 4 }[level];
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`} title={`Spice: ${label}`}>{'🌶️'.repeat(chilies)}</span>;
}

// Ordering advice from `popularity`; "both" gets no tag
function popularityChip(popularity: Dish['popularity']) {
  if (popularity === 'local-favorite') {
    return <span className="text-xs bg-emerald-100 px-2 py-0.5 rounded" title="Local favorite">📍</span>;
  }
  if (popularity === 'tourist-classic') {
    return <span className="text-xs bg-indigo-50 px-2 py-0.5 rounded" title="Tourist classic">📷</span>;
  }
  return null;
}

// Dietary badge colors, shared by card chips and filter toggles
const DIET_BADGE = {
  vgt: { label: 'VGT', title: 'Vegetarian', on: 'bg-violet-100 text-violet-800 border-violet-300', text: 'text-violet-700' },
  vg: { label: 'VG', title: 'Vegan', on: 'bg-green-100 text-green-800 border-green-300', text: 'text-green-700' },
  gf: { label: 'GF', title: 'Gluten-free', on: 'bg-sky-100 text-sky-800 border-sky-300', text: 'text-sky-700' },
} as const;

function dietaryChips(d?: DietaryInfo) {
  if (!d) return null;
  return (
    <>
      {d.isVegan && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.vg.on}`} title={DIET_BADGE.vg.title}>VG</span>}
      {d.isVegetarian && !d.isVegan && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.vgt.on}`} title={DIET_BADGE.vgt.title}>VGT</span>}
      {d.isGlutenFree && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.gf.on}`} title={DIET_BADGE.gf.title}>GF</span>}
    </>
  );
}

function categoryLabel(category: Dish['category']): string {
  return category === 'street-food' ? 'Street food' : category.charAt(0).toUpperCase() + category.slice(1);
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

// Shared by drink card chips and the drink-type filter toggles
const BEV_TYPE_BADGE: Record<Beverage['type'], { label: string; title: string; on: string; text: string }> = {
  'non-alcoholic': { label: 'N/A', title: 'Non-alcoholic', on: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'text-emerald-700' },
  alcoholic: { label: 'With Alc', title: 'Alcoholic', on: 'bg-amber-100 text-amber-800 border-amber-300', text: 'text-amber-700' },
  both: { label: 'Alc Optional', title: 'Alcohol optional', on: 'bg-blue-100 text-blue-800 border-blue-300', text: 'text-blue-700' },
};

type DishFilter = 'all' | 'tried' | 'want';

/** Description clamped to 2 lines; click to expand/collapse when truncated */
function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const ref = (el: HTMLParagraphElement | null) => {
    if (el && !expanded) setTruncated(el.scrollHeight > el.clientHeight + 1);
  };

  const clickable = truncated || expanded;
  return (
    <div>
      <p
        ref={ref}
        onClick={clickable ? () => setExpanded(!expanded) : undefined}
        className={`text-sm text-gray-600 mt-1 ${expanded ? '' : 'line-clamp-2'} ${clickable ? 'cursor-pointer' : ''}`}
      >
        {text}
      </p>
      {clickable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          {expanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  );
}

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
  const [filter, setFilter] = useState<DishFilter>('all');
  const [diet, setDiet] = useState<{ veg: boolean; vegan: boolean; gf: boolean }>({ veg: false, vegan: false, gf: false });
  const [spice, setSpice] = useState<'any' | 'mild' | 'medium' | 'hot'>('any');
  const [popFilter, setPopFilter] = useState<'any' | 'local-favorite' | 'tourist-classic'>('any');
  const [bevType, setBevType] = useState<'any' | 'alcoholic' | 'non-alcoholic'>('any');
  const [served, setServed] = useState<'any' | 'hot' | 'cold'>('any');
  const [showDishForm, setShowDishForm] = useState(false);

  // Map logged dishes by name so popular cards render in their "tried" state
  const triedByName = new Map<string, UserDish>();
  countryDishes.forEach(d => triedByName.set(d.name.toLowerCase(), d));
  const triedFor = (dish: Dish) =>
    triedByName.get(dish.name.toLowerCase()) ||
    (dish.englishName ? triedByName.get(dish.englishName.toLowerCase()) : undefined);

  const triedForBeverage = (bev: Beverage) =>
    triedByName.get(bev.name.toLowerCase()) ||
    (bev.englishName ? triedByName.get(bev.englishName.toLowerCase()) : undefined);

  // Logged dishes that don't match any popular dish or beverage get their own cards
  const popularNames = new Set<string>();
  popularDishes.forEach(d => {
    popularNames.add(d.name.toLowerCase());
    if (d.englishName) popularNames.add(d.englishName.toLowerCase());
  });
  (popularBeverages || []).forEach(b => {
    popularNames.add(b.name.toLowerCase());
    if (b.englishName) popularNames.add(b.englishName.toLowerCase());
  });
  const customEntries = countryDishes.filter(d => !popularNames.has(d.name.toLowerCase()));
  const customFood = customEntries.filter(d => d.kind !== 'drink');
  const customDrinks = customEntries.filter(d => d.kind === 'drink');

  const triedCount = popularDishes.filter(d => triedFor(d)).length + customFood.length;
  const bevTriedCount = (popularBeverages || []).filter(b => triedForBeverage(b)).length + customDrinks.length;

  // Spice / dietary matchers (spice applies to food only)
  const spiceMatch = (level?: Dish['spiceLevel']) => {
    if (spice === 'any') return true;
    if (!level) return false;
    if (spice === 'mild') return level === 'none' || level === 'mild';
    if (spice === 'medium') return level === 'medium';
    return level === 'hot' || level === 'very-hot';
  };
  const dietMatch = (d?: DietaryInfo) =>
    (!diet.veg || !!(d?.isVegetarian || d?.isVegan)) &&
    (!diet.vegan || !!d?.isVegan) &&
    (!diet.gf || !!d?.isGlutenFree);
  const bevTypeMatch = (t: Beverage['type']) => bevType === 'any' || t === 'both' || t === bevType;
  const servedMatch = (how?: Beverage['servedHow']) => {
    if (served === 'any') return true;
    if (!how) return false;
    if (served === 'hot') return how === 'hot';
    return how === 'cold' || how === 'iced';
  };
  const popMatch = (p?: Dish['popularity']) => popFilter === 'any' || p === popFilter;
  const advancedFiltersActive =
    spice !== 'any' || diet.veg || diet.vegan || diet.gf || popFilter !== 'any' || bevType !== 'any' || served !== 'any';

  const visiblePopular = popularDishes.filter(dish => {
    if (filter === 'tried' && !triedFor(dish)) return false;
    if (filter === 'want' && !(isOnWishlist(countryId, dish.name) && !triedFor(dish))) return false;
    return spiceMatch(dish.spiceLevel) && dietMatch(dish.dietary) && popMatch(dish.popularity);
  });
  // Custom entries carry no spice/dietary metadata, so hide them under advanced filters
  const visibleCustom = filter === 'want' || advancedFiltersActive ? [] : customFood;
  const visibleCustomDrinks = filter === 'want' || advancedFiltersActive ? [] : customDrinks;

  const visibleBeverages = (popularBeverages || []).filter(bev => {
    if (filter === 'tried' && !triedForBeverage(bev)) return false;
    if (filter === 'want' && !(isOnWishlist(countryId, bev.name) && !triedForBeverage(bev))) return false;
    return dietMatch(bev.dietary) && bevTypeMatch(bev.type) && servedMatch(bev.servedHow);
  });

  const dishCrudProps = {
    onUpdateDish, onDeleteDish,
    onAddRestaurantTry, onUpdateRestaurantTry, onDeleteRestaurantTry,
  };

  const filterBtn = (value: DishFilter, label: string) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-3.5 py-1 text-sm font-semibold rounded-full border ${filter === value ? 'transition-colors' : 'btn-press'}`}
      style={filter === value
        ? { backgroundColor: systemColors.navy, color: '#fff', borderColor: systemColors.navy }
        : { backgroundColor: '#fff', color: systemColors.navyMuted, borderColor: systemColors.border }}
      onMouseEnter={(e) => {
        if (filter !== value) {
          e.currentTarget.style.backgroundColor = `${systemColors.navy}14`;
          e.currentTarget.style.borderColor = systemColors.navyMuted;
          e.currentTarget.style.color = systemColors.navy;
        }
      }}
      onMouseLeave={(e) => {
        if (filter !== value) {
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.borderColor = systemColors.border;
          e.currentTarget.style.color = systemColors.navyMuted;
        }
      }}
    >
      {label}
    </button>
  );

  const toggleChip = (active: boolean, onClick: () => void, label: React.ReactNode) => (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${active ? 'transition-colors' : 'btn-press'}`}
      style={active
        ? { backgroundColor: systemColors.herb, color: '#fff', borderColor: systemColors.herb }
        : { backgroundColor: '#fff', color: systemColors.navyMuted, borderColor: systemColors.border }}
    >
      {label}
    </button>
  );

  // Last tile of whichever grid is active: dashed ghost card that expands
  // into the add form in place (spanning the full row)
  const addMyOwnCell = showDishForm ? (
    <div className="sm:col-span-2 lg:col-span-3">
      <DishForm
        countryId={countryId}
        countryName={countryName}
        regions={regionalVariations?.map(r => r.name)}
        regionalVariations={regionalVariations}
        popularDishes={popularDishes}
        onSubmit={(data) => { onAddDish({ ...data, kind: mode === 'drink' ? 'drink' : undefined }); setShowDishForm(false); }}
        onCancel={() => setShowDishForm(false)}
      />
    </div>
  ) : (
    <button
      onClick={() => setShowDishForm(true)}
      className="btn-press min-h-[140px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-sm font-semibold"
      style={{ borderColor: systemColors.herb, color: systemColors.herb }}
    >
      <span className="text-2xl leading-none">+</span>
      Add my own {mode === 'drink' ? 'drink' : 'dish'}
    </button>
  );

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-xl font-semibold" style={{ color: systemColors.navy }}>
          Eat &amp; Drink
        </h2>
        {hasBeverages && (
          <div className="inline-flex rounded-lg border overflow-hidden" style={{ borderColor: systemColors.border }}>
            {(['food', 'drink'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-sm font-semibold ${mode === m ? 'transition-colors' : 'btn-press'}`}
                style={mode === m ? { backgroundColor: systemColors.navy, color: '#fff' } : { backgroundColor: '#fff', color: systemColors.navy }}
                onMouseEnter={(e) => {
                  if (mode !== m) e.currentTarget.style.backgroundColor = `${systemColors.navy}14`;
                }}
                onMouseLeave={(e) => {
                  if (mode !== m) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                {m === 'food' ? '🍽 Food' : '🥤 Drinks'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Shared controls: filters + add-my-own apply to whichever tab is active */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {filterBtn('all', 'All')}
          {filterBtn('tried', (() => { const n = mode === 'food' ? triedCount : bevTriedCount; return `Tried${n > 0 ? ` (${n})` : ''}`; })())}
          {filterBtn('want', 'Want to try')}
          <span className="w-px h-5 self-center" style={{ backgroundColor: systemColors.border }} />
          {([
            { key: 'veg' as const, badge: DIET_BADGE.vgt, active: diet.veg, toggle: () => setDiet(d => ({ ...d, veg: !d.veg })) },
            { key: 'vegan' as const, badge: DIET_BADGE.vg, active: diet.vegan, toggle: () => setDiet(d => ({ ...d, vegan: !d.vegan })) },
            { key: 'gf' as const, badge: DIET_BADGE.gf, active: diet.gf, toggle: () => setDiet(d => ({ ...d, gf: !d.gf })) },
          ]).map(({ key, badge, active, toggle }) => (
            <button
              key={key}
              onClick={toggle}
              title={badge.title}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                active ? badge.on : `btn-press bg-white ${badge.text}`
              }`}
              style={active ? undefined : { borderColor: systemColors.border }}
            >
              {badge.label}
            </button>
          ))}
          {mode === 'drink' && (
            <>
              {(['non-alcoholic', 'alcoholic'] as const).map(t => {
                const badge = BEV_TYPE_BADGE[t];
                const active = bevType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setBevType(prev => prev === t ? 'any' : t)}
                    title={badge.title}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                      active ? badge.on : `btn-press bg-white ${badge.text}`
                    }`}
                    style={active ? undefined : { borderColor: systemColors.border }}
                  >
                    {badge.label}
                  </button>
                );
              })}
              {toggleChip(served === 'hot', () => setServed(v => v === 'hot' ? 'any' : 'hot'), '🔥 Hot')}
              {toggleChip(served === 'cold', () => setServed(v => v === 'cold' ? 'any' : 'cold'), '🧊 Cold')}
            </>
          )}
          {mode === 'food' && (
            <div className="inline-flex rounded-full border overflow-hidden" style={{ borderColor: systemColors.border }} title="Spice level">
              {([
                { value: 'any', label: 'Any' },
                { value: 'mild', label: '🌶️' },
                { value: 'medium', label: '🌶️🌶️' },
                { value: 'hot', label: '🌶️🌶️🌶️' },
              ] as const).map(seg => (
                <button
                  key={seg.value}
                  onClick={() => setSpice(seg.value)}
                  title={seg.value === 'any' ? 'Any spice level' : seg.value === 'mild' ? 'Mild' : seg.value === 'medium' ? 'Medium' : 'Hot'}
                  className={`px-2.5 py-1 text-xs font-semibold ${spice === seg.value ? 'transition-colors' : 'btn-press'}`}
                  style={spice === seg.value
                    ? { backgroundColor: systemColors.tomato, color: '#fff' }
                    : { backgroundColor: '#fff', color: systemColors.navyMuted }}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          )}
          {mode === 'food' && (
            <>
              {toggleChip(popFilter === 'local-favorite', () => setPopFilter(p => p === 'local-favorite' ? 'any' : 'local-favorite'), '📍 Local favorites')}
              {toggleChip(popFilter === 'tourist-classic', () => setPopFilter(p => p === 'tourist-classic' ? 'any' : 'tourist-classic'), '📷 Tourist classics')}
            </>
          )}
        </div>

        {mode === 'food' ? (
          <>
            {/* One list: popular dishes + custom logged dishes; "tried" is a card state */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visiblePopular.map((dish) => {
                const region = detectRegion(dish, regionalVariations);
                const tried = triedFor(dish);
                return (
                  <UnifiedDishCard
                    key={dish.name}
                    tried={tried}
                    onTryThis={() => onAddDish({ countryId, name: dish.name })}
                    cornerActions={
                      <>
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
                      </>
                    }
                    {...dishCrudProps}
                  >
                    <CategoryPlate color={DISH_CATEGORY_COLORS[dish.category] || systemColors.navy} />
                    <h4 className="font-semibold text-gray-900 pr-12 leading-tight">{dish.name}</h4>
                    {dish.englishName && <p className="text-xs text-gray-400">{dish.englishName}</p>}
                    <p className="text-xs text-gray-400 mb-1">{[region, categoryLabel(dish.category), dish.isStreetFood && dish.category !== 'street-food' ? 'Street food' : undefined].filter(Boolean).join(' · ')}</p>
                    <ExpandableText text={dish.description} />

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {popularityChip(dish.popularity)}
                      {spiceChip(dish.spiceLevel)}
                      {dietaryChips(dish.dietary)}
                    </div>
                  </UnifiedDishCard>
                );
              })}

              {visibleCustom.map((ud) => (
                <UnifiedDishCard key={ud.id} tried={ud} isCustom {...dishCrudProps}>
                  <CategoryPlate color={systemColors.herb} />
                  <h4 className="font-semibold text-gray-900 pr-12 leading-tight">{ud.name}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>My dish</span>
                    {ud.region && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>{ud.region}</span>
                    )}
                  </div>
                </UnifiedDishCard>
              ))}

              {addMyOwnCell}
            </div>

            {visiblePopular.length === 0 && visibleCustom.length === 0 && (
              <p className="text-gray-500 text-sm py-8 text-center">
                {filter === 'tried' ? 'No dishes tried yet — tap "+ I tried this" on any dish' : 'Nothing saved to try yet — tap the bookmark on any dish'}
              </p>
            )}
          </>
        ) : (
          <>
          {visibleBeverages.length === 0 && visibleCustomDrinks.length === 0 && (
            <p className="text-gray-500 text-sm py-8 text-center">
              {filter === 'tried' ? 'No drinks tried yet — tap "+ I tried this" on any drink' : 'Nothing saved to try yet — tap the bookmark on any drink'}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleBeverages.map((bev) => (
              <UnifiedDishCard
                key={bev.name}
                tried={triedForBeverage(bev)}
                onTryThis={() => onAddDish({ countryId, name: bev.name, kind: 'drink' })}
                cornerActions={
                  <>
                    <FavoriteButton
                      isFavorite={isFavorite(countryId, bev.name)}
                      onAdd={() => addToFavorites({ countryId, dishName: bev.name, englishName: bev.englishName })}
                      onRemove={() => { const i = findFavoriteItem(countryId, bev.name); if (i) removeFromFavorites(i.id); }}
                      compact
                    />
                    <WantToTryButton
                      isOnWishlist={isOnWishlist(countryId, bev.name)}
                      onAdd={() => addToWishlist({ countryId, dishName: bev.name, englishName: bev.englishName })}
                      onRemove={() => { const i = findWishlistItem(countryId, bev.name); if (i) removeFromWishlist(i.id); }}
                      compact
                    />
                  </>
                }
                {...dishCrudProps}
              >
                <CategoryPlate color={(bev.category && BEVERAGE_CATEGORY_COLORS[bev.category]) || BEVERAGE_DEFAULT_COLOR} />
                <h4 className="font-semibold text-gray-900 pr-12 leading-tight">{bev.name}</h4>
                {bev.englishName && <p className="text-xs text-gray-400">{bev.englishName}</p>}
                <p className="text-xs text-gray-400 mb-1">
                  {[
                    bev.category ? bev.category.charAt(0).toUpperCase() + bev.category.slice(1) : undefined,
                    bev.isTraditional ? 'Traditional' : undefined,
                    bev.isStreetDrink ? 'Street' : undefined,
                  ].filter(Boolean).join(' · ')}
                </p>
                <ExpandableText text={bev.description} />

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${BEV_TYPE_BADGE[bev.type].on}`} title={BEV_TYPE_BADGE[bev.type].title}>{BEV_TYPE_BADGE[bev.type].label}</span>
                  {bev.servedHow && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
                      {bev.servedHow === 'room temperature' ? 'Room Temp' : `Served ${bev.servedHow.charAt(0).toUpperCase() + bev.servedHow.slice(1)}`}
                    </span>
                  )}
                  {dietaryChips(bev.dietary)}
                </div>
              </UnifiedDishCard>
            ))}

            {visibleCustomDrinks.map((ud) => (
              <UnifiedDishCard key={ud.id} tried={ud} isCustom {...dishCrudProps}>
                <CategoryPlate color={BEVERAGE_DEFAULT_COLOR} />
                <h4 className="font-semibold text-gray-900 pr-12 leading-tight">{ud.name}</h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>My drink</span>
                </div>
              </UnifiedDishCard>
            ))}

            {addMyOwnCell}
          </div>
          </>
        )}
      </div>
    </div>
  );
}
