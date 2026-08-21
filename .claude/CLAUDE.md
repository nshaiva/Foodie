# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodie is a world cuisine exploration and logging app. Users browse countries, learn about food culture, and log restaurants and dishes they've tried. Currently in early development (Phase 0).

## Product Thesis (stated 2026-08-05)

**Primary:** "I'm at a restaurant trying a new cuisine and I don't know what to
order." The app should answer that moment — and teach the spices and food of
the cuisine I'm eating while I'm at it. Because this moment happens on a phone,
**the app must be mobile-optimized as well as desktop-optimized**.

**Secondary:** over time, give a sense of:
- the cuisines I'm trying, want to try, and haven't tried yet
- where they are in the world in relation to each other
- how similar they are to cuisines I've already eaten

**Tertiary:** self-knowledge — understanding my own palate (flavor fingerprint,
spice affinity).

**Quaternary:** cultural learning beyond the plate (history, customs, regions).

**Non-goals:** cooking (tracking, recipes, difficulty guidance), social/sharing
features, and restaurant tracking as its own thing (per-visit tries on a dish
are fine; a restaurants section is not).

Feature decisions in `docs/roadmap/priorities.md` should serve these goals;
when priorities conflict, the restaurant-moment thesis wins.

## Tech Stack

- **Web**: React, TypeScript, Tailwind CSS, Vite
- **Mobile**: React Native (iOS first, not yet started)
- **Charts**: Recharts (radar), D3.js (force layouts)
- **Maps**: react-simple-maps (TopoJSON uses ISO numeric codes; `countryGeoMapping.ts` converts to our alpha-2 IDs)
- **Storage**: localStorage is the source of truth; optional Supabase mirror for cross-device sync
- **Hosting**: Vercel (auto-deploys from `main`; Root Directory is `apps/web`)
- **Content**: Pre-generated country profiles via Claude/OpenAI

## Project Structure

```
foodie/
├── apps/
│   └── web/
│       └── src/
│           ├── components/     # Reusable UI components
│           ├── data/           # Types and country data
│           ├── hooks/          # Custom React hooks
│           └── pages/          # Route pages
├── docs/
│   ├── design/
│   │   ├── mockups/            # Static HTML design mockups
│   │   └── prototypes/         # Interactive prototypes / session artifacts (save new ones here)
│   ├── archive/                # Superseded build plans & tech designs (historical record)
│   └── roadmap/                # priorities.md (ranked backlog + idea inbox), notes.md, implemented/ specs
└── .claude/                    # Claude Code configuration
```

## Key Features

### Dish Logging
- Log dishes with taste ratings (1-5 stars)
- Track restaurant tries with per-visit ratings
- Auto-detect region from dish name
- **Rating semantics (verdict model)**: a dish-level `tasteRating` is the user's
  declared verdict and wins wherever it exists; otherwise the average of rated
  tries fills in (shown as "avg of N tries"). "I ate out" ratings stay on the
  visit and never auto-set the verdict. Shared helpers: `utils/ratings.ts`
  (`dishVerdictRating`, `isDerivedRating`, `ratingSignal`)

### Favorites
- Mark dishes as favorites with heart icon
- Stored in localStorage (`foodie-favorites`)
- Rose/tomato themed UI

### Wishlist (Want to Try)
- Save dishes from Popular Dishes to "Want to Try" list
- Bookmark icon (amber/saffron themed)
- Stored in localStorage (`foodie-wishlist`)

### Personal Flavor Fingerprint
Analyzes user's logged dishes to generate a personalized taste profile:
- **Personal Flavor Radar**: Reuses FlavorRadarChart with weighted cuisine data
- **Affinity Spectrums**: 4 preference sliders with labels and confidence opacity
  - Spice Tolerance: Based on spiceLevel of rated dishes
  - Dish Complexity: Based on difficulty of rated dishes
  - Sweet/Savory: Based on sweetness axis of engaged cuisines
  - Flavor Richness: Based on umami+smokeEarth vs acidity
- **Weighting is 3★-neutral**: `ratingSignal = (verdict − 3) / 2` (range −1..+1);
  4–5★ pulls a cuisine/trait toward the profile, 1–2★ pushes away, unrated
  dishes contribute no rating signal (spice/complexity sliders ignore them)
- **Cuisine weight**: `max(0, signal*0.7 + frequencyWeight*0.1 + recencyWeight*0.2)`
  — ratings dominate; all-disliked cuisines clamp to 0 and drop out of the radar
  and Top Influences
- **Thresholds**: 3+ dishes for radar, 5+ for spectrums
- Hook: `usePersonalFlavorProfile()` in `hooks/usePersonalFlavorProfile.ts`
- Components: `PersonalFlavorFingerprint.tsx`, `AffinitySpectrum.tsx`

## Data Architecture

**Static Data** (pre-generated JSON):
- Country profiles with food culture, cuisine profiles, and popular dishes
- Uses ISO 3166-1 alpha-2 codes as country IDs (e.g., "TH" for Thailand)
- Schema defined in `apps/web/src/data/types.ts`
- Dishes can have `keyTraits`: 2-3 dominant flavor/ingredient/technique tags
- Dishes have `difficulty`: 'easy' | 'medium' | 'hard' for home cooking guidance

**User Data** (localStorage):
- `foodie-restaurants`: Restaurant entries with visits
- `foodie-dishes`: Dishes with restaurant tries and cooking attempts
- `foodie-wishlist`: Saved dishes to try (bookmark icon)
- `foodie-favorites`: Favorite dishes (heart icon)
- `foodie-diet-prefs`, `foodie-taste-survey`: food preferences and survey answers
- `foodie-map-layer`, `foodie-view-mode`: per-device view prefs — **not synced**

All access goes through `hooks/useLocalStorage.ts`. Add new user data there
rather than touching `window.localStorage` directly, so it participates in
backup and sync automatically.

**Sync & backup** (`data/syncKeys.ts`, `hooks/useCloudSync.ts`):
- The five profile keys above sync; the two view-pref keys deliberately don't.
- localStorage stays the read path (fast, offline). Supabase holds one `jsonb`
  row per user, pushed ~1.5s after the last edit and pulled on sign-in/focus.
- Whole-document **last-write-wins** — simultaneous edits on two devices lose
  the earlier save. Per-entity tables are roadmap #22.
- Inert without `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`; supabase-js
  tree-shakes out entirely when unset. Setup: `docs/supabase-setup.md`.
- Export/import backup (`utils/dataTransfer.ts`) works with no account.

## Routing Structure

```
/                     → Home (country grid + cuisine preferences)
/country/:id          → Country detail (culture, dishes, user logs)
/restaurants          → All restaurants list
/dishes               → All dishes list
/wishlist             → Want to Try list
```

## Color Theme by Feature

- **Blue** - Restaurants
- **Emerald** - Dishes (logged)
- **Amber** - Restaurant tries
- **Violet** - Cooking attempts
- **Rose** - Wishlist

## Country Detail Page

One scrolling view — the three-tab carousel was removed 2026-08-21. Everything
you can eat or drink in a country is a single list, grouped by a lens.

**Lenses** (`utils/groupDishes.ts`): Region · Type · Tried · All. Grouping is a
pure reducer over the already-filtered entries, so switching lens never changes
*which* dishes show, only how they're arranged. The Region lens is absent
entirely for countries with no `regionalVariations`.

**Region focus.** Section headers show name and count only. Tapping a header or
a map bubble focuses that region — full description, derived flavor chips, key
ingredients, list narrowed to it. Focus lives in the URL as `?region=<slug>`
(`useSearchParams`), so browser back works and region views are linkable.

**Dish → region** (`utils/dishRegion.ts`): `resolveRegion()` returns `region`,
`nationwide`, `orphan`, or `none`. A region's name is read as a set of aliases —
split on `&`, `,`, `/` across both the main name and any parenthetical — plus a
small per-country `REGION_ALIASES` table. Items that resolve to `nationwide` or
`none` share an "Across {country}" bucket; `orphan` gets "Elsewhere" so a
failed match is visible rather than silently dropped. Use this rather than
writing another `detectRegion`.

`regionFingerprint()` derives a region's flavor axes from its `keyIngredients`;
coverage is uneven, so it returns a match count and callers hide chips below
`FINGERPRINT_MIN_MATCHES`.

**Key files**: `pages/CountryDetail.tsx`, `hooks/useDishFilters.ts`,
`components/country-detail/{LensControls,DishSection,EntryGrid}.tsx`,
`components/map/RegionalMap.tsx`, `data/regionMapConfig.ts` (hand-maintained
coordinates; a country missing from them falls back to a button grid).

**Below the list**: Flavor fingerprint (radar + ingredient pyramid) and Food
culture (meal structure, customs, influences, similar cuisines) as disclosures.

Filters live in `useDishFilters`. Food-only filters (spice, popularity, dessert)
exclude drinks outright and drink-only filters exclude food — filtering for
"hot" should not return tea.

## Build Commands

```bash
cd apps/web
npm install
npm run dev      # Development server
npm run build    # Production build
```
