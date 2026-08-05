import type { Country } from '../types';

export const PT: Country = {
  id: "PT",
  name: "Portugal",
  capital: "Lisbon",
  continent: "Europe",
  region: "Southern Europe",
  colorPalette: {
    primary: "#4a6b52",      // Muted forest green (from flag)
    secondary: "#a84a3c",    // Muted brick red (from flag)
    accent: "#5b7f9e",       // Azulejo tile blue
    background: "#f7f4ee",   // Warm limestone white
    text: "#2f4236"          // Deep green-gray
  },
  foodCulture: {
    overview: "Portuguese cooking is the food of a small country that once fed itself from the entire world. Sailors returning from the Age of Discovery brought back spices from India, chilies from the Americas, and tea from Asia—yet the cuisine that absorbed all of this remains stubbornly humble at heart: bread, olive oil, wine, salt cod, and whatever the boats landed that morning. The tavern (tasca) is its true home, where a lunch of grilled fish, boiled potatoes, and a jug of house wine costs little and satisfies completely.\n\nBacalhau—salted, dried cod—is the national obsession, remarkable because the fish doesn't even swim in Portuguese waters. Preserved cod fed sailors on months-long voyages and became so beloved that Portuguese cooks are said to know 365 ways to prepare it, one for each day of the year. Alongside it runs a deep sweet tooth: convent kitchens, flush with egg yolks left over from wine clarification and habit starching, invented an entire canon of doces conventuais (convent sweets), of which the caramelized custard tart pastel de nata is only the most famous ambassador.\n\nMeals in Portugal are unhurried and social. Lunch can stretch past two hours; dinner rarely begins before eight. Restaurants set the table with couvert—bread, olives, cheese, sometimes sardine pâté—before you order anything, and no meal properly ends without coffee, a short intense bica knocked back at the counter.",
    mealStructure: "Breakfast is light—a galão (milky coffee) with a pastry or buttered roll. Lunch (almoço, 1–3pm) is traditionally the main meal: soup first, then a fish or meat plate with rice or potatoes, often both. Dinner (jantar) starts late, around 8–9pm, and follows the same soup-then-main rhythm. Caldo verde or another vegetable soup opens nearly every proper meal.",
    diningCustoms: "The couvert—bread, olives, cheese—arrives unbidden but is charged only if eaten; wave it away if you don't want it. Fish is eaten with a dedicated fish knife, and sharing dishes is uncommon—each diner orders a full plate, often large enough that a meia dose (half portion) is a respectable order. Meals close with espresso (uma bica in Lisbon, um cimbalino in Porto) and perhaps a shot of aguardente.",
    historicalInfluences: "The Age of Discovery flows in both directions through Portuguese food: explorers carried chilies to Africa and Asia (piri-piri returned from Mozambique and Angola), brought cinnamon and black pepper home from India, and introduced tempura's ancestor to Japan. The Moors left almonds, figs, citrus, and rice paddies in the south; Catholic convents turned surplus egg yolks into an entire pastry tradition; and centuries of Atlantic fishing made salt cod the improbable national dish."
  },
  cuisineProfile: {
    summary: "Portuguese cuisine is rustic Atlantic comfort food—salt cod, charcoal-grilled fish, pork and paprika sausages, olive oil and garlic, and egg-yolk sweets—built on simplicity, quality ingredients, and a maritime past.",
    flavorProfile: ["garlicky (alho)", "briny (salgado)", "smoky (fumado)", "olive oil-rich (azeite)", "sweet (doce)", "herbal (coentros & louro)"],
    flavorIntensity: {
      heat: 2,
      acidity: 5,
      sweetness: 5,
      umami: 7,
      aromatic: 4,
      smokeEarth: 7,
      interpretation: "Gentle on heat but deep in savory, smoky comfort—salt cod, cured pork, and charcoal grilling anchor a cuisine brightened by vinegar, lemon, and wine, with a pronounced sweet finish in its egg-rich pastries."
    },
    keyIngredients: ["bacalhau (salt cod)", "olive oil", "garlic", "onions", "potatoes", "chouriço", "fresh sardines and seafood", "eggs", "kale (couve galega)", "white beans", "rice", "wine"],
    cookingTechniques: ["charcoal grilling (grelhar na brasa)", "slow simmering of stews (cozidos and caldeiradas)", "refogado (onion-garlic-olive oil base)", "baking in the oven (no forno)", "salting and desalting cod", "caramelizing egg-yolk sweets"],
    cookingFlow: [
      { action: "Soak cod", emoji: "🐟" },
      { action: "Refogado", emoji: "🧅" },
      { action: "Add wine", emoji: "🍷" },
      { action: "Simmer", emoji: "🍲" },
      { action: "Finish with olive oil", emoji: "🫒" }
    ],
    spicesAndSeasonings: ["sea salt", "garlic", "bay leaf", "sweet paprika (colorau)", "piri-piri chili", "parsley", "cilantro (in the south)", "black pepper", "cinnamon (in sweets)", "white wine and vinegar", "massa de pimentão (red pepper paste)"],
    ingredientTiers: {
      foundation: [
        { name: "Bacalhau", emoji: "🐟", description: "Salt cod · National protein · Briny, flaky" },
        { name: "Olive Oil", emoji: "🫒", description: "Azeite · Fat & finisher · Fruity, peppery" },
        { name: "Garlic", emoji: "🧄", description: "Alho · Flavor base · Pungent, everywhere" },
        { name: "Onion", emoji: "🧅", description: "Cebola · Refogado base · Sweet, foundational" },
        { name: "Sea Salt", emoji: "🧂", description: "Sal marinho · Preserver & seasoner · Atlantic-harvested" }
      ],
      aromaticCore: [
        { name: "Bay Leaf", emoji: "🍃", description: "Louro · Stew aromatic · Woodsy, resinous" },
        { name: "Paprika", emoji: "🌶️", description: "Colorau · Color & warmth · Sweet, smoky" },
        { name: "Piri-Piri", emoji: "🔥", description: "Malagueta chili · Heat source · Fruity, sharp" },
        { name: "Parsley", emoji: "🌿", description: "Salsa · Universal garnish · Clean, grassy" },
        { name: "Cilantro", emoji: "🌱", description: "Coentros · Southern herb · Bright, citrusy" },
        { name: "White Wine", emoji: "🍷", description: "Vinho branco · Deglazer & marinade · Acidic, bright" }
      ],
      flavorBuilders: [
        { name: "Chouriço", emoji: "🌭", description: "Paprika sausage · Smoked pork · Rich, spiced" },
        { name: "Tomato", emoji: "🍅", description: "Tomate · Stew body · Sweet, acidic" },
        { name: "Bell Pepper", emoji: "🫑", description: "Pimento · Roasted or in paste · Sweet, smoky" },
        { name: "Lemon", emoji: "🍋", description: "Limão · Grilled-fish partner · Sharp, fresh" },
        { name: "Vinegar", emoji: "🍶", description: "Vinagre · Escabeche acid · Tangy, preserving" },
        { name: "Kale", emoji: "🥬", description: "Couve galega · Caldo verde green · Earthy, hearty" },
        { name: "White Beans", emoji: "🫘", description: "Feijão branco · Stew bulk · Creamy, mild" },
        { name: "Cinnamon", emoji: "🟤", description: "Canela · Dessert spice · Warm, sweet" },
        { name: "Egg Yolks", emoji: "🥚", description: "Gemas · Convent-sweet base · Rich, golden" }
      ],
      staples: [
        { name: "Potatoes", emoji: "🥔", description: "Batatas · Universal side · Boiled, punched, or fried" },
        { name: "Rice", emoji: "🍚", description: "Arroz · Moorish legacy · Often served soupy (malandrinho)" },
        { name: "Bread", emoji: "🍞", description: "Pão · Corn broa or wheat · Base of açordas & migas" },
        { name: "Fresh Seafood", emoji: "🦐", description: "Marisco · Atlantic bounty · Sardines, octopus, clams" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Minho & Douro",
      description: "Portugal's lush, green northwest—home to Porto, the Douro wine valley, and the country's heartiest cooking. This is the land of caldo verde, corn bread (broa), rojões (braised pork), and the gloriously excessive francesinha sandwich. Vinho verde's light fizz cuts through the region's rich pork and tripe dishes; Porto's nickname 'tripeiros' (tripe-eaters) dates to sailors' provisioning legends.",
      signatureDishes: ["Francesinha", "Caldo Verde", "Rojões à Minhota", "Tripas à Moda do Porto"],
      keyIngredients: ["couve galega (kale)", "corn bread (broa)", "pork and offal", "chouriço", "vinho verde"],
      distinctiveTraits: ["Heartiest food in Portugal", "Pork-centric", "Vinho verde country", "Port wine cellars"]
    },
    {
      name: "Beiras",
      description: "The mountainous center, home of the Serra da Estrela range, is shepherd country. Its crown jewel is Queijo da Serra, a spoonably soft sheep's cheese cut open and scooped with bread. Roast suckling pig (leitão) from Bairrada draws pilgrims to roadside restaurants, and chanfana—goat braised for hours in red wine in black clay pots—warms the granite villages.",
      signatureDishes: ["Leitão da Bairrada", "Chanfana", "Queijo da Serra with bread", "Ovos Moles de Aveiro"],
      keyIngredients: ["sheep's cheese", "suckling pig", "goat", "red wine", "egg yolks"],
      distinctiveTraits: ["Serra da Estrela cheese", "Wood-oven roasting", "Clay-pot braises", "Mountain shepherd traditions"]
    },
    {
      name: "Lisbon & Estremadura",
      description: "The capital region is Portugal's melting pot, where inland and coastal traditions meet dishes carried home from former colonies. Sardines char over coals at every June saint's festival, seafood rice arrives bubbling in wide pans, bifana pork sandwiches fuel the afternoon, and in Belém the original pastel de nata has been baked from a secret recipe since 1837.",
      signatureDishes: ["Pastéis de Belém", "Sardinhas Assadas", "Bacalhau à Brás", "Bifana"],
      keyIngredients: ["sardines", "salt cod", "shellfish", "egg custard", "pork"],
      distinctiveTraits: ["Birthplace of pastel de nata", "Santos Populares sardine festivals", "Seafood cervejarias", "Colonial-era influences"]
    },
    {
      name: "Alentejo",
      description: "The vast golden plains south of the Tagus are Portugal's gastronomic soul—slow food before the term existed. Black Iberian pigs graze on acorns beneath cork oaks, bread thickens soups like açorda, cilantro (rare elsewhere in Europe) perfumes everything, and the improbable marriage of pork and clams in carne de porco à alentejana is one of the country's greatest dishes.",
      signatureDishes: ["Carne de Porco à Alentejana", "Açorda Alentejana", "Migas", "Sericaia"],
      keyIngredients: ["black pork (porco preto)", "bread", "cilantro", "olive oil", "garlic"],
      distinctiveTraits: ["Bread-based cooking", "Cilantro-forward", "Acorn-fed black pork", "Cork-country slow food"]
    },
    {
      name: "Algarve",
      description: "Portugal's sun-baked southern coast keeps the strongest Moorish accent: almonds, figs, oranges, and the cataplana—a hinged copper clamshell pan that steams clams, fish, and chouriço together in their own juices. Grilled fish is a religion here, octopus from Santa Luzia is famed nationwide, and almond-and-fig sweets close every meal.",
      signatureDishes: ["Cataplana de Marisco", "Amêijoas à Bulhão Pato", "Polvo à Lagareiro", "Dom Rodrigo"],
      keyIngredients: ["clams and octopus", "almonds", "figs", "oranges", "fresh fish"],
      distinctiveTraits: ["Moorish heritage", "Cataplana copper-pan steaming", "Almond and fig sweets", "Beachside grilled fish"]
    }
  ],
  popularDishes: [
    {
      name: "Bacalhau à Brás",
      englishName: "Salt Cod Brás-Style",
      pronunciation: "bah-kal-YOW ah BRAHSH",
      description: "Shredded salt cod scrambled with onions, matchstick fried potatoes, and eggs, finished with black olives and parsley. The most beloved of Portugal's countless bacalhau preparations—comforting, savory, and deceptively simple.",
      category: "main",
      regionalOrigin: "Lisbon (Bairro Alto)",
      keyTraits: ["salt cod", "eggs", "crispy potatoes"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Pastel de Nata",
      englishName: "Custard Tart",
      pronunciation: "pash-TEL duh NAH-tah",
      description: "A crackly, shatteringly flaky puff pastry cup filled with egg custard, blistered dark on top in a scorching oven and dusted with cinnamon. Invented by monks at the Jerónimos Monastery; the Belém original still queues around the block.",
      category: "dessert",
      regionalOrigin: "Belém, Lisbon",
      keyTraits: ["egg custard", "caramelized top", "flaky pastry"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Caldo Verde",
      englishName: "Green Broth",
      pronunciation: "KAHL-doo VEHR-duh",
      description: "Silky potato purée soup threaded with finely shredded kale and a few slices of chouriço, drizzled with olive oil. Portugal's national soup, served at weddings, festivals, and late nights alike.",
      category: "soup",
      regionalOrigin: "Minho",
      keyTraits: ["kale", "potato", "chouriço"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Francesinha",
      englishName: "Little Frenchie",
      pronunciation: "fran-seh-ZEE-nyah",
      description: "Porto's monumental sandwich: layers of steak, ham, fresh sausage, and linguiça inside toasted bread, blanketed in melted cheese and drowned in a spiced beer-and-tomato sauce, usually crowned with a fried egg and flanked by fries.",
      category: "main",
      regionalOrigin: "Porto",
      keyTraits: ["beer sauce", "layered meats", "melted cheese"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isNutFree: true }
    },
    {
      name: "Sardinhas Assadas",
      englishName: "Grilled Sardines",
      pronunciation: "sar-DEE-nyash ah-SAH-dash",
      description: "Whole fresh sardines salted and charred over open coals, served on a slice of corn bread with roasted peppers and boiled potatoes. The smell of June in Lisbon, inseparable from the Santo António street festivals.",
      category: "main",
      regionalOrigin: "Lisbon",
      keyTraits: ["charcoal-grilled", "whole fish", "sea salt"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Carne de Porco à Alentejana",
      englishName: "Alentejo-Style Pork with Clams",
      pronunciation: "KAR-nuh duh POR-koo ah ah-len-teh-ZHAH-nah",
      description: "An unlikely and glorious surf-and-turf: cubes of pork marinated in red pepper paste and wine, fried and then steamed open with fresh clams, finished with cilantro, lemon, and fried potatoes.",
      category: "main",
      regionalOrigin: "Alentejo",
      keyTraits: ["pork & clams", "red pepper paste", "cilantro"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Polvo à Lagareiro",
      englishName: "Octopus Olive-Press Style",
      pronunciation: "POHL-voo ah lah-gah-RAY-roo",
      description: "Whole octopus boiled until tender, then roasted and doused generously in olive oil and garlic, served with 'punched' potatoes (batatas a murro) crushed open to soak up the oil. A special-occasion favorite, essential at Christmas in the north.",
      category: "main",
      regionalOrigin: "Central Portugal / Algarve",
      keyTraits: ["octopus", "olive oil", "roasted garlic"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Bifana",
      englishName: "Pork Cutlet Sandwich",
      pronunciation: "bee-FAH-nah",
      description: "Thin pork cutlets simmered in a garlicky white wine and paprika marinade, stuffed into a soft roll and eaten standing at the counter with a squeeze of mustard or a dash of piri-piri. Portugal's definitive cheap eat.",
      category: "street-food",
      regionalOrigin: "Vendas Novas, Alentejo",
      keyTraits: ["marinated pork", "garlic", "soft roll"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Cataplana de Marisco",
      englishName: "Seafood Cataplana",
      pronunciation: "kah-tah-PLAH-nah duh mah-REESH-koo",
      description: "Clams, prawns, and fish steamed with tomatoes, peppers, onions, white wine, and a little chouriço inside the cataplana—a hinged copper clamshell pan that locks in every drop of briny juice. The Algarve's signature celebration dish.",
      category: "main",
      regionalOrigin: "Algarve",
      keyTraits: ["shellfish", "copper-pan steamed", "white wine"],
      popularity: "tourist-classic",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Cozido à Portuguesa",
      englishName: "Portuguese Boiled Dinner",
      pronunciation: "koo-ZEE-doo ah por-too-GAY-zah",
      description: "The grand Sunday stew: beef, pork, chicken, chouriço, morcela (blood sausage), and farinheira slowly boiled with cabbage, carrots, turnips, potatoes, and rice. A whole family's lunch in one steaming platter.",
      category: "main",
      regionalOrigin: "Nationwide (famously cooked in volcanic steam in the Azores)",
      keyTraits: ["mixed meats", "smoked sausages", "boiled vegetables"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Vinho do Porto",
      englishName: "Port Wine",
      pronunciation: "VEE-nyoo doo POR-too",
      description: "Fortified wine from the terraced Douro Valley, aged in the cellars of Vila Nova de Gaia across the river from Porto. Ranges from ruby and tawny to vintage; sipped as an aperitif (white port and tonic) or with dessert.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Douro Valley",
      servedHow: "room temperature",
      keyIngredients: ["Douro grapes", "grape brandy (aguardente)"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Vinho Verde",
      englishName: "Green Wine",
      pronunciation: "VEE-nyoo VEHR-duh",
      description: "Young, lightly effervescent wine from the Minho—'green' meaning youthful, not colored. Low in alcohol, crisp and citrusy, and the natural partner to grilled fish and shellfish on a hot afternoon.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Minho",
      servedHow: "cold",
      keyIngredients: ["Alvarinho and Loureiro grapes"],
      isTraditional: true,
      alcoholContent: "low",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Ginjinha",
      englishName: "Sour Cherry Liqueur",
      pronunciation: "zheen-ZHEE-nyah",
      description: "Sweet sour-cherry liqueur served in tiny glasses—com ou sem elas ('with or without them,' the cherries)—at hole-in-the-wall bars around Lisbon's Rossio square, and in Óbidos famously poured into edible chocolate cups.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Lisbon / Óbidos",
      servedHow: "room temperature",
      keyIngredients: ["ginja sour cherries", "aguardente", "sugar", "cinnamon"],
      isTraditional: true,
      isStreetDrink: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Galão",
      englishName: "Milky Coffee",
      pronunciation: "gah-LOWNG",
      description: "Espresso stretched with hot foamed milk, served in a tall glass—Portugal's breakfast companion to a pastel de nata or buttered toast. Its stronger sibling, the short bica, punctuates the end of every meal.",
      type: "non-alcoholic",
      category: "coffee",
      servedHow: "hot",
      keyIngredients: ["espresso", "foamed milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Licor Beirão",
      englishName: "Beirão Liqueur",
      pronunciation: "lee-KOR bay-ROWNG",
      description: "Portugal's best-selling liqueur, a double-distilled secret blend of a dozen herbs and seeds from the Beiras region—notes of rosemary, mint, and citrus. Sipped neat, over ice, or in the caipirão cocktail with lime.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Beiras",
      servedHow: "cold",
      keyIngredients: ["aromatic herbs and seeds", "double-distilled spirit"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    }
  ]
};
