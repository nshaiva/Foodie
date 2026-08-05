import type { Country } from '../types';

export const VN: Country = {
  id: "VN",
  name: "Vietnam",
  capital: "Hanoi",
  continent: "Asia",
  region: "Southeast Asia",
  colorPalette: {
    primary: "#96382e",      // Muted lacquer red (from flag)
    secondary: "#5c6e4f",    // Herb green (fresh garnish plates)
    accent: "#c9a05a",       // Muted gold (from flag star)
    background: "#f9f6ef",   // Rice-paper cream
    text: "#3d2723"          // Dark umber
  },
  foodCulture: {
    overview: "Vietnamese cuisine is built on freshness and contrast: hot broth against cool herbs, rich grilled meat against crisp raw vegetables, and the ever-present dipping sauce that lets each diner tune a dish to their own taste. A plate of raw greens—mint, perilla, cilantro, lettuce—arrives with nearly every meal, and wrapping, dipping, and assembling at the table is half the pleasure of eating.\n\nDaily life happens around food at street level. Mornings begin at pho stalls where regulars perch on low plastic stools; mid-morning brings dense, chewy banh mi from cart vendors; and evenings fill sidewalks with charcoal smoke from grilled pork and the clink of iced coffee glasses. Many of the country's most respected cooks run one-dish operations, perfecting a single recipe over decades.\n\nUnderlying it all is nuoc mam—fish sauce—which functions less as a condiment than as the cuisine's backbone. Diluted with lime, sugar, garlic, and chili into nuoc cham, it appears at nearly every table, and a cook's skill is often judged by how well they balance it. Vietnamese food is rarely aggressive; it aims for lightness, clarity, and a layered finish where herbs do as much work as heat.",
    mealStructure: "Meals center on com (rice) served with three or four shared dishes: a canh (light soup), a braised or caramelized protein (kho), stir-fried vegetables, and dipping sauce. Breakfast is typically a standalone noodle soup or sticky rice (xoi) eaten out; lunch and dinner at home follow the rice-and-shared-dishes pattern.",
    diningCustoms: "Chopsticks are the primary utensil, with a spoon for broth. Each diner has a small bowl of rice, taking food from communal plates—politeness means serving elders first and turning shared serving spoons outward. Fresh herb platters and nuoc cham are passed constantly; customizing your bowl with herbs, lime, and chili is expected, not optional.",
    historicalInfluences: "A thousand years of Chinese rule brought chopsticks, noodles, soy sauce, and stir-frying to the north. French colonization left baguettes, pâté, coffee, and butter—reborn as banh mi and ca phe sua da. Khmer and Cham traditions shaped the south's use of coconut, curry, and sweetness, while the imperial court at Hue developed an intricate, small-plate refinement all its own."
  },
  cuisineProfile: {
    summary: "Vietnamese cuisine layers fresh raw herbs, clear savory broths, and fish-sauce depth into food that is light, bright, and aromatic—balanced at the table by each diner rather than only in the kitchen.",
    flavorProfile: ["savory-fishy (mặn)", "sour (chua)", "gently sweet (ngọt)", "herbaceous", "fresh & raw", "umami-deep"],
    flavorIntensity: {
      heat: 4,
      acidity: 7,
      sweetness: 5,
      umami: 9,
      aromatic: 8,
      smokeEarth: 4,
      interpretation: "Deep fish-sauce umami and bright lime-herb freshness dominate, with heat kept modest and left to the diner's chili."
    },
    keyIngredients: ["fish sauce (nước mắm)", "rice noodles", "rice paper", "fresh herbs (mint, perilla, cilantro)", "lime", "shallots", "pork", "shrimp paste (mắm tôm)"],
    cookingTechniques: ["simmering clear broths (nước dùng)", "charcoal grilling (nướng)", "caramelizing in clay pots (kho)", "steaming rice-flour batters", "fresh rolling and wrapping", "quick stir-frying (xào)"],
    cookingFlow: [
      { action: "Char aromatics", emoji: "🔥" },
      { action: "Simmer broth", emoji: "🍲" },
      { action: "Skim clear", emoji: "🥄" },
      { action: "Season nuoc mam", emoji: "🐟" },
      { action: "Assemble bowl", emoji: "🍜" },
      { action: "Pile herbs", emoji: "🌿" }
    ],
    spicesAndSeasonings: ["fish sauce", "shrimp paste (mắm tôm)", "black pepper (Phú Quốc)", "star anise", "cinnamon (cassia)", "ginger", "lemongrass", "annatto", "fried shallots", "scallion oil", "chili (ớt)", "caramel sauce (nước màu)"],
    ingredientTiers: {
      foundation: [
        { name: "Fish Sauce", emoji: "🐟", description: "Nước mắm · Umami backbone · Anchovy, aged" },
        { name: "Rice", emoji: "🍚", description: "Gạo · Staple in every form · Neutral canvas" },
        { name: "Fresh Herbs", emoji: "🌿", description: "Rau thơm · Raw garnish platter · Cooling, fragrant" },
        { name: "Lime", emoji: "🍋", description: "Chanh · Acid balance · Sharp, bright" },
        { name: "Chili", emoji: "🌶️", description: "Ớt · Table heat · Diner-controlled" }
      ],
      aromaticCore: [
        { name: "Lemongrass", emoji: "🌾", description: "Sả · Marinade aromatic · Citrus-pine" },
        { name: "Ginger", emoji: "🫚", description: "Gừng · Broth aromatic · Warm, charred" },
        { name: "Star Anise", emoji: "⭐", description: "Hồi · Pho spice · Sweet licorice" },
        { name: "Cinnamon", emoji: "🪵", description: "Quế · Pho spice · Warm, woody" },
        { name: "Vietnamese Mint", emoji: "🍃", description: "Rau răm · Peppery herb · Spicy-cilantro" },
        { name: "Perilla", emoji: "🌱", description: "Tía tô · Purple-backed leaf · Minty-anise" },
        { name: "Thai Basil", emoji: "🌿", description: "Húng quế · Bowl garnish · Anise-fresh" }
      ],
      flavorBuilders: [
        { name: "Shallots", emoji: "🧅", description: "Hành tím · Fried or raw · Sweet, crisp" },
        { name: "Garlic", emoji: "🧄", description: "Tỏi · Sauce & stir-fry base · Pungent" },
        { name: "Shrimp Paste", emoji: "🦐", description: "Mắm tôm · Fermented dip · Intense, funky" },
        { name: "Caramel Sauce", emoji: "🍯", description: "Nước màu · Kho braise base · Bittersweet" },
        { name: "Scallions", emoji: "🥬", description: "Hành lá · Oil & garnish · Mild allium" },
        { name: "Black Pepper", emoji: "⚫", description: "Tiêu · Phú Quốc famed · Sharp, floral" },
        { name: "Annatto", emoji: "🔴", description: "Hạt điều màu · Coloring oil · Earthy red" },
        { name: "Coconut", emoji: "🥥", description: "Dừa · Southern richness · Water & cream" },
        { name: "Tamarind", emoji: "🫘", description: "Me · Southern souring · Fruity tang" },
        { name: "Peanuts", emoji: "🥜", description: "Đậu phộng · Crushed topping · Toasty crunch" }
      ],
      staples: [
        { name: "Rice Noodles", emoji: "🍜", description: "Bún & phở · Daily starch · Soft, neutral" },
        { name: "Rice Paper", emoji: "🥟", description: "Bánh tráng · Wrapper · Chewy when wet" },
        { name: "Baguette", emoji: "🥖", description: "Bánh mì · French legacy · Airy, crackly" },
        { name: "Pork", emoji: "🐖", description: "Thịt heo · Default protein · Grilled or braised" },
        { name: "Tofu", emoji: "🧈", description: "Đậu hũ · Buddhist staple · Fried, silken" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Northern Vietnam",
      description: "Hanoi and the Red River Delta form the cuisine's classical heartland, where Chinese influence runs deepest and restraint is a virtue. Flavors are subtle and savory—less sugar, less chili, more black pepper—letting clear broths and quality ingredients speak. Pho was born here, and Hanoians defend its austere, unsweetened northern form fiercely.",
      signatureDishes: ["Phở Bò", "Bún Chả", "Chả Cá Lã Vọng", "Bánh Cuốn"],
      keyIngredients: ["rice noodles", "dill", "black pepper", "vinegar", "freshwater fish"],
      distinctiveTraits: ["Restrained, savory seasoning", "Clear unsweetened broths", "Chinese-influenced techniques", "Dill used as a main herb"]
    },
    {
      name: "Central Vietnam",
      description: "The narrow central coast around Hue and Da Nang produces Vietnam's spiciest and most intricate food. Hue's imperial court legacy shows in elaborate small plates and delicate rice-flour dumplings, while the region's fondness for chili, lemongrass, and fermented shrimp gives dishes like bun bo Hue a fiery, brick-red intensity found nowhere else in the country.",
      signatureDishes: ["Bún Bò Huế", "Bánh Bèo", "Bánh Khoái", "Nem Lụi"],
      keyIngredients: ["lemongrass", "chili", "fermented shrimp paste", "annatto oil", "rice flour"],
      distinctiveTraits: ["Spiciest region", "Imperial small-plate refinement", "Bold fermented seasonings", "Rice-flour dumpling artistry"]
    },
    {
      name: "Quang Nam & Hoi An",
      description: "The old trading port of Hoi An and surrounding Quang Nam province keep a distinct culinary identity shaped by centuries of Chinese and Japanese merchants. Dishes are drier and chewier than elsewhere—noodles served with just a ladle of intense broth—and some, like cao lau, are so tied to local water and ash-treated noodles that they resist replication anywhere else.",
      signatureDishes: ["Cao Lầu", "Mì Quảng", "Cơm Gà Hội An", "Bánh Vạc (White Rose)"],
      keyIngredients: ["turmeric", "ash-lye noodles", "rice crackers", "peanuts", "pork crackling"],
      distinctiveTraits: ["Merchant-port fusion heritage", "Scant-broth noodle style", "Turmeric-tinted dishes", "Hyper-local specialties"]
    },
    {
      name: "Southern Vietnam",
      description: "Ho Chi Minh City and the southeast cook with abundance and sweetness—more sugar, more coconut, more variety piled onto every plate. Khmer, Chinese, and French threads weave together in a street-food scene that never sleeps. Broths lean sweet, herb platters grow enormous, and broken-rice plates with grilled pork fuel the city from dawn.",
      signatureDishes: ["Cơm Tấm", "Bánh Xèo", "Hủ Tiếu", "Bò Kho"],
      keyIngredients: ["coconut water", "sugar", "tamarind", "curry spices", "abundant herbs"],
      distinctiveTraits: ["Sweeter seasoning", "Khmer and French influences", "Coconut-forward", "Round-the-clock street food"]
    },
    {
      name: "Mekong Delta",
      description: "Vietnam's rice bowl and orchard, the delta lives on its waterways: floating markets, fish farmed in flooded paddies, and fruit in tropical excess. Cooking is rustic and generous—sour soups sharpened with tamarind and pineapple, whole fish braised in clay pots, and fermented fish (mắm) traditions shared with neighboring Cambodia.",
      signatureDishes: ["Canh Chua Cá", "Cá Kho Tộ", "Lẩu Mắm", "Bún Nước Lèo"],
      keyIngredients: ["elephant ear fish", "tamarind", "pineapple", "fermented fish (mắm)", "elephant ear stem (bạc hà)"],
      distinctiveTraits: ["River fish focus", "Sweet-sour soup tradition", "Clay-pot caramel braises", "Fermented fish culture"]
    }
  ],
  popularDishes: [
    {
      name: "Phở Bò",
      englishName: "Beef Noodle Soup",
      pronunciation: "fuh baw",
      description: "Flat rice noodles in a crystal-clear beef broth simmered for hours with charred ginger, onion, star anise, and cinnamon, topped with thin-sliced beef and scallions. The national dish, eaten most often for breakfast.",
      category: "soup",
      regionalOrigin: "Northern Vietnam (Hanoi/Nam Định)",
      keyTraits: ["clear broth", "star anise", "rice noodles"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bánh Mì",
      englishName: "Vietnamese Baguette Sandwich",
      pronunciation: "bahn mee",
      description: "A crackly, airy baguette stuffed with pâté, cold cuts or grilled pork, pickled daikon and carrot, cucumber, cilantro, and chili. French colonial bread transformed into Vietnam's definitive street sandwich.",
      category: "street-food",
      keyTraits: ["baguette", "pickled vegetables", "pâté"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Bún Chả",
      englishName: "Grilled Pork with Noodles",
      pronunciation: "boon chah",
      description: "Charcoal-grilled pork patties and belly slices served floating in a warm, lightly sweet fish-sauce dipping broth, with cold rice vermicelli and a mountain of fresh herbs alongside. A Hanoi lunchtime institution.",
      category: "main",
      regionalOrigin: "Northern Vietnam (Hanoi)",
      keyTraits: ["charcoal-grilled", "fish sauce", "fresh herbs"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Gỏi Cuốn",
      englishName: "Fresh Spring Rolls",
      pronunciation: "goy koon",
      description: "Translucent rice-paper rolls of poached shrimp, pork, vermicelli, lettuce, and mint, served cool with a peanut-hoisin dipping sauce. Light, fresh, and assembled rather than cooked.",
      category: "appetizer",
      regionalOrigin: "Southern Vietnam",
      keyTraits: ["rice paper", "fresh herbs", "peanut sauce"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Bún Bò Huế",
      englishName: "Hue Spicy Beef Noodle Soup",
      pronunciation: "boon baw hway",
      description: "Thick round rice noodles in a fiery lemongrass-beef broth tinted red with annatto and deepened with fermented shrimp paste, loaded with beef shank and pork. Hue's answer to pho—bolder in every direction.",
      category: "soup",
      regionalOrigin: "Central Vietnam (Huế)",
      keyTraits: ["lemongrass", "spicy broth", "shrimp paste"],
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bánh Xèo",
      englishName: "Sizzling Crepe",
      pronunciation: "bahn say-oh",
      description: "A crackling turmeric-rice crepe folded over shrimp, pork, and bean sprouts, torn into pieces, wrapped in lettuce and herbs, and dunked in nuoc cham. Named for the sizzle of batter hitting the hot pan.",
      category: "street-food",
      regionalOrigin: "Southern & Central Vietnam",
      keyTraits: ["turmeric", "crispy", "wrap & dip"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Cơm Tấm",
      englishName: "Broken Rice with Grilled Pork",
      pronunciation: "kum tahm",
      description: "Fractured rice grains—once the cheap leftovers of milling—topped with a lemongrass-marinated grilled pork chop, shredded pork skin, a steamed egg cake, and scallion oil, with sweet nuoc cham poured over. Saigon's signature plate.",
      category: "main",
      regionalOrigin: "Southern Vietnam (Ho Chi Minh City)",
      keyTraits: ["grilled pork chop", "broken rice", "scallion oil"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Cao Lầu",
      englishName: "Hoi An Noodles",
      pronunciation: "cow lao",
      description: "Thick, chewy noodles treated with ash lye—legend says only Hoi An well water works—tossed with char siu-style pork, crisp croutons, greens, and a few spoonfuls of intense broth. A dish that exists fully in only one town.",
      category: "main",
      regionalOrigin: "Quang Nam & Hoi An",
      keyTraits: ["chewy noodles", "char siu pork", "scant broth"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true }
    },
    {
      name: "Cá Kho Tộ",
      englishName: "Clay Pot Caramelized Fish",
      pronunciation: "kah kaw toh",
      description: "Catfish steaks braised in a clay pot with bittersweet caramel sauce, fish sauce, and black pepper until glossy and deeply savory. A homestyle staple of the Mekong Delta, always eaten with plain rice.",
      category: "main",
      regionalOrigin: "Mekong Delta",
      keyTraits: ["caramel braise", "clay pot", "black pepper"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chè Ba Màu",
      englishName: "Three-Color Dessert",
      pronunciation: "cheh bah mao",
      description: "A layered glass of sweetened mung bean paste, red beans, and pandan jelly under shaved ice and coconut milk—part drink, part dessert, entirely refreshing in the tropical heat.",
      category: "dessert",
      regionalOrigin: "Southern Vietnam",
      keyTraits: ["coconut milk", "layered", "shaved ice"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Cà Phê Sữa Đá",
      englishName: "Vietnamese Iced Milk Coffee",
      pronunciation: "kah feh sooh-ah dah",
      description: "Dark robusta coffee dripped slowly through a metal phin filter onto sweetened condensed milk, stirred and poured over ice. Strong, sweet, and the engine of Vietnamese café culture.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "iced",
      keyIngredients: ["robusta coffee", "condensed milk", "ice"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isGlutenFree: true }
    },
    {
      name: "Trà Đá",
      englishName: "Iced Tea",
      pronunciation: "chah dah",
      description: "Weak, unsweetened green tea over ice, poured freely and often free at eateries across the country. The default table drink and a fixture of sidewalk tea stalls.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "iced",
      keyIngredients: ["green tea", "ice"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Nước Mía",
      englishName: "Sugarcane Juice",
      pronunciation: "nook mee-ah",
      description: "Fresh sugarcane pressed through roadside crushers, often with a squeeze of kumquat to cut the sweetness, served over ice. A ubiquitous street refresher in the south.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Southern Vietnam",
      servedHow: "iced",
      keyIngredients: ["sugarcane", "kumquat", "ice"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bia Hơi",
      englishName: "Fresh Draft Beer",
      pronunciation: "bee-ah huh-ee",
      description: "Light, unpasteurized draft lager brewed daily and drunk the same day on plastic stools at street corners, especially in Hanoi. Among the cheapest beer in the world and a social ritual in itself.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "Northern Vietnam (Hanoi)",
      servedHow: "cold",
      keyIngredients: ["barley malt", "rice", "hops"],
      isTraditional: true,
      isStreetDrink: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Rượu Nếp",
      englishName: "Sticky Rice Wine",
      pronunciation: "zoo-oh nep",
      description: "Traditional glutinous-rice liquor fermented with yeast cakes, ranging from milky village brews to strong clear spirits, poured at weddings, festivals, and highland gatherings.",
      type: "alcoholic",
      category: "spirit",
      keyIngredients: ["glutinous rice", "yeast starter"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
