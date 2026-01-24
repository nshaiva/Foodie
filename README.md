# Foodie

A world cuisine exploration and logging app. Users browse an interactive world map, learn about each country's food culture, and log restaurants and dishes they've tried from around the world.

## Current Status

**Phase 0** (Functional Prototype) - Complete
**Phase 1** (Visual MVP) - Complete

## Features

### Interactive World Map
- Visual world map powered by `react-simple-maps`
- Color-coded countries based on activity:
  - Gray: No food profile yet
  - Soft sage: Has food profile, no user activity
  - Soft beige: User has logged restaurants
  - Lavender: User has logged both restaurants and dishes
- Hover preview cards with country info and activity summary
- Click to navigate to country detail
- Toggle between Map View and Grid View (preference saved to localStorage)
- Map hidden on mobile screens (< 768px)

### Country Profiles
Each country includes:
- Basic info (capital, region, continent)
- Food culture overview with meal structure, dining customs, historical influences
- Cuisine profile (flavor profiles, key ingredients, cooking techniques, spices)
- Regional cuisine variations (e.g., Northern vs Southern Thailand)
- Popular dishes with:
  - Dietary info (vegan, vegetarian, veg-friendly, gluten-free, dairy-free, halal)
  - Spice level (none, mild, medium, hot, very hot)
  - Popularity tags (local favorite vs tourist classic)
  - Category and regional origin

**Currently profiled countries:** Thailand, Mexico, Japan, Italy, Ethiopia, Peru

### Restaurant Logging
- Name, Google Maps link, star rating (1-5), notes
- Date visited with multiple visit tracking
- Regional cuisine tagging (for countries with regional variations)
- Add from country detail page or main Restaurants page

### Dish Logging
- Name, notes, regional cuisine tagging
- Link dishes to restaurants where you tried them
- Add from country detail page or main Dishes page

### Database Views
**Restaurants page** (`/restaurants`):
- Filter by continent, country, minimum rating, visit count
- Sort by newest, oldest, recently updated, most visited, highest/lowest rated, country A-Z, name A-Z

**Dishes page** (`/dishes`):
- Filter by continent, country
- Sort by newest, oldest, recently updated, country A-Z, name A-Z

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web | React 19, TypeScript, Tailwind CSS |
| Routing | React Router |
| Maps | react-simple-maps |
| Storage | localStorage (Supabase planned for V1) |
| Hosting | Vercel (planned) |
| AI Content | Pre-generated country profiles via Claude |

## Project Structure

```
foodie/
├── apps/
│   ├── web/                    # React web app
│   │   └── src/
│   │       ├── components/
│   │       │   ├── map/        # WorldMap, MapPreviewCard, MapLegend
│   │       │   ├── CountryCard, RestaurantCard, DishCard
│   │       │   ├── RestaurantForm, DishForm
│   │       │   ├── StarRating, ViewToggle
│   │       │   └── ...
│   │       ├── pages/
│   │       │   ├── Home        # Grid/Map view toggle
│   │       │   ├── CountryDetail
│   │       │   ├── Restaurants
│   │       │   └── Dishes
│   │       ├── hooks/
│   │       │   ├── useRestaurants, useDishes
│   │       │   ├── useLocalStorage
│   │       │   ├── useCountryActivity
│   │       │   └── useMediaQuery
│   │       └── data/
│   │           ├── types.ts
│   │           ├── countries.ts
│   │           └── countryGeoMapping.ts
│   └── mobile/                 # React Native iOS app (not started)
├── packages/
│   ├── shared/                 # Shared types, utils (planned)
│   └── ui/                     # Shared UI components (planned)
├── docs/
│   ├── phases/
│   └── roadmap/
│       └── icebox.md           # Future feature ideas
└── README.md
```

## Data Model

### Countries (pre-generated, static)
```typescript
interface Country {
  id: string;                    // ISO alpha-2 code (e.g., "TH")
  name: string;
  capital: string;
  continent: Continent;
  region: string;
  foodCulture: FoodCulture;
  cuisineProfile: CuisineProfile;
  regionalVariations?: RegionalCuisine[];
  popularDishes: Dish[];
}

interface Dish {
  name: string;
  englishName?: string;
  description: string;
  category: DishCategory;
  regionalOrigin?: string;
  dietary?: DietaryInfo;
  spiceLevel?: SpiceLevel;
  popularity?: DishPopularity;
}

interface DietaryInfo {
  isVegan?: boolean;
  isVegetarian?: boolean;
  isVegetarianFriendly?: boolean;
  isDairyFree?: boolean;
  isGlutenFree?: boolean;
  isNutFree?: boolean;
  isHalal?: boolean;
}
```

### Restaurants (user-generated, localStorage)
```typescript
interface Restaurant {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  googleMapsLink?: string;
  rating?: number;              // 1-5
  notes?: string;
  visits: RestaurantVisit[];
  createdAt: string;
  updatedAt: string;
}
```

### UserDishes (user-generated, localStorage)
```typescript
interface UserDish {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### DishRestaurantLinks
Links dishes to restaurants where they were tried.

## Routes

```
/                     → Home (Grid/Map view)
/country/:id          → Country detail
/restaurants          → All restaurants with filters
/dishes               → All dishes with filters
```

## Development Roadmap

### Phase 2: Polish (Next)
- Offline browsing (cached country data)
- Search across all entries

### V1: Full Release
- Multi-user accounts (Supabase auth)
- Photo attachments
- Google Maps metadata auto-pull

### Icebox
See `docs/roadmap/icebox.md` for future feature ideas including:
- Cuisine similarity mapping
- Home cooking log
- City-level restaurant data
- Taste profile analysis
- Dietary and spice filters
- Drink sections by country
- Historical/cultural context for dishes

## Getting Started

```bash
# Install dependencies
cd apps/web
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Contributing

This is a personal project by Nikita Shaiva, built with assistance from Claude.
