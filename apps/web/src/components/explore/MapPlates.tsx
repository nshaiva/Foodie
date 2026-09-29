import { Marker } from 'react-simple-maps';
import { geoPath, type GeoProjection } from 'd3-geo';
import type { Feature, Geometry } from 'geojson';
import { systemColors } from '../../data/systemColors';
import type { Group, Entry } from '../../utils/groupDishes';
import { homeLand, type RegionAreas } from '../../utils/regionAreas';
import type { Country, RegionalCuisine } from '../../data/types';
import { entryView } from '../../utils/entryView';
import { plateFade } from '../../utils/plateFade';

/**
 * Dish illustrations floating over the map (#36 preview).
 *
 * A plate always opens its dish; a region's name or area opens the region.
 *
 * Country zoom: one plate per region, its most popular illustrated dish,
 * above the region's name, with a count of the others. Nationwide dishes
 * never sit on one place; they wait as a stack in open water.
 * Region zoom: every illustrated dish from that region floats on a stem
 * over its home city, which is where there is finally room to tell
 * Mexico City from Puebla.
 *
 * Only dishes with an `image` show; the list below the map has the rest.
 */

// Open water for each country's "Across" stack, in lon/lat.
const ACROSS_AT: Record<string, [number, number]> = { MX: [-90.8, 25.6] };

const PLATE_R = 21; // plate radius in screen px
const R = PLATE_R;
const WORLD_R = 17;
// Neighbouring regions' plates in a region view: dimmed, still tappable
const NEIGHBOUR_OPACITY = 0.7;
const LIFT = 50; // how far a plate floats above its point, in screen px

const RANK = { both: 0, 'tourist-classic': 1, 'local-favorite': 2 } as const;
const rank = (e: Entry) => {
  const src = e.kind === 'dish' ? e.dish : e.kind === 'drink' ? e.drink : undefined;
  const p = src && 'popularity' in src ? src.popularity : undefined;
  return p ? RANK[p] : 3;
};
const imaged = (entries: Entry[]) => entries.filter(e => entryView(e).image).sort((a, b) => rank(a) - rank(b));
const originOf = (e: Entry) => (e.kind === 'dish' ? e.dish.origin : e.kind === 'drink' ? e.drink.origin : undefined);

function Plate({ entry, at, lift, k, badge, label, onClick, id, stem = false, r: R = PLATE_R, opacity }: {
  entry: Entry; at: [number, number]; lift: [number, number]; k: number;
  badge?: number; label: string; onClick: () => void; id: string;
  /** Draw a stem down to a dot on the exact point (region zoom only). */
  stem?: boolean;
  /** Radius in screen px; world plates are a little smaller. */
  r?: number;
  opacity?: number;
}) {
  const v = entryView(entry);
  const [dx, dy] = lift;
  return (
    <Marker coordinates={at}>
      <g transform={`scale(${k})`} opacity={opacity} style={opacity !== undefined && opacity < 0.6 ? { pointerEvents: 'none' } : undefined}>
        {stem && <>
          <line x1={0} y1={0} x2={dx} y2={dy + R} stroke={systemColors.navy} strokeOpacity={0.45} strokeWidth={1} />
          <circle r={2.6} fill={systemColors.navy} />
        </>}
        <g transform={`translate(${dx} ${dy})`}>
          <g className="map-plate" role="button" tabIndex={0} aria-label={label} data-plate={v.name}
            onClick={e => { e.stopPropagation(); onClick(); }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
            style={{ cursor: 'pointer' }}>
            <ellipse className="map-plate-shadow" cx={0} cy={R + 9} rx={R * 0.7} ry={3.5} fill={systemColors.navy} opacity={0.2} />
            <g className="map-plate-disc">
              <defs><clipPath id={id}><circle r={R} /></clipPath></defs>
              <circle r={R + 2.5} fill="#fff" />
              <image href={v.image} x={-R * 1.95} y={-R * 1.95 * (2 / 3)} width={R * 3.9} height={R * 3.9 * (2 / 3)} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
              {badge ? <g transform={`translate(${R * 0.78} ${-R * 0.78})`}>
                <circle r={9} fill={systemColors.tomato} stroke="#fff" strokeWidth={2} />
                <text textAnchor="middle" dominantBaseline="central" fontSize={9.5} fontWeight={700} fill="#fff">+{badge}</text>
              </g> : null}
            </g>
            <g className="map-plate-name" transform={`translate(0 ${-(R + 17)})`}>
              <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill={systemColors.navy}
                stroke="#fff" strokeWidth={4} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-heading)' }}>
                {label}
              </text>
            </g>
          </g>
        </g>
      </g>
    </Marker>
  );
}

/** A country's signature: its most popular dish or drink with an image. */
function signature(country: Country): Entry | undefined {
  const entries: Entry[] = [
    ...country.popularDishes.map<Entry>(dish => ({ kind: 'dish', key: `d:${dish.name}`, dish })),
    ...(country.popularBeverages ?? []).map<Entry>(drink => ({ kind: 'drink', key: `b:${drink.name}`, drink })),
  ];
  return imaged(entries)[0];
}

/**
 * World zoom: one small plate per country, its signature dish, floating over
 * the middle of its land. Plates that would overlap a neighbour's are left
 * out (bigger countries win) and appear as you zoom in. The scoped country's
 * plate fades out as its region plates fade in.
 */
export function WorldPlates({ countries, features, projection, zoom, labelScale, scopedId, scopedFade, onOpenCountry }: {
  countries: Country[];
  features: Map<string, Feature<Geometry>>;
  projection: GeoProjection;
  zoom: number;
  labelScale: number;
  /** The opened country, if any, and how far its region plates have faded in. */
  scopedId?: string;
  scopedFade: number;
  onOpenCountry: (id: string) => void;
}) {
  const k = labelScale / zoom;
  const path = geoPath(projection);
  const spots = countries.flatMap(c => {
    const feat = features.get(c.id);
    const sig = feat && signature(c);
    if (!feat || !sig) return [];
    const land = homeLand(c.id, feat, projection);
    const [[x0, y0], [x1, y1]] = path.bounds(land);
    const at = projection.invert!([(x0 + x1) / 2, (y0 + y1) / 2]) as [number, number];
    return [{ c, sig, at, px: [(x0 + x1) / 2 * zoom, (y0 + y1) / 2 * zoom], area: path.area(land) }];
  }).sort((a, b) => b.area - a.area);
  const placed: typeof spots = [];
  for (const s of spots) {
    if (placed.every(p => Math.hypot(p.px[0] - s.px[0], p.px[1] - s.px[1]) > WORLD_R * 2.6 * labelScale)) placed.push(s);
  }
  return (
    <g>
      {placed.map(({ c, sig, at }) => {
        const opacity = c.id === scopedId ? 1 - scopedFade : 1;
        if (opacity <= 0.01) return null;
        return <Plate key={c.id} id={`plate-w-${c.id}`} entry={sig} at={at} lift={[0, 0]} k={k} r={WORLD_R} opacity={opacity}
          label={`${c.name} · ${entryView(sig).name}`} onClick={() => onOpenCountry(c.id)} />;
      })}
    </g>
  );
}

export function MapPlates({ countryId, countryName, areas, groups, region, projection, zoom, labelScale, onOpenDish }: {
  countryId: string;
  countryName: string;
  areas: RegionAreas;
  /** Every entry grouped by region, unfiltered. */
  groups: Group[];
  /** The zoomed-into region, if any. */
  region?: RegionalCuisine;
  projection: GeoProjection;
  zoom: number;
  labelScale: number;
  onOpenDish: (entry: Entry) => void;
}) {
  const k = labelScale / zoom;

  // Plates need room: they fade out as the country shrinks on screen and are
  // gone by world view, so zooming out never buries a small country in food.
  const fade = plateFade(areas, zoom);
  if (fade === 0) return null;
  const wrap = (children: React.ReactNode) => <g opacity={fade} style={{ pointerEvents: fade < 0.6 ? 'none' : undefined }}>{children}</g>;

  // The country layer: one plate per region plus the "Across" stack. In a
  // region view it stays on for the neighbours, dimmed like their names.
  const countryLayer = (skipRegion?: string, skip: Set<string> = new Set(), opacity?: number) => {
    const pick = (entries: Entry[]) => imaged(entries).filter(e => !skip.has(e.key));
    const plates = areas.areas.flatMap(({ region: r, anchor }) => {
      if (r.name === skipRegion) return [];
      const list = pick(groups.find(g => g.region?.name === r.name)?.entries ?? []);
      if (!list.length) return [];
      return [<Plate key={r.name} id={`plate-r-${r.name.replace(/\W/g, '')}`} entry={list[0]} at={anchor} lift={[0, -LIFT]} k={k} opacity={opacity}
        badge={list.length - 1} label={entryView(list[0]).name} onClick={() => onOpenDish(list[0])} />];
    });
    const across = pick(groups.find(g => g.isBucket && !g.region)?.entries ?? []).slice(0, 2);
    const at = ACROSS_AT[countryId];
    return (
      <>
        {plates}
        {at && across.length > 0 && (
          <g opacity={opacity}>
            {across.map((e, i) => (
              <Plate key={e.key} id={`plate-a-${i}`} entry={e} at={at} lift={[(i - (across.length - 1) / 2) * (R * 2.5), 0]} k={k}
                label={entryView(e).name} onClick={() => onOpenDish(e)} />
            ))}
            <Marker coordinates={at}>
              <text transform={`scale(${k})`} y={R + 26} textAnchor="middle" fontSize={13} fontStyle="italic" fontWeight={500} fill={systemColors.navyMuted}
                stroke={systemColors.seaSalt} strokeWidth={3} paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)', pointerEvents: 'none' }}>
                Across {countryName}
              </text>
            </Marker>
          </g>
        )}
      </>
    );
  };

  if (!region) return wrap(countryLayer());

  // Region zoom: this region's dishes, plus any dish whose home city falls
  // inside it (tacos al pastor is "Across Mexico" but from Mexico City).
  const nearest = (p: [number, number]) => {
    let best = areas.areas[0], bestD = Infinity;
    for (const a of areas.areas) { const d = (a.anchorPx[0] - p[0]) ** 2 + (a.anchorPx[1] - p[1]) ** 2; if (d < bestD) { bestD = d; best = a; } }
    return best.region.name;
  };
  const own = imaged(groups.find(g => g.region?.name === region.name)?.entries ?? []);
  const visitors = imaged(groups.flatMap(g => (g.region?.name === region.name ? [] : g.entries)))
    .filter(e => { const o = originOf(e); return o && nearest(projection(o.coordinates)! as [number, number]) === region.name; });
  const anchor = areas.areas.find(a => a.region.name === region.name)!.anchor;
  const items = [...own, ...visitors].map(e => ({ e, at: originOf(e)?.coordinates ?? anchor }));

  // Plates whose points are close on screen fan out sideways on their stems
  const px = items.map(it => projection(it.at)!.map(n => n * zoom));
  const dx = items.map(() => 0);
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    // Compare in screen px: a plate is R * labelScale across on screen
    const gap = Math.hypot(px[i][0] - px[j][0], px[i][1] - px[j][1]);
    const need = R * 2.7 * labelScale;
    if (gap < need) { const push = (need - gap) / 2 / labelScale; const left = px[i][0] <= px[j][0] ? i : j; dx[left] -= push; dx[left === i ? j : i] += push; }
  }
  return wrap(
    <>
      {/* Neighbours keep their plates, dimmed; dishes already floating
          over this region's cities aren't repeated there */}
      {countryLayer(region.name, new Set(items.map(it => it.e.key)), NEIGHBOUR_OPACITY)}
      {items.map((it, i) => {
        const o = originOf(it.e);
        return <Plate key={it.e.key} id={`plate-z-${i}`} entry={it.e} at={it.at} lift={[dx[i], -LIFT]} k={k}
          label={o ? `${entryView(it.e).name} · ${o.place}` : entryView(it.e).name} onClick={() => onOpenDish(it.e)} stem />;
      })}
    </>
  );
}
