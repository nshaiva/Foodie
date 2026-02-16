import type { Country, FlavorIntensity } from '../data/types';

export interface SimilarityResult {
  country: Country;
  score: number;
  reasons: string[];
}

/**
 * Calculate Euclidean distance between two flavor profiles.
 * Lower distance = more similar.
 * Max distance for 6 dimensions on 1-10 scale is ~22 (sqrt(6 * 81))
 */
function flavorDistance(a: FlavorIntensity, b: FlavorIntensity): number {
  const dimensions: (keyof FlavorIntensity)[] = ['heat', 'acidity', 'sweetness', 'umami', 'aromatic', 'smokeEarth'];
  let sum = 0;
  for (const dim of dimensions) {
    const aVal = a[dim] as number;
    const bVal = b[dim] as number;
    sum += Math.pow(aVal - bVal, 2);
  }
  return Math.sqrt(sum);
}

/**
 * Calculate overlap between two string arrays using Jaccard-like ratio.
 * Returns 0-1 where 1 means perfect overlap.
 */
function arrayOverlap(a: string[], b: string[]): number {
  const setA = new Set(a.map(i => i.toLowerCase()));
  const setB = new Set(b.map(i => i.toLowerCase()));
  const intersection = [...setA].filter(x => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size > 0 ? intersection.length / union.size : 0;
}

/**
 * Calculate geographic proximity score.
 * Same region = 1.0, same continent = 0.5, different continent = 0
 */
function geographicScore(a: Country, b: Country): number {
  if (a.region === b.region) return 1.0;
  if (a.continent === b.continent) return 0.5;
  return 0;
}

/**
 * Generate human-readable reasons for why two cuisines are similar.
 */
function generateReasons(source: Country, target: Country): string[] {
  const reasons: string[] = [];
  const sourceProfile = source.cuisineProfile;
  const targetProfile = target.cuisineProfile;

  // Flavor profile analysis
  const sourceHeat = sourceProfile.flavorIntensity.heat;
  const targetHeat = targetProfile.flavorIntensity.heat;
  const sourceAcidity = sourceProfile.flavorIntensity.acidity;
  const targetAcidity = targetProfile.flavorIntensity.acidity;
  const sourceUmami = sourceProfile.flavorIntensity.umami;
  const targetUmami = targetProfile.flavorIntensity.umami;
  const sourceAromatic = sourceProfile.flavorIntensity.aromatic;
  const targetAromatic = targetProfile.flavorIntensity.aromatic;

  // Check for similar spice levels (both high or both low)
  if (sourceHeat >= 7 && targetHeat >= 7) {
    reasons.push('Bold, spicy heat');
  } else if (sourceHeat >= 6 && targetHeat >= 6) {
    reasons.push('Moderate heat');
  }

  // Check for similar acidity levels
  if (sourceAcidity >= 7 && targetAcidity >= 7) {
    reasons.push('Bright citrus notes');
  }

  // Check for umami emphasis
  if (sourceUmami >= 7 && targetUmami >= 7) {
    reasons.push('Deep umami flavors');
  }

  // Check for aromatic emphasis
  if (sourceAromatic >= 8 && targetAromatic >= 8) {
    reasons.push('Aromatic & fragrant');
  }

  // Find shared key ingredients
  const sourceIngredients = sourceProfile.keyIngredients.map(i => i.toLowerCase());
  const targetIngredients = targetProfile.keyIngredients.map(i => i.toLowerCase());
  const sharedIngredients: string[] = [];

  for (const ing of sourceIngredients) {
    for (const tIng of targetIngredients) {
      // Check for partial matches (e.g., "lime" in "lime juice")
      if (ing.includes(tIng) || tIng.includes(ing)) {
        const displayName = ing.length < tIng.length ? ing : tIng;
        if (!sharedIngredients.includes(displayName)) {
          sharedIngredients.push(displayName);
        }
      }
    }
  }

  if (sharedIngredients.length >= 2) {
    reasons.push(`Shared: ${sharedIngredients.slice(0, 2).join(', ')}`);
  }

  // Geographic proximity
  if (source.region === target.region) {
    reasons.push('Regional neighbors');
  } else if (source.continent === target.continent) {
    reasons.push('Same continent');
  }

  // Find shared cooking techniques
  const sharedTechniques = sourceProfile.cookingTechniques.filter(t =>
    targetProfile.cookingTechniques.some(tt =>
      t.toLowerCase().includes(tt.toLowerCase()) || tt.toLowerCase().includes(t.toLowerCase())
    )
  );
  if (sharedTechniques.length >= 2 && reasons.length < 3) {
    reasons.push('Similar techniques');
  }

  // Limit to 2 most relevant reasons
  return reasons.slice(0, 2);
}

/**
 * Calculate overall similarity score between two countries (0-100).
 * Weights:
 * - Flavor profile: 40%
 * - Key ingredients overlap: 25%
 * - Cooking techniques overlap: 20%
 * - Geographic proximity: 15%
 */
export function calculateSimilarity(a: Country, b: Country): number {
  // Flavor profile (40% weight)
  // Max distance ~22, convert to 0-100 scale and invert
  const flavorDist = flavorDistance(a.cuisineProfile.flavorIntensity, b.cuisineProfile.flavorIntensity);
  const maxFlavorDist = 22;
  const flavorScore = Math.max(0, (1 - flavorDist / maxFlavorDist)) * 100;

  // Key ingredients overlap (25% weight)
  const ingredientScore = arrayOverlap(
    a.cuisineProfile.keyIngredients,
    b.cuisineProfile.keyIngredients
  ) * 100;

  // Cooking techniques overlap (20% weight)
  const techniqueScore = arrayOverlap(
    a.cuisineProfile.cookingTechniques,
    b.cuisineProfile.cookingTechniques
  ) * 100;

  // Geographic proximity (15% weight)
  const geoScore = geographicScore(a, b) * 100;

  // Weighted average
  const totalScore = (
    flavorScore * 0.40 +
    ingredientScore * 0.25 +
    techniqueScore * 0.20 +
    geoScore * 0.15
  );

  return Math.round(totalScore);
}

/**
 * Get the most similar cuisines to a given country.
 * Returns sorted by similarity score (highest first).
 */
export function getSimilarCuisines(
  country: Country,
  allCountries: Country[],
  limit: number = 3
): SimilarityResult[] {
  const results: SimilarityResult[] = [];

  for (const other of allCountries) {
    // Skip self
    if (other.id === country.id) continue;

    const score = calculateSimilarity(country, other);
    const reasons = generateReasons(country, other);

    results.push({
      country: other,
      score,
      reasons
    });
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Return top N
  return results.slice(0, limit);
}
