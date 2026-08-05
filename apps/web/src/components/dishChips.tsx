import type { Dish, Beverage, DietaryInfo } from '../data/types';

// Compact dish/drink chips: icon or abbreviation only, full meaning in the
// tooltip. Shared by the Eat & Drink tab and the at-the-restaurant view.

export function spiceChip(level: Dish['spiceLevel']) {
  if (!level || level === 'none') return null;
  const cls =
    level === 'mild' ? 'bg-yellow-100' :
    level === 'medium' ? 'bg-orange-100' :
    level === 'hot' ? 'bg-red-100' :
    'bg-red-200';
  const label = level === 'very-hot' ? 'Very hot' : level.charAt(0).toUpperCase() + level.slice(1);
  const chilies = { mild: 1, medium: 2, hot: 3, 'very-hot': 4 }[level];
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`} title={`Spice: ${label}`}>{'🌶️'.repeat(chilies)}</span>;
}

// Ordering advice from `popularity`; "both" gets no tag
export function popularityChip(popularity: Dish['popularity']) {
  if (popularity === 'local-favorite') {
    return <span className="text-xs bg-emerald-100 px-2 py-0.5 rounded" title="Local favorite">📍</span>;
  }
  if (popularity === 'tourist-classic') {
    return <span className="text-xs bg-indigo-50 px-2 py-0.5 rounded" title="Tourist classic">📷</span>;
  }
  return null;
}

// Matches the 🍰 Dessert filter toggle
export function dessertChip(category: Dish['category']) {
  if (category !== 'dessert') return null;
  return <span className="text-xs bg-rose-50 px-2 py-0.5 rounded" title="Dessert">🍰</span>;
}

// Dietary badge colors, shared by card chips and filter toggles
export const DIET_BADGE = {
  vgt: { label: 'VGT', title: 'Vegetarian', on: 'bg-violet-100 text-violet-800 border-violet-300', text: 'text-violet-700' },
  vg: { label: 'VG', title: 'Vegan', on: 'bg-green-100 text-green-800 border-green-300', text: 'text-green-700' },
  gf: { label: 'GF', title: 'Gluten-free', on: 'bg-sky-100 text-sky-800 border-sky-300', text: 'text-sky-700' },
} as const;

export function dietaryChips(d?: DietaryInfo) {
  if (!d) return null;
  return (
    <>
      {d.isVegan && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.vg.on}`} title={DIET_BADGE.vg.title}>VG</span>}
      {d.isVegetarian && !d.isVegan && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.vgt.on}`} title={DIET_BADGE.vgt.title}>VGT</span>}
      {d.isGlutenFree && <span className={`text-xs px-2 py-0.5 rounded font-semibold ${DIET_BADGE.gf.on}`} title={DIET_BADGE.gf.title}>GF</span>}
    </>
  );
}

// Shared by drink card chips and the drink-type filter toggles
export const BEV_TYPE_BADGE: Record<Beverage['type'], { label: string; title: string; on: string; text: string }> = {
  'non-alcoholic': { label: 'N/A', title: 'Non-alcoholic', on: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'text-emerald-700' },
  alcoholic: { label: 'With Alc', title: 'Alcoholic', on: 'bg-amber-100 text-amber-800 border-amber-300', text: 'text-amber-700' },
  both: { label: 'Alc Optional', title: 'Alcohol optional', on: 'bg-blue-100 text-blue-800 border-blue-300', text: 'text-blue-700' },
};
