import { systemColors } from '../data/systemColors';

interface CountryFinderProps {
  query: string;
  onQueryChange: (value: string) => void;
  /** Region name → how many countries it holds, in display order. */
  regions: readonly (readonly [string, number])[];
  /** Scroll to a region's section (or, from the map, go to the list first). */
  onJumpTo: (region: string) => void;
  /** How many countries the current query matches, for the result count. */
  matchCount: number;
  total: number;
}

/**
 * Find a country: a search field and a rail of continent chips.
 *
 * The chips are a jump, not a filter. Filtering to one region would hide the
 * rest of the world, which is the opposite of what a page about exploring
 * cuisines should do — so tapping a region scrolls its section into view and
 * leaves everything else below it.
 *
 * The regions are the same eight the mobile map uses (`data/culinaryRegions.ts`)
 * — grouped by flavor rather than by landmass — so the app names places one way
 * everywhere.
 *
 * Uses the same `.chip-rail` treatment as the country page's filters: scrolls
 * sideways below `md`, wraps above it.
 */
export function CountryFinder({
  query, onQueryChange, regions, onJumpTo, matchCount, total,
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
        <div className="chip-rail flex gap-1.5 md:flex-wrap" role="group" aria-label="Jump to a region">
          {regions.map(([region, count]) => (
            <button
              key={region}
              onClick={() => onJumpTo(region)}
              className="flex-none text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors"
              style={{
                backgroundColor: systemColors.surface,
                borderColor: systemColors.border,
                color: systemColors.navyMuted,
              }}
            >
              {region}
              <span className="ml-1.5 tabular-nums" style={{ color: systemColors.navy }}>{count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
