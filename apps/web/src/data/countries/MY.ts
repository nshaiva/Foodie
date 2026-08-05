import type { Country } from '../types';

export const MY: Country = {
  id: "MY",
  name: "Malaysia",
  capital: "Kuala Lumpur",
  continent: "Asia",
  region: "Southeast Asia",
  colorPalette: {
    primary: "#2d4a7a",      // Muted royal blue (from flag canton)
    secondary: "#b5484d",    // Softened crimson (from flag stripes)
    accent: "#c9a227",       // Antique gold (crescent and star)
    background: "#faf7f0",   // Warm ivory
    text: "#25324a"          // Deep slate blue
  },
  foodCulture: {
    overview: "Malaysian food is the product of three major culinary traditions—Malay, Chinese, and Indian—living side by side for centuries and constantly borrowing from one another. A single city block can offer a Malay nasi campur stall, a Chinese char kway teow hawker, and an Indian-Muslim mamak shop frying roti canai, and most Malaysians eat comfortably across all three. This layering produced entirely new hybrid cuisines too, most famously Nyonya (Peranakan) cooking, born from Chinese settlers marrying local Malays and blending wok technique with rempah spice pastes.\n\nEating is the national pastime and hawker centers, kopitiams, and 24-hour mamak restaurants are the true public squares of Malaysian life. People debate which stall makes the best assam laksa with the seriousness other countries reserve for politics, and it is completely normal to drive an hour for a specific bowl of noodles. Food is rarely fancy in presentation—served on melamine plates or banana leaves—but the depth of flavor, built from toasted spice pastes, fermented shrimp, and fresh herbs, is anything but simple.\n\nBecause Malaysia is a majority-Muslim country with large Buddhist, Hindu, and Christian communities, food is also how communities navigate difference. Halal and non-halal kitchens coexist, festive open houses during Hari Raya, Chinese New Year, and Deepavali invite neighbors of every background to eat together, and dishes like satay and nasi lemak have become shared national symbols that everyone claims equally.",
    mealStructure: "Rice (nasi) anchors the main meals, often as nasi campur—rice with a self-selected spread of curries, sambals, and vegetables. Breakfast is substantial and savory: nasi lemak, roti canai with dhal, or noodle soups. Between meals, Malaysians graze constantly—kuih (bite-sized cakes) with afternoon tea, and late-night supper (makan malam) at mamak stalls is an institution.",
    diningCustoms: "Malay and Indian food is traditionally eaten with the right hand, especially on banana leaf; fork and spoon are the everyday default, with chopsticks for Chinese noodle dishes. At hawker centers you claim a table, order from multiple independent stalls, and pay each one separately. Sharing is assumed, and 'tapau' (takeaway, often in knotted plastic bags) is a way of life.",
    historicalInfluences: "Centuries of Indian Ocean trade brought Indian spices and curry techniques; mass migration under British rule brought southern Chinese wok cooking and Tamil Muslim mamak culture; Melaka's 15th-century sultanate and later Portuguese, Dutch, and British rule left Eurasian dishes like devil's curry. Indonesian, Thai, and Arab influences seep across borders, while indigenous Bornean traditions of bamboo cooking and jungle ferns remain vital in Sabah and Sarawak."
  },
  cuisineProfile: {
    summary: "Malaysian cuisine layers Malay rempah spice pastes, Chinese wok mastery, and Indian curry traditions into a rich, coconut-and-sambal-driven food culture where deep, slow-built flavor matters more than refinement.",
    flavorProfile: ["spicy (pedas)", "rich (lemak)", "sour (masam)", "savory-fermented (belacan)", "sweet (manis)", "toasted-aromatic"],
    flavorIntensity: {
      heat: 7,
      acidity: 6,
      sweetness: 5,
      umami: 9,
      aromatic: 8,
      smokeEarth: 6,
      interpretation: "Deeply savory and coconut-rich, with fermented shrimp umami and slow-toasted spice pastes giving warmth and depth rather than sharp, bright heat."
    },
    keyIngredients: ["coconut milk (santan)", "belacan (fermented shrimp paste)", "sambal", "rice", "lemongrass", "tamarind", "pandan leaves", "dried anchovies (ikan bilis)"],
    cookingTechniques: ["pounding and frying rempah (spice paste)", "wok stir-frying over high heat (wok hei)", "slow-simmering coconut curries", "grilling over charcoal (bakar)", "steaming in banana leaf"],
    cookingFlow: [
      { action: "Blend rempah", emoji: "🧄" },
      { action: "Tumis (fry paste)", emoji: "🍳" },
      { action: "Add santan", emoji: "🥥" },
      { action: "Simmer low", emoji: "🍲" },
      { action: "Balance & serve", emoji: "🍚" }
    ],
    spicesAndSeasonings: ["dried and fresh chilies", "belacan", "turmeric", "lemongrass", "galangal", "ginger", "candlenuts", "star anise", "cinnamon", "cardamom", "curry leaves", "kaffir lime leaves", "torch ginger flower (bunga kantan)"],
    ingredientTiers: {
      foundation: [
        { name: "Coconut Milk", emoji: "🥥", description: "Santan · Richness base · Lemak creaminess" },
        { name: "Belacan", emoji: "🦐", description: "Fermented shrimp paste · Umami backbone · Pungent, toasty" },
        { name: "Chilies", emoji: "🌶️", description: "Cili api & dried · Heat source · Sambal essential" },
        { name: "Tamarind", emoji: "🫘", description: "Asam jawa · Souring agent · Fruity, dark tang" },
        { name: "Rice", emoji: "🍚", description: "Nasi · Meal anchor · Every table, every day" }
      ],
      aromaticCore: [
        { name: "Lemongrass", emoji: "🌿", description: "Serai · Aromatic stalk · Citrus perfume" },
        { name: "Pandan", emoji: "🍃", description: "Screwpine leaf · Fragrance · Sweet, grassy vanilla" },
        { name: "Galangal", emoji: "🫚", description: "Lengkuas · Rempah aromatic · Sharp, medicinal" },
        { name: "Torch Ginger", emoji: "🌸", description: "Bunga kantan · Floral aromatic · Bright, sour-perfumed" },
        { name: "Curry Leaves", emoji: "🌱", description: "Daun kari · Indian aromatic · Nutty, citrus-bitter" },
        { name: "Kaffir Lime Leaf", emoji: "🍋", description: "Daun limau purut · Aromatic leaf · Intense citrus oil" }
      ],
      flavorBuilders: [
        { name: "Shallots", emoji: "🧅", description: "Bawang merah · Rempah base · Sweet when fried" },
        { name: "Garlic", emoji: "🧄", description: "Bawang putih · Rempah base · Pungent depth" },
        { name: "Candlenuts", emoji: "🌰", description: "Buah keras · Paste thickener · Creamy, waxy" },
        { name: "Turmeric", emoji: "🟡", description: "Kunyit · Color & earth · Fresh root preferred" },
        { name: "Gula Melaka", emoji: "🍯", description: "Palm sugar · Sweetener · Deep smoky caramel" },
        { name: "Dried Anchovies", emoji: "🐟", description: "Ikan bilis · Crunch & umami · Fried salty-savory" },
        { name: "Soy Sauce", emoji: "🫙", description: "Kicap · Chinese seasoning · Sweet kicap manis too" },
        { name: "Star Anise", emoji: "⭐", description: "Bunga lawang · Warm spice · Curries & braises" },
        { name: "Cinnamon", emoji: "🪵", description: "Kayu manis · Warm spice · Indian-Malay curries" }
      ],
      staples: [
        { name: "Jasmine Rice", emoji: "🍚", description: "Beras · Base starch · Steamed or coconut-cooked" },
        { name: "Rice Noodles", emoji: "🍜", description: "Bihun & kway teow · Noodle base · Soups and stir-fries" },
        { name: "Yellow Noodles", emoji: "🥡", description: "Mee kuning · Wheat noodle · Springy, alkaline" },
        { name: "Roti Dough", emoji: "🫓", description: "Roti canai base · Flatbread · Flaky, stretched, griddled" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Penang & the North",
      description: "Penang is Malaysia's undisputed hawker capital, where Hokkien Chinese, Malay, and Thai-border influences collide. The food is punchier and more sour than elsewhere—tamarind-laced noodle soups, intense wok-fried noodles, and a proud Nyonya tradition. Neighboring Kedah and Perlis, the country's rice bowl, add Thai-style heat and sour notes.",
      signatureDishes: ["Assam Laksa", "Char Kway Teow", "Penang Hokkien Mee", "Nasi Kandar"],
      keyIngredients: ["tamarind", "torch ginger flower", "mackerel", "flat rice noodles", "prawn stock"],
      distinctiveTraits: ["Hawker street-food supremacy", "Sour, tamarind-forward flavors", "Nyonya heritage", "Thai border influence"]
    },
    {
      name: "Kuala Lumpur & Central",
      description: "The Klang Valley is where every Malaysian cuisine converges and evolves. KL claims the definitive dark, smoky Hokkien mee and clay-pot dishes, while nearby Klang is the home of bak kut teh. Mamak culture—Indian-Muslim 24-hour restaurants serving roti canai and teh tarik—reaches its fullest expression here, and Kajang is famous nationwide for satay.",
      signatureDishes: ["KL Hokkien Mee", "Bak Kut Teh", "Roti Canai", "Sate Kajang"],
      keyIngredients: ["dark soy sauce", "pork ribs & herbs", "yellow noodles", "dhal", "peanut sauce"],
      distinctiveTraits: ["Melting pot of all traditions", "24-hour mamak culture", "Dark soy, wok hei cooking", "Herbal Chinese braises"]
    },
    {
      name: "East Coast (Kelantan & Terengganu)",
      description: "The Malay heartland along the South China Sea keeps the most traditional Malay kitchen, with a marked sweet tooth and Thai influence from the Kelantan border. Coconut and palm sugar work their way into savory dishes—blue-tinted nasi kerabu, rich nasi dagang, and grilled fish in banana leaf. Beef and fresh seafood feature heavily; pork is absent.",
      signatureDishes: ["Nasi Kerabu", "Nasi Dagang", "Ayam Percik", "Keropok Lekor"],
      keyIngredients: ["butterfly pea flower", "coconut cream", "gula Melaka", "fish", "budu (fermented anchovy sauce)"],
      distinctiveTraits: ["Sweetest regional palate", "Deeply traditional Malay cooking", "Budu fermented fish sauce", "Herb-heavy rice salads"]
    },
    {
      name: "Melaka & the South",
      description: "The historic straits port of Melaka birthed Peranakan (Nyonya) cuisine and Portuguese-Eurasian cooking, while Johor's food shows Javanese and Arab influence from centuries of migration. Expect layered, labor-intensive dishes: chicken candlenut stews, spicy-sour fish, lontong in coconut gravy, and Johor's unusual spaghetti-like laksa with fish gravy.",
      signatureDishes: ["Nyonya Laksa", "Ayam Pongteh", "Laksa Johor", "Devil's Curry"],
      keyIngredients: ["candlenuts", "coconut milk", "gula Melaka", "fermented soybean paste (taucu)", "spice pastes"],
      distinctiveTraits: ["Birthplace of Nyonya cuisine", "Portuguese-Eurasian legacy", "Javanese-influenced Johor dishes", "Labor-intensive layered stews"]
    },
    {
      name: "Sabah & Sarawak (Borneo)",
      description: "East Malaysia's indigenous Kadazan-Dusun, Iban, Bidayuh, and Melanau communities cook a lighter, fresher cuisine built on jungle produce, river fish, and preservation techniques—far less chili and coconut than the peninsula. Sarawak laksa and kolo mee are beloved town dishes, while hinava (lime-cured fish) and midin ferns showcase Bornean freshness.",
      signatureDishes: ["Sarawak Laksa", "Kolo Mee", "Hinava", "Ayam Pansuh"],
      keyIngredients: ["sago", "midin jungle fern", "lime", "river fish", "bamboo (for cooking)"],
      distinctiveTraits: ["Indigenous Bornean traditions", "Bamboo and jungle-fern cooking", "Lighter, fresher flavors", "Sago as alternative staple"]
    }
  ],
  popularDishes: [
    {
      name: "Nasi Lemak",
      englishName: "Coconut Rice",
      pronunciation: "nah-see luh-mahk",
      description: "Rice steamed in coconut milk with pandan, served with fiery sambal, crispy fried anchovies, roasted peanuts, cucumber, and hard-boiled egg—often with fried chicken or beef rendang. Malaysia's national dish, eaten from banana-leaf-lined packets at breakfast or any hour.",
      category: "breakfast",
      keyTraits: ["coconut rice", "sambal", "ikan bilis"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Rendang Daging",
      englishName: "Beef Rendang",
      pronunciation: "ren-dahng dah-ging",
      description: "Beef simmered for hours in coconut milk and a pounded spice paste until the liquid reduces to a dark, clinging, caramelized coat. Originally Minangkabau, perfected across Malaysia and essential at Hari Raya feasts.",
      category: "main",
      keyTraits: ["slow-cooked", "coconut", "caramelized spice"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Char Kway Teow",
      englishName: "Stir-Fried Flat Rice Noodles",
      pronunciation: "chah kway tee-ow",
      description: "Flat rice noodles seared in a smoking-hot wok with prawns, cockles, Chinese sausage, egg, bean sprouts, and chives in dark soy—prized for its wok hei, the smoky 'breath of the wok.' Penang's version, traditionally fried over charcoal, is the benchmark.",
      category: "street-food",
      regionalOrigin: "Penang",
      keyTraits: ["wok hei", "dark soy", "cockles"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true }
    },
    {
      name: "Assam Laksa",
      englishName: "Sour Fish Noodle Soup",
      pronunciation: "ah-sahm lahk-sah",
      description: "Thick rice noodles in a hot-sour broth of flaked mackerel, tamarind, and torch ginger flower, topped with cucumber, mint, pineapple, onion, and a drizzle of pungent prawn paste (hae ko). Penang's signature bowl and a regular on world's-best-food lists.",
      category: "soup",
      regionalOrigin: "Penang",
      keyTraits: ["tamarind-sour", "mackerel broth", "torch ginger"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Roti Canai",
      englishName: "Flaky Flatbread",
      pronunciation: "roh-tee chah-nigh",
      description: "Stretched, flipped, and folded dough griddled into a flaky, crispy-soft flatbread, torn by hand and dunked into dhal or curry. The heart of Indian-Muslim mamak culture and arguably the country's favorite breakfast.",
      category: "breakfast",
      keyTraits: ["flaky", "griddled", "curry-dipped"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isHalal: true }
    },
    {
      name: "Sate",
      englishName: "Satay",
      pronunciation: "sah-tay",
      description: "Skewers of turmeric-marinated chicken or beef grilled over charcoal, served with a chunky peanut sauce, cucumber, raw onion, and compressed rice cubes (nasi impit). Kajang, near Kuala Lumpur, is the dish's famous home town.",
      category: "street-food",
      regionalOrigin: "Kajang, Selangor",
      keyTraits: ["charcoal-grilled", "peanut sauce", "turmeric marinade"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Nasi Kerabu",
      englishName: "Blue Herb Rice",
      pronunciation: "nah-see kuh-rah-boo",
      description: "Striking blue rice tinted with butterfly pea flowers, eaten with a pile of raw herbs and bean sprouts, toasted coconut, fish crackers, salted egg, and fried chicken or beef, bound by budu fermented fish sauce. A Kelantanese icon.",
      category: "main",
      regionalOrigin: "Kelantan",
      keyTraits: ["butterfly pea", "fresh herbs", "budu"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Bak Kut Teh",
      englishName: "Pork Rib Herbal Soup",
      pronunciation: "bahk koot teh",
      description: "Pork ribs simmered with garlic, dark soy, and a fragrant blend of Chinese herbs—star anise, cinnamon, dang gui—served bubbling with rice, youtiao crullers, and strong Chinese tea. Klang is its spiritual home.",
      category: "soup",
      regionalOrigin: "Klang, Selangor",
      keyTraits: ["herbal broth", "pork ribs", "dark soy"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true }
    },
    {
      name: "Sarawak Laksa",
      pronunciation: "sah-rah-wahk lahk-sah",
      description: "Rice vermicelli in a broth that is neither curry nor assam—a complex paste of sambal belacan, toasted spices, and coconut milk—topped with shredded chicken, prawns, omelette strips, bean sprouts, and calamansi lime. Anthony Bourdain called it 'breakfast of the gods.'",
      category: "soup",
      regionalOrigin: "Kuching, Sarawak",
      keyTraits: ["spiced coconut broth", "calamansi", "prawns"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Cendol",
      pronunciation: "chen-dohl",
      description: "Shaved ice drenched in coconut milk and smoky gula Melaka syrup over springy pandan rice-flour jellies, often with red beans. The definitive antidote to tropical heat, ladled from roadside carts—Melaka and Penang both claim the best.",
      category: "dessert",
      keyTraits: ["gula Melaka", "pandan jelly", "shaved ice"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    }
  ],
  popularBeverages: [
    {
      name: "Teh Tarik",
      englishName: "Pulled Tea",
      pronunciation: "teh tah-rick",
      description: "Strong black tea with condensed milk, 'pulled' in long theatrical pours between two containers to cool it and whip up a frothy head. The national drink and the soul of every mamak session.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["black tea", "condensed milk"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Kopi O",
      englishName: "Kopitiam Black Coffee",
      pronunciation: "koh-pee oh",
      description: "Robusta beans roasted with margarine and sugar, brewed strong through a cloth sock and sweetened—the dark, caramel-edged coffee of traditional Hainanese kopitiams. Order 'kopi' for a condensed-milk version, 'peng' for iced.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["margarine-roasted robusta coffee", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Sirap Bandung",
      englishName: "Rose Milk",
      pronunciation: "see-rahp bahn-doong",
      description: "Bright pink chilled drink of rose syrup and evaporated milk, sometimes topped with soda or grass jelly. A fixture at Ramadan bazaars and Malay weddings.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["rose syrup", "evaporated milk"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Air Kelapa",
      englishName: "Fresh Coconut Water",
      pronunciation: "ah-yer kuh-lah-pah",
      description: "Young coconut hacked open to order at roadside stalls, drunk straight from the shell with a spoon for scraping the soft flesh. The everyday tropical refresher.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["young coconut"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Tuak",
      englishName: "Bornean Rice Wine",
      pronunciation: "too-ahk",
      description: "Sweet, fermented glutinous rice wine brewed by Iban and Bidayuh communities in Sarawak, shared generously during the Gawai harvest festival and longhouse celebrations.",
      type: "alcoholic",
      category: "ceremonial",
      regionalOrigin: "Sarawak",
      servedHow: "room temperature",
      keyIngredients: ["glutinous rice", "yeast starter"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
