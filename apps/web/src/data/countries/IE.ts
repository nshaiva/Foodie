import type { Country } from '../types';

export const IE: Country = {
  id: "IE",
  name: "Ireland",
  capital: "Dublin",
  continent: "Europe",
  region: "Northern Europe",
  colorPalette: {
    primary: "#3e7455",      // Muted shamrock green (from flag)
    secondary: "#c98a4b",    // Muted flag orange
    accent: "#5d7a8c",       // Atlantic slate blue
    background: "#f6f4ec",   // Soft cream (buttermilk)
    text: "#2c4436"          // Deep moss green
  },
  foodCulture: {
    overview: "Irish food is the cooking of a green, rain-soaked island where grass grows nearly year-round, which means extraordinary dairy and grass-fed beef and lamb. For centuries the table was simple by necessity: potatoes, butter, milk, oats, cabbage, bacon, and whatever the Atlantic gave up. That simplicity was shaped by hardship, above all the Great Famine of the 1840s, which left a deep mark on how Ireland thinks about food, land, and abundance.\n\nThe last few decades have seen a genuine food revival. Irish butter and farmhouse cheeses now rank among the world's best, Galway and Carlingford oysters draw pilgrims, and a generation of chefs has rebuilt the old repertoire of stews, breads, and smoked fish with pride rather than apology. Brown soda bread with smoked salmon, a bowl of seafood chowder, or a slow lamb stew says as much about the place as any tasting menu.\n\nThe pub is the social heart of it all. Food in Ireland comes wrapped in talk: long breakfasts, rounds of drinks bought in strict turn, tea offered the moment anyone crosses a threshold, and the toast of sláinte (health) before the first sip.",
    mealStructure: "Breakfast can be light (porridge or brown bread with tea) or the famous full Irish fry on weekends. The main meal traditionally lands midday and is still called dinner in much of the country, with a lighter evening tea; urban schedules have largely flipped this to an evening dinner. Sunday lunch, a roast with potatoes done two ways, remains a family institution. Tea and a biscuit or slice of cake punctuate the whole day.",
    diningCustoms: "Hospitality is near-compulsory: refusing tea takes at least two polite attempts. In pubs, drinks are bought in rounds and skipping your turn is genuinely noticed. A proper pint of stout is poured in two stages and needs a minute to settle; don't rush it. Brown soda bread and butter arrive with chowder as a matter of course, and 'sláinte' is the standard toast.",
    historicalInfluences: "The potato arrived from the Americas in the late 1500s and became near-total subsistence for the rural poor, so the blight of 1845 to 1849 brought famine, a million deaths, and mass emigration that scattered Irish food memory across the world. Centuries of English rule oriented beef and butter toward export while the Irish ate from the garden and the pig. Monastic and Norman traditions left orchards, mills, and market towns; the modern EU era and the diaspora's return brought confidence, farmhouse cheesemaking, and a restaurant culture that finally celebrates local ingredients."
  },
  cuisineProfile: {
    summary: "Irish cuisine is grass-fed comfort: golden butter and cream, floury potatoes, slow lamb and beef stews, oysters and smoked salmon from cold Atlantic water, and brown soda bread, all seasoned gently and cooked patiently.",
    flavorProfile: ["buttery (im)", "earthy (potatoes & roots)", "smoky (smoked fish & rashers)", "briny (Atlantic seafood)", "malty (stout & brown bread)", "creamy (dairy-rich)"],
    flavorIntensity: {
      heat: 1,
      acidity: 3,
      sweetness: 4,
      umami: 6,
      aromatic: 3,
      smokeEarth: 6,
      interpretation: "Almost no chili heat and gentle spicing; the depth comes instead from butter and cream, cured and smoked pork and fish, slow-simmered meat, and the malty, earthy notes of stout and wholemeal bread."
    },
    keyIngredients: ["potatoes", "butter", "cream and buttermilk", "grass-fed beef and lamb", "bacon (rashers)", "cabbage and kale", "oats", "wholemeal flour", "salmon and smoked salmon", "oysters and mussels", "black and white pudding", "farmhouse cheese"],
    cookingTechniques: ["slow simmering of stews", "boiling and mashing (potatoes, bacon and cabbage)", "baking soda bread and tarts", "frying the breakfast pan", "smoking fish over oak and turf", "braising in stout"],
    cookingFlow: [
      { action: "Brown the meat", emoji: "🥩" },
      { action: "Sweat onions in butter", emoji: "🧈" },
      { action: "Add roots & stock", emoji: "🥕" },
      { action: "Simmer low and slow", emoji: "🍲" },
      { action: "Serve with soda bread", emoji: "🍞" }
    ],
    spicesAndSeasonings: ["salt", "black pepper", "parsley", "thyme", "bay leaf", "chives", "mustard", "nutmeg (in white sauces)", "mixed spice (in baking)", "stout and whiskey (as flavorings)"],
    ingredientTiers: {
      foundation: [
        { name: "Potatoes", emoji: "🥔", description: "Prátaí · The historic staple · Floury, buttery" },
        { name: "Butter", emoji: "🧈", description: "Im · Grass-fed gold · Rich, tangy", flavorAxes: [{ axis: "umami", strength: "supporting" }] },
        { name: "Milk & Cream", emoji: "🥛", description: "Bainne · Dairy backbone · Sweet, fresh", flavorAxes: [{ axis: "sweetness", strength: "supporting" }] },
        { name: "Onion", emoji: "🧅", description: "Oinniún · Stew base · Sweet, foundational", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "sweetness", strength: "supporting" }] },
        { name: "Salt", emoji: "🧂", description: "Salann · Curer & seasoner · Bacon, butter, fish", flavorAxes: [{ axis: "umami", strength: "main" }] }
      ],
      aromaticCore: [
        { name: "Parsley", emoji: "🌿", description: "Peirsil · Sauce & garnish herb · Clean, grassy", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Thyme", emoji: "🍃", description: "Tím · Stew aromatic · Woodsy, gentle", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Bay Leaf", emoji: "🌱", description: "Duilleog labhrais · Simmer aromatic · Resinous depth", flavorAxes: [{ axis: "aromatic", strength: "main" }] },
        { name: "Leek & Scallion", emoji: "🥬", description: "Cainneann · Champ's soul · Mild, sweet allium", flavorAxes: [{ axis: "aromatic", strength: "main" }, { axis: "sweetness", strength: "supporting" }] },
        { name: "Stout", emoji: "🍺", description: "Leann dubh · Braising liquid · Malty, roasty", flavorAxes: [{ axis: "smokeEarth", strength: "main" }, { axis: "umami", strength: "supporting" }] },
        { name: "Black Pepper", emoji: "⚫", description: "Piobar dubh · The house heat · Warm, mild bite", flavorAxes: [{ axis: "heat", strength: "main" }] }
      ],
      flavorBuilders: [
        { name: "Bacon & Rashers", emoji: "🥓", description: "Bagún · Cured pork · Salty, smoky", flavorAxes: [{ axis: "umami", strength: "main" }, { axis: "smokeEarth", strength: "main" }] },
        { name: "Black Pudding", emoji: "🟤", description: "Putóg dhubh · Blood sausage · Earthy, spiced", flavorAxes: [{ axis: "smokeEarth", strength: "main" }, { axis: "umami", strength: "supporting" }] },
        { name: "Cabbage", emoji: "🥬", description: "Cabáiste · Bacon's partner · Sweet when buttered", flavorAxes: [{ axis: "sweetness", strength: "supporting" }] },
        { name: "Carrot & Parsnip", emoji: "🥕", description: "Meacain · Root sweetness · Mashed or stewed", flavorAxes: [{ axis: "sweetness", strength: "main" }] },
        { name: "Smoked Salmon", emoji: "🐟", description: "Bradán deataithe · Oak-smoked · Silky, briny", flavorAxes: [{ axis: "smokeEarth", strength: "main" }, { axis: "umami", strength: "main" }] },
        { name: "Farmhouse Cheese", emoji: "🧀", description: "Cáis · Cheddar & washed-rind · Grassy, sharp", flavorAxes: [{ axis: "umami", strength: "main" }, { axis: "acidity", strength: "supporting" }] },
        { name: "Buttermilk", emoji: "🥛", description: "Bláthach · Soda-bread raiser · Tangy, light", flavorAxes: [{ axis: "acidity", strength: "main" }] },
        { name: "Mustard", emoji: "🟡", description: "Mustard · Ham's sidekick · Sharp, warming", flavorAxes: [{ axis: "heat", strength: "main" }, { axis: "acidity", strength: "supporting" }] },
        { name: "Seaweed", emoji: "🌊", description: "Dillisk & carrageen · Shore harvest · Mineral, briny", flavorAxes: [{ axis: "umami", strength: "main" }, { axis: "acidity", strength: "supporting" }] }
      ],
      staples: [
        { name: "Soda Bread", emoji: "🍞", description: "Arán sóide · Daily wholemeal loaf · Dense, nutty" },
        { name: "Oats", emoji: "🥣", description: "Coirce · Porridge & baking · Toasty, creamy" },
        { name: "Beef & Lamb", emoji: "🥩", description: "Mairteoil & uaineoil · Grass-fed · Deep, sweet" },
        { name: "Atlantic Seafood", emoji: "🦪", description: "Bia mara · Oysters, mussels, cod · Cold-water sweet" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Dublin & the East",
      description: "The capital's food is urban and unpretentious: coddle simmered from leftover sausages and rashers, smoked fish from Howth's piers, and a pub-grub canon of toasted specials and pints. Dublin Bay prawns are the priciest thing on Irish menus, and the city's Victorian markets and modern food halls carry the old trading-port mix of local and imported.",
      signatureDishes: ["Dublin Coddle", "Dublin Bay Prawns", "Smoked Fish from Howth", "Spice Bag"],
      keyIngredients: ["pork sausages", "rashers", "Dublin Bay prawns", "smoked haddock", "potatoes"],
      distinctiveTraits: ["Pub-grub heartland", "Victorian market tradition", "Port-city mixing pot", "Home of the pint of plain"]
    },
    {
      name: "Munster (Cork & Kerry)",
      description: "The south is Ireland's larder. Cork's English Market has traded since 1788 in spiced beef, drisheen (blood pudding), and buttered eggs; the surrounding dairy country invented modern Irish farmhouse cheese. Kerry adds mountain lamb and wild Atlantic seafood, and the fishing town of Kinsale styles itself the country's gourmet capital.",
      signatureDishes: ["Spiced Beef", "Drisheen & Tripe", "Kerry Mountain Lamb", "Seafood in Kinsale"],
      keyIngredients: ["farmhouse cheese", "cream and butter", "spiced beef", "lamb", "monkfish and hake"],
      distinctiveTraits: ["Dairy and cheese heartland", "English Market traditions", "Gourmet-town culture", "Strong Cork food identity"]
    },
    {
      name: "Connacht & the Wild Atlantic Way",
      description: "The rugged west lives from the sea and the bog. Galway's native oysters get their own festival each September, mussels rope-grow in Killary fjord, and Connemara's blackface sheep graze heather into the flavor of the lamb. Seaweeds like dillisk and carrageen moss are harvested off the rocks as they have been for centuries, and turf smoke still perfumes the salmon.",
      signatureDishes: ["Galway Oysters with Stout", "Connemara Lamb", "Killary Mussels", "Carrageen Moss Pudding"],
      keyIngredients: ["native oysters", "mussels", "mountain lamb", "seaweed", "smoked salmon"],
      distinctiveTraits: ["Oyster festival culture", "Seaweed harvesting", "Turf-smoked fish", "Fjord aquaculture"]
    },
    {
      name: "Ulster & the North",
      description: "The northern counties bake like nowhere else on the island: soda farls and potato bread cooked on the griddle, wheaten bread, and the mighty Ulster fry that puts both on one plate. The Armagh orchards grow Ireland's apples, Lough Neagh eels are a protected delicacy, and the baking-and-butter tradition runs deepest here.",
      signatureDishes: ["Ulster Fry", "Soda Farls", "Potato Bread (Fadge)", "Armagh Apple Tart"],
      keyIngredients: ["soda and potato breads", "bacon and sausages", "Armagh apples", "eels", "butter"],
      distinctiveTraits: ["Griddle-bread tradition", "The Ulster fry", "Orchard county apples", "Strongest baking culture"]
    }
  ],
  popularDishes: [
    {
      name: "Irish Stew",
      englishName: "Irish Stew",
      pronunciation: "stobhach (STOH-wakh) in Irish",
      description: "The national dish: neck of lamb (or mutton) simmered slowly with potatoes, onions, and often carrots until the broth turns silky and the meat falls apart. Purists allow nothing more; everyone agrees it needs brown soda bread alongside.",
      category: "main",
      regionalOrigin: "Nationwide",
      keyTraits: ["slow-simmered lamb", "potatoes", "one-pot comfort"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Full Irish Breakfast",
      englishName: "The Full Irish",
      description: "The weekend fry: rashers, sausages, black and white pudding, fried eggs, grilled tomato, and toast or fried potato bread, with a pot of strong tea. Hotels and cafes serve it all day; the debate over baked beans' inclusion never ends.",
      category: "breakfast",
      regionalOrigin: "Nationwide",
      keyTraits: ["fry-up", "black & white pudding", "rashers"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Brown Soda Bread",
      englishName: "Brown Soda Bread",
      pronunciation: "arán sóide (ah-RAWN SOH-djeh)",
      description: "Dense, nutty wholemeal bread raised with bicarbonate of soda and buttermilk instead of yeast, baked fresh daily in homes across the country. Sliced thick with salted butter, it is the non-negotiable partner to chowder and smoked salmon.",
      category: "side",
      regionalOrigin: "Nationwide",
      keyTraits: ["wholemeal", "buttermilk", "no yeast"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Seafood Chowder",
      englishName: "Seafood Chowder",
      description: "Every coastal pub's pride: a creamy bowl crowded with salmon, smoked haddock, white fish, and mussels, flecked with potato and leek. Judged everywhere by the same two standards: how generous the fish, and how good the brown bread beside it.",
      category: "soup",
      regionalOrigin: "Atlantic coast",
      keyTraits: ["creamy", "smoked fish", "brown bread side"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isNutFree: true, isGlutenFree: true }
    },
    {
      name: "Bacon and Cabbage",
      englishName: "Bacon and Cabbage",
      description: "The true traditional Sunday dinner: a boiling joint of cured pork loin simmered gently, the cabbage cooked in the bacon water, everything napped in parsley sauce with floury potatoes. Its emigrant cousin, corned beef and cabbage, is the American version.",
      category: "main",
      regionalOrigin: "Nationwide",
      keyTraits: ["boiled bacon", "buttered cabbage", "parsley sauce"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isNutFree: true }
    },
    {
      name: "Colcannon",
      englishName: "Mashed Potatoes with Kale",
      pronunciation: "kul-KAN-un",
      description: "Buttery mashed potatoes folded with kale or cabbage and scallions, served with a well of melting butter in the center. Traditional at Halloween, when charms hidden inside told fortunes; its scallion-only sibling is champ.",
      category: "side",
      regionalOrigin: "Nationwide",
      keyTraits: ["mashed potato", "kale", "butter well"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Dublin Coddle",
      englishName: "Dublin Coddle",
      pronunciation: "KOD-l",
      description: "Dublin's Saturday-night supper: pork sausages, rashers, onions, and thickly sliced potatoes coddled (gently simmered) in broth until pale and comforting. A working-class dish for stretching the week's leftovers, defended fiercely by Dubliners and eyed suspiciously by everyone else.",
      category: "main",
      regionalOrigin: "Dublin",
      keyTraits: ["sausages & rashers", "gently simmered", "leftover thrift"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Boxty",
      englishName: "Potato Pancake",
      pronunciation: "BOKS-tee",
      description: "Half mashed and half grated raw potato bound into a pancake and fried on the griddle, crisp outside and dumpling-tender within. A specialty of the north midlands, now wrapped around fillings in Dublin restaurants. The old rhyme warns: 'boxty on the griddle, boxty in the pan; if you can't make boxty, you'll never get a man.'",
      category: "main",
      regionalOrigin: "Leitrim / Cavan / North Midlands",
      keyTraits: ["grated potato", "griddle-fried", "crisp & tender"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isNutFree: true }
    },
    {
      name: "Galway Oysters with Stout",
      englishName: "Native Oysters with Stout",
      description: "Flat native oysters from Galway Bay served on ice with lemon, brown bread, and a settling pint of stout. The pairing of cold mineral brine and roasty black beer is Ireland's most famous flavor match, celebrated at the Galway Oyster Festival every September since 1954.",
      category: "appetizer",
      regionalOrigin: "Galway",
      keyTraits: ["native oysters", "stout pairing", "raw & briny"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Barmbrack",
      englishName: "Speckled Fruit Loaf",
      pronunciation: "BARM-brak",
      description: "A sweet, tea-soaked loaf speckled with raisins and sultanas and warmed with mixed spice, buttered thickly at teatime. At Halloween, objects baked inside tell fortunes: find the ring and you marry within the year.",
      category: "dessert",
      regionalOrigin: "Nationwide",
      keyTraits: ["tea-soaked fruit", "mixed spice", "Halloween fortunes"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarian: true, isDairyFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Guinness",
      englishName: "Irish Dry Stout",
      description: "The black stuff: dry stout brewed at St James's Gate in Dublin since 1759, poured in a two-stage ritual and left to settle into its creamy dome. Roasty, smooth, and lighter than it looks; locals will tell you it tastes best within sight of the brewery.",
      type: "alcoholic",
      category: "beer",
      regionalOrigin: "Dublin",
      servedHow: "cold",
      keyIngredients: ["roasted barley", "hops", "yeast"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegan: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Irish Whiskey",
      englishName: "Irish Whiskey",
      pronunciation: "uisce beatha (ISH-kuh BAH-hah), 'water of life'",
      description: "Typically triple-distilled and famously smooth, from honeyed blends to rich single pot still whiskeys made from mixed malted and unmalted barley, a style unique to Ireland. Sipped neat, in a hot whiskey with cloves and lemon, or debated endlessly against Scotch.",
      type: "alcoholic",
      category: "spirit",
      servedHow: "room temperature",
      keyIngredients: ["barley", "pure water", "oak aging"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Irish Coffee",
      englishName: "Irish Coffee",
      description: "Hot coffee, brown sugar, and a measure of Irish whiskey topped with a floating layer of lightly whipped cream, drunk through the cream while scalding. Invented at Foynes flying-boat terminal in the 1940s to warm transatlantic passengers, and now the national digestif.",
      type: "alcoholic",
      category: "cocktail",
      regionalOrigin: "Foynes / Shannon",
      servedHow: "hot",
      keyIngredients: ["coffee", "Irish whiskey", "brown sugar", "cream"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Strong Black Tea",
      englishName: "Irish Breakfast Tea",
      description: "Ireland drinks more tea per person than nearly anywhere on earth: strong Assam-heavy blends brewed dark and taken with plenty of milk, offered reflexively to every visitor. Refusing the first offer is expected; refusing the second is nearly rude.",
      type: "non-alcoholic",
      category: "tea",
      servedHow: "hot",
      keyIngredients: ["Assam-blend black tea", "milk"],
      isTraditional: true,
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Poitín",
      englishName: "Irish Moonshine",
      pronunciation: "puh-CHEEN",
      description: "The once-outlawed mountain spirit, distilled illicitly from barley or potatoes for three centuries before legalization in 1997. Now revived by craft distillers as a fiery, grassy white spirit sipped carefully or mixed into modern cocktails.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Rural west and north",
      servedHow: "room temperature",
      keyIngredients: ["malted barley or potatoes", "pure water"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isNutFree: true }
    }
  ]
};
