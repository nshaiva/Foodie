import { systemColors } from '../data/systemColors';

interface ProgressPlateProps {
  /** 0-100; the plate renders nothing at 0 */
  percent: number;
  /** Pixel size of the plate */
  size?: number;
  color?: string;
  /** Tooltip, e.g. "3 of 8 dishes tried" */
  title?: string;
  className?: string;
}

/**
 * Progress plate (#3, prototype variant G): solid logo dot in the center,
 * the lighter outer plate fills clockwise as a pie with progress, thin
 * outline around the whole plate. Hidden entirely at 0%.
 */
export function ProgressPlate({ percent, size = 28, color = systemColors.tomato, title, className }: ProgressPlateProps) {
  if (percent <= 0) return null;
  const p = Math.min(100, Math.round(percent));

  return (
    <span
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      title={title}
      className={`relative inline-block rounded-full flex-none ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
        background: `radial-gradient(circle, ${color} 0 37%, transparent 37%)`,
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(color-mix(in srgb, ${color} 55%, transparent) ${p}%, color-mix(in srgb, ${color} 9%, transparent) 0)`,
          WebkitMask: 'radial-gradient(circle, transparent 0 42%, #000 42% 100%)',
          mask: 'radial-gradient(circle, transparent 0 42%, #000 42% 100%)',
        }}
      />
    </span>
  );
}
