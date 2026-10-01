import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { geoPath, type GeoProjection } from 'd3-geo';
import type { Feature, Geometry } from 'geojson';
import type { Group, Entry } from '../../utils/groupDishes';
import { homeLand, type RegionAreas } from '../../utils/regionAreas';
// The map's quiet caps: the same style the region names use while plates show
const QUIET_INK = '#9C7F77';
const quietCaps = { fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', fill: QUIET_INK, stroke: systemColors.seaSalt, strokeWidth: 2.5, strokeLinejoin: 'round' as const, paintOrder: 'stroke' as const, style: { fontFamily: 'var(--font-heading)', textTransform: 'uppercase' as const } };
import type { Country, RegionalCuisine } from '../../data/types';
import { Marker } from 'react-simple-maps';
import { systemColors } from '../../data/systemColors';
import { entryView } from '../../utils/entryView';
import { plateFade } from '../../utils/plateFade';
import { plateLayout, signature, acrossAt, acrossRing, worldPicks, PLATE_R, WORLD_R, COUNTRY_R, type PlacedPlate, type RegionUnit } from '../../utils/plateLayout';

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

function Plate({ entry, at, lift, k, badge, label, onClick, onHover, id, stem = false, r: R = PLATE_R, opacity, compact = false, leaving = false, world = false, under, slide = false }: {
  /** Ease a change of lift (an opening fan or pile). Off while zooming, where
   *  every frame recomputes lifts and easing reads as wobble and flicker. */
  slide?: boolean;
  /** Depth under a more popular neighbour (1, 2, 3+): fainter and smaller. */
  under?: number;
  /** Given, the name is drawn by the parent in a layer above the map's
   *  labels (see PlateCaption); absent, it sits in the plate's own group. */
  onHover?: (hovering: boolean) => void;
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
        {/* CSS transform rather than the attribute, so a lift that changes (the Across fan) eases there */}
        <g style={{ transform: `translate(${dx}px, ${dy}px)`, transition: slide ? 'transform 260ms cubic-bezier(.3, 1.4, .5, 1)' : undefined }}>
          <g className={['map-plate', compact && 'map-plate--compact', leaving && 'map-plate--out', world && 'map-plate--world', under && `map-plate--under-${Math.min(3, under)}`].filter(Boolean).join(' ')} role="button" tabIndex={0} aria-label={label} data-plate={v.name}
            onClick={e => { e.stopPropagation(); onClick(); }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
            onMouseEnter={onHover && (() => onHover(true))} onMouseLeave={onHover && (() => onHover(false))}
            onFocus={onHover && (() => onHover(true))} onBlur={onHover && (() => onHover(false))}
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
            {!onHover && (
              <g className="map-plate-name" transform={`translate(0 ${-(R + 17)})`}>
                <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill={systemColors.navy}
                  stroke="#fff" strokeWidth={4} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: 'var(--font-heading)' }}>
                  {label}
                </text>
              </g>
            )}
          </g>
        </g>
      </g>
    </Marker>
  );
}

/**
 * The hovered plate's name, on a cream pill. Drawn in its own layer above the
 * region names (Explore hands MapPlates a `<g>` placed after them), so the
 * name you asked for is never painted under "Northern China" or a neighbour's
 * plate. Width is estimated the same way plateLayout's captionBox does.
 */
function PlateCaption({ plate, k }: { plate: PlacedPlate; k: number }) {
  const [dx, dy] = plate.lift;
  const w = plate.label.length * 11 * 0.56 + 18, h = 20;
  return (
    <Marker coordinates={plate.at} style={{ default: { pointerEvents: 'none' }, hover: { pointerEvents: 'none' }, pressed: { pointerEvents: 'none' } }}>
      <g transform={`scale(${k}) translate(${dx} ${dy - (plate.r + 19)})`} style={{ pointerEvents: 'none' }}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={systemColors.seaSalt} stroke={systemColors.navy} strokeOpacity={0.25} strokeWidth={1} />
        <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill={systemColors.navy} style={{ fontFamily: 'var(--font-heading)' }}>
          {plate.label}
        </text>
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
export function WorldPlates({ countries, features, projection, zoom, labelScale, scopedId, scopedFade, unitsFor, onOpenCountry }: {
  /** Every country's region units (Explore computes them once the outlines are in). */
  unitsFor: Map<string, RegionUnit[]>;
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
  // Pins grow from a marker into a plate as you zoom toward a country, so the
  // handover to its region plates is a crossfade at one size, not a jump
  const grow = Math.max(0, Math.min(1, (zoom - 1.4) / 2));
  const R = WORLD_R + (COUNTRY_R - WORLD_R) * grow;
  type Spot = { c: Country; entry: Entry; at: [number, number]; px: [number, number]; area: number; i: number };
  const spots: Spot[] = countries.flatMap(c => {
    const feat = features.get(c.id);
    if (!feat) return [];
    const land = homeLand(c.id, feat, projection);
    const [[x0, y0], [x1, y1]] = path.bounds(land);
    const area = path.area(land);
    const toPx = (p: [number, number]) => (projection(p) as [number, number]).map(n => n * zoom) as [number, number];
    // The pin budget follows how much screen the country takes: Egypt 1,
    // Mexico 2, China 3 at the phone's first-pins zoom, never more than 3
    const budget = Math.max(1, Math.min(3, Math.floor((area * zoom * zoom) / 3500)));
    // Pins are region units: the same dish at the same spot the country zoom
    // shows, so zooming in never moves one (decided 2026-10-01)
    const units = unitsFor.get(c.id) ?? [];
    if (units.length) return worldPicks(units, budget, toPx).map((u, i) => ({ c, entry: u.entries[0], at: u.at, px: toPx(u.at), area, i }));
    // No regions yet (Japan, Ethiopia, Peru): the signature dish at the centre
    const sig = signature(c);
    if (!sig) return [];
    const centre = projection.invert!([(x0 + x1) / 2, (y0 + y1) / 2]) as [number, number];
    return [{ c, entry: sig, at: centre, px: toPx(centre), area, i: 0 }];
  }).sort((a, b) => b.area - a.area || a.i - b.i);
  const placed: Spot[] = [];
  for (const s of spots) {
    if (placed.every(p => Math.hypot(p.px[0] - s.px[0], p.px[1] - s.px[1]) > R * 2.6 * labelScale)) placed.push(s);
  }
  return (
    <g>
      {placed.map(({ c, entry, at, i }) => {
        // The opened country's pins go as its region plates arrive: gone by
        // the time those are a third of the way in, so they never linger as
        // ghosts over the real plates
        const opacity = c.id === scopedId ? Math.max(0, 1 - scopedFade * 3) : 1;
        if (opacity <= 0.02) return null;
        return <Plate key={`${c.id}:${i}`} id={`plate-w-${c.id}-${i}`} entry={entry} at={at} lift={[0, 0]} k={k} r={R} opacity={opacity} compact world
          label={`${c.name} · ${entryView(entry).name}`} onClick={() => onOpenCountry(c.id)} />;
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

export function MapPlates({ countryId, countryName, areas, groups, region, projection, zoom, labelScale, captions = true, captionLayer, center, view, fitZoom, fitScale, onOpenDish, onOpenAcross, acrossSelected = false }: {
  countryId: string;
  countryName: string;
  /** A click on the "Across {country}" label opens it as a region. */
  onOpenAcross?: () => void;
  /** The Across region is the open scope: the cluster stays open and labelled. */
  acrossSelected?: boolean;
  areas: RegionAreas;
  /** Every entry grouped by region, unfiltered. */
  groups: Group[];
  /** The zoomed-into region, if any. */
  region?: RegionalCuisine;
  projection: GeoProjection;
  zoom: number;
  labelScale: number;
  /** False on touch: no plate names at all (a tap opens the dish, which names it). */
  captions?: boolean;
  /** An SVG group placed above the region names; the hovered plate's name renders there. */
  captionLayer?: Element | null;
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
  const [hovered, setHovered] = useState<string | null>(null);
  // The open cluster: 'across' for the sea cluster, or a pile's id. Hover
  // opens on desktop; on touch a tap on the pile opens it and a press
  // anywhere else closes it
  const [openStack, setOpenStack] = useState<string | null>(null);
  useEffect(() => {
    if (!openStack || captions) return;
    const close = (e: Event) => { if (!(e.target as Element | null)?.closest?.('[data-stack]')) setOpenStack(null); };
    document.addEventListener('pointerdown', close, { capture: true, passive: true });
    return () => document.removeEventListener('pointerdown', close, { capture: true });
  }, [openStack, captions]);
  if (fade === 0 || (!plates.length && !leaving.length)) return null;
  const at = acrossAt(countryId);

  // The "Across {country}" cluster at sea. Desktop: the most popular dish is
  // the hub with "+N", the rest stack under it and fan into a ring on hover.
  // Touch: a label pill is the hub and every dish sits on the ring, since
  // there is no hover to open a stack with.
  const across = plates.filter(p => p.across).sort((a, b) => a.across!.i - b.across!.i);
  // Sized from the cluster's total, never the on-screen count, so nothing re-fans.
  // One nationwide dish (China: baozi) is just a plate with the label, on both
  const acrossN = across[0]?.across?.n ?? 0;
  const withHub = captions || acrossN === 1;
  const acrossRingG = acrossN > 1 ? acrossRing(withHub ? acrossN - 1 : acrossN) : undefined;
  const acrossOpen = withHub && (openStack === 'across' || acrossSelected) && !!acrossRingG;

  const liftOf = (p: PlacedPlate): [number, number] => {
    if (p.across) {
      if (!acrossRingG) return [0, 0];
      if (!withHub) return acrossRingG.at(p.across.i);
      if (p.across.i === 0) return [0, 0];
      return acrossOpen ? acrossRingG.at(p.across.i - 1) : p.lift;
    }
    if (p.pile && openStack === p.pile.id) return p.pile.spread;
    return p.lift;
  };
  const piles = new Map<string, PlacedPlate[]>();
  for (const p of plates) if (p.pile) piles.set(p.pile.id, [...(piles.get(p.pile.id) ?? []), p]);
  const acrossLabelY = acrossOpen && acrossRingG ? acrossRingG.ringR + COUNTRY_R + 18 : COUNTRY_R + 18;

  const hoveredPlate = captions && hovered ? plates.find(p => p.key === hovered) : undefined;
  const caption = hoveredPlate && <PlateCaption plate={{ ...hoveredPlate, lift: liftOf(hoveredPlate) }} k={k} />;
  const plate = (p: PlacedPlate) => {
    const isHub = !!p.across && p.across.i === 0;
    const closed = !!p.across && openStack !== 'across';
    const pileOpen = !!p.pile && openStack === p.pile.id;
    return (
      <Plate key={p.key} id={`plate-${p.key.replace(/\W/g, '')}`} entry={p.entry} at={p.at} lift={liftOf(p)} k={k} leaving={p.leaving}
        r={p.r} compact={p.compact} stem={p.stem} opacity={p.opacity} label={p.label} under={pileOpen ? undefined : p.under}
        slide={!!p.across || !!p.pile}
        badge={isHub && closed && withHub && acrossN > 1 ? acrossN - 1 : p.badge}
        onClick={() => {
          // On touch a closed pile slides apart on the first tap, and the sea
          // cluster's hub opens it; every other tap opens the dish
          if (!captions && p.pile && openStack !== p.pile.id) { setOpenStack(p.pile.id); return; }
          if (isHub && closed && !captions && withHub && acrossN > 1) { setOpenStack('across'); return; }
          setOpenStack(null);
          onOpenDish(p.entry);
        }}
        onHover={captions ? (on => setHovered(on ? p.key : cur => (cur === p.key ? null : cur))) : undefined} />
    );
  };
  // A stack's group: hover opens it on desktop, and a transparent disc holds
  // the hover across the gaps between fanned plates
  const stackGroup = (id: string, list: PlacedPlate[], hubAt: [number, number], ringR: number | undefined, extra?: React.ReactNode) => (
    <g key={`stack-${id}`} data-stack={id}
      onMouseEnter={captions ? () => setOpenStack(id) : undefined}
      onMouseLeave={captions ? () => setOpenStack(cur => (cur === id ? null : cur)) : undefined}>
      {openStack === id && ringR !== undefined && (
        <Marker coordinates={hubAt}>
          <circle r={(ringR + COUNTRY_R + 14) * k} fill="transparent" />
        </Marker>
      )}
      {/* Least popular first, so the hub ends up on top */}
      {[...list].reverse().map(plate)}
      {extra}
    </g>
  );
  return (
    <g opacity={fade} style={{ pointerEvents: fade < 0.6 ? 'none' : undefined }}>
      {/* Deepest first, so where dishes crowd the most popular is drawn on top */}
      {[...plates.filter(p => !p.across && !p.pile), ...leaving].sort((a, b) => (b.under ?? 0) - (a.under ?? 0)).map(plate)}
      {/* Piles after the rest, so an open one slides over its neighbours */}
      {[...piles.entries()].map(([id, list]) => stackGroup(id, [...list].sort((a, b) => a.pile!.i - b.pile!.i), list[0].at, openStack === id ? (list[0].pile!.n * (COUNTRY_R * 2 + 8)) / 2 : undefined))}
      {across.length > 0 && at && stackGroup('across', across, at, withHub ? acrossRingG?.ringR : undefined, (
        <>
          {!withHub && acrossRingG && (!region || acrossSelected) && (
            <Marker coordinates={at}>
              <g transform={`scale(${k})`} data-r={`Across ${countryName}`} style={{ cursor: 'pointer' }}>
                <rect x={-50} y={-15} width={100} height={30} rx={15} fill={systemColors.seaSalt} stroke={systemColors.navy} strokeOpacity={0.25} strokeWidth={1} />
                <text textAnchor="middle" dominantBaseline="central" y={-5} {...quietCaps} stroke="none">
                  Across {countryName}
                </text>
                <text textAnchor="middle" dominantBaseline="central" y={8} fontSize={7.5} letterSpacing="0.12em" fill={systemColors.navyMuted}>
                  {acrossN} {acrossN === 1 ? 'DISH' : 'DISHES'}
                </text>
              </g>
            </Marker>
          )}
          {withHub && (!region || acrossSelected) && (
            <Marker coordinates={at}>
              <g transform={`scale(${k})`} data-r={`Across ${countryName}`} style={{ cursor: 'pointer' }}
                onClick={e => { e.stopPropagation(); onOpenAcross?.(); }}>
                <text textAnchor="middle" {...quietCaps} fill={acrossSelected ? systemColors.navy : QUIET_INK}
                  style={{ ...quietCaps.style, transform: `translateY(${acrossLabelY}px)`, transition: 'transform 260ms cubic-bezier(.3, 1.4, .5, 1)' }}>
                  Across {countryName}
                </text>
              </g>
            </Marker>
          )}
        </>
      ))}
      {caption && (captionLayer ? createPortal(caption, captionLayer) : caption)}
    </g>
  );
}
