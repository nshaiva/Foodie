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
export const WORLD_R = 10; // world zoom: a pin that marks the cuisine, not a picture of it
export const COUNTRY_R = 15; // country-zoom plates, tucked under the region name
const NEIGHBOUR_OPACITY = 0.7; // other regions' plates while one region is open

const RANK = { both: 0, 'tourist-classic': 1, 'local-favorite': 2 } as const;
const rank = (e: Entry) => {
  const src = e.kind === 'dish' ? e.dish : e.kind === 'drink' ? e.drink : undefined;
  const p = src && 'popularity' in src ? src.popularity : undefined;
  return p ? RANK[p] : 3;
};
const imaged = (entries: Entry[]) => entries.filter(e => entryView(e).image).sort((a, b) => rank(a) - rank(b));
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
};

// Open water for each country's "Across" stack, in lon/lat.
const ACROSS_AT: Record<string, [number, number]> = { MX: [-90.8, 25.6] };


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
      if (o) { const [x, y] = px(o.coordinates); cands.push({ entry, tier, base: o.coordinates, region: nearestArea(x, y).region, place: o.place, kind: 'city' }); }
      else if (g.region) cands.push({ entry, tier, base: areas.areas.find(a => a.region.name === g.region!.name)!.anchor, region: g.region, kind: 'region' });
      else if (water) cands.push({ entry, tier, base: water, kind: 'across' });
    });
  }
  if (water && cands.some(c => c.kind === 'across')) {
    const [ax, ay] = px(water);
    space.block(captionBox(`Across ${countryName}`, ax, ay + (COUNTRY_R + 18) * s, s * 1.2));
  }
  cands.sort((a, b) => rank(a.entry) - rank(b.entry) || a.tier - b.tier);

  const around: [number, number][] = [[0, D], [0, -D], [D, 0], [-D, 0], [D, D], [-D, D], [D, -D], [-D, -D], [0, E], [0, -E], [E, 0], [-E, 0]];
  // The nationwide group: a tight row at the water point, side by side,
  // most popular in the middle, then alternating right and left
  const G = (COUNTRY_R + 2.5) * 2 + 6;
  let acrossN = 0;
  return cands.flatMap((c): Home[] => {
    const [bx, by] = px(c.base);
    const name = entryView(c.entry).name;
    const label = c.place ? `${name} · ${c.place}` : name;
    if (c.kind === 'across') {
      const i = acrossN++;
      const dx = i === 0 ? 0 : Math.ceil(i / 2) * G * (i % 2 ? 1 : -1);
      space.take(bx + dx * s, by, r);
      return [{ entry: c.entry, tier: c.tier, at: c.base, lift: [dx, 0], label }];
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
    return [];
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
  const onScreen = (x: number, y: number) => {
    const sx = (x / zoom - center[0]) * zoom + view[0] / 2, sy = (y / zoom - center[1]) * zoom + view[1] / 2;
    return sx > -r && sx < view[0] + r && sy > -r && sy < view[1] + r;
  };
  // Least popular first, so the most popular ends up on top where plates meet
  const order = [...placed].sort((a, b) => rank(b.entry) - rank(a.entry) || b.tier - a.tier);
  return order.flatMap((h): PlacedPlate[] => {
    const [hx, hy] = (projection(h.at) as [number, number]).map(n => n * zoom);
    const lift = h.lift ?? [0, 0];
    if (!onScreen(hx + lift[0] * s, hy + lift[1] * s)) return [];
    return [{ key: h.entry.key, entry: h.entry, at: h.at, lift, r: COUNTRY_R, compact: true, label: h.label, region: h.region,
      opacity: region && h.region && h.region.name !== region.name ? NEIGHBOUR_OPACITY : undefined }];
  });
}

/** Where a country's "Across" label sits, if its stack is showing. */
export const acrossAt = (countryId: string) => ACROSS_AT[countryId];
