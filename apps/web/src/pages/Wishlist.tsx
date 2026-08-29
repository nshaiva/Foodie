import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useDishes } from '../hooks/useDishes';
import { useFavorites } from '../hooks/useFavorites';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { AppBar } from '../components/AppBar';
import { ProfileButton } from '../components/ProfileButton';
import { EntryGrid, type EntryGridActions } from '../components/country-detail/EntryGrid';
import { PlateDot } from '../components/Wordmark';
import type { Entry } from '../utils/groupDishes';
import type { Country, WishlistItem } from '../data/types';

interface CountryGroup {
  country: Country;
  entries: Entry[];
  /** Saved dishes we no longer hold data for (renamed or removed from the country) */
  unresolved: WishlistItem[];
  newest: number;
}

/**
 * Want to Try: the same cards and section style as a country's Eat & Drink
 * list, grouped by country. A saved dish is looked up in its country's data so
 * the card shows the full description, chips, heart/bookmark, and "+ I tried
 * this" — logging it here works exactly as it does on the country page.
 * Tried dishes stay listed (the rating prompt opens inside the card); the
 * bookmark is how you take one off the list.
 */
export function Wishlist() {
  const { wishlist, addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();
  const {
    addDish, updateDish, deleteDish, getDishesByCountry,
    addRestaurantTry, updateRestaurantTry, deleteRestaurantTry,
  } = useDishes();

  const groups = useMemo<CountryGroup[]>(() => {
    const byCountry = new Map<string, CountryGroup>();
    for (const item of wishlist) {
      const country = getCountryById(item.countryId);
      if (!country) continue;
      let group = byCountry.get(country.id);
      if (!group) {
        group = { country, entries: [], unresolved: [], newest: 0 };
        byCountry.set(country.id, group);
      }
      group.newest = Math.max(group.newest, new Date(item.createdAt).getTime());

      const logged = getDishesByCountry(country.id);
      const tried = logged.find(d =>
        d.name.toLowerCase() === item.dishName.toLowerCase() ||
        (item.englishName && d.name.toLowerCase() === item.englishName.toLowerCase())
      );
      const wanted = item.dishName.toLowerCase();
      const dish = country.popularDishes.find(d =>
        d.name.toLowerCase() === wanted || d.englishName?.toLowerCase() === wanted
      );
      if (dish) { group.entries.push({ kind: 'dish', key: item.id, dish, tried }); continue; }
      const drink = country.popularBeverages?.find(b =>
        b.name.toLowerCase() === wanted || b.englishName?.toLowerCase() === wanted
      );
      if (drink) { group.entries.push({ kind: 'drink', key: item.id, drink, tried }); continue; }
      group.unresolved.push(item);
    }
    // Most recently saved country first, like a list you keep adding to
    return [...byCountry.values()].sort((a, b) => b.newest - a.newest);
  }, [wishlist, getDishesByCountry]);

  const actionsFor = (countryId: string): EntryGridActions => ({
    countryId,
    onAddDish: ({ name, kind }) => addDish({ countryId, name, kind, restaurantTries: [] }),
    onUpdateDish: updateDish,
    onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry,
    onUpdateRestaurantTry: updateRestaurantTry,
    onDeleteRestaurantTry: deleteRestaurantTry,
    isOnWishlist, isFavorite,
    addToWishlist, removeFromWishlist, findWishlistItem,
    addToFavorites, removeFromFavorites, findFavoriteItem,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar actions={<ProfileButton />}>
        <h1 className="text-3xl font-bold flex items-center gap-2.5" style={{ color: systemColors.navy }}>
          <PlateDot color={systemColors.saffron} size={14} />
          Want to try
        </h1>
        <p className="mt-1" style={{ color: systemColors.navyMuted }}>
          {wishlist.length} dish{wishlist.length !== 1 ? 'es' : ''} saved
          {groups.length > 1 && ` across ${groups.length} cuisines`}
        </p>
      </AppBar>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {groups.length > 0 ? (
          <div className="space-y-6">
            {groups.map(({ country, entries, unresolved }) => (
              <section key={country.id} className="space-y-2">
                {/* Same quiet header as a country page section: name, count, a way in */}
                <Link
                  to={`/country/${country.id}`}
                  className="w-full flex items-baseline gap-2 text-left pt-1"
                >
                  <PlateDot color={country.colorPalette.primary} size={10} className="self-center" />
                  <h2 className="text-sm font-bold" style={{ color: systemColors.navy }}>
                    {country.name}
                  </h2>
                  <span className="text-xs" style={{ color: systemColors.navyMuted }}>
                    {entries.length + unresolved.length}
                  </span>
                  <span className="ml-auto text-[0.65rem] font-bold" style={{ color: systemColors.tomato }}>
                    open →
                  </span>
                </Link>

                {entries.length > 0 && (
                  <EntryGrid
                    entries={entries}
                    actions={actionsFor(country.id)}
                    regionLabelFor={() => undefined}
                  />
                )}

                {unresolved.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm"
                    style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
                  >
                    <span style={{ color: systemColors.navy }}>{item.dishName}</span>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="tap text-xs font-semibold"
                      style={{ color: systemColors.navyMuted }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex justify-center">
              <PlateDot color={systemColors.saffron} size={40} />
            </div>
            <p className="font-semibold mb-1" style={{ color: systemColors.navy }}>Nothing saved yet.</p>
            <p className="text-sm mb-6" style={{ color: systemColors.navyMuted }}>
              Tap the bookmark on any dish to keep it here for later.
            </p>
            <Link
              to="/"
              className="btn-press inline-block px-4 py-2 rounded-md text-sm font-semibold"
              style={{ backgroundColor: systemColors.tomato, color: systemColors.seaSalt }}
            >
              Browse cuisines
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
