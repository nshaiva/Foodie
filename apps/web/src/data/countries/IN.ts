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
    overview: "Indian cuisine is one of the world's most diverse, with each region, religion, and community maintaining distinct culinary traditions developed over thousands of years. Food is deeply intertwined with spirituality, festivals, and family life. The concept of 'thali'—a complete meal with multiple dishes offering balanced flavors and nutrition—exemplifies the Indian approach to eating.\n\nVegetarianism is deeply rooted in Indian culture, particularly among Hindu and Jain communities, making India home to the world's most sophisticated vegetarian cuisine. Yet meat dishes, particularly in Muslim, Christian, and some Hindu communities, represent equally rich traditions.\n\nSpices are the soul of Indian cooking. The art of blending spices (masala) is passed down through generations, with each family's garam masala recipe being a closely guarded secret. The technique of 'tadka' or 'tempering'—blooming spices in hot oil or ghee—releases aromatic compounds and forms the foundation of countless dishes.",
    mealStructure: "Meals typically include rice or roti (flatbread), dal (lentils), a vegetable dish, and accompaniments like pickles, chutneys, and yogurt. In the south, meals often begin with rice and sambar. Breakfast varies regionally—idli and dosa in the south, paratha in the north.",
    diningCustoms: "Eating with the right hand (without utensils) is traditional and considered the proper way to experience food. Sharing from common dishes is the norm. Guests are treated as sacred, and refusing food is considered impolite.",
    historicalInfluences: "Ancient Ayurvedic principles shape food philosophy—balancing six tastes (sweet, sour, salty, bitter, pungent, astringent). Mughal rule introduced Persian-influenced biryanis, kebabs, and rich gravies. Portuguese traders brought chilies, tomatoes, and potatoes that transformed the cuisine. British colonialism influenced tea culture and certain fusion dishes."
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
        { name: "Ghee", emoji: "🧈", description: "Clarified butter · Cooking fat · Nutty, rich" },
        { name: "Cumin", emoji: "🫛", description: "Jeera · Essential spice · Earthy, warm" },
        { name: "Turmeric", emoji: "🟡", description: "Haldi · Color & flavor · Earthy, bitter" },
        { name: "Chilies", emoji: "🌶️", description: "Mirch · Heat source · Various varieties" }
      ],
      aromaticCore: [
        { name: "Garam Masala", emoji: "🫙", description: "Spice blend · Warming · Complex, aromatic" },
        { name: "Cardamom", emoji: "🌿", description: "Elaichi · Sweet spice · Floral, minty" },
        { name: "Coriander", emoji: "🌱", description: "Dhania · Seeds & leaves · Citrusy, fresh" },
        { name: "Ginger", emoji: "🫚", description: "Adrak · Aromatic · Sharp, warming" },
        { name: "Garlic", emoji: "🧄", description: "Lahsun · Aromatic · Pungent, essential" }
      ],
      flavorBuilders: [
        { name: "Onions", emoji: "🧅", description: "Pyaz · Gravy base · Sweet when fried" },
        { name: "Tomatoes", emoji: "🍅", description: "Tamatar · Sauce base · Tangy, bright" },
        { name: "Yogurt", emoji: "🥛", description: "Dahi · Marinade & sauce · Tangy, tenderizing" },
        { name: "Mustard Seeds", emoji: "🟤", description: "Rai · Tempering · Nutty, pungent" },
        { name: "Fenugreek", emoji: "🍃", description: "Methi · Bitter spice · Maple-like" },
        { name: "Asafoetida", emoji: "🟡", description: "Hing · Onion substitute · Pungent, savory" }
      ],
      staples: [
        { name: "Basmati Rice", emoji: "🍚", description: "Long-grain · Fragrant · Fluffy" },
        { name: "Lentils", emoji: "🫘", description: "Dal · Protein staple · Many varieties" },
        { name: "Roti", emoji: "🫓", description: "Wheat flatbread · Daily staple · Whole wheat" },
        { name: "Paneer", emoji: "🧀", description: "Fresh cheese · Protein · Mild, firm" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "North India",
      description: "Rich, creamy curries define this region, heavily influenced by Mughal cuisine. Tandoor cooking, dairy-based gravies, and wheat-based breads (naan, roti, paratha) are staples. Punjab, Delhi, and Lucknow each contribute distinctive dishes. This is the India most familiar to Western diners.",
      signatureDishes: ["Butter Chicken", "Dal Makhani", "Rogan Josh", "Biryani", "Naan"],
      keyIngredients: ["cream", "butter", "paneer", "wheat flour", "yogurt"],
      distinctiveTraits: ["Tandoor cooking", "Creamy gravies", "Mughal influence", "Wheat-based breads"]
    },
    {
      name: "South India",
      description: "Rice-based cuisine with emphasis on fermented batters, coconut, curry leaves, and tamarind. Sambar, rasam, and coconut chutneys accompany most meals. Vegetarian traditions are strong, though coastal areas have rich seafood traditions. Spicier and tangier than northern cuisine.",
      signatureDishes: ["Dosa", "Idli", "Sambar", "Rasam", "Kerala Fish Curry"],
      keyIngredients: ["rice", "coconut", "curry leaves", "tamarind", "mustard seeds"],
      distinctiveTraits: ["Fermented batters", "Coconut-based", "Rice staple", "Tangy flavors"]
    },
    {
      name: "West India",
      description: "Diverse region spanning Gujarati vegetarian thalis to Goan Portuguese-influenced dishes to Mumbai street food. Gujarat is known for sweet-savory balance and strict vegetarianism. Goa features vindaloo and seafood with coconut. Maharashtra bridges north and south.",
      signatureDishes: ["Pav Bhaji", "Dhokla", "Vindaloo", "Vada Pav", "Thepla"],
      keyIngredients: ["jaggery", "peanuts", "kokum", "coconut", "kokum"],
      distinctiveTraits: ["Sweet-savory balance", "Portuguese influence (Goa)", "Street food culture"]
    },
    {
      name: "East India",
      description: "Bengali cuisine dominates, known for its love of fish, rice, and sweets. Mustard oil and panch phoron (five-spice blend) are signature flavors. The region produces India's most famous desserts. Subtle, less spicy flavors compared to other regions.",
      signatureDishes: ["Machher Jhol", "Rasgulla", "Shorshe Ilish", "Sandesh", "Luchi"],
      keyIngredients: ["mustard oil", "fish", "panch phoron", "poppy seeds", "milk"],
      distinctiveTraits: ["Fish-centric", "Renowned sweets", "Mustard oil", "Subtle spicing"]
    }
  ],
  popularDishes: [
    {
      name: "Butter Chicken",
      englishName: "Murgh Makhani",
      pronunciation: "murg mah-kah-nee",
      description: "Tandoor-cooked chicken in a creamy, mildly spiced tomato sauce with butter and cream. Created in 1950s Delhi, it's become India's most famous curry worldwide.",
      category: "main",
      keyTraits: ["creamy", "tomato-based", "tandoor"],
      regionalOrigin: "North India (Delhi)",
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Biryani",
      pronunciation: "bir-yah-nee",
      description: "Fragrant layered rice dish with spiced meat (or vegetables), saffron, and caramelized onions, slow-cooked in a sealed pot. Each city has its own style—Hyderabadi, Lucknowi, Kolkata.",
      category: "main",
      keyTraits: ["saffron", "layered", "aromatic"],
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Dal Makhani",
      pronunciation: "dahl mah-kah-nee",
      description: "Black lentils slow-cooked overnight with butter, cream, and mild spices. A Punjabi classic that's become synonymous with North Indian restaurant cuisine.",
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
      category: "main",
      keyTraits: ["spinach", "paneer", "vegetarian"],
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Dosa",
      pronunciation: "doh-sah",
      description: "Crispy, fermented rice and lentil crepe, often filled with spiced potatoes (masala dosa). Served with sambar and chutneys. A South Indian breakfast staple.",
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
      category: "appetizer",
      keyTraits: ["fried", "potato", "street food"],
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
      category: "main",
      keyTraits: ["tandoor", "yogurt marinade", "smoky"],
      popularity: "tourist-classic",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Gulab Jamun",
      pronunciation: "goo-lahb jah-moon",
      description: "Deep-fried milk solid balls soaked in rose-scented sugar syrup. One of India's most beloved desserts, served warm at celebrations.",
      category: "dessert",
      keyTraits: ["sweet", "rose water", "fried"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    }
  ],
  popularBeverages: [
    {
      name: "Masala Chai",
      englishName: "Spiced Tea",
      pronunciation: "mah-sah-lah chai",
      description: "Black tea brewed with milk, sugar, and warming spices like cardamom, ginger, cinnamon, and cloves. India's national drink, sold by chai wallahs on every corner.",
      type: "non-alcoholic",
      category: "tea",
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
      type: "non-alcoholic",
      category: "street",
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
      type: "non-alcoholic",
      category: "juice",
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
      type: "non-alcoholic",
      category: "street",
      servedHow: "cold",
      keyIngredients: ["yogurt", "mango", "sugar", "cardamom"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Thandai",
      pronunciation: "than-dye",
      description: "Chilled spiced milk drink with almonds, fennel, rose petals, and saffron. Traditional during Holi festival. Sometimes made with bhang (cannabis) for celebrations.",
      type: "both",
      category: "ceremonial",
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
