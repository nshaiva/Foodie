import { useState, useEffect, useRef } from 'react';
import { STORAGE_SYNC_EVENT } from '../data/syncKeys';

/** Fired after a hook writes its key, so other hooks on the same key follow. */
const LOCAL_WRITE_EVENT = 'foodie-storage-write';

function read<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => read(key, initialValue));
  // The serialized value this hook last read or wrote. Comparing against it
  // keeps a write from echoing back through the other hooks on the same key.
  const lastRaw = useRef<string | null>(readRaw(key));

  useEffect(() => {
    const raw = JSON.stringify(storedValue);
    if (raw === lastRaw.current) return;
    lastRaw.current = raw;
    try {
      window.localStorage.setItem(key, raw);
    } catch {
      console.error('Failed to save to localStorage');
    }
    window.dispatchEvent(new CustomEvent(LOCAL_WRITE_EVENT, { detail: key }));
  }, [key, storedValue]);

  // Re-read when the stored value changes under this hook: another component's
  // hook on the same key, or a cloud pull or file import replacing the profile.
  useEffect(() => {
    const resync = () => {
      const raw = readRaw(key);
      if (raw === lastRaw.current) return;
      lastRaw.current = raw;
      setStoredValue(read(key, initialValue));
    };
    const onLocalWrite = (e: Event) => {
      if ((e as CustomEvent<string>).detail === key) resync();
    };
    window.addEventListener(STORAGE_SYNC_EVENT, resync);
    window.addEventListener(LOCAL_WRITE_EVENT, onLocalWrite);
    return () => {
      window.removeEventListener(STORAGE_SYNC_EVENT, resync);
      window.removeEventListener(LOCAL_WRITE_EVENT, onLocalWrite);
    };
    // `initialValue` is only a fallback for an absent key; callers pass a fresh
    // literal each render, so depending on it here would re-subscribe forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setStoredValue];
}
