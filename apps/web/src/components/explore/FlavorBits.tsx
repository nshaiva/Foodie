import { systemColors } from '../../data/systemColors';
import { axesByIntensity, FLAVOR_AXIS_IDS, FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';
import type { FlavorIntensity } from '../../data/types';

/**
 * The shared visual language of Explore's condensed blocks and the trays
 * that expand them (#39): one heading style, one small-caps label, one card
 * surface, one radar colour and one bar treatment, so opening a tray reads as
 * the same block, expanded.
 */

/** The radar's colour, in the overview's mini radar and the tray's full one. */
export const RADAR_COLOR = systemColors.tomato;

export const CARD_CLASS = 'rounded-2xl border';
export const CARD_STYLE = { backgroundColor: systemColors.surface, borderColor: systemColors.border } as const;

export function BlockHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h3 id={id} className="text-lg font-extrabold" style={{ color: systemColors.navy }}>{children}</h3>;
}

/** Small caps section label, as on the region title block. */
export function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-xs font-semibold uppercase tracking-[0.08em] ${className}`} style={{ color: systemColors.navyMuted }}>
      {children}
    </div>
  );
}

/** Body text for the culture teaser and every culture section in the tray. */
export const BODY_CLASS = 'text-sm leading-relaxed';
export const BODY_STYLE = { color: systemColors.navyLight } as const;

/**
 * A small hexagonal radar in the tray's axis order (Heat at the top, then
 * clockwise: Acidity, Sweet, Umami, Aromatic, Smoke/Earth), drawn directly:
 * at this size Recharts' labels only crowd it.
 */
export function MiniRadar({ intensity }: { intensity: FlavorIntensity }) {
  const cx = 60, cy = 60, r = 48;
  const xy = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / FLAVOR_AXIS_IDS.length - Math.PI / 2;
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v];
  };
  const point = (i: number, v: number) => xy(i, v).map(n => n.toFixed(1)).join(',');
  const ring = (v: number) => FLAVOR_AXIS_IDS.map((_, i) => point(i, v)).join(' ');
  const shape = FLAVOR_AXIS_IDS.map((axis, i) => point(i, Math.max(0.05, intensity[axis] / 10))).join(' ');
  const label = FLAVOR_AXIS_IDS.map(a => `${FLAVOR_AXIS_META[a].label} ${intensity[a]}`).join(', ');
  return (
    <svg viewBox="0 0 120 120" className="w-[104px] h-[104px] md:w-[120px] md:h-[120px] flex-none" role="img" aria-label={`Flavor radar: ${label}`}>
      <polygon points={ring(1)} fill="none" stroke={systemColors.border} strokeWidth="1" />
      <polygon points={ring(0.5)} fill="none" stroke={systemColors.border} strokeWidth="0.8" />
      <polygon points={shape} fill={RADAR_COLOR} fillOpacity="0.2" stroke={RADAR_COLOR} strokeWidth="2" strokeLinejoin="round" />
      {/* The same hollow axis-colour dots the full radar puts beside its labels */}
      {FLAVOR_AXIS_IDS.map((axis, i) => {
        const [x, y] = xy(i, 1.15);
        return <circle key={axis} cx={x} cy={y} r="3.2" fill="none" stroke={FLAVOR_AXIS_META[axis].color} strokeWidth="1.8" />;
      })}
    </svg>
  );
}

/** The axis bars, strongest first, in each axis's own colour. */
export function AxisBars({ intensity, showValues = false }: { intensity: FlavorIntensity; showValues?: boolean }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
      {axesByIntensity(intensity).map(({ axis, value }) => (
        <div key={axis} className="flex items-center gap-2.5" data-axis={axis}>
          <span className="w-[5.5rem] flex-none text-xs font-semibold" style={{ color: FLAVOR_AXIS_META[axis].color }}>{FLAVOR_AXIS_META[axis].label}</span>
          <span className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: systemColors.border }}>
            <span className="block h-1.5 rounded-full" style={{ width: `${value * 10}%`, backgroundColor: FLAVOR_AXIS_META[axis].color }} />
          </span>
          {showValues && <span className="w-9 flex-none text-right text-xs tabular-nums" style={{ color: systemColors.navyMuted }}>{value}/10</span>}
        </div>
      ))}
    </div>
  );
}
