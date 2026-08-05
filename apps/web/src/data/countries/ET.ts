import type { Country } from '../types';

export const ET: Country = {
  id: "ET",
  name: "Ethiopia",
  capital: "Addis Ababa",
  continent: "Africa",
  region: "East Africa",
  colorPalette: {
    primary: "#2d5a27",      // Muted green (from flag)
    secondary: "#c9a227",    // Muted gold/yellow (from flag)
    accent: "#a63d40",       // Muted red (from flag)
    background: "#faf8f3",   // Warm cream
    text: "#2a3a2a"          // Dark green-gray
  },
  foodCulture: {
    overview: "Ethiopian cuisine is one of the world's most distinctive and communal food traditions. Meals are served on a single large platter lined with injera (spongy flatbread), with various stews and dishes arranged on top. Diners tear off pieces of injera and use them to scoop up food—no utensils needed.\n\nFood and spirituality are intertwined. The Ethiopian Orthodox Church prescribes over 200 fasting days per year when meat and dairy are forbidden, leading to an extraordinarily rich tradition of vegan dishes. Wednesday and Friday are regular fasting days for observant Christians.\n\nCoffee holds sacred status—Ethiopia is the birthplace of arabica coffee, and the coffee ceremony (buna) is an hours-long ritual of roasting, grinding, and brewing performed for guests. Refusing coffee is considered impolite.",
    mealStructure: "Meals center on the communal platter. Lunch is typically the largest meal. The injera serves as both plate and utensil. Dishes are eaten in no particular order—diners graze across the platter. Coffee ceremony often follows meals.",
    diningCustoms: "Eating from a shared platter using hands only (right hand). Gursha—hand-feeding someone else a morsel—is a gesture of respect and affection. The person who tears the last piece of injera should not eat it alone.",
    historicalInfluences: "Ancient trade routes brought spices from Arabia and India. Unique highland climate allowed cultivation of teff (the grain for injera) found almost nowhere else. Italian occupation (1936-41) left minimal culinary impact, unlike in Eritrea. Indigenous traditions remained remarkably intact."
  },
  cuisineProfile: {
    summary: "Ethiopian cuisine features complex spice blends, hearty stews, and the iconic injera flatbread, with an extensive tradition of flavorful vegan dishes alongside rich meat preparations.",
    flavorProfile: ["warmly spiced", "earthy", "tangy (from injera fermentation)", "rich", "peppery", "aromatic"],
    flavorIntensity: {
      heat: 8,
      acidity: 6,
      sweetness: 2,
      umami: 7,
      aromatic: 9,
      smokeEarth: 7,
      interpretation: "Intense heat and complex spice from berbere, deep earthy notes from legumes and grains."
    },
    keyIngredients: ["teff flour (for injera)", "berbere spice blend", "niter kibbeh (spiced clarified butter)", "lentils", "chickpeas", "collard greens", "beef", "lamb", "chicken"],
    cookingTechniques: ["slow-simmering stews (wots)", "dry-frying spices", "fermenting (injera batter)", "clarifying and spicing butter", "raw meat preparation (kitfo, gored gored)"],
    cookingFlow: [
      { action: "Toast spices", emoji: "🫚" },
      { action: "Mix berbere", emoji: "🌶️" },
      { action: "Sauté onions", emoji: "🧅" },
      { action: "Simmer wot", emoji: "🍲" },
      { action: "Serve", emoji: "🫓" }
    ],
    spicesAndSeasonings: ["berbere (chili, fenugreek, coriander, cardamom, and more)", "mitmita (chili powder blend)", "korarima (Ethiopian cardamom)", "black cumin", "fenugreek", "bishop's weed (ajwain)", "rue"],
    ingredientTiers: {
      foundation: [
        { name: "Berbere", emoji: "🌶️", description: "Spice blend · Defining flavor · Hot, complex" },
        { name: "Niter Kibbeh", emoji: "🧈", description: "Spiced butter · Cooking fat · Aromatic, rich" },
        { name: "Teff", emoji: "🌾", description: "Ancient grain · Injera flour · Nutty, sour" },
        { name: "Onions", emoji: "🧅", description: "Key shiro · Wot base · Slow-caramelized" }
      ],
      aromaticCore: [
        { name: "Korarima", emoji: "🫛", description: "Ethiopian cardamom · Spice · Eucalyptus notes" },
        { name: "Fenugreek", emoji: "🌿", description: "Abish · Key spice · Maple-like, bitter" },
        { name: "Black Cumin", emoji: "⚫", description: "AKA nigella · Spice · Earthy, oniony" },
        { name: "Ginger", emoji: "🫚", description: "Zingibil · Aromatic · Warm, spicy" },
        { name: "Garlic", emoji: "🧄", description: "Nech shinkurt · Aromatic · Pungent" }
      ],
      flavorBuilders: [
        { name: "Red Lentils", emoji: "🟠", description: "Misir · Protein · Quick-cooking" },
        { name: "Chickpeas", emoji: "🫘", description: "Shimbra · Protein · For shiro" },
        { name: "Collard Greens", emoji: "🥬", description: "Gomen · Vegetable · Mild, earthy" },
        { name: "Tomatoes", emoji: "🍅", description: "Color & acid · In wots" },
        { name: "Mitmita", emoji: "🔴", description: "Chili powder · Heat · Fiery, cardamom" },
        { name: "Cardamom", emoji: "🫛", description: "Korerima · Spice · Floral, sweet" },
        { name: "Coriander", emoji: "🌱", description: "Dimbilal · Spice · Warm, citrusy" }
      ],
      staples: [
        { name: "Injera", emoji: "🫓", description: "Flatbread · Plate & utensil · Spongy, sour" },
        { name: "Beef", emoji: "🥩", description: "Siga · Protein · Wots, tibs, kitfo" },
        { name: "Lamb", emoji: "🍖", description: "Beg · Protein · Rich, fatty" },
        { name: "Chicken", emoji: "🍗", description: "Doro · Special occasions · In doro wot" }
      ]
    }
  },
  popularDishes: [
    {
      name: "Injera",
      pronunciation: "in-jeh-rah",
      description: "Spongy, tangy flatbread made from fermented teff batter. The foundation of every Ethiopian meal—serving as plate, utensil, and staple carbohydrate.",
      category: "side",
      keyTraits: ["fermented teff", "spongy", "tangy"],
      isVegetarian: true,
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Doro Wot",
      pronunciation: "doh-roh woht",
      description: "Spicy chicken stew simmered for hours in berbere and niter kibbeh, served with hard-boiled eggs. The national dish, reserved for special occasions and holidays.",
      category: "main",
      keyTraits: ["berbere", "niter kibbeh", "slow-simmered"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Kitfo",
      pronunciation: "kit-foh",
      description: "Minced raw beef seasoned with mitmita and niter kibbeh. Can be served leb leb (lightly warmed) or fully cooked. Ethiopia's steak tartare equivalent.",
      category: "main",
      keyTraits: ["raw beef", "mitmita", "niter kibbeh"],
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Misir Wot",
      pronunciation: "mih-sir woht",
      description: "Red lentils simmered in berbere spice blend until thick and flavorful. A fasting-day staple and one of the world's great vegan dishes.",
      category: "main",
      keyTraits: ["red lentils", "berbere", "vegan"],
      isVegetarian: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Shiro",
      pronunciation: "shee-roh",
      description: "Smooth, thick stew of ground chickpeas or broad beans with garlic, onion, and spices. Humble, comforting, and ubiquitous on fasting days.",
      category: "main",
      keyTraits: ["chickpea", "creamy", "garlic"],
      isVegetarian: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tibs",
      pronunciation: "tibs",
      description: "Sautéed meat (beef or lamb) with onions, peppers, and spices. Ranges from mild (alicha tibs) to fiery. Often served sizzling in a clay pot.",
      category: "main",
      keyTraits: ["sautéed", "onions", "peppers"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "easy",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Gomen",
      pronunciation: "goh-men",
      description: "Collard greens sautéed with garlic, ginger, and spices. A standard component of the vegetarian combination platter.",
      category: "side",
      keyTraits: ["collard greens", "garlic", "ginger"],
      isVegetarian: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ethiopian Coffee (Buna)",
      pronunciation: "boo-nah",
      description: "Coffee roasted, ground, and brewed tableside in a jebena (clay pot). Served in three rounds of decreasing strength. A ceremony, not just a drink.",
      category: "beverage",
      keyTraits: ["fresh-roasted", "ceremonial", "jebena"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Coffee (Buna)",
      pronunciation: "boo-nah",
      description: "Ceremonial coffee roasted, ground, and brewed tableside in a jebena clay pot. Served in three rounds: abol, tona, and baraka, each progressively weaker.",
      type: "non-alcoholic",
      category: "ceremonial",
      servedHow: "hot",
      keyIngredients: ["green coffee beans", "frankincense"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tej",
      pronunciation: "tedge",
      description: "Traditional Ethiopian honey wine with a sweet, slightly bitter taste from gesho leaves. Served in distinctive round-bottomed flasks called berele.",
      type: "alcoholic",
      category: "wine",
      keyIngredients: ["honey", "gesho leaves", "water"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tella",
      pronunciation: "teh-lah",
      description: "Traditional Ethiopian beer made from fermented barley, wheat, or teff. Thick, cloudy, and mildly sour with low alcohol content.",
      type: "alcoholic",
      category: "beer",
      keyIngredients: ["barley", "gesho", "water"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Spris",
      pronunciation: "spreece",
      description: "Unique Ethiopian drink that's half coffee, half tea in the same cup. A popular way to enjoy both beverages simultaneously.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["coffee", "black tea"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
