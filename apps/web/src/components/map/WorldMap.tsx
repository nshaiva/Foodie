import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { getAlpha2FromNumeric } from '../../data/countryGeoMapping';
import { getCountryById } from '../../data/countries';
import { useDishes } from '../../hooks/useDishes';
import { useCountryActivity } from '../../hooks/useCountryActivity';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePersonalFlavorProfile } from '../../hooks/usePersonalFlavorProfile';
import { computeAllFlavorMatches } from './flavorMatch';
import {
  getCountryFillColor,
  getFlavorMatchFillColor,
  FLAVOR_MATCH_LOGGED_STROKE,
  MAP_STROKE,
  type MapLayer,
} from './mapUtils';
import { MapPreviewCard } from './MapPreviewCard';
import { countryDishProgress } from '../../utils/dishProgress';
import { MapLegend } from './MapLegend';
import { systemColors } from '../../data/systemColors';
import type { CulinaryRegion } from '../../data/culinaryRegions';

// Use jsDelivr CDN for world-atlas TopoJSON
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

interface TooltipData {
  countryId: string;
  countryName: string;
  x: number;
  y: number;
}

/** Base projection scale, so a region's scale can be expressed as a zoom factor. */
const BASE_SCALE = 130;

interface WorldMapProps {
  /**
   * A culinary region to zoom into, or null for the whole world. Controlled by
   * the page so the region chips can drive the map: clicking one while you're
   * looking at the map should move the map, not throw you into the grid.
   */
  focus?: CulinaryRegion | null;
  onClearFocus?: () => void;
}

export const WorldMap = memo(function WorldMap({ focus, onClearFocus }: WorldMapProps) {
  const navigate = useNavigate();
  const { dishes } = useDishes();
  const { getActivityState, getCountryActivity, profiledCountryIds } = useCountryActivity(dishes);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  const { personalFlavor, hasEnoughData } = usePersonalFlavorProfile();
  const [storedLayer, setStoredLayer] = useLocalStorage<MapLayer>('foodie-map-layer', 'explored');
  // Fall back to explored if the profile doesn't have enough data yet
  const layer: MapLayer = hasEnoughData ? storedLayer : 'explored';

  const flavorMatches = useMemo(
    () => (layer === 'flavorMatch' && personalFlavor ? computeAllFlavorMatches(personalFlavor) : null),
    [layer, personalFlavor]
  );

  // Explored-depth per country (% of popular dishes tried) for the
  // explored layer's gradient
  const exploredDepth = useMemo(() => {
    const byCountry = new Map<string, typeof dishes>();
    dishes.forEach(d => {
      const list = byCountry.get(d.countryId) ?? [];
      list.push(d);
      byCountry.set(d.countryId, list);
    });
    const depths = new Map<string, number>();
    for (const [countryId, list] of byCountry) {
      const c = getCountryById(countryId);
      if (c) depths.set(countryId, countryDishProgress(c, list).percent);
    }
    return depths;
  }, [dishes]);

  // Min-max of the computed scores, used to stretch the color ramp so
  // clustered high scores still grade visibly.
  const matchDomain = useMemo<[number, number] | undefined>(() => {
    if (!flavorMatches || flavorMatches.size === 0) return undefined;
    let min = Infinity;
    let max = -Infinity;
    for (const { score } of flavorMatches.values()) {
      if (score < min) min = score;
      if (score > max) max = score;
    }
    return [min, max];
  }, [flavorMatches]);

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
    <div className="map-container relative w-full rounded-lg overflow-hidden border border-gray-200" style={{ backgroundColor: `${systemColors.seaSalt}` }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}

      {focus && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-lg border px-2.5 py-1.5 shadow-sm"
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}>
          <span className="text-xs font-bold" style={{ color: systemColors.navy }}>{focus.name}</span>
          <button
            onClick={onClearFocus}
            className="text-xs font-bold"
            style={{ color: systemColors.tomato }}
          >
            Whole world
          </button>
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: BASE_SCALE,
          center: [0, 30],
        }}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '2 / 1',
        }}
      >
        <ZoomableGroup
          center={focus ? focus.zoom.center : [0, 30]}
          zoom={focus ? focus.zoom.scale / BASE_SCALE : 1}
        >
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

                const match = alpha2 ? flavorMatches?.get(alpha2) : undefined;
                const fill = flavorMatches
                  ? getFlavorMatchFillColor(match?.score, isHovered, matchDomain)
                  : getCountryFillColor(activityState, isHovered, alpha2 ? exploredDepth.get(alpha2) : undefined);
                // On the flavor-match layer, outline already-logged countries
                // Logged countries get an outline on both layers: ink on the
                // slate flavor layer, deep burnt terracotta on the explored layer
                const isLogged = activityState === 'hasDishes';
                const loggedStroke = flavorMatches ? FLAVOR_MATCH_LOGGED_STROKE : '#7E3A29';
                const stroke = isHovered
                  ? MAP_STROKE.hover
                  : isLogged
                    ? loggedStroke
                    : MAP_STROKE.default;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isHovered || isLogged ? 1 : 0.5}
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

      {tooltipData && (() => {
        const hoveredCountryData = getCountryById(tooltipData.countryId);
        return (
          <MapPreviewCard
            countryId={tooltipData.countryId}
            countryName={tooltipData.countryName}
            country={hoveredCountryData}
            activity={getCountryActivity(tooltipData.countryId)}
            match={flavorMatches?.get(tooltipData.countryId)}
            progress={hoveredCountryData
              ? countryDishProgress(hoveredCountryData, dishes.filter(d => d.countryId === tooltipData.countryId))
              : undefined}
            x={tooltipData.x}
            y={tooltipData.y}
          />
        );
      })()}

      <div className="absolute top-3 left-3 flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-gray-200">
        <button
          onClick={() => setStoredLayer('explored')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
            layer === 'explored' ? '' : 'btn-press'
          }`}
          style={
            layer === 'explored'
              ? { backgroundColor: systemColors.tomato, color: '#fff' }
              : { color: systemColors.navyMuted }
          }
          onMouseEnter={(e) => {
            if (layer !== 'explored') {
              e.currentTarget.style.backgroundColor = `${systemColors.tomato}18`;
              e.currentTarget.style.color = systemColors.tomato;
            }
          }}
          onMouseLeave={(e) => {
            if (layer !== 'explored') {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = systemColors.navyMuted;
            }
          }}
        >
          Explored
        </button>
        <button
          onClick={() => hasEnoughData && setStoredLayer('flavorMatch')}
          disabled={!hasEnoughData}
          title={hasEnoughData ? undefined : 'Log 3 dishes to unlock'}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            layer === 'flavorMatch' ? '' : 'btn-press'
          }`}
          style={
            layer === 'flavorMatch'
              ? { backgroundColor: '#3E5260', color: '#fff' }
              : { color: systemColors.navyMuted }
          }
          onMouseEnter={(e) => {
            if (layer !== 'flavorMatch' && hasEnoughData) {
              e.currentTarget.style.backgroundColor = '#3E526018';
              e.currentTarget.style.color = '#3E5260';
            }
          }}
          onMouseLeave={(e) => {
            if (layer !== 'flavorMatch') {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = systemColors.navyMuted;
            }
          }}
        >
          Flavor Match
        </button>
      </div>

      <MapLegend layer={layer} />
    </div>
  );
});
