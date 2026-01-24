import { memo, useRef, useEffect, useState } from 'react';
import type { Country } from '../../data/types';
import type { CountryActivity } from '../../hooks/useCountryActivity';

interface MapPreviewCardProps {
  countryId: string;
  countryName: string;
  country: Country | undefined;
  activity: CountryActivity;
  x: number;
  y: number;
}

export const MapPreviewCard = memo(function MapPreviewCard({
  countryName,
  country,
  activity,
  x,
  y,
}: MapPreviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y, flipX: false, flipY: false });

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const container = card.closest('.map-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    const flipX = x + cardWidth / 2 > containerRect.width - 20;
    const flipY = y - cardHeight - 10 < 0;

    setPosition({ x, y, flipX, flipY });
  }, [x, y]);

  const hasProfile = !!country;
  const { restaurantCount, dishCount } = activity;

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.flipX ? 'auto' : position.x,
    right: position.flipX ? `calc(100% - ${position.x}px)` : 'auto',
    top: position.flipY ? position.y + 20 : 'auto',
    bottom: position.flipY ? 'auto' : `calc(100% - ${position.y}px + 10px)`,
    transform: `translateX(${position.flipX ? '50%' : '-50%'})`,
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
              <h3 className="font-semibold text-gray-900">{country.name}</h3>
              <span className="text-xs text-gray-500">{country.region}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {country.cuisineProfile.summary}
            </p>

            {(restaurantCount > 0 || dishCount > 0) && (
              <div className="flex gap-3 text-xs text-gray-500 mb-2">
                {restaurantCount > 0 && (
                  <span>{restaurantCount} restaurant{restaurantCount !== 1 ? 's' : ''}</span>
                )}
                {dishCount > 0 && (
                  <span>{dishCount} dish{dishCount !== 1 ? 'es' : ''}</span>
                )}
              </div>
            )}

            <div className="text-xs text-blue-600 font-medium">
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
