import type { Country } from '../types';

export const MX: Country = {
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
};
