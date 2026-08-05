import type { Country } from '../types';

export const CN: Country = {
  id: "CN",
  name: "China",
  capital: "Beijing",
  continent: "Asia",
  region: "East Asia",
  colorPalette: {
    primary: "#a63a2e",      // Muted cinnabar red (from flag, desaturated)
    secondary: "#3d5a4c",    // Deep jade green
    accent: "#c9a253",       // Antique gold
    background: "#f9f5ef",   // Rice-paper cream
    text: "#3a2b26"          // Dark lacquer brown
  },
  foodCulture: {
    overview: "Chinese food culture rests on a philosophy older than most written cuisines: the pairing of fan (grain, the meal's anchor) and cai (the dishes that accompany it). A meal is judged not by any single plate but by how its parts converse—textures against textures, warming against cooling, rich against clean. This framework, along with ideas borrowed from traditional medicine about the heating or cooling nature of ingredients, still quietly shapes what appears on family tables from Harbin to Guangzhou.\n\nChina is less one cuisine than a continent of cuisines. The classical 'Eight Great Traditions' (ba da cai xi)—among them Sichuan, Cantonese, Shandong, and Huaiyang—each developed distinct techniques, flavor logics, and prestige dishes over centuries of regional isolation and imperial patronage. Wheat dominates the north in noodles, dumplings, and steamed breads; rice rules the south. A Cantonese cook prizes the unmasked freshness of an ingredient; a Sichuan cook layers twenty-three codified flavor combinations onto it.\n\nEating is China's great social glue. Business is settled over shared lazy-Susan banquets, family bonds are renewed at New Year dumpling-folding sessions, and the everyday greeting 'Chi le ma?'—'Have you eaten?'—doubles as 'How are you?' Restaurants, night markets, and breakfast stalls operate at every price point and hour, and ordering generously for the table is an act of care, not excess.",
    mealStructure: "Meals center on a staple—steamed rice in the south, noodles or mantou (steamed bread) in the north—surrounded by shared dishes: typically one soup, one or two vegetables, and one or two proteins, all served at once. Breakfast is its own world of congee, soy milk with youtiao (fried dough), baozi, and noodle soups. Banquets follow a loose progression from cold appetizers through stir-fries and braises to a whole fish, soup, and finally fruit.",
    diningCustoms: "Everyone eats with chopsticks from communal dishes placed at the table's center, transferring food to a personal rice bowl (serving chopsticks are increasingly common). Never stand chopsticks upright in rice—it evokes funeral incense. The host orders for the table and the eldest or most honored guest is served first; refilling others' tea before your own is basic courtesy, acknowledged with a two-finger tap on the table.",
    historicalInfluences: "The Silk Road brought wheat-milling, sesame, cumin, and grape wine from Central Asia; Buddhism spurred a sophisticated vegetarian tradition of tofu and gluten 'mock meats'; the Columbian Exchange delivered chilies and peanuts in the 16th century, transforming Sichuan and Hunan cooking. Imperial courts refined regional dishes into haute cuisine, while the Chinese diaspora carried and adapted the food across the world—often creating entirely new hybrid cuisines in the process."
  },
  cuisineProfile: {
    summary: "Chinese cuisine is a family of regional traditions unified by wok technique, fermented seasonings, and a deep pursuit of umami (xian wei)—ranging from the fiery numbing complexity of Sichuan to the pristine, ingredient-first delicacy of Cantonese cooking.",
    flavorProfile: ["umami (xian)", "savory-salty", "numbing-spicy (ma la)", "sweet-sour (tang cu)", "smoky wok breath (wok hei)", "fermented depth"],
    flavorIntensity: {
      heat: 5,
      acidity: 4,
      sweetness: 4,
      umami: 9,
      aromatic: 6,
      smokeEarth: 7,
      interpretation: "Profoundly umami-driven and kissed with wok smoke, with heat and sweetness that swing dramatically by region rather than defining the whole."
    },
    keyIngredients: ["soy sauce (light & dark)", "rice", "wheat noodles", "Shaoxing wine", "tofu", "scallions", "ginger", "garlic", "chili bean paste (doubanjiang)", "sesame oil"],
    cookingTechniques: ["stir-frying (chao)", "steaming (zheng)", "red-braising (hong shao)", "deep-frying (zha)", "velveting proteins", "double-boiling soups", "hand-pulling and knife-cutting noodles"],
    cookingFlow: [
      { action: "Prep & slice", emoji: "🔪" },
      { action: "Marinate", emoji: "🥣" },
      { action: "Heat wok", emoji: "🔥" },
      { action: "Fry aromatics", emoji: "🧄" },
      { action: "Stir-fry hot & fast", emoji: "🥘" },
      { action: "Sauce & thicken", emoji: "🫗" }
    ],
    spicesAndSeasonings: ["light soy sauce", "dark soy sauce", "Shaoxing wine", "black vinegar (Chinkiang)", "sesame oil", "Sichuan peppercorns", "dried chilies", "five-spice powder", "star anise", "cassia bark", "fermented black beans (douchi)", "oyster sauce", "white pepper"],
    ingredientTiers: {
      foundation: [
        { name: "Soy Sauce", emoji: "🫗", description: "Jiangyou · Salt & umami base · Light seasons, dark colors" },
        { name: "Shaoxing Wine", emoji: "🍶", description: "Huangjiu · Deglazer & marinade · Nutty, sherry-like" },
        { name: "Ginger & Scallion", emoji: "🫚", description: "Jiang-cong · Aromatic duo · The universal flavor opener" },
        { name: "Sesame Oil", emoji: "🌰", description: "Xiangyou · Finishing oil · Toasty, fragrant" },
        { name: "Black Vinegar", emoji: "🍾", description: "Chinkiang cu · Acid backbone · Malty, mellow" }
      ],
      aromaticCore: [
        { name: "Garlic", emoji: "🧄", description: "Suan · Aromatic · Pungent, sweet when fried" },
        { name: "Sichuan Peppercorn", emoji: "🌸", description: "Huajiao · Numbing spice · Tingling, citrusy" },
        { name: "Star Anise", emoji: "⭐", description: "Bajiao · Braising spice · Sweet licorice warmth" },
        { name: "Dried Chilies", emoji: "🌶️", description: "Gan lajiao · Heat source · Smoky, fruity fire" },
        { name: "Doubanjiang", emoji: "🟥", description: "Chili bean paste · Fermented heat · Sichuan's soul" },
        { name: "Fermented Black Beans", emoji: "⚫", description: "Douchi · Umami punch · Salty, winey funk" },
        { name: "White Pepper", emoji: "⚪", description: "Bai hujiao · Warm spice · Sharp, earthy heat" }
      ],
      flavorBuilders: [
        { name: "Oyster Sauce", emoji: "🦪", description: "Haoyou · Umami glaze · Sweet-briny richness" },
        { name: "Hoisin Sauce", emoji: "🍯", description: "Haixianjiang · Sweet paste · Glossy, spiced" },
        { name: "Rock Sugar", emoji: "💎", description: "Bingtang · Braising sweetener · Clean, lacquering shine" },
        { name: "Five-Spice", emoji: "🌟", description: "Wuxiangfen · Spice blend · Sweet-warm-anise" },
        { name: "Dried Shiitake", emoji: "🍄", description: "Xianggu · Umami depth · Meaty, woodsy" },
        { name: "Chili Oil", emoji: "🔴", description: "Lajiao you · Condiment · Fragrant, crimson heat" },
        { name: "Cornstarch", emoji: "🥄", description: "Dianfen · Thickener · Velvets meat, glosses sauce" },
        { name: "Cilantro", emoji: "🌱", description: "Xiangcai · Fresh garnish · Bright, citrusy" },
        { name: "Preserved Vegetables", emoji: "🥬", description: "Zhacai / suancai · Pickled accent · Sour, crunchy" }
      ],
      staples: [
        { name: "Rice", emoji: "🍚", description: "Mifan · Southern staple · Neutral canvas" },
        { name: "Wheat Noodles", emoji: "🍜", description: "Mian · Northern staple · Pulled, cut, or rolled" },
        { name: "Tofu", emoji: "🧊", description: "Doufu · Protein · Silken to firm, endlessly versatile" },
        { name: "Baozi & Dumpling Wrappers", emoji: "🥟", description: "Mianpi · Dough vessels · Steamed, boiled, or fried" }
      ]
    }
  },
  regionalVariations: [
    {
      name: "Sichuan",
      description: "The southwest basin's cuisine is China's boldest, built on the interplay of chili heat and the electric tingle of Sichuan peppercorn—the famous ma la (numbing-spicy) sensation. Chengdu's codified repertoire counts over twenty distinct flavor profiles, from fish-fragrant to strange-flavor, all layered over fermented doubanjiang from Pixian. Yet Sichuan is not only fire: teahouse snacks and gentle soups balance the drama.",
      signatureDishes: ["Mapo Tofu", "Kung Pao Chicken", "Twice-Cooked Pork", "Dan Dan Noodles", "Hot Pot"],
      keyIngredients: ["Sichuan peppercorns", "doubanjiang", "dried chilies", "chili oil", "preserved vegetables"],
      distinctiveTraits: ["Ma la numbing heat", "Layered composite flavors", "Fermented bean pastes", "Fiery communal hot pot"]
    },
    {
      name: "Guangdong (Cantonese)",
      description: "The Pearl River Delta produces China's most technique-obsessed and least heavy-handed cooking. Freshness is everything—steamed fish is judged by the clock, stir-fries by their wok hei (breath of the wok), and seasoning stays whisper-light so the ingredient speaks. Guangzhou and Hong Kong perfected dim sum, roast meats lacquered to mahogany, and slow-simmered tonic soups.",
      signatureDishes: ["Dim Sum (har gow, siu mai)", "Char Siu", "Steamed Whole Fish", "White Cut Chicken", "Wonton Noodle Soup"],
      keyIngredients: ["fresh seafood", "oyster sauce", "light soy sauce", "ginger", "scallions"],
      distinctiveTraits: ["Ingredient-first restraint", "Masterful steaming and roasting", "Dim sum tradition", "Slow-boiled soups (lou fo tong)"]
    },
    {
      name: "Jiangnan (Shanghai & Huaiyang)",
      description: "The fertile Yangtze delta around Shanghai, Suzhou, and Hangzhou favors refinement and gentle sweetness. Red-braising in soy, rock sugar, and Shaoxing wine gives dishes a glossy mahogany depth; freshwater fish, crab, and bamboo shoots follow the seasons closely. Huaiyang knife work—tofu shredded into threads—is the benchmark of Chinese banquet technique.",
      signatureDishes: ["Xiaolongbao", "Hongshao Rou (red-braised pork)", "West Lake Fish in Vinegar", "Drunken Chicken", "Lion's Head Meatballs"],
      keyIngredients: ["Shaoxing wine", "rock sugar", "black vinegar", "freshwater fish and crab", "bamboo shoots"],
      distinctiveTraits: ["Sweet-savory red braises", "Delicate knife skills", "Seasonal river delicacies", "Soup-filled dumplings"]
    },
    {
      name: "Northern China (Beijing & Shandong)",
      description: "The wheat-growing north eats noodles, dumplings, and steamed breads rather than rice, and its Shandong (Lu) tradition—mother cuisine of the imperial court—prizes clear stocks, vinegar, and precise heat control. Beijing layered courtly refinement on top: crackling-skinned Peking duck, zhajiangmian, and hearty lamb hot pot brought by Mongol and Muslim communities.",
      signatureDishes: ["Peking Duck", "Zhajiangmian", "Jiaozi (boiled dumplings)", "Mongolian Lamb Hot Pot", "Scallion Pancakes"],
      keyIngredients: ["wheat flour", "scallions", "vinegar", "sweet bean sauce (tianmianjiang)", "lamb"],
      distinctiveTraits: ["Wheat over rice", "Imperial court legacy", "Dumpling and noodle mastery", "Bold alliums and vinegar"]
    },
    {
      name: "Xinjiang (Northwest)",
      description: "China's far northwest, home to the Uyghur people, cooks a Central Asian cuisine of cumin-dusted lamb skewers grilled over coals, hand-pulled laghman noodles, and naan-like breads baked in tandoor ovens. Halal by tradition, it leans on lamb, wheat, onions, and dried fruit—flavors closer to Samarkand than Shanghai.",
      signatureDishes: ["Lamb Skewers (chuan)", "Laghman Noodles", "Big Plate Chicken (dapanji)", "Polo (carrot lamb rice)", "Tandoor Naan"],
      keyIngredients: ["lamb", "cumin", "chili flakes", "hand-pulled noodles", "onions"],
      distinctiveTraits: ["Central Asian and halal traditions", "Charcoal-grilled meats", "Cumin-forward spicing", "Tandoor breads"]
    }
  ],
  popularDishes: [
    {
      name: "Mapo Doufu",
      englishName: "Mapo Tofu",
      pronunciation: "mah-poh doh-foo",
      description: "Silken tofu simmered in a crimson sauce of doubanjiang, fermented black beans, and ground pork, finished with a dusting of ground Sichuan peppercorn. The definitive ma la dish—numbing, spicy, and deeply savory.",
      category: "main",
      regionalOrigin: "Sichuan (Chengdu)",
      keyTraits: ["ma la", "doubanjiang", "silken tofu"],
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Beijing Kaoya",
      englishName: "Peking Duck",
      pronunciation: "bay-jing kow-yah",
      description: "Whole duck air-dried, glazed with maltose, and roasted until the skin shatters like glass. Carved tableside and wrapped in thin pancakes with sweet bean sauce, cucumber, and scallion—the crown jewel of imperial Beijing cooking.",
      category: "main",
      regionalOrigin: "Beijing",
      keyTraits: ["crispy skin", "roasted", "sweet bean sauce"],
      popularity: "tourist-classic",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Xiaolongbao",
      englishName: "Soup Dumplings",
      pronunciation: "shyow-long-bow",
      description: "Delicate pleated dumplings from the Shanghai region hiding hot pork broth inside—the soup, set with aspic, melts as the basket steams. Eaten carefully: nibble a corner, sip the broth, then dip in black vinegar with ginger threads.",
      category: "appetizer",
      regionalOrigin: "Jiangnan (Shanghai)",
      keyTraits: ["soup-filled", "steamed", "pleated dough"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "hard",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Gongbao Jiding",
      englishName: "Kung Pao Chicken",
      pronunciation: "gong-bow jee-ding",
      description: "Diced chicken flash-fried with dried chilies, Sichuan peppercorns, and peanuts in a glossy sweet-sour-savory sauce. A study in the litchi flavor profile—gentle sweetness and vinegar brightness over smoldering heat.",
      category: "main",
      regionalOrigin: "Sichuan",
      keyTraits: ["peanuts", "dried chilies", "sweet-sour"],
      popularity: "tourist-classic",
      spiceLevel: "medium",
      difficulty: "medium",
      dietary: { isDairyFree: true }
    },
    {
      name: "Jiaozi",
      englishName: "Boiled Dumplings",
      pronunciation: "jyow-dzuh",
      description: "Crescent dumplings of pork and cabbage (or lamb, chive, or egg) in hand-rolled wheat wrappers, boiled and dipped in vinegar with chili oil. Folding them together on New Year's Eve is northern China's most cherished family ritual.",
      category: "main",
      regionalOrigin: "Northern China",
      keyTraits: ["hand-wrapped", "boiled", "vinegar dip"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegetarianFriendly: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Char Siu",
      englishName: "Cantonese BBQ Pork",
      pronunciation: "chah see-oo",
      description: "Pork shoulder marinated in hoisin, honey, and five-spice, then roasted until lacquered mahogany-red with caramelized charred edges. Draped over rice, tucked into steamed bao, or eaten straight from the roast-shop window.",
      category: "main",
      regionalOrigin: "Guangdong",
      keyTraits: ["roasted", "sweet glaze", "five-spice"],
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Lanzhou Lamian",
      englishName: "Hand-Pulled Beef Noodle Soup",
      pronunciation: "lahn-joe lah-myen",
      description: "Noodles stretched by hand to order and served in a clear beef broth with radish, chili oil, cilantro, and scallion—codified as 'one clear, two white, three red, four green.' A halal northwest classic found on nearly every Chinese street.",
      category: "soup",
      regionalOrigin: "Northwest (Lanzhou)",
      keyTraits: ["hand-pulled noodles", "clear beef broth", "chili oil"],
      isStreetFood: true,
      popularity: "local-favorite",
      spiceLevel: "mild",
      difficulty: "hard",
      dietary: { isHalal: true, isDairyFree: true, isNutFree: true }
    },
    {
      name: "Hongshao Rou",
      englishName: "Red-Braised Pork Belly",
      pronunciation: "hong-shaow roh",
      description: "Cubes of pork belly slowly braised in soy sauce, Shaoxing wine, and caramelized rock sugar until glossy, wobbling, and mahogany-dark. The soul dish of Jiangnan home cooking—famously Mao Zedong's favorite.",
      category: "main",
      regionalOrigin: "Jiangnan (Shanghai)",
      keyTraits: ["red-braised", "caramelized sugar", "melting pork belly"],
      popularity: "local-favorite",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isDairyFree: true, isNutFree: true }
    },
    {
      name: "Dan Dan Mian",
      englishName: "Dan Dan Noodles",
      pronunciation: "dahn-dahn myen",
      description: "Springy noodles under a slick of chili oil, sesame paste, Sichuan peppercorn, and crispy pork with preserved mustard greens—tossed at the table into a numbing, nutty tangle. Named for the shoulder poles of Chengdu street hawkers.",
      category: "street-food",
      regionalOrigin: "Sichuan (Chengdu)",
      keyTraits: ["chili oil", "sesame paste", "ma la"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "hot",
      difficulty: "easy",
      dietary: { isVegetarianFriendly: true, isDairyFree: true }
    },
    {
      name: "Congyou Bing",
      englishName: "Scallion Pancakes",
      pronunciation: "tsong-yo bing",
      description: "Unleavened dough coiled with oil and scallions, then pan-fried into flaky, chewy-crisp layers. A beloved breakfast and street snack across northern China and Shanghai alike.",
      category: "street-food",
      regionalOrigin: "Northern China",
      keyTraits: ["flaky layers", "pan-fried", "scallions"],
      isStreetFood: true,
      popularity: "both",
      spiceLevel: "none",
      difficulty: "medium",
      dietary: { isVegan: true, isVegetarian: true, isDairyFree: true, isNutFree: true }
    }
  ],
  popularBeverages: [
    {
      name: "Longjing Cha",
      englishName: "Dragon Well Green Tea",
      pronunciation: "long-jing chah",
      description: "Hangzhou's celebrated pan-fired green tea with flat jade leaves and a chestnut-sweet, faintly vegetal cup. Tea is China's daily drink and social ritual—served constantly at meals, meetings, and teahouses.",
      type: "non-alcoholic",
      category: "tea",
      regionalOrigin: "Hangzhou (Zhejiang)",
      servedHow: "hot",
      keyIngredients: ["green tea leaves"],
      isTraditional: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Doujiang",
      englishName: "Fresh Soy Milk",
      pronunciation: "doh-jyang",
      description: "Warm, freshly ground soy milk served sweet or savory (with vinegar, dried shrimp, and chili) at breakfast stalls, classically alongside youtiao fried dough sticks for dunking.",
      type: "non-alcoholic",
      category: "street",
      servedHow: "hot",
      keyIngredients: ["soybeans", "water", "sugar"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Suanmeitang",
      englishName: "Sour Plum Drink",
      pronunciation: "swan-may-tahng",
      description: "Beijing's classic summer cooler simmered from smoked dried plums, hawthorn, rock sugar, and osmanthus flowers—tart, smoky-sweet, and served ice-cold beside hot pot and roast duck.",
      type: "non-alcoholic",
      category: "street",
      regionalOrigin: "Beijing",
      servedHow: "iced",
      keyIngredients: ["smoked plums", "hawthorn", "rock sugar", "osmanthus"],
      isTraditional: true,
      isStreetDrink: true,
      dietary: { isVegan: true, isDairyFree: true, isGlutenFree: true }
    },
    {
      name: "Baijiu",
      englishName: "White Spirit",
      pronunciation: "by-jyo",
      description: "The world's most consumed spirit: a fiery grain liquor distilled from fermented sorghum, ranging from light-aroma styles to the famously pungent sauce-aroma Moutai. Downed in small toasts of 'ganbei!' at banquets.",
      type: "alcoholic",
      category: "spirit",
      keyIngredients: ["sorghum", "qu fermentation starter"],
      isTraditional: true,
      alcoholContent: "high",
      dietary: { isVegan: true, isDairyFree: true }
    },
    {
      name: "Shaoxing Huangjiu",
      englishName: "Shaoxing Rice Wine",
      pronunciation: "shaow-shing hwahng-jyo",
      description: "Amber rice wine from Zhejiang, aged for a nutty, sherry-like depth. Sipped warm from ceramic cups and indispensable in the kitchen, where it perfumes drunken chicken and every red braise.",
      type: "alcoholic",
      category: "wine",
      regionalOrigin: "Shaoxing (Zhejiang)",
      servedHow: "room temperature",
      keyIngredients: ["glutinous rice", "wheat qu"],
      isTraditional: true,
      alcoholContent: "medium",
      dietary: { isDairyFree: true }
    }
  ]
};
