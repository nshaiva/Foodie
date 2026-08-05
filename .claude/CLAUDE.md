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
- **Storage**: localStorage (Supabase planned for future)
- **Hosting**: Vercel
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

## Country Detail Carousel

The Country Detail page uses a carousel with three slides:

### Tab 1: Culture & Regions
- Combined slide showing food culture and regional cuisines
- **Left panel**: Interactive regional map with clickable bubbles
  - Uses react-simple-maps for country geography
  - Region bubbles show short names, click to select
  - Click map background to return to Overview
  - Label badge shows current selection ("Overview" or region name)
- **Right panel**: Swaps between two views:
  - **Overview** (default): Meal Structure, Dining Customs, Historical Influences
  - **Region detail**: Overview, Signature Dishes, Key Ingredients, Distinctive Traits
- Countries without regional data show only the culture overview

### Tab 2: Profile (Cuisine Visualizations)
Three visualizations for the cuisine profile:

#### Flavor Radar Chart (Flavor Fingerprint)
- Hexagonal radar chart showing flavor intensity (1-10 scale)
- Axes: Heat, Acidity, Sweet, Umami, Aromatic, Smoke/Earth
- Uses Recharts library
- Country color palette for styling
- Interpretive text below chart summarizing the cuisine's flavor profile
- Data: `flavorIntensity.interpretation` field

#### Ingredient Pyramid (Ingredients & Spices)
- Tiered layout showing ingredients by importance:
  - **Foundation**: Essential ingredients you can't cook without
  - **Aromatic Core**: Signature aromatics defining the cuisine
  - **Flavor Builders**: Supporting ingredients for depth
  - **Staples**: Base starches and proteins
- Tier labels with hover tooltips explaining each tier's role
- Each ingredient has hover tooltip with concise description format: `[Alt name] · [Category/Role] · [Key trait]`
- Data: `ingredientTiers` with `TieredIngredient` objects containing `name`, `emoji`, `description`

#### Cooking Flow
- Visual flow showing typical cooking progression for each cuisine
- Emoji-labeled steps connected by arrows
- Responsive layout:
  - Desktop (lg+): Horizontal wrap
  - Tablet (sm-lg): Horizontal scroll with fade indicators
  - Mobile (<sm): Vertical stack with down arrows
- Data stored in `cuisineProfile.cookingFlow` as array of `CookingStep` objects

### Tab 3: Dishes
- Expandable list of popular dishes
- Each dish shows: name, key traits, region, spice level
- Expand to see: description, category, difficulty rating, dietary info
- Difficulty badges: Easy (green), Medium (amber), Hard (rose)
- Favorite (heart) and Want to Try (bookmark) buttons

## Build Commands

```bash
cd apps/web
npm install
npm run dev      # Development server
npm run build    # Production build
```
