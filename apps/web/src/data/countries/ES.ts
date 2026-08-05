import type { Country } from '../types';

export const ES: Country = {
  id: "ES",
  name: "Spain",
  capital: "Madrid",
  continent: "Europe",
  region: "Southern Europe",
  colorPalette: {
    primary: "#a63d2f",      // Muted terracotta red (from flag)
    secondary: "#c9a227",    // Desaturated ochre gold (from flag)
    accent: "#7a8450",       // Olive green
    background: "#faf7f0",   // Warm ivory
    text: "#4a2c22"          // Deep umber
  },
  foodCulture: {
    overview: "Spanish food culture is organized around time and company as much as ingredients. The day stretches late—lunch is the main meal and rarely starts before two, dinner often begins at ten—and eating is treated as an unhurried social act. The sobremesa, the long stretch of conversation after the plates are cleared, is considered as essential as the meal itself.\n\nTapas culture captures the Spanish instinct to graze and socialize simultaneously. In Andalusian bars a small plate might still arrive free with a drink; in the Basque Country the counters groan with pintxos speared on toothpicks. Moving from bar to bar—the tapeo—turns dinner into a walking conversation, with each stop known for one thing it does perfectly.\n\nSpain is also fiercely regional. There is no single 'Spanish cuisine' so much as a federation of kitchens: Galicia's Atlantic seafood, Valencia's rice fields, Castile's roasting ovens, Catalonia's mar i muntanya pairings of sea and mountain. What unites them is a reverence for the raw material—olive oil, jamón, seasonal vegetables, seafood—handled simply and confidently, letting a few ingredients speak loudly.",
    mealStructure: "A light breakfast (coffee with toast and tomato, or churros) is followed by a mid-morning almuerzo snack. La comida, the main meal, arrives at 2-3pm—often two courses plus dessert—traditionally followed by a pause or siesta. An evening merienda tides people over until a late, lighter dinner (cena) around 9-11pm, frequently made up of tapas.",
    diningCustoms: "Tapas are shared from the center of the table; hoarding a plate to yourself misses the point. Bread accompanies nearly everything and is used to sweep up sauce. In pintxo bars you often serve yourself and settle up by the toothpick count. Lingering is expected—rushing a meal, or asking for the bill too quickly, reads as rude.",
    historicalInfluences: "Nearly eight centuries of Al-Andalus left the deepest mark: Moorish agriculture brought rice, saffron, citrus, almonds, and sugarcane, plus a taste for sweet-savory pairings. Roman occupation established olive oil, wine, and wheat. The Columbian Exchange transformed the kitchen again—tomatoes, peppers, potatoes, and chocolate all entered Europe through Spain—while centuries of Jewish and Christian foodways shaped everything from stews to the pork-heavy larder."
  },
  cuisineProfile: {
    summary: "Spanish cuisine is ingredient-driven and regionally proud, built on olive oil, garlic, smoked paprika, and saffron—flavors that are savory and sun-warmed rather than hot, from slow-simmered rices to cured hams and vinegar-bright seafood.",
    flavorProfile: ["savory (sabroso)", "smoky (ahumado)", "garlicky (con ajo)", "briny", "cured (curado)", "olive-rich"],
    flavorIntensity: {
      heat: 2,
      acidity: 5,
      sweetness: 3,
      umami: 8,
      aromatic: 6,
      smokeEarth: 8,
      interpretation: "Deeply savory and smoky rather than spicy—cured meats, pimentón, and slow-cooked sofrito deliver richness with barely any chili heat."
    },
    keyIngredients: ["olive oil", "garlic", "jamón ibérico", "smoked paprika (pimentón)", "saffron", "tomatoes", "bomba rice", "sherry vinegar", "salt cod (bacalao)", "chorizo"],
    cookingTechniques: ["slow sofrito base", "paella (wide-pan rice cooking)", "plancha grilling", "braising in wine (estofado)", "wood-oven roasting (asado)", "curing and salting", "frying in olive oil (fritura)"],
    cookingFlow: [
      { action: "Warm olive oil", emoji: "🫒" },
      { action: "Build sofrito", emoji: "🍅" },
      { action: "Bloom pimentón", emoji: "🌶️" },
      { action: "Simmer slowly", emoji: "🥘" },
      { action: "Rest & drizzle", emoji: "✨" }
    ],
    spicesAndSeasonings: ["smoked paprika (pimentón de la Vera)", "saffron", "garlic", "bay leaf", "parsley", "sherry vinegar", "sea salt", "rosemary", "thyme", "ñora peppers", "black pepper"],
    ingredientTiers: {
      foundation: [
        { name: "Olive Oil", emoji: "🫒", description: "Aceite de oliva · Universal fat · Fruity, peppery" },
        { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic base · Pungent, essential" },
        { name: "Pimentón", emoji: "🌶️", description: "Smoked paprika · Signature spice · Sweet, smoky" },
        { name: "Tomato", emoji: "🍅", description: "Tomate · Sofrito base · Sweet, concentrated" },
        { name: "Jamón", emoji: "🍖", description: "Cured ham · Umami backbone · Nutty, salty" }
      ],
      aromaticCore: [
        { name: "Saffron", emoji: "🌸", description: "Azafrán · Precious spice · Floral, golden" },
        { name: "Onion", emoji: "🧅", description: "Cebolla · Sofrito partner · Slow-cooked sweet" },
        { name: "Bay Leaf", emoji: "🍃", description: "Laurel · Simmering herb · Subtle, resinous" },
        { name: "Parsley", emoji: "🌿", description: "Perejil · Fresh finish · Clean, grassy" },
        { name: "Ñora Pepper", emoji: "🫑", description: "Dried pepper · Rice-dish aromatic · Sweet, earthy" },
        { name: "Sherry Vinegar", emoji: "🍷", description: "Vinagre de Jerez · Acid accent · Oaky, sharp" }
      ],
      flavorBuilders: [
        { name: "Chorizo", emoji: "🌭", description: "Cured sausage · Flavor engine · Paprika-rich, fatty" },
        { name: "Salt Cod", emoji: "🐟", description: "Bacalao · Preserved fish · Briny, flaky" },
        { name: "Almonds", emoji: "🥜", description: "Almendras · Sauce thickener · Moorish legacy, toasty" },
        { name: "Roasted Peppers", emoji: "🫑", description: "Pimientos asados · Vegetable staple · Silky, sweet" },
        { name: "White Wine", emoji: "🥂", description: "Vino blanco · Deglazing liquid · Bright, dry" },
        { name: "Manchego", emoji: "🧀", description: "Sheep's cheese · Table staple · Nutty, firm" },
        { name: "Anchovies", emoji: "🐠", description: "Anchoas/boquerones · Umami accent · Salty or vinegar-cured" },
        { name: "Olives", emoji: "🫒", description: "Aceitunas · Tapa essential · Briny, bitter-fruity" },
        { name: "Saffron Stock", emoji: "🍲", description: "Caldo · Rice-cooking liquid · Deep, seafood-rich" }
      ],
      staples: [
        { name: "Bomba Rice", emoji: "🍚", description: "Arroz bomba · Paella grain · Absorbent, firm" },
        { name: "Bread", emoji: "🥖", description: "Pan · Every-meal companion · Crusty, rustic" },
        { name: "Potatoes", emoji: "🥔", description: "Patatas · Tortilla base · New World staple" },
        { name: "Eggs", emoji: "🥚", description: "Huevos · Tortilla & fried dishes · Rich, golden" },
        { name: "Chickpeas", emoji: "🫘", description: "Garbanzos · Stew legume · Creamy, hearty" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Andalusia",
      description: "Spain's sun-baked south is the home of tapas, gazpacho, and the fritura—seafood flash-fried in olive oil so cleanly it stays crisp and light. The Moorish legacy is strongest here, in almond soups, citrus, and sweet pastries, while Jerez supplies sherry and sherry vinegar to the whole country.",
      signatureDishes: ["Gazpacho", "Salmorejo", "Pescaíto Frito", "Rabo de Toro"],
      keyIngredients: ["olive oil", "tomatoes", "sherry vinegar", "almonds", "fresh seafood"],
      distinctiveTraits: ["Birthplace of tapas culture", "Cold soups for the heat", "Expert olive-oil frying", "Deep Moorish influence"]
    },
    {
      name: "Basque Country",
      description: "The Basque coast may be Spain's most food-obsessed corner, with pintxo bars lining old-town streets and more Michelin stars per capita than almost anywhere on earth. The cooking is seafood-centric and technique-proud—salt cod in emulsified pil-pil sauce, hake in green sauce, txuleta steaks charred over coals—washed down with lightly sparkling txakoli.",
      signatureDishes: ["Bacalao al Pil-Pil", "Merluza en Salsa Verde", "Txuleta", "Marmitako"],
      keyIngredients: ["salt cod", "hake", "guindilla peppers", "txakoli wine", "beef"],
      distinctiveTraits: ["Pintxo bar-hopping culture", "Private gastronomic societies (txokos)", "Michelin-star density", "Charcoal-grill mastery"]
    },
    {
      name: "Catalonia",
      description: "Catalan cooking pairs the sea with the mountains—mar i muntanya dishes might combine chicken with prawns—and builds sauces from nuts and roasted vegetables. Staples include pa amb tomàquet (tomato-rubbed bread), romesco sauce, and calçots, the sweet spring onions charred over vine cuttings and eaten with gloved hands.",
      signatureDishes: ["Pa amb Tomàquet", "Escalivada", "Calçots amb Romesco", "Suquet de Peix", "Crema Catalana"],
      keyIngredients: ["tomatoes", "hazelnuts and almonds", "ñora peppers", "aioli", "seasonal vegetables"],
      distinctiveTraits: ["Mar i muntanya (sea-and-mountain) pairings", "Nut-thickened sauces", "Avant-garde cooking heritage", "Calçotada festivals"]
    },
    {
      name: "Galicia",
      description: "Green, rainy, and Atlantic-facing, Galicia is Spain's seafood larder. Octopus dusted with pimentón, percebes (gooseneck barnacles) pried off wave-battered rocks, scallops, and turbot define the coast, while the interior contributes empanada gallega, tetilla cheese, and brothy caldo gallego. Flavors are simpler and less spiced than in the south—the shellfish is the point.",
      signatureDishes: ["Pulpo a Feira", "Empanada Gallega", "Percebes", "Caldo Gallego", "Tarta de Santiago"],
      keyIngredients: ["octopus", "shellfish", "turnip greens (grelos)", "potatoes", "Albariño wine"],
      distinctiveTraits: ["Atlantic shellfish supremacy", "Minimal seasoning philosophy", "Celtic-influenced heartiness", "Albariño white wines"]
    },
    {
      name: "Valencia & the Levante",
      description: "The Mediterranean rice belt. Moorish irrigation turned the Albufera wetlands into paddies that feed Spain's rice canon—true paella valenciana (rabbit, chicken, snails, and beans, never chorizo), arroz a banda, and noodle-based fideuà. Citrus groves and horchaterías serving tiger-nut horchata round out the region's sunny larder.",
      signatureDishes: ["Paella Valenciana", "Arroz a Banda", "Fideuà", "Esgarraet"],
      keyIngredients: ["bomba rice", "saffron", "rabbit and chicken", "flat green beans (bajoca)", "oranges"],
      distinctiveTraits: ["Guardians of authentic paella", "Socarrat (crispy rice crust) prized", "Moorish irrigation heritage", "Horchata culture"]
    }
  ],
  popularDishes: [
    {
      name: "Paella Valenciana",
      englishName: "Valencian Paella",
      pronunciation: "pah-EH-yah bah-len-see-AH-nah",
      description: "Saffron rice cooked in a wide shallow pan with rabbit, chicken, flat green beans, and garrofó beans, prized for its socarrat—the caramelized crust on the pan bottom. The original, fiercely defended version of Spain's most famous dish.",
      category: "main",
      regionalOrigin: "Valencia",
      keyTraits: ["saffron", "bomba rice", "socarrat crust"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tortilla Española",
      englishName: "Spanish Potato Omelette",
      pronunciation: "tor-TEE-yah es-pah-NYOH-lah",
      description: "Thick omelette of slowly olive-oil-poached potatoes and onions, flipped in the pan and served warm or at room temperature. A national comfort food—every household debates runny versus set, onion versus no onion.",
      category: "main",
      keyTraits: ["eggs", "olive-oil-poached potato", "juicy center"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Gazpacho",
      englishName: "Chilled Tomato Soup",
      pronunciation: "gath-PAH-choh",
      description: "Ice-cold blended soup of ripe tomatoes, cucumber, pepper, garlic, olive oil, and sherry vinegar—Andalusia's answer to brutal summer heat, drunk from a glass as often as eaten with a spoon.",
      category: "soup",
      regionalOrigin: "Andalusia",
      keyTraits: ["raw tomato", "sherry vinegar", "served ice-cold"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Jamón Ibérico",
      englishName: "Iberian Cured Ham",
      pronunciation: "hah-MOHN ee-BEH-ree-koh",
      description: "Ham from acorn-fed Iberian pigs, dry-cured for up to four years until the fat turns silky and the flavor deeply nutty. Hand-carved into translucent slices, it is Spain's most revered delicacy.",
      category: "appetizer",
      keyTraits: ["acorn-fed pork", "long cure", "melting fat"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Patatas Bravas",
      englishName: "Fierce Potatoes",
      pronunciation: "pah-TAH-tas BRAH-bas",
      description: "Crisp fried potato chunks with a smoky, faintly spicy brava sauce and often a drizzle of aioli. One of the few Spanish dishes with any chili kick, and a fixture of every tapas crawl.",
      category: "street-food",
      regionalOrigin: "Madrid",
      keyTraits: ["fried potato", "pimentón sauce", "aioli"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pulpo a Feira",
      englishName: "Galician-Style Octopus",
      pronunciation: "POOL-poh ah FEY-rah",
      description: "Octopus boiled until tender in copper cauldrons, snipped over boiled potatoes, and dressed simply with olive oil, coarse salt, and pimentón. Traditionally served on wooden plates at Galician fairs.",
      category: "main",
      regionalOrigin: "Galicia",
      keyTraits: ["octopus", "pimentón", "minimal seasoning"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Gambas al Ajillo",
      englishName: "Garlic Shrimp",
      pronunciation: "GAHM-bas al ah-HEE-yoh",
      description: "Shrimp sizzled in an earthenware dish of olive oil loaded with sliced garlic and a dried guindilla chili, arriving still bubbling with bread for dipping in the fragrant oil.",
      category: "appetizer",
      keyTraits: ["sizzling olive oil", "garlic", "guindilla chili"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Cocido Madrileño",
      englishName: "Madrid Chickpea Stew",
      pronunciation: "koh-THEE-doh mah-dree-LEH-nyoh",
      description: "A monumental winter stew of chickpeas, cabbage, potatoes, chorizo, morcilla, and several cuts of pork and beef, served in stages: first the broth with noodles, then the vegetables, then the meats.",
      category: "main",
      regionalOrigin: "Madrid",
      keyTraits: ["chickpeas", "three courses in one pot", "slow-simmered"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Bacalao al Pil-Pil",
      englishName: "Salt Cod in Pil-Pil Sauce",
      pronunciation: "bah-kah-LAH-oh al peel-PEEL",
      description: "Basque salt cod cooked gently in olive oil with garlic, the pan swirled until the fish's own gelatin emulsifies the oil into a glossy, ivory sauce—a dish of pure technique from just four ingredients.",
      category: "main",
      regionalOrigin: "Basque Country",
      keyTraits: ["salt cod", "emulsified olive oil", "four ingredients"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Churros con Chocolate",
      englishName: "Fried Dough with Hot Chocolate",
      pronunciation: "CHOO-rohs kon choh-koh-LAH-teh",
      description: "Ridged sticks of fried dough dunked into thick, pudding-like hot chocolate—a breakfast treat, a merienda, and the traditional end to a night out in Madrid at dawn.",
      category: "dessert",
      regionalOrigin: "Madrid",
      keyTraits: ["fried dough", "thick chocolate", "breakfast-or-midnight"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Vino Tinto Rioja",
      englishName: "Rioja Red Wine",
      pronunciation: "BEE-noh TEEN-toh ree-OH-hah",
      description: "Spain's flagship red, built on Tempranillo grapes and aged in oak—classified crianza, reserva, or gran reserva by time in barrel. The default partner for jamón, lamb, and long lunches.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "La Rioja",
      servedHow: "room temperature",
      keyIngredients: ["Tempranillo grapes", "oak aging"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sangría",
      pronunciation: "san-GREE-ah",
      description: "Red wine punch with chopped citrus and stone fruit, a splash of brandy, and something bubbly, served over ice by the pitcher. Locals more often order its lighter cousin, tinto de verano.",
      type: "alcoholic",
      category: "cocktail",
      servedHow: "iced",
      keyIngredients: ["red wine", "citrus fruit", "brandy", "sweetener"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Horchata de Chufa",
      englishName: "Tiger Nut Milk",
      pronunciation: "or-CHAH-tah deh CHOO-fah",
      description: "Milky, cinnamon-scented drink pressed from tiger nuts grown around Valencia, served ice-cold in dedicated horchaterías, traditionally with spongy fartón pastries for dunking.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Valencia",
      servedHow: "iced",
      keyIngredients: ["tiger nuts (chufa)", "water", "sugar", "cinnamon"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Jerez",
      englishName: "Sherry",
      pronunciation: "heh-RETH",
      description: "Fortified wine from the Jerez triangle in Andalusia, ranging from bone-dry, saline fino and manzanilla to nutty amontillado and dark, sweet Pedro Ximénez. Bone-dry styles are the classic tapas pour.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Andalusia",
      servedHow: "cold",
      keyIngredients: ["Palomino grapes", "solera aging", "flor yeast"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Café con Leche",
      englishName: "Coffee with Milk",
      pronunciation: "kah-FEH kon LEH-cheh",
      description: "Strong espresso with an equal measure of hot milk, the standard Spanish breakfast coffee. Order a cortado for less milk, or café solo for straight espresso—but never a milky coffee after lunch.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["espresso", "hot milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
