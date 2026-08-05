import type { Country } from '../types';

export const JM: Country = {
  id: "JM",
  name: "Jamaica",
  capital: "Kingston",
  continent: "North America",
  region: "Caribbean",
  colorPalette: {
    primary: "#2f5d3e",      // Muted forest green (from flag)
    secondary: "#b3903a",    // Muted antique gold (from flag)
    accent: "#b5543b",       // Warm scotch bonnet terracotta
    background: "#f7f5ee",   // Warm ivory
    text: "#22382a"          // Deep green-charcoal
  },
  foodCulture: {
    overview: "Jamaican food is the edible record of the island's history—a cuisine forged by Taíno smoking techniques, West African one-pot cooking, and waves of British, Indian, and Chinese arrivals, all filtered through the island's motto: 'Out of Many, One People.' Nothing captures this better than jerk, born when Maroons—escaped enslaved Africans hiding in the Blue Mountains—slow-smoked wild hog over green pimento wood, seasoning it with scotch bonnet and allspice so the smoke wouldn't betray their camps.\n\nEating in Jamaica is anchored in the yard and the roadside. A proper Sunday dinner—rice and peas, a stewed or roasted meat, fried plantain—is a near-sacred family institution, while weekday eating leans on cookshops, jerk pans welded from oil drums, and vendors selling patties, roast yam, and pepper shrimp along the highway. Soup on Saturday is such a fixture that many households simply call the day 'soup day.'\n\nThe Rastafari movement added its own thread: Ital cooking, a plant-forward, often salt-free philosophy built on ground provisions, coconut milk, and fresh herbs. Even for non-Rastafarians, Ital stews and fresh juices are part of the everyday landscape, giving Jamaica one of the Caribbean's strongest traditions of intentional vegetarian cooking.",
    mealStructure: "Breakfast is substantial and savory—ackee and saltfish, callaloo, or mackerel rundown with boiled 'food' (green banana, yam, dumplings). Lunch is often a patty with coco bread or a cookshop plate. Dinner centers on one seasoned meat or fish with rice and peas or ground provisions; Saturday means soup, Sunday means the big family dinner.",
    diningCustoms: "Meat is seasoned hours or a day ahead—marinating with green seasoning is non-negotiable. Roadside jerk is eaten straight from the foil with hard dough bread or festival. Sharing food with visitors is a point of pride, and portions err on the generous side; refusing a plate can read as rude.",
    historicalInfluences: "Taíno people contributed barbacoa smoking and native ingredients like cassava; West Africans brought one-pot stews, ackee, and callaloo; the British left patties, escovitch's vinegar pickling (via Spanish escabeche), and salted cod from the colonial trade; Indian indentured workers introduced curry, transforming goat into a national celebration dish; Chinese immigrants added soy sauce and stir-fry to brown stew's DNA."
  },
  cuisineProfile: {
    summary: "Jamaican cuisine layers deep, slow-built seasoning—scallion, thyme, allspice, and fiery scotch bonnet—over smoke, stew, and coconut, producing food that is intensely savory, aromatic, and unapologetically hot.",
    flavorProfile: ["fiery (scotch bonnet)", "smoky (pimento wood)", "herbaceous (thyme & scallion)", "warm-spiced (allspice/pimento)", "coconut-rich", "tangy (escovitch vinegar)"],
    flavorIntensity: {
      heat: 9,
      acidity: 4,
      sweetness: 5,
      umami: 6,
      aromatic: 8,
      smokeEarth: 8,
      interpretation: "Serious scotch bonnet heat rides on pimento-wood smoke and deep herb seasoning, with sweetness and acid playing supporting roles rather than leads."
    },
    keyIngredients: ["scotch bonnet pepper", "allspice (pimento)", "scallion (escallion)", "fresh thyme", "coconut milk", "saltfish (salted cod)", "ackee", "green banana", "yam", "rice and gungo/kidney peas"],
    cookingTechniques: ["jerking (slow-smoking over pimento wood)", "browning (caramelizing meat in burnt sugar)", "stewing and 'curry-ing' down", "escovitch pickling", "rundown (reducing coconut milk to a custard)", "frying (festival, plantain, fish)"],
    cookingFlow: [
      { action: "Season overnight", emoji: "🧄" },
      { action: "Brown the meat", emoji: "🍖" },
      { action: "Stew down", emoji: "🥘" },
      { action: "Add coconut milk", emoji: "🥥" },
      { action: "Simmer low", emoji: "🔥" },
      { action: "Serve with rice & peas", emoji: "🍚" }
    ],
    spicesAndSeasonings: ["scotch bonnet pepper", "allspice berries (pimento)", "fresh thyme", "scallion", "garlic", "ginger", "Jamaican curry powder (turmeric-heavy)", "pimento wood and leaves", "browning (caramel)", "nutmeg", "cinnamon", "all-purpose 'green seasoning'"],
    ingredientTiers: {
      foundation: [
        { name: "Scotch Bonnet", emoji: "🌶️", description: "Bonney pepper · Heat source · Fruity, floral, very hot" },
        { name: "Allspice", emoji: "🫘", description: "Pimento · Signature spice · Clove-nutmeg-pepper in one berry" },
        { name: "Scallion", emoji: "🧅", description: "Escallion · Seasoning base · Grassy, oniony backbone" },
        { name: "Thyme", emoji: "🌿", description: "Fresh sprigs · Seasoning herb · Woodsy, ever-present" },
        { name: "Coconut Milk", emoji: "🥥", description: "Fresh-pressed · Stew & rice base · Rich, sweet-savory" }
      ],
      aromaticCore: [
        { name: "Garlic", emoji: "🧄", description: "Green seasoning core · Aromatic · Pungent depth" },
        { name: "Ginger", emoji: "🫚", description: "Jamaican ginger · Aromatic · Sharp, peppery, prized worldwide" },
        { name: "Pimento Wood", emoji: "🪵", description: "Allspice tree wood · Smoking fuel · Defines true jerk smoke" },
        { name: "Curry Powder", emoji: "🟡", description: "Jamaican blend · Spice mix · Turmeric-forward, allspice-tinged" },
        { name: "Browning", emoji: "🍮", description: "Burnt sugar caramel · Color & flavor · Bittersweet depth" },
        { name: "Nutmeg", emoji: "🌰", description: "Grated fresh · Warm spice · Sweet dishes & porridges" }
      ],
      flavorBuilders: [
        { name: "Saltfish", emoji: "🐟", description: "Salted cod · Salty protein · Flaky, umami-dense" },
        { name: "Ackee", emoji: "🍈", description: "National fruit · Savory fruit · Buttery, scrambled-egg texture" },
        { name: "Callaloo", emoji: "🥬", description: "Amaranth greens · Leafy green · Earthy, spinach-like" },
        { name: "Gungo Peas", emoji: "🫛", description: "Pigeon peas · Legume · Nutty, Christmas rice-and-peas star" },
        { name: "Kidney Beans", emoji: "🫘", description: "Red peas · Legume · Everyday rice-and-peas partner" },
        { name: "Tamarind", emoji: "🟤", description: "Tambran · Souring agent · Tart, used in sauces & sweets" },
        { name: "Lime", emoji: "🍋", description: "Sour orange kin · Acid & wash · Cleans meat, brightens fish" },
        { name: "Annatto", emoji: "🔴", description: "Roucou · Coloring spice · Earthy orange hue" },
        { name: "Soy Sauce", emoji: "🫗", description: "Chinese legacy · Umami seasoning · Deepens brown stew" }
      ],
      staples: [
        { name: "Rice", emoji: "🍚", description: "Long grain · Base starch · Canvas for rice and peas" },
        { name: "Yellow Yam", emoji: "🍠", description: "Ground provision · Starchy tuber · Dense, earthy" },
        { name: "Green Banana", emoji: "🍌", description: "Boiled 'food' · Starchy staple · Firm, neutral" },
        { name: "Plantain", emoji: "🍌", description: "Fried ripe · Sweet side · Caramelized edges" },
        { name: "Hard Dough Bread", emoji: "🍞", description: "Hardo bread · Dense loaf · Slightly sweet, jerk's companion" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Kingston & St. Andrew",
      description: "The capital region is Jamaica's melting pot on a plate—downtown cookshops, Chinese-Jamaican restaurants, Indian-influenced curry houses, and the patty empires of Juici and Tastee all within blocks of each other. Kingston is where Sunday dinner culture, Ital vegan spots, and late-night jerk pans coexist, and where oxtail and curry goat reached national-dish status.",
      signatureDishes: ["Beef Patty with Coco Bread", "Oxtail with Broad Beans", "Curry Goat", "Mannish Water"],
      keyIngredients: ["oxtail", "goat", "curry powder", "butter beans", "coco bread"],
      distinctiveTraits: ["Urban cookshop culture", "Chinese and Indian influence strongest", "Patty capital", "Ital restaurants"]
    },
    {
      name: "Portland",
      description: "The lush northeast parish is the birthplace of jerk. Boston Bay's smoky roadside pits still cook pork and chicken low and slow over pimento wood the way the Maroons did, and the surrounding rainforest supplies breadfruit, ackee, and river shrimp. Portland cooking is rustic, smoke-driven, and closer to the cuisine's Maroon roots than anywhere else on the island.",
      signatureDishes: ["Boston Bay Jerk Pork", "Jerk Chicken", "Roast Breadfruit", "Janga Soup (river shrimp)"],
      keyIngredients: ["pimento wood", "scotch bonnet", "allspice", "breadfruit", "river shrimp (janga)"],
      distinctiveTraits: ["Birthplace of jerk", "Maroon heritage", "Pit-smoking over pimento wood", "Rainforest produce"]
    },
    {
      name: "Western Jamaica",
      description: "Montego Bay and Negril anchor the tourist coast, where the cuisine leans hard into the sea: escovitch snapper fried whole and buried under pickled vegetables, steamed fish with okra and crackers, grilled lobster shacks on Seven Mile Beach. Resort influence has polished presentation, but the fishing-village backbone—fresh catch, lime, scotch bonnet—remains.",
      signatureDishes: ["Escovitch Fish", "Steamed Fish with Okra", "Grilled Lobster", "Conch Soup"],
      keyIngredients: ["red snapper", "lobster", "conch", "okra", "vinegar pickle", "lime"],
      distinctiveTraits: ["Seafood-first", "Escovitch pickling tradition", "Beachside grill shacks", "Tourist-refined plates"]
    },
    {
      name: "South Coast (St. Elizabeth)",
      description: "Jamaica's breadbasket—the red-dirt farmland of St. Elizabeth grows the island's onions, tomatoes, and melons, while Middle Quarters is famous for women selling bags of peppered river shrimp at the roadside. Nearby, the Appleton Estate has distilled rum in the Nassau Valley since 1749. Food here is farm-driven, peppery, and proudly unfussy.",
      signatureDishes: ["Middle Quarters Pepper Shrimp", "Bammy with Fried Fish", "Pumpkin Soup", "Curried Conch"],
      keyIngredients: ["river shrimp", "cassava (for bammy)", "pumpkin", "tomatoes", "sugarcane"],
      distinctiveTraits: ["Island's breadbasket", "Roadside pepper shrimp", "Rum country (Appleton)", "Cassava bammy tradition"]
    }
  ],
  popularDishes: [
    {
      name: "Ackee and Saltfish",
      pronunciation: "AH-kee an SALT-fish",
      description: "Jamaica's national dish: buttery ackee fruit sautéed with flaked salted cod, scallion, thyme, tomato, and scotch bonnet. Looks like scrambled eggs, tastes like the island. Served with fried dumplings, boiled green banana, or breadfruit.",
      category: "breakfast",
      keyTraits: ["ackee", "saltfish", "sautéed"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Jerk Chicken",
      pronunciation: "jurk CHIK-in",
      description: "Chicken marinated in a fierce paste of scotch bonnet, allspice, scallion, thyme, and ginger, then slow-smoked over pimento wood until charred outside and juicy within. Eaten with hard dough bread, festival, and a shake of spicy vinegar sauce.",
      category: "main",
      regionalOrigin: "Portland (Boston Bay)",
      keyTraits: ["pimento smoke", "scotch bonnet", "allspice"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "very-hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Curry Goat",
      pronunciation: "KUH-ree goat",
      description: "Bone-in goat stewed low and slow in turmeric-heavy Jamaican curry powder with scotch bonnet, allspice, and potato until the meat falls apart. The centerpiece of weddings, funerals, and every big celebration, always over white rice or rice and peas.",
      category: "main",
      keyTraits: ["Jamaican curry", "slow-stewed", "bone-in goat"],
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Oxtail with Broad Beans",
      pronunciation: "OX-tail",
      description: "Oxtail browned in caramelized sugar, then braised for hours with butter (broad) beans, allspice, and thyme into a sticky, deeply savory gravy. A cookshop classic that commands the highest price on the menu—and sells out first.",
      category: "main",
      keyTraits: ["browning", "braised", "butter beans"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Escovitch Fish",
      pronunciation: "es-koh-VEECH",
      description: "Whole red snapper fried crisp, then doused in a hot vinegar pickle of scotch bonnet, onion, carrot, and allspice. The tangy pickle soaks into the crackling skin. An Easter essential, descended from Spanish escabeche via Sephardic settlers.",
      category: "main",
      regionalOrigin: "Western Jamaica",
      keyTraits: ["fried whole fish", "vinegar pickle", "scotch bonnet"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Jamaican Beef Patty",
      pronunciation: "juh-MAY-kan PAT-ee",
      description: "Flaky, turmeric-gold pastry folded around peppery spiced ground beef. The island's definitive grab-and-go lunch, elevated to legend when tucked inside a slightly sweet coco bread—carbs on carbs, no apologies.",
      category: "street-food",
      regionalOrigin: "Kingston & St. Andrew",
      keyTraits: ["flaky pastry", "spiced beef", "turmeric crust"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Rice and Peas",
      pronunciation: "rice an peez",
      description: "Rice simmered in coconut milk with kidney beans (or gungo peas at Christmas), scallion, thyme, and a whole scotch bonnet floated on top for aroma, not fire. The mandatory Sunday-dinner side—Jamaicans call it the 'coat of arms.'",
      category: "side",
      keyTraits: ["coconut milk", "kidney beans", "thyme"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Brown Stew Chicken",
      pronunciation: "brown styoo CHIK-in",
      description: "Chicken seasoned overnight, browned in burnt-sugar caramel, then stewed with ketchup, soy sauce, carrot, and pimento into a glossy red-brown gravy. The everyday dinner that shows Jamaica's African browning technique and Chinese pantry side by side.",
      category: "main",
      keyTraits: ["browning", "sweet-savory gravy", "stewed"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Callaloo",
      pronunciation: "kal-ah-LOO",
      description: "Amaranth greens steamed down with scallion, thyme, tomato, and scotch bonnet, often finished with coconut milk. A breakfast staple beside boiled dumplings and a cornerstone of Ital cooking.",
      category: "breakfast",
      keyTraits: ["steamed greens", "thyme", "Ital-friendly"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Festival",
      pronunciation: "FES-tih-val",
      description: "Sweet fried dumplings of cornmeal and flour, shaped like fat fingers and fried until golden with a crackly crust. The traditional partner to jerk and fried fish—its gentle sweetness tames the scotch bonnet burn.",
      category: "side",
      regionalOrigin: "Portland (jerk stands)",
      keyTraits: ["cornmeal", "fried", "lightly sweet"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Sorrel",
      englishName: "Hibiscus Drink",
      pronunciation: "SOR-rel",
      description: "Deep crimson drink of dried roselle (hibiscus) petals steeped with fresh ginger, allspice, and orange peel, sweetened and chilled—often spiked with white rum. The taste of a Jamaican Christmas.",
      type: "both",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["dried sorrel (roselle)", "ginger", "allspice", "sugar", "optional white rum"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Blue Mountain Coffee",
      pronunciation: "bloo MOWN-tin KOF-ee",
      description: "One of the world's most prized coffees, grown in cool mist above 3,000 feet in the Blue Mountains. Mild, sweet, and famously free of bitterness—protected by certification and mostly exported, so a cup at source is a pilgrimage.",
      type: "non-alcoholic",
      category: "coffee",
      regionalOrigin: "Blue Mountains (Portland/St. Andrew)",
      servedHow: "hot",
      keyIngredients: ["arabica coffee beans"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Wray & Nephew White Overproof",
      englishName: "White Overproof Rum",
      pronunciation: "ray an NEF-yoo",
      description: "The island's ubiquitous 63% white rum—funky, grassy, and fierce. Mixed with Ting, splashed in sorrel, poured at wakes and christenings alike; Jamaicans say no house is complete without a bottle.",
      type: "alcoholic",
      category: "spirit",
      servedHow: "room temperature",
      keyIngredients: ["sugarcane molasses"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Red Stripe",
      pronunciation: "red stripe",
      description: "Jamaica's iconic lager since 1928, served ice-cold in its stubby bottle. Crisp and easy—the default companion to jerk chicken and beach cricket.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "Kingston",
      servedHow: "cold",
      keyIngredients: ["barley malt", "cassava starch", "hops"],
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Peanut Punch",
      pronunciation: "PEE-nut punch",
      description: "Thick, creamy blend of peanuts, condensed milk, oats, nutmeg, and vanilla—sold cold from roadside coolers and prized as a strength-builder. Some vendors add stout or a shot of rum.",
      type: "both",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["peanuts", "condensed milk", "nutmeg", "oats", "vanilla"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true }
    }
  ]
};
