/**
 * The localStorage keys that make up a user's taste profile.
 *
 * `foodie-map-layer` and `foodie-view-mode` are deliberately excluded: they are
 * per-device view preferences, not profile data. Syncing them would make the
 * desktop map view follow you onto your phone, where the grid is the right
 * default.
 */
export const SYNCED_KEYS = [
  'foodie-dishes',
  'foodie-favorites',
  'foodie-wishlist',
  'foodie-diet-prefs',
  'foodie-taste-survey',
] as const;

export type SyncedKey = (typeof SYNCED_KEYS)[number];

/** A full profile payload: each synced key mapped to its parsed value. */
export type ProfileSnapshot = Partial<Record<SyncedKey, unknown>>;

/**
 * Broadcast when stored values are replaced from outside React (a cloud pull or
 * a file import), so mounted `useLocalStorage` hooks re-read their key.
 */
export const STORAGE_SYNC_EVENT = 'foodie-storage-sync';

export function notifyStorageSync(): void {
  window.dispatchEvent(new CustomEvent(STORAGE_SYNC_EVENT));
}

/** Read every synced key out of localStorage. Absent keys are omitted. */
export function readSnapshot(): ProfileSnapshot {
  const snapshot: ProfileSnapshot = {};
  for (const key of SYNCED_KEYS) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) continue;
    try {
      snapshot[key] = JSON.parse(raw);
    } catch {
      // A corrupt entry shouldn't block the rest of the profile from syncing.
    }
  }
  return snapshot;
}

/**
 * Replace stored values with `snapshot` and notify mounted hooks. Keys missing
 * from the snapshot are left alone rather than cleared, so a payload written by
 * an older version of the app can't wipe data it didn't know about.
 */
export function applySnapshot(snapshot: ProfileSnapshot): void {
  for (const key of SYNCED_KEYS) {
    const value = snapshot[key];
    if (value === undefined) continue;
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  notifyStorageSync();
}

/** True when the snapshot holds no logged data at all. */
export function isEmptySnapshot(snapshot: ProfileSnapshot): boolean {
  return SYNCED_KEYS.every(key => {
    const value = snapshot[key];
    if (value === undefined || value === null) return true;
    if (Array.isArray(value)) return value.length === 0;
    return false;
  });
}
