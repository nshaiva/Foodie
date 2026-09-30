/**
 * Softening the wine map's Voronoi divide so its borders sit with the app's
 * illustrated look. The divide is a set of straight-edged cells that tile the
 * country; whatever we do to an edge has to happen identically in both cells
 * that share it, or the tinted, selected cell would show slivers against the
 * dashed border. So every edge is worked in one canonical direction (lower
 * endpoint first) and reversed for the cell that walks it the other way, and
 * the border is drawn from the same unique edges the cells are built from.
 *
 * The softening bends each edge and leaves every junction a single sharp
 * point: rounding the corners was tried and rejected, because three cells
 * meet at each Voronoi vertex and three rounded corners leave a small curved
 * triangle between the regions.
 *
 * Sizes are relative to `span`, the country's projected extent, so the
 * softening looks the same on Italy at 13× as on the US at 4×.
 */

export type BorderStyle = 'straight' | 'wobble';

/** Which softening the map draws. `straight` is the original Voronoi. */
export const BORDER_STYLE: BorderStyle = 'wobble';

/** Peak sideways drift of an edge, as a share of the span, and the most of
 *  the edge's own length it may drift (short edges stay nearly straight). */
const WOBBLE_SPAN = 0.014;
const WOBBLE_EDGE_SHARE = 0.05;

type Pt = [number, number];

const fmt = (n: number) => (Math.round(n * 1000) / 1000).toString();
const P = (p: Pt) => `${fmt(p[0])},${fmt(p[1])}`;
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** The ring without its closing duplicate or any zero-length edges. */
function cleanRing(poly: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of poly) {
    const last = out[out.length - 1];
    if (!last || dist(last, p) > 1e-6) out.push(p);
  }
  if (out.length > 1 && dist(out[0], out[out.length - 1]) <= 1e-6) out.pop();
  return out;
}

/** An edge in its canonical direction, with a key both its cells agree on. */
function canon(a: Pt, b: Pt) {
  const flipped = a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);
  const [p, q] = flipped ? [b, a] : [a, b];
  return { a: p, b: q, flipped, key: `${p[0].toFixed(3)},${p[1].toFixed(3)}|${q[0].toFixed(3)},${q[1].toFixed(3)}` };
}

// A small deterministic hash so the wobble is seeded by where an edge is,
// never by render order: it must not shimmer between frames or sessions.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rnd(seed: number, i: number) {
  let x = (seed + Math.imul(i + 1, 0x9e3779b9)) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/**
 * A hand-drawn take on one edge: a gentle bow plus one slower wave, both
 * fading to nothing at the endpoints so the junctions stay exact. Returned in
 * canonical direction, endpoints included.
 */
function wobbleEdge(a: Pt, b: Pt, key: string, span: number): Pt[] {
  const L = dist(a, b);
  const amp = Math.min(span * WOBBLE_SPAN, L * WOBBLE_EDGE_SHARE);
  const n = Math.max(6, Math.min(40, Math.round(L / (span * 0.015))));
  const seed = hash(key);
  const bow = rnd(seed, 0) * 2 - 1;
  const wave = 0.3 + rnd(seed, 1) * 0.5, phase = rnd(seed, 2) * Math.PI * 2;
  const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
  const pts: Pt[] = [a];
  for (let i = 1; i < n; i++) {
    const s = i / n;
    const off = amp * Math.sin(Math.PI * s) * (bow + wave * Math.sin(Math.PI * 2 * s + phase));
    const base = lerp(a, b, s);
    pts.push([base[0] + nx * off, base[1] + ny * off]);
  }
  pts.push(b);
  return pts;
}

export type SoftCells = { cells: string[]; borders: string };

/**
 * The cells and the border network as SVG paths, softened the same way.
 * `polys` are the Voronoi cell polygons (closing point repeated), in the
 * projection's px; `span` is the country's extent in the same units.
 */
export function softenCells(polys: Pt[][], span: number, style: BorderStyle = BORDER_STYLE): SoftCells {
  const rings = polys.map(cleanRing);
  const drawn = new Map<string, Pt[]>();
  // The same points for an edge whichever cell asks, reversed to match its walk
  const edgePts = (a: Pt, b: Pt) => {
    const e = canon(a, b);
    let pts = drawn.get(e.key);
    if (!pts) { pts = style === 'wobble' ? wobbleEdge(e.a, e.b, e.key, span) : [e.a, e.b]; drawn.set(e.key, pts); }
    return e.flipped ? [...pts].reverse() : pts;
  };
  const cells = rings.map(ring => {
    if (ring.length < 3) return '';
    let d = `M${P(ring[0])}`;
    for (let i = 0; i < ring.length; i++) for (const p of edgePts(ring[i], ring[(i + 1) % ring.length]).slice(1)) d += `L${P(p)}`;
    return d + 'Z';
  });
  // Every edge once; `drawn` holds exactly the unique edges the cells used
  const borders = [...drawn.values()].map(pts => 'M' + pts.map(P).join('L')).join('');
  return { cells, borders };
}
