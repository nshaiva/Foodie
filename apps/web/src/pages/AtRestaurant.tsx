import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { countries, getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useDietPrefs } from '../hooks/useDietPrefs';
import { rankDishesForOrdering } from '../utils/orderRanking';
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

  const dishCrudProps = {
    onUpdateDish: updateDish,
    onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry,
    onUpdateRestaurantTry: updateRestaurantTry,
    onDeleteRestaurantTry: deleteRestaurantTry,
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        <PlateDot color={country.colorPalette.primary} size={16} />
        <h1 className="text-2xl font-bold" style={{ color: systemColors.navy }}>
          What to order · {country.name}
        </h1>
      </div>
      <p className="text-sm mb-4" style={{ color: systemColors.navyMuted }}>
        Ranked for you: your ratings, what locals order, your list, your spice comfort.
      </p>

      <div className="space-y-3">
        {ranked.map(({ dish, reasons, tried }, index) => (
          <UnifiedDishCard
            key={dish.name}
            tried={tried}
            onTryThis={() => addDish({ countryId, name: dish.name, restaurantTries: [] })}
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
            <div className="flex items-baseline gap-2 pr-12">
              <span
                className="flex-none text-xs font-bold w-6 h-6 rounded-full inline-flex items-center justify-center"
                style={{ backgroundColor: `${country.colorPalette.primary}18`, color: country.colorPalette.primary }}
              >
                {index + 1}
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

            <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{dish.description}</p>

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
        ))}
      </div>
    </div>
  );
}
