import type { Country } from '../types';

export const LB: Country = {
  id: "LB",
  name: "Lebanon",
  capital: "Beirut",
  continent: "Asia",
  region: "Middle East (Levant)",
  colorPalette: {
    primary: "#5a7a5e",      // Muted cedar green (from flag emblem)
    secondary: "#a84448",    // Softened crimson (from flag bands)
    accent: "#c9a86a",       // Warm sand gold
    background: "#f7f5f0",   // Limestone white
    text: "#2f3f34"          // Deep cedar gray-green
  },
  foodCulture: {
    overview: "Lebanese food culture revolves around the mezze table—a sprawling procession of small plates meant to be lingered over for hours with family and friends. Generosity is the organizing principle: a host's table should always hold more than the guests can finish, and refusing a second helping is practically a negotiation. Eating alone is considered vaguely tragic; eating well and long, in company, is the national pastime.\n\nDespite its small size, Lebanon punches far above its weight in culinary influence—dishes like hummus, tabbouleh, and shawarma have become global staples, though locals will insist the versions abroad are pale imitations. The cuisine is anchored in the Mediterranean trinity of olive oil, lemon, and garlic, with an unusual emphasis on fresh raw vegetables, herbs eaten by the handful, and grains like bulgur that predate rice in the region by millennia.\n\nBread is sacred. Flat, pillowy khebez (pita) functions as plate, utensil, and food all at once—torn into scoops for dips, wrapped around grilled meats, or baked fresh with za'atar for breakfast. Many Lebanese still bring dough to neighborhood bakeries or buy man'oushe hot off the saj in the morning, a ritual that has survived war, diaspora, and economic collapse.",
    mealStructure: "Breakfast is often man'oushe (za'atar flatbread), labneh with olive oil, or a weekend spread of foul and fatteh. Lunch is traditionally the main meal—mezze followed by a grilled or stewed main with rice or bulgur. Dinner can be light (labneh, cheese, olives, vegetables) or, on social occasions, a full mezze marathon stretching late into the night with arak.",
    diningCustoms: "Mezze plates are shared by all; you scoop dips with torn bread rather than utensils. Hospitality is intense—guests are urged to eat repeatedly ('sahtein!', meaning 'double health,' is said before and during meals). Arak accompanies long lunches, always diluted with water and ice, never gulped. Coffee closes the meal and refusing it entirely can read as a slight.",
    historicalInfluences: "Lebanese cuisine layers Phoenician seafaring trade (olives, wine, wheat), four centuries of Ottoman rule (kibbeh traditions, stuffed vegetables, baklava, coffee culture), and a French Mandate period that left croissants, flan, and a wine-making renaissance. The vast Lebanese diaspora—larger than the country's population—carried the cuisine worldwide and sent back influences in return."
  },
  cuisineProfile: {
    summary: "Lebanese cuisine is bright, herbal, and generous—built on lemon, olive oil, garlic, and fresh parsley and mint, balanced between raw vegetable freshness and deep charcoal-grilled and slow-simmered savors.",
    flavorProfile: ["lemony (hamod)", "garlicky (toum)", "herbal (na'na & baqdounes)", "smoky char (mashewe)", "tangy-creamy (labneh)", "nutty (tahini & pine nuts)"],
    flavorIntensity: {
      heat: 2,
      acidity: 8,
      sweetness: 3,
      umami: 5,
      aromatic: 7,
      smokeEarth: 6,
      interpretation: "Gentle on chili heat but sharply bright with lemon and sumac, layered over charcoal smoke, warm spice, and herbal freshness."
    },
    keyIngredients: ["olive oil", "lemon", "garlic", "tahini", "bulgur", "chickpeas", "flat-leaf parsley", "mint", "labneh", "pomegranate molasses", "flatbread (khebez)"],
    cookingTechniques: ["charcoal grilling (mashewe)", "slow stewing (yakhne)", "stuffing vegetables and leaves (mehshi)", "raw pounding and kneading (nayyeh)", "frying and baking kibbeh", "straining yogurt (labneh)"],
    cookingFlow: [
      { action: "Chop herbs", emoji: "🌿" },
      { action: "Squeeze lemon", emoji: "🍋" },
      { action: "Whip tahini", emoji: "🥣" },
      { action: "Grill over coals", emoji: "🔥" },
      { action: "Drizzle olive oil", emoji: "🫒" }
    ],
    spicesAndSeasonings: ["sumac", "za'atar (wild thyme blend)", "seven-spice (baharat sab'a)", "cinnamon", "allspice", "cumin", "dried mint", "Aleppo pepper", "mahlab", "orange blossom water", "rose water"],
    ingredientTiers: {
      foundation: [
        { name: "Olive Oil", emoji: "🫒", description: "Zeit zeitoun · Fat & finisher · Peppery, grassy" },
        { name: "Lemon", emoji: "🍋", description: "Hamod · Acid backbone · Bright, sharp" },
        { name: "Garlic", emoji: "🧄", description: "Toum · Aromatic base · Pungent, whipped into sauce" },
        { name: "Tahini", emoji: "🥜", description: "Sesame paste · Sauce base · Nutty, creamy" },
        { name: "Flatbread", emoji: "🫓", description: "Khebez · Edible utensil · Soft, pocketed" }
      ],
      aromaticCore: [
        { name: "Parsley", emoji: "🌿", description: "Baqdounes · Bulk herb · Grassy, clean" },
        { name: "Mint", emoji: "🍃", description: "Na'na · Fresh & dried herb · Cooling, sweet" },
        { name: "Sumac", emoji: "🔴", description: "Summa' · Sour spice · Tangy, wine-dark" },
        { name: "Za'atar", emoji: "🟢", description: "Wild thyme blend · Signature seasoning · Herbal, sesame-nutty" },
        { name: "Seven-Spice", emoji: "🟤", description: "Baharat sab'a · Warm spice blend · Allspice-cinnamon depth" },
        { name: "Pomegranate Molasses", emoji: "🍒", description: "Dibs rumman · Sour-sweet syrup · Tangy, glossy" }
      ],
      flavorBuilders: [
        { name: "Onion", emoji: "🧅", description: "Basal · Aromatic · Caramelized in mujaddara" },
        { name: "Pine Nuts", emoji: "🌰", description: "Snobar · Garnish · Buttery, toasted" },
        { name: "Cinnamon", emoji: "🪵", description: "Erfeh · Warm spice · Savory use in stews" },
        { name: "Allspice", emoji: "⚫", description: "Bhar helou · Warm spice · Rounds ground meat" },
        { name: "Dried Mint", emoji: "🥬", description: "Na'na yebes · Seasoning · Concentrated, earthy" },
        { name: "Aleppo Pepper", emoji: "🌶️", description: "Flefleh halabiyeh · Gentle chili · Fruity, mild" },
        { name: "Orange Blossom Water", emoji: "🌸", description: "Mazaher · Floral essence · Perfumes desserts" },
        { name: "Yogurt", emoji: "🥛", description: "Laban · Sauce & drink · Tangy, cooling" },
        { name: "Walnuts", emoji: "🥔", description: "Joz · Nut · Rich, in muhammara & desserts" }
      ],
      staples: [
        { name: "Bulgur", emoji: "🌾", description: "Burghol · Cracked wheat · Nutty, pre-Ottoman staple" },
        { name: "Chickpeas", emoji: "🫘", description: "Hummus (the bean) · Legume · Creamy when pureed" },
        { name: "Labneh", emoji: "🧀", description: "Strained yogurt · Dairy staple · Thick, tart" },
        { name: "Rice", emoji: "🍚", description: "Rezz · Base starch · Often with vermicelli" },
        { name: "Lamb", emoji: "🍖", description: "Lahme ghanam · Primary meat · Grilled, ground, or raw" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Beirut & Mount Lebanon",
      description: "The capital and its mountain hinterland set the standard for refined mezze culture—long tables of small plates, whipped toum, and seafood from the corniche alongside village staples like kibbeh and stuffed vine leaves. Mountain villages above Beirut keep older traditions alive: labneh balls in oil, awarma (lamb confit), and Sunday gatherings around raw kibbeh nayyeh.",
      signatureDishes: ["Hummus Beiruti", "Kibbeh Nayyeh", "Tabbouleh", "Warak Enab (stuffed vine leaves)"],
      keyIngredients: ["labneh", "bulgur", "pine nuts", "fresh herbs", "olive oil"],
      distinctiveTraits: ["Mezze capital", "Refined restaurant culture", "Mountain preservation traditions (mouneh)"]
    },
    {
      name: "North Lebanon (Tripoli & Akkar)",
      description: "Tripoli is Lebanon's sweets capital, famous for knefeh with melted cheese and syrup-soaked halawet el-jibn, plus a robust Ottoman-inflected street food scene. The rural Akkar highlands lean on hearty wheat, freekeh, and meat dishes, while the coast contributes samke harra—whole fish smothered in spicy tahini-cilantro sauce.",
      signatureDishes: ["Knefeh bi Jibn", "Samke Harra", "Halawet el-Jibn", "Freekeh with lamb"],
      keyIngredients: ["akkawi cheese", "semolina", "freekeh", "fish", "cilantro", "chili"],
      distinctiveTraits: ["Sweets capital of Lebanon", "Spicier than the rest of the country", "Strong Ottoman legacy"]
    },
    {
      name: "Bekaa Valley",
      description: "Lebanon's agricultural heartland and its ancient wine country—vineyards near Zahle and Baalbek have produced wine since Phoenician and Roman times. Zahle's riverside restaurants birthed much of modern mezze culture, and Baalbek claims sfiha baalbakiyeh, small open-faced lamb pies. Arak distilling from local grapes and aniseed is a point of fierce regional pride.",
      signatureDishes: ["Sfiha Baalbakiyeh", "Kibbeh bil Sayniyyeh", "Lahm bi Ajine", "Mezze Zahlawiyeh"],
      keyIngredients: ["lamb", "grapes", "aniseed", "wheat", "onions", "pomegranate molasses"],
      distinctiveTraits: ["Wine and arak country", "Birthplace of restaurant mezze", "Meat-forward inland cooking"]
    },
    {
      name: "South Lebanon",
      description: "The coastal south around Sidon and Tyre looks to the sea: sayadieh (spiced fish over caramelized-onion rice) and fresh catch grilled with tarator sauce. Inland, the region is known for its love of freekeh, wild greens like hindbeh (dandelion) sautéed with crispy onions, and an especially liberal hand with lemon and garlic.",
      signatureDishes: ["Sayadieh", "Hindbeh bi Zeit", "Grilled fish with tarator", "Fatayer bi Sabanekh"],
      keyIngredients: ["fish", "caramelized onions", "cumin", "wild greens", "lemon", "tahini"],
      distinctiveTraits: ["Seafood-centered", "Wild foraged greens", "Extra lemon-and-garlic intensity"]
    }
  ],
  popularDishes: [
    {
      name: "Hummus",
      englishName: "Chickpea & Tahini Dip",
      pronunciation: "HOOM-moos",
      description: "Silky puree of chickpeas, tahini, lemon, and garlic, pooled with olive oil and often topped with whole chickpeas, pine nuts, or spiced meat (hummus bil lahme). The non-negotiable anchor of every mezze table.",
      category: "appetizer",
      regionalOrigin: "Beirut & Mount Lebanon",
      keyTraits: ["tahini", "lemon", "creamy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isHalal: true }
    },
    {
      name: "Tabbouleh",
      englishName: "Parsley & Bulgur Salad",
      pronunciation: "tab-BOO-leh",
      description: "Finely chopped parsley salad—herbs are the star, not the grain—with a little bulgur, tomato, mint, and onion in a lemon-olive oil dressing. Lebanese tabbouleh is far greener than versions abroad.",
      category: "salad",
      regionalOrigin: "Beirut & Mount Lebanon",
      keyTraits: ["parsley-forward", "lemon", "bulgur"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Kibbeh Nayyeh",
      englishName: "Raw Kibbeh",
      pronunciation: "KIB-beh NAY-yeh",
      description: "Fresh raw lamb or beef kneaded with fine bulgur, onion, and spices into a smooth paste, served with olive oil, mint leaves, and raw onion. A Sunday-lunch ritual and the ultimate test of a butcher's trust.",
      category: "appetizer",
      regionalOrigin: "Beirut & Mount Lebanon",
      keyTraits: ["raw lamb", "bulgur", "hand-kneaded"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Man'oushe",
      englishName: "Za'atar Flatbread",
      pronunciation: "man-OO-sheh",
      description: "Breakfast flatbread slicked with za'atar and olive oil, baked in a stone oven or on a domed saj griddle. Also comes with cheese, ground meat, or labneh and vegetables, folded and eaten on the go.",
      category: "breakfast",
      keyTraits: ["za'atar", "saj-baked", "olive oil"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Fattoush",
      englishName: "Toasted Bread Salad",
      pronunciation: "fat-TOOSH",
      description: "Crunchy salad of romaine, cucumber, tomato, radish, and purslane tossed with sumac and pomegranate molasses dressing and shards of fried or toasted pita. The tangy counterpart to tabbouleh.",
      category: "salad",
      keyTraits: ["sumac", "crispy pita", "tangy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Shish Taouk",
      englishName: "Grilled Chicken Skewers",
      pronunciation: "shish ta-OOK",
      description: "Chicken cubes marinated in yogurt, lemon, and garlic, grilled over charcoal and wrapped in bread with a thick swipe of whipped garlic toum and pickles. Lebanon's favorite sandwich after shawarma.",
      category: "main",
      keyTraits: ["charcoal-grilled", "garlic toum", "yogurt marinade"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Kibbeh bil Sayniyyeh",
      englishName: "Baked Kibbeh Pie",
      pronunciation: "KIB-beh bil say-NEE-yeh",
      description: "Two layers of bulgur-lamb shell pressed into a tray around a filling of spiced ground meat, onions, and pine nuts, scored into diamonds and baked until crisp. The centerpiece of family lunches.",
      category: "main",
      regionalOrigin: "Bekaa Valley",
      keyTraits: ["bulgur crust", "pine nuts", "seven-spice"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isHalal: true }
    },
    {
      name: "Mujaddara",
      englishName: "Lentils & Rice with Crispy Onions",
      pronunciation: "moo-JAD-da-ra",
      description: "Humble, beloved dish of lentils and rice (or bulgur) crowned with deeply caramelized crispy onions, eaten with yogurt or cabbage salad. The definitive Lebanese comfort food and Lenten staple.",
      category: "main",
      keyTraits: ["lentils", "caramelized onion", "cumin"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true, isHalal: true }
    },
    {
      name: "Sayadieh",
      englishName: "Fisherman's Spiced Fish & Rice",
      pronunciation: "sa-ya-DEE-yeh",
      description: "Whole white fish over rice darkened with caramelized onions and warm cumin, finished with a browned-onion sauce, toasted nuts, and tarator on the side. The pride of the southern ports of Sidon and Tyre.",
      category: "main",
      regionalOrigin: "South Lebanon",
      keyTraits: ["caramelized onion", "cumin", "fresh fish"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isHalal: true }
    },
    {
      name: "Knefeh bi Jibn",
      englishName: "Cheese Knefeh",
      pronunciation: "KNEH-feh bi JIB-en",
      description: "Warm dessert of stretchy melted akkawi cheese under a golden semolina crust, soaked in orange-blossom syrup—often stuffed into a sesame ka'ke bread as a legendary breakfast sandwich. Tripoli's crown jewel.",
      category: "dessert",
      regionalOrigin: "North Lebanon (Tripoli & Akkar)",
      keyTraits: ["melted cheese", "orange-blossom syrup", "semolina crust"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true, isHalal: true }
    }
  ],
  popularBeverages: [
    {
      name: "Arak",
      pronunciation: "ah-RAK",
      description: "Lebanon's national spirit: triple-distilled grape brandy infused with aniseed, always mixed with water and ice, turning cloudy white ('the milk of lions'). The inseparable companion of a long mezze lunch.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Bekaa Valley",
      servedHow: "cold",
      keyIngredients: ["grapes", "aniseed"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ahweh",
      englishName: "Lebanese Coffee",
      pronunciation: "AH-weh",
      description: "Finely ground dark-roast coffee simmered in a long-handled rakweh pot, often perfumed with cardamom, served in small cups with the grounds settling at the bottom. Poured for every guest, at every hour.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["dark-roast coffee", "cardamom"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Jallab",
      pronunciation: "ja-LAB",
      description: "Sweet, smoky summer cooler of date and grape molasses with rose water, poured over crushed ice and topped with pine nuts and golden raisins. A Ramadan and street-cart favorite.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["date molasses", "grape molasses", "rose water", "pine nuts", "raisins"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Lebanese Wine",
      englishName: "Nbeed",
      pronunciation: "nn-BEED",
      description: "Wine from the high Bekaa Valley, made continuously since Phoenician times—modern estates like Ksara, Musar, and Kefraya produce sun-drenched reds and crisp obeidi-grape whites with growing international acclaim.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Bekaa Valley",
      servedHow: "room temperature",
      keyIngredients: ["grapes (cinsault, obeidi, cabernet)"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Ayran",
      englishName: "Salted Yogurt Drink",
      pronunciation: "eye-RAHN",
      description: "Chilled, frothy blend of yogurt, water, and salt—sometimes with dried mint—drunk alongside grilled meats and man'oushe to cool and refresh.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "salt", "dried mint"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
