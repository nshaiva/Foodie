import { memo, useRef, useLayoutEffect, useState } from 'react';
import type { Country } from '../../data/types';
import type { CountryActivity } from '../../hooks/useCountryActivity';
import type { FlavorMatch } from './flavorMatch';
import { systemColors } from '../../data/systemColors';
import { ProgressPlate } from '../ProgressPlate';
import { PlateDot } from '../Wordmark';
import type { DishProgress } from '../../utils/dishProgress';

interface MapPreviewCardProps {
  countryId: string;
  countryName: string;
  country: Country | undefined;
  activity: CountryActivity;
  match?: FlavorMatch;
  progress?: DishProgress;
  x: number;
  y: number;
}

export const MapPreviewCard = memo(function MapPreviewCard({
  countryName,
  country,
  activity,
  match,
  progress,
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
  const { dishCount } = activity;

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
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px] max-w-[280px]">
        {hasProfile ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
                {progress && progress.percent > 0 ? (
                  <ProgressPlate
                    percent={progress.percent}
                    size={22}
                    color={country.colorPalette.primary}
                    title={`${progress.tried} of ${progress.total} dishes tried`}
                  />
                ) : (
                  <PlateDot color={country.colorPalette.primary} size={12} />
                )}
                {country.name}
              </h3>
              <span className="text-xs text-gray-500">{country.region}</span>
            </div>

            <div className="text-xs text-gray-500 mb-2">
              Capital: {country.capital}
            </div>

            {match && (
              <div
                className="text-xs font-medium mb-2"
                style={{ color: systemColors.tomato }}
              >
                {match.score}% match
                {match.topAxes.length > 0 && (
                  <span style={{ color: systemColors.navyMuted }}>
                    {' '}— big on {match.topAxes.join(' and ')}, like you
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-1 mb-2">
              {country.cuisineProfile.flavorProfile.slice(0, 4).map((flavor) => (
                <span
                  key={flavor}
                  className="px-1.5 py-0.5 text-xs rounded"
                  style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
                >
                  {flavor}
                </span>
              ))}
            </div>

            {dishCount > 0 && (
              <div className="flex gap-3 text-xs text-gray-500 mb-2">
                <span>{dishCount} dish{dishCount !== 1 ? 'es' : ''} logged</span>
              </div>
            )}

            <div className="text-xs font-medium" style={{ color: systemColors.navy }}>
              Click to explore
            </div>
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
