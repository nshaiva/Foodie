import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { geoMercator, geoPath } from 'd3-geo';
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
import { useDishFilters } from '../hooks/useDishFilters';
import { useCountryActivity } from '../hooks/useCountryActivity';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { countryDishProgress } from '../utils/dishProgress';
import { groupEntries, regionCounts, type Entry, type Lens } from '../utils/groupDishes';
import { homeLand, labelsFitAt, labelsInView, regionAreas, regionLabelName, seaLabelLayout, REGION_BORDER, REGION_INK, REGION_TINT, type RegionAreas, type SeaPlacement } from '../utils/regionAreas';
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
 * camera has been sent to. Zooming and panning only move the camera; the
 * scope changes when you click a country or a region (or use the breadcrumb
 * or Esc), and that click flies the camera there. Hovering a country
 * previews its region pins. The URL carries the scope so a refresh or a
 * shared link lands where you were.
 */

// 50m rather than 110m: at the zooms small countries need, 110m draws Jamaica
// as eight points. ~5x the download (about 800 KB gzipped to ~250), once.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json';
const VIEW_W = 800;
const VIEW_H = 500;
const BASE_SCALE = 130;
const WORLD_CENTER: [number, number] = [10, 25];
const COUNTRY_IN = 2.2;  // a framed country is always at least this close
const REGION_IN = 4.6;   // and a framed region at least this
const MAX_ZOOM = 220;  // Jamaica needs ~140× to fill the frame
const FLY_MS = 700;
// The phone sheet's three resting heights; the drag handler builds on the
// same expressions, so classes and finger math can never disagree.
const SHEET_Y = {
  strip: 'calc(100% - 54px - env(safe-area-inset-bottom,0px))',
  half: '48%',
  full: '0px',
} as const;

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

// Touch screens replay a tap as hover-then-click: a synthetic mouseenter fires
// first, and if its handler changes the page (tooltip, hover tint), WebKit
// spends the whole tap on "hover" and never delivers the click — a country
// then takes two or three taps to open. On a device that can't hover, skip
// the hover work entirely so a tap is a clean click. Checked per event, not
// once, so plugging a mouse into a tablet switches modes.
const canHover = () => window.matchMedia('(hover: hover)').matches;
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
 * Camera that frames a country: the land its regions are on fills most of
 * the map, so borders have room and names fit on arrival.
 */
function frameCountry(country: Country, feat: Feature<Geometry>, view: readonly [number, number] = [VIEW_W, VIEW_H]): Camera {
  const main = homeLand(country.id, feat, baseProjection);
  const [[x0, y0], [x1, y1]] = geoPath(baseProjection).bounds(main);
  const zoom = 0.82 * Math.min(view[0] / Math.max(x1 - x0, 1), view[1] / Math.max(y1 - y0, 1));
  const center = baseProjection.invert!([(x0 + x1) / 2, (y0 + y1) / 2]) as [number, number];
  return { coordinates: center, zoom: Math.max(COUNTRY_IN + 0.3, Math.min(MAX_ZOOM, zoom)) };
}

const areasCache = new Map<string, RegionAreas | null>();
/** Region areas are costly to place (label anchors), so each country is split once. */
function getAreas(country: Country, feat: Feature<Geometry>): RegionAreas | null {
  if (!areasCache.has(country.id)) areasCache.set(country.id, regionAreas(country.id, country.regionalVariations, feat, baseProjection));
  return areasCache.get(country.id)!;
}

const labelScaleAt = (zoom: number) => Math.min(1.25, 0.9 + 0.05 * zoom);

/** Dish counts per region from the country's own list (what the labels show). */
function staticRegionCounts(country: Country): Record<string, number> {
  const entries: Entry[] = [
    ...country.popularDishes.map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish })),
    ...(country.popularBeverages ?? []).map<Entry>(drink => ({ kind: 'drink', key: `b:${drink.name}`, drink })),
  ];
  return regionCounts(entries, country.regionalVariations, country.id);
}

export function Explore() {
  const features = useCountryFeatures();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishes, addDish, updateDish, deleteDish, getDishesByCountry, addRestaurantTry, updateRestaurantTry, deleteRestaurantTry } = useDishes();
  const { wishlist, addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
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
  // Timers and animation frames outlive the render that scheduled them, so
  // anything they read about the camera must come from here, not `camera`
  const cameraRef = useRef<Camera>(camera);
  const [liveZoom, setLiveZoom] = useState(1);
  const [scope, setScope] = useState<Scope>({ level: 'world' });
  const scopeRef = useRef<Scope>(scope);
  const [hovered, setHovered] = useState<string | null>(null);
  // At world level, resting on a country for a moment shows it in the panel.
  // It sticks after the pointer leaves, so you can move over to read it; the
  // delay stops countries you merely cross on the way from taking over.
  const [peekId, setPeekId] = useState<string | null>(null);
  const peekTimer = useRef<number | null>(null);
  const cancelPeek = () => { if (peekTimer.current) { window.clearTimeout(peekTimer.current); peekTimer.current = null; } };
  const [tooltip, setTooltip] = useState<{ id: string; name: string; x: number; y: number } | null>(null);
  const [tray, setTray] = useState<null | 'flavor' | 'culture'>(null);
  // Phone bottom sheet: 'strip' docks a slim header at the bottom (the map is
  // the app), 'half' shows map + list, 'full' is all list. Desktop ignores it:
  // every class it drives is max-md scoped.
  const [sheetPos, setSheetPos] = useState<'strip' | 'half' | 'full'>('strip');
  const sheetDrag = useRef<{ y: number; moved: boolean } | null>(null);
  const sheetSwiped = useRef(false);
  const panelPull = useRef<{ y: number; atTop: boolean } | null>(null);
  const sheetStep = (dir: 1 | -1) => setSheetPos(p => {
    const order = ['strip', 'half', 'full'] as const;
    return order[Math.min(2, Math.max(0, order.indexOf(p) + dir))];
  });
  // How many CSS px one viewBox unit paints at (the SVG is width-fit, so a
  // 390px phone renders the 800-unit viewBox at ~0.49). Lettering sized in
  // viewBox units alone halves on a phone; the boost cancels that, so region
  // names are the same visual size on every device. Desktop's k is ≥1: no-op.
  const [renderK, setRenderK] = useState(1);
  useEffect(() => {
    const measure = () => {
      const b = mapBox.current?.getBoundingClientRect();
      if (b?.width && b?.height) setRenderK(Math.min(b.width / VIEW_W, b.height / VIEW_H));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const labelBoost = 1 / Math.min(1, renderK);
  // The atlas treatment: a landing whose frame can't fit names on the land
  // (Malaysia, Indonesia, Turkey) sets them at full size in the open water
  // nearest their region, drawn with a hairline leader. Computed once per
  // landing; null means the names fit inline as usual.
  const [seaLayout, setSeaLayout] = useState<{ placements: SeaPlacement[]; zoom: number } | null>(null);

  /**
   * The window the viewer actually sees, in viewBox units. A phone shows far
   * more map vertically than the 800×500 viewBox (the SVG is width-fit and
   * paints to the box's edges), so framing against the viewBox alone lands a
   * tall country like Peru far too small on a phone.
   */
  const viewDims = (): readonly [number, number] => {
    const box = mapBox.current?.getBoundingClientRect();
    if (!box?.width || !box?.height) return [VIEW_W, VIEW_H];
    const k = Math.min(box.width / VIEW_W, box.height / VIEW_H);
    return [box.width / k, box.height / k];
  };

  /** The breadcrumb's current crumb and the strip both raise the sheet. */
  const openSheet = () => setSheetPos(p => (p === 'strip' ? 'half' : 'full'));
  const [lens, setLens] = useState<Lens>('region');
  const filters = useDishFilters();
  const flight = useRef<number | null>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const commitScope = (next: Scope) => {
    const cur = scopeRef.current;
    const same = cur.level === next.level
      && (cur.level === 'world' || (next.level !== 'world' && cur.country.id === next.country.id))
      && (cur.level !== 'region' || (next.level === 'region' && cur.region.name === next.region.name));
    if (same) return;
    setScope(next);
    scopeRef.current = next;
    // Peek is a world-level idea; entering a country or region retires it, so
    // zooming back out later lands on the world list, not a stale preview
    if (next.level !== 'world') { cancelPeek(); setPeekId(null); }
    const params = new URLSearchParams();
    if (next.level !== 'world') params.set('c', next.country.id);
    if (next.level === 'region') params.set('r', regionSlug(next.region.name));
    setSearchParams(params, { replace: true });
    panelRef.current?.scrollTo({ top: 0 });
  };

  /** Zooming and panning only move the camera. What the panel describes
   *  changes when you click a country or a region (or the breadcrumb / Esc). */
  const onMove = ({ zoom, dragging }: { x: number; y: number; zoom: number; dragging: unknown }) => {
    if (flight.current && dragging) { cancelAnimationFrame(flight.current); flight.current = null; }
    if (flight.current) return;
    setLiveZoom(zoom);
  };

  const onMoveEnd = ({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => {
    if (flight.current) return;
    cameraRef.current = { coordinates, zoom };
    setCamera({ coordinates, zoom });
    setLiveZoom(zoom);
  };


  /** Animate the camera; zoom eases in log space so it feels even. */
  const flyTo = (target: Camera, then?: Scope, ms = FLY_MS) => {
    if (flight.current) cancelAnimationFrame(flight.current);
    const from = cameraRef.current, t0 = performance.now();
    const lz0 = Math.log(from.zoom), lz1 = Math.log(target.zoom);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms), e = easeInOut(t);
      const next: Camera = {
        coordinates: [from.coordinates[0] + (target.coordinates[0] - from.coordinates[0]) * e, from.coordinates[1] + (target.coordinates[1] - from.coordinates[1]) * e],
        zoom: Math.exp(lz0 + (lz1 - lz0) * e),
      };
      cameraRef.current = next; setCamera(next); setLiveZoom(next.zoom);
      if (t < 1) flight.current = requestAnimationFrame(step);
      else flight.current = null;
    };
    if (then) commitScope(then);
    flight.current = requestAnimationFrame(step);
  };
  const flyToWorld = () => { cancelPeek(); setPeekId(null); setSheetPos('strip'); flyTo({ coordinates: WORLD_CENTER, zoom: 1 }, { level: 'world' }); };
  const flyToCountry = (id: string) => {
    const feat = features.get(id), country = getCountryById(id);
    if (!feat || !country) return;
    cancelPeek(); setPeekId(null); setTooltip(null);
    setSheetPos('strip'); // land on the map; the strip is the handle into the list
    // Land where every region's name fits: nudge in from the mainland framing
    // until they do (tall, thin countries need it)
    const cam = frameCountry(country, feat, viewDims());
    const areas = hasRegionMap(country) ? getAreas(country, feat) : null;
    if (areas) {
      const counts = staticRegionCounts(country);
      const floor = Math.max(1, 0.75 * labelBoost);
      const view = viewDims();
      const centrePx = baseProjection(cam.coordinates)!;
      const fits = (at: number) => labelsFitAt(areas, at, counts, labelScaleAt(at) * floor);
      const inView = (at: number) => labelsInView(areas, at, counts, labelScaleAt(at) * floor, centrePx, view);
      let z = cam.zoom;
      // Land where names at the readable floor fit; full-size names are
      // rendered wherever the country has room for them. Never zoom a name
      // off the screen to get there: Malaysia's names stop colliding at 3×
      // exactly because half of them have left the view by then.
      while (!fits(z) && z < Math.min(MAX_ZOOM, cam.zoom * 3) && inView(z * 1.1)) z *= 1.1;
      if (fits(z)) {
        cam.zoom = Math.min(MAX_ZOOM, z);
        setSeaLayout(null);
      } else {
        // Names some countries can never fit on the land at their landing
        // view (Malaysia's peninsula, Java's cluster). The camera keeps the
        // clean whole-country frame, and those names go to sea at full
        // size — the atlas way with archipelagos.
        const placements = seaLabelLayout(areas, cam.zoom, counts, labelScaleAt(cam.zoom) * floor, centrePx, view);
        setSeaLayout(placements && { placements, zoom: cam.zoom });
      }
    } else setSeaLayout(null);
    flyTo(cam, { level: 'country', country });
  };
  const flyToRegion = (country: Country, region: RegionalCuisine) => {
    const c = regionCoordinates[country.id]?.[region.name]; if (!c) return;
    setSheetPos('half'); // a region tap shows its dishes while the map stays in view
    const feat = features.get(country.id);
    const fit = feat ? frameCountry(country, feat, viewDims()).zoom : COUNTRY_IN;
    const zoom = Math.max(camera.zoom, Math.max(REGION_IN + 1.2, fit * 1.8));
    // With the sheet at half, "screen centre" is behind the sheet. Aim the
    // region at the middle of the map that stays visible: put the camera's
    // centre below it, a quarter of the view. (A behaviour branch, like
    // Home's map: the sheet only exists below md.)
    let coordinates = c;
    if (window.matchMedia('(max-width: 767px)').matches) {
      const [, effH] = viewDims();
      const p = baseProjection(c)!;
      coordinates = (baseProjection.invert?.([p[0], p[1] + (0.24 * effH) / zoom]) as [number, number]) ?? c;
    }
    flyTo({ coordinates, zoom }, { level: 'region', country, region });
  };
  const zoomOutOneLevel = () => {
    if (scope.level === 'region') flyToCountry(scope.country.id);
    else if (scope.level === 'country') flyToWorld();
    else if (peekId) setPeekId(null);
  };

  /** A tap on the map, resolved from the touch events themselves. Touch
   *  screens replay a tap as hover-then-click, and WebKit drops the click
   *  whenever anything under the finger changed during the hover half — the
   *  map library swaps its own internal hover style, beyond our gating, so
   *  on a phone the click arrived only every second or third tap. The native
   *  listener below recognises the tap and calls this directly instead. */
  const onTap = (hit: Element) => {
    const s = scopeRef.current;
    const regionName = hit.getAttribute('data-r');
    if (regionName) {
      const c = s.level === 'world' ? undefined : s.country;
      const region = c?.regionalVariations?.find(r => r.name === regionName);
      if (c && region && !(s.level === 'region' && s.region.name === regionName)) flyToRegion(c, region);
      return;
    }
    const id = hit.getAttribute('data-c');
    if (id && !(s.level !== 'world' && s.country.id === id)) flyToCountry(id);
  };

  // react-simple-maps re-attaches d3-zoom whenever these handlers change
  // identity, which (with a fresh closure every render) was every frame of a
  // pinch. Hand it stable wrappers that call the latest version.
  const handlers = useRef({ onMove, onMoveEnd, onTap });
  useLayoutEffect(() => {
    cameraRef.current = camera; scopeRef.current = scope;
    handlers.current = { onMove, onMoveEnd, onTap };
  });

  // d3-zoom stops touch events at the svg (stopImmediatePropagation), so a
  // React onTouchEnd inside the map never fires. Listen natively in the
  // capture phase, which runs before d3 sees anything.
  useEffect(() => {
    const el = mapBox.current; if (!el) return;
    let start: { x: number; y: number; t: number; target: EventTarget | null } | null = null;
    const down = (e: TouchEvent) => {
      start = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), target: e.target } : null;
    };
    const up = (e: TouchEvent) => {
      const s = start; start = null;
      if (!s || e.touches.length > 0) return; // a second finger: a pinch, not a tap
      const c = e.changedTouches[0];
      if (Math.hypot(c.clientX - s.x, c.clientY - s.y) > 12 || Date.now() - s.t > 600) return; // a drag or a hold
      const hit = (s.target as Element | null)?.closest?.('[data-r], [data-c]');
      if (!hit) return;
      e.preventDefault(); // handled here — no synthetic hover-then-click to lose
      handlers.current.onTap(hit);
    };
    el.addEventListener('touchstart', down, { capture: true, passive: true });
    el.addEventListener('touchend', up, { capture: true });
    return () => {
      el.removeEventListener('touchstart', down, { capture: true });
      el.removeEventListener('touchend', up, { capture: true });
    };
  }, []);
  const stableOnMove = useCallback((p: Parameters<typeof onMove>[0]) => handlers.current.onMove(p), []);
  const stableOnMoveEnd = useCallback((p: Parameters<typeof onMoveEnd>[0]) => handlers.current.onMoveEnd(p), []);
  const filterZoomEvent = useCallback((e: { button?: number }) => !e.button, []) as unknown as (el: SVGElement) => boolean;

  // Deep link: land where the URL says, once the outlines are in
  const landed = useRef(false);
  useEffect(() => {
    if (landed.current || features.size === 0) return;
    landed.current = true;
    const c = searchParams.get('c'), r = searchParams.get('r');
    const country = c ? getCountryById(c) : undefined;
    if (!country) return;
    const region = r ? regionFromSlug(r, country.regionalVariations) : undefined;
    // A one-time landing once the outlines arrive, not a state sync
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (region) flyToRegion(country, region); else flyToCountry(country.id);
  }, [features]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !tray) zoomOutOneLevel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---- panel data ----
  const peekCountry = scope.level === 'world' && peekId ? getCountryById(peekId) : undefined;
  const country = scope.level === 'world' ? peekCountry : scope.country;
  // A peeked country fills the panel exactly as an opened one does
  const panelLevel: Scope['level'] = scope.level === 'world' ? (peekCountry ? 'country' : 'world') : scope.level;
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
    isOnWishlist, addToWishlist, removeFromWishlist, findWishlistItem,
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

  // Region pins appear only for a country you've opened (clicked), never on hover
  const bubbleCountry = scope.level === 'world' ? undefined : scope.country;
  const showBubbles = !!bubbleCountry && hasRegionMap(bubbleCountry);
  const areas = useMemo(() => {
    const feat = bubbleCountry && features.get(bubbleCountry.id);
    return bubbleCountry && feat ? getAreas(bubbleCountry, feat) : null;
  }, [bubbleCountry, features]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  // Names render as large as still fit cleanly: full size where the country
  // has room, stepping down to a readable floor on tight ones (a wide country
  // on a tall phone can't zoom further without cropping). Below the floor
  // they hide all together, as before — unless the landing set them at sea.
  const labelFloor = Math.max(1, 0.75 * labelBoost);
  const [labelScale, labelsFit] = useMemo(() => {
    const base = labelScaleAt(liveZoom);
    if (!areas) return [base * labelBoost, false] as const;
    if (!labelsFitAt(areas, liveZoom, counts, base * labelFloor)) return [base * labelFloor, false] as const;
    for (const b of [labelBoost, labelBoost * 0.9, labelBoost * 0.8, labelBoost * 0.7]) {
      if (b >= labelFloor && labelsFitAt(areas, liveZoom, counts, base * b)) return [base * b, true] as const;
    }
    return [base * labelFloor, true] as const;
  }, [areas, counts, liveZoom, labelBoost, labelFloor]);
  // Sea-set names show while the inline ones can't fit and the camera is
  // still near the landing that placed them; zoom out further and they all
  // go together, zoom in and the inline names take over.
  const showSea = !!seaLayout && !labelsFit && liveZoom >= seaLayout.zoom * 0.85;
  const scopeKey = scope.level === 'world' ? (peekCountry ? `c:${peekCountry.id}` : 'world') : scope.level === 'country' ? `c:${scope.country.id}` : `r:${scope.country.id}:${scope.region.name}`;
  const pill = (label: string, onClick: () => void) => (
    <button onClick={onClick} className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3 py-1.5" style={{ borderColor: `${colors!.primary}40`, color: colors!.primary, backgroundColor: systemColors.surface }}>{label}</button>
  );

  return (
    <div className="h-dvh flex flex-col" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar actions={<>
        {country && <span className="max-md:hidden flex gap-2">{pill('✦ Flavor fingerprint', () => setTray('flavor'))}{pill('📖 Food culture', () => setTray('culture'))}</span>}
        <Link
          to="/restaurant"
          className="btn-press text-sm font-semibold text-white px-3.5 py-2 rounded-lg"
          style={{ backgroundColor: systemColors.tomato }}
        >
          🍽 At a restaurant?
        </Link>
        <Link
          to="/wishlist"
          aria-label={`Want to try (${wishlist.length})`}
          title="Want to try"
          className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: systemColors.navy }}
        >
          <span
            className="p-2 rounded-full inline-flex"
            style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
          >
            <svg className="w-4 h-4" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </span>
          {wishlist.length > 0 && <span>{wishlist.length}</span>}
        </Link>
        <ProfileButton />
      </>} />

      {/* Phone: map on top, panel as a sheet below. Desktop: side by side. */}
      <div className="flex-1 min-h-0 max-md:relative md:grid" style={{ gridTemplateColumns: '62% 38%' }}>
        {/* ============ map ============ */}
        <div
          ref={mapBox}
          className="map-container explore-map relative min-h-0 select-none max-md:absolute max-md:inset-0"
          data-zoom={liveZoom.toFixed(2)}
          data-scope={scope.level}
          // touch-action none: a pinch or drag on the map is for the map, not the page
          style={{ backgroundColor: systemColors.seaSalt, touchAction: 'none' }}
          onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); if (tooltip) setTooltip(t => t && { ...t, x: e.clientX - r.left, y: e.clientY - r.top - 10 }); }}
          onPointerDown={e => { if (e.button === 0) e.currentTarget.classList.add('is-dragging'); }}
          onPointerUp={e => e.currentTarget.classList.remove('is-dragging')}
          onMouseLeave={e => { e.currentTarget.classList.remove('is-dragging'); setHovered(null); setTooltip(null); }}
        >
          {/* breadcrumb */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border }}>
            <button onClick={() => (scope.level === 'world' ? openSheet() : flyToWorld())} className="font-semibold" style={{ color: scope.level === 'world' ? systemColors.navy : systemColors.navyMuted }}>World</button>
            {scope.level !== 'world' && <><span style={{ color: systemColors.navyMuted }}>›</span><button onClick={() => (scope.level === 'country' ? openSheet() : flyToCountry(scope.country.id))} className="font-semibold" style={{ color: scope.level === 'country' ? systemColors.navy : systemColors.navyMuted }}>{scope.country.name}</button></>}
            {scope.level === 'region' && <><span style={{ color: systemColors.navyMuted }}>›</span><button onClick={openSheet} className="font-semibold" style={{ color: systemColors.navy }}>{getShortRegionName(scope.region.name)}</button></>}
          </div>
          {/* layer toggle, world level only */}
          {scope.level === 'world' && (
            <div className="absolute top-3 right-3 z-10 flex gap-1 rounded-lg border p-1 shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border }}>
              <button onClick={() => setStoredLayer('explored')} className="px-2.5 py-1 text-xs font-medium rounded-md" style={layer === 'explored' ? { backgroundColor: systemColors.tomato, color: '#fff' } : { color: systemColors.navyMuted }}>Explored</button>
              <button onClick={() => hasEnoughData && setStoredLayer('flavorMatch')} disabled={!hasEnoughData} title={hasEnoughData ? undefined : 'Log 3 dishes to unlock'} className="px-2.5 py-1 text-xs font-medium rounded-md disabled:opacity-40" style={layer === 'flavorMatch' ? { backgroundColor: '#3E5260', color: '#fff' } : { color: systemColors.navyMuted }}>Flavor Match</button>
            </div>
          )}
          <div className="max-md:hidden absolute bottom-3 left-3 z-10 rounded-lg border px-2.5 py-1.5 text-xs shadow-sm" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border, color: systemColors.navyMuted }}>
            {scope.level === 'world' ? 'Hover a country to preview it · click to open its regions'
              : scope.level === 'country' ? (hasRegionMap(scope.country) ? 'Click a region to open it' : 'No regional map for this cuisine yet')
              : `Esc for all of ${scope.country.name}`}
          </div>
          <div className="absolute bottom-3 max-md:bottom-24 right-3 z-10 flex flex-col gap-1">
            <button onClick={() => flyTo({ coordinates: camera.coordinates, zoom: Math.min(MAX_ZOOM, camera.zoom * 1.7) })} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom in">+</button>
            <button onClick={() => { const z = Math.max(1, camera.zoom / 1.7); flyTo({ coordinates: camera.coordinates, zoom: z }); }} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom out">−</button>
          </div>

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: BASE_SCALE, center: WORLD_CENTER }} width={VIEW_W} height={VIEW_H} style={{ width: '100%', height: '100%' }}>
            <ZoomableGroup
              center={camera.coordinates}
              zoom={camera.zoom}
              minZoom={1}
              maxZoom={MAX_ZOOM}
              onMove={stableOnMove}
              onMoveEnd={stableOnMoveEnd}
              filterZoomEvent={filterZoomEvent}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) => geographies.map(geo => {
                  const alpha2 = getAlpha2FromNumeric(geo.id as string);
                  const profiled = alpha2 ? profiledCountryIds.has(alpha2) : false;
                  const isHovered = hovered === alpha2 && !(scope.level !== 'world' && scope.country.id === alpha2);
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
                      style={{ default: { outline: 'none', transition: 'fill 200ms' }, hover: { outline: 'none', cursor: profiled ? 'pointer' : 'inherit' }, pressed: { outline: 'none' } }}
                      onMouseEnter={e => {
                        if (!canHover()) return; // a tap must stay a click
                        setHovered(alpha2 ?? null);
                        cancelPeek();
                        if (alpha2 && profiled && scope.level === 'world') peekTimer.current = window.setTimeout(() => setPeekId(alpha2), 220);
                        if (alpha2 && profiled && !(scope.level !== 'world' && scope.country.id === alpha2)) { const r = mapBox.current!.getBoundingClientRect(); setTooltip({ id: alpha2, name: geo.properties.name, x: e.clientX - r.left, y: e.clientY - r.top - 10 }); }
                      }}
                      onMouseLeave={() => { setHovered(null); setTooltip(null); cancelPeek(); }}
                      onClick={() => { if (alpha2 && profiled && !(scope.level !== 'world' && scope.country.id === alpha2)) flyToCountry(alpha2); }}
                      data-c={alpha2 && profiled ? alpha2 : undefined}
                    />
                  );
                })}
              </Geographies>

              {/* Region bubbles rise out of the map as a country becomes the scope */}
              {showBubbles && areas && (() => {
                const sw = 1 / liveZoom;
                return (
                  <g>
                    <defs><clipPath id="region-clip"><path d={areas.outline} /></clipPath></defs>
                    <g clipPath="url(#region-clip)">
                      {/* Each area is its own click target; hover outlines it */}
                      {areas.areas.map(({ region, cell }) => {
                        const sel = scope.level === 'region' && scope.region.name === region.name;
                        return (
                          <path key={region.name} d={cell}
                            fill={sel ? REGION_TINT : 'transparent'} fillOpacity={sel ? 0.12 : 1}
                            stroke={sel || hoveredRegion === region.name ? REGION_INK : 'none'} strokeWidth={(sel ? 1.8 : 1.3) * sw}
                            style={{ cursor: 'pointer', transition: 'fill-opacity 200ms' }}
                            onMouseEnter={() => { if (canHover()) setHoveredRegion(region.name); }} onMouseLeave={() => setHoveredRegion(null)}
                            onClick={e => { e.stopPropagation(); if (!sel) flyToRegion(bubbleCountry!, region); }}
                            data-r={region.name} />
                        );
                      })}
                      <path d={areas.borders} fill="none" stroke={REGION_BORDER} strokeWidth={sw} strokeDasharray={`${3 * sw} ${3 * sw}`} style={{ pointerEvents: 'none' }} />
                    </g>
                    {areas.areas.map(({ region, anchor }) => {
                      const sel = scope.level === 'region' && scope.region.name === region.name;
                      const dim = scope.level === 'region' && !sel;
                      const n = counts[region.name] ?? 0;
                      return (
                        <Marker key={region.name} coordinates={anchor} style={{ default: { pointerEvents: 'none' }, hover: { pointerEvents: 'none' }, pressed: { pointerEvents: 'none' } }}>
                          <g transform={`scale(${labelScale / liveZoom})`} opacity={labelsFit ? 1 : 0} style={{ pointerEvents: 'none', transition: 'opacity 180ms' }}>
                            <text textAnchor="middle" dominantBaseline="central" y={n ? -5 : 0} fill={dim ? REGION_BORDER : REGION_INK} fontSize={sel ? 17 : 15} fontStyle="italic" fontWeight={500}
                              stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)' }}>
                              {regionLabelName(region.name)}
                            </text>
                            {n > 0 && (
                              <text textAnchor="middle" dominantBaseline="central" y={11} fill={systemColors.navyMuted} fontSize={9.5} letterSpacing="0.12em"
                                stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke">
                                {n} {n === 1 ? 'DISH' : 'DISHES'}
                              </text>
                            )}
                          </g>
                        </Marker>
                      );
                    })}
                    {/* Names at sea: what can't fit on the land sits at full
                        size in the nearest open water, a hairline leading
                        home. Inline keepers (Borneo) render here too, since
                        the normal layer is hidden while inline doesn't fit. */}
                    {showSea && seaLayout && (
                      <g opacity={1} style={{ transition: 'opacity 180ms' }}>
                        {seaLayout.placements.filter(p => !p.inline).map(p => {
                          const a = areas.areas.find(x => x.region.name === p.region.name)!;
                          return (
                            <g key={`l:${p.region.name}`} style={{ pointerEvents: 'none' }}>
                              <line x1={p.at[0]} y1={p.at[1]} x2={a.anchorPx[0]} y2={a.anchorPx[1]} stroke={REGION_BORDER} strokeWidth={labelBoost / liveZoom} opacity={0.85} />
                              <circle cx={a.anchorPx[0]} cy={a.anchorPx[1]} r={(2.2 * labelBoost) / liveZoom} fill={REGION_BORDER} />
                            </g>
                          );
                        })}
                        {seaLayout.placements.map(p => {
                          const n = counts[p.region.name] ?? 0;
                          const name = regionLabelName(p.region.name);
                          return (
                            <Marker key={`s:${p.region.name}`} coordinates={baseProjection.invert!(p.at) as [number, number]}>
                              <g transform={`scale(${labelScale / liveZoom})`} style={{ cursor: 'pointer' }} data-r={p.region.name}
                                onClick={e => { e.stopPropagation(); flyToRegion(bubbleCountry!, p.region); }}>
                                <rect x={-(name.length * 4.5)} y={-12} width={name.length * 9} height={n ? 32 : 24} fill="transparent" />
                                <text textAnchor="middle" dominantBaseline="central" y={n ? -5 : 0} fill={REGION_INK} fontSize={15} fontStyle="italic" fontWeight={500}
                                  stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)' }}>
                                  {name}
                                </text>
                                {n > 0 && (
                                  <text textAnchor="middle" dominantBaseline="central" y={11} fill={systemColors.navyMuted} fontSize={9.5} letterSpacing="0.12em"
                                    stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke">
                                    {n} {n === 1 ? 'DISH' : 'DISHES'}
                                  </text>
                                )}
                              </g>
                            </Marker>
                          );
                        })}
                      </g>
                    )}
                  </g>
                );
              })()}
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (() => {
            const c = getCountryById(tooltip.id);
            return <div className="max-md:hidden"><MapPreviewCard countryId={tooltip.id} countryName={tooltip.name} country={c} activity={getCountryActivity(tooltip.id)} match={flavorMatches?.get(tooltip.id)} progress={c ? countryDishProgress(c, dishes.filter(d => d.countryId === c.id)) : undefined} x={tooltip.x} y={tooltip.y} /></div>;
          })()}
        </div>

        {/* ============ panel ============ */}
        <div
          ref={panelRef}
          key={scopeKey}
          className={`z-10 min-h-0 px-5 pb-6 fade-in md:overflow-y-auto md:border-l md:py-4 max-md:absolute max-md:inset-0 max-md:rounded-t-2xl max-md:shadow-[0_-8px_20px_rgba(51,48,42,0.14)] max-md:transition-transform max-md:duration-300 max-md:ease-out ${
            sheetPos === 'strip' ? 'max-md:overflow-hidden' : 'max-md:overflow-y-auto'
          } ${
            sheetPos === 'strip' ? 'max-md:translate-y-[calc(100%-54px-env(safe-area-inset-bottom,0px))]' : sheetPos === 'half' ? 'max-md:translate-y-[48%]' : 'max-md:translate-y-0'
          }`}
          style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}
          onTouchStart={e => { panelPull.current = { y: e.touches[0].clientY, atTop: (panelRef.current?.scrollTop ?? 0) <= 0 }; }}
          onTouchEnd={e => {
            const pull = panelPull.current; panelPull.current = null;
            if (!pull || !pull.atTop || sheetPos === 'strip') return;
            // The list is at its top and the finger pulled down: hand the
            // gesture to the sheet, so collapsing never fights the scroll
            if (e.changedTouches[0].clientY - pull.y > 70 && (panelRef.current?.scrollTop ?? 0) <= 0) sheetStep(-1);
          }}
        >
          {/* The strip: grab handle + scope title. Drag, swipe or tap to move the sheet. */}
          <div
            className="md:hidden sticky top-0 z-10 -mx-5 px-5 pt-2 pb-2 select-none"
            style={{ backgroundColor: systemColors.seaSalt, touchAction: 'none' }}
            onTouchStart={e => { e.stopPropagation(); sheetDrag.current = { y: e.touches[0].clientY, moved: false }; }}
            onTouchMove={e => {
              const d = sheetDrag.current, el = panelRef.current;
              if (!d || !el) return;
              let dy = e.touches[0].clientY - d.y;
              if (Math.abs(dy) > 4) d.moved = true;
              // Rubber-band past the ends instead of leaving the screen
              if (sheetPos === 'full') dy = Math.max(dy, -24);
              if (sheetPos === 'strip') dy = Math.min(dy, 24);
              el.style.transition = 'none';
              el.style.transform = `translateY(calc(${SHEET_Y[sheetPos]} + ${dy}px))`;
            }}
            onTouchEnd={e => {
              const d = sheetDrag.current, el = panelRef.current;
              sheetDrag.current = null;
              if (!d || !el) return;
              el.style.transition = ''; el.style.transform = '';
              const dy = e.changedTouches[0].clientY - d.y;
              if (d.moved) { sheetSwiped.current = true; window.setTimeout(() => { sheetSwiped.current = false; }, 400); }
              if (dy < -50) sheetStep(1); else if (dy > 50) sheetStep(-1);
            }}
            onClick={() => { if (!sheetSwiped.current) setSheetPos(p => (p === 'full' ? 'half' : p === 'half' ? 'full' : 'half')); }}
          >
            <div className="mx-auto mb-2 h-1 w-10 rounded-full" style={{ backgroundColor: systemColors.border }} />
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: systemColors.navy }}>
              {scope.level !== 'world' && <PlateDot color={scope.country.colorPalette.primary} size={12} />}
              <span>{scope.level === 'world' ? `${countries.length} cuisines` : scope.level === 'country' ? scope.country.name : getShortRegionName(scope.region.name)}</span>
              <span className="font-normal text-xs" style={{ color: systemColors.navyMuted }}>
                {scope.level === 'world' ? 'tap the map, or browse' : scope.level === 'country' ? `${allEntries.length} dishes & drinks` : `${counts[scope.region.name] ?? 0} ${(counts[scope.region.name] ?? 0) === 1 ? 'dish' : 'dishes'}`}
              </span>
              <span className="ml-auto text-base leading-none" style={{ color: systemColors.navyMuted }}>{sheetPos === 'full' ? '⌄' : '⌃'}</span>
            </div>
          </div>
          {panelLevel === 'world' && (
            <>
              <h2 className="max-md:hidden text-lg font-bold" style={{ color: systemColors.navy }}>{flavorMatches ? 'Where next' : '31 cuisines'}</h2>
              <p className="max-md:hidden text-sm mb-4" style={{ color: systemColors.navyMuted }}>{flavorMatches ? 'Closest to your taste first. Tap one on the map, or pick from the list.' : 'Tap one on the map, or pick from the list.'}</p>
              <div className="space-y-1.5">
                {worldList.map(({ c, progress, match }) => (
                  <button key={c.id} onClick={() => flyToCountry(c.id)} onMouseEnter={() => { if (canHover()) setHovered(c.id); }} onMouseLeave={() => setHovered(null)} className="w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left btn-press" style={{ backgroundColor: systemColors.surface, borderColor: hovered === c.id ? c.colorPalette.primary : systemColors.border }}>
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
              {peekCountry && (
                <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: systemColors.navyMuted }}>
                  <button onClick={() => setPeekId(null)} className="font-semibold" style={{ color: systemColors.tomato }}>‹ All cuisines</button>
                  <span className="ml-auto">Previewing · click it on the map to open its regions</span>
                </div>
              )}
              {/* On the phone the strip already names the country */}
              <div className="max-md:hidden flex items-center gap-2.5">
                <PlateDot color={colors.primary} size={14} />
                <h2 className="text-xl font-bold" style={{ color: systemColors.navy }}>{country.name}</h2>
                <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>{country.capital} · {country.region}</span>
              </div>
              <div className="md:hidden flex gap-2 mt-2.5">{pill('✦ Flavor fingerprint', () => setTray('flavor'))}{pill('📖 Food culture', () => setTray('culture'))}</div>
              {panelLevel === 'country' && (
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

              {panelLevel === 'country' && (
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
