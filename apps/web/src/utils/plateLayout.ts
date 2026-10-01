import type { GeoProjection } from 'd3-geo';
import type { Group, Entry } from './groupDishes';
import { polygonContains } from 'd3-polygon';
import { regionLabelName, type RegionAreas } from './regionAreas';
import type { Country, RegionalCuisine } from '../data/types';
import { entryView } from './entryView';

/**
 * Which dish plates sit on the Explore map, and where (the drawing is in
 * components/explore/MapPlates.tsx). See plateLayout for the rules.
 */

export const PLATE_R = 21; // plate radius in screen px
export const WORLD_R = 12.5; // world zoom: a pin that marks the cuisine, legible at a glance (was 10; Nikita, 2026-10-01)
export const COUNTRY_R = 15; // country-zoom plates, tucked under the region name
const NEIGHBOUR_OPACITY = 0.7; // other regions' plates while one region is open

const RANK = { both: 0, 'tourist-classic': 1, 'local-favorite': 2 } as const;
export const plateRank = (e: Entry) => {
  const src = e.kind === 'dish' ? e.dish : e.kind === 'drink' ? e.drink : undefined;
  const p = src && 'popularity' in src ? src.popularity : undefined;
  return p ? RANK[p] : 3;
};
const imaged = (entries: Entry[]) => entries.filter(e => entryView(e).image).sort((a, b) => plateRank(a) - plateRank(b));
const originOf = (e: Entry) => (e.kind === 'dish' ? e.dish.origin : e.kind === 'drink' ? e.drink.origin : undefined);

/** A country's signature: its most popular dish with an image. */
export function signature(country: Country): Entry | undefined {
  return imaged(country.popularDishes.map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish })))[0];
}

export type PlacedPlate = {
  key: string; entry: Entry; at: [number, number]; lift: [number, number]; r: number;
  label: string; region?: RegionalCuisine; stem?: boolean; compact?: boolean; opacity?: number; leaving?: boolean;
  /** Dishes hidden behind this one, shown as "+N". */
  badge?: number;
  /** Peeking out from behind a more popular neighbour. */
  behind?: boolean;
  /** A nationwide dish: its place in the "Across {country}" cluster at sea,
   *  most popular first. `lift` is its stacked offset; the ring positions
   *  come from acrossRing() at render time. */
  across?: { i: number; n: number };
  /** Depth where plates overlap at this zoom: 0 is the most popular, on
   *  top at full strength; 1, 2, 3+ sit underneath, each fainter and
   *  smaller (the China de-clutter canvas, boards 1 + 3, 2026-10-01). */
  under?: number;
  /** A pile: plates whose real spots are within a plate of each other
   *  (Puebla's mole and chiles en nogada), which no zoom can separate. On
   *  hover or tap the pile slides apart into a row (`spread` is each plate's
   *  lift then) and settles back after. */
  pile?: { id: string; i: number; n: number; spread: [number, number] };
};

/**
 * The "Across {country}" cluster's ring. With a hub (desktop) the most
 * popular dish sits in the middle with "+N" and the rest fan out around it
 * on hover; without one (touch, no hover) a label pill is the hub and every
 * dish sits on the ring. Offsets are in screen px at labelScale 1.
 */
export function acrossRing(n: number): { ringR: number; at: (i: number) => [number, number] } {
  const ringR = Math.max(58, n > 1 ? (COUNTRY_R * 2 + 12) / (2 * Math.sin(Math.PI / n)) : 0);
  return {
    ringR,
    at: i => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [Math.cos(a) * ringR, Math.sin(a) * ringR]; },
  };
}

/**
 * A region's unit for the world pins: its illustrated dishes, most popular
 * first, and the spot its top dish has at country zoom (from the same
 * placement the country zoom uses), so zooming in never moves a pin.
 */
export type RegionUnit = { region: RegionalCuisine; at: [number, number]; entries: Entry[] };

/** A country's placed dishes, computed (and cached) exactly as the country zoom will. */
export function countryHomes(areas: RegionAreas, groups: Group[], projection: GeoProjection, countryId: string, countryName: string, fitZoom: number, fitScale: number): { entry: Entry; at: [number, number]; region?: RegionalCuisine }[] {
  const cacheKey = `${countryId}|${groups.map(g => imaged(g.entries).map(e => e.key).join(',')).join(';')}`;
  let placed = homes.get(cacheKey);
  if (!placed) { placed = placeHomes(areas, groups, projection, countryId, countryName, fitZoom, fitScale); homes.set(cacheKey, placed); }
  return placed.map(h => ({ entry: h.entry, at: h.at, region: h.region }));
}

export function regionUnits(placed: { entry: Entry; at: [number, number]; region?: RegionalCuisine }[]): RegionUnit[] {
  const byRegion = new Map<string, RegionUnit>();
  for (const h of [...placed].sort((a, b) => plateRank(a.entry) - plateRank(b.entry))) {
    if (!h.region) continue;
    const u = byRegion.get(h.region.name);
    if (u) u.entries.push(h.entry); else byRegion.set(h.region.name, { region: h.region, at: h.at, entries: [h.entry] });
  }
  return [...byRegion.values()];
}

/**
 * Which units a country shows at world zoom: the one with the best-ranked
 * hub first, then whichever is farthest from those chosen, so the picks
 * spread across the country. Deterministic, so a growing budget only ever
 * adds a pin, never moves one.
 */
export function worldPicks(units: RegionUnit[], budget: number, px: (at: [number, number]) => [number, number]): RegionUnit[] {
  if (!units.length) return [];
  const rest = [...units].sort((a, b) => plateRank(a.entries[0]) - plateRank(b.entries[0]));
  const picks = [rest.shift()!];
  while (picks.length < budget && rest.length) {
    let best = 0, bestD = -1;
    rest.forEach((u, i) => {
      const [x, y] = px(u.at);
      const d = Math.min(...picks.map(q => { const [a, b] = px(q.at); return Math.hypot(a - x, b - y); }));
      if (d > bestD) { bestD = d; best = i; }
    });
    picks.push(rest.splice(best, 1)[0]);
  }
  return picks;
}

// The stack's little jitter, so a closed cluster reads as a pile, not one plate
const STACK_JITTER: [number, number][] = [[0, 0], [-3, -3], [3, -2], [-2, 2], [2, 3], [-4, 1], [4, -4], [-1, -4], [1, 4], [-3, 4]];

// Open water for each country's "Across" stack, in lon/lat.
// A country without one shows no nationwide plates at all, so every country
// with images needs an entry (wave 2: add one per country as it gets images).
const ACROSS_AT: Record<string, [number, number]> = {
  MX: [-90.8, 25.6],   // Gulf of Mexico
  CN: [124.5, 31.5],   // East China Sea, off Shanghai
  EG: [30.3, 33.0],    // Mediterranean, north of the Delta
  IN: [86.5, 16.0],    // Bay of Bengal, off the east coast
};


const PAD = 4; // breathing room between anything placed, in screen px
type Box = [number, number, number, number];

/** Screen-px bookkeeping: names block space, each placed plate takes its
 *  disc (and caption, if it shows one) so nothing placed later can overlap. */
function screenSpace() {
  const boxes: Box[] = [];
  const discs: [number, number, number][] = [];
  const near = (v: number, a: number, b: number) => Math.max(a, Math.min(v, b));
  const discBox = (x: number, y: number, r: number, [x0, y0, x1, y1]: Box) => Math.hypot(x - near(x, x0, x1), y - near(y, y0, y1)) < r + PAD;
  const boxBox = (a: Box, b: Box) => a[0] - PAD < b[2] && a[2] + PAD > b[0] && a[1] - PAD < b[3] && a[3] + PAD > b[1];
  return {
    block: (b: Box) => boxes.push(b),
    fits: (x: number, y: number, r: number, cap?: Box) =>
      !boxes.some(b => discBox(x, y, r, b)) &&
      discs.every(([a, b, q]) => Math.hypot(x - a, y - b) >= r + q + PAD) &&
      (!cap || (!boxes.some(b => boxBox(cap, b)) && !discs.some(([a, b, q]) => discBox(a, b, q, cap)))),
    take: (x: number, y: number, r: number, cap?: Box) => { discs.push([x, y, r]); if (cap) boxes.push(cap); },
  };
}

/** A region's name on screen; `tall` includes the dish-count line under it. */
const nameBox = (name: string, cx: number, cy: number, s: number, tall = false): Box => {
  // A little wider than the fitting estimate in regionAreas: italic serif
  // names run long, and a plate must never touch one
  const w = regionLabelName(name).length * 15 * 0.6 * s + 8, h = (tall ? 38 : 26) * s;
  return [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
};
const captionBox = (text: string, cx: number, cy: number, s: number): Box => {
  const w = text.length * 11 * 0.56 * s + 8, h = 16 * s;
  return [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
};

type Home = { entry: Entry; tier: number; at: [number, number]; region?: RegionalCuisine; label: string;
  /** Nationwide dishes only: a fixed screen offset from the shared water point, so the group stays a group. */
  lift?: [number, number];
  across?: { i: number; n: number };
  stack?: { id: string; i: number; n: number };
  /** No city of its own: it stays with its region's name. */
  stayWithName?: boolean };
// Every dish's one spot on the map, per country. Decided once and kept, so
// zooming and panning only ever show or hide a plate, never move it.
const homes = new Map<string, Home[]>();

/**
 * Give every illustrated dish a fixed place on the map, in lon/lat. Worked out
 * at the whole-country zoom, the tightest view there is, most popular first.
 * A dish with a city sits on its city and nowhere else; if something more
 * popular is already there it simply appears once the zoom makes room. A
 * place is never traded for visibility: tacos do not go to sea. (Region names
 * keep clear of these cities, see regionAreas.) A dish with only a region
 * sits beside that region's name, on land. Nationwide dishes stay a tight
 * group in open water under the "Across" label, at every zoom.
 * Zooming in only spreads things apart, so a spot free here is free at every
 * closer zoom.
 */
function placeHomes(areas: RegionAreas, groups: Group[], projection: GeoProjection, countryId: string, countryName: string, zoom: number, s: number): Home[] {
  const space = screenSpace();
  for (const { region: r, anchorPx } of areas.areas) space.block(nameBox(r.name, anchorPx[0] * zoom, anchorPx[1] * zoom, s));
  const r = (COUNTRY_R + 2.5) * s;
  const D = (COUNTRY_R + 2.5) * 2 + PAD, E = D * 1.5;
  const px = (lonlat: [number, number]) => (projection(lonlat) as [number, number]).map(n => n * zoom);
  const geo = (x: number, y: number) => projection.invert!([x / zoom, y / zoom]) as [number, number];
  const onLand = (x: number, y: number) => areas.rings.some(ring => polygonContains(ring, [x / zoom, y / zoom]));
  const nearestArea = (x: number, y: number) => areas.areas.reduce((best, a) =>
    (Math.hypot(a.anchorPx[0] * zoom - x, a.anchorPx[1] * zoom - y) < Math.hypot(best.anchorPx[0] * zoom - x, best.anchorPx[1] * zoom - y) ? a : best));

  type Cand = { entry: Entry; tier: number; base: [number, number]; region?: RegionalCuisine; place?: string; kind: 'city' | 'region' | 'across' };
  const cands: Cand[] = [];
  const water = ACROSS_AT[countryId];
  for (const g of groups) {
    imaged(g.entries).forEach((entry, tier) => {
      const o = originOf(entry);
      if (o?.coordinates) { const [x, y] = px(o.coordinates); cands.push({ entry, tier, base: o.coordinates, region: nearestArea(x, y).region, place: o.place, kind: 'city' }); }
      else if (g.region) cands.push({ entry, tier, base: areas.areas.find(a => a.region.name === g.region!.name)!.anchor, region: g.region, kind: 'region' });
      else if (water) cands.push({ entry, tier, base: water, kind: 'across' });
    });
  }
  if (water && cands.some(c => c.kind === 'across')) {
    const [ax, ay] = px(water);
    space.block(captionBox(`Across ${countryName}`, ax, ay + (COUNTRY_R + 18) * s, s * 1.2));
  }
  cands.sort((a, b) => plateRank(a.entry) - plateRank(b.entry) || a.tier - b.tier);
  // A dish with a city sits on it no matter what, so it claims that spot
  // first and the region dishes placed around the name steer clear of it
  for (const c of cands) if (c.kind === 'city') { const [x, y] = px(c.base); space.take(x, y, r); }

  const around: [number, number][] = [[0, D], [0, -D], [D, 0], [-D, 0], [D, D], [-D, D], [D, -D], [-D, -D], [0, E], [0, -E], [E, 0], [-E, 0]];
  // The nationwide group: a stack at the water point, most popular on top.
  // Only the stack's own disc is taken; the ring it fans into is transient
  // (hover) and may pass over neighbours
  const acrossTotal = cands.filter(c => c.kind === 'across').length;
  let acrossN = 0;
  return cands.flatMap((c): Home[] => {
    const [bx, by] = px(c.base);
    const name = entryView(c.entry).name;
    // "Beijing Kaoya · Beijing" says it twice; the place only adds when the name doesn't carry it
    const label = c.place && !name.toLowerCase().includes(c.place.toLowerCase()) ? `${name} · ${c.place}` : name;
    if (c.kind === 'across') {
      const i = acrossN++;
      if (i === 0) space.take(bx, by, r);
      return [{ entry: c.entry, tier: c.tier, at: c.base, lift: STACK_JITTER[i % STACK_JITTER.length], label, across: { i, n: acrossTotal } }];
    }
    const spots = around;
    const homeOnLand = onLand(bx, by);
    if (c.kind === 'city') return [{ entry: c.entry, tier: c.tier, at: c.base, region: c.region, label }];
    for (const [dx, dy] of spots) {
      const x = bx + dx * s, y = by + dy * s;
      if (homeOnLand && !onLand(x, y)) continue;
      if (c.region && nearestArea(x, y).region.name !== c.region.name) continue;
      if (!space.fits(x, y, r + PAD)) continue;
      space.take(x, y, r);
      return [{ entry: c.entry, tier: c.tier, at: geo(x, y), region: c.region, label, stayWithName: true }];
    }
    // No clear spot (a small region on a phone, where the names run big): the
    // plate still lands, on the first spot that is at least on its own land,
    // else on the anchor itself. Overlap is shown as depth; a dish is never
    // dropped from the map
    for (const [dx, dy] of spots) {
      const x = bx + dx * s, y = by + dy * s;
      if (homeOnLand && !onLand(x, y)) continue;
      if (c.region && nearestArea(x, y).region.name !== c.region.name) continue;
      space.take(x, y, r);
      return [{ entry: c.entry, tier: c.tier, at: geo(x, y), region: c.region, label, stayWithName: true }];
    }
    space.take(bx, by, r);
    return [{ entry: c.entry, tier: c.tier, at: c.base, region: c.region, label, stayWithName: true }];
  });
}

/**
 * Every plate, at its one fixed place (placeHomes). Nothing here depends on
 * the zoom, so nothing can jump or flicker: plates overlap when their cities
 * are close (the more popular drawn on top) and separate as you zoom in, and
 * the region names are drawn above them. A plate is left out only while its
 * place is off screen. Opening a region dims the other regions' plates.
 */
export function plateLayout({ areas, groups, region, zoom, labelScale, projection, countryId, countryName, center, view, fitZoom, fitScale }: {
  areas: RegionAreas; groups: Group[]; region?: RegionalCuisine; zoom: number; labelScale: number;
  projection: GeoProjection; countryId: string; countryName: string;
  /** The view's centre in base projected px, and the view's size. */
  center: readonly [number, number]; view: readonly [number, number];
  /** The zoom that frames the whole country, and the names' scale there. */
  fitZoom: number; fitScale: number;
}): PlacedPlate[] {
  const s = labelScale;
  const cacheKey = `${countryId}|${groups.map(g => imaged(g.entries).map(e => e.key).join(',')).join(';')}`;
  let placed = homes.get(cacheKey);
  if (!placed) { placed = placeHomes(areas, groups, projection, countryId, countryName, fitZoom, fitScale); homes.set(cacheKey, placed); }
  const r = (COUNTRY_R + 2.5) * s;
  const onScreen = (x: number, y: number, margin = r) => {
    const sx = (x / zoom - center[0]) * zoom + view[0] / 2, sy = (y / zoom - center[1]) * zoom + view[1] / 2;
    return sx > -margin && sx < view[0] + margin && sy > -margin && sy < view[1] + margin;
  };
  const px = (at: [number, number]) => (projection(at) as [number, number]).map(n => n * zoom) as [number, number];

  // Most popular first: it becomes the hub wherever plates meet
  const order = [...placed].sort((a, b) => plateRank(a.entry) - plateRank(b.entry) || a.tier - b.tier);
  const dimFor = (h: Home) => (region && h.region && h.region.name !== region.name ? NEIGHBOUR_OPACITY : undefined);

  // Plates that would overlap on screen at this zoom keep their own places
  // but take a depth: the most popular on top at full strength, the ones
  // underneath fainter and smaller (decided 2026-10-01, the China de-clutter
  // canvas, boards 1 + 3). Zoom in and they separate again, each where its
  // dish is from. Nationwide dishes keep their own cluster at sea.
  const TOUCH = (COUNTRY_R * 2 + 6) * s;
  type Cluster = { hub: Home; px: [number, number]; members: Home[] };
  const clusters: Cluster[] = [];
  const across: PlacedPlate[] = [];
  for (const h of order) {
    const [hx, hy] = px(h.at);
    if (h.across) {
      // The Across cluster leaves and returns as one: culled from its hub with
      // the ring's reach as margin, so panning never drops plates one by one
      if (!onScreen(hx, hy, r + acrossRing(h.across.n).ringR * s)) continue;
      across.push({ key: h.entry.key, entry: h.entry, at: h.at, lift: h.lift ?? [0, 0], r: COUNTRY_R, compact: true, label: h.label, across: h.across });
      continue;
    }
    const near = clusters.find(c => Math.hypot(c.px[0] - hx, c.px[1] - hy) < TOUCH);
    if (near) near.members.push(h); else clusters.push({ hub: h, px: [hx, hy], members: [h] });
  }
  // A plate underneath that its top would cover completely (Guadalajara and
  // the town of Tequila are a couple of px apart at country zoom) is nudged
  // just far enough to show a crescent, in a fixed direction per depth so
  // the pile fans a little. As you zoom in the real gap opens and the nudge
  // shrinks to nothing, so every plate ends up exactly where its dish is from.
  const SHOW = COUNTRY_R * 1.15 * s; // centre distance at which a good crescent shows
  const NUDGE_DIR: [number, number][] = [[-0.87, 0.5], [0.87, 0.5], [0, -1], [-0.87, -0.5], [0.87, -0.5], [0, 1]];
  const plates = clusters.flatMap((c): PlacedPlate[] => {
    // The pile: the hub plus every member that had to be nudged to show at all
    const inPile = c.members.filter((h, i) => { if (i === 0) return true; const [hx, hy] = px(h.at); return Math.hypot(hx - c.px[0], hy - c.px[1]) < SHOW; });
    const pileN = inPile.length > 1 ? inPile.length : 0;
    const GAP = COUNTRY_R * 2 + 8;
    return c.members.flatMap((h, i): PlacedPlate[] => {
      const [hx, hy] = px(h.at);
      if (!onScreen(hx, hy)) return [];
      let lift: [number, number] = [0, 0];
      const pi = inPile.indexOf(h);
      if (i > 0) {
        const dx = hx - c.px[0], dy = hy - c.px[1], d = Math.hypot(dx, dy);
        if (d < SHOW) {
          const [ux, uy] = d > 2 ? [dx / d, dy / d] : NUDGE_DIR[(i - 1) % NUDGE_DIR.length];
          lift = [(ux * (SHOW - d)) / s, (uy * (SHOW - d)) / s];
        }
      }
      // Open, the pile is a row centred where it sits, most popular first
      const pile = pileN && pi >= 0 ? { id: `pile:${c.hub.entry.key}`, i: pi, n: pileN, spread: [((pi - (pileN - 1) / 2) * GAP) - (pi > 0 ? (hx - c.px[0]) / s : 0), -(pi > 0 ? (hy - c.px[1]) / s : 0)] as [number, number] } : undefined;
      return [{ key: h.entry.key, entry: h.entry, at: h.at, lift, r: COUNTRY_R, compact: true, label: h.label, region: h.region,
        opacity: dimFor(h), under: i > 0 ? i : undefined, pile }];
    });
  });
  return [...plates, ...across];
}

/** Where a country's "Across" label sits, if its stack is showing. */
export const acrossAt = (countryId: string) => ACROSS_AT[countryId];
