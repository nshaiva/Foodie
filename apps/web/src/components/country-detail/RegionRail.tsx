import { systemColors } from '../../data/systemColors';
import { getShortRegionName } from '../../data/regionMapConfig';
import type { ColorPalette, RegionalCuisine } from '../../data/types';

interface RegionRailProps {
  regions: RegionalCuisine[];
  counts: Record<string, number>;
  colors: ColorPalette;
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
  mapOpen: boolean;
  onToggleMap: () => void;
}

/**
 * One row of region chips with counts, plus the map toggle.
 *
 * This is the region picker that's always there; the map is the optional,
 * larger version of it. Once you've focused a region or applied a filter the
 * map has done its job, so it folds away and this rail is what remains — the
 * dishes start one row down instead of a screen down.
 */
export function RegionRail({
  regions, counts, colors, selectedRegion, onSelectRegion, mapOpen, onToggleMap,
}: RegionRailProps) {
  const chip = (label: string, count: number | null, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      aria-pressed={active}
      className="btn-press flex-none inline-flex items-baseline gap-1.5 text-sm font-semibold rounded-full border px-3 py-1.5 transition-colors"
      style={active
        ? { backgroundColor: colors.primary, color: '#fff', borderColor: colors.primary }
        : { backgroundColor: systemColors.surface, color: colors.primary, borderColor: `${colors.primary}40` }}
    >
      {label}
      {count !== null && (
        <span className="text-xs font-normal" style={{ opacity: active ? 0.85 : 0.7 }}>{count}</span>
      )}
    </button>
  );

  return (
    <div className="flex items-center gap-2">
      <div className="chip-rail flex gap-2 min-w-0 flex-1">
        {chip('All regions', null, selectedRegion === null, () => onSelectRegion(null))}
        {regions.map(region =>
          chip(
            getShortRegionName(region.name),
            counts[region.name] ?? 0,
            selectedRegion === region.name,
            () => onSelectRegion(selectedRegion === region.name ? null : region.name),
          )
        )}
      </div>
      <button
        onClick={onToggleMap}
        aria-expanded={mapOpen}
        className="tap flex-none text-xs font-semibold transition-colors hover:opacity-80"
        style={{ color: systemColors.navyMuted }}
      >
        {mapOpen ? 'Hide map' : 'Map'}
      </button>
    </div>
  );
}
