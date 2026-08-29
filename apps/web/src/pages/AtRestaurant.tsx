import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { countries, getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useDietPrefs } from '../hooks/useDietPrefs';
import { rankDishesForOrdering, type RankedDish } from '../utils/orderRanking';
import { shapeOrderList, matchesMenuSearch, DEFAULT_SHAPE } from '../utils/orderGrouping';
import { Wordmark, PlateDot } from '../components/Wordmark';
import { ProfileButton } from '../components/ProfileButton';
import { UnifiedDishCard } from '../components/country-detail/UnifiedDishCard';
import { ExpandableText } from '../components/ExpandableText';
import { FavoriteButton } from '../components/FavoriteButton';
import { WantToTryButton } from '../components/WantToTryButton';
import { spiceChip, popularityChip, dietaryChips, dessertChip } from '../components/dishChips';

/**
 * At-the-restaurant view (#1): "I'm at a restaurant trying a new cuisine,
 * what do I order?" Mobile-first — pick the cuisine, get a ranked
 * what-to-order list, log from the table.
 */
export function AtRestaurant() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Wordmark className="text-xl" />
          <ProfileButton />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-5">
        {country ? <OrderList countryId={country.id} /> : <CuisinePicker />}
      </main>
    </div>
  );
}

function CuisinePicker() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? countries.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.cuisineProfile.flavorProfile.some(f => f.toLowerCase().includes(q))
        )
      : countries;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: systemColors.navy }}>
        What are you eating?
      </h1>
      <p className="text-sm mb-4" style={{ color: systemColors.navyMuted }}>
        Pick the cuisine and get a what-to-order list, ranked for you.
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cuisines…"
        autoFocus
        className="w-full px-4 py-3 mb-4 rounded-xl border text-base focus:outline-none focus:ring-2"
        style={{ borderColor: systemColors.border, '--tw-ring-color': systemColors.tomato } as React.CSSProperties}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {matches.map(c => (
          <button
            key={c.id}
            onClick={() => navigate(`/restaurant/${c.id}`)}
            className="card-interactive-sm btn-press flex items-center gap-3 bg-white rounded-xl border px-4 py-3 text-left"
            style={{ borderColor: systemColors.border }}
          >
            <PlateDot color={c.colorPalette.primary} size={16} />
            <span className="flex-1 min-w-0">
              <span className="block font-semibold" style={{ color: systemColors.navy }}>{c.name}</span>
              <span className="block text-xs truncate" style={{ color: systemColors.navyMuted }}>
                {c.cuisineProfile.flavorProfile.slice(0, 3).map(f => f.split(' ')[0]).join(' · ')}
              </span>
            </span>
            <span className="card-go text-sm">→</span>
          </button>
        ))}
        {matches.length === 0 && (
          <p className="text-sm py-6 text-center col-span-full" style={{ color: systemColors.navyMuted }}>
            No cuisine matches "{query}"
          </p>
        )}
      </div>
    </div>
  );
}

function OrderList({ countryId }: { countryId: string }) {
  const country = getCountryById(countryId)!;
  const {
    addDish, updateDish, deleteDish, getDishesByCountry,
    addRestaurantTry, updateRestaurantTry, deleteRestaurantTry,
  } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();
  const { personalFlavor } = usePersonalFlavorProfile();
  const { prefs } = useDietPrefs();

  const countryDishes = getDishesByCountry(countryId);
  const ranked = useMemo(
    () => rankDishesForOrdering(country, countryDishes, isOnWishlist, personalFlavor?.heat ?? null, prefs),
    [country, countryDishes, isOnWishlist, personalFlavor, prefs]
  );

  // One ranked sequence, not courses: at a table the question is "the menu has
  // things on it, which should I get", and rank is the only ordering that
  // answers it. The shape is a constant for now — #29 (familiarity levels) will
  // choose it from how well you know this cuisine, which is why it's a value.
  const { shown, hidden } = useMemo(() => shapeOrderList(ranked, DEFAULT_SHAPE), [ranked]);
  const [menuQuery, setMenuQuery] = useState('');
  const visible = useMemo(
    () => shown.filter(entry => matchesMenuSearch(entry, menuQuery)),
    [shown, menuQuery]
  );
  const searching = menuQuery.trim() !== '';
  const drinks = country.popularBeverages ?? [];

  const dishCrudProps = {
    onUpdateDish: updateDish,
    onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry,
    onUpdateRestaurantTry: updateRestaurantTry,
    onDeleteRestaurantTry: deleteRestaurantTry,
  };

  const cornerActions = (dishName: string, englishName?: string) => (
    <>
      <FavoriteButton
        isFavorite={isFavorite(countryId, dishName)}
        onAdd={() => addToFavorites({ countryId, dishName, englishName })}
        onRemove={() => { const i = findFavoriteItem(countryId, dishName); if (i) removeFromFavorites(i.id); }}
        compact
      />
      <WantToTryButton
        isOnWishlist={isOnWishlist(countryId, dishName)}
        onAdd={() => addToWishlist({ countryId, dishName, englishName })}
        onRemove={() => { const i = findWishlistItem(countryId, dishName); if (i) removeFromWishlist(i.id); }}
        compact
      />
    </>
  );

  const renderDish = (entry: RankedDish, rank: number) => {
    const { dish, reasons, tried } = entry;
    return (
      <UnifiedDishCard
        key={dish.name}
        tried={tried}
        onTryThis={() => addDish({ countryId, name: dish.name, restaurantTries: [] })}
        cornerActions={cornerActions(dish.name, dish.englishName)}
        {...dishCrudProps}
      >
        <div className="flex items-baseline gap-2 pr-12">
          <span
            className="flex-none text-xs font-bold w-6 h-6 rounded-full inline-flex items-center justify-center"
            style={{ backgroundColor: `${country.colorPalette.primary}18`, color: country.colorPalette.primary }}
          >
            {rank}
          </span>
          <span className="min-w-0">
            <h4 className="font-bold text-gray-900 leading-tight">{dish.name}</h4>
            {dish.pronunciation && (
              <p className="text-xs italic" style={{ color: systemColors.navyMuted }}>
                "{dish.pronunciation}"
              </p>
            )}
          </span>
        </div>

        <div className="mt-1.5">
          <ExpandableText text={dish.description} />
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {popularityChip(dish.popularity)}
          {dessertChip(dish.category)}
          {spiceChip(dish.spiceLevel)}
          {dietaryChips(dish.dietary)}
        </div>

        {reasons.length > 0 && (
          <p className="text-xs mt-2 font-medium" style={{ color: systemColors.herb }}>
            {reasons.slice(0, 2).join(' · ')}
          </p>
        )}
      </UnifiedDishCard>
    );
  };

  return (
    <div>
      <Link
        to="/restaurant"
        className="tap inline-block text-sm font-medium mb-2 btn-press"
        style={{ color: systemColors.navyMuted }}
      >
        ← All cuisines
      </Link>
      <div className="flex items-center gap-2.5 mb-1">
        <PlateDot color={country.colorPalette.primary} size={16} />
        <h1 className="text-2xl font-bold" style={{ color: systemColors.navy }}>
          What to order · {country.name}
        </h1>
      </div>
      <p className="text-sm mb-3" style={{ color: systemColors.navyMuted }}>
        Ranked for you: your ratings, what locals order, your list, your spice comfort.
      </p>

      {/* Menus abbreviate and translate, so this matches traits and categories
          as well as names — you're usually typing something half-recognised. */}
      <input
        type="search"
        value={menuQuery}
        onChange={e => setMenuQuery(e.target.value)}
        placeholder="Find something on the menu…"
        aria-label="Search this cuisine"
        className="w-full text-sm px-3 py-2.5 md:py-2 rounded-lg border mb-4"
        style={{ borderColor: systemColors.border, color: systemColors.navy }}
      />

      <div className="space-y-3">
        {visible.map(entry => renderDish(entry, ranked.indexOf(entry) + 1))}
      </div>

      {visible.length === 0 && (
        <p className="text-sm py-2" style={{ color: systemColors.navyMuted }}>
          Nothing here matches “{menuQuery.trim()}”. It may still be on the menu —
          we only know {ranked.length} {country.name} dishes so far.
        </p>
      )}

      {hidden > 0 && (
        <p className="text-xs mt-3" style={{ color: systemColors.navyMuted }}>
          {hidden} more not shown.
        </p>
      )}

      {/* The escape hatch, and the honest one: our list is about nine dishes and
          a real menu has sixty, so this must never look like the whole cuisine.
          Kept visible when the search finds nothing, which is when it's needed. */}
      <Link
        to={`/country/${countryId}`}
        className="flex items-center justify-between gap-3 mt-5 px-4 py-3 rounded-xl border btn-press"
        style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
      >
        <span>
          <span className="block text-sm font-bold" style={{ color: systemColors.navy }}>
            Not on the menu?
          </span>
          <span className="block text-xs" style={{ color: systemColors.navyMuted }}>
            See everything we know about {country.name} — regions, flavors, drinks
          </span>
        </span>
        <span className="flex-none text-sm font-bold" style={{ color: systemColors.tomato }}>→</span>
      </Link>

      {!searching && drinks.length > 0 && (
        <div>
          <SectionHeading count={drinks.length}>Drinks</SectionHeading>
          <div className="space-y-2.5">
            {drinks.map(drink => (
              <UnifiedDishCard
                key={drink.name}
                tried={countryDishes.find(d => d.name.toLowerCase() === drink.name.toLowerCase())}
                onTryThis={() => addDish({ countryId, name: drink.name, kind: 'drink', restaurantTries: [] })}
                cornerActions={cornerActions(drink.name, drink.englishName)}
                {...dishCrudProps}
              >
                <div className="pr-12">
                  <h4 className="font-bold text-gray-900 leading-tight">{drink.name}</h4>
                  {drink.englishName && (
                    <p className="text-xs" style={{ color: systemColors.navyMuted }}>{drink.englishName}</p>
                  )}
                </div>
                <div className="mt-1">
                  <ExpandableText text={drink.description} />
                </div>
              </UnifiedDishCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Quiet divider above the drinks list. */
function SectionHeading({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <div className="flex items-baseline gap-2 mt-6 mb-2">
      <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: systemColors.navyMuted }}>
        {children}
      </h2>
      {count !== undefined && (
        <span className="text-xs" style={{ color: systemColors.navyMuted }}>{count}</span>
      )}
      <span className="flex-1 h-px" style={{ backgroundColor: systemColors.border }} />
    </div>
  );
}
