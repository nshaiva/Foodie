import type { FlavorAxisId } from '../data/types';

/**
 * One outline icon per flavor axis (Nikita, 2026-10-02): the radar's vertices
 * carry these instead of words on the country overview, and beside the words
 * in the full fingerprint, so the full view teaches what the glance shows.
 * Stroke only, in `currentColor`, so each takes its axis colour from the
 * parent. Drawn on a 24-unit grid.
 */
const PATHS: Record<FlavorAxisId, string> = {
  // a flame
  heat: 'M12 3.5c.6 2.4 3 3.9 3.8 6.2A4.5 4.5 0 1 1 7.5 12c0-1.2.4-2.2 1.2-3.1.4 1 1.1 1.7 2 2.1C10.6 8.6 10.9 6 12 3.5z',
  // half a citrus, three segments
  acidity: 'M4 13a8 8 0 0 1 16 0H4z M12 13V5 M12 13l-5.7-5.7 M12 13l5.7-5.7',
  // a drop of honey
  sweetness: 'M12 3.5s6 6.5 6 10.5a6 6 0 0 1-12 0c0-4 6-10.5 6-10.5z',
  // a steaming bowl
  umami: 'M3.5 12.5h17c0 4.5-3 7.5-8.5 7.5S3.5 17 3.5 12.5z M9 8.5c0-1.5 1.2-1.5 1.2-3 M14 8.5c0-1.5 1.2-1.5 1.2-3',
  // a leaf with its midrib
  aromatic: 'M5 19c0-8 5-13 14-14 0 9-5 14-14 14z M5 19l8-8',
  // smoke rising off the ground
  smokeEarth: 'M9 4.5c-2 2-2 4 0 6s2 4 0 6 M15 4.5c-2 2-2 4 0 6s2 4 0 6 M5 20h14',
};

export function FlavorAxisIcon({ axis, size = 14, className, title }: { axis: FlavorAxisId; size?: number; className?: string; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      data-axis-icon={axis}
    >
      {title && <title>{title}</title>}
      <path d={PATHS[axis]} />
    </svg>
  );
}
