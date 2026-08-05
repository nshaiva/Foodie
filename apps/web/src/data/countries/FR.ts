import type { Country } from '../types';

export const FR: Country = {
  id: "FR",
  name: "France",
  capital: "Paris",
  continent: "Europe",
  region: "Western Europe",
  colorPalette: {
    primary: "#3d5a80",      // Muted French blue (from flag)
    secondary: "#a63d40",    // Muted wine red (from flag)
    accent: "#c9a86a",       // Butter gold
    background: "#f7f5f0",   // Warm parchment
    text: "#2b3a4f"          // Deep slate blue
  },
  foodCulture: {
    overview: "In France, eating is not fuel—it is an institution. The French meal was inscribed by UNESCO as intangible cultural heritage, and the daily ritual of sitting down together, often for well over an hour, remains sacred even in busy cities. Lunch breaks are protected, dinner conversations linger, and food is discussed with the seriousness other cultures reserve for politics or sport.\n\nFrench cuisine built the very vocabulary of Western professional cooking. Terms like sauté, mise en place, and sous-chef come from a kitchen tradition codified by Carême and Escoffier, whose brigade system and mother sauces still structure restaurant kitchens worldwide. Yet alongside haute cuisine lives an equally proud tradition of cuisine de terroir—grandmother's slow-simmered daubes, village boulangeries, and market-day rotisserie chickens.\n\nThe concept of terroir—the idea that soil, climate, and tradition give food from a specific place a taste that cannot be replicated—governs everything. Hundreds of cheeses, wines, butters, and even lentils carry protected AOC/AOP designations. A French shopper does not simply buy cheese; they buy a Comté aged eighteen months from the Jura, and they will argue about it.",
    mealStructure: "Breakfast (petit déjeuner) is light and sweet: tartines or a croissant with coffee. Lunch (déjeuner) is traditionally the main meal, often two or three courses. Dinner (dîner) comes late, around 8pm, and follows the classic sequence—entrée, plat, cheese, dessert. Wine accompanies, bread is constant, and coffee arrives only at the very end.",
    diningCustoms: "Bread is placed directly on the table, not on a plate, and is used to push food and mop sauces (faire chuchoter l'assiette). Hands stay visible on the table. Splitting a course is uncommon; each diner orders their own. Saying 'bon appétit' opens the meal, and the cheese course arrives before dessert, never after.",
    historicalInfluences: "Catherine de' Medici's Italian court refined French table manners in the 16th century; royal Versailles turned dining into theater; and the Revolution scattered palace chefs into public restaurants, inventing the modern restaurant itself. Colonial trade brought vanilla, chocolate, and coffee, while neighboring Italy, Spain, and Germany shaped the border regions' cooking."
  },
  cuisineProfile: {
    summary: "French cuisine is a technique-driven celebration of terroir—built on butter, wine, and stock reductions—that prizes depth, precision, and the pure expression of exceptional ingredients over aggressive seasoning.",
    flavorProfile: ["buttery (beurré)", "savory (savoureux)", "wine-braised (au vin)", "herbaceous (aux herbes)", "creamy (crémeux)", "caramelized (caramélisé)"],
    flavorIntensity: {
      heat: 1,
      acidity: 5,
      sweetness: 4,
      umami: 8,
      aromatic: 6,
      smokeEarth: 6,
      interpretation: "Rich and deeply savory with almost no chili heat—flavor comes from butter, reduced stocks, wine, and slow caramelization rather than spice."
    },
    keyIngredients: ["butter", "cream", "wine (red and white)", "shallots", "Dijon mustard", "cheese (Comté, Gruyère, chèvre)", "baguette and rustic breads", "stock (fond)"],
    cookingTechniques: ["braising (braiser)", "sautéing (sauter)", "sauce reduction", "poaching (pocher)", "confit", "flambéing", "pastry work (pâtisserie)"],
    cookingFlow: [
      { action: "Mise en place", emoji: "🔪" },
      { action: "Sear in butter", emoji: "🧈" },
      { action: "Deglaze with wine", emoji: "🍷" },
      { action: "Braise low & slow", emoji: "🍲" },
      { action: "Reduce the sauce", emoji: "🥄" },
      { action: "Finish with herbs", emoji: "🌿" }
    ],
    spicesAndSeasonings: ["thyme", "bay leaf", "tarragon", "parsley", "chives", "herbes de Provence", "black pepper", "nutmeg", "Dijon mustard", "fleur de sel", "saffron (in the south)", "piment d'Espelette"],
    ingredientTiers: {
      foundation: [
        { name: "Butter", emoji: "🧈", description: "Beurre · Fat & flavor base · Rich, lactic" },
        { name: "Wine", emoji: "🍷", description: "Vin · Deglazing & braising liquid · Acidic, complex" },
        { name: "Stock", emoji: "🍲", description: "Fond · Sauce foundation · Deep, savory" },
        { name: "Shallots", emoji: "🧅", description: "Échalotes · Aromatic base · Sweet, delicate" },
        { name: "Cream", emoji: "🥛", description: "Crème fraîche · Enricher · Tangy, silky" }
      ],
      aromaticCore: [
        { name: "Thyme", emoji: "🌿", description: "Thym · Bouquet garni herb · Woodsy, earthy" },
        { name: "Bay Leaf", emoji: "🍃", description: "Laurier · Simmering herb · Subtle, resinous" },
        { name: "Tarragon", emoji: "🌱", description: "Estragon · Sauce herb · Anise-like, bright" },
        { name: "Garlic", emoji: "🧄", description: "Ail · Aromatic · Mellow when confited" },
        { name: "Parsley", emoji: "🌿", description: "Persil · Finishing herb · Fresh, clean" },
        { name: "Leek", emoji: "🥬", description: "Poireau · Soup aromatic · Sweet, oniony" }
      ],
      flavorBuilders: [
        { name: "Dijon Mustard", emoji: "🟡", description: "Moutarde de Dijon · Emulsifier & sharpener · Pungent, tangy" },
        { name: "Comté", emoji: "🧀", description: "Alpine cheese · Gratin & board staple · Nutty, aged" },
        { name: "Lardons", emoji: "🥓", description: "Cured pork · Savory depth · Smoky, salty" },
        { name: "Cognac", emoji: "🥃", description: "Brandy · Flambé & sauces · Warm, fruity" },
        { name: "Crème Fraîche", emoji: "🥄", description: "Cultured cream · Sauce finisher · Tangy, stable" },
        { name: "Anchovies", emoji: "🐟", description: "Anchois · Provençal umami · Salty, intense" },
        { name: "Nutmeg", emoji: "🌰", description: "Muscade · Béchamel spice · Warm, sweet" },
        { name: "Fleur de Sel", emoji: "🧂", description: "Hand-raked sea salt · Finishing salt · Crunchy, mineral" },
        { name: "Piment d'Espelette", emoji: "🌶️", description: "Basque chili · Gentle heat · Fruity, mild" }
      ],
      staples: [
        { name: "Baguette", emoji: "🥖", description: "Daily bread · Table staple · Crisp crust, airy crumb" },
        { name: "Potatoes", emoji: "🥔", description: "Pommes de terre · Gratins & purées · Versatile, comforting" },
        { name: "Eggs", emoji: "🥚", description: "Œufs · Omelettes to pastry · Binding, enriching" },
        { name: "Flour", emoji: "🌾", description: "Farine · Bread, pastry, roux · Structural base" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Provence",
      description: "The sun-drenched Mediterranean south cooks with olive oil instead of butter, and its markets overflow with tomatoes, garlic, olives, and wild herbs from the garrigue. The cuisine is lighter and more vegetable-forward than the north, with strong Italian echoes along the Riviera and the great fish stews of Marseille's port.",
      signatureDishes: ["Bouillabaisse", "Ratatouille", "Tapenade", "Salade Niçoise"],
      keyIngredients: ["olive oil", "garlic", "tomatoes", "anchovies", "herbes de Provence"],
      distinctiveTraits: ["Olive oil, not butter", "Mediterranean vegetables", "Saffron fish stews", "Italian influence"]
    },
    {
      name: "Brittany",
      description: "The rugged Atlantic northwest is crêpe and cider country. Buckwheat galettes filled with ham, cheese, and egg are everyday food, washed down with dry cider served in ceramic bowls. Brittany's coastline supplies France's finest oysters and shellfish, and its salted butter—outlawed elsewhere by ancient salt taxes—defines Breton baking, most famously in caramel au beurre salé.",
      signatureDishes: ["Galette Complète", "Kouign-Amann", "Moules Marinières", "Far Breton"],
      keyIngredients: ["buckwheat flour", "salted butter", "oysters and mussels", "cider"],
      distinctiveTraits: ["Salted butter everywhere", "Buckwheat crêpes", "Cider over wine", "Atlantic shellfish"]
    },
    {
      name: "Burgundy & Lyon",
      description: "The gastronomic heartland. Burgundy contributes the great wine-braised classics—bœuf bourguignon, coq au vin, escargots swimming in garlic butter—while Lyon, long called the belly of France, serves hearty offal-loving fare in its bouchons: family-run taverns where quenelles, saucisson, and pots of Beaujolais keep tradition alive.",
      signatureDishes: ["Bœuf Bourguignon", "Coq au Vin", "Escargots de Bourgogne", "Quenelles de Brochet"],
      keyIngredients: ["red wine", "Dijon mustard", "Charolais beef", "lardons", "pearl onions"],
      distinctiveTraits: ["Wine-braised everything", "Bouchon tavern culture", "Dijon mustard homeland", "Rich offal dishes"]
    },
    {
      name: "Alsace",
      description: "Pressed against the German border, Alsace blends French finesse with Germanic heartiness. Sauerkraut piled with smoked pork, thin-crusted tarte flambée, kugelhopf cake, and dry Rieslings define a cuisine found nowhere else in France. Winstubs—cozy wine taverns—serve it all under half-timbered beams.",
      signatureDishes: ["Choucroute Garnie", "Tarte Flambée (Flammekueche)", "Baeckeoffe", "Kugelhopf"],
      keyIngredients: ["sauerkraut", "smoked pork and sausages", "Riesling", "fromage blanc", "juniper"],
      distinctiveTraits: ["Germanic influence", "Fermented cabbage", "White wine cooking", "Winstub tavern culture"]
    },
    {
      name: "Southwest (Gascony & Périgord)",
      description: "The land of duck and indulgence. Gascony and the Dordogne valley built a cuisine on duck fat, confit, foie gras, prunes, and black truffles, joined by Basque touches of Espelette pepper near the Spanish border. Slow-simmered cassoulet, fiercely contested between Toulouse, Carcassonne, and Castelnaudary, is its monument. Locals credit duck fat for the region's famous longevity.",
      signatureDishes: ["Cassoulet", "Confit de Canard", "Foie Gras", "Magret de Canard"],
      keyIngredients: ["duck fat", "white beans", "black truffles", "prunes", "Armagnac", "piment d'Espelette"],
      distinctiveTraits: ["Duck fat as primary fat", "Confit preservation", "Truffle country", "Basque chili accents"]
    }
  ],
  popularDishes: [
    {
      name: "Bœuf Bourguignon",
      englishName: "Burgundy Beef Stew",
      pronunciation: "buhf boor-gee-nyon",
      description: "Beef braised for hours in red Burgundy wine with lardons, pearl onions, and mushrooms until spoon-tender. The archetype of French slow cooking, made famous abroad by Julia Child.",
      category: "main",
      regionalOrigin: "Burgundy",
      keyTraits: ["wine-braised", "slow-cooked", "lardons"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isNutFree: true }
    },
    {
      name: "Coq au Vin",
      englishName: "Chicken in Wine",
      pronunciation: "kohk oh van",
      description: "Chicken slowly braised in red wine with mushrooms, bacon, and garlic. Originally a way to tenderize a tough old rooster, now a Sunday-dinner classic across the country.",
      category: "main",
      regionalOrigin: "Burgundy",
      keyTraits: ["red wine", "braised", "mushrooms"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Soupe à l'Oignon Gratinée",
      englishName: "French Onion Soup",
      pronunciation: "soop ah loh-nyon grah-tee-nay",
      description: "Deeply caramelized onions simmered in beef stock, crowned with a raft of toasted baguette and molten Gruyère broiled until bubbling. Historically the 4am restorative of Les Halles market workers.",
      category: "soup",
      regionalOrigin: "Paris",
      keyTraits: ["caramelized onions", "melted Gruyère", "beef stock"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Ratatouille",
      pronunciation: "rah-tah-too-ee",
      description: "Provençal summer vegetables—eggplant, zucchini, peppers, tomatoes—stewed gently with garlic, olive oil, and herbs. Humble peasant food elevated to icon status.",
      category: "main",
      regionalOrigin: "Provence",
      keyTraits: ["summer vegetables", "olive oil", "herbes de Provence"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Bouillabaisse",
      englishName: "Marseille Fish Stew",
      pronunciation: "boo-yah-behss",
      description: "Marseille's saffron-scented stew of rockfish, shellfish, fennel, and tomato, served with crisp croutons and garlicky rouille. Born from fishermen cooking the catch too bony to sell.",
      category: "soup",
      regionalOrigin: "Provence (Marseille)",
      keyTraits: ["saffron", "seafood", "rouille"],
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Croque Monsieur",
      englishName: "Grilled Ham & Cheese",
      pronunciation: "krohk muh-syuh",
      description: "Ham and Gruyère sandwich blanketed in béchamel and grilled until golden. Add a fried egg on top and it becomes a Croque Madame. The definitive Parisian café lunch.",
      category: "street-food",
      regionalOrigin: "Paris",
      keyTraits: ["béchamel", "Gruyère", "griddled"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Confit de Canard",
      englishName: "Duck Confit",
      pronunciation: "kon-fee duh kah-nar",
      description: "Duck legs salt-cured, then poached slowly in their own fat until the meat falls from the bone, finished crisp-skinned in a hot pan. A medieval preservation method turned delicacy of the Southwest.",
      category: "main",
      regionalOrigin: "Southwest (Gascony)",
      keyTraits: ["duck fat", "slow-poached", "crispy skin"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Galette Complète",
      englishName: "Buckwheat Crêpe with Ham, Egg & Cheese",
      pronunciation: "gah-let kom-plet",
      description: "A lacy buckwheat crêpe folded around ham, Emmental, and a sunny egg, edges crisped on the griddle. Brittany's everyday savory staple, traditionally paired with a bowl of dry cider.",
      category: "main",
      regionalOrigin: "Brittany",
      keyTraits: ["buckwheat", "griddled", "runny egg"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Tarte Flambée",
      englishName: "Flammekueche",
      pronunciation: "tart flahm-bay",
      description: "Paper-thin dough spread with fromage blanc and crème fraîche, scattered with onions and lardons, blistered in a wood-fired oven in minutes. Alsace's answer to pizza, eaten by hand and shared.",
      category: "main",
      regionalOrigin: "Alsace",
      keyTraits: ["thin crust", "crème fraîche", "lardons"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Crème Brûlée",
      englishName: "Burnt Cream",
      pronunciation: "krem broo-lay",
      description: "Silky vanilla custard hiding beneath a sheet of caramelized sugar that cracks like glass under the spoon. The tableside torch-and-crack ritual is half the pleasure.",
      category: "dessert",
      keyTraits: ["vanilla custard", "caramelized sugar", "creamy"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Vin Rouge de Bordeaux",
      englishName: "Bordeaux Red Wine",
      pronunciation: "van roozh duh bor-doh",
      description: "Cabernet- and Merlot-based blends from the world's most famous wine region, ranging from everyday table wine to legendary château bottlings. Wine is the default companion to any serious French meal.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Bordeaux",
      servedHow: "room temperature",
      keyIngredients: ["Cabernet Sauvignon grapes", "Merlot grapes"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Champagne",
      pronunciation: "shahm-pah-nyuh",
      description: "The original sparkling wine, made only in its namesake region by strict traditional method rules. Uncorked for every French celebration from weddings to Tuesday apéritifs.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Champagne",
      servedHow: "cold",
      keyIngredients: ["Chardonnay grapes", "Pinot Noir grapes", "Pinot Meunier grapes"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Café au Lait",
      englishName: "Coffee with Milk",
      pronunciation: "kah-fay oh lay",
      description: "Strong coffee with hot milk, traditionally drunk from a wide bowl at breakfast for dunking tartines or croissants. After breakfast hours, the French switch to small black espressos.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["coffee", "hot milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Cidre Breton",
      englishName: "Breton Cider",
      pronunciation: "see-druh bruh-ton",
      description: "Dry or semi-sweet fermented apple cider from Brittany and Normandy, traditionally poured into ceramic bowls (bolées) alongside galettes and crêpes.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "Brittany",
      servedHow: "cold",
      keyIngredients: ["cider apples"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pastis",
      pronunciation: "pahs-teess",
      description: "Anise-flavored apéritif from Marseille, served with a carafe of cold water that turns it cloudy yellow. The unofficial drink of pétanque games and sun-baked southern terraces.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Provence (Marseille)",
      servedHow: "cold",
      keyIngredients: ["star anise", "licorice root", "Provençal herbs"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
