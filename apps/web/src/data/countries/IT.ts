import type { Country } from '../types';

export const IT: Country = {
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
};
