import type { Country } from '../types';

export const TH: Country = {
  id: "TH",
  name: "Thailand",
  capital: "Bangkok",
  continent: "Asia",
  region: "Southeast Asia",
  colorPalette: {
    primary: "#1e4d6b",      // Muted navy blue (from flag)
    secondary: "#c44536",    // Muted red (from flag)
    accent: "#d4a574",       // Warm gold
    background: "#f8f6f2",   // Cream white
    text: "#1e3a4f"          // Dark blue-gray
  },
  foodCulture: {
    overview: "Thai cuisine is deeply woven into the country's social fabric, with food serving as a centerpiece of family gatherings, religious ceremonies, and everyday life. Meals are communal affairs—dishes are placed at the center of the table and shared among everyone, with each person taking small portions of multiple dishes alongside rice.\n\nStreet food culture is ubiquitous and essential to understanding Thai food. From bustling night markets in Bangkok to roadside vendors in small villages, Thais eat out frequently, often multiple times per day. The line between restaurant and street stall is blurred, with some of the country's most celebrated dishes served from humble carts.\n\nThe Thai approach to food emphasizes balance—not just of flavors within a dish, but across an entire meal. A proper Thai meal includes contrasting dishes: something spicy balanced by something mild, something rich offset by something light and refreshing.",
    mealStructure: "Meals typically center around rice (khao), with multiple dishes served simultaneously rather than in courses. Breakfast might be rice porridge (jok) or noodle soup, lunch a single-plate dish, and dinner the most elaborate meal with several shared dishes.",
    diningCustoms: "Food is eaten with a spoon (main utensil) and fork (used to push food onto the spoon). Chopsticks are reserved for noodle dishes. It's common to order more dishes than people at the table, ensuring variety.",
    historicalInfluences: "Thai cuisine reflects centuries of trade and cultural exchange—Chinese influences in noodle dishes and stir-frying techniques, Indian influences in curries, and Portuguese introduction of chilies in the 16th century that transformed the cuisine."
  },
  cuisineProfile: {
    summary: "Thai cuisine is defined by its bold, harmonious balance of spicy, sour, sweet, and salty flavors, with an emphasis on fresh herbs and aromatic ingredients.",
    flavorProfile: ["spicy (phet)", "sour (priao)", "sweet (wan)", "salty (kem)", "aromatic", "herbaceous"],
    flavorIntensity: {
      heat: 8,
      acidity: 8,
      sweetness: 7,
      umami: 7,
      aromatic: 9,
      smokeEarth: 3,
      interpretation: "Bold and aromatic with bright balance of heat and sour, creating signature Thai flavor harmony."
    },
    keyIngredients: ["jasmine rice", "fish sauce (nam pla)", "coconut milk", "palm sugar", "tamarind", "lime", "shrimp paste", "rice noodles"],
    cookingTechniques: ["stir-frying (pad)", "grilling (yang)", "boiling/simmering curries", "pounding in mortar and pestle", "deep-frying"],
    cookingFlow: [
      { action: "Pound", emoji: "🪨" },
      { action: "Fry paste", emoji: "🍳" },
      { action: "Add coconut", emoji: "🥥" },
      { action: "Simmer", emoji: "🍲" },
      { action: "Garnish", emoji: "🌿" }
    ],
    spicesAndSeasonings: ["Thai chilies", "galangal", "lemongrass", "kaffir lime leaves", "Thai basil", "cilantro (roots, stems, leaves)", "garlic", "shallots", "turmeric", "coriander seeds", "cumin"],
    ingredientTiers: {
      foundation: [
        { name: "Fish Sauce", emoji: "🐟", description: "Nam pla · Umami base · Fermented, salty" },
        { name: "Coconut Milk", emoji: "🥥", description: "Curry base · Rich, creamy" },
        { name: "Thai Chilies", emoji: "🌶️", description: "Bird's eye · Heat source · Intense, fruity" },
        { name: "Lime", emoji: "🍋", description: "Acid balance · Bright, sour" }
      ],
      aromaticCore: [
        { name: "Lemongrass", emoji: "🌿", description: "Takrai · Aromatic · Citrusy, floral" },
        { name: "Galangal", emoji: "🫚", description: "Thai ginger · Aromatic · Sharp, piney" },
        { name: "Kaffir Lime", emoji: "🍃", description: "Makrut · Aromatic leaf · Intense citrus" },
        { name: "Thai Basil", emoji: "🌿", description: "Horapa · Fresh herb · Anise-like" },
        { name: "Cilantro", emoji: "🌱", description: "AKA coriander · Fresh garnish · Citrusy" }
      ],
      flavorBuilders: [
        { name: "Shallots", emoji: "🧅", description: "Hom daeng · Aromatic · Mild, sweet" },
        { name: "Garlic", emoji: "🧄", description: "Kratiem · Aromatic · Pungent, sharp" },
        { name: "Palm Sugar", emoji: "🍯", description: "Nam tan pip · Sweetener · Caramel notes" },
        { name: "Tamarind", emoji: "🫘", description: "Makham · Souring agent · Fruity, tart" },
        { name: "Shrimp Paste", emoji: "🦐", description: "Kapi · Umami bomb · Pungent, funky" },
        { name: "Coriander Seeds", emoji: "🫛", description: "Dried spice · Warm, citrusy" },
        { name: "Turmeric", emoji: "🟡", description: "Khamin · Color & spice · Earthy, warm" }
      ],
      staples: [
        { name: "Jasmine Rice", emoji: "🍚", description: "Khao hom mali · Base starch · Fragrant" },
        { name: "Rice Noodles", emoji: "🍜", description: "Sen · Base starch · Chewy, neutral" },
        { name: "Tofu", emoji: "🧈", description: "Tao hu · Protein · Mild, absorbent" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Central Thailand",
      description: "The cuisine of Bangkok and the central plains is what most foreigners recognize as 'Thai food.' It balances all four flavors—sweet, sour, salty, spicy—with coconut milk-based curries and aromatic stir-fries. This region refined dishes from across Thailand for the royal court.",
      signatureDishes: ["Pad Thai", "Green Curry", "Tom Yum", "Pad Krapow"],
      keyIngredients: ["coconut milk", "palm sugar", "jasmine rice", "Thai basil"],
      distinctiveTraits: ["Balance of all four flavors", "Coconut-rich curries", "Royal cuisine influence"]
    },
    {
      name: "Northern Thailand (Lanna)",
      description: "Chiang Mai and the mountainous north feature milder, earthier flavors with Burmese and Laotian influences. Less coconut milk, more herbs and dried spices. Sticky rice replaces jasmine rice as the staple. Dishes tend to be less sweet and less spicy than central Thai food.",
      signatureDishes: ["Khao Soi", "Sai Oua (Northern sausage)", "Laab", "Nam Prik Ong"],
      keyIngredients: ["sticky rice", "dried chilies", "turmeric", "fermented soybeans"],
      distinctiveTraits: ["Burmese influences", "Sticky rice staple", "Milder heat", "Fermented ingredients"]
    },
    {
      name: "Northeastern Thailand (Isan)",
      description: "The largest and most populous region, Isan cuisine is rustic, intensely flavored, and heavily influenced by Laos. Known for grilled meats, fermented fish, raw dishes, and the iconic green papaya salad. Sticky rice is essential, eaten by hand.",
      signatureDishes: ["Som Tum", "Larb", "Gai Yang", "Nam Tok"],
      keyIngredients: ["sticky rice", "fermented fish (pla ra)", "green papaya", "dried chilies", "lime"],
      distinctiveTraits: ["Laotian influence", "Fermented fish (pla ra)", "Intense sourness and heat", "Grilled meats"]
    },
    {
      name: "Southern Thailand",
      description: "The peninsula's cuisine is the spiciest in Thailand, with Malaysian and Indian Muslim influences. Heavy use of turmeric gives dishes a yellow hue. Coconut and seafood dominate, and curries are thinner and more intense than central versions.",
      signatureDishes: ["Massaman Curry", "Gaeng Som", "Khua Kling", "Satay"],
      keyIngredients: ["turmeric", "coconut", "seafood", "shrimp paste", "bird's eye chilies"],
      distinctiveTraits: ["Extreme spiciness", "Muslim influences", "Turmeric-forward", "Thin, intense curries"]
    }
  ],
  popularDishes: [
    {
      name: "Pad Thai",
      pronunciation: "pahd tie",
      description: "Stir-fried rice noodles with eggs, tofu or shrimp, bean sprouts, and peanuts in a sweet-sour tamarind sauce. Thailand's most internationally recognized dish.",
      category: "main",
      keyTraits: ["wok-fried", "tamarind", "rice noodles"],
      isStreetFood: true,
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tom Yum Goong",
      englishName: "Spicy Shrimp Soup",
      pronunciation: "tom yum goong",
      description: "Hot and sour soup with shrimp, mushrooms, lemongrass, galangal, kaffir lime leaves, and chilies. The quintessential Thai soup.",
      category: "soup",
      keyTraits: ["lemongrass", "hot & sour", "galangal"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Som Tum",
      englishName: "Green Papaya Salad",
      pronunciation: "som tum",
      description: "Shredded unripe papaya pounded with tomatoes, green beans, peanuts, dried shrimp, and chilies in a lime and fish sauce dressing. Originates from the Isan region.",
      category: "salad",
      keyTraits: ["pounded", "lime", "fish sauce"],
      isStreetFood: true,
      regionalOrigin: "Isan (Northeastern Thailand)",
      popularity: "local-favorite",
      spiceLevel: "very-hot",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Gaeng Keow Wan",
      englishName: "Green Curry",
      pronunciation: "gang kee-ow wahn",
      description: "Creamy coconut curry with green chili paste, Thai eggplant, bamboo shoots, and Thai basil, typically made with chicken or beef.",
      category: "main",
      keyTraits: ["coconut milk", "Thai basil", "green chili"],
      popularity: "tourist-classic",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Khao Pad",
      englishName: "Thai Fried Rice",
      pronunciation: "cow pahd",
      description: "Wok-fried jasmine rice with egg, onion, and choice of protein, seasoned with fish sauce and served with lime and cucumber.",
      category: "main",
      keyTraits: ["wok-fried", "jasmine rice", "fish sauce"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Massaman Curry",
      pronunciation: "mah-sah-mahn",
      description: "Rich, mild curry with Muslim influences, featuring potatoes, peanuts, and warm spices like cardamom, cinnamon, and star anise. Often made with beef or chicken.",
      category: "main",
      keyTraits: ["coconut", "warm spices", "peanuts"],
      regionalOrigin: "Southern Thailand",
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Pad Krapow Moo Saap",
      englishName: "Basil Pork",
      pronunciation: "pahd kra-pow moo sahp",
      description: "Stir-fried minced pork with holy basil, chilies, and garlic, served over rice with a fried egg. A beloved everyday lunch dish.",
      category: "main",
      keyTraits: ["holy basil", "garlic", "stir-fried"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Mango Sticky Rice",
      englishName: "Khao Niao Mamuang",
      description: "Sweet glutinous rice soaked in coconut cream, served with ripe mango slices. A beloved seasonal dessert during mango season.",
      category: "dessert",
      keyTraits: ["coconut cream", "glutinous rice", "sweet"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Thai Iced Tea",
      englishName: "Cha Yen",
      pronunciation: "chah yen",
      description: "Sweet, creamy orange-colored tea made with strongly brewed Ceylon tea, condensed milk, and evaporated milk, served over ice.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "iced",
      keyIngredients: ["Ceylon tea", "condensed milk", "evaporated milk", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isGlutenFree: true }
    },
    {
      name: "Thai Iced Coffee",
      englishName: "Oliang",
      pronunciation: "oh-lee-ahng",
      description: "Strong coffee brewed with roasted corn, soybeans, and sesame, sweetened with condensed milk and served over ice.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "iced",
      keyIngredients: ["coffee", "condensed milk", "roasted corn", "sesame"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isGlutenFree: true }
    },
    {
      name: "Nam Manao",
      englishName: "Fresh Lime Juice",
      pronunciation: "nahm ma-now",
      description: "Refreshing Thai limeade made with fresh lime juice, sugar, and a pinch of salt, served over ice.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "iced",
      keyIngredients: ["lime", "sugar", "salt"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Singha",
      pronunciation: "sing-ha",
      description: "Thailand's most famous beer, a full-bodied pale lager with a slightly bitter finish. Named after a mythical lion.",
      type: "alcoholic",
      category: "beer",
      servedHow: "cold",
      keyIngredients: ["barley malt", "hops"],
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Mekhong",
      pronunciation: "may-kohng",
      description: "Thai rum-whisky hybrid made from sugarcane and rice, often mixed with soda or used in cocktails. Named after the Mekong River.",
      type: "alcoholic",
      category: "spirit",
      keyIngredients: ["sugarcane", "rice"],
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
