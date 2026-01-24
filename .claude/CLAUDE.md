# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodie is a world cuisine exploration and logging app. Users browse countries, learn about food culture, and log restaurants and dishes they've tried. Currently in early development (Phase 0).

## Tech Stack

- **Web**: React, TypeScript, Tailwind CSS
- **Mobile**: React Native (iOS first, not yet started)
- **Maps**: Leaflet.js (Phase 1)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Content**: Pre-generated country profiles via Claude/OpenAI

## Project Structure

```
foodie/
├── apps/
│   ├── web/              # React web app (not yet initialized)
│   └── mobile/           # React Native iOS app (not yet initialized)
├── packages/
│   ├── shared/           # Shared types, utils, API logic
│   └── ui/               # Shared UI components
├── data/
│   ├── schema.ts         # TypeScript interfaces for all data types
│   └── samples/          # Pre-generated country JSON files (6 countries)
└── docs/
    └── phases/           # Development phase specifications
```

## Data Architecture

**Static Data** (pre-generated, stored as JSON):
- Country profiles with food culture, cuisine profiles, and popular dishes
- Uses ISO 3166-1 alpha-2 codes as country IDs (e.g., "TH" for Thailand)
- Schema defined in `data/schema.ts`

**User Data** (Supabase):
- Restaurants: linked to countries, with ratings (1-5), Google Maps links, notes
- UserDish: dishes tried, linked to countries
- DishRestaurantLink: optional junction table linking dishes to restaurants

## Current Development Phase

**Phase 0: Functional Prototype** - See `docs/phases/phase-0.md` for full spec.

Key deliverables:
- Country list/grid navigation (no map yet)
- Country detail view with AI-generated content
- Restaurant and dish logging forms
- Basic database view with country filtering

## Routing Structure (Web)

```
/                     → Country list (homepage)
/country/:id          → Country detail
/country/:id/add      → Add restaurant or dish to this country
/restaurants          → All restaurants list
/dishes               → All dishes list
/add                  → Add restaurant or dish (country selectable)
```

## Build Commands

*Not yet configured - web app needs initialization with React + TypeScript + Tailwind.*
