# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodie is a world cuisine exploration and logging app. Users browse countries, learn about food culture, and log restaurants and dishes they've tried. Currently in early development (Phase 0).

## Tech Stack

- **Web**: React, TypeScript, Tailwind CSS, Vite
- **Mobile**: React Native (iOS first, not yet started)
- **Charts**: Recharts (radar), D3.js (force layouts)
- **Maps**: Leaflet.js
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
│   ├── phases/                 # Development phase specs
│   └── roadmap/                # Feature icebox
└── .claude/                    # Claude Code configuration
```

## Key Features

### Dish Logging
- Log dishes with taste ratings (1-5 stars)
- Track restaurant tries with per-visit ratings
- Track cooking attempts with success ratings
- Auto-detect region from dish name
- Auto-create restaurants when logging dishes

### Favorites
- Mark dishes as favorites with heart icon
- Stored in localStorage (`foodie-favorites`)
- Rose/tomato themed UI

### Wishlist (Want to Try)
- Save dishes from Popular Dishes to "Want to Try" list
- Bookmark icon (amber/saffron themed)
- Stored in localStorage (`foodie-wishlist`)

### Cuisine Preferences
- Separate rankings: "Favorite to Eat" vs "Favorite to Cook"
- Algorithm: `score = (avgRating * 0.7) + (engagementBonus * 0.3)`
- Displayed on home page when user has rated dishes

## Data Architecture

**Static Data** (pre-generated JSON):
- Country profiles with food culture, cuisine profiles, and popular dishes
- Uses ISO 3166-1 alpha-2 codes as country IDs (e.g., "TH" for Thailand)
- Schema defined in `apps/web/src/data/types.ts`
- Dishes can have `keyTraits`: 2-3 dominant flavor/ingredient/technique tags

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

## Cuisine Profile Visualizations

The Country Detail page includes three visualizations in the Cuisine Profile section:

### Flavor Radar Chart
- Hexagonal radar chart showing flavor intensity (1-10 scale)
- Axes: Heat, Acidity, Sweet, Umami, Aromatic, Smoke/Earth
- Uses Recharts library
- Country color palette for styling

### Kitchen Constellation (Ingredients)
- D3.js force-directed layout showing ingredients and spices
- Emoji icons by category:
  - 🥣 Spices (dried spices, specialty)
  - 🌿 Herbs (fresh herbs)
  - 🥓 Proteins (meat, seafood, plant-based)
  - 🌾 Vegetables (produce)
  - 🍚 Starches (rice, noodles, grains)
  - 🍶 Sauces (fermented, condiments)
- Signature ingredients shown larger than supporting ingredients
- Dashed lines connect commonly paired ingredients (e.g., "fish sauce + lime + cilantro")
- Ingredient taxonomy with pattern-based classification in `data/ingredientTaxonomy.ts`

### Cooking Flow
- Visual flow showing typical cooking progression for each cuisine
- Emoji-labeled steps connected by arrows
- Example: "Pound aromatics → Fry paste → Simmer curry → Finish with herbs"
- Data stored in `cuisineProfile.cookingFlow` as array of `CookingStep` objects
- Makes cooking techniques feel alive, not just labels

## Build Commands

```bash
cd apps/web
npm install
npm run dev      # Development server
npm run build    # Production build
```
