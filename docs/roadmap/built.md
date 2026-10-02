# Built

Shipped features, newest first. Moved out of `priorities.md` on 2026-10-02 so
the open work is what you see there; this file is the changelog. Each entry
carries its date, the goal it serves (G1-G4 / Foundation, see
[`priorities.md`](priorities.md)) and the decisions worth remembering. Longer
specs for shipped features live in [`implemented/`](implemented/).

**When a feature ships:** add it here (newest first), remove its row from
`priorities.md`, and leave a one-line entry under "Recently shipped" there.



- **Flavor axis icons, the overview's flavor mark and lead chips, and a
  search that finds dishes** (2026-10-02, G1/G4, PR #66) — Nikita: the overview's radar should be
  icons in the axis colours, no labels, no sentence, no tap; the full
  fingerprint keeps all three and teaches the icons. Six stroke-only icons
  in `components/FlavorAxisIcon.tsx` (flame, half citrus, honey drop,
  steaming bowl, leaf, smoke off the ground), drawn on the [canvas's
  "Flavor icons" page](https://claude.ai/artifact/LXK84YzzCVr3xNYGevh6i4).
  `FlavorRadarChart` gained `labels="icons"`: vertices carry only the icon,
  nothing is tappable, the hint and the interpretation are left out, and the
  hexagon grows into the room the words used to take. Each icon sits a
  little further out along its axis so the hexagon's edge never touches it,
  and its **name rises above it in the axis colour with the spice sprinkle**
  on hover, or on a tap where there is no hover (Nikita, after the first
  cut: no native tooltip). The name sits on the side away from the chart
  (above the top vertex, below the bottom one, hanging outward beside the
  side ones) so it never crosses a hexagon edge. **One badge everywhere**
  (`.axis-badge`): a 17px mark on a 28px soft disc of its axis colour, the
  beside each name in the full fingerprint and on the personal radar.
  **Where the glance lives took three rounds** (the [canvas's "Flavor
  icons" page](https://claude.ai/artifact/LXK84YzzCVr3xNYGevh6i4) has each):
  a glance radar with icon-only vertices in the old card ("too much white
  space"), then a 180px glyph beside the sentence ("too cluttered"), then
  four alternatives drawn (stacked, a six-badge strip, three lead chips, a
  small mark) and Nikita's pick, a mix of the last two. **Shipped:** the
  overview's head is the name and capital on one line, the three strongest
  axes as small chips under it (`LeadChips`: badge + word, "Smoke/Earth"
  reads "Smoke"), and the fingerprint as a **64px mark** at the right
  (`components/explore/FlavorMark.tsx`): the hexagon with the cuisine's
  shape, three spokes, and a dot at each corner in its axis colour.
  Hovering or tapping a dot swells it into its badge in place, with the
  sprinkle; tapping the shape opens the full fingerprint, and so does "Full
  flavor fingerprint ›" under the sentence. The radar's icon-only glance
  mode was removed again; the full fingerprint is the only radar now. **Untouched
  by request:** the build view ("How it comes together") and the flavor
  matrix. **The map's search finds dishes as well as cuisines** (Nikita,
  same day): one field; matches list Cuisines, then up to 12 Dishes by name
  or English name across every country (`dishIndex()` built once), a dish
  row showing its country; picking a dish flies to the country and opens
  that dish's sheet. "Your cuisines" stays underneath when the field is
  empty. The tray is now titled "Search".
- **One verdict per dish: visits hidden, "Ate it again", an optional
  where line** (2026-10-02, G3/Foundation) — Nikita asked whether per-visit
  logging was worth keeping given restaurant tracking is a non-goal. Measured
  in `usePersonalFlavorProfile.ts`: visits only reach the profile as a
  fallback average when a dish has no verdict of its own, a 10% log-scaled
  frequency term, and a recency date the dish's own `updatedAt` already
  provides; the restaurant name is used nowhere. The inconsistency she hit:
  the first log was stars + thoughts, but "Log another visit" opened a
  different form with a date picker and a restaurant field. **Now:** one
  form every time. "Ate it again" (the dish sheet and the Want to try card)
  reopens the same How was it? prompt pre-filled; saving replaces the
  verdict and notes and stamps `updatedAt`. The prompt gained one optional
  **Where** line (`UserDish.where`, free text). The verdict box reads "Last
  had it Sep 28, 2026 · Casa Oaxaca". The Add a Try form, the Visits list
  and the per-visit stars are gone from the UI and `RestaurantTryForm.tsx`
  is deleted; `restaurantTries` stays in the data so old logs load and keep
  their fallback average. No migration. A one-tap spice reaction in the
  same prompt was offered as the one input that would sharpen spice
  tolerance; **Nikita declined it (2026-10-02)**, so it is not on the board.
- **Cleanup: the old pages and the Finder duplicates are gone; zoom buttons
  ride above the phone sheet** (2026-10-02, Foundation) — deleted the
  unrouted `Home.tsx` and `CountryDetail.tsx` (a follow-up owed since #41)
  and everything only they reached: the old `WorldMap`, `RegionMap`,
  `RegionalMap`, `MapLegend`, `CountryFinder`, `CountryCard`,
  `NextCountrySuggestions`, `DishSection`, `CountryHeader`, `RegionRail`,
  the slides, `CookingFlow`, `DishForm`, `StarRating`, `ViewToggle`,
  `useMediaQuery`, `countryHelpers`, `signatureDishes` (replaced by
  `useCountryRanking`), plus the nine Finder-style " 2" duplicate files that
  had been committed by accident (33 files, found by walking imports from
  `main.tsx`). Type check, lint and build pass; CLAUDE.md's key-files list
  points at Explore now. **Zoom buttons (#8's found item):** on a phone they
  sat under the half sheet; they now ride 12px above the sheet at strip and
  half and leave with the map at full, animating with the sheet. **Desktop
  panel flicker (Nikita's report, same day):** the panel is rebuilt per
  level and played a 220ms fade from transparent, so every region click
  showed the map through it for a few frames; the fade is gone and the
  panel switches outright (measured: opacity 1 on every frame).
- **Order well folds into Explore: the strip is personal, All dishes toggles
  Ranked / Region, and a search on the map replaces the Order well button
  and page (#42)** (2026-10-02, G1) — from Nikita's question "can Order well collapse
  into Explore?", brainstormed on the [Order well into Explore canvas](https://claude.ai/artifact/LXK84YzzCVr3xNYGevh6i4)
  (six options, then prototypes of her pick on its second page; notes in
  [`designs/order-well-into-explore.md`](designs/order-well-into-explore.md)).
  **What changed:** the overview's "Start with these" is now the top four
  of the personal ranking, the same scoring Order well uses (popularity, your
  verdicts, want-to-try, spice fit, diet preferences; `hooks/useCountryRanking.ts`
  wraps `orderRanking.ts`), with at most two from one category so the four
  still show the cuisine's range. Nothing on the tiles says so: no rank, no
  label, no reasons. One subtitle, **"Picked for your palate"**, is the only
  trace, and it reads "The dishes Mexico is known for" until something
  personal (a logged dish, a bookmark, a diet preference) has shaped the
  order. **All dishes** opens on **Ranked**, one flat grid of the same tiles
  with a small muted number before each name, and a two-way **Ranked /
  Region** toggle (`ArrangeToggle`) flips to today's region sections; drinks
  keep their strip either way and the dishes never change, only the order.
  **The dish sheet** gained one line, **"Why it's #3 for you · what locals
  actually order · matches your spice comfort"** (the top three reasons; the
  "you rated it" ones are dropped once the verdict box is showing), and its
  description is clamped to three lines on a phone with "Show more", so a
  typical dish fits a 390×844 screen without scrolling (measured: the sheet
  ends at 697–781px). Beside the toggle one quiet caption says what the
  order means: "picked for your palate" under Ranked (or "most loved first"
  for a cold user), "where each comes from" under Region. Ranking reasons
  lost their em dashes on the way. **Then, the same day, Order well itself
  (Nikita: "go to the replacing", then "remove the Order well button, we
  need a search in the map instead"):** the header button is gone; a
  **search button sits on the map beside the breadcrumb** and opens
  **"Find a cuisine"** (`components/explore/CuisinePicker.tsx`, in a Tray):
  a search field, your cuisines most recent first, then every cuisine by
  the map's eight regions. Picking one flies to the country with the sheet
  at half, so the four ranked dishes are in view as the map lands: two taps
  from cold. A menu name we don't match in All dishes shows "Nothing we
  know matches X, it may still be on the menu" with the existing AI lookup
  under it, so the lookup moved rather than died. `/restaurant` redirects
  to `/?find=1` (the search) and `/restaurant/:id` to `/?c=<id>`; old links
  keep working. **Deleted:** `pages/AtRestaurant.tsx`,
  `utils/orderGrouping.ts`, `components/DishBlurb.tsx`. **Map caps, same
  session (Nikita's screenshot of "Across Mexico" over "Oaxaca"):** the
  region caps never knew where the "Across {country}" pill or, on touch,
  the ring of nationwide plates around it were, so a cap could land under
  them. They are now neighbours like any plate: a cap steps aside from
  them, and a cap that can find no clear spot fades to transparent instead
  of sitting under something (the open region's own cap never fades). Verified at 390×844 touch and 1440×900 in
  headless Chromium with and without seeded personal data; on-device check
  by Nikita.
- **Explore map: dishes where they are from, calmer at every zoom**
  (2026-10-01, G2, PR #54) — a day of phone walkthroughs with Nikita, each
  decided on a canvas before it was built. **Country zoom** follows boards
  1 + 3 of the [China de-clutter canvas](https://claude.ai/artifact/8FwW5wA4mXKXXNCbra3gum):
  region names step back to small quiet caps while plates show, every plate
  stays where its dish is from, and where plates would overlap the most
  popular stays on top while the ones underneath fade and shrink (nudged
  only as far as a visible crescent; they spread back as you zoom in).
  Board 5's city stacks were built first and rejected on device. **"Across
  {country}"** (the [Across Egypt canvas](https://claude.ai/artifact/X5PVFZKbBAHzdTEYbubSRA)):
  nationwide dishes are a stack at sea that fans into a ring on hover, a
  label-pill flower on touch; culled as one unit so panning never re-fans
  it; CN and EG gained water points (without one a country's nationwide
  dishes were silently dropped). **World pins** are 1-3 per country by
  on-screen area (Egypt 1, Mexico 2, China 3), each a region's top dish at
  the exact spot it has at country zoom (the same cached placement), so
  zooming in never moves one; pins grow with zoom and hand over to the
  region plates. **Phone:** a sea tap returns to the world; the world view
  is a home framed on the 31 cuisines' land (no Antarctica on a tall
  screen); plate captions sit on a cream pill in a layer above the region
  names. **Bug found on the way:** a region dish with no clear spot was
  dropped from the map, which hid most of Mexico's and Egypt's region dishes
  on a phone; it now lands as depth. Prototypes in
  `docs/design/prototypes/{across-cluster,china-declutter}/`.
- **Content batch wave 1: Mexico, China, Egypt (#9, with #36 and #37's
  first three countries)** (2026-10-01, G1/G2, PR #54) — the sandbox
  trio re-scoped by Nikita from MX/CN/IE to MX/CN/EG; Ireland keeps its
  approved review for wave 2. **Mexico**: six regions (Western Mexico
  (Jalisco) added; Coastal Regions became Pacific Coast (Sinaloa & Baja);
  Veracruz is a locality, not a region), 19 dishes. **China**: Xinjiang
  (Northwest) became Northwest (Xinjiang & Gansu) so Lanzhou belongs
  honestly, cumin joined the tiers, 18 dishes, city localities. **Egypt**:
  `flavorAxes` on its ingredients (its regions show chips for the first
  time), 9 region-first dishes to 19, em dashes swept. Every item resolves
  to a region or an explicit Nationwide; every region holds 2+ dishes and
  shows chips. **`locality` folded into `origin.place`** (coordinates
  optional); the detail sheet reads "From Puebla · Central Mexico". Old
  `?r=` slugs redirect. **Images**: style C2 (bold ink and flat gouache,
  decided 2026-09-29), 47 generated on Nikita's go, **47 of 47 passed**
  review on the first try, every dish in the three countries illustrated;
  all dish images converted to **WebP** (57 files, 3.8 MB, from 60 MB of
  PNG; wave 2's generator should write WebP directly). Record:
  `designs/content-batch-wave1.md` §7-8.
- **Explore on a phone: six things Nikita hit on device** (2026-09-30,
  Foundation, part of #8's per-item checks) — (1) **No plate names on
  touch** at any zoom: with no hover every plate labelled itself at once and
  the names overlapped where dishes share a city (three Cairo plates); a tap
  opens the dish in the sheet, which names it. Desktop keeps hover-to-name.
  (2) **The filter tray ends in "Show N dishes"** (pinned footer, with
  "Clear all" beside it once filters are on): filters apply as you tap, so
  there was nothing to "apply", but the × read as cancel and tap-outside is
  invisible; the button names what you'll get. `Tray` gained a `footer`
  slot. (3) **Expand and contract are different icons** on the sheet header
  (arrows out at half, arrows in at full); both had been the expand glyph.
  (4) **The sheet scrolls at the half snap.** It was a full-height box
  translated down 48%, so its scroll box was taller than its content and
  the lower half hung off-screen; it's now positioned by its top edge, so
  the box is exactly the visible band at every snap. (5) **The sheet title
  keeps the country at region level**: "India · North" instead of "North",
  which alone said nothing once you were a level deep in Butter Chicken.
  The map breadcrumb already read World › India › North. (6) **The profile
  star is 22px** on the phone header; the 44px target was fine, the glyph
  inside it was 14px. **And one line of delight:** once you've logged
  anything, the strip's world-level hint reads "colouring in as you eat"
  (desktop: "Countries colour in as you eat through them"), the first place
  the app says what the map shading means.
- **Order well: the restaurant view decluttered (part of #42, pulled into
  MVP)** (2026-09-30, G1) — the primary-thesis screen, made scannable at a
  table. One name in all three places (the Home/Explore button, the cuisine
  picker, the list title): **"Order well"**, chosen by Nikita over "What to
  order" and "At a restaurant?". **The list:** each dish is one row in a
  single surface with hairlines: rank, name, pronunciation, and only your
  status (nothing, a bookmark, or ✓ ★n in the same marker Explore's tiles
  use). About 7 dishes per phone screen, up from 2. A tap opens the row in
  place with the dish shown the way Explore's detail shows it: illustration
  (or the tinted plate placeholder), "category · region", the tagline,
  toned text chips (heat terracotta, diet sage, the rest neutral), the full
  description, why it ranks here, then want to try / "+ I tried this" →
  rating / edit / delete. **No one-tap log button on the row**: a bare ✓
  read as a symbol without a sentence (Nikita), so every action lives in
  the opened row, matching #39. Drinks use the same rows; "Not on the menu?"
  moved to the bottom; menu search and the AI lookup are unchanged. **The
  picker:** rows grouped by the same eight culinary regions as Home, no
  per-card borders or arrows, "Your cuisines" (countries you've logged in,
  most recent first) on top, a soft search focus ring. Search still returns
  a flat list. **Also:** the screen scrolls to the top when the cuisine
  changes (the router had been keeping the picker's scroll offset). New
  `components/DishBlurb.tsx` (image + meta + tagline + chips + description,
  reusing Explore's `DishImage`); `UnifiedDishCard` gained a `bare` prop so
  the row can host its tried/rating machinery without card chrome.
  Verified at 390px headless; on-device check by Nikita.
- **Explore panel declutter (was #39)** (2026-09-29, G1/G2) — the Explore
  side panel (phone: bottom sheet) now follows the map's levels, built from
  the [Explore Declutter canvas](https://claude.ai/artifact/8ay856PGkaFfkxcwo8aRzm).
  Tested at 390×844 touch and 1440×900 in headless Chromium; **real-phone
  check still owed**.
  **Country = overview (1B):** one-line summary, a "Start with these" strip of
  4 signature dishes (rule-picked, food only, `utils/signatureDishes.ts`) with
  "See all N ›" in its header (the big pinned button was tried and removed),
  a compact flavor block, a dining-customs teaser. **Flavor fingerprint and
  Food culture open inside the panel** with a "‹ Country" back link, exactly
  like All dishes (the slide-over trays were removed from Explore), and share
  one visual language with the overview blocks (`components/explore/FlavorBits.tsx`):
  same card, small-caps labels, axis colours, and hollow axis-colour dots on
  both the mini and the full radar (the full radar shows them for every
  country now, and its axis reads "Smoke/Earth" like the bars).
  **All dishes:** always grouped by region, section headers are italic titles
  named exactly as on the map (`regionLabelName` everywhere); search and
  filters are two icon buttons; 2B tiles (image placeholder or real `image`,
  name, 2-line `tagline`, one status marker). **Food vs drinks (decided with
  Nikita after two canvas rounds):** regions hold food only and the list ends
  with a **"To drink in {Country}"** swipe strip (wraps on desktop), each drink
  labelled with where it's from; the filter tray gets a **"Food or drink"**
  group with just two chips (finer courses were tried and dropped as
  overcomplicated), drink sub-filters indented under Drinks; no blue tint on
  drinks, a glass outline instead.
  **Region:** title block (no card, no key-ingredients dropdown), food tiles,
  a "To drink here" strip, other regions; "‹ All dishes" goes back. **Dish
  detail** (side sheet desktop / bottom sheet phone) holds every action: want
  to try, I tried this → rating, verdict, edit, delete, log another visit.
  **Taglines** filled for MX, CN, IE only (sandbox rule).
  **"Elsewhere" is gone:** unambiguous origin mismatches fixed with aliases in
  `utils/dishRegion.ts` (US: Texas → Southwest, Louisiana/Kentucky → South,
  Buffalo NY → nationwide; ~20 more across IT, IN, PK, ID, MY, FR, GR, EG, NG,
  BR, PT); a "the"-prefix matching fix; remaining ambiguous ones (Paris,
  Madrid, Adana, Lesvos, Córdoba, and Japan and Peru which have no regions)
  sit under "Across {country}" and go to #9's region design step.
  **Map hover card:** a third line of three key ingredients ("Olive oil ·
  garlic · jamón ibérico", asides like "(pimentón)" stripped) and a combined
  "3 of 15 tried · 2 on your list" line that only shows when it applies.
  **Phone:** header is one row (compact "Order help" + icon-only profile);
  the country is framed above a half-height sheet; the sheet's ✕ and
  tap-open-map collapse from the day before still work; the filters tray now
  renders at `<body>` (it was trapped inside the transformed sheet and
  blocked taps).
  **Also in this batch, from the parallel image-pilot session:** the first
  six Mexico dish images (`public/dish-images/MX/`), dish plates floating on
  the Mexico map (`components/explore/MapPlates.tsx`, see the inbox item
  "Dish plates on the map"), `scripts/generate-dish-images.mjs` and its
  prompts (`docs/design/prompts/`), and two prototypes. The 27MB
  `docs/design/prototypes/image-pilot/` candidates were deliberately left out
  of git. **Follow-ups:** convert the dish PNGs (~1.5MB each) to WebP before
  real-phone use; delete the unrouted `Home.tsx` / `CountryDetail.tsx`;
  hand-curated signature dishes if the rule's picks disappoint.
  **Round two, 2026-09-30, from Nikita's phone and desktop testing.**
  *Dish plates on the map* (`utils/plateLayout.ts`, `MapPlates.tsx`): after
  several tries at budgets, nudges and stacks that all jittered, the rules
  that hold are the simplest ones: **every dish has one fixed spot forever**
  (its city; a spot beside its region's name if it has no city, chosen once;
  a slot in a tight row in open water for nationwide dishes), plates are
  always drawn there, overlap when cities are close (most popular on top) and
  separate as you zoom, **region names are drawn above the plates**, and
  visibility changes only at the screen edge and when the whole layer fades
  at world zoom. Nothing depends on the zoom level, so nothing can flicker.
  Drinks are on the map (Mezcal), the bob and shadow pulse stay (shadows off
  on phone), captions show on hover only, never on touch. **The list now
  agrees with the map:** a dish with a city but no written origin is filed
  under the nearest region (Pozole → Coastal, Tacos → Central).
  *Panel:* the collapsed desktop panel is a docked tab ("Central · 3 dishes ·
  Open") that stays collapsed while you explore the same country and reopens
  for a new country or a tapped plate; the dish detail opens **inside the
  panel** with a back link like Flavor and Culture (the sheet is gone).
  *Flavor fingerprint:* one interactive radar component in both the overview
  card (compact) and the full view, labels and dots always visible, the
  sprinkle plays on tap as well as hover, no bar list anywhere; the full view
  no longer scrolls sideways on a phone. *Borders:* the rounded variant was
  rejected (its three-way junctions read as triangles); the default is a
  faint hand-drawn wobble (`utils/softBorders.ts`). Still owed: a real-phone
  pass, and the dash pattern could be lighter.
  **Egypt joins the sandbox (2026-09-30, Nikita's ask):** all 15 Egyptian
  items got taglines, four dishes got city coordinates and illustrations in
  the frozen Mexico style (Koshari and Ful Medames at Cairo, Ta'ameya at
  Alexandria, Molokhia at Mansoura in the Delta), generated one run of four
  at about 2¢ each after Nikita's go and reviewed against the prompt file's
  checks. Sandbox is now MX, CN, IE and EG.
- **Two dish states, survey reconciliation, Explore as home (was #40, #34 + #6, #41)**
  (2026-09-29, G2/G3/Foundation) — three MVP build-order steps shipped as one
  PR, tested at 390px in headless Chromium; **real-phone check still owed**
  per the MVP "done means mobile-checked" rule.
  **#40: the heart is gone.** A dish has two states, want to try (bookmark)
  and tried with a verdict (✓ + stars). `FavoriteButton`, `useFavorites` and
  the `foodie-favorites` sync key are deleted. **Favorites is now derived**:
  the Want to try page gained a Favorites section of every 4–5★ dish
  (`dishVerdictRating`), so it can never disagree with ratings. The rating
  prompt's 5th star is titled "Love it". **Migration** (`utils/favoritesMigration.ts`),
  run once on load and on backup import: a heart on a logged dish is dropped
  (the verdict wins), a heart on a never-logged dish becomes tried at 5★; the
  legacy key is deleted after one read. Caught in testing: StrictMode's double
  effect clobbered the migrated dish with stale state, fixed by making the
  sync writes functional updates.
  **#34 + #6: the survey and your log agree.** A Love / Like / Nope answer logs
  the dish as tried (`source: 'survey'`, no stars) with a quiet "From your
  taste survey" line; "Haven't tried" logs nothing. **Each dish counts once in
  the profile**: a star verdict wins, else the survey answer at its existing
  half weight. Rating a survey dish updates its answer (5★ → Love, 3–4★ →
  Like, 1–2★ → Nope; the later edit wins). **Decided:** survey dishes count
  toward progress plates at full weight, and a Love does **not** become 5★
  (three buttons aren't a star rating, and 5★ now means favorite). Reconcile
  is idempotent, keyed on (country, dish or English name), safe across two
  synced devices; deleting a survey dish clears its answer so it can't
  reappear. **#6:** "Your survey answers" in the profile, grouped by country,
  Love / Like / Nope / Haven't tried / Clear, 44px targets.
  **`useLocalStorage` now keeps every hook on one key in sync within a tab**
  (per-key write event plus a last-written comparison to stop echoes). Before,
  a survey answer never reached the always-mounted profile panel, and a stale
  copy could overwrite newer data on its next write.
  **#41: Explore is `/`.** `/explore` and `/country/:id?region=` redirect to
  `/?c=&r=`, so old links and bookmarks land on the same view; in-app links
  use `utils/countryPath.ts`. Explore's header gained the "🍽 At a
  restaurant?" button and the Want to try bookmark that only Home had.
  **Follow-ups:** delete the unrouted `Home.tsx` and `CountryDetail.tsx`
  (plus Home-only components) after the phone check; the Want to try header
  still says "0 dishes saved" when only Favorites has content (#39); the
  restaurant ranking ignores Love vs Nope on unrated survey dishes (#42); the
  profile's "Log N more dishes" count ignores survey answers.
- **Menu-item lookup (was #3)** (2026-08-29, G1) — code shipped; **needs a
  one-time deploy** (docs/supabase-setup.md § 4: run the migration, set the
  `ANTHROPIC_API_KEY` secret, `supabase functions deploy menu-lookup`, and set
  the Anthropic Console monthly spend limit). On the at-the-restaurant search,
  a miss shows **"Ask about 'X' →"**; one call to `claude-haiku-4-5` with a
  structured-output schema returns a card labelled **AI-generated**: name,
  description (≤150 chars), likely ingredients, spice, dietary, and a
  confidence flag ("Not confident this is a real dish, ask your server").
  **Save to my dishes** creates a `UserDish` with `source: 'lookup'` and the
  guess in its notes. Guardrails, cheapest first: cache by (country, name);
  per-caller daily cap (3 anonymous by IP, 20 signed in) shown in the UI as
  "N lookups left today / sign in for more"; global monthly cap of 2,000; and
  the Console spend limit as backstop. Unrated lookup dishes are excluded from
  the flavor profile until the diner rates them. Hidden entirely when cloud
  sync isn't configured. **Deployed and verified live 2026-08-29** (cache
  hit, decrementing count, 3/day cap). **Follow-ups the same day:** a category
  ("casserole") is told apart from a dish, with the specific dishes it usually
  means in that country listed as plain text and the most likely one saved;
  and the country page's **Add a dish form has "✦ Fill in with AI"**, which
  drafts name, notes (description + likely ingredients) and food/drink kind
  from the same lookup, all editable, marked `source: 'lookup'`. Warm calls
  ~4s; cold starts after a deploy can take a minute.
- **Focused region with no dishes (was #24)** (2026-08-29, Foundation) —
  verified on Brazil's Gaúcho Country: the focused region card (description,
  key ingredients, "0 dishes") renders with a quiet "No dishes recorded from
  this region yet." beneath it; the page-wide "Nothing matches these filters"
  no longer fires for an empty focused region. The diagnosed
  `nothingMatches` short-circuit had already been fixed in the unified page
  work. Added while checking: a region's parenthetical name is a valid URL
  slug too, so `?region=gaucho-country` and `?region=the-south` both focus
  "The South (Gaúcho Country)".
- **Card descriptions read in full (was #33)** (2026-08-29, Foundation) —
  measured before changing anything: on a 324px phone card, descriptions run
  173-238 characters and need 4-5 lines at 14px and the *same* 4-5 at 13px,
  so a smaller size bought nothing and the 3-line clamp clipped every card.
  The clamp is now five lines at 14px: every current description fits, the
  "Show more" control disappears in practice, cards grow ~2 lines. Content
  rule for #9: keep new descriptions around 150 characters so they fit in
  four.
- **Fingerprint + food culture pull-outs** (2026-08-05, G1, was #31) — the
  flavor fingerprint and the culture writing were disclosures at the bottom of
  the country page, which hid the "learn the spices while I eat" half of the
  thesis on the one screen it matters. They are now **trays**: two pills under
  the country title ("✦ Flavor fingerprint", "📖 Food culture") open a
  `Tray` — a **bottom sheet on a phone**, a **right slide-over on desktop** —
  holding the radar + ingredient build, and meal structure / customs /
  influences / similar cuisines respectively. The page content stays put; you
  pull the tray out and push it back. The teaser's "All of {country} →" opens
  the same tray instead of scrolling to a section. The bottom disclosures are
  gone, so each has one home. `Tray` is reusable; the culture markup moved into
  `FoodCultureSection`.
- **Chrome consistency + faster path to the food** (2026-08-05, Foundation/G1) —
  a batch of polish from a walkthrough. **One `AppBar`** on every page: the
  wordmark is one fixed size at one position (24px; x=80 desktop, 16px phone)
  where before three sizes and four container widths made each page read as
  its own app; page titles align under the logo. **Header slimmed**: the
  Wishlist text link is now the same bookmark icon as on the cards, with a
  count. **Want to try rebuilt** on the country page's own `EntryGrid` cards
  and section headers, grouped by country, saved drinks included; the custom
  `WishlistCard`, `ListControls` and `useCountryListFilter` are gone.
  **Progress plate tooltip** is a styled hover/focus label ("4 of 10 dishes
  tried") instead of the browser's delayed `title`. **The Americas leads the
  region order** (umbrella before sub-region). **Region map folds away**: a
  `RegionRail` of region chips with counts is always present; the map (now
  half its former height) shows until a region is focused or any filter is
  applied, then collapses behind a Map toggle — the dishes start one row down
  instead of a screen down. The duplicate "📍 region ×" chip left the filter
  rail; "Clear all" still drops focus. **Region bubbles** are bigger with 13px
  labels. **Filter chips are tinted by family (was #32)** (dietary sage, spice saffron,
  popularity terracotta, drinks grey-blue; view chips neutral) rather than
  grouped: active chips sort to the front, which scatters any grouping, so the
  family has to travel with the chip. **Then the page top was reorganized**
  (prototype "Sample A" of three, artifact 411d1d45): the cuisine summary and
  the three loudest flavor-axis chips moved into the header beside the tray
  pills, so the header is the intro; the "All of {country} →" teaser is gone;
  the toolbar is search · **Filters** (a grouped tray: Mine / Diet / Spice /
  Ordering / Drinks, with a count badge) · Grouped by; filter chips render
  only when active; the region map is a toggle, closed by default. **Region
  map auto-fits** every country to its frame via d3 `fitExtent` (no more
  hand-tuned center/scale), bubbles keep a constant size while zooming, and
  trackpad pinch works (the library was dropping ctrlKey wheel events).
- **At-the-restaurant phone pass** (2026-08-05, G1, was #27) — the primary
  thesis screen made genuinely usable at 390px. **Decided: a scoped exception
  to the mobile audit (#8)** for this one view, because it's the single screen
  where being bad on a phone means the app fails at its main job; the audit
  still waits for the MVP gate for everything else. Measured before touching
  code: no horizontal overflow, no errors, but 50 controls under a 40px hit
  area. Fixes, all as `md:` breakpoints on shared markup rather than a mobile
  branch: a `.tap` utility (`index.css`) gives text-style controls a 40px-tall
  hit area below `md` via padding cancelled by negative margin, so layout
  doesn't move; favorite/want-to-try corner buttons are 40px below `md`, 32px
  above; the pencil/trash icons get real 40px size on phone (a delete must not
  share its hit area with the edit beside it); the menu search box is taller.
  The grouping half of the note had already shipped as #28. **Chips grew
  labels on phone**: the one-tint chip system relies on tooltips for meaning,
  and touch has no tooltips, so 📍/📷 read "Local favorite" / "Tourist classic"
  below `md` and stay icon-only above. Because the fixes live in
  `UnifiedDishCard`, `FavoriteButton`, `WantToTryButton`, `ExpandableText` and
  `dishChips`, the country page cards got the same treatment for free.
  **"Change cuisine" left the header**: it crowded the wordmark on a phone, and
  the header is app chrome, not this screen's. A tappable country name was tried
  and rejected as unintuitive; it's now an explicit "← All cuisines" link
  above the title, inside the section.
  Still unverified on a real device: the chip rail's edge fade and map bubble
  taps while zoomed (carried in the #8 audit).

- **Region map on mobile** (2026-08-23, G2) — the phone has a map again. It
  opens on **eight culinary regions**, not countries: 31 countries at 390px are
  a few pixels each, so the top level is something a thumb can hit. Tap a region
  and the projection zooms to it, its countries color by how much you've
  explored them, and the rest of the world stays visible but recedes.
  **The regions are grouped by flavor, not by landmass.** Measured across the
  six flavor axes, a random pair of the 31 countries sits 5.84 apart; continents
  score badly against that (Africa as one group is 6.48 — worse than random)
  while all eight regions here beat it, the tightest being Morocco through the
  Caucasus at 3.66. The Americas are discontiguous on purpose: USA + Brazil +
  Argentina is the tightest cluster in the data at 2.31, but Mexico and the
  Caribbean sit between them and are chile-forward, so they're their own region.
  Working: `designs/flavor-geography.md`.
  **Touch replaces hover.** The world map's preview card fires on
  `onMouseEnter`, which is the real reason it was desktop-only — a phone tap
  navigated away before you could read the dish counts. Here a tap *previews*
  (name, how much explored) and only the Open button commits, so the first tap
  tells you what's there and the second one takes you.
  Desktop keeps the world map: its job is comparison, and the flavor-match
  layer coloring all 31 at once only works when everything is visible together.
  New `data/culinaryRegions.ts` (with a dev-time check that every country lands
  in exactly one region) and `components/map/RegionMap.tsx`, reusing
  `countryMapConfig` centers rather than a second coordinate table.
  Prototype: `continent-region-map.html`.
  **Follow-up the same day:** the desktop grid and its jump chips now use these
  same eight regions instead of continents, in declared order rather than
  alphabetical. One vocabulary across the app — a chip reading "Southeast Asia"
  leads to a section by that name, and tapping a region on a phone map doesn't
  land somewhere organised by a different idea. `CULINARY_REGIONS` is now the
  single source for how countries are grouped anywhere on the home page.
  Also that day, from testing on a real phone: the map was cropped to drop
  Antarctica (Mercator stretches the poles, so fitting it spent roughly a third
  of the screen on ice — the frame now runs 63°S to 75°N and fills its
  container), and **four "coming soon" regions were added** for the parts of the
  world we hold no cuisines for: Canada & the North, Northern Europe, Russia &
  Central Asia, Oceania. They're drawn and labelled but dimmed and not tappable,
  and never appear as grid sections or jump chips. A map that silently omits
  Canada and Russia reads as broken; one that labels them as gaps reads as
  incomplete, which is the truth. `STOCKED_REGIONS` is the filtered list the
  grid and chips use.
  **Region chips now drive the map.** A chip means "take me to this region",
  and what that means depends on what you're looking at: in the grid it scrolls
  to that section, and **in map view it zooms the map** rather than throwing you
  into the grid to answer a map question. The chip shows as active while the map
  is focused there, and clicking it again zooms back out; the desktop map also
  gains a "Whole world" affordance. Map focus is one piece of page state driving
  both maps, so `WorldMap` and `RegionMap` are now controlled by the same value.
- **Find a country on the home page** (2026-08-23, G2) — a search field and a
  rail of continent chips above the country grid. Search matches name, capital,
  continent and sub-region, so "west africa", "Dublin" and "Peru" all work, and
  shows an *n of 31* count while active. The chips are a **jump, not a filter**:
  tapping one scrolls that continent's section into view and leaves the rest of
  the world below it, since filtering to one continent is the opposite of what
  a page about exploring cuisines should do. Typing switches to grid from the
  map view (results are a list either way) without touching the stored view
  preference, and the "what to try next" module hides while searching, being
  noise when you're looking for something specific.
  **Also the phone's answer to having no world map.** The map stays desktop-only
  on purpose: its preview card is driven by `onMouseEnter`, which a phone has no
  equivalent for, so a tap navigates away and the dish counts and flavor-match
  percentage are unreachable — and 31 countries at 390px are a few pixels each.
  But hiding it cost the thesis idea of *where cuisines sit in relation to each
  other* entirely on mobile, and continent chips put that back in a form a thumb
  can use. New `components/CountryFinder.tsx`, reusing the `.chip-rail`
  treatment from #26.
- **Filters as one chip rail** (2026-08-23, Foundation) — the country page's
  gear-and-drawer is gone. Every filter is now a chip in a single row and
  **active chips sort to the front**, so what's narrowing the list is the first
  thing you read. That also deletes the separate "Showing" summary row, which
  had been restating the active filters *underneath* a line about grouping —
  three rows of controls before a single dish, and state arriving after
  chrome. Filtering went from three taps (open drawer, tap, close) to one.
  **Phone and desktop run the same markup**, differing in one declaration: the
  rail is `overflow-x: auto` with a right-edge fade below `md` and
  `flex-wrap` above it, where the width exists to just show everything. That
  was a deliberate choice against a JavaScript `isMobile` branch — the codebase
  has exactly one of those (the home map, which genuinely cannot render at
  390px) and every other responsive decision is a CSS breakpoint on shared
  markup. The All/Tried/Want segmented control folded into the rail as Tried
  and Want chips ("All" is simply neither pressed), and grouping stayed a quiet
  text dropdown next to the search field, deliberately not chip-shaped, since
  it changes how the list is arranged and never which dishes are in it.
  Prototype: `filter-layouts.html` (four options at 390px).
- **Hand cursor on every control** (2026-08-23, Foundation) — Tailwind v4's
  preflight stopped putting `cursor: pointer` on `<button>`, and the app only
  got the hand from three opt-in classes (`card-interactive`,
  `card-interactive-sm`, `btn-press`). 15 component files had buttons wearing
  none of them — the Taste Profile button, star ratings, favorite and wishlist
  buttons, the lens and filter controls — so they read as decoration rather
  than controls. One rule in `index.css` now covers `button`, `summary`,
  `label[for]` and the `role="button" | menuitem | menuitemradio | tab`
  elements, which means components written from here on get it for free.
  Disabled and `aria-disabled` controls keep the default arrow on purpose: a
  hand on a dead control promises something that won't happen. Map markers
  already set the cursor inline, so nothing was missed there.
- **Unified country page** (2026-08-21, G1/G2) — the three-tab carousel is gone.
  The country page is now one list of everything you can eat and drink there,
  grouped by a lens you pick (Region or Type). Section headers stay
  quiet — name and count — until you **focus** a region from the header or a map
  bubble, which opens its full description, derived flavor chips and key
  ingredients, and narrows the list to it. Focus lives in the URL
  (`?region=sichuan`), so the phone back gesture returns to the list instead of
  leaving the page and a region view can be linked to — the app's first
  deep-linkable state. Flavor (radar + ingredient pyramid) and food culture keep
  a home as disclosures below the list.
  **The join that made it viable:** `utils/dishRegion.ts` reads a region's name
  as a set of aliases (`"Northern China (Beijing & Shandong)"` also answers to
  "beijing"), splitting on `&`, `,` and `/` in both the main name and any
  parenthetical, plus a small per-country alias table. That took dish→region
  from 8/15 to 13/15 on China, 1/13 to 4/13 on Mexico, and **0/15 to 12/15 on
  Ireland**, with no data edits. "Nationwide" is a first-class outcome rather
  than a failure, and an origin we can't match lands in "Elsewhere" instead of
  vanishing. Replaces two divergent `detectRegion` copies.
  New: `utils/dishRegion.ts`, `utils/groupDishes.ts`, `hooks/useDishFilters.ts`,
  `components/country-detail/{LensControls,DishSection,EntryGrid}.tsx`,
  `components/map/RegionalMap.tsx`, `data/regionMapConfig.ts`.
  Deleted: `components/carousel/*` (273 lines), the `embla-carousel-react`
  dependency, `EatDrinkSlide` (516), `CultureRegionsSlide` (647), and the
  `h-[920px]` cage that forced every tab to scroll inside a box.
  Prototypes: `unified-country-page-prototypes.html`,
  `unified-country-density.html`, `quiet-cards-variants.html`.
  **Polish pass (same day).** Grouping and filtering stopped sharing a visual
  language: All / Tried / Want is the prominent segmented control because it
  changes *what* you see, while "Grouped by Region ▾" is a quiet dropdown you set
  rarely. That also fixed a real bug — "Tried" and "All" each appeared twice on
  screen meaning different things — and the grouping options are now only Region
  and Type, since a third "no grouping" choice just undid the other two. Whatever
  is narrowing the list shows as removable chips under the controls, so the
  region focus stays visible with the filter drawer shut. Region focus became a
  filter applied *before* grouping, which fixed a blank page when switching to
  Type with a region selected. The map is taller, squarer and pinch/scroll
  zoomable with smaller bubbles so Beijing and Shanghai stop colliding. A
  `CuisineTeaser` under the summary shows the top three flavor axes and opens the
  full fingerprint, so the first screen hints the page teaches something. Removed:
  the radar's Recharts tooltip, which fired on the polygon vertices and competed
  with the axis-label hover, and the ingredient pyramid's per-tier prose.
- **Taste profile backup + cloud sync** (2026-08-20, Foundation) — the app went
  live on Vercel, which created a real problem: logging a dish on your phone at
  a restaurant and reviewing it on desktop meant two localStorage stores that
  silently diverge. Two layers shipped in one pass. **Backup** (no account, works
  now): Export / Import buttons in a new "Account & data" section on `/profile`
  write the whole profile to a dated JSON file; import validates the payload,
  whitelists known keys, and confirms with current counts before overwriting.
  **Cloud sync** (dormant until credentials are set): Supabase magic-link email
  auth plus whole-profile sync — pushed ~1.5s after the last edit, pulled on
  sign-in and on tab focus. Five keys sync; `foodie-map-layer` and
  `foodie-view-mode` deliberately don't (per-device view prefs). First sign-in
  merges *upward* so local data seeds an empty cloud row rather than being wiped
  by it. No call sites changed — everything already flowed through
  `useLocalStorage`, which now also re-reads on an external-change event.
  supabase-js tree-shakes out entirely when unconfigured (1.28MB vs 1.50MB), so
  it costs nothing until switched on. Known limit: last-write-wins on the whole
  document; simultaneous edits on two devices lose the earlier save. Setup:
  `docs/supabase-setup.md`. Files: `data/syncKeys.ts`, `utils/dataTransfer.ts`,
  `lib/supabase.ts`, `hooks/useCloudSync.ts`, `components/AccountPanel.tsx`.
- **Deployed to Vercel** (2026-08-20, Foundation) — live at
  `foodie-henna-one.vercel.app`, auto-deploying from `main` with preview URLs per
  PR. Root Directory `apps/web`; `vercel.json` SPA rewrite so `/country/:id` and
  `/restaurant` survive direct visits and refreshes; brand plate-dot favicon
  replacing the dead `/vite.svg` reference; `.npmrc` with `legacy-peer-deps`
  because react-simple-maps 3.0.0 pins a React 16/17/18 peer range and has no
  stable React 19 release, which only surfaced on Vercel's clean `npm ci`.
- **Next-country suggestions + visual identity round** (2026-08-05, G2/Foundation) —
  "Where next, by your taste" strip on the Home grid (top 3 flavor-matched
  unexplored countries with match % and driver axes). Plus the big coherence
  pass: explored map owns the terracotta depth ramp (beige unexplored, sage
  Available, burnt-terracotta outlines on logged countries), flavor match went
  warm-slate→ink with soft slate outlines, layer toggles wear their map's
  color; one-tint sage chip system with squared corners across Eat & Drink /
  restaurant view / region panels; filters collapsed into a ⚙ drawer with
  labeled groups (badge shows active count); tried-section decluttered (✓ +
  stars + n tries; cancel on first prompt un-logs, ☆ Rate it nudge); Flavor-tab
  bold heading style swept across all tabs; "In practice" wraps; em dashes
  removed from the sandbox trio; Ireland (IE) wired into Culture & Regions and
  fully flavorAxes-mapped. Prototypes: map-palette, filter-grouping,
  eat-drink-declutter.
- **At-the-restaurant view + food preferences** (2026-08-05, G1/G3) — the
  thesis headline: "🍽 At a restaurant?" entry on Home → `/restaurant` cuisine
  picker (search by name or flavor word) → ranked what-to-order list. V1
  ranking (`utils/orderRanking.ts`): own verdicts > local favorites > loved-by-
  all > tourist classics, wishlist boost, spice fit; every card shows a
  why-this line, pronunciation, compact chips, and full logging ("+ I tried
  this" → star prompt). **Food preferences** shipped alongside: editable
  section in the taste profile (`foodie-diet-prefs`) — Vegetarian / Vegan /
  Pescatarian / Gluten-free / Dairy-free (Off/Prefer/Only), red meat, spice
  zone, free-text notes — feeding the ranking ("Prefer" nudges, "Only" sinks).
  Pescatarian/red-meat detection is keyword-based until the content batch adds
  protein tags (noted in #10). Also: 🍰 Dessert filter + card chip; chip
  helpers extracted to shared `dishChips.tsx`.
- **Progress plates** (2026-08-05, G2) — % of popular dishes tried, as the
  logo mark (prototype variant G: solid flag-color center, lighter outer plate
  fills as a pie, thin outline). One-dot rule on all three surfaces: country
  cards, country page header, map hover card show a small flag dot when
  unexplored that grows into the progress plate once dishes are logged.
  `ProgressPlate` component + `utils/dishProgress.ts`. Bonus in the same
  round: "+ I tried this" flows straight into the star-rating prompt.
  Prototypes: `docs/design/prototypes/progress-plate-prototypes.html`.
- **Plate dots replace card emojis** (2026-08-05, G1/Foundation) — the big
  category emoji on Eat & Drink cards replaced by the brand plate dot
  (`PlateDot`, extracted from WordmarkDot) colored by category
  (`data/categoryMeta.ts`). Filter-chip emoji and the chili scale stay.
  Supersedes the older Tier 3 "plate marks" idea. Evolves into #10
  (dominant-flavor colors) once per-dish flavor data exists.
- **Ingredients & Spices redesign — component phase** (2026-08-05, G1/G4) —
  "How it comes together" tile: build view (tiers as cooking-order layers,
  axis-colored chips, cooking-flow sequence strip folded in), Flavor matrix
  toggle (ingredients × 6 axes dot table), and seasoned-plate clickable radar
  axis labels → driver-ingredient panel. `flavorAxes` schema on
  `TieredIngredient`; Mexico + China (later + Ireland) hand-mapped as the iteration sandbox.
  Remaining 28 countries ride the MVP-gate content batch (#12). Similar
  Cuisines moved to Culture & Regions in the same pass. Prototypes:
  `docs/design/prototypes/ingredient-display-prototypes.html`,
  `radar-label-prototypes.html`.
- **Local-favorite / tourist-classic tags + filters** (2026-08-05, G1) —
  📍/📷 chips on dish cards (`popularity` data; "both" untagged) with strict
  filter toggles; "+ Add my own" moved to a ghost card at the end of the grid.
- **Dish chip cleanup + dietary/spice filters** (2026-08-05, G1) — chips
  reduced to the filterable set (spice with chili count, dietary); difficulty
  removed; region/category/street-food into the meta line; shared filter row
  across Food/Drinks (Tried/Want, Veg/Vegan/GF, segmented spice scale, drink
  type + hot/cold).
- **"How it's cooked" heading fix** (2026-08-05, Foundation).
- Earlier, unnumbered: flavor-match map layer (G2), taste survey (G3), cuisine
  similarity section (G2), verdict rating model (Foundation), drinks section
  (G1), hover system (Foundation), 30-country data set (Foundation).
