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

export type BeverageCategory =
  | 'tea'
  | 'coffee'
  | 'juice'
  | 'soda'
  | 'beer'
  | 'wine'
  | 'spirit'
  | 'cocktail'
  | 'street'
  | 'ceremonial';

export interface Beverage {
  name: string;
  englishName?: string;
  pronunciation?: string;
  description: string;
  /** One line (~40-80 chars) shown on the tile; the description stays behind a tap. Optional until #9 fills it everywhere. */
  tagline?: string;
  /** Dish image URL (#36/#37). Optional: tiles show a tinted plate placeholder without it. */
  image?: string;
  /** Where it comes from, when that's a place rather than a whole region (#9's
   *  `locality`): the detail view reads "From Puebla · Central Mexico". Only
   *  filled when the drink is genuinely tied to one place. With `coordinates`
   *  the map also floats its image over that point at region zoom. */
  origin?: { place: string; coordinates?: [number, number] };
  type: 'alcoholic' | 'non-alcoholic' | 'both';
  category?: BeverageCategory;
  regionalOrigin?: string;
  servedHow?: 'hot' | 'cold' | 'room temperature' | 'iced';
  keyIngredients?: string[];
  isTraditional?: boolean;
  isStreetDrink?: boolean;
  alcoholContent?: 'none' | 'low' | 'medium' | 'high';
  dietary?: DietaryInfo;
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
  popularBeverages?: Beverage[];
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
  interpretation?: string;  // One-sentence summary of the flavor profile
}

export interface CookingStep {
  action: string;      // e.g., "Pound aromatics"
  emoji?: string;      // e.g., "🥄"
}

// The six fingerprint axes (numeric keys of FlavorIntensity)
export type FlavorAxisId = 'heat' | 'acidity' | 'sweetness' | 'umami' | 'aromatic' | 'smokeEarth';

export interface IngredientFlavorAxis {
  axis: FlavorAxisId;
  strength: 'main' | 'supporting';
}

export interface TieredIngredient {
  name: string;
  emoji: string;
  description?: string;  // 1-2 sentence description for modal
  // Which fingerprint axes this ingredient drives; empty/omitted = neutral
  // (texture, canvas). Populated per-country by the content pipeline (#23).
  flavorAxes?: IngredientFlavorAxis[];
}

export interface IngredientTiers {
  foundation: TieredIngredient[];      // 4-5 items - Essential, can't do this cuisine without
  aromaticCore: TieredIngredient[];    // 5-7 items - Signature flavors that define the cuisine
  flavorBuilders: TieredIngredient[];  // 8-10 items - Common supporting ingredients
  staples: TieredIngredient[];         // 3-5 items - Base ingredients and essentials
}

export interface CuisineProfile {
  summary: string;
  flavorProfile: string[];
  flavorIntensity: FlavorIntensity;
  keyIngredients: string[];
  cookingTechniques: string[];
  cookingFlow?: CookingStep[];  // Ordered steps showing typical cooking progression
  spicesAndSeasonings: string[];
  ingredientTiers?: IngredientTiers;  // Hierarchical ingredient pyramid
}

export interface Dish {
  name: string;
  englishName?: string;
  pronunciation?: string;  // Phonetic spelling, e.g., "tom yoom goong"
  description: string;
  /** One line (~40-80 chars) shown on the tile; the description stays behind a tap. Optional until #9 fills it everywhere. */
  tagline?: string;
  /** Dish image URL (#36/#37). Optional: tiles show a tinted plate placeholder without it. */
  image?: string;
  /** Where it comes from, when that's a place rather than a whole region (#9's
   *  `locality`): the detail view reads "From Puebla · Central Mexico". Only
   *  filled when the dish is genuinely tied to one place; left out for dishes
   *  eaten everywhere so the batch doesn't invent precision. With
   *  `coordinates` the map also floats its image over that point at region zoom. */
  origin?: { place: string; coordinates?: [number, number] };
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
  restaurantName?: string;  // Free-text "where I ate it" (optional)
  date: string;
  rating?: number;          // 1-5
  notes?: string;
}

export interface UserDish {
  id: string;
  countryId: string;
  region?: string;
  name: string;
  kind?: 'food' | 'drink';  // defaults to food; set for entries logged from the Drinks tab
  /** How the entry came to exist. 'lookup' = saved from an AI menu lookup (#3);
   *  its guessed traits never feed the flavor profile unless the diner rates it. */
  source?: 'lookup' | 'survey';
  notes?: string;
  tasteRating?: number;  // 1-5: How much you enjoyed eating this dish
  restaurantTries?: RestaurantTry[];
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
