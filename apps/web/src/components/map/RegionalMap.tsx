import { memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import type { ColorPalette, RegionalCuisine } from '../../data/types';
import {
  alpha2ToNumeric,
  countryMapConfig,
  getShortRegionName,
  regionCoordinates,
} from '../../data/regionMapConfig';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

/**
 * The per-country region map: bubbles you tap to focus a region.
 *
 * Controlled — selection lives in the parent. Countries missing from
 * `countryMapConfig` / `regionCoordinates` get a button grid instead of a map,
 * so this renders for every country either way.
 *
 * `counts` is optional; when supplied, a region with no dishes is muted and
 * labelled, so an empty bubble reads as a content gap rather than a bug.
 */
export const RegionalMap = memo(function RegionalMap({
  countryId,
  regions,
  colors,
  selectedRegion,
  onSelectRegion,
  counts,
}: {
  countryId: string;
  regions: RegionalCuisine[];
  colors: ColorPalette;
  counts?: Record<string, number>;
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
}) {
  const numericId = alpha2ToNumeric[countryId];
  const mapConfig = countryMapConfig[countryId];
  const coordinates = regionCoordinates[countryId];

  // If no map config exists, fall back to simple grid
  if (!mapConfig || !coordinates) {
    return (
      <div className="grid grid-cols-2 gap-3 h-full">
        {regions.map((region) => (
          <button
            key={region.name}
            onClick={() =>
              onSelectRegion(selectedRegion === region.name ? null : region.name)
            }
            className="p-3 rounded-lg text-sm font-medium text-center transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor:
                selectedRegion === region.name ? colors.primary : `${colors.primary}15`,
              color: selectedRegion === region.name ? '#fff' : colors.primary,
              boxShadow:
                selectedRegion === region.name
                  ? `0 0 0 2px white, 0 0 0 4px ${colors.secondary}`
                  : undefined,
            }}
          >
            {getShortRegionName(region.name)}
            {counts ? (
              <span className="block text-xs font-normal opacity-70">
                {counts[region.name] ?? 0} {(counts[region.name] ?? 0) === 1 ? 'dish' : 'dishes'}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden h-full cursor-pointer"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.primary}30`,
      }}
      onClick={() => onSelectRegion(null)}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: mapConfig.center,
          scale: mapConfig.scale,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ZoomableGroup center={mapConfig.center} zoom={1} minZoom={1} maxZoom={6}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === numericId)
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={`${colors.primary}20`}
                  stroke={colors.primary}
                  strokeWidth={1.5}
                  onClick={() => onSelectRegion(null)}
                  style={{
                    default: { outline: 'none', cursor: 'pointer' },
                    hover: { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none', cursor: 'pointer' },
                  }}
                />
              ))
          }
        </Geographies>

        {/* Region markers */}
        {regions.map((region) => {
          const coords = coordinates[region.name];
          if (!coords) return null;

          const isSelected = selectedRegion === region.name;
          const shortName = getShortRegionName(region.name);
          const count = counts?.[region.name];
          const isEmpty = counts !== undefined && !count;

          return (
            <Marker key={region.name} coordinates={coords}>
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRegion(isSelected ? null : region.name);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isSelected ? 30 : 26}
                  fill={isSelected ? colors.primary : isEmpty ? `${colors.primary}45` : `${colors.primary}95`}
                  stroke={isSelected ? colors.secondary : 'white'}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{
                    transition: 'all 150ms ease-out',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={11}
                  fontWeight={700}
                  letterSpacing={0.5}
                  style={{
                    pointerEvents: 'none',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  }}
                  dy={counts ? -5 : 0}
                >
                  {shortName}
                </text>
                {counts ? (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={9}
                    dy={9}
                    style={{ pointerEvents: 'none', opacity: 0.85 }}
                  >
                    {count ?? 0} {(count ?? 0) === 1 ? 'dish' : 'dishes'}
                  </text>
                ) : null}
              </g>
            </Marker>
          );
        })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Label showing current selection */}
      <div
        className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-medium"
        style={{
          backgroundColor: selectedRegion ? colors.primary : 'white',
          color: selectedRegion ? 'white' : colors.text,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {selectedRegion ? getShortRegionName(selectedRegion) : 'Overview'}
      </div>

      {/* Hint text when no region selected */}
      {!selectedRegion && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
          Tap a region · pinch or scroll to zoom
        </p>
      )}
    </div>
  );
});
