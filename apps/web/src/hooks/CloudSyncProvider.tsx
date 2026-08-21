import { useCloudSync } from './useCloudSync';
import { CloudSyncContext } from './cloudSyncContext';

/**
 * One cloud-sync instance for the whole app.
 *
 * The hook owns a debounced push, a storage listener and a focus listener, so
 * running it in two components at once would mean two writers racing over the
 * same profile row. That was fine while sign-in lived only on `/profile`, but
 * the header sign-in now appears on every page — including `/profile`, next to
 * the account panel. A context keeps it to a single instance.
 */
export function CloudSyncProvider({ children }: { children: React.ReactNode }) {
  const sync = useCloudSync();
  return <CloudSyncContext.Provider value={sync}>{children}</CloudSyncContext.Provider>;
}
