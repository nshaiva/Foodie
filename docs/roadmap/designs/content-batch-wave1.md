# Content batch, wave 1: the sandbox trio package (#9)

Prepared 2026-09-28. This is the text-only review gate before wave 1 runs
(per the MVP cost guardrail: sandbox first, Nikita's go before each wave).
Nothing here has been generated or edited in `data/countries/`. Sections:
region review, dish slates, taglines, cost, open questions.

Evidence used below: `regionFingerprint()` match counts were computed by hand
against each country's ingredient tiers (a region shows flavor chips only at
2+ matches), and `resolveRegion()` alias rules were checked against every
existing `regionalOrigin`.

## 1. Region design review

The three tests from #9: (a) the food really changes, (b) people recognize
the name (menus, restaurant signs), (c) fillable with 2-3 dishes at ~20 per
country.

### Mexico (5 regions today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Central Mexico | Yes: moles, antojitos, pork; fingerprint 2/5 (dried chilies, chocolate), chips show | "Poblano" and "Mexico City style" carry it; the umbrella name is app-side but fine | Yes (mole poblano, chiles en nogada, al pastor tradition) | **Keep** |
| Oaxaca | Yes: distinct mole family, quesillo, chapulines; fingerprint only 1/5 (chocolate), chips hidden | Strongest name of the five: "Oaxacan" is on signs everywhere | Yes (tlayudas, mole negro, tamales oaxaqueños) | **Keep**; rewrite keyIngredients so 2+ map (e.g. add "dried chilies (chilhuacle)") |
| Yucatán | Yes: achiote, sour orange, habanero; fingerprint 2/5, chips show | Yes: "Yucatecan", "cochinita" on menus | Yes (cochinita pibil, sopa de lima, panuchos) | **Keep** |
| Northern Mexico | Yes: beef, flour tortillas, grilling; fingerprint 0/5, chips hidden | Yes: "norteño", "carne asada" | Yes (carne asada, burritos, cabrito) | **Keep**; keyIngredients need mappable names |
| Coastal Regions | Yes vs the rest, but it lumps two traditions (Veracruz olives-and-capers vs Pacific citrus-cure); fingerprint 1/5, chips hidden | **No**: "Coastal Regions" never appears on a menu; "Veracruzana", "Sinaloa", "Baja" do | Only as one region; split halves would hold 1-2 each at 20 dishes | **Rename** to "The Coasts (Veracruz, Sinaloa & Baja)" so dish origins can use the real names; do not split |

Possible sixth region: **Western Mexico (Jalisco)**. Today Jalisco rolls into
Central via the alias table, which is why tequila sits under Central, the
rollup mistake #9 calls out. Birria, tortas ahogadas and tequila would fill
it (test c passes at exactly 2-3), "Jalisco style" and "birria" are on signs
(test b passes), and the food is its own tradition (test a passes). Cost: new
`regionMapConfig.ts` coordinates and removing the `jalisco -> Central` alias.
Open question 2 below.

**Origin flags (MX):**

- 9 of 13 items carry no `regionalOrigin` at all: Tacos, Pozole, Tamales,
  Guacamole, Elote, Churros, Horchata, Jamaica, Mexican Hot Chocolate. All
  are genuinely countrywide; wave 1 sets them to explicit "Nationwide"
  rather than blank, so "no data" stops looking identical to "everywhere".
- Mole Poblano and Chiles en Nogada say "Puebla", which only matches via the
  hand-kept alias table. Wave 1 rewrites origin to "Central Mexico" and puts
  "Puebla" in the new `locality` field.
- Tequila says "Jalisco": today aliased into Central (wrong tradition).
  Either the Jalisco region absorbs it or it becomes "Nationwide" with
  locality "Jalisco".

### China (5 regions today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Sichuan | Yes, the clearest case; fingerprint 5/5 | "Sichuan" is a restaurant category worldwide | Already holds 3 dishes | **Keep** |
| Guangdong (Cantonese) | Yes: restraint, steaming, roast meats; fingerprint 4-5/5 | "Cantonese" on every sign | Thin today (1 dish); slate adds 2-3 | **Keep** |
| Jiangnan (Shanghai & Huaiyang) | Yes: sweet red braises, knife work; fingerprint 3/5 | "Jiangnan" no, but the parenthetical carries it: "Shanghai" is the menu name | Holds 2, slate adds 1 | **Keep** (parenthetical does the recognition work) |
| Northern China (Beijing & Shandong) | Yes: wheat, dumplings, vinegar; fingerprint only 1/5 (vinegar), chips hidden | "Beijing" / "Peking" recognized | Holds 3 | **Keep**; rewrite keyIngredients to mappable names ("scallion" singular, "black vinegar") |
| Xinjiang (Northwest) | Yes: cumin lamb, tandoor, Central Asian; fingerprint 0/5 (cumin is not in CN tiers), chips hidden | Yes: "Xinjiang" and "Uyghur" name restaurants | Thin today (1 dish, and it is really Lanzhou); slate adds 2 | **Keep**; consider adding cumin to the CN ingredient tiers so the fingerprint stops being blind here |

Not adding Hunan, Yunnan or Dongbei: each passes tests (a) and (b) but at
~20 dishes they would starve the existing five (test c fails), and their
best-known dishes overlap what the slate already carries.

**Origin flags (CN):** all 10 dishes resolve cleanly today. Doujiang and
Baijiu have no origin (they are countrywide; set explicit "Nationwide").
Lanzhou Lamian's "Northwest (Lanzhou)" matches Xinjiang via the "northwest"
token, which is geographically loose but culinarily fine for a
Northwest-region bucket; keep, with locality "Lanzhou".

### Ireland (4 regions today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Dublin & the East | Somewhat: coddle, spice bag, an urban pub canon; fingerprint 1/5, chips hidden | Yes: "Dublin coddle", "Dublin Bay prawns" | Yes, barely: coddle + spice bag + prawns | **Keep** |
| Munster (Cork & Kerry) | Products more than dishes (dairy, spiced beef); fingerprint 2/5, both umami | "Munster" is not menu language; "Cork" and "Kerry" are | **No**: spiced beef is the only distinct, traveler-met dish; drisheen and tripe fail the well-known test | **Merge** into an Atlantic region (below) |
| Connacht & the Wild Atlantic Way | Sea and bog: oysters, mussels, seaweed; fingerprint 2/5, both umami, indistinguishable from Munster's chips | "Connacht" no; "Galway" and "Wild Atlantic Way" yes | Yes: oysters, chowder, mussels | **Merge** with Munster |
| Ulster & the North | Yes, the one clearly dish-led region: griddle breads, the Ulster fry; fingerprint 1/5, chips hidden | Yes: "Ulster fry", "soda farls" | Yes: fry, farls, apple tart, boxty | **Keep** |

**The honest conclusion the tests point to: 3 regions, not 4.** Munster and
Connacht fail differently but converge: Munster cannot fill with well-known
dishes, Connacht's name is not the recognized one, and their fingerprints
come out identical (the #9 merge signal). The Wild Atlantic Way runs from
Cork to Donegal in real life, so one coastal region is not a fudge:

- **Dublin & the East** (keep)
- **The Wild Atlantic Way (Galway, Cork & Kerry)** (merge): oysters,
  chowder, mussels, spiced beef, Connemara lamb
- **Ulster & the North** (keep)

Cost: new `regionMapConfig.ts` coordinates for the merged region, redirects
for the two old region slugs, and updating the IE rows of `REGION_ALIASES`
(galway, atlantic coast, shannon, foynes point at the old names). Open
question 1 below.

**Origin flags (IE):**

- Poitín "Rural west and north" matches nothing (the known orphan). Rewrite
  to the Atlantic region's name with no locality (the tradition is western
  but not one-town).
- Seafood Chowder "Atlantic coast" only matches via the alias table; rewrite
  to the region name as written.
- Boxty "Leitrim / Cavan / North Midlands" matches only via the cavan alias;
  rewrite to "Ulster & the North" with locality "Leitrim & Cavan".

## 2. Dish-slate proposal (~20 dishes per country)

All existing dishes stay. Every proposed item is **food**; the 5-drink sets
are untouched (per #37, drinks keep the placeholder tile). Region-first:
each thin region is filled before anything lands in "Across {country}".
Locality is filled only where the dish is genuinely one place's.

### Mexico: 8 existing + 10 new = 18 dishes

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Cochinita Pibil | Achiote-marinated pork slow-roasted in banana leaves | main | Yucatán | none (peninsula-wide) |
| Sopa de Lima | Chicken, lime and fried tortilla soup | soup | Yucatán | none |
| Tlayudas | Large crisp tortilla with beans, quesillo, meats | street-food | Oaxaca | none (region is the place) |
| Mole Negro | The darkest Oaxacan mole, over chicken or turkey | main | Oaxaca | none |
| Carne Asada | Grilled marinated beef with flour tortillas | main | Northern Mexico | none (norteño-wide) |
| Burritos | Large flour tortilla rolled around meat and beans | main | Northern Mexico | Ciudad Juárez (debatable, open question 3) |
| Birria | Chili-braised goat or beef stew, now taco filling | main | Western Mexico if added, else Central | Jalisco |
| Aguachile | Raw shrimp cured in lime with fierce green chili | appetizer | The Coasts | Sinaloa |
| Pescado a la Veracruzana | Fish braised with tomato, olives, capers | main | The Coasts | Veracruz |
| Tacos de Pescado | Battered fish tacos with cabbage and crema | street-food | The Coasts | Ensenada, Baja California |

Benched (nationwide, add only if a slot opens): Chilaquiles, Enchiladas.
Region coverage after: Central 2-3, Oaxaca 2, Yucatán 2, Northern 2,
Coasts 3, (Jalisco 1-2 + tequila), Nationwide 6.

### China: 10 existing + 8 new = 18 dishes

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Wonton Noodle Soup | Shrimp-pork wontons and thin noodles in clear broth | soup | Guangdong | none |
| Har Gow | Translucent steamed shrimp dumplings, the dim sum test piece | appetizer | Guangdong | none |
| Chuanr (Lamb Skewers) | Cumin-dusted lamb grilled over coals | street-food | Xinjiang | none |
| Dapanji (Big Plate Chicken) | Chicken and potato braise over wide noodles | main | Xinjiang | none |
| Sichuan Hot Pot | Table-side simmering ma la broth for dipping everything | main | Sichuan | none (Chengdu vs Chongqing is a fight, not a fact) |
| Yangzhou Chaofan | The classic egg, shrimp and ham fried rice | main | Jiangnan | Yangzhou |
| Baozi | Fluffy steamed filled buns, the breakfast staple | breakfast | Nationwide | none |
| Congee (Zhou) | Slow rice porridge with savory toppings | breakfast | Guangdong | none (best known Cantonese; eaten everywhere) |

Region coverage after: Sichuan 4, Guangdong 4, Jiangnan 3, Northern 3,
Xinjiang 3, Nationwide 1.

### Ireland: 10 existing + 8 new = 18 dishes

Assumes the 3-region layout; regions shown with the fallback in parens.

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Spice Bag | Chipper bag of fries, fried chicken and spice mix | street-food | Dublin & the East | none |
| Ulster Fry | The northern breakfast with soda farls and potato bread | breakfast | Ulster & the North | none (open question 4: overlap with Full Irish) |
| Armagh Apple Tart | Orchard-county apple tart with cream | dessert | Ulster & the North | Armagh |
| Spiced Beef | Salt-and-spice-cured beef, boiled and sliced thin | main | Wild Atlantic Way (Munster) | Cork |
| Steamed Mussels | Rope-grown mussels in white wine, garlic and cream | main | Wild Atlantic Way (Connacht) | none (Killary is a producer, not the dish's home) |
| Smoked Salmon on Brown Bread | Oak-smoked salmon on buttered soda bread | appetizer | Nationwide | none |
| Beef and Guinness Stew | Beef braised dark in stout with roots | main | Nationwide | none (pub canon everywhere) |
| Fish and Chips | Battered fish and thick chips from the chipper | street-food | Nationwide | none |

Benched: Carrageen Moss Pudding (real but a traveler rarely meets it),
Drisheen (fails the well-known test). Region coverage after: Dublin 2,
Atlantic 4 (oysters, chowder, spiced beef, mussels), Ulster 4 (boxty, fry,
farls-in-fry, apple tart), Nationwide 9.

## 3. Draft taglines

Rules from `image-style-pilot.md` §1: 40-80 chars, what-it-is first, plain
nouns, no praise words, sentence case, no closing period, no em dashes.
Lengths verified by script. Mexico's existing 13 already live in the pilot
doc; only MX's new dishes appear here.

### Mexico, new dishes

| Item | Tagline | Chars |
|---|---|---|
| Cochinita Pibil | Achiote and sour orange pork, pit roasted in banana leaves | 58 |
| Sopa de Lima | Chicken and lime soup with fried tortilla strips | 48 |
| Tlayudas | Large crisp tortilla with beans, quesillo and grilled meat | 58 |
| Mole Negro | Black Oaxacan mole of chilhuacle chilies and chocolate | 54 |
| Carne Asada | Grilled marinated beef with flour tortillas and salsa | 53 |
| Burritos | Large flour tortilla rolled around meat, beans and cheese | 57 |
| Birria | Chili-braised goat or beef, served as stew or crisped tacos | 59 |
| Aguachile | Raw shrimp cured in lime with green chili and cucumber | 54 |
| Pescado a la Veracruzana | Fish braised with tomato, olives and capers | 43 |
| Tacos de Pescado | Battered fried fish in corn tortillas with cabbage and crema | 60 |

### China, existing items

| Item | Tagline | Chars |
|---|---|---|
| Mapo Doufu | Silken tofu and pork in numbing spicy chili bean sauce | 54 |
| Beijing Kaoya | Crisp-skinned roast duck wrapped in thin pancakes | 49 |
| Xiaolongbao | Steamed pork dumplings with hot soup sealed inside | 50 |
| Gongbao Jiding | Stir-fried chicken with peanuts, chilies and sweet-sour sauce | 61 |
| Jiaozi | Boiled pork and cabbage dumplings with a vinegar dip | 52 |
| Char Siu | Roast pork glazed red with hoisin, honey and five-spice | 55 |
| Lanzhou Lamian | Hand-pulled noodles in clear beef broth with chili oil | 54 |
| Hongshao Rou | Pork belly braised glossy in soy, wine and rock sugar | 53 |
| Dan Dan Mian | Noodles in chili oil and sesame paste with crispy pork | 54 |
| Congyou Bing | Flaky pan-fried flatbread coiled with scallions | 47 |
| Longjing Cha | Pan-fired green tea from Hangzhou, chestnut sweet | 49 |
| Doujiang | Warm fresh soy milk, served sweet or savory at breakfast | 56 |
| Suanmeitang | Iced smoked plum drink, tart and lightly sweet | 46 |
| Baijiu | Strong clear liquor distilled from fermented sorghum | 52 |
| Shaoxing Huangjiu | Amber rice wine, nutty and sherry-like, sipped warm | 51 |

### China, new dishes

| Item | Tagline | Chars |
|---|---|---|
| Wonton Noodle Soup | Shrimp and pork wontons with thin noodles in clear broth | 56 |
| Har Gow | Steamed shrimp dumplings in translucent pleated wrappers | 56 |
| Chuanr | Charcoal-grilled lamb skewers dusted with cumin and chili | 57 |
| Dapanji | Braised chicken and potatoes in spiced sauce over noodles | 57 |
| Sichuan Hot Pot | Simmering chili broth for cooking meat and greens at the table | 62 |
| Yangzhou Chaofan | Fried rice with egg, shrimp, ham and peas | 41 |
| Baozi | Fluffy steamed buns filled with pork or vegetables | 50 |
| Congee (Zhou) | Slow-cooked rice porridge with savory toppings | 46 |

### Ireland, existing items

| Item | Tagline | Chars |
|---|---|---|
| Irish Stew | Lamb simmered slowly with potatoes, onions and carrots | 54 |
| Full Irish Breakfast | Fried rashers, sausages, eggs and black and white pudding | 57 |
| Brown Soda Bread | Dense wholemeal bread raised with buttermilk, not yeast | 55 |
| Seafood Chowder | Creamy soup of salmon, smoked fish and mussels with potato | 58 |
| Bacon and Cabbage | Boiled cured pork with buttered cabbage and parsley sauce | 57 |
| Colcannon | Mashed potatoes folded with kale, scallions and butter | 54 |
| Dublin Coddle | Sausages, rashers and potatoes gently simmered in broth | 55 |
| Boxty | Griddle-fried pancake of mashed and grated potato | 49 |
| Galway Oysters with Stout | Raw native oysters with lemon, brown bread and stout | 52 |
| Barmbrack | Tea-soaked fruit loaf with raisins and mixed spice | 50 |
| Guinness | Dry Dublin stout with a creamy head and roasted malt | 52 |
| Irish Whiskey | Triple-distilled barley spirit, sipped neat or in hot whiskey | 61 |
| Irish Coffee | Hot coffee with whiskey and sugar under floating cream | 54 |
| Strong Black Tea | Dark-brewed Assam blend taken with plenty of milk | 49 |
| Poitín | Once-illicit grain or potato spirit, fiery and grassy | 53 |

### Ireland, new dishes

| Item | Tagline | Chars |
|---|---|---|
| Spice Bag | Chipper bag of fries, crispy chicken, peppers and spice mix | 59 |
| Ulster Fry | Northern breakfast fry with soda farls and potato bread | 55 |
| Armagh Apple Tart | Baked apple tart from Armagh orchards, served with cream | 56 |
| Spiced Beef | Salt-cured beef rubbed with spices, boiled and sliced thin | 58 |
| Steamed Mussels | Rope-grown mussels steamed in white wine, garlic and cream | 58 |
| Smoked Salmon on Brown Bread | Oak-smoked salmon on buttered brown soda bread with lemon | 57 |
| Beef and Guinness Stew | Beef braised in stout with root vegetables, dark and malty | 58 |
| Fish and Chips | Battered fresh fish with thick chips, salt and vinegar | 54 |

## 4. Cost estimate

**Text generation assumptions.** Fields per dish: tagline, description
(≤150 chars), regionalOrigin, locality, optional keySpices, image prompt
(the pilot's prompts run ~110 words). That is ~300 output tokens per dish,
~100 per drink (tagline + description + origin, no image prompt), plus
region rewrites, roughly 8K output tokens per country. Input: country file
plus the frozen prompt rules, ~12K tokens, times ~1.5 for one revision pass.
Pricing (Claude API, approximate as of mid-2026): Sonnet 5 at $2 in / $10
out per MTok, Opus 5 at $5 / $25; the Batch API halves either. Per country
that is $0.12 (Sonnet) to $0.29 (Opus). **Text cost is noise at every
scale**; review time is the real budget.

**Image assumptions.** Dishes only (620 at full batch); $0.02-0.08 per
image since the model is unpicked; ~30% reject-and-regenerate rate; wave 1
reuses the 4 winning-style pilot images. **Review** at 1-2 minutes per
generated image (the accuracy checklist at tile sizes; this is the light
review the illustrated style was chosen to buy) plus 20-30 minutes of text
review per country (taglines, descriptions, origins, region prose).

| | Wave 1 (MX, CN, IE) | Wave 2 (~5 countries) | Wave 3 (23 countries) | All 31 |
|---|---|---|---|---|
| Dishes carrying images | 54 | ~100 | ~460 | ~620 |
| Image generations (with redos) | ~66 | ~130 | ~600 | ~800 |
| LLM text cost | under $1 | under $2 | $3-7 | $4-9 |
| Image generation cost | $1.30-5.30 | $2.60-10.40 | $12-48 | $16-64 |
| Review time | 2.5-4 h | 4-7 h | 18-31 h | **25-42 h** |

Wave 3 additionally writes regions for Ethiopia, Japan and Peru and
ingredient `flavorAxes` for the 28 unmapped countries; both are inside the
token estimate above and add nothing visible to the dollar totals.

The table says what #37 predicted: money is cents, review is a workweek.
The only lever that moves the 25-42 hours is rejecting a style that reviews
slowly, which is what the #36 pilot is for.

## 5. Open questions for Nikita

1. **Ireland: 3 regions or 4?** The tests say merge Munster and Connacht
   into "The Wild Atlantic Way (Galway, Cork & Kerry)": Munster cannot fill
   with well-known dishes, and the two fingerprints are identical. The
   counterargument is real (Cork dairy vs Galway shellfish is a genuine food
   difference); the counter-counterargument is that at 20 dishes it is a
   difference in products, not in what a traveler orders.
2. **Mexico: add Western Mexico (Jalisco) as a sixth region?** It passes all
   three tests at exactly the minimum (birria, tortas ahogadas, tequila) and
   fixes tequila's wrong rollup into Central, but costs new hand-maintained
   map coordinates. If no: birria and tequila sit under Central with
   locality "Jalisco", which repeats the mistake the locality field was
   meant to expose.
3. **Burritos' locality.** Ciudad Juárez has the strongest claim, but the
   dish is really northern-wide (and half its fame is from north of the
   border). Fill "Ciudad Juárez" or leave locality blank?
4. **Ulster Fry next to Full Irish Breakfast.** In Belfast they are
   different orders (farls and potato bread vs toast); on a 18-dish list
   they may read as the same card twice. Keep both, or fold the fry into
   the Full Irish description and give Ulster another dish (Soda Farls as
   their own side)?
5. **Congee's region.** Proposed under Guangdong (where a traveler most
   often meets it named), but it is eaten countrywide; "Nationwide" is
   equally defensible and changes which region strip it appears in.
