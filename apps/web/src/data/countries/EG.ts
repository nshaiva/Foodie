import type { Country } from '../types';

export const EG: Country = {
  id: "EG",
  name: "Egypt",
  capital: "Cairo",
  continent: "Africa",
  region: "North Africa",
  colorPalette: {
    primary: "#8c3b34",      // Muted brick red (from flag)
    secondary: "#4a443e",    // Charcoal (from flag black)
    accent: "#c9a961",       // Desert gold (eagle of Saladin)
    background: "#f7f4ec",   // Papyrus cream
    text: "#3a2f28"          // Dark umber
  },
  foodCulture: {
    overview: "Egyptian cuisine is the food of the Nile—a cuisine built by farmers, not courts. For five thousand years the river's floodplain has produced wheat, fava beans, lentils, and greens, and those humble staples still anchor what Egyptians eat every day. The national dishes are proudly plebeian: ful medames simmered overnight in copper pots, koshari piled from street carts, molokhia stirred into garlicky green soup. Meat is a celebration food; legumes and bread are life itself. The word for bread, aish, literally means 'life.'\n\nFood in Egypt is inseparable from generosity and religion. Ramadan reshapes the entire culinary year—iftar tables groan with soups, stuffed vegetables, and syrup-soaked sweets, and cannons still fire in Cairo to announce the breaking of the fast. Coptic Christian fasting traditions, which prohibit animal products for much of the year, helped make Egypt one of the world's great accidental vegan cuisines.\n\nCairo's street food culture runs day and night: ful and ta'ameya carts at dawn, hawawshi ovens at lunch, sugarcane juice pressed to order, and koshari shops layering pasta, rice, and lentils into bowls with theatrical speed. Eating out is cheap, fast, and democratic—a government minister and a taxi driver queue at the same ful cart.",
    mealStructure: "Breakfast is the iconic meal: ful medames with baladi bread, ta'ameya, eggs, and pickles, often eaten mid-morning. Lunch, served in the late afternoon, is the main meal—typically a stew (like molokhia or okra) with rice, bread, and salad. Dinner is light and late, often leftovers, cheese, or street food. During Ramadan the structure inverts around iftar at sunset and suhoor before dawn.",
    diningCustoms: "Bread is the primary utensil—torn pieces of aish baladi scoop up ful, dips, and stews. Meals are shared from communal plates, and refusing food from a host can cause offense; expect to be urged to eat more ('kol, kol!'). Hospitality is near-sacred: guests are served first and abundantly. Tea follows nearly every meal.",
    historicalInfluences: "Layers of history sit on the Egyptian table: pharaonic staples (bread, beer, ful, molokhia), Arab and Levantine dishes brought after the 7th century, Ottoman Turkish stuffed vegetables and syrup pastries, and 19th-century Italian and Greek touches in Alexandria—koshari itself fuses Indian khichdi (via British colonial troops) with Italian pasta and local lentils."
  },
  cuisineProfile: {
    summary: "Egyptian cuisine is earthy, garlicky, and legume-forward—slow-cooked comfort food where cumin, coriander, and sizzling garlic (ta'leya) transform humble beans, greens, and grains into deeply savory meals.",
    flavorProfile: ["earthy", "garlicky (toum)", "cumin-warm (kammoun)", "tangy (lamoun & pickles)", "slow-cooked", "herbaceous (molokhia, dill)"],
    flavorIntensity: {
      heat: 2,
      acidity: 5,
      sweetness: 4,
      umami: 6,
      aromatic: 6,
      smokeEarth: 8,
      interpretation: "Deeply earthy and mellow rather than fiery—slow-simmered legumes and toasted cumin dominate, brightened by lime, vinegar-sharp pickles, and fried garlic."
    },
    keyIngredients: ["fava beans (ful)", "aish baladi flatbread", "rice", "lentils", "molokhia leaves", "garlic", "cumin", "tomatoes", "eggplant", "lime", "onions"],
    cookingTechniques: ["overnight slow-simmering (ful in the idra pot)", "ta'leya (sizzling garlic-coriander tempering)", "stuffing vegetables (mahshi)", "layering grains and sauces", "baking in wood-fired ovens", "deep-frying (ta'ameya)"],
    cookingFlow: [
      { action: "Soak beans", emoji: "🫘" },
      { action: "Simmer low", emoji: "🍲" },
      { action: "Sizzle garlic", emoji: "🧄" },
      { action: "Temper in", emoji: "🔥" },
      { action: "Squeeze lime", emoji: "🍋" },
      { action: "Scoop with bread", emoji: "🫓" }
    ],
    spicesAndSeasonings: ["cumin", "coriander (seed and fresh)", "garlic", "dried mint", "dill", "parsley", "bay leaf", "cinnamon", "cardamom", "mastic", "dukkah (nut-spice blend)", "shatta (chili paste, used sparingly)"],
    ingredientTiers: {
      foundation: [
        { name: "Fava Beans", emoji: "🫘", description: "Ful · Protein backbone · Creamy, earthy" },
        { name: "Baladi Bread", emoji: "🫓", description: "Aish baladi · Staple & utensil · Whole-wheat, bran-dusted" },
        { name: "Garlic", emoji: "🧄", description: "Toum · Flavor engine · Fried into ta'leya" },
        { name: "Cumin", emoji: "🟤", description: "Kammoun · Defining spice · Warm, smoky" },
        { name: "Lime", emoji: "🍋", description: "Lamoun · Acid balance · Squeezed over everything" }
      ],
      aromaticCore: [
        { name: "Coriander", emoji: "🌿", description: "Kuzbara · Aromatic · Seed toasted, leaf fresh" },
        { name: "Molokhia", emoji: "🍃", description: "Jute mallow · Signature green · Silky, grassy" },
        { name: "Dill", emoji: "🌱", description: "Shabat · Fresh herb · Anise-bright, in rice & fish" },
        { name: "Dried Mint", emoji: "🍵", description: "Na'na · Finishing herb · Cooling, rubbed over stews" },
        { name: "Onion", emoji: "🧅", description: "Basal · Aromatic base · Caramelized or crisp-fried" },
        { name: "Parsley", emoji: "🌿", description: "Baqdounis · Fresh herb · Clean, grassy lift" }
      ],
      flavorBuilders: [
        { name: "Tomatoes", emoji: "🍅", description: "Tamatem · Sauce base · Sweet-tart, simmered" },
        { name: "Lentils", emoji: "🟠", description: "Ads · Legume · Earthy, in soup & koshari" },
        { name: "Tahini", emoji: "🥣", description: "Tahina · Sesame sauce · Nutty, creamy dip" },
        { name: "Eggplant", emoji: "🍆", description: "Betingan · Vegetable · Fried or pickled" },
        { name: "Pickled Vegetables", emoji: "🥒", description: "Torshi · Condiment · Vinegar-sharp crunch" },
        { name: "Ghee", emoji: "🧈", description: "Samna baladi · Cooking fat · Rich, nutty" },
        { name: "Chickpeas", emoji: "🫛", description: "Hummus · Legume · Toothsome, tops koshari" },
        { name: "Vinegar", emoji: "🍶", description: "Khall · Souring agent · Sharpens dakka sauce" },
        { name: "Cinnamon", emoji: "🪵", description: "Irfa · Warm spice · In meat stuffings & sahlab" }
      ],
      staples: [
        { name: "Rice", emoji: "🍚", description: "Roz · Base starch · Short-grain, often with vermicelli" },
        { name: "Pasta", emoji: "🍝", description: "Makarona · Starch · Layered into koshari" },
        { name: "White Cheese", emoji: "🧀", description: "Gibna beida · Dairy · Briny, feta-like" },
        { name: "Eggs", emoji: "🥚", description: "Beid · Protein · Boiled with ful, fried at breakfast" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Cairo & the Nile Delta",
      description: "The capital and the fertile Delta define mainstream Egyptian food: koshari shops, ful carts, and molokhia at every table. Cairo is where the country's street-food canon was codified—fast, cheap, carbohydrate-rich, and endlessly seasoned with cumin and garlic. Delta farmland supplies the rice, greens, and pigeons (raised in mud-brick towers) central to the cuisine.",
      signatureDishes: ["Koshari", "Molokhia", "Hamam Mahshi (stuffed pigeon)", "Ta'ameya"],
      keyIngredients: ["rice", "lentils", "molokhia leaves", "pigeon", "fava beans"],
      distinctiveTraits: ["Street-food capital", "Pigeon towers of the Delta", "Garlicky ta'leya finishes", "Carb-layered comfort food"]
    },
    {
      name: "Alexandria & the Mediterranean Coast",
      description: "Egypt's great port city eats from the sea and remembers its Greek and Italian past. Fish markets supply sayadeya—fish baked over caramelized-onion rice—and grilled sardines, while Alexandrian liver sandwiches (kebda eskandarani) spiced with chili and cardamom are famous nationwide. The city has a sharper, spicier palate than the rest of Egypt.",
      signatureDishes: ["Sayadeya", "Kebda Eskandarani", "Grilled sardines", "Feseekh (fermented mullet, for Sham El-Nessim)"],
      keyIngredients: ["white fish", "shrimp", "caramelized onions", "chili (shatta)", "cardamom", "lime"],
      distinctiveTraits: ["Seafood-centric", "Spicier than inland Egypt", "Greek and Levantine echoes", "Turmeric-tinted fish rice"]
    },
    {
      name: "Upper Egypt (Sa'idi)",
      description: "The rural south along the Nile from Minya to Aswan cooks hearty, fire-and-clay-oven food. Sa'idi cuisine favors sun-baked flatbreads (aish shamsi), slow stews of okra and beef, and generous use of ghee and molasses. Toward Aswan, Nubian traditions add distinctive breads, dried okra powder stews, and date-based sweets.",
      signatureDishes: ["Fatta (bread, rice, and meat in garlic-vinegar broth)", "Bamia (okra stew)", "Aish shamsi (sun bread)", "Nubian weika"],
      keyIngredients: ["okra", "beef and lamb", "sugarcane molasses", "ghee", "dates", "sun-risen wheat bread"],
      distinctiveTraits: ["Clay-oven and sun-leavened breads", "Celebration dish fatta", "Nubian influence near Aswan", "Molasses and ghee richness"]
    },
    {
      name: "Sinai & Red Sea Coast",
      description: "Bedouin cooking rules the desert peninsula and coastal camps: whole fish and lamb cooked over open coals or buried in sand-pit ovens (zarb), flatbread baked on a domed metal saj, and endless rounds of sweet tea brewed with wild desert herbs like habak. Red Sea ports add fresh grilled catch and Yemeni-influenced spicing.",
      signatureDishes: ["Zarb (pit-roasted lamb)", "Farasheeh (saj flatbread)", "Charcoal-grilled Red Sea fish", "Bedouin tea with habak"],
      keyIngredients: ["lamb", "Red Sea fish", "wheat flour", "desert herbs (habak, marmaraya)", "charcoal"],
      distinctiveTraits: ["Bedouin fire-pit cooking", "Herb-infused tea culture", "Minimal, smoke-driven seasoning", "Nomadic breadmaking"]
    }
  ],
  popularDishes: [
    {
      name: "Koshari",
      englishName: "Egyptian Lentil-Rice Bowl",
      pronunciation: "KOH-shar-ee",
      description: "Egypt's beloved national dish: rice, brown lentils, and pasta layered with spiced tomato sauce, chickpeas, and a haystack of crispy fried onions, finished with garlicky vinegar (dakka) and optional chili. A carb-on-carb masterpiece born on Cairo's streets.",
      category: "street-food",
      regionalOrigin: "Cairo",
      keyTraits: ["layered carbs", "crispy onions", "tomato-vinegar sauce"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Ful Medames",
      englishName: "Slow-Simmered Fava Beans",
      pronunciation: "fool meh-DAM-mes",
      description: "Fava beans simmered overnight until creamy, mashed to order and dressed with olive oil, cumin, lime, and garlic—eaten pharaonic-style with baladi bread. The default Egyptian breakfast for millennia.",
      category: "breakfast",
      keyTraits: ["slow-simmered", "cumin", "creamy legumes"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Ta'ameya",
      englishName: "Egyptian Falafel",
      pronunciation: "tah-ah-MAY-yah",
      description: "Egypt's falafel, made from crushed fava beans (not chickpeas) blended with leeks, dill, parsley, and coriander, fried into vivid-green patties crusted with sesame. Stuffed into bread with tahini, salad, and pickles.",
      category: "street-food",
      keyTraits: ["fava beans", "herb-green interior", "crisp-fried"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isHalal: true }
    },
    {
      name: "Molokhia",
      englishName: "Jute Mallow Soup",
      pronunciation: "moh-loh-KHEY-yah",
      description: "Finely chopped jute mallow leaves cooked into a silky, deep-green soup with rich broth, finished with a sizzling ta'leya of fried garlic and coriander poured in with a dramatic hiss (the shahqa). Served over rice, often with chicken or rabbit.",
      category: "soup",
      regionalOrigin: "Nile Delta",
      keyTraits: ["silky greens", "garlic ta'leya", "rich broth"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Mahshi",
      englishName: "Stuffed Vegetables",
      pronunciation: "MAH-shee",
      description: "Vine leaves, zucchini, peppers, eggplant, and cabbage stuffed with herbed rice perfumed with dill and dried mint, slow-simmered in tomato broth. An Ottoman inheritance perfected in Egyptian home kitchens—labor-intensive and made for gatherings.",
      category: "main",
      keyTraits: ["herbed rice stuffing", "dill & mint", "slow-simmered"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Fattah",
      englishName: "Bread, Rice & Meat in Garlic Broth",
      pronunciation: "FAT-tah",
      description: "Layers of toasted bread and rice soaked in garlic-vinegar meat broth, topped with slow-cooked lamb or beef and tomato-garlic sauce. The dish of celebrations—Eid al-Adha, weddings, and a baby's first week (sebou).",
      category: "main",
      regionalOrigin: "Upper Egypt",
      keyTraits: ["garlic-vinegar broth", "layered bread & rice", "celebration dish"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Hamam Mahshi",
      englishName: "Stuffed Pigeon",
      pronunciation: "ha-MAM MAH-shee",
      description: "Whole pigeon stuffed with freekeh (green cracked wheat) or spiced rice, simmered then flame-roasted until burnished. Raised in the Delta's iconic mud-brick pigeon towers, it is Egypt's most prized special-occasion protein.",
      category: "main",
      regionalOrigin: "Nile Delta",
      keyTraits: ["freekeh stuffing", "roasted game bird", "festive"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Hawawshi",
      englishName: "Spiced Meat-Stuffed Bread",
      pronunciation: "ha-WOW-shee",
      description: "Baladi bread packed with minced beef, onions, peppers, and warm spices, brushed with fat and baked in a blistering oven until the bread crisps and the filling steams. Cairo's answer to the meat pie, eaten hot from the paper.",
      category: "street-food",
      regionalOrigin: "Cairo",
      keyTraits: ["spiced minced beef", "oven-crisped bread"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Sayadeya",
      englishName: "Fisherman's Rice with Fish",
      pronunciation: "sah-yah-DAY-yah",
      description: "White fish baked over rice cooked in a deeply caramelized onion and tomato broth tinted with turmeric and cumin, sharpened with lime. The pride of Alexandria and the Mediterranean ports.",
      category: "main",
      regionalOrigin: "Alexandria",
      keyTraits: ["caramelized onion rice", "baked fish", "cumin & turmeric"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Umm Ali",
      englishName: "Egyptian Bread Pudding",
      pronunciation: "oom AH-lee",
      description: "Flaky pastry soaked in sweetened hot milk with nuts, raisins, and coconut, baked until the top blisters golden. Named for a 13th-century sultana who allegedly ordered it to celebrate a rival's demise—Egypt's most storied dessert.",
      category: "dessert",
      keyTraits: ["milk-soaked pastry", "toasted nuts", "baked golden"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isHalal: true }
    }
  ],
  popularBeverages: [
    {
      name: "Karkadeh",
      englishName: "Hibiscus Tea",
      pronunciation: "kar-ka-DAY",
      description: "Crimson infusion of dried hibiscus petals, sweetened and served hot in winter or ice-cold in summer. An Aswan specialty tracing back to pharaonic times, tart like cranberry and poured at weddings for good luck.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Aswan (Upper Egypt)",
      servedHow: "cold",
      keyIngredients: ["dried hibiscus petals", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Asab",
      englishName: "Sugarcane Juice",
      pronunciation: "AH-sab",
      description: "Fresh sugarcane stalks pressed through roaring green machines at street kiosks, yielding a frothy, grassy-sweet juice drunk immediately over ice. The definitive Egyptian street refresher.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["fresh sugarcane"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sahlab",
      englishName: "Orchid-Root Milk Drink",
      pronunciation: "SAH-lab",
      description: "Thick, warming winter drink of milk thickened with sahlab (orchid tuber flour, now often cornstarch), scented with vanilla and cinnamon and crowned with nuts, raisins, and coconut. Halfway between a beverage and a pudding.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "hot",
      keyIngredients: ["milk", "sahlab or cornstarch", "cinnamon", "nuts", "coconut"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Shai bil Na'na",
      englishName: "Black Tea with Mint",
      pronunciation: "SHY bil NAH-nah",
      description: "Strong black tea brewed dark and heavily sweetened, often with fresh mint, served in small glasses at every ahwa (traditional café). The social lubricant of Egyptian life—offered to guests, hagglers, and strangers alike.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["black tea", "fresh mint", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Ahwa Turki",
      englishName: "Egyptian Turkish-Style Coffee",
      pronunciation: "AH-wah TUR-kee",
      description: "Finely ground coffee simmered unfiltered in a long-handled kanaka, often perfumed with cardamom, and served in small cups with the grounds settling at the bottom. Ordered by sweetness level: sada (plain), mazboot (just right), or ziyada (extra sweet).",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["finely ground coffee", "cardamom", "sugar"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
