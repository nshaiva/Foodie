import type { Country } from '../types';

export const PK: Country = {
  id: "PK",
  name: "Pakistan",
  capital: "Islamabad",
  continent: "Asia",
  region: "South Asia",
  colorPalette: {
    primary: "#01411C",      // Pakistan green (from flag)
    secondary: "#FFFFFF",    // White (from flag)
    accent: "#c49a6c",       // Warm kebab brown
    background: "#f8f7f2",   // Cream white
    text: "#1a2e1a"          // Deep green
  },
  foodCulture: {
    overview: "Pakistani cuisine is a rich tapestry of Mughal imperial traditions, Central Asian influences, and regional specialties, united by a love of meat, bread, and robust spices. Unlike neighboring India, Pakistan is predominantly Muslim, so beef and mutton feature prominently, and halal practices govern all meat preparation.\n\nFood culture centers on hospitality—guests must be fed generously, and refusing food is considered an insult. Meals are communal, often eaten from shared platters while seated on the floor. The tradition of 'dastarkhwan' (a cloth spread for communal dining) remains strong.\n\nStreet food is integral to Pakistani life. Cities like Lahore and Karachi are renowned for their food streets where generations-old establishments serve legendary dishes through the night. The art of grilling—seekh kebabs, tikkas, and sajji—reaches its pinnacle here.",
    mealStructure: "Breakfast might be paratha with omelette or halwa puri. Lunch and dinner are similar: rice or roti with a meat curry, dal, vegetables, and salad. Chai is served constantly throughout the day.",
    diningCustoms: "Eating with the right hand is traditional. Naan or roti is torn and used to scoop food. Men and women may eat separately at formal gatherings. Tea is offered to every guest, refusal requires multiple polite insistences.",
    historicalInfluences: "The Mughal Empire left an indelible mark—biryanis, kebabs, and rich kormas. Punjabi, Sindhi, Pashtun, and Balochi communities each contribute distinct traditions. Central Asian and Persian influences appear in pilafs and grilled meats. British colonialism introduced certain dishes and tea culture."
  },
  cuisineProfile: {
    summary: "Pakistani cuisine emphasizes grilled and slow-cooked meats, fragrant rice dishes, and robust spicing, with regional variations from Punjabi richness to Pashtun simplicity.",
    flavorProfile: ["meaty", "aromatic", "spiced", "smoky", "rich", "herbaceous"],
    flavorIntensity: {
      heat: 6,
      acidity: 4,
      sweetness: 3,
      umami: 7,
      aromatic: 9,
      smokeEarth: 8,
      interpretation: "Deeply aromatic with smoky grilled meats, warming spices, and rich gravies built on slow-cooked onions."
    },
    keyIngredients: ["basmati rice", "ghee", "mutton", "beef", "chicken", "yogurt", "onions", "tomatoes", "green chilies"],
    cookingTechniques: ["grilling (kebab)", "dum (slow-cooking)", "bhuna (frying)", "tandoor", "karahi (wok cooking)"],
    cookingFlow: [
      { action: "Toast spices", emoji: "🫙" },
      { action: "Fry onions", emoji: "🧅" },
      { action: "Add meat", emoji: "🍖" },
      { action: "Slow cook", emoji: "🍲" },
      { action: "Char finish", emoji: "🔥" }
    ],
    spicesAndSeasonings: ["cumin", "coriander", "garam masala", "red chili", "turmeric", "cardamom", "cinnamon", "cloves", "nutmeg", "mace", "black pepper"],
    ingredientTiers: {
      foundation: [
        { name: "Ghee", emoji: "🧈", description: "Clarified butter · Essential fat · Rich, nutty" },
        { name: "Onions", emoji: "🧅", description: "Pyaz · Gravy base · Caramelized depth" },
        { name: "Yogurt", emoji: "🥛", description: "Dahi · Marinades · Tangy, tenderizing" },
        { name: "Green Chilies", emoji: "🌶️", description: "Hari mirch · Fresh heat · Bright, sharp" }
      ],
      aromaticCore: [
        { name: "Garam Masala", emoji: "🫙", description: "Spice blend · Warming · Complex" },
        { name: "Cumin", emoji: "🫛", description: "Zeera · Essential · Earthy, warm" },
        { name: "Coriander", emoji: "🌿", description: "Dhania · Fresh & seeds · Citrusy" },
        { name: "Ginger-Garlic", emoji: "🫚", description: "Adrak-lahsun · Paste base · Aromatic" },
        { name: "Cardamom", emoji: "🌿", description: "Elaichi · Sweet spice · Floral" }
      ],
      flavorBuilders: [
        { name: "Tomatoes", emoji: "🍅", description: "Tamatar · Sauce base · Tangy" },
        { name: "Red Chili", emoji: "🌶️", description: "Lal mirch · Heat & color · Dried" },
        { name: "Turmeric", emoji: "🟡", description: "Haldi · Color · Earthy, bitter" },
        { name: "Cinnamon", emoji: "🪵", description: "Dar cheeni · Warm spice · Sweet" },
        { name: "Cloves", emoji: "🟤", description: "Laung · Intense · Warming, sharp" },
        { name: "Black Pepper", emoji: "⚫", description: "Kali mirch · Sharp heat · Pungent" }
      ],
      staples: [
        { name: "Basmati Rice", emoji: "🍚", description: "Long-grain · Fragrant · Essential" },
        { name: "Naan", emoji: "🫓", description: "Leavened bread · Tandoor-baked · Soft" },
        { name: "Roti", emoji: "🫓", description: "Unleavened · Daily bread · Whole wheat" },
        { name: "Mutton", emoji: "🍖", description: "Goat meat · Primary protein · Rich" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Punjab",
      description: "Pakistan's culinary heartland, Punjabi cuisine is rich, buttery, and robust. Lahore is Pakistan's food capital, famous for its food streets. Tandoor-cooked breads, creamy dals, and hearty meat dishes define this region. Agriculture abundance means wheat and dairy feature prominently.",
      signatureDishes: ["Nihari", "Paye", "Lahori Chargha", "Saag", "Lassi"],
      keyIngredients: ["butter", "cream", "wheat", "mustard greens", "meat"],
      distinctiveTraits: ["Rich, buttery dishes", "Tandoor breads", "Food street culture", "Hearty portions"]
    },
    {
      name: "Sindh",
      description: "Sindhi cuisine reflects desert conditions and riverine culture along the Indus. Fish from the Indus River, tangy pickles, and dishes with lotus stem are distinctive. Karachi, Pakistan's largest city, has absorbed influences from migrants across the subcontinent.",
      signatureDishes: ["Sindhi Biryani", "Sai Bhaji", "Palla Fish", "Sindhi Kadhi"],
      keyIngredients: ["fish", "lotus stem", "gram flour", "tamarind", "dried fruit"],
      distinctiveTraits: ["River fish", "Tangy flavors", "Vegetarian traditions", "Karachi fusion"]
    },
    {
      name: "Khyber Pakhtunkhwa (Pashtun)",
      description: "Simple, meat-focused cuisine of the Pashtun people. Grilled meats, lamb karahi, and the legendary chapli kebab define this region. Less reliance on complex spicing—quality meat speaks for itself. Hospitality is paramount in Pashtun culture.",
      signatureDishes: ["Chapli Kebab", "Sajji", "Lamb Karahi", "Kabuli Pulao"],
      keyIngredients: ["lamb", "beef", "coriander seeds", "tomatoes", "green chilies"],
      distinctiveTraits: ["Meat-centric", "Simple spicing", "Grilled specialties", "Generous hospitality"]
    },
    {
      name: "Balochistan",
      description: "Rugged terrain means simple, nourishing food. Sajji (whole roasted lamb) is the signature dish, cooked over open flames. Dried meats and fruits preserve food in harsh conditions. Dates and almonds are staples. Influences from Iran and Afghanistan are evident.",
      signatureDishes: ["Balochi Sajji", "Kaak", "Dampukht", "Landhi"],
      keyIngredients: ["lamb", "dates", "dried meat", "wheat"],
      distinctiveTraits: ["Whole roasted meats", "Minimal spicing", "Dried ingredients", "Open-fire cooking"]
    }
  ],
  popularDishes: [
    {
      name: "Nihari",
      pronunciation: "nih-hah-ree",
      description: "Slow-cooked beef or mutton stew, traditionally simmered overnight in bone marrow and spices. Originally a breakfast dish for laborers, now a beloved Sunday morning tradition.",
      category: "main",
      keyTraits: ["slow-cooked", "bone marrow", "spiced"],
      regionalOrigin: "Punjab/Delhi",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Biryani",
      pronunciation: "bir-yah-nee",
      description: "Fragrant layered rice with spiced meat, saffron, and caramelized onions. Pakistani biryanis, especially Karachi-style with potatoes, are distinct from Indian versions.",
      category: "main",
      keyTraits: ["saffron", "layered", "spiced meat"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Chapli Kebab",
      pronunciation: "chahp-lee keh-bahb",
      description: "Flattened, pan-fried beef kebabs from Peshawar, studded with tomatoes, chilies, and coriander seeds. The name comes from 'chappal' (sandal) due to its flat shape.",
      category: "main",
      keyTraits: ["pan-fried", "beef", "Pashtun"],
      regionalOrigin: "Peshawar",
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Haleem",
      pronunciation: "hah-leem",
      description: "Slow-cooked stew of wheat, barley, lentils, and shredded meat, pounded to a thick paste. Garnished with fried onions, ginger, and lime. Popular during Ramadan.",
      category: "main",
      keyTraits: ["slow-cooked", "wheat", "shredded meat"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true }
    },
    {
      name: "Seekh Kebab",
      pronunciation: "seek keh-bahb",
      description: "Minced meat mixed with spices and herbs, molded onto skewers and grilled over charcoal. Served with naan and chutney.",
      category: "appetizer",
      keyTraits: ["grilled", "minced", "charcoal"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Karahi",
      pronunciation: "kah-rah-hee",
      description: "Meat (chicken or mutton) cooked in a karahi (wok) with tomatoes, green chilies, ginger, and minimal gravy. Named after the cooking vessel.",
      category: "main",
      keyTraits: ["wok-cooked", "tomatoes", "ginger"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Sajji",
      pronunciation: "sah-jee",
      description: "Whole marinated lamb or chicken, skewered and roasted over open flames. A Balochi specialty, served with rice cooked in the meat drippings.",
      category: "main",
      keyTraits: ["whole roasted", "open flame", "Balochi"],
      regionalOrigin: "Balochistan",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Paye",
      pronunciation: "pah-yay",
      description: "Slow-cooked trotters (goat or cow feet) in a rich, gelatinous broth. A hearty breakfast dish, especially popular in winter.",
      category: "soup",
      keyTraits: ["trotters", "slow-cooked", "rich broth"],
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Lahori Chargha",
      pronunciation: "lah-hor-ee char-gah",
      description: "Whole chicken marinated in spices and yogurt, steamed then deep-fried until crispy. A Lahore specialty, served at celebrations.",
      category: "main",
      keyTraits: ["whole chicken", "deep-fried", "crispy"],
      regionalOrigin: "Lahore",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true, isHalal: true }
    },
    {
      name: "Jalebi",
      pronunciation: "jah-lay-bee",
      description: "Deep-fried batter spirals soaked in saffron sugar syrup. Served hot for breakfast with creamy rabri or enjoyed as a sweet snack.",
      category: "dessert",
      keyTraits: ["fried", "syrup-soaked", "crispy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    }
  ],
  popularBeverages: [
    {
      name: "Doodh Patti",
      englishName: "Milk Tea",
      pronunciation: "dood puh-tee",
      description: "Strong tea brewed directly in milk without water, creating a rich, creamy chai. Pakistan's most popular tea style.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["black tea", "milk", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Kashmiri Chai",
      englishName: "Pink Tea",
      pronunciation: "kahsh-meer-ee chai",
      description: "Distinctive pink tea made with special tea leaves, milk, baking soda, and crushed pistachios. Traditional in weddings and special occasions.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["special tea leaves", "milk", "baking soda", "pistachios"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Lassi",
      pronunciation: "lah-see",
      description: "Cool yogurt drink, either sweet with sugar or salty with cumin. Mango lassi is popular in summer. Often topped with cream.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "sugar or salt"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Rooh Afza",
      pronunciation: "rooh af-zah",
      description: "Sweet rose-flavored syrup mixed with water or milk. Iconic pink drink especially popular during Ramadan. Created in 1907.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      keyIngredients: ["rose syrup", "water", "herbs"],
      isTraditional: true,
      dietary: { isVegan: true, isGlutenFree: true }
    },
    {
      name: "Sugarcane Juice",
      englishName: "Gannay Ka Ras",
      pronunciation: "gahn-nay kah rahs",
      description: "Fresh-pressed sugarcane juice with lime and ginger. Sold from street carts with hand-cranked presses.",
      type: "non-alcoholic",
      category: "juice",
      servedHow: "cold",
      keyIngredients: ["sugarcane", "lime", "ginger"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isGlutenFree: true }
    }
  ]
};
