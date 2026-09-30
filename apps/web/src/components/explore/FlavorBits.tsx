import { systemColors } from '../../data/systemColors';

/**
 * The shared visual language of Explore's condensed blocks and the trays
 * that expand them (#39): one heading style, one small-caps label, one card
 * surface and one radar colour, so opening a tray reads as the same block,
 * expanded.
 */

/** The radar's colour, on the overview card and in the flavor tray. */
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

