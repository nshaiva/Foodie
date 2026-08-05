import type { Country } from '../types';

export const AF: Country = {
  id: "AF",
  name: "Afghanistan",
  capital: "Kabul",
  continent: "Asia",
  region: "Central Asia",
  colorPalette: {
    primary: "#000000",      // Black (from flag)
    secondary: "#D32011",    // Red (from flag)
    accent: "#c49a6c",       // Warm flatbread brown
    background: "#f9f7f3",   // Cream white
    text: "#1a1a1a"          // Near black
  },
  foodCulture: {
    overview: "Afghan cuisine sits at the crossroads of Central Asia, the Middle East, and the Indian subcontinent, blending influences from Persian, Mongol, and Indian culinary traditions. Hospitality is a sacred duty—the Pashtunwali code demands that guests be fed generously, even at great personal cost.\n\nMeals are communal, eaten while seated on floor cushions around a shared cloth (dastarkhan). Food is eaten with the right hand, using flatbread to scoop dishes. Lamb and rice form the backbone of the cuisine, with an emphasis on simple, nourishing preparations that highlight quality ingredients.\n\nUnlike neighboring cuisines, Afghan food is relatively mild, relying on subtle spicing and the natural flavors of meat and vegetables. Dried fruits and nuts, reflecting Afghanistan's role on the ancient Silk Road, appear in both savory dishes and desserts.",
    mealStructure: "Breakfast is simple—bread with tea, perhaps eggs or cream. Lunch is the main meal, often rice-based. Dinner may be lighter. Tea is served constantly, accompanying every meal and social interaction.",
    diningCustoms: "Elders eat first. Guests receive the choicest portions. It's impolite to refuse food or leave any on your plate. Multiple rounds of tea are expected at any gathering.",
    historicalInfluences: "Silk Road trade brought dried fruits, nuts, and spices. Persian influence appears in pilafs and kebabs. Mongol invasions introduced dumplings (mantu). Indian subcontinental influence shows in some spicing. The cuisine remains largely unchanged over centuries."
  },
  cuisineProfile: {
    summary: "Afghan cuisine features fragrant rice pilafs, tender grilled meats, and subtle spicing, with Persian and Central Asian influences emphasized through dried fruits and nuts.",
    flavorProfile: ["mild", "aromatic", "meaty", "subtly sweet", "herbaceous", "earthy"],
    flavorIntensity: {
      heat: 3,
      acidity: 4,
      sweetness: 5,
      umami: 6,
      aromatic: 7,
      smokeEarth: 5,
      interpretation: "Gentle, aromatic flavors with subtle sweetness from dried fruits and mild spicing that lets quality ingredients shine."
    },
    keyIngredients: ["lamb", "basmati rice", "dried fruits", "nuts", "yogurt", "flatbread", "onions", "tomatoes"],
    cookingTechniques: ["pilaf (palao)", "grilling (kebab)", "braising", "steaming dumplings", "slow-cooking"],
    cookingFlow: [
      { action: "Brown onions", emoji: "🧅" },
      { action: "Add meat", emoji: "🍖" },
      { action: "Layer rice", emoji: "🍚" },
      { action: "Steam", emoji: "♨️" },
      { action: "Add fruit", emoji: "🍇" }
    ],
    spicesAndSeasonings: ["cumin", "coriander", "cardamom", "cinnamon", "black pepper", "turmeric", "dried mint", "dill"],
    ingredientTiers: {
      foundation: [
        { name: "Lamb", emoji: "🍖", description: "Gosht · Primary protein · Rich, tender" },
        { name: "Basmati Rice", emoji: "🍚", description: "Berenj · Pilaf base · Fragrant, long-grain" },
        { name: "Onions", emoji: "🧅", description: "Piaz · Flavor base · Caramelized" },
        { name: "Yogurt", emoji: "🥛", description: "Mast · Essential · Tangy, cooling" }
      ],
      aromaticCore: [
        { name: "Cardamom", emoji: "🌿", description: "Hel · Key spice · Floral, warm" },
        { name: "Cumin", emoji: "🫛", description: "Zira · Essential · Earthy" },
        { name: "Coriander", emoji: "🌿", description: "Gashneez · Fresh & dried · Citrusy" },
        { name: "Cinnamon", emoji: "🪵", description: "Darchin · Sweet warmth · Pilaf spice" }
      ],
      flavorBuilders: [
        { name: "Raisins", emoji: "🍇", description: "Kishmish · Sweetness · In pilafs" },
        { name: "Almonds", emoji: "🥜", description: "Badam · Garnish · Crunchy, rich" },
        { name: "Carrots", emoji: "🥕", description: "Zardak · Qabuli topping · Sweet" },
        { name: "Dried Apricots", emoji: "🍑", description: "Zardalu · Tart-sweet · Silk Road" },
        { name: "Tomatoes", emoji: "🍅", description: "Badenjan rumi · Sauce base · Fresh" }
      ],
      staples: [
        { name: "Naan", emoji: "🫓", description: "Flatbread · Essential · Fresh daily" },
        { name: "Chutney", emoji: "🫙", description: "Sauce · Cilantro-based · Fresh, tangy" },
        { name: "Chickpeas", emoji: "🫘", description: "Nakhod · Protein · Earthy" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Kabul & Central",
      description: "The capital's cuisine represents refined Afghan cooking, with elaborate pilafs, refined kebabs, and Persian-influenced dishes. Qabuli Palao, the national dish, originated here. Urban influences have brought some international touches while maintaining tradition.",
      signatureDishes: ["Qabuli Palao", "Mantu", "Ashak", "Bolani"],
      keyIngredients: ["lamb", "rice", "carrots", "raisins", "dill"],
      distinctiveTraits: ["Refined preparations", "Elaborate pilafs", "Persian influence"]
    },
    {
      name: "North (Mazar-i-Sharif)",
      description: "Northern cuisine shows Uzbek and Turkmen influences. Buzkashi players traditionally feast on hearty dishes. Dairy products, especially qurut (dried yogurt balls), feature prominently. Lamb preparation is often simpler and more rustic.",
      signatureDishes: ["Quruti", "Mastawa", "Chopan Kebab"],
      keyIngredients: ["lamb", "dried yogurt", "bread", "onions"],
      distinctiveTraits: ["Central Asian influence", "Dairy-heavy", "Rustic simplicity"]
    },
    {
      name: "East & South (Pashtun Regions)",
      description: "Pashtun cuisine emphasizes meat and bread with minimal complexity. Chapli kebab and tikka showcase quality meat with simple seasoning. Hospitality traditions are especially strong. Some dishes share DNA with Pakistani Pashtun cooking.",
      signatureDishes: ["Chapli Kebab", "Tikka", "Shinwari Karahi"],
      keyIngredients: ["beef", "lamb", "tomatoes", "coriander"],
      distinctiveTraits: ["Meat-focused", "Simple spicing", "Shared Pashtun identity"]
    },
    {
      name: "West (Herat)",
      description: "Herat's cuisine shows the strongest Persian influence, befitting this historic Silk Road city. Dishes tend toward the refined and subtle. Saffron appears more frequently. Poetry and food culture intertwine in this cultured region.",
      signatureDishes: ["Dampukht", "Herati Pilaf", "Sheer Khurma"],
      keyIngredients: ["saffron", "lamb", "dried fruits", "cream"],
      distinctiveTraits: ["Persian refinement", "Subtle flavors", "Silk Road heritage"]
    }
  ],
  popularDishes: [
    {
      name: "Qabuli Palao",
      englishName: "Kabul-style Rice",
      pronunciation: "kah-boo-lee pah-lao",
      description: "Afghanistan's national dish: fragrant rice with lamb, topped with caramelized carrots, raisins, and almonds. The name means 'Kabul-style.' Reserved for special occasions and honored guests.",
      category: "main",
      keyTraits: ["fragrant rice", "carrots", "raisins"],
      regionalOrigin: "Kabul",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Mantu",
      pronunciation: "mahn-too",
      description: "Steamed dumplings filled with spiced lamb and onions, topped with yogurt-garlic sauce, tomato-meat sauce, and dried mint. A celebratory dish requiring hours of preparation.",
      category: "main",
      keyTraits: ["dumplings", "yogurt sauce", "lamb"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true }
    },
    {
      name: "Ashak",
      pronunciation: "ah-shahk",
      description: "Leek-filled dumplings topped with meat sauce and yogurt-garlic sauce. Similar to mantu but with vegetable filling. Often served alongside mantu at gatherings.",
      category: "main",
      keyTraits: ["dumplings", "leeks", "yogurt"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isHalal: true }
    },
    {
      name: "Bolani",
      pronunciation: "boh-lah-nee",
      description: "Thin, pan-fried flatbread stuffed with potatoes, leeks, or pumpkin. Served with yogurt or chutney. Popular street food and home snack.",
      category: "appetizer",
      keyTraits: ["stuffed bread", "pan-fried", "potato"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isHalal: true }
    },
    {
      name: "Kabuli Burger",
      englishName: "Afghan Lamb Burger",
      pronunciation: "kah-boo-lee",
      description: "Spiced lamb patty in naan bread with fresh vegetables, chutney, and yogurt sauce. Afghanistan's popular street food take on the burger.",
      category: "street-food",
      keyTraits: ["lamb", "naan", "chutney"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isHalal: true }
    },
    {
      name: "Chopan Kebab",
      englishName: "Shepherd's Kebab",
      pronunciation: "cho-pahn keh-bahb",
      description: "Lamb chops marinated in salt and fat, grilled over charcoal. Named after shepherds (chopan) who would grill lamb over open fires. Simple, highlighting meat quality.",
      category: "main",
      keyTraits: ["lamb chops", "charcoal", "simple"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Korma",
      pronunciation: "kor-mah",
      description: "Tender braised meat in a mild, aromatic sauce of onions, yogurt, and whole spices. Afghan korma is gentler than Indian versions, emphasizing subtle flavors.",
      category: "main",
      keyTraits: ["braised", "mild", "aromatic"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Aush",
      pronunciation: "oosh",
      description: "Hearty noodle soup with beans, chickpeas, yogurt, and meat sauce, topped with dried mint. A warming winter dish, especially popular during Nowruz (New Year).",
      category: "soup",
      keyTraits: ["noodles", "beans", "yogurt"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isHalal: true }
    },
    {
      name: "Sheer Khurma",
      englishName: "Milk with Dates",
      pronunciation: "sheer khoor-mah",
      description: "Creamy vermicelli pudding with dates, nuts, and cardamom, cooked in milk. A festive dessert served during Eid celebrations.",
      category: "dessert",
      keyTraits: ["vermicelli", "dates", "cardamom"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isHalal: true }
    },
    {
      name: "Firni",
      pronunciation: "fir-nee",
      description: "Silky ground rice pudding flavored with cardamom and rose water, garnished with pistachios. Traditionally served chilled in shallow clay bowls.",
      category: "dessert",
      keyTraits: ["rice pudding", "cardamom", "rose water"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isHalal: true }
    }
  ],
  popularBeverages: [
    {
      name: "Kahwah",
      englishName: "Green Tea",
      pronunciation: "kah-wah",
      description: "Delicate green tea with cardamom, sometimes with sugar or honey. Served constantly throughout the day and at every social gathering.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["green tea", "cardamom", "sugar"],
      isTraditional: true,
      dietary: { isVegan: true, isGlutenFree: true }
    },
    {
      name: "Sheer Chai",
      englishName: "Milk Tea",
      pronunciation: "sheer chai",
      description: "Sweet, milky tea, richer than kahwah. Often served to guests as a sign of special hospitality.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["black tea", "milk", "sugar", "cardamom"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Doogh",
      pronunciation: "doog",
      description: "Savory yogurt drink with salt and dried mint. Refreshing accompaniment to rich rice dishes and kebabs.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "salt", "dried mint"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Sharbat",
      englishName: "Sweet Drink",
      pronunciation: "shar-baht",
      description: "Sweet flavored drink made with fruit syrups, rose water, or other flavorings. Popular at weddings and celebrations.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["fruit syrup", "water", "rose water"],
      isTraditional: true,
      dietary: { isVegan: true, isGlutenFree: true }
    },
    {
      name: "Fresh Pomegranate Juice",
      englishName: "Aab-e-Anar",
      pronunciation: "ahb-eh ah-nahr",
      description: "Freshly pressed pomegranate juice, a specialty in autumn when pomegranates are in season. Afghanistan is renowned for its pomegranates.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["fresh pomegranate"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isGlutenFree: true }
    }
  ]
};
