import type { Country } from './types';

export const countries: Country[] = [
  {
    id: "TH",
    name: "Thailand",
    capital: "Bangkok",
    continent: "Asia",
    region: "Southeast Asia",
    colorPalette: {
      primary: "#1e4d6b",      // Muted navy blue (from flag)
      secondary: "#c44536",    // Muted red (from flag)
      accent: "#d4a574",       // Warm gold
      background: "#f8f6f2",   // Cream white
      text: "#1e3a4f"          // Dark blue-gray
    },
    foodCulture: {
      overview: "Thai cuisine is deeply woven into the country's social fabric, with food serving as a centerpiece of family gatherings, religious ceremonies, and everyday life. Meals are communal affairs—dishes are placed at the center of the table and shared among everyone, with each person taking small portions of multiple dishes alongside rice.\n\nStreet food culture is ubiquitous and essential to understanding Thai food. From bustling night markets in Bangkok to roadside vendors in small villages, Thais eat out frequently, often multiple times per day. The line between restaurant and street stall is blurred, with some of the country's most celebrated dishes served from humble carts.\n\nThe Thai approach to food emphasizes balance—not just of flavors within a dish, but across an entire meal. A proper Thai meal includes contrasting dishes: something spicy balanced by something mild, something rich offset by something light and refreshing.",
      mealStructure: "Meals typically center around rice (khao), with multiple dishes served simultaneously rather than in courses. Breakfast might be rice porridge (jok) or noodle soup, lunch a single-plate dish, and dinner the most elaborate meal with several shared dishes.",
      diningCustoms: "Food is eaten with a spoon (main utensil) and fork (used to push food onto the spoon). Chopsticks are reserved for noodle dishes. It's common to order more dishes than people at the table, ensuring variety.",
      historicalInfluences: "Thai cuisine reflects centuries of trade and cultural exchange—Chinese influences in noodle dishes and stir-frying techniques, Indian influences in curries, and Portuguese introduction of chilies in the 16th century that transformed the cuisine."
    },
    cuisineProfile: {
      summary: "Thai cuisine is defined by its bold, harmonious balance of spicy, sour, sweet, and salty flavors, with an emphasis on fresh herbs and aromatic ingredients.",
      flavorProfile: ["spicy (phet)", "sour (priao)", "sweet (wan)", "salty (kem)", "aromatic", "herbaceous"],
      flavorIntensity: {
        heat: 8,
        acidity: 8,
        sweetness: 7,
        umami: 7,
        aromatic: 9,
        smokeEarth: 3,
        interpretation: "Bold and aromatic with bright balance of heat and sour, creating signature Thai flavor harmony."
      },
      keyIngredients: ["jasmine rice", "fish sauce (nam pla)", "coconut milk", "palm sugar", "tamarind", "lime", "shrimp paste", "rice noodles"],
      cookingTechniques: ["stir-frying (pad)", "grilling (yang)", "boiling/simmering curries", "pounding in mortar and pestle", "deep-frying"],
      cookingFlow: [
        { action: "Pound", emoji: "🪨" },
        { action: "Fry paste", emoji: "🍳" },
        { action: "Add coconut", emoji: "🥥" },
        { action: "Simmer", emoji: "🍲" },
        { action: "Garnish", emoji: "🌿" }
      ],
      spicesAndSeasonings: ["Thai chilies", "galangal", "lemongrass", "kaffir lime leaves", "Thai basil", "cilantro (roots, stems, leaves)", "garlic", "shallots", "turmeric", "coriander seeds", "cumin"],
      ingredientTiers: {
        foundation: [
          { name: "Fish Sauce", emoji: "🐟", description: "Nam pla · Umami base · Fermented, salty" },
          { name: "Coconut Milk", emoji: "🥥", description: "Curry base · Rich, creamy" },
          { name: "Thai Chilies", emoji: "🌶️", description: "Bird's eye · Heat source · Intense, fruity" },
          { name: "Lime", emoji: "🍋", description: "Acid balance · Bright, sour" }
        ],
        aromaticCore: [
          { name: "Lemongrass", emoji: "🌿", description: "Takrai · Aromatic · Citrusy, floral" },
          { name: "Galangal", emoji: "🫚", description: "Thai ginger · Aromatic · Sharp, piney" },
          { name: "Kaffir Lime", emoji: "🍃", description: "Makrut · Aromatic leaf · Intense citrus" },
          { name: "Thai Basil", emoji: "🌿", description: "Horapa · Fresh herb · Anise-like" },
          { name: "Cilantro", emoji: "🌱", description: "AKA coriander · Fresh garnish · Citrusy" }
        ],
        flavorBuilders: [
          { name: "Shallots", emoji: "🧅", description: "Hom daeng · Aromatic · Mild, sweet" },
          { name: "Garlic", emoji: "🧄", description: "Kratiem · Aromatic · Pungent, sharp" },
          { name: "Palm Sugar", emoji: "🍯", description: "Nam tan pip · Sweetener · Caramel notes" },
          { name: "Tamarind", emoji: "🫘", description: "Makham · Souring agent · Fruity, tart" },
          { name: "Shrimp Paste", emoji: "🦐", description: "Kapi · Umami bomb · Pungent, funky" },
          { name: "Coriander Seeds", emoji: "🫛", description: "Dried spice · Warm, citrusy" },
          { name: "Turmeric", emoji: "🟡", description: "Khamin · Color & spice · Earthy, warm" }
        ],
        staples: [
          { name: "Jasmine Rice", emoji: "🍚", description: "Khao hom mali · Base starch · Fragrant" },
          { name: "Rice Noodles", emoji: "🍜", description: "Sen · Base starch · Chewy, neutral" },
          { name: "Tofu", emoji: "🧈", description: "Tao hu · Protein · Mild, absorbent" }
        ]
      }
    },
    regionalVariations: [
      {
        name: "Central Thailand",
        description: "The cuisine of Bangkok and the central plains is what most foreigners recognize as 'Thai food.' It balances all four flavors—sweet, sour, salty, spicy—with coconut milk-based curries and aromatic stir-fries. This region refined dishes from across Thailand for the royal court.",
        signatureDishes: ["Pad Thai", "Green Curry", "Tom Yum", "Pad Krapow"],
        keyIngredients: ["coconut milk", "palm sugar", "jasmine rice", "Thai basil"],
        distinctiveTraits: ["Balance of all four flavors", "Coconut-rich curries", "Royal cuisine influence"]
      },
      {
        name: "Northern Thailand (Lanna)",
        description: "Chiang Mai and the mountainous north feature milder, earthier flavors with Burmese and Laotian influences. Less coconut milk, more herbs and dried spices. Sticky rice replaces jasmine rice as the staple. Dishes tend to be less sweet and less spicy than central Thai food.",
        signatureDishes: ["Khao Soi", "Sai Oua (Northern sausage)", "Laab", "Nam Prik Ong"],
        keyIngredients: ["sticky rice", "dried chilies", "turmeric", "fermented soybeans"],
        distinctiveTraits: ["Burmese influences", "Sticky rice staple", "Milder heat", "Fermented ingredients"]
      },
      {
        name: "Northeastern Thailand (Isan)",
        description: "The largest and most populous region, Isan cuisine is rustic, intensely flavored, and heavily influenced by Laos. Known for grilled meats, fermented fish, raw dishes, and the iconic green papaya salad. Sticky rice is essential, eaten by hand.",
        signatureDishes: ["Som Tum", "Larb", "Gai Yang", "Nam Tok"],
        keyIngredients: ["sticky rice", "fermented fish (pla ra)", "green papaya", "dried chilies", "lime"],
        distinctiveTraits: ["Laotian influence", "Fermented fish (pla ra)", "Intense sourness and heat", "Grilled meats"]
      },
      {
        name: "Southern Thailand",
        description: "The peninsula's cuisine is the spiciest in Thailand, with Malaysian and Indian Muslim influences. Heavy use of turmeric gives dishes a yellow hue. Coconut and seafood dominate, and curries are thinner and more intense than central versions.",
        signatureDishes: ["Massaman Curry", "Gaeng Som", "Khua Kling", "Satay"],
        keyIngredients: ["turmeric", "coconut", "seafood", "shrimp paste", "bird's eye chilies"],
        distinctiveTraits: ["Extreme spiciness", "Muslim influences", "Turmeric-forward", "Thin, intense curries"]
      }
    ],
    popularDishes: [
      {
        name: "Pad Thai",
        pronunciation: "pahd tie",
        description: "Stir-fried rice noodles with eggs, tofu or shrimp, bean sprouts, and peanuts in a sweet-sour tamarind sauce. Thailand's most internationally recognized dish.",
        category: "main",
        keyTraits: ["wok-fried", "tamarind", "rice noodles"],
        isStreetFood: true,
        popularity: "tourist-classic",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tom Yum Goong",
        englishName: "Spicy Shrimp Soup",
        pronunciation: "tom yum goong",
        description: "Hot and sour soup with shrimp, mushrooms, lemongrass, galangal, kaffir lime leaves, and chilies. The quintessential Thai soup.",
        category: "soup",
        keyTraits: ["lemongrass", "hot & sour", "galangal"],
        popularity: "both",
        spiceLevel: "hot",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Som Tum",
        englishName: "Green Papaya Salad",
        pronunciation: "som tum",
        description: "Shredded unripe papaya pounded with tomatoes, green beans, peanuts, dried shrimp, and chilies in a lime and fish sauce dressing. Originates from the Isan region.",
        category: "salad",
        keyTraits: ["pounded", "lime", "fish sauce"],
        isStreetFood: true,
        regionalOrigin: "Isan (Northeastern Thailand)",
        popularity: "local-favorite",
        spiceLevel: "very-hot",
        difficulty: "easy",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Gaeng Keow Wan",
        englishName: "Green Curry",
        pronunciation: "gang kee-ow wahn",
        description: "Creamy coconut curry with green chili paste, Thai eggplant, bamboo shoots, and Thai basil, typically made with chicken or beef.",
        category: "main",
        keyTraits: ["coconut milk", "Thai basil", "green chili"],
        popularity: "tourist-classic",
        spiceLevel: "hot",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Khao Pad",
        englishName: "Thai Fried Rice",
        pronunciation: "cow pahd",
        description: "Wok-fried jasmine rice with egg, onion, and choice of protein, seasoned with fish sauce and served with lime and cucumber.",
        category: "main",
        keyTraits: ["wok-fried", "jasmine rice", "fish sauce"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Massaman Curry",
        pronunciation: "mah-sah-mahn",
        description: "Rich, mild curry with Muslim influences, featuring potatoes, peanuts, and warm spices like cardamom, cinnamon, and star anise. Often made with beef or chicken.",
        category: "main",
        keyTraits: ["coconut", "warm spices", "peanuts"],
        regionalOrigin: "Southern Thailand",
        popularity: "tourist-classic",
        spiceLevel: "mild",
        difficulty: "hard",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pad Krapow Moo Saap",
        englishName: "Basil Pork",
        pronunciation: "pahd kra-pow moo sahp",
        description: "Stir-fried minced pork with holy basil, chilies, and garlic, served over rice with a fried egg. A beloved everyday lunch dish.",
        category: "main",
        keyTraits: ["holy basil", "garlic", "stir-fried"],
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "hot",
        difficulty: "easy",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mango Sticky Rice",
        englishName: "Khao Niao Mamuang",
        description: "Sweet glutinous rice soaked in coconut cream, served with ripe mango slices. A beloved seasonal dessert during mango season.",
        category: "dessert",
        keyTraits: ["coconut cream", "glutinous rice", "sweet"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      }
    ],
    popularBeverages: [
      {
        name: "Thai Iced Tea",
        englishName: "Cha Yen",
        pronunciation: "chah yen",
        description: "Sweet, creamy orange-colored tea made with strongly brewed Ceylon tea, condensed milk, and evaporated milk, served over ice.",
        type: "non-alcoholic",
        category: "tea",
        servedHow: "iced",
        keyIngredients: ["Ceylon tea", "condensed milk", "evaporated milk", "sugar"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isGlutenFree: true }
      },
      {
        name: "Thai Iced Coffee",
        englishName: "Oliang",
        pronunciation: "oh-lee-ahng",
        description: "Strong coffee brewed with roasted corn, soybeans, and sesame, sweetened with condensed milk and served over ice.",
        type: "non-alcoholic",
        category: "coffee",
        servedHow: "iced",
        keyIngredients: ["coffee", "condensed milk", "roasted corn", "sesame"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isGlutenFree: true }
      },
      {
        name: "Nam Manao",
        englishName: "Fresh Lime Juice",
        pronunciation: "nahm ma-now",
        description: "Refreshing Thai limeade made with fresh lime juice, sugar, and a pinch of salt, served over ice.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "iced",
        keyIngredients: ["lime", "sugar", "salt"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Singha",
        pronunciation: "sing-ha",
        description: "Thailand's most famous beer, a full-bodied pale lager with a slightly bitter finish. Named after a mythical lion.",
        type: "alcoholic",
        category: "beer",
        servedHow: "cold",
        keyIngredients: ["barley malt", "hops"],
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true }
      },
      {
        name: "Mekhong",
        pronunciation: "may-kohng",
        description: "Thai rum-whisky hybrid made from sugarcane and rice, often mixed with soda or used in cocktails. Named after the Mekong River.",
        type: "alcoholic",
        category: "spirit",
        keyIngredients: ["sugarcane", "rice"],
        alcoholContent: "high",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "MX",
    name: "Mexico",
    capital: "Mexico City",
    continent: "North America",
    region: "Central America",
    colorPalette: {
      primary: "#355e3b",      // Muted forest green (from flag)
      secondary: "#a63d40",    // Muted red (from flag)
      accent: "#d4a574",       // Warm terracotta
      background: "#faf8f5",   // Warm cream
      text: "#2d3a2e"          // Dark green-gray
    },
    foodCulture: {
      overview: "Mexican cuisine is recognized by UNESCO as an Intangible Cultural Heritage of Humanity, reflecting thousands of years of culinary tradition stretching back to ancient Mesoamerican civilizations. Food is inseparable from Mexican identity—recipes are passed down through generations, and regional pride in local dishes runs deep.\n\nMeals are social anchors. The comida, typically eaten between 2-4 PM, is the main meal of the day and often a family affair lasting an hour or more. Street food is equally vital—taquerias, market stalls, and roving vendors serve everything from tacos to tamales at all hours.\n\nMexican cooking is labor-intensive and deeply respected. The preparation of moles, which can contain 20+ ingredients and require hours of work, exemplifies the cuisine's complexity. Even everyday dishes like fresh tortillas demand skill and care.",
      mealStructure: "Breakfast (desayuno) is often hearty—eggs, beans, tortillas, chilaquiles. The main meal (comida) happens mid-afternoon and may include soup, a main dish, and dessert. Dinner (cena) is lighter, often antojitos (snacks) or leftovers.",
      diningCustoms: "Tortillas serve as both utensil and staple—used to scoop food, wrap ingredients, or accompany dishes. Sharing plates of tacos or antojitos is common. Lime, salsa, and fresh cilantro are ubiquitous table condiments.",
      historicalInfluences: "The foundation is Mesoamerican—corn, beans, squash, and chilies cultivated for millennia. Spanish colonization introduced pork, beef, dairy, rice, and wheat. This fusion created iconic dishes like tacos al pastor (Lebanese-influenced) and the complex moles blending indigenous and European techniques."
    },
    cuisineProfile: {
      summary: "Mexican cuisine layers complex, earthy flavors built on corn, chilies, and beans, with regional variations ranging from coastal seafood to highland stews.",
      flavorProfile: ["earthy", "smoky", "spicy (ranging from mild to fiery)", "tangy (lime, tomatillo)", "rich", "herbaceous"],
      flavorIntensity: {
        heat: 7,
        acidity: 7,
        sweetness: 4,
        umami: 6,
        aromatic: 7,
        smokeEarth: 9,
        interpretation: "Rich layers of smoky chilies, earthy spices, and bright citrus with moderate heat."
      },
      keyIngredients: ["corn (maize)", "dried and fresh chilies", "black beans", "tomatoes", "tomatillos", "avocado", "lime", "queso fresco", "crema"],
      cookingTechniques: ["nixtamalization (corn processing)", "dry-roasting chilies and spices", "braising and stewing", "grilling (al carbon)", "frying"],
      cookingFlow: [
        { action: "Toast chilies", emoji: "🌶️" },
        { action: "Blend", emoji: "🫙" },
        { action: "Fry paste", emoji: "🍳" },
        { action: "Braise", emoji: "🍖" },
        { action: "Garnish", emoji: "🌿" }
      ],
      spicesAndSeasonings: ["cumin", "oregano (Mexican)", "epazote", "cilantro", "cinnamon", "cloves", "achiote (annatto)", "dried chilies (ancho, guajillo, chipotle, pasilla)"],
      ingredientTiers: {
        foundation: [
          { name: "Corn", emoji: "🌽", description: "Maíz · Base starch · Sacred, versatile" },
          { name: "Dried Chilies", emoji: "🌶️", description: "Chiles secos · Heat & flavor · Smoky, complex" },
          { name: "Lime", emoji: "🍋", description: "Limón · Acid balance · Bright, essential" },
          { name: "Black Beans", emoji: "🫘", description: "Frijoles negros · Protein · Earthy, creamy" }
        ],
        aromaticCore: [
          { name: "Cilantro", emoji: "🌿", description: "AKA coriander · Fresh garnish · Citrusy, polarizing" },
          { name: "Epazote", emoji: "🌱", description: "Mexican herb · Bean seasoning · Pungent, minty" },
          { name: "Cumin", emoji: "🫛", description: "Comino · Dried spice · Earthy, warm" },
          { name: "Mexican Oregano", emoji: "🍃", description: "Dried herb · More citrusy than Mediterranean" },
          { name: "Cinnamon", emoji: "🪵", description: "Canela · Ceylon variety · Sweet, warm" }
        ],
        flavorBuilders: [
          { name: "Tomatoes", emoji: "🍅", description: "Jitomate · Salsa base · Bright, acidic" },
          { name: "Tomatillos", emoji: "🟢", description: "Tomate verde · Salsa verde · Tangy, citrusy" },
          { name: "Onion", emoji: "🧅", description: "Cebolla · Aromatic · Sharp, sweet when charred" },
          { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic · Pungent, mellows roasted" },
          { name: "Avocado", emoji: "🥑", description: "Aguacate · Creamy fat · Rich, buttery" },
          { name: "Achiote", emoji: "🟠", description: "Annatto · Color & spice · Earthy, musky" },
          { name: "Chocolate", emoji: "🍫", description: "Cacao · Mole depth · Bitter, complex" }
        ],
        staples: [
          { name: "Tortillas", emoji: "🫓", description: "Base starch · Corn or flour · Fresh daily" },
          { name: "Queso Fresco", emoji: "🧀", description: "Fresh cheese · Crumbly, mild" },
          { name: "Crema", emoji: "🥛", description: "Mexican cream · Tangy, pourable" },
          { name: "Rice", emoji: "🍚", description: "Arroz rojo · Side dish · Tomato-cooked" }
        ]
      }
    },
    regionalVariations: [
      {
        name: "Central Mexico",
        description: "The heartland around Mexico City and Puebla is home to the cuisine most recognized internationally. Complex moles, street tacos, and the full range of antojitos define this region. Puebla claims several iconic dishes including mole poblano and chiles en nogada.",
        signatureDishes: ["Mole Poblano", "Tacos al Pastor", "Chiles en Nogada", "Chalupas"],
        keyIngredients: ["dried chilies", "chocolate", "corn", "pork", "queso fresco"],
        distinctiveTraits: ["Complex moles", "Street taco culture", "Pre-Hispanic + Spanish fusion"]
      },
      {
        name: "Oaxaca",
        description: "Known as 'the land of seven moles,' Oaxaca has perhaps Mexico's most distinctive regional cuisine. Indigenous Zapotec traditions remain strong. Oaxacan cheese (quesillo), chapulines (grasshoppers), and mezcal are iconic. The variety of moles—negro, rojo, amarillo, verde—is unmatched.",
        signatureDishes: ["Mole Negro", "Tlayudas", "Chapulines", "Tamales Oaxaqueños"],
        keyIngredients: ["chocolate", "quesillo cheese", "chapulines", "hierba santa", "mezcal"],
        distinctiveTraits: ["Seven distinct moles", "Strong indigenous traditions", "Mezcal culture", "Edible insects"]
      },
      {
        name: "Yucatán",
        description: "The Yucatán peninsula's cuisine reflects Mayan heritage and Caribbean influences. Achiote (annatto) gives dishes a distinctive red-orange color. Citrus-marinated meats, habanero heat, and unique preparations like cochinita pibil (pit-roasted pork) set this region apart.",
        signatureDishes: ["Cochinita Pibil", "Papadzules", "Sopa de Lima", "Poc Chuc"],
        keyIngredients: ["achiote", "sour orange", "habanero", "banana leaves", "black beans"],
        distinctiveTraits: ["Mayan influence", "Achiote-forward", "Habanero heat", "Pit-roasting (pibil)"]
      },
      {
        name: "Northern Mexico",
        description: "The ranching north features beef-centric cuisine influenced by cowboy culture. Flour tortillas replace corn, grilled meats dominate, and cheese is abundant. Cabrito (roasted goat), machaca (dried beef), and large flour tortilla burritos originate here.",
        signatureDishes: ["Carne Asada", "Cabrito", "Machaca", "Burritos"],
        keyIngredients: ["beef", "flour tortillas", "cheese", "dried beef", "pinto beans"],
        distinctiveTraits: ["Beef and grilled meats", "Flour tortillas", "Ranching culture", "Simpler preparations"]
      },
      {
        name: "Coastal Regions",
        description: "Both Pacific and Gulf coasts contribute vibrant seafood traditions. Veracruz on the Gulf shows Spanish and Afro-Caribbean influences. The Pacific coast from Sinaloa to Guerrero is known for aguachile, fresh ceviches, and coconut-based dishes.",
        signatureDishes: ["Pescado a la Veracruzana", "Aguachile", "Ceviche", "Camarones al Coco"],
        keyIngredients: ["fresh seafood", "lime", "coconut", "olives", "capers"],
        distinctiveTraits: ["Fresh seafood focus", "Spanish colonial influence (Gulf)", "Citrus-cured dishes (Pacific)"]
      }
    ],
    popularDishes: [
      {
        name: "Tacos",
        pronunciation: "tah-kohs",
        description: "Soft corn tortillas filled with endless variations—carne asada, carnitas, al pastor, barbacoa, fish—topped with onion, cilantro, salsa, and lime.",
        category: "main",
        keyTraits: ["corn tortilla", "cilantro", "salsa"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "medium",
        difficulty: "easy",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mole Poblano",
        pronunciation: "moh-leh poh-blah-noh",
        description: "Complex sauce of dried chilies, chocolate, nuts, spices, and more, typically served over chicken or turkey. Originated in Puebla and requires hours of preparation.",
        category: "main",
        keyTraits: ["chocolate", "dried chilies", "complex"],
        regionalOrigin: "Puebla",
        popularity: "both",
        spiceLevel: "medium",
        difficulty: "hard",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Pozole",
        pronunciation: "poh-soh-leh",
        description: "Hearty hominy soup with pork or chicken in a red or green chili broth, garnished with cabbage, radish, oregano, and lime. Traditional for celebrations.",
        category: "soup",
        keyTraits: ["hominy", "chili broth", "pork"],
        popularity: "local-favorite",
        spiceLevel: "medium",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chiles en Nogada",
        pronunciation: "chee-lehs en noh-gah-dah",
        description: "Poblano peppers stuffed with picadillo (meat and fruit mixture), covered in walnut cream sauce and pomegranate seeds. A patriotic dish eaten in September.",
        category: "main",
        keyTraits: ["walnut cream", "poblano", "picadillo"],
        regionalOrigin: "Puebla",
        popularity: "local-favorite",
        spiceLevel: "mild",
        difficulty: "hard",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Tamales",
        pronunciation: "tah-mah-lehs",
        description: "Corn masa filled with meats, cheese, or sweet fillings, wrapped in corn husks or banana leaves and steamed. A labor of love often made communally.",
        category: "main",
        keyTraits: ["masa", "steamed", "corn husk"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "hard",
        dietary: { isVegetarianFriendly: true, isGlutenFree: true }
      },
      {
        name: "Guacamole",
        pronunciation: "gwah-kah-moh-leh",
        description: "Mashed avocado with lime, cilantro, onion, tomato, and chili. Simple but essential, served with tortilla chips or as a taco accompaniment.",
        category: "appetizer",
        keyTraits: ["avocado", "lime", "cilantro"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Elote",
        pronunciation: "eh-loh-teh",
        description: "Grilled corn on the cob slathered with mayonnaise, cotija cheese, chili powder, and lime. Iconic Mexican street food.",
        category: "street-food",
        keyTraits: ["grilled corn", "cotija", "chili lime"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Churros",
        pronunciation: "choo-rohs",
        description: "Fried dough pastry coated in cinnamon sugar, often served with chocolate sauce for dipping. A beloved street dessert.",
        category: "dessert",
        keyTraits: ["fried dough", "cinnamon sugar", "chocolate"],
        isStreetFood: true,
        popularity: "tourist-classic",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarian: true }
      }
    ],
    popularBeverages: [
      {
        name: "Horchata",
        pronunciation: "or-chah-tah",
        description: "Creamy, refreshing rice-based drink flavored with cinnamon and vanilla. A staple at taquerias and family gatherings.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["rice", "cinnamon", "vanilla", "sugar"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Jamaica",
        englishName: "Hibiscus Tea",
        pronunciation: "ha-my-kah",
        description: "Deep red drink made from dried hibiscus flowers, served cold and sweetened. Tart, refreshing, and rich in antioxidants.",
        type: "non-alcoholic",
        category: "tea",
        servedHow: "cold",
        keyIngredients: ["hibiscus flowers", "sugar", "lime"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mexican Hot Chocolate",
        englishName: "Chocolate Caliente",
        pronunciation: "choh-koh-lah-teh kah-lee-en-teh",
        description: "Spiced hot chocolate made with Mexican chocolate tablets, frothed with a molinillo. Flavored with cinnamon and sometimes chili.",
        type: "non-alcoholic",
        category: "street",
        servedHow: "hot",
        keyIngredients: ["Mexican chocolate", "cinnamon", "milk"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isGlutenFree: true }
      },
      {
        name: "Mezcal",
        pronunciation: "mes-kahl",
        description: "Smoky agave spirit made primarily in Oaxaca, traditionally sipped neat. The agave hearts are roasted in underground pits.",
        type: "alcoholic",
        category: "spirit",
        regionalOrigin: "Oaxaca",
        keyIngredients: ["agave"],
        isTraditional: true,
        alcoholContent: "high",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tequila",
        pronunciation: "teh-kee-lah",
        description: "Famous agave spirit from Jalisco, made exclusively from blue agave. Ranges from unaged blanco to barrel-aged añejo.",
        type: "alcoholic",
        category: "spirit",
        regionalOrigin: "Jalisco",
        keyIngredients: ["blue agave"],
        isTraditional: true,
        alcoholContent: "high",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "JP",
    name: "Japan",
    capital: "Tokyo",
    continent: "Asia",
    region: "East Asia",
    colorPalette: {
      primary: "#8b2942",      // Muted crimson (from flag)
      secondary: "#4a5568",    // Slate gray (zen aesthetic)
      accent: "#c9a86c",       // Gold (imperial)
      background: "#faf9f7",   // Off-white (washi paper)
      text: "#2d2d2d"          // Soft black
    },
    foodCulture: {
      overview: "Japanese cuisine (washoku) is UNESCO-recognized for its emphasis on seasonality, balance, and presentation. Food is approached with reverence—the phrase 'itadakimasu' (I humbly receive) spoken before meals reflects gratitude for the ingredients, the cook, and nature itself.\n\nAesthetics matter as much as taste. Dishes are composed with attention to color, texture, and arrangement. Seasonal ingredients (shun) are prized at their peak, and menus change throughout the year to reflect what's freshest.\n\nSpecialization runs deep in Japanese food culture. Chefs often dedicate entire careers to mastering a single dish—sushi, ramen, tempura, or soba. This pursuit of perfection (shokunin spirit) elevates even humble dishes to art forms.",
      mealStructure: "Traditional meals follow ichiju-sansai: one soup, three sides, plus rice and pickles. Breakfast might include rice, miso soup, grilled fish, and pickled vegetables. Lunch is often a set meal (teishoku) or bowl dish. Dinner is the largest meal.",
      diningCustoms: "Slurping noodles is acceptable and shows appreciation. Chopsticks should never be stuck upright in rice (funeral association). Many restaurants specialize in one dish. Saying 'gochisousama' after eating thanks the preparer.",
      historicalInfluences: "Buddhist influence led to centuries of minimal meat consumption, developing the vegetable, tofu, and seafood traditions. Chinese influence brought ramen, gyoza, and stir-frying. Post-WWII American influence created yoshoku (Western-Japanese fusion) dishes like tonkatsu curry."
    },
    cuisineProfile: {
      summary: "Japanese cuisine emphasizes clean, pure flavors that showcase ingredients at their peak, with umami as the defining taste underpinning most dishes.",
      flavorProfile: ["umami-rich", "subtle", "clean", "delicate", "savory-sweet", "oceanic"],
      flavorIntensity: {
        heat: 2,
        acidity: 3,
        sweetness: 5,
        umami: 10,
        aromatic: 5,
        smokeEarth: 4,
        interpretation: "Subtle umami depth with delicate aromatics and minimal heat, emphasizing pure ingredient flavors."
      },
      keyIngredients: ["short-grain rice", "soy sauce (shoyu)", "dashi (seaweed and bonito stock)", "miso", "mirin", "sake", "tofu", "seafood", "nori (seaweed)"],
      cookingTechniques: ["raw preparation (sashimi)", "grilling (yakitori, robata)", "deep-frying (tempura, tonkatsu)", "simmering (nimono)", "steaming"],
      cookingFlow: [
        { action: "Make dashi", emoji: "🍵" },
        { action: "Season", emoji: "🧂" },
        { action: "Cook", emoji: "♨️" },
        { action: "Plate", emoji: "🎨" },
        { action: "Garnish", emoji: "🌸" }
      ],
      spicesAndSeasonings: ["wasabi", "ginger", "shichimi togarashi", "sesame (seeds and oil)", "shiso", "mitsuba", "yuzu", "sancho pepper"],
      ingredientTiers: {
        foundation: [
          { name: "Soy Sauce", emoji: "🫘", description: "Shoyu · Umami base · Salty, fermented" },
          { name: "Dashi", emoji: "🍵", description: "Stock base · Umami foundation · Subtle, clean" },
          { name: "Miso", emoji: "🥣", description: "Fermented paste · Umami · Salty, complex" },
          { name: "Rice", emoji: "🍚", description: "Gohan · Base starch · Sticky, slightly sweet" }
        ],
        aromaticCore: [
          { name: "Wasabi", emoji: "🟢", description: "Japanese horseradish · Condiment · Sharp, floral" },
          { name: "Ginger", emoji: "🫚", description: "Shoga · Aromatic · Spicy, bright" },
          { name: "Shiso", emoji: "🌿", description: "Perilla leaf · Fresh herb · Minty, basil-like" },
          { name: "Nori", emoji: "🍙", description: "Dried seaweed · Wrapper · Ocean umami" },
          { name: "Yuzu", emoji: "🍋", description: "Japanese citrus · Aromatic · Floral, tart" }
        ],
        flavorBuilders: [
          { name: "Mirin", emoji: "🍶", description: "Sweet rice wine · Glaze · Adds sheen" },
          { name: "Sake", emoji: "🍶", description: "Rice wine · Cooking wine · Tenderizes" },
          { name: "Sesame", emoji: "🫛", description: "Goma · Seeds/oil · Nutty, rich" },
          { name: "Bonito", emoji: "🐟", description: "Katsuobushi · Dashi base · Smoky, umami" },
          { name: "Kombu", emoji: "🌊", description: "Kelp · Dashi base · Glutamate-rich" },
          { name: "Tofu", emoji: "🧈", description: "Soybean curd · Protein · Mild, silky" },
          { name: "Scallion", emoji: "🧅", description: "Negi · Garnish · Mild onion" }
        ],
        staples: [
          { name: "Short-grain Rice", emoji: "🍚", description: "Japonica · Base starch · Sticky, fragrant" },
          { name: "Udon", emoji: "🍜", description: "Wheat noodle · Thick, chewy" },
          { name: "Soba", emoji: "🍝", description: "Buckwheat noodle · Nutty, earthy" }
        ]
      }
    },
    popularDishes: [
      {
        name: "Sushi",
        pronunciation: "soo-shee",
        description: "Vinegared rice paired with fresh raw fish, seafood, or vegetables. Ranges from casual conveyor-belt shops to exclusive omakase counters where chefs serve piece by piece.",
        category: "main",
        keyTraits: ["vinegared rice", "raw fish", "nori"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Ramen",
        pronunciation: "rah-men",
        description: "Wheat noodles in rich broth—tonkotsu (pork bone), shoyu (soy), miso, or shio (salt)—topped with chashu pork, eggs, nori, and scallions. Regional styles vary dramatically.",
        category: "soup",
        keyTraits: ["rich broth", "wheat noodles", "chashu"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "hard",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Tempura",
        pronunciation: "tem-poo-rah",
        description: "Lightly battered and deep-fried vegetables and seafood, served with tentsuyu dipping sauce. The batter is kept ice-cold for maximum crispness.",
        category: "main",
        keyTraits: ["light batter", "deep-fried", "dashi"],
        popularity: "tourist-classic",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Tonkatsu",
        pronunciation: "tohn-kah-tsoo",
        description: "Breaded and deep-fried pork cutlet, served with shredded cabbage, rice, and tangy tonkatsu sauce. A comfort food staple.",
        category: "main",
        keyTraits: ["panko-breaded", "pork cutlet", "tonkatsu sauce"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isDairyFree: true }
      },
      {
        name: "Okonomiyaki",
        englishName: "Savory Pancake",
        pronunciation: "oh-koh-noh-mee-yah-kee",
        description: "Cabbage-based savory pancake with various fillings, topped with mayo, okonomiyaki sauce, bonito flakes, and seaweed. Osaka and Hiroshima have distinct styles.",
        category: "main",
        keyTraits: ["cabbage", "savory pancake", "bonito flakes"],
        regionalOrigin: "Osaka / Hiroshima",
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true }
      },
      {
        name: "Yakitori",
        pronunciation: "yah-kee-toh-ree",
        description: "Skewered and grilled chicken pieces—thigh, breast, skin, organs—seasoned with salt or sweet tare sauce. Quintessential izakaya (pub) food.",
        category: "appetizer",
        keyTraits: ["charcoal-grilled", "tare sauce", "skewered"],
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Miso Soup",
        pronunciation: "mee-soh",
        description: "Dashi broth with dissolved miso paste, tofu, wakame seaweed, and scallions. Served with nearly every traditional meal.",
        category: "soup",
        keyTraits: ["dashi", "fermented miso", "tofu"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Matcha",
        pronunciation: "mah-chah",
        description: "Powdered green tea whisked into hot water, central to Japanese tea ceremony. Also used in desserts, lattes, and sweets.",
        category: "beverage",
        keyTraits: ["green tea", "ceremonial", "umami"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      }
    ],
    popularBeverages: [
      {
        name: "Sake",
        englishName: "Rice Wine",
        pronunciation: "sah-keh",
        description: "Fermented rice beverage central to Japanese culture. Ranges from dry to sweet, served cold, warm, or hot depending on the style.",
        type: "alcoholic",
        category: "wine",
        keyIngredients: ["rice", "koji", "water"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Green Tea",
        englishName: "Ocha",
        pronunciation: "oh-chah",
        description: "Everyday Japanese green tea served with meals. Sencha is most common, with a grassy, slightly astringent flavor.",
        type: "non-alcoholic",
        category: "tea",
        servedHow: "hot",
        keyIngredients: ["green tea leaves"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Ramune",
        pronunciation: "rah-moo-neh",
        description: "Iconic Japanese soda in a distinctive marble-sealed bottle. Lemon-lime flavor with a nostalgic, carnival association.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["carbonated water", "sugar", "citrus flavor"],
        isTraditional: false,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Shochu",
        pronunciation: "shoh-choo",
        description: "Distilled spirit made from barley, sweet potato, or rice. Lower proof than whisky, often drunk on the rocks or with water.",
        type: "alcoholic",
        category: "spirit",
        keyIngredients: ["barley", "sweet potato", "rice"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true }
      },
      {
        name: "Calpis",
        englishName: "Calpico",
        pronunciation: "kah-ru-pee-su",
        description: "Milky, slightly sweet and tangy soft drink made from fermented milk. Often diluted with water or soda.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["fermented milk", "sugar"],
        isTraditional: false,
        dietary: { isGlutenFree: true }
      }
    ]
  },
  {
    id: "IT",
    name: "Italy",
    capital: "Rome",
    continent: "Europe",
    region: "Southern Europe",
    colorPalette: {
      primary: "#3d5c45",      // Muted olive green (from flag)
      secondary: "#8b3a3a",    // Muted burgundy red (from flag)
      accent: "#c9a227",       // Tuscan gold
      background: "#fdfbf7",   // Warm ivory
      text: "#2f3630"          // Dark olive
    },
    foodCulture: {
      overview: "Italian cuisine is fundamentally regional—there is no single 'Italian food' but rather a mosaic of local traditions shaped by geography, history, and climate. A dish authentic in Bologna may be unrecognizable in Naples. Italians take fierce pride in their local specialties and often view other regions' versions with skepticism.\n\nSimplicity and ingredient quality define the philosophy. Recipes often have few components, making the quality of each essential. A caprese salad is only as good as its tomatoes, mozzarella, and olive oil. This restraint requires confidence—letting ingredients speak rather than masking them.\n\nMeals are structured rituals. A proper Italian meal moves through courses: antipasto, primo (pasta or rice), secondo (meat or fish), contorno (vegetables), and dolce (dessert). While everyday eating is simpler, Sunday lunch and holidays often follow this progression.",
      mealStructure: "Breakfast (colazione) is light—espresso and a pastry. Lunch (pranzo) was traditionally the main meal, though this is shifting. Dinner (cena) is eaten late (8-9 PM) and can be the largest meal. Aperitivo (pre-dinner drinks with snacks) is a social institution.",
      diningCustoms: "Pasta is a first course, not a main. Cheese is never added to seafood pasta. Cappuccino is a morning drink only. Bread is for wiping sauce, not dipping in olive oil (that's American). Eating while walking is frowned upon.",
      historicalInfluences: "Ancient Roman cuisine laid foundations with olive oil, wine, and bread. Arab influence in Sicily brought citrus, rice, and sugar. The tomato (from the Americas) didn't become central until the 18th-19th centuries. Regional fragmentation until 1861 preserved distinct local traditions."
    },
    cuisineProfile: {
      summary: "Italian cuisine celebrates simplicity and regional tradition, relying on high-quality ingredients prepared with restraint to achieve bright, balanced flavors.",
      flavorProfile: ["bright (tomato, lemon)", "savory (aged cheese, cured meats)", "herbaceous", "olive oil-rich", "balanced", "subtle"],
      flavorIntensity: {
        heat: 2,
        acidity: 6,
        sweetness: 3,
        umami: 8,
        aromatic: 6,
        smokeEarth: 4,
        interpretation: "Strong umami from aged cheeses and tomatoes, balanced acidity, aromatic herbs."
      },
      keyIngredients: ["olive oil", "tomatoes (fresh and canned San Marzano)", "Parmigiano-Reggiano", "pasta (dozens of shapes)", "cured pork (guanciale, pancetta, prosciutto)", "garlic", "white beans", "arborio rice"],
      cookingTechniques: ["sautéing in olive oil", "slow-simmering sauces (ragù)", "roasting", "grilling", "curing and aging meats/cheeses"],
      cookingFlow: [
        { action: "Sauté", emoji: "🧄" },
        { action: "Toast", emoji: "🍞" },
        { action: "Deglaze", emoji: "🍷" },
        { action: "Simmer", emoji: "🍝" },
        { action: "Add cheese", emoji: "🧀" }
      ],
      spicesAndSeasonings: ["basil", "oregano", "rosemary", "sage", "flat-leaf parsley", "garlic", "red pepper flakes (peperoncino)", "fennel seeds", "black pepper"],
      ingredientTiers: {
        foundation: [
          { name: "Olive Oil", emoji: "🫒", description: "Olio · Primary fat · Fruity, grassy" },
          { name: "Tomatoes", emoji: "🍅", description: "Pomodori · Sauce base · Bright, acidic" },
          { name: "Parmigiano", emoji: "🧀", description: "Aged cheese · Umami · Crystalline, nutty" },
          { name: "Garlic", emoji: "🧄", description: "Aglio · Aromatic · Used with restraint" }
        ],
        aromaticCore: [
          { name: "Basil", emoji: "🌿", description: "Basilico · Fresh herb · Sweet, aromatic" },
          { name: "Oregano", emoji: "🌿", description: "Dried herb · Southern Italian · Earthy" },
          { name: "Rosemary", emoji: "🌲", description: "Rosmarino · Fresh herb · Piney, resinous" },
          { name: "Sage", emoji: "🍃", description: "Salvia · Fresh herb · Earthy, savory" },
          { name: "Parsley", emoji: "🌱", description: "Prezzemolo · Flat-leaf · Fresh, bright" }
        ],
        flavorBuilders: [
          { name: "White Wine", emoji: "🍷", description: "Vino bianco · Deglazing · Acidic, aromatic" },
          { name: "Pecorino", emoji: "🧀", description: "Sheep cheese · Roman pastas · Sharp, salty" },
          { name: "Guanciale", emoji: "🥓", description: "Cured jowl · Carbonara · Rich, porky" },
          { name: "Anchovies", emoji: "🐟", description: "Acciughe · Umami bomb · Melts into sauce" },
          { name: "Capers", emoji: "🫒", description: "Capperi · Flavor accent · Briny, piquant" },
          { name: "Peperoncino", emoji: "🌶️", description: "Chili flakes · Gentle heat" },
          { name: "Black Pepper", emoji: "⚫", description: "Pepe nero · Key spice · Sharp, warm" }
        ],
        staples: [
          { name: "Pasta", emoji: "🍝", description: "Base starch · Shape matters · Al dente" },
          { name: "Arborio Rice", emoji: "🍚", description: "Risotto rice · High starch · Creamy" },
          { name: "Bread", emoji: "🥖", description: "Pane · Regional styles · For scarpetta" },
          { name: "Prosciutto", emoji: "🥓", description: "Cured ham · Aged 12-36mo · Sweet, salty" }
        ]
      }
    },
    regionalVariations: [
      {
        name: "Northern Italy",
        description: "The wealthy north—Piedmont, Lombardy, Veneto, Emilia-Romagna—features richer, butter-based cuisine influenced by neighboring France and Austria. Risotto rivals pasta as a staple. Cream sauces, polenta, and cured meats like prosciutto di Parma define the region. Emilia-Romagna is considered Italy's culinary heartland.",
        signatureDishes: ["Risotto alla Milanese", "Ossobuco", "Tortellini in Brodo", "Cotoletta alla Milanese"],
        keyIngredients: ["butter", "arborio rice", "Parmigiano-Reggiano", "prosciutto", "balsamic vinegar", "polenta"],
        distinctiveTraits: ["Butter over olive oil", "Risotto culture", "Rich cream sauces", "Cured meat tradition"]
      },
      {
        name: "Central Italy",
        description: "Tuscany, Umbria, and Lazio (Rome) showcase rustic simplicity. Tuscan cuisine is famously under-salted, letting ingredients shine. Roman cuisine features bold, assertive flavors—cacio e pepe, carbonara, amatriciana. Grilled meats, white beans, and hearty soups define the region.",
        signatureDishes: ["Carbonara", "Cacio e Pepe", "Bistecca alla Fiorentina", "Ribollita"],
        keyIngredients: ["pecorino Romano", "guanciale", "white beans", "olive oil", "black pepper", "Chianina beef"],
        distinctiveTraits: ["Rustic simplicity", "Nose-to-tail cooking", "Assertive Roman flavors", "Unsalted Tuscan bread"]
      },
      {
        name: "Southern Italy & Sicily",
        description: "Naples and the south are the birthplace of pizza and dried pasta. Tomatoes, olive oil, and seafood dominate. Cooking is more assertive and garlicky. Sicily adds Arab influences—couscous, citrus, sweet-and-sour preparations (agrodolce), and extraordinary pastries like cannoli.",
        signatureDishes: ["Pizza Napoletana", "Pasta alla Norma", "Caponata", "Cannoli"],
        keyIngredients: ["San Marzano tomatoes", "mozzarella di bufala", "eggplant", "capers", "almonds", "citrus"],
        distinctiveTraits: ["Birthplace of pizza", "Tomato-forward", "Arab influences in Sicily", "Abundant seafood"]
      }
    ],
    popularDishes: [
      {
        name: "Pasta alla Carbonara",
        pronunciation: "kar-boh-nah-rah",
        description: "Rigatoni or spaghetti tossed with guanciale, egg yolks, Pecorino Romano, and black pepper. No cream—the silky sauce comes from emulsifying eggs with pasta water.",
        category: "main",
        keyTraits: ["guanciale", "egg yolk", "pecorino"],
        regionalOrigin: "Rome",
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: {}
      },
      {
        name: "Margherita Pizza",
        pronunciation: "mar-geh-ree-tah",
        description: "Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and olive oil on a charred, chewy crust. The standard by which all pizza is measured.",
        category: "main",
        keyTraits: ["San Marzano", "fresh mozzarella", "wood-fired"],
        regionalOrigin: "Naples",
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegetarian: true }
      },
      {
        name: "Risotto alla Milanese",
        pronunciation: "ree-zoh-toh mee-lah-neh-zeh",
        description: "Creamy arborio rice slowly cooked with saffron, white wine, and butter, finished with Parmigiano. Golden-hued and luxurious.",
        category: "main",
        keyTraits: ["saffron", "arborio rice", "butter"],
        regionalOrigin: "Milan",
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Ossobuco",
        pronunciation: "oh-soh-boo-koh",
        description: "Braised veal shanks with vegetables, white wine, and broth, traditionally served with risotto alla Milanese. The marrow is prized.",
        category: "main",
        keyTraits: ["braised", "veal shank", "gremolata"],
        regionalOrigin: "Milan",
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Lasagna Bolognese",
        pronunciation: "lah-zahn-yah boh-loh-nyeh-zeh",
        description: "Layers of fresh pasta sheets, slow-cooked meat ragù, béchamel, and Parmigiano, baked until golden. A labor-intensive celebration dish.",
        category: "main",
        keyTraits: ["ragù", "béchamel", "layered"],
        regionalOrigin: "Bologna",
        popularity: "tourist-classic",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: {}
      },
      {
        name: "Gelato",
        pronunciation: "jeh-lah-toh",
        description: "Italian ice cream with less air and fat than American versions, resulting in denser, more intense flavors. Pistachio, stracciatella, and hazelnut are classics.",
        category: "dessert",
        keyTraits: ["dense", "pistachio", "artisanal"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Prosciutto e Melone",
        pronunciation: "proh-shoo-toh eh meh-loh-neh",
        description: "Paper-thin aged prosciutto draped over ripe cantaloupe. A perfect summer antipasto balancing salty, sweet, and savory.",
        category: "appetizer",
        keyTraits: ["cured ham", "cantaloupe", "sweet-savory"],
        popularity: "tourist-classic",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tiramisu",
        pronunciation: "tee-rah-mee-soo",
        description: "Layered dessert of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa. Originated in the Veneto region in the 1960s-80s.",
        category: "dessert",
        keyTraits: ["espresso", "mascarpone", "cocoa"],
        regionalOrigin: "Veneto",
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarian: true }
      }
    ],
    popularBeverages: [
      {
        name: "Espresso",
        pronunciation: "eh-spreh-soh",
        description: "Strong, concentrated coffee served in small cups. The foundation of Italian coffee culture, drunk standing at the bar throughout the day.",
        type: "non-alcoholic",
        category: "coffee",
        servedHow: "hot",
        keyIngredients: ["finely ground coffee"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Aperol Spritz",
        pronunciation: "ah-peh-rol sprits",
        description: "Iconic aperitif cocktail of Aperol, prosecco, and soda water, garnished with orange. The quintessential Italian happy hour drink.",
        type: "alcoholic",
        category: "cocktail",
        regionalOrigin: "Veneto",
        servedHow: "cold",
        keyIngredients: ["Aperol", "prosecco", "soda water", "orange"],
        alcoholContent: "low",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Limoncello",
        pronunciation: "lee-mohn-cheh-loh",
        description: "Bright yellow lemon liqueur from the Amalfi Coast. Made by steeping lemon zest in alcohol, served ice-cold as a digestivo.",
        type: "alcoholic",
        category: "spirit",
        regionalOrigin: "Amalfi Coast",
        servedHow: "cold",
        keyIngredients: ["lemon zest", "alcohol", "sugar"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Prosecco",
        pronunciation: "proh-seh-koh",
        description: "Sparkling white wine from the Veneto region. Lighter and fruitier than Champagne, perfect for aperitivo or celebrations.",
        type: "alcoholic",
        category: "wine",
        regionalOrigin: "Veneto",
        servedHow: "cold",
        keyIngredients: ["Glera grapes"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chinotto",
        pronunciation: "kee-noh-toh",
        description: "Bitter citrus soda made from the chinotto fruit. Dark brown with a complex, bittersweet flavor similar to cola but more herbal.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["chinotto citrus", "sugar", "carbonated water"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "ET",
    name: "Ethiopia",
    capital: "Addis Ababa",
    continent: "Africa",
    region: "East Africa",
    colorPalette: {
      primary: "#2d5a27",      // Muted green (from flag)
      secondary: "#c9a227",    // Muted gold/yellow (from flag)
      accent: "#a63d40",       // Muted red (from flag)
      background: "#faf8f3",   // Warm cream
      text: "#2a3a2a"          // Dark green-gray
    },
    foodCulture: {
      overview: "Ethiopian cuisine is one of the world's most distinctive and communal food traditions. Meals are served on a single large platter lined with injera (spongy flatbread), with various stews and dishes arranged on top. Diners tear off pieces of injera and use them to scoop up food—no utensils needed.\n\nFood and spirituality are intertwined. The Ethiopian Orthodox Church prescribes over 200 fasting days per year when meat and dairy are forbidden, leading to an extraordinarily rich tradition of vegan dishes. Wednesday and Friday are regular fasting days for observant Christians.\n\nCoffee holds sacred status—Ethiopia is the birthplace of arabica coffee, and the coffee ceremony (buna) is an hours-long ritual of roasting, grinding, and brewing performed for guests. Refusing coffee is considered impolite.",
      mealStructure: "Meals center on the communal platter. Lunch is typically the largest meal. The injera serves as both plate and utensil. Dishes are eaten in no particular order—diners graze across the platter. Coffee ceremony often follows meals.",
      diningCustoms: "Eating from a shared platter using hands only (right hand). Gursha—hand-feeding someone else a morsel—is a gesture of respect and affection. The person who tears the last piece of injera should not eat it alone.",
      historicalInfluences: "Ancient trade routes brought spices from Arabia and India. Unique highland climate allowed cultivation of teff (the grain for injera) found almost nowhere else. Italian occupation (1936-41) left minimal culinary impact, unlike in Eritrea. Indigenous traditions remained remarkably intact."
    },
    cuisineProfile: {
      summary: "Ethiopian cuisine features complex spice blends, hearty stews, and the iconic injera flatbread, with an extensive tradition of flavorful vegan dishes alongside rich meat preparations.",
      flavorProfile: ["warmly spiced", "earthy", "tangy (from injera fermentation)", "rich", "peppery", "aromatic"],
      flavorIntensity: {
        heat: 8,
        acidity: 6,
        sweetness: 2,
        umami: 7,
        aromatic: 9,
        smokeEarth: 7,
        interpretation: "Intense heat and complex spice from berbere, deep earthy notes from legumes and grains."
      },
      keyIngredients: ["teff flour (for injera)", "berbere spice blend", "niter kibbeh (spiced clarified butter)", "lentils", "chickpeas", "collard greens", "beef", "lamb", "chicken"],
      cookingTechniques: ["slow-simmering stews (wots)", "dry-frying spices", "fermenting (injera batter)", "clarifying and spicing butter", "raw meat preparation (kitfo, gored gored)"],
      cookingFlow: [
        { action: "Toast spices", emoji: "🫚" },
        { action: "Mix berbere", emoji: "🌶️" },
        { action: "Sauté onions", emoji: "🧅" },
        { action: "Simmer wot", emoji: "🍲" },
        { action: "Serve", emoji: "🫓" }
      ],
      spicesAndSeasonings: ["berbere (chili, fenugreek, coriander, cardamom, and more)", "mitmita (chili powder blend)", "korarima (Ethiopian cardamom)", "black cumin", "fenugreek", "bishop's weed (ajwain)", "rue"],
      ingredientTiers: {
        foundation: [
          { name: "Berbere", emoji: "🌶️", description: "Spice blend · Defining flavor · Hot, complex" },
          { name: "Niter Kibbeh", emoji: "🧈", description: "Spiced butter · Cooking fat · Aromatic, rich" },
          { name: "Teff", emoji: "🌾", description: "Ancient grain · Injera flour · Nutty, sour" },
          { name: "Onions", emoji: "🧅", description: "Key shiro · Wot base · Slow-caramelized" }
        ],
        aromaticCore: [
          { name: "Korarima", emoji: "🫛", description: "Ethiopian cardamom · Spice · Eucalyptus notes" },
          { name: "Fenugreek", emoji: "🌿", description: "Abish · Key spice · Maple-like, bitter" },
          { name: "Black Cumin", emoji: "⚫", description: "AKA nigella · Spice · Earthy, oniony" },
          { name: "Ginger", emoji: "🫚", description: "Zingibil · Aromatic · Warm, spicy" },
          { name: "Garlic", emoji: "🧄", description: "Nech shinkurt · Aromatic · Pungent" }
        ],
        flavorBuilders: [
          { name: "Red Lentils", emoji: "🟠", description: "Misir · Protein · Quick-cooking" },
          { name: "Chickpeas", emoji: "🫘", description: "Shimbra · Protein · For shiro" },
          { name: "Collard Greens", emoji: "🥬", description: "Gomen · Vegetable · Mild, earthy" },
          { name: "Tomatoes", emoji: "🍅", description: "Color & acid · In wots" },
          { name: "Mitmita", emoji: "🔴", description: "Chili powder · Heat · Fiery, cardamom" },
          { name: "Cardamom", emoji: "🫛", description: "Korerima · Spice · Floral, sweet" },
          { name: "Coriander", emoji: "🌱", description: "Dimbilal · Spice · Warm, citrusy" }
        ],
        staples: [
          { name: "Injera", emoji: "🫓", description: "Flatbread · Plate & utensil · Spongy, sour" },
          { name: "Beef", emoji: "🥩", description: "Siga · Protein · Wots, tibs, kitfo" },
          { name: "Lamb", emoji: "🍖", description: "Beg · Protein · Rich, fatty" },
          { name: "Chicken", emoji: "🍗", description: "Doro · Special occasions · In doro wot" }
        ]
      }
    },
    popularDishes: [
      {
        name: "Injera",
        pronunciation: "in-jeh-rah",
        description: "Spongy, tangy flatbread made from fermented teff batter. The foundation of every Ethiopian meal—serving as plate, utensil, and staple carbohydrate.",
        category: "side",
        keyTraits: ["fermented teff", "spongy", "tangy"],
        isVegetarian: true,
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Doro Wot",
        pronunciation: "doh-roh woht",
        description: "Spicy chicken stew simmered for hours in berbere and niter kibbeh, served with hard-boiled eggs. The national dish, reserved for special occasions and holidays.",
        category: "main",
        keyTraits: ["berbere", "niter kibbeh", "slow-simmered"],
        popularity: "both",
        spiceLevel: "hot",
        difficulty: "hard",
        dietary: { isGlutenFree: true, isHalal: true }
      },
      {
        name: "Kitfo",
        pronunciation: "kit-foh",
        description: "Minced raw beef seasoned with mitmita and niter kibbeh. Can be served leb leb (lightly warmed) or fully cooked. Ethiopia's steak tartare equivalent.",
        category: "main",
        keyTraits: ["raw beef", "mitmita", "niter kibbeh"],
        popularity: "local-favorite",
        spiceLevel: "hot",
        difficulty: "medium",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Misir Wot",
        pronunciation: "mih-sir woht",
        description: "Red lentils simmered in berbere spice blend until thick and flavorful. A fasting-day staple and one of the world's great vegan dishes.",
        category: "main",
        keyTraits: ["red lentils", "berbere", "vegan"],
        isVegetarian: true,
        popularity: "both",
        spiceLevel: "medium",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Shiro",
        pronunciation: "shee-roh",
        description: "Smooth, thick stew of ground chickpeas or broad beans with garlic, onion, and spices. Humble, comforting, and ubiquitous on fasting days.",
        category: "main",
        keyTraits: ["chickpea", "creamy", "garlic"],
        isVegetarian: true,
        popularity: "local-favorite",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tibs",
        pronunciation: "tibs",
        description: "Sautéed meat (beef or lamb) with onions, peppers, and spices. Ranges from mild (alicha tibs) to fiery. Often served sizzling in a clay pot.",
        category: "main",
        keyTraits: ["sautéed", "onions", "peppers"],
        popularity: "local-favorite",
        spiceLevel: "medium",
        difficulty: "easy",
        dietary: { isGlutenFree: true, isHalal: true }
      },
      {
        name: "Gomen",
        pronunciation: "goh-men",
        description: "Collard greens sautéed with garlic, ginger, and spices. A standard component of the vegetarian combination platter.",
        category: "side",
        keyTraits: ["collard greens", "garlic", "ginger"],
        isVegetarian: true,
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Ethiopian Coffee (Buna)",
        pronunciation: "boo-nah",
        description: "Coffee roasted, ground, and brewed tableside in a jebena (clay pot). Served in three rounds of decreasing strength. A ceremony, not just a drink.",
        category: "beverage",
        keyTraits: ["fresh-roasted", "ceremonial", "jebena"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      }
    ],
    popularBeverages: [
      {
        name: "Coffee (Buna)",
        pronunciation: "boo-nah",
        description: "Ceremonial coffee roasted, ground, and brewed tableside in a jebena clay pot. Served in three rounds: abol, tona, and baraka, each progressively weaker.",
        type: "non-alcoholic",
        category: "ceremonial",
        servedHow: "hot",
        keyIngredients: ["green coffee beans", "frankincense"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tej",
        pronunciation: "tedge",
        description: "Traditional Ethiopian honey wine with a sweet, slightly bitter taste from gesho leaves. Served in distinctive round-bottomed flasks called berele.",
        type: "alcoholic",
        category: "wine",
        keyIngredients: ["honey", "gesho leaves", "water"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tella",
        pronunciation: "teh-lah",
        description: "Traditional Ethiopian beer made from fermented barley, wheat, or teff. Thick, cloudy, and mildly sour with low alcohol content.",
        type: "alcoholic",
        category: "beer",
        keyIngredients: ["barley", "gesho", "water"],
        isTraditional: true,
        alcoholContent: "low",
        dietary: { isVegan: true, isDairyFree: true }
      },
      {
        name: "Spris",
        pronunciation: "spreece",
        description: "Unique Ethiopian drink that's half coffee, half tea in the same cup. A popular way to enjoy both beverages simultaneously.",
        type: "non-alcoholic",
        category: "coffee",
        servedHow: "hot",
        keyIngredients: ["coffee", "black tea"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "PE",
    name: "Peru",
    capital: "Lima",
    continent: "South America",
    region: "Western South America",
    colorPalette: {
      primary: "#8b2942",      // Muted red (from flag)
      secondary: "#5c4033",    // Earthy brown (Incan)
      accent: "#c9a227",       // Incan gold
      background: "#fdfaf6",   // Warm cream
      text: "#3d2a2a"          // Dark burgundy
    },
    foodCulture: {
      overview: "Peruvian cuisine has emerged as one of the world's most celebrated, built on 5,000 years of indigenous tradition fused with Spanish, African, Chinese, and Japanese influences. Lima is now considered a global culinary capital, home to multiple restaurants on the World's 50 Best list.\n\nGeographic diversity shapes the cuisine dramatically. The coast (costa) emphasizes seafood and ceviche. The highlands (sierra) feature hearty dishes with potatoes, corn, and meat. The Amazon (selva) contributes exotic fruits, fish, and ingredients found nowhere else.\n\nPeru is the origin of the potato—over 3,000 varieties grow here—and this biodiversity extends to corn (55 varieties), peppers (ají), and countless other ingredients. The cuisine celebrates this abundance.",
      mealStructure: "Lunch (almuerzo) is the main meal, often a multi-course set menu at restaurants. Ceviche is traditionally a lunch dish (the citrus is thought to aid afternoon energy). Dinner is lighter. Street food and snacks are eaten throughout the day.",
      diningCustoms: "Ceviche is eaten with a spoon; the citrus 'leche de tigre' liquid is sipped or drunk as a hangover cure. Sharing anticuchos (skewers) at street carts is a social activity. Pisco sour before meals is customary.",
      historicalInfluences: "Inca and pre-Inca civilizations developed sophisticated preservation and cooking techniques. Spanish colonization brought new ingredients and livestock. Chinese immigrants (chifa) and Japanese immigrants (Nikkei) created distinct fusion cuisines now integral to Peruvian food."
    },
    cuisineProfile: {
      summary: "Peruvian cuisine blends indigenous ingredients with global influences, featuring bold use of ají peppers, citrus, and an unparalleled diversity of potatoes, corn, and seafood.",
      flavorProfile: ["citrus-bright", "ají pepper heat (fruity, not just hot)", "tangy", "savory", "earthy (highland dishes)", "fresh"],
      flavorIntensity: {
        heat: 6,
        acidity: 9,
        sweetness: 3,
        umami: 5,
        aromatic: 6,
        smokeEarth: 5,
        interpretation: "Bright acidity from lime and ají peppers, balanced heat, subtle umami from seafood."
      },
      keyIngredients: ["ají amarillo (yellow pepper)", "lime", "potatoes (thousands of varieties)", "corn (choclo)", "seafood", "quinoa", "cilantro", "ají panca", "huacatay (black mint)"],
      cookingTechniques: ["curing in citrus (ceviche)", "stir-frying (from chifa influence)", "braising and stewing", "grilling (anticuchos)", "pachamanca (earth oven cooking)"],
      cookingFlow: [
        { action: "Slice fish", emoji: "🐟" },
        { action: "Add citrus", emoji: "🍋" },
        { action: "Chop", emoji: "🧅" },
        { action: "Cure", emoji: "🥣" },
        { action: "Plate", emoji: "🍠" }
      ],
      spicesAndSeasonings: ["ají amarillo", "ají panca", "ají rocoto", "cumin", "garlic", "cilantro", "huacatay", "chincho", "palillo (Peruvian turmeric)"],
      ingredientTiers: {
        foundation: [
          { name: "Ají Amarillo", emoji: "🌶️", description: "Yellow pepper · Signature heat · Fruity, mild" },
          { name: "Lime", emoji: "🍋", description: "Limón · Ceviche acid · Bright, essential" },
          { name: "Potatoes", emoji: "🥔", description: "Papa · 3000+ varieties · Starchy, diverse" },
          { name: "Corn", emoji: "🌽", description: "Choclo · Giant kernels · Starchy, sweet" }
        ],
        aromaticCore: [
          { name: "Cilantro", emoji: "🌿", description: "Culantro · Fresh herb · Citrusy, bright" },
          { name: "Huacatay", emoji: "🌱", description: "Black mint · Andean herb · Anise-tarragon" },
          { name: "Ají Panca", emoji: "🔴", description: "Dried pepper · Adobos · Mild, berry-like" },
          { name: "Ají Rocoto", emoji: "🫑", description: "Hot pepper · Apple-shaped · Intense heat" },
          { name: "Cumin", emoji: "🫛", description: "Comino · Dried spice · Earthy, warm" }
        ],
        flavorBuilders: [
          { name: "Red Onion", emoji: "🧅", description: "Cebolla · Ceviche topping · Sharp, purple" },
          { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic · Pungent, essential" },
          { name: "Soy Sauce", emoji: "🫘", description: "Chifa influence · Umami · Asian fusion" },
          { name: "Vinegar", emoji: "🫙", description: "Acid · Escabeche · Tangy, preserving" },
          { name: "Sweet Potato", emoji: "🍠", description: "Camote · Side dish · Sweet contrast" },
          { name: "Cancha", emoji: "🌽", description: "Corn nuts · Toasted · Crunchy, nutty" },
          { name: "Palillo", emoji: "🟡", description: "Peruvian turmeric · Color · Mild, earthy" }
        ],
        staples: [
          { name: "Fresh Fish", emoji: "🐟", description: "Pescado · Ceviche base · Pacific, fresh" },
          { name: "Rice", emoji: "🍚", description: "Arroz · Side starch · With everything" },
          { name: "Quinoa", emoji: "🌾", description: "Andean grain · Protein-rich · Nutty" }
        ]
      }
    },
    popularDishes: [
      {
        name: "Ceviche",
        pronunciation: "seh-vee-cheh",
        description: "Fresh raw fish cured in lime juice with ají, red onion, and cilantro. Served with sweet potato and cancha (toasted corn). Peru's national dish and point of pride.",
        category: "main",
        keyTraits: ["lime-cured", "ají amarillo", "red onion"],
        popularity: "both",
        spiceLevel: "medium",
        difficulty: "easy",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Lomo Saltado",
        pronunciation: "loh-moh sahl-tah-doh",
        description: "Stir-fried beef with onions, tomatoes, and ají amarillo, served over rice with French fries. The quintessential chifa (Chinese-Peruvian) fusion dish.",
        category: "main",
        keyTraits: ["stir-fried", "chifa fusion", "soy sauce"],
        popularity: "both",
        spiceLevel: "medium",
        difficulty: "medium",
        dietary: { isDairyFree: true }
      },
      {
        name: "Ají de Gallina",
        pronunciation: "ah-hee deh gah-yee-nah",
        description: "Shredded chicken in a creamy sauce of ají amarillo, bread, walnuts, and cheese, served over rice with potatoes and olives.",
        category: "main",
        keyTraits: ["creamy", "ají amarillo", "walnuts"],
        popularity: "local-favorite",
        spiceLevel: "medium",
        difficulty: "medium",
        dietary: {}
      },
      {
        name: "Anticuchos",
        pronunciation: "ahn-tee-koo-chohs",
        description: "Grilled beef heart skewers marinated in vinegar, cumin, and ají panca. Beloved street food with pre-Columbian origins, served with potatoes and corn.",
        category: "street-food",
        keyTraits: ["grilled", "beef heart", "ají panca"],
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "medium",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Causa",
        pronunciation: "cow-sah",
        description: "Layered cold dish of seasoned mashed yellow potato with ají amarillo, filled with chicken, tuna, or crab salad. Striking presentation.",
        category: "appetizer",
        keyTraits: ["layered potato", "ají amarillo", "cold"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Rocoto Relleno",
        pronunciation: "roh-koh-toh reh-yeh-noh",
        description: "Stuffed rocoto pepper (extremely spicy) with ground beef, onions, eggs, and cheese, baked until golden. A specialty of Arequipa.",
        category: "main",
        keyTraits: ["stuffed pepper", "rocoto", "baked"],
        regionalOrigin: "Arequipa",
        popularity: "local-favorite",
        spiceLevel: "very-hot",
        difficulty: "hard",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Picarones",
        pronunciation: "pee-kah-roh-nehs",
        description: "Sweet potato and squash doughnuts drizzled with chancaca (raw sugar syrup). A beloved street dessert dating to colonial times.",
        category: "dessert",
        keyTraits: ["sweet potato", "chancaca syrup", "fried"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pisco Sour",
        pronunciation: "pees-koh",
        description: "Cocktail of pisco (grape brandy), lime juice, simple syrup, egg white, and bitters. Peru's national drink, with contested Chilean origins.",
        category: "beverage",
        keyTraits: ["pisco", "lime", "egg white foam"],
        popularity: "tourist-classic",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isDairyFree: true, isGlutenFree: true }
      }
    ],
    popularBeverages: [
      {
        name: "Pisco Sour",
        pronunciation: "pees-koh sow-er",
        description: "Peru's national cocktail made with pisco, lime juice, simple syrup, egg white, and Angostura bitters. Frothy, tangy, and iconic.",
        type: "alcoholic",
        category: "cocktail",
        servedHow: "cold",
        keyIngredients: ["pisco", "lime juice", "egg white", "bitters"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chicha Morada",
        pronunciation: "chee-chah moh-rah-dah",
        description: "Sweet, refreshing drink made from purple corn boiled with pineapple, cinnamon, and cloves. Deep purple color and uniquely Peruvian.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["purple corn", "pineapple", "cinnamon", "cloves", "lime"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Inca Kola",
        pronunciation: "in-kah koh-lah",
        description: "Bright yellow soda with a sweet, bubblegum-like flavor. Peru's most popular soft drink, outselling even Coca-Cola in the country.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["lemon verbena", "sugar", "carbonated water"],
        isTraditional: false,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mate de Coca",
        englishName: "Coca Leaf Tea",
        pronunciation: "mah-teh deh koh-kah",
        description: "Tea made from coca leaves, traditionally used to combat altitude sickness. Mild, earthy flavor with a subtle energizing effect.",
        type: "non-alcoholic",
        category: "tea",
        regionalOrigin: "Andes",
        servedHow: "hot",
        keyIngredients: ["coca leaves"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chicha de Jora",
        pronunciation: "chee-chah deh hoh-rah",
        description: "Ancient fermented corn beer dating to Incan times. Mildly alcoholic, slightly sour, and still made traditionally in the Andes.",
        type: "alcoholic",
        category: "beer",
        regionalOrigin: "Andes",
        keyIngredients: ["jora corn", "water"],
        isTraditional: true,
        alcoholContent: "low",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "GE",
    name: "Georgia",
    capital: "Tbilisi",
    continent: "Asia",
    region: "Caucasus",
    colorPalette: {
      primary: "#8b2942",      // Muted wine red (wine heritage)
      secondary: "#4a5568",    // Slate gray (mountains)
      accent: "#c9a227",       // Gold (church domes)
      background: "#fdfaf6",   // Warm cream
      text: "#3d2a2a"          // Dark burgundy
    },
    foodCulture: {
      overview: "Georgian cuisine is one of the world's oldest and most distinctive culinary traditions, shaped by the country's position at the crossroads of Europe and Asia. The supra—a traditional feast presided over by a tamada (toastmaster)—is central to Georgian culture, featuring dozens of dishes and elaborate wine-fueled toasts that can last for hours.\n\nGeorgia is considered one of the birthplaces of wine, with 8,000 years of winemaking history. Traditional qvevri (clay vessels buried underground) are UNESCO-recognized, and wine is inseparable from Georgian hospitality and identity.\n\nThe cuisine celebrates bold, herbaceous flavors with generous use of walnuts, fresh herbs, and the distinctive spice blend khmeli suneli. Regional diversity is remarkable—coastal Adjara, mountainous Svaneti, and eastern Kakheti each have distinct traditions.",
      mealStructure: "Meals often begin with an array of cold dishes (pkhali, salads, cheeses) before hot dishes arrive. The supra feast has no set number of courses—dishes arrive continuously. Bread (puri/shotis puri) is sacred and accompanies every meal.",
      diningCustoms: "Refusing food or drink is considered impolite. Toasts during supra are elaborate and meaningful—to family, ancestors, Georgia itself. Wine is drunk from kantsi (horn) or clay cups. Guests are treated as gifts from God.",
      historicalInfluences: "Ancient trade routes brought Persian, Turkish, and Mediterranean influences. Soviet era paradoxically helped preserve traditions as Georgians clung to cultural identity. Greek colonies on the Black Sea coast left lasting marks. The Silk Road brought spices and techniques from the East."
    },
    cuisineProfile: {
      summary: "Georgian cuisine features bold, herbaceous flavors built on walnuts, fresh herbs, and distinctive spice blends, with exceptional cheese-filled breads and one of the world's oldest wine traditions.",
      flavorProfile: ["herbaceous", "nutty (walnut-forward)", "tangy", "garlicky", "aromatic", "savory"],
      flavorIntensity: {
        heat: 3,
        acidity: 6,
        sweetness: 3,
        umami: 6,
        aromatic: 8,
        smokeEarth: 5,
        interpretation: "Bright, herb-forward flavors with prominent walnut richness and garlic punch, minimal heat."
      },
      keyIngredients: ["walnuts", "fresh herbs (cilantro, dill, tarragon, basil)", "garlic", "pomegranate", "sulguni cheese", "imeruli cheese", "tkemali (sour plum sauce)", "adjika (chili paste)"],
      cookingTechniques: ["clay oven baking (tone)", "grilling and roasting", "walnut paste grinding", "cheese stretching and filling", "herb pounding (pkhali)", "stewing in clay pots"],
      cookingFlow: [
        { action: "Toast nuts", emoji: "🥜" },
        { action: "Pound herbs", emoji: "🧄" },
        { action: "Make paste", emoji: "🥣" },
        { action: "Grill/bake", emoji: "🔥" },
        { action: "Add pomegranate", emoji: "🔴" }
      ],
      spicesAndSeasonings: ["khmeli suneli (spice blend)", "blue fenugreek (utskho suneli)", "coriander seeds", "marigold petals (imeruli saffron)", "dried savory", "red pepper flakes", "fresh cilantro", "dill", "tarragon"],
      ingredientTiers: {
        foundation: [
          { name: "Walnuts", emoji: "🥜", description: "Nighozi · Defining flavor · Sauces, pastes, fillings" },
          { name: "Fresh Herbs", emoji: "🌿", description: "Cilantro, dill, tarragon · Signature freshness" },
          { name: "Garlic", emoji: "🧄", description: "Niori · Aromatic base · Used generously" },
          { name: "Cheese", emoji: "🧀", description: "Sulguni, imeruli · Stretchy, salty, tangy" }
        ],
        aromaticCore: [
          { name: "Blue Fenugreek", emoji: "🌱", description: "Utskho suneli · Key spice · Nutty, maple-like" },
          { name: "Coriander", emoji: "🫛", description: "Kinza · Seed & leaf · Citrusy, warm" },
          { name: "Marigold", emoji: "🌼", description: "Imeruli saffron · Color · Earthy, floral" },
          { name: "Tarragon", emoji: "🌿", description: "Tarkhuna · Fresh herb · Anise notes" },
          { name: "Savory", emoji: "🍃", description: "Kondari · Dried herb · Peppery, thyme-like" }
        ],
        flavorBuilders: [
          { name: "Pomegranate", emoji: "🔴", description: "Brotseulis · Seeds & molasses · Sweet-tart" },
          { name: "Tkemali", emoji: "🟢", description: "Sour plum sauce · Tangy condiment" },
          { name: "Adjika", emoji: "🌶️", description: "Chili paste · Abkhazian · Spicy, garlicky" },
          { name: "Vinegar", emoji: "🫙", description: "Wine vinegar · Pickling, dressings" },
          { name: "Onion", emoji: "🧅", description: "Khakhvi · Base aromatic · Mild, sweet" },
          { name: "Tomatoes", emoji: "🍅", description: "Pomidori · Sauces, salads" },
          { name: "Sour Cream", emoji: "🥛", description: "Arazhani · Tangy dairy · Sauce enrichment" }
        ],
        staples: [
          { name: "Bread", emoji: "🍞", description: "Puri/Shotis · Tone-baked · Chewy, slightly charred" },
          { name: "Beef/Pork", emoji: "🥩", description: "Khortsi · Grilled, stewed" },
          { name: "Chicken", emoji: "🍗", description: "Katami · Roasted, in sauces" },
          { name: "Beans", emoji: "🫘", description: "Lobio · Red beans · Stewed, spiced" }
        ]
      }
    },
    regionalVariations: [
      {
        name: "Kakheti",
        description: "Georgia's premier wine region in the east, Kakheti cuisine pairs perfectly with the local wines. Dishes tend to be robust and meat-heavy. The region is famous for mtsvadi (grilled meat), churchkhela (walnut candy), and traditional qvevri winemaking.",
        signatureDishes: ["Mtsvadi", "Churchkhela", "Chakapuli", "Kakhuri Khachapuri"],
        keyIngredients: ["lamb", "pork", "wine", "tarragon", "sour plums"],
        distinctiveTraits: ["Wine-centric cuisine", "Grilled meats", "Churchkhela tradition", "Qvevri wines"]
      },
      {
        name: "Imereti",
        description: "Central Georgia's Imereti region is known for its distinctive cheese (imeruli) and lighter, more herbaceous cooking. The region claims the original khachapuri and excels in vegetable dishes and subtle spicing.",
        signatureDishes: ["Imeruli Khachapuri", "Gebzhalia", "Elarji", "Mchadi"],
        keyIngredients: ["imeruli cheese", "corn flour", "herbs", "walnuts"],
        distinctiveTraits: ["Cheese-making tradition", "Corn-based dishes", "Lighter flavors", "Original khachapuri"]
      },
      {
        name: "Adjara",
        description: "The Black Sea coastal region brings Turkish and maritime influences. Adjara is famous for its boat-shaped khachapuri topped with egg and butter, dairy-rich cuisine, and seafood. The subtropical climate yields unique ingredients.",
        signatureDishes: ["Adjaruli Khachapuri", "Borano", "Sinori", "Chirbuli"],
        keyIngredients: ["butter", "eggs", "cheese", "corn", "hazelnuts"],
        distinctiveTraits: ["Dairy-rich cooking", "Egg-topped breads", "Turkish influence", "Coastal cuisine"]
      },
      {
        name: "Svaneti",
        description: "The remote mountain region of Svaneti developed unique dishes due to its isolation. Known for kubdari (meat-filled bread), heavy use of caraway and wild herbs, and preservation techniques for the harsh winters.",
        signatureDishes: ["Kubdari", "Tashmijabi", "Svan Salt"],
        keyIngredients: ["caraway", "wild garlic", "beef", "pork", "potatoes"],
        distinctiveTraits: ["Mountain cuisine", "Unique spice blends (Svan salt)", "Meat-stuffed breads", "Preserved foods"]
      }
    ],
    popularDishes: [
      {
        name: "Khachapuri",
        pronunciation: "kha-cha-poo-ree",
        description: "Cheese-filled bread in various regional styles. The dough is stuffed or topped with melted cheese, often with egg and butter. Georgia's most iconic dish with variations in every region.",
        category: "main",
        keyTraits: ["cheese-filled", "bread", "regional styles"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarian: true }
      },
      {
        name: "Khinkali",
        pronunciation: "khin-kah-lee",
        description: "Pleated soup dumplings filled with spiced meat, herbs, and broth. Eaten by hand—hold the top knob, bite, and slurp the juices. Counting the pleats is a mark of skill.",
        category: "main",
        keyTraits: ["soup dumpling", "pleated", "hand-eaten"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "hard",
        dietary: {}
      },
      {
        name: "Badrijani Nigvzit",
        englishName: "Walnut-Stuffed Eggplant",
        pronunciation: "bad-ree-jah-nee nig-vzit",
        description: "Fried eggplant slices rolled around a garlicky walnut paste with herbs and pomegranate seeds. A quintessential Georgian appetizer.",
        category: "appetizer",
        keyTraits: ["walnut paste", "eggplant", "pomegranate"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Lobio",
        pronunciation: "lo-bee-oh",
        description: "Spiced red bean stew cooked with onions, herbs, and walnuts, often served in a clay pot. A hearty staple enjoyed with mchadi (cornbread).",
        category: "main",
        keyTraits: ["red beans", "walnuts", "clay pot"],
        popularity: "local-favorite",
        spiceLevel: "mild",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chakhokhbili",
        pronunciation: "cha-kokh-bee-lee",
        description: "Chicken stewed with tomatoes, onions, and fresh herbs—traditionally made with pheasant. The sauce is rich with tarragon, cilantro, and basil.",
        category: "main",
        keyTraits: ["chicken stew", "tomato", "fresh herbs"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pkhali",
        pronunciation: "p-kha-lee",
        description: "Vegetable pâtés made by finely chopping vegetables (spinach, beet, cabbage) and mixing with walnut paste, garlic, and herbs. Served as appetizers.",
        category: "appetizer",
        keyTraits: ["vegetable pâté", "walnut", "garlic"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "easy",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Satsivi",
        pronunciation: "sat-see-vee",
        description: "Cold chicken or turkey in creamy walnut sauce with garlic and spices. Traditionally served at New Year's, the sauce is rich and aromatic.",
        category: "main",
        keyTraits: ["walnut sauce", "cold dish", "festive"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Churchkhela",
        pronunciation: "church-khe-la",
        description: "Traditional candy made by dipping strings of walnuts or hazelnuts in thickened grape juice, then drying. Called 'Georgian Snickers.'",
        category: "dessert",
        keyTraits: ["grape juice", "walnuts", "string candy"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      }
    ],
    popularBeverages: [
      {
        name: "Georgian Wine",
        englishName: "Ghvino",
        pronunciation: "ghvee-no",
        description: "Wine from one of the world's oldest wine regions. Traditional qvevri (clay vessel) wines have an amber color and tannic character. Saperavi (red) and Rkatsiteli (white) are signature grapes.",
        type: "alcoholic",
        category: "wine",
        keyIngredients: ["Saperavi grapes", "Rkatsiteli grapes"],
        isTraditional: true,
        alcoholContent: "medium",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chacha",
        pronunciation: "cha-cha",
        description: "Georgian grape pomace brandy, similar to Italian grappa. Clear, potent, and often homemade. Traditionally served as a welcome drink or digestive.",
        type: "alcoholic",
        category: "spirit",
        keyIngredients: ["grape pomace"],
        isTraditional: true,
        alcoholContent: "high",
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tarkhuna",
        pronunciation: "tar-khoo-na",
        description: "Bright green tarragon-flavored soda, distinctively Georgian. Sweet with an herbal, anise-like flavor. A nostalgic Soviet-era creation still beloved today.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["tarragon extract", "sugar", "carbonated water"],
        isTraditional: false,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Kompot",
        pronunciation: "kom-pot",
        description: "Traditional fruit drink made by simmering fresh or dried fruits with sugar. Served cold in summer, warm in winter. Common fruits include cherry, plum, and apple.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["seasonal fruits", "sugar", "water"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Borjomi",
        pronunciation: "bor-jo-mee",
        description: "Famous Georgian mineral water from the Borjomi valley. Naturally carbonated with a distinctive salty-mineral taste. Considered medicinal and a hangover cure.",
        type: "non-alcoholic",
        category: "soda",
        servedHow: "cold",
        keyIngredients: ["natural mineral water"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  },
  {
    id: "AZ",
    name: "Azerbaijan",
    capital: "Baku",
    continent: "Asia",
    region: "Caucasus",
    colorPalette: {
      primary: "#0092BC",      // Muted turquoise blue (from flag)
      secondary: "#E4002B",    // Muted red (from flag)
      accent: "#c9a227",       // Gold (Caspian wealth)
      background: "#faf9f7",   // Warm cream
      text: "#2d3a4a"          // Dark blue-gray
    },
    foodCulture: {
      overview: "Azerbaijani cuisine sits at the crossroads of Middle Eastern, Central Asian, and Caucasian influences, creating a rich tapestry of flavors centered on rice, lamb, and aromatic herbs. The country's position on the ancient Silk Road and shores of the Caspian Sea shaped its diverse culinary traditions.\n\nPlov (pilaf) is the undisputed king of Azerbaijani cuisine, with over 40 regional variations, each village claiming their version is best. Rice is treated with reverence—properly cooked plov should have each grain separate, with a prized crispy bottom (qazmaq).\n\nTea culture is central to daily life. Tea houses (çay evi) are social institutions, and tea is served in distinctive pear-shaped glasses (armudu) that keep the top cool and bottom hot.",
      mealStructure: "Meals begin with an array of salads, herbs, and pickles. Main dishes often center on grilled meats or elaborate plovs. Fresh herbs (greens platter) accompany every meal. Tea with sweets concludes the meal and continues for hours.",
      diningCustoms: "Tea is offered immediately to guests—refusing is impolite. Bread is sacred and should never be placed upside down. Generous hospitality is a point of national pride. Meals are leisurely affairs, especially when entertaining.",
      historicalInfluences: "Persian Empire influence is strong in rice dishes and sweets. Turkish influence shows in kebabs and dolma. Soviet era introduced communal dining and preserved certain traditions. Ancient Zoroastrian fire worship left marks in cooking over open flame."
    },
    cuisineProfile: {
      summary: "Azerbaijani cuisine celebrates aromatic rice dishes, grilled meats, and saffron-infused flavors, with strong tea culture and generous use of fresh herbs, dried fruits, and nuts.",
      flavorProfile: ["aromatic (saffron, herbs)", "savory", "subtly sweet (dried fruits)", "tangy (sumac, pomegranate)", "smoky (grilled)", "herbaceous"],
      flavorIntensity: {
        heat: 2,
        acidity: 5,
        sweetness: 5,
        umami: 5,
        aromatic: 8,
        smokeEarth: 6,
        interpretation: "Aromatic and fragrant with saffron, balanced sweet-savory notes from dried fruits, minimal heat."
      },
      keyIngredients: ["saffron", "lamb", "rice", "dried fruits (apricots, plums)", "walnuts", "chestnuts", "pomegranate", "fresh herbs", "sumac", "yogurt"],
      cookingTechniques: ["plov cooking (rice pilaf)", "grilling kebabs (mangal)", "braising and stewing", "dolma wrapping", "slow-roasting", "preserving and pickling"],
      cookingFlow: [
        { action: "Parboil rice", emoji: "🍚" },
        { action: "Sauté", emoji: "🧅" },
        { action: "Layer", emoji: "🥩" },
        { action: "Steam", emoji: "🟡" },
        { action: "Serve", emoji: "🍳" }
      ],
      spicesAndSeasonings: ["saffron", "sumac", "cumin", "coriander", "turmeric", "cinnamon", "dried mint", "dill", "cilantro", "tarragon"],
      ingredientTiers: {
        foundation: [
          { name: "Saffron", emoji: "🟡", description: "Zəfəran · Signature spice · Floral, golden" },
          { name: "Lamb", emoji: "🐑", description: "Quzu · Primary protein · Rich, tender" },
          { name: "Rice", emoji: "🍚", description: "Düyü · Plov base · Long-grain, separate" },
          { name: "Fresh Herbs", emoji: "🌿", description: "Göyərti · Herb platter · Essential accompaniment" }
        ],
        aromaticCore: [
          { name: "Sumac", emoji: "🔴", description: "Sumaq · Souring spice · Tangy, fruity" },
          { name: "Cumin", emoji: "🫛", description: "Zirə · Key spice · Earthy, warm" },
          { name: "Cinnamon", emoji: "🪵", description: "Darçın · Sweet spice · In rice, sweets" },
          { name: "Dried Mint", emoji: "🌱", description: "Nanə · Dried herb · Cooling, bright" },
          { name: "Coriander", emoji: "🌿", description: "Keşniş · Seed & leaf · Citrusy" }
        ],
        flavorBuilders: [
          { name: "Pomegranate", emoji: "🔴", description: "Nar · Molasses & seeds · Sweet-tart" },
          { name: "Dried Apricots", emoji: "🟠", description: "Quru ərik · In plovs · Sweet, tangy" },
          { name: "Chestnuts", emoji: "🌰", description: "Şabalıd · In rice dishes · Nutty, sweet" },
          { name: "Walnuts", emoji: "🥜", description: "Qoz · Stuffings, sweets · Rich, earthy" },
          { name: "Onion", emoji: "🧅", description: "Soğan · Base aromatic · Caramelized depth" },
          { name: "Yogurt", emoji: "🥛", description: "Qatıq · Sauce, marinade · Tangy, creamy" },
          { name: "Butter", emoji: "🧈", description: "Kərə yağı · Enrichment · Golden, rich" }
        ],
        staples: [
          { name: "Bread", emoji: "🍞", description: "Çörək · Tandir-baked · Chewy, charred" },
          { name: "Beef", emoji: "🥩", description: "Mal əti · Kebabs, stews" },
          { name: "Chicken", emoji: "🍗", description: "Toyuq · Roasted, in pilaf" },
          { name: "Caspian Fish", emoji: "🐟", description: "Balıq · Sturgeon, kutum · Grilled, smoked" }
        ]
      }
    },
    regionalVariations: [
      {
        name: "Baku & Absheron",
        description: "The capital region showcases refined, cosmopolitan cuisine influenced by Caspian seafood and urban sophistication. Known for elaborate plovs, fish dishes, and the famous Baku-style pakhlava (diamond-shaped baklava).",
        signatureDishes: ["Shah Plov", "Baliq Plov (Fish Pilaf)", "Baku Pakhlava", "Kutabi"],
        keyIngredients: ["Caspian sturgeon", "saffron", "rice", "nuts", "honey"],
        distinctiveTraits: ["Caspian seafood focus", "Elaborate presentation", "Urban refinement", "Famous sweets"]
      },
      {
        name: "Sheki-Zagatala",
        description: "The mountainous northwest is famous for Sheki's legendary pakhlava, distinctive piti (lamb soup), and nut-based sweets. The region's forests provide chestnuts and hazelnuts used extensively in cooking.",
        signatureDishes: ["Sheki Pakhlava", "Piti", "Girmabadam", "Sheki Halva"],
        keyIngredients: ["hazelnuts", "chestnuts", "honey", "lamb", "chickpeas"],
        distinctiveTraits: ["Famous pakhlava tradition", "Nut-centric sweets", "Mountain cuisine", "Individual piti pots"]
      },
      {
        name: "Lankaran & South",
        description: "The humid subtropical south near the Iranian border features unique rice dishes, citrus fruits, and tea plantations. The region is known for lavangi (stuffed fish or chicken with walnut filling) and distinctive sour flavors.",
        signatureDishes: ["Lavangi", "Lankaran Kulcha", "Siyaq Plov", "Turshu Kebab"],
        keyIngredients: ["walnuts", "pomegranate", "citrus", "rice", "fresh fish"],
        distinctiveTraits: ["Stuffed dishes (lavangi)", "Sour flavors", "Tea cultivation", "Iranian influences"]
      },
      {
        name: "Ganja-Gazakh",
        description: "Western Azerbaijan features hearty meat dishes and distinctive bread traditions. Ganja, the second-largest city, is known for its signature plov variations and dovga (yogurt soup).",
        signatureDishes: ["Ganja Plov", "Dovga", "Xəngəl", "Qutab"],
        keyIngredients: ["lamb", "yogurt", "herbs", "dried fruits", "wheat"],
        distinctiveTraits: ["Hearty meat focus", "Yogurt-based dishes", "Wheat dishes", "Mountain herding tradition"]
      }
    ],
    popularDishes: [
      {
        name: "Plov",
        englishName: "Azerbaijani Pilaf",
        pronunciation: "plohv",
        description: "Aromatic saffron rice with meat, dried fruits, and chestnuts. The crispy bottom (qazmaq) is the prized portion. Over 40 regional variations exist, from simple to elaborate Shah Plov wrapped in lavash.",
        category: "main",
        keyTraits: ["saffron rice", "dried fruits", "qazmaq"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Dolma",
        pronunciation: "dol-ma",
        description: "Grape leaves, cabbage, or vegetables stuffed with spiced meat and rice mixture. The grape leaf version (yarpaq dolması) is most iconic. Served with garlicky yogurt.",
        category: "main",
        keyTraits: ["stuffed leaves", "spiced meat", "yogurt sauce"],
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Kebab",
        pronunciation: "ke-bab",
        description: "Grilled meat skewers—lamb (quzu), beef (mal), or chicken (toyuq). Lula kebab (ground meat) and tikka kebab (chunks) are popular. Served with flatbread, herbs, and sumac onions.",
        category: "main",
        keyTraits: ["grilled", "skewered", "sumac onions"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Qutab",
        pronunciation: "goo-tab",
        description: "Thin unleavened flatbread folded over savory or sweet fillings—greens and herbs, minced meat, or pumpkin. Cooked on a dry sadj (convex griddle) and served with yogurt.",
        category: "appetizer",
        keyTraits: ["thin flatbread", "folded", "herb filling"],
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Piti",
        pronunciation: "pee-tee",
        description: "Individual clay pot soup with lamb, chickpeas, chestnuts, and saffron. Slow-cooked for hours. Traditionally, the broth is poured over bread, then meat and vegetables eaten separately.",
        category: "soup",
        keyTraits: ["clay pot", "lamb", "chickpeas"],
        regionalOrigin: "Sheki",
        popularity: "both",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Dovga",
        pronunciation: "dov-ga",
        description: "Creamy yogurt soup with rice, chickpeas, and fresh herbs (dill, cilantro, mint). Served hot or cold. Requires constant stirring to prevent curdling.",
        category: "soup",
        keyTraits: ["yogurt base", "fresh herbs", "rice"],
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "medium",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Lavangi",
        pronunciation: "la-van-gee",
        description: "Whole fish or chicken stuffed with ground walnut, onion, and sour plum paste, then baked. A specialty of southern Azerbaijan with Persian influences.",
        category: "main",
        keyTraits: ["stuffed", "walnut filling", "sour plum"],
        regionalOrigin: "Lankaran",
        popularity: "local-favorite",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pakhlava",
        pronunciation: "pakh-la-va",
        description: "Diamond-shaped layered pastry with ground nuts (walnuts, almonds, or hazelnuts), cardamom, and saffron, soaked in honey syrup. Sheki pakhlava with rice flour is UNESCO-recognized.",
        category: "dessert",
        keyTraits: ["layered pastry", "nuts", "honey syrup"],
        popularity: "both",
        spiceLevel: "none",
        difficulty: "hard",
        dietary: { isVegetarian: true }
      }
    ],
    popularBeverages: [
      {
        name: "Azerbaijani Tea",
        englishName: "Çay",
        pronunciation: "chai",
        description: "Black tea served in pear-shaped armudu glasses, always with sugar cubes, jam, or sweets. Tea drinking is a social ritual lasting hours. Tea houses (çay evi) are cultural institutions.",
        type: "non-alcoholic",
        category: "tea",
        servedHow: "hot",
        keyIngredients: ["black tea", "sugar"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Sherbet",
        pronunciation: "sher-bet",
        description: "Traditional sweet drinks made from fruits, herbs, or flower extracts mixed with water and sugar. Flavors include rose, saffron, lemon, and pomegranate. Served at celebrations.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["fruit extract", "sugar", "water", "rose water"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Ayran",
        pronunciation: "eye-ran",
        description: "Salted yogurt drink, refreshing and cooling. Made by mixing yogurt with water and salt. Popular accompaniment to grilled meats and heavy dishes.",
        type: "non-alcoholic",
        category: "street",
        servedHow: "cold",
        keyIngredients: ["yogurt", "water", "salt"],
        isTraditional: true,
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Pomegranate Juice",
        englishName: "Nar Şərabı",
        pronunciation: "nar sha-ra-buh",
        description: "Fresh-squeezed pomegranate juice, a symbol of Azerbaijan. Deep red, sweet-tart, and antioxidant-rich. Pomegranate is the national fruit.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["fresh pomegranate"],
        isTraditional: true,
        isStreetDrink: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Kompot",
        pronunciation: "kom-pot",
        description: "Sweet fruit drink made by simmering dried or fresh fruits. Common in Caucasus and Central Asia. Often made with dried apricots, plums, or cherries.",
        type: "non-alcoholic",
        category: "juice",
        servedHow: "cold",
        keyIngredients: ["dried fruits", "sugar", "water"],
        isTraditional: true,
        dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
      }
    ]
  }
];

export function getCountryById(id: string): Country | undefined {
  return countries.find(c => c.id === id);
}

export function getCountriesByContinent(continent: Country['continent']): Country[] {
  return countries.filter(c => c.continent === continent);
}
