import { FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';
import { systemColors } from '../../data/systemColors';
import type { ColorPalette, IngredientTiers } from '../../data/types';
import { FINGERPRINT_MIN_MATCHES, regionFingerprint } from '../../utils/dishRegion';
import { getShortRegionName } from '../../data/regionMapConfig';
import type { Group } from '../../utils/groupDishes';

interface DishSectionProps {
  group: Group;
  focused: boolean;
  onFocus: () => void;
  onClearFocus: () => void;
  colors: ColorPalette;
  tiers?: IngredientTiers;
  /** Shown in place of the grid when the group has nothing in it. */
  emptyNote?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * A group of dishes with its header.
 *
 * Headers stay deliberately quiet while browsing — a name and a count — because
 * five regions' worth of description is a wall you scroll past rather than read.
 * Focusing a region (from here or from the map) is what earns the full
 * description and its derived flavor chips: you're taught once you've shown
 * interest, and the other regions get out of the way.
 *
 * A region with no dishes still renders its full focused card. The description
 * is the whole point of the region lens, and a region we hold no dishes for is
 * exactly when it's the only thing we have to offer.
 */
export function DishSection({
  group, focused, onFocus, onClearFocus, colors, tiers, emptyNote, children,
}: DishSectionProps) {
  const region = group.region;
  const fingerprint = region ? regionFingerprint(region, tiers) : undefined;
  const showChips = !!fingerprint && fingerprint.matched >= FINGERPRINT_MIN_MATCHES;
  const focusable = !!region;

  if (!group.label) return <>{children}</>;

  if (focused && region) {
    return (
      <section className="space-y-3">
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: colors.primary, backgroundColor: `${colors.primary}0F` }}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>
              {region.name}
            </h2>
            <span className="text-xs flex-none" style={{ color: systemColors.navyMuted }}>
              {group.entries.length} {group.entries.length === 1 ? 'dish' : 'dishes'}
            </span>
          </div>

          <p className="text-sm mt-1.5" style={{ color: systemColors.navyMuted }}>
            {region.description}
          </p>

          {showChips && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {fingerprint!.axes.slice(0, 4).map(axis => (
                <span
                  key={axis}
                  className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }}
                  title={`Derived from this region's key ingredients`}
                >
                  {FLAVOR_AXIS_META[axis].label}
                </span>
              ))}
            </div>
          )}

          {region.keyIngredients.length > 0 && (
            <p className="text-xs mt-2" style={{ color: systemColors.navyMuted }}>
              <span className="font-semibold">Key ingredients: </span>
              {region.keyIngredients.join(', ')}
            </p>
          )}

          <button
            onClick={onClearFocus}
            className="text-xs font-bold mt-3"
            style={{ color: systemColors.tomato }}
          >
            ← All dishes
          </button>
        </div>

        {group.entries.length > 0 ? children : (
          <div className="py-2">
            {emptyNote ?? (
              <p className="text-sm italic" style={{ color: systemColors.navyMuted }}>
                No dishes recorded from this region yet.
              </p>
            )}
          </div>
        )}
      </section>
    );
  }

  const Header = focusable ? 'button' : 'div';
  return (
    <section className="space-y-2">
      <Header
        {...(focusable
          ? { onClick: onFocus, 'aria-label': `Focus ${getShortRegionName(group.label)}` }
          : {})}
        className="w-full flex items-baseline gap-2 text-left pt-1"
      >
        <h2 className="text-sm font-bold" style={{ color: systemColors.navy }}>
          {region ? getShortRegionName(region.name) : group.label}
        </h2>
        <span className="text-xs" style={{ color: systemColors.navyMuted }}>
          {group.entries.length}
        </span>
        {focusable && (
          <span className="ml-auto text-[0.65rem] font-bold" style={{ color: systemColors.tomato }}>
            open →
          </span>
        )}
      </Header>

      {group.entries.length > 0 ? children : (
        <p className="text-xs italic pb-1" style={{ color: systemColors.navyMuted }}>
          No dishes recorded from this region yet.
        </p>
      )}
    </section>
  );
}
