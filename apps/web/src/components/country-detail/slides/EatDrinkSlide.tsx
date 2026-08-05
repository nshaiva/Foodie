import { useState } from 'react';
import { WantToTryButton } from '../../WantToTryButton';
import { FavoriteButton } from '../../FavoriteButton';
import { DishForm } from '../../DishForm';
import { UnifiedDishCard } from '../UnifiedDishCard';
import { PlateDot } from '../../Wordmark';
import { spiceChip, popularityChip, dietaryChips, dessertChip, bevTypeChip, servedChip } from '../../dishChips';
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
    countryId, countryName, popularDishes, popularBeverages, regionalVariations,
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
  const [dessertOnly, setDessertOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
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
  const dessertMatch = (c: Dish['category']) => !dessertOnly || c === 'dessert';
  // Active refinement count for the Filters button badge, per mode
  const activeFilterCount = mode === 'food'
    ? [diet.veg, diet.vegan, diet.gf, spice !== 'any', popFilter !== 'any', dessertOnly].filter(Boolean).length
    : [diet.veg, diet.vegan, diet.gf, bevType !== 'any', served !== 'any'].filter(Boolean).length;
  const advancedFiltersActive =
    spice !== 'any' || diet.veg || diet.vegan || diet.gf || popFilter !== 'any' || dessertOnly || bevType !== 'any' || served !== 'any';

  const visiblePopular = popularDishes.filter(dish => {
    if (filter === 'tried' && !triedFor(dish)) return false;
    if (filter === 'want' && !(isOnWishlist(countryId, dish.name) && !triedFor(dish))) return false;
    return spiceMatch(dish.spiceLevel) && dietMatch(dish.dietary) && popMatch(dish.popularity) && dessertMatch(dish.category);
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
      className={`px-3.5 py-1 text-sm font-semibold rounded-md border ${filter === value ? 'transition-colors' : 'btn-press'}`}
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

  const toggleChip = (active: boolean, onClick: () => void, label: React.ReactNode, title?: string) => (
    <button
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${active ? 'transition-colors' : 'btn-press'}`}
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
        {/* Primary row: view pills + Filters drawer toggle (prototype B) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {filterBtn('all', 'All')}
          {filterBtn('tried', (() => { const n = mode === 'food' ? triedCount : bevTriedCount; return `Tried${n > 0 ? ` (${n})` : ''}`; })())}
          {filterBtn('want', 'Want to try')}
          <button
            onClick={() => setFiltersOpen(o => !o)}
            className={`px-3.5 py-1 text-sm font-semibold rounded-md border inline-flex items-center gap-1.5 ${filtersOpen ? 'transition-colors' : 'btn-press'}`}
            style={filtersOpen || activeFilterCount > 0
              ? { backgroundColor: '#fff', color: systemColors.navy, borderColor: systemColors.navyMuted }
              : { backgroundColor: '#fff', color: systemColors.navyMuted, borderColor: systemColors.border }}
          >
            ⚙ Filters
            {activeFilterCount > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[1.05rem] h-[1.05rem] rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: systemColors.herb }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters drawer: labeled groups per mode */}
        {filtersOpen && (
          <div
            className="rounded-xl border px-4 py-3 mb-4 flex flex-col gap-2.5"
            style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold tracking-widest uppercase w-20 flex-none" style={{ color: systemColors.navyMuted }}>Diet</span>
              {toggleChip(diet.veg, () => setDiet(d => ({ ...d, veg: !d.veg })), 'VGT', 'Vegetarian')}
              {toggleChip(diet.vegan, () => setDiet(d => ({ ...d, vegan: !d.vegan })), 'VG', 'Vegan')}
              {toggleChip(diet.gf, () => setDiet(d => ({ ...d, gf: !d.gf })), 'GF', 'Gluten-free')}
            </div>
            {mode === 'food' ? (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase w-20 flex-none" style={{ color: systemColors.navyMuted }}>Spice</span>
                  <div className="inline-flex rounded-md border overflow-hidden" style={{ borderColor: systemColors.border }}>
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
                          ? { backgroundColor: systemColors.herb, color: '#fff' }
                          : { backgroundColor: '#fff', color: systemColors.navyMuted }}
                      >
                        {seg.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase w-20 flex-none" style={{ color: systemColors.navyMuted }}>Who eats it</span>
                  {toggleChip(popFilter === 'local-favorite', () => setPopFilter(p => p === 'local-favorite' ? 'any' : 'local-favorite'), '📍 Local')}
                  {toggleChip(popFilter === 'tourist-classic', () => setPopFilter(p => p === 'tourist-classic' ? 'any' : 'tourist-classic'), '📷 Tourist')}
                  <span className="w-px h-4" style={{ backgroundColor: systemColors.border }} />
                  {toggleChip(dessertOnly, () => setDessertOnly(v => !v), '🍰 Dessert')}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase w-20 flex-none" style={{ color: systemColors.navyMuted }}>Type</span>
                  {toggleChip(bevType === 'non-alcoholic', () => setBevType(t => t === 'non-alcoholic' ? 'any' : 'non-alcoholic'), 'N/A', 'Non-alcoholic')}
                  {toggleChip(bevType === 'alcoholic', () => setBevType(t => t === 'alcoholic' ? 'any' : 'alcoholic'), 'With Alc', 'Alcoholic')}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase w-20 flex-none" style={{ color: systemColors.navyMuted }}>Served</span>
                  {toggleChip(served === 'hot', () => setServed(v => v === 'hot' ? 'any' : 'hot'), '🔥 Hot')}
                  {toggleChip(served === 'cold', () => setServed(v => v === 'cold' ? 'any' : 'cold'), '🧊 Cold')}
                </div>
              </>
            )}
          </div>
        )}

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
                    <h4 className="font-bold text-gray-900 pr-12 leading-tight">{dish.name}</h4>
                    {dish.englishName && <p className="text-xs text-gray-400">{dish.englishName}</p>}
                    <p className="text-xs text-gray-400 mb-1">{[region, categoryLabel(dish.category), dish.isStreetFood && dish.category !== 'street-food' ? 'Street food' : undefined].filter(Boolean).join(' · ')}</p>
                    <ExpandableText text={dish.description} />

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {popularityChip(dish.popularity)}
                      {dessertChip(dish.category)}
                      {spiceChip(dish.spiceLevel)}
                      {dietaryChips(dish.dietary)}
                    </div>
                  </UnifiedDishCard>
                );
              })}

              {visibleCustom.map((ud) => (
                <UnifiedDishCard key={ud.id} tried={ud} isCustom {...dishCrudProps}>
                  <CategoryPlate color={systemColors.herb} />
                  <h4 className="font-bold text-gray-900 pr-12 leading-tight">{ud.name}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>My dish</span>
                    {ud.region && (
                      <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>{ud.region}</span>
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
                <h4 className="font-bold text-gray-900 pr-12 leading-tight">{bev.name}</h4>
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
                  {bevTypeChip(bev.type)}
                  {servedChip(bev.servedHow)}
                  {dietaryChips(bev.dietary)}
                </div>
              </UnifiedDishCard>
            ))}

            {visibleCustomDrinks.map((ud) => (
              <UnifiedDishCard key={ud.id} tried={ud} isCustom {...dishCrudProps}>
                <CategoryPlate color={BEVERAGE_DEFAULT_COLOR} />
                <h4 className="font-bold text-gray-900 pr-12 leading-tight">{ud.name}</h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>My drink</span>
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
