import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isCloudConfigured } from '../lib/supabase';
import {
  applySnapshot,
  isEmptySnapshot,
  readSnapshot,
  STORAGE_SYNC_EVENT,
  type ProfileSnapshot,
} from '../data/syncKeys';

export type SyncStatus =
  | { kind: 'disabled' }
  | { kind: 'signed-out' }
  | { kind: 'loading' }
  | { kind: 'synced'; at: Date }
  | { kind: 'saving' }
  | { kind: 'error'; message: string };

/** Delay before pushing after the last edit, so rapid logging is one write. */
const PUSH_DEBOUNCE_MS = 1500;

export interface CloudSync {
  session: Session | null;
  status: SyncStatus;
  signIn: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  pullNow: () => Promise<void>;
}

/**
 * Keeps the local taste profile and the user's Supabase row in step.
 *
 * localStorage stays the source of truth for reads, so the app is fast and
 * works offline exactly as before; the cloud row is a mirror that is pushed
 * after edits and pulled on login and on window focus.
 *
 * Conflict handling is deliberately simple — the whole profile is one JSON
 * document and the last write wins. The one case that gets special treatment is
 * first login, where local data is merged into an empty cloud row instead of
 * being overwritten by it, so signing in never costs you dishes you just logged.
 */
export function useCloudSync(): CloudSync {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SyncStatus>(
    isCloudConfigured ? { kind: 'loading' } : { kind: 'disabled' }
  );

  // Set while we are writing incoming cloud data into localStorage, so the
  // resulting storage event doesn't immediately queue a push back up.
  const applyingRemote = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = useCallback(async (userId: string) => {
    if (!supabase) return;
    setStatus({ kind: 'saving' });
    const { error } = await supabase
      .from('profiles')
      .upsert(
        { user_id: userId, data: readSnapshot(), updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
    setStatus(error ? { kind: 'error', message: error.message } : { kind: 'synced', at: new Date() });
  }, []);

  const pull = useCallback(async (userId: string) => {
    if (!supabase) return;
    setStatus({ kind: 'loading' });

    const { data, error } = await supabase
      .from('profiles')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      setStatus({ kind: 'error', message: error.message });
      return;
    }

    const remote = (data?.data ?? {}) as ProfileSnapshot;

    // First login on a device with existing local data: the cloud row is empty
    // (or absent), so seed it from local rather than wiping local with nothing.
    if (isEmptySnapshot(remote) && !isEmptySnapshot(readSnapshot())) {
      await push(userId);
      return;
    }

    applyingRemote.current = true;
    applySnapshot(remote);
    applyingRemote.current = false;
    setStatus({ kind: 'synced', at: new Date() });
  }, [push]);

  // Track the Supabase session.
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void pull(data.session.user.id);
      else setStatus({ kind: 'signed-out' });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next) void pull(next.user.id);
      else setStatus({ kind: 'signed-out' });
    });

    return () => listener.subscription.unsubscribe();
  }, [pull]);

  // Push after local edits settle.
  useEffect(() => {
    if (!session) return;
    const userId = session.user.id;

    const queuePush = () => {
      if (applyingRemote.current) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => void push(userId), PUSH_DEBOUNCE_MS);
    };

    // `storage` fires for other tabs; the custom event covers this one.
    window.addEventListener('storage', queuePush);
    window.addEventListener(STORAGE_SYNC_EVENT, queuePush);

    // localStorage writes inside this tab don't emit an event, so wrap setItem
    // to catch edits made through useLocalStorage.
    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
    window.localStorage.setItem = (key: string, value: string) => {
      originalSetItem(key, value);
      if (key.startsWith('foodie-')) queuePush();
    };

    return () => {
      window.removeEventListener('storage', queuePush);
      window.removeEventListener(STORAGE_SYNC_EVENT, queuePush);
      window.localStorage.setItem = originalSetItem;
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [session, push]);

  // Re-pull when the tab regains focus, so a device left open overnight doesn't
  // push stale data over what you logged on your phone in the meantime.
  useEffect(() => {
    if (!session) return;
    const userId = session.user.id;
    const onFocus = () => void pull(userId);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [session, pull]);

  const signIn = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Cloud sync is not configured.' };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      // Come back to the page you signed in from. Sign-in is now reachable from
      // every header, so landing on /profile from a country page would lose your
      // place. Requires the deployed origin to be in Supabase's redirect
      // allowlist as a wildcard (…/**), not just the bare site URL.
      options: { emailRedirectTo: window.location.href },
    });
    return error ? { error: error.message } : {};
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const pullNow = useCallback(async () => {
    if (session) await pull(session.user.id);
  }, [session, pull]);

  return { session, status, signIn, signOut, pullNow };
}
