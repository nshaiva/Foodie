# Feature Priorities

Ranked backlog + idea inbox, updated 2026-08-05. This is the single roadmap
document (the old `features/icebox.md` was merged in). Ranking criteria:
alignment with the **product thesis** (see CLAUDE.md) and impact on the core
loop (**explore → log → taste profile → better exploration**) vs. build effort.
New ideas land in the **Inbox** section at the bottom (via `/idea` or by hand)
and get ranked into a tier during roadmap reviews. When a feature ships it
moves to **Built** and the remaining items are renumbered in order.

Items within each tier are grouped by the goal they serve:

| Goal | Theme (from the thesis) |
|---|---|
| **G1 🍽 Order & learn at the table** | *Primary* — "I'm at a restaurant trying a new cuisine, what do I order?" + learn the spices and food I'm eating |
| **G2 🗺 Track & explore world cuisines** | *Secondary* — trying / want-to-try / haven't-tried; where cuisines sit in the world; how similar they are to what I've eaten |
| **G3 ✦ Know my own palate** | *Tertiary* — flavor fingerprint, spice affinity, self-knowledge |
| **G4 📖 Cultural depth** | *Quaternary* — history, customs, regions beyond the plate |
| **Foundation** | Serves the app itself (polish, infra) rather than one goal |

---

## Built

Shipped features, newest first. Tier 1 is fully shipped; current work starts
at Tier 2.

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

---

## Tier 2 — Next (the good medium-sized ones)

### G1 🍽 Order & learn at the table

| # | Feature | Why | Effort |
|---|---------|-----|--------|

### G2 🗺 Track & explore world cuisines

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 1 | **Dish twins** | "Khachapuri is Georgia's answer to pizza" — pre-generatable content (rides the #9 batch), great for discovery; pairs with similar-cuisines section. | M (mostly content) |
| 2 | **Dish ↔ region cross-linking + regions-explored progress** | Expanded 2026-08-05: better connect Eat & Drink to Culture & Regions. Three parts: (a) **dish → region**: the region in a dish's meta line ("Puebla · Main") becomes tappable, jumping to the Culture & Regions tab with that region selected; (b) **region → dishes**: a region's detail panel shows its signature dishes with tried-state, each tapping back to the dish card; (c) **explored progress**: light up regions you've logged dishes from on the regional map. Design pass needed before build — sketch the navigation flow first. Caveat: dish→region matching via `regionalOrigin`/`detectRegion()` is fuzzy; must tolerate unmapped dishes. | M–L |

### G3 ✦ Know my own palate

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 3 | **Custom-dish AI enrichment (Claude API)** | From notes: auto-populate description/traits/spice when adding a custom dish — richer data feeding the palate profile. **Discussed 2026-08-05:** cost is a non-issue at personal scale (~$0.002/dish with Haiku ≈ $0.60/mo at 10/day; Haiku is sufficient for this task). Build v1 as **bring-your-own-key** (Nikita pastes her key in a settings panel, stored in localStorage, browser-direct calls) with a simple daily counter as a runaway-bug guard only. **If the app is published publicly:** move the key into a Vercel serverless proxy with per-visitor daily caps + a global monthly budget kill-switch + locked-down prompt shape; optionally keep BYO-key as the unlimited tier. Prompt/UI unchanged either way — only where the key lives. | M |
| 4 | **Personal spice affinity map** | Added 2026-08-05 from discussion. Which spices is Nikita actually drawn to, beyond the 6-axis flavor profile? **Plan:** (1) pre-generate `keySpices` per dish for all ~300 dishes — rides in the consolidated MVP-gate content batch (#9); (2) normalize into a curated ontology of ~15 spice families (chiles, warm spices, alliums, souring agents, fermented, herbs…); (3) score with **cross-cuisine repetition** (a spice recurring in loved dishes across unrelated cuisines = real signal) + **frequency weighting** (TF-IDF-style — distinctive spices score, garlic doesn't); survey answers count as signal too; (4) visualize as a D3 force layout — spice families as clusters, bubbles sized by affinity. **Research task at build time:** spice science — terpenes / shared aroma-compound data (food-pairing theory) to draw connections *between* spices ("you like citrusy terpenes: coriander, lemongrass, sichuan pepper share them"). Needs ~15–20 rated dishes before patterns beat noise. Supersedes the personal half of #18. | M–L |
| 5 | **Survey familiarity weighting** | Moved from Tier 1 to bottom of Tier 2 (2026-08-05). Nikita's trust issue: "I know Indian food better so I could be more picky." **Decided: direct question.** First time a country appears in the survey, ask "How well do you know this cuisine?" (barely / somewhat / very well) → stored per country (`foodie-cuisine-familiarity`), scales that country's answer weights (~0.5× / 1× / 1.5×) in the profile hook. Asked once per country, pre-filled on retake. Later option: show familiarity as confidence/opacity on the radar. | M |
| 6 | **Edit taste-survey answers** | Added 2026-08-05, ranked near the end of Tier 2. An easy place to review and change past survey answers (Love/Like/Nope per dish) instead of only retaking the deck. Likely a list view inside the Taste Profile slide-over: answered dishes grouped by country, tap to flip the sentiment or clear it. Pairs naturally with #5 (familiarity weighting), which also lives in survey answers — consider building the two together. | S |
| 7 | **Card plate dots → dominant-flavor colors** | Added 2026-08-05, end of Tier 2 by design. Evolve the shipped plate dots: the dot on each dish/drink card stops encoding *category* and instead takes the color of the dish's **dominant flavor axis** (heat, acidity, sweet, umami, aromatic, smoke/earth — the same fixed axis colors as the Flavor tab's build view, matrix, and radar, from `flavorAxisMeta.ts`). One color language across the whole country page: glance at a card, know what the dish mostly tastes like. **Prereq:** per-dish dominant-axis data — falls out of the #9 content batch, so build after it runs. Category colors (`categoryMeta.ts`) are the interim; category info stays in the card's meta line. | S (once data exists) |

### Foundation — MVP gate (do last in Tier 2)

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 8 | **Mobile audit** | Moved from Tier 1 (2026-08-05): UI is still churning heavily, so a full audit now would be redone feature by feature. **Decided: run once as the MVP gate** — after all other Tier 2 features are built. Pass over the key surfaces — country page (all 3 tabs), Eat & Drink cards + filters, taste survey, profile slide-over, at-the-restaurant view — and make each genuinely good on a phone (touch targets, layout, no hover-dependent affordances). The home map stays desktop-only (grid view covers mobile). Interim rule: build new features mobile-aware so this is a polish pass, not a rebuild. | M |
| 9 | **Full-country content batch (30 countries)** | Added 2026-08-05. **Decided: don't generate for all countries until the schemas/UI stop moving** — iterate on the sandbox trio, Mexico + China + Ireland (hand-mapped), only, then run one consolidated batch at the MVP gate, alongside the mobile audit. The carpool by then likely includes: `flavorAxes` for the remaining non-sandbox countries (see Built: ingredients redesign), per-dish `keySpices` + dominant flavor axis (#4, #7, per-dish match, the shipped at-the-restaurant scoring), and optionally dish twins (#1) + why-dish-exists (#19). One pass per country instead of five separate runs; generation prompt carries the no-em-dash rule (#10). Cost estimate before launching. | Content batch (~30 agents) |

### Foundation

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 10 | **Remove all em dashes from text** | Small UI copy fix (added 2026-08-05): sweep UI strings and the generated country/dish content for "—", replace with commas/periods/colons as reads best. Mostly a find-and-rewrite pass over `data/countries/*.ts` prose + component copy; add to the content-generation prompt guidelines so future batches don't reintroduce them. | S |

## Tier 3 — Later (bigger or lower-leverage)

### G1 🍽 Order & learn at the table

| # | Feature | Notes |
|---|---------|-------|
| 11 | **Personalized dish recommendations** | "6–8 dishes per country for you" + "what should I try next?" — both icebox recommendation ideas, one engine; the delivery surface — the at-the-restaurant view — is shipped (see Built). Survey + profile may already cover 80% of the input side. The conversational **Food Preference Discovery** (Claude interview about textures, ingredients, aversions) is the deluxe input path — evaluate after familiarity weighting (#5) ships. |

### G2 🗺 Track & explore world cuisines

| # | Feature | Notes |
|---|---------|-------|
| 12 | **Cuisine passport / badges / streaks** | Confirmed Tier 3 (2026-08-05): gamification isn't relevant right now — progress plates (shipped, see Built) cover the satisfying part. Revisit after plates ship, and skeptically (streaks punish normal eating habits in a personal diary). |
| 13 | **City-level data** | Restaurants by city, not just country. De-prioritized further since the standalone Restaurants section was cut. |
| 14 | **Log-from-map flow** | Demoted from Tier 2 (2026-08-05): the Eat & Drink "+ I tried this" flow is already fast, so the saved friction is ~2 clicks — possibly icebox material. Cheap alternative worth doing instead someday: deep-link the map hover card straight to the Eat & Drink tab. |

### G3 ✦ Know my own palate

| # | Feature | Notes |
|---|---------|-------|
| 15 | **Stats dashboard / annual recap** | Fun once there's more logged data. Folds in icebox items: rating distribution ("tough critic or generous rater?"), exploration trends graph, food-journey heat map. Natural trigger: build the recap in **December** with a year of data. |
| 16 | **Ingredient discovery** | Track new-to-you ingredients encountered as you log. Needs an ingredient⇄dish mapping to be meaningful — the #4 `keySpices` data is a head start. |
| 17 | **Shareable taste-profile cards** | Added 2026-08-05. Quick shareable link (or image) rendering a pretty visual card: "my favorite dishes in this cuisine," "my taste profile + favorite countries," etc. One-way share-out of data the app already has (favorites, verdict ratings, flavor radar) — no accounts, feeds, or two-way anything, which is how it stays on the right side of the social/sharing non-goal in the thesis. Link form needs somewhere for data to live (#22 Supabase) or state encoded in the URL; a rendered-image export could ship without either. |

### G4 📖 Cultural depth

| # | Feature | Notes |
|---|---------|-------|
| 18 | **Regional flavor profiles + cross-region similarity** | Group each region's key spices into a categorized flavor profile, and "this region tastes like {other country}'s {region}". Deepens Culture & Regions; content-heavy (5 regions × 30 countries). The *personal* spice-preference half moved up to #4; what remains here is the static regional content. |
| 19 | **"Why this dish exists"** | Moved from Tier 2 (2026-08-05). Historical/cultural context snippet per dish — same pre-generated-content pipeline as dish twins (#1) and the spice data for #4; rides the #9 batch nearly free. |

### Foundation

| # | Feature | Notes |
|---|---------|-------|
| 20 | **Custom collections & tags** | Organization power tools; wait for logging volume. |
| 21 | **Seasonal highlights, meal companions** | Nice-to-haves. (Pronunciation lives in the shipped at-the-restaurant view, where it actually matters.) |
| 22 | **Supabase sync / mobile app** | Platform work; unlocks multi-device but changes nothing day-to-day until then. |
| 23 | **Revenue model: menu-insight data for restaurants** | Added 2026-08-05. The long-term business case: aggregate flavor fingerprints + dish ratings across cuisines into recommendation data ("diners with X palate love Y dishes"), sellable to restaurants deciding what to put on their menus. Hard prereqs: multi-user product with real scale (depends on #22 Supabase + public launch), and a privacy/consent model since it monetizes user data — aggregate/anonymized only. Nothing to build now; it's a lens for keeping the rating + fingerprint data structured and aggregatable as those systems evolve. |

---

## Inbox (unranked)

Quick captures land here; ranked into tiers during roadmap reviews.

- **Wishlist map layer** — third layer for the home map toggle (Explored / Flavor Match / **Wishlist**): countries shaded by how many want-to-try dishes you've bookmarked there. The layer plumbing already exists from flavor match. (G2)
- **Trip mode** — "I'm going to Tokyo" → must-try list + Google Maps export. Iceboxed 2026-08-05: Nikita isn't sold on the idea. Revisit only if a real trip makes it feel worth it. (G1)
- **Explored map depth gradient** — replace the flat purple "Dishes Logged" fill with a single-hue ramp (pale lavender → deep violet) by dish count; sage stays categorical for available-but-untouched. Reuses the Flavor Match ramp infra (`lerpHex`, domain stretching, gradient legend bar) and `dishCount` from `useCountryActivity`. Raw count first; coverage-based depth (logged ÷ available dishes) as a later refinement. (G2)
- **Per-dish/drink flavor match** — map the personal flavor profile down to individual foods and drinks: a taste-match indicator on each dish/drink card ("87% you"). Needs per-dish flavor data richer than spiceLevel — the `keySpices` generation in the #9 batch is the likely input; also the scoring ingredient for the shipped at-the-restaurant view and personalized recs (#11), so it may get built as part of those. (G1/G3)

---

## Suggested next session

Tier 1 fully shipped (see Built). Next up: **#3 AI enrichment** (last self-contained build) or the **#2 dish↔region design pass**. Mexico, China, and Ireland are the sandbox for all data changes until the
#9 batch at the MVP gate. Natural calendar trigger elsewhere: build the annual recap half
of #15 in **December**, when a year of data makes it fun.
