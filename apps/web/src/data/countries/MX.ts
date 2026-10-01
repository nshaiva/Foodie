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
    overview: "Mexican cuisine is recognized by UNESCO as an Intangible Cultural Heritage of Humanity, reflecting thousands of years of culinary tradition stretching back to ancient Mesoamerican civilizations. Food is inseparable from Mexican identity, recipes are passed down through generations, and regional pride in local dishes runs deep.\n\nMeals are social anchors. The comida, typically eaten between 2-4 PM, is the main meal of the day and often a family affair lasting an hour or more. Street food is equally vital, taquerias, market stalls, and roving vendors serve everything from tacos to tamales at all hours.\n\nMexican cooking is labor-intensive and deeply respected. The preparation of moles, which can contain 20+ ingredients and require hours of work, exemplifies the cuisine's complexity. Even everyday dishes like fresh tortillas demand skill and care.",
    mealStructure: "Breakfast (desayuno) is often hearty, eggs, beans, tortillas, chilaquiles. The main meal (comida) happens mid-afternoon and may include soup, a main dish, and dessert. Dinner (cena) is lighter, often antojitos (snacks) or leftovers.",
    diningCustoms: "Tortillas serve as both utensil and staple, used to scoop food, wrap ingredients, or accompany dishes. Sharing plates of tacos or antojitos is common. Lime, salsa, and fresh cilantro are ubiquitous table condiments.",
    historicalInfluences: "The foundation is Mesoamerican, corn, beans, squash, and chilies cultivated for millennia. Spanish colonization introduced pork, beef, dairy, rice, and wheat. This fusion created iconic dishes like tacos al pastor (Lebanese-influenced) and the complex moles blending indigenous and European techniques."
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
        { name: "Dried Chilies", emoji: "🌶️", description: "Chiles secos · Heat & flavor · Smoky, complex", flavorAxes: [{ axis: "heat", strength: "main" }, { axis: "smokeEarth", strength: "main" }] },
        { name: "Lime", emoji: "🍋", description: "Limón · Acid balance · Bright, essential", flavorAxes: [{ axis: "acidity", strength: "main" }] },
        { name: "Black Beans", emoji: "🫘", description: "Frijoles negros · Protein · Earthy, creamy", flavorAxes: [{ axis: "smokeEarth", strength: "supporting" }] }
      ],
      aromaticCore: [
        { name: "Cilantro", emoji: "🌿", description: "AKA coriander · Fresh garnish · Citrusy, polarizing", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "acidity", strength: "supporting" }] },
        { name: "Epazote", emoji: "🌱", description: "Mexican herb · Bean seasoning · Pungent, minty", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Cumin", emoji: "🫛", description: "Comino · Dried spice · Earthy, warm", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "smokeEarth", strength: "supporting" }] },
        { name: "Mexican Oregano", emoji: "🍃", description: "Dried herb · More citrusy than Mediterranean", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Cinnamon", emoji: "🪵", description: "Canela · Ceylon variety · Sweet, warm", flavorAxes: [{ axis: "sweetness", strength: "main" }, { axis: "aromatic", strength: "supporting" }] }
      ],
      flavorBuilders: [
        { name: "Tomatoes", emoji: "🍅", description: "Jitomate · Salsa base · Bright, acidic", flavorAxes: [{ axis: "acidity", strength: "main" }, { axis: "umami", strength: "supporting" }] },
        { name: "Tomatillos", emoji: "🟢", description: "Tomate verde · Salsa verde · Tangy, citrusy", flavorAxes: [{ axis: "acidity", strength: "main" }] },
        { name: "Onion", emoji: "🧅", description: "Cebolla · Aromatic · Sharp, sweet when charred", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "sweetness", strength: "supporting" }] },
        { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic · Pungent, mellows roasted", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Avocado", emoji: "🥑", description: "Aguacate · Creamy fat · Rich, buttery" },
        { name: "Achiote", emoji: "🟠", description: "Annatto · Color & spice · Earthy, musky", flavorAxes: [{ axis: "smokeEarth", strength: "main" }, { axis: "aromatic", strength: "supporting" }] },
        { name: "Chocolate", emoji: "🍫", description: "Cacao · Mole depth · Bitter, complex", flavorAxes: [{ axis: "sweetness", strength: "main" }, { axis: "smokeEarth", strength: "supporting" }] }
      ],
      staples: [
        { name: "Tortillas", emoji: "🫓", description: "Base starch · Corn or flour · Fresh daily" },
        { name: "Queso Fresco", emoji: "🧀", description: "Fresh cheese · Crumbly, mild" },
        { name: "Crema", emoji: "🥛", description: "Mexican cream · Tangy, pourable" },
        { name: "Rice", emoji: "🍚", description: "Arroz rojo · Side dish · Tomato-cooked" }
      ]
    }
  },
  // Six regions since the #9 wave-1 region review (2026-10-01): Western Mexico
  // (Jalisco) split out of Central, and "Coastal Regions" became the Pacific
  // Coast. Veracruz has no region of its own; its dishes are nationwide with
  // Veracruz as the locality. Region names are the vocabulary dish origins use.
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
      description: "Known as 'the land of seven moles,' Oaxaca has perhaps Mexico's most distinctive regional cuisine. Indigenous Zapotec traditions remain strong. Oaxacan cheese (quesillo), chapulines (grasshoppers), and mezcal are iconic. The variety of moles, negro, rojo, amarillo, verde, is unmatched.",
      signatureDishes: ["Mole Negro", "Tlayudas", "Chapulines", "Tamales Oaxaqueños"],
      keyIngredients: ["dried chilies (chilhuacle, pasilla oaxaqueño)", "chocolate", "quesillo cheese", "chapulines", "hierba santa", "mezcal"],
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
      keyIngredients: ["beef", "flour tortillas", "dried chilies (chile colorado)", "cumin", "cheese", "pinto beans"],
      distinctiveTraits: ["Beef and grilled meats", "Flour tortillas", "Ranching culture", "Simpler preparations"]
    },
    {
      name: "Western Mexico (Jalisco)",
      description: "Guadalajara and the highlands of Jalisco gave Mexico some of its best-known food and drink: birria of goat or beef braised in dried chilies, tortas ahogadas drowned in tomato and chile de árbol sauce, red pozole, and tequila distilled from blue agave around the town of the same name. Mariachi comes from here too, so the region sets the tone for how Mexico celebrates.",
      signatureDishes: ["Birria", "Tortas Ahogadas", "Carne en su Jugo", "Tequila"],
      keyIngredients: ["goat and beef", "dried chilies (guajillo, chile de árbol)", "blue agave", "tomatoes", "Mexican oregano", "lime"],
      distinctiveTraits: ["Chili-braised meats", "Drowned sandwiches", "Tequila country", "Mariachi and fiesta food"]
    },
    {
      name: "Pacific Coast (Sinaloa & Baja)",
      description: "From Sinaloa's shrimp ports up the Baja peninsula, the Pacific coast eats raw, cured and grilled seafood. Aguachile and ceviche are cured in lime at the table in Mazatlán and Culiacán, whole fish is butterflied and grilled zarandeado-style, and Ensenada's market stalls invented the battered fish taco. Flavors are sharp, hot and fresh rather than slow-cooked.",
      signatureDishes: ["Aguachile", "Tacos de Pescado", "Pescado Zarandeado", "Ceviche"],
      keyIngredients: ["fresh seafood", "lime", "cilantro", "serrano and chiltepín chilies", "cucumber", "cabbage"],
      distinctiveTraits: ["Raw and citrus-cured seafood", "Grilled whole fish", "Fish tacos", "Hot, fresh, fast"]
    }
  ],
  popularDishes: [
    {
      name: "Tacos",
      pronunciation: "tah-kohs",
      description: "Soft corn tortillas filled with endless variations, carne asada, carnitas, al pastor, barbacoa, fish, topped with onion, cilantro, salsa, and lime.",
      tagline: "Corn tortillas with al pastor, carnitas or asada",
      image: "/dish-images/MX/tacos.webp",
      category: "main",
      keyTraits: ["corn tortilla", "cilantro", "salsa"],
      regionalOrigin: "Nationwide",
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
      tagline: "Dark chili and chocolate sauce over turkey, from Puebla",
      image: "/dish-images/MX/mole-poblano.webp",
      origin: { place: "Puebla", coordinates: [-98.2, 19.04] },
      category: "main",
      keyTraits: ["chocolate", "dried chilies", "complex"],
      regionalOrigin: "Central Mexico",
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Pozole",
      pronunciation: "poh-soh-leh",
      description: "Hearty hominy soup with pork or chicken in a red or green chili broth, garnished with cabbage, radish, oregano, and lime. Traditional for celebrations.",
      tagline: "Hominy and pork in a red or green chili broth",
      image: "/dish-images/MX/pozole.webp",
      category: "soup",
      keyTraits: ["hominy", "chili broth", "pork"],
      regionalOrigin: "Nationwide",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chiles en Nogada",
      pronunciation: "chee-lehs en noh-gah-dah",
      description: "Poblano peppers stuffed with picadillo (meat and fruit mixture), covered in walnut cream sauce and pomegranate seeds. A patriotic dish eaten in September.",
      tagline: "Stuffed poblano in walnut cream with pomegranate",
      image: "/dish-images/MX/chiles-en-nogada.webp",
      origin: { place: "Puebla", coordinates: [-98.2, 19.04] },
      category: "main",
      keyTraits: ["walnut cream", "poblano", "picadillo"],
      regionalOrigin: "Central Mexico",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Tamales",
      pronunciation: "tah-mah-lehs",
      description: "Corn masa filled with meats, cheese, or sweet fillings, wrapped in corn husks or banana leaves and steamed. A labor of love often made communally.",
      tagline: "Corn masa steamed in husks or banana leaf, savory or sweet",
      image: "/dish-images/MX/tamales.webp",
      category: "main",
      keyTraits: ["masa", "steamed", "corn husk"],
      regionalOrigin: "Nationwide",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isVegetarianFriendly: true, isGlutenFree: true }
    },
    {
      name: "Guacamole",
      pronunciation: "gwah-kah-moh-leh",
      description: "Mashed avocado with lime, cilantro, onion, tomato, and chili. Simple but essential, served with tortilla chips or as a taco accompaniment.",
      tagline: "Mashed avocado with lime, cilantro and chili",
      image: "/dish-images/MX/guacamole.webp",
      category: "appetizer",
      keyTraits: ["avocado", "lime", "cilantro"],
      regionalOrigin: "Nationwide",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Elote",
      pronunciation: "eh-loh-teh",
      description: "Grilled corn on the cob slathered with mayonnaise, cotija cheese, chili powder, and lime. Iconic Mexican street food.",
      tagline: "Grilled corn with mayo, cotija, chili and lime",
      image: "/dish-images/MX/elote.webp",
      category: "street-food",
      keyTraits: ["grilled corn", "cotija", "chili lime"],
      regionalOrigin: "Nationwide",
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
      tagline: "Fried dough in cinnamon sugar, dipped in chocolate",
      image: "/dish-images/MX/churros.webp",
      category: "dessert",
      keyTraits: ["fried dough", "cinnamon sugar", "chocolate"],
      regionalOrigin: "Nationwide",
      isStreetFood: true,
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true }
    },
    // Wave 1 of the #9 content batch (2026-10-01): eleven dishes written
    // region-first so every region holds at least two.
    {
      name: "Cochinita Pibil",
      pronunciation: "koh-chee-NEE-tah pee-BEEL",
      description: "Pork rubbed with achiote and sour orange, wrapped in banana leaves and slow-roasted until it falls apart. Served with pickled red onion and habanero.",
      tagline: "Achiote and sour orange pork, pit roasted in banana leaves",
      image: "/dish-images/MX/cochinita-pibil.webp",
      category: "main",
      keyTraits: ["achiote", "slow-roasted pork", "pickled red onion"],
      regionalOrigin: "Yucatán",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Sopa de Lima",
      pronunciation: "SOH-pah deh LEE-mah",
      description: "Chicken broth soured with lima, a Yucatecan citrus milder than lime, with shredded chicken and crisp fried tortilla strips on top.",
      tagline: "Chicken soup soured with lima, a local citrus, with tortilla strips",
      image: "/dish-images/MX/sopa-de-lima.webp",
      category: "soup",
      keyTraits: ["lima citrus", "shredded chicken", "tortilla strips"],
      regionalOrigin: "Yucatán",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Tlayudas",
      pronunciation: "tlah-YOO-dahs",
      description: "A large, thin, crisp tortilla spread with bean paste and asiento, topped with quesillo, cabbage and grilled tasajo, folded or served open.",
      tagline: "Large crisp tortilla with beans, quesillo and grilled meat",
      image: "/dish-images/MX/tlayudas.webp",
      category: "street-food",
      keyTraits: ["crisp tortilla", "quesillo", "grilled meat"],
      regionalOrigin: "Oaxaca",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Mole Negro",
      pronunciation: "MOH-leh NEH-groh",
      description: "The darkest of Oaxaca's moles: chilhuacle chilies charred nearly black with chocolate, spices and burnt tortilla, served over chicken or turkey.",
      tagline: "Black Oaxacan mole of chilhuacle chilies and chocolate",
      image: "/dish-images/MX/mole-negro.webp",
      category: "main",
      keyTraits: ["chilhuacle chilies", "chocolate", "charred and complex"],
      regionalOrigin: "Oaxaca",
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isGlutenFree: true }
    },
    {
      name: "Carne Asada",
      pronunciation: "KAR-neh ah-SAH-dah",
      description: "Thin beef seasoned with lime and salt, grilled over mesquite coals and served with flour tortillas, charro beans, grilled onions and salsa.",
      tagline: "Grilled marinated beef with flour tortillas and salsa",
      image: "/dish-images/MX/carne-asada.webp",
      category: "main",
      keyTraits: ["grilled beef", "flour tortillas", "mesquite"],
      regionalOrigin: "Northern Mexico",
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Burritos",
      pronunciation: "boo-REE-tohs",
      description: "A slim flour tortilla rolled tightly around a single filling, often machaca, chile colorado or beans. Northern and modest, not the stuffed US kind.",
      tagline: "Slim flour tortilla rolled around one filling, often machaca",
      image: "/dish-images/MX/burritos.webp",
      category: "main",
      keyTraits: ["flour tortilla", "one filling", "machaca"],
      regionalOrigin: "Northern Mexico",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Birria",
      pronunciation: "BEE-rree-ah",
      description: "Goat or beef marinated in dried chilies and spices and braised until tender. Eaten as a stew with its consomé, or as crisp tacos dipped in the broth.",
      tagline: "Chili-braised goat or beef, served as stew or crisped tacos",
      image: "/dish-images/MX/birria.webp",
      category: "main",
      keyTraits: ["chili braise", "consomé", "goat or beef"],
      regionalOrigin: "Jalisco",
      popularity: "both",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Tortas Ahogadas",
      pronunciation: "TOR-tahs ah-oh-GAH-dahs",
      description: "A crusty birote roll filled with carnitas and drowned in thin tomato sauce, with fiery chile de árbol sauce for the brave. Eaten with a spoon and both hands.",
      tagline: "Crusty roll of pork drowned in thin tomato and chile de árbol sauce",
      image: "/dish-images/MX/tortas-ahogadas.webp",
      origin: { place: "Guadalajara", coordinates: [-103.35, 20.67] },
      category: "street-food",
      keyTraits: ["birote roll", "drowned in sauce", "chile de árbol"],
      regionalOrigin: "Jalisco",
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Aguachile",
      pronunciation: "ah-gwah-CHEE-leh",
      description: "Raw shrimp cured for minutes in lime juice blended with green chili, served with cucumber and red onion. Sharper and hotter than ceviche.",
      tagline: "Raw shrimp cured in lime with green chili and cucumber",
      image: "/dish-images/MX/aguachile.webp",
      origin: { place: "Sinaloa" },
      category: "appetizer",
      keyTraits: ["lime-cured shrimp", "green chili", "cucumber"],
      regionalOrigin: "Sinaloa",
      popularity: "local-favorite",
      spiceLevel: "hot",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pescado a la Veracruzana",
      pronunciation: "pes-KAH-doh ah lah veh-rah-kroo-SAH-nah",
      description: "Fish braised in a tomato sauce with green olives, capers, pickled jalapeños and herbs. The Gulf coast's Spanish inheritance on a plate.",
      tagline: "Fish braised with tomato, olives and capers",
      image: "/dish-images/MX/pescado-a-la-veracruzana.webp",
      origin: { place: "Veracruz" },
      category: "main",
      keyTraits: ["tomato and olives", "capers", "braised fish"],
      regionalOrigin: "Nationwide",
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Tacos de Pescado",
      pronunciation: "TAH-kohs deh pes-KAH-doh",
      description: "Beer-battered fried fish in warm corn tortillas with shredded cabbage, crema, pico de gallo and lime. Born at Ensenada's fish market stalls.",
      tagline: "Battered fried fish in corn tortillas with cabbage and crema",
      image: "/dish-images/MX/tacos-de-pescado.webp",
      origin: { place: "Ensenada", coordinates: [-116.6, 31.87] },
      category: "street-food",
      keyTraits: ["battered fish", "cabbage and crema", "corn tortilla"],
      regionalOrigin: "Baja California",
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Horchata",
      pronunciation: "or-chah-tah",
      description: "Creamy, refreshing rice-based drink flavored with cinnamon and vanilla. A staple at taquerias and family gatherings.",
      tagline: "Cold rice drink with cinnamon and vanilla",
      type: "non-alcoholic",
      category: "juice",
      regionalOrigin: "Nationwide",
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
      tagline: "Tart, deep red hibiscus tea, served cold and sweet",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Nationwide",
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
      tagline: "Cinnamon-spiced chocolate, frothed with a wooden molinillo",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Nationwide",
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
      tagline: "Smoky agave spirit from Oaxaca, sipped neat",
      image: "/dish-images/MX/mezcal.webp",
      origin: { place: "Oaxaca city", coordinates: [-96.72, 17.06] },
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
      tagline: "Blue agave spirit from Jalisco, blanco to añejo",
      origin: { place: "Tequila, Jalisco", coordinates: [-103.84, 20.88] },
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
