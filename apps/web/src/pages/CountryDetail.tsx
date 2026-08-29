import { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import { useDishFilters } from '../hooks/useDishFilters';
import { countryDishProgress } from '../utils/dishProgress';
import { regionFromSlug, regionNameFor, regionSlug, resolveRegion } from '../utils/dishRegion';
import { groupEntries, regionCounts, type Entry, type Lens } from '../utils/groupDishes';
import { CountryHeader } from '../components/country-detail';
import { LensControls } from '../components/country-detail/LensControls';
import { DishSection } from '../components/country-detail/DishSection';
import { EntryGrid, type EntryGridActions } from '../components/country-detail/EntryGrid';
import { RegionalMap } from '../components/map/RegionalMap';
import { RegionRail } from '../components/country-detail/RegionRail';
import { ProfileSlide } from '../components/country-detail/slides';
import { FoodCultureSection } from '../components/country-detail/FoodCultureSection';
import { Tray } from '../components/Tray';
import { axesByIntensity, FLAVOR_AXIS_META } from '../data/flavorAxisMeta';
import { DishForm } from '../components/DishForm';
import type { RestaurantTry } from '../data/types';

/**
 * The country page: one list of everything you can eat and drink here, grouped
 * by whichever lens you pick.
 *
 * This replaced a three-tab carousel (Flavor / Eat & Drink / Culture & Regions)
 * whose tabs were siloed — nothing was clickable across them and each kept its
 * own selection state. Regions, dishes and flavor are now three views of one
 * list rather than three places.
 *
 * Focusing a region lives in the URL (`?region=`) so the phone back gesture
 * returns to the full list instead of leaving the page, and a region view can be
 * linked to directly.
 */
export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    addDish, updateDish, deleteDish, getDishesByCountry,
    addRestaurantTry, updateRestaurantTry, deleteRestaurantTry,
  } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();

  const filters = useDishFilters();
  const [lens, setLens] = useState<Lens>('region');
  const [showForm, setShowForm] = useState(false);
  const [showFlavor, setShowFlavor] = useState(false);
  const [showCulture, setShowCulture] = useState(false);
  // The map is a toggle, closed by default: the region rail is the picker and
  // the map is its larger, optional form. Once opened it stays open for the
  // visit until it has done its job (a region focused, or a filter applied).
  const [mapPref, setMapPref] = useState<'auto' | 'open' | 'closed'>('closed');

  const countryDishes = useMemo(
    () => (country ? getDishesByCountry(country.id) : []),
    [country, getDishesByCountry]
  );

  /** All popular dishes, drinks, and the user's own logs, as one list. */
  const allEntries = useMemo<Entry[]>(() => {
    if (!country) return [];
    const triedByName = new Map(countryDishes.map(d => [d.name.toLowerCase(), d]));
    const triedFor = (name: string, english?: string) =>
      triedByName.get(name.toLowerCase()) ??
      (english ? triedByName.get(english.toLowerCase()) : undefined);

    const known = new Set<string>();
    (country.popularDishes ?? []).forEach(d => {
      known.add(d.name.toLowerCase());
      if (d.englishName) known.add(d.englishName.toLowerCase());
    });
    (country.popularBeverages ?? []).forEach(b => {
      known.add(b.name.toLowerCase());
      if (b.englishName) known.add(b.englishName.toLowerCase());
    });

    return [
      ...(country.popularDishes ?? []).map<Entry>(dish => ({
        kind: 'dish', key: `d:${dish.name}`, dish, tried: triedFor(dish.name, dish.englishName),
      })),
      ...(country.popularBeverages ?? []).map<Entry>(drink => ({
        kind: 'drink', key: `b:${drink.name}`, drink, tried: triedFor(drink.name, drink.englishName),
      })),
      ...countryDishes
        .filter(ud => !known.has(ud.name.toLowerCase()))
        .map<Entry>(userDish => ({ kind: 'custom', key: `c:${userDish.id}`, userDish })),
    ];
  }, [country, countryDishes]);

  const visible = useMemo(() => {
    if (!country) return [];
    return allEntries.filter(entry => {
      if (entry.kind === 'custom') {
        if (filters.view === 'want') return false;
        if (filters.refinementActive) return false;
        return filters.matchesText(entry.userDish.name);
      }
      const source = entry.kind === 'dish' ? entry.dish : entry.drink;
      if (filters.view === 'tried' && !entry.tried) return false;
      if (filters.view === 'want' && !(isOnWishlist(country.id, source.name) && !entry.tried)) return false;
      return entry.kind === 'dish'
        ? filters.matchesDish(entry.dish)
        : filters.matchesBeverage(entry.drink);
    });
  }, [allEntries, country, filters, isOnWishlist]);

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Country not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Back to all countries</Link>
        </div>
      </div>
    );
  }

  const colors = country.colorPalette;
  const regions = country.regionalVariations;
  const hasRegions = !!regions && regions.length > 0;
  const hasBeverages = !!country.popularBeverages?.length;

  const focusedRegion = hasRegions
    ? regionFromSlug(searchParams.get('region') ?? '', regions)
    : undefined;

  const setFocus = (name: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (name) next.set('region', regionSlug(name));
    else next.delete('region');
    setSearchParams(next, { replace: false });
  };

  // Only the two arrangements that mean something. "None" was a third option
  // that just undid the grouping, which the two real choices already cover.
  const availableLenses: Lens[] = hasRegions ? ['region', 'category'] : ['category'];
  const effectiveLens: Lens = availableLenses.includes(lens) ? lens : 'category';

  /**
   * Focus is a filter, not a grouping concern. Applying it here means it holds
   * across every lens — switch to Type while Sichuan is focused and you get
   * Sichuan's dishes arranged by type, rather than a blank page.
   */
  const inFocus = focusedRegion
    ? visible.filter(entry => {
        if (entry.kind === 'custom') return false;
        const source = entry.kind === 'dish' ? entry.dish : entry.drink;
        const match = resolveRegion(source, regions, country.id);
        return match.kind === 'region' && match.region.name === focusedRegion.name;
      })
    : visible;

  const groups = groupEntries(inFocus, effectiveLens, {
    regions, countryId: country.id, countryName: country.name,
  });
  const shownGroups = focusedRegion
    ? groups.filter(g => g.entries.length > 0 || g.region?.name === focusedRegion.name)
    : groups;

  const counts = regionCounts(allEntries, regions, country.id);
  const triedCount = allEntries.filter(e => e.kind === 'custom' || e.tried).length;

  const handleAddDish = (data: {
    countryId: string; region?: string; name: string; notes?: string;
    tasteRating?: number; kind?: 'food' | 'drink';
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
  }) => {
    addDish({
      countryId: data.countryId,
      region: data.region,
      name: data.name,
      kind: data.kind,
      notes: data.notes,
      tasteRating: data.tasteRating,
      restaurantTries: data.initialRestaurantTry
        ? [{ ...data.initialRestaurantTry, id: crypto.randomUUID() }]
        : [],
    });
  };

  const actions: EntryGridActions = {
    countryId: country.id,
    onAddDish: handleAddDish,
    onUpdateDish: updateDish,
    onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry,
    onUpdateRestaurantTry: updateRestaurantTry,
    onDeleteRestaurantTry: deleteRestaurantTry,
    isOnWishlist, isFavorite,
    addToWishlist, removeFromWishlist, findWishlistItem,
    addToFavorites, removeFromFavorites, findFavoriteItem,
  };

  /** Region shown in a card's meta line — omitted when it'd just repeat the header. */
  const regionLabelFor = (entry: Entry) => {
    if (effectiveLens === 'region') return undefined;
    if (entry.kind === 'custom') return entry.userDish.region;
    const source = entry.kind === 'dish' ? entry.dish : entry.drink;
    return regionNameFor(source, regions, country.id);
  };

  // A focused region keeps its section even with nothing in it: the description
  // is the point of the region lens, and a region we hold no dishes for is
  // exactly when it's the only thing we have to offer. Only the region lens
  // renders that card though, so under the Type lens an empty focused region
  // would show literally nothing and the page-wide empty state is still right.
  const nothingMatches = inFocus.length === 0 && !(focusedRegion && effectiveLens === 'region');
  const narrowedByFilters = filters.activeFilterCount > 0 || filters.query.trim() !== '' || filters.view !== 'all';
  const mapOpen = mapPref === 'auto' ? !(focusedRegion || narrowedByFilters) : mapPref === 'open';

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <CountryHeader
        name={country.name}
        capital={country.capital}
        region={country.region}
        colors={colors}
        progress={countryDishProgress(country, countryDishes)}
        summary={country.cuisineProfile.summary}
        tools={
          <>
            {/* The three loudest axes, as a teaser for the fingerprint beside them */}
            {country.cuisineProfile.flavorIntensity && (
              <span className="flex gap-1 mr-1">
                {axesByIntensity(country.cuisineProfile.flavorIntensity).slice(0, 3).map(({ axis }) => (
                  <span
                    key={axis}
                    className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }}
                  >
                    {FLAVOR_AXIS_META[axis].label}
                  </span>
                ))}
              </span>
            )}
            {/* The two pills wrap as a pair, so on a phone they share a line */}
            <span className="flex gap-2 flex-none">
              <TrayButton onClick={() => setShowFlavor(true)} icon="✦" label="Flavor fingerprint" color={colors.primary} />
              <TrayButton onClick={() => setShowCulture(true)} icon="📖" label="Food culture" color={colors.primary} />
            </span>
          </>
        }
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        <LensControls
          filters={filters}
          lens={effectiveLens}
          onLensChange={setLens}
          availableLenses={availableLenses}
          triedCount={triedCount}
          hasBeverages={hasBeverages}
          onClearRegion={() => setFocus(null)}
        />

        {effectiveLens === 'region' && hasRegions && (
          <div className="space-y-3">
            <RegionRail
              regions={regions}
              counts={counts}
              colors={colors}
              selectedRegion={focusedRegion?.name ?? null}
              onSelectRegion={setFocus}
              mapOpen={mapOpen}
              onToggleMap={() => setMapPref(mapOpen ? 'closed' : (focusedRegion || narrowedByFilters) ? 'open' : 'auto')}
            />
            {/* Stays mounted and animates closed, so focusing a region doesn't
                snap the page up by a map's height in a single frame */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: mapOpen ? '1fr' : '0fr' }}
              aria-hidden={!mapOpen}
            >
              <div className={`min-h-0 overflow-hidden transition-opacity duration-300 ${mapOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-72 sm:h-[22rem] max-w-2xl w-full mx-auto">
                  <RegionalMap
                    countryId={country.id}
                    regions={regions}
                    colors={colors}
                    counts={counts}
                    selectedRegion={focusedRegion?.name ?? null}
                    onSelectRegion={setFocus}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {nothingMatches ? (
          <div
            className="rounded-xl border border-dashed p-8 text-center"
            style={{ borderColor: systemColors.border }}
          >
            <p className="font-semibold" style={{ color: systemColors.navy }}>
              Nothing matches these filters.
            </p>
            <button
              onClick={filters.reset}
              className="text-sm font-semibold mt-2"
              style={{ color: systemColors.tomato }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {shownGroups.map(group => (
              <DishSection
                key={group.id}
                group={group}
                focused={!!focusedRegion && group.region?.name === focusedRegion.name}
                onFocus={() => group.region && setFocus(group.region.name)}
                onClearFocus={() => setFocus(null)}
                colors={colors}
                tiers={country.cuisineProfile.ingredientTiers}
                emptyNote={narrowedByFilters ? (
                  <p className="text-sm italic" style={{ color: systemColors.navyMuted }}>
                    Nothing here matches what you're filtering for.{' '}
                    <button
                      onClick={filters.reset}
                      className="not-italic font-semibold"
                      style={{ color: systemColors.tomato }}
                    >
                      Clear filters
                    </button>
                  </p>
                ) : undefined}
              >
                <EntryGrid
                  entries={group.entries}
                  actions={actions}
                  regionLabelFor={regionLabelFor}
                />
              </DishSection>
            ))}
          </div>
        )}

        {/* Add your own */}
        {showForm ? (
          <DishForm
            countryId={country.id}
            countryName={country.name}
            regionalVariations={regions}
            popularDishes={country.popularDishes}
            onSubmit={data => { handleAddDish(data); setShowForm(false); }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-xl border border-dashed py-3 text-sm font-semibold"
            style={{ borderColor: systemColors.border, color: systemColors.navyMuted }}
          >
            + Add a dish or drink of your own
          </button>
        )}

      </main>

      {/* Pull-out trays: the fingerprint and the culture writing are reference
          material beside the list, not a destination below it */}
      <Tray
        open={showFlavor}
        onClose={() => setShowFlavor(false)}
        title={`${country.name}\u2019s flavor fingerprint`}
        subtitle={focusedRegion ? `All of ${country.name}, not just ${focusedRegion.name}` : undefined}
      >
        <ProfileSlide country={country} colors={colors} stacked />
      </Tray>
      <Tray
        open={showCulture}
        onClose={() => setShowCulture(false)}
        title={`Food culture in ${country.name}`}
        subtitle={focusedRegion ? `All of ${country.name}. For ${focusedRegion.name}, see its description above the dishes.` : undefined}
      >
        <FoodCultureSection country={country} colors={colors} />
      </Tray>
    </div>
  );
}

function TrayButton({
  onClick, icon, label, color,
}: { onClick: () => void; icon: string; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3 py-1.5 transition-colors"
      style={{ borderColor: `${color}40`, color, backgroundColor: systemColors.surface }}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </button>
  );
}
