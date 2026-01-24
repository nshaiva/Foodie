/**
 * Country Data Schema
 *
 * This defines the structure for pre-generated country food profiles.
 * Content will be generated via AI and stored as static JSON.
 */

export interface Country {
  // Basic Info
  id: string;                    // ISO 3166-1 alpha-2 code (e.g., "TH" for Thailand)
  name: string;                  // Full country name
  capital: string;
  continent: Continent;
  region: string;                // Sub-region (e.g., "Southeast Asia", "Western Europe")

  // Food Content (AI-generated)
  foodCulture: FoodCulture;
  cuisineProfile: CuisineProfile;
  popularDishes: Dish[];
}

export type Continent =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";  // Included for completeness, though no cuisine data

export interface FoodCulture {
  overview: string;              // 2-3 paragraph narrative about the country's food culture
  mealStructure?: string;        // How meals are typically structured (optional)
  diningCustoms?: string;        // Notable dining etiquette or customs (optional)
  historicalInfluences?: string; // Historical/cultural influences on cuisine (optional)
}

export interface CuisineProfile {
  summary: string;               // 1-2 sentence cuisine summary
  flavorProfile: string[];       // Primary flavor characteristics (e.g., ["spicy", "sour", "aromatic"])
  keyIngredients: string[];      // Staple ingredients (e.g., ["rice", "fish sauce", "lemongrass"])
  cookingTechniques: string[];   // Common techniques (e.g., ["stir-frying", "grilling", "fermenting"])
  spicesAndSeasonings: string[]; // Key spices/seasonings used
}

export interface Dish {
  name: string;                  // Local name
  englishName?: string;          // English translation if applicable
  description: string;           // 1-2 sentence description
  category: DishCategory;
  isVegetarian?: boolean;
  isStreetFood?: boolean;
  regionalOrigin?: string;       // Specific region within the country (optional)
}

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


/**
 * User-generated data schemas
 */

export interface Restaurant {
  id: string;
  countryId: string;             // Links to Country.id
  name: string;
  googleMapsLink?: string;
  rating?: number;               // 1-5
  notes?: string;
  dateVisited?: string;          // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface UserDish {
  id: string;
  countryId: string;             // Links to Country.id
  name: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DishRestaurantLink {
  id: string;
  dishId: string;
  restaurantId: string;
  notes?: string;                // e.g., "Best pad thai I've had"
  createdAt: string;
}
