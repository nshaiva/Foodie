# Phase 0: Functional Prototype

## Goal
Build a working prototype with core functionality: browse countries, view food profiles, log restaurants and dishes. No interactive map yet—navigation via list/grid.

## Deliverables

### 1. Project Setup
- [x] Monorepo structure
- [ ] Web app initialization (React + TypeScript + Tailwind)
- [ ] Supabase project setup
- [ ] Basic routing

### 2. Country Data
- [ ] Finalize country data schema
- [ ] Generate sample entries (5-10 countries) for testing
- [ ] Generate full 195 country dataset

### 3. Country Browsing (Web)
- [ ] Country list/grid view (homepage)
  - Display country name, flag/image, continent
  - Click to open country detail
- [ ] Country detail view
  - Basic info (capital, region)
  - Food culture narrative
  - Cuisine profile
  - Popular dishes list

### 4. Logging Features
- [ ] Restaurant logging form
  - Country (auto-filled if from country view)
  - Name (required)
  - Google Maps link (optional)
  - Rating (1-5 stars)
  - Notes (optional)
  - Date visited (optional)
- [ ] Dish logging form
  - Country (auto-filled if from country view)
  - Name (required)
  - Notes (optional)
  - Link to restaurants (optional, multi-select)

### 5. Database View
- [ ] List all restaurants
- [ ] List all dishes
- [ ] Basic filtering by country

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
├── CountryCard.tsx       # Grid item for country list
├── CountryDetail.tsx     # Full country profile view
├── RestaurantForm.tsx    # Add/edit restaurant
├── DishForm.tsx          # Add/edit dish
├── RestaurantCard.tsx    # Restaurant list item
├── DishCard.tsx          # Dish list item
└── Rating.tsx            # Star rating input/display
```
