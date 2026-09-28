import { memo, useEffect, useMemo, useState } from 'react';
import { homeLand, labelsFitAt, regionAreas, regionLabelName, REGION_BORDER, REGION_INK, REGION_TINT } from '../../utils/regionAreas';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, type ProjectionFunction } from 'react-simple-maps';
import { geoCentroid, geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Geometry } from 'geojson';
import type { ColorPalette, RegionalCuisine } from '../../data/types';
import { alpha2ToNumeric, getShortRegionName, regionCoordinates } from '../../data/regionMapConfig';

// 50m rather than 110m: region cells are clipped to the coastline, and the
// coarse outline turns small countries into a handful of straight lines.
// Same file /explore loads, so the browser fetches it once.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json';

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
 * The per-country region map, drawn like a wine map: dashed borders split
 * the country into regions (`utils/regionAreas.ts`), each name lettered
 * inside its area, and the whole area is the tap target.
 *
 * Controlled — selection lives in the parent. The outline is fitted to the
 * frame automatically; countries missing from `regionCoordinates` (no region
 * centres) get a button grid instead of a map, so this renders for every
 * country either way.
 *
 * `counts` is optional; when supplied, a region's dish count is lettered
 * under its name and an empty region's name is muted, so a content gap
 * reads as a gap rather than a bug.
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
  const [hovered, setHovered] = useState<string | null>(null);

  // Fit the outline to the frame, whatever the country's size or shape: Jamaica
  // and Russia both fill it. This replaces hand-tuned per-country center/scale
  // numbers, which were tuned for one box height and drifted when it changed.
  // Frame the land the regions are on (the lower 48, not Alaska); the far
  // territories still draw, just outside the opening frame.
  const projection = useMemo(() => {
    if (!countryFeature) return null;
    return geoMercator().fitExtent([[PAD, PAD], [VIEW_W - PAD, VIEW_H - PAD]], homeLand(countryId, countryFeature, geoMercator()));
  }, [countryFeature, countryId]);
  const center = useMemo<[number, number]>(
    () => (countryFeature && projection ? (geoCentroid(homeLand(countryId, countryFeature, projection)) as [number, number]) : [0, 0]),
    [countryFeature, projection, countryId]
  );
  const areas = useMemo(
    () => (countryFeature && projection ? regionAreas(countryId, regions, countryFeature, projection) : null),
    [countryFeature, projection, countryId, regions]
  );
  const labelsVisible = useMemo(
    () => !!areas && labelsFitAt(areas, zoom, counts ?? {}, 1.5),
    [areas, zoom, counts]
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
        projection={projection as unknown as ProjectionFunction}
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

        {/* The wine map: region cells, dashed borders, lettered names */}
        {areas && (
          <g>
            <defs><clipPath id={`region-clip-${countryId}`}><path d={areas.outline} /></clipPath></defs>
            <g clipPath={`url(#region-clip-${countryId})`}>
              {areas.areas.map(({ region, cell }) => {
                const isSelected = selectedRegion === region.name;
                return (
                  <path
                    key={region.name}
                    d={cell}
                    fill={isSelected ? REGION_TINT : 'transparent'}
                    fillOpacity={isSelected ? 0.12 : 1}
                    stroke={isSelected || hovered === region.name ? REGION_INK : 'none'}
                    strokeWidth={(isSelected ? 1.8 : 1.3) / zoom}
                    style={{ cursor: 'pointer', transition: 'fill-opacity 200ms' }}
                    onMouseEnter={() => setHovered(region.name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={(e) => { e.stopPropagation(); onSelectRegion(isSelected ? null : region.name); }}
                  />
                );
              })}
              <path d={areas.borders} fill="none" stroke={REGION_BORDER} strokeWidth={1 / zoom} strokeDasharray={`${3 / zoom} ${3 / zoom}`} style={{ pointerEvents: 'none' }} />
            </g>
            {areas.areas.map(({ region, anchor }) => {
              const isSelected = selectedRegion === region.name;
              const dim = !!selectedRegion && !isSelected;
              const count = counts?.[region.name] ?? 0;
              const isEmpty = counts !== undefined && count === 0;
              return (
                <Marker key={region.name} coordinates={anchor} style={{ default: { pointerEvents: 'none' }, hover: { pointerEvents: 'none' }, pressed: { pointerEvents: 'none' } }}>
                  {/* Counter-scale so the lettering stays the same size however far you zoom */}
                  <g transform={`scale(${1 / zoom})`} opacity={labelsVisible ? (dim ? 0.5 : 1) : 0} style={{ pointerEvents: 'none', transition: 'opacity 180ms' }}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      y={count > 0 ? -9 : 0}
                      fill={isEmpty ? REGION_BORDER : REGION_INK}
                      fontSize={isSelected ? 25 : 22}
                      fontStyle="italic"
                      fontWeight={500}
                      stroke={colors.background}
                      strokeWidth={3}
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      style={{ fontFamily: 'var(--font-brand)' }}
                    >
                      {regionLabelName(region.name)}
                    </text>
                    {count > 0 && (
                      <text textAnchor="middle" dominantBaseline="central" y={16} fill="#6F6A60" fontSize={12.5} letterSpacing="0.12em" stroke={colors.background} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke">
                        {count} {count === 1 ? 'DISH' : 'DISHES'}
                      </text>
                    )}
                  </g>
                </Marker>
              );
            })}
          </g>
        )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hint text when no region selected */}
      {!selectedRegion && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
          Tap a region to open it · pinch or scroll to zoom
        </p>
      )}
    </div>
  );
});
