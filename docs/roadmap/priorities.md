# Feature Priorities

Ranked backlog + idea inbox, updated 2026-09-28. This is the single roadmap
document (the old `features/icebox.md` was merged in). Ranking criteria:
alignment with the **product thesis** (see CLAUDE.md) and impact on the core
loop (**explore → log → taste profile → better exploration**) vs. build effort.
New ideas land in the **Inbox** section (via `/idea` or by hand) and get ranked
into a tier during roadmap reviews. When a feature ships it moves to **Built**,
which lives at the **bottom of this file** so the open work is what you see
first. Longer specs for un-built features live in `designs/`; specs for shipped
ones in `implemented/`.

Items within each tier are grouped by the goal they serve:

| Goal | Theme (from the thesis) |
|---|---|
| **G1 🍽 Order & learn at the table** | *Primary* — "I'm at a restaurant trying a new cuisine, what do I order?" + learn the spices and food I'm eating |
| **G2 🗺 Track & explore world cuisines** | *Secondary* — trying / want-to-try / haven't-tried; where cuisines sit in the world; how similar they are to what I've eaten |
| **G3 ✦ Know my own palate** | *Tertiary* — flavor fingerprint, spice affinity, self-knowledge |
| **G4 📖 Cultural depth** | *Quaternary* — history, customs, regions beyond the plate |
| **Foundation** | Serves the app itself (polish, infra) rather than one goal |

---

## MVP cut (re-scoped 2026-09-28; first cut 2026-08-29)

**MVP proves regional exploration.** On a phone and on desktop: open a
country on the map, see what its food is like, browse its dishes by region,
save what you want to try, log what you tried. Rows below carry a **🚩 MVP**
tag.

**The restaurant flow ships decluttered, otherwise frozen.** Its declutter was pulled into MVP 2026-09-30 and shipped as "Order well" (see Built). *Superseded 2026-10-02:* Order well folded into Explore (a cuisine picker, then the country's All dishes ranked for you; see Built), so there is no separate restaurant view any more. What remains of #42 is the "at a table" context. The restaurant
moment is still the product's primary goal in the thesis (CLAUDE.md).

### Build order (decided 2026-09-28 with Nikita)

Work top to bottom. A step starts once the steps it depends on are done.

1. ✅ **#40 Two dish states**: shipped 2026-09-29 (see Built).
2. ✅ **#36 Image style pilot**: style C2 chosen 2026-09-29; shipped with
   wave 1, 2026-10-01 (see Built).
3. ✅ **#39 Explore panel declutter**: shipped 2026-09-29 (see Built); real
   dish images drop in as #36/#37 produce them.
4. **#38 Region image preview**: nearly free after #39 (the tile strip exists);
   MX, CN and EG now have the images to prototype it on.
5. ✅ **#41 Explore becomes the home page**: shipped 2026-09-29 (see Built);
   deleting the now-unrouted `Home.tsx` / `CountryDetail.tsx` is a follow-up.
6. ✅ **#34 Survey reconciliation (+#6)** *(should)*: shipped 2026-09-29 (see Built).
7. **#9 Content batch, in waves** (carries #37 images and #10 em dashes):
   cost each wave before running it. ✅ **Wave 1 (Mexico, China, Egypt)
   shipped 2026-10-01** (see Built). **India done as a full pass 2026-10-01** on
   Nikita's ask (6 regions, 22 dishes, 22/22 images; record in
   `designs/content-batch-wave1.md` §9, her local review pending).
   **Next: wave 2** = Ireland (review already approved) + ~4 more, region
   design step first, Nikita's go before the run.
8. **#8 Final mobile sweep**: small; the per-item mobile checks happen inside
   every step above.

### Rules for every MVP item

- **Done means mobile-checked.** An item isn't done until it passes on a real
  phone at 390px: touch targets ≥ 44px and nothing hover-dependent; works in
  all three sheet snaps (strip / half / full) where relevant; no sideways
  scroll, text readable without zooming; checked on an actual device, not
  only desktop devtools. Don't spend mobile time on surfaces being deleted
  (`/country/:id`, anything showing the heart).
- **Cost guardrail: never generate in bulk.** Standing rule from Nikita
  (2026-09-28): anything that spends money on generation (dish images, the
  #9 content batch) runs on the **sandbox first** (Mexico, then China and
  Ireland), gets reviewed, and only then widens **one wave at a time** (≈5
  countries, then the rest), with a cost estimate and Nikita's explicit go
  **before each wave**. If a plan, script or workflow would generate for
  every country in one run, stop and ask instead.

- **Shipped from the first cut:** #3 menu lookup, #24, #31, #32, #33.
- **Shipped from this cut (2026-09-29):** #34 + #6, #40, #41, #39.
- **Not MVP:** #42 restaurant flow redesign (first after MVP), #29, #1, #4
  (the feature; its `keySpices` data may optionally ride #9), #7, #19, #35,
  all of Tier 3, the inbox.

## Tier 2a — Small UX first (triaged 2026-08-29 from notes.md)

Code-only, no content dependency, each a session or less. **All four shipped
or re-homed 2026-08-29** (#32, #33, #24 → Built; #10 → rides #9 at the MVP
gate). Next tier starts below.

## Tier 2 — Next (the good medium-sized ones)

### G1 🍽 Order & learn at the table

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 29 | **Cuisine familiarity levels (First plate · Second helping · Off-menu)** | Added 2026-08-23 from Nikita. What you're offered depends on how well you already know a cuisine: new to it means **fewer**, more fundamental options (an unfamiliar menu is too much choice, not too little); familiar means a wider spread across regions; deep in it means the nuanced dishes first. Level is **per country, never global**. Earned from behaviour (`countryDishProgress()` plus spread across regions/categories) and cold-started by **#5**'s declared familiarity, which also overrides it permanently — build the two together. Nothing is hidden: the list gets shorter and reorders, with a one-tap "show everything". **Decided 2026-08-23:** (a) names are food-native rather than beginner/advanced, which would rank the eater; (b) **#9 expands to ~30 dishes per country** (from ~9.5, so closer to tripling than doubling its dish content) so the deep tier has something deep in it. *(2026-09-28: for MVP, #9 goes to ~20 per country instead; the jump to ~30 and `adventurousness` return when #29 is built.)* **Blocked on content, not code** — there are only **294 dishes** total, ~9.5 per country (plus 155 drinks; the "449" figure quoted earlier counted both), and that *is* the whole dataset, so shipping the mechanism today would reorder the same nine dishes. **Food only (2026-08-23):** drinks never truncate — there are exactly 5 per country (155 total), already fewer than a First plate food list, and drink familiarity doesn't track food familiarity. **Setting the level:** logged dishes are the truth; the seed is **already collected** — the survey deck offers 2 dishes per country and "🤔 Haven't tried it" is a distinct answer, so `foodie-taste-survey` records per-country familiarity today with no new question; and a per-country manual override (`foodie-cuisine-level`, add to `syncKeys.ts`) always wins and is never recalculated away. Onboarding questions and favorites-derived levels were considered and rejected — see the spec. Full spec: [`designs/cuisine-familiarity-levels.md`](designs/cuisine-familiarity-levels.md). **Progress plate by level (2026-08-29, from notes):** once a level exists, "4 of 10 tried" should count against the list your level shows (First plate counts against the short list, not all 30), otherwise a beginner's plate can never fill. Where the level is displayed is still open; a small label beside the plate is the obvious spot. Do not fake a level before #29 ships. | M (mechanism) + gated on #9 (content) |
| 37 | **Images + taglines for every dish** 🚩 MVP — rides #9 | Added 2026-09-28. **Only after #36's style is signed off.** **Re-scoped 2026-09-28: dishes only for MVP, ~20 per country × 31 ≈ 620 images**; drinks keep the placeholder tile until after MVP. Generated **in #9's waves, never all at once** (sandbox trio → ≈5 countries → the rest, with a cost estimate and Nikita's go before each wave; see the MVP cost guardrail). Money is not the real cost (a few cents per image). **Reviewing ~620 images for accuracy is**, which is why the style choice matters: illustrations need a lighter review than photo-real images. `tagline` is generated in the same #9 prompt, with the no-em-dash rule. Hosting: compressed images at ~40KB each come to ~40MB, which is fine as static assets on Vercel, or in Supabase Storage. | Content batch + review, inside #9 |
| 38 | **Region image preview** 🚩 MVP | Added 2026-09-28 from Nikita. In the regional view, a strip of dish thumbnails under a region's name, so "this is where the stews are" reads at a glance and a region feels like a place instead of a list. Lands in both the production region focus (`RegionalMap` / region section header) and the `/explore` trial, where the phone's bottom-sheet strip is the natural home for thumbnails. The layout can be prototyped on #36's Mexico images; it only becomes useful everywhere once #37 runs. | S (after #36) |

### G2 🗺 Track & explore world cuisines

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 1 | **Dish twins** | "Khachapuri is Georgia's answer to pizza" — pre-generatable content (rides the #9 batch), great for discovery; pairs with similar-cuisines section. | M (mostly content) |
| 35 | **Phone home starts on a grid of the 8 regions** (experiment) | Added 2026-08-29 from notes. Instead of opening on the region map, the phone opens on a simple grid of the eight culinary region tiles; tapping one opens the map zoomed to that region, with an optional toggle to that region's country grid. The differentiator is that the phone *always* starts simple. `CULINARY_REGIONS` and `RegionMap`'s controlled focus already exist, so this is a cheap prototype, not a build. **Decide by feel on a real device**; keep whichever entry wins and delete the other rather than shipping a toggle. Independent of everything else. | S (prototype) |
| 2 | ~~**Dish ↔ region cross-linking**~~ — **shipped 2026-08-21** as the unified country page (see Built). What remains is content, not code: **9 of Mexico's 13 items carry no `regionalOrigin` at all**, so three MX regions render empty and 9 dishes land in "Across Mexico". Ireland has one unmatched origin ("Rural west and north"). Both ride the #9 batch — add `regionalOrigin` to every dish and prefer names that match a region's own vocabulary. | Content |

### G3 ✦ Know my own palate

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 4 | **Personal spice affinity map** | Added 2026-08-05 from discussion. Which spices is Nikita actually drawn to, beyond the 6-axis flavor profile? **Plan:** (1) pre-generate `keySpices` per dish for all ~300 dishes — rides in the consolidated MVP-gate content batch (#9); (2) normalize into a curated ontology of ~15 spice families (chiles, warm spices, alliums, souring agents, fermented, herbs…); (3) score with **cross-cuisine repetition** (a spice recurring in loved dishes across unrelated cuisines = real signal) + **frequency weighting** (TF-IDF-style — distinctive spices score, garlic doesn't); survey answers count as signal too; (4) visualize as a D3 force layout — spice families as clusters, bubbles sized by affinity. **Research task at build time:** spice science — terpenes / shared aroma-compound data (food-pairing theory) to draw connections *between* spices ("you like citrusy terpenes: coriander, lemongrass, sichuan pepper share them"). Needs ~15–20 rated dishes before patterns beat noise. Supersedes the personal half of #18. | M–L |
| 5 | **Survey familiarity weighting** | Moved from Tier 1 to bottom of Tier 2 (2026-08-05). Nikita's trust issue: "I know Indian food better so I could be more picky." **Decided: direct question.** First time a country appears in the survey, ask "How well do you know this cuisine?" (barely / somewhat / very well) → stored per country (`foodie-cuisine-familiarity`), scales that country's answer weights (~0.5× / 1× / 1.5×) in the profile hook. Asked once per country, pre-filled on retake. Later option: show familiarity as confidence/opacity on the radar. **Linked to #29 (2026-08-23):** this declared familiarity is #29's cold start *and* its permanent override — being told you're a beginner at a cuisine you grew up with is the main way that feature insults someone. Build the two together rather than shipping two independent notions of familiarity. | M |
| 7 | **Card plate dots → dominant-flavor colors** | Added 2026-08-05, end of Tier 2 by design. Evolve the shipped plate dots: the dot on each dish/drink card stops encoding *category* and instead takes the color of the dish's **dominant flavor axis** (heat, acidity, sweet, umami, aromatic, smoke/earth — the same fixed axis colors as the Flavor tab's build view, matrix, and radar, from `flavorAxisMeta.ts`). One color language across the whole country page: glance at a card, know what the dish mostly tastes like. **Prereq:** per-dish dominant-axis data — falls out of the #9 content batch, so build after it runs. Category colors (`categoryMeta.ts`) are the interim; category info stays in the card's meta line. **Revised 2026-08-21 (Nikita): check whether per-dish flavor data is overkill before committing to it.** Dissecting six axes for every one of ~300 dishes is the expensive path and probably not necessary for a dot. Explore cheaper sources first, in order: (a) the dish's existing `keyTraits` — a hand-written trait→axis table over the ~40 distinct traits in the data, one table instead of 300 judgments; (b) the dish's **region** fingerprint via `regionFingerprint()` in `dishRegion.ts`, which already derives axes from `keyIngredients` and which the region chips use today, so dishes inherit their region's dominant axis for free; (c) the country's `flavorIntensity` as the floor. Measured during the prototype: the `keyTraits → ingredient → axis` bridge resolves only 5 of 10 CN dishes on its own because traits like "crispy skin" and "soup-filled" name techniques rather than ingredients — so (a) alone is not enough, but (a) falling back to (b) may well be. Spend a session measuring coverage of the cascade across MX/CN/IE before adding a single field to the content batch. Only if coverage stays poor does this need per-dish data from #9. | S (cascade) / S once #9 data exists |

### Foundation — MVP gate (do last in Tier 2)

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 8 | **Mobile: per-item checks + a final sweep** 🚩 MVP | **Re-scoped 2026-09-28 (Nikita): no longer one audit at the end.** Now that the app is map-first with a phone sheet and every screen is designed at 390px from the start, a last-step audit would reopen every feature. Split in two: (1) **per-item checks**: every MVP item must pass the "Done means mobile-checked" rule in the MVP section before it counts as done; (2) **a small final sweep** (a session or two, not M) of surfaces no MVP item touches (taste survey, profile slide-over, account & backup panel) plus cross-screen consistency (spacing, the same control looking the same everywhere). Also carry the two unverified-on-device items: the filter rail's edge fade and taps while the map is zoomed. **Found 2026-09-29:** on a phone, the half-height sheet covers the map's +/− zoom buttons (bottom corner); pinch works, but a control hidden behind the sheet should move above it or hide at half. Skip surfaces being deleted. *History below.* Moved from Tier 1 (2026-08-05): UI is still churning heavily, so a full audit now would be redone feature by feature. **Decided: run once as the MVP gate** — after all other Tier 2 features are built. Pass over the key surfaces — country page (all 3 tabs), Eat & Drink cards + filters, taste survey, profile slide-over, at-the-restaurant view — and make each genuinely good on a phone (touch targets, layout, no hover-dependent affordances). The home map stays desktop-only (grid view covers mobile). Interim rule: build new features mobile-aware so this is a polish pass, not a rebuild. | M |
| 9 | **Full-country content batch (30 countries)** 🚩 MVP | Added 2026-08-05. **Decided: don't generate for all countries until the schemas/UI stop moving** — iterate on the sandbox trio, Mexico + China + Ireland (hand-mapped), only, then run one consolidated batch at the MVP gate, alongside the mobile audit. The carpool by then likely includes: `flavorAxes` for the remaining non-sandbox countries (see Built: ingredients redesign), per-dish `keySpices` + dominant flavor axis (#4, #7, per-dish match, the shipped at-the-restaurant scoring), and optionally dish twins (#1) + why-dish-exists (#19). One pass per country instead of five separate runs; generation prompt carries the no-em-dash rule (#10). Cost estimate before launching. **Region gap logged 2026-08-23 (measured, not estimated).** Three of the 31 countries — **Ethiopia, Japan and Peru** — carry no `regionalVariations` at all, so they render no map and no Region lens (the page is behaving correctly; the data isn't there). The map config itself is complete: every one of the other 28 countries has an ISO numeric code, a projection, and a coordinate for **every** region, so nothing falls back to the button grid. Each of the three needs 4–6 regions with a name, a description, and `keyIngredients` specific enough for `regionFingerprint()` to derive chips from. Pair this with the other half of the same problem: dishes whose `regionalOrigin` is missing or doesn't match a region's own vocabulary, which is why Brazil's Gaúcho Country and three Mexican regions render empty (#2 leftover, #24). The batch prompt should write regions and dish origins **together**, so origins use the region names as written. **Scope increase for #29 (2026-08-23):** take each country from ~15 dishes to **~30** — the current gateway/everyday set plus ~15 regional or deeper dishes — and add a per-dish `adventurousness: 1 | 2 | 3`. Roughly doubles the content cost of this batch. Writing those extra dishes with `regionalOrigin` values that match each region's own vocabulary fixes the region gap above in the same pass. **Re-scoped 2026-09-28 with Nikita (supersedes the ~30-dish expansion above, which was for #29, now not MVP):** (1) **~20 dishes per country**: the current ~10 plus ~10 new ones **written region-first**, so every region ends up with at least 2–3 dishes (fixes the empty regions and Mexico's 9-of-13 "Across Mexico"); add regions for Ethiopia, Japan and Peru. (2) **MVP fields only:** `tagline` (~60–80 chars) + an image prompt (#36/#37), `regionalOrigin` using the region's own names, ingredient `flavorAxes` for the 28 unmapped countries, the no-em-dash rule (#10). Optional because it's cheap and simply shaped: `keySpices` (#4). (3) **Dropped from the MVP batch:** `adventurousness` (#29), dish twins (#1), why-this-dish-exists (#19), dominant axis (#7). (4) **Run in waves, never all at once** (see the MVP cost guardrail): wave 1 = Mexico, China, Ireland (checks the prompt against screens we know) → review → wave 2 ≈ 5 countries → review → the rest. **Re-scoped 2026-10-01 (Nikita): wave 1 = Mexico, China, Egypt**; Ireland keeps its approved review and moves to wave 2 untouched. The text half for all three ran 2026-10-01 on `content-wave1-mx-eg` (MX six regions / 19 dishes, CN Northwest renamed / 18 dishes, EG `flavorAxes` / 19 dishes; `locality` folded into `origin.place`), with images generated the same day; record in [`designs/content-batch-wave1.md`](designs/content-batch-wave1.md) §7-8. Cost estimate and Nikita's go before **each** wave. (5) **Region design step before each wave (decided 2026-09-28 with Nikita).** Regions are drawn where the food actually changes, not uniformly: most countries keep theirs, a few get finer (likely India and Italy, maybe Spain and Turkey), some may get fewer (Ireland). A region must pass all three tests: **the food really changes** (different staples, techniques or flavors; `regionFingerprint()` can flag two candidates that come out the same, a sign to merge them); **people recognize it** (the name appears on menus and restaurant signs: "Punjabi", "Sichuan", "Oaxacan", "Neapolitan"); **it can be filled** (≥ 2–3 dishes at ~20 per country). The step is text only (no images): list that wave's region changes and get Nikita's review before the wave runs. Each redrawn region needs new hand-maintained coordinates in `regionMapConfig.ts`, another reason to redraw only where the tests call for it. (6) **Optional `locality` on each dish**, beside the required region: a state or city ("Puebla", "Jalisco") filled **only** when the dish is genuinely tied to one place, left blank for widespread dishes (chana masala is associated with Punjab but eaten across the north) so the batch doesn't invent false precision. Mexico's `regionalOrigin` is already partly state-level ("Puebla", "Jalisco", "Oaxaca"), and separating locality from region also makes rollup mistakes visible (tequila currently lands in *Central* because Jalisco is matched to it). Try it on the sandbox trio in wave 1 before it goes into the wider prompt. | Content batch, in waves |
| 10 | **Remove all em dashes from text** 🚩 MVP — rides the #9 sweep (decided 2026-08-29) | Small UI copy fix (added 2026-08-05): sweep UI strings and the generated country/dish content for "—", replace with commas/periods/colons as reads best. Add to the content-generation prompt guidelines so future batches don't reintroduce them. **Split into two halves, 2026-08-23 (counted).** UI copy: **20 component/page files** — a quick sweep, do any time. Generated content: **453 occurrences across `data/countries/*.ts`** — this half should **ride the #9 batch**, because regenerating that prose reintroduces them unless the prompt forbids it, so hand-fixing 453 now is work we'd throw away. **Decided 2026-08-29: do both halves in the #9 sweep**, one pass over UI copy and generated prose together, with the no-em-dash rule in the generation prompt so the batch cannot reintroduce them. | S, inside #9 |

### Foundation

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 42 | **Rethink the restaurant flow** (first after MVP) | Added 2026-09-28 from Nikita: the at-the-restaurant view needs its own end-to-end user-flow pass, separate from regional exploration. **The declutter half shipped 2026-09-30 as "Order well" (see Built)**, pulled into MVP by Nikita; the flow pass stays after MVP. Still to do in that pass: the end-to-end flow itself (entry, cuisine, menu search, log), whether the in-place expansion should become #39's shared dish detail, and text loading first with images lazy on weak cellular so the view never waits on an image. **Direction set 2026-10-02 (Nikita): collapse Order well into Explore.** Brainstorm, six options and prototypes in [`designs/order-well-into-explore.md`](designs/order-well-into-explore.md). **Shipped the same day** (see Built): the personal strip, the Ranked / Region toggle, the "Where are you eating?" picker, the redirects, and the restaurant page deleted. **What's left of this item:** the "at a table" context from option 3 (a lit country, region narrowing of the ranked list, where the menu-photo result lands), to judge on a real phone; and text loading before images on weak cellular. The in-place expansion question is moot: the dish sheet is the one detail now. | M |

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
| 19 | **"Why this dish exists"** | Moved from Tier 2 (2026-08-05). Historical/cultural context snippet per dish — same pre-generated-content pipeline as dish twins (#1) and the spice data for #4; rides the #9 batch nearly free. **2026-10-01 (Nikita):** include the dish's colonial and trade roots explicitly (which ingredients or techniques arrived with whom, and what it displaced), not only a feel-good origin story; this is the part of history that explains why neighbouring cuisines share dishes, so it also feeds #1 dish twins. |

### Foundation

| # | Feature | Notes |
|---|---------|-------|
| 20 | **Custom collections & tags** | Organization power tools; wait for logging volume. |
| 21 | **Seasonal highlights, meal companions** | Nice-to-haves. (Pronunciation lives in the shipped at-the-restaurant view, where it actually matters.) |
| 22 | **Normalized sync tables / mobile app** | Scope reduced 2026-08-20: magic-link auth and whole-profile sync **shipped** (see Built), so multi-device already works. What remains is (a) per-entity Postgres tables replacing the single JSON blob, which buys real conflict resolution instead of last-write-wins and is the hard prereq for #23's cross-user aggregation, and (b) the React Native app. Neither is worth doing until the blob's last-write-wins actually bites or a second user exists. |
| 23 | **Revenue model: menu-insight data for restaurants** | Added 2026-08-05. The long-term business case: aggregate flavor fingerprints + dish ratings across cuisines into recommendation data ("diners with X palate love Y dishes"), sellable to restaurants deciding what to put on their menus. Hard prereqs: multi-user product with real scale (depends on #22 Supabase + public launch), and a privacy/consent model since it monetizes user data — aggregate/anonymized only. Nothing to build now; it's a lens for keeping the rating + fingerprint data structured and aggregatable as those systems evolve. |

---

## Trial in progress — one-map app (`/explore`, 2026-08-30)

Unlinked route; current pages untouched. The home map becomes the app: the
panel on the right describes whatever the camera is looking at, and **zoom
is the control** — past 2.2× the country under the pointer becomes the scope
and its region bubbles rise out of the map; past 4.6× the nearest region
takes over. Zooming out unwinds with hysteresis (1.8× / 3.8×) so nothing
flickers. Clicks, the breadcrumb, Esc and +/− fly the same camera.
**Design judgments taken:** no dish dots (Version A); when a zoom gesture
settles on a new country or region the camera eases to frame it (regions
framed by their bubbles, so the US mainland, not Alaska, fills the view);
bubbles are compact at country zoom and full size at region zoom; a user
gesture cancels any flight; the URL carries `?c=&r=` so refresh and links
land where you were; Explored / Flavor Match layers and the hover card work
at world level; the panel is the country page (summary, flavor chips,
Filters tray, Grouped by, sections, cards, fingerprint + culture trays) and
narrows to a region's header + dishes at region level. Every country with
region coordinates has regions. Mobile deferred (bottom sheet). Remaining
before it can replace Home: link it from navigation, retire `/country/:id`
with redirects, and the mobile pass. **2026-09-28:** the mobile pass shipped
(below) and replacing Home is now MVP item **#41**; the panel redesign is
**#39**.

**2026-09-28 — the wine map.** The region bubbles are gone: an opened country
is split by thin dashed borders (a Voronoi divide over the region centres,
clipped to the coastline), each region's name lettered in italic inside its
area, and the whole area is the click target. The geometry lives in
`utils/regionAreas.ts`: home-landmass framing (the lower 48, not Alaska;
the right islands for Indonesia), label anchors at each region's roomiest
spot, and all-or-nothing name fitting (overlap hides every name, never a
handful). Camera behaviour re-decided the same day: it moves **only** on a
user gesture or an explicit click — no auto-drift after a zoom settles;
hovering a country previews it in the side panel and shows the hover card
(now clamped inside the map). The same divide replaced the bubbles on the
production country page (`RegionalMap`), so both maps read as one design.
Decision taken with Nikita across three artifact rounds (pins → halos/plates
→ from-scratch), wine map chosen 2026-09-28.

**Mobile (same day):** the map fills the phone screen and the panel is a
three-snap bottom sheet — a slim strip docked at the bottom by default (the
strip is the handle into the whole-country list), half height on a region
tap so the map stays in view, full for reading. Swipe or tap the strip to
move it; the breadcrumb's current crumb also raises it. Decided with Nikita
2026-09-28 (peek-strip pattern chosen over floating button / second tap).

## Inbox (unranked)

Quick captures land here; ranked into tiers during roadmap reviews.

**Added 2026-10-01 from Nikita (a batch of notes; categorized, not built).
Open questions were answered the same day; nothing here is ranked yet.**

- **Previews lead with flavor and vibe, not ingredients** — the tagline / card
  preview should say what a dish *tastes and feels like* (spices, heat, bright
  vs rich, comfort vs fresh, street vs feast) rather than listing what is in
  it, and use less text. Amends the tagline rules in
  [`docs/design/image-style-pilot.md`](../design/image-style-pilot.md) and the
  #9 batch prompt before wave 1 runs; the 13 Mexico taglines already written
  should be re-read against this. Ingredients move behind the tap (next
  item). (G1)
- **Tap in for ingredient details** — the dish detail sheet (#39) is where the
  ingredient list and the long description live; the card itself stays
  flavor-first. Today the sheet shows the description and no ingredient list,
  so this is a small sheet addition once dishes carry structured ingredients
  (`keySpices` from #9 is the nearest data). (G1)
- **Restaurant rows show the dish's region** — in the at-the-restaurant
  view, each dish row names where in the country that dish comes from
  ("Oaxaca", "Sichuan"), since region is the thing a menu rarely tells you.
  Confirmed 2026-10-01: the *dish's* region, not a guess at the restaurant's.
  `resolveRegion()` already answers this; it is a label on the row, so S and
  a natural part of #42. (G1)
- **Menu lookup verifies before it invents** — when a diner shares or
  describes a dish (typed, or later from a menu photo), the app should first
  try to establish that it is a *real* dish of that cuisine: match against
  our own dishes (name similarity, alternate spellings, shared words, same
  category), then have the model check the name against what it knows, and
  only then describe it. Today the lookup returns a confident AI card for any
  string, with a small "not confident this is a real dish" flag; the flag
  should become the default posture, so a miss says "we couldn't confirm this
  dish, closest known: X" rather than producing a hallucinated dish. Changes
  the `menu-lookup` edge function's prompt and the card copy; S–M. (G1)
- **Order a balanced meal, with swaps** — help compose an order, not just pick
  one dish: a rich + a bright + a starch, or whatever that cuisine's own meal
  structure is (`foodCulture.mealStructure` already describes it per
  country), plus "want something more savory? this instead" swaps between
  dishes on the same axis. Uses the six flavor axes and dish `keyTraits` we
  already have; the hard part is the interaction on a phone at the table.
  Lands inside the #42 restaurant flow pass. (G1)
- **Photo of the menu → what to order** — take a photo of the menu and the
  app helps you decide from *that* menu. Two outputs from one photo: (a) a
  **regional read**: what regional cuisine this is ("broadly Middle Eastern,
  but the names point to Syrian"), the share of dishes per region and what is
  typical of that region; (b) **ordering help on the actual menu**: which of
  these dishes match your palate, which are the cuisine's fundamentals, and
  the balanced-order suggestion from the item above, applied to the dishes in
  front of you instead of our whole list. Clarified 2026-10-01: the earlier
  one-word "photos?" note meant this, not dish photos or user photos. Needs a
  vision-capable model call behind the existing `menu-lookup` edge function
  (same caps, same AI-generated label), the verification rule from the
  lookup item above so unreadable names don't become invented dishes, and
  good `regionalOrigin` coverage from #9 so names have something to match.
  L, but it answers the thesis moment more directly than anything else on
  the board. (G1, with G4 for the "what is typical of that region" half)
- **Extract my food tastes from existing ChatGPT / Claude chats** — the
  point (clarified 2026-10-01): years of chats already contain what someone
  likes, avoids and has tried; pull that out so the taste profile doesn't
  start cold. Two steps: (1) Foodie exposes an MCP server (or plain API) over
  the user's taste data (survey answers, verdicts, affinities, aversions), so
  an assistant can write into it; (2) a copy-paste prompt for ChatGPT / Claude
  that says "I've connected Foodie, go through what you know about my food
  preferences and export it in this schema", modeled on the memory-extraction
  prompts people use today. After that the connector stays live, so the
  assistant can reference and update tastes in any later chat. Foodie's own
  UI must let the user see and edit what was imported, so it feels like part
  of their usage rather than a one-time dump. Nikita's alternative, "build a
  different harness", was left open; the connector route is her preferred
  one. Prereqs: an account (#22's auth is shipped) and a server that owns
  the data, which the localStorage-first model doesn't yet have. (G3 +
  Foundation)

- **Dish plates on the map, world to city** — added 2026-09-29 from Nikita, from the Mexico map-plates preview (`MapPlates.tsx` in the explore-declutter worktree; design options in the [Dishes on the Map artifact](https://claude.ai/artifact/V6cqkwcAV7u5tstFBph6vj)). Dish illustrations float over the map at every zoom: at **world** zoom one small signature plate per country (its most popular illustrated dish), handing over to **one plate per region** at country zoom (plus an "Across {country}" stack at sea for nationwide dishes), then **plates on stems over home cities** inside a region (new optional `origin` field: place + coordinates). Plates fade as a country shrinks on screen, so zooming out never buries a small country. **Preview built for Mexico only.** Before it goes wider: crowding rules for the world view (Europe, Balkans, Southeast Asia: show a plate only where it doesn't overlap a neighbour; bigger or more-explored countries win, the rest appear on zoom); images for many countries (#36/#37); a decision on how world plates coexist with the map's tried / want / flavor-match colouring; possibly personal state on plates (✓ on tried cuisines, or your own top-rated dish). Serves the secondary thesis goal of where cuisines sit in the world. (G2) **Across-country cluster decided 2026-10-01 (Nikita, from the [Across Egypt canvas](https://claude.ai/artifact/X5PVFZKbBAHzdTEYbubSRA), copy in `docs/design/prototypes/across-cluster/`):** the row of nationwide plates at sea is gone. **Desktop: a stack** (most popular dish on top with "+N") that fans into a ring on hover, the label dropping below the ring; **touch: a flower**, an "Across {country} · N dishes" pill as the hub with every dish on the ring, since there is no hover to open a stack. Honeycomb and coast-arc options were considered and dropped. Built the same day on `content-wave1-mx-eg` (`acrossRing()` in `plateLayout.ts`); each country needs a water point in `ACROSS_AT` or its nationwide dishes don't appear at all (MX, CN, EG have one). Same day: plate captions moved to a layer above the region names on a cream pill, and "Beijing Kaoya · Beijing" no longer repeats the place. **Later the same day, from Nikita's phone walkthrough:** (1) **country zoom de-cluttered** per boards **1 + 3** of the [China de-clutter canvas](https://claude.ai/artifact/8FwW5wA4mXKXXNCbra3gum) (copy in `docs/design/prototypes/china-declutter/`; board 5's stacks were built first and rejected on the phone, 2026-10-01): region names step back to small quiet caps while plates show, and every plate stays where its dish is from; where plates would overlap at the current zoom the most popular stays on top and the ones underneath **fade and shrink** (55% / 38% / 30%, the fourth on floored), nudged just enough to show a crescent when they would be fully covered, and spreading back to their true spots as you zoom in. A dish is never dropped from the map: a region dish with no clear spot lands on its region's land as depth (the bug that hid Mexico's and Egypt's region dishes on a phone); (2) **world pins by screen area**: a country gets 1-3 pins (Egypt 1, Mexico 2, China 3 at the phone's first-pins zoom), the extras being the most popular dish of the region farthest from the pins already placed; (3) **pins grow with zoom** from marker to plate size and **crossfade** into the region plates when a country opens, instead of vanishing while big plates pop in; (4) a **sea tap on the phone returns to the world**, and the world view is a **home framed on the 31 cuisines' land** (no Antarctica on a tall screen); (5) the Across cluster is culled as one unit so panning never re-fans it.

- **Regional specificity: split regions over time, no click-through state level** — discussed 2026-09-28 with Nikita. Idea: a third map level (country → region → state) so every click adds specificity, e.g. chana masala → North India → Punjab. **Decided against it as navigation:** at ~20 dishes per country a state holds 1–2 dishes, so each click narrows to a near-empty screen; users browsing rarely drill three levels; state borders for 31 countries plus a third camera threshold is L effort; and many countries (Ireland, Jamaica, Georgia) have no state-level food identity. **What we took instead:** regions drawn where the food changes (#9's region design step) plus an optional `locality` line on dishes (#9, shown by #39). **Regions can be split later without migrating user data**, because a dish's region is resolved from its origin text at read time and never stored with a log; the costs are new `regionMapConfig.ts` coordinates and redirects for old region slugs. Revisit grouping by locality inside a region view (S–M) alongside #29's deeper content. (G2/G4)
- **Flavor geography: how cuisine changes across a map** — parked 2026-08-23. Analysis in [`designs/flavor-geography.md`](designs/flavor-geography.md), written while choosing the #30 map groupings and kept because the findings outlive that decision. Measured over the six flavor axes: a random pair of the 31 countries sits **5.84** apart; Africa as one group scores **6.48** (worse than random), while **USA + Brazil + Argentina scores 2.31**, the tightest cluster in the data — a grill belt that doesn't touch. Morocco through the Caucasus scores 3.66, tighter than Europe. Four feature ideas fall out: a per-axis gradient map layer (heat belt, acidity belt), neighbour comparison on a country page, a "flavor journey" walking the line between two cuisines, and surfacing discontiguous kinship. Serves the thesis goal of *how cuisines relate to each other*, which nothing currently answers. **Low priority** — parked as ideas, not ranked. (G2/G3)
- **Wishlist map layer** — third layer for the home map toggle (Explored / Flavor Match / **Wishlist**): countries shaded by how many want-to-try dishes you've bookmarked there. The layer plumbing already exists from flavor match. (G2)
- **Trip mode** — "I'm going to Tokyo" → must-try list + Google Maps export. Iceboxed 2026-08-05: Nikita isn't sold on the idea. Revisit only if a real trip makes it feel worth it. (G1)
- **Explored map depth gradient** — replace the flat purple "Dishes Logged" fill with a single-hue ramp (pale lavender → deep violet) by dish count; sage stays categorical for available-but-untouched. Reuses the Flavor Match ramp infra (`lerpHex`, domain stretching, gradient legend bar) and `dishCount` from `useCountryActivity`. Raw count first; coverage-based depth (logged ÷ available dishes) as a later refinement. (G2)
- **Capital city marker on the regional map** — small star (or classic capital dot) at the capital's coordinates on the country map, e.g. Beijing, matching the icon shown next to the capital's name in the country info. Pure orientation aid; builds on `RegionalMap.tsx` + hand-maintained coordinates in `regionMapConfig.ts` (capital lat/lng would be new data per country). Not MVP. (G4)
- **Per-dish/drink flavor match** — map the personal flavor profile down to individual foods and drinks: a taste-match indicator on each dish/drink card ("87% you"). Needs per-dish flavor data richer than spiceLevel — the `keySpices` generation in the #9 batch is the likely input; also the scoring ingredient for the shipped at-the-restaurant view and personalized recs (#11), so it may get built as part of those. (G1/G3)

---

## Suggested next session

**2026-10-01:** wave 1 and the map pass shipped (PR #54). Next, in order:
**#9 wave 2** (Ireland's approved review + ~4 countries: region design
step as text, cost, Nikita's go, then text → images; make the generator
emit WebP and add an `ACROSS_AT` water point per country); **#38 region
image preview** on the three illustrated countries; the **#8 final mobile
sweep**. Small follow-ups: delete the unrouted `Home.tsx` /
`CountryDetail.tsx`; the pin-size handover could become a true morph.

**Updated 2026-09-28: follow the MVP build order at the top of this file.**
**2026-09-29:** steps 1, 5 and 6 shipped (#40, #41, #34 + #6). Next up is
step 2 (#36: Nikita runs the 12 pilot prompts and picks a style), then step 3
(#39 the Explore declutter). #9's wave-1 review package is ready in
`designs/content-batch-wave1.md`, waiting on Nikita's redlines. *Earlier:*
next up was step 1 (#40 two dish states) with step 2 (#36 image style pilot,
Mexico only) alongside it. **While the phone-map work is in flight on
`explore-mobile`** (it edits `Explore.tsx` and `regionAreas.ts`), start with
**#36 prep, text only**: the 13 Mexico taglines, an illustration style brief,
and prompts for 3–4 dishes in 2–3 styles. Generation (~9–12 images) waits
for Nikita's go. **#34** is safe for parallel code work (survey, profile,
logging hooks). **#40 waits until the map work merges**, because it edits
`Explore.tsx` too. Do any parallel code work in a separate git worktree on
its own branch, since both sessions share one working tree. The notes below are the 2026-08-23 entry, kept for
history; where they disagree with the build order, the build order wins.

*2026-08-23:* replacing a stale entry that still described #2 as unbuilt
and cloud sync as inert. Both shipped.

**#27, the at-the-restaurant mobile pass, shipped 2026-08-05** (see Built) as a
scoped exception to #8. With it gone, nothing open serves the primary thesis
directly; the next G1 candidates are **#3** (menu-item lookup, un-defer
recommended) and **#29** (familiarity levels, gated on #9's content).

**#9 is quietly the largest item on the board** and should be costed before it
runs. It now owes: regions for Ethiopia, Japan and Peru; `regionalOrigin` fixes
for the regions that render empty; ~15 additional dishes per country (#29); a
per-dish `adventurousness` field (#29); `keySpices` (#4); and the no-em-dash
rule (#10).

Mexico, China, and Ireland remain the sandbox for all data changes until that
batch. Natural calendar trigger elsewhere: build the annual recap half of #15
in **December**, when a year of data makes it fun.

Unverified on a real phone: whether the filter rail's edge fade reads as
"scroll for more", and whether map bubble taps still register while zoomed.

---

## Built

Shipped features, newest first. Tier 1 is fully shipped; current work starts
at Tier 2.

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
