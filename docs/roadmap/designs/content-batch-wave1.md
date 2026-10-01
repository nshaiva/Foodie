# Content batch, wave 1: the sandbox package (#9)

**Re-scoped 2026-10-01 by Nikita: wave 1 is Mexico, China and Egypt.**
Ireland keeps its approved review below (§1-3, §5) and moves to wave 2
unchanged; nothing in Ireland's data was touched. Egypt's region review and
slate are in **§7** (feseekh left out, the optional item). The text half for
all three ran the same day: see **§8** for what changed in the data and the
decisions that closed §6. Images for all three were generated the same day
on Nikita's go (47 dishes, about $1).

Prepared 2026-09-28; **refreshed 2026-09-30** after a verification pass
(every count re-run against `dishRegion.ts` and the MX/CN/IE data on
`origin/main`), and **Nikita approved the refresh 2026-09-30**, including the
answers to the open questions (§5, now decisions). This is the text-only review
gate before wave 1 runs (per the MVP cost guardrail: sandbox first, Nikita's
go before each wave). Nothing here has been generated or edited in
`data/countries/`. Sections: region review, dish slates, taglines, cost,
decisions, before the run.

**What changed in the refresh:** corrected fingerprint and coverage counts
(Guangdong, Ulster, Munster/Connacht, Xinjiang, Northern China); Irish Whiskey
and Strong Black Tea get explicit origins; Tortas Ahogadas added so the new
Jalisco region fills; Xinjiang renamed to cover Lanzhou; five taglines fixed
for accuracy; the cost section updated for the chosen image style and model;
and a new §6 for the PR #47 overlaps and one map problem.

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
| Coastal Regions | Yes vs the rest, but it lumps two traditions (Veracruz olives-and-capers vs Pacific citrus-cure); fingerprint 1/5, chips hidden | **No**: "Coastal Regions" never appears on a menu; "Veracruzana", "Sinaloa", "Baja" do | Only as one region; split halves would hold 1-2 each at 20 dishes | **Rename** to "The Coasts (Veracruz, Sinaloa & Baja)" so dish origins can use the real names; do not split. **Map problem, see §6:** the region is drawn around one Pacific point, so Veracruz lands in another region's area |

**Sixth region, approved: Western Mexico (Jalisco).** Today Jalisco rolls into
Central via the alias table, which is why tequila sits under Central, the
rollup mistake #9 calls out. Birria, tortas ahogadas and tequila fill it
(test c passes at exactly 2-3, **but only because Tortas Ahogadas is now on
the slate**: the first draft added birria alone, which left one dish plus
tequila), "Jalisco style" and "birria" are on signs (test b passes), and the
food is its own tradition (test a passes). Cost: new `regionMapConfig.ts`
coordinates and removing the `jalisco -> Central` alias.

**Origin flags (MX):**

- 9 of 13 items carry no `regionalOrigin` at all: Tacos, Pozole, Tamales,
  Guacamole, Elote, Churros, Horchata, Jamaica, Mexican Hot Chocolate. All
  are genuinely countrywide; wave 1 sets them to explicit "Nationwide"
  rather than blank, so "no data" stops looking identical to "everywhere".
- Mole Poblano and Chiles en Nogada say "Puebla", which only matches via the
  hand-kept alias table. Wave 1 rewrites origin to "Central Mexico" and puts
  "Puebla" in the new `locality` field.
- Tequila says "Jalisco": today aliased into Central (wrong tradition).
  The new Western Mexico region absorbs it.

### China (5 regions today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Sichuan | Yes, the clearest case; fingerprint 5/5 | "Sichuan" is a restaurant category worldwide | Already holds 3 dishes | **Keep** |
| Guangdong (Cantonese) | Yes: restraint, steaming, roast meats; fingerprint 3/5 (oyster sauce, soy, ginger; "scallions" misses because the tier is named "ginger & scallion") | "Cantonese" on every sign | Thin today (1 dish); slate adds 2-3 | **Keep** |
| Jiangnan (Shanghai & Huaiyang) | Yes: sweet red braises, knife work; fingerprint 3/5 | "Jiangnan" no, but the parenthetical carries it: "Shanghai" is the menu name | Holds 2, slate adds 1 | **Keep** (parenthetical does the recognition work) |
| Northern China (Beijing & Shandong) | Yes: wheat, dumplings, vinegar; fingerprint only 1/5 (vinegar), chips hidden | "Beijing" / "Peking" recognized | Holds 3 | **Keep**; rewrite keyIngredients to mappable names: "scallion" singular works (the tier name contains it); "black vinegar" is redundant, "vinegar" already matches |
| Xinjiang (Northwest) → **Northwest (Xinjiang & Gansu)** | Yes: cumin lamb, tandoor, Central Asian; fingerprint 0/5 (cumin is not in CN tiers), chips hidden | Yes: "Xinjiang" and "Uyghur" name restaurants | Thin today (1 dish, and it is really Lanzhou); slate adds 2 | **Keep, renamed** so Lanzhou Lamian (Gansu, Hui, not Uyghur) belongs honestly; the alias tokens still resolve. For chips: add cumin to the CN tiers **and** rewrite "chili flakes" to "dried chilies" (or add onion to the tiers). Cumin alone only reaches 1/5 |

Not adding Hunan, Yunnan or Dongbei: each passes tests (a) and (b) but at
~20 dishes they would starve the existing five (test c fails), and their
best-known dishes overlap what the slate already carries.

**Origin flags (CN):** all 10 dishes resolve cleanly today. Doujiang and
Baijiu have no origin (they are countrywide; set explicit "Nationwide").
Lanzhou Lamian's "Northwest (Lanzhou)" matches via the "northwest" token;
with the region renamed to include Gansu it is now accurate. Keep, with
locality "Lanzhou".

### Ireland (4 regions today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Dublin & the East | Somewhat: coddle, spice bag, an urban pub canon; fingerprint 1/5, chips hidden | Yes: "Dublin coddle", "Dublin Bay prawns" | Yes, barely: coddle + spice bag + prawns | **Keep** |
| Munster (Cork & Kerry) | Products more than dishes (dairy, spiced beef); fingerprint 2/5 (umami + acidity) | "Munster" is not menu language; "Cork" and "Kerry" are | **No**: spiced beef is the only distinct, traveler-met dish; drisheen and tripe fail the well-known test | **Merge** into an Atlantic region (below) |
| Connacht & the Wild Atlantic Way | Sea and bog: oysters, mussels, seaweed; fingerprint 3/5 (umami + acidity + smokeEarth), near-identical to Munster's chips | "Connacht" no; "Galway" and "Wild Atlantic Way" yes | Yes: oysters, chowder, mussels | **Merge** with Munster |
| Ulster & the North | Yes, the one clearly dish-led region: griddle breads, the Ulster fry; fingerprint 1/5, chips hidden | Yes: "Ulster fry", "soda farls" | Yes: fry, farls, apple tart, boxty | **Keep** |

**The honest conclusion the tests point to: 3 regions, not 4.** Munster and
Connacht fail differently but converge: Munster cannot fill with well-known
dishes, Connacht's name is not the recognized one, and their fingerprints
come out near-identical (the #9 merge signal). **Approved: 3 regions.** The
Wild Atlantic Way runs from Cork to Donegal in real life, so one coastal
region is not a fudge (Donegal itself is Ulster; the region keeps the
Galway, Cork & Kerry parenthetical so that stays clear):

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
- Irish Whiskey and Strong Black Tea carry no origin at all; set explicit
  "Nationwide", the same rule as MX and CN.
- Dublin (1/5) and Ulster (1/5) keep hidden chips unless their
  keyIngredients are rewritten to mappable names (e.g. "bacon and sausages"
  → "bacon"). Do it in the same pass.

## 2. Dish-slate proposal (~20 dishes per country)

All existing dishes stay. Every proposed item is **food**; the 5-drink sets
are untouched (per #37, drinks keep the placeholder tile). Region-first:
each thin region is filled before anything lands in "Across {country}".
Locality is filled only where the dish is genuinely one place's.

### Mexico: 8 existing + 11 new = 19 dishes

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Cochinita Pibil | Achiote-marinated pork slow-roasted in banana leaves | main | Yucatán | none (peninsula-wide) |
| Sopa de Lima | Chicken, lime and fried tortilla soup | soup | Yucatán | none |
| Tlayudas | Large crisp tortilla with beans, quesillo, meats | street-food | Oaxaca | none (region is the place) |
| Mole Negro | The darkest Oaxacan mole, over chicken or turkey | main | Oaxaca | none |
| Carne Asada | Grilled marinated beef with flour tortillas | main | Northern Mexico | none (norteño-wide) |
| Burritos | Slim flour tortilla around one guisado (machaca, chile colorado) | main | Northern Mexico | none (origin claim contested; decision 3) |
| Birria | Chili-braised goat or beef stew, now taco filling | main | Western Mexico | Jalisco |
| Tortas Ahogadas | Pork sandwich drowned in thin chile de árbol sauce | street-food | Western Mexico | Guadalajara |
| Aguachile | Raw shrimp cured in lime with fierce green chili | appetizer | The Coasts | Sinaloa |
| Pescado a la Veracruzana | Fish braised with tomato, olives, capers | main | The Coasts | Veracruz |
| Tacos de Pescado | Battered fish tacos with cabbage and crema | street-food | The Coasts | Ensenada, Baja California |

Benched (nationwide, add only if a slot opens): Chilaquiles, Enchiladas.
Region coverage after: Central 2-3, Oaxaca 2, Yucatán 2, Northern 2,
Coasts 3, Western 2 + tequila, Nationwide 6. Pozole stays Nationwide (it has
Guerrero, Jalisco and Michoacán versions); PR #47 pins it to Guadalajara for
the map plates, reconcile in §6. Nationwide at 6 of 19 means #9's goal of
shrinking "Across Mexico" is only partly met; accepted for wave 1.

### China: 10 existing + 8 new = 18 dishes

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Wonton Noodle Soup | Shrimp-pork wontons and thin noodles in clear broth | soup | Guangdong | none |
| Har Gow | Translucent steamed shrimp dumplings, the dim sum test piece | appetizer | Guangdong | none |
| Chuanr (Lamb Skewers) | Cumin-dusted lamb grilled over coals | street-food | Northwest | none |
| Dapanji (Big Plate Chicken) | Chicken and potato braise over wide noodles | main | Northwest | none |
| Sichuan Hot Pot | Table-side simmering ma la broth for dipping everything | main | Sichuan | none (Chengdu vs Chongqing is a fight, not a fact) |
| Yangzhou Chaofan | The classic egg, shrimp and ham fried rice | main | Jiangnan | Yangzhou |
| Baozi | Fluffy steamed filled buns, the breakfast staple | breakfast | Nationwide | none |
| Congee (Zhou) | Slow rice porridge with savory toppings | breakfast | Guangdong | none (approved: jook is the named version a diner meets, and Guangdong needs the dishes) |

Region coverage after: Sichuan 4, Guangdong 4, Jiangnan 3, Northern 3,
Northwest 3, Nationwide 1.

### Ireland: 10 existing + 8 new = 18 dishes

The 3-region layout (approved).

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Spice Bag | Chinese-takeaway bag of chips, fried chicken, peppers and spice mix | street-food | Dublin & the East | none |
| Ulster Fry | The northern breakfast with soda farls and potato bread | breakfast | Ulster & the North | none (approved: keep beside the Full Irish, different orders) |
| Armagh Apple Tart | Orchard-county apple tart with cream | dessert | Ulster & the North | Armagh |
| Spiced Beef | Salt-and-spice-cured beef, boiled and sliced thin; mostly a Christmas dish | main | Wild Atlantic Way | Cork |
| Steamed Mussels | Rope-grown mussels in white wine, garlic and cream | main | Wild Atlantic Way | none (Killary is a producer, not the dish's home) |
| Smoked Salmon on Brown Bread | Oak-smoked salmon on buttered soda bread | appetizer | Nationwide | none |
| Beef and Guinness Stew | Beef braised dark in stout with roots | main | Nationwide | none (pub canon everywhere) |
| Fish and Chips | Battered fish and thick chips from the chipper | street-food | Nationwide | none |

Benched: Carrageen Moss Pudding (real but a traveler rarely meets it),
Drisheen (fails the well-known test). Spiced beef is seasonal, which
weakens the same test; it stays because the Atlantic region needs it, and
its description should say "at Christmas". Region coverage after: Dublin 2,
Atlantic 4 (oysters, chowder, spiced beef, mussels), Ulster 3 (boxty, fry,
apple tart; farls are part of the fry, not a dish), Nationwide 9. Total 18.
Nationwide at 9 of 18 is high; accepted for wave 1.

## 3. Draft taglines

Rules from `image-style-pilot.md` §1: 40-80 chars, what-it-is first, plain
nouns, no praise words, sentence case, no closing period, no em dashes.
Lengths verified by script. Mexico's existing 13 already live in the pilot
doc; only MX's new dishes appear here. **PR #47 already writes all 43
existing MX/CN/IE taglines into the country files** (the CN and IE ones match
this doc), so wave 1 treats existing taglines as locked and writes new
dishes' only. Tagline fixes applied in the refresh: Sopa de Lima (lima is a
local citrus, not lime), Burritos (norteño, not the US Mission style),
Brown Soda Bread (bread soda raises it), Spice Bag (Chinese takeaways, not
chippers), Fish and Chips ("fresh" was praise). Brown Soda Bread is an
existing item, so its fix lands as an edit to #47's tagline.

### Mexico, new dishes

| Item | Tagline | Chars |
|---|---|---|
| Cochinita Pibil | Achiote and sour orange pork, pit roasted in banana leaves | 58 |
| Sopa de Lima | Chicken soup soured with lima, a local citrus, with tortilla strips | 67 |
| Tlayudas | Large crisp tortilla with beans, quesillo and grilled meat | 58 |
| Mole Negro | Black Oaxacan mole of chilhuacle chilies and chocolate | 54 |
| Carne Asada | Grilled marinated beef with flour tortillas and salsa | 53 |
| Burritos | Slim flour tortilla rolled around one filling, often machaca | 60 |
| Birria | Chili-braised goat or beef, served as stew or crisped tacos | 59 |
| Tortas Ahogadas | Crusty roll of pork drowned in thin tomato and chile de árbol sauce | 67 |
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
| Brown Soda Bread | Dense wholemeal bread raised with bread soda and buttermilk | 59 |
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
| Spice Bag | Chinese takeaway bag of chips, crispy chicken, peppers and spice mix | 68 |
| Ulster Fry | Northern breakfast fry with soda farls and potato bread | 55 |
| Armagh Apple Tart | Baked apple tart from Armagh orchards, served with cream | 56 |
| Spiced Beef | Salt-cured beef rubbed with spices, boiled and sliced thin | 58 |
| Steamed Mussels | Rope-grown mussels steamed in white wine, garlic and cream | 58 |
| Smoked Salmon on Brown Bread | Oak-smoked salmon on buttered brown soda bread with lemon | 57 |
| Beef and Guinness Stew | Beef braised in stout with root vegetables, dark and malty | 58 |
| Fish and Chips | Battered white fish with thick chips, salt and vinegar | 54 |

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

**Image assumptions (updated 2026-09-30).** Style and model are chosen
(`image-style-pilot.md` §4d/4e): style C2 on `gpt-image-2.5-sunburst` at
medium quality, about **2¢ per image**. Dishes only (#37). Five MX finals
already exist (tacos, mole, pozole, tamales, elote); Chiles en Nogada has no
single final yet. ~30% reject-and-regenerate rate. **The image prompt is not a
country-data field:** the pipeline keeps one entry per dish (subject,
`mustShow`, `wrong`) in `docs/design/prompts/dish-images.json`, with style
and framing frozen; MX has entries, CN and IE need them written. The
generation script caps a run at 15 images, so wave 1 is about 5 runs.
**Review** at 1-2 minutes per generated image plus 20-30 minutes of text
review per country.

| | Wave 1 (MX, CN, IE) | Wave 2 (~5 countries) | Wave 3 (23 countries) | All 31 |
|---|---|---|---|---|
| New dish images | ~49 | ~100 | ~460 | ~610 |
| Image generations (with redos) | ~64 | ~130 | ~600 | ~800 |
| LLM text cost | under $1 | under $2 | $3-7 | $4-9 |
| Image generation cost | ~$1.30 | ~$2.60 | ~$12 | ~$16 |
| Review time | 2.5-4 h | 4-7 h | 18-31 h | **25-42 h** |

Wave 3 additionally writes regions for Ethiopia, Japan and Peru and
ingredient `flavorAxes` for the 28 unmapped countries; both are inside the
token estimate above and add nothing visible to the dollar totals.

**Not money, still costs:** repo and asset size (~40KB per compressed image,
~40MB at 620, fine as Vercel static assets or in Supabase Storage), and
checking coordinates by hand wherever a dish's `origin` carries them.

The table says what #37 predicted: money is cents, review is a workweek.

## 5. Decisions (approved by Nikita 2026-09-30)

1. **Ireland: 3 regions.** Munster and Connacht merge into "The Wild
   Atlantic Way (Galway, Cork & Kerry)". Munster cannot fill with dishes a
   traveller meets, and the two fingerprints are near-identical.
2. **Mexico: add Western Mexico (Jalisco)**, with Tortas Ahogadas on the
   slate so it holds two dishes plus tequila.
3. **Burritos: no locality.** The Ciudad Juárez claim is contested; the
   locality rule says don't invent precision.
4. **Keep both the Ulster Fry and the Full Irish.** Different orders; the
   fry's tagline names the farls and potato bread.
5. **Congee under Guangdong.**

## 6. Before the run

Settle these before wave 1 generates anything:

- **Merge `locality` with PR #47's `origin`.** #47 adds
  `origin?: { place, coordinates }` for the map plates; that is the same idea
  as `locality`. One field, decided before the batch prompt is written.
  #47's nearest-region fallback also reads it. Reconcile pozole
  (Guadalajara on #47, Nationwide here).
- **The Coasts map problem.** Regions are drawn as areas around one point
  each (`regionMapConfig.ts:99`, [-105, 22], Pacific side). Veracruz is on
  the Gulf, so a Veracruz dish would sit in another region's area, and the
  new Jalisco point lands almost on top of the Coasts point. Options: move
  the Coasts point, give a region more than one point, or drop Veracruz
  from the name and slate (Pescado a la Veracruzana → Nationwide with
  locality). Needs a decision with the map in front of you.
- **Region renames touch more than aliases.** Renaming or merging regions
  means new `regionMapConfig` keys and redirects for old `?region=` slugs
  (which #41 now forwards to `/?c=&r=`). #47's alias rule already makes
  "The Wild Atlantic Way" answer to "wild atlantic way".
- **Dish count is 18-19, not ~20.** Accepted for wave 1; top up in wave 2's
  prompt if the regions read thin.
- **Drinks images.** `dish-images.json` has MX drink subjects and a mezcal
  image exists, which contradicts #37's dishes-only rule. Either drop them
  from wave 1 or amend #37.

## 7. Egypt: region review and slate (added 2026-10-01, for review)

Egypt joined the sandbox on 2026-09-30 (#50) with taglines for all 15 items
and four illustrated dishes. Measured against `origin/main` + this branch:
10 dishes, 5 drinks, 4 regions, no orphans (every `regionalOrigin` resolves
via the alias split: "Cairo", "Nile Delta", "Upper Egypt", "Alexandria",
"Aswan (Upper Egypt)"). Two problems the wave fixes: **no region shows
flavor chips** (0/5 everywhere, because Egypt's ingredient tiers carry no
`flavorAxes`, one of the 28 unmapped countries #9 owes), and the ten
existing descriptions run **186-256 characters** against the ~150 rule from
#33, so every Egypt card clips.

### Regions (4 today)

| Region | (a) food changes | (b) recognized | (c) fillable | Verdict |
|---|---|---|---|---|
| Cairo & the Nile Delta | Yes: the street canon (koshari, hawawshi), Delta pigeon and molokhia | "Cairo-style" and "baladi" carry it | 4 today (Koshari, Molokhia, Hamam Mahshi, Hawawshi) | **Keep** |
| Alexandria & the Mediterranean Coast | Yes: seafood, chili and cardamom, Greek and Levantine echoes; sharper palate than inland | Strongest name of the four: "Eskandarani" is on menus and signs across Egypt | 1 today (Sayadeya); needs 2 more | **Keep**, fill |
| Upper Egypt (Sa'idi) | Yes: clay ovens, okra stews, ghee and molasses, Nubian breads toward Aswan | "Sa'idi" is recognized inside Egypt, less so abroad; "Nubian" and "Aswan" are | 1 today (Fattah) plus Karkadeh; needs 2 more | **Keep**, fill |
| Sinai & Red Sea Coast | Yes: Bedouin fire-pit and saj cooking, grilled catch, herb tea; nothing slow-simmered | "Bedouin" and "Sinai" are recognized; "Dahab" and "Hurghada" on every traveller's map | **0 today**; needs 2 | **Keep**, fill. Thinnest region in the sandbox; if the two dishes below feel forced, merge into a "Coasts" region with Alexandria |

No renames or merges proposed. **Nationwide stays large**: ful, ta'ameya,
mahshi and umm ali are eaten everywhere and were made explicit Nationwide on
this branch (they had no origin, which read the same as "everywhere" but
isn't). Two preview map pins that implied a false locality came off (Ful
"Cairo", Ta'ameya "Alexandria"); Koshari keeps Cairo and Molokhia keeps
Mansoura.

### Dish slate: 10 existing + 9 new = 19 dishes (+1 optional)

| New dish | What it is | Category | Region | Locality |
|---|---|---|---|---|
| Kebda Eskandarani | Chopped liver fried with chili, cumin and garlic, stuffed in a roll | street-food | Alexandria | none (the city is the region) |
| Samak Mashwi | Whole fish grilled over charcoal with cumin and lime, tahini on the side | main | Alexandria | none |
| Bamia | Okra stewed with beef in tomato and garlic, over rice | main | Upper Egypt | none (Sa'idi-wide) |
| Weika | Nubian stew of dried ground okra, poured over sun-baked bread | main | Upper Egypt | Aswan |
| Zarb | Bedouin lamb and vegetables cooked in a sand-buried pit oven | main | Sinai & Red Sea | none (Bedouin camps, Dahab to Nuweiba) |
| Farasheeh with Bedouin tea | Paper-thin saj flatbread eaten with habak-scented tea at a camp | breakfast | Sinai & Red Sea | none |
| Feteer Meshaltet | Flaky layered pastry of thin dough and ghee, plain or filled | breakfast | Nationwide | none |
| Kofta | Grilled minced lamb and beef skewers with onion and parsley | main | Nationwide | none |
| Macarona Béchamel | Baked pasta layered with spiced beef and thick béchamel | main | Nationwide | none |
| *Feseekh* (optional) | Salt-fermented grey mullet eaten with onion and lime at Sham el-Nessim | appetizer | Alexandria | none |

Feseekh is the judgment call: it is the most Alexandrian dish there is and
culturally rich (Sham el-Nessim), but a traveller is more likely to be warned
off it than to order it. Include it if the app should teach, leave it out
if the list should be orderable. Basbousa was considered for a second
dessert and benched (Umm Ali already covers sweets at 19).

Region coverage after: Cairo & Delta 4, Alexandria 3 (4 with feseekh),
Upper Egypt 3, Sinai 2, Nationwide 7 of 19. Drinks untouched (5).

### Draft taglines (new dishes)

| Item | Tagline | Chars |
|---|---|---|
| Kebda Eskandarani | Chopped liver fried with chili, cumin and garlic, stuffed in a roll | 67 |
| Samak Mashwi | Whole fish grilled over charcoal with cumin, lime and tahini | 60 |
| Bamia | Okra stewed with beef in tomato and garlic, served over rice | 59 |
| Weika | Nubian stew of dried ground okra, poured over sun-baked bread | 61 |
| Zarb | Bedouin lamb and vegetables slow-cooked in a sand-buried pit oven | 65 |
| Farasheeh with Bedouin tea | Paper-thin saj flatbread with sweet tea brewed with desert herbs | 64 |
| Feteer Meshaltet | Flaky layered pastry of thin dough and ghee, plain or filled | 60 |
| Kofta | Grilled minced lamb and beef on skewers with onion and parsley | 62 |
| Macarona Béchamel | Baked pasta layered with spiced beef and thick béchamel | 55 |
| Feseekh | Salt-fermented grey mullet with onion and lime, a spring festival dish | 70 |

### Also in Egypt's text pass (no review needed, listed for the record)

- `flavorAxes` on Egypt's ingredient tiers (cumin, garlic, lime, tomatoes,
  coriander, dill, dried mint, onion, lentils, vinegar, cinnamon, pickles),
  so the four regions get chips. Target 2+ matches per region.
- Existing descriptions (186-256 chars) were left alone: since #39 the
  tile shows the tagline and the description lives in the detail sheet, so
  the four-line rule from #33 no longer bites. New ones are written at ~150.
- Em dashes: all 13 in `EG.ts` were already swept on this branch
  (2026-10-01), so the new text only has to keep the rule.

### Egypt images (for the separate image go)

Dishes only (#37). Existing without an image: Mahshi, Fattah, Hamam Mahshi,
Hawawshi, Sayadeya, Umm Ali (6). New: 9 (10 with feseekh). **15-16 images**,
about 20-21 with redos, roughly 40¢. Subjects go into `dish-images.json`
after the slate is approved.

## 8. What ran for Mexico (2026-10-01)

Text half only; no images generated. All on branch `content-wave1-mx-eg`.

**Decisions that closed §6 (Nikita, 2026-10-01):**

1. **`locality` is `origin.place`.** One field: `origin?: { place; coordinates? }`.
   `place` is the locality the detail view reads ("From Puebla · Central
   Mexico", built on this branch in `DishDetailSheet`); `coordinates` are
   optional and only present when the map should float the dish over a city.
   Pozole lost its Guadalajara pin (Nationwide). Tequila gained
   "Tequila, Jalisco".
2. **The Coasts:** renamed to **"Pacific Coast (Sinaloa & Baja)"**, point
   moved to Culiacán (`[-107.4, 24.8]`; the Voronoi area still reaches
   Ensenada). **Veracruz has no region**: Pescado a la Veracruzana is
   Nationwide with `origin.place: "Veracruz"` and no coordinates, so it is
   never drawn inside another region's area. `veracruz` resolves to
   nationwide in the alias table.
3. **Drinks: no images in wave 1.** The existing mezcal image stays.
4. Old `?r=coastal-regions` links land on the Pacific Coast
   (`RETIRED_REGION_SLUGS` in `dishRegion.ts`, consulted by `regionFromSlug`).

**Data (`MX.ts`):** six regions (Western Mexico (Jalisco) added; Oaxaca and
Northern Mexico `keyIngredients` rewritten so chips show); the eleven
approved dishes with their approved taglines, descriptions at or under 150
characters, `regionalOrigin` in the regions' own vocabulary; nine
countrywide items made explicit Nationwide; Mole Poblano and Chiles en
Nogada moved to "Central Mexico" with Puebla as locality. Measured after
(`resolveRegion` over every item): no orphans; Central 2, Oaxaca 3, Yucatán
2, Northern 2, Western 3, Pacific 2, Nationwide 10 of 24 items; every
region 2+ fingerprint matches (Western 4). Eleven image subjects added to
`dish-images.json` under the frozen `c2-v1` prompt.

**Mexico images (for the separate image go):** new dishes 11, plus existing
without an image: Chiles en Nogada, Guacamole, Churros (3). **14 images**,
about 18 with redos, roughly 35¢.

### Images, all three countries (2026-10-01)

Generated on Nikita's go in four runs under the 15-per-run cap: MX 14
(11 new + Chiles en Nogada, Guacamole, Churros), CN 9 + 9 (all 18 dishes),
EG 15 (6 existing without an image + 9 new). **47 of 47 passed review on
the first generation** against each subject's `mustShow` / `wrong` list;
no redos, so the ~30% redo allowance went unused. Cost about 94¢. Every
dish in the three countries now carries an image (MX 19/19, CN 18/18,
EG 19/19); drinks keep the placeholder except the mezcal image that
already existed. Sources stay in `docs/design/prototypes/image-pilot/finals/`
with `prompts-used.json` beside them.

**Size, measured:** the generator's PNGs are ~1.3 MB each, so 56 dishes
came to 60 MB in `public/dish-images/`, against the ~40 KB per image the
cost section assumed. **Converted to WebP (quality 82, same 1152×768)** on
this branch with a one-off `npx sharp-cli`, nothing added to the repo's
dependencies: 57 images (dishes plus the existing mezcal) now total
**3.8 MB**, ~67 KB each, visually identical at tile and detail size. The
ten PNGs committed earlier (#47, #50) were converted too, so the app
serves one format. For wave 2, make the generator write WebP directly
(or run the conversion in `generate-dish-images.mjs`) so this is never a
manual step again. The generator's PNG sources stay untracked in
`docs/design/prototypes/image-pilot/finals/`.
