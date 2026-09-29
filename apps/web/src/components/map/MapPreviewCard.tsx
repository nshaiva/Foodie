import { memo, useRef, useLayoutEffect, useState } from 'react';
import type { Country } from '../../data/types';
import type { CountryActivity } from '../../hooks/useCountryActivity';
import type { FlavorMatch } from './flavorMatch';
import { systemColors } from '../../data/systemColors';
import { ProgressPlate } from '../ProgressPlate';
import { PlateDot } from '../Wordmark';
import type { DishProgress } from '../../utils/dishProgress';
import { FLAVOR_AXIS_IDS, FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';

interface MapPreviewCardProps {
  countryId: string;
  countryName: string;
  country: Country | undefined;
  activity: CountryActivity;
  match?: FlavorMatch;
  progress?: DishProgress;
  /** How many of this country's dishes are on the want-to-try list */
  wantCount?: number;
  x: number;
  y: number;
}

/** "olive oil · garlic · jamón ibérico": the first three, minus asides like "(pimentón)" */
function ingredientLine(ingredients: string[]): string {
  const line = ingredients
    .slice(0, 3)
    .map(i => i.replace(/\s*\([^)]*\)/g, '').trim())
    .filter(Boolean)
    .join(' · ');
  return line.charAt(0).toUpperCase() + line.slice(1);
}

export const MapPreviewCard = memo(function MapPreviewCard({
  countryName,
  country,
  match,
  progress,
  wantCount = 0,
  x,
  y,
}: MapPreviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Unknown until measured; the first paint is hidden so it never flashes
  // somewhere wrong
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const container = card?.closest('.map-container') ?? (card?.offsetParent as HTMLElement | null);
    if (!card || !container) return;
    const { width: cw, height: ch } = container.getBoundingClientRect();
    const w = card.offsetWidth, h = card.offsetHeight, pad = 8;
    // Above the pointer, centred; below it when there's no room above. Then
    // clamp so the card always stays inside the map.
    let top = y - h - 10;
    if (top < pad) top = y + 20;
    top = Math.max(pad, Math.min(top, ch - h - pad));
    const left = Math.max(pad, Math.min(x - w / 2, cw - w - pad));
    setPosition({ left, top });
  }, [x, y]);

  const hasProfile = !!country;

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: position?.left ?? x,
    top: position?.top ?? y,
    visibility: position ? 'visible' : 'hidden',
    zIndex: 50,
  };

  return (
    <div
      ref={cardRef}
      className="pointer-events-none"
      style={tooltipStyle}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2.5 max-w-[240px]">
        {hasProfile ? (
          // Three lines, scannable in the second the card is up: who, what it
          // tastes like, and what it's built on. Your own state joins as one
          // extra line only when there is any.
          <>
            <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
              {progress && progress.percent > 0 ? (
                <ProgressPlate
                  percent={progress.percent}
                  size={20}
                  color={country.colorPalette.primary}
                  title={`${progress.tried} of ${progress.total} dishes tried`}
                />
              ) : (
                <PlateDot color={country.colorPalette.primary} size={12} />
              )}
              {country.name}
            </h3>
            {/* Its two strongest fingerprint axes, in the same fixed axis
                colours as the panel's flavor bars */}
            <div className="flex gap-1.5 mt-1.5">
              {[...FLAVOR_AXIS_IDS]
                .sort((p, q) => country.cuisineProfile.flavorIntensity[q] - country.cuisineProfile.flavorIntensity[p])
                .slice(0, 2)
                .map(axis => {
                  const m = FLAVOR_AXIS_META[axis];
                  return (
                    <span key={axis} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${m.color}1F`, color: m.color }}>
                      {m.label}
                    </span>
                  );
                })}
            </div>
            {country.cuisineProfile.keyIngredients.length > 0 && (
              <p className="text-xs mt-1.5" style={{ color: systemColors.navy }}>{ingredientLine(country.cuisineProfile.keyIngredients)}</p>
            )}
            {((progress && progress.tried > 0) || wantCount > 0) && (
              <p className="text-xs mt-1" style={{ color: systemColors.navyMuted }}>
                {[
                  progress && progress.tried > 0 ? `${progress.tried} of ${progress.total} tried` : null,
                  wantCount > 0 ? `${wantCount} on your list` : null,
                ].filter(Boolean).join(' · ')}
              </p>
            )}
            {match && (
              <p className="text-xs font-medium mt-1" style={{ color: systemColors.tomato }}>{match.score}% match</p>
            )}
          </>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900 mb-1">{countryName}</h3>
            <p className="text-sm text-gray-500">Coming soon</p>
          </>
        )}
      </div>
    </div>
  );
});
