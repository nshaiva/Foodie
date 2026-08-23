import { memo, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { getAlpha2FromNumeric } from '../../data/countryGeoMapping';
import { getCountryById } from '../../data/countries';
import { CULINARY_REGIONS, REGION_BY_COUNTRY, getRegion } from '../../data/culinaryRegions';
import { useDishes } from '../../hooks/useDishes';
import { useCountryActivity } from '../../hooks/useCountryActivity';
import { countryDishProgress } from '../../utils/dishProgress';
import { getCountryFillColor, MAP_STROKE } from './mapUtils';
import { countryMapConfig } from '../../data/regionMapConfig';
import { systemColors } from '../../data/systemColors';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
const WORLD = { center: [10, 18] as [number, number], scale: 105 };

/** Countries we hold no profile for: present, but clearly not the subject. */
const OUTSIDE = '#EFEAE0';

/**
 * The phone's map: eight culinary regions, tap one to zoom into it.
 *
 * The world map (`WorldMap`) is desktop-only for two reasons, and this fixes
 * both. Thirty-one countries at 390px are a few pixels each, so the top level
 * here is regions rather than countries. And its preview card is driven by
 * `onMouseEnter`, which a phone has no equivalent for — so tapping a country
 * *previews* it and only the button in the preview navigates. First tap tells
 * you what's there, second tap commits.
 *
 * Regions come from `data/culinaryRegions.ts`, grouped by flavor rather than
 * by landmass; the reasoning is in `docs/roadmap/designs/flavor-geography.md`.
 */
export const RegionMap = memo(function RegionMap() {
  const navigate = useNavigate();
  const { dishes } = useDishes();
  const { getActivityState } = useCountryActivity(dishes);
  const [regionId, setRegionId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const region = regionId ? getRegion(regionId) : null;
  const view = region ? region.zoom : WORLD;

  const depth = useMemo(() => {
    const out: Record<string, number> = {};
    CULINARY_REGIONS.flatMap(r => r.countryIds).forEach(id => {
      const c = getCountryById(id);
      if (c) out[id] = countryDishProgress(c, dishes.filter(d => d.countryId === id)).percent;
    });
    return out;
  }, [dishes]);

  const preview = previewId ? getCountryById(previewId) : null;

  const select = (id: string | null) => {
    setRegionId(id);
    setPreviewId(null);
  };

  return (
    <div
      className="relative rounded-xl border overflow-hidden"
      style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: systemColors.border }}
      >
        {region && (
          <button
            onClick={() => select(null)}
            className="text-xs font-bold"
            style={{ color: systemColors.tomato }}
          >
            ← All regions
          </button>
        )}
        <span className="text-sm font-bold" style={{ color: systemColors.navy }}>
          {region ? region.name : 'Explore by region'}
        </span>
        <span className="ml-auto text-xs" style={{ color: systemColors.navyMuted }}>
          {region ? `${region.countryIds.length} cuisines` : '8 regions'}
        </span>
      </div>

      <div className="h-[22rem]" style={{ backgroundColor: systemColors.seaSalt }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: view.center, scale: view.scale }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const id = getAlpha2FromNumeric(geo.id as string);
                const inData = id ? REGION_BY_COUNTRY[id] : undefined;
                const focused = !!inData && (!region || inData === regionId);
                let fill = OUTSIDE;
                if (focused && id) {
                  fill = region
                    ? getCountryFillColor(getActivityState(id), previewId === id, depth[id])
                    : systemColors.herbLight;
                } else if (inData) {
                  fill = systemColors.border;
                }
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={MAP_STROKE.default}
                    strokeWidth={0.4}
                    onClick={() => {
                      if (!id || !inData) return;
                      if (!region) select(inData);
                      else setPreviewId(prev => (prev === id ? null : id));
                    }}
                    style={{
                      default: { outline: 'none', cursor: inData ? 'pointer' : 'default' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {!region &&
            CULINARY_REGIONS.map(r => (
              <Marker key={r.id} coordinates={r.labelAt}>
                <g onClick={() => select(r.id)} style={{ cursor: 'pointer' }}>
                  <text
                    textAnchor="middle"
                    y={-2}
                    style={{ fontSize: 9, fontWeight: 800, fill: systemColors.navy, paintOrder: 'stroke' }}
                    stroke={systemColors.seaSalt}
                    strokeWidth={3}
                  >
                    {r.name}
                  </text>
                  <text
                    textAnchor="middle"
                    y={8}
                    style={{ fontSize: 7.5, fontWeight: 600, fill: systemColors.navyMuted, paintOrder: 'stroke' }}
                    stroke={systemColors.seaSalt}
                    strokeWidth={3}
                  >
                    {r.countryIds.length} cuisines
                  </text>
                </g>
              </Marker>
            ))}

          {region &&
            region.countryIds.map(id => {
              const c = getCountryById(id);
              // countryMapConfig already holds a hand-checked center per country,
              // used by the per-country region map; reused rather than duplicated.
              const at = countryMapConfig[id]?.center;
              if (!c || !at) return null;
              return (
                <Marker key={id} coordinates={at}>
                  <g onClick={() => setPreviewId(prev => (prev === id ? null : id))} style={{ cursor: 'pointer' }}>
                    <circle r={5} fill={systemColors.tomato} stroke="#fff" strokeWidth={1.5} />
                    <text
                      textAnchor="middle"
                      y={-9}
                      style={{ fontSize: 8.5, fontWeight: 700, fill: systemColors.navy, paintOrder: 'stroke' }}
                      stroke={systemColors.seaSalt}
                      strokeWidth={3}
                    >
                      {c.name}
                    </text>
                  </g>
                </Marker>
              );
            })}
        </ComposableMap>
      </div>

      {/* Touch's answer to hover: tap previews, the button commits. */}
      {preview && (
        <div
          className="flex items-center gap-3 px-3 py-2.5 border-t"
          style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
        >
          <div className="min-w-0">
            <p className="text-sm font-bold truncate" style={{ color: systemColors.navy }}>
              {preview.name}
            </p>
            <p className="text-xs" style={{ color: systemColors.navyMuted }}>
              {depth[preview.id]
                ? `${depth[preview.id]}% of the popular dishes tried`
                : 'Nothing logged here yet'}
            </p>
          </div>
          <button
            onClick={() => navigate(`/country/${preview.id}`)}
            className="ml-auto btn-press text-xs font-bold text-white px-3 py-1.5 rounded-lg flex-none"
            style={{ backgroundColor: systemColors.tomato }}
          >
            Open →
          </button>
        </div>
      )}
    </div>
  );
});
