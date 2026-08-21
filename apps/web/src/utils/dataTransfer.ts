import { applySnapshot, readSnapshot, SYNCED_KEYS, type ProfileSnapshot } from '../data/syncKeys';

/** Bumped only if the payload shape changes in a way importers must handle. */
const BACKUP_VERSION = 1;

interface BackupFile {
  app: 'foodie';
  version: number;
  exportedAt: string;
  data: ProfileSnapshot;
}

/** Download the current taste profile as a JSON file. */
export function exportProfile(): void {
  const backup: BackupFile = {
    app: 'foodie',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: readSnapshot(),
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `foodie-profile-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export class ImportError extends Error {}

/**
 * Parse a previously exported file and replace the stored profile with it.
 * Throws {@link ImportError} with a user-facing message on anything malformed,
 * so a mistyped file can't silently overwrite real data.
 */
export async function importProfile(file: File): Promise<void> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    throw new ImportError("That file isn't valid JSON.");
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new ImportError("That file doesn't look like a Foodie backup.");
  }

  const backup = parsed as Partial<BackupFile>;
  if (backup.app !== 'foodie') {
    throw new ImportError("That file doesn't look like a Foodie backup.");
  }
  if (typeof backup.version !== 'number' || backup.version > BACKUP_VERSION) {
    throw new ImportError('That backup came from a newer version of Foodie.');
  }
  if (typeof backup.data !== 'object' || backup.data === null) {
    throw new ImportError('That backup has no profile data in it.');
  }

  // Keep only keys we recognise, so a hand-edited file can't write arbitrary
  // entries into localStorage.
  const clean: ProfileSnapshot = {};
  for (const key of SYNCED_KEYS) {
    const value = (backup.data as ProfileSnapshot)[key];
    if (value !== undefined) clean[key] = value;
  }

  applySnapshot(clean);
}

/** Human-readable counts for the confirm-before-overwrite prompt. */
export function describeSnapshot(snapshot: ProfileSnapshot): string {
  const count = (key: keyof ProfileSnapshot) => {
    const value = snapshot[key];
    return Array.isArray(value) ? value.length : 0;
  };
  return [
    `${count('foodie-dishes')} dishes`,
    `${count('foodie-favorites')} favorites`,
    `${count('foodie-wishlist')} saved`,
  ].join(' · ');
}
