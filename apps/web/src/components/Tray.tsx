import { useEffect } from 'react';
import { systemColors } from '../data/systemColors';

interface TrayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small text under the title, e.g. what the panel covers. */
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * A pull-out panel for the reference material that sits beside a list: on a
 * phone it rises from the bottom as a sheet (a side panel would be the whole
 * screen), on a desktop it slides in from the right like the profile panel.
 * The page content stays where it is — this is a tray you pull out and push
 * back, not a page you go to.
 */
export function Tray({ open, onClose, title, subtitle, children }: TrayProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(43,32,24,0.38)' }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        className={[
          'fixed z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out',
          // phone: bottom sheet
          'inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl',
          open ? 'translate-y-0' : 'translate-y-full',
          // desktop: right slide-over
          'md:inset-x-auto md:top-0 md:right-0 md:bottom-0 md:h-full md:max-h-none md:w-[min(560px,94vw)] md:rounded-none',
          open ? 'md:translate-x-0' : 'md:translate-y-0 md:translate-x-full',
        ].join(' ')}
        style={{ backgroundColor: systemColors.seaSalt }}
      >
        {/* Grab handle, phone only */}
        <div className="md:hidden flex justify-center pt-2.5" aria-hidden>
          <span className="w-10 h-1 rounded-full" style={{ backgroundColor: systemColors.border }} />
        </div>

        <div
          className="flex items-start justify-between gap-3 px-5 py-3 md:py-4 border-b flex-none"
          style={{ borderColor: systemColors.border }}
        >
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight" style={{ color: systemColors.navy }}>{title}</h2>
            {subtitle && <p className="text-xs mt-0.5" style={{ color: systemColors.navyMuted }}>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none px-2 -mr-2 flex-none"
            style={{ color: systemColors.navyMuted }}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-5 pb-8">
          {children}
        </div>
      </aside>
    </>
  );
}
