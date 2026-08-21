import { useRef, useState } from 'react';
import { systemColors } from '../data/systemColors';
import { isCloudConfigured } from '../lib/supabase';
import { useCloudSync, type SyncStatus } from '../hooks/useCloudSync';
import { readSnapshot } from '../data/syncKeys';
import { describeSnapshot, exportProfile, importProfile, ImportError } from '../utils/dataTransfer';

function statusLabel(status: SyncStatus): string {
  switch (status.kind) {
    case 'disabled':
      return 'Sync not configured';
    case 'signed-out':
      return 'Saved on this device only';
    case 'loading':
      return 'Checking for changes…';
    case 'saving':
      return 'Saving…';
    case 'synced':
      return `Synced at ${status.at.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    case 'error':
      return `Sync problem: ${status.message}`;
  }
}

function statusColor(status: SyncStatus): string {
  if (status.kind === 'error') return systemColors.tomato;
  if (status.kind === 'synced') return systemColors.herb;
  return systemColors.navyMuted;
}

const buttonStyle = {
  borderColor: systemColors.border,
  color: systemColors.navy,
  backgroundColor: systemColors.surface,
};

export function AccountPanel() {
  const { session, status, signIn, signOut } = useCloudSync();

  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setAuthError(null);
    const { error } = await signIn(email.trim());
    setBusy(false);
    if (error) setAuthError(error);
    else setLinkSent(true);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // allow re-picking the same file
    if (!file) return;

    const current = describeSnapshot(readSnapshot());
    const ok = window.confirm(
      `Importing replaces what's on this device (currently ${current}).\n\nContinue?`
    );
    if (!ok) return;

    try {
      await importProfile(file);
      setNotice('Profile imported.');
    } catch (error) {
      setNotice(error instanceof ImportError ? error.message : 'Could not read that file.');
    }
  };

  return (
    <section
      className="rounded-lg border p-4 md:p-6"
      style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
    >
      <h2 className="text-lg font-bold" style={{ color: systemColors.navy }}>
        Account &amp; data
      </h2>
      <p className="text-sm mt-1" style={{ color: statusColor(status) }}>
        {statusLabel(status)}
      </p>

      {/* Cloud sync — only rendered when a Supabase project is configured. */}
      {isCloudConfigured && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: systemColors.border }}>
          {session ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm" style={{ color: systemColors.navy }}>
                Signed in as <strong>{session.user.email}</strong>
              </p>
              <button
                onClick={() => void signOut()}
                className="text-sm px-3 py-1.5 rounded-md border font-medium"
                style={buttonStyle}
              >
                Sign out
              </button>
            </div>
          ) : linkSent ? (
            <p className="text-sm" style={{ color: systemColors.navy }}>
              Check <strong>{email}</strong> for a sign-in link. Opening it on another device
              brings your profile with it.
            </p>
          ) : (
            <form onSubmit={handleSignIn} className="flex flex-wrap items-center gap-2">
              <label htmlFor="sync-email" className="sr-only">
                Email address
              </label>
              <input
                id="sync-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 min-w-[14rem] text-sm px-3 py-2 rounded-md border"
                style={{ borderColor: systemColors.border, color: systemColors.navy }}
              />
              <button
                type="submit"
                disabled={busy}
                className="text-sm px-3 py-2 rounded-md font-medium text-white disabled:opacity-60"
                style={{ backgroundColor: systemColors.tomato }}
              >
                {busy ? 'Sending…' : 'Email me a link'}
              </button>
              <p className="w-full text-xs" style={{ color: systemColors.navyMuted }}>
                No password. Sign in to use the same profile on your phone and laptop.
              </p>
            </form>
          )}
          {authError && (
            <p className="text-sm mt-2" style={{ color: systemColors.tomato }}>
              {authError}
            </p>
          )}
        </div>
      )}

      {/* Backup — always available, no account required. */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: systemColors.border }}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportProfile}
            className="text-sm px-3 py-1.5 rounded-md border font-medium"
            style={buttonStyle}
          >
            Export backup
          </button>
          <button
            onClick={() => fileInput.current?.click()}
            className="text-sm px-3 py-1.5 rounded-md border font-medium"
            style={buttonStyle}
          >
            Import backup
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
        <p className="text-xs mt-2" style={{ color: systemColors.navyMuted }}>
          Downloads every dish, rating, favorite and survey answer as one file.
        </p>
        {notice && (
          <p className="text-sm mt-2" style={{ color: systemColors.navy }}>
            {notice}
          </p>
        )}
      </div>
    </section>
  );
}
