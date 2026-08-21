import { axesByIntensity, FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';
import { systemColors } from '../../data/systemColors';
import type { CuisineProfile } from '../../data/types';

/**
 * A one-line preview of the cuisine's flavor profile, sitting just under the
 * summary.
 *
 * The full fingerprint and the culture writing live in disclosures at the bottom
 * of the page, which is the right place for them on a phone but means nothing on
 * the first screen suggests the page teaches anything. This is the smallest thing
 * that fixes that: three axis chips and the one-sentence interpretation, which
 * open the full section when tapped.
 */
export function CuisineTeaser({
  profile, countryName, onOpen,
}: { profile: CuisineProfile; countryName: string; onOpen: () => void }) {
  const intensity = profile.flavorIntensity;
  if (!intensity) return null;

  const top = axesByIntensity(intensity).slice(0, 3);

  return (
    <button
      onClick={onOpen}
      className="w-full text-left flex flex-wrap items-center gap-x-2 gap-y-1.5 group"
      aria-label={`Show the flavor fingerprint for all of ${countryName}`}
    >
      <span className="flex gap-1 flex-none">
        {top.map(({ axis }) => (
          <span
            key={axis}
            className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }}
          >
            {FLAVOR_AXIS_META[axis].label}
          </span>
        ))}
      </span>
      {intensity.interpretation && (
        <span className="text-xs flex-1 min-w-[12rem]" style={{ color: systemColors.navyMuted }}>
          {intensity.interpretation}
        </span>
      )}
      <span
        className="text-[0.68rem] font-bold flex-none group-hover:underline"
        style={{ color: systemColors.tomato }}
      >
        All of {countryName} →
      </span>
    </button>
  );
}
