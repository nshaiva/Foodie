import type { Country } from '../types';

export const NG: Country = {
  id: "NG",
  name: "Nigeria",
  capital: "Abuja",
  continent: "Africa",
  region: "West Africa",
  colorPalette: {
    primary: "#3e6b4f",      // Muted forest green (from flag)
    secondary: "#8a9a5b",    // Soft moss green
    accent: "#c98a4b",       // Toasted palm-oil amber
    background: "#f7f5ef",   // Warm off-white
    text: "#2b3d31"          // Deep green-charcoal
  },
  foodCulture: {
    overview: "Nigerian food is generous, assertive, and built for gathering. With over 250 ethnic groups—Yoruba, Igbo, Hausa, Ijaw, Efik, and many more—the country is less one cuisine than a federation of them, yet certain things unite the table: a pot of well-seasoned stew, a mound of 'swallow' (pounded or stirred starch), and the conviction that a meal should be substantial. Jollof rice alone carries enough national pride to fuel a permanent, good-natured rivalry with Ghana over whose version reigns.\n\nSoups are the heart of the cuisine—not light broths but rich, thick pots like egusi, ogbono, and afang, built on palm oil, ground seeds, leafy greens, smoked fish, and slow-cooked meats. They are eaten by hand with swallows such as pounded yam, eba, amala, or fufu: pinch, dip, swallow. The technique is as much a part of the meal as the food itself.\n\nFood also marks every occasion. Owambe parties in Lagos are judged by their jollof and small chops; a new yam festival in the east celebrates the harvest with pounded yam and palm wine; in the north, tea stalls and suya grills glow late into the night. Whether from a buka (roadside canteen), a 'mama put' stall, or a family kitchen, Nigerian food is meant to satisfy deeply—flavor and abundance are never optional.",
    mealStructure: "Breakfast might be akara with pap (fermented corn porridge), bread and fried eggs, or yam and egg sauce. Lunch and dinner center on rice dishes or a soup with swallow. The main soup pot is often made in quantity and eaten over several days, refreshed and re-seasoned. Snacking between meals—puff-puff, roasted corn, boli (roasted plantain), chin chin—is constant and beloved.",
    diningCustoms: "Swallows and soups are traditionally eaten with the right hand—washing hands before and after the meal is ritual. Elders are served first, and offering food to a visitor is near-obligatory hospitality; refusing outright can offend. At owambe celebrations, food is the measure of the host's generosity, and takeaway packs for guests are standard.",
    historicalInfluences: "Trans-Saharan trade brought rice culture and spice routes to the Hausa north; Portuguese traders introduced maize, cassava, and chilies from the Americas in the 15th–16th centuries, ingredients now so central they feel indigenous. British colonial rule left baked bread, tea culture, and canned tomato paste in the pantry, while Nigerian cooking itself traveled outward—via the transatlantic slave trade, its techniques and ingredients shaped the cooking of Brazil, the Caribbean, and the American South."
  },
  cuisineProfile: {
    summary: "Nigerian cuisine is bold, deeply savory, and pepper-forward—built on palm oil, smoked and fermented umami, slow-simmered pepper bases, and hearty starches, with flavor that prizes depth and heat over sweetness or acidity.",
    flavorProfile: ["peppery (ata)", "smoky", "earthy", "umami-rich", "palm-oil savory", "fermented funk (iru)"],
    flavorIntensity: {
      heat: 8,
      acidity: 3,
      sweetness: 3,
      umami: 9,
      aromatic: 6,
      smokeEarth: 9,
      interpretation: "Deep, smoky, and savory with serious pepper heat—flavor comes from slow-cooked depth and fermented umami rather than brightness or sweetness."
    },
    keyIngredients: ["palm oil", "scotch bonnet (ata rodo)", "tomatoes", "yam", "cassava (garri, fufu)", "rice", "egusi (melon seeds)", "stockfish and smoked fish", "plantain", "leafy greens (ugu, bitterleaf, ewedu)"],
    cookingTechniques: ["slow-simmering thick soups", "blending pepper bases (tatashe, tomato, onion)", "pounding yam and cassava", "open-fire grilling (suya)", "deep-frying (akara, puff-puff)", "smoking and drying fish", "fermenting (iru, ogi, garri)"],
    cookingFlow: [
      { action: "Blend peppers", emoji: "🌶️" },
      { action: "Bleed palm oil", emoji: "🫗" },
      { action: "Fry the base", emoji: "🍳" },
      { action: "Add meats & fish", emoji: "🍖" },
      { action: "Simmer low", emoji: "🍲" },
      { action: "Serve with swallow", emoji: "🥣" }
    ],
    spicesAndSeasonings: ["scotch bonnet (ata rodo)", "iru (fermented locust beans)", "crayfish (ground dried)", "seasoning cubes (Maggi)", "suya spice (yaji)", "grains of selim (uda)", "calabash nutmeg (ehuru)", "African nutmeg", "curry powder", "dried thyme", "ginger", "garlic"],
    ingredientTiers: {
      foundation: [
        { name: "Palm Oil", emoji: "🫗", description: "Epo pupa · Cooking fat & flavor base · Red, earthy, unmistakable" },
        { name: "Scotch Bonnet", emoji: "🌶️", description: "Ata rodo · Heat source · Fruity, fierce" },
        { name: "Tomato-Pepper Base", emoji: "🍅", description: "Ata lilo · Stew foundation · Blended, fried down" },
        { name: "Ground Crayfish", emoji: "🦐", description: "Dried shrimp powder · Umami base · Smoky, briny" },
        { name: "Onions", emoji: "🧅", description: "Alubosa · Aromatic base · In nearly every pot" }
      ],
      aromaticCore: [
        { name: "Iru", emoji: "🫘", description: "Fermented locust beans · Umami bomb · Deep, funky" },
        { name: "Suya Spice", emoji: "🥜", description: "Yaji · Grill rub · Peanut, ginger, chili" },
        { name: "Ehuru", emoji: "🌰", description: "Calabash nutmeg · Pepper-soup spice · Warm, resinous" },
        { name: "Uda", emoji: "🖤", description: "Grains of selim · Aromatic pod · Smoky, musky" },
        { name: "Ginger", emoji: "🫚", description: "Ata ile · Aromatic · Sharp, warming" },
        { name: "Curry & Thyme", emoji: "🌿", description: "Colonial-era duo · Stew seasoning · Savory, herbal" }
      ],
      flavorBuilders: [
        { name: "Stockfish", emoji: "🐟", description: "Okporoko · Dried cod · Intense, chewy umami" },
        { name: "Smoked Fish", emoji: "🎣", description: "Eja kika · Soup protein · Smoky depth" },
        { name: "Egusi", emoji: "🫛", description: "Melon seeds · Soup thickener · Nutty, rich" },
        { name: "Ogbono", emoji: "🥣", description: "Wild mango seed · Soup thickener · Silky, 'draw' texture" },
        { name: "Ugu", emoji: "🥬", description: "Fluted pumpkin leaf · Soup green · Tender, mild" },
        { name: "Bitterleaf", emoji: "🍃", description: "Onugbu · Soup green · Washed, pleasantly bitter" },
        { name: "Tatashe", emoji: "🫑", description: "Red bell pepper · Stew body · Sweet, deep red" },
        { name: "Groundnut", emoji: "🥜", description: "Peanut · Paste & snack · Rich, nutty" },
        { name: "Seasoning Cubes", emoji: "🧂", description: "Maggi/Knorr · Modern staple · Instant savoriness" }
      ],
      staples: [
        { name: "Yam", emoji: "🍠", description: "Isu · King of tubers · Pounded, boiled, fried" },
        { name: "Rice", emoji: "🍚", description: "Long-grain & ofada · Jollof canvas · Everyday staple" },
        { name: "Cassava", emoji: "🥔", description: "Garri, fufu · Swallow base · Fermented, filling" },
        { name: "Plantain", emoji: "🍌", description: "Dodo when fried · Sweet side · Caramelized edges" },
        { name: "Beans", emoji: "🫘", description: "Honey beans (ewa) · Protein staple · Akara, moin moin, porridge" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Southwest (Yoruba)",
      description: "Lagos, Ibadan, and Yorubaland run on pepper. Stews start from a blended base of tomato, tatashe, and ata rodo fried down in oil until it 'cries'—loses its raw edge. This is the home of party jollof cooked over firewood for smoky flavor, of amala with ewedu and gbegiri, and of a legendary street-food scene from bukas to owambe halls.",
      signatureDishes: ["Party Jollof Rice", "Amala with Ewedu & Gbegiri", "Efo Riro", "Asun (spicy grilled goat)"],
      keyIngredients: ["ata rodo (scotch bonnet)", "tatashe", "palm oil", "iru", "yam flour (elubo)", "ewedu leaves"],
      distinctiveTraits: ["Pepper-first cooking", "Smoky party jollof", "Amala and 'abula' soup combos", "Vibrant street-food culture"]
    },
    {
      name: "Southeast (Igbo)",
      description: "The Igbo heartland—Enugu, Anambra, Imo—is yam country, where the New Yam Festival (Iri Ji) still marks the harvest year. Soups are thick, bitter-edged, and rich with stockfish and ogbono; oil bean seeds are fermented for ugba, and abacha (shredded dried cassava) is dressed into the beloved 'African salad.'",
      signatureDishes: ["Ofe Onugbu (bitterleaf soup)", "Ofe Ogbono", "Abacha (African salad)", "Nkwobi (spiced cow foot)"],
      keyIngredients: ["yam", "bitterleaf", "ogbono", "stockfish", "ugba (fermented oil bean)", "palm oil"],
      distinctiveTraits: ["Yam reverence and festivals", "Bitter and fermented flavors", "'Draw' soups with silky texture", "Palm-wine pairings"]
    },
    {
      name: "South-South (Niger Delta)",
      description: "The riverine Delta—Rivers, Bayelsa, Cross River, Akwa Ibom—cooks the country's most celebrated seafood. Calabar and Akwa Ibom kitchens are famed nationwide for afang and edikang ikong, greens-packed soups dense with periwinkles, crayfish, and smoked fish. Banga soup, made from pressed palm fruit, is the Delta's signature.",
      signatureDishes: ["Banga Soup", "Afang Soup", "Edikang Ikong", "Fisherman Pepper Soup"],
      keyIngredients: ["palm fruit", "periwinkles", "fresh and smoked fish", "afang leaves", "waterleaf", "atama leaves"],
      distinctiveTraits: ["Seafood-dense soups", "Palm-fruit extract bases", "Calabar's reputation as Nigeria's food capital", "Delicate aromatic leaves"]
    },
    {
      name: "North (Hausa-Fulani)",
      description: "The savanna north—Kano, Kaduna, Sokoto—is grain and cattle country shaped by Sahelian trade and Fulani herding. Suya, beef skewered and dusted with peanut-chili yaji then grilled over open flame, is the region's gift to the whole nation. Meals lean on rice, millet, and sorghum, with groundnut-based soups like miyan taushe and fura da nono, a millet-and-fermented-milk drink.",
      signatureDishes: ["Suya", "Kilishi (spiced jerky)", "Miyan Taushe (groundnut-pumpkin soup)", "Masa (rice cakes)", "Tuwo Shinkafa"],
      keyIngredients: ["beef", "yaji (suya spice)", "groundnuts", "millet", "sorghum", "kuli kuli", "dried baobab leaves (kuka)"],
      distinctiveTraits: ["Open-fire grilling mastery", "Grain-based swallows (tuwo)", "Dairy from Fulani herds", "Halal cuisine throughout"]
    },
    {
      name: "Middle Belt",
      description: "Nigeria's central plateau—Jos, Benue, Nasarawa—is the country's food basket, where Tiv, Idoma, and Berom farmers grow much of its yams, soybeans, and vegetables. The cooking bridges north and south: benniseed (sesame) soups, acha (fonio) grain, and Benue's famous pounded yam, considered by many the best in the country.",
      signatureDishes: ["Pounded Yam with Benniseed Soup", "Gwote (acha porridge)", "Burukutu-braised dishes", "Okoho Soup"],
      keyIngredients: ["yam", "benniseed (sesame)", "acha (fonio)", "soybeans", "okoho stems", "sweet potatoes"],
      distinctiveTraits: ["Nigeria's yam basket", "Ancient grains like fonio", "Sesame-based soups", "North-south crossroads flavors"]
    }
  ],
  popularDishes: [
    {
      name: "Jollof Rice",
      pronunciation: "JOH-lof",
      description: "Long-grain rice cooked in a fried-down base of tomato, red pepper, and scotch bonnet until every grain is stained red and infused with smoke—party versions cooked over firewood are prized for their 'party jollof' char. The centerpiece of every Nigerian celebration and a point of fierce West African pride.",
      category: "main",
      regionalOrigin: "Nationwide (perfected in the Southwest)",
      keyTraits: ["tomato-pepper base", "smoky", "one-pot"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Egusi Soup",
      englishName: "Melon Seed Soup",
      pronunciation: "eh-GOO-see",
      description: "Thick, nutty soup of ground melon seeds simmered in palm oil with leafy greens, assorted meats, stockfish, and crayfish. Eaten by hand with pounded yam, eba, or fufu—arguably Nigeria's most widely loved soup.",
      category: "soup",
      regionalOrigin: "Nationwide",
      keyTraits: ["ground melon seeds", "palm oil", "leafy greens"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Suya",
      englishName: "Spiced Grilled Beef Skewers",
      pronunciation: "SOO-yah",
      description: "Thin-sliced beef rubbed with yaji—a heady mix of ground peanuts, ginger, and chili—then grilled over open flame by Hausa mai suya vendors. Served wrapped in newspaper with raw onions and extra spice, it is Nigeria's definitive night-time street food.",
      category: "street-food",
      regionalOrigin: "Northern Nigeria",
      keyTraits: ["yaji spice rub", "open-fire grilled", "peanut-chili"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Pounded Yam with Efo Riro",
      englishName: "Pounded Yam with Spinach Stew",
      pronunciation: "eh-FAW REE-raw",
      description: "Boiled yam pounded into a smooth, stretchy mound, paired with efo riro—a Yoruba stew of shredded greens simmered in a peppery palm-oil base with iru, smoked fish, and assorted meats.",
      category: "main",
      regionalOrigin: "Southwest (Yoruba)",
      keyTraits: ["pounded swallow", "peppery greens", "iru"],
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Akara",
      englishName: "Bean Fritters",
      pronunciation: "AH-kah-rah",
      description: "Peeled honey beans whipped into a fluffy batter with onions and pepper, then deep-fried into golden fritters. A Saturday-morning classic eaten with pap (ogi) or stuffed into soft agege bread.",
      category: "breakfast",
      regionalOrigin: "Southwest (now nationwide)",
      keyTraits: ["deep-fried", "bean batter", "crispy-fluffy"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Moin Moin",
      englishName: "Steamed Bean Pudding",
      pronunciation: "moy-moy",
      description: "Silky steamed pudding of blended beans, peppers, and onions, often studded with boiled egg or fish, traditionally wrapped and steamed in ewe eran leaves that lend a gentle aroma. A staple at parties and alongside jollof.",
      category: "side",
      regionalOrigin: "Southwest (now nationwide)",
      keyTraits: ["steamed", "bean-based", "leaf-wrapped"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pepper Soup",
      pronunciation: "PEH-per soop",
      description: "A hot, thin, intensely aromatic broth spiced with ehuru, uda, and uziza, made with goat meat, catfish, or chicken. Prescribed for cold nights, new mothers, and long evenings over drinks—heat as therapy.",
      category: "soup",
      regionalOrigin: "South-South & Southeast",
      keyTraits: ["aromatic spice blend", "brothy", "fiery"],
      popularity: "local-favorite",
      spiceLevel: "very-hot",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Ofe Ogbono",
      englishName: "Wild Mango Seed Soup",
      pronunciation: "oh-feh og-BAW-naw",
      description: "Igbo 'draw' soup thickened with ground ogbono seeds into a silky, stretchy texture, rich with palm oil, stockfish, and greens. The slippery consistency makes swallows glide down—a texture Nigerians prize.",
      category: "soup",
      regionalOrigin: "Southeast (Igbo)",
      keyTraits: ["draw texture", "ogbono seeds", "stockfish"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dodo",
      englishName: "Fried Sweet Plantain",
      pronunciation: "DOH-doh",
      description: "Ripe plantain sliced and fried until the edges caramelize—sweet, soft-centered, and served alongside jollof, rice and stew, or beans. The most beloved side dish in the country.",
      category: "side",
      regionalOrigin: "Nationwide",
      keyTraits: ["caramelized", "sweet", "fried"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Puff-Puff",
      pronunciation: "puf-puf",
      description: "Deep-fried balls of sweet, yeasted dough—golden outside, airy and chewy within. Sold hot from street-side pans and essential to the 'small chops' platters served at every Nigerian party.",
      category: "dessert",
      regionalOrigin: "Nationwide",
      keyTraits: ["yeasted dough", "deep-fried", "sweet"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isDairyFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Zobo",
      englishName: "Hibiscus Drink",
      pronunciation: "ZOH-boh",
      description: "Deep-crimson drink brewed from dried hibiscus (roselle) petals with ginger, cloves, and sometimes pineapple, served well chilled. Tart, floral, and refreshing—the default party and street cooler.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Northern origin, nationwide",
      servedHow: "cold",
      keyIngredients: ["dried hibiscus petals", "ginger", "cloves", "pineapple"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Palm Wine",
      englishName: "Emu / Nkwu",
      pronunciation: "ehm-OO / n-KWOO",
      description: "Naturally fermented sap tapped from palm trees—milky, lightly fizzy, and sweet when fresh, growing stronger and more sour by the hour. Central to ceremonies, village gatherings, and traditional weddings in the south.",
      type: "alcoholic",
      category: "ceremonial",
      regionalOrigin: "Southern Nigeria",
      servedHow: "room temperature",
      keyIngredients: ["fresh palm sap"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Kunu",
      englishName: "Millet Drink",
      pronunciation: "KOO-noo",
      description: "Creamy, lightly spiced drink of soaked and ground millet or sorghum with ginger and sweet potato, strained and chilled. A northern staple sold in recycled bottles from coolers across the country.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Northern Nigeria",
      servedHow: "cold",
      keyIngredients: ["millet", "ginger", "sweet potato", "cloves"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Fura da Nono",
      englishName: "Millet Balls in Fermented Milk",
      pronunciation: "FOO-rah dah NOH-noh",
      description: "Spiced millet dough balls crumbled into nono, the tangy fermented cow's milk of Fulani herders—part drink, part meal, sold by calabash-carrying vendors across the savanna north.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Northern Nigeria (Fulani)",
      servedHow: "cold",
      keyIngredients: ["millet", "fermented cow's milk", "ginger", "cloves"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Chapman",
      pronunciation: "CHAP-man",
      description: "Nigeria's signature mocktail—a rosy blend of Fanta, Sprite, blackcurrant cordial, Angostura bitters, and cucumber over ice, invented at a Lagos club and now on every celebration menu.",
      type: "non-alcoholic",
      category: "cocktail",
      regionalOrigin: "Lagos",
      servedHow: "iced",
      keyIngredients: ["orange soda", "lemon-lime soda", "blackcurrant cordial", "Angostura bitters", "cucumber"],
      isTraditional: false,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
