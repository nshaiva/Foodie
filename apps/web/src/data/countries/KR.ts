import type { Country } from '../types';

export const KR: Country = {
  id: "KR",
  name: "South Korea",
  capital: "Seoul",
  continent: "Asia",
  region: "East Asia",
  colorPalette: {
    primary: "#3d5a80",      // Muted taegeuk blue
    secondary: "#b5484d",    // Muted taegeuk red
    accent: "#c9a66b",       // Warm brass (traditional bangjja bowls)
    background: "#f7f5f0",   // Hanji paper cream
    text: "#2b3a4a"          // Deep ink blue
  },
  foodCulture: {
    overview: "Korean food culture is built around the bapsang—a table where a bowl of rice is never eaten alone but surrounded by soup, stew, and a constellation of banchan (small shared side dishes). Fermentation is the soul of the cuisine: kimchi, doenjang (soybean paste), ganjang (soy sauce), and gochujang (chili paste) are the products of jang-making traditions passed down through households for generations, historically stored in rows of earthenware onggi jars in every courtyard.\n\nEating in Korea is intensely communal. Stews arrive bubbling in a single pot for the table, meat is grilled at the table and wrapped into ssam (lettuce parcels) built bite by bite, and refusing to share food is almost unthinkable. The concept of jeong—a deep, sticky bond of affection—finds its clearest expression at the table, where 'Have you eaten?' (bap meogeosseo?) doubles as a greeting and a declaration of care.\n\nModern Korean food life moves between poles: temple cuisine of astonishing restraint, home cooking anchored in seasonal namul (seasoned vegetables), late-night pojangmacha street tents serving tteokbokki and soju, and a delivery culture so developed that fried chicken and beer (chimaek) has become its own institution. Through all of it runs a shared instinct for balance—fermented depth, garlic heat, sesame nuttiness, and something cool and crunchy to reset the palate.",
    mealStructure: "Every meal—breakfast included, traditionally—follows the same template: a bowl of rice (bap), a soup or stew (guk or jjigae), and multiple banchan shared by the table. Kimchi is present at virtually every meal. Dishes are not served in courses; everything arrives at once and is eaten in alternating bites.",
    diningCustoms: "Koreans eat with a spoon (for rice and soup) and flat metal chopsticks (for banchan)—never lifting the rice bowl from the table. The eldest person lifts their spoon first; younger diners pour drinks for elders with two hands and turn away slightly when drinking. At barbecue, one person tends the grill and scissors are used to cut meat directly at the table.",
    historicalInfluences: "Korea's cuisine grew from the peninsula's harsh winters, which made fermentation and preservation essential. Buddhism shaped a sophisticated vegetable and temple-food tradition, while the Joseon royal court codified elaborate multi-banchan dining. Chilies arrived in the 16th–17th century via trade and transformed kimchi from a white brined vegetable into today's red-hot staple. The 20th century added Japanese-influenced dishes, war-era improvisations like budae jjigae (army base stew), and Korean-Chinese hybrids like jajangmyeon."
  },
  cuisineProfile: {
    summary: "Korean cuisine layers deep fermented umami—kimchi, soybean pastes, soy sauce—with garlic, chili heat, and toasted sesame, balancing pungent, spicy intensity against clean rice, broths, and crisp vegetables.",
    flavorProfile: ["fermented (balhyo)", "spicy (maewoon)", "savory-umami (gamchilmat)", "garlicky", "nutty (goso-han mat)", "pungent"],
    flavorIntensity: {
      heat: 7,
      acidity: 5,
      sweetness: 4,
      umami: 10,
      aromatic: 5,
      smokeEarth: 6,
      interpretation: "Fermentation-driven umami dominates, backed by steady gochugaru heat and charred, earthy grill notes rather than bright aromatics or sweetness."
    },
    keyIngredients: ["short-grain rice", "kimchi", "gochujang (chili paste)", "doenjang (soybean paste)", "soy sauce (ganjang)", "garlic", "toasted sesame oil", "scallions", "seaweed (gim)", "tofu"],
    cookingTechniques: ["fermenting (kimchi, jang)", "grilling over charcoal (gui)", "simmering stews (jjigae/jeontgol)", "quick blanching and seasoning (namul)", "braising (jorim)", "pan-frying in egg batter (jeon)"],
    cookingFlow: [
      { action: "Ferment", emoji: "🏺" },
      { action: "Season paste", emoji: "🌶️" },
      { action: "Marinate", emoji: "🥩" },
      { action: "Grill or simmer", emoji: "🔥" },
      { action: "Sesame finish", emoji: "🫙" },
      { action: "Serve with banchan", emoji: "🍚" }
    ],
    spicesAndSeasonings: ["gochugaru (Korean chili flakes)", "gochujang", "doenjang", "ganjang (soy sauce)", "garlic", "ginger", "scallions", "toasted sesame oil", "sesame seeds", "fish sauce (aekjeot)", "salted shrimp (saeujeot)", "rice syrup (jocheong)"],
    ingredientTiers: {
      foundation: [
        { name: "Gochujang", emoji: "🌶️", description: "Chili paste · Fermented base · Sweet-hot, deep" },
        { name: "Doenjang", emoji: "🫘", description: "Soybean paste · Umami base · Funky, earthy" },
        { name: "Soy Sauce", emoji: "🫗", description: "Ganjang · Salt & umami · Brewed, savory" },
        { name: "Kimchi", emoji: "🥬", description: "Fermented cabbage · Side & ingredient · Sour, spicy" },
        { name: "Garlic", emoji: "🧄", description: "Maneul · Ubiquitous aromatic · Bold, pungent" }
      ],
      aromaticCore: [
        { name: "Gochugaru", emoji: "🔴", description: "Chili flakes · Heat & color · Fruity, sun-dried" },
        { name: "Sesame Oil", emoji: "🫙", description: "Chamgireum · Finishing oil · Toasted, nutty" },
        { name: "Scallions", emoji: "🌱", description: "Pa · Aromatic · Fresh, sharp" },
        { name: "Ginger", emoji: "🫚", description: "Saenggang · Aromatic · Warm, cleansing" },
        { name: "Salted Shrimp", emoji: "🦐", description: "Saeujeot · Kimchi seasoning · Briny, funky" },
        { name: "Perilla Leaf", emoji: "🍃", description: "Kkaennip · Wrap herb · Minty, anise-like" }
      ],
      flavorBuilders: [
        { name: "Anchovy Stock", emoji: "🐟", description: "Myeolchi yuksu · Broth base · Clean umami" },
        { name: "Dried Kelp", emoji: "🌊", description: "Dasima · Broth base · Glutamate-rich" },
        { name: "Rice Syrup", emoji: "🍯", description: "Jocheong · Sweetener & glaze · Mild, glossy" },
        { name: "Rice Wine", emoji: "🍶", description: "Mirim/cheongju · Marinade · Tenderizing, sweet" },
        { name: "Sesame Seeds", emoji: "⚪", description: "Kkae · Garnish · Toasted, crunchy" },
        { name: "Korean Pear", emoji: "🍐", description: "Bae · Marinade sweetener · Juicy, tenderizing" },
        { name: "Fish Sauce", emoji: "🧂", description: "Aekjeot · Kimchi & soup seasoning · Salty depth" },
        { name: "Black Pepper", emoji: "⚫", description: "Huchu · Seasoning · Gentle warmth" }
      ],
      staples: [
        { name: "Short-Grain Rice", emoji: "🍚", description: "Bap · Base starch · Sticky, glossy" },
        { name: "Tofu", emoji: "🧈", description: "Dubu · Protein · Soft to firm, mild" },
        { name: "Glass Noodles", emoji: "🍜", description: "Dangmyeon · Sweet potato starch · Chewy, springy" },
        { name: "Rice Cakes", emoji: "🥟", description: "Tteok · Chewy starch · Neutral, absorbent" },
        { name: "Seaweed", emoji: "🟩", description: "Gim/miyeok · Wrap & soup · Oceanic, mineral" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Seoul & Gyeonggi",
      description: "The cuisine of the capital region descends from the Joseon royal court: refined, moderately seasoned, and presented with care. Seoul food favors clear soups, delicate jeon, and balanced seasoning over extremes, while the modern city layers on Korea's most dynamic street food and dining scene—from Gwangjang Market bindaetteok to trend-setting barbecue districts.",
      signatureDishes: ["Seolleongtang (ox bone soup)", "Bulgogi", "Tteokbokki", "Gujeolpan (nine-section platter)"],
      keyIngredients: ["beef", "short-grain rice", "soy sauce", "pine nuts", "rice cakes"],
      distinctiveTraits: ["Royal court refinement", "Milder, balanced seasoning", "Street food capital", "Beef-centric soups"]
    },
    {
      name: "Jeolla (Southwest)",
      description: "Korea's rice bowl and its undisputed culinary heartland. The fertile plains and rich coastline around Jeonju and Gwangju produce the country's most lavish tables—meals routinely arrive with dozens of banchan. Flavors are bolder, saltier, and more deeply fermented than anywhere else, with prized aged kimchi and pungent delicacies like hongeo (fermented skate).",
      signatureDishes: ["Jeonju Bibimbap", "Hongeo-hoe (fermented skate)", "Kongnamul gukbap", "Boribap"],
      keyIngredients: ["rice", "aged kimchi", "fermented seafood (jeotgal)", "bean sprouts", "wild greens"],
      distinctiveTraits: ["Most banchan-abundant tables", "Deep fermentation", "Bold, generous seasoning", "Birthplace of bibimbap"]
    },
    {
      name: "Gyeongsang (Southeast)",
      description: "The rugged southeast around Busan and Daegu eats hot, salty, and straightforward. Busan's ports supply Korea's best raw fish and seafood soups—milmyeon noodles and dwaeji gukbap (pork rice soup) are city institutions—while inland Daegu is famous for fiery, no-frills dishes. Seasoning leans on chili and salt rather than sweetness.",
      signatureDishes: ["Dwaeji gukbap", "Milmyeon", "Agujjim (spicy braised monkfish)", "Busan eomuk (fish cakes)"],
      keyIngredients: ["seafood", "pork", "gochugaru", "fish cakes", "wheat noodles"],
      distinctiveTraits: ["Spiciest, saltiest region", "Port-city seafood culture", "Hearty rice soups", "Minimal sweetness"]
    },
    {
      name: "Gangwon (Northeast)",
      description: "Mountainous and historically poor in rice, Gangwon built a cuisine of buckwheat, potatoes, corn, and wild mountain vegetables, plus squid and pollock from the east coast. The food is rustic and clean-tasting—chewy buckwheat noodles, potato dumplings, and acorn jelly—reflecting highland thrift and pristine ingredients.",
      signatureDishes: ["Makguksu (buckwheat noodles)", "Gamja ongsimi (potato dumpling soup)", "Chodang sundubu", "Ojingeo sundae (stuffed squid)"],
      keyIngredients: ["buckwheat", "potatoes", "corn", "soft tofu", "squid", "mountain greens (sanchae)"],
      distinctiveTraits: ["Buckwheat and potato staples", "Mountain vegetable foraging", "Clean, rustic flavors", "East-coast seafood"]
    },
    {
      name: "Jeju Island",
      description: "Korea's volcanic southern island developed its own food identity around black pigs, abundant seafood harvested by the haenyeo free-diving women, and citrus groves. Dishes are simple and ingredient-led—grilled black pork, raw fish soups, and abalone porridge—seasoned lightly to let the island's produce speak.",
      signatureDishes: ["Heuk dwaeji gui (black pork barbecue)", "Jeonbokjuk (abalone porridge)", "Mulhoe (cold raw fish soup)", "Gogi guksu (pork noodle soup)"],
      keyIngredients: ["black pork", "abalone", "sea urchin", "hallabong citrus", "seaweed"],
      distinctiveTraits: ["Haenyeo diving culture", "Black pig barbecue", "Minimal seasoning", "Citrus and seafood"]
    }
  ],
  popularDishes: [
    {
      name: "Kimchi Jjigae",
      englishName: "Kimchi Stew",
      pronunciation: "kim-chee jee-gae",
      description: "Bubbling stew of well-fermented kimchi simmered with pork (or tuna) and tofu in an intensely sour-spicy broth. The definitive Korean comfort food, served still boiling in an earthenware pot.",
      category: "soup",
      keyTraits: ["fermented", "spicy", "simmered"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Bibimbap",
      englishName: "Mixed Rice Bowl",
      pronunciation: "bee-bim-bahp",
      description: "Warm rice topped with an array of seasoned namul vegetables, beef, a fried egg, and gochujang, all mixed vigorously at the table. The Jeonju version, served in a hot stone bowl (dolsot), crisps the rice at the bottom.",
      category: "main",
      regionalOrigin: "Jeolla (Jeonju)",
      keyTraits: ["gochujang", "seasoned vegetables", "mixed"],
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Bulgogi",
      englishName: "Marinated Grilled Beef",
      pronunciation: "bool-goh-gee",
      description: "Thinly sliced beef marinated in soy sauce, pear, garlic, and sesame oil, then grilled or pan-seared. Sweet-savory and tender, it descends from Joseon-era royal cuisine and is eaten wrapped in lettuce ssam.",
      category: "main",
      regionalOrigin: "Seoul & Gyeonggi",
      keyTraits: ["soy-pear marinade", "grilled", "sweet-savory"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true }
    },
    {
      name: "Tteokbokki",
      englishName: "Spicy Rice Cakes",
      pronunciation: "tuck-boh-kee",
      description: "Chewy cylindrical rice cakes and fish cakes simmered in a glossy, sweet-spicy gochujang sauce. The quintessential Korean street snack, sold from pojangmacha tents and school-gate stalls nationwide.",
      category: "street-food",
      regionalOrigin: "Seoul",
      keyTraits: ["chewy rice cakes", "gochujang", "sweet-spicy"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Samgyeopsal",
      englishName: "Grilled Pork Belly",
      pronunciation: "sahm-gyup-sahl",
      description: "Thick slices of unmarinated pork belly grilled at the table, cut with scissors, dipped in sesame oil with salt, and wrapped in lettuce with garlic, ssamjang, and kimchi. Korea's favorite group dinner, inseparable from soju.",
      category: "main",
      keyTraits: ["table-grilled", "pork belly", "ssam wraps"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sundubu Jjigae",
      englishName: "Soft Tofu Stew",
      pronunciation: "soon-doo-boo jee-gae",
      description: "Silken, unpressed tofu in a fiery gochugaru broth with clams or pork, finished with a raw egg cracked into the bubbling pot. The Chodang village version on Gangwon's coast uses seawater-set tofu.",
      category: "soup",
      regionalOrigin: "Gangwon (Chodang)",
      keyTraits: ["silken tofu", "gochugaru", "bubbling hot"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Japchae",
      englishName: "Stir-Fried Glass Noodles",
      pronunciation: "jahp-chae",
      description: "Springy sweet potato glass noodles tossed with julienned vegetables, beef, and spinach in soy sauce and sesame oil. A festive dish essential at holidays, birthdays, and celebrations.",
      category: "main",
      keyTraits: ["glass noodles", "sesame oil", "stir-fried"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Samgyetang",
      englishName: "Ginseng Chicken Soup",
      pronunciation: "sahm-gye-tahng",
      description: "A whole young chicken stuffed with glutinous rice, ginseng, jujubes, and garlic, simmered until falling apart in a milky broth. Traditionally eaten on the hottest days of summer to restore stamina—fighting heat with heat.",
      category: "soup",
      keyTraits: ["ginseng", "whole chicken", "restorative"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dwaeji Gukbap",
      englishName: "Pork Rice Soup",
      pronunciation: "dway-jee gook-bahp",
      description: "Milky pork bone broth loaded with sliced pork and served with rice to submerge in the bowl, seasoned at the table with salted shrimp and chives. Busan's soul food, born of postwar resourcefulness.",
      category: "soup",
      regionalOrigin: "Gyeongsang (Busan)",
      keyTraits: ["pork broth", "rice-in-soup", "salted shrimp"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Hotteok",
      englishName: "Sweet Filled Pancake",
      pronunciation: "hoh-tuck",
      description: "Griddled yeasted pancake with a molten filling of brown sugar, cinnamon, and crushed nuts and seeds. A beloved winter street snack; Busan's ssiat hotteok version is stuffed generously with seeds.",
      category: "dessert",
      regionalOrigin: "Nationwide (famous in Busan)",
      keyTraits: ["griddled", "brown sugar", "cinnamon"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isDairyFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Soju",
      pronunciation: "soh-joo",
      description: "Korea's national spirit—a clear, neutral distilled liquor traditionally made from rice, now often from grains and sweet potatoes. Drunk in small glasses with food, poured for one another following strict etiquette, and central to social life.",
      type: "alcoholic",
      category: "spirit",
      servedHow: "cold",
      keyIngredients: ["rice", "grains", "sweet potato"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Makgeolli",
      englishName: "Cloudy Rice Wine",
      pronunciation: "mahk-guhl-lee",
      description: "Milky, lightly fizzy unfiltered rice wine with a gentle sweet-tart tang, traditionally the farmer's drink and the classic pairing with jeon (savory pancakes) on rainy days. Served from a kettle into shallow bowls.",
      type: "alcoholic",
      category: "wine",
      servedHow: "cold",
      keyIngredients: ["rice", "nuruk (fermentation starter)", "water"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Sikhye",
      englishName: "Sweet Rice Punch",
      pronunciation: "shik-hye",
      description: "Chilled sweet drink made by steeping cooked rice in malted barley water until the grains float, subtly malty and often garnished with pine nuts. A traditional dessert drink served after big meals and at saunas.",
      type: "non-alcoholic",
      category: "ceremonial",
      servedHow: "cold",
      keyIngredients: ["malted barley", "rice", "sugar", "ginger"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Yuja-cha",
      englishName: "Citron Tea",
      pronunciation: "yoo-jah chah",
      description: "Hot tea made by stirring yuja (citron) marmalade into water—fragrant, honeyed, and tart. A winter staple believed to ward off colds, made from citrus grown on the southern coast and Jeju.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Southern coast & Jeju",
      servedHow: "hot",
      keyIngredients: ["yuja citron", "honey", "sugar"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Bori-cha",
      englishName: "Roasted Barley Tea",
      pronunciation: "boh-ree chah",
      description: "Toasty, caffeine-free tea of roasted barley steeped in water, served hot in winter and cold in summer. So ubiquitous it often replaces plain water at Korean tables and in home refrigerators.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "cold",
      keyIngredients: ["roasted barley", "water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true }
    }
  ]
};
