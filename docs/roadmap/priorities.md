# Feature Priorities

Ranked backlog + idea inbox, updated 2026-08-29. This is the single roadmap
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

## MVP cut (decided 2026-08-29)

Judged against the thesis: at a restaurant, on a phone, what do I order, and
teach me what I'm eating. Rows below carry a **🚩 MVP** tag.

- **Must:** #3 menu-item lookup · #9 content batch · #8 mobile audit (the gate,
  goes last) · #24 · #10 (UI half). (#31 fingerprint pull-outs was on this
  list and shipped the same day, see Built.)
- **Should, if cheap by then:** #34 survey reconciliation (at minimum #6) ·
  #32 · #33 (both land naturally inside #8).
- **Not MVP:** #29, #1, #4, #7, #19 (their *data* rides #9, the features ship
  after), #35, all of Tier 3, the inbox.

#3 and #9 are the two big ones and don't depend on each other, so they can run
in parallel. Cost #9 before starting it.

## Tier 2a — Small UX first (triaged 2026-08-29 from notes.md)

Code-only, no content dependency, each a session or less. Independent of each
other, so they can run in parallel branches. Suggested order top to bottom.

| # | Feature | Goal | Why | Effort |
|---|---------|------|-----|--------|
| 24 | **Focused region with no dishes** 🚩 MVP | Foundation | Moved up from Foundation below; already diagnosed, one-session fix. See the full entry under Foundation. | S |
| 10 | **Em dashes, UI half** 🚩 MVP | Foundation | 20 files, mechanical. Data half rides #9. Full entry under Foundation. | S |

## Tier 2 — Next (the good medium-sized ones)

### G1 🍽 Order & learn at the table

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 29 | **Cuisine familiarity levels (First plate · Second helping · Off-menu)** | Added 2026-08-23 from Nikita. What you're offered depends on how well you already know a cuisine: new to it means **fewer**, more fundamental options (an unfamiliar menu is too much choice, not too little); familiar means a wider spread across regions; deep in it means the nuanced dishes first. Level is **per country, never global**. Earned from behaviour (`countryDishProgress()` plus spread across regions/categories) and cold-started by **#5**'s declared familiarity, which also overrides it permanently — build the two together. Nothing is hidden: the list gets shorter and reorders, with a one-tap "show everything". **Decided 2026-08-23:** (a) names are food-native rather than beginner/advanced, which would rank the eater; (b) **#9 expands to ~30 dishes per country** (from ~9.5, so closer to tripling than doubling its dish content) so the deep tier has something deep in it. **Blocked on content, not code** — there are only **294 dishes** total, ~9.5 per country (plus 155 drinks; the "449" figure quoted earlier counted both), and that *is* the whole dataset, so shipping the mechanism today would reorder the same nine dishes. **Food only (2026-08-23):** drinks never truncate — there are exactly 5 per country (155 total), already fewer than a First plate food list, and drink familiarity doesn't track food familiarity. **Setting the level:** logged dishes are the truth; the seed is **already collected** — the survey deck offers 2 dishes per country and "🤔 Haven't tried it" is a distinct answer, so `foodie-taste-survey` records per-country familiarity today with no new question; and a per-country manual override (`foodie-cuisine-level`, add to `syncKeys.ts`) always wins and is never recalculated away. Onboarding questions and favorites-derived levels were considered and rejected — see the spec. Full spec: [`designs/cuisine-familiarity-levels.md`](designs/cuisine-familiarity-levels.md). **Progress plate by level (2026-08-29, from notes):** once a level exists, "4 of 10 tried" should count against the list your level shows (First plate counts against the short list, not all 30), otherwise a beginner's plate can never fill. Where the level is displayed is still open; a small label beside the plate is the obvious spot. Do not fake a level before #29 ships. | M (mechanism) + gated on #9 (content) |

### G2 🗺 Track & explore world cuisines

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 1 | **Dish twins** | "Khachapuri is Georgia's answer to pizza" — pre-generatable content (rides the #9 batch), great for discovery; pairs with similar-cuisines section. | M (mostly content) |
| 35 | **Phone home starts on a grid of the 8 regions** (experiment) | Added 2026-08-29 from notes. Instead of opening on the region map, the phone opens on a simple grid of the eight culinary region tiles; tapping one opens the map zoomed to that region, with an optional toggle to that region's country grid. The differentiator is that the phone *always* starts simple. `CULINARY_REGIONS` and `RegionMap`'s controlled focus already exist, so this is a cheap prototype, not a build. **Decide by feel on a real device**; keep whichever entry wins and delete the other rather than shipping a toggle. Independent of everything else. | S (prototype) |
| 2 | ~~**Dish ↔ region cross-linking**~~ — **shipped 2026-08-21** as the unified country page (see Built). What remains is content, not code: **9 of Mexico's 13 items carry no `regionalOrigin` at all**, so three MX regions render empty and 9 dishes land in "Across Mexico". Ireland has one unmatched origin ("Rural west and north"). Both ride the #9 batch — add `regionalOrigin` to every dish and prefer names that match a region's own vocabulary. | Content |

### G3 ✦ Know my own palate

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 3 | **Menu-item lookup (Claude API)** 🚩 MVP — un-deferred 2026-08-29 (was ⏸ 2026-08-20) | **Reframed from "custom-dish AI enrichment" to "look up what's on the menu".** Same machinery, better doorway. The original framing — auto-fill traits when *adding* a custom dish — was an input-side nicety, which is why it was deferred. The new framing is the primary thesis moment: you're at a table reading an unfamiliar menu and want to know what one item *is*. **It also fills the gap #27 exposed:** we know ~9.5 dishes per country and a real menu has sixty, so the at-restaurant screen will always be incomplete. This is the only feature that closes that gap without writing 300 more dishes. **Entry point already exists** — the search box shipped with #27 has an empty state ("Nothing here matches 'X'… we only know N {country} dishes so far"). That's the natural home for an "Ask about 'X' →" action. **MVP:** type a name → one API call → a card with a one-line description, likely key ingredients, a spice guess, and a category, labelled **AI-generated**. "Save to my dishes" creates a custom `UserDish` prefilled from it, reusing `addDish()` and the existing `DishForm` plumbing. **Shape (verified 2026-08-23):** `claude-haiku-4-5` at $1/$5 per MTok — **~$0.0015 per lookup** at ~500 in / ~200 out, so ~$0.45/mo at 10/day. (The earlier "$0.002/dish" estimate was close but unverified.) Use structured outputs — `output_config: { format: { type: 'json_schema', schema } }` — not prompt-and-parse, so the card renders from typed fields instead of a regex. Note **prompt caching won't help**: Haiku 4.5's minimum cacheable prefix is 4096 tokens and this prompt is a few hundred, so `cache_control` would silently do nothing. **Hosting is now decided, not conditional.** The app is public on Vercel, so the key cannot live in the browser bundle. Supabase is already in place (see Built), so a **Supabase Edge Function** is the proxy — no third vendor, and it can enforce a per-user daily cap and a global monthly kill-switch. The old "BYO-key in localStorage" v1 is dead: it was only safe for a single local user. **Risks to design around:** a made-up dish gets a confident description, so mark AI content as generated and **never feed guessed spice/traits into the flavor profile** unless the user rates the dish themselves; and rate-limit per user, since the field is one tap from a keyboard. | M |
| 4 | **Personal spice affinity map** | Added 2026-08-05 from discussion. Which spices is Nikita actually drawn to, beyond the 6-axis flavor profile? **Plan:** (1) pre-generate `keySpices` per dish for all ~300 dishes — rides in the consolidated MVP-gate content batch (#9); (2) normalize into a curated ontology of ~15 spice families (chiles, warm spices, alliums, souring agents, fermented, herbs…); (3) score with **cross-cuisine repetition** (a spice recurring in loved dishes across unrelated cuisines = real signal) + **frequency weighting** (TF-IDF-style — distinctive spices score, garlic doesn't); survey answers count as signal too; (4) visualize as a D3 force layout — spice families as clusters, bubbles sized by affinity. **Research task at build time:** spice science — terpenes / shared aroma-compound data (food-pairing theory) to draw connections *between* spices ("you like citrusy terpenes: coriander, lemongrass, sichuan pepper share them"). Needs ~15–20 rated dishes before patterns beat noise. Supersedes the personal half of #18. | M–L |
| 5 | **Survey familiarity weighting** | Moved from Tier 1 to bottom of Tier 2 (2026-08-05). Nikita's trust issue: "I know Indian food better so I could be more picky." **Decided: direct question.** First time a country appears in the survey, ask "How well do you know this cuisine?" (barely / somewhat / very well) → stored per country (`foodie-cuisine-familiarity`), scales that country's answer weights (~0.5× / 1× / 1.5×) in the profile hook. Asked once per country, pre-filled on retake. Later option: show familiarity as confidence/opacity on the radar. **Linked to #29 (2026-08-23):** this declared familiarity is #29's cold start *and* its permanent override — being told you're a beginner at a cuisine you grew up with is the main way that feature insults someone. Build the two together rather than shipping two independent notions of familiarity. | M |
| 34 | **Survey feeds tried dishes and the profile, and they reconcile** 🚩 MVP-should | Added 2026-08-29 from notes. Today the intro survey's Love/Like/Nope answers only feed the flavor profile; the dishes you said you loved don't show as tried, so plate progress and the profile disagree about the same meal. **Proposal:** a Love/Like answer auto-logs that dish as tried with `source: 'survey'` and no verdict rating (the survey sentiment stays the profile signal; a real star rating replaces it if you add one); Nope logs a tried dish too, since you did eat it; "Haven't tried" logs nothing. Reverse direction: logging a survey dish yourself should update the survey answer, so there is one truth. Declared favorite / most-experienced cuisines are **not a new input** — they fold into #5's per-country familiarity question. **This is the umbrella for #5 + #6 + #29's cold start:** build as one pass so there is one notion of "what the survey knows about me". Open question: should survey-logged dishes count toward the progress plate at full weight, or show distinctly ("from your survey")? | M |
| 6 | **Edit taste-survey answers** 🚩 MVP-should | Added 2026-08-05, ranked near the end of Tier 2. **Now part of #34's pass.** An easy place to review and change past survey answers (Love/Like/Nope per dish) instead of only retaking the deck. Likely a list view inside the Taste Profile slide-over: answered dishes grouped by country, tap to flip the sentiment or clear it. Pairs naturally with #5 (familiarity weighting), which also lives in survey answers — consider building the two together. | S |
| 7 | **Card plate dots → dominant-flavor colors** | Added 2026-08-05, end of Tier 2 by design. Evolve the shipped plate dots: the dot on each dish/drink card stops encoding *category* and instead takes the color of the dish's **dominant flavor axis** (heat, acidity, sweet, umami, aromatic, smoke/earth — the same fixed axis colors as the Flavor tab's build view, matrix, and radar, from `flavorAxisMeta.ts`). One color language across the whole country page: glance at a card, know what the dish mostly tastes like. **Prereq:** per-dish dominant-axis data — falls out of the #9 content batch, so build after it runs. Category colors (`categoryMeta.ts`) are the interim; category info stays in the card's meta line. **Revised 2026-08-21 (Nikita): check whether per-dish flavor data is overkill before committing to it.** Dissecting six axes for every one of ~300 dishes is the expensive path and probably not necessary for a dot. Explore cheaper sources first, in order: (a) the dish's existing `keyTraits` — a hand-written trait→axis table over the ~40 distinct traits in the data, one table instead of 300 judgments; (b) the dish's **region** fingerprint via `regionFingerprint()` in `dishRegion.ts`, which already derives axes from `keyIngredients` and which the region chips use today, so dishes inherit their region's dominant axis for free; (c) the country's `flavorIntensity` as the floor. Measured during the prototype: the `keyTraits → ingredient → axis` bridge resolves only 5 of 10 CN dishes on its own because traits like "crispy skin" and "soup-filled" name techniques rather than ingredients — so (a) alone is not enough, but (a) falling back to (b) may well be. Spend a session measuring coverage of the cascade across MX/CN/IE before adding a single field to the content batch. Only if coverage stays poor does this need per-dish data from #9. | S (cascade) / S once #9 data exists |

### Foundation — MVP gate (do last in Tier 2)

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 8 | **Mobile audit** 🚩 MVP (the gate) | Moved from Tier 1 (2026-08-05): UI is still churning heavily, so a full audit now would be redone feature by feature. **Decided: run once as the MVP gate** — after all other Tier 2 features are built. Pass over the key surfaces — country page (all 3 tabs), Eat & Drink cards + filters, taste survey, profile slide-over, at-the-restaurant view — and make each genuinely good on a phone (touch targets, layout, no hover-dependent affordances). The home map stays desktop-only (grid view covers mobile). Interim rule: build new features mobile-aware so this is a polish pass, not a rebuild. | M |
| 9 | **Full-country content batch (30 countries)** 🚩 MVP | Added 2026-08-05. **Decided: don't generate for all countries until the schemas/UI stop moving** — iterate on the sandbox trio, Mexico + China + Ireland (hand-mapped), only, then run one consolidated batch at the MVP gate, alongside the mobile audit. The carpool by then likely includes: `flavorAxes` for the remaining non-sandbox countries (see Built: ingredients redesign), per-dish `keySpices` + dominant flavor axis (#4, #7, per-dish match, the shipped at-the-restaurant scoring), and optionally dish twins (#1) + why-dish-exists (#19). One pass per country instead of five separate runs; generation prompt carries the no-em-dash rule (#10). Cost estimate before launching. **Region gap logged 2026-08-23 (measured, not estimated).** Three of the 31 countries — **Ethiopia, Japan and Peru** — carry no `regionalVariations` at all, so they render no map and no Region lens (the page is behaving correctly; the data isn't there). The map config itself is complete: every one of the other 28 countries has an ISO numeric code, a projection, and a coordinate for **every** region, so nothing falls back to the button grid. Each of the three needs 4–6 regions with a name, a description, and `keyIngredients` specific enough for `regionFingerprint()` to derive chips from. Pair this with the other half of the same problem: dishes whose `regionalOrigin` is missing or doesn't match a region's own vocabulary, which is why Brazil's Gaúcho Country and three Mexican regions render empty (#2 leftover, #24). The batch prompt should write regions and dish origins **together**, so origins use the region names as written. **Scope increase for #29 (2026-08-23):** take each country from ~15 dishes to **~30** — the current gateway/everyday set plus ~15 regional or deeper dishes — and add a per-dish `adventurousness: 1 | 2 | 3`. Roughly doubles the content cost of this batch. Writing those extra dishes with `regionalOrigin` values that match each region's own vocabulary fixes the region gap above in the same pass. | Content batch (~30 agents) |

### Foundation

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 24 | **Focused region with no dishes still shows nothing** 🚩 MVP | Added 2026-08-21 from Brazil (`/country/BR?region=gaucho-country`). Focusing Gaúcho Country renders the empty-state card — "Nothing matches these filters. / Clear filters" — and no region description at all, even though the region has one. **Diagnosed:** `nothingMatches = inFocus.length === 0` in `pages/CountryDetail.tsx:202` short-circuits the whole list before `shownGroups` renders, and `shownGroups` is already written to keep an empty focused region (`:157`). So the fix is to make the empty state region-aware rather than page-wide: when a region is focused, still render its `DishSection` header, description, derived flavor chips and key ingredients, and put a smaller "No dishes recorded here yet" note *inside* it. **Why it matters:** the region description is the cultural payload of the region lens, and a region having no dishes in our data is exactly when the description is the only thing we have to offer. It also reads as broken — the copy blames filters when no filter is set. Related but separate: several regions have zero dishes because of missing `regionalOrigin` (#2 leftover, rides #9); this item is the code half and shouldn't wait for the content half. | S |
| 10 | **Remove all em dashes from text** 🚩 MVP (UI half) | Small UI copy fix (added 2026-08-05): sweep UI strings and the generated country/dish content for "—", replace with commas/periods/colons as reads best. Add to the content-generation prompt guidelines so future batches don't reintroduce them. **Split into two halves, 2026-08-23 (counted).** UI copy: **20 component/page files** — a quick sweep, do any time. Generated content: **453 occurrences across `data/countries/*.ts`** — this half should **ride the #9 batch**, because regenerating that prose reintroduces them unless the prompt forbids it, so hand-fixing 453 now is work we'd throw away. Do the UI half standalone; leave the data half to #9. | S (UI) / free with #9 (data) |

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
| 22 | **Normalized sync tables / mobile app** | Scope reduced 2026-08-20: magic-link auth and whole-profile sync **shipped** (see Built), so multi-device already works. What remains is (a) per-entity Postgres tables replacing the single JSON blob, which buys real conflict resolution instead of last-write-wins and is the hard prereq for #23's cross-user aggregation, and (b) the React Native app. Neither is worth doing until the blob's last-write-wins actually bites or a second user exists. |
| 23 | **Revenue model: menu-insight data for restaurants** | Added 2026-08-05. The long-term business case: aggregate flavor fingerprints + dish ratings across cuisines into recommendation data ("diners with X palate love Y dishes"), sellable to restaurants deciding what to put on their menus. Hard prereqs: multi-user product with real scale (depends on #22 Supabase + public launch), and a privacy/consent model since it monetizes user data — aggregate/anonymized only. Nothing to build now; it's a lens for keeping the rating + fingerprint data structured and aggregatable as those systems evolve. |

---

## Inbox (unranked)

Quick captures land here; ranked into tiers during roadmap reviews.

- **Flavor geography: how cuisine changes across a map** — parked 2026-08-23. Analysis in [`designs/flavor-geography.md`](designs/flavor-geography.md), written while choosing the #30 map groupings and kept because the findings outlive that decision. Measured over the six flavor axes: a random pair of the 31 countries sits **5.84** apart; Africa as one group scores **6.48** (worse than random), while **USA + Brazil + Argentina scores 2.31**, the tightest cluster in the data — a grill belt that doesn't touch. Morocco through the Caucasus scores 3.66, tighter than Europe. Four feature ideas fall out: a per-axis gradient map layer (heat belt, acidity belt), neighbour comparison on a country page, a "flavor journey" walking the line between two cuisines, and surfacing discontiguous kinship. Serves the thesis goal of *how cuisines relate to each other*, which nothing currently answers. **Low priority** — parked as ideas, not ranked. (G2/G3)
- **Wishlist map layer** — third layer for the home map toggle (Explored / Flavor Match / **Wishlist**): countries shaded by how many want-to-try dishes you've bookmarked there. The layer plumbing already exists from flavor match. (G2)
- **Trip mode** — "I'm going to Tokyo" → must-try list + Google Maps export. Iceboxed 2026-08-05: Nikita isn't sold on the idea. Revisit only if a real trip makes it feel worth it. (G1)
- **Explored map depth gradient** — replace the flat purple "Dishes Logged" fill with a single-hue ramp (pale lavender → deep violet) by dish count; sage stays categorical for available-but-untouched. Reuses the Flavor Match ramp infra (`lerpHex`, domain stretching, gradient legend bar) and `dishCount` from `useCountryActivity`. Raw count first; coverage-based depth (logged ÷ available dishes) as a later refinement. (G2)
- **Per-dish/drink flavor match** — map the personal flavor profile down to individual foods and drinks: a taste-match indicator on each dish/drink card ("87% you"). Needs per-dish flavor data richer than spiceLevel — the `keySpices` generation in the #9 batch is the likely input; also the scoring ingredient for the shipped at-the-restaurant view and personalized recs (#11), so it may get built as part of those. (G1/G3)

---

## Suggested next session

Updated 2026-08-23, replacing a stale entry that still described #2 as unbuilt
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
