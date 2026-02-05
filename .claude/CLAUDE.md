# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodie is a world cuisine exploration and logging app. Users browse countries, learn about food culture, and log restaurants and dishes they've tried. Currently in early development (Phase 0).

## Tech Stack

- **Web**: React, TypeScript, Tailwind CSS, Vite
- **Mobile**: React Native (iOS first, not yet started)
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

### Wishlist
- Save dishes from Popular Dishes to "Want to Try" list
- Rose-themed UI with heart icons
- Filter by country/continent

### Cuisine Preferences
- Separate rankings: "Favorite to Eat" vs "Favorite to Cook"
- Algorithm: `score = (avgRating * 0.7) + (engagementBonus * 0.3)`
- Displayed on home page when user has rated dishes

## Data Architecture

**Static Data** (pre-generated JSON):
- Country profiles with food culture, cuisine profiles, and popular dishes
- Uses ISO 3166-1 alpha-2 codes as country IDs (e.g., "TH" for Thailand)
- Schema defined in `apps/web/src/data/types.ts`

**User Data** (localStorage):
- `foodie-restaurants`: Restaurant entries with visits
- `foodie-dishes`: Dishes with restaurant tries and cooking attempts
- `foodie-wishlist`: Saved dishes to try

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

## Build Commands

```bash
cd apps/web
npm install
npm run dev      # Development server
npm run build    # Production build
```
