# Project Context

This document provides context for AI assistants and developers working on the Foodie codebase.

## What is Foodie?

Foodie is a personal world cuisine exploration and logging app. Users can:
1. Browse countries via an interactive world map or grid view
2. Learn about each country's food culture, regional cuisines, and popular dishes
3. Log restaurants they've visited and dishes they've tried
4. Track their culinary journey across the globe

## Current State

**Development Phase:** Phase 1 complete (Visual MVP)

The app is functional with:
- 6 countries fully profiled (Thailand, Mexico, Japan, Italy, Ethiopia, Peru)
- Interactive world map with color-coded activity states
- Restaurant and dish logging with localStorage persistence
- Filtering and sorting on database views

## Key Technical Decisions

### Map Library
Using `react-simple-maps` (not Leaflet as originally planned). The TopoJSON data uses ISO numeric country codes, so we maintain a mapping in `countryGeoMapping.ts` to convert to our ISO alpha-2 IDs.

### Data Storage
Currently using localStorage via custom hooks (`useLocalStorage`, `useRestaurants`, `useDishes`). Supabase integration planned for V1 when multi-user auth is added.

### Country IDs
All countries use ISO 3166-1 alpha-2 codes (e.g., "TH" for Thailand, "MX" for Mexico).

### Regional Cuisines
Countries can have `regionalVariations` (e.g., Thailand has Central, Northern/Lanna, Isan, Southern). Users can tag restaurants and dishes with these regions.

## File Structure

```
apps/web/src/
├── components/
│   ├── map/
│   │   ├── WorldMap.tsx        # Main map component
│   │   ├── MapPreviewCard.tsx  # Hover tooltip
│   │   ├── MapLegend.tsx       # Color legend
│   │   └── mapUtils.ts         # Colors and helpers
│   ├── CountryCard.tsx         # Grid view card
│   ├── RestaurantCard.tsx      # Restaurant display with visits
│   ├── DishCard.tsx            # Dish display
│   ├── RestaurantForm.tsx      # Add/edit restaurant
│   ├── DishForm.tsx            # Add/edit dish
│   ├── StarRating.tsx          # Rating input/display
│   └── ViewToggle.tsx          # Grid/Map switcher
├── pages/
│   ├── Home.tsx                # Main view with toggle
│   ├── CountryDetail.tsx       # Country profile page
│   ├── Restaurants.tsx         # All restaurants list
│   └── Dishes.tsx              # All dishes list
├── hooks/
│   ├── useLocalStorage.ts      # Generic localStorage hook
│   ├── useRestaurants.ts       # Restaurant CRUD operations
│   ├── useDishes.ts            # Dish CRUD + restaurant linking
│   ├── useCountryActivity.ts   # Calculate map colors
│   └── useMediaQuery.ts        # Responsive breakpoints
└── data/
    ├── types.ts                # All TypeScript interfaces
    ├── countries.ts            # Country profile data
    └── countryGeoMapping.ts    # ISO numeric → alpha-2 mapping
```

## Key Types

```typescript
// Dietary information for dishes
interface DietaryInfo {
  isVegan?: boolean;
  isVegetarian?: boolean;
  isVegetarianFriendly?: boolean;  // Can be made vegetarian
  isDairyFree?: boolean;
  isGlutenFree?: boolean;
  isNutFree?: boolean;
  isHalal?: boolean;
}

// Spice levels
type SpiceLevel = "none" | "mild" | "medium" | "hot" | "very-hot";

// Popularity/authenticity
type DishPopularity = "local-favorite" | "tourist-classic" | "both";

// Map activity states (determines country color)
type ActivityState = "noProfile" | "hasProfile" | "hasRestaurants" | "hasBoth";
```

## Map Color Scheme

| State | Color | Hex |
|-------|-------|-----|
| No profile | Gray | `#e5e7eb` |
| Has profile | Soft sage | `#d4e8e0` |
| Restaurants only | Soft beige | `#f0e6d3` |
| Both activities | Lavender | `#d4c4eb` |

## Common Tasks

### Adding a New Country
1. Add country data to `data/countries.ts` following the `Country` interface
2. Include `foodCulture`, `cuisineProfile`, `regionalVariations` (if applicable), and `popularDishes`
3. Add dietary info, spice level, and popularity to each dish

### Adding New Dietary Filters
1. Add field to `DietaryInfo` interface in `types.ts`
2. Update dish data in `countries.ts`
3. Add display badge in `CountryDetail.tsx` Popular Dishes section

### Modifying Map Behavior
- Colors: `components/map/mapUtils.ts`
- Hover card: `components/map/MapPreviewCard.tsx`
- Activity calculation: `hooks/useCountryActivity.ts`

## Dependencies

Key packages:
- `react-simple-maps` - World map rendering
- `react-router-dom` - Client-side routing
- `tailwindcss` - Styling

Note: `react-simple-maps` required `--legacy-peer-deps` for React 19 compatibility.

## Known Limitations

1. **No search** - Planned for Phase 2
2. **No offline support** - Planned for Phase 2
3. **No authentication** - All data is local, planned for V1
4. **6 countries only** - More profiles need to be generated
5. **No photos** - Planned for V1

## Future Plans

See `docs/roadmap/icebox.md` for prioritized feature ideas including:
- Cuisine similarity mapping
- City-level restaurant data
- Taste profile analysis
- Home cooking log
- Drinks section by country

## Owner

Personal project by Nikita Shaiva, built with Claude assistance.
