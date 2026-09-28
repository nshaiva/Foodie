import { geoPath, type GeoProjection } from 'd3-geo';
import { Delaunay } from 'd3-delaunay';
import { polygonContains } from 'd3-polygon';
import type { Feature, Geometry } from 'geojson';
import type { RegionalCuisine } from '../data/types';
import { getShortRegionName, regionCoordinates } from '../data/regionMapConfig';

/**
 * The wine-map view of a country: dashed borders split it into regions,
 * each name lettered inside its area. This module is the geometry — the
 * Voronoi split, the label anchors, and the all-or-nothing fit test —
 * shared by /explore and the country page's RegionalMap. Everything is
 * computed in one projection's screen space, passed in by the caller.
 */

// Shared ink: names, dashed borders, and the selected region's tint.
// Deliberately cool — warm tints read as blemishes on the land.
export const REGION_INK = '#33302A';
export const REGION_BORDER = '#8A8478';
export const REGION_TINT = '#3E5260';

/** How a region is lettered on the map: short, and without a leading "The". */
export const regionLabelName = (name: string) => getShortRegionName(name).replace(/^The /, '');

export type RegionArea = {
  region: RegionalCuisine;
  /** The region's Voronoi cell as an SVG path, to clip against the outline. */
  cell: string;
  /** Label anchor in lon/lat (for `<Marker>`), and in projected px. */
  anchor: [number, number];
  anchorPx: [number, number];
};

export type RegionAreas = {
  outline: string;
  borders: string;
  areas: RegionArea[];
  /** Extent of the land the regions are on, in projected px. */
  bounds: [[number, number], [number, number]];
};

/**
 * The parts of a country its regions are on: every polygon that holds a
 * region's centre (or is nearest to one just offshore). That's the lower 48
 * for the US, the mainland for Spain, and the right set of islands for an
 * archipelago like Indonesia or the Philippines. Countries without regions
 * fall back to their largest polygon.
 */
export function homeLand(countryId: string, feat: Feature<Geometry>, proj: GeoProjection): Feature<Geometry> {
  const g = feat.geometry;
  if (g.type !== 'MultiPolygon') return feat;
  const path = geoPath(proj);
  const polys = g.coordinates;
  const centres = Object.values(regionCoordinates[countryId] ?? {});
  const keep = new Set<number>();
  for (const c of centres) {
    const p = proj(c)!;
    let hit = polys.findIndex(poly => polygonContains(poly[0].map(q => proj(q as [number, number])!), p));
    if (hit < 0) {
      let bestD = Infinity;
      polys.forEach((poly, i) => { for (const q of poly[0]) { const r = proj(q as [number, number])!; const d = (r[0] - p[0]) ** 2 + (r[1] - p[1]) ** 2; if (d < bestD) { bestD = d; hit = i; } } });
    }
    keep.add(hit);
  }
  if (keep.size === 0) {
    let best = 0, bestA = -1;
    polys.forEach((poly, i) => { const a = path.area({ type: 'Polygon', coordinates: poly }); if (a > bestA) { bestA = a; best = i; } });
    keep.add(best);
  }
  return { ...feat, geometry: { type: 'MultiPolygon', coordinates: polys.filter((_, i) => keep.has(i)) } };
}

/** Outer rings of a country, in the projection's screen space. */
function projectedRings(feat: Feature<Geometry>, proj: GeoProjection): [number, number][][] {
  const g = feat.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  return polys.map(poly => poly[0].map(p => proj(p as [number, number])!).filter(Boolean));
}

const segDist2 = (px: number, py: number, ax: number, ay: number, bx: number, by: number, sx: number) => {
  // Distance with x shrunk by `sx`, so wide open space scores higher than tall
  ax /= sx; bx /= sx; px /= sx;
  const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
  const t = L ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)) : 0;
  const qx = ax + t * dx - px, qy = ay + t * dy - py;
  return qx * qx + qy * qy;
};

/**
 * Where a region's label fits best: the point inside both its area and the
 * country that is farthest from any border or coast. Distances count width
 * three times less than height, because names are long and flat.
 */
function labelAnchor(cell: [number, number][], rings: [number, number][][], coast: [number, number][], home: [number, number]): [number, number] {
  // Stay on the landmass the region's own centre is on: the US West Coast's
  // area also takes in Alaska, which has more room but is the wrong place.
  // A centre just offshore goes to the nearest landmass.
  const dist2 = (r: [number, number][]) => Math.min(...r.map(p => (p[0] - home[0]) ** 2 + (p[1] - home[1]) ** 2));
  const land = rings.find(r => polygonContains(r, home)) ?? rings.reduce((a, b) => (dist2(a) <= dist2(b) ? a : b));
  const xs = cell.map(p => p[0]), ys = cell.map(p => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const STEPS = 22, SX = 3;
  let best = home, bestD = -1;
  for (let i = 0; i <= STEPS; i++) for (let j = 0; j <= STEPS; j++) {
    const x = x0 + ((x1 - x0) * i) / STEPS, y = y0 + ((y1 - y0) * j) / STEPS;
    if (!polygonContains(cell, [x, y]) || !polygonContains(land, [x, y])) continue;
    let d = Infinity;
    for (let k = 0; k < cell.length - 1 && d > bestD; k++) d = Math.min(d, segDist2(x, y, cell[k][0], cell[k][1], cell[k + 1][0], cell[k + 1][1], SX));
    for (let k = 0; k < coast.length && d > bestD; k++) { const dx = (coast[k][0] - x) / SX, dy = coast[k][1] - y; d = Math.min(d, dx * dx + dy * dy); }
    if (d > bestD) { bestD = d; best = [x, y]; }
  }
  return best;
}

/**
 * Split a country into its regions: each point of land goes to the nearest
 * region centre (a Voronoi diagram in screen space), and everything is
 * clipped to the coastline when drawn. Approximate, but it needs no boundary
 * data, and it turns the whole country into click targets.
 */
export function regionAreas(countryId: string, allRegions: RegionalCuisine[] | undefined, feat: Feature<Geometry>, proj: GeoProjection): RegionAreas | null {
  const coords = regionCoordinates[countryId];
  const regions = (allRegions ?? []).filter(r => coords?.[r.name]);
  if (!coords || regions.length === 0) return null;
  const path = geoPath(proj);
  const [[x0, y0], [x1, y1]] = path.bounds(feat);
  const pts = regions.map(r => proj(coords[r.name])!);
  const pad = Math.max(x1 - x0, y1 - y0);
  const voronoi = Delaunay.from(pts).voronoi([Math.min(x0, ...pts.map(p => p[0])) - pad, Math.min(y0, ...pts.map(p => p[1])) - pad, Math.max(x1, ...pts.map(p => p[0])) + pad, Math.max(y1, ...pts.map(p => p[1])) + pad]);
  // Only the land the regions are on steers labels; a name may touch a
  // small island, just not the coast it sits on or a region border
  const rings = projectedRings(homeLand(countryId, feat, proj), proj);
  const coast = rings.flat();
  return {
    outline: path(feat) ?? '',
    // The landmass extent that names are measured against (so Alaska doesn't
    // make the US look wide enough for bigger names)
    bounds: (() => { const xs = coast.map(p => p[0]), ys = coast.map(p => p[1]); return [[Math.min(...xs), Math.min(...ys)], [Math.max(...xs), Math.max(...ys)]] as [[number, number], [number, number]]; })(),
    borders: regions.length > 1 ? voronoi.render() : '',
    areas: regions.map((region, i) => {
      const poly = voronoi.cellPolygon(i) as [number, number][];
      const anchorPx = labelAnchor(poly, rings, coast, pts[i] as [number, number]);
      return { region, cell: voronoi.renderCell(i), anchor: proj.invert!(anchorPx) as [number, number], anchorPx };
    }),
  };
}

/** Each name's screen box at `zoom` and font `scale`: [x0, y0, x1, y1, w]. */
function labelBoxes(areas: RegionAreas, zoom: number, counts: Record<string, number>, scale: number) {
  return areas.areas.map(({ region, anchorPx }) => {
    const cx = anchorPx[0] * zoom, cy = anchorPx[1] * zoom;
    const name = regionLabelName(region.name);
    const w = name.length * 15 * 0.52 * scale + 6, h = ((counts[region.name] ?? 0) > 0 ? 34 : 20) * scale;
    return [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, w] as const;
  });
}

/**
 * Region names show all together or not at all: they hide if any two would
 * overlap, or if a name is big next to the country itself (measured on its
 * longer side, so tall countries like Vietnam still get names). `zoom`
 * multiplies the projection's px; `scale` is the labels' own font scaling.
 */
export function labelsFitAt(areas: RegionAreas, zoom: number, counts: Record<string, number>, scale = 1): boolean {
  const [[bx0, by0], [bx1, by1]] = areas.bounds;
  const span = Math.max(bx1 - bx0, by1 - by0) * zoom;
  const boxes = labelBoxes(areas, zoom, counts, scale);
  if (Math.max(...boxes.map(b => b[4])) > span * 0.5) return false;
  return !boxes.some((a, i) => boxes.some((b, j) => j > i && a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]));
}

/**
 * True while every name still sits inside a `view`-sized window centred on
 * `centrePx` at `zoom`. Overlap alone can't steer a landing camera: Malaysia's
 * names stop colliding at 3× zoom precisely because half of them have left
 * the screen by then.
 */
export function labelsInView(areas: RegionAreas, zoom: number, counts: Record<string, number>, scale: number, centrePx: [number, number], view: readonly [number, number]): boolean {
  const cx = centrePx[0] * zoom, cy = centrePx[1] * zoom;
  return labelBoxes(areas, zoom, counts, scale).every(b =>
    b[0] >= cx - view[0] / 2 && b[2] <= cx + view[0] / 2 && b[1] >= cy - view[1] / 2 && b[3] <= cy + view[1] / 2);
}
