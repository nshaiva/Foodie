import { createContext, useContext } from 'react';
import type { CloudSync } from './useCloudSync';

export const CloudSyncContext = createContext<CloudSync | null>(null);

export function useCloudSyncContext(): CloudSync {
  const ctx = useContext(CloudSyncContext);
  if (!ctx) throw new Error('useCloudSyncContext must be used inside <CloudSyncProvider>');
  return ctx;
}
