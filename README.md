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
  - "Want to Try" button to save to wishlist

**Currently profiled countries:** Thailand, Mexico, Japan, Italy, Ethiopia, Peru

### Dish Logging
- **Taste rating**: Star ratings (1-5) for how much you liked it
- **Restaurant tries**: Track where you ate with per-visit ratings and notes
- **Cooking attempts**: Log home cooking with success ratings and recipe sources
- **Auto-detect region**: Region automatically detected from dish name
- **Auto-create restaurants**: Entering a new restaurant name automatically adds it to your list

### Restaurant Logging
- Name, Google Maps link, star rating (1-5), notes
- Date visited with multiple visit tracking
- Regional cuisine tagging (for countries with regional variations)
- Auto-populated when logging dishes at new restaurants

### Wishlist ("Want to Try")
- Save dishes from Popular Dishes section
- Rose-themed UI with heart icons
- Filter by country or continent
- Sort by date added, country, or name

### Cuisine Preferences
- **Favorite to Eat**: Rankings based on taste ratings from dishes and restaurant tries
- **Favorite to Cook**: Rankings based on cooking attempt success ratings
- Algorithm: `score = (avgRating * 0.7) + (engagementBonus * 0.3)`
- Displayed on home page when user has rated dishes

### Database Views
**Restaurants page** (`/restaurants`):
- Filter by continent, country, minimum rating, visit count
- Sort by newest, oldest, recently updated, most visited, highest/lowest rated, country A-Z, name A-Z

**Dishes page** (`/dishes`):
- Filter by continent, country
- Sort by newest, oldest, recently updated, most tried, most cooked, country A-Z, name A-Z

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web | React 19, TypeScript, Tailwind CSS, Vite |
| Routing | React Router |
| Maps | react-simple-maps, Leaflet.js |
| Storage | localStorage (Supabase planned for V1) |
| Hosting | Vercel (planned) |
| AI Content | Pre-generated country profiles via Claude |

## Project Structure

```
foodie/
├── apps/
│   └── web/
│       └── src/
│           ├── components/
│           │   ├── map/              # WorldMap, MapPreviewCard, MapLegend
│           │   ├── CountryCard, RestaurantCard, DishCard, WishlistCard
│           │   ├── RestaurantForm, DishForm
│           │   ├── RestaurantTryForm, CookingAttemptForm
│           │   ├── WantToTryButton, CuisinePreferences
│           │   ├── StarRating, ViewToggle
│           │   └── ...
│           ├── pages/
│           │   ├── Home              # Grid/Map view + cuisine preferences
│           │   ├── CountryDetail
│           │   ├── Restaurants
│           │   ├── Dishes
│           │   └── Wishlist
│           ├── hooks/
│           │   ├── useRestaurants, useDishes, useWishlist
│           │   ├── useCuisinePreferences
│           │   ├── useLocalStorage, useCountryActivity
│           │   └── useMediaQuery
│           └── data/
│               ├── types.ts
│               ├── countries.ts
│               └── countryGeoMapping.ts
├── docs/
│   ├── phases/
│   └── roadmap/
│       └── icebox.md               # Future feature ideas
└── README.md
```

## Data Model

### User Dishes
```typescript
interface UserDish {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  notes?: string;
  tasteRating?: number;           // 1-5: How much you enjoyed eating it
  restaurantTries?: RestaurantTry[];
  cookingAttempts?: CookingAttempt[];
  createdAt: string;
  updatedAt: string;
}

interface RestaurantTry {
  id: string;
  restaurantId?: string;          // Link to logged restaurant
  restaurantName?: string;        // Or just the name
  date: string;
  rating?: number;                // 1-5: How it was at this restaurant
  notes?: string;
}

interface CookingAttempt {
  id: string;
  date: string;
  successRating?: number;         // 1-5: How well you cooked it
  recipeSource?: string;
  notes?: string;
}
```

### Wishlist
```typescript
interface WishlistItem {
  id: string;
  countryId: string;
  dishName: string;
  englishName?: string;
  notes?: string;
  createdAt: string;
}
```

## Color Theme

| Feature | Color |
|---------|-------|
| Restaurants | Blue |
| Dishes (logged) | Emerald |
| Restaurant tries | Amber |
| Cooking attempts | Violet |
| Wishlist | Rose |

## Routes

```
/                     → Home (Grid/Map view + cuisine preferences)
/country/:id          → Country detail
/restaurants          → All restaurants with filters
/dishes               → All dishes with filters
/wishlist             → Want to Try list
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
- City-level restaurant data
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
