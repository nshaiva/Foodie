import type { Country } from '../types';

export const GR: Country = {
  id: "GR",
  name: "Greece",
  capital: "Athens",
  continent: "Europe",
  region: "Southern Europe",
  colorPalette: {
    primary: "#3b5b7d",      // Muted Aegean blue (from flag)
    secondary: "#7d8c6e",    // Olive-leaf sage
    accent: "#c9a86a",       // Sun-baked ochre
    background: "#f7f5ef",   // Whitewashed stone
    text: "#2c3e50"          // Deep slate blue
  },
  foodCulture: {
    overview: "Greek food culture is inseparable from the idea of the table as a gathering place. The word 'symposium' — literally 'drinking together' — is ancient Greek, and its spirit survives in the modern taverna, where plates of mezedes arrive in waves, ouzo is poured, and a meal can stretch across an entire afternoon. Eating alone is almost considered a misfortune; food exists to be shared, argued over, and lingered upon.\n\nThe cuisine itself is a study in restraint with superb raw materials. Olive oil is not a cooking medium so much as a foundational ingredient, poured generously over nearly everything. Vegetables, legumes, wild greens (horta), cheese, and bread carry most meals, with meat historically reserved for Sundays and feast days — a rhythm shaped as much by Orthodox fasting calendars as by the rocky landscape. Roughly half the days of the traditional church year call for abstaining from meat or dairy, which is why Greece has one of the deepest repertoires of accidentally vegan dishes in Europe.\n\nSeasonality still governs the kitchen. Tomatoes are for summer, when they need nothing but salt and oil; winter belongs to bean soups, braised greens, and citrus. Every region, and often every family, guards its own versions of pites (savory pies), its own barrel of feta, its own source of oil — and will happily explain why theirs is best.",
    mealStructure: "Breakfast is traditionally light — coffee with a koulouri (sesame bread ring) or paximadi rusk. Lunch, historically the main meal, is eaten around 2-3pm and often followed by a rest. Dinner comes late, rarely before 9pm, and mezedes — small shared plates — can constitute a full meal on their own, especially alongside ouzo or wine.",
    diningCustoms: "Dishes land in the center of the table and everyone eats from shared plates with their own fork. Bread is compulsory and used to mop up olive oil and sauces. Hosts will insist you eat more — refusing outright can offend. Many tavernas offer a complimentary dessert or shot of raki at the end of the meal, a gesture of filoxenia (hospitality).",
    historicalInfluences: "Greek cuisine layers antiquity with four centuries of Ottoman rule — moussaka, dolmades, baklava, and Greek coffee all have Ottoman-era roots — plus Venetian influence in the Ionian islands and Crete, and refugee cooking from Asia Minor Greeks after 1922, which brought spiced meats, smyrneika soutzoukakia, and richer use of cumin and cinnamon to the mainland."
  },
  cuisineProfile: {
    summary: "Greek cuisine is sun-drenched simplicity: extra virgin olive oil, lemon, oregano, and honest vegetables, sharpened by briny feta and olives, with grilled meats and seafood cooked over live fire.",
    flavorProfile: ["lemony (lemoni)", "herbaceous (rigani)", "briny", "olive oil-rich (ladera)", "garlicky (skordo)", "char-grilled"],
    flavorIntensity: {
      heat: 2,
      acidity: 7,
      sweetness: 4,
      umami: 5,
      aromatic: 7,
      smokeEarth: 6,
      interpretation: "Gentle on heat but bright with lemon and brine, carried by olive oil, dried oregano, and the smoke of charcoal grills."
    },
    keyIngredients: ["extra virgin olive oil", "feta cheese", "lemon", "kalamata olives", "tomatoes", "Greek yogurt", "phyllo dough", "wild greens (horta)", "legumes"],
    cookingTechniques: ["char-grilling (sta karvouna)", "slow braising in olive oil (ladera)", "oven-baking (sto fourno)", "layering phyllo pies", "marinating with lemon and oregano"],
    cookingFlow: [
      { action: "Marinate", emoji: "🍋" },
      { action: "Sauté in oil", emoji: "🫒" },
      { action: "Layer or braise", emoji: "🥘" },
      { action: "Bake or grill", emoji: "🔥" },
      { action: "Finish with lemon", emoji: "🌿" }
    ],
    spicesAndSeasonings: ["dried oregano (rigani)", "garlic", "lemon juice and zest", "dill", "mint", "parsley", "cinnamon", "allspice", "bay leaf", "sea salt", "mastiha", "cumin (Asia Minor dishes)"],
    ingredientTiers: {
      foundation: [
        { name: "Olive Oil", emoji: "🫒", description: "Elaiolado · Fat & flavor base · Peppery, grassy" },
        { name: "Lemon", emoji: "🍋", description: "Lemoni · Acid backbone · Bright, sharp" },
        { name: "Feta", emoji: "🧀", description: "PDO brined cheese · Salty core · Tangy, crumbly" },
        { name: "Oregano", emoji: "🌿", description: "Rigani · Signature herb · Dried, resinous" },
        { name: "Tomatoes", emoji: "🍅", description: "Domata · Summer base · Sweet, sun-ripened" }
      ],
      aromaticCore: [
        { name: "Garlic", emoji: "🧄", description: "Skordo · Aromatic · Pungent, mellows in oil" },
        { name: "Dill", emoji: "🌱", description: "Anitho · Fresh herb · Grassy, anise-tinged" },
        { name: "Mint", emoji: "🍃", description: "Diosmos · Fresh herb · Cooling, in meatballs & pies" },
        { name: "Cinnamon", emoji: "🪵", description: "Kanela · Warm spice · In meat sauces, not just sweets" },
        { name: "Bay Leaf", emoji: "🍂", description: "Dafni · Braising aromatic · Herbal, subtle" },
        { name: "Parsley", emoji: "🌿", description: "Maidanos · Fresh garnish · Clean, peppery" }
      ],
      flavorBuilders: [
        { name: "Kalamata Olives", emoji: "🫒", description: "PDO olive · Briny accent · Fruity, winey" },
        { name: "Greek Yogurt", emoji: "🥛", description: "Yiaourti · Strained dairy · Thick, tart" },
        { name: "Honey", emoji: "🍯", description: "Meli · Sweetener · Thyme-scented, floral" },
        { name: "Red Wine Vinegar", emoji: "🍷", description: "Xidi · Souring agent · Sharp, fruity" },
        { name: "Capers", emoji: "🫛", description: "Kapari · Briny accent · Floral, salty" },
        { name: "Onions", emoji: "🧅", description: "Kremmidi · Aromatic base · Sweet when slow-cooked" },
        { name: "Anchovies", emoji: "🐟", description: "Gavros · Umami source · Salt-cured, intense" },
        { name: "Tomato Paste", emoji: "🥫", description: "Pelte · Depth builder · Concentrated, sweet" },
        { name: "Kefalotyri", emoji: "🧀", description: "Hard sheep cheese · Grating/frying cheese · Sharp, salty" }
      ],
      staples: [
        { name: "Bread", emoji: "🍞", description: "Psomi · Daily staple · Crusty, for mopping oil" },
        { name: "Phyllo", emoji: "🥟", description: "Fyllo · Pastry base · Paper-thin, crisp" },
        { name: "Legumes", emoji: "🫘", description: "Ospria · Fasting protein · Gigantes, lentils, chickpeas" },
        { name: "Rice", emoji: "🍚", description: "Rizi · Stuffing & pilaf · In dolmades, gemista" },
        { name: "Potatoes", emoji: "🥔", description: "Patates · Side staple · Lemon-roasted classic" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Crete",
      description: "The island whose diet inspired the term 'Mediterranean diet.' Cretan cooking leans on raw olive oil consumed in astonishing quantities, wild greens foraged from the hills, barley rusks, snails, and mountain cheeses like graviera and myzithra. Meat is often goat or lamb, slow-cooked with staka (butterfat) or simply grilled. Venetian rule left its mark on pastries and wine.",
      signatureDishes: ["Dakos", "Kalitsounia (cheese pies)", "Chochlioi Boubouristi (fried snails)", "Antikristo lamb"],
      keyIngredients: ["olive oil", "barley rusks (paximadi)", "myzithra cheese", "wild greens", "snails", "thyme honey"],
      distinctiveTraits: ["Highest olive oil consumption in the world", "Foraged wild greens", "Raki (tsikoudia) culture", "Venetian-influenced pastries"]
    },
    {
      name: "Peloponnese",
      description: "The southern mainland peninsula is Greece's olive and citrus heartland — Kalamata olives and PDO oils come from here. The cooking is rustic and vegetable-forward: ladera (olive-oil braised vegetables), pasto (salt-cured pork), and the syrupy Mavrodaphne and Nemea wines. Villages inland keep traditions of wood-oven baking and hand-rolled pasta like goges.",
      signatureDishes: ["Ladera (oil-braised vegetables)", "Gournopoula (spit-roasted pork)", "Syglino (smoked pork)", "Diples (honey pastry)"],
      keyIngredients: ["Kalamata olives", "extra virgin olive oil", "oranges", "pork", "eggplant"],
      distinctiveTraits: ["Olive oil capital of Greece", "Smoked and cured pork traditions", "Wood-oven village baking"]
    },
    {
      name: "Macedonia & Thrace",
      description: "Northern Greece, centered on Thessaloniki, carries the strongest Ottoman and Asia Minor refugee influence. The food is spicier and richer than the south: boukovo (chili flakes) appears everywhere, peppers from Florina are roasted and stuffed, and the patisserie tradition — bougatsa, trigona — is unmatched. Thessaloniki is widely considered Greece's food capital.",
      signatureDishes: ["Bougatsa", "Soutzoukakia (spiced meatballs)", "Gemista with Florina peppers", "Mussels saganaki"],
      keyIngredients: ["Florina red peppers", "boukovo chili flakes", "cumin", "mussels", "phyllo", "leeks"],
      distinctiveTraits: ["Asia Minor refugee cuisine", "Only region that uses noticeable chili heat", "Legendary pastry and pie shops", "Bosporus-style seafood mezedes"]
    },
    {
      name: "Aegean Islands (Cyclades)",
      description: "Whitewashed islands with a cuisine of scarcity turned elegant: sun-dried tomatoes and capers from Santorini's volcanic soil, chickpea stews slow-baked overnight on Sifnos, louza cured pork on Mykonos and Tinos, and small-batch cheeses on every island. Fish is grilled simply and dressed only with ladolemono (oil-lemon emulsion).",
      signatureDishes: ["Revithada (Sifnos chickpea stew)", "Tomatokeftedes (Santorini tomato fritters)", "Louza (cured pork)", "Grilled octopus"],
      keyIngredients: ["capers", "cherry tomatoes", "fava (yellow split peas)", "octopus", "island cheeses (San Michali, Chloro)"],
      distinctiveTraits: ["Volcanic-soil produce on Santorini", "Overnight clay-pot baking", "Sun-drying and curing traditions", "Assyrtiko wine"]
    },
    {
      name: "Epirus",
      description: "The mountainous northwest is Greece's dairy and pie country. Shepherd culture produces superb feta, butter, and yogurt, while the region's cooks are famed for pites — savory pies with hand-rolled phyllo filled with greens, cheese, or milk. Freshwater trout and eels come from the rivers around Ioannina; the food is hearty, buttery, and built for cold winters.",
      signatureDishes: ["Alevropita (batter feta pie)", "Blatsaria (wild greens pie)", "Galatopita (milk pie)", "Trout from Ioannina"],
      keyIngredients: ["feta", "butter", "wild greens", "corn flour", "freshwater fish", "yogurt"],
      distinctiveTraits: ["Master phyllo and pie tradition", "Shepherd dairy culture", "Butter used where the south uses oil", "Mountain hearty cooking"]
    }
  ],
  popularDishes: [
    {
      name: "Moussaka",
      pronunciation: "moo-sah-KAH",
      description: "Layered casserole of fried eggplant, cinnamon-scented meat sauce, and a thick béchamel crust, baked until golden. The modern version with béchamel was codified by chef Tselementes in the 1920s.",
      category: "main",
      keyTraits: ["layered", "béchamel", "cinnamon-spiced meat"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isNutFree: true }
    },
    {
      name: "Souvlaki",
      pronunciation: "soo-VLAH-kee",
      description: "Skewers of marinated pork or chicken grilled over charcoal, served on a plate with pita and tzatziki or wrapped in pita with tomato, onion, and fries. Greece's definitive street food.",
      category: "street-food",
      keyTraits: ["charcoal-grilled", "lemon-oregano marinade", "skewered"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Horiatiki",
      englishName: "Greek Village Salad",
      pronunciation: "hor-yah-tee-KEE",
      description: "Chunks of ripe tomato, cucumber, green pepper, red onion, and kalamata olives under a slab of feta, dressed only with olive oil and dried oregano. Never any lettuce.",
      category: "salad",
      keyTraits: ["feta slab", "raw vegetables", "olive oil"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Spanakopita",
      englishName: "Spinach Pie",
      pronunciation: "spah-nah-KO-pee-tah",
      description: "Crisp phyllo pastry filled with spinach, feta, dill, and spring onions. Sold by the slice in every bakery and made at home for gatherings; the fasting version omits the cheese.",
      category: "appetizer",
      keyTraits: ["phyllo", "feta & dill", "baked"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Avgolemono",
      englishName: "Egg-Lemon Soup",
      pronunciation: "av-go-LEH-mo-no",
      description: "Silky chicken and rice soup thickened with an emulsion of whisked eggs and lemon juice — the signature Greek technique also used to sauce dolmades and stews. Comforting, tart, and deceptively tricky.",
      category: "soup",
      keyTraits: ["egg-lemon emulsion", "silky", "tart"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Gyros",
      pronunciation: "YEE-ros",
      description: "Seasoned pork (or chicken) stacked on a vertical rotisserie, shaved into a warm pita with tzatziki, tomato, onion, and fries. Brought to its modern form by Asia Minor Greeks; the everyday late-night meal.",
      category: "street-food",
      keyTraits: ["rotisserie", "pita wrap", "tzatziki"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isNutFree: true }
    },
    {
      name: "Fasolada",
      englishName: "White Bean Soup",
      pronunciation: "fah-so-LAH-dah",
      description: "Thick soup of white beans, tomato, carrot, celery, and plenty of olive oil — often called the national dish of Greece. A pillar of winter tables and Orthodox fasting days.",
      category: "soup",
      keyTraits: ["white beans", "olive oil", "tomato broth"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dakos",
      pronunciation: "DAH-kos",
      description: "Cretan barley rusk softened with grated ripe tomato, topped with crumbled myzithra or feta, olives, capers, and a heavy pour of olive oil. The Aegean answer to bruschetta.",
      category: "appetizer",
      regionalOrigin: "Crete",
      keyTraits: ["barley rusk", "grated tomato", "myzithra"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Soutzoukakia",
      englishName: "Smyrna Meatballs",
      pronunciation: "soo-tzoo-KAH-kya",
      description: "Oblong meatballs scented with cumin and garlic, simmered in a cinnamon-tinged tomato sauce. Brought by Greek refugees from Smyrna (Izmir) in 1922 and now a Thessaloniki staple, served with rice or fries.",
      category: "main",
      regionalOrigin: "Macedonia & Thrace",
      keyTraits: ["cumin", "tomato sauce", "Asia Minor heritage"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Loukoumades",
      englishName: "Honey Doughnuts",
      pronunciation: "loo-koo-MAH-des",
      description: "Airy fried dough puffs drenched in honey syrup and dusted with cinnamon and sometimes walnuts. Descendants of the 'honey tokens' awarded to ancient Olympic victors.",
      category: "dessert",
      keyTraits: ["fried dough", "honey syrup", "cinnamon"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isDairyFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Ellinikos Kafes",
      englishName: "Greek Coffee",
      pronunciation: "eh-lee-nee-KOS kah-FES",
      description: "Finely ground coffee simmered unfiltered in a small briki pot until it foams, served in a demitasse with the grounds settling at the bottom. Ordered by sweetness: sketos (plain), metrios (medium), glykos (sweet). Sipped slowly, never rushed.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["finely ground arabica coffee", "water", "sugar (optional)"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Frappé",
      pronunciation: "frah-PEH",
      description: "Iced coffee of shaken instant coffee, water, and sugar topped with thick foam — invented by accident in Thessaloniki in 1957 and now the sound of every Greek summer, nursed for hours at seaside cafés.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "iced",
      regionalOrigin: "Thessaloniki",
      keyIngredients: ["instant coffee", "sugar", "water", "milk (optional)"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isGlutenFree: true }
    },
    {
      name: "Ouzo",
      pronunciation: "OO-zoh",
      description: "Anise-flavored spirit that turns cloudy white when water or ice is added. Never drunk neat on an empty stomach — always with mezedes, ideally seafood, in a long unhurried session by the water. PDO-protected; Lesvos is the spiritual home.",
      type: "alcoholic",
      category: "spirit",
      servedHow: "cold",
      regionalOrigin: "Lesvos",
      keyIngredients: ["grape distillate", "anise", "fennel", "mastiha"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Retsina",
      pronunciation: "ret-SEE-nah",
      description: "White wine gently infused with Aleppo pine resin — a taste dating back to antiquity, when resin sealed wine amphorae. Modern producers make refined versions that pair beautifully with oily mezedes and fried fish.",
      type: "alcoholic",
      category: "wine",
      servedHow: "cold",
      keyIngredients: ["Savatiano or Assyrtiko grapes", "pine resin"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tsai tou Vounou",
      englishName: "Greek Mountain Tea",
      pronunciation: "TSAH-ee too voo-NOO",
      description: "Herbal infusion of dried Sideritis (ironwort) flowers gathered on mountain slopes, drunk with honey and lemon. The traditional remedy for everything from colds to melancholy, caffeine-free and faintly floral.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["Sideritis (ironwort)", "honey", "lemon"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
