import type { Country } from '../types';

export const MA: Country = {
  id: "MA",
  name: "Morocco",
  capital: "Rabat",
  continent: "Africa",
  region: "North Africa (Maghreb)",
  colorPalette: {
    primary: "#9a3b2e",      // Muted terracotta red (from flag red)
    secondary: "#3d6b4f",    // Desaturated zellige green (from flag star)
    accent: "#c98f4e",       // Saffron ochre
    background: "#faf5ec",   // Sandstone cream
    text: "#4a2c22"          // Deep clay brown
  },
  foodCulture: {
    overview: "Moroccan cooking is slow food in the most literal sense: tagines murmur over charcoal for hours, couscous is steamed and raked three times before it reaches the table, and bread is carried to the neighborhood ferran (communal oven) to bake alongside everyone else's. Hospitality is not a nicety but a duty—an unexpected guest means another place set, more bread torn, and the best pieces of meat nudged to their side of the communal dish.\n\nThe cuisine is built on a distinctive marriage of sweet and savory that few other food cultures pursue so confidently: lamb simmered with prunes and honey, chicken buried under caramelized onions and raisins, pigeon pie dusted with cinnamon and powdered sugar. Behind these contrasts sits a sophisticated spice culture—cumin, ginger, saffron, and cinnamon layered with restraint rather than heat.\n\nFood also keeps Morocco's calendar. Friday means couscous after midday prayers, Ramadan evenings begin with harira soup and dates, and every celebration—wedding, birth, or homecoming—has its prescribed dishes. Meals unfold around a single round table, eaten from a shared platter with bread and the right hand, and always end with mint tea poured high from a silver pot.",
    mealStructure: "Bread (khobz) anchors every meal and doubles as the utensil. Breakfast is bread with olive oil, amlou, or msemen flatbreads and mint tea; lunch is the main meal, traditionally a tagine or, on Fridays, couscous; dinner is lighter—harira, leftovers, or a simple tagine. Dishes are served one at a time to a shared table rather than plated individually.",
    diningCustoms: "Diners gather around one low round table and eat from a communal dish using the right hand and torn bread—each person keeps to the 'triangle' of the platter directly in front of them. The host offers the choicest morsels to guests. Mint tea service is a ritual of welcome: poured from height to raise a foam, and it is polite to accept at least the first glass.",
    historicalInfluences: "Amazigh (Berber) cooking supplies the foundation—couscous, tagine, and preserved staples suited to mountain and desert life. Arab traders brought spices, dried fruit, and the sweet-savory pairings of the medieval Islamic kitchen; Moorish refugees from al-Andalus added olives, citrus, and refined pastry work; Sephardic Jewish communities perfected preserving techniques like confit and pickled lemons; and the French protectorate left café culture, pâtisserie, and the round baguette alongside khobz."
  },
  cuisineProfile: {
    summary: "Moroccan cuisine layers warm, earthy spices—cumin, ginger, saffron, cinnamon—over slow-cooked meats, vegetables, and grains, balancing savory depth with dried fruit sweetness and the sharp brightness of preserved lemon and olives.",
    flavorProfile: ["warm-spiced (ras el hanout)", "sweet-savory (hlou)", "earthy (cumin, kamoun)", "tangy (preserved lemon, l'hamd markad)", "herbaceous (cilantro & parsley)", "smoky (charcoal & smen)"],
    flavorIntensity: {
      heat: 3,
      acidity: 6,
      sweetness: 6,
      umami: 5,
      aromatic: 9,
      smokeEarth: 7,
      interpretation: "Deeply aromatic and earthy rather than hot—perfumed spice blends and slow charcoal cooking carry the cuisine, brightened by preserved lemon and sweetened by dried fruit."
    },
    keyIngredients: ["couscous", "preserved lemon", "olives & olive oil", "lamb", "chickpeas", "dried fruit (prunes, apricots, raisins)", "almonds", "tomatoes", "onions", "semolina bread (khobz)"],
    cookingTechniques: ["slow-braising in a tagine", "steaming couscous over broth", "charcoal grilling (mechoui, brochettes)", "preserving (lemons, olives, smen, khlea)", "layering and baking warqa pastry"],
    cookingFlow: [
      { action: "Bloom spices", emoji: "🧂" },
      { action: "Brown & layer", emoji: "🧅" },
      { action: "Cover tagine", emoji: "🫕" },
      { action: "Slow braise", emoji: "🔥" },
      { action: "Finish sweet or tangy", emoji: "🍋" }
    ],
    spicesAndSeasonings: ["cumin", "ground ginger", "sweet paprika", "cinnamon", "saffron", "turmeric", "ras el hanout", "black pepper", "coriander seed", "aniseed", "sesame seeds", "harissa (borrowed, table condiment)", "fresh cilantro & flat parsley", "mint"],
    ingredientTiers: {
      foundation: [
        { name: "Olive Oil", emoji: "🫒", description: "Zit zitoun · Cooking fat & finish · Peppery, fruity" },
        { name: "Preserved Lemon", emoji: "🍋", description: "L'hamd markad · Signature souring agent · Salty, floral tang" },
        { name: "Cumin", emoji: "🟤", description: "Kamoun · Everyday spice · Earthy, warming" },
        { name: "Onions", emoji: "🧅", description: "Basla · Braise base · Melts to sweetness" },
        { name: "Saffron", emoji: "🌸", description: "Zaafran · Prestige spice · Golden, honeyed" }
      ],
      aromaticCore: [
        { name: "Ras el Hanout", emoji: "🧂", description: "'Top of the shop' · Master blend · Up to 30 spices" },
        { name: "Ground Ginger", emoji: "🫚", description: "Skinjbir · Braising spice · Warm, dry heat" },
        { name: "Cinnamon", emoji: "🪵", description: "Karfa · Sweet-savory bridge · Woody, perfumed" },
        { name: "Cilantro & Parsley", emoji: "🌿", description: "Qasbour & maadnous · Herb bouquet · Tied and simmered" },
        { name: "Fresh Mint", emoji: "🍃", description: "Naanaa · Tea essential · Cooling, sweet" },
        { name: "Sweet Paprika", emoji: "🌶️", description: "Felfla hlouwa · Color & depth · Gentle, fruity" }
      ],
      flavorBuilders: [
        { name: "Olives", emoji: "🫒", description: "Zitoun · Briny garnish · Cracked green or oil-cured" },
        { name: "Garlic", emoji: "🧄", description: "Touma · Aromatic · Pounded into marinades" },
        { name: "Tomatoes", emoji: "🍅", description: "Matisha · Sauce base · Grated, slow-cooked jammy" },
        { name: "Prunes", emoji: "🟣", description: "Barkouk · Sweet element · Honey-glazed in tagines" },
        { name: "Almonds", emoji: "🌰", description: "Louz · Garnish & pastry · Fried or ground" },
        { name: "Honey", emoji: "🍯", description: "Assel · Sweetener · Glazes and pastry soaks" },
        { name: "Smen", emoji: "🧈", description: "Aged butter · Umami fat · Funky, cheese-like" },
        { name: "Harissa", emoji: "🔴", description: "Chili paste · Table heat · Optional, diner's choice" },
        { name: "Orange Flower Water", emoji: "🌼", description: "Ma zhar · Perfume · Scents salads & sweets" }
      ],
      staples: [
        { name: "Couscous", emoji: "🌾", description: "Seksu · Steamed semolina · Friday centerpiece" },
        { name: "Khobz", emoji: "🍞", description: "Round bread · Daily staple · Doubles as the utensil" },
        { name: "Chickpeas", emoji: "🫘", description: "Hummus · Legume staple · Bulks soups & couscous" },
        { name: "Lamb", emoji: "🐑", description: "Ghanmi · Celebration meat · Braised or spit-roasted" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Fez & the North",
      description: "Fez is Morocco's culinary capital, where the refined cuisine of al-Andalus met the imperial court. Dishes here are the most elaborate in the country—warqa pastry work, saffron-gilded braises, and the boldest sweet-savory contrasts. The nearby Rif and Tangier add Mediterranean seafood and Spanish echoes.",
      signatureDishes: ["Pastilla", "Tagine with preserved lemon & olives", "Trid", "Khlea with eggs"],
      keyIngredients: ["warqa pastry", "saffron", "preserved lemon", "pigeon & poultry", "khlea (preserved meat)"],
      distinctiveTraits: ["Andalusi refinement", "Elaborate pastry work", "Boldest sweet-savory pairings", "Imperial court heritage"]
    },
    {
      name: "Marrakech & the South",
      description: "The red city's food answers to the heat of the plains: slow mechoui lamb pit-roasted until it shreds, the steam-cooked tanjia left overnight in hammam ashes, and Jemaa el-Fnaa's smoke-wreathed grill stalls. Amazigh traditions from the High Atlas bring hearty barley couscous and vegetable tagines.",
      signatureDishes: ["Tanjia Marrakchia", "Mechoui", "Tagine of lamb with prunes", "Hergma"],
      keyIngredients: ["lamb", "cumin & salt (grill seasoning)", "smen", "barley", "prunes"],
      distinctiveTraits: ["Urn-cooked tanjia", "Pit-roasted mechoui", "Street grill culture", "High Atlas Amazigh influence"]
    },
    {
      name: "Atlantic Coast",
      description: "From Casablanca down through El Jadida to Essaouira, the cold Atlantic supplies sardines—Morocco's true national fish—plus sea bream, conger eel, and spider crab. The signature move is chermoula, a cumin-cilantro-garlic marinade that turns grilled and fried fish into some of the country's best cheap eating.",
      signatureDishes: ["Grilled sardines with chermoula", "Fish tagine", "Stuffed sardines (sardines farcies)", "Seafood bastilla"],
      keyIngredients: ["sardines", "chermoula", "white fish", "tomatoes & peppers", "lemon"],
      distinctiveTraits: ["Chermoula marinade on everything", "Port-side grill shacks", "Sardine abundance", "Lighter, brighter flavors"]
    },
    {
      name: "Sahara & Oases",
      description: "In the Draa and Ziz valleys and out toward the ergs, cooking adapts to scarcity and travel: dates from million-palm oases, camel meat, and breads baked in sand or embers. Meals are simpler and more ancient—Amazigh and Saharawi traditions of slow fires, dried meat, and sweet mint tea drunk in three ritual rounds.",
      signatureDishes: ["Medfouna (Berber 'pizza')", "Camel tagine", "Dates with buttermilk", "Sand-baked bread"],
      keyIngredients: ["dates", "camel meat", "barley & semolina", "dried herbs", "buttermilk (lben)"],
      distinctiveTraits: ["Ember- and sand-baking", "Date-centered diet", "Nomadic preservation", "Three-round tea ceremony"]
    }
  ],
  popularDishes: [
    {
      name: "Tagine Djaj bil Hamd",
      englishName: "Chicken Tagine with Preserved Lemon & Olives",
      pronunciation: "ta-jeen djaj beel hamd",
      description: "Chicken braised slowly in a conical clay tagine with saffron, ginger, and melting onions, finished with tangy preserved lemon rind and cracked green olives. The defining savory tagine, scooped up with khobz.",
      category: "main",
      regionalOrigin: "Fez & the North",
      keyTraits: ["preserved lemon", "slow-braised", "saffron"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isHalal: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Couscous Bidaoui",
      englishName: "Friday Couscous with Seven Vegetables",
      pronunciation: "koos-koos bee-da-wee",
      description: "Hand-rolled semolina steamed three times until feather-light, mounded over lamb or chicken and seven vegetables simmered in a saffron-turmeric broth. The ritual Friday lunch across the country, often crowned with caramelized onions and raisins (tfaya).",
      category: "main",
      regionalOrigin: "Nationwide (Casablanca style)",
      keyTraits: ["steamed semolina", "seven vegetables", "saffron broth"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isHalal: true, isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Bastilla",
      englishName: "Sweet & Savory Pigeon Pie",
      pronunciation: "bass-tee-ya",
      description: "Shatteringly thin warqa pastry layered with spiced pigeon or chicken, lemony egg curd, and fried almonds, then baked and dusted with cinnamon and powdered sugar. Fez's celebration showpiece and Morocco's boldest sweet-savory statement.",
      category: "main",
      regionalOrigin: "Fez & the North",
      keyTraits: ["warqa pastry", "sweet-savory", "cinnamon & almond"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isHalal: true }
    },
    {
      name: "Harira",
      englishName: "Tomato, Lentil & Chickpea Soup",
      pronunciation: "ha-ree-ra",
      description: "Velvety tomato soup thickened with tadouira (flour and water), full of lentils, chickpeas, herbs, and a little lamb, brightened with lemon. The soup that breaks the fast every Ramadan evening, eaten with dates and chebakia.",
      category: "soup",
      regionalOrigin: "Nationwide",
      keyTraits: ["tomato & legumes", "herb-rich", "Ramadan staple"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isHalal: true, isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Tanjia Marrakchia",
      englishName: "Marrakech Urn-Cooked Lamb",
      pronunciation: "tan-jee-ya mar-rak-shee-ya",
      description: "Lamb shanks sealed in a clay urn with preserved lemon, garlic, cumin, saffron, and smen, then left to cook overnight in the ashes of the hammam furnace. Historically a bachelors' dish, prepared by men for weekend feasts.",
      category: "main",
      regionalOrigin: "Marrakech & the South",
      keyTraits: ["urn-cooked", "smen", "overnight braise"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Kefta Mkaouara",
      englishName: "Meatball & Egg Tagine",
      pronunciation: "kef-ta m-kow-ra",
      description: "Cumin-and-paprika-spiced beef or lamb meatballs simmered in a jammy tomato sauce, with eggs cracked directly into the bubbling tagine to poach. Everyday comfort food scooped straight from the dish with bread.",
      category: "main",
      regionalOrigin: "Nationwide",
      keyTraits: ["spiced meatballs", "tomato sauce", "poached egg"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isHalal: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Zaalouk",
      englishName: "Smoky Eggplant & Tomato Salad",
      pronunciation: "zaa-look",
      description: "Charred eggplant mashed with tomatoes, garlic, cumin, paprika, and olive oil into a warm, smoky dip. One of the cooked salads (salades marocaines) that open a Moroccan meal, eaten with bread.",
      category: "salad",
      regionalOrigin: "Nationwide",
      keyTraits: ["charred eggplant", "cumin", "olive oil"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isHalal: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sardin Mchermel",
      englishName: "Grilled Sardines with Chermoula",
      pronunciation: "sar-deen m-shar-mel",
      description: "Fresh Atlantic sardines slathered in chermoula—a pounded marinade of cilantro, garlic, cumin, paprika, and lemon—then grilled over charcoal or fried in pairs sandwiching more marinade. The definitive taste of Essaouira's port stalls.",
      category: "street-food",
      regionalOrigin: "Atlantic Coast",
      keyTraits: ["chermoula", "charcoal-grilled", "fresh sardines"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isHalal: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Msemen",
      englishName: "Laminated Square Flatbread",
      pronunciation: "m-sem-men",
      description: "Square flatbread folded and re-folded with oil and semolina into flaky layers, griddled until crisp-chewy. Eaten for breakfast or teatime drizzled with honey and butter, or stuffed with spiced onions and khlea.",
      category: "breakfast",
      regionalOrigin: "Nationwide",
      keyTraits: ["laminated dough", "griddled", "honey-drizzled"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isHalal: true, isNutFree: true }
    },
    {
      name: "Chebakia",
      englishName: "Sesame-Honey Flower Cookies",
      pronunciation: "sheb-a-kee-ya",
      description: "Ribbons of aniseed-and-saffron dough folded into rose shapes, fried, plunged into hot honey scented with orange flower water, and rolled in sesame. Made in mountains during Ramadan to accompany harira.",
      category: "dessert",
      regionalOrigin: "Nationwide",
      keyTraits: ["honey-soaked", "sesame", "aniseed"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarian: true, isHalal: true, isDairyFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Atay bi Naanaa",
      englishName: "Moroccan Mint Tea",
      pronunciation: "a-tie bee na-na",
      description: "Chinese gunpowder green tea steeped with fistfuls of fresh spearmint and generous sugar, poured from height into small glasses to raise a foam. The national drink and the ritual of hospitality itself—refusing a glass is nearly impossible.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["gunpowder green tea", "fresh spearmint", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Asir Limoun",
      englishName: "Fresh Orange Juice",
      pronunciation: "a-seer lee-moon",
      description: "Oranges from the Souss and Berkane pressed to order at market carts—most famously the juice stalls ringing Jemaa el-Fnaa in Marrakech. Sometimes perfumed with a drop of orange flower water.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["oranges", "orange flower water (optional)"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Nous Nous",
      englishName: "Half-Half Coffee",
      pronunciation: "noos noos",
      description: "'Half-half'—equal parts espresso and steamed milk served in a small glass, the default order in Morocco's ubiquitous French-style cafés, where it is nursed slowly over conversation.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["espresso", "steamed milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Lben",
      englishName: "Cultured Buttermilk",
      pronunciation: "l-ben",
      description: "Tangy buttermilk left over from churning raw milk, drunk cold alongside couscous or with dates in the countryside and the Sahara. A refreshing, slightly sour counterpoint to rich food.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      regionalOrigin: "Countryside & Sahara",
      keyIngredients: ["cultured milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Mahia",
      englishName: "Fig Eau-de-Vie",
      pronunciation: "ma-hee-ya",
      description: "'Water of life'—a clear spirit distilled from figs or dates with aniseed, historically made by Morocco's Jewish communities. Rare today but a living link to the country's Sephardic heritage.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Historically Jewish quarters (mellahs)",
      keyIngredients: ["figs", "aniseed"],
      alcoholContent: "high",
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
