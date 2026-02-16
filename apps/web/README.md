# Foodie Web App

A world cuisine exploration and logging app built with React, TypeScript, and Tailwind CSS.

## Features

### Browse Cuisines
- **Country Grid**: Browse 6 countries with rich food culture profiles
- **Culture & Regions**: Interactive regional maps with clickable markers
- **Cuisine Profile**: Flavor radar chart, ingredient pyramid, cooking flow visualization
- **Popular Dishes**: Expandable list with dietary info, difficulty ratings, and spice levels

### Track Your Food Journey
- **Restaurant Logging**: Track restaurants with visits and ratings
- **Dish Logging**: Log dishes you've tried at restaurants or cooked at home
- **Favorites**: Mark dishes as favorites (heart icon)
- **Want to Try**: Save dishes to your wishlist (bookmark icon)

### Visualizations
- **Flavor Fingerprint**: Radar chart showing cuisine's flavor intensity profile
- **Ingredient Pyramid**: Tiered display of essential ingredients with hover tooltips
- **Cooking Flow**: Step-by-step visual of typical cooking progression

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Charts**: Recharts (radar charts)
- **Maps**: react-simple-maps (regional maps)
- **Storage**: localStorage (Supabase planned)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── country-detail/
│   │   └── slides/           # Carousel slides (Culture, Profile, Dishes)
│   ├── FlavorRadarChart.tsx  # Flavor intensity visualization
│   ├── IngredientPyramid.tsx # Tiered ingredient display
│   ├── CookingFlow.tsx       # Cooking progression flow
│   └── ...                   # Other UI components
├── data/
│   ├── types.ts              # TypeScript interfaces
│   ├── countries.ts          # Country data (6 countries)
│   └── systemColors.ts       # Shared color palette
├── hooks/                    # Custom React hooks
└── pages/                    # Route pages
```

## Data Schema

Each country includes:
- **Food Culture**: Overview, meal structure, dining customs, historical influences
- **Cuisine Profile**: Flavor intensity (1-10 scale), ingredient tiers, cooking flow
- **Regional Variations**: Signature dishes, key ingredients, distinctive traits
- **Popular Dishes**: Name, description, category, difficulty, spice level, dietary info

## Countries Available

- Thailand (TH)
- Mexico (MX)
- Japan (JP)
- Italy (IT)
- Ethiopia (ET)
- Peru (PE)

## License

Private project - not for distribution.
