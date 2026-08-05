import type { ActivityState } from '../../hooks/useCountryActivity';

// Soft Pastel Atlas Style Color Scheme
export const MAP_COLORS = {
  noProfile: '#e5e7eb',        // gray - no food data
  hasProfile: '#D5E0CA',       // soft sage - profile exists, no dishes logged
  hasDishes: '#DA9B80',        // mid terracotta - dishes logged (mid depth-ramp)
} as const;

// Hover state colors (slightly darker/more saturated)
export const MAP_HOVER_COLORS = {
  noProfile: '#d1d5db',
  hasProfile: '#C2D1B2',
  hasDishes: '#C97F62',
} as const;

// Stroke colors for country borders
export const MAP_STROKE = {
  default: '#ffffff',
  hover: '#94a3b8',
} as const;

// Depth gradient for explored countries: pale clay deepening to full
// terracotta — the brand color owns the main (explored) layer. Driven by
// % of popular dishes tried.
const EXPLORED_DEPTH_STOPS: [number, string][] = [
  [0, '#EFD9CD'],
  [50, '#DA9B80'],
  [100, '#A9503A'],
];

export function getCountryFillColor(
  state: ActivityState,
  isHovered: boolean = false,
  /** 0-100, % of popular dishes tried — deepens hasDishes countries */
  depth?: number
): string {
  if (state === 'hasDishes' && depth !== undefined) {
    const clamped = Math.max(0, Math.min(100, depth));
    let color = EXPLORED_DEPTH_STOPS[EXPLORED_DEPTH_STOPS.length - 1][1];
    for (let i = 1; i < EXPLORED_DEPTH_STOPS.length; i++) {
      const [prevStop, prevColor] = EXPLORED_DEPTH_STOPS[i - 1];
      const [stop, stopColor] = EXPLORED_DEPTH_STOPS[i];
      if (clamped <= stop) {
        color = lerpHex(prevColor, stopColor, (clamped - prevStop) / (stop - prevStop));
        break;
      }
    }
    return isHovered ? lerpHex(color, '#7E3A29', 0.3) : color;
  }
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
  { state: 'hasProfile' as const, label: 'Available', color: MAP_COLORS.hasProfile },
  { state: 'noProfile' as const, label: 'Coming Soon', color: MAP_COLORS.noProfile },
];

// Gradient bar for the explored-depth legend
export const EXPLORED_DEPTH_GRADIENT = `linear-gradient(to right, ${EXPLORED_DEPTH_STOPS.map(
  ([stop, color]) => `${color} ${stop}%`
).join(', ')})`;

// --- Flavor Match layer ---

export type MapLayer = 'explored' | 'flavorMatch';

// Sequential warm-slate ramp: pale cool gray → ink blue. The cool
// counterpart to the explored layer's terracotta; can't be confused with it.
// Stops at score 0 / 50 / 100; interpolated.
const FLAVOR_MATCH_STOPS: [number, string][] = [
  [0, '#E4E8EA'],
  [50, '#8AA0AC'],
  [100, '#3E5260'],
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
  return isHovered ? lerpHex(color, '#2A3A45', 0.25) : color;
}

// Gradient for the flavor-match legend bar
export const FLAVOR_MATCH_GRADIENT = `linear-gradient(to right, ${FLAVOR_MATCH_STOPS.map(
  ([stop, color]) => `${color} ${stop}%`
).join(', ')})`;

// Outline for already-logged countries on the flavor-match layer —
// mid-slate, softer than ink against the pale end of the ramp
export const FLAVOR_MATCH_LOGGED_STROKE = '#647E8E';
