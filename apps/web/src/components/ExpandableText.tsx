import { useCallback, useState } from 'react';
import { systemColors } from '../data/systemColors';

/**
 * A description that starts clamped and opens on tap.
 *
 * The dish cards used a bare `line-clamp-2`, which truncates with no way to
 * read the rest — and at a table the cut-off half of the sentence is usually
 * the part that tells you what the dish actually is.
 *
 * **The toggle appears only when the text is actually cut off.** An earlier
 * version guessed from character count, which cannot know the column width:
 * the same 150-character description is three lines in a narrow grid card and
 * two in the wide at-the-restaurant list, so cards offered "Show more" with
 * nothing behind it.
 *
 * The measurement runs from a **callback ref** rather than an effect. A ref
 * callback fires during layout, before paint, so the control never flashes in
 * a frame late, and it sidesteps writing layout state from an effect. A
 * `ResizeObserver` re-checks when the column changes width, so the control
 * appears and disappears correctly as the grid reflows.
 *
 * Clamped at five lines (#33, 2026-08-29). Measured on a 324px phone card:
 * descriptions run 173-238 characters and need 4-5 lines at 14px, and the
 * same 4-5 lines at 13px, so shrinking the type saved nothing. Three lines
 * clipped every card; five lets every current description read in full, at
 * the cost of ~2 lines of card height. The control still appears for any
 * future description that overruns.
 */
export function ExpandableText({
  text,
  clamp = 'line-clamp-5',
  className = 'text-sm text-gray-600',
}: {
  text: string;
  clamp?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);

  const measure = useCallback((el: HTMLParagraphElement | null) => {
    if (!el) return;
    const check = () => {
      // Only meaningful while the clamp is applied. Once expanded, scroll
      // height equals client height, which would read as "fits" and hide the
      // control that closes it again.
      if (el.dataset.clamped !== 'true') return;
      setClipped(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const expandable = clipped || open;
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div>
      {/* The text is a tap target too: at a table you reach for the sentence
          you're trying to finish, not the small link underneath it. */}
      <p
        ref={measure}
        data-clamped={!open}
        onClick={expandable ? toggle : undefined}
        className={`${className} ${open ? '' : clamp}`}
        style={expandable ? { cursor: 'pointer' } : undefined}
      >
        {text}
      </p>

      {expandable && (
        <button
          onClick={toggle}
          aria-expanded={open}
          className="tap text-xs font-bold mt-1 inline-flex items-center gap-1"
          style={{ color: systemColors.tomato }}
        >
          {open ? 'Show less' : 'Show more'}
          <span aria-hidden>{open ? '▴' : '▾'}</span>
        </button>
      )}
    </div>
  );
}
