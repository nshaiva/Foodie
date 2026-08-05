import type { Country } from '../types';

export const GE: Country = {
  id: "GE",
  name: "Georgia",
  capital: "Tbilisi",
  continent: "Asia",
  region: "Caucasus",
  colorPalette: {
    primary: "#8b2942",      // Muted wine red (wine heritage)
    secondary: "#4a5568",    // Slate gray (mountains)
    accent: "#c9a227",       // Gold (church domes)
    background: "#fdfaf6",   // Warm cream
    text: "#3d2a2a"          // Dark burgundy
  },
  foodCulture: {
    overview: "Georgian cuisine is one of the world's oldest and most distinctive culinary traditions, shaped by the country's position at the crossroads of Europe and Asia. The supra—a traditional feast presided over by a tamada (toastmaster)—is central to Georgian culture, featuring dozens of dishes and elaborate wine-fueled toasts that can last for hours.\n\nGeorgia is considered one of the birthplaces of wine, with 8,000 years of winemaking history. Traditional qvevri (clay vessels buried underground) are UNESCO-recognized, and wine is inseparable from Georgian hospitality and identity.\n\nThe cuisine celebrates bold, herbaceous flavors with generous use of walnuts, fresh herbs, and the distinctive spice blend khmeli suneli. Regional diversity is remarkable—coastal Adjara, mountainous Svaneti, and eastern Kakheti each have distinct traditions.",
    mealStructure: "Meals often begin with an array of cold dishes (pkhali, salads, cheeses) before hot dishes arrive. The supra feast has no set number of courses—dishes arrive continuously. Bread (puri/shotis puri) is sacred and accompanies every meal.",
    diningCustoms: "Refusing food or drink is considered impolite. Toasts during supra are elaborate and meaningful—to family, ancestors, Georgia itself. Wine is drunk from kantsi (horn) or clay cups. Guests are treated as gifts from God.",
    historicalInfluences: "Ancient trade routes brought Persian, Turkish, and Mediterranean influences. Soviet era paradoxically helped preserve traditions as Georgians clung to cultural identity. Greek colonies on the Black Sea coast left lasting marks. The Silk Road brought spices and techniques from the East."
  },
  cuisineProfile: {
    summary: "Georgian cuisine features bold, herbaceous flavors built on walnuts, fresh herbs, and distinctive spice blends, with exceptional cheese-filled breads and one of the world's oldest wine traditions.",
    flavorProfile: ["herbaceous", "nutty (walnut-forward)", "tangy", "garlicky", "aromatic", "savory"],
    flavorIntensity: {
      heat: 3,
      acidity: 6,
      sweetness: 3,
      umami: 6,
      aromatic: 8,
      smokeEarth: 5,
      interpretation: "Bright, herb-forward flavors with prominent walnut richness and garlic punch, minimal heat."
    },
    keyIngredients: ["walnuts", "fresh herbs (cilantro, dill, tarragon, basil)", "garlic", "pomegranate", "sulguni cheese", "imeruli cheese", "tkemali (sour plum sauce)", "adjika (chili paste)"],
    cookingTechniques: ["clay oven baking (tone)", "grilling and roasting", "walnut paste grinding", "cheese stretching and filling", "herb pounding (pkhali)", "stewing in clay pots"],
    cookingFlow: [
      { action: "Toast nuts", emoji: "🥜" },
      { action: "Pound herbs", emoji: "🧄" },
      { action: "Make paste", emoji: "🥣" },
      { action: "Grill/bake", emoji: "🔥" },
      { action: "Add pomegranate", emoji: "🔴" }
    ],
    spicesAndSeasonings: ["khmeli suneli (spice blend)", "blue fenugreek (utskho suneli)", "coriander seeds", "marigold petals (imeruli saffron)", "dried savory", "red pepper flakes", "fresh cilantro", "dill", "tarragon"],
    ingredientTiers: {
      foundation: [
        { name: "Walnuts", emoji: "🥜", description: "Nighozi · Defining flavor · Sauces, pastes, fillings" },
        { name: "Fresh Herbs", emoji: "🌿", description: "Cilantro, dill, tarragon · Signature freshness" },
        { name: "Garlic", emoji: "🧄", description: "Niori · Aromatic base · Used generously" },
        { name: "Cheese", emoji: "🧀", description: "Sulguni, imeruli · Stretchy, salty, tangy" }
      ],
      aromaticCore: [
        { name: "Blue Fenugreek", emoji: "🌱", description: "Utskho suneli · Key spice · Nutty, maple-like" },
        { name: "Coriander", emoji: "🫛", description: "Kinza · Seed & leaf · Citrusy, warm" },
        { name: "Marigold", emoji: "🌼", description: "Imeruli saffron · Color · Earthy, floral" },
        { name: "Tarragon", emoji: "🌿", description: "Tarkhuna · Fresh herb · Anise notes" },
        { name: "Savory", emoji: "🍃", description: "Kondari · Dried herb · Peppery, thyme-like" }
      ],
      flavorBuilders: [
        { name: "Pomegranate", emoji: "🔴", description: "Brotseulis · Seeds & molasses · Sweet-tart" },
        { name: "Tkemali", emoji: "🟢", description: "Sour plum sauce · Tangy condiment" },
        { name: "Adjika", emoji: "🌶️", description: "Chili paste · Abkhazian · Spicy, garlicky" },
        { name: "Vinegar", emoji: "🫙", description: "Wine vinegar · Pickling, dressings" },
        { name: "Onion", emoji: "🧅", description: "Khakhvi · Base aromatic · Mild, sweet" },
        { name: "Tomatoes", emoji: "🍅", description: "Pomidori · Sauces, salads" },
        { name: "Sour Cream", emoji: "🥛", description: "Arazhani · Tangy dairy · Sauce enrichment" }
      ],
      staples: [
        { name: "Bread", emoji: "🍞", description: "Puri/Shotis · Tone-baked · Chewy, slightly charred" },
        { name: "Beef/Pork", emoji: "🥩", description: "Khortsi · Grilled, stewed" },
        { name: "Chicken", emoji: "🍗", description: "Katami · Roasted, in sauces" },
        { name: "Beans", emoji: "🫘", description: "Lobio · Red beans · Stewed, spiced" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Kakheti",
      description: "Georgia's premier wine region in the east, Kakheti cuisine pairs perfectly with the local wines. Dishes tend to be robust and meat-heavy. The region is famous for mtsvadi (grilled meat), churchkhela (walnut candy), and traditional qvevri winemaking.",
      signatureDishes: ["Mtsvadi", "Churchkhela", "Chakapuli", "Kakhuri Khachapuri"],
      keyIngredients: ["lamb", "pork", "wine", "tarragon", "sour plums"],
      distinctiveTraits: ["Wine-centric cuisine", "Grilled meats", "Churchkhela tradition", "Qvevri wines"]
    },
    {
      name: "Imereti",
      description: "Central Georgia's Imereti region is known for its distinctive cheese (imeruli) and lighter, more herbaceous cooking. The region claims the original khachapuri and excels in vegetable dishes and subtle spicing.",
      signatureDishes: ["Imeruli Khachapuri", "Gebzhalia", "Elarji", "Mchadi"],
      keyIngredients: ["imeruli cheese", "corn flour", "herbs", "walnuts"],
      distinctiveTraits: ["Cheese-making tradition", "Corn-based dishes", "Lighter flavors", "Original khachapuri"]
    },
    {
      name: "Adjara",
      description: "The Black Sea coastal region brings Turkish and maritime influences. Adjara is famous for its boat-shaped khachapuri topped with egg and butter, dairy-rich cuisine, and seafood. The subtropical climate yields unique ingredients.",
      signatureDishes: ["Adjaruli Khachapuri", "Borano", "Sinori", "Chirbuli"],
      keyIngredients: ["butter", "eggs", "cheese", "corn", "hazelnuts"],
      distinctiveTraits: ["Dairy-rich cooking", "Egg-topped breads", "Turkish influence", "Coastal cuisine"]
    },
    {
      name: "Svaneti",
      description: "The remote mountain region of Svaneti developed unique dishes due to its isolation. Known for kubdari (meat-filled bread), heavy use of caraway and wild herbs, and preservation techniques for the harsh winters.",
      signatureDishes: ["Kubdari", "Tashmijabi", "Svan Salt"],
      keyIngredients: ["caraway", "wild garlic", "beef", "pork", "potatoes"],
      distinctiveTraits: ["Mountain cuisine", "Unique spice blends (Svan salt)", "Meat-stuffed breads", "Preserved foods"]
    }
  ],
  popularDishes: [
    {
      name: "Khachapuri",
      pronunciation: "kha-cha-poo-ree",
      description: "Cheese-filled bread in various regional styles. The dough is stuffed or topped with melted cheese, often with egg and butter. Georgia's most iconic dish with variations in every region.",
      category: "main",
      keyTraits: ["cheese-filled", "bread", "regional styles"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    },
    {
      name: "Khinkali",
      pronunciation: "khin-kah-lee",
      description: "Pleated soup dumplings filled with spiced meat, herbs, and broth. Eaten by hand—hold the top knob, bite, and slurp the juices. Counting the pleats is a mark of skill.",
      category: "main",
      keyTraits: ["soup dumpling", "pleated", "hand-eaten"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: {}
    },
    {
      name: "Badrijani Nigvzit",
      englishName: "Walnut-Stuffed Eggplant",
      pronunciation: "bad-ree-jah-nee nig-vzit",
      description: "Fried eggplant slices rolled around a garlicky walnut paste with herbs and pomegranate seeds. A quintessential Georgian appetizer.",
      category: "appetizer",
      keyTraits: ["walnut paste", "eggplant", "pomegranate"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Lobio",
      pronunciation: "lo-bee-oh",
      description: "Spiced red bean stew cooked with onions, herbs, and walnuts, often served in a clay pot. A hearty staple enjoyed with mchadi (cornbread).",
      category: "main",
      keyTraits: ["red beans", "walnuts", "clay pot"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chakhokhbili",
      pronunciation: "cha-kokh-bee-lee",
      description: "Chicken stewed with tomatoes, onions, and fresh herbs—traditionally made with pheasant. The sauce is rich with tarragon, cilantro, and basil.",
      category: "main",
      keyTraits: ["chicken stew", "tomato", "fresh herbs"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Pkhali",
      pronunciation: "p-kha-lee",
      description: "Vegetable pâtés made by finely chopping vegetables (spinach, beet, cabbage) and mixing with walnut paste, garlic, and herbs. Served as appetizers.",
      category: "appetizer",
      keyTraits: ["vegetable pâté", "walnut", "garlic"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Satsivi",
      pronunciation: "sat-see-vee",
      description: "Cold chicken or turkey in creamy walnut sauce with garlic and spices. Traditionally served at New Year's, the sauce is rich and aromatic.",
      category: "main",
      keyTraits: ["walnut sauce", "cold dish", "festive"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Churchkhela",
      pronunciation: "church-khe-la",
      description: "Traditional candy made by dipping strings of walnuts or hazelnuts in thickened grape juice, then drying. Called 'Georgian Snickers.'",
      category: "dessert",
      keyTraits: ["grape juice", "walnuts", "string candy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Georgian Wine",
      englishName: "Ghvino",
      pronunciation: "ghvee-no",
      description: "Wine from one of the world's oldest wine regions. Traditional qvevri (clay vessel) wines have an amber color and tannic character. Saperavi (red) and Rkatsiteli (white) are signature grapes.",
      type: "alcoholic",
      category: "wine",
      keyIngredients: ["Saperavi grapes", "Rkatsiteli grapes"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chacha",
      pronunciation: "cha-cha",
      description: "Georgian grape pomace brandy, similar to Italian grappa. Clear, potent, and often homemade. Traditionally served as a welcome drink or digestive.",
      type: "alcoholic",
      category: "spirit",
      keyIngredients: ["grape pomace"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tarkhuna",
      pronunciation: "tar-khoo-na",
      description: "Bright green tarragon-flavored soda, distinctively Georgian. Sweet with an herbal, anise-like flavor. A nostalgic Soviet-era creation still beloved today.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["tarragon extract", "sugar", "carbonated water"],
      isTraditional: false,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Kompot",
      pronunciation: "kom-pot",
      description: "Traditional fruit drink made by simmering fresh or dried fruits with sugar. Served cold in summer, warm in winter. Common fruits include cherry, plum, and apple.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["seasonal fruits", "sugar", "water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Borjomi",
      pronunciation: "bor-jo-mee",
      description: "Famous Georgian mineral water from the Borjomi valley. Naturally carbonated with a distinctive salty-mineral taste. Considered medicinal and a hangover cure.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["natural mineral water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
