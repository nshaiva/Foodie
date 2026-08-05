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

// --- Flavor Match layer ---

export type MapLayer = 'explored' | 'flavorMatch';

// Sequential terracotta ramp: pale warm neutral → deep saturated terracotta.
// Stops at score 0 / 50 / 100; interpolated between.
const FLAVOR_MATCH_STOPS: [number, string][] = [
  [0, '#F3EDE2'],
  [50, '#E5BBA4'],
  [100, '#A9503A'],
];

function lerpHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => {
    const va = (pa >> shift) & 0xff;
    const vb = (pb >> shift) & 0xff;
    return Math.round(va + (vb - va) * t);
  };
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, '0')}`;
}

export function getFlavorMatchFillColor(
  score: number | undefined,
  isHovered: boolean = false,
  domain?: [number, number]
): string {
  if (score === undefined) {
    return isHovered ? MAP_HOVER_COLORS.noProfile : MAP_COLORS.noProfile;
  }
  // Raw scores cluster in a narrow band (e.g. 55-85), which flattens the ramp
  // into one indistinguishable terracotta. Stretch the actual min-max spread
  // across the full ramp so relative differences stay visible.
  let normalized = score;
  if (domain) {
    const [min, max] = domain;
    normalized = max > min ? ((score - min) / (max - min)) * 100 : 100;
  }
  const clamped = Math.max(0, Math.min(100, normalized));
  let color = FLAVOR_MATCH_STOPS[FLAVOR_MATCH_STOPS.length - 1][1];
  for (let i = 1; i < FLAVOR_MATCH_STOPS.length; i++) {
    const [prevStop, prevColor] = FLAVOR_MATCH_STOPS[i - 1];
    const [stop, stopColor] = FLAVOR_MATCH_STOPS[i];
    if (clamped <= stop) {
      color = lerpHex(prevColor, stopColor, (clamped - prevStop) / (stop - prevStop));
      break;
    }
  }
  // Hover: nudge toward the saturated end
  return isHovered ? lerpHex(color, '#7E3A29', 0.25) : color;
}

// Gradient for the flavor-match legend bar
export const FLAVOR_MATCH_GRADIENT = `linear-gradient(to right, ${FLAVOR_MATCH_STOPS.map(
  ([stop, color]) => `${color} ${stop}%`
).join(', ')})`;

// Outline for already-logged countries on the flavor-match layer
export const FLAVOR_MATCH_LOGGED_STROKE = '#33302A';
