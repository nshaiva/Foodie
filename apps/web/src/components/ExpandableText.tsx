import { useState } from 'react';
import { systemColors } from '../data/systemColors';

/**
 * A description that starts clamped and opens on tap.
 *
 * The dish cards used a bare `line-clamp-2`, which truncates with no way to
 * read the rest — and at a table the cut-off half of the sentence is usually
 * the part that tells you what the dish actually is.
 *
 * Whether to offer the toggle is decided by character count rather than by
 * measuring the rendered element. Measuring means writing layout state from an
 * effect: it runs a frame late (the control flickers in) and reruns on every
 * resize. A threshold is deterministic and costs nothing.
 */
export function ExpandableText({
  text,
  clamp = 'line-clamp-2',
  threshold = 110,
  className = 'text-sm text-gray-600',
}: {
  text: string;
  clamp?: string;
  threshold?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (text.length <= threshold) return <p className={className}>{text}</p>;

  return (
    <div>
      <p className={`${className} ${open ? '' : clamp}`}>{text}</p>
      <button
        onClick={e => { e.stopPropagation(); setOpen(!open); }}
        aria-expanded={open}
        className="text-xs font-bold mt-0.5"
        style={{ color: systemColors.tomato }}
      >
        {open ? 'Less' : 'More'}
      </button>
    </div>
  );
}
