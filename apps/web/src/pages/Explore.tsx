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
import { regionCoordinates } from '../data/regionMapConfig';
import { useDishes } from '../hooks/useDishes';
import { useCountryRanking } from '../hooks/useCountryRanking';
import { useWishlist } from '../hooks/useWishlist';
import { useDishFilters } from '../hooks/useDishFilters';
import { useCountryActivity } from '../hooks/useCountryActivity';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { countryDishProgress } from '../utils/dishProgress';
import { countryInSentence, groupEntries, regionCounts, acrossRegion, isAcrossRegion, ACROSS_GROUP_ID, type Entry, type Group } from '../utils/groupDishes';
import { entryWhere, isDrinkEntry } from '../utils/course';
import { homeLand, labelsFitAt, labelsInView, regionAreas, regionLabelName, seaLabelLayout, REGION_BORDER, REGION_INK, REGION_TINT, type RegionAreas, type SeaPlacement } from '../utils/regionAreas';
import { regionFromSlug, regionSlug } from '../utils/dishRegion';
import { cuisineMapTone, getCuisineFillColor, getFlavorMatchFillColor, FLAVOR_MATCH_LOGGED_STROKE, MAP_STROKE, type MapLayer } from '../components/map/mapUtils';
import { computeAllFlavorMatches } from '../components/map/flavorMatch';
import { MapPreviewCard } from '../components/map/MapPreviewCard';
import { AppBar } from '../components/AppBar';
import { ProfileButton } from '../components/ProfileButton';
import { PlateDot } from '../components/Wordmark';
import { ProgressPlate } from '../components/ProgressPlate';
import { CultureTrayBody, FlavorTrayBody } from '../components/explore/ExploreTrays';
import { LensControls } from '../components/country-detail/LensControls';
import type { EntryGridActions } from '../components/country-detail/EntryGrid';
import { CountryOverview } from '../components/explore/CountryOverview';
import { AllDishesList, ArrangeToggle, BackLink, RegionView, type Arrangement } from '../components/explore/PanelLevels';
import { DishDetail } from '../components/explore/DishDetailSheet';
import { CuisinePicker } from '../components/explore/CuisinePicker';
import { MenuLookup } from '../components/MenuLookup';
import { MapPlates, WorldPlates } from '../components/explore/MapPlates';
import { plateLayout, countryHomes, regionUnits, acrossAt, acrossRing, COUNTRY_R, type RegionUnit } from '../utils/plateLayout';
import { plateFade } from '../utils/plateFade';
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
// Region names while dish plates show: present, but behind the food
const QUIET_INK = '#9C7F77';
const COUNTRY_IN = 2.2;  // a framed country is always at least this close
const REGION_IN = 4.6;   // and a framed region at least this
const MAX_ZOOM = 220;  // Jamaica needs ~140× to fill the frame
const FLY_MS = 700;
// Desktop: the panel floats over a full-bleed map as a card this wide, inset
// PANEL_GAP from the edges, and can be tucked away to leave the map alone.
const PANEL_W = 440;
const PANEL_GAP = 12;
// The phone sheet's three resting heights; the drag handler builds on the
// same expressions, so classes and finger math can never disagree.
/** Fraction of the map left visible above the sheet at half (the sheet's top sits at 48%). */
const SHEET_HALF = 0.48;

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
const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;
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

// The Explored / Flavor Match switch; off while Flavor Match is out of the MVP
const SHOW_LAYER_TOGGLE = false;

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
  // Flavor Match is out of the MVP (2026-09-29): one map, no layer toggle
  const layer: MapLayer = SHOW_LAYER_TOGGLE && hasEnoughData ? storedLayer : 'explored';
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
  // The view's centre in base projected px, live through drags and flights,
  // so the dish plates can tell what's on screen
  const [liveCenter, setLiveCenter] = useState<[number, number]>(() => baseProjection(WORLD_CENTER) as [number, number]);
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
  // The country level has two panel views (#39): the overview, and every dish
  // grouped by region one step down. The region level is the scope's own.
  const [countryView, setCountryView] = useState<'overview' | 'all' | 'flavor' | 'culture'>('overview');
  // How All dishes is arranged (Nikita, 2026-10-02): ranked for you by
  // default, or grouped by region. Same dishes either way; only the order.
  const [arrangement, setArrangement] = useState<Arrangement>('ranked');
  // The map's search (Nikita, 2026-10-02: "a search in the map instead of
  // an Order well button"): a cuisine picker that lands on the country's
  // overview, where "Start with these" is already ranked for you
  const [pickerOpen, setPickerOpen] = useState(false);
  // The dish detail level, by entry key (it follows the entry as it's logged).
  // It sits one level below whatever the panel showed when it opened; the
  // level underneath stays put, so closing it is just clearing this.
  const [detailKey, setDetailKey] = useState<string | null>(null);
  // Phone bottom sheet: 'strip' docks a slim header at the bottom (the map is
  // the app), 'half' shows map + list, 'full' is all list. Desktop ignores it:
  // every class it drives is max-md scoped.
  const [sheetPos, setSheetPos] = useState<'strip' | 'half' | 'full'>('strip');
  // Where the sheet and the list were when a dish opened, to return there
  const detailFrom = useRef<{ sheet: 'strip' | 'half' | 'full'; scroll: number } | null>(null);
  // Desktop panel: tucked away at world level (the map is the experience),
  // out when a country is opened, and yours to toggle anytime. Collapsing it
  // is a "let me see the map" choice, so it stays collapsed while you keep
  // exploring the same country (regions, zoom, pan); a different country, a
  // dish plate, or the tab itself brings it back.
  const [panelOpen, setPanelOpen] = useState(false);
  const panelOpenRef = useRef(panelOpen);
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
  // The map's visible size in base-projection units, kept in state so render
  // never reads the box itself
  const [viewSize, setViewSize] = useState<readonly [number, number]>([VIEW_W, VIEW_H]);
  // The same, minus the open desktop panel: what a country is framed into
  const [viewBeside, setViewBeside] = useState<readonly [number, number]>([VIEW_W, VIEW_H]);
  useEffect(() => {
    const el = mapBox.current; if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect(); if (!b.width || !b.height) return;
      const k = Math.min(b.width / VIEW_W, b.height / VIEW_H);
      setViewSize([b.width / k, b.height / k]);
      const covered = isDesktop() ? PANEL_W + PANEL_GAP * 2 : 0;
      setViewBeside([(b.width - covered) / k, b.height / k]);
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const viewDims = (besidePanel = false): readonly [number, number] => {
    const box = mapBox.current?.getBoundingClientRect();
    if (!box?.width || !box?.height) return [VIEW_W, VIEW_H];
    const k = Math.min(box.width / VIEW_W, box.height / VIEW_H);
    // Beside the open desktop panel, only the map left of the card is seen
    const covered = besidePanel && isDesktop() ? PANEL_W + PANEL_GAP * 2 : 0;
    return [(box.width - covered) / k, box.height / k];
  };
  /** Base-projection px to move the camera centre right so whatever it frames
   *  sits in the middle of the map left of the open desktop panel. */
  const panelShift = (zoom: number) => {
    const box = mapBox.current?.getBoundingClientRect();
    if (!isDesktop() || !box?.width || !box?.height) return 0;
    const k = Math.min(box.width / VIEW_W, box.height / VIEW_H);
    return (PANEL_W + PANEL_GAP * 2) / 2 / k / zoom;
  };
  const shifted = (c: [number, number], zoom: number, dir: 1 | -1 = 1): [number, number] => {
    const sh = panelShift(zoom);
    if (!sh) return c;
    const p = baseProjection(c)!;
    return (baseProjection.invert?.([p[0] + dir * sh, p[1]]) as [number, number]) ?? c;
  };
  /** Tuck the panel away or bring it back; the camera pans by half the card
   *  so what you were looking at stays centred in the visible map. */
  const togglePanel = (open: boolean) => {
    setPanelOpen(open);
    if (scopeRef.current.level === 'world' || !isDesktop()) return;
    const cam = cameraRef.current;
    flyTo({ coordinates: shifted(cam.coordinates, cam.zoom, open ? 1 : -1), zoom: cam.zoom }, undefined, 380);
  };

  /** The breadcrumb's current crumb and the strip both raise the sheet.
   *  Coming up from the strip always lands on the overview, at half. */
  const openSheet = () => {
    if (sheetPos === 'strip') raiseFromStrip();
    else setSheetPos('full');
  };
  /** Strip → half. At country level that's the overview, and the camera
   *  re-aims so the country sits in the map that stays visible above the sheet. */
  const raiseFromStrip = () => {
    setCountryView('overview');
    setSheetPos('half');
    const s = scopeRef.current;
    if (s.level !== 'country' || !window.matchMedia('(max-width: 767px)').matches) return;
    const feat = features.get(s.country.id);
    if (!feat) return;
    const [vw, vh] = viewDims();
    const visibleH = vh * SHEET_HALF;
    const { coordinates: c, zoom } = frameCountry(s.country, feat, [vw, visibleH]);
    // Screen centre is behind the sheet: put the country's centre in the middle
    // of the visible band, which is (0.5 - SHEET_HALF/2) of the view above it
    const p = baseProjection(c)!;
    const coordinates = (baseProjection.invert?.([p[0], p[1] + ((0.5 - SHEET_HALF / 2) * vh) / zoom]) as [number, number]) ?? c;
    flyTo({ coordinates, zoom });
  };
  const filters = useDishFilters();
  const flight = useRef<number | null>(null);
  // The zoom a country actually lands at (flyToCountry may zoom past the bare
  // frame so its names fit): where dish plates start their glide from
  const [landingZoom, setLandingZoom] = useState<{ id: string; zoom: number } | null>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const sameCountry = (s: Scope, id: string) => s.level !== 'world' && s.country.id === id;
  /** Whether the desktop panel will be out once the camera lands on `id`:
   *  it is now, or `id` is a new country (which opens it). Framing and the
   *  panel shift follow this, so a region tap on a collapsed panel lands the
   *  region in the middle of the whole map, not beside a card that isn't there. */
  const panelWillShow = (id: string) => isDesktop() && (panelOpenRef.current || !sameCountry(scopeRef.current, id));

  const commitScope = (next: Scope) => {
    const cur = scopeRef.current;
    const same = cur.level === next.level
      && (cur.level === 'world' || (next.level !== 'world' && cur.country.id === next.country.id))
      && (cur.level !== 'region' || (next.level === 'region' && cur.region.name === next.region.name));
    if (same) return;
    setScope(next);
    scopeRef.current = next;
    // The desktop panel opens for a new country and tucks away at world;
    // moving between a country and its regions leaves it however you set it
    if (next.level === 'world') { setPanelOpen(false); panelOpenRef.current = false; }
    else if (!sameCountry(cur, next.country.id)) { setPanelOpen(true); panelOpenRef.current = true; }
    // Peek is a world-level idea; entering a country or region retires it, so
    // zooming back out later lands on the world list, not a stale preview
    if (next.level !== 'world') { cancelPeek(); setPeekId(null); }
    setCountryView('overview');
    setDetailKey(null);
    const params = new URLSearchParams();
    if (next.level !== 'world') params.set('c', next.country.id);
    if (next.level === 'region') params.set('r', regionSlug(next.region.name));
    setSearchParams(params, { replace: true });
    panelRef.current?.scrollTo({ top: 0 });
  };

  /** Zooming and panning only move the camera. What the panel describes
   *  changes when you click a country or a region (or the breadcrumb / Esc). */
  const onMove = ({ x, y, zoom, dragging }: { x: number; y: number; zoom: number; dragging: unknown }) => {
    if (flight.current && dragging) { cancelAnimationFrame(flight.current); flight.current = null; }
    if (flight.current) return;
    setLiveZoom(zoom);
    setLiveCenter([(VIEW_W / 2 - x) / zoom, (VIEW_H / 2 - y) / zoom]);
  };

  const onMoveEnd = ({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => {
    if (flight.current) return;
    cameraRef.current = { coordinates, zoom };
    setCamera({ coordinates, zoom });
    setLiveZoom(zoom);
    setLiveCenter(baseProjection(coordinates) as [number, number]);
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
      cameraRef.current = next; setCamera(next); setLiveZoom(next.zoom); setLiveCenter(baseProjection(next.coordinates) as [number, number]);
      if (t < 1) flight.current = requestAnimationFrame(step);
      else flight.current = null;
    };
    if (then) commitScope(then);
    flight.current = requestAnimationFrame(step);
  };
  // The world view: the 31 cuisines' land framed into the screen, rather than
  // zoom 1 at the equator, which on a tall phone is mostly Arctic sea and
  // Antarctica. On a desktop this comes out at zoom 1 anyway (the width is
  // the limit); on a phone it is ~1.3, centred on the inhabited band.
  // The 31 cuisines' land, in base projected px: what the world view frames
  // and how far the map can be panned
  const landBox = useMemo(() => {
    if (!features.size) return null;
    const path = geoPath(baseProjection);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [id, f] of features) {
      const [[a, b], [c, d]] = path.bounds(homeLand(id, f, baseProjection));
      x0 = Math.min(x0, a); y0 = Math.min(y0, b); x1 = Math.max(x1, c); y1 = Math.max(y1, d);
    }
    return { x0, y0, x1, y1 };
  }, [features]);
  // Panning stops at the cuisines (with a margin), so the empty poles and the
  // blank beyond Antarctica are never on screen (Nikita, 2026-10-01). d3-zoom
  // centres the band when it is shorter than the view, as on a phone.
  const panExtent = useMemo<[[number, number], [number, number]]>(() => {
    if (!landBox) return [[0, 0], [VIEW_W, VIEW_H]];
    const pad = 48;
    return [[landBox.x0 - pad, landBox.y0 - pad], [landBox.x1 + pad, landBox.y1 + pad]];
  }, [landBox]);
  const worldHome = useMemo<Camera>(() => {
    if (!landBox) return { coordinates: WORLD_CENTER, zoom: 1 };
    const { x0, y0, x1, y1 } = landBox;
    const pad = 20;
    const zoom = Math.max(1, Math.min(2, viewSize[0] / (x1 - x0 + pad * 2), viewSize[1] / (y1 - y0 + pad * 2)));
    const coordinates = baseProjection.invert!([(x0 + x1) / 2, (y0 + y1) / 2]) as [number, number];
    return zoom > 1.01 ? { coordinates, zoom } : { coordinates: WORLD_CENTER, zoom: 1 };
  }, [landBox, viewSize]);
  const flyToWorld = () => { cancelPeek(); setPeekId(null); setSheetPos('strip'); flyTo(worldHome, { level: 'world' }); };
  const flyToCountry = (id: string, opts?: { view?: 'overview' | 'all' | 'flavor' | 'culture' }) => {
    const feat = features.get(id), country = getCountryById(id);
    if (!feat || !country) return;
    cancelPeek(); setPeekId(null); setTooltip(null);
    // Land on the map; the strip is the handle into the list. The region's
    // "‹ All dishes" link (and Esc) is a step up inside the sheet, so it keeps
    // it open, at full like any All-dishes view.
    setSheetPos(p => (opts?.view === 'all' && p !== 'strip' ? 'full' : 'strip'));
    // Land where every region's name fits: nudge in from the mainland framing
    // until they do (tall, thin countries need it)
    const beside = panelWillShow(id);
    const cam = frameCountry(country, feat, viewDims(beside));
    const areas = hasRegionMap(country) ? getAreas(country, feat) : null;
    if (areas) {
      const counts = staticRegionCounts(country);
      const floor = Math.max(1, 0.75 * labelBoost);
      const view = viewDims(beside);
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
    setLandingZoom({ id: country.id, zoom: cam.zoom });
    flyTo({ coordinates: beside ? shifted(cam.coordinates, cam.zoom) : cam.coordinates, zoom: cam.zoom }, { level: 'country', country });
    // After flyTo: committing the scope resets the view to the overview
    setCountryView(opts?.view ?? 'overview');
    setDetailKey(null);
  };
  /** A cuisine picked from the search: fly to it with the sheet at half, so
   *  the four ranked dishes are in view the moment the map lands. */
  const openFound = (id: string) => {
    setPickerOpen(false);
    setArrangement('ranked');
    flyToCountry(id);
    setSheetPos('half');
    if (isDesktop() && !panelOpenRef.current) togglePanel(true);
  };
  const flyToRegion = (country: Country, region: RegionalCuisine) => {
    // "Across {country}" lives at the sea cluster's water point
    const c = isAcrossRegion(region) ? acrossAt(country.id) : regionCoordinates[country.id]?.[region.name]; if (!c) return;
    setSheetPos('half'); // a region tap shows its dishes while the map stays in view
    const beside = panelWillShow(country.id);
    const feat = features.get(country.id);
    const fit = feat ? frameCountry(country, feat, viewDims(beside)).zoom : COUNTRY_IN;
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
    } else if (beside) coordinates = shifted(c, zoom);
    flyTo({ coordinates, zoom }, { level: 'region', country, region });
  };
  const zoomOutOneLevel = () => {
    if (scope.level === 'region') flyToCountry(scope.country.id, { view: 'all' });
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
      const region = c?.regionalVariations?.find(r => r.name === regionName) ?? (c && regionName === acrossRegion(c).name ? acrossRegion(c) : undefined);
      if (c && region && !(s.level === 'region' && s.region.name === regionName)) flyToRegion(c, region);
      return;
    }
    const id = hit.getAttribute('data-c');
    if (id && !(s.level !== 'world' && s.country.id === id)) flyToCountry(id);
  };

  // react-simple-maps re-attaches d3-zoom whenever these handlers change
  // identity, which (with a fresh closure every render) was every frame of a
  // pinch. Hand it stable wrappers that call the latest version.
  const handlers = useRef({ onMove, onMoveEnd, onTap, flyToWorld });
  useLayoutEffect(() => {
    cameraRef.current = camera; scopeRef.current = scope; panelOpenRef.current = panelOpen;
    handlers.current = { onMove, onMoveEnd, onTap, flyToWorld };
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
      const target = s.target as Element | null;
      if (target?.closest?.('button, a')) return;
      // A dish plate: d3-zoom eats the touch before the browser makes a click
      // of it on iOS, so make the click here
      const plate = target?.closest?.('[data-plate]');
      if (plate) { e.preventDefault(); plate.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
      const hit = target?.closest?.('[data-r], [data-c]');
      if (!hit) {
        // A tap on open sea with a country open is "take me back": the world
        // view, nothing selected (decided 2026-10-01). At world level it means
        // you're looking at the map: a half sheet steps aside
        if (scopeRef.current.level !== 'world') { e.preventDefault(); handlers.current.flyToWorld(); return; }
        setSheetPos(p => (p === 'half' ? 'strip' : p));
        return;
      }
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
    const c = searchParams.get('c'), r = searchParams.get('r'), find = searchParams.get('find') !== null;
    const country = c ? getCountryById(c) : undefined;
    // The old /restaurant link arrives as ?find=1 and opens the search;
    // /restaurant/:id lands on the country like any ?c link
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!country) { if (find) { setPickerOpen(true); setSearchParams({}, { replace: true }); } return; }
    const region = r ? (regionFromSlug(r, country.regionalVariations, country.id) ?? (r === regionSlug(acrossRegion(country).name) ? acrossRegion(country) : undefined)) : undefined;
    // A one-time landing once the outlines arrive, not a state sync
    if (region) flyToRegion(country, region); else flyToCountry(country.id);
  }, [features]); // eslint-disable-line react-hooks/exhaustive-deps
  // No deep link: open on the world home, in place (nothing to animate from)
  const homed = useRef(false);
  useEffect(() => {
    if (homed.current || features.size === 0 || searchParams.get('c')) return;
    homed.current = true;
    const home = worldHome;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cameraRef.current = home; setCamera(home); setLiveZoom(home.zoom); setLiveCenter(baseProjection(home.coordinates) as [number, number]);
  }, [features, worldHome]); // eslint-disable-line react-hooks/exhaustive-deps


  // ---- panel data ----
  const peekCountry = scope.level === 'world' && peekId ? getCountryById(peekId) : undefined;
  const country = scope.level === 'world' ? peekCountry : scope.country;
  // A peeked country fills the panel exactly as an opened one does
  const panelLevel: Scope['level'] = scope.level === 'world' ? (peekCountry ? 'country' : 'world') : scope.level;
  const colors = country?.colorPalette;
  const regions = country?.regionalVariations;
  const countryDishes = useMemo(() => (country ? getDishesByCountry(country.id) : []), [country, getDishesByCountry]);
  // The personal ranking (Order well's scoring) behind "Start with these",
  // the Ranked arrangement and the dish sheet's why line
  const ranking = useCountryRanking(country, countryDishes, isOnWishlist, dishes.length > 0 || wishlist.length > 0);
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
  // Explore always groups by region (#39); a country without regions is one "Across" bucket
  // Food by region, drinks as one strip at the end (#39, option 2). When the
  // filters leave only drinks, there's no food to sit above them, so the
  // drinks take the grouped tile grid themselves.
  const [foodVisible, drinksVisible] = useMemo(() => [visible.filter(e => !isDrinkEntry(e)), visible.filter(isDrinkEntry)], [visible]);
  const drinksOnly = foodVisible.length === 0 && drinksVisible.length > 0;
  const groups = useMemo(() => (country ? groupEntries(drinksOnly ? drinksVisible : foodVisible, 'region', { regions, countryId: country.id, countryName: country.name, orphansAcross: true }) : []), [country, drinksOnly, drinksVisible, foodVisible, regions]);
  // Ranked: the visible food as one flat run in rank order (your own dishes,
  // which have no rank, last); drinks keep their strip after it. Grouping
  // never changes which dishes show, only how they're arranged.
  const rankOfEntry = (entry: Entry) => (entry.kind === 'dish' ? ranking.rankOf(entry.dish)?.rank : undefined);
  const rankedGroups = useMemo<Group[]>(() => {
    if (drinksOnly) return groups;
    const entries = [...foodVisible].sort((a, b) => (rankOfEntry(a) ?? Infinity) - (rankOfEntry(b) ?? Infinity));
    return [{ id: 'ranked', label: '', entries }];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinksOnly, groups, foodVisible, ranking]);
  const whereFor = (entry: Entry) => (country ? entryWhere(entry, regions, country.id) : 'Everywhere');
  const counts = useMemo(() => (country ? regionCounts(allEntries, regions, country.id) : {}), [country, allEntries, regions]);
  // Every entry by region, unfiltered: what the map's dish plates draw from
  const mapGroups = useMemo(() => (country ? groupEntries(allEntries, 'region', { regions, countryId: country.id, countryName: country.name, orphansAcross: true }) : []), [country, allEntries, regions]);
  const triedCount = allEntries.filter(e => e.kind === 'custom' || e.tried).length;
  const actions: EntryGridActions | null = country ? {
    countryId: country.id,
    onAddDish: ({ name, kind }) => addDish({ countryId: country.id, name, kind, restaurantTries: [] }),
    onUpdateDish: updateDish, onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry, onUpdateRestaurantTry: updateRestaurantTry, onDeleteRestaurantTry: deleteRestaurantTry,
    isOnWishlist, addToWishlist, removeFromWishlist, findWishlistItem,
  } : null;
  const isWanted = (entry: Entry) => !!country && entry.kind !== 'custom' && !(entry.tried) && isOnWishlist(country.id, entry.kind === 'dish' ? entry.dish.name : entry.drink.name);
  /** Open a dish one level down from wherever the panel is. The phone sheet
   *  rises to full; a collapsed desktop panel comes out (the detail needs it). */
  const openDish = (key: string) => {
    if (!detailKey) detailFrom.current = { sheet: sheetPos, scroll: panelRef.current?.scrollTop ?? 0 };
    setDetailKey(key);
    setSheetPos('full');
    if (isDesktop() && !panelOpenRef.current) togglePanel(true);
    panelRef.current?.scrollTo({ top: 0 });
  };
  /** Back to the level the dish opened from: the sheet where it was (a strip
   *  becomes half, since you asked for that level), the list where you left it. */
  const closeDetail = () => {
    const from = detailFrom.current; detailFrom.current = null;
    setDetailKey(null);
    if (from) setSheetPos(from.sheet === 'strip' ? 'half' : from.sheet);
    requestAnimationFrame(() => panelRef.current?.scrollTo({ top: from?.scroll ?? 0 }));
  };
  const detailEntry = detailKey ? allEntries.find(e => e.key === detailKey) ?? null : null;
  // The back link names the level underneath: the region, All dishes, or the country
  // The sheet's title. A region alone ("North") loses the country once you're
  // a level deep in a dish, so the region level reads "India · North".
  const sheetTitle = scope.level === 'world' ? 'World' : scope.level === 'country' ? scope.country.name : `${scope.country.name} · ${regionLabelName(scope.region.name)}`;
  const detailBackLabel = !country ? '' : scope.level === 'region' ? regionLabelName(scope.region.name) : countryView === 'all' ? 'All dishes' : country.name;
  // Esc steps up one level (dish → where it opened from; All dishes, flavor
  // or culture → overview → world)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      // A tray that is open (the filters) takes Esc for itself
      if (document.querySelector('[role="dialog"][aria-hidden="false"]')) return;
      if (detailKey) { closeDetail(); return; }
      if (panelLevel === 'country' && countryView !== 'overview') { setCountryView('overview'); return; }
      zoomOutOneLevel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const regionEntries = useMemo(() => {
    if (!country || scope.level !== 'region') return [];
    // The region level shows everything from there; search and filters belong to All dishes
    const across = isAcrossRegion(scope.region);
    return groupEntries(allEntries, 'region', { regions, countryId: country.id, countryName: country.name, orphansAcross: true }).find(g => (across ? g.id === ACROSS_GROUP_ID : g.region?.name === scope.region.name))?.entries ?? [];
  }, [country, scope, allEntries, regions]);
  const openCountryView = (view: 'all' | 'flavor' | 'culture') => {
    setCountryView(view);
    setSheetPos('full');
    panelRef.current?.scrollTo({ top: 0 });
  };
  const seeAll = () => openCountryView('all');
  const backToOverview = () => {
    setCountryView('overview');
    panelRef.current?.scrollTo({ top: 0 });
  };

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
  // Every country's region units, for the world pins: each region's top dish
  // at the spot the country zoom gives it (the same cached placement), so
  // nothing moves as you zoom in
  const worldUnits = useMemo(() => {
    const out = new Map<string, RegionUnit[]>();
    for (const c of countries) {
      const feat = features.get(c.id); if (!feat) continue;
      const a = getAreas(c, feat);
      if (!a) { out.set(c.id, []); continue; }
      const entries: Entry[] = [
        ...c.popularDishes.map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish })),
        ...(c.popularBeverages ?? []).map<Entry>(drink => ({ kind: 'drink', key: `b:${drink.name}`, drink })),
      ];
      const groups = groupEntries(entries, 'region', { regions: c.regionalVariations, countryId: c.id, countryName: c.name, orphansAcross: true });
      const fit = frameCountry(c, feat, viewBeside).zoom;
      out.set(c.id, regionUnits(countryHomes(a, groups, baseProjection, c.id, c.name, fit, labelScaleAt(fit) * labelBoost)));
    }
    return out;
  }, [features, viewBeside, labelBoost]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  // The SVG group above the region names where a hovered plate's caption renders
  const [plateCaptionLayer, setPlateCaptionLayer] = useState<SVGGElement | null>(null);
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
  // Once dish plates show, the regions' dish-count lines step aside at every
  // zoom: the plates say what's there, and the panel has the counts
  // The zoom that frames the open country: the plates' "one dish" baseline
  const fitZoom = useMemo(() => {
    if (bubbleCountry && landingZoom?.id === bubbleCountry.id) return landingZoom.zoom;
    const feat = bubbleCountry && features.get(bubbleCountry.id);
    return bubbleCountry && feat ? frameCountry(bubbleCountry, feat, viewBeside).zoom : 1;
  }, [bubbleCountry, features, viewBeside, landingZoom]);
  const mapPlates = useMemo(() => {
    // Whether names fit inline doesn't matter here: plates draw either way
    if (!showBubbles || !areas || scope.level === 'world' || plateFade(areas, liveZoom) === 0) return [];
    return plateLayout({ areas, groups: mapGroups, region: scope.level === 'region' ? scope.region : undefined, zoom: liveZoom, labelScale, projection: baseProjection, countryId: scope.country.id, countryName: scope.country.name, center: liveCenter, view: viewSize, fitZoom, fitScale: labelScaleAt(fitZoom) * labelBoost });
  }, [showBubbles, areas, scope, liveZoom, mapGroups, labelScale, liveCenter, fitZoom, viewSize, labelBoost]);
  const platesShowing = mapPlates.length > 0;
  // A region's cap steps up or down off any plate sitting on its anchor
  // (Nikita, 2026-10-01: never a name over a picture). Offsets in the cap's
  // own units (the labelScale group), picked once per render from the plates
  // actually on the map.
  // A cap that can find no clear spot fades out instead of sitting under
  // something (Nikita, 2026-10-02: the one in the background goes
  // transparent). The "Across {country}" label at sea counts as a neighbour
  // too, since it is drawn by the plates layer and not by this loop.
  const { lift: capLift, hidden: capHidden } = useMemo(() => {
    const lift: Record<string, [number, number]> = {};
    const hidden = new Set<string>();
    if (!areas || !mapPlates.length) return { lift, hidden };
    const R = (COUNTRY_R + 2.5) * labelScale;
    // Where each plate really is. On touch the nationwide dishes sit on a
    // ring around the "Across" pill (MapPlates draws them there, not at
    // their stacked lift), so the ring is what the caps have to avoid.
    const hover = canHover();
    const acrossN = mapPlates.find(p => p.across)?.across?.n ?? 0;
    const ring = !hover && acrossN > 1 ? acrossRing(acrossN) : undefined;
    const plates = mapPlates.map(p => {
      const [x, y] = baseProjection(p.at) as [number, number];
      const lift = p.across && ring ? ring.at(p.across.i) : p.lift;
      return [x * liveZoom + lift[0] * labelScale, y * liveZoom + lift[1] * labelScale] as [number, number];
    });
    // Caps placed so far, as boxes, so a cap that steps aside doesn't land on a neighbour's
    const placedCaps: [number, number, number, number][] = [];
    const hub = mapPlates.find(p => p.across?.i === 0);
    if (hub && bubbleCountry) {
      // With hover the label hangs under the hub; on touch it is the hub's pill
      const [hx, hy] = baseProjection(hub.at) as [number, number];
      const cx = hx * liveZoom, cy = hy * liveZoom + (hover ? (COUNTRY_R + 18) * labelScale : 0);
      const halfW = (acrossRegion(bubbleCountry).name.length * 9.5 * 0.68 * labelScale) / 2 + 4, halfH = 7 * labelScale;
      placedCaps.push([cx - halfW, cy - halfH, cx + halfW, cy + halfH]);
    }
    for (const { region, anchorPx } of areas.areas) {
      const cx = anchorPx[0] * liveZoom, cy = anchorPx[1] * liveZoom;
      const halfW = (regionLabelName(region.name).length * 9.5 * 0.68 * labelScale) / 2 + 4, halfH = 7 * labelScale;
      const clear = ([dx, dy]: [number, number]) =>
        plates.every(([px, py]) => Math.abs(px - (cx + dx)) > halfW + R || Math.abs(py - (cy + dy)) > halfH + R) &&
        placedCaps.every(([x0, y0, x1, y1]) => cx + dx + halfW + 6 < x0 || cx + dx - halfW - 6 > x1 || cy + dy + halfH + 4 < y0 || cy + dy - halfH - 4 > y1);
      const step = R + halfH + 6, side = halfW + R + 6;
      const tries: [number, number][] = [[0, 0], [0, -step], [0, step], [-side, 0], [side, 0], [0, -2 * step], [0, 2 * step], [-side, -step], [side, -step], [-side, step], [side, step]];
      const found = tries.find(clear);
      const move = found ?? [0, 0];
      // A hidden cap claims no space, so the next one isn't pushed off by a ghost
      if (found) placedCaps.push([cx + move[0] - halfW, cy + move[1] - halfH, cx + move[0] + halfW, cy + move[1] + halfH]);
      else hidden.add(region.name);
      if (move[0] || move[1]) lift[region.name] = [move[0] / labelScale, move[1] / labelScale];
    }
    return { lift, hidden };
  }, [areas, mapPlates, labelScale, liveZoom, bubbleCountry]);
  // Region names are small quiet caps at every zoom and for every country
  // (Nikita, 2026-10-01), whether or not it has plates yet, so the style
  // never flips between countries or levels; the open region's cap keeps
  // full ink, the others dim. Countries without plates keep their dish
  // count under the cap.
  const quietNames = scope.level !== 'world';
  // Caps fade out with the plates as the country shrinks on screen, so a
  // selected region zoomed out to the world leaves no pile of names behind
  const capFade = areas ? plateFade(areas, liveZoom) : 0;
  // Quiet caps are small enough to always sit on the land, so the at-sea fallback is for the full names only
  const showSea = !!seaLayout && !labelsFit && !quietNames && liveZoom >= seaLayout.zoom * 0.85;
  const scopeKey = scope.level === 'world' ? (peekCountry ? `c:${peekCountry.id}` : 'world') : scope.level === 'country' ? `c:${scope.country.id}` : `r:${scope.country.id}:${scope.region.name}`;

  return (
    <div className="h-dvh flex flex-col" style={{ backgroundColor: systemColors.seaSalt }}>
      {/* One row on a phone: one short restaurant label, icon-only profile, 44px targets */}
      <AppBar fullBleed actions={<span className="flex items-center gap-1.5 md:gap-4">
        <Link
          to="/wishlist"
          aria-label={`Want to try (${wishlist.length})`}
          title="Want to try"
          className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 max-md:min-h-11"
          style={{ color: systemColors.navy }}
        >
          <span
            className="p-2 max-md:p-0 max-md:w-11 max-md:h-11 max-md:items-center max-md:justify-center rounded-full inline-flex"
            style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
          >
            <svg className="w-4 h-4" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </span>
          {wishlist.length > 0 && <span>{wishlist.length}</span>}
        </Link>
        <ProfileButton compact />
      </span>} />

      {/* Phone: map on top, panel as a sheet below. Desktop: side by side. */}
      <div className="flex-1 min-h-0 relative" style={{ '--panel-x': panelOpen ? `${PANEL_W + PANEL_GAP}px` : '0px' } as React.CSSProperties}>
        {/* ============ map ============ */}
        <div
          ref={mapBox}
          className="map-container explore-map absolute inset-0 min-h-0 select-none"
          data-zoom={liveZoom.toFixed(2)}
          data-scope={scope.level}
          // touch-action none: a pinch or drag on the map is for the map, not the page
          style={{ backgroundColor: systemColors.seaSalt, touchAction: 'none' }}
          onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); if (tooltip) setTooltip(t => t && { ...t, x: e.clientX - r.left, y: e.clientY - r.top - 10 }); }}
          onPointerDown={e => { if (e.button === 0) e.currentTarget.classList.add('is-dragging'); }}
          onPointerUp={e => e.currentTarget.classList.remove('is-dragging')}
          onMouseLeave={e => { e.currentTarget.classList.remove('is-dragging'); setHovered(null); setTooltip(null); }}
        >
          {/* breadcrumb, and the search beside it: the way to any cuisine in two taps */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            aria-label="Search cuisines"
            aria-haspopup="dialog"
            className="btn-press w-11 h-11 md:w-9 md:h-9 rounded-lg border shadow-sm flex items-center justify-center"
            style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border, color: systemColors.navy }}
            data-map-search
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          </button>
          <div className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm shadow-sm min-h-11 md:min-h-9" style={{ backgroundColor: `${systemColors.surface}F0`, borderColor: systemColors.border }}>
            <button onClick={() => (scope.level === 'world' ? openSheet() : flyToWorld())} className="font-semibold" style={{ color: scope.level === 'world' ? systemColors.navy : systemColors.navyMuted }}>World</button>
            {scope.level !== 'world' && <><span style={{ color: systemColors.navyMuted }}>›</span><button onClick={() => (scope.level === 'country' ? openSheet() : flyToCountry(scope.country.id))} className="font-semibold" style={{ color: scope.level === 'country' ? systemColors.navy : systemColors.navyMuted }}>{scope.country.name}</button></>}
            {scope.level === 'region' && <><span style={{ color: systemColors.navyMuted }}>›</span><button onClick={openSheet} className="font-semibold" style={{ color: systemColors.navy }}>{regionLabelName(scope.region.name)}</button></>}
          </div>
          </div>
          {/* layer toggle, world level only */}
          {SHOW_LAYER_TOGGLE && scope.level === 'world' && (
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
          {/* Phone: the zoom buttons ride above the sheet (it covered them at half, #8) and leave with the map at full */}
          <div className={`absolute bottom-3 right-3 md:right-[calc(var(--panel-x)+12px)] md:transition-[right] md:duration-300 max-md:transition-[bottom] max-md:duration-300 z-10 flex flex-col gap-1 ${sheetPos === 'half' ? 'max-md:bottom-[calc(52%+12px)]' : sheetPos === 'full' ? 'max-md:hidden' : 'max-md:bottom-[calc(44px+12px+env(safe-area-inset-bottom,0px))]'}`} data-zoom-controls>
            <button onClick={() => flyTo({ coordinates: camera.coordinates, zoom: Math.min(MAX_ZOOM, camera.zoom * 1.7) })} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom in">+</button>
            <button onClick={() => { const z = Math.max(1, camera.zoom / 1.7); flyTo({ coordinates: camera.coordinates, zoom: z }); }} className="w-8 h-8 rounded-md border font-bold shadow-sm" style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }} aria-label="Zoom out">−</button>
          </div>

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: BASE_SCALE, center: WORLD_CENTER }} width={VIEW_W} height={VIEW_H} style={{ width: '100%', height: '100%' }}>
            <ZoomableGroup
              center={camera.coordinates}
              zoom={camera.zoom}
              minZoom={1}
              maxZoom={MAX_ZOOM}
              translateExtent={panExtent}
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
                  const baseFill = flavorMatches ? getFlavorMatchFillColor(match?.score, isHovered, matchDomain) : getCuisineFillColor(state, isHovered, alpha2 && profiled ? cuisineMapTone(alpha2, getCountryById(alpha2)?.colorPalette.primary ?? '') : undefined, alpha2 ? exploredDepth.get(alpha2) : undefined);
                  const fill = isScoped && colors ? `${colors.primary}2E` : baseFill;
                  const isLogged = state === 'hasDishes';
                  const stroke = isScoped && colors ? colors.primary : isHovered ? MAP_STROKE.hover : isLogged && flavorMatches ? FLAVOR_MATCH_LOGGED_STROKE : MAP_STROKE.default;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={(isScoped ? 1.4 : isHovered ? 1 : 0.5) / liveZoom}
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
                          {/* Dish plates sit at their places, under the names (#36 preview) */}
                    {showBubbles && areas && bubbleCountry && (
                      <MapPlates
                        countryId={bubbleCountry.id}
                        countryName={bubbleCountry.name}
                        areas={areas}
                        groups={mapGroups}
                        region={scope.level === 'region' ? scope.region : undefined}
                        projection={baseProjection}
                        zoom={liveZoom}
                        labelScale={labelScale}
                        captions={canHover()}
                        captionLayer={plateCaptionLayer}
                        center={liveCenter}
                        view={viewSize}
                        fitZoom={fitZoom}
                        fitScale={labelScaleAt(fitZoom) * labelBoost}
                        onOpenDish={entry => openDish(entry.key)}
                        onOpenAcross={() => flyToRegion(bubbleCountry, acrossRegion(bubbleCountry))}
                        acrossSelected={scope.level === 'region' && isAcrossRegion(scope.region)}
                      />
                    )}
                    {areas.areas.map(({ region, anchor }) => {
                      const sel = scope.level === 'region' && scope.region.name === region.name;
                      const dim = scope.level === 'region' && !sel;
                      const n = platesShowing ? 0 : counts[region.name] ?? 0;
                      return (
                        <Marker key={region.name} coordinates={anchor} style={{ default: { pointerEvents: 'none' }, hover: { pointerEvents: 'none' }, pressed: { pointerEvents: 'none' } }}>
                          <g transform={`scale(${labelScale / liveZoom})`} opacity={capHidden.has(region.name) && !(scope.level === 'region' && scope.region.name === region.name) ? 0 : quietNames ? capFade : labelsFit ? 1 : 0} style={{ pointerEvents: 'none', transition: 'opacity 180ms' }}>
                            {/* With plates showing, the names are wayfinding, not content: small quiet caps so the food leads (decided 2026-10-01) */}
                            {quietNames ? (
                              <>
                                <text textAnchor="middle" dominantBaseline="central" x={capLift[region.name]?.[0] ?? 0} y={(n ? -5 : 0) + (capLift[region.name]?.[1] ?? 0)} fill={dim ? REGION_BORDER : sel ? REGION_INK : QUIET_INK} fontSize={sel ? 10.5 : 9.5} fontWeight={700} letterSpacing="0.14em"
                                  stroke={systemColors.seaSalt} strokeWidth={2.5} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                                  {regionLabelName(region.name)}
                                </text>
                                {n > 0 && (
                                  <text textAnchor="middle" dominantBaseline="central" x={capLift[region.name]?.[0] ?? 0} y={8 + (capLift[region.name]?.[1] ?? 0)} fontSize={7.5} letterSpacing="0.12em" fill={dim ? REGION_BORDER : systemColors.navyMuted}
                                    stroke={systemColors.seaSalt} strokeWidth={2.5} strokeLinejoin="round" paintOrder="stroke">
                                    {n} {n === 1 ? 'DISH' : 'DISHES'}
                                  </text>
                                )}
                              </>
                            ) : (
                              <text textAnchor="middle" dominantBaseline="central" y={n ? -5 : 0} fill={dim ? REGION_BORDER : REGION_INK} fontSize={sel ? 17 : 15} fontStyle="italic" fontWeight={500}
                                stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)' }}>
                                {regionLabelName(region.name)}
                              </text>
                            )}
                            {!quietNames && n > 0 && (
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
                                {quietNames ? (
                                  <text textAnchor="middle" dominantBaseline="central" fill={QUIET_INK} fontSize={9.5} fontWeight={700} letterSpacing="0.14em"
                                    stroke={systemColors.seaSalt} strokeWidth={2.5} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                                    {name}
                                  </text>
                                ) : (
                                  <text textAnchor="middle" dominantBaseline="central" y={n ? -5 : 0} fill={REGION_INK} fontSize={15} fontStyle="italic" fontWeight={500}
                                    stroke={systemColors.seaSalt} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)' }}>
                                    {name}
                                  </text>
                                )}
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
                    {/* The hovered plate's name lands here, above every region
                        name, so it is never painted under one */}
                    <g ref={setPlateCaptionLayer} style={{ pointerEvents: 'none' }} />
                  </g>
                );
              })()}

              {/* One signature plate per country at world zoom (#36 preview);
                  the opened country's hands over to its region plates */}
              {/* On a phone too, from the outermost zoom (Nikita, 2026-10-01): the
                  spacing rule keeps it to the few biggest countries until you zoom */}
              {(
                <WorldPlates
                  countries={countries}
                  features={features}
                  projection={baseProjection}
                  zoom={liveZoom}
                  labelScale={labelScale}
                  scopedId={bubbleCountry?.id}
                  scopedFade={showBubbles && areas ? plateFade(areas, liveZoom) : 0}
                  unitsFor={worldUnits}
                  onOpenCountry={id => flyToCountry(id)}
                />
              )}

            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (() => {
            const c = getCountryById(tooltip.id);
            return <div className="max-md:hidden"><MapPreviewCard countryId={tooltip.id} countryName={tooltip.name} country={c} activity={getCountryActivity(tooltip.id)} match={flavorMatches?.get(tooltip.id)} progress={c ? countryDishProgress(c, dishes.filter(d => d.countryId === c.id)) : undefined} wantCount={wishlist.filter(w => w.countryId === tooltip.id).length} x={tooltip.x} y={tooltip.y} /></div>;
          })()}
        </div>

        {/* Desktop: the panel's handle. Open, a small round tab on the card's
            edge tucks it away. */}
        <button
          type="button"
          onClick={() => togglePanel(false)}
          aria-expanded={panelOpen}
          aria-label="Hide panel"
          tabIndex={panelOpen ? 0 : -1}
          className={`max-md:hidden absolute top-3 z-20 md:right-[calc(var(--panel-x)+12px)] md:transition-[right,opacity] md:duration-300 btn-press flex items-center justify-center rounded-full border shadow-sm w-9 h-9 ${panelOpen ? '' : 'opacity-0 pointer-events-none'}`}
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }}
          data-panel-toggle
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        {/* Collapsed: a drawer tab docked to the map's right edge names what
            the panel holds, live as the scope changes, and pulls it back out. */}
        <button
          type="button"
          onClick={() => togglePanel(true)}
          aria-expanded={panelOpen}
          aria-label={`Show panel: ${sheetTitle}`}
          tabIndex={panelOpen ? -1 : 0}
          className={`panel-tab max-md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 min-h-[52px] rounded-l-2xl border border-r-0 text-left ${panelOpen ? 'panel-tab--in' : ''}`}
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }}
          data-panel-tab
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: systemColors.tomato }}>
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <span className="flex flex-col gap-0.5 leading-tight">
            <span className="flex items-center gap-1.5 text-sm font-bold whitespace-nowrap">
              {scope.level !== 'world' && <PlateDot color={scope.country.colorPalette.primary} size={11} />}
              {sheetTitle}
            </span>
            <span className="text-xs whitespace-nowrap" style={{ color: systemColors.navyMuted }}>
              {scope.level === 'world' ? `${countries.length} cuisines` : (n => `${n} ${n === 1 ? 'dish' : 'dishes'}`)(scope.level === 'country' ? allEntries.length : counts[scope.region.name] ?? regionEntries.length)} · Open
            </span>
          </span>
        </button>

        {/* ============ panel ============ */}
        <div
          ref={panelRef}
          key={scopeKey}
          data-panel
          className={`z-10 min-h-0 px-5 pb-6 md:overflow-y-auto md:py-4 md:absolute md:top-3 md:right-3 md:bottom-3 md:w-[440px] md:rounded-2xl md:border md:shadow-[0_14px_36px_-14px_rgba(51,48,42,0.4)] md:transition-transform md:duration-300 md:ease-out ${panelOpen ? '' : 'md:translate-x-[calc(100%+16px)] md:pointer-events-none'} max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:rounded-t-2xl max-md:shadow-[0_-8px_20px_rgba(51,48,42,0.14)] max-md:transition-[top] max-md:duration-300 max-md:ease-out ${
            sheetPos === 'strip' ? 'max-md:overflow-hidden' : 'max-md:overflow-y-auto'
          } ${
            // Positioned by its top edge, not translated: the box is exactly
            // the visible band, so the list scrolls to its end at half too
            // The strip is exactly the title row (44px), so no half-line of the
            // list ever peeks out under it (Nikita, 2026-10-01)
            sheetPos === 'strip' ? 'max-md:top-[calc(100%-44px-env(safe-area-inset-bottom,0px))]' : sheetPos === 'half' ? 'max-md:top-[48%]' : 'max-md:top-0'
          }`}
          style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}
        >
          {/* The strip: the scope title. Taps only, no dragging: the strip opens
              the sheet, the header's controls close it or expand it. */}
          <div
            className="md:hidden sticky top-0 z-10 -mx-5 px-5 py-3 select-none"
            style={{ backgroundColor: systemColors.seaSalt }}
            onClick={() => { if (sheetPos === 'strip') raiseFromStrip(); }}
            role={sheetPos === 'strip' ? 'button' : undefined}
            tabIndex={sheetPos === 'strip' ? 0 : undefined}
            onKeyDown={e => { if (sheetPos === 'strip' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); raiseFromStrip(); } }}
          >
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: systemColors.navy }}>
              {scope.level !== 'world' && <PlateDot color={scope.country.colorPalette.primary} size={12} />}
              <span>{scope.level === 'world' ? `${countries.length} cuisines` : sheetTitle}</span>
              <span className="font-normal text-xs" style={{ color: systemColors.navyMuted }}>
                {scope.level === 'world' ? (exploredDepth.size ? 'colouring in as you eat' : 'tap the map, or browse') : scope.level === 'country' ? `${allEntries.length} dishes & drinks` : `${counts[scope.region.name] ?? regionEntries.length} ${(counts[scope.region.name] ?? regionEntries.length) === 1 ? 'dish' : 'dishes'}`}
              </span>
              {sheetPos === 'strip' ? (
                <span className="ml-auto text-base leading-none" style={{ color: systemColors.navyMuted }}>⌃</span>
              ) : (
                <span className="ml-auto -my-3 -mr-3 flex items-center">
                  <button
                    type="button"
                    aria-label={sheetPos === 'full' ? 'Show more map' : 'Expand panel'}
                    className="w-11 h-11 flex items-center justify-center rounded-full"
                    style={{ color: systemColors.navyMuted }}
                    onClick={e => { e.stopPropagation(); setSheetPos(p => (p === 'full' ? 'half' : 'full')); }}
                  >
                    {/* Full: arrows point in (contract to half); half: they point out (expand) */}
                    {sheetPos === 'full'
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l6-6M10 14v5M10 14H5M20 4l-6 6M14 10V5M14 10h5" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 10l6-6M20 4v5M20 4h-5M10 14l-6 6M4 20v-5M4 20h5" /></svg>}
                  </button>
                  <button
                    type="button"
                    aria-label="Close panel"
                    className="w-11 h-11 flex items-center justify-center rounded-full"
                    style={{ color: systemColors.navyMuted }}
                    onClick={e => { e.stopPropagation(); setSheetPos('strip'); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </span>
              )}
            </div>
          </div>
          {panelLevel === 'world' && (
            <>
              <h2 className="max-md:hidden text-lg font-bold" style={{ color: systemColors.navy }}>{flavorMatches ? 'Where next' : '31 cuisines'}</h2>
              <p className="max-md:hidden text-sm mb-4" style={{ color: systemColors.navyMuted }}>{flavorMatches ? 'Closest to your taste first. Tap one on the map, or pick from the list.' : exploredDepth.size ? 'Countries colour in as you eat through them. Tap one on the map, or pick from the list.' : 'Tap one on the map, or pick from the list.'}</p>
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

              {/* The dish detail: one level below whichever of these it opened from */}
              {detailEntry && (
                <DishDetail key={detailEntry.key} entry={detailEntry} country={country} actions={actions} backLabel={detailBackLabel} onBack={closeDetail} rank={detailEntry.kind === 'dish' ? ranking.rankOf(detailEntry.dish) : undefined} />
              )}

              {!detailEntry && panelLevel === 'country' && countryView === 'overview' && (
                <div className="pt-2 md:pt-1">
                  <CountryOverview
                    country={country}
                    startWith={ranking.startWith}
                    personalized={ranking.personalized}
                    totalCount={allEntries.length}
                    onSeeAll={seeAll}
                    onOpenDish={dish => openDish(`d:${dish.name}`)}
                    onOpenFlavor={() => openCountryView('flavor')}
                    onOpenCulture={() => openCountryView('culture')}
                  />
                </div>
              )}

              {!detailEntry && panelLevel === 'country' && countryView === 'all' && (
                <div className="flex flex-col gap-5 pt-1">
                  <div className="flex flex-col gap-1">
                    <BackLink label={country.name} onClick={backToOverview} />
                    <LensControls
                      compact
                      title={<><h2 className="text-2xl font-extrabold" style={{ color: systemColors.navy }}>All dishes</h2><span className="text-[15px]" style={{ color: systemColors.navyMuted }}>{visible.length}</span></>}
                      filters={filters}
                      lens="region"
                      onLensChange={() => {}}
                      availableLenses={['region']}
                      triedCount={triedCount}
                      hasBeverages={allEntries.some(isDrinkEntry)}
                      resultCount={visible.length}
                    />
                  </div>
                  <ArrangeToggle value={arrangement} onChange={setArrangement} personalized={ranking.personalized} />
                  {visible.length === 0 ? (
                    filters.query.trim() ? (
                      // Menus have sixty things and we know twenty: a name we
                      // don't match may still be real, so offer the lookup
                      <div className="rounded-xl border border-dashed p-5 text-sm" style={{ borderColor: systemColors.border, color: systemColors.navyMuted }} data-menu-miss>
                        Nothing we know matches “{filters.query.trim()}”. It may still be on the menu; we only know {allEntries.length} {country.name} dishes and drinks so far.
                        {filters.refinementActive && <> <button onClick={filters.reset} className="tap font-semibold" style={{ color: systemColors.tomato }}>Clear filters</button></>}
                        <MenuLookup
                          query={filters.query}
                          countryId={country.id}
                          countryName={country.name}
                          onSave={r => addDish({
                            countryId: country.id,
                            name: r.name,
                            kind: r.category === 'beverage' ? 'drink' : 'food',
                            source: 'lookup',
                            notes: `${r.description}${r.keyIngredients.length ? ` Likely ingredients: ${r.keyIngredients.join(', ')}.` : ''} (AI-generated)`,
                            restaurantTries: [],
                          })}
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed p-6 text-center text-sm" style={{ borderColor: systemColors.border, color: systemColors.navyMuted }}>
                        Nothing matches these filters. <button onClick={filters.reset} className="tap font-semibold" style={{ color: systemColors.tomato }}>Clear filters</button>
                      </div>
                    )
                  ) : (
                    <AllDishesList groups={arrangement === 'ranked' ? rankedGroups : groups} rankOf={arrangement === 'ranked' ? rankOfEntry : undefined} drinks={drinksOnly ? [] : drinksVisible} whereFor={whereFor} countryLabel={countryInSentence(country.name)} colors={colors} isWanted={isWanted} onOpen={e => openDish(e.key)} onOpenRegion={r => flyToRegion(country, r)} />
                  )}
                </div>
              )}

              {!detailEntry && panelLevel === 'country' && (countryView === 'flavor' || countryView === 'culture') && (
                <div className="flex flex-col gap-5 pt-1">
                  <div className="flex flex-col gap-1">
                    <BackLink label={country.name} onClick={backToOverview} />
                    <h2 className="text-2xl font-extrabold" style={{ color: systemColors.navy }}>{countryView === 'flavor' ? 'What it tastes like' : 'Food culture'}</h2>
                    <p className="text-sm" style={{ color: systemColors.navyMuted }}>
                      {countryView === 'flavor' ? `${country.name}’s flavor fingerprint` : `Meals, customs and history in ${countryInSentence(country.name)}`}
                    </p>
                  </div>
                  {countryView === 'flavor'
                    ? <FlavorTrayBody country={country} />
                    : <CultureTrayBody country={country} onOpenCountry={id => flyToCountry(id)} />}
                </div>
              )}

              {!detailEntry && scope.level === 'region' && (
                <div className="flex flex-col gap-3 pt-1">
                  <BackLink label="All dishes" onClick={() => flyToCountry(country.id, { view: 'all' })} />
                  <RegionView country={country} region={scope.region} entries={regionEntries.filter(e => !isDrinkEntry(e))} drinks={regionEntries.filter(isDrinkEntry)} whereFor={whereFor} counts={counts} colors={colors} isWanted={isWanted} onOpen={e => openDish(e.key)} onOpenRegion={r => flyToRegion(country, r)} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <CuisinePicker open={pickerOpen} onClose={() => setPickerOpen(false)} onPick={openFound} />
    </div>
  );
}
