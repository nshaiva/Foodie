import { Link } from 'react-router-dom';
import { countries } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { CountryCard } from '../components/CountryCard';
import { useRestaurants } from '../hooks/useRestaurants';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ViewToggle, type ViewMode } from '../components/ViewToggle';
import { WorldMap } from '../components/map/WorldMap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CuisinePreferences } from '../components/CuisinePreferences';

export function Home() {
  const { restaurants } = useRestaurants();
  const { dishes } = useDishes();
  const { wishlist } = useWishlist();
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('foodie-view-mode', 'grid');
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Force grid view on mobile
  const effectiveView = isMobile ? 'grid' : viewMode;

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.navy }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: systemColors.seaSalt }}>
                Foodie
              </h1>
              <p className="mt-1" style={{ color: `${systemColors.seaSalt}99` }}>
                Explore cuisines from around the world
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/restaurants"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: systemColors.seaSalt }}
              >
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${systemColors.saffron}30`, color: systemColors.saffron }}
                >
                  {restaurants.length}
                </span>
                Restaurants
              </Link>
              <Link
                to="/dishes"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: systemColors.seaSalt }}
              >
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${systemColors.herb}30`, color: systemColors.herb }}
                >
                  {dishes.length}
                </span>
                Dishes
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: systemColors.seaSalt }}
              >
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${systemColors.tomato}30`, color: systemColors.tomato }}
                >
                  {wishlist.length}
                </span>
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Cuisine Preferences - shown when user has rated dishes */}
        {dishes.length > 0 && (
          <div className="mb-8">
            <CuisinePreferences />
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium" style={{ color: systemColors.navy }}>
            {countries.length} Countries
          </h2>
          {!isMobile && (
            <ViewToggle view={viewMode} onChange={setViewMode} />
          )}
        </div>

        {effectiveView === 'map' ? (
          <WorldMap />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
