import type { Country } from '../types';

export const BR: Country = {
  id: "BR",
  name: "Brazil",
  capital: "Brasília",
  continent: "South America",
  region: "South America",
  colorPalette: {
    primary: "#2d6a4f",      // Muted forest green (from flag)
    secondary: "#c9a227",    // Desaturated golden yellow (from flag)
    accent: "#7d5a3c",       // Warm cacao brown
    background: "#f7f5ef",   // Soft ivory
    text: "#22382e"          // Deep green-charcoal
  },
  foodCulture: {
    overview: "Brazilian food is the product of three culinary lineages meeting on one enormous landmass: Indigenous peoples who domesticated cassava and knew every fruit of the forest, Portuguese colonizers who brought slow-simmered stews and a national obsession with sweets, and West Africans whose palm oil, okra, and one-pot cooking transformed the coastal kitchen forever. No single dish tells the whole story—feijoada in Rio, moqueca in Bahia, and churrasco in the far south are almost different cuisines that happen to share a flag.\n\nEating in Brazil is loud, long, and collective. The Saturday feijoada stretches across an entire afternoon; the Sunday churrasco is less a meal than a rolling social event where meat comes off the grill in waves for hours. Lunch counters called botecos and per-kilo buffets (comida a quilo) anchor weekday eating, while beach vendors selling grilled cheese on skewers, açaí bowls, and ice-cold coconuts make the shoreline its own dining room.\n\nRice and beans—arroz com feijão—is the daily heartbeat, served at lunch in nearly every home and workers' restaurant in the country, usually with farofa (toasted cassava flour) scattered over everything. Around that constant, Brazilians layer astonishing regional variety: Amazonian fish with tongue-numbing jambu leaves, Minas Gerais pork and soft cheeses, and the Japanese-inflected food halls of São Paulo, home to the largest Japanese community outside Japan.",
    mealStructure: "Breakfast (café da manhã) is light—coffee with milk, bread with butter, fruit, maybe pão de queijo. Lunch (almoço) is traditionally the main meal: rice, beans, a protein, salad, and farofa. Dinner is often lighter or later, and on weekends the midday meal expands into a multi-hour feijoada or churrasco.",
    diningCustoms: "Food is eaten with knife and fork—even pizza and sandwiches in polite company. Sharing is default: churrasco cuts are sliced tableside and passed around, and it's normal to linger for hours over a meal. A cafezinho (small, strong, sweet coffee) closes almost every lunch and is offered to any guest who walks through the door.",
    historicalInfluences: "Indigenous peoples contributed cassava (manioc) in all its forms, plus guaraná, açaí, and fish-roasting techniques. The Portuguese brought salt cod, rich egg-yolk sweets, and stew traditions like cozido. Enslaved West Africans shaped Bahian cuisine with dendê palm oil, okra, and dishes tied to Candomblé ritual food. Later waves of Italian, German, Japanese, and Lebanese immigrants gave Brazil its pizza and pasta culture, southern beer traditions, sushi counters, and ubiquitous esfiha and kibe."
  },
  cuisineProfile: {
    summary: "Brazilian cuisine is hearty, smoky, and comfort-driven—built on cassava, beans, slow-cooked meats, and live-fire grilling, brightened by lime, tropical fruit, and the coconut-and-palm-oil richness of the Afro-Bahian coast.",
    flavorProfile: ["smoky (defumado)", "savory-rich", "garlicky (alho)", "citrusy (limão)", "tropical-sweet", "coconut & dendê richness"],
    flavorIntensity: {
      heat: 3,
      acidity: 5,
      sweetness: 6,
      umami: 7,
      aromatic: 5,
      smokeEarth: 8,
      interpretation: "Deeply savory and smoke-forward rather than spicy—slow-cooked beans, charred meat, and toasted cassava carry the flavor, with heat left to the malagueta sauce on the side."
    },
    keyIngredients: ["cassava (mandioca)", "black beans", "white rice", "farofa (toasted cassava flour)", "dendê (red palm oil)", "coconut milk", "lime", "beef", "pork", "condensed milk"],
    cookingTechniques: ["live-fire grilling (churrasco)", "slow bean simmering", "toasting farofa", "clay-pot fish stews (moqueca)", "deep-frying (salgados)", "refogado (garlic-onion sauté base)"],
    cookingFlow: [
      { action: "Sauté refogado", emoji: "🧄" },
      { action: "Simmer beans", emoji: "🫘" },
      { action: "Grill over fire", emoji: "🔥" },
      { action: "Toast farofa", emoji: "🥘" },
      { action: "Finish with lime", emoji: "🍋" }
    ],
    spicesAndSeasonings: ["garlic", "onion", "bay leaf", "malagueta chili", "cilantro", "green onion", "parsley (cheiro-verde)", "annatto (colorau)", "cumin", "lime juice", "coarse salt (sal grosso)"],
    ingredientTiers: {
      foundation: [
        { name: "Cassava", emoji: "🍠", description: "Mandioca/aipim · Root staple · Fried, boiled, or milled to flour" },
        { name: "Black Beans", emoji: "🫘", description: "Feijão preto · Daily protein · Earthy, slow-simmered" },
        { name: "Garlic & Onion", emoji: "🧄", description: "Refogado · Flavor base · Starts nearly every pot" },
        { name: "Lime", emoji: "🍋", description: "Limão · Acid & marinade · Bright, ever-present" },
        { name: "Beef", emoji: "🥩", description: "Carne · Grill centerpiece · Salt-crusted, fire-kissed" }
      ],
      aromaticCore: [
        { name: "Dendê Oil", emoji: "🟠", description: "Red palm oil · Bahian signature · Fruity, intensely colored" },
        { name: "Coconut Milk", emoji: "🥥", description: "Leite de coco · Stew enricher · Sweet, silky" },
        { name: "Cilantro", emoji: "🌿", description: "Coentro · Fresh herb · Loved in the North, divisive in the South" },
        { name: "Cheiro-Verde", emoji: "🌱", description: "Parsley + green onion · Herb duo · Fresh finishing mix" },
        { name: "Bay Leaf", emoji: "🍃", description: "Louro · Bean aromatic · Warm, resinous" },
        { name: "Malagueta Chili", emoji: "🌶️", description: "Pimenta malagueta · Table heat · Small, fiery, served as sauce" }
      ],
      flavorBuilders: [
        { name: "Farofa", emoji: "🥣", description: "Toasted cassava flour · Texture builder · Buttery, crunchy topping" },
        { name: "Annatto", emoji: "🔴", description: "Colorau/urucum · Color & spice · Earthy, brick-red" },
        { name: "Salt Cod", emoji: "🐟", description: "Bacalhau · Portuguese legacy · Salty, flaky, festive" },
        { name: "Linguiça", emoji: "🌭", description: "Pork sausage · Smoky protein · Feijoada and grill essential" },
        { name: "Dried Shrimp", emoji: "🦐", description: "Camarão seco · Umami booster · Key to Bahian stews" },
        { name: "Okra", emoji: "🟢", description: "Quiabo · African legacy · Silky thickener" },
        { name: "Hearts of Palm", emoji: "🌴", description: "Palmito · Vegetable · Tender, delicate filling" },
        { name: "Condensed Milk", emoji: "🥛", description: "Leite condensado · Dessert base · Behind nearly every Brazilian sweet" },
        { name: "Peanuts & Cashews", emoji: "🥜", description: "Amendoim/castanha · Richness · Ground into Bahian pastes" }
      ],
      staples: [
        { name: "White Rice", emoji: "🍚", description: "Arroz · Daily starch · Garlicky, fluffy" },
        { name: "Cassava Flour", emoji: "🌾", description: "Farinha de mandioca · Pantry essential · Base of farofa" },
        { name: "Tapioca Starch", emoji: "⚪", description: "Polvilho · Gluten-free starch · Makes pão de queijo and tapioca crepes" },
        { name: "Corn", emoji: "🌽", description: "Milho · Versatile staple · Pamonha, couscous, winter festivals" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Bahia & the Northeast",
      description: "The Afro-Brazilian heartland. Salvador's cuisine runs on dendê palm oil, coconut milk, dried shrimp, and malagueta chilies—flavors carried from West Africa and kept alive partly through Candomblé ritual cooking. Street corners belong to the baianas, women in white dresses frying acarajé in bubbling palm oil. Inland, the arid sertão contributes sun-dried beef (carne de sol), butter-soft queijo coalho, and hearty cassava-and-bean cooking.",
      signatureDishes: ["Moqueca Baiana", "Acarajé", "Vatapá", "Carne de Sol com Macaxeira", "Bobó de Camarão"],
      keyIngredients: ["dendê palm oil", "coconut milk", "dried shrimp", "malagueta chili", "cassava", "okra"],
      distinctiveTraits: ["West African roots", "Dendê-and-coconut richness", "Spiciest region in Brazil", "Street food matriarchs (baianas)"]
    },
    {
      name: "Amazon (North)",
      description: "The most distinct—and most Indigenous—food in Brazil. Belém and Manaus cook with river fish the size of doors (pirarucu, tambaqui), fermented cassava broth (tucupi), and jambu, a leaf that tingles and numbs the mouth. Fruits found nowhere else—cupuaçu, bacuri, real unsweetened açaí eaten as a savory side with fish—define the palate. UNESCO named Belém a Creative City of Gastronomy on the strength of this larder.",
      signatureDishes: ["Pato no Tucupi", "Tacacá", "Pirarucu Grelhado", "Maniçoba"],
      keyIngredients: ["tucupi", "jambu", "pirarucu", "açaí", "cassava", "Amazonian fruits"],
      distinctiveTraits: ["Strongest Indigenous influence", "Mouth-numbing jambu", "River fish over red meat", "Savory açaí tradition"]
    },
    {
      name: "Minas Gerais",
      description: "Brazil's comfort-food capital, shaped by 18th-century gold-mining kitchens. Cooking here means cast-iron pots on wood-fired stoves (fogão a lenha): pork in every form, slow-cooked beans, couve (collard greens), and the country's best cheeses. Pão de queijo was born here, as was doce de leite ladled over fresh white cheese—the beloved 'Romeu e Julieta' pairing. Mineiro hospitality is legendary; the table is always set for one more.",
      signatureDishes: ["Pão de Queijo", "Feijão Tropeiro", "Frango com Quiabo", "Tutu de Feijão", "Doce de Leite"],
      keyIngredients: ["pork", "queijo minas cheese", "collard greens", "cassava flour", "beans", "corn"],
      distinctiveTraits: ["Wood-fired stove cooking", "Pork and cheese mastery", "Gold-rush era recipes", "Legendary dessert tradition"]
    },
    {
      name: "Rio & São Paulo (Southeast)",
      description: "The urban engine of Brazilian eating. Rio claims feijoada as its Saturday religion and lines its beaches with globinho sandwiches, caldo de cana, and coconut vendors. São Paulo—home to the largest Japanese diaspora on earth plus huge Italian and Lebanese communities—is South America's restaurant capital: mortadella sandwiches at Mercadão, pastel and caldo de cana at street fairs, pizza rivaling Naples, and sushi counters on every block.",
      signatureDishes: ["Feijoada", "Pastel de Feira", "Sanduíche de Mortadela", "Picanha", "Coxinha"],
      keyIngredients: ["black beans", "pork cuts", "picanha beef", "wheat flour", "mortadella", "lime"],
      distinctiveTraits: ["Feijoada culture", "Immigrant fusion (Japanese, Italian, Lebanese)", "Boteco bar-food scene", "Beach vendor economy"]
    },
    {
      name: "The South (Gaúcho Country)",
      description: "Rio Grande do Sul, Santa Catarina, and Paraná are cowboy country—the birthplace of churrasco, where whole cuts crusted in coarse salt roast slowly on swords over wood embers. The chimarrão gourd of hot mate passes from hand to hand in an unbroken social ritual. German and Italian settlement adds beer halls, smoked meats, galeto (grilled young chicken), and Brazil's wine country in the Vale dos Vinhedos.",
      signatureDishes: ["Churrasco", "Costela Assada", "Galeto al Primo Canto", "Arroz Carreteiro", "Barreado"],
      keyIngredients: ["picanha and costela beef", "coarse salt", "yerba mate", "pork sausage", "polenta", "wine"],
      distinctiveTraits: ["Live-fire churrasco tradition", "Chimarrão mate ritual", "German and Italian settler influence", "Salt-and-smoke minimalism"]
    }
  ],
  popularDishes: [
    {
      name: "Feijoada",
      englishName: "Black Bean & Pork Stew",
      pronunciation: "fay-zhoo-AH-dah",
      description: "Brazil's national dish: black beans simmered for hours with pork ribs, sausages, and salted cuts, served with rice, farofa, sautéed collard greens, and orange slices to cut the richness. Traditionally a Saturday lunch that stretches all afternoon.",
      category: "main",
      regionalOrigin: "Rio de Janeiro (Southeast)",
      keyTraits: ["black beans", "slow-simmered", "pork-rich"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Moqueca Baiana",
      englishName: "Bahian Fish Stew",
      pronunciation: "moh-KEH-kah bah-ee-AH-nah",
      description: "Fish and shrimp gently stewed in a clay pot with coconut milk, dendê palm oil, tomatoes, peppers, and cilantro. Bahia's Afro-Brazilian masterpiece, served bubbling with rice and pirão (fish-broth cassava porridge).",
      category: "main",
      regionalOrigin: "Bahia (Northeast)",
      keyTraits: ["dendê oil", "coconut milk", "clay pot"],
      popularity: "both",
      spiceLevel: "mild",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Pão de Queijo",
      englishName: "Cheese Bread",
      pronunciation: "powng jee KAY-zhoo",
      description: "Chewy, golden cheese puffs made from tapioca starch and queijo minas, naturally gluten-free with a crisp shell and molten, elastic center. Breakfast and coffee-break icon from Minas Gerais.",
      category: "breakfast",
      regionalOrigin: "Minas Gerais",
      keyTraits: ["tapioca starch", "cheesy", "chewy"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Picanha",
      englishName: "Grilled Rump Cap",
      pronunciation: "pee-KAHN-yah",
      description: "Brazil's most prized beef cut—the fat-capped rump cap—crusted in coarse salt, curved onto skewers, and roasted over live fire until the fat renders crisp. The crown jewel of every churrasco.",
      category: "main",
      regionalOrigin: "Rio Grande do Sul (South)",
      keyTraits: ["live-fire", "coarse salt", "fat cap"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Acarajé",
      englishName: "Black-Eyed Pea Fritter",
      pronunciation: "ah-kah-rah-ZHEH",
      description: "Deep-fried black-eyed pea fritters, split open and stuffed with vatapá (creamy shrimp-cashew paste), caruru, dried shrimp, and hot sauce. Sold by baianas in white dresses on Salvador's street corners; a dish with sacred roots in Candomblé.",
      category: "street-food",
      regionalOrigin: "Bahia (Northeast)",
      keyTraits: ["fried in dendê", "black-eyed peas", "shrimp filling"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "medium",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Coxinha",
      englishName: "Chicken Croquette",
      pronunciation: "koh-SHEEN-yah",
      description: "Teardrop-shaped croquette of shredded chicken (often with creamy catupiry cheese) wrapped in soft dough, breaded, and fried golden. The undisputed king of Brazilian bar snacks (salgados), found in every boteco and bakery.",
      category: "street-food",
      regionalOrigin: "São Paulo (Southeast)",
      keyTraits: ["fried", "shredded chicken", "teardrop shape"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isNutFree: true }
    },
    {
      name: "Pato no Tucupi",
      englishName: "Duck in Tucupi Broth",
      pronunciation: "PAH-too noo too-koo-PEE",
      description: "Roast duck simmered in tucupi—a tangy yellow broth extracted from wild cassava and boiled for days to remove its toxins—with jambu leaves that leave a gentle electric tingle on the tongue. The pride of Belém, essential at the Círio de Nazaré festival.",
      category: "main",
      regionalOrigin: "Pará (Amazon)",
      keyTraits: ["tucupi broth", "jambu tingle", "roast duck"],
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Feijão Tropeiro",
      englishName: "Cattle-Driver Beans",
      pronunciation: "fay-ZHOWNG troh-PAY-roo",
      description: "Beans tossed with toasted cassava flour, crisp pork cracklings, linguiça, scrambled eggs, and collard greens—a hearty one-pan dish born from the provisions of colonial mule drivers crossing Minas Gerais.",
      category: "main",
      regionalOrigin: "Minas Gerais",
      keyTraits: ["cassava flour", "pork cracklings", "one-pan"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isGlutenFree: true, isNutFree: true }
    },
    {
      name: "Açaí na Tigela",
      englishName: "Açaí Bowl",
      pronunciation: "ah-sah-EE nah chee-GEH-lah",
      description: "Thick frozen açaí purée blended with guaraná syrup, topped with granola, banana, and condensed milk. The sweet beach-culture version of an Amazonian staple that northerners traditionally eat savory alongside fish.",
      category: "dessert",
      regionalOrigin: "Pará (Amazon) via Rio's beaches",
      keyTraits: ["açaí berry", "frozen", "granola topping"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isVegetarianFriendly: true, isGlutenFree: true }
    },
    {
      name: "Brigadeiro",
      englishName: "Chocolate Fudge Ball",
      pronunciation: "bree-gah-DAY-roo",
      description: "Condensed milk, cocoa, and butter cooked into soft fudge, rolled into balls, and coated in chocolate sprinkles. No Brazilian birthday party exists without a tray of them—licking the pot is a childhood rite of passage.",
      category: "dessert",
      regionalOrigin: "Rio de Janeiro (Southeast)",
      keyTraits: ["condensed milk", "chocolate", "party sweet"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "easy",
      dietary: { isVegetarian: true, isGlutenFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Caipirinha",
      pronunciation: "kai-pee-REEN-yah",
      description: "Brazil's national cocktail: cachaça muddled with lime wedges, sugar, and ice. Deceptively simple, dangerously drinkable, and the mandatory companion to a beach afternoon or feijoada.",
      type: "alcoholic",
      category: "cocktail",
      servedHow: "iced",
      keyIngredients: ["cachaça", "lime", "sugar"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Cachaça",
      pronunciation: "kah-SHAH-sah",
      description: "Distilled fresh sugarcane juice—Brazil's signature spirit, made since the 1500s. Ranges from fiery white supermarket bottles to amber artisanal versions aged in native woods like amburana, sipped neat in Minas Gerais.",
      type: "alcoholic",
      category: "spirit",
      regionalOrigin: "Minas Gerais (artisanal heartland)",
      keyIngredients: ["sugarcane juice"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Guaraná",
      englishName: "Guaraná Soda",
      pronunciation: "gwah-rah-NAH",
      description: "Golden, apple-ish soda made from the caffeinated guaraná berry of the Amazon. Brands like Guaraná Antarctica are a national institution—the default soft drink at any lunch counter or birthday party.",
      type: "non-alcoholic",
      category: "soda",
      servedHow: "cold",
      regionalOrigin: "Amazon (berry origin)",
      keyIngredients: ["guaraná extract", "sugar", "carbonated water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Chimarrão",
      englishName: "Hot Mate",
      pronunciation: "shee-mah-HOWNG",
      description: "Bitter green yerba mate sipped scalding hot through a metal straw (bomba) from a shared gourd (cuia). In the South it's a daily social ritual—the gourd circulates the group, refilled from a thermos, for hours.",
      type: "non-alcoholic",
      category: "ceremonial",
      servedHow: "hot",
      regionalOrigin: "Rio Grande do Sul (South)",
      keyIngredients: ["yerba mate", "hot water"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Caldo de Cana",
      englishName: "Sugarcane Juice",
      pronunciation: "KAHL-doo jee KAH-nah",
      description: "Fresh sugarcane pressed to order through clanking street-fair rollers, served over ice, often with a squeeze of lime or pineapple. The classic partner to a hot pastel at a Sunday feira.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "iced",
      keyIngredients: ["sugarcane", "lime"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    }
  ]
};
