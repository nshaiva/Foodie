import type { Country } from '../types';

export const US: Country = {
  id: "US",
  name: "United States",
  capital: "Washington, D.C.",
  continent: "North America",
  region: "North America",
  colorPalette: {
    primary: "#33475e",      // Muted slate navy (from flag)
    secondary: "#a8443e",    // Faded brick red (from flag)
    accent: "#c9973f",       // Amber wheat gold
    background: "#f7f5f0",   // Warm off-white
    text: "#263447"          // Deep blue-gray
  },
  foodCulture: {
    overview: "American food culture is an immigrant story told in casseroles, smokers, and lunch counters. Nearly every 'classic' American dish is a translation: hamburgers and hot dogs from German immigrants, pizza reinvented by Italian-Americans, gumbo born of West African, French, and Choctaw exchange in Louisiana. Rather than a single national cuisine, the United States is a federation of regional food cultures, each shaped by who settled there and what the land provided.\n\nWhat unites them is scale and informality. Portions are famously generous, eating out is routine rather than reserved for occasions, and the country's great food institutions are democratic ones—the diner, the barbecue joint, the taqueria, the drive-through. The backyard cookout and the potluck are the closest things to national dining rituals: food as an excuse to gather, with everyone bringing a dish.\n\nThe other defining thread is reinvention. Americans constantly remix their own traditions—barbecue pitmasters experimenting with new woods and rubs, chefs elevating soul food and diner classics, food trucks fusing Korean and Mexican street food. Holiday tables tell the story best: a Thanksgiving spread might hold turkey and cornbread stuffing alongside tamales, collard greens, or kimchi, depending on the family.",
    mealStructure: "Three meals a day, with dinner as the main event. Breakfast can be substantial—eggs, bacon, pancakes, biscuits—especially on weekends, when brunch becomes a social ritual. Lunch is typically quick and handheld: sandwiches, burgers, salads. Dinner is usually a single plated main with sides rather than shared courses, eaten early by global standards, often between 6 and 7 pm.",
    diningCustoms: "Fork in the right hand, knife picked up only when needed—the 'cut and switch' style. Tipping (18-20%) is an ingrained obligation, not optional. Free refills on soft drinks and coffee are expected, iced water arrives automatically, and taking leftovers home in a box is completely normal. Casual dress is acceptable almost everywhere.",
    historicalInfluences: "Native American ingredients—corn, beans, squash, turkey, maple—form the base layer. Enslaved West Africans shaped Southern cooking through rice culture, okra, and frying techniques. Successive immigration waves layered on German (burgers, frankfurters, lagers), Italian (pizza, red-sauce cooking), Mexican (the entire Southwest), Chinese, Jewish deli, and more recent Korean, Vietnamese, and Indian influences—each becoming, in time, simply 'American food.'"
  },
  cuisineProfile: {
    summary: "American cuisine is a regional patchwork united by generosity, smoke, and comfort—slow barbecue, deep-fried indulgence, and immigrant dishes remade into national icons.",
    flavorProfile: ["smoky", "sweet-savory", "buttery", "tangy (barbecue sauce)", "salty-crispy", "comfort-rich"],
    flavorIntensity: {
      heat: 3,
      acidity: 4,
      sweetness: 7,
      umami: 7,
      aromatic: 3,
      smokeEarth: 8,
      interpretation: "Comfort-forward and smoke-driven, favoring rich, sweet-savory depth over sharp heat or bright acidity."
    },
    keyIngredients: ["beef", "corn (fresh, meal, and syrup)", "wheat flour", "butter", "cheddar cheese", "bacon", "potatoes", "tomatoes"],
    cookingTechniques: ["low-and-slow smoking (barbecue)", "grilling", "deep-frying", "baking (pies, biscuits, cornbread)", "griddle cooking", "braising and stewing"],
    cookingFlow: [
      { action: "Season & rub", emoji: "🧂" },
      { action: "Sear or smoke", emoji: "🔥" },
      { action: "Cook low & slow", emoji: "⏳" },
      { action: "Sauce or glaze", emoji: "🥫" },
      { action: "Serve with sides", emoji: "🍽️" }
    ],
    spicesAndSeasonings: ["black pepper", "smoked paprika", "garlic powder", "onion powder", "cayenne", "chili powder", "brown sugar (in rubs)", "mustard", "cumin", "Old Bay", "Cajun seasoning", "ranch dressing"],
    ingredientTiers: {
      foundation: [
        { name: "Beef", emoji: "🥩", description: "Brisket to burger · Central protein · Smoked, grilled, ground" },
        { name: "Corn", emoji: "🌽", description: "Maize · Native staple · Sweet, versatile" },
        { name: "Butter", emoji: "🧈", description: "Dairy fat · Richness base · Baking & sauces" },
        { name: "Wheat Flour", emoji: "🌾", description: "All-purpose · Baking base · Biscuits, pies, breading" },
        { name: "Smoke", emoji: "💨", description: "Hickory, oak, mesquite · Flavor medium · Defines barbecue" }
      ],
      aromaticCore: [
        { name: "Black Pepper", emoji: "🫑", description: "Coarse-ground · Rub backbone · Sharp, woody" },
        { name: "Garlic", emoji: "🧄", description: "Fresh & powdered · Everyday aromatic · Savory depth" },
        { name: "Onion", emoji: "🧅", description: "Yellow onion · Base aromatic · Sweet when cooked" },
        { name: "Smoked Paprika", emoji: "🌶️", description: "Rub spice · Color & smoke · Mild, sweet" },
        { name: "Cayenne", emoji: "🔥", description: "Ground chili · Southern heat · Clean, direct" },
        { name: "Mustard", emoji: "🟡", description: "Yellow & Dijon · Tangy binder · BBQ slather" }
      ],
      flavorBuilders: [
        { name: "Bacon", emoji: "🥓", description: "Cured pork · Smoky enrichment · Salty, crisp" },
        { name: "Cheddar", emoji: "🧀", description: "Aged cow's cheese · Melting cheese · Sharp, tangy" },
        { name: "Brown Sugar", emoji: "🍯", description: "Molasses sugar · Rub & glaze sweetener · Caramel notes" },
        { name: "BBQ Sauce", emoji: "🥫", description: "Tomato-vinegar · Regional condiment · Sweet-tangy" },
        { name: "Buttermilk", emoji: "🥛", description: "Cultured milk · Fry marinade · Tangy, tenderizing" },
        { name: "Hot Sauce", emoji: "🌶️", description: "Vinegar-chili · Table condiment · Bright heat" },
        { name: "Maple Syrup", emoji: "🍁", description: "Tree sap syrup · Native sweetener · Woodsy, deep" },
        { name: "Pickles", emoji: "🥒", description: "Dill cucumber · Acid counterpoint · Crunchy, sour" },
        { name: "Ranch", emoji: "🥗", description: "Buttermilk-herb · Ubiquitous dressing · Creamy, tangy" }
      ],
      staples: [
        { name: "Potatoes", emoji: "🥔", description: "Russet · Base starch · Fried, mashed, baked" },
        { name: "Sandwich Bread", emoji: "🍞", description: "Buns & loaves · Handheld base · Soft, mild" },
        { name: "Rice", emoji: "🍚", description: "Carolina long-grain · Southern staple · Gumbo base" },
        { name: "Beans", emoji: "🫘", description: "Pinto & navy · Native legume · Chili, baked beans" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "The South",
      description: "The country's deepest food tradition, stretching from the Carolinas to Louisiana. Soul food and Southern cooking—fried chicken, greens, cornbread, biscuits—descend largely from African American cooks, while Louisiana adds the Creole and Cajun canon of gumbo, jambalaya, and étouffée. Barbecue here means pork, hospitality is a doctrine, and sweet tea flows at every meal.",
      signatureDishes: ["Fried Chicken", "Gumbo", "Shrimp and Grits", "Biscuits and Gravy", "Pulled Pork BBQ"],
      keyIngredients: ["pork", "cornmeal", "collard greens", "okra", "buttermilk", "cayenne"],
      distinctiveTraits: ["African American culinary roots", "Frying and slow-smoking mastery", "Creole/Cajun spice traditions", "Hospitality-centered dining"]
    },
    {
      name: "New England",
      description: "The Northeast coast built its cooking on the cold Atlantic: lobster, clams, cod, and oysters, treated simply with butter and cream rather than heavy spice. Colonial-era traditions persist—clam bakes on the beach, maple sugaring in spring, Thanksgiving's original larder of turkey, cranberries, and squash all come from here.",
      signatureDishes: ["Clam Chowder", "Lobster Roll", "Baked Beans", "Apple Cider Donuts"],
      keyIngredients: ["lobster", "clams", "cod", "cream", "maple syrup", "cranberries"],
      distinctiveTraits: ["Seafood-first cooking", "Cream and butter over spice", "Colonial-era traditions", "Maple sugaring culture"]
    },
    {
      name: "The Southwest",
      description: "Texas through New Mexico and Arizona, where American and Mexican foodways merged into something distinct. Tex-Mex gave the world chili con carne, fajitas, and nachos; New Mexico built an entire cuisine around its red and green chiles ('red or green?' is the official state question). Texas barbecue—salt-and-pepper beef brisket smoked over oak—is treated with near-religious seriousness.",
      signatureDishes: ["Smoked Brisket", "Chili con Carne", "Green Chile Stew", "Breakfast Tacos", "Fajitas"],
      keyIngredients: ["beef", "dried and fresh chiles", "corn tortillas", "pinto beans", "cumin", "mesquite"],
      distinctiveTraits: ["Mexican-American fusion", "Beef-centric barbecue", "Chile as identity", "Open-flame and smoke cooking"]
    },
    {
      name: "The Midwest",
      description: "The agricultural heartland, shaped by German and Scandinavian settlers, is the home of American comfort food: casseroles ('hotdish' in Minnesota), Chicago deep-dish pizza, Wisconsin cheese and bratwurst, Kansas City's sweet, sauce-lacquered barbecue. County fairs and tailgates—grilling in stadium parking lots—are its great culinary festivals.",
      signatureDishes: ["Deep-Dish Pizza", "Kansas City Ribs", "Hotdish", "Bratwurst", "Juicy Lucy"],
      keyIngredients: ["cheese", "beef and pork", "corn", "butter", "wheat", "wild rice"],
      distinctiveTraits: ["German and Scandinavian heritage", "Casserole and potluck culture", "Dairy abundance", "Tailgate grilling"]
    },
    {
      name: "The West Coast",
      description: "California and the Pacific Northwest drive America's fresh, produce-forward cooking. California birthed farm-to-table dining, avocado everything, fish tacos, and the artisanal burger; the Northwest contributes salmon, foraged mushrooms, berries, and the craft coffee and microbrew movements. Strong Asian and Mexican communities make this the most fusion-fluent region.",
      signatureDishes: ["Fish Tacos", "Cedar-Plank Salmon", "California Roll", "Cobb Salad", "Sourdough Bread"],
      keyIngredients: ["avocado", "salmon", "sourdough", "fresh produce", "Dungeness crab", "hazelnuts"],
      distinctiveTraits: ["Farm-to-table ethos", "Asian and Latin fusion", "Seasonal, produce-driven menus", "Craft coffee and beer culture"]
    }
  ],
  popularDishes: [
    {
      name: "Cheeseburger",
      pronunciation: "cheez-bur-ger",
      description: "A griddled or flame-grilled beef patty with melted cheese on a soft bun, dressed with lettuce, tomato, onion, and pickles. The definitive American dish, born at early-1900s lunch counters and endlessly reinvented since.",
      category: "main",
      keyTraits: ["griddled beef", "melted cheese", "handheld"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Smoked Brisket",
      englishName: "Texas-Style Barbecue Brisket",
      pronunciation: "briss-kit",
      description: "Whole beef brisket rubbed with salt and coarse black pepper, smoked over post oak for 10-14 hours until it develops a dark bark and melting tenderness. Served by the pound on butcher paper with pickles and white bread.",
      category: "main",
      regionalOrigin: "Central Texas",
      keyTraits: ["oak smoke", "salt & pepper rub", "low and slow"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Southern Fried Chicken",
      pronunciation: "fryd chik-en",
      description: "Chicken soaked in seasoned buttermilk, dredged in flour, and fried until deeply golden and crackling-crisp while staying juicy inside. A cornerstone of Southern and soul food cooking, perfected by generations of African American cooks.",
      category: "main",
      regionalOrigin: "The South",
      keyTraits: ["buttermilk brine", "crispy crust", "deep-fried"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Gumbo",
      pronunciation: "gum-boh",
      description: "Louisiana's signature stew: a dark roux simmered with the 'holy trinity' of onion, celery, and bell pepper, plus andouille sausage, chicken, or shrimp, served over rice. A living record of West African, French, and Choctaw exchange.",
      category: "soup",
      regionalOrigin: "Louisiana",
      keyTraits: ["dark roux", "holy trinity", "andouille"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "New England Clam Chowder",
      pronunciation: "klam chow-der",
      description: "Thick, cream-based soup of chopped clams, potatoes, onion, and salt pork, often served in a sourdough bread bowl or with oyster crackers. A New England institution since colonial times.",
      category: "soup",
      regionalOrigin: "New England",
      keyTraits: ["creamy", "clams", "salt pork"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Buffalo Wings",
      pronunciation: "buff-a-loh wingz",
      description: "Deep-fried chicken wings tossed in a butter and cayenne-vinegar hot sauce, served with celery sticks and blue cheese dressing. Invented at the Anchor Bar in Buffalo, New York in 1964; now the national dish of game day.",
      category: "appetizer",
      regionalOrigin: "Buffalo, New York",
      keyTraits: ["cayenne-butter sauce", "crispy", "blue cheese"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "easy",
      dietary: { isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Mac and Cheese",
      englishName: "Macaroni and Cheese",
      pronunciation: "mak an cheez",
      description: "Elbow macaroni baked in a sharp cheddar cream sauce until bubbling, often with a crisp golden top. Equally at home as a soul food side, a Thanksgiving essential, and a childhood staple.",
      category: "side",
      keyTraits: ["sharp cheddar", "baked", "creamy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Chili con Carne",
      pronunciation: "chill-ee kon kar-nay",
      description: "A slow-simmered stew of beef and dried red chiles—purists in Texas insist on no beans—topped with cheese, onions, and sour cream. Born in San Antonio's plazas and now the centerpiece of cook-off competitions nationwide.",
      category: "main",
      regionalOrigin: "Texas",
      keyTraits: ["dried chiles", "slow-simmered", "cumin"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Biscuits and Gravy",
      pronunciation: "biss-kits an gray-vee",
      description: "Tall, flaky buttermilk biscuits smothered in a peppery cream gravy studded with breakfast sausage. A Southern breakfast ritual that migrated to diners across the country.",
      category: "breakfast",
      regionalOrigin: "The South",
      keyTraits: ["flaky biscuits", "sausage gravy", "black pepper"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Apple Pie",
      pronunciation: "ap-el py",
      description: "Spiced apples baked in a flaky double butter crust, served warm, classically with a scoop of vanilla ice cream ('à la mode'). So central to national identity that 'as American as apple pie' is a proverb.",
      category: "dessert",
      keyTraits: ["flaky crust", "cinnamon", "baked apples"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Sweet Tea",
      pronunciation: "sweet tee",
      description: "Black tea brewed strong, sweetened generously while hot, and served over ice—the 'house wine of the South,' poured by the pitcher at barbecues and Sunday dinners.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "The South",
      servedHow: "iced",
      keyIngredients: ["black tea", "sugar", "ice", "lemon"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Root Beer",
      pronunciation: "root beer",
      description: "Sweet, creamy sassafras-flavored soda with vanilla and wintergreen notes, a 19th-century pharmacy invention. Best experienced as a root beer float, poured over vanilla ice cream.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["sassafras flavor", "vanilla", "wintergreen", "carbonated water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bourbon",
      pronunciation: "bur-bun",
      description: "America's native whiskey: distilled from at least 51% corn and aged in new charred oak barrels, giving caramel, vanilla, and oak notes. Kentucky produces about 95% of it; sipped neat or in an Old Fashioned or mint julep.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Kentucky",
      servedHow: "room temperature",
      keyIngredients: ["corn", "rye or wheat", "malted barley", "charred oak"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "American IPA",
      englishName: "India Pale Ale",
      pronunciation: "eye-pee-ay",
      description: "The flagship style of the American craft beer revolution—assertively bitter and bursting with citrus and pine from American hops. Thousands of microbreweries have made it the country's defining beer.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "West Coast",
      servedHow: "cold",
      keyIngredients: ["American hops", "barley malt", "yeast"],
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Apple Cider",
      pronunciation: "ap-el sy-der",
      description: "Unfiltered, freshly pressed apple juice, cloudy and tart-sweet, sold at fall orchards and farm stands—often mulled hot with cinnamon and cloves. The hard (fermented) version was colonial America's everyday drink.",
      type: "both",
      category: "juice",
      regionalOrigin: "New England",
      servedHow: "cold",
      keyIngredients: ["pressed apples", "cinnamon", "cloves"],
      isTraditional: true,
      alcoholContent: "none",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
