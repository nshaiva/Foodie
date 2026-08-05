import type { Country } from '../types';

export const PE: Country = {
  id: "PE",
  name: "Peru",
  capital: "Lima",
  continent: "South America",
  region: "Western South America",
  colorPalette: {
    primary: "#8b2942",      // Muted red (from flag)
    secondary: "#5c4033",    // Earthy brown (Incan)
    accent: "#c9a227",       // Incan gold
    background: "#fdfaf6",   // Warm cream
    text: "#3d2a2a"          // Dark burgundy
  },
  foodCulture: {
    overview: "Peruvian cuisine has emerged as one of the world's most celebrated, built on 5,000 years of indigenous tradition fused with Spanish, African, Chinese, and Japanese influences. Lima is now considered a global culinary capital, home to multiple restaurants on the World's 50 Best list.\n\nGeographic diversity shapes the cuisine dramatically. The coast (costa) emphasizes seafood and ceviche. The highlands (sierra) feature hearty dishes with potatoes, corn, and meat. The Amazon (selva) contributes exotic fruits, fish, and ingredients found nowhere else.\n\nPeru is the origin of the potato—over 3,000 varieties grow here—and this biodiversity extends to corn (55 varieties), peppers (ají), and countless other ingredients. The cuisine celebrates this abundance.",
    mealStructure: "Lunch (almuerzo) is the main meal, often a multi-course set menu at restaurants. Ceviche is traditionally a lunch dish (the citrus is thought to aid afternoon energy). Dinner is lighter. Street food and snacks are eaten throughout the day.",
    diningCustoms: "Ceviche is eaten with a spoon; the citrus 'leche de tigre' liquid is sipped or drunk as a hangover cure. Sharing anticuchos (skewers) at street carts is a social activity. Pisco sour before meals is customary.",
    historicalInfluences: "Inca and pre-Inca civilizations developed sophisticated preservation and cooking techniques. Spanish colonization brought new ingredients and livestock. Chinese immigrants (chifa) and Japanese immigrants (Nikkei) created distinct fusion cuisines now integral to Peruvian food."
  },
  cuisineProfile: {
    summary: "Peruvian cuisine blends indigenous ingredients with global influences, featuring bold use of ají peppers, citrus, and an unparalleled diversity of potatoes, corn, and seafood.",
    flavorProfile: ["citrus-bright", "ají pepper heat (fruity, not just hot)", "tangy", "savory", "earthy (highland dishes)", "fresh"],
    flavorIntensity: {
      heat: 6,
      acidity: 9,
      sweetness: 3,
      umami: 5,
      aromatic: 6,
      smokeEarth: 5,
      interpretation: "Bright acidity from lime and ají peppers, balanced heat, subtle umami from seafood."
    },
    keyIngredients: ["ají amarillo (yellow pepper)", "lime", "potatoes (thousands of varieties)", "corn (choclo)", "seafood", "quinoa", "cilantro", "ají panca", "huacatay (black mint)"],
    cookingTechniques: ["curing in citrus (ceviche)", "stir-frying (from chifa influence)", "braising and stewing", "grilling (anticuchos)", "pachamanca (earth oven cooking)"],
    cookingFlow: [
      { action: "Slice fish", emoji: "🐟" },
      { action: "Add citrus", emoji: "🍋" },
      { action: "Chop", emoji: "🧅" },
      { action: "Cure", emoji: "🥣" },
      { action: "Plate", emoji: "🍠" }
    ],
    spicesAndSeasonings: ["ají amarillo", "ají panca", "ají rocoto", "cumin", "garlic", "cilantro", "huacatay", "chincho", "palillo (Peruvian turmeric)"],
    ingredientTiers: {
      foundation: [
        { name: "Ají Amarillo", emoji: "🌶️", description: "Yellow pepper · Signature heat · Fruity, mild" },
        { name: "Lime", emoji: "🍋", description: "Limón · Ceviche acid · Bright, essential" },
        { name: "Potatoes", emoji: "🥔", description: "Papa · 3000+ varieties · Starchy, diverse" },
        { name: "Corn", emoji: "🌽", description: "Choclo · Giant kernels · Starchy, sweet" }
      ],
      aromaticCore: [
        { name: "Cilantro", emoji: "🌿", description: "Culantro · Fresh herb · Citrusy, bright" },
        { name: "Huacatay", emoji: "🌱", description: "Black mint · Andean herb · Anise-tarragon" },
        { name: "Ají Panca", emoji: "🔴", description: "Dried pepper · Adobos · Mild, berry-like" },
        { name: "Ají Rocoto", emoji: "🫑", description: "Hot pepper · Apple-shaped · Intense heat" },
        { name: "Cumin", emoji: "🫛", description: "Comino · Dried spice · Earthy, warm" }
      ],
      flavorBuilders: [
        { name: "Red Onion", emoji: "🧅", description: "Cebolla · Ceviche topping · Sharp, purple" },
        { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic · Pungent, essential" },
        { name: "Soy Sauce", emoji: "🫘", description: "Chifa influence · Umami · Asian fusion" },
        { name: "Vinegar", emoji: "🫙", description: "Acid · Escabeche · Tangy, preserving" },
        { name: "Sweet Potato", emoji: "🍠", description: "Camote · Side dish · Sweet contrast" },
        { name: "Cancha", emoji: "🌽", description: "Corn nuts · Toasted · Crunchy, nutty" },
        { name: "Palillo", emoji: "🟡", description: "Peruvian turmeric · Color · Mild, earthy" }
      ],
      staples: [
        { name: "Fresh Fish", emoji: "🐟", description: "Pescado · Ceviche base · Pacific, fresh" },
        { name: "Rice", emoji: "🍚", description: "Arroz · Side starch · With everything" },
        { name: "Quinoa", emoji: "🌾", description: "Andean grain · Protein-rich · Nutty" }
      ]
    }
  },
  popularDishes: [
    {
      name: "Ceviche",
      pronunciation: "seh-vee-cheh",
      description: "Fresh raw fish cured in lime juice with ají, red onion, and cilantro. Served with sweet potato and cancha (toasted corn). Peru's national dish and point of pride.",
      category: "main",
      keyTraits: ["lime-cured", "ají amarillo", "red onion"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Lomo Saltado",
      pronunciation: "loh-moh sahl-tah-doh",
      description: "Stir-fried beef with onions, tomatoes, and ají amarillo, served over rice with French fries. The quintessential chifa (Chinese-Peruvian) fusion dish.",
      category: "main",
      keyTraits: ["stir-fried", "chifa fusion", "soy sauce"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true }
    },
    {
      name: "Ají de Gallina",
      pronunciation: "ah-hee deh gah-yee-nah",
      description: "Shredded chicken in a creamy sauce of ají amarillo, bread, walnuts, and cheese, served over rice with potatoes and olives.",
      category: "main",
      keyTraits: ["creamy", "ají amarillo", "walnuts"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: {}
    },
    {
      name: "Anticuchos",
      pronunciation: "ahn-tee-koo-chohs",
      description: "Grilled beef heart skewers marinated in vinegar, cumin, and ají panca. Beloved street food with pre-Columbian origins, served with potatoes and corn.",
      category: "street-food",
      keyTraits: ["grilled", "beef heart", "ají panca"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Causa",
      pronunciation: "cow-sah",
      description: "Layered cold dish of seasoned mashed yellow potato with ají amarillo, filled with chicken, tuna, or crab salad. Striking presentation.",
      category: "appetizer",
      keyTraits: ["layered potato", "ají amarillo", "cold"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Rocoto Relleno",
      pronunciation: "roh-koh-toh reh-yeh-noh",
      description: "Stuffed rocoto pepper (extremely spicy) with ground beef, onions, eggs, and cheese, baked until golden. A specialty of Arequipa.",
      category: "main",
      keyTraits: ["stuffed pepper", "rocoto", "baked"],
      regionalOrigin: "Arequipa",
      popularity: "local-favorite",
      spiceLevel: "very-hot",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Picarones",
      pronunciation: "pee-kah-roh-nehs",
      description: "Sweet potato and squash doughnuts drizzled with chancaca (raw sugar syrup). A beloved street dessert dating to colonial times.",
      category: "dessert",
      keyTraits: ["sweet potato", "chancaca syrup", "fried"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Pisco Sour",
      pronunciation: "pees-koh",
      description: "Cocktail of pisco (grape brandy), lime juice, simple syrup, egg white, and bitters. Peru's national drink, with contested Chilean origins.",
      category: "beverage",
      keyTraits: ["pisco", "lime", "egg white foam"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Pisco Sour",
      pronunciation: "pees-koh sow-er",
      description: "Peru's national cocktail made with pisco, lime juice, simple syrup, egg white, and Angostura bitters. Frothy, tangy, and iconic.",
      type: "alcoholic",
      category: "cocktail",
      servedHow: "cold",
      keyIngredients: ["pisco", "lime juice", "egg white", "bitters"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chicha Morada",
      pronunciation: "chee-chah moh-rah-dah",
      description: "Sweet, refreshing drink made from purple corn boiled with pineapple, cinnamon, and cloves. Deep purple color and uniquely Peruvian.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["purple corn", "pineapple", "cinnamon", "cloves", "lime"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Inca Kola",
      pronunciation: "in-kah koh-lah",
      description: "Bright yellow soda with a sweet, bubblegum-like flavor. Peru's most popular soft drink, outselling even Coca-Cola in the country.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["lemon verbena", "sugar", "carbonated water"],
      isTraditional: false,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Mate de Coca",
      englishName: "Coca Leaf Tea",
      pronunciation: "mah-teh deh koh-kah",
      description: "Tea made from coca leaves, traditionally used to combat altitude sickness. Mild, earthy flavor with a subtle energizing effect.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Andes",
      servedHow: "hot",
      keyIngredients: ["coca leaves"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chicha de Jora",
      pronunciation: "chee-chah deh hoh-rah",
      description: "Ancient fermented corn beer dating to Incan times. Mildly alcoholic, slightly sour, and still made traditionally in the Andes.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "Andes",
      keyIngredients: ["jora corn", "water"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
