# Phase 0: Functional Prototype

## Goal
Build a working prototype with core functionality: browse countries, view food profiles, log restaurants and dishes. No interactive map yet—navigation via list/grid.

## Deliverables

### 1. Project Setup
- [x] Monorepo structure
- [x] Web app initialization (React + TypeScript + Tailwind)
- [ ] Supabase project setup (using localStorage for now)
- [x] Basic routing

### 2. Country Data
- [x] Finalize country data schema
- [x] Generate sample entries (6 countries) for testing
- [ ] Generate full 195 country dataset

### 3. Country Browsing (Web)
- [x] Country list/grid view (homepage)
  - Display country name, flag/image, continent
  - Click to open country detail
- [x] Country detail view
  - Basic info (capital, region)
  - Food culture narrative
  - Cuisine profile (radar chart, ingredient pyramid, cooking flow)
  - Popular dishes list with difficulty ratings

### 4. Logging Features
- [x] Restaurant logging form
  - Country (auto-filled if from country view)
  - Name (required)
  - Google Maps link (optional)
  - Rating (1-5 stars)
  - Notes (optional)
  - Date visited (optional)
- [x] Dish logging form
  - Country (auto-filled if from country view)
  - Name (required)
  - Notes (optional)
  - Link to restaurants (optional, multi-select)

### 5. Database View
- [x] List all restaurants
- [x] List all dishes
- [x] Basic filtering by country

## Out of Scope (Phase 0)
- Interactive map
- Offline support
- Search
- Advanced filtering/sorting
- Mobile app
- User authentication

## Technical Notes

### Routing Structure (Web)
```
/                     → Country list (homepage)
/country/:id          → Country detail
/country/:id/add      → Add restaurant or dish to this country
/restaurants          → All restaurants list
/dishes               → All dishes list
/add                  → Add restaurant or dish (country selectable)
```

### Component Structure
```
components/
├── CountryCard.tsx           # Grid item for country list
├── country-detail/
│   ├── CountryDetailView.tsx # Main country detail with carousel
│   └── slides/
│       ├── CultureRegionsSlide.tsx  # Culture + regional map
│       ├── ProfileSlide.tsx         # Cuisine visualizations
│       └── DishesSlide.tsx          # Popular dishes list
├── FlavorRadarChart.tsx      # Flavor intensity radar chart
├── IngredientPyramid.tsx     # Tiered ingredient display
├── CookingFlow.tsx           # Cooking progression visualization
├── PersonalFlavorFingerprint.tsx  # Personal taste profile display
├── AffinitySpectrum.tsx      # Preference spectrum slider
├── CuisinePreferences.tsx    # Favorite cuisines ranking
├── FavoriteButton.tsx        # Heart icon for favorites
├── WantToTryButton.tsx       # Bookmark icon for wishlist
├── RestaurantCard.tsx        # Restaurant list item
├── DishCard.tsx              # Dish list item
└── Rating.tsx                # Star rating input/display
```
