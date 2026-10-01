import type { Country } from '../types';

export const IN: Country = {
  id: "IN",
  name: "India",
  capital: "New Delhi",
  continent: "Asia",
  region: "South Asia",
  colorPalette: {
    primary: "#FF9933",      // Saffron orange (from flag)
    secondary: "#138808",    // India green (from flag)
    accent: "#d4a574",       // Warm turmeric gold
    background: "#faf8f2",   // Cream white
    text: "#2d2a26"          // Deep brown
  },
  foodCulture: {
    overview: "Indian cuisine is one of the world's most diverse, with each region, religion, and community maintaining distinct culinary traditions developed over thousands of years. Food is deeply intertwined with spirituality, festivals, and family life. The concept of 'thali', a complete meal with multiple dishes offering balanced flavors and nutrition, exemplifies the Indian approach to eating.\n\nVegetarianism is deeply rooted in Indian culture, particularly among Hindu and Jain communities, making India home to the world's most sophisticated vegetarian cuisine. Yet meat dishes, particularly in Muslim, Christian, and some Hindu communities, represent equally rich traditions.\n\nSpices are the soul of Indian cooking. The art of blending spices (masala) is passed down through generations, with each family's garam masala recipe being a closely guarded secret. The technique of 'tadka' or 'tempering', blooming spices in hot oil or ghee, releases aromatic compounds and forms the foundation of countless dishes.",
    mealStructure: "Meals typically include rice or roti (flatbread), dal (lentils), a vegetable dish, and accompaniments like pickles, chutneys, and yogurt. In the south, meals often begin with rice and sambar. Breakfast varies regionally: idli and dosa in the south, paratha in the north.",
    diningCustoms: "Eating with the right hand (without utensils) is traditional and considered the proper way to experience food. Sharing from common dishes is the norm. Guests are treated as sacred, and refusing food is considered impolite.",
    historicalInfluences: "Ancient Ayurvedic principles shape food philosophy, balancing six tastes (sweet, sour, salty, bitter, pungent, astringent). Mughal rule introduced Persian-influenced biryanis, kebabs, and rich gravies. Portuguese traders brought chilies, tomatoes, and potatoes that transformed the cuisine. British colonialism influenced tea culture and certain fusion dishes."
  },
  cuisineProfile: {
    summary: "Indian cuisine layers complex spice blends with techniques like tempering and slow-cooking, creating deeply aromatic dishes that range from fiery hot to delicately fragrant.",
    flavorProfile: ["spiced", "aromatic", "earthy", "pungent", "tangy", "rich"],
    flavorIntensity: {
      heat: 7,
      acidity: 6,
      sweetness: 5,
      umami: 6,
      aromatic: 10,
      smokeEarth: 6,
      interpretation: "Intensely aromatic with complex layered spicing, moderate heat, and earthy depth from slow-cooked gravies."
    },
    keyIngredients: ["basmati rice", "ghee", "lentils (dal)", "yogurt", "tomatoes", "onions", "ginger", "garlic", "chilies"],
    cookingTechniques: ["tadka (tempering)", "dum (slow-cooking)", "tandoor (clay oven)", "bhuna (frying)", "tarka (spice infusion)"],
    cookingFlow: [
      { action: "Toast spices", emoji: "🫙" },
      { action: "Temper in oil", emoji: "🍳" },
      { action: "Fry onions", emoji: "🧅" },
      { action: "Add tomatoes", emoji: "🍅" },
      { action: "Simmer", emoji: "🍲" }
    ],
    spicesAndSeasonings: ["cumin", "coriander", "turmeric", "garam masala", "cardamom", "cinnamon", "cloves", "bay leaves", "fenugreek", "mustard seeds", "asafoetida", "red chili powder"],
    ingredientTiers: {
      foundation: [
        { name: "Ghee", emoji: "🧈", description: "Clarified butter · Cooking fat · Nutty, rich", flavorAxes: [{ axis: "umami", strength: "main" }] },
        { name: "Cumin", emoji: "🫛", description: "Jeera · Essential spice · Earthy, warm", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "smokeEarth", strength: "supporting" }] },
        { name: "Turmeric", emoji: "🟡", description: "Haldi · Color & flavor · Earthy, bitter", flavorAxes: [{ axis: "smokeEarth", strength: "main" }] },
        { name: "Chilies", emoji: "🌶️", description: "Mirch · Heat source · Various varieties", flavorAxes: [{ axis: "heat", strength: "main" }] }
      ],
      aromaticCore: [
        { name: "Garam Masala", emoji: "🫙", description: "Spice blend · Warming · Complex, aromatic", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Cardamom", emoji: "🌿", description: "Elaichi · Sweet spice · Floral, minty", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "sweetness", strength: "supporting" }] },
        { name: "Coriander", emoji: "🌱", description: "Dhania · Seeds & leaves · Citrusy, fresh", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "acidity", strength: "supporting" }] },
        { name: "Ginger", emoji: "🫚", description: "Adrak · Aromatic · Sharp, warming", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "heat", strength: "supporting" }] },
        { name: "Garlic", emoji: "🧄", description: "Lahsun · Aromatic · Pungent, essential", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Curry Leaves", emoji: "🍃", description: "Kadi patta · Southern aromatic · Citrusy, nutty when fried", flavorAxes: [{ axis: "aromatic", strength: "main" }] }
      ],
      flavorBuilders: [
        { name: "Onions", emoji: "🧅", description: "Pyaz · Gravy base · Sweet when fried", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "sweetness", strength: "supporting" }] },
        { name: "Tomatoes", emoji: "🍅", description: "Tamatar · Sauce base · Tangy, bright", flavorAxes: [{ axis: "acidity", strength: "main" }, { axis: "umami", strength: "supporting" }] },
        { name: "Yogurt", emoji: "🥛", description: "Dahi · Marinade & sauce · Tangy, tenderizing", flavorAxes: [{ axis: "acidity", strength: "main" }] },
        { name: "Mustard Seeds", emoji: "🟤", description: "Rai · Tempering · Nutty, pungent", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "smokeEarth", strength: "supporting" }] },
        { name: "Mustard Oil", emoji: "🫗", description: "Sarson ka tel · Eastern cooking fat · Sharp, pungent", flavorAxes: [{ axis: "heat", strength: "main" }, { axis: "aromatic", strength: "supporting" }] },
        { name: "Fenugreek", emoji: "🍃", description: "Methi · Bitter spice · Maple-like", flavorAxes: [{ axis: "smokeEarth", strength: "main" }] },
        { name: "Asafoetida", emoji: "🟡", description: "Hing · Onion substitute · Pungent, savory", flavorAxes: [{ axis: "umami", strength: "main" }, { axis: "aromatic", strength: "supporting" }] },
        { name: "Tamarind", emoji: "🟫", description: "Imli · Souring agent · Sweet-sour, in sambar and chutneys", flavorAxes: [{ axis: "acidity", strength: "main" }] },
        { name: "Coconut", emoji: "🥥", description: "Nariyal · Southern & coastal · Sweet, rich", flavorAxes: [{ axis: "sweetness", strength: "main" }, { axis: "umami", strength: "supporting" }] },
        { name: "Jaggery", emoji: "🟤", description: "Gur · Unrefined cane sugar · Caramel sweetness", flavorAxes: [{ axis: "sweetness", strength: "main" }] }
      ],
      staples: [
        { name: "Basmati Rice", emoji: "🍚", description: "Long-grain · Fragrant · Fluffy" },
        { name: "Lentils", emoji: "🫘", description: "Dal · Protein staple · Many varieties", flavorAxes: [{ axis: "smokeEarth", strength: "supporting" }] },
        { name: "Roti", emoji: "🫓", description: "Wheat flatbread · Daily staple · Whole wheat" },
        { name: "Paneer", emoji: "🧀", description: "Fresh cheese · Protein · Mild, firm" }
      ]
    }
  },
  // Six regions since the #9 India pass (2026-10-01): the four compass regions
  // were drawn finer where the food really changes and the name is on the
  // sign. Mumbai & Goa left the West, and Hyderabad & the Deccan left the
  // South. Region names are the vocabulary dish origins use.
  regionalVariations: [
    {
      name: "North India (Punjab & Delhi)",
      description: "The India most of the world met first: Punjab's tandoor and dairy, Delhi's Mughal kitchens, Lucknow's slow-cooked kebabs and Kashmir's wazwan. Creamy tomato gravies, butter and paneer, yogurt marinades and wheat breads (naan, roti, paratha) in place of rice. Richer and milder than the south, with the tandoor's smoke running through it.",
      signatureDishes: ["Butter Chicken", "Dal Makhani", "Chole Bhature", "Tandoori Chicken", "Rogan Josh"],
      keyIngredients: ["ghee", "yogurt", "garam masala", "paneer", "wheat flour", "cream"],
      distinctiveTraits: ["Tandoor cooking", "Creamy gravies", "Mughal influence", "Wheat-based breads"]
    },
    {
      name: "West India (Rajasthan & Gujarat)",
      description: "The dry west cooks for a land with little water: Rajasthan's baked wheat dumplings, dried beans and fierce red laal maas, Gujarat's strictly vegetarian thalis where a dish is sweet, sour and hot at once. Jaggery, yogurt and gram flour do a lot of the work, and the snacks (farsan) are a meal of their own.",
      signatureDishes: ["Dal Baati Churma", "Dhokla", "Laal Maas", "Thepla", "Undhiyu"],
      keyIngredients: ["jaggery", "gram flour", "yogurt", "mustard seeds", "dried chilies", "ghee"],
      distinctiveTraits: ["Sweet-savory balance", "Desert pantry: dried, pickled, baked", "Vegetarian thalis", "Farsan snacks"]
    },
    {
      name: "Mumbai & Goa (Maharashtra & the Konkan)",
      description: "The Konkan coast from Mumbai down to Goa. Mumbai's street food is fast and bread-based (vada pav, pav bhaji), Maharashtra's home cooking leans on peanuts, coconut and goda masala, and Goa adds four centuries of Portuguese kitchen: vinegar, pork, vindaloo and fish curry sharpened with kokum.",
      signatureDishes: ["Vada Pav", "Pav Bhaji", "Vindaloo", "Goan Fish Curry", "Misal Pav"],
      keyIngredients: ["coconut", "kokum", "peanuts", "chilies", "vinegar", "fresh fish"],
      distinctiveTraits: ["Street food culture", "Portuguese influence (Goa)", "Coconut and kokum", "Bread with everything"]
    },
    {
      name: "East India (Bengal & Bihar)",
      description: "Bengali cooking dominates: river fish in mustard, rice at every meal, panch phoron (the five-seed tempering) and India's most famous sweets, from rasgulla to mishti doi. Kolkata adds its street food (the kathi roll) and Bihar its rustic litti chokha. Subtler and less chili-driven than the rest of the country.",
      signatureDishes: ["Machher Jhol", "Kathi Roll", "Shorshe Ilish", "Rasgulla", "Litti Chokha"],
      keyIngredients: ["mustard oil", "mustard seeds", "fresh fish", "panch phoron", "poppy seeds", "jaggery"],
      distinctiveTraits: ["Fish-centric", "Renowned sweets", "Mustard oil", "Subtle spicing"]
    },
    {
      name: "Hyderabad & the Deccan (Telangana & Andhra)",
      description: "The Deccan plateau's two tables: Hyderabad's courtly Nizami cooking, slow-cooked biryani, haleem and salan, and Andhra's reputation as India's hottest kitchen, with gongura, tamarind and red chili in everything. Rice, not wheat, and heat that is meant.",
      signatureDishes: ["Hyderabadi Biryani", "Hyderabadi Haleem", "Mirchi ka Salan", "Kodi Vepudu", "Gongura Pachadi"],
      keyIngredients: ["chilies", "tamarind", "yogurt", "basmati rice", "curry leaves", "ghee"],
      distinctiveTraits: ["Nizami slow cooking", "India's hottest food (Andhra)", "Biryani capital", "Tamarind sourness"]
    },
    {
      name: "South India (Tamil Nadu, Kerala & Karnataka)",
      description: "Rice-based cooking built on fermented batters, coconut, curry leaves and tamarind. Dosa and idli with sambar and chutney for breakfast; Chettinad's black-pepper heat in Tamil Nadu; Kerala's coconut-milk fish curries and appam; Karnataka's Udupi vegetarian tradition. Spicier and tangier than the north.",
      signatureDishes: ["Dosa", "Idli Sambar", "Chettinad Chicken", "Kerala Fish Curry", "Appam"],
      keyIngredients: ["rice", "coconut", "curry leaves", "tamarind", "mustard seeds", "chilies"],
      distinctiveTraits: ["Fermented batters", "Coconut-based", "Rice staple", "Tangy flavors"]
    }
  ],
  popularDishes: [
    {
      name: "Butter Chicken",
      englishName: "Murgh Makhani",
      pronunciation: "murg mah-kah-nee",
      description: "Tandoor-cooked chicken in a creamy, mildly spiced tomato sauce with butter and cream. Created in 1950s Delhi, it's become India's most famous curry worldwide.",
      tagline: "Tandoor chicken in a creamy, buttery tomato sauce",
      image: "/dish-images/IN/butter-chicken.webp",
      origin: { place: "Delhi", coordinates: [77.21, 28.61] },
      category: "main",
      keyTraits: ["creamy", "tomato-based", "tandoor"],
      regionalOrigin: "Delhi",
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Biryani",
      pronunciation: "bir-yah-nee",
      description: "Fragrant layered rice dish with spiced meat (or vegetables), saffron, and caramelized onions, slow-cooked in a sealed pot. Each city has its own style: Hyderabadi, Lucknowi, Kolkata.",
      tagline: "Layered saffron rice and spiced meat, cooked in a sealed pot",
      image: "/dish-images/IN/biryani.webp",
      category: "main",
      keyTraits: ["saffron", "layered", "aromatic"],
      regionalOrigin: "Nationwide",
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Dal Makhani",
      pronunciation: "dahl mah-kah-nee",
      description: "Black lentils slow-cooked overnight with butter, cream, and mild spices. A Punjabi classic that's become synonymous with North Indian restaurant cuisine.",
      tagline: "Black lentils simmered overnight with butter and cream",
      image: "/dish-images/IN/dal-makhani.webp",
      category: "main",
      keyTraits: ["creamy", "slow-cooked", "lentils"],
      regionalOrigin: "Punjab",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Palak Paneer",
      englishName: "Spinach with Cottage Cheese",
      pronunciation: "pah-lahk pah-neer",
      description: "Fresh paneer cheese cubes in a vibrant green spinach puree seasoned with garlic, ginger, and garam masala.",
      tagline: "Paneer cubes in a garlicky spinach puree",
      image: "/dish-images/IN/palak-paneer.webp",
      category: "main",
      keyTraits: ["spinach", "paneer", "vegetarian"],
      regionalOrigin: "North India",
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Dosa",
      pronunciation: "doh-sah",
      description: "Crispy, fermented rice and lentil crepe, often filled with spiced potatoes (masala dosa). Served with sambar and chutneys. A South Indian breakfast staple.",
      tagline: "Crisp fermented rice crepe with spiced potato, sambar and chutney",
      image: "/dish-images/IN/dosa.webp",
      category: "breakfast",
      keyTraits: ["fermented", "crispy", "rice-based"],
      regionalOrigin: "South India",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegan: true, isGlutenFree: true }
    },
    {
      name: "Samosa",
      pronunciation: "sah-moh-sah",
      description: "Crispy fried pastry triangles filled with spiced potatoes and peas. India's most beloved street snack, served with chutneys.",
      tagline: "Fried pastry triangles stuffed with spiced potato and peas",
      image: "/dish-images/IN/samosa.webp",
      category: "appetizer",
      keyTraits: ["fried", "potato", "street food"],
      regionalOrigin: "Nationwide",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isVegan: true }
    },
    {
      name: "Rogan Josh",
      pronunciation: "roh-gahn josh",
      description: "Kashmiri braised lamb in an aromatic sauce of Kashmiri chilies, yogurt, and warming spices. Deep red color comes from mild Kashmiri chilies, not heat.",
      tagline: "Kashmiri lamb braised red with mild chilies and yogurt",
      image: "/dish-images/IN/rogan-josh.webp",
      origin: { place: "Kashmir", coordinates: [74.8, 34.08] },
      category: "main",
      keyTraits: ["lamb", "aromatic", "Kashmiri chilies"],
      regionalOrigin: "Kashmir",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Chole Bhature",
      pronunciation: "cho-lay bah-too-ray",
      description: "Spiced chickpea curry (chole) served with deep-fried puffy bread (bhature). A hearty Punjabi breakfast or lunch beloved across North India.",
      tagline: "Spiced chickpea curry with puffed, deep-fried bread",
      image: "/dish-images/IN/chole-bhature.webp",
      category: "main",
      keyTraits: ["chickpeas", "fried bread", "spiced"],
      regionalOrigin: "Punjab",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    },
    {
      name: "Tandoori Chicken",
      pronunciation: "tahn-door-ee",
      description: "Chicken marinated in yogurt and spices, then roasted in a clay tandoor oven until charred and smoky. The iconic red color comes from Kashmiri chilies and food coloring.",
      tagline: "Yogurt-marinated chicken charred in a clay tandoor",
      image: "/dish-images/IN/tandoori-chicken.webp",
      category: "main",
      keyTraits: ["tandoor", "yogurt marinade", "smoky"],
      regionalOrigin: "Punjab",
      popularity: "tourist-classic",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Gulab Jamun",
      pronunciation: "goo-lahb jah-moon",
      description: "Deep-fried milk solid balls soaked in rose-scented sugar syrup. One of India's most beloved desserts, served warm at celebrations.",
      tagline: "Fried milk dumplings soaked in rose syrup, served warm",
      image: "/dish-images/IN/gulab-jamun.webp",
      category: "dessert",
      keyTraits: ["sweet", "rose water", "fried"],
      regionalOrigin: "Nationwide",
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    },
    // The #9 India pass (2026-10-01): twelve dishes written region-first so
    // every region holds at least two.
    {
      name: "Idli Sambar",
      pronunciation: "id-lee sahm-bar",
      description: "Soft steamed cakes of fermented rice and lentil batter, eaten with sambar, a tamarind and lentil stew with vegetables, and coconut chutney.",
      tagline: "Steamed rice cakes with tamarind lentil stew and coconut chutney",
      image: "/dish-images/IN/idli-sambar.webp",
      category: "breakfast",
      keyTraits: ["fermented batter", "tamarind sambar", "coconut chutney"],
      regionalOrigin: "South India",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegan: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Chettinad Chicken",
      pronunciation: "CHET-ti-nahd",
      description: "Chicken cooked with a fresh-ground masala of black pepper, fennel and dried chilies, with curry leaves and coconut. Tamil Nadu's hottest kitchen.",
      tagline: "Chicken in a black pepper and fennel masala with curry leaves",
      image: "/dish-images/IN/chettinad-chicken.webp",
      origin: { place: "Chettinad, Tamil Nadu", coordinates: [78.78, 10.07] },
      category: "main",
      keyTraits: ["black pepper", "fresh-ground masala", "curry leaves"],
      regionalOrigin: "Tamil Nadu",
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Kerala Fish Curry",
      englishName: "Meen Curry",
      pronunciation: "meen curry",
      description: "Fish simmered in coconut milk soured with kudampuli, a smoked tamarind, with curry leaves and a mustard seed tempering. Eaten with rice or appam.",
      tagline: "Fish in coconut milk soured with smoked tamarind and curry leaves",
      image: "/dish-images/IN/kerala-fish-curry.webp",
      origin: { place: "Kerala", coordinates: [76.27, 9.93] },
      category: "main",
      keyTraits: ["coconut milk", "smoked tamarind", "curry leaves"],
      regionalOrigin: "Kerala",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Vada Pav",
      pronunciation: "vah-dah pow",
      description: "A spiced mashed-potato fritter in a soft bread roll with garlic chutney and a fried green chili. Mumbai's street lunch, eaten standing at the stall.",
      tagline: "Spiced potato fritter in a bread roll with garlic chutney",
      image: "/dish-images/IN/vada-pav.webp",
      origin: { place: "Mumbai", coordinates: [72.88, 19.08] },
      category: "street-food",
      keyTraits: ["potato fritter", "bread roll", "garlic chutney"],
      regionalOrigin: "Mumbai",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isVegetarian: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Vindaloo",
      pronunciation: "vin-dah-loo",
      description: "Goa's Portuguese inheritance: pork marinated in vinegar, garlic and dried red chilies, cooked into a sharp, hot curry. The name is from vinho e alhos.",
      tagline: "Goan pork curry sharp with vinegar, garlic and red chilies",
      image: "/dish-images/IN/vindaloo.webp",
      origin: { place: "Goa", coordinates: [73.83, 15.49] },
      category: "main",
      keyTraits: ["vinegar", "garlic", "dried red chilies"],
      regionalOrigin: "Goa",
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dhokla",
      pronunciation: "DHOHK-lah",
      description: "Steamed, spongy cakes of fermented gram flour batter, tempered with mustard seeds, curry leaves and green chili, a little sweet and a little sour.",
      tagline: "Spongy steamed gram flour cake with a mustard seed tempering",
      image: "/dish-images/IN/dhokla.webp",
      origin: { place: "Gujarat", coordinates: [72.57, 23.02] },
      category: "appetizer",
      keyTraits: ["gram flour", "steamed", "sweet and sour"],
      regionalOrigin: "Gujarat",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegan: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dal Baati Churma",
      pronunciation: "dahl BAH-tee CHOOR-mah",
      description: "Rajasthan's three in one: wheat dumplings baked over coals and cracked open, mixed dal poured over, and churma, the dough crumbled with ghee and jaggery.",
      tagline: "Baked wheat dumplings with lentils and a sweet ghee crumble",
      image: "/dish-images/IN/dal-baati-churma.webp",
      origin: { place: "Rajasthan", coordinates: [75.79, 26.91] },
      category: "main",
      keyTraits: ["baked wheat dumplings", "mixed dal", "ghee and jaggery"],
      regionalOrigin: "Rajasthan",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Machher Jhol",
      englishName: "Bengali Fish Curry",
      pronunciation: "MAH-cher jhol",
      description: "River fish, usually rohu or hilsa, fried in mustard oil and simmered in a thin turmeric and ginger gravy with potato. Bengal's everyday lunch with rice.",
      tagline: "River fish in a light turmeric gravy cooked in mustard oil",
      image: "/dish-images/IN/machher-jhol.webp",
      origin: { place: "Kolkata", coordinates: [88.36, 22.57] },
      category: "main",
      keyTraits: ["river fish", "mustard oil", "thin turmeric gravy"],
      regionalOrigin: "Bengal",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Kathi Roll",
      pronunciation: "KAH-tee roll",
      description: "A flaky paratha fried with an egg on one side, rolled around kebab meat or paneer with onion, green chili and lime. Born at Nizam's in Kolkata.",
      tagline: "Egg-fried paratha rolled around kebab meat, onion and lime",
      image: "/dish-images/IN/kathi-roll.webp",
      origin: { place: "Kolkata", coordinates: [88.36, 22.57] },
      category: "street-food",
      keyTraits: ["egg paratha", "kebab filling", "rolled"],
      regionalOrigin: "Kolkata",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isNutFree: true }
    },
    {
      name: "Hyderabadi Haleem",
      pronunciation: "hah-LEEM",
      description: "Wheat, lentils and mutton pounded and slow-cooked into a thick porridge, finished with ghee, fried onions, mint and lime. Hyderabad's Ramadan dish.",
      tagline: "Wheat, lentils and mutton slow-cooked into a thick spiced porridge",
      image: "/dish-images/IN/hyderabadi-haleem.webp",
      origin: { place: "Hyderabad", coordinates: [78.47, 17.39] },
      category: "main",
      keyTraits: ["pounded wheat and mutton", "slow-cooked", "fried onions"],
      regionalOrigin: "Hyderabad",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isNutFree: true, isHalal: true }
    },
    {
      name: "Kodi Vepudu",
      englishName: "Andhra Chicken Fry",
      pronunciation: "KOH-dee VEH-poo-doo",
      description: "Chicken fried dry with a paste of red chilies, garlic, ginger and curry leaves until the masala clings and darkens. Andhra's case that Indian food is not mild.",
      tagline: "Dry-fried chicken in a dark red chili, garlic and curry leaf masala",
      image: "/dish-images/IN/kodi-vepudu.webp",
      origin: { place: "Andhra Pradesh", coordinates: [80.65, 16.51] },
      category: "main",
      keyTraits: ["red chili paste", "dry-fried", "curry leaves"],
      regionalOrigin: "Andhra",
      popularity: "local-favorite",
      spiceLevel: "very-hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pav Bhaji",
      pronunciation: "pow BAH-jee",
      description: "Mixed vegetables mashed into a buttery, spiced tomato gravy on a hot griddle, with butter-toasted rolls, raw onion and lime. Mumbai's beach-front dinner.",
      tagline: "Buttery mashed vegetable curry with toasted bread rolls",
      image: "/dish-images/IN/pav-bhaji.webp",
      origin: { place: "Mumbai", coordinates: [72.88, 19.08] },
      category: "street-food",
      keyTraits: ["mashed vegetables", "butter", "toasted rolls"],
      regionalOrigin: "Mumbai",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "easy",
      dietary: { isVegetarian: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Masala Chai",
      englishName: "Spiced Tea",
      pronunciation: "mah-sah-lah chai",
      description: "Black tea brewed with milk, sugar, and warming spices like cardamom, ginger, cinnamon, and cloves. India's national drink, sold by chai wallahs on every corner.",
      tagline: "Milky black tea boiled with cardamom, ginger and sugar",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Nationwide",
      servedHow: "hot",
      keyIngredients: ["black tea", "milk", "cardamom", "ginger", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Lassi",
      pronunciation: "lah-see",
      description: "Creamy yogurt-based drink, either sweet (with sugar and rose water) or salty (with cumin and salt). Mango lassi is the most popular sweet variant.",
      tagline: "Churned yogurt drink, sweet with rose water or salted with cumin",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Punjab",
      servedHow: "cold",
      keyIngredients: ["yogurt", "water", "sugar or salt", "rose water"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Nimbu Pani",
      englishName: "Fresh Lime Water",
      pronunciation: "nim-boo pah-nee",
      description: "Refreshing limeade with salt, sugar, and sometimes roasted cumin or black salt. India's favorite thirst quencher in summer.",
      tagline: "Fresh limeade with salt, sugar and roasted cumin",
      type: "non-alcoholic",
      category: "juice",
      regionalOrigin: "Nationwide",
      servedHow: "cold",
      keyIngredients: ["lime", "water", "sugar", "salt", "cumin"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isGlutenFree: true }
    },
    {
      name: "Mango Lassi",
      pronunciation: "man-go lah-see",
      description: "Sweet, creamy yogurt drink blended with ripe Alphonso mangoes. The most popular lassi variant, especially during mango season.",
      tagline: "Yogurt blended with ripe Alphonso mango and a little cardamom",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Nationwide",
      servedHow: "cold",
      keyIngredients: ["yogurt", "mango", "sugar", "cardamom"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Thandai",
      pronunciation: "than-dye",
      description: "Chilled spiced milk drink with almonds, fennel, rose petals, and saffron. Traditional during Holi festival. Sometimes made with bhang (cannabis) for celebrations.",
      tagline: "Chilled milk with almonds, fennel, rose and saffron, for Holi",
      type: "both",
      category: "ceremonial",
      regionalOrigin: "North India",
      servedHow: "cold",
      keyIngredients: ["milk", "almonds", "fennel", "saffron", "rose petals"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Filter Coffee",
      englishName: "South Indian Coffee",
      pronunciation: "fil-ter kah-fee",
      description: "Strong, chicory-blended coffee dripped through a metal filter, mixed with boiled milk and sugar, and traditionally 'pulled' between two vessels for froth.",
      tagline: "Chicory coffee dripped through a metal filter, pulled frothy with milk",
      type: "non-alcoholic",
      category: "coffee",
      regionalOrigin: "South India",
      servedHow: "hot",
      keyIngredients: ["coffee", "chicory", "milk", "sugar"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    }
  ]
};
