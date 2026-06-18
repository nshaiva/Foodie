import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';
import { PersonalFlavorFingerprint } from './PersonalFlavorFingerprint';

/**
 * Header entry point for "My Taste Profile". Opens a slide-over with the
 * Flavor Fingerprint (the quick peek), with an Expand link that promotes it
 * to the full /profile page.
 */
export function TasteProfileButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm rounded-full border px-3 py-1.5 transition-colors hover:opacity-80"
        style={{ borderColor: systemColors.border, color: systemColors.navy, backgroundColor: systemColors.surface }}
      >
        <span style={{ color: systemColors.tomato }}>✦</span>
        My Taste Profile
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(43,32,24,0.38)' }}
      />

      {/* Slide-over */}
      <aside
        role="dialog"
        aria-label="My Taste Profile"
        className={`fixed top-0 right-0 z-50 h-full w-[min(560px,94vw)] overflow-y-auto shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: systemColors.seaSalt }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: systemColors.border }}
        >
          <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>
            My Taste Profile
          </h2>
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              title="Open as a full page"
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm transition-colors hover:opacity-80"
              style={{ borderColor: systemColors.border, color: systemColors.navy }}
            >
              ⤢ Expand
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-2xl leading-none px-1"
              style={{ color: systemColors.navyMuted }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-5">
          <PersonalFlavorFingerprint embedded />
        </div>
      </aside>
    </>
  );
}
