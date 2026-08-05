import type { Country } from '../types';

export const AR: Country = {
  id: "AR",
  name: "Argentina",
  capital: "Buenos Aires",
  continent: "South America",
  region: "Southern Cone",
  colorPalette: {
    primary: "#5b7fa6",      // Muted celeste blue (from flag)
    secondary: "#7d5a44",    // Leather brown (gaucho culture)
    accent: "#c9a24b",       // Muted golden sun
    background: "#f7f5f0",   // Warm parchment
    text: "#2e3d4f"          // Deep slate blue
  },
  foodCulture: {
    overview: "Argentine food culture revolves around the asado—far more than a barbecue, it is a weekly social ritual where family and friends gather for hours while an asador tends beef, sausages, and offal over slow wood embers. The country consumes more beef per capita than almost anywhere on Earth, a legacy of the vast Pampas grasslands and the gaucho horsemen who worked them. Meat is treated with reverence: seasoned simply with salt, cooked patiently, and judged by the quality of the animal and the skill of the fire.\n\nEqually central is the massive wave of Italian and Spanish immigration between 1880 and 1930, which made Buenos Aires one of the most European cities in the Americas. Pasta on Sundays, pizza by the porción, milanesas, and heladerías serving dense gelato-style ice cream are as Argentine as steak. This immigrant cuisine fused with criollo traditions—empanadas, locro, humita—that remain strongest in the northern provinces.\n\nThe social glue binding it all is yerba mate, the bitter herbal infusion sipped through a metal straw from a shared gourd. Passing the mate around a circle—always in order, always prepared by one person, the cebador—is a daily act of trust and friendship practiced in offices, plazas, and living rooms across the country.",
    mealStructure: "Breakfast is light—café con leche with medialunas (small sweet croissants). Lunch is substantial, often milanesa or pasta. The late-afternoon merienda of mate or coffee with facturas bridges the gap to dinner, which rarely starts before 9 or 10 pm. Sunday asado with extended family is the anchor of the week.",
    diningCustoms: "Meals are long and conversational—the sobremesa, lingering at the table after eating, can outlast the meal itself. At an asado, the asador is never rushed and is applauded with 'un aplauso para el asador.' Mate has its own etiquette: don't touch the bombilla, don't say gracias unless you're finished, and never stir.",
    historicalInfluences: "Spanish colonizers brought cattle and wheat to the Pampas; indigenous Andean traditions contributed corn, squash, and quinoa dishes in the northwest. The great Italian migration reshaped everyday eating—pizza, pasta, and ñoquis on the 29th of each month—while Spanish, Jewish, Middle Eastern, and Welsh (in Patagonia) communities added their own layers. Yerba mate descends from the Guaraní people of the northeast."
  },
  cuisineProfile: {
    summary: "Argentine cuisine is built on fire, beef, and wheat—smoky wood-fired meats seasoned with restraint, Italian-rooted pastas and pizzas, and an abiding sweet tooth centered on dulce de leche—flavors that favor depth and richness over spice.",
    flavorProfile: ["smoky (ahumado)", "beefy", "garlicky-herbal (chimichurri)", "caramel-sweet (dulce de leche)", "bitter-herbal (mate)", "salt-forward"],
    flavorIntensity: {
      heat: 2,
      acidity: 4,
      sweetness: 6,
      umami: 8,
      aromatic: 4,
      smokeEarth: 9,
      interpretation: "Deep smoke and beefy umami dominate, with gentle heat and a pronounced caramel sweetness in the dessert tradition rather than the savory plate."
    },
    keyIngredients: ["beef (grass-fed)", "chorizo criollo", "wheat flour", "dulce de leche", "yerba mate", "provolone & cream cheeses", "corn (white maize)", "squash", "olive oil", "Malbec wine"],
    cookingTechniques: ["grilling over embers (asado a la parrilla)", "slow fire-pit roasting (a la cruz)", "pan-frying breaded cutlets (milanesa)", "baking empanadas and facturas", "long-simmered stews (locro, carbonada)", "kneading fresh pasta"],
    cookingFlow: [
      { action: "Build the fire", emoji: "🔥" },
      { action: "Salt the meat", emoji: "🧂" },
      { action: "Grill slowly", emoji: "🥩" },
      { action: "Rest & carve", emoji: "🔪" },
      { action: "Spoon chimichurri", emoji: "🌿" }
    ],
    spicesAndSeasonings: ["coarse salt (sal parrillera)", "dried oregano", "sweet paprika (pimentón dulce)", "ají molido (mild crushed chili)", "garlic", "parsley", "bay leaf", "cumin (in northern empanadas)", "red wine vinegar", "black pepper"],
    ingredientTiers: {
      foundation: [
        { name: "Beef", emoji: "🥩", description: "Carne vacuna · Centerpiece protein · Grass-fed, fire-kissed" },
        { name: "Coarse Salt", emoji: "🧂", description: "Sal parrillera · Primary seasoning · Only rub the meat needs" },
        { name: "Wheat Flour", emoji: "🌾", description: "Harina · Dough base · Empanadas, pasta, facturas" },
        { name: "Wood Embers", emoji: "🔥", description: "Brasas · Cooking medium · Quebracho smoke, slow heat" },
        { name: "Dulce de Leche", emoji: "🍮", description: "Milk caramel · Dessert foundation · In nearly every sweet" }
      ],
      aromaticCore: [
        { name: "Garlic", emoji: "🧄", description: "Ajo · Aromatic · Backbone of chimichurri" },
        { name: "Parsley", emoji: "🌿", description: "Perejil · Fresh herb · Grassy counterpoint to fat" },
        { name: "Oregano", emoji: "🍃", description: "Orégano · Dried herb · Pizza, provoleta, marinades" },
        { name: "Sweet Paprika", emoji: "🌶️", description: "Pimentón dulce · Color & warmth · Fruity, not hot" },
        { name: "Red Wine Vinegar", emoji: "🍷", description: "Vinagre · Acid note · Sharpens chimichurri" },
        { name: "Cumin", emoji: "🫙", description: "Comino · Warm spice · Signature of salteño empanadas" }
      ],
      flavorBuilders: [
        { name: "Chorizo Criollo", emoji: "🌭", description: "Fresh pork sausage · Asado opener · Coarse, garlicky" },
        { name: "Provolone", emoji: "🧀", description: "Provoleta · Grilling cheese · Charred, oozing" },
        { name: "Onion", emoji: "🧅", description: "Cebolla · Sofrito base · Stews and fillings" },
        { name: "Green Olives", emoji: "🫒", description: "Aceitunas · Filling accent · Briny bite in empanadas" },
        { name: "Hard-Boiled Egg", emoji: "🥚", description: "Huevo duro · Filling accent · Classic empanada layer" },
        { name: "Tomato", emoji: "🍅", description: "Tomate · Sauce base · Tuco for Sunday pasta" },
        { name: "Squash", emoji: "🎃", description: "Zapallo · Stew vegetable · Sweet body in locro" },
        { name: "Ají Molido", emoji: "🟥", description: "Crushed chili · Gentle warmth · Argentina's mild heat" },
        { name: "Bay Leaf", emoji: "🍂", description: "Laurel · Simmering herb · Perfumes stews and tuco" }
      ],
      staples: [
        { name: "White Maize", emoji: "🌽", description: "Maíz blanco · Andean staple · Body of locro and humita" },
        { name: "Fresh Pasta", emoji: "🍝", description: "Pastas caseras · Italian legacy · Ñoquis on the 29th" },
        { name: "Crusty Bread", emoji: "🥖", description: "Pan francés · Table staple · Vehicle for choripán" },
        { name: "Yerba Mate", emoji: "🧉", description: "La yerba · Daily infusion · Bitter, grassy ritual" },
        { name: "Potatoes", emoji: "🥔", description: "Papas · Side staple · Fries under milanesa" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Buenos Aires & the Pampas",
      description: "The capital and the surrounding grasslands are the heartland of beef and immigrant cooking. Parrillas on every corner serve the full asado repertoire, while the city's Italian soul shows in fugazzeta pizza, fresh pasta, and heladerías. Porteño food culture prizes the classic done well over novelty.",
      signatureDishes: ["Asado completo", "Milanesa napolitana", "Fugazzeta", "Choripán"],
      keyIngredients: ["grass-fed beef", "chorizo criollo", "mozzarella", "wheat flour", "dulce de leche"],
      distinctiveTraits: ["Parrilla culture", "Italian immigrant legacy", "Late-night dining", "Pizza by the slice with fainá"]
    },
    {
      name: "Northwest (NOA)",
      description: "Salta, Jujuy, and Tucumán preserve Argentina's Andean and criollo roots. Corn, squash, quinoa, and llama meat appear in dishes that predate the Spanish, and the region's baked empanadas—small, juicy, cumin-scented—are considered the country's best. Food here is heartier, spicier, and more indigenous than anywhere else in Argentina.",
      signatureDishes: ["Empanadas salteñas", "Locro", "Humita en chala", "Tamales"],
      keyIngredients: ["white maize", "squash", "cumin", "ají", "goat cheese", "llama meat"],
      distinctiveTraits: ["Andean indigenous heritage", "Baked not fried empanadas", "Corn-based stews", "Highest spice tolerance in the country"]
    },
    {
      name: "Litoral & Northeast",
      description: "The river provinces along the Paraná—Corrientes, Misiones, Entre Ríos—are the birthplace of yerba mate, cultivated on red-earth plantations near the Iguazú rainforest. River fish like dorado and surubí replace beef on the grill, and Guaraní traditions surface in chipá, the chewy cheese-and-cassava bread eaten warm at any hour.",
      signatureDishes: ["Chipá", "Dorado a la parrilla", "Mbejú", "Sopa paraguaya-style cornbread"],
      keyIngredients: ["yerba mate", "cassava starch", "river fish", "corn", "cheese"],
      distinctiveTraits: ["Guaraní influence", "Yerba mate heartland", "River fish grilling", "Cassava over wheat"]
    },
    {
      name: "Cuyo",
      description: "Mendoza and San Juan sit at the foot of the Andes in high-desert wine country, producing the Malbec that made Argentine wine famous. Cooking here leans on olive oil, preserved tomatoes, and goat—chivito a la llama, kid goat roasted over open flame, is the regional feast. Meals are built to pair with wine.",
      signatureDishes: ["Chivito asado (roast kid goat)", "Carbonada", "Tomaticán", "Empanadas mendocinas"],
      keyIngredients: ["Malbec wine", "olive oil", "kid goat", "tomatoes", "dried fruits"],
      distinctiveTraits: ["Wine-country pairing culture", "Olive oil over butter", "Goat roasted a la llama", "Desert-oasis produce"]
    },
    {
      name: "Patagonia",
      description: "The windswept south cooks with lamb, trout, king crab, and wild berries. Cordero al palo—a whole lamb splayed on an iron cross over embers for hours—is the region's icon. Welsh settlers left teahouses and black cake in Chubut, while Bariloche's Alpine heritage shows in chocolate and smoked meats.",
      signatureDishes: ["Cordero patagónico al palo", "Trucha ahumada", "Centolla (king crab)", "Welsh torta negra"],
      keyIngredients: ["lamb", "trout", "king crab", "calafate berries", "smoked meats"],
      distinctiveTraits: ["Whole-animal fire roasting", "Welsh teahouse tradition", "Wild game and berries", "Smoking and curing"]
    }
  ],
  popularDishes: [
    {
      name: "Asado",
      englishName: "Argentine Barbecue",
      pronunciation: "ah-SAH-doh",
      description: "The national ritual: beef ribs, flank, sweetbreads, chorizo, and morcilla grilled slowly over wood embers and salted coarsely, served in stages over a long afternoon with chimichurri and salads.",
      category: "main",
      regionalOrigin: "The Pampas (nationwide)",
      keyTraits: ["ember-grilled", "beef", "coarse salt"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Empanadas Salteñas",
      englishName: "Salta-Style Empanadas",
      pronunciation: "em-pah-NAH-dahs sahl-TEH-nyahs",
      description: "Small baked turnovers from Salta filled with hand-cut beef, potato, scallion, hard-boiled egg, and cumin—famously juicy, eaten from the hand with the head tilted back.",
      category: "appetizer",
      regionalOrigin: "Northwest (NOA)",
      keyTraits: ["baked", "hand-cut beef", "cumin"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Milanesa Napolitana",
      englishName: "Neapolitan-Style Breaded Cutlet",
      pronunciation: "mee-lah-NEH-sah nah-poh-lee-TAH-nah",
      description: "A thin breaded beef cutlet fried crisp, then topped with ham, tomato sauce, and melted mozzarella—an Argentine invention named after a Buenos Aires restaurant, not Naples. Served with fries.",
      category: "main",
      regionalOrigin: "Buenos Aires",
      keyTraits: ["breaded & fried", "melted cheese", "tomato sauce"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Locro",
      englishName: "Hominy and Squash Stew",
      pronunciation: "LOH-kroh",
      description: "A thick winter stew of white maize, squash, beans, beef, and chorizo simmered for hours, topped with a spicy paprika-scallion oil called quiquirimichi. The dish of national holidays, especially May 25th.",
      category: "soup",
      regionalOrigin: "Northwest (NOA)",
      keyTraits: ["slow-simmered", "hominy corn", "hearty"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Choripán",
      englishName: "Chorizo Sandwich",
      pronunciation: "choh-ree-PAHN",
      description: "Grilled chorizo criollo split open on crusty bread and doused with chimichurri—the street-food opener of every asado, football match, and roadside parrilla.",
      category: "street-food",
      regionalOrigin: "Nationwide",
      keyTraits: ["grilled sausage", "chimichurri", "crusty bread"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Provoleta",
      englishName: "Grilled Provolone",
      pronunciation: "proh-voh-LEH-tah",
      description: "A thick disc of provolone cheese grilled on the parrilla until crusty outside and molten within, finished with oregano and ají molido. Eaten bubbling hot as the asado's first course.",
      category: "appetizer",
      regionalOrigin: "Buenos Aires & the Pampas",
      keyTraits: ["grilled cheese", "oregano", "molten"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Humita en Chala",
      englishName: "Corn Husk Parcels",
      pronunciation: "oo-MEE-tah en CHAH-lah",
      description: "Fresh grated corn cooked with sautéed onion, squash, and goat cheese, wrapped in corn husks and steamed—a pre-Hispanic Andean dish still made by hand in the northwest.",
      category: "main",
      regionalOrigin: "Northwest (NOA)",
      keyTraits: ["fresh corn", "steamed in husk", "Andean"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Cordero Patagónico al Palo",
      englishName: "Patagonian Spit-Roasted Lamb",
      pronunciation: "kor-DEH-roh pah-tah-GOH-nee-koh al PAH-loh",
      description: "A whole young lamb splayed on an iron cross and roasted beside open embers for four to five hours until the skin crackles—Patagonia's signature feast, carved straight off the frame.",
      category: "main",
      regionalOrigin: "Patagonia",
      keyTraits: ["fire-roasted", "whole lamb", "crackling skin"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Alfajores",
      englishName: "Dulce de Leche Sandwich Cookies",
      pronunciation: "ahl-fah-HOH-rehs",
      description: "Two crumbly cornstarch shortbread cookies sandwiching dulce de leche, rolled in coconut or coated in chocolate. Argentines eat more alfajores than any other packaged sweet—every province claims its own style.",
      category: "dessert",
      regionalOrigin: "Nationwide (Córdoba and Mar del Plata famous)",
      keyTraits: ["dulce de leche", "shortbread", "sweet"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Medialunas",
      englishName: "Sweet Crescent Pastries",
      pronunciation: "meh-dyah-LOO-nahs",
      description: "Small, dense, glossy crescents brushed with sugar syrup—sweeter and chewier than French croissants. The default breakfast and merienda, ordered by the half-dozen with café con leche.",
      category: "breakfast",
      regionalOrigin: "Buenos Aires",
      keyTraits: ["laminated dough", "sugar glaze", "café companion"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarian: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Mate",
      englishName: "Yerba Mate",
      pronunciation: "MAH-teh",
      description: "Bitter, grassy infusion of yerba mate leaves sipped through a metal bombilla from a shared gourd, refilled with hot (never boiling) water and passed around the circle. Argentina's defining social ritual.",
      type: "non-alcoholic",
      category: "ceremonial",
      regionalOrigin: "Litoral & Northeast",
      servedHow: "hot",
      keyIngredients: ["yerba mate leaves", "hot water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Malbec",
      pronunciation: "mahl-BEK",
      description: "Argentina's flagship red wine—plummy, velvety, and sun-ripened at high altitude in Mendoza. A French grape that found its true home in the Andes foothills, and the default partner for asado.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Cuyo (Mendoza)",
      servedHow: "room temperature",
      keyIngredients: ["Malbec grapes"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Fernet con Coca",
      englishName: "Fernet and Coke",
      pronunciation: "fehr-NET kohn KOH-kah",
      description: "Bitter Italian amaro mixed roughly one-to-three with Coca-Cola over ice—an acquired taste that became the unofficial national cocktail, with Córdoba as its spiritual capital.",
      type: "alcoholic",
      category: "cocktail",
      regionalOrigin: "Córdoba",
      servedHow: "iced",
      keyIngredients: ["Fernet Branca", "Coca-Cola", "ice"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Café con Leche",
      englishName: "Coffee with Milk",
      pronunciation: "kah-FEH kohn LEH-cheh",
      description: "Espresso-based coffee with steamed milk, served in the city's historic cafés notables with a glass of soda water and medialunas—the porteño breakfast institution.",
      type: "non-alcoholic",
      category: "coffee",
      regionalOrigin: "Buenos Aires",
      servedHow: "hot",
      keyIngredients: ["espresso", "steamed milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true }
    },
    {
      name: "Tereré",
      pronunciation: "teh-reh-REH",
      description: "Yerba mate brewed cold with iced water or citrus juice—the sweltering-summer version of mate, beloved in the subtropical northeast near the Paraguayan border.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Litoral & Northeast",
      servedHow: "iced",
      keyIngredients: ["yerba mate leaves", "iced water", "citrus"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
