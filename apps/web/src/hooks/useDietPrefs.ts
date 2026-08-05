import { useLocalStorage } from './useLocalStorage';

export type PrefLevel = 'off' | 'prefer' | 'only';

export interface DietPrefs {
  vegetarian: PrefLevel;   // 'prefer' = lean veggie, 'only' = strictly
  vegan: PrefLevel;
  pescatarian: PrefLevel;
  glutenFree: PrefLevel;
  dairyFree: PrefLevel;
  redMeat: 'off' | 'prefer' | 'avoid';
  /** Preferred spice zone; overrides the inferred heat axis where set */
  spice: 'any' | 'mild' | 'medium' | 'hot';
  /** Free-text: allergies, aversions, anything else */
  notes: string;
}

export const DEFAULT_DIET_PREFS: DietPrefs = {
  vegetarian: 'off',
  vegan: 'off',
  pescatarian: 'off',
  glutenFree: 'off',
  dairyFree: 'off',
  redMeat: 'off',
  spice: 'any',
  notes: '',
};

export function useDietPrefs() {
  const [prefs, setPrefs] = useLocalStorage<DietPrefs>('foodie-diet-prefs', DEFAULT_DIET_PREFS);

  const update = (patch: Partial<DietPrefs>) => setPrefs({ ...prefs, ...patch });

  const hasAnyPrefs =
    prefs.vegetarian !== 'off' || prefs.vegan !== 'off' || prefs.pescatarian !== 'off' ||
    prefs.glutenFree !== 'off' || prefs.dairyFree !== 'off' || prefs.redMeat !== 'off' || prefs.spice !== 'any' ||
    prefs.notes.trim() !== '';

  return { prefs, update, hasAnyPrefs };
}
