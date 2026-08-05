import type { FlavorAxisId, FlavorIntensity, IngredientTiers, TieredIngredient } from './types';

// Shared axis identity: label, short description, and a fixed color per axis
// used by the ingredient views and the radar's driver panel. Colors are
// distinct from the per-country palette on purpose — axes mean the same thing
// on every country page.
export const FLAVOR_AXIS_META: Record<FlavorAxisId, { label: string; description: string; color: string }> = {
  heat: { label: 'Heat', description: 'Spiciness and chili intensity', color: '#C0392B' },
  acidity: { label: 'Acidity', description: 'Sour, tangy, citrus brightness', color: '#C99A2E' },
  sweetness: { label: 'Sweet', description: 'Sweet notes in savory dishes', color: '#C46A88' },
  umami: { label: 'Umami', description: 'Savory depth, fermented flavors', color: '#6B4F3A' },
  aromatic: { label: 'Aromatic', description: 'Herbs, spices, fragrance', color: '#6E8B5E' },
  smokeEarth: { label: 'Smoke/Earth', description: 'Smoky, earthy, charred notes', color: '#5C5652' },
};

export const FLAVOR_AXIS_IDS: FlavorAxisId[] = [
  'heat', 'acidity', 'sweetness', 'umami', 'aromatic', 'smokeEarth',
];

/** An ingredient's dominant axis (first 'main', else first entry), if any */
export function dominantAxis(ingredient: TieredIngredient): FlavorAxisId | undefined {
  if (!ingredient.flavorAxes || ingredient.flavorAxes.length === 0) return undefined;
  return (ingredient.flavorAxes.find(a => a.strength === 'main') ?? ingredient.flavorAxes[0]).axis;
}

/** True when any ingredient in the tiers carries axis data */
export function hasFlavorAxisData(tiers: IngredientTiers): boolean {
  return Object.values(tiers).some((items: TieredIngredient[]) =>
    items.some(i => i.flavorAxes && i.flavorAxes.length > 0)
  );
}

export interface AxisDriver {
  ingredient: TieredIngredient;
  tier: keyof IngredientTiers;
  strength: 'main' | 'supporting';
}

/** All ingredients driving a given axis, main contributors first */
export function driversForAxis(tiers: IngredientTiers, axis: FlavorAxisId): AxisDriver[] {
  const drivers: AxisDriver[] = [];
  (Object.keys(tiers) as (keyof IngredientTiers)[]).forEach(tier => {
    tiers[tier].forEach(ingredient => {
      const entry = ingredient.flavorAxes?.find(a => a.axis === axis);
      if (entry) drivers.push({ ingredient, tier, strength: entry.strength });
    });
  });
  return drivers.sort((a, b) => (a.strength === b.strength ? 0 : a.strength === 'main' ? -1 : 1));
}

/** Axes ordered by the country's intensity scores, strongest first */
export function axesByIntensity(intensity: FlavorIntensity): { axis: FlavorAxisId; value: number }[] {
  return FLAVOR_AXIS_IDS
    .map(axis => ({ axis, value: intensity[axis] }))
    .sort((a, b) => b.value - a.value);
}
