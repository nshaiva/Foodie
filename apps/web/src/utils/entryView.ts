import type { ColorPalette, UserDish } from '../data/types';
import type { Entry } from './groupDishes';
import { isDrinkEntry } from './course';

/** What the tile needs from any entry: popular dish, drink, or your own log. */
export interface EntryView {
  name: string;
  englishName?: string;
  /** The tile's line: the tagline where we have one, else the description. */
  line?: string;
  hasTagline: boolean;
  image?: string;
  tried?: UserDish;
  /** Drinks get a glass outline and a warm neutral placeholder. */
  isDrink: boolean;
}

export function entryView(entry: Entry): EntryView {
  if (entry.kind === 'custom') {
    return { name: entry.userDish.name, line: entry.userDish.notes, hasTagline: false, tried: entry.userDish, isDrink: isDrinkEntry(entry) };
  }
  const src = entry.kind === 'dish' ? entry.dish : entry.drink;
  return {
    name: src.name,
    englishName: src.englishName,
    line: src.tagline ?? src.description,
    hasTagline: !!src.tagline,
    image: src.image,
    tried: entry.tried,
    isDrink: isDrinkEntry(entry),
  };
}

// Stable per-dish pick from the palette, so a list isn't one flat colour but a
// dish keeps the same tint everywhere it appears
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Drinks never take the palette's blues and greys: one warm neutral family
const DRINK_TINTS = ['#EDE0CD', '#F0E6D6', '#E9DAC6'];

export function placeholderTint(name: string, colors: ColorPalette, drink = false): string {
  const options = drink ? DRINK_TINTS : [colors.primary, colors.secondary, colors.accent];
  return `${options[hash(name) % options.length]}24`;
}
