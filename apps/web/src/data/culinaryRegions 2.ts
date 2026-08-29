import { countries } from './countries';

/**
 * Eight culinary regions — the mobile map's top level.
 *
 * Deliberately *not* the `region` field on a country, which was written as
 * prose (20 distinct values across 31 countries, 14 of them holding exactly
 * one country, plus "North Africa" and "North Africa (Maghreb)" as separate
 * values). That field stays as it is; this is a grouping key.
 *
 * Also deliberately not continents. Grouping by landmass puts 15 countries in
 * Asia and 3 in South America, and scores badly on flavor: measured over the
 * six flavor axes, a random pair of the 31 countries sits 5.84 apart, while
 * Africa as one group scores 6.48 — worse than random. Every group below beats
 * that baseline. Working: `docs/roadmap/designs/flavor-geography.md`.
 *
 * The Americas are the one compromise. USA + Brazil + Argentina is the
 * tightest cluster in the whole dataset (2.31 — grill, smoke, low heat), but
 * Mexico and the Caribbean sit between them and are chile-forward, so that
 * region is discontiguous on purpose.
 */
export interface CulinaryRegion {
  id: string;
  name: string;
  /** Alpha-2 ids, in no particular order. */
  countryIds: string[];
  /** Where the label sits at world zoom, [lon, lat]. */
  labelAt: [number, number];
  /** Projection when this region is focused. */
  zoom: { center: [number, number]; scale: number };
  /** Mean pairwise flavor distance among members; baseline for a random pair is 5.84. */
  spread: number;
}

export const CULINARY_REGIONS: CulinaryRegion[] = [
  {
    id: 'mesoamerica',
    name: 'Mexico & the Caribbean',
    countryIds: ['MX', 'JM'],
    labelAt: [-88, 21],
    zoom: { center: [-88, 20], scale: 700 },
    spread: 4.0,
  },
  {
    id: 'americas',
    name: 'The Americas',
    countryIds: ['US', 'BR', 'AR', 'PE'],
    labelAt: [-64, -12],
    zoom: { center: [-70, 0], scale: 190 },
    spread: 5.2,
  },
  {
    id: 'europe',
    name: 'Europe',
    countryIds: ['IE', 'FR', 'PT', 'ES', 'IT', 'GR'],
    labelAt: [3, 47],
    zoom: { center: [3, 45], scale: 600 },
    spread: 3.95,
  },
  {
    id: 'med-near-east',
    name: 'Mediterranean & Near East',
    countryIds: ['MA', 'EG', 'TR', 'LB', 'GE', 'AZ'],
    labelAt: [22, 31],
    zoom: { center: [22, 33], scale: 520 },
    spread: 3.66,
  },
  {
    id: 'sub-saharan',
    name: 'Sub-Saharan Africa',
    countryIds: ['NG', 'ET'],
    labelAt: [22, 8],
    zoom: { center: [24, 9], scale: 520 },
    spread: 5.2,
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    countryIds: ['AF', 'PK', 'IN'],
    labelAt: [73, 22],
    zoom: { center: [73, 27], scale: 700 },
    spread: 4.85,
  },
  {
    id: 'east-asia',
    name: 'East Asia',
    countryIds: ['CN', 'JP', 'KR'],
    labelAt: [116, 42],
    zoom: { center: [120, 36], scale: 620 },
    spread: 4.45,
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    countryIds: ['TH', 'VN', 'MY', 'ID', 'PH'],
    labelAt: [112, 4],
    zoom: { center: [111, 7], scale: 620 },
    spread: 5.27,
  },
];

/** Alpha-2 → region id. Countries outside the dataset simply aren't in here. */
export const REGION_BY_COUNTRY: Record<string, string> = Object.fromEntries(
  CULINARY_REGIONS.flatMap(r => r.countryIds.map(id => [id, r.id]))
);

export const getRegion = (id: string) => CULINARY_REGIONS.find(r => r.id === id);

/**
 * Every country in the data must land in exactly one region, or it becomes
 * unreachable from the map. Checked at module load in dev rather than trusted.
 */
if (import.meta.env.DEV) {
  const missing = countries.filter(c => !REGION_BY_COUNTRY[c.id]).map(c => c.id);
  if (missing.length) {
    console.warn(`[culinaryRegions] no region for: ${missing.join(', ')}`);
  }
}
