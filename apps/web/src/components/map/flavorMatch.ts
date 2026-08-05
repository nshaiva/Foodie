import { countries } from '../../data/countries';
import type { FlavorIntensity } from '../../data/types';

const AXES = ['heat', 'acidity', 'sweetness', 'umami', 'aromatic', 'smokeEarth'] as const;
type FlavorAxis = (typeof AXES)[number];

const AXIS_LABELS: Record<FlavorAxis, string> = {
  heat: 'heat',
  acidity: 'acidity',
  sweetness: 'sweetness',
  umami: 'umami',
  aromatic: 'aromatics',
  smokeEarth: 'smoke & earth',
};

export interface FlavorMatch {
  score: number; // 0-100
  topAxes: string[]; // 1-2 axes driving the match, for tooltip copy
}

// Axes where the user is opinionated (far from mid-scale) count more than
// no-signal axes: a personal heat of 8.5 says more than a sweetness of 5.2.
// Weight range: 0.5 (neutral) to 1.5 (maximally opinionated).
function axisWeight(personalValue: number): number {
  return 0.5 + Math.abs(personalValue - 5.5) / 4.5;
}

// Weighted Euclidean distance flipped into a 0-100 score. Distance (not
// cosine) so intensity matters: a mild cuisine is a poor match for a
// heat-lover even if the profile shape rhymes.
export function computeFlavorMatch(
  personal: FlavorIntensity,
  country: FlavorIntensity
): FlavorMatch {
  let sumSq = 0;
  let maxSq = 0;
  const perAxis: { axis: FlavorAxis; weight: number; gap: number }[] = [];

  for (const axis of AXES) {
    const weight = axisWeight(personal[axis]);
    const gap = Math.abs(personal[axis] - country[axis]);
    sumSq += weight * gap * gap;
    maxSq += weight * 81; // worst-case gap of 9 on the 1-10 scale
    perAxis.push({ axis, weight, gap });
  }

  const score = Math.round(100 * (1 - Math.sqrt(sumSq) / Math.sqrt(maxSq)));

  // Drivers: opinionated axes where the cuisine lands close to the user.
  const topAxes = perAxis
    .filter((a) => a.weight > 1 && a.gap <= 2)
    .sort((a, b) => b.weight - b.gap / 9 - (a.weight - a.gap / 9))
    .slice(0, 2)
    .map((a) => AXIS_LABELS[a.axis]);

  return { score, topAxes };
}

export function computeAllFlavorMatches(
  personal: FlavorIntensity
): Map<string, FlavorMatch> {
  const matches = new Map<string, FlavorMatch>();
  for (const country of countries) {
    matches.set(
      country.id,
      computeFlavorMatch(personal, country.cuisineProfile.flavorIntensity)
    );
  }
  return matches;
}
