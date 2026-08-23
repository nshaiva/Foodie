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
import { groupForOrdering, DEFAULT_SHAPE } from '../utils/orderGrouping';
import { Wordmark, PlateDot } from '../components/Wordmark';
import { SignInButton } from '../components/SignInButton';
import { UnifiedDishCard } from '../components/country-detail/UnifiedDishCard';
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
          <div className="flex items-center gap-3">
            {country && (
              <Link to="/restaurant" className="text-sm font-medium btn-press" style={{ color: systemColors.navyMuted }}>
                ↩ Change cuisine
              </Link>
            )}
            <SignInButton />
          </div>
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

  // Rank answers "what do I get"; course answers "what else goes on the table".
  // The shape is a constant for now — #29 (familiarity levels) will choose it
  // from how well you know this cuisine, which is why it's a value, not literals.
  const { startHere, courses } = useMemo(() => groupForOrdering(ranked, DEFAULT_SHAPE), [ranked]);
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

  const renderDish = (entry: RankedDish, rank?: number) => {
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
          {rank !== undefined && (
            <span
              className="flex-none text-xs font-bold w-6 h-6 rounded-full inline-flex items-center justify-center"
              style={{ backgroundColor: `${country.colorPalette.primary}18`, color: country.colorPalette.primary }}
            >
              {rank}
            </span>
          )}
          <span className="min-w-0">
            <h4 className="font-bold text-gray-900 leading-tight">{dish.name}</h4>
            {dish.pronunciation && (
              <p className="text-xs italic" style={{ color: systemColors.navyMuted }}>
                "{dish.pronunciation}"
              </p>
            )}
          </span>
        </div>

        {/* The top picks earn a description. Below them it becomes a wall of
            prose you scroll past, so the courses keep the chips and drop it. */}
        {rank !== undefined && (
          <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{dish.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-2">
          {popularityChip(dish.popularity)}
          {dessertChip(dish.category)}
          {spiceChip(dish.spiceLevel)}
          {dietaryChips(dish.dietary)}
        </div>

        {reasons.length > 0 && (
          <p className="text-xs mt-2 font-medium" style={{ color: systemColors.herb }}>
            {reasons.slice(0, rank !== undefined ? 2 : 1).join(' · ')}
          </p>
        )}
      </UnifiedDishCard>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        <PlateDot color={country.colorPalette.primary} size={16} />
        <h1 className="text-2xl font-bold" style={{ color: systemColors.navy }}>
          What to order · {country.name}
        </h1>
      </div>
      <p className="text-sm mb-5" style={{ color: systemColors.navyMuted }}>
        Ranked for you: your ratings, what locals order, your list, your spice comfort.
      </p>

      <SectionHeading>Start here</SectionHeading>
      <div className="space-y-3">
        {startHere.map((entry, i) => renderDish(entry, i + 1))}
      </div>

      {courses.map(section => (
        <div key={section.id}>
          <SectionHeading count={section.items.length}>{section.label}</SectionHeading>
          <div className="space-y-2.5">{section.items.map(entry => renderDish(entry))}</div>
        </div>
      ))}

      {drinks.length > 0 && (
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
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{drink.description}</p>
              </UnifiedDishCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Quiet divider between courses: a label, and a count when there's more than one. */
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
