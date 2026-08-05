import type { Country } from '../types';

export const TR: Country = {
  id: "TR",
  name: "Turkey",
  capital: "Ankara",
  continent: "Asia",
  region: "Western Asia / Anatolia",
  colorPalette: {
    primary: "#a63a3a",      // Muted brick red (from flag)
    secondary: "#3d6b7d",    // Bosphorus teal-blue
    accent: "#c9a15c",       // Copper-brass gold (cezve, trays)
    background: "#faf6f0",   // Warm ivory
    text: "#4a2e2a"          // Deep coffee brown
  },
  foodCulture: {
    overview: "Turkish cuisine sits at the literal crossroads of empires, and it eats like it. Anatolia has been farmed for ten thousand years, and the Ottoman palace kitchens at Topkapı—where hundreds of cooks specialized in single categories like soups, pilafs, or halva—codified a repertoire that still shapes how Turks cook today. This is a cuisine of abundance and hospitality: refusing food at a Turkish table is nearly impossible, because offering it is a matter of honor.\n\nThe rhythm of Turkish eating is unhurried and social. A proper meal unfolds through mezes—small plates of stuffed vine leaves, smoky eggplant, white cheese, and glistening olive-oil vegetables—long before any main course appears. Bread is sacred, never wasted, and present at every meal, whether it's a puffed pide from a wood oven or a crackling simit from a street cart. Tea, served in tulip-shaped glasses, punctuates the entire day; Turks drink more tea per capita than anyone on earth.\n\nWhat makes the cuisine remarkable is its range. The same country produces delicate olive-oil vegetable dishes on the Aegean coast, anchovy cookery in the Black Sea mists, fiery kebabs and baklava in Gaziantep, and hearty grain-and-yogurt cooking on the Anatolian steppe. Yogurt itself is a Turkish word and a Turkish obsession—spooned over kebabs, whisked into hot soups, diluted into the salty drink ayran.",
    mealStructure: "Breakfast (kahvaltı, literally 'before coffee') is a spread in its own right: cheeses, olives, tomatoes, cucumbers, honey with kaymak cream, eggs with sucuk sausage, and endless tea. Lunch is often a single hot dish from a tradesmen's restaurant (esnaf lokantası)—stews, beans, pilaf. Dinner is the main family meal: soup, a main dish, salad, and bread, with mezes and rakı on more festive evenings.",
    diningCustoms: "Hospitality is near-ceremonial: guests are served first and urged to eat more ('buyrun!'). Bread accompanies everything and is treated with respect—never thrown away. Meals end with tea or Turkish coffee, and reading the coffee grounds left in the cup is a beloved social ritual. During Ramadan, the iftar meal traditionally opens with dates, olives, and lentil soup.",
    historicalInfluences: "Ottoman palace kitchens synthesized Central Asian nomadic traditions (yogurt, grilled meats, manti dumplings), Persian refinement (pilafs, fruit-and-meat pairings), Arab and Levantine cooking (kebabs, sweets soaked in syrup), and Byzantine-Mediterranean foundations (olive oil, seafood, vegetables). The Silk Road and spice trade routes ran directly through Anatolia, while sephardic Jewish, Armenian, and Greek communities each left lasting marks on Istanbul's table."
  },
  cuisineProfile: {
    summary: "Turkish cuisine layers charcoal-grilled meats, silken vegetable dishes cooked in olive oil, tangy yogurt, and sweet-savory Ottoman refinement over an ancient foundation of bread, bulgur, and legumes.",
    flavorProfile: ["smoky (mangal char)", "tangy (yogurt & lemon)", "savory (etli)", "herbal (mint, parsley, dill)", "pepper-forward (pul biber)", "syrup-sweet desserts (şerbetli)"],
    flavorIntensity: {
      heat: 4,
      acidity: 6,
      sweetness: 5,
      umami: 7,
      aromatic: 6,
      smokeEarth: 8,
      interpretation: "Char-grilled smokiness and deep savory richness lead, brightened by yogurt tang and lemon, with heat kept moderate outside the fiery southeast."
    },
    keyIngredients: ["lamb", "yogurt", "eggplant", "bulgur", "olive oil", "tomatoes and pepper paste", "white cheese (beyaz peynir)", "flatbreads (pide, lavaş)"],
    cookingTechniques: ["charcoal grilling (mangal)", "wood-fired oven baking (pide & bread)", "slow braising in clay (güveç)", "stuffing vegetables and leaves (dolma & sarma)", "olive-oil poaching of vegetables (zeytinyağlı)", "hand-rolling ultra-thin dough (yufka)"],
    cookingFlow: [
      { action: "Melt butter & paste", emoji: "🧈" },
      { action: "Sauté onion", emoji: "🧅" },
      { action: "Add tomato & pepper", emoji: "🍅" },
      { action: "Braise slowly", emoji: "🥘" },
      { action: "Grill over coals", emoji: "🔥" },
      { action: "Finish with yogurt", emoji: "🥣" }
    ],
    spicesAndSeasonings: ["pul biber (Aleppo-style pepper flakes)", "sumac", "dried mint", "cumin", "isot (Urfa pepper)", "oregano", "black pepper", "cinnamon", "allspice", "nigella seeds", "mahleb", "dill", "flat-leaf parsley"],
    ingredientTiers: {
      foundation: [
        { name: "Yogurt", emoji: "🥣", description: "Yoğurt · Dairy backbone · Tangy, cooling" },
        { name: "Olive Oil", emoji: "🫒", description: "Zeytinyağı · Cooking fat · Fruity, Aegean" },
        { name: "Tomato & Pepper Paste", emoji: "🍅", description: "Salça · Flavor base · Concentrated, sweet-savory" },
        { name: "Eggplant", emoji: "🍆", description: "Patlıcan · Signature vegetable · Smoky when charred" },
        { name: "Lamb", emoji: "🥩", description: "Kuzu · Primary meat · Rich, grill-loving" }
      ],
      aromaticCore: [
        { name: "Pul Biber", emoji: "🌶️", description: "Aleppo pepper · Chili flake · Fruity, mild heat" },
        { name: "Sumac", emoji: "🟥", description: "Sumak · Souring spice · Lemony, tart" },
        { name: "Dried Mint", emoji: "🌿", description: "Nane · Herb · Cooling, earthy" },
        { name: "Cumin", emoji: "🟤", description: "Kimyon · Warm spice · Earthy, meaty" },
        { name: "Isot Pepper", emoji: "🟣", description: "Urfa biber · Dark chili · Smoky, raisin-like" },
        { name: "Parsley", emoji: "🌱", description: "Maydanoz · Fresh herb · Grassy, everywhere" }
      ],
      flavorBuilders: [
        { name: "Onion", emoji: "🧅", description: "Soğan · Aromatic base · Sweet when slow-cooked" },
        { name: "Garlic", emoji: "🧄", description: "Sarımsak · Aromatic · Pungent, yogurt's partner" },
        { name: "Lemon", emoji: "🍋", description: "Limon · Acid · Bright, squeezed over everything" },
        { name: "Butter", emoji: "🧈", description: "Tereyağı · Finishing fat · Rich, often spiced" },
        { name: "Pomegranate Molasses", emoji: "🍒", description: "Nar ekşisi · Souring syrup · Sweet-tart depth" },
        { name: "Walnuts", emoji: "🥜", description: "Ceviz · Nut · Rich, in sauces & sweets" },
        { name: "Pistachios", emoji: "💚", description: "Antep fıstığı · Prized nut · Buttery, baklava's soul" },
        { name: "White Cheese", emoji: "🧀", description: "Beyaz peynir · Brined cheese · Salty, feta-like" },
        { name: "Dill", emoji: "🌿", description: "Dereotu · Fresh herb · Anise-grassy, in olive-oil dishes" }
      ],
      staples: [
        { name: "Bread", emoji: "🍞", description: "Ekmek & pide · Daily staple · Sacred, ever-present" },
        { name: "Bulgur", emoji: "🌾", description: "Cracked wheat · Grain · Nutty, Anatolian workhorse" },
        { name: "Rice", emoji: "🍚", description: "Pirinç · Pilaf grain · Buttery, often with orzo" },
        { name: "Chickpeas & Lentils", emoji: "🫘", description: "Nohut & mercimek · Legumes · Soups and stews" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Marmara & Istanbul",
      description: "Istanbul inherited the Ottoman palace kitchen, and its cuisine is the empire's greatest-hits collection: refined mezes, seafood along the Bosphorus, street icons like simit and fish sandwiches, and the sephardic, Greek, and Armenian legacies of a cosmopolitan port. The Marmara region around it supplies famous köfte (Inegöl, Tekirdağ) and Bursa's İskender kebab.",
      signatureDishes: ["İskender Kebab", "Balık Ekmek (fish sandwich)", "Midye Dolma (stuffed mussels)", "Hünkar Beğendi"],
      keyIngredients: ["bluefish and bonito", "butter", "eggplant", "sheep's cheese", "sesame-crusted simit"],
      distinctiveTraits: ["Ottoman palace refinement", "Bosphorus seafood", "Street-food capital", "Multicultural legacy"]
    },
    {
      name: "Aegean Coast",
      description: "Turkey's Mediterranean-facing west eats the lightest: vegetables and wild greens gently cooked in olive oil and served at room temperature, seafood grilled simply, herbs used by the handful. Izmir and the olive-growing coast share deep culinary roots with Greek island cooking, and rakı with mezes is the region's signature evening.",
      signatureDishes: ["Zeytinyağlı Enginar (artichokes in olive oil)", "İzmir Köfte", "Kumru sandwich", "stuffed zucchini blossoms"],
      keyIngredients: ["olive oil", "artichokes", "wild greens (ot)", "fresh herbs", "sea bass and bream"],
      distinctiveTraits: ["Olive-oil (zeytinyağlı) dishes", "Vegetable-forward", "Room-temperature mezes", "Aegean-Greek kinship"]
    },
    {
      name: "Black Sea (Karadeniz)",
      description: "The lush, rainy north is a world apart: cornbread instead of wheat, tiny anchovies (hamsi) cooked a hundred ways, collard greens, and molten cheese-and-cornmeal dishes suited to mountain weather. This is also Turkey's tea garden—nearly all Turkish tea grows on the hills around Rize.",
      signatureDishes: ["Hamsi Tava (fried anchovies)", "Kuymak (mıhlama)", "Karalahana Çorbası (collard soup)", "Laz Böreği"],
      keyIngredients: ["hamsi (anchovies)", "cornmeal", "collard greens", "local butter and cheese", "hazelnuts"],
      distinctiveTraits: ["Anchovy obsession", "Corn-based cooking", "Mountain dairy richness", "Hazelnut heartland"]
    },
    {
      name: "Central Anatolia",
      description: "The steppe heartland cooks for cold winters and long distances: bulgur pilafs, lamb slow-cooked in clay or pit ovens, tiny hand-folded mantı dumplings under garlic yogurt, and preserved foods like pastırma. Konya keeps Seljuk-era traditions like etli ekmek, while Cappadocia is known for its pottery-kebab and old volcanic-soil vineyards.",
      signatureDishes: ["Mantı (Kayseri)", "Testi Kebabı (pottery kebab)", "Etli Ekmek", "Pastırma"],
      keyIngredients: ["bulgur", "lamb and mutton", "yogurt", "dried legumes", "air-cured beef (pastırma)"],
      distinctiveTraits: ["Dumpling and dough craft", "Clay-pot and pit cooking", "Preservation traditions", "Hearty steppe portions"]
    },
    {
      name: "Southeastern Anatolia",
      description: "Gaziantep, Şanlıurfa, and Mardin form Turkey's most intense food region, sharing a border and a palate with Aleppo. This is kebab country—dozens of named skewers—and the spiritual home of baklava, made with local pistachios and clarified butter. Heat from isot and pul biber, sourness from pomegranate molasses, and lavish use of nuts define the style. Gaziantep is a UNESCO City of Gastronomy.",
      signatureDishes: ["Antep Baklava", "Çiğ Köfte", "Ali Nazik", "Urfa & Adana Kebab", "Lahmacun"],
      keyIngredients: ["pistachios", "isot (Urfa pepper)", "pomegranate molasses", "bulgur", "lamb tail fat"],
      distinctiveTraits: ["Hottest, boldest flavors", "Baklava's birthplace", "Kebab mastery", "Levantine-Arab influence"]
    }
  ],
  popularDishes: [
    {
      name: "İskender Kebab",
      englishName: "Iskender Kebab",
      pronunciation: "iss-ken-dair keh-bahb",
      description: "Thin slices of döner laid over cubes of pide bread, doused with tomato sauce and sizzling browned butter, served with a scoop of yogurt. Invented in Bursa in the 1860s by İskender Efendi.",
      category: "main",
      regionalOrigin: "Bursa (Marmara)",
      keyTraits: ["döner meat", "browned butter", "yogurt"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true, isNutFree: true }
    },
    {
      name: "Mantı",
      englishName: "Turkish Dumplings",
      pronunciation: "mahn-tuh",
      description: "Tiny hand-folded dumplings filled with spiced lamb or beef, boiled and buried under garlic yogurt and a drizzle of paprika-mint butter. Kayseri's version is famously minuscule—forty on one spoon is the boast.",
      category: "main",
      regionalOrigin: "Kayseri (Central Anatolia)",
      keyTraits: ["garlic yogurt", "hand-folded dough", "mint butter"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true, isNutFree: true }
    },
    {
      name: "Lahmacun",
      englishName: "Thin Turkish Flatbread with Spiced Meat",
      pronunciation: "lah-mah-joon",
      description: "Paper-thin dough spread with minced lamb, tomato, pepper, and parsley, blistered in a wood oven in about a minute. Squeezed with lemon, rolled around fresh parsley, and eaten by hand.",
      category: "street-food",
      regionalOrigin: "Southeastern Anatolia",
      keyTraits: ["wood-fired", "thin crisp dough", "spiced lamb"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isHalal: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Adana Kebabı",
      englishName: "Adana Kebab",
      pronunciation: "ah-dah-nah keh-bah-buh",
      description: "Hand-minced lamb with tail fat and red pepper, molded onto wide flat skewers and grilled over charcoal. Served on lavaş with grilled peppers, sumac onions, and parsley. The milder, un-spiced sibling is Urfa kebab.",
      category: "main",
      regionalOrigin: "Adana (Southern Turkey)",
      keyTraits: ["charcoal-grilled", "hand-minced lamb", "red pepper"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isHalal: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Menemen",
      englishName: "Turkish Scrambled Eggs with Tomato and Peppers",
      pronunciation: "meh-neh-men",
      description: "Eggs softly scrambled into a pan of slow-cooked tomatoes and green peppers, eaten straight from the pan with hunks of bread. Whether onion belongs in it is a genuine national debate.",
      category: "breakfast",
      keyTraits: ["soft-scrambled", "tomato & pepper", "one-pan"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "İmam Bayıldı",
      englishName: "Stuffed Eggplant in Olive Oil ('The Imam Fainted')",
      pronunciation: "ee-mahm bah-yuhl-duh",
      description: "Whole eggplant slow-cooked in olive oil and stuffed with onions, garlic, and tomatoes, served at room temperature. The name claims an imam swooned at its deliciousness—or at the amount of olive oil used.",
      category: "main",
      regionalOrigin: "Aegean / Istanbul",
      keyTraits: ["olive oil", "eggplant", "room temperature"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Mercimek Çorbası",
      englishName: "Red Lentil Soup",
      pronunciation: "mair-jee-mek chor-bah-suh",
      description: "Silky red lentil soup with onion, carrot, and a swirl of paprika butter, finished with lemon and dried mint. The default first course across the entire country, from home kitchens to highway rest stops.",
      category: "soup",
      keyTraits: ["red lentils", "lemon", "paprika butter"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Çiğ Köfte",
      englishName: "Spiced Bulgur 'Raw' Köfte",
      pronunciation: "chee kuf-teh",
      description: "Fine bulgur kneaded for an hour with isot pepper, pomegranate molasses, and spices until it binds—originally with raw meat, now almost always meatless. Wrapped in lettuce with a squeeze of lemon.",
      category: "street-food",
      regionalOrigin: "Şanlıurfa (Southeastern Anatolia)",
      keyTraits: ["kneaded bulgur", "isot pepper", "pomegranate molasses"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Hamsi Tava",
      englishName: "Pan-Fried Anchovies",
      pronunciation: "hahm-see tah-vah",
      description: "Fresh Black Sea anchovies dusted in cornmeal, fanned into a skillet in a sunflower pattern, and fried crisp. In winter, hamsi season shapes the entire Black Sea coast's menu.",
      category: "main",
      regionalOrigin: "Black Sea (Karadeniz)",
      keyTraits: ["cornmeal crust", "fresh anchovies", "pan-fried"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Baklava",
      pronunciation: "bahk-lah-vah",
      description: "Forty-plus tissue-thin layers of hand-rolled yufka dough, Gaziantep pistachios, and clarified butter, baked golden and soaked in şerbet syrup. Antep baklava carries EU protected-origin status.",
      category: "dessert",
      regionalOrigin: "Gaziantep (Southeastern Anatolia)",
      keyTraits: ["pistachio", "layered yufka", "syrup-soaked"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarian: true }
    }
  ],
  popularBeverages: [
    {
      name: "Çay",
      englishName: "Turkish Tea",
      pronunciation: "chai",
      description: "Strong black tea from the Rize hills, brewed in a two-tiered çaydanlık and served scalding in tulip-shaped glasses with sugar cubes on the side. Consumed morning to midnight—Turkey leads the world in per-capita tea drinking.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Rize (Black Sea)",
      servedHow: "hot",
      keyIngredients: ["black tea", "sugar cubes"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Türk Kahvesi",
      englishName: "Turkish Coffee",
      pronunciation: "turk kah-veh-see",
      description: "Ultra-finely ground coffee simmered unfiltered in a copper cezve until it foams, served in small cups with the grounds settling at the bottom—which are then read for fortunes. UNESCO-listed intangible heritage.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["finely ground arabica", "sugar (optional)", "cardamom (regional)"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ayran",
      pronunciation: "eye-rahn",
      description: "Cold, frothy yogurt whisked with water and salt—the default partner to kebabs and the national answer to spicy food. Some southeastern shops churn it to order in wooden barrels.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "salt"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Rakı",
      englishName: "Anise Spirit ('Lion's Milk')",
      pronunciation: "rah-kuh",
      description: "Twice-distilled grape spirit flavored with aniseed, turning cloudy white when mixed with water—hence the nickname aslan sütü, lion's milk. The centerpiece of long meze-filled rakı table evenings.",
      type: "alcoholic",
      category: "spirit",
      servedHow: "cold",
      keyIngredients: ["grapes", "aniseed"],
      alcoholContent: "high",
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Salep",
      englishName: "Hot Orchid-Root Milk",
      pronunciation: "sah-lep",
      description: "Winter street drink of hot milk thickened with ground wild orchid tubers, dusted with cinnamon. Creamy, floral, and sold from steaming urns when the weather turns cold; the same powder thickens Maraş ice cream.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "hot",
      keyIngredients: ["milk", "salep powder (orchid root)", "sugar", "cinnamon"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
