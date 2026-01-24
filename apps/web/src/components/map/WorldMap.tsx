import { useState, useCallback, memo, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { getAlpha2FromNumeric } from '../../data/countryGeoMapping';
import { getCountryById } from '../../data/countries';
import { useRestaurants } from '../../hooks/useRestaurants';
import { useDishes } from '../../hooks/useDishes';
import { useCountryActivity } from '../../hooks/useCountryActivity';
import { getCountryFillColor, MAP_STROKE } from './mapUtils';
import { MapPreviewCard } from './MapPreviewCard';
import { MapLegend } from './MapLegend';

// Use jsDelivr CDN for world-atlas TopoJSON
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

interface TooltipData {
  countryId: string;
  countryName: string;
  x: number;
  y: number;
}

export const WorldMap = memo(function WorldMap() {
  const navigate = useNavigate();
  const { restaurants } = useRestaurants();
  const { dishes } = useDishes();
  const { getActivityState, getCountryActivity, profiledCountryIds } = useCountryActivity(restaurants, dishes);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  // Mark as loaded once geographies have rendered
  useEffect(() => {
    if (hasRendered) {
      setIsLoading(false);
    }
  }, [hasRendered]);

  const handleMouseEnter = useCallback((
    geo: { id: string; properties: { name: string } },
    event: React.MouseEvent
  ) => {
    // TopoJSON uses numeric country codes as the id
    const numericId = geo.id;
    const alpha2 = getAlpha2FromNumeric(numericId);
    if (!alpha2) return;

    setHoveredCountry(alpha2);

    const mapContainer = (event.currentTarget as Element).closest('.map-container');
    const containerRect = mapContainer?.getBoundingClientRect();

    if (containerRect) {
      setTooltipData({
        countryId: alpha2,
        countryName: geo.properties.name,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top - 10,
      });
    }
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!tooltipData) return;

    const mapContainer = (event.currentTarget as Element).closest('.map-container');
    const containerRect = mapContainer?.getBoundingClientRect();

    if (containerRect) {
      setTooltipData(prev => prev ? {
        ...prev,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top - 10,
      } : null);
    }
  }, [tooltipData]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    setTooltipData(null);
  }, []);

  const handleCountryClick = useCallback((alpha2: string) => {
    if (profiledCountryIds.has(alpha2)) {
      navigate(`/country/${alpha2}`);
    }
  }, [navigate, profiledCountryIds]);

  return (
    <div className="map-container relative w-full bg-blue-50/30 rounded-lg overflow-hidden border border-gray-200">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [0, 30],
        }}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '2 / 1',
        }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              // Signal that geographies have loaded
              if (geographies.length > 0 && !hasRendered) {
                setTimeout(() => setHasRendered(true), 0);
              }

              return geographies.map((geo) => {
                // TopoJSON uses numeric country codes as the id
                const numericId = geo.id as string;
                const alpha2 = getAlpha2FromNumeric(numericId);
                const activityState = alpha2 ? getActivityState(alpha2) : 'noProfile';
                const isHovered = hoveredCountry === alpha2;
                const hasProfile = alpha2 ? profiledCountryIds.has(alpha2) : false;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryFillColor(activityState, isHovered)}
                    stroke={isHovered ? MAP_STROKE.hover : MAP_STROKE.default}
                    strokeWidth={isHovered ? 1 : 0.5}
                    style={{
                      default: {
                        outline: 'none',
                        transition: 'fill 150ms ease-out',
                      },
                      hover: {
                        outline: 'none',
                        cursor: hasProfile ? 'pointer' : 'default',
                      },
                      pressed: {
                        outline: 'none',
                      },
                    }}
                    onMouseEnter={(event) => handleMouseEnter(geo, event)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => alpha2 && handleCountryClick(alpha2)}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltipData && (
        <MapPreviewCard
          countryId={tooltipData.countryId}
          countryName={tooltipData.countryName}
          country={getCountryById(tooltipData.countryId)}
          activity={getCountryActivity(tooltipData.countryId)}
          x={tooltipData.x}
          y={tooltipData.y}
        />
      )}

      <MapLegend />
    </div>
  );
});
