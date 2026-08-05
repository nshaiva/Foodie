import type { Country } from '../types';

export const JP: Country = {
  id: "JP",
  name: "Japan",
  capital: "Tokyo",
  continent: "Asia",
  region: "East Asia",
  colorPalette: {
    primary: "#8b2942",      // Muted crimson (from flag)
    secondary: "#4a5568",    // Slate gray (zen aesthetic)
    accent: "#c9a86c",       // Gold (imperial)
    background: "#faf9f7",   // Off-white (washi paper)
    text: "#2d2d2d"          // Soft black
  },
  foodCulture: {
    overview: "Japanese cuisine (washoku) is UNESCO-recognized for its emphasis on seasonality, balance, and presentation. Food is approached with reverence—the phrase 'itadakimasu' (I humbly receive) spoken before meals reflects gratitude for the ingredients, the cook, and nature itself.\n\nAesthetics matter as much as taste. Dishes are composed with attention to color, texture, and arrangement. Seasonal ingredients (shun) are prized at their peak, and menus change throughout the year to reflect what's freshest.\n\nSpecialization runs deep in Japanese food culture. Chefs often dedicate entire careers to mastering a single dish—sushi, ramen, tempura, or soba. This pursuit of perfection (shokunin spirit) elevates even humble dishes to art forms.",
    mealStructure: "Traditional meals follow ichiju-sansai: one soup, three sides, plus rice and pickles. Breakfast might include rice, miso soup, grilled fish, and pickled vegetables. Lunch is often a set meal (teishoku) or bowl dish. Dinner is the largest meal.",
    diningCustoms: "Slurping noodles is acceptable and shows appreciation. Chopsticks should never be stuck upright in rice (funeral association). Many restaurants specialize in one dish. Saying 'gochisousama' after eating thanks the preparer.",
    historicalInfluences: "Buddhist influence led to centuries of minimal meat consumption, developing the vegetable, tofu, and seafood traditions. Chinese influence brought ramen, gyoza, and stir-frying. Post-WWII American influence created yoshoku (Western-Japanese fusion) dishes like tonkatsu curry."
  },
  cuisineProfile: {
    summary: "Japanese cuisine emphasizes clean, pure flavors that showcase ingredients at their peak, with umami as the defining taste underpinning most dishes.",
    flavorProfile: ["umami-rich", "subtle", "clean", "delicate", "savory-sweet", "oceanic"],
    flavorIntensity: {
      heat: 2,
      acidity: 3,
      sweetness: 5,
      umami: 10,
      aromatic: 5,
      smokeEarth: 4,
      interpretation: "Subtle umami depth with delicate aromatics and minimal heat, emphasizing pure ingredient flavors."
    },
    keyIngredients: ["short-grain rice", "soy sauce (shoyu)", "dashi (seaweed and bonito stock)", "miso", "mirin", "sake", "tofu", "seafood", "nori (seaweed)"],
    cookingTechniques: ["raw preparation (sashimi)", "grilling (yakitori, robata)", "deep-frying (tempura, tonkatsu)", "simmering (nimono)", "steaming"],
    cookingFlow: [
      { action: "Make dashi", emoji: "🍵" },
      { action: "Season", emoji: "🧂" },
      { action: "Cook", emoji: "♨️" },
      { action: "Plate", emoji: "🎨" },
      { action: "Garnish", emoji: "🌸" }
    ],
    spicesAndSeasonings: ["wasabi", "ginger", "shichimi togarashi", "sesame (seeds and oil)", "shiso", "mitsuba", "yuzu", "sancho pepper"],
    ingredientTiers: {
      foundation: [
        { name: "Soy Sauce", emoji: "🫘", description: "Shoyu · Umami base · Salty, fermented" },
        { name: "Dashi", emoji: "🍵", description: "Stock base · Umami foundation · Subtle, clean" },
        { name: "Miso", emoji: "🥣", description: "Fermented paste · Umami · Salty, complex" },
        { name: "Rice", emoji: "🍚", description: "Gohan · Base starch · Sticky, slightly sweet" }
      ],
      aromaticCore: [
        { name: "Wasabi", emoji: "🟢", description: "Japanese horseradish · Condiment · Sharp, floral" },
        { name: "Ginger", emoji: "🫚", description: "Shoga · Aromatic · Spicy, bright" },
        { name: "Shiso", emoji: "🌿", description: "Perilla leaf · Fresh herb · Minty, basil-like" },
        { name: "Nori", emoji: "🍙", description: "Dried seaweed · Wrapper · Ocean umami" },
        { name: "Yuzu", emoji: "🍋", description: "Japanese citrus · Aromatic · Floral, tart" }
      ],
      flavorBuilders: [
        { name: "Mirin", emoji: "🍶", description: "Sweet rice wine · Glaze · Adds sheen" },
        { name: "Sake", emoji: "🍶", description: "Rice wine · Cooking wine · Tenderizes" },
        { name: "Sesame", emoji: "🫛", description: "Goma · Seeds/oil · Nutty, rich" },
        { name: "Bonito", emoji: "🐟", description: "Katsuobushi · Dashi base · Smoky, umami" },
        { name: "Kombu", emoji: "🌊", description: "Kelp · Dashi base · Glutamate-rich" },
        { name: "Tofu", emoji: "🧈", description: "Soybean curd · Protein · Mild, silky" },
        { name: "Scallion", emoji: "🧅", description: "Negi · Garnish · Mild onion" }
      ],
      staples: [
        { name: "Short-grain Rice", emoji: "🍚", description: "Japonica · Base starch · Sticky, fragrant" },
        { name: "Udon", emoji: "🍜", description: "Wheat noodle · Thick, chewy" },
        { name: "Soba", emoji: "🍝", description: "Buckwheat noodle · Nutty, earthy" }
      ]
    }
  },
  popularDishes: [
    {
      name: "Sushi",
      pronunciation: "soo-shee",
      description: "Vinegared rice paired with fresh raw fish, seafood, or vegetables. Ranges from casual conveyor-belt shops to exclusive omakase counters where chefs serve piece by piece.",
      category: "main",
      keyTraits: ["vinegared rice", "raw fish", "nori"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Ramen",
      pronunciation: "rah-men",
      description: "Wheat noodles in rich broth—tonkotsu (pork bone), shoyu (soy), miso, or shio (salt)—topped with chashu pork, eggs, nori, and scallions. Regional styles vary dramatically.",
      category: "soup",
      keyTraits: ["rich broth", "wheat noodles", "chashu"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Tempura",
      pronunciation: "tem-poo-rah",
      description: "Lightly battered and deep-fried vegetables and seafood, served with tentsuyu dipping sauce. The batter is kept ice-cold for maximum crispness.",
      category: "main",
      keyTraits: ["light batter", "deep-fried", "dashi"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Tonkatsu",
      pronunciation: "tohn-kah-tsoo",
      description: "Breaded and deep-fried pork cutlet, served with shredded cabbage, rice, and tangy tonkatsu sauce. A comfort food staple.",
      category: "main",
      keyTraits: ["panko-breaded", "pork cutlet", "tonkatsu sauce"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true }
    },
    {
      name: "Okonomiyaki",
      englishName: "Savory Pancake",
      pronunciation: "oh-koh-noh-mee-yah-kee",
      description: "Cabbage-based savory pancake with various fillings, topped with mayo, okonomiyaki sauce, bonito flakes, and seaweed. Osaka and Hiroshima have distinct styles.",
      category: "main",
      keyTraits: ["cabbage", "savory pancake", "bonito flakes"],
      regionalOrigin: "Osaka / Hiroshima",
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true }
    },
    {
      name: "Yakitori",
      pronunciation: "yah-kee-toh-ree",
      description: "Skewered and grilled chicken pieces—thigh, breast, skin, organs—seasoned with salt or sweet tare sauce. Quintessential izakaya (pub) food.",
      category: "appetizer",
      keyTraits: ["charcoal-grilled", "tare sauce", "skewered"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Miso Soup",
      pronunciation: "mee-soh",
      description: "Dashi broth with dissolved miso paste, tofu, wakame seaweed, and scallions. Served with nearly every traditional meal.",
      category: "soup",
      keyTraits: ["dashi", "fermented miso", "tofu"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Matcha",
      pronunciation: "mah-chah",
      description: "Powdered green tea whisked into hot water, central to Japanese tea ceremony. Also used in desserts, lattes, and sweets.",
      category: "beverage",
      keyTraits: ["green tea", "ceremonial", "umami"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Sake",
      englishName: "Rice Wine",
      pronunciation: "sah-keh",
      description: "Fermented rice beverage central to Japanese culture. Ranges from dry to sweet, served cold, warm, or hot depending on the style.",
      type: "alcoholic",
      category: "wine",
      keyIngredients: ["rice", "koji", "water"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Green Tea",
      englishName: "Ocha",
      pronunciation: "oh-chah",
      description: "Everyday Japanese green tea served with meals. Sencha is most common, with a grassy, slightly astringent flavor.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["green tea leaves"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ramune",
      pronunciation: "rah-moo-neh",
      description: "Iconic Japanese soda in a distinctive marble-sealed bottle. Lemon-lime flavor with a nostalgic, carnival association.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["carbonated water", "sugar", "citrus flavor"],
      isTraditional: false,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Shochu",
      pronunciation: "shoh-choo",
      description: "Distilled spirit made from barley, sweet potato, or rice. Lower proof than whisky, often drunk on the rocks or with water.",
      type: "alcoholic",
      category: "spirit",
      keyIngredients: ["barley", "sweet potato", "rice"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Calpis",
      englishName: "Calpico",
      pronunciation: "kah-ru-pee-su",
      description: "Milky, slightly sweet and tangy soft drink made from fermented milk. Often diluted with water or soda.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["fermented milk", "sugar"],
      isTraditional: false,
      dietary: { isGlutenFree: true }
    }
  ]
};
