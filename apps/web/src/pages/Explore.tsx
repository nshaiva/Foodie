import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { useDishFilters } from '../hooks/useDishFilters';
import { useCountryActivity } from '../hooks/useCountryActivity';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { countryDishProgress } from '../utils/dishProgress';
import { groupEntries, regionCounts, type Entry, type Lens } from '../utils/groupDishes';
import { regionFromSlug, regionNameFor, regionSlug } from '../utils/dishRegion';
import { getCountryFillColor, getFlavorMatchFillColor, FLAVOR_MATCH_LOGGED_STROKE, MAP_STROKE, type MapLayer } from '../components/map/mapUtils';
import { computeAllFlavorMatches } from '../components/map/flavorMatch';
import { MapPreviewCard } from '../components/map/MapPreviewCard';
import { AppBar } from '../components/AppBar';
import { ProfileButton } from '../components/ProfileButton';
import { PlateDot } from '../components/Wordmark';
import { ProgressPlate } from '../components/ProgressPlate';
import { Tray } from '../components/Tray';
import { ProfileSlide } from '../components/country-detail/slides';
import { FoodCultureSection } from '../components/country-detail/FoodCultureSection';
import { DishSection } from '../components/country-detail/DishSection';
import { LensControls } from '../components/country-detail/LensControls';
import { EntryGrid, type EntryGridActions } from '../components/country-detail/EntryGrid';
import { ExpandableText } from '../components/ExpandableText';
import type { Country, RegionalCuisine } from '../data/types';

/**
 * /explore — the one-map app.
 *
 * The map is the surface; the panel on the right describes whatever the
 * camera is looking at. **Zoom is the control.** Past COUNTRY_IN the country
 * under the pointer (or the viewport center, when flying) becomes the scope
 * and its regions rise out of the map; past REGION_IN the nearest region
 * takes over. Zooming out unwinds it with a little hysteresis so the panel
 * never flickers at a threshold. Clicks, the breadcrumb, Esc and the +/−
 * buttons all just fly the same camera. The URL carries the scope so a
 * refresh or a shared link lands where you were.
 */

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
const VIEW_W = 800;
const VIEW_H = 500;
const BASE_SCALE = 130;
const WORLD_CENTER: [number, number] = [10, 25];
const COUNTRY_IN = 2.2, COUNTRY_OUT = 1.8;   // enter / leave the country level
const REGION_IN = 4.6, REGION_OUT = 3.8;     // enter / leave the region level
const MAX_ZOOM = 220;  // Jamaica needs ~140× to fill the frame
const FLY_MS = 700;

type Scope =
  | { level: 'world' }
  | { level: 'country'; country: Country }
  | { level: 'region'; country: Country; region: RegionalCuisine };
type Camera = { coordinates: [number, number]; zoom: number };

let topologyPromise: Promise<Topology> | null = null;
const loadTopology = () => (topologyPromise ??= fetch(GEO_URL).then(r => r.json()));

// Base projection matching ComposableMap's: turns country bounds into a zoom
// level, and screen points back into lon/lat.
const baseProjection = geoMercator().scale(BASE_SCALE).center(WORLD_CENTER).translate([VIEW_W / 2, VIEW_H / 2]);

const hasRegionMap = (c: Country) => !!regionCoordinates[c.id] && !!c.regionalVariations?.length;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

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

/**
 * Camera that frames a country. When the country has region bubbles, frame
 * those (with air) rather than the raw outline: the outline of the United
 * States includes Alaska and Hawaii, which would push the mainland, where all
 * the food is, into a corner.
 */
function frameCountry(country: Country, feat: Feature<Geometry>): Camera {
  const pts = Object.values(regionCoordinates[country.id] ?? {});
  let x0: number, y0: number, x1: number, y1: number;
  if (pts.length >= 2) {
    x0 = Math.min(...pts.map(p => p[0])); x1 = Math.max(...pts.map(p => p[0]));
    y0 = Math.min(...pts.map(p => p[1])); y1 = Math.max(...pts.map(p => p[1]));
    const padX = Math.max(3, (x1 - x0) * 0.45), padY = Math.max(2, (y1 - y0) * 0.45);
    x0 -= padX; x1 += padX; y0 -= padY; y1 += padY;
  } else {
    [[x0, y0], [x1, y1]] = geoBounds(feat);
  }
  const p0 = baseProjection([x0, y1])!, p1 = baseProjection([x1, y0])!;
  const w = Math.abs(p1[0] - p0[0]), h = Math.abs(p1[1] - p0[1]);
  const zoom = Math.max(COUNTRY_IN + 0.3, Math.min(MAX_ZOOM, 0.8 * Math.min(VIEW_W / w, VIEW_H / h)));
  const center = pts.length >= 2 ? ([(x0 + x1) / 2, (y0 + y1) / 2] as [number, number]) : (geoCentroid(feat) as [number, number]);
  return { coordinates: center, zoom };
}

export function Explore() {
  const features = useCountryFeatures();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishes, addDish, updateDish, deleteDish, getDishesByCountry, addRestaurantTry, updateRestaurantTry, deleteRestaurantTry } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();
  const { getActivityState, getCountryActivity, profiledCountryIds } = useCountryActivity(dishes);
  const { personalFlavor, hasEnoughData } = usePersonalFlavorProfile();
  const [storedLayer, setStoredLayer] = useLocalStorage<MapLayer>('foodie-map-layer', 'explored');
  const layer: MapLayer = hasEnoughData ? storedLayer : 'explored';
  const flavorMatches = useMemo(
    () => (layer === 'flavorMatch' && personalFlavor ? computeAllFlavorMatches(personalFlavor) : null),
    [layer, personalFlavor]
  );
  const matchDomain = useMemo<[number, number] | undefined>(() => {
    if (!flavorMatches?.size) return undefined;
    let min = Infinity, max = -Infinity;
    for (const { score } of flavorMatches.values()) { min = Math.min(min, score); max = Math.max(max, score); }
    return [min, max];
  }, [flavorMatches]);
  const exploredDepth = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of countries) {
      const mine = dishes.filter(d => d.countryId === c.id);
      if (mine.length) m.set(c.id, countryDishProgress(c, mine).percent);
    }
    return m;
  }, [dishes]);

  // ---- camera ----
  const [camera, setCamera] = useState<Camera>({ coordinates: WORLD_CENTER, zoom: 1 });
  const [liveZoom, setLiveZoom] = useState(1);
  const [scope, setScope] = useState<Scope>({ level: 'world' });
  const scopeRef = useRef<Scope>(scope); scopeRef.current = scope;
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ id: string; name: string; x: number; y: number } | null>(null);
  const [tray, setTray] = useState<null | 'flavor' | 'culture'>(null);
  const [lens, setLens] = useState<Lens>('region');
  const filters = useDishFilters();
  const settle = useRef<number | null>(null);
  const flight = useRef<number | null>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cursor = useRef<[number, number] | null>(null);

  /** The pointer's lon/lat given the camera; the center when there is no pointer. */
  const probePoint = (center: [number, number], zoom: number): [number, number] => {
    const box = mapBox.current?.getBoundingClientRect();
    if (!cursor.current || !box) return center;
    const k = Math.min(box.width / VIEW_W, box.height / VIEW_H);
    const offX = (box.width - VIEW_W * k) / 2, offY = (box.height - VIEW_H * k) / 2;
    const sx = (cursor.current[0] - offX) / k, sy = (cursor.current[1] - offY) / k;
    const pc = baseProjection(center)!;
    const tx = VIEW_W / 2 - pc[0] * zoom, ty = VIEW_H / 2 - pc[1] * zoom;
    return (baseProjection.invert?.([(sx - tx) / zoom, (sy - ty) / zoom]) as [number, number]) ?? center;
  };

  /** What the camera is looking at, with hysteresis against the current scope. */
  const resolveScope = useCallback((probe: [number, number], zoom: number): Scope => {
    const current = scopeRef.current;
    const countryEnter = current.level === 'world' ? COUNTRY_IN : COUNTRY_OUT;
    if (zoom < countryEnter) return { level: 'world' };
    let hit: Country | undefined;
    for (const [id, feat] of features) if (geoContains(feat, probe)) { hit = getCountryById(id); break; }
    const country = hit ?? (current.level !== 'world' ? current.country : undefined);
    if (!country) return { level: 'world' };
    if (hasRegionMap(country)) {
      // Small countries frame at a high zoom already, so "zoom in further for a
      // region" is measured from the framing zoom, not from the world.
      const feat = features.get(country.id);
      const fit = feat ? frameCountry(country, feat).zoom : COUNTRY_IN;
      const regionIn = Math.max(REGION_IN, fit * 1.6), regionOut = Math.max(REGION_OUT, fit * 1.3);
      const regionEnter = current.level === 'region' && current.country.id === country.id ? regionOut : regionIn;
      if (zoom >= regionEnter) {
        const coordsFor = regionCoordinates[country.id];
        let best: RegionalCuisine | undefined, bestD = Infinity;
        for (const r of country.regionalVariations ?? []) {
          const c = coordsFor[r.name]; if (!c) continue;
          const d = Math.hypot(c[0] - probe[0], (c[1] - probe[1]) * 1.3);
          if (d < bestD) { bestD = d; best = r; }
        }
        // Stay on the current region unless another is clearly nearer
        if (best && bestD < (70 / zoom) * Math.max(1, fit / REGION_IN)) return { level: 'region', country, region: best };
        if (current.level === 'region' && current.country.id === country.id) return current;
      }
    }
    return { level: 'country', country };
  }, [features]);

  const commitScope = (next: Scope) => {
    const cur = scopeRef.current;
    const same = cur.level === next.level
      && (cur.level === 'world' || (next.level !== 'world' && cur.country.id === next.country.id))
      && (cur.level !== 'region' || (next.level === 'region' && cur.region.name === next.region.name));
    if (same) return;
    setScope(next);
    scopeRef.current = next;
    const params = new URLSearchParams();
    if (next.level !== 'world') params.set('c', next.country.id);
    if (next.level === 'region') params.set('r', regionSlug(next.region.name));
    setSearchParams(params, { replace: true });
    panelRef.current?.scrollTo({ top: 0 });
  };

  const onMoveEnd = ({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => {
    if (flight.current) return; // the fly-to sets scope itself
    setCamera({ coordinates, zoom });
    setLiveZoom(zoom);
    if (settle.current) window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const before = scopeRef.current;
      const next = resolveScope(probePoint(coordinates, zoom), zoom);
      commitScope(next);
      // Zooming *into* a new country or region: once the gesture settles,
      // ease the camera so the thing you zoomed toward is framed, not half
      // off the edge where the pointer happened to be.
      const newCountry = next.level !== 'world' && (before.level === 'world' || before.country.id !== next.country.id);
      const newRegion = next.level === 'region' && !(before.level === 'region' && before.region.name === next.region.name);
      if (newRegion) {
        const c = regionCoordinates[next.country.id]?.[next.region.name];
        if (c) flyTo({ coordinates: c, zoom });
      } else if (newCountry) {
        const feat = features.get(next.country.id);
        if (feat) { const f = frameCountry(next.country, feat); flyTo({ coordinates: f.coordinates, zoom: Math.max(zoom, f.zoom) }); }
      }
    }, 220);
  };

  /** Animate the camera; zoom eases in log space so it feels even. */
  const flyTo = (target: Camera, then?: Scope) => {
    if (flight.current) cancelAnimationFrame(flight.current);
    cursor.current = null;
    const from = camera, t0 = performance.now();
    const lz0 = Math.log(from.zoom), lz1 = Math.log(target.zoom);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / FLY_MS), e = easeInOut(t);
      const next: Camera = {
        coordinates: [from.coordinates[0] + (target.coordinates[0] - from.coordinates[0]) * e, from.coordinates[1] + (target.coordinates[1] - from.coordinates[1]) * e],
        zoom: Math.exp(lz0 + (lz1 - lz0) * e),
      };
      setCamera(next); setLiveZoom(next.zoom);
      if (t < 1) flight.current = requestAnimationFrame(step);
      else flight.current = null;
    };
    if (then) commitScope(then);
    flight.current = requestAnimationFrame(step);
  };
  const flyToWorld = () => flyTo({ coordinates: WORLD_CENTER, zoom: 1 }, { level: 'world' });
  const flyToCountry = (id: string) => {
    const feat = features.get(id), country = getCountryById(id);
    if (!feat || !country) return;
    flyTo(frameCountry(country, feat), { level: 'country', country });
  };
  const flyToRegion = (country: Country, region: RegionalCuisine) => {
    const c = regionCoordinates[country.id]?.[region.name]; if (!c) return;
    const feat = features.get(country.id);
    const fit = feat ? frameCountry(country, feat).zoom : COUNTRY_IN;
    flyTo({ coordinates: c, zoom: Math.max(camera.zoom, Math.max(REGION_IN + 1.2, fit * 1.8)) }, { level: 'region', country, region });
  };
  const zoomOutOneLevel = () => {
    if (scope.level === 'region') flyToCountry(scope.country.id);
    else if (scope.level === 'country') flyToWorld();
  };

  // Deep link: land where the URL says, once the outlines are in
  const landed = useRef(false);
  useEffect(() => {
    if (landed.current || features.size === 0) return;
    landed.current = true;
    const c = searchParams.get('c'), r = searchParams.get('r');
    const country = c ? getCountryById(c) : undefined;
    if (!country) return;
    const region = r ? regionFromSlug(r, country.regionalVariations) : undefined;
    if (region) flyToRegion(country, region); else flyToCountry(country.id);
  }, [features]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !tray) zoomOutOneLevel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---- panel data ----
  const country = scope.level === 'world' ? undefined : scope.country;
  const colors = country?.colorPalette;
  const regions = country?.regionalVariations;
  const countryDishes = useMemo(() => (country ? getDishesByCountry(country.id) : []), [country, getDishesByCountry]);
  const allEntries = useMemo<Entry[]>(() => {
    if (!country) return [];
    const triedByName = new Map(countryDishes.map(d => [d.name.toLowerCase(), d]));
    const triedFor = (name: string, english?: string) => triedByName.get(name.toLowerCase()) ?? (english ? triedByName.get(english.toLowerCase()) : undefined);
    const known = new Set<string>();
    country.popularDishes.forEach(d => { known.add(d.name.toLowerCase()); if (d.englishName) known.add(d.englishName.toLowerCase()); });
    (country.popularBeverages ?? []).forEach(b => { known.add(b.name.toLowerCase()); if (b.englishName) known.add(b.englishName.toLowerCase()); });
    return [
      ...country.popularDishes.map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish, tried: triedFor(dish.name, dish.englishName) })),
      ...(country.popularBeverages ?? []).map<Entry>(drink => ({ kind: 'drink', key: `b:${drink.name}`, drink, tried: triedFor(drink.name, drink.englishName) })),
      ...countryDishes.filter(ud => !known.has(ud.name.toLowerCase())).map<Entry>(userDish => ({ kind: 'custom', key: `c:${userDish.id}`, userDish })),
    ];
  }, [country, countryDishes]);
  const visible = useMemo(() => {
    if (!country) return [];
    return allEntries.filter(entry => {
      if (entry.kind === 'custom') {
        if (filters.view === 'want' || filters.refinementActive) return false;
        return filters.matchesText(entry.userDish.name);
      }
      const source = entry.kind === 'dish' ? entry.dish : entry.drink;
      if (filters.view === 'tried' && !entry.tried) return false;
      if (filters.view === 'want' && !(isOnWishlist(country.id, source.name) && !entry.tried)) return false;
      return entry.kind === 'dish' ? filters.matchesDish(entry.dish) : filters.matchesBeverage(entry.drink);
    });
  }, [allEntries, country, filters, isOnWishlist]);
  const effectiveLens: Lens = regions?.length ? lens : lens === 'region' ? 'category' : lens;
  const groups = useMemo(() => (country ? groupEntries(visible, effectiveLens, { regions, countryId: country.id, countryName: country.name }) : []), [country, visible, effectiveLens, regions]);
  const counts = useMemo(() => (country ? regionCounts(allEntries, regions, country.id) : {}), [country, allEntries, regions]);
  const triedCount = allEntries.filter(e => e.kind === 'custom' || e.tried).length;
  const actions: EntryGridActions | null = country ? {
    countryId: country.id,
    onAddDish: ({ name, kind }) => addDish({ countryId: country.id, name, kind, restaurantTries: [] }),
    onUpdateDish: updateDish, onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry, onUpdateRestaurantTry: updateRestaurantTry, onDeleteRestaurantTry: deleteRestaurantTry,
    isOnWishlist, isFavorite, addToWishlist, removeFromWishlist, findWishlistItem, addToFavorites, removeFromFavorites, findFavoriteItem,
  } : null;
  const regionLabelFor = (entry: Entry) => {
    if (!country || effectiveLens === 'region') return undefined;
    if (entry.kind === 'custom') return entry.userDish.region;
    return regionNameFor(entry.kind === 'dish' ? entry.dish : entry.drink, regions, country.id);
  };
  const availableLenses: Lens[] = regions?.length ? ['region', 'category', 'none'] : ['category', 'none'];

  const worldList = useMemo(() => {
    const rows = countries.map(c => ({ c, progress: countryDishProgress(c, dishes.filter(d => d.countryId === c.id)), match: flavorMatches?.get(c.id)?.score }));
    return rows.sort((a, b) => (b.match ?? -1) - (a.match ?? -1) || b.progress.percent - a.progress.percent || a.c.name.localeCompare(b.c.name));
  }, [dishes, flavorMatches]);

  const showBubbles = !!country && hasRegionMap(country) && liveZoom >= COUNTRY_OUT;
  const bubbleOpacity = !country ? 0 : Math.max(0, Math.min(1, (liveZoom - COUNTRY_OUT) / (COUNTRY_IN - COUNTRY_OUT)));
  const pill = (label: string, onClick: () => void) => (
    <button onClick={onClick} className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3 py-1.5" style={{ borderColor: `${colors!.primary}40`, color: colors!.primary, backgroundColor: systemColors.surface }}>{label}</button>
  );

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar actions={<>
        {country && <span className="flex gap-2">{pill('✦ Flavor fingerprint', () => setTray('flavor'))}{pill('📖 Food culture', () => setTray('culture'))}</span>}
        <ProfileButton />
      </>} />

      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: '62% 38%' }}>
        {/* ============ map ============ */}
        <div
          ref={mapBox}
          className="relative min-h-0 select-none"
          style={{ backgroundColor: systemColors.seaSalt }}
          onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); cursor.current = [e.clientX - r.left, e.clientY - r.top]; if (tooltip) setTooltip(t => t && { ...t, x: e.clientX - r.left, y: e.clientY - r.top - 10 }); }}
          onMouseLeave={() => { cursor.current = null; setHovered(null); setTooltip(null); }}
        >
          {/* breadcrumb */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border }}>
            <button onClick={flyToWorld} className="font-semibold" style={{ color: scope.level === 'world' ? systemColors.navy : systemColors.navyMuted }}>World</button>
            {scope.level !== 'world' && <><span style={{ color: systemColors.navyMuted }}>›</span><button onClick={() => flyToCountry(scope.country.id)} className="font-semibold" style={{ color: scope.level === 'country' ? systemColors.navy : systemColors.navyMuted }}>{scope.country.name}</button></>}
            {scope.level === 'region' && <><span style={{ color: systemColors.navyMuted }}>›</span><span className="font-semibold" style={{ color: systemColors.navy }}>{getShortRegionName(scope.region.name)}</span></>}
          </div>
          {/* layer toggle, world level only */}
          {scope.level === 'world' && (
            <div className="absolute top-3 right-3 z-10 flex gap-1 rounded-lg border p-1 shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border }}>
              <button onClick={() => setStoredLayer('explored')} className="px-2.5 py-1 text-xs font-medium rounded-md" style={layer === 'explored' ? { backgroundColor: systemColors.tomato, color: '#fff' } : { color: systemColors.navyMuted }}>Explored</button>
              <button onClick={() => hasEnoughData && setStoredLayer('flavorMatch')} disabled={!hasEnoughData} title={hasEnoughData ? undefined : 'Log 3 dishes to unlock'} className="px-2.5 py-1 text-xs font-medium rounded-md disabled:opacity-40" style={layer === 'flavorMatch' ? { backgroundColor: '#3E5260', color: '#fff' } : { color: systemColors.navyMuted }}>Flavor Match</button>
            </div>
          )}
          <div className="absolute bottom-3 left-3 z-10 rounded-lg border px-2.5 py-1.5 text-xs shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border, color: systemColors.navyMuted }}>
            {scope.level === 'world' ? 'Pinch or scroll to zoom into a cuisine · click to fly there'
              : scope.level === 'country' ? (hasRegionMap(scope.country) ? 'Keep zooming toward a region, or click one' : 'No regional map for this cuisine yet')
              : `Zoom out for all of ${scope.country.name} · Esc`}
          </div>
          <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1">
            <button onClick={() => flyTo({ coordinates: camera.coordinates, zoom: Math.min(MAX_ZOOM, camera.zoom * 1.7) })} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom in">+</button>
            <button onClick={() => { const z = Math.max(1, camera.zoom / 1.7); flyTo({ coordinates: camera.coordinates, zoom: z }, resolveScope(camera.coordinates, z)); }} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom out">−</button>
          </div>

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: BASE_SCALE, center: WORLD_CENTER }} width={VIEW_W} height={VIEW_H} style={{ width: '100%', height: '100%' }}>
            <ZoomableGroup
              center={camera.coordinates}
              zoom={camera.zoom}
              minZoom={1}
              maxZoom={MAX_ZOOM}
              onMove={({ zoom, dragging }) => {
                if (flight.current && dragging) { cancelAnimationFrame(flight.current); flight.current = null; }
                if (!flight.current) setLiveZoom(zoom);
              }}
              onMoveEnd={onMoveEnd}
              filterZoomEvent={((e: { button?: number }) => !e.button) as unknown as (el: SVGElement) => boolean}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) => geographies.map(geo => {
                  const alpha2 = getAlpha2FromNumeric(geo.id as string);
                  const profiled = alpha2 ? profiledCountryIds.has(alpha2) : false;
                  const isHovered = hovered === alpha2 && scope.level === 'world';
                  const isScoped = !!alpha2 && scope.level !== 'world' && scope.country.id === alpha2;
                  const state = alpha2 ? getActivityState(alpha2) : 'noProfile';
                  const match = alpha2 ? flavorMatches?.get(alpha2) : undefined;
                  const baseFill = flavorMatches ? getFlavorMatchFillColor(match?.score, isHovered, matchDomain) : getCountryFillColor(state, isHovered, alpha2 ? exploredDepth.get(alpha2) : undefined);
                  const fill = isScoped && colors ? `${colors.primary}2E` : baseFill;
                  const isLogged = state === 'hasDishes';
                  const stroke = isScoped && colors ? colors.primary : isHovered ? MAP_STROKE.hover : isLogged ? (flavorMatches ? FLAVOR_MATCH_LOGGED_STROKE : '#7E3A29') : MAP_STROKE.default;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={(isScoped ? 1.4 : isHovered || isLogged ? 1 : 0.5) / liveZoom}
                      style={{ default: { outline: 'none', transition: 'fill 200ms' }, hover: { outline: 'none', cursor: profiled ? 'pointer' : 'grab' }, pressed: { outline: 'none' } }}
                      onMouseEnter={e => {
                        setHovered(alpha2 ?? null);
                        if (alpha2 && profiled && scope.level === 'world') { const r = mapBox.current!.getBoundingClientRect(); setTooltip({ id: alpha2, name: geo.properties.name, x: e.clientX - r.left, y: e.clientY - r.top - 10 }); }
                      }}
                      onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                      onClick={() => { if (alpha2 && profiled && !(scope.level !== 'world' && scope.country.id === alpha2)) flyToCountry(alpha2); }}
                    />
                  );
                })}
              </Geographies>

              {/* Region bubbles rise out of the map as a country becomes the scope */}
              {showBubbles && country!.regionalVariations!.map(r => {
                const c = regionCoordinates[country!.id]?.[r.name]; if (!c) return null;
                const sel = scope.level === 'region' && scope.region.name === r.name;
                const dim = scope.level === 'region' && !sel;
                const n = counts[r.name] ?? 0;
                // Screen radius grows with zoom: compact while the whole country is
                // in view (so neighbours don't pile up), full size at region level
                const R = Math.min(40, 18 + 4.5 * liveZoom);
                const f = R / 40;
                return (
                  <Marker key={r.name} coordinates={c}>
                    <g
                      transform={`scale(${f / liveZoom})`}
                      onClick={e => { e.stopPropagation(); flyToRegion(country!, r); }}
                      style={{ cursor: 'pointer', opacity: bubbleOpacity * (dim ? 0.4 : 1), transition: 'opacity 250ms' }}
                    >
                      <circle r={sel ? 44 : 40} fill={sel ? colors!.primary : `${colors!.primary}D0`} stroke={sel ? systemColors.saffron : '#fff'} strokeWidth={sel ? 3 : 2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }} />
                      <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={16} fontWeight={700} dy={-7} style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{getShortRegionName(r.name)}</text>
                      <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={12} dy={13} style={{ pointerEvents: 'none', opacity: 0.85 }}>{n} {n === 1 ? 'dish' : 'dishes'}</text>
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && scope.level === 'world' && (() => {
            const c = getCountryById(tooltip.id);
            return <MapPreviewCard countryId={tooltip.id} countryName={tooltip.name} country={c} activity={getCountryActivity(tooltip.id)} match={flavorMatches?.get(tooltip.id)} progress={c ? countryDishProgress(c, dishes.filter(d => d.countryId === c.id)) : undefined} x={tooltip.x} y={tooltip.y} />;
          })()}
        </div>

        {/* ============ panel ============ */}
        <div ref={panelRef} className="min-h-0 overflow-y-auto border-l px-5 py-4" style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}>
          {scope.level === 'world' && (
            <>
              <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>{flavorMatches ? 'Where next' : '31 cuisines'}</h2>
              <p className="text-sm mb-4" style={{ color: systemColors.navyMuted }}>{flavorMatches ? 'Closest to your taste first. Zoom into one, or pick from the list.' : 'Zoom into one, or pick from the list.'}</p>
              <div className="space-y-1.5">
                {worldList.map(({ c, progress, match }) => (
                  <button key={c.id} onClick={() => flyToCountry(c.id)} onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)} className="w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left btn-press" style={{ backgroundColor: systemColors.surface, borderColor: hovered === c.id ? c.colorPalette.primary : systemColors.border }}>
                    {progress.percent > 0 ? <ProgressPlate percent={progress.percent} size={18} color={c.colorPalette.primary} title={`${progress.tried} of ${progress.total} dishes tried`} /> : <PlateDot color={c.colorPalette.primary} size={14} />}
                    <span className="text-sm font-semibold" style={{ color: systemColors.navy }}>{c.name}</span>
                    <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>{match !== undefined ? `${match}% match` : progress.percent > 0 ? `${progress.tried} of ${progress.total} tried` : c.region}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {country && colors && actions && (
            <>
              <div className="flex items-center gap-2.5">
                <PlateDot color={colors.primary} size={14} />
                <h2 className="text-xl font-bold" style={{ color: systemColors.navy }}>{country.name}</h2>
                <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>{country.capital} · {country.region}</span>
              </div>
              {scope.level === 'country' && (
                <div className="mt-2">
                  <ExpandableText text={country.cuisineProfile.summary} clamp="line-clamp-2" className="text-sm text-gray-700" />
                  {country.cuisineProfile.flavorIntensity && (
                    <div className="flex gap-1 mt-2">
                      {axesByIntensity(country.cuisineProfile.flavorIntensity).slice(0, 3).map(({ axis }) => (
                        <span key={axis} className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }}>{FLAVOR_AXIS_META[axis].label}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="mt-3 mb-4">
                <LensControls filters={filters} lens={effectiveLens} onLensChange={setLens} availableLenses={availableLenses} triedCount={triedCount} hasBeverages={!!country.popularBeverages?.length} />
              </div>

              {scope.level === 'country' && (
                groups.length === 0 || visible.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-6 text-center text-sm" style={{ borderColor: systemColors.border, color: systemColors.navyMuted }}>
                    Nothing matches these filters. <button onClick={filters.reset} className="font-semibold" style={{ color: systemColors.tomato }}>Clear filters</button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {groups.map(group => (
                      <DishSection key={group.id} group={group} focused={false} onFocus={() => group.region && flyToRegion(country, group.region)} onClearFocus={() => {}} colors={colors} tiers={country.cuisineProfile.ingredientTiers}>
                        <div className="[&>div]:grid-cols-1">
                          <EntryGrid entries={group.entries} actions={actions} regionLabelFor={regionLabelFor} />
                        </div>
                      </DishSection>
                    ))}
                  </div>
                )
              )}

              {scope.level === 'region' && (() => {
                const inRegion = groupEntries(visible, 'region', { regions, countryId: country.id, countryName: country.name }).find(g => g.region?.name === scope.region.name);
                const group = inRegion ?? { id: 'r', label: scope.region.name, region: scope.region, entries: [] as Entry[] };
                return (
                  <DishSection group={group} focused onFocus={() => {}} onClearFocus={() => flyToCountry(country.id)} colors={colors} tiers={country.cuisineProfile.ingredientTiers}
                    emptyNote={filters.activeFilterCount > 0 || filters.query ? <p className="text-sm italic" style={{ color: systemColors.navyMuted }}>Nothing here matches what you're filtering for. <button onClick={filters.reset} className="not-italic font-semibold" style={{ color: systemColors.tomato }}>Clear filters</button></p> : undefined}>
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
          <Tray open={tray === 'flavor'} onClose={() => setTray(null)} title={`${country.name}’s flavor fingerprint`}><ProfileSlide country={country} colors={colors} stacked /></Tray>
          <Tray open={tray === 'culture'} onClose={() => setTray(null)} title={`Food culture in ${country.name}`}><FoodCultureSection country={country} colors={colors} /></Tray>
        </>
      )}
    </div>
  );
}
