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
import { RegionMap } from '../components/map/RegionMap';
import { STOCKED_REGIONS, getRegion } from '../data/culinaryRegions';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ProfileButton } from '../components/ProfileButton';
import { NextCountrySuggestions } from '../components/NextCountrySuggestions';
import { AppBar } from '../components/AppBar';
import { CountryFinder } from '../components/CountryFinder';

/**
 * The grid is grouped by the same eight culinary regions the mobile map uses,
 * in the order they're declared (roughly west to east, umbrella region before
 * its sub-region), not alphabetically by
 * continent. One vocabulary across the app: a chip that says "Southeast Asia"
 * should lead to a section with that name, and tapping Asia on a phone map
 * shouldn't land somewhere organized by a different idea.
 */
const regionGroups = STOCKED_REGIONS.map(region => [
  region.id,
  region.name,
  region.countryIds
    .map(id => countries.find(c => c.id === id))
    .filter((c): c is (typeof countries)[number] => !!c)
    .sort((a, b) => a.name.localeCompare(b.name)),
] as const);

const REGION_COUNTS = regionGroups.map(
  ([id, name, group]) => [id, name, group.length] as const
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
  const [mapFocus, setMapFocus] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const searching = query.trim() !== '';

  // Grid while searching, since results are a list no matter which view you
  // were in. Mobile now has a map of its own — the region map — because the
  // world map is hover-driven and unreadable at 390px.
  const effectiveView = searching ? 'grid' : viewMode;

  const visibleGroups = useMemo(() => {
    if (!searching) return regionGroups;
    const q = query.trim().toLowerCase();
    return regionGroups
      .map(([id, name, group]) => [id, name, group.filter(c => matchesCountry(c, q))] as const)
      .filter(([, , group]) => group.length > 0);
  }, [query, searching]);

  const matchCount = visibleGroups.reduce((n, [, , group]) => n + group.length, 0);

  // A chip means "take me to this region", and what that means depends on what
  // you're looking at. On the map it zooms the map — answering a map question
  // by switching to the grid was the wrong move. In the grid it scrolls.
  // Clicking the region you're already in zooms back out.
  const jumpTo = (regionId: string) => {
    if (effectiveView === 'map') {
      setMapFocus(prev => (prev === regionId ? null : regionId));
      return;
    }
    const name = getRegion(regionId)?.name;
    if (!name) return;
    requestAnimationFrame(() =>
      sectionRefs.current[name]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar
        actions={
          <>
            <Link
              to="/restaurant"
              className="btn-press text-sm font-semibold text-white px-3.5 py-2 rounded-lg"
              style={{ backgroundColor: systemColors.tomato }}
            >
              🍽 At a restaurant?
            </Link>
            {/* The same bookmark you tap on a card, with a count — quiet, and it
                explains itself by resemblance rather than by a word */}
            <Link
              to="/wishlist"
              aria-label={`Want to try (${wishlist.length})`}
              title="Want to try"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: systemColors.navy }}
            >
              <span
                className="p-2 rounded-full inline-flex"
                style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
              >
                <svg className="w-4 h-4" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </span>
              {wishlist.length > 0 && <span>{wishlist.length}</span>}
            </Link>
            <ProfileButton />
          </>
        }
      >
        <p className="text-sm" style={{ color: systemColors.navyMuted }}>
          Explore cuisines from around the world
        </p>
      </AppBar>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium" style={{ color: systemColors.navy }}>
            {countries.length} Countries
          </h2>
          <ViewToggle view={viewMode} onChange={setViewMode} />
        </div>

        <div className="mb-6">
          <CountryFinder
            query={query}
            onQueryChange={setQuery}
            regions={REGION_COUNTS}
            onJumpTo={jumpTo}
            activeRegionId={effectiveView === 'map' ? mapFocus : null}
            matchCount={matchCount}
            total={countries.length}
          />
        </div>

        {effectiveView === 'map' ? (
          /* Two entry points, one idea. The desktop map's job is comparison —
             the flavor-match layer colors all 31 at once — which only works
             when everything is visible together. A phone can't show that, so
             it gets regions it can actually tap. */
          isMobile ? (
            <RegionMap focusId={mapFocus} onFocusChange={setMapFocus} />
          ) : (
            <WorldMap focus={mapFocus ? getRegion(mapFocus) : null} onClearFocus={() => setMapFocus(null)} />
          )
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
            {visibleGroups.map(([, regionName, group]) => (
              <section
                key={regionName}
                ref={el => { sectionRefs.current[regionName] = el; }}
                className="scroll-mt-4"
              >
                <h3
                  className="mb-3 text-sm font-semibold uppercase tracking-wide"
                  style={{ color: systemColors.navyMuted }}
                >
                  {regionName}
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
