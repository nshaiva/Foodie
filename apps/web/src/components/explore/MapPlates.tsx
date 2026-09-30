import { useEffect, useRef, useState } from 'react';
import { geoPath, type GeoProjection } from 'd3-geo';
import type { Feature, Geometry } from 'geojson';
import type { Group, Entry } from '../../utils/groupDishes';
import { homeLand, type RegionAreas } from '../../utils/regionAreas';
import type { Country, RegionalCuisine } from '../../data/types';
import { Marker } from 'react-simple-maps';
import { systemColors } from '../../data/systemColors';
import { entryView } from '../../utils/entryView';
import { plateFade } from '../../utils/plateFade';
import { plateLayout, signature, acrossAt, PLATE_R, WORLD_R, COUNTRY_R, type PlacedPlate } from '../../utils/plateLayout';

/**
 * Dish illustrations floating over the map (#36 preview).
 *
 * A plate always opens its dish; a region's name or area opens the region.
 *
 * Country zoom: one small plate per region, its most popular illustrated
 * dish, just under the region's name where the dish count would be. They show
 * all together or not at all, like the names: if any plate would touch a name
 * or another plate, none show until you zoom in. Nationwide dishes have no
 * place to point to, so they stay in the panel.
 * Region zoom: every illustrated dish from that region floats on a stem
 * over its home city, which is where there is finally room to tell
 * Mexico City from Puebla.
 *
 * Only dishes and drinks with an `image` show; the list has the rest.
 */

function Plate({ entry, at, lift, k, badge, label, onClick, id, stem = false, r: R = PLATE_R, opacity, compact = false, leaving = false, world = false }: {
  entry: Entry; at: [number, number]; lift: [number, number]; k: number;
  badge?: number; label: string; onClick: () => void; id: string;
  /** Draw a stem down to a dot on the exact point (region zoom only). */
  stem?: boolean;
  /** Radius in screen px; world plates are a little smaller. */
  r?: number;
  opacity?: number;
  /** Country-zoom plate: its name shows on hover only, never on touch. */
  compact?: boolean;
  /** Fading out: it lost its room or left the screen. */
  leaving?: boolean;
  /** World-zoom pin: no shadow, a thinner rim. */
  world?: boolean;
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
          <g className={['map-plate', compact && 'map-plate--compact', leaving && 'map-plate--out', world && 'map-plate--world'].filter(Boolean).join(' ')} role="button" tabIndex={0} aria-label={label} data-plate={v.name}
            onClick={e => { e.stopPropagation(); onClick(); }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
            style={{ cursor: 'pointer' }}>
            {!world && <ellipse className="map-plate-shadow" cx={0} cy={R + 9} rx={R * 0.7} ry={3.5} fill={systemColors.navy} opacity={0.2} />}
            <g className="map-plate-disc">
              <defs><clipPath id={id}><circle r={R} /></clipPath></defs>
              <circle r={R + (world ? 1.5 : 2.5)} fill="#fff" />
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

/**
 * World zoom: one small plate per country, its signature dish, floating over
 * the middle of its land. Plates that would overlap a neighbour's are left
 * out (bigger countries win) and appear as you zoom in. The scoped country's
 * plate fades out as its region plates fade in.
 */
export function WorldPlates({ countries, features, projection, zoom, labelScale, scopedId, onOpenCountry }: {
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
        // The opened country's plate goes the moment it opens; its own dishes
        // take over once the camera lands (see MapPlates)
        if (c.id === scopedId) return null;
        const opacity = 1;
        return <Plate key={c.id} id={`plate-w-${c.id}`} entry={sig} at={at} lift={[0, 0]} k={k} r={WORLD_R} opacity={opacity} compact world
          label={`${c.name} · ${entryView(sig).name}`} onClick={() => onOpenCountry(c.id)} />;
      })}
    </g>
  );
}

const LEAVE_MS = 300;

/**
 * Plates that just lost their place, kept for a moment so they can fade out
 * instead of vanishing: zooming and panning should feel continuous.
 */
function useLeaving(plates: PlacedPlate[]) {
  const prev = useRef(new Map<string, PlacedPlate>());
  const [leaving, setLeaving] = useState<(PlacedPlate & { leaving: true })[]>([]);
  const now = new Map(plates.map(p => [p.key, p]));
  const sig = [...now.keys()].sort().join('|');
  useEffect(() => {
    const gone = [...prev.current.values()].filter(p => !now.has(p.key));
    prev.current = now;
    if (!gone.length) return;
    const keys = new Set(gone.map(g => g.key));
    setLeaving(l => [...l.filter(x => !now.has(x.key) && !keys.has(x.key)), ...gone.map(p => ({ ...p, leaving: true as const }))]);
    window.setTimeout(() => setLeaving(l => l.filter(x => !keys.has(x.key))), LEAVE_MS);
    // The set of plates is what matters, not the array identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);
  return leaving.filter(p => !now.has(p.key));
}

export function MapPlates({ countryId, countryName, areas, groups, region, projection, zoom, labelScale, center, view, fitZoom, fitScale, onOpenDish }: {
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
  /** False on touch: names show once a plate is tapped (hover-only via CSS). */
  captions?: boolean;
  center: readonly [number, number];
  view: readonly [number, number];
  fitZoom: number;
  fitScale: number;
  onOpenDish: (entry: Entry) => void;
}) {
  const k = labelScale / zoom;
  // Plates need room: they fade out as the country shrinks on screen and are
  // gone by world view, so zooming out never buries a small country in food.
  const fade = plateFade(areas, zoom);
  const plates = fade === 0 ? [] : plateLayout({ areas, groups, region, zoom, labelScale, projection, countryId, countryName, center, view, fitZoom, fitScale });
  const leaving = useLeaving(plates);
  if (fade === 0 || (!plates.length && !leaving.length)) return null;
  const at = acrossAt(countryId);
  const acrossShowing = !region && plates.some(p => !p.region && !p.stem);
  return (
    <g opacity={fade} style={{ pointerEvents: fade < 0.6 ? 'none' : undefined }}>
      {[...plates, ...leaving].map(p => (
        <Plate key={p.key} id={`plate-${p.key.replace(/\W/g, '')}`} entry={p.entry} at={p.at} lift={p.lift} k={k} leaving={p.leaving}
          r={p.r} compact={p.compact} stem={p.stem} opacity={p.opacity} badge={p.badge} label={p.label} onClick={() => onOpenDish(p.entry)} />
      ))}
      {acrossShowing && at && (
        <Marker coordinates={at}>
          <text transform={`scale(${k})`} y={COUNTRY_R + 18} textAnchor="middle" fontSize={13} fontStyle="italic" fontWeight={500} fill={systemColors.navyMuted}
            stroke={systemColors.seaSalt} strokeWidth={3} paintOrder="stroke" style={{ fontFamily: 'var(--font-brand)', pointerEvents: 'none' }}>
            Across {countryName}
          </text>
        </Marker>
      )}
    </g>
  );
}
