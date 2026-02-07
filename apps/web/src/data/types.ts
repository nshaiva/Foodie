export interface RegionalCuisine {
  name: string;
  description: string;
  signatureDishes: string[];
  keyIngredients: string[];
  distinctiveTraits?: string[];
}

export interface ColorPalette {
  primary: string;      // Main accent color (muted flag color)
  secondary: string;    // Secondary accent
  accent: string;       // Highlight/warm tone
  background: string;   // Light background
  text: string;         // Text on colored backgrounds
}

export interface Country {
  id: string;
  name: string;
  capital: string;
  continent: Continent;
  region: string;
  colorPalette: ColorPalette;
  foodCulture: FoodCulture;
  cuisineProfile: CuisineProfile;
  regionalVariations?: RegionalCuisine[];
  popularDishes: Dish[];
}

export type Continent =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania";

export interface FoodCulture {
  overview: string;
  mealStructure?: string;
  diningCustoms?: string;
  historicalInfluences?: string;
}

export interface FlavorIntensity {
  heat: number;       // 1-10
  acidity: number;    // 1-10
  sweetness: number;  // 1-10
  umami: number;      // 1-10
  aromatic: number;   // 1-10
  smokeEarth: number; // 1-10
}

export interface CuisineProfile {
  summary: string;
  flavorProfile: string[];
  flavorIntensity: FlavorIntensity;
  keyIngredients: string[];
  cookingTechniques: string[];
  spicesAndSeasonings: string[];
}

export interface Dish {
  name: string;
  englishName?: string;
  description: string;
  category: DishCategory;
  regionalOrigin?: string;

  // Key traits: 2-3 dominant flavor/ingredient/technique/spice tags
  keyTraits?: string[];

  // Dietary information
  dietary?: DietaryInfo;

  // Spice level
  spiceLevel?: SpiceLevel;

  // Popularity/authenticity
  popularity?: DishPopularity;

  // Cooking difficulty
  difficulty?: DishDifficulty;

  // Legacy fields (kept for backward compatibility)
  isVegetarian?: boolean;
  isStreetFood?: boolean;
}

export interface DietaryInfo {
  isVegan?: boolean;
  isVegetarian?: boolean;
  isVegetarianFriendly?: boolean;  // Can be made vegetarian
  isDairyFree?: boolean;
  isGlutenFree?: boolean;
  isNutFree?: boolean;
  isHalal?: boolean;
}

export type SpiceLevel =
  | "none"      // No spice
  | "mild"      // Slight warmth
  | "medium"    // Noticeable heat
  | "hot"       // Significant heat
  | "very-hot"; // Intense heat

export type DishPopularity =
  | "local-favorite"    // Beloved by locals, less known to tourists
  | "tourist-classic"   // Popular with tourists, iconic dishes
  | "both";             // Popular with everyone

export type DishCategory =
  | "appetizer"
  | "soup"
  | "salad"
  | "main"
  | "side"
  | "street-food"
  | "dessert"
  | "beverage"
  | "breakfast"
  | "condiment";

export type DishDifficulty = 'easy' | 'medium' | 'hard';

export interface RestaurantTry {
  id: string;
  restaurantId?: string;    // Optional link to logged restaurant
  restaurantName?: string;  // Name if not linking to a logged restaurant
  date: string;
  rating?: number;          // 1-5
  notes?: string;
}

export interface CookingAttempt {
  id: string;
  date: string;
  successRating?: number;   // 1-5
  recipeSource?: string;
  notes?: string;
}

export interface RestaurantVisit {
  id: string;
  date: string;
  notes?: string;
}

export interface Restaurant {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  googleMapsLink?: string;
  rating?: number;
  notes?: string;
  visits: RestaurantVisit[];
  createdAt: string;
  updatedAt: string;
}

export interface UserDish {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  notes?: string;
  tasteRating?: number;  // 1-5: How much you enjoyed eating this dish
  restaurantTries?: RestaurantTry[];
  cookingAttempts?: CookingAttempt[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  countryId: string;
  dishName: string;
  englishName?: string;
  notes?: string;
  createdAt: string;
}

export interface FavoriteItem {
  id: string;
  countryId: string;
  dishName: string;
  englishName?: string;
  notes?: string;
  createdAt: string;
}
