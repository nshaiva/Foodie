import { systemColors } from '../data/systemColors';

interface CountryFinderProps {
  query: string;
  onQueryChange: (value: string) => void;
  /** Continent name → how many countries it holds, in display order. */
  continents: readonly (readonly [string, number])[];
  /** Scroll to a continent's section (or, from the map, go to the list first). */
  onJumpTo: (continent: string) => void;
  /** How many countries the current query matches, for the result count. */
  matchCount: number;
  total: number;
}

/**
 * Find a country: a search field and a rail of continent chips.
 *
 * The chips are a jump, not a filter. Filtering to one continent would hide the
 * rest of the world, which is the opposite of what a page about exploring
 * cuisines should do — so tapping a continent scrolls its section into view and
 * leaves everything else below it.
 *
 * This is also the phone's answer to having no world map. The map is desktop
 * only (its preview card is hover-driven, which a phone can't do, and 31
 * countries at 390px are a few pixels each), which cost the "where are these
 * cuisines in relation to each other" idea entirely on mobile. Continent chips
 * put that back in a form a thumb can use.
 *
 * Uses the same `.chip-rail` treatment as the country page's filters: scrolls
 * sideways below `md`, wraps above it.
 */
export function CountryFinder({
  query, onQueryChange, continents, onJumpTo, matchCount, total,
}: CountryFinderProps) {
  const searching = query.trim() !== '';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Search countries, regions, capitals…"
          aria-label="Search countries"
          className="flex-1 min-w-0 text-sm px-3 py-2 rounded-lg border"
          style={{ borderColor: systemColors.border, color: systemColors.navy }}
        />
        {searching && (
          <span
            className="flex-none text-xs tabular-nums"
            style={{ color: systemColors.navyMuted }}
          >
            {matchCount} of {total}
          </span>
        )}
      </div>

      {!searching && (
        <div className="chip-rail flex gap-1.5 md:flex-wrap" role="group" aria-label="Jump to a continent">
          {continents.map(([continent, count]) => (
            <button
              key={continent}
              onClick={() => onJumpTo(continent)}
              className="flex-none text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors"
              style={{
                backgroundColor: systemColors.surface,
                borderColor: systemColors.border,
                color: systemColors.navyMuted,
              }}
            >
              {continent}
              <span className="ml-1.5 tabular-nums" style={{ color: systemColors.navy }}>{count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
