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
 *
 * Three lines rather than two, at ~150 characters: measured over the 294 dish
 * descriptions, a two-line clamp left all but one of them truncated, while
 * three shows 57 of them (19%) complete with no toggle at all and cuts the
 * rest at a more useful point. The cards in the country grid already stretch
 * to the tallest in their row, so the extra line mostly reclaims whitespace.
 */
export function ExpandableText({
  text,
  clamp = 'line-clamp-3',
  threshold = 150,
  className = 'text-sm text-gray-600',
}: {
  text: string;
  clamp?: string;
  threshold?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (text.length <= threshold) return <p className={className}>{text}</p>;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  // The text itself is the tap target as well as the button: at a table you
  // reach for the sentence you're trying to finish, not for a small link
  // underneath it.
  return (
    <div>
      <p onClick={toggle} className={`${className} ${open ? '' : clamp}`} style={{ cursor: 'pointer' }}>
        {text}
      </p>
      <button
        onClick={toggle}
        aria-expanded={open}
        className="text-xs font-bold mt-1 inline-flex items-center gap-1"
        style={{ color: systemColors.tomato }}
      >
        {open ? 'Show less' : 'Show more'}
        <span aria-hidden>{open ? '▴' : '▾'}</span>
      </button>
    </div>
  );
}
