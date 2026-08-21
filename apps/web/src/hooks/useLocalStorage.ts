import { useState, useEffect } from 'react';
import { STORAGE_SYNC_EVENT } from '../data/syncKeys';

function read<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => read(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error('Failed to save to localStorage');
    }
  }, [key, storedValue]);

  // Re-read when stored values are replaced from outside React — a cloud pull
  // or a file import — so the UI reflects the incoming profile immediately.
  useEffect(() => {
    const resync = () => setStoredValue(read(key, initialValue));
    window.addEventListener(STORAGE_SYNC_EVENT, resync);
    return () => window.removeEventListener(STORAGE_SYNC_EVENT, resync);
    // `initialValue` is only a fallback for an absent key; callers pass a fresh
    // literal each render, so depending on it here would re-subscribe forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setStoredValue];
}
