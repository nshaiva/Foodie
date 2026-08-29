import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';
import { isCloudConfigured } from '../lib/supabase';
import { useCloudSync } from '../hooks/useCloudSync';

/**
 * Header sign-in.
 *
 * The magic-link form used to live only inside the Account section of
 * `/profile`, which is a page you have no reason to visit until you've built a
 * taste profile — so a new user on a second device had no way to reach their
 * data. Signing in is an app-level action, not a profile-page one, so it
 * belongs in the header next to the other app-level controls.
 *
 * Renders nothing when cloud sync isn't configured: there is no account to
 * sign in to, and an inert button would be worse than no button. The fuller
 * panel on `/profile` stays as it is — it also carries export/import, which
 * works with no account at all.
 */
export function SignInButton() {
  const { session, status, signIn, signOut } = useCloudSync();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  if (!isCloudConfigured) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setError(null);
    const result = await signIn(email.trim());
    setBusy(false);
    if (result.error) setError(result.error);
    else setSent(true);
  };

  // Signed in: the useful thing to show is whether the last save landed, since
  // that is the whole reason to have an account.
  if (session) {
    const syncing = status.kind === 'saving' || status.kind === 'loading';
    const failed = status.kind === 'error';
    return (
      <div className="relative" ref={boxRef}>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          title={session.user.email ?? 'Signed in'}
          className="flex items-center gap-2 text-sm rounded-full border px-3 py-1.5 transition-colors hover:opacity-80"
          style={{ borderColor: systemColors.border, color: systemColors.navy, backgroundColor: systemColors.surface }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-none"
            style={{
              backgroundColor: failed ? systemColors.tomato : syncing ? systemColors.navyMuted : systemColors.herb,
            }}
            aria-hidden
          />
          <span className="max-w-[9rem] truncate">{session.user.email ?? 'Signed in'}</span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 z-50 w-64 rounded-xl border shadow-sm p-3 space-y-2"
            style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
          >
            <p className="text-xs" style={{ color: failed ? systemColors.tomato : systemColors.navyMuted }}>
              {failed
                ? `Sync problem: ${status.message}`
                : syncing
                  ? 'Saving…'
                  : status.kind === 'synced'
                    ? `Synced at ${status.at.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
                    : 'Signed in'}
            </p>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="block text-xs font-semibold"
              style={{ color: systemColors.navy }}
            >
              Account &amp; data →
            </Link>
            <button
              onClick={() => { setOpen(false); signOut(); }}
              className="text-xs font-semibold"
              style={{ color: systemColors.tomato }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={boxRef}>
      <button
        onClick={() => { setOpen(!open); setSent(false); setError(null); }}
        aria-expanded={open}
        className="text-sm rounded-full border px-3 py-1.5 transition-colors hover:opacity-80"
        style={{ borderColor: systemColors.border, color: systemColors.navy, backgroundColor: systemColors.surface }}
      >
        Sign in
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 z-50 w-72 rounded-xl border shadow-sm p-3"
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
        >
          {sent ? (
            <p className="text-xs" style={{ color: systemColors.navy }}>
              Check <span className="font-semibold">{email}</span> for a sign-in link. Opening it on
              this device finishes the job; nothing you have logged is lost.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-2">
              <p className="text-xs" style={{ color: systemColors.navyMuted }}>
                Sign in to keep your dishes and taste profile on every device. No password, just a
                link by email.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full text-sm px-2.5 py-1.5 rounded-lg border"
                style={{ borderColor: systemColors.border, color: systemColors.navy }}
              />
              <button
                type="submit"
                disabled={busy}
                className="w-full btn-press text-sm font-semibold text-white px-3 py-1.5 rounded-lg disabled:opacity-60"
                style={{ backgroundColor: systemColors.tomato }}
              >
                {busy ? 'Sending…' : 'Email me a link'}
              </button>
              {error && (
                <p className="text-xs" style={{ color: systemColors.tomato }}>{error}</p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
