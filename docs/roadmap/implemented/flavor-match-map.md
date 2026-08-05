# Flavor Match Map Layer — Implementation Spec

Status: implemented (2026-08-04).

## What it is

A layer toggle on the home page world map. The existing coloring ("explored") stays the default; a new **Flavor Match** layer recolors countries by how well each cuisine's flavor profile matches the user's Personal Flavor Fingerprint. Answers "where should I explore next?" visually.

## Why it works with existing data

`usePersonalFlavorProfile()` already produces `personalFlavor` — six axes (heat, acidity, sweetness, umami, aromatic, smokeEarth) on a 1–10 scale. Every country's `cuisineProfile.flavorIntensity` uses the same six axes and scale. Flavor match is a comparison of two vectors already in the same space. No new data generation needed.

## Algorithm

New pure helper: `apps/web/src/components/map/flavorMatch.ts`

```
computeFlavorMatch(personal: PersonalFlavorIntensity, country: FlavorIntensity): number  // 0–100
```

1. **Axis weights — emphasize opinionated axes.** For each axis, weight = `0.5 + |personal[axis] − 5.5| / 4.5` (range 0.5–1.5). Axes where the user is extreme (heat 8.5) count more than no-signal axes (sweetness 5.2). Rationale: the personal vector is a weighted average, so mid-scale values mostly mean "no signal."
2. **Weighted Euclidean distance**, not cosine. Cosine only matches profile *shape* and would call a mild cuisine a match for a heat-lover. Distance respects intensity.
   `distance = √Σ weight[axis] × (personal[axis] − country[axis])²`
3. **Normalize to a score**: `match = 100 × (1 − distance / maxDistance)` where `maxDistance = √(Σ weight[axis] × 9²)` (worst case on the 1–10 scale, given the actual weights).
4. Also return the 1–2 highest-contributing *positive* axes (small distance on a high-weight axis) for tooltip copy, e.g. "92% — big on heat and aromatics, like you".

Compute for all profiled countries in one memoized pass (a `useFlavorMatch` hook or a memo inside WorldMap): `Map<countryId, { score, topAxes }>`.

**Already-explored countries stay in scoring** — do not exclude them. They render with the score color plus a distinct stroke/outline, which doubles as a sanity check (top logged cuisines should score high).

## UI changes

### Layer toggle
- New `MapLayer` type: `'explored' | 'flavorMatch'` (design leaves room for a future `'wishlist'` layer).
- Small segmented control / chips floating over the map (top-left or near `MapLegend`), desktop map view only (mobile forces grid view — no change there).
- Persist choice via `useLocalStorage('foodie-map-layer', 'explored')`, same pattern as `foodie-view-mode` in `Home.tsx`.

### Coloring — `mapUtils.ts`
- Keep `getCountryFillColor` for the explored layer untouched.
- Add `getFlavorMatchFillColor(score, isHovered)`: sequential ramp in the terracotta palette — pale/near-neutral for low match → saturated terracotta for high. Interpolate a few hand-picked stops (see `systemColors` for the palette; check the `dataviz` skill before finalizing stops). Countries without a profile stay `MAP_COLORS.noProfile` gray.
- Hover variant: slightly darker, matching the existing `MAP_HOVER_COLORS` approach.

### WorldMap.tsx
- Read the active layer; in the `Geographies` render, pick fill via layer:
  - `explored` → existing `getCountryFillColor(activityState, isHovered)`
  - `flavorMatch` → `getFlavorMatchFillColor(matchMap.get(alpha2)?.score, isHovered)`; logged countries (`activityState === 'hasDishes'`) get a distinct stroke.
- Click/hover behavior unchanged.

### MapLegend.tsx
- Legend swaps with the layer: explored keeps `LEGEND_ITEMS`; flavor match shows a small gradient bar labeled "Less your taste → More your taste" plus the gray "Coming soon" swatch.

### MapPreviewCard.tsx (tooltip)
- On the flavor-match layer, add the score and driver copy: "92% match — big on heat and aromatics, like you".

## Guardrails

- `usePersonalFlavorProfile().hasEnoughData` (3+ logged dishes) gates the layer: below threshold the Flavor Match chip is disabled with hint "Log 3 dishes to unlock". If the stored layer preference is `flavorMatch` but data drops below threshold, fall back to `explored`.

## Files touched

| File | Change |
|---|---|
| `apps/web/src/components/map/flavorMatch.ts` | new — pure scoring helpers |
| `apps/web/src/components/map/mapUtils.ts` | add flavor-match color ramp + legend data |
| `apps/web/src/components/map/WorldMap.tsx` | layer state, fill switching, toggle UI |
| `apps/web/src/components/map/MapLegend.tsx` | per-layer legend |
| `apps/web/src/components/map/MapPreviewCard.tsx` | match score in tooltip |
| `apps/web/src/pages/Home.tsx` | possibly hoist layer state next to `viewMode` (or keep inside WorldMap) |

## Verification

1. Unit-test `computeFlavorMatch`: identical vectors → 100; maximally distant → ~0; opinionated-axis weighting (heat-lover scores spicy cuisine above equally-distant-but-mild one).
2. `npm run dev`, seed 3+ logged dishes skewed spicy/umami (e.g. Thailand, Korea) → toggle Flavor Match → Thailand/Korea saturated, mild cuisines pale; logged countries outlined.
3. Clear localStorage dishes → chip disabled with unlock hint; stored `flavorMatch` preference falls back to explored.
