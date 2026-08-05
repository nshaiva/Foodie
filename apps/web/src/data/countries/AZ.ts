import type { Country } from '../types';

export const AZ: Country = {
  id: "AZ",
  name: "Azerbaijan",
  capital: "Baku",
  continent: "Asia",
  region: "Caucasus",
  colorPalette: {
    primary: "#0092BC",      // Muted turquoise blue (from flag)
    secondary: "#E4002B",    // Muted red (from flag)
    accent: "#c9a227",       // Gold (Caspian wealth)
    background: "#faf9f7",   // Warm cream
    text: "#2d3a4a"          // Dark blue-gray
  },
  foodCulture: {
    overview: "Azerbaijani cuisine sits at the crossroads of Middle Eastern, Central Asian, and Caucasian influences, creating a rich tapestry of flavors centered on rice, lamb, and aromatic herbs. The country's position on the ancient Silk Road and shores of the Caspian Sea shaped its diverse culinary traditions.\n\nPlov (pilaf) is the undisputed king of Azerbaijani cuisine, with over 40 regional variations, each village claiming their version is best. Rice is treated with reverence—properly cooked plov should have each grain separate, with a prized crispy bottom (qazmaq).\n\nTea culture is central to daily life. Tea houses (çay evi) are social institutions, and tea is served in distinctive pear-shaped glasses (armudu) that keep the top cool and bottom hot.",
    mealStructure: "Meals begin with an array of salads, herbs, and pickles. Main dishes often center on grilled meats or elaborate plovs. Fresh herbs (greens platter) accompany every meal. Tea with sweets concludes the meal and continues for hours.",
    diningCustoms: "Tea is offered immediately to guests—refusing is impolite. Bread is sacred and should never be placed upside down. Generous hospitality is a point of national pride. Meals are leisurely affairs, especially when entertaining.",
    historicalInfluences: "Persian Empire influence is strong in rice dishes and sweets. Turkish influence shows in kebabs and dolma. Soviet era introduced communal dining and preserved certain traditions. Ancient Zoroastrian fire worship left marks in cooking over open flame."
  },
  cuisineProfile: {
    summary: "Azerbaijani cuisine celebrates aromatic rice dishes, grilled meats, and saffron-infused flavors, with strong tea culture and generous use of fresh herbs, dried fruits, and nuts.",
    flavorProfile: ["aromatic (saffron, herbs)", "savory", "subtly sweet (dried fruits)", "tangy (sumac, pomegranate)", "smoky (grilled)", "herbaceous"],
    flavorIntensity: {
      heat: 2,
      acidity: 5,
      sweetness: 5,
      umami: 5,
      aromatic: 8,
      smokeEarth: 6,
      interpretation: "Aromatic and fragrant with saffron, balanced sweet-savory notes from dried fruits, minimal heat."
    },
    keyIngredients: ["saffron", "lamb", "rice", "dried fruits (apricots, plums)", "walnuts", "chestnuts", "pomegranate", "fresh herbs", "sumac", "yogurt"],
    cookingTechniques: ["plov cooking (rice pilaf)", "grilling kebabs (mangal)", "braising and stewing", "dolma wrapping", "slow-roasting", "preserving and pickling"],
    cookingFlow: [
      { action: "Parboil rice", emoji: "🍚" },
      { action: "Sauté", emoji: "🧅" },
      { action: "Layer", emoji: "🥩" },
      { action: "Steam", emoji: "🟡" },
      { action: "Serve", emoji: "🍳" }
    ],
    spicesAndSeasonings: ["saffron", "sumac", "cumin", "coriander", "turmeric", "cinnamon", "dried mint", "dill", "cilantro", "tarragon"],
    ingredientTiers: {
      foundation: [
        { name: "Saffron", emoji: "🟡", description: "Zəfəran · Signature spice · Floral, golden" },
        { name: "Lamb", emoji: "🐑", description: "Quzu · Primary protein · Rich, tender" },
        { name: "Rice", emoji: "🍚", description: "Düyü · Plov base · Long-grain, separate" },
        { name: "Fresh Herbs", emoji: "🌿", description: "Göyərti · Herb platter · Essential accompaniment" }
      ],
      aromaticCore: [
        { name: "Sumac", emoji: "🔴", description: "Sumaq · Souring spice · Tangy, fruity" },
        { name: "Cumin", emoji: "🫛", description: "Zirə · Key spice · Earthy, warm" },
        { name: "Cinnamon", emoji: "🪵", description: "Darçın · Sweet spice · In rice, sweets" },
        { name: "Dried Mint", emoji: "🌱", description: "Nanə · Dried herb · Cooling, bright" },
        { name: "Coriander", emoji: "🌿", description: "Keşniş · Seed & leaf · Citrusy" }
      ],
      flavorBuilders: [
        { name: "Pomegranate", emoji: "🔴", description: "Nar · Molasses & seeds · Sweet-tart" },
        { name: "Dried Apricots", emoji: "🟠", description: "Quru ərik · In plovs · Sweet, tangy" },
        { name: "Chestnuts", emoji: "🌰", description: "Şabalıd · In rice dishes · Nutty, sweet" },
        { name: "Walnuts", emoji: "🥜", description: "Qoz · Stuffings, sweets · Rich, earthy" },
        { name: "Onion", emoji: "🧅", description: "Soğan · Base aromatic · Caramelized depth" },
        { name: "Yogurt", emoji: "🥛", description: "Qatıq · Sauce, marinade · Tangy, creamy" },
        { name: "Butter", emoji: "🧈", description: "Kərə yağı · Enrichment · Golden, rich" }
      ],
      staples: [
        { name: "Bread", emoji: "🍞", description: "Çörək · Tandir-baked · Chewy, charred" },
        { name: "Beef", emoji: "🥩", description: "Mal əti · Kebabs, stews" },
        { name: "Chicken", emoji: "🍗", description: "Toyuq · Roasted, in pilaf" },
        { name: "Caspian Fish", emoji: "🐟", description: "Balıq · Sturgeon, kutum · Grilled, smoked" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Baku & Absheron",
      description: "The capital region showcases refined, cosmopolitan cuisine influenced by Caspian seafood and urban sophistication. Known for elaborate plovs, fish dishes, and the famous Baku-style pakhlava (diamond-shaped baklava).",
      signatureDishes: ["Shah Plov", "Baliq Plov (Fish Pilaf)", "Baku Pakhlava", "Kutabi"],
      keyIngredients: ["Caspian sturgeon", "saffron", "rice", "nuts", "honey"],
      distinctiveTraits: ["Caspian seafood focus", "Elaborate presentation", "Urban refinement", "Famous sweets"]
    },
    {
      name: "Sheki-Zagatala",
      description: "The mountainous northwest is famous for Sheki's legendary pakhlava, distinctive piti (lamb soup), and nut-based sweets. The region's forests provide chestnuts and hazelnuts used extensively in cooking.",
      signatureDishes: ["Sheki Pakhlava", "Piti", "Girmabadam", "Sheki Halva"],
      keyIngredients: ["hazelnuts", "chestnuts", "honey", "lamb", "chickpeas"],
      distinctiveTraits: ["Famous pakhlava tradition", "Nut-centric sweets", "Mountain cuisine", "Individual piti pots"]
    },
    {
      name: "Lankaran & South",
      description: "The humid subtropical south near the Iranian border features unique rice dishes, citrus fruits, and tea plantations. The region is known for lavangi (stuffed fish or chicken with walnut filling) and distinctive sour flavors.",
      signatureDishes: ["Lavangi", "Lankaran Kulcha", "Siyaq Plov", "Turshu Kebab"],
      keyIngredients: ["walnuts", "pomegranate", "citrus", "rice", "fresh fish"],
      distinctiveTraits: ["Stuffed dishes (lavangi)", "Sour flavors", "Tea cultivation", "Iranian influences"]
    },
    {
      name: "Ganja-Gazakh",
      description: "Western Azerbaijan features hearty meat dishes and distinctive bread traditions. Ganja, the second-largest city, is known for its signature plov variations and dovga (yogurt soup).",
      signatureDishes: ["Ganja Plov", "Dovga", "Xəngəl", "Qutab"],
      keyIngredients: ["lamb", "yogurt", "herbs", "dried fruits", "wheat"],
      distinctiveTraits: ["Hearty meat focus", "Yogurt-based dishes", "Wheat dishes", "Mountain herding tradition"]
    }
  ],
  popularDishes: [
    {
      name: "Plov",
      englishName: "Azerbaijani Pilaf",
      pronunciation: "plohv",
      description: "Aromatic saffron rice with meat, dried fruits, and chestnuts. The crispy bottom (qazmaq) is the prized portion. Over 40 regional variations exist, from simple to elaborate Shah Plov wrapped in lavash.",
      category: "main",
      keyTraits: ["saffron rice", "dried fruits", "qazmaq"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Dolma",
      pronunciation: "dol-ma",
      description: "Grape leaves, cabbage, or vegetables stuffed with spiced meat and rice mixture. The grape leaf version (yarpaq dolması) is most iconic. Served with garlicky yogurt.",
      category: "main",
      keyTraits: ["stuffed leaves", "spiced meat", "yogurt sauce"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Kebab",
      pronunciation: "ke-bab",
      description: "Grilled meat skewers—lamb (quzu), beef (mal), or chicken (toyuq). Lula kebab (ground meat) and tikka kebab (chunks) are popular. Served with flatbread, herbs, and sumac onions.",
      category: "main",
      keyTraits: ["grilled", "skewered", "sumac onions"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Qutab",
      pronunciation: "goo-tab",
      description: "Thin unleavened flatbread folded over savory or sweet fillings—greens and herbs, minced meat, or pumpkin. Cooked on a dry sadj (convex griddle) and served with yogurt.",
      category: "appetizer",
      keyTraits: ["thin flatbread", "folded", "herb filling"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Piti",
      pronunciation: "pee-tee",
      description: "Individual clay pot soup with lamb, chickpeas, chestnuts, and saffron. Slow-cooked for hours. Traditionally, the broth is poured over bread, then meat and vegetables eaten separately.",
      category: "soup",
      keyTraits: ["clay pot", "lamb", "chickpeas"],
      regionalOrigin: "Sheki",
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Dovga",
      pronunciation: "dov-ga",
      description: "Creamy yogurt soup with rice, chickpeas, and fresh herbs (dill, cilantro, mint). Served hot or cold. Requires constant stirring to prevent curdling.",
      category: "soup",
      keyTraits: ["yogurt base", "fresh herbs", "rice"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Lavangi",
      pronunciation: "la-van-gee",
      description: "Whole fish or chicken stuffed with ground walnut, onion, and sour plum paste, then baked. A specialty of southern Azerbaijan with Persian influences.",
      category: "main",
      keyTraits: ["stuffed", "walnut filling", "sour plum"],
      regionalOrigin: "Lankaran",
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Pakhlava",
      pronunciation: "pakh-la-va",
      description: "Diamond-shaped layered pastry with ground nuts (walnuts, almonds, or hazelnuts), cardamom, and saffron, soaked in honey syrup. Sheki pakhlava with rice flour is UNESCO-recognized.",
      category: "dessert",
      keyTraits: ["layered pastry", "nuts", "honey syrup"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarian: true }
    }
  ],
  popularBeverages: [
    {
      name: "Azerbaijani Tea",
      englishName: "Çay",
      pronunciation: "chai",
      description: "Black tea served in pear-shaped armudu glasses, always with sugar cubes, jam, or sweets. Tea drinking is a social ritual lasting hours. Tea houses (çay evi) are cultural institutions.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["black tea", "sugar"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Sherbet",
      pronunciation: "sher-bet",
      description: "Traditional sweet drinks made from fruits, herbs, or flower extracts mixed with water and sugar. Flavors include rose, saffron, lemon, and pomegranate. Served at celebrations.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["fruit extract", "sugar", "water", "rose water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ayran",
      pronunciation: "eye-ran",
      description: "Salted yogurt drink, refreshing and cooling. Made by mixing yogurt with water and salt. Popular accompaniment to grilled meats and heavy dishes.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "salt"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Pomegranate Juice",
      englishName: "Nar Şərabı",
      pronunciation: "nar sha-ra-buh",
      description: "Fresh-squeezed pomegranate juice, a symbol of Azerbaijan. Deep red, sweet-tart, and antioxidant-rich. Pomegranate is the national fruit.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["fresh pomegranate"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Kompot",
      pronunciation: "kom-pot",
      description: "Sweet fruit drink made by simmering dried or fresh fruits. Common in Caucasus and Central Asia. Often made with dried apricots, plums, or cherries.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["dried fruits", "sugar", "water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
