import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';
import { isCloudConfigured } from '../lib/supabase';
import { useCloudSyncContext } from '../hooks/cloudSyncContext';
import { PersonalFlavorFingerprint } from './PersonalFlavorFingerprint';

/**
 * The one header control for everything that is "you": a "My profile" pill
 * that opens a slide-over with the Flavor Fingerprint on top and the account
 * (sign-in, sync status, sign-out) underneath.
 *
 * This replaced two pills: "My Taste Profile" and a sign-in pill that, once
 * signed in, showed your email address. An email in the header is account
 * plumbing, not something you want to read, and on a phone it crowded the
 * wordmark. The taste profile works with no account at all, so the label is
 * "My profile" whether or not you're signed in; signing in is one section
 * inside it.
 */
export function ProfileButton() {
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
        My profile
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
        aria-label="My profile"
        className={`fixed top-0 right-0 z-50 h-full w-[min(560px,94vw)] overflow-y-auto shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: systemColors.seaSalt }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: systemColors.border }}
        >
          <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>
            My profile
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
              className="text-2xl leading-none px-2"
              style={{ color: systemColors.navyMuted }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: systemColors.navy }}>
            Taste profile
          </h3>
          <PersonalFlavorFingerprint embedded />
          <AccountSection onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );
}

/**
 * Account section inside the profile slide-over. Signed in: sync status and
 * sign-out. Signed out: the magic-link form. Renders nothing when cloud sync
 * isn't configured — there is no account to have.
 */
function AccountSection({ onNavigate }: { onNavigate: () => void }) {
  const { session, status, signIn, signOut } = useCloudSyncContext();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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

  const syncing = status.kind === 'saving' || status.kind === 'loading';
  const failed = status.kind === 'error';

  return (
    <section className="mt-6 pt-5 border-t" style={{ borderColor: systemColors.border }}>
      <h3 className="text-sm font-semibold mb-3" style={{ color: systemColors.navy }}>
        Account
      </h3>

      {session ? (
        <div
          className="rounded-xl border p-3 space-y-2"
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: systemColors.navy }}>
            <span
              className="w-2 h-2 rounded-full flex-none"
              style={{ backgroundColor: failed ? systemColors.tomato : syncing ? systemColors.navyMuted : systemColors.herb }}
              aria-hidden
            />
            <span className="truncate">{session.user.email ?? 'Signed in'}</span>
          </div>
          <p className="text-xs" style={{ color: failed ? systemColors.tomato : systemColors.navyMuted }}>
            {failed
              ? `Sync problem: ${status.message}`
              : syncing
                ? 'Saving…'
                : status.kind === 'synced'
                  ? `Synced at ${status.at.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
                  : 'Your dishes and taste profile sync to every device you sign in on.'}
          </p>
          <div className="flex items-center gap-4 pt-1">
            <Link
              to="/profile"
              onClick={onNavigate}
              className="tap inline-block text-xs font-semibold"
              style={{ color: systemColors.navy }}
            >
              Account &amp; data →
            </Link>
            <button
              onClick={signOut}
              className="tap text-xs font-semibold"
              style={{ color: systemColors.tomato }}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : sent ? (
        <p className="text-sm" style={{ color: systemColors.navy }}>
          Check <span className="font-semibold">{email}</span> for a sign-in link. Opening it on
          this device finishes the job; nothing you have logged is lost.
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="rounded-xl border p-3 space-y-2"
          style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
        >
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
            className="w-full text-sm px-2.5 py-2 rounded-lg border"
            style={{ borderColor: systemColors.border, color: systemColors.navy }}
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full btn-press text-sm font-semibold text-white px-3 py-2 rounded-lg disabled:opacity-60"
            style={{ backgroundColor: systemColors.tomato }}
          >
            {busy ? 'Sending…' : 'Email me a link'}
          </button>
          {error && <p className="text-xs" style={{ color: systemColors.tomato }}>{error}</p>}
        </form>
      )}
    </section>
  );
}
