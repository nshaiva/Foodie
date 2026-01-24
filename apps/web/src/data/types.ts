export interface RegionalCuisine {
  name: string;
  description: string;
  signatureDishes: string[];
  keyIngredients: string[];
  distinctiveTraits?: string[];
}

export interface Country {
  id: string;
  name: string;
  capital: string;
  continent: Continent;
  region: string;
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

export interface CuisineProfile {
  summary: string;
  flavorProfile: string[];
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

  // Dietary information
  dietary?: DietaryInfo;

  // Spice level
  spiceLevel?: SpiceLevel;

  // Popularity/authenticity
  popularity?: DishPopularity;

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
  createdAt: string;
  updatedAt: string;
}
