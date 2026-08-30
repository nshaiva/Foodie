import { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { geoBounds, geoCentroid, geoContains, geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Geometry } from 'geojson';
import { countries, getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { getAlpha2FromNumeric } from '../data/countryGeoMapping';
import { getShortRegionName, regionCoordinates } from '../data/regionMapConfig';
import { axesByIntensity, FLAVOR_AXIS_META } from '../data/flavorAxisMeta';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import { useCountryActivity } from '../hooks/useCountryActivity';
import { countryDishProgress } from '../utils/dishProgress';
import { groupEntries, regionCounts, type Entry } from '../utils/groupDishes';
import { regionNameFor } from '../utils/dishRegion';
import { getCountryFillColor, MAP_STROKE } from '../components/map/mapUtils';
import { AppBar } from '../components/AppBar';
import { ProfileButton } from '../components/ProfileButton';
import { PlateDot } from '../components/Wordmark';
import { ProgressPlate } from '../components/ProgressPlate';
import { Tray } from '../components/Tray';
import { ProfileSlide } from '../components/country-detail/slides';
import { FoodCultureSection } from '../components/country-detail/FoodCultureSection';
import { DishSection } from '../components/country-detail/DishSection';
import { EntryGrid, type EntryGridActions } from '../components/country-detail/EntryGrid';
import type { Country, RegionalCuisine, RestaurantTry } from '../data/types';

/**
 * /explore — trial of the one-map app (2026-08-30).
 *
 * The map is the whole surface; the panel on the right describes whatever
 * the camera is looking at. Zooming is the primary control: past a threshold
 * the country under the viewport center becomes the scope, past a second
 * threshold the nearest region does. Clicks only fly the camera to the same
 * places. Trial scope: every country zooms and gets a panel; **only China has
 * regions wired**, so the region level can be judged on one country first.
 */

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
const VIEW_W = 800;
const VIEW_H = 500;
const BASE_SCALE = 130;
const WORLD_CENTER: [number, number] = [10, 25];
const COUNTRY_ZOOM = 2.2;   // past this, the country under the center is the scope
const REGION_ZOOM = 4.6;    // past this, the nearest region is the scope
const MAX_ZOOM = 14;
const REGION_TRIAL = new Set(['CN']);

type Scope =
  | { level: 'world' }
  | { level: 'country'; country: Country }
  | { level: 'region'; country: Country; region: RegionalCuisine };

let topologyPromise: Promise<Topology> | null = null;
const loadTopology = () => (topologyPromise ??= fetch(GEO_URL).then(r => r.json()));

// Base projection matching ComposableMap's, used to turn country bounds into a
// zoom level and to know which country sits under the viewport center.
const baseProjection = geoMercator().scale(BASE_SCALE).center(WORLD_CENTER).translate([VIEW_W / 2, VIEW_H / 2]);

function useCountryFeatures(): Map<string, Feature<Geometry>> {
  const [features, setFeatures] = useState<Map<string, Feature<Geometry>>>(new Map());
  useEffect(() => {
    let live = true;
    loadTopology().then(topo => {
      if (!live) return;
      const coll = topo.objects.countries as GeometryCollection;
      const out = new Map<string, Feature<Geometry>>();
      for (const geom of coll.geometries) {
        const alpha2 = getAlpha2FromNumeric(String(geom.id));
        if (alpha2 && getCountryById(alpha2)) out.set(alpha2, feature(topo, geom) as Feature<Geometry>);
      }
      setFeatures(out);
    });
    return () => { live = false; };
  }, []);
  return features;
}

/** Zoom that fits a feature in the viewport with some air around it. */
function fitZoom(feat: Feature<Geometry>): number {
  const [[x0, y0], [x1, y1]] = geoBounds(feat);
  const p0 = baseProjection([x0, y1])!;
  const p1 = baseProjection([x1, y0])!;
  const w = Math.abs(p1[0] - p0[0]);
  const h = Math.abs(p1[1] - p0[1]);
  return Math.max(1.2, Math.min(MAX_ZOOM, 0.7 * Math.min(VIEW_W / w, VIEW_H / h)));
}

export function Explore() {
  const features = useCountryFeatures();
  const { dishes, addDish, updateDish, deleteDish, getDishesByCountry, addRestaurantTry, updateRestaurantTry, deleteRestaurantTry } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();
  const { getActivityState, profiledCountryIds } = useCountryActivity(dishes);

  // Camera. `position` is what ZoomableGroup renders; the map also updates it
  // as the user pans/zooms, so a fly-to is just setting it.
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: WORLD_CENTER, zoom: 1 });
  const [scope, setScope] = useState<Scope>({ level: 'world' });
  const [hovered, setHovered] = useState<string | null>(null);
  const [tray, setTray] = useState<null | 'flavor' | 'culture'>(null);
  const [query, setQuery] = useState('');
  const settle = useRef<number | null>(null);

  /** What the camera is looking at, from its center and zoom. */
  const resolveScope = (coords: [number, number], zoom: number): Scope => {
    if (zoom < COUNTRY_ZOOM) return { level: 'world' };
    let hit: Country | undefined;
    for (const [id, feat] of features) {
      if (geoContains(feat, coords)) { hit = getCountryById(id); break; }
    }
    // Over sea or an unprofiled neighbour: keep the current country if we're
    // still zoomed in, so the panel doesn't flicker while panning across a coast
    const country = hit ?? (scope.level !== 'world' ? scope.country : undefined);
    if (!country) return { level: 'world' };
    if (zoom >= REGION_ZOOM && REGION_TRIAL.has(country.id) && country.regionalVariations?.length) {
      const coordsFor = regionCoordinates[country.id] ?? {};
      let best: RegionalCuisine | undefined; let bestD = Infinity;
      for (const r of country.regionalVariations) {
        const c = coordsFor[r.name]; if (!c) continue;
        const d = Math.hypot(c[0] - coords[0], (c[1] - coords[1]) * 1.3);
        if (d < bestD) { bestD = d; best = r; }
      }
      // Only claim a region when its bubble is reasonably near the center at this zoom
      if (best && bestD < 60 / zoom) return { level: 'region', country, region: best };
    }
    return { level: 'country', country };
  };

  // Live zoom keeps bubbles and strokes a constant size mid-gesture; the
  // camera position and the scope only settle when the gesture ends.
  const [liveZoom, setLiveZoom] = useState(1);
  const onMoveEnd = ({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => {
    setPosition({ coordinates, zoom });
    setLiveZoom(zoom);
    if (settle.current) window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => setScope(resolveScope(coordinates, zoom)), 60);
  };
  const applyCamera = (coordinates: [number, number], zoom: number) => onMoveEnd({ coordinates, zoom });

  const flyToCountry = (id: string) => {
    const feat = features.get(id); const country = getCountryById(id);
    if (!feat || !country) return;
    const zoom = fitZoom(feat);
    const coords = geoCentroid(feat) as [number, number];
    setPosition({ coordinates: coords, zoom }); setLiveZoom(zoom);
    setScope({ level: 'country', country });
  };
  const flyToRegion = (country: Country, region: RegionalCuisine) => {
    const c = regionCoordinates[country.id]?.[region.name]; if (!c) return;
    const zoom = Math.max(position.zoom, 6);
    setPosition({ coordinates: c, zoom }); setLiveZoom(zoom);
    setScope({ level: 'region', country, region });
  };
  const flyToWorld = () => { setPosition({ coordinates: WORLD_CENTER, zoom: 1 }); setLiveZoom(1); setScope({ level: 'world' }); };

  // ---- panel data for the scoped country ----
  const country = scope.level === 'world' ? undefined : scope.country;
  const countryDishes = useMemo(() => (country ? getDishesByCountry(country.id) : []), [country, getDishesByCountry]);
  const entries = useMemo<Entry[]>(() => {
    if (!country) return [];
    const triedByName = new Map(countryDishes.map(d => [d.name.toLowerCase(), d]));
    const triedFor = (name: string, english?: string) => triedByName.get(name.toLowerCase()) ?? (english ? triedByName.get(english.toLowerCase()) : undefined);
    const known = new Set<string>();
    country.popularDishes.forEach(d => { known.add(d.name.toLowerCase()); if (d.englishName) known.add(d.englishName.toLowerCase()); });
    (country.popularBeverages ?? []).forEach(b => { known.add(b.name.toLowerCase()); if (b.englishName) known.add(b.englishName.toLowerCase()); });
    const q = query.trim().toLowerCase();
    const textOk = (...s: (string | undefined)[]) => !q || s.some(x => x?.toLowerCase().includes(q));
    return [
      ...country.popularDishes.filter(d => textOk(d.name, d.englishName, d.description)).map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish, tried: triedFor(dish.name, dish.englishName) })),
      ...(country.popularBeverages ?? []).filter(b => textOk(b.name, b.englishName, b.description)).map<Entry>(drink => ({ kind: 'drink', key: `b:${drink.name}`, drink, tried: triedFor(drink.name, drink.englishName) })),
      ...countryDishes.filter(ud => !known.has(ud.name.toLowerCase()) && textOk(ud.name)).map<Entry>(userDish => ({ kind: 'custom', key: `c:${userDish.id}`, userDish })),
    ];
  }, [country, countryDishes, query]);
  const regions = country?.regionalVariations;
  const groups = useMemo(() => (country ? groupEntries(entries, regions?.length ? 'region' : 'category', { regions, countryId: country.id, countryName: country.name }) : []), [country, entries, regions]);
  const counts = useMemo(() => (country ? regionCounts(entries, regions, country.id) : {}), [country, entries, regions]);

  const actions: EntryGridActions | null = country ? {
    countryId: country.id,
    onAddDish: ({ name, kind }) => addDish({ countryId: country.id, name, kind, restaurantTries: [] }),
    onUpdateDish: updateDish, onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry, onUpdateRestaurantTry: updateRestaurantTry, onDeleteRestaurantTry: deleteRestaurantTry,
    isOnWishlist, isFavorite, addToWishlist, removeFromWishlist, findWishlistItem, addToFavorites, removeFromFavorites, findFavoriteItem,
  } : null;
  const regionLabelFor = (entry: Entry) => {
    if (!country || scope.level === 'region') return undefined;
    if (entry.kind === 'custom') return entry.userDish.region;
    return regionNameFor(entry.kind === 'dish' ? entry.dish : entry.drink, regions, country.id);
  };

  const colors = country?.colorPalette;
  const showRegionBubbles = country && REGION_TRIAL.has(country.id) && liveZoom >= COUNTRY_ZOOM;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar actions={<>
        {country && (
          <span className="flex gap-2">
            <button onClick={() => setTray('flavor')} className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3 py-1.5" style={{ borderColor: `${colors!.primary}40`, color: colors!.primary, backgroundColor: systemColors.surface }}>✦ Flavor fingerprint</button>
            <button onClick={() => setTray('culture')} className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3 py-1.5" style={{ borderColor: `${colors!.primary}40`, color: colors!.primary, backgroundColor: systemColors.surface }}>📖 Food culture</button>
          </span>
        )}
        <ProfileButton />
      </>} />

      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: '62% 38%' }}>
        {/* ---------------- map ---------------- */}
        <div className="relative min-h-0" style={{ backgroundColor: systemColors.seaSalt }}>
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm" style={{ backgroundColor: `${systemColors.surface}E6`, borderColor: systemColors.border }}>
            <button onClick={flyToWorld} className="font-semibold" style={{ color: scope.level === 'world' ? systemColors.navy : systemColors.navyMuted }}>World</button>
            {scope.level !== 'world' && <>
              <span style={{ color: systemColors.navyMuted }}>›</span>
              <button onClick={() => flyToCountry(scope.country.id)} className="font-semibold" style={{ color: scope.level === 'country' ? systemColors.navy : systemColors.navyMuted }}>{scope.country.name}</button>
            </>}
            {scope.level === 'region' && <>
              <span style={{ color: systemColors.navyMuted }}>›</span>
              <span className="font-semibold" style={{ color: systemColors.navy }}>{getShortRegionName(scope.region.name)}</span>
            </>}
          </div>
          <div className="absolute bottom-3 left-3 z-10 rounded-lg border px-2.5 py-1.5 text-xs" style={{ backgroundColor: `${systemColors.surface}E6`, borderColor: systemColors.border, color: systemColors.navyMuted }}>
            {scope.level === 'world' ? 'Pinch or scroll to zoom into a cuisine · click to fly there' : scope.level === 'country' ? (REGION_TRIAL.has(scope.country.id) ? 'Keep zooming toward a region' : 'Regions on this country come in the full build') : 'Zoom out for all of ' + scope.country.name}
          </div>
          <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1">
            <button onClick={() => applyCamera(position.coordinates, Math.min(MAX_ZOOM, position.zoom * 1.6))} className="w-8 h-8 rounded-md border font-bold" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }}>+</button>
            <button onClick={() => applyCamera(position.coordinates, Math.max(1, position.zoom / 1.6))} className="w-8 h-8 rounded-md border font-bold" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }}>−</button>
          </div>

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: BASE_SCALE, center: WORLD_CENTER }} width={VIEW_W} height={VIEW_H} style={{ width: '100%', height: '100%' }}>
            <ZoomableGroup
              center={position.coordinates}
              zoom={position.zoom}
              minZoom={1}
              maxZoom={MAX_ZOOM}
              onMove={({ zoom }) => setLiveZoom(zoom)}
              onMoveEnd={onMoveEnd}
              filterZoomEvent={((e: { button?: number }) => !e.button) as unknown as (el: SVGElement) => boolean}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) => geographies.map(geo => {
                  const alpha2 = getAlpha2FromNumeric(geo.id as string);
                  const profiled = alpha2 ? profiledCountryIds.has(alpha2) : false;
                  const isHovered = hovered === alpha2;
                  const isScoped = !!alpha2 && scope.level !== 'world' && scope.country.id === alpha2;
                  const state = alpha2 ? getActivityState(alpha2) : 'noProfile';
                  const fill = isScoped && colors ? `${colors.primary}33` : getCountryFillColor(state, isHovered);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={isScoped && colors ? colors.primary : isHovered ? MAP_STROKE.hover : MAP_STROKE.default}
                      strokeWidth={(isScoped ? 1.2 : 0.5) / liveZoom}
                      style={{ default: { outline: 'none', transition: 'fill 150ms' }, hover: { outline: 'none', cursor: profiled ? 'pointer' : 'grab' }, pressed: { outline: 'none' } }}
                      onMouseEnter={() => setHovered(alpha2 ?? null)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => { if (alpha2 && profiled) flyToCountry(alpha2); }}
                    />
                  );
                })}
              </Geographies>

              {/* Country plates at world level */}
              {liveZoom < COUNTRY_ZOOM && countries.map(c => {
                const feat = features.get(c.id); if (!feat) return null;
                const progress = countryDishProgress(c, dishes.filter(d => d.countryId === c.id));
                if (progress.percent <= 0) return null;
                return (
                  <Marker key={c.id} coordinates={geoCentroid(feat) as [number, number]}>
                    <g transform={`scale(${1 / liveZoom})`} style={{ pointerEvents: 'none' }}>
                      <circle r={7} fill={c.colorPalette.primary} stroke="#fff" strokeWidth={1.5} />
                      <circle r={3} fill="#fff" opacity={0.9} />
                    </g>
                  </Marker>
                );
              })}

              {/* Region bubbles (trial: China only) */}
              {showRegionBubbles && country!.regionalVariations!.map(r => {
                const c = regionCoordinates[country!.id]?.[r.name]; if (!c) return null;
                const sel = scope.level === 'region' && scope.region.name === r.name;
                const dim = scope.level === 'region' && !sel;
                const n = counts[r.name] ?? 0;
                return (
                  <Marker key={r.name} coordinates={c}>
                    <g transform={`scale(${1 / liveZoom})`} onClick={e => { e.stopPropagation(); flyToRegion(country!, r); }} style={{ cursor: 'pointer', opacity: dim ? 0.45 : 1, transition: 'opacity 200ms' }}>
                      <circle r={sel ? 44 : 40} fill={sel ? colors!.primary : `${colors!.primary}CC`} stroke={sel ? systemColors.saffron : '#fff'} strokeWidth={sel ? 3 : 2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                      <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={16} fontWeight={700} dy={-7} style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{getShortRegionName(r.name)}</text>
                      <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={12} dy={13} style={{ pointerEvents: 'none', opacity: 0.85 }}>{n} {n === 1 ? 'dish' : 'dishes'}</text>
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* ---------------- panel ---------------- */}
        <div className="min-h-0 overflow-y-auto border-l p-5" style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}>
          {scope.level === 'world' && (
            <>
              <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>31 cuisines</h2>
              <p className="text-sm mb-4" style={{ color: systemColors.navyMuted }}>Zoom into one, or pick from the list.</p>
              <div className="space-y-1.5">
                {[...countries].sort((a, b) => a.name.localeCompare(b.name)).map(c => {
                  const progress = countryDishProgress(c, dishes.filter(d => d.countryId === c.id));
                  return (
                    <button key={c.id} onClick={() => flyToCountry(c.id)} className="w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left btn-press" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}>
                      {progress.percent > 0 ? <ProgressPlate percent={progress.percent} size={18} color={c.colorPalette.primary} title={`${progress.tried} of ${progress.total} dishes tried`} /> : <PlateDot color={c.colorPalette.primary} size={14} />}
                      <span className="text-sm font-semibold" style={{ color: systemColors.navy }}>{c.name}</span>
                      <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>{c.region}{REGION_TRIAL.has(c.id) ? ' · regions ✓' : ''}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {scope.level !== 'world' && country && colors && actions && (
            <>
              <div className="flex items-center gap-2.5">
                <PlateDot color={colors.primary} size={14} />
                <h2 className="text-xl font-bold" style={{ color: systemColors.navy }}>{country.name}</h2>
                <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>{country.capital}</span>
              </div>
              {scope.level === 'country' && (
                <>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: systemColors.navy }}>{country.cuisineProfile.summary}</p>
                  {country.cuisineProfile.flavorIntensity && (
                    <div className="flex gap-1 mt-2">
                      {axesByIntensity(country.cuisineProfile.flavorIntensity).slice(0, 3).map(({ axis }) => (
                        <span key={axis} className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }}>{FLAVOR_AXIS_META[axis].label}</span>
                      ))}
                    </div>
                  )}
                </>
              )}
              <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${country.name}'s dishes…`} className="w-full text-sm px-3 py-2 rounded-lg border mt-3 mb-3" style={{ borderColor: systemColors.border, color: systemColors.navy, backgroundColor: systemColors.surface }} />

              {scope.level === 'country' && (
                <div className="space-y-5">
                  {groups.map(group => (
                    <DishSection key={group.id} group={group} focused={false} onFocus={() => group.region && flyToRegion(country, group.region)} onClearFocus={() => {}} colors={colors} tiers={country.cuisineProfile.ingredientTiers}>
                      <div className="[&>div]:grid-cols-1">
                        <EntryGrid entries={group.entries} actions={actions} regionLabelFor={regionLabelFor} />
                      </div>
                    </DishSection>
                  ))}
                </div>
              )}

              {scope.level === 'region' && (() => {
                const group = groups.find(g => g.region?.name === scope.region.name) ?? { id: 'r', label: scope.region.name, region: scope.region, entries: [] as Entry[] };
                return (
                  <DishSection group={group} focused onFocus={() => {}} onClearFocus={() => flyToCountry(country.id)} colors={colors} tiers={country.cuisineProfile.ingredientTiers}>
                    <div className="[&>div]:grid-cols-1">
                      <EntryGrid entries={group.entries} actions={actions} regionLabelFor={regionLabelFor} />
                    </div>
                  </DishSection>
                );
              })()}
            </>
          )}
        </div>
      </div>

      {country && colors && (
        <>
          <Tray open={tray === 'flavor'} onClose={() => setTray(null)} title={`${country.name}’s flavor fingerprint`}>
            <ProfileSlide country={country} colors={colors} stacked />
          </Tray>
          <Tray open={tray === 'culture'} onClose={() => setTray(null)} title={`Food culture in ${country.name}`}>
            <FoodCultureSection country={country} colors={colors} />
          </Tray>
        </>
      )}
    </div>
  );
}

// Keep the type import used (RestaurantTry appears in EntryGridActions' contract)
export type { RestaurantTry as _ExploreRestaurantTry };
