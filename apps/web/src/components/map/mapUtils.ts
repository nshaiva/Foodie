import type { ActivityState } from '../../hooks/useCountryActivity';

// Soft Pastel Atlas Style Color Scheme
export const MAP_COLORS = {
  noProfile: '#e5e7eb',        // gray - no food data
  hasProfile: '#d4e8e0',       // soft sage - profile exists, no dishes logged
  hasDishes: '#d4c4eb',        // medium lavender - dishes logged
} as const;

// Hover state colors (slightly darker/more saturated)
export const MAP_HOVER_COLORS = {
  noProfile: '#d1d5db',
  hasProfile: '#b8d4c8',
  hasDishes: '#c2aede',
} as const;

// Stroke colors for country borders
export const MAP_STROKE = {
  default: '#ffffff',
  hover: '#94a3b8',
} as const;

export function getCountryFillColor(state: ActivityState, isHovered: boolean = false): string {
  if (isHovered) {
    return MAP_HOVER_COLORS[state];
  }
  return MAP_COLORS[state];
}

export function getActivityLabel(state: ActivityState): string {
  switch (state) {
    case 'noProfile':
      return 'Coming soon';
    case 'hasProfile':
      return 'Explore cuisine';
    case 'hasDishes':
      return 'Dishes logged';
  }
}

export const LEGEND_ITEMS = [
  { state: 'hasDishes' as const, label: 'Dishes Logged', color: MAP_COLORS.hasDishes },
  { state: 'hasProfile' as const, label: 'Available', color: MAP_COLORS.hasProfile },
  { state: 'noProfile' as const, label: 'Coming Soon', color: MAP_COLORS.noProfile },
];
