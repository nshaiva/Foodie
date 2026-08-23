import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { countries } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { CountryCard } from '../components/CountryCard';
import { useWishlist } from '../hooks/useWishlist';
import { useDishes } from '../hooks/useDishes';
import { countryDishProgress } from '../utils/dishProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ViewToggle, type ViewMode } from '../components/ViewToggle';
import { WorldMap } from '../components/map/WorldMap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { TasteProfileButton } from '../components/TasteProfileButton';
import { SignInButton } from '../components/SignInButton';
import { NextCountrySuggestions } from '../components/NextCountrySuggestions';
import { WordmarkDot } from '../components/Wordmark';
import { CountryFinder } from '../components/CountryFinder';

// Static data: group once at module level, continents and countries both alphabetized
const continentGroups = Object.entries(
  countries.reduce<Record<string, typeof countries>>((acc, country) => {
    (acc[country.continent] ??= []).push(country);
    return acc;
  }, {})
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([continent, group]) => [
    continent,
    [...group].sort((a, b) => a.name.localeCompare(b.name)),
  ] as const);

const CONTINENT_COUNTS = continentGroups.map(
  ([continent, group]) => [continent, group.length] as const
);

/** Name, capital, continent and sub-region — the things people actually type. */
function matchesCountry(country: (typeof countries)[number], q: string): boolean {
  return [country.name, country.capital, country.continent, country.region]
    .some(field => field.toLowerCase().includes(q));
}

export function Home() {
  const { wishlist } = useWishlist();
  const { getDishesByCountry } = useDishes();
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('foodie-view-mode', 'map');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [query, setQuery] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const searching = query.trim() !== '';

  // Grid on mobile (the map is hover-driven and unusable at 390px), and grid
  // while searching, since results are a list no matter which view you were in.
  const effectiveView = isMobile || searching ? 'grid' : viewMode;

  const visibleGroups = useMemo(() => {
    if (!searching) return continentGroups;
    const q = query.trim().toLowerCase();
    return continentGroups
      .map(([continent, group]) => [continent, group.filter(c => matchesCountry(c, q))] as const)
      .filter(([, group]) => group.length > 0);
  }, [query, searching]);

  const matchCount = visibleGroups.reduce((n, [, group]) => n + group.length, 0);

  // Jumping from the map means leaving it first, otherwise there is no section
  // to scroll to. The ref is populated by the time the layout paints.
  const jumpTo = (continent: string) => {
    if (effectiveView === 'map') setViewMode('grid');
    requestAnimationFrame(() =>
      sectionRefs.current[continent]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="wordmark text-3xl font-bold lowercase leading-none" style={{ color: systemColors.navy }}>
                foodie<WordmarkDot />
              </h1>
              <p className="mt-1.5 text-sm" style={{ color: systemColors.navyMuted }}>
                Explore cuisines from around the world
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
              <Link
                to="/restaurant"
                className="btn-press text-sm font-semibold text-white px-3.5 py-2 rounded-lg"
                style={{ backgroundColor: systemColors.tomato }}
              >
                🍽 At a restaurant?
              </Link>
              <TasteProfileButton />
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: systemColors.navy }}
              >
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${systemColors.tomato}30`, color: systemColors.tomato }}
                >
                  {wishlist.length}
                </span>
                Wishlist
              </Link>
              <SignInButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium" style={{ color: systemColors.navy }}>
            {countries.length} Countries
          </h2>
          {!isMobile && (
            <ViewToggle view={viewMode} onChange={setViewMode} />
          )}
        </div>

        <div className="mb-6">
          <CountryFinder
            query={query}
            onQueryChange={setQuery}
            continents={CONTINENT_COUNTS}
            onJumpTo={jumpTo}
            matchCount={matchCount}
            total={countries.length}
          />
        </div>

        {effectiveView === 'map' ? (
          <WorldMap />
        ) : (
          <>
          {/* A suggestion module is noise when you're looking for something specific */}
          {!searching && <NextCountrySuggestions />}
          {matchCount === 0 ? (
            <div
              className="rounded-xl border border-dashed p-8 text-center"
              style={{ borderColor: systemColors.border }}
            >
              <p className="font-semibold" style={{ color: systemColors.navy }}>
                No country matches “{query.trim()}”.
              </p>
              <button
                onClick={() => setQuery('')}
                className="text-sm font-semibold mt-2"
                style={{ color: systemColors.tomato }}
              >
                Clear search
              </button>
            </div>
          ) : (
          <div className="space-y-8">
            {visibleGroups.map(([continent, group]) => (
              <section
                key={continent}
                ref={el => { sectionRefs.current[continent] = el; }}
                className="scroll-mt-4"
              >
                <h3
                  className="mb-3 text-sm font-semibold uppercase tracking-wide"
                  style={{ color: systemColors.navyMuted }}
                >
                  {continent}
                  <span className="ml-2 font-normal normal-case tracking-normal">
                    {group.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      progress={countryDishProgress(country, getDishesByCountry(country.id))}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          )}
          </>
        )}
      </main>
    </div>
  );
}
