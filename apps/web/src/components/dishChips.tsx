import type { Dish, Beverage, DietaryInfo } from '../data/types';
import { systemColors } from '../data/systemColors';

// One-tint chip system (decluttered 2026-08-05): every card chip is the same
// quiet sage block — icons and labels carry the meaning, color doesn't.
// Squared corners to match the cards. Full meaning in the tooltip.
const CHIP_CLS = 'text-xs px-2 py-0.5 rounded-md font-medium';
const CHIP_STYLE = { backgroundColor: systemColors.herbLight, color: systemColors.navy } as const;

function chip(content: React.ReactNode, title: string) {
  return <span className={CHIP_CLS} style={CHIP_STYLE} title={title}>{content}</span>;
}

export function spiceChip(level: Dish['spiceLevel']) {
  if (!level || level === 'none') return null;
  const label = level === 'very-hot' ? 'Very hot' : level.charAt(0).toUpperCase() + level.slice(1);
  const chilies = { mild: 1, medium: 2, hot: 3, 'very-hot': 4 }[level];
  return chip('🌶️'.repeat(chilies), `Spice: ${label}`);
}

// Ordering advice from `popularity`; "both" gets no tag
export function popularityChip(popularity: Dish['popularity']) {
  // Touch has no tooltips, so the label shows below md and the icon stands alone above.
  if (popularity === 'local-favorite') return chip(<>📍<span className="md:hidden ml-1">Local favorite</span></>, 'Local favorite');
  if (popularity === 'tourist-classic') return chip(<>📷<span className="md:hidden ml-1">Tourist classic</span></>, 'Tourist classic');
  return null;
}

// Matches the 🍰 Dessert filter toggle
export function dessertChip(category: Dish['category']) {
  if (category !== 'dessert') return null;
  return chip('🍰', 'Dessert');
}

export function dietaryChips(d?: DietaryInfo) {
  if (!d) return null;
  return (
    <>
      {d.isVegan && chip('VG', 'Vegan')}
      {d.isVegetarian && !d.isVegan && chip('VGT', 'Vegetarian')}
      {d.isGlutenFree && chip('GF', 'Gluten-free')}
    </>
  );
}

const BEV_TYPE_LABELS: Record<Beverage['type'], { label: string; title: string }> = {
  'non-alcoholic': { label: 'N/A', title: 'Non-alcoholic' },
  alcoholic: { label: 'With Alc', title: 'Alcoholic' },
  both: { label: 'Alc Optional', title: 'Alcohol optional' },
};

export function bevTypeChip(type: Beverage['type']) {
  const { label, title } = BEV_TYPE_LABELS[type];
  return chip(label, title);
}

export function servedChip(how?: Beverage['servedHow']) {
  if (!how) return null;
  const label = how === 'room temperature' ? 'Room Temp' : `Served ${how.charAt(0).toUpperCase() + how.slice(1)}`;
  return chip(label, label);
}
