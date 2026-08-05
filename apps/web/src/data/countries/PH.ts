import type { Country } from '../types';

export const PH: Country = {
  id: "PH",
  name: "Philippines",
  capital: "Manila",
  continent: "Asia",
  region: "Southeast Asia",
  colorPalette: {
    primary: "#2d5a7b",      // Muted marine blue (from flag)
    secondary: "#b3453e",    // Softened brick red (from flag)
    accent: "#d9b25f",       // Sun-gold ochre (from the flag's sun)
    background: "#faf7f0",   // Warm rice-paper cream
    text: "#243b4a"          // Deep slate blue
  },
  foodCulture: {
    overview: "Filipino food is built around the pull between sour, salty, and sweet—flavors sharpened by vinegar, deepened by fermented fish sauces, and softened by coconut and sugar. The archipelago's 7,000-plus islands mean there is no single Filipino cuisine but a family of related ones, united by rice at every meal, a love of souring agents, and dishes designed to make plain rice irresistible. The word for this is 'ulam': anything savory whose real job is to accompany rice.\n\nEating in the Philippines is fundamentally social and generous. The 'fiesta' tradition—town celebrations honoring patron saints—turns entire communities into open kitchens, with lechon (whole roast pig) as the centerpiece and tables groaning with pancit, kakanin rice cakes, and stews. Even everyday meals lean communal: 'kamayan' feasts served on banana leaves and eaten by hand have moved from rural tradition to proud cultural statement.\n\nFilipinos also snack seriously. 'Merienda'—a Spanish-inherited mid-afternoon meal—is an institution of its own, filled with sweet-savory treats like halo-halo, turon, and pandesal. Street corners hum with vendors grilling skewers, frying fish balls, and selling balut, making the sidewalk as important a dining room as the home.",
    mealStructure: "Three rice-centered meals plus one or two merienda breaks. Breakfast is hearty—'silog' plates pair garlic fried rice (sinangag) and egg (itlog) with cured meats like tocino or longganisa. Lunch and dinner center on rice with one or more ulam: a sour soup, a braise, something fried or grilled. Merienda at mid-morning and mid-afternoon bridges the gaps with noodles, rice cakes, or sweet snacks.",
    diningCustoms: "The spoon and fork are the standard utensils—the spoon does the cutting and carrying, the fork pushes and steadies. Sawsawan, personal dipping sauces mixed at the table from vinegar, soy sauce, calamansi, and chilies, let each diner tune every bite. Refusing offered food takes effort; hosts insist, and 'Kain tayo!' ('Let's eat!') is extended to anyone nearby, guest or stranger.",
    historicalInfluences: "Three centuries of Spanish rule left adobo's name, tomato-based stews like menudo and afritada, fiesta culture, and the merienda habit. Chinese traders arrived even earlier, bringing noodles (pancit), soy sauce, lumpia, and rice porridge. The American period added sweetness, canned goods, and spaghetti with hot dogs; Malay and Austronesian foundations—coconut, vinegar-souring, fermented seafood—remain the cuisine's bedrock."
  },
  cuisineProfile: {
    summary: "Filipino cuisine is a bold interplay of sour (asim), salty (alat), and sweet (tamis)—vinegar-braised meats, fermented fish sauces, and coconut-rich stews built to be eaten over rice, with heat kept optional and personal.",
    flavorProfile: ["sour (maasim)", "salty (maalat)", "sweet (matamis)", "savory-fermented (bagoong)", "garlicky", "coconut-rich (ginataan)"],
    flavorIntensity: {
      heat: 3,
      acidity: 9,
      sweetness: 6,
      umami: 8,
      aromatic: 5,
      smokeEarth: 6,
      interpretation: "Sourness leads and fermented umami runs deep, while heat stays gentle—brightness and savor over spice, with charcoal smoke from ubiquitous grilling."
    },
    keyIngredients: ["white rice", "cane and coconut vinegar", "soy sauce (toyo)", "fish sauce (patis)", "shrimp paste (bagoong)", "calamansi", "coconut milk (gata)", "garlic", "pork", "banana"],
    cookingTechniques: ["braising in vinegar (adobo)", "souring soups (sinigang)", "charcoal grilling (inihaw)", "simmering in coconut milk (ginataan)", "deep-frying (prito)", "spit-roasting (lechon)"],
    cookingFlow: [
      { action: "Sauté garlic", emoji: "🧄" },
      { action: "Brown meat", emoji: "🥩" },
      { action: "Add vinegar", emoji: "🫙" },
      { action: "Braise", emoji: "🍲" },
      { action: "Reduce sauce", emoji: "🔥" },
      { action: "Serve on rice", emoji: "🍚" }
    ],
    spicesAndSeasonings: ["black peppercorns", "bay leaves", "garlic", "annatto (atsuete)", "ginger", "labuyo chilies", "lemongrass (tanglad)", "calamansi", "fish sauce (patis)", "shrimp paste (bagoong)", "banana ketchup"],
    ingredientTiers: {
      foundation: [
        { name: "Vinegar", emoji: "🫙", description: "Suka · Souring backbone · Cane, coconut, or palm" },
        { name: "Soy Sauce", emoji: "🍶", description: "Toyo · Salty base · Adobo's dark half" },
        { name: "Fish Sauce", emoji: "🐟", description: "Patis · Umami seasoning · Amber, briny" },
        { name: "Garlic", emoji: "🧄", description: "Bawang · Aromatic base · Fried, sautéed, everywhere" },
        { name: "Calamansi", emoji: "🍋", description: "Philippine lime · Citrus brightener · Floral, tart" }
      ],
      aromaticCore: [
        { name: "Shrimp Paste", emoji: "🦐", description: "Bagoong alamang · Fermented umami · Pungent, salty-sweet" },
        { name: "Ginger", emoji: "🫚", description: "Luya · Aromatic · Warms soups and ginataan" },
        { name: "Bay Leaves", emoji: "🍃", description: "Laurel · Braising herb · Adobo's perfume" },
        { name: "Lemongrass", emoji: "🌿", description: "Tanglad · Aromatic stalk · Stuffed into lechon" },
        { name: "Annatto", emoji: "🟠", description: "Atsuete · Color & flavor · Earthy orange hue" },
        { name: "Black Pepper", emoji: "⚫", description: "Paminta · Whole spice · Adobo's quiet heat" }
      ],
      flavorBuilders: [
        { name: "Coconut Milk", emoji: "🥥", description: "Gata · Rich braising liquid · Sweet, creamy" },
        { name: "Tamarind", emoji: "🫘", description: "Sampalok · Souring fruit · Sinigang's signature" },
        { name: "Onion", emoji: "🧅", description: "Sibuyas · Aromatic · Base of most sautés" },
        { name: "Tomato", emoji: "🍅", description: "Kamatis · Spanish legacy · Sweet-sour body" },
        { name: "Labuyo Chili", emoji: "🌶️", description: "Bird's eye · Optional heat · Fierce, for Bicol" },
        { name: "Banana Ketchup", emoji: "🍌", description: "Wartime invention · Sweet condiment · Red-dyed, tangy" },
        { name: "Green Papaya", emoji: "🥭", description: "Papayang hilaw · Vegetable · Tinola's classic add" },
        { name: "Ube", emoji: "🟣", description: "Purple yam · Dessert star · Nutty, vivid violet" }
      ],
      staples: [
        { name: "White Rice", emoji: "🍚", description: "Kanin · Every-meal staple · The reason for ulam" },
        { name: "Pork", emoji: "🐖", description: "Baboy · Favored protein · Lechon to adobo" },
        { name: "Rice Noodles", emoji: "🍜", description: "Bihon · Pancit base · Chinese-rooted" },
        { name: "Pandesal", emoji: "🥖", description: "Salt bread · Breakfast roll · Soft, faintly sweet" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Luzon (Tagalog Heartland)",
      description: "Manila and the surrounding Tagalog provinces cook the dishes most people picture as Filipino food: soy-and-vinegar adobo, tamarind-soured sinigang, and Chinese-influenced pancit. Batangas and Cavite claim proud local versions—bulalo bone-marrow soup, kapeng barako coffee—while Pampanga, 'the culinary capital,' contributes sisig and refined fiesta cooking.",
      signatureDishes: ["Adobo", "Sinigang", "Sisig", "Bulalo"],
      keyIngredients: ["soy sauce", "cane vinegar", "tamarind", "pork", "calamansi"],
      distinctiveTraits: ["Sour-salty braises", "Kapampangan refinement", "Chinese noodle heritage", "Fiesta cooking"]
    },
    {
      name: "Ilocos (Northern Luzon)",
      description: "The windswept, frugal north favors bitter and salty flavors and lets vegetables lead. Ilocanos season with bagoong isda (fermented fish) rather than shrimp paste, prize the crackle of bagnet (twice-fried pork belly), and famously embrace bitterness in dishes like papaitan. Empanadas here are day-glo orange, stuffed with longganisa and egg, and fried to order.",
      signatureDishes: ["Bagnet", "Pinakbet", "Ilocos Empanada", "Papaitan"],
      keyIngredients: ["bagoong isda", "bitter melon", "native garlic", "pork belly", "sukang Iloko"],
      distinctiveTraits: ["Embrace of bitterness", "Fermented fish seasoning", "Vegetable-forward", "Frugal, intense flavors"]
    },
    {
      name: "Bicol",
      description: "Southeastern Luzon's Bicol region is the Philippines' spice capital, where coconut milk and fiery labuyo chilies define nearly everything. 'Ginataan' cooking—simmering in gata until the coconut oil breaks—produces laing (taro leaves in coconut) and Bicol Express, the country's rare genuinely hot dish. Even the shrimp paste comes stirred with chili here.",
      signatureDishes: ["Bicol Express", "Laing", "Kinunot", "Pinangat"],
      keyIngredients: ["coconut milk", "labuyo chilies", "taro leaves", "shrimp paste", "stingray"],
      distinctiveTraits: ["Only truly spicy region", "Coconut milk in everything", "Taro leaf dishes", "Chili-laced bagoong"]
    },
    {
      name: "Visayas",
      description: "The central islands are grill and seafood country. Cebu's lechon—belly stuffed with lemongrass, garlic, and leeks—is widely called the country's best, needing no liver sauce. Iloilo answers with batchoy noodle soup and pancit molo dumplings, Bacolod with chicken inasal glazed in annatto oil, and everywhere fresh catch becomes kinilaw, 'cooked' only in vinegar and calamansi.",
      signatureDishes: ["Cebu Lechon", "Chicken Inasal", "Kinilaw", "La Paz Batchoy"],
      keyIngredients: ["lemongrass", "annatto oil", "fresh seafood", "coconut vinegar", "native chicken"],
      distinctiveTraits: ["Grilling mastery", "Vinegar-cured raw seafood", "Lechon capital", "Sugar-country sweetness"]
    },
    {
      name: "Mindanao",
      description: "The southern island's Muslim communities—Maranao, Tausug, Maguindanao—cook the Philippines' most spice-layered food, closer in spirit to Malaysia and Indonesia. Palapa, a condiment of caramelized sweet scallion bulbs, chilies, and toasted coconut, seasons everything; turmeric-yellow beef rendang cousins and burnt-coconut kulma stews are halal fiesta fare. Davao adds tropical abundance: durian, pomelo, and grilled tuna belly.",
      signatureDishes: ["Beef Rendang (Maranao)", "Piyanggang Manok", "Tiyula Itum", "Grilled Tuna Belly"],
      keyIngredients: ["palapa", "turmeric", "burnt coconut", "chilies", "durian"],
      distinctiveTraits: ["Halal Moro cuisine", "Burnt-coconut blackened stews", "Palapa condiment", "Malay-Indonesian kinship"]
    }
  ],
  popularDishes: [
    {
      name: "Adobo",
      englishName: "Vinegar-Soy Braised Meat",
      pronunciation: "ah-DOH-boh",
      description: "Chicken or pork braised in vinegar, soy sauce, garlic, bay leaves, and black peppercorns until the sauce reduces to a glossy, tangy glaze. The unofficial national dish, with countless family variations—some dry, some saucy, some with coconut milk.",
      category: "main",
      regionalOrigin: "Nationwide (Tagalog origin)",
      keyTraits: ["vinegar-braised", "garlic", "soy-salty"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Sinigang na Baboy",
      englishName: "Sour Tamarind Pork Soup",
      pronunciation: "sih-nee-GAHNG nah BAH-boy",
      description: "Pork simmered in a bracingly sour tamarind broth with water spinach, radish, okra, and taro. The comfort food Filipinos vote for over adobo—sourness measured by how hard it makes you squint.",
      category: "soup",
      regionalOrigin: "Luzon (Tagalog Heartland)",
      keyTraits: ["tamarind-sour", "brothy", "vegetable-laden"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Lechon",
      englishName: "Whole Roast Pig",
      pronunciation: "leh-CHON",
      description: "Whole pig spit-roasted over charcoal until the skin turns glass-crisp and mahogany. Cebu's version, stuffed with lemongrass and garlic, is the gold standard. No fiesta is complete without it.",
      category: "main",
      regionalOrigin: "Visayas",
      keyTraits: ["spit-roasted", "crispy skin", "lemongrass-stuffed"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sisig",
      englishName: "Sizzling Chopped Pork",
      pronunciation: "SEE-sig",
      description: "Chopped pork face and ears, grilled then griddled on a sizzling plate with onions, chilies, calamansi, and often a raw egg cracked on top. Born in Pampanga as a way to use parts American bases discarded—now the country's favorite beer food.",
      category: "main",
      regionalOrigin: "Luzon (Tagalog Heartland)",
      keyTraits: ["sizzling", "citrusy", "crispy-chewy"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Kinilaw",
      englishName: "Filipino Ceviche",
      pronunciation: "kih-nee-LAO",
      description: "Raw fish—usually tuna or tanigue—cured on the spot in coconut vinegar and calamansi with ginger, onions, and chilies. A pre-colonial dish older than Spanish contact, at its best minutes after mixing.",
      category: "appetizer",
      regionalOrigin: "Visayas",
      keyTraits: ["vinegar-cured", "raw seafood", "ginger-bright"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Bicol Express",
      englishName: "Spicy Coconut Pork Stew",
      pronunciation: "BEE-kol ex-press",
      description: "Pork belly simmered in coconut milk with shrimp paste and a reckless quantity of labuyo and green chilies until the sauce thickens and the oil separates. Named after the Manila–Bicol train; the Philippines' spiciest famous dish.",
      category: "main",
      regionalOrigin: "Bicol",
      keyTraits: ["coconut milk", "chili-heavy", "shrimp paste"],
      popularity: "local-favorite",
      spiceLevel: "very-hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pancit Bihon",
      englishName: "Stir-Fried Rice Noodles",
      pronunciation: "pahn-SIT BEE-hon",
      description: "Thin rice noodles stir-fried with soy sauce, chicken, Chinese sausage, and julienned vegetables, finished with calamansi. Served at every birthday—the long noodles symbolize long life.",
      category: "main",
      regionalOrigin: "Nationwide (Chinese-Filipino)",
      keyTraits: ["stir-fried", "birthday dish", "calamansi-finished"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Chicken Inasal",
      englishName: "Bacolod Grilled Chicken",
      pronunciation: "chih-ken ih-nah-SAHL",
      description: "Chicken marinated in coconut vinegar, calamansi, lemongrass, and ginger, grilled over charcoal while basted with annatto-infused oil. Eaten with garlic rice and a sawsawan of vinegar and chicken oil.",
      category: "main",
      regionalOrigin: "Visayas",
      keyTraits: ["charcoal-grilled", "annatto-basted", "vinegar-marinated"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Lumpiang Shanghai",
      englishName: "Fried Spring Rolls",
      pronunciation: "loom-pyahng shang-HIGH",
      description: "Slender, crackly spring rolls filled with seasoned ground pork and carrots, deep-fried and dunked in sweet chili sauce or banana ketchup. The first platter emptied at any party.",
      category: "appetizer",
      regionalOrigin: "Nationwide (Chinese-Filipino)",
      keyTraits: ["deep-fried", "crispy", "party staple"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Halo-Halo",
      englishName: "Mixed Shaved-Ice Dessert",
      pronunciation: "HAH-loh HAH-loh",
      description: "Literally 'mix-mix': shaved ice and evaporated milk over sweet beans, jellies, plantains, and jackfruit, crowned with ube halaya and leche flan. The definitive merienda on a hot afternoon—stir everything together before eating.",
      category: "dessert",
      regionalOrigin: "Nationwide",
      keyTraits: ["shaved ice", "ube", "layered textures"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Sago't Gulaman",
      englishName: "Tapioca and Jelly Cooler",
      pronunciation: "SAH-goht goo-lah-MAHN",
      description: "Iced drink of arnibal (burnt brown-sugar syrup) with chewy sago pearls and cubes of gulaman jelly, often perfumed with pandan. A street-stall classic sold from big glass jars.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["brown sugar syrup", "sago pearls", "gulaman (agar jelly)", "pandan"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Kapeng Barako",
      englishName: "Barako Coffee",
      pronunciation: "kah-PENG bah-RAH-koh",
      description: "Strong, boldly aromatic liberica coffee grown in Batangas and Cavite—'barako' means tough guy. Traditionally brewed through a cloth sock and sweetened with brown sugar or muscovado.",
      type: "non-alcoholic",
      category: "coffee",
      regionalOrigin: "Luzon (Tagalog Heartland)",
      servedHow: "hot",
      keyIngredients: ["liberica coffee beans", "brown sugar"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Buko Juice",
      englishName: "Fresh Young Coconut Water",
      pronunciation: "BOO-koh",
      description: "Water of the young green coconut served with ribbons of its soft flesh, straight from the shell or over ice with a little milk and sugar as 'buko pandan' variations. Roadside stands hack them open to order.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["young coconut water", "coconut flesh"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Tsokolate",
      englishName: "Filipino Hot Chocolate",
      pronunciation: "cho-koh-LAH-teh",
      description: "Thick hot chocolate whisked frothy with a wooden batirol from tablea—pure roasted cacao tablets. A Spanish-era Christmas and breakfast tradition, paired with pandesal or rice cakes for dunking.",
      type: "non-alcoholic",
      category: "ceremonial",
      servedHow: "hot",
      keyIngredients: ["tablea (cacao tablets)", "milk", "sugar"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Lambanog",
      englishName: "Coconut Arrack",
      pronunciation: "lahm-bah-NOG",
      description: "Potent distilled spirit made from fermented coconut-palm sap (tuba), traditionally shared from a single glass passed around the tagayan drinking circle. Modern distilleries bottle it plain or fruit-infused.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Luzon (Tagalog Heartland)",
      keyIngredients: ["coconut palm sap"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
