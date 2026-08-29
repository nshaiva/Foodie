import { memo, useEffect, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, type ProjectionFunction } from 'react-simple-maps';
import { geoCentroid, geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Geometry } from 'geojson';
import type { ColorPalette, RegionalCuisine } from '../../data/types';
import { alpha2ToNumeric, getShortRegionName, regionCoordinates } from '../../data/regionMapConfig';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

// ComposableMap's default viewBox; the projection is fitted to it and the SVG
// then scales to whatever box the page gives it.
const VIEW_W = 800;
const VIEW_H = 600;
const PAD = 48;

// One fetch for the whole session, shared with whichever country page asks.
let topologyPromise: Promise<Topology> | null = null;
function loadTopology(): Promise<Topology> {
  topologyPromise ??= fetch(GEO_URL).then(r => r.json());
  return topologyPromise;
}

/** The country's outline as GeoJSON, or null while loading / if unknown. */
function useCountryFeature(numericId: string | undefined): Feature<Geometry> | null {
  const [feat, setFeat] = useState<Feature<Geometry> | null>(null);
  useEffect(() => {
    let live = true;
    if (!numericId) return;
    loadTopology().then(topo => {
      if (!live) return;
      const countries = topo.objects.countries as GeometryCollection;
      const geom = countries.geometries.find(g => String(g.id) === numericId);
      setFeat(geom ? (feature(topo, geom) as Feature<Geometry>) : null);
    });
    return () => { live = false; };
  }, [numericId]);
  return feat;
}

/**
 * The per-country region map: bubbles you tap to focus a region.
 *
 * Controlled — selection lives in the parent. The outline is fitted to the frame
 * automatically; countries missing from `regionCoordinates` (no bubble
 * positions) get a button grid instead of a map, so this renders for every
 * country either way.
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
  const coordinates = regionCoordinates[countryId];
  const countryFeature = useCountryFeature(numericId);
  const [zoom, setZoom] = useState(1);

  // Fit the outline to the frame, whatever the country's size or shape: Jamaica
  // and Russia both fill it. This replaces hand-tuned per-country center/scale
  // numbers, which were tuned for one box height and drifted when it changed.
  const projection = useMemo(() => {
    if (!countryFeature) return null;
    // react-simple-maps uses a function prop as the projection itself
    return geoMercator().fitExtent([[PAD, PAD], [VIEW_W - PAD, VIEW_H - PAD]], countryFeature) as unknown as ProjectionFunction;
  }, [countryFeature]);
  const center = useMemo<[number, number]>(
    () => (countryFeature ? (geoCentroid(countryFeature) as [number, number]) : [0, 0]),
    [countryFeature]
  );

  // If we can't place this country's regions, fall back to simple grid
  if (!numericId || !coordinates) {
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

  if (!projection) {
    return (
      <div
        className="rounded-xl h-full"
        style={{ backgroundColor: colors.background, border: `1px solid ${colors.primary}30` }}
        aria-busy="true"
      />
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden h-full cursor-pointer"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.primary}30`,
        touchAction: 'none',
      }}
      onClick={() => onSelectRegion(null)}
    >
      <ComposableMap
        projection={projection}
        width={VIEW_W}
        height={VIEW_H}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ZoomableGroup
          center={center}
          zoom={1}
          minZoom={1}
          maxZoom={6}
          onMove={({ zoom: z }) => setZoom(z)}
          // The default filter drops ctrlKey wheel events, which is what a
          // trackpad pinch sends — so pinch never reached the map. Only ignore
          // non-primary mouse buttons.
          filterZoomEvent={((e: { button?: number }) => !e.button) as unknown as (el: SVGElement) => boolean}
        >
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
              {/* Counter-scale so a bubble stays bubble-sized however far you zoom */}
              <g
                transform={`scale(${1 / zoom})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRegion(isSelected ? null : region.name);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isSelected ? 44 : 40}
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
                  fontSize={16}
                  fontWeight={700}
                  letterSpacing={0.3}
                  style={{
                    pointerEvents: 'none',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  }}
                  dy={counts ? -7 : 0}
                >
                  {shortName}
                </text>
                {counts ? (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={12}
                    dy={13}
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

      {/* Hint text when no region selected */}
      {!selectedRegion && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
          Tap a region · pinch or scroll to zoom
        </p>
      )}
    </div>
  );
});
