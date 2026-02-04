import { Link } from 'react-router-dom';
import { countries } from '../data/countries';
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Foodie</h1>
              <p className="text-gray-600 mt-1">Explore cuisines from around the world</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/restaurants"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                  {restaurants.length}
                </span>
                Restaurants
              </Link>
              <Link
                to="/dishes"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  {dishes.length}
                </span>
                Dishes
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-medium">
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
          <h2 className="text-lg font-medium text-gray-900">
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
