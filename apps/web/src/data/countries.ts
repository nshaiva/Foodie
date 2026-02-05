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
      keyIngredients: ["jasmine rice", "fish sauce (nam pla)", "coconut milk", "palm sugar", "tamarind", "lime", "shrimp paste", "rice noodles"],
      cookingTechniques: ["stir-frying (pad)", "grilling (yang)", "boiling/simmering curries", "pounding in mortar and pestle", "deep-frying"],
      spicesAndSeasonings: ["Thai chilies", "galangal", "lemongrass", "kaffir lime leaves", "Thai basil", "cilantro (roots, stems, leaves)", "garlic", "shallots", "turmeric", "coriander seeds", "cumin"]
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
        description: "Stir-fried rice noodles with eggs, tofu or shrimp, bean sprouts, and peanuts in a sweet-sour tamarind sauce. Thailand's most internationally recognized dish.",
        category: "main",
        isStreetFood: true,
        popularity: "tourist-classic",
        spiceLevel: "mild",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tom Yum Goong",
        englishName: "Spicy Shrimp Soup",
        description: "Hot and sour soup with shrimp, mushrooms, lemongrass, galangal, kaffir lime leaves, and chilies. The quintessential Thai soup.",
        category: "soup",
        popularity: "both",
        spiceLevel: "hot",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Som Tum",
        englishName: "Green Papaya Salad",
        description: "Shredded unripe papaya pounded with tomatoes, green beans, peanuts, dried shrimp, and chilies in a lime and fish sauce dressing. Originates from the Isan region.",
        category: "salad",
        isStreetFood: true,
        regionalOrigin: "Isan (Northeastern Thailand)",
        popularity: "local-favorite",
        spiceLevel: "very-hot",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Gaeng Keow Wan",
        englishName: "Green Curry",
        description: "Creamy coconut curry with green chili paste, Thai eggplant, bamboo shoots, and Thai basil, typically made with chicken or beef.",
        category: "main",
        popularity: "tourist-classic",
        spiceLevel: "hot",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Khao Pad",
        englishName: "Thai Fried Rice",
        description: "Wok-fried jasmine rice with egg, onion, and choice of protein, seasoned with fish sauce and served with lime and cucumber.",
        category: "main",
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Massaman Curry",
        description: "Rich, mild curry with Muslim influences, featuring potatoes, peanuts, and warm spices like cardamom, cinnamon, and star anise. Often made with beef or chicken.",
        category: "main",
        regionalOrigin: "Southern Thailand",
        popularity: "tourist-classic",
        spiceLevel: "mild",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pad Krapow Moo Saap",
        englishName: "Basil Pork",
        description: "Stir-fried minced pork with holy basil, chilies, and garlic, served over rice with a fried egg. A beloved everyday lunch dish.",
        category: "main",
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "hot",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mango Sticky Rice",
        englishName: "Khao Niao Mamuang",
        description: "Sweet glutinous rice soaked in coconut cream, served with ripe mango slices. A beloved seasonal dessert during mango season.",
        category: "dessert",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
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
      keyIngredients: ["corn (maize)", "dried and fresh chilies", "black beans", "tomatoes", "tomatillos", "avocado", "lime", "queso fresco", "crema"],
      cookingTechniques: ["nixtamalization (corn processing)", "dry-roasting chilies and spices", "braising and stewing", "grilling (al carbon)", "frying"],
      spicesAndSeasonings: ["cumin", "oregano (Mexican)", "epazote", "cilantro", "cinnamon", "cloves", "achiote (annatto)", "dried chilies (ancho, guajillo, chipotle, pasilla)"]
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
        description: "Soft corn tortillas filled with endless variations—carne asada, carnitas, al pastor, barbacoa, fish—topped with onion, cilantro, salsa, and lime.",
        category: "main",
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "medium",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Mole Poblano",
        description: "Complex sauce of dried chilies, chocolate, nuts, spices, and more, typically served over chicken or turkey. Originated in Puebla and requires hours of preparation.",
        category: "main",
        regionalOrigin: "Puebla",
        popularity: "both",
        spiceLevel: "medium",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Pozole",
        description: "Hearty hominy soup with pork or chicken in a red or green chili broth, garnished with cabbage, radish, oregano, and lime. Traditional for celebrations.",
        category: "soup",
        popularity: "local-favorite",
        spiceLevel: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Chiles en Nogada",
        description: "Poblano peppers stuffed with picadillo (meat and fruit mixture), covered in walnut cream sauce and pomegranate seeds. A patriotic dish eaten in September.",
        category: "main",
        regionalOrigin: "Puebla",
        popularity: "local-favorite",
        spiceLevel: "mild",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Tamales",
        description: "Corn masa filled with meats, cheese, or sweet fillings, wrapped in corn husks or banana leaves and steamed. A labor of love often made communally.",
        category: "main",
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegetarianFriendly: true, isGlutenFree: true }
      },
      {
        name: "Guacamole",
        description: "Mashed avocado with lime, cilantro, onion, tomato, and chili. Simple but essential, served with tortilla chips or as a taco accompaniment.",
        category: "appetizer",
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Elote",
        description: "Grilled corn on the cob slathered with mayonnaise, cotija cheese, chili powder, and lime. Iconic Mexican street food.",
        category: "street-food",
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Churros",
        description: "Fried dough pastry coated in cinnamon sugar, often served with chocolate sauce for dipping. A beloved street dessert.",
        category: "dessert",
        isStreetFood: true,
        popularity: "tourist-classic",
        spiceLevel: "none",
        dietary: { isVegetarian: true }
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
      keyIngredients: ["short-grain rice", "soy sauce (shoyu)", "dashi (seaweed and bonito stock)", "miso", "mirin", "sake", "tofu", "seafood", "nori (seaweed)"],
      cookingTechniques: ["raw preparation (sashimi)", "grilling (yakitori, robata)", "deep-frying (tempura, tonkatsu)", "simmering (nimono)", "steaming"],
      spicesAndSeasonings: ["wasabi", "ginger", "shichimi togarashi", "sesame (seeds and oil)", "shiso", "mitsuba", "yuzu", "sancho pepper"]
    },
    popularDishes: [
      {
        name: "Sushi",
        description: "Vinegared rice paired with fresh raw fish, seafood, or vegetables. Ranges from casual conveyor-belt shops to exclusive omakase counters where chefs serve piece by piece.",
        category: "main",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Ramen",
        description: "Wheat noodles in rich broth—tonkotsu (pork bone), shoyu (soy), miso, or shio (salt)—topped with chashu pork, eggs, nori, and scallions. Regional styles vary dramatically.",
        category: "soup",
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Tempura",
        description: "Lightly battered and deep-fried vegetables and seafood, served with tentsuyu dipping sauce. The batter is kept ice-cold for maximum crispness.",
        category: "main",
        popularity: "tourist-classic",
        spiceLevel: "none",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Tonkatsu",
        description: "Breaded and deep-fried pork cutlet, served with shredded cabbage, rice, and tangy tonkatsu sauce. A comfort food staple.",
        category: "main",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isDairyFree: true }
      },
      {
        name: "Okonomiyaki",
        englishName: "Savory Pancake",
        description: "Cabbage-based savory pancake with various fillings, topped with mayo, okonomiyaki sauce, bonito flakes, and seaweed. Osaka and Hiroshima have distinct styles.",
        category: "main",
        regionalOrigin: "Osaka / Hiroshima",
        popularity: "local-favorite",
        spiceLevel: "none",
        dietary: { isVegetarianFriendly: true }
      },
      {
        name: "Yakitori",
        description: "Skewered and grilled chicken pieces—thigh, breast, skin, organs—seasoned with salt or sweet tare sauce. Quintessential izakaya (pub) food.",
        category: "appetizer",
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "none",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Miso Soup",
        description: "Dashi broth with dissolved miso paste, tofu, wakame seaweed, and scallions. Served with nearly every traditional meal.",
        category: "soup",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegetarianFriendly: true, isDairyFree: true }
      },
      {
        name: "Matcha",
        description: "Powdered green tea whisked into hot water, central to Japanese tea ceremony. Also used in desserts, lattes, and sweets.",
        category: "beverage",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
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
      keyIngredients: ["olive oil", "tomatoes (fresh and canned San Marzano)", "Parmigiano-Reggiano", "pasta (dozens of shapes)", "cured pork (guanciale, pancetta, prosciutto)", "garlic", "white beans", "arborio rice"],
      cookingTechniques: ["sautéing in olive oil", "slow-simmering sauces (ragù)", "roasting", "grilling", "curing and aging meats/cheeses"],
      spicesAndSeasonings: ["basil", "oregano", "rosemary", "sage", "flat-leaf parsley", "garlic", "red pepper flakes (peperoncino)", "fennel seeds", "black pepper"]
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
        description: "Rigatoni or spaghetti tossed with guanciale, egg yolks, Pecorino Romano, and black pepper. No cream—the silky sauce comes from emulsifying eggs with pasta water.",
        category: "main",
        regionalOrigin: "Rome",
        popularity: "both",
        spiceLevel: "mild",
        dietary: {}
      },
      {
        name: "Margherita Pizza",
        description: "Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and olive oil on a charred, chewy crust. The standard by which all pizza is measured.",
        category: "main",
        regionalOrigin: "Naples",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegetarian: true }
      },
      {
        name: "Risotto alla Milanese",
        description: "Creamy arborio rice slowly cooked with saffron, white wine, and butter, finished with Parmigiano. Golden-hued and luxurious.",
        category: "main",
        regionalOrigin: "Milan",
        popularity: "local-favorite",
        spiceLevel: "none",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Ossobuco",
        description: "Braised veal shanks with vegetables, white wine, and broth, traditionally served with risotto alla Milanese. The marrow is prized.",
        category: "main",
        regionalOrigin: "Milan",
        popularity: "local-favorite",
        spiceLevel: "none",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Lasagna Bolognese",
        description: "Layers of fresh pasta sheets, slow-cooked meat ragù, béchamel, and Parmigiano, baked until golden. A labor-intensive celebration dish.",
        category: "main",
        regionalOrigin: "Bologna",
        popularity: "tourist-classic",
        spiceLevel: "none",
        dietary: {}
      },
      {
        name: "Gelato",
        description: "Italian ice cream with less air and fat than American versions, resulting in denser, more intense flavors. Pistachio, stracciatella, and hazelnut are classics.",
        category: "dessert",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegetarian: true, isGlutenFree: true }
      },
      {
        name: "Prosciutto e Melone",
        description: "Paper-thin aged prosciutto draped over ripe cantaloupe. A perfect summer antipasto balancing salty, sweet, and savory.",
        category: "appetizer",
        popularity: "tourist-classic",
        spiceLevel: "none",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tiramisu",
        description: "Layered dessert of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa. Originated in the Veneto region in the 1960s-80s.",
        category: "dessert",
        regionalOrigin: "Veneto",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegetarian: true }
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
      keyIngredients: ["teff flour (for injera)", "berbere spice blend", "niter kibbeh (spiced clarified butter)", "lentils", "chickpeas", "collard greens", "beef", "lamb", "chicken"],
      cookingTechniques: ["slow-simmering stews (wots)", "dry-frying spices", "fermenting (injera batter)", "clarifying and spicing butter", "raw meat preparation (kitfo, gored gored)"],
      spicesAndSeasonings: ["berbere (chili, fenugreek, coriander, cardamom, and more)", "mitmita (chili powder blend)", "korarima (Ethiopian cardamom)", "black cumin", "fenugreek", "bishop's weed (ajwain)", "rue"]
    },
    popularDishes: [
      {
        name: "Injera",
        description: "Spongy, tangy flatbread made from fermented teff batter. The foundation of every Ethiopian meal—serving as plate, utensil, and staple carbohydrate.",
        category: "side",
        isVegetarian: true,
        popularity: "local-favorite",
        spiceLevel: "none",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Doro Wot",
        description: "Spicy chicken stew simmered for hours in berbere and niter kibbeh, served with hard-boiled eggs. The national dish, reserved for special occasions and holidays.",
        category: "main",
        popularity: "both",
        spiceLevel: "hot",
        dietary: { isGlutenFree: true, isHalal: true }
      },
      {
        name: "Kitfo",
        description: "Minced raw beef seasoned with mitmita and niter kibbeh. Can be served leb leb (lightly warmed) or fully cooked. Ethiopia's steak tartare equivalent.",
        category: "main",
        popularity: "local-favorite",
        spiceLevel: "hot",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Misir Wot",
        description: "Red lentils simmered in berbere spice blend until thick and flavorful. A fasting-day staple and one of the world's great vegan dishes.",
        category: "main",
        isVegetarian: true,
        popularity: "both",
        spiceLevel: "medium",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Shiro",
        description: "Smooth, thick stew of ground chickpeas or broad beans with garlic, onion, and spices. Humble, comforting, and ubiquitous on fasting days.",
        category: "main",
        isVegetarian: true,
        popularity: "local-favorite",
        spiceLevel: "mild",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Tibs",
        description: "Sautéed meat (beef or lamb) with onions, peppers, and spices. Ranges from mild (alicha tibs) to fiery. Often served sizzling in a clay pot.",
        category: "main",
        popularity: "local-favorite",
        spiceLevel: "medium",
        dietary: { isGlutenFree: true, isHalal: true }
      },
      {
        name: "Gomen",
        description: "Collard greens sautéed with garlic, ginger, and spices. A standard component of the vegetarian combination platter.",
        category: "side",
        isVegetarian: true,
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Ethiopian Coffee (Buna)",
        description: "Coffee roasted, ground, and brewed tableside in a jebena (clay pot). Served in three rounds of decreasing strength. A ceremony, not just a drink.",
        category: "beverage",
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
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
      keyIngredients: ["ají amarillo (yellow pepper)", "lime", "potatoes (thousands of varieties)", "corn (choclo)", "seafood", "quinoa", "cilantro", "ají panca", "huacatay (black mint)"],
      cookingTechniques: ["curing in citrus (ceviche)", "stir-frying (from chifa influence)", "braising and stewing", "grilling (anticuchos)", "pachamanca (earth oven cooking)"],
      spicesAndSeasonings: ["ají amarillo", "ají panca", "ají rocoto", "cumin", "garlic", "cilantro", "huacatay", "chincho", "palillo (Peruvian turmeric)"]
    },
    popularDishes: [
      {
        name: "Ceviche",
        description: "Fresh raw fish cured in lime juice with ají, red onion, and cilantro. Served with sweet potato and cancha (toasted corn). Peru's national dish and point of pride.",
        category: "main",
        popularity: "both",
        spiceLevel: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Lomo Saltado",
        description: "Stir-fried beef with onions, tomatoes, and ají amarillo, served over rice with French fries. The quintessential chifa (Chinese-Peruvian) fusion dish.",
        category: "main",
        popularity: "both",
        spiceLevel: "medium",
        dietary: { isDairyFree: true }
      },
      {
        name: "Ají de Gallina",
        description: "Shredded chicken in a creamy sauce of ají amarillo, bread, walnuts, and cheese, served over rice with potatoes and olives.",
        category: "main",
        popularity: "local-favorite",
        spiceLevel: "medium",
        dietary: {}
      },
      {
        name: "Anticuchos",
        description: "Grilled beef heart skewers marinated in vinegar, cumin, and ají panca. Beloved street food with pre-Columbian origins, served with potatoes and corn.",
        category: "street-food",
        isStreetFood: true,
        popularity: "local-favorite",
        spiceLevel: "medium",
        dietary: { isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Causa",
        description: "Layered cold dish of seasoned mashed yellow potato with ají amarillo, filled with chicken, tuna, or crab salad. Striking presentation.",
        category: "appetizer",
        popularity: "both",
        spiceLevel: "mild",
        dietary: { isVegetarianFriendly: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Rocoto Relleno",
        description: "Stuffed rocoto pepper (extremely spicy) with ground beef, onions, eggs, and cheese, baked until golden. A specialty of Arequipa.",
        category: "main",
        regionalOrigin: "Arequipa",
        popularity: "local-favorite",
        spiceLevel: "very-hot",
        dietary: { isGlutenFree: true }
      },
      {
        name: "Picarones",
        description: "Sweet potato and squash doughnuts drizzled with chancaca (raw sugar syrup). A beloved street dessert dating to colonial times.",
        category: "dessert",
        isStreetFood: true,
        popularity: "both",
        spiceLevel: "none",
        dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isGlutenFree: true }
      },
      {
        name: "Pisco Sour",
        description: "Cocktail of pisco (grape brandy), lime juice, simple syrup, egg white, and bitters. Peru's national drink, with contested Chilean origins.",
        category: "beverage",
        popularity: "tourist-classic",
        spiceLevel: "none",
        dietary: { isDairyFree: true, isGlutenFree: true }
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
