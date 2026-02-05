import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { WishlistCard } from '../components/WishlistCard';
import type { Continent } from '../data/types';

type SortOption = 'date-desc' | 'date-asc' | 'country' | 'name';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const getCountryName = (countryId: string) => {
    return getCountryById(countryId)?.name || countryId;
  };

  const getCountryContinent = (countryId: string) => {
    return getCountryById(countryId)?.continent;
  };

  const filteredWishlist = wishlist
    .filter(item => filterCountry === 'all' || item.countryId === filterCountry)
    .filter(item => {
      if (filterContinent === 'all') return true;
      return getCountryContinent(item.countryId) === filterContinent;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'country':
          return getCountryName(a.countryId).localeCompare(getCountryName(b.countryId));
        case 'name':
          return a.dishName.localeCompare(b.dishName);
        default:
          return 0;
      }
    });

  const countriesWithWishlistItems = [...new Set(wishlist.map(item => item.countryId))];
  const continentsWithWishlistItems = [...new Set(
    countriesWithWishlistItems
      .map(id => getCountryContinent(id))
      .filter((c): c is Continent => c !== undefined)
  )];

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.navy }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="text-sm mb-2 inline-block opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: systemColors.seaSalt }}
          >
            ← Back to countries
          </Link>
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill={systemColors.tomato} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: systemColors.seaSalt }}>
                Want to Try
              </h1>
              <p className="mt-1" style={{ color: `${systemColors.seaSalt}99` }}>
                {wishlist.length} dish{wishlist.length !== 1 ? 'es' : ''} saved
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {wishlist.length > 0 ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label htmlFor="filterContinent" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  id="filterContinent"
                  value={filterContinent}
                  onChange={(e) => {
                    setFilterContinent(e.target.value);
                    setFilterCountry('all');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">All Regions</option>
                  {continentsWithWishlistItems.map(continent => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filterCountry" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="filterCountry"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">All Countries</option>
                  {countriesWithWishlistItems
                    .filter(id => filterContinent === 'all' || getCountryContinent(id) === filterContinent)
                    .sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)))
                    .map(countryId => (
                      <option key={countryId} value={countryId}>
                        {getCountryName(countryId)}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="country">Country A-Z</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredWishlist.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  countryName={getCountryName(item.countryId)}
                  onRemove={removeFromWishlist}
                />
              ))}
            </div>

            {filteredWishlist.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No dishes match your filters.
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: `${systemColors.tomato}40` }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p style={{ color: systemColors.navy }} className="mb-4">Your wishlist is empty.</p>
            <p className="text-sm mb-6" style={{ color: systemColors.navyMuted }}>
              Browse countries and save dishes you want to try!
            </p>
            <Link
              to="/"
              className="inline-block px-4 py-2 rounded-md transition-colors"
              style={{ backgroundColor: systemColors.tomato, color: systemColors.seaSalt }}
            >
              Browse Countries
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
