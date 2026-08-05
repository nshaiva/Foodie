import type { Country } from '../types';

export const ID: Country = {
  id: "ID",
  name: "Indonesia",
  capital: "Jakarta",
  continent: "Asia",
  region: "Southeast Asia",
  colorPalette: {
    primary: "#9e3b34",      // Muted garnet red (from flag)
    secondary: "#3d5147",    // Deep batik green
    accent: "#c9954f",       // Turmeric gold
    background: "#faf6ef",   // Warm ivory
    text: "#3a2e28"          // Dark teak brown
  },
  foodCulture: {
    overview: "Indonesian food is the cuisine of seventeen thousand islands, and no single table can hold it all. What unites Javanese sweetness, Minangkabau fire, and Balinese ceremony is a shared grammar: rice at the center, a constellation of side dishes around it, and sambal—the chili relish made fresh in a stone mortar—as the non-negotiable companion. Many households keep a jar of fried shallots and a block of shrimp paste the way others keep salt and pepper.\n\nThe warung, a small family-run eatery, is the beating heart of everyday eating. In a Padang restaurant, dozens of pre-cooked dishes arrive stacked on small plates the moment you sit down; you pay only for what you touch. Elsewhere, kaki lima street carts announce themselves by sound—the wooden knock of the bakso seller, the ring of the sate vendor's bell—turning the evening streetscape into an edible map.\n\nFood in Indonesia is also devotional. In Bali, women weave banana-leaf offerings filled with rice before anyone eats; in Java, the slametan communal feast marks births, harvests, and moves with a cone of yellow turmeric rice called tumpeng. Because the country holds the world's largest Muslim population alongside Hindu, Christian, and animist communities, what appears on the plate—and when—often traces the spiritual calendar as much as the seasons.",
    mealStructure: "Rice (nasi) anchors nearly every meal—so much so that many Indonesians say they haven't eaten until they've had rice. There is little ceremony of courses: dishes are cooked in the morning and eaten at room temperature through the day. Breakfast is often savory—nasi uduk, bubur ayam (chicken rice porridge), or leftover rice fried into nasi goreng. Dinner tends to be the social meal, frequently eaten out at warungs and street carts.",
    diningCustoms: "Eating with the right hand is traditional and still common, especially with rice and fried dishes; a spoon and fork (spoon in the right hand) is the everyday standard. Food is served all at once and shared. Sambal is added by each diner to taste, and it is perfectly polite to linger—warungs double as places to sit, talk, and drink sweet tea for hours.",
    historicalInfluences: "Indonesia was the original Spice Islands—nutmeg, cloves, and mace grew nowhere else on earth, drawing Indian, Arab, Chinese, Portuguese, and Dutch traders across centuries. Indian traders brought curry-like braises and turmeric; Chinese migrants brought noodles, soy sauce, and the wok (mie, bakso, and cap cai are their legacy); Arab traders shaped goat dishes and the halal table; and the Dutch colonial era gave rise to the rijsttafel banquet and left bread and cakes behind. Kecap manis—soy sauce sweetened with palm sugar—is the emblem of this synthesis: a Chinese ingredient remade in an entirely Indonesian voice."
  },
  cuisineProfile: {
    summary: "Indonesian cuisine layers deep, slow-built savoriness—coconut milk, palm sugar, shrimp paste, and sweet soy—under fresh sambal heat, with grilling over coconut charcoal and long braising as its signature moves.",
    flavorProfile: ["spicy (pedas)", "sweet-savory (manis gurih)", "rich (gurih)", "smoky", "fermented depth (terasi)", "aromatic"],
    flavorIntensity: {
      heat: 7,
      acidity: 4,
      sweetness: 6,
      umami: 8,
      aromatic: 8,
      smokeEarth: 7,
      interpretation: "Deeply savory and smoky-sweet rather than bright—heat comes from sambal on the side, while the dishes themselves lean on coconut, palm sugar, and fermented shrimp paste for rich, earthy depth."
    },
    keyIngredients: ["rice", "coconut milk (santan)", "kecap manis (sweet soy sauce)", "shrimp paste (terasi)", "palm sugar (gula jawa)", "candlenuts (kemiri)", "tempeh", "peanuts"],
    cookingTechniques: ["grinding spice paste (bumbu) in a stone mortar", "slow braising in coconut milk", "grilling over coconut charcoal (bakar)", "frying (goreng)", "wrapping and steaming in banana leaves (pepes)"],
    cookingFlow: [
      { action: "Grind bumbu", emoji: "🪨" },
      { action: "Fry paste", emoji: "🍳" },
      { action: "Add coconut milk", emoji: "🥥" },
      { action: "Braise low", emoji: "🕰️" },
      { action: "Grill or fry", emoji: "🔥" },
      { action: "Serve with sambal", emoji: "🌶️" }
    ],
    spicesAndSeasonings: ["red and bird's eye chilies", "shallots", "garlic", "turmeric", "galangal", "ginger", "lemongrass", "candlenuts", "kaffir lime leaves", "salam leaves (Indonesian bay)", "coriander seeds", "nutmeg", "cloves", "tamarind"],
    ingredientTiers: {
      foundation: [
        { name: "Coconut Milk", emoji: "🥥", description: "Santan · Braise & curry base · Rich, silky" },
        { name: "Kecap Manis", emoji: "🍯", description: "Sweet soy sauce · Signature seasoning · Molasses-sweet, glossy" },
        { name: "Shrimp Paste", emoji: "🦐", description: "Terasi · Umami foundation · Roasted, pungent" },
        { name: "Chilies", emoji: "🌶️", description: "Cabai rawit · Sambal heat · Sharp, fruity fire" },
        { name: "Shallots", emoji: "🧅", description: "Bawang merah · Bumbu base & crispy garnish · Sweet, allium depth" }
      ],
      aromaticCore: [
        { name: "Galangal", emoji: "🫚", description: "Lengkuas · Aromatic rhizome · Piney, citrus bite" },
        { name: "Turmeric", emoji: "🟡", description: "Kunyit · Color & aroma · Earthy, golden" },
        { name: "Lemongrass", emoji: "🌿", description: "Serai · Bruised into braises · Citrus perfume" },
        { name: "Candlenuts", emoji: "🌰", description: "Kemiri · Paste thickener · Waxy, macadamia-like" },
        { name: "Kaffir Lime Leaf", emoji: "🍃", description: "Daun jeruk · Aromatic leaf · Bright citrus oil" },
        { name: "Salam Leaf", emoji: "🍂", description: "Indonesian bay · Braising aromatic · Subtle, tea-like" }
      ],
      flavorBuilders: [
        { name: "Garlic", emoji: "🧄", description: "Bawang putih · Bumbu essential · Pungent backbone" },
        { name: "Palm Sugar", emoji: "🟤", description: "Gula jawa · Sweetener · Smoky caramel" },
        { name: "Tamarind", emoji: "🫘", description: "Asam jawa · Souring agent · Dark, fruity tang" },
        { name: "Ginger", emoji: "🫚", description: "Jahe · Warming aromatic · Sharp, peppery" },
        { name: "Coriander Seed", emoji: "🫛", description: "Ketumbar · Ground spice · Warm, nutty citrus" },
        { name: "Nutmeg", emoji: "🥜", description: "Pala · Spice Islands native · Sweet, woody warmth" },
        { name: "Cloves", emoji: "🌸", description: "Cengkeh · Spice Islands native · Intense, numbing perfume" },
        { name: "Peanuts", emoji: "🥜", description: "Kacang tanah · Sauce base · Toasty richness" }
      ],
      staples: [
        { name: "Rice", emoji: "🍚", description: "Nasi · The center of every meal · Fluffy, essential" },
        { name: "Tempeh", emoji: "🧱", description: "Fermented soybean cake · Indigenous protein · Nutty, firm" },
        { name: "Tofu", emoji: "🧈", description: "Tahu · Everyday protein · Fried until golden" },
        { name: "Egg Noodles", emoji: "🍜", description: "Mie · Chinese-Indonesian staple · Springy, wok-friendly" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Sumatra",
      description: "Home of the Minangkabau, whose nasi Padang restaurants have carried Sumatran food across the archipelago and the world. This is Indonesia's richest, most fiery cooking: thick coconut-milk braises simmered for hours until the sauce clings and darkens, chilies used by the handful, and an Indian and Middle Eastern spice inheritance from centuries of Indian Ocean trade. Aceh, at the island's tip, adds true curries and goat dishes.",
      signatureDishes: ["Rendang", "Gulai", "Sate Padang", "Mie Aceh", "Dendeng Balado"],
      keyIngredients: ["coconut milk", "red chilies", "turmeric leaf", "galangal", "beef", "cassava leaf"],
      distinctiveTraits: ["Slow-reduced coconut braises", "Fiercest heat in Indonesia", "Nasi Padang serving tradition", "Indian and Arab spice influence"]
    },
    {
      name: "Java",
      description: "The most populous island balances two temperaments: Central Java (Yogyakarta and Solo) loves sweetness—palm sugar sneaks into nearly everything, most famously the jackfruit stew gudeg—while East Java leans saltier and hotter, with a devotion to terasi and dark, funky petis shrimp paste. Java is also the homeland of tempeh and of street institutions like bakso and sate carts.",
      signatureDishes: ["Gudeg", "Rawon", "Sate Ayam", "Bakso", "Nasi Liwet", "Pecel"],
      keyIngredients: ["palm sugar", "tempeh", "kecap manis", "petis", "keluak nut", "peanuts"],
      distinctiveTraits: ["Sweet-leaning palate (Central Java)", "Birthplace of tempeh", "Royal court cuisine of Yogyakarta", "Dense street-food culture"]
    },
    {
      name: "Bali",
      description: "The Hindu island eats differently from its Muslim neighbors: pork is central, most famously babi guling, the ceremonial spit-roasted pig. Balinese cooking turns on basa genep, a 'complete spice paste' of a dozen-plus aromatics, and on lawar—minced meat and vegetables bound with grated coconut and spices, prepared communally by men on temple days. Ceremony and cuisine are inseparable here.",
      signatureDishes: ["Babi Guling", "Bebek Betutu", "Lawar", "Sate Lilit"],
      keyIngredients: ["pork", "basa genep spice paste", "fresh turmeric", "grated coconut", "torch ginger", "kaffir lime"],
      distinctiveTraits: ["Pork-centric Hindu cuisine", "Basa genep complete spice paste", "Ceremonial cooking for temple festivals", "Minced sate wrapped on lemongrass"]
    },
    {
      name: "Sulawesi",
      description: "A seafood-obsessed island with two poles: Makassar in the south, famous for coto (a rich offal soup thickened with ground peanuts) and char-grilled fish, and Manado in the Christian north, notorious for the hottest food in the country—rica-rica chili preparations, woku herb braises electric with lemon basil and torch ginger, and an adventurous omnivorousness found nowhere else in Indonesia.",
      signatureDishes: ["Coto Makassar", "Ikan Bakar Rica-Rica", "Ayam Woku", "Tinutuan", "Konro"],
      keyIngredients: ["fresh fish", "bird's eye chilies", "lemon basil (kemangi)", "torch ginger", "peanuts", "lime"],
      distinctiveTraits: ["Extreme chili heat (Manado)", "Grilled whole fish culture", "Herb-heavy woku braises", "Beef and offal soups of Makassar"]
    },
    {
      name: "Maluku & Papua",
      description: "The original Spice Islands, where nutmeg and cloves grew before anywhere else, paired with the eastern staple that replaces rice: sago palm starch, eaten as papeda, a glassy porridge twirled onto forks and dipped into turmeric-sour fish soup. Food here is oceanic and elemental—grilled fish, smoked meats, banana and tuber gardens—closer to Pacific foodways than to Java's.",
      signatureDishes: ["Papeda", "Ikan Kuah Kuning", "Ikan Asar (smoked tuna)", "Colo-Colo Sambal"],
      keyIngredients: ["sago starch", "tuna and reef fish", "nutmeg", "cloves", "kenari nuts", "lime and lemon basil"],
      distinctiveTraits: ["Sago instead of rice", "Birthplace of nutmeg and cloves", "Smoke-preserved fish", "Raw citrus-chili sambals"]
    }
  ],
  popularDishes: [
    {
      name: "Nasi Goreng",
      englishName: "Indonesian Fried Rice",
      pronunciation: "nah-see goh-reng",
      description: "Day-old rice fried with kecap manis, shallots, garlic, and chili until smoky-sweet and mahogany-dark, topped with a fried egg and crispy shallots. The national comfort food, eaten for breakfast, from midnight street carts, and everywhere in between.",
      category: "main",
      keyTraits: ["kecap manis", "wok-fried", "fried egg"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Rendang",
      englishName: "Slow-Braised Spiced Beef",
      pronunciation: "ruhn-dahng",
      description: "Beef simmered for hours in coconut milk and a paste of chilies, galangal, turmeric, and lemongrass until the liquid reduces to a dark, clinging coat of caramelized spice. A Minangkabau ceremonial dish once made to survive long journeys without refrigeration—regularly voted among the world's best dishes.",
      category: "main",
      regionalOrigin: "Sumatra",
      keyTraits: ["slow-braised", "coconut milk", "caramelized spice"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Sate Ayam",
      englishName: "Chicken Satay",
      pronunciation: "sah-tay ah-yahm",
      description: "Skewers of marinated chicken grilled over coconut-shell charcoal and drenched in a sweet peanut sauce spiked with kecap manis, served with rice cakes (lontong) and pickled shallots. The bell of the sate cart is one of Indonesia's defining evening sounds.",
      category: "street-food",
      regionalOrigin: "Java",
      keyTraits: ["charcoal-grilled", "peanut sauce", "skewered"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isHalal: true }
    },
    {
      name: "Gado-Gado",
      englishName: "Vegetable Salad with Peanut Sauce",
      pronunciation: "gah-doh gah-doh",
      description: "Blanched vegetables, boiled egg, fried tofu, and tempeh dressed in a thick, freshly ground peanut sauce, finished with shrimp crackers. The name means 'mix-mix'—a complete meal disguised as a salad.",
      category: "salad",
      regionalOrigin: "Jakarta / West Java",
      keyTraits: ["peanut sauce", "tempeh", "mixed vegetables"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarian: true, isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Soto Ayam",
      englishName: "Turmeric Chicken Soup",
      pronunciation: "soh-toh ah-yahm",
      description: "Golden chicken soup stained with turmeric and perfumed with lemongrass and lime leaf, served over rice or glass noodles with shredded chicken, egg, and fried shallots. Every region claims its own soto; this yellow Javanese version is the most beloved.",
      category: "soup",
      regionalOrigin: "Java",
      keyTraits: ["turmeric broth", "lemongrass", "fried shallots"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Bakso",
      englishName: "Meatball Noodle Soup",
      pronunciation: "bahk-soh",
      description: "Springy beef meatballs in clear broth with noodles, fried wontons, and a do-it-yourself bar of sambal, sweet soy, and vinegar. A Chinese-Indonesian street classic announced by the knock of a wooden bell—famously Barack Obama's childhood favorite from his Jakarta years.",
      category: "street-food",
      regionalOrigin: "Java",
      keyTraits: ["springy meatballs", "clear broth", "sambal to taste"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true }
    },
    {
      name: "Gudeg",
      englishName: "Sweet Jackfruit Stew",
      pronunciation: "goo-duhg",
      description: "Young jackfruit braised for hours in coconut milk, palm sugar, and teak leaves (which turn it russet-brown), served with rice, spiced hard-boiled eggs, and crispy beef-skin crackers in chili sauce. The signature dish of Yogyakarta, where it's eaten from morning to midnight.",
      category: "main",
      regionalOrigin: "Yogyakarta, Central Java",
      keyTraits: ["young jackfruit", "palm sugar", "slow-braised"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ayam Goreng",
      englishName: "Indonesian Fried Chicken",
      pronunciation: "ah-yahm goh-reng",
      description: "Chicken simmered first in a turmeric-galangal-coriander bumbu until the flavor reaches the bone, then flash-fried until deeply golden, often showered with crispy fried spice crumbs (kremes). Always served with raw cucumber, basil, and sambal.",
      category: "main",
      keyTraits: ["spice-simmered", "twice-cooked", "sambal"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Mie Goreng",
      englishName: "Fried Noodles",
      pronunciation: "mee goh-reng",
      description: "Egg noodles wok-tossed with kecap manis, garlic, cabbage, and egg—nasi goreng's noodle sibling, born of Chinese technique and Indonesian seasoning. Ubiquitous from street carts to the instant-noodle brand Indomie, a national obsession in its own right.",
      category: "main",
      keyTraits: ["kecap manis", "wok-fried", "egg noodles"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Pisang Goreng",
      englishName: "Fried Banana Fritters",
      pronunciation: "pee-sahng goh-reng",
      description: "Ripe plantain-like bananas in a crisp batter, fried until the inside turns custardy and caramel-sweet. The classic afternoon snack with coffee or tea, sometimes topped with palm sugar, cheese, or chocolate.",
      category: "dessert",
      keyTraits: ["crispy batter", "caramelized banana", "snack"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isDairyFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Es Teh Manis",
      englishName: "Sweet Iced Tea",
      pronunciation: "es teh mah-nees",
      description: "Strongly brewed black tea sweetened generously and poured over ice—the default drink at every warung in the country, ordered almost reflexively alongside any meal.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "iced",
      keyIngredients: ["black tea", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Kopi Tubruk",
      englishName: "Indonesian Mud Coffee",
      pronunciation: "koh-pee too-brook",
      description: "Finely ground coffee and sugar steeped directly in hot water and drunk once the grounds settle—unfiltered, strong, and sludgy at the bottom. The everyday brew of a country that grows some of the world's most storied coffee, from Sumatra to Toraja.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      regionalOrigin: "Java",
      keyIngredients: ["ground coffee", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Es Cendol",
      englishName: "Pandan Jelly Iced Drink",
      pronunciation: "es chen-dohl",
      description: "Chewy pandan-green rice-flour jellies swimming in coconut milk and dark palm-sugar syrup over shaved ice—half drink, half dessert, and entirely necessary in the tropical heat.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["pandan rice-flour jelly", "coconut milk", "palm sugar syrup", "shaved ice"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Jamu",
      englishName: "Herbal Tonic",
      pronunciation: "jah-moo",
      description: "Traditional herbal medicine drinks—most commonly a golden blend of fresh turmeric, tamarind, and palm sugar (kunyit asam)—historically sold by women carrying bottles in a basket on their back. A centuries-old Javanese wellness tradition now recognized by UNESCO.",
      type: "non-alcoholic",
      category: "ceremonial",
      servedHow: "room temperature",
      regionalOrigin: "Java",
      keyIngredients: ["fresh turmeric", "tamarind", "ginger", "palm sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bintang",
      pronunciation: "bin-tahng",
      description: "Indonesia's ubiquitous pale lager, a Heineken descendant from the Dutch era whose star logo is shorthand for a beach evening in Bali. Crisp and light, built for the tropics.",
      type: "alcoholic",
      category: "beer",
      servedHow: "cold",
      keyIngredients: ["barley malt", "hops"],
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true }
    }
  ]
};
