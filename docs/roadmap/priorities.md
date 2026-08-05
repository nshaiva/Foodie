# Feature Priorities

Ranked backlog + idea inbox, updated 2026-08-05. This is the single roadmap
document (the old `features/icebox.md` was merged in). Ranking criteria:
alignment with the **product thesis** (see CLAUDE.md) and impact on the core
loop (**explore → log → taste profile → better exploration**) vs. build effort.
New ideas land in the **Inbox** section at the bottom (via `/idea` or by hand)
and get ranked into a tier during roadmap reviews.

Items within each tier are grouped by the goal they serve:

| Goal | Theme (from the thesis) |
|---|---|
| **G1 🍽 Order & learn at the table** | *Primary* — "I'm at a restaurant trying a new cuisine, what do I order?" + learn the spices and food I'm eating |
| **G2 🗺 Track & explore world cuisines** | *Secondary* — trying / want-to-try / haven't-tried; where cuisines sit in the world; how similar they are to what I've eaten |
| **G3 ✦ Know my own palate** | *Tertiary* — flavor fingerprint, spice affinity, self-knowledge |
| **G4 📖 Cultural depth** | *Quaternary* — history, customs, regions beyond the plate |
| **Foundation** | Serves the app itself (polish, infra) rather than one goal |

Already shipped (not ranked): flavor-match map layer (G2), taste survey (G3),
cuisine similarity section (G2), verdict rating model (Foundation), drinks
section (G1), hover system (Foundation), 30-country data set (Foundation).

---

## Tier 1 — Now (small builds, immediate payoff)

### G1 🍽 Order & learn at the table

| # | Feature | Why now | Effort |
|---|---------|---------|--------|
| 2 | **Dish chip cleanup + dietary/spice filters on Eat & Drink** | Two halves, one pass. **Decided 2026-08-05:** a chip earns its place only if you'd filter by it. **Keep as chips:** spice (add 🌶 prefix — fixes the "Medium Medium" spice/difficulty collision) and dietary (Vegan/Vegetarian/GF). **Remove:** difficulty chip (orphaned home-cooking concept) and the legacy "Street" chip (duplicates the street-food category). **Move to the meta line under the dish name:** region + category (e.g. "Puebla · Main"). Then add dietary + spice filter chips to the existing filter row (All / Tried / Want to try) — the chips that remain are exactly the filterable ones. | S |
| 3b | **Mobile audit** | Added 2026-08-05 from the product thesis: the primary moment happens on a phone, and the app is desktop-leaning today. Pass over the key surfaces — country page (all 3 tabs), Eat & Drink cards + filters, taste survey, profile slide-over — and make each genuinely good on a phone (touch targets, layout, no hover-dependent affordances). The home map stays desktop-only for now (grid view covers mobile). | M |

### Foundation

| # | Feature | Why now | Effort |
|---|---------|---------|--------|
| 1 | **Fix: remove the two "how it's cooked" headings** | Open UI annoyance from notes | XS |

## Tier 2 — Next (the good medium-sized ones)

### G1 🍽 Order & learn at the table

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 10 | **"At the restaurant" view** | Added 2026-08-05 — the Tier 2 headline; the most direct build of the primary thesis. Mobile-first flow: pick the cuisine → ranked what-to-order list, each dish showing taste-match (from the flavor profile), **local-favorite vs tourist-classic tag** (#13's data), spice level, dietary flags, and **pronunciation** (promoted from nice-to-haves — it matters exactly here, telling the server what you want). Bundles #13 and the delivery half of #15 as ingredients rather than separate features. Build after the mobile audit (#3b) so the foundation is solid. | L |
| 13 | **Surface local-favorite vs tourist-classic tags** | Promoted from Tier 3 (2026-08-05): under the thesis this is direct ordering advice, not decoration. Data (`popularity`) already exists on every dish. Can ship standalone on Eat & Drink cards ahead of the full #10 view. | S |

### G2 🗺 Track & explore world cuisines

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 5 | **Taste-driven next-country suggestions** | Demoted from Tier 1 (2026-08-05): duplicates the flavor-match map layer's job on a second surface — feature-bloat risk. Becomes worthwhile as the *mobile* "where next" answer (the map is desktop-only) or if the map layer proves under-used. | S |
| 6 | **Progress plates per country** | % of popular dishes tried — "tried" state already exists; show on country cards, map hover card, country page header. **Decided 2026-08-05:** the indicator is styled like the dot-plate logo (concentric circles) and fills like a pie chart — 30% tried = 30% of the plate filled. Ties the brand mark to progress. Hide at 0% tried (avoid a wall of empty plates across 30 countries). **Build prototypes first** — show Nikita 2–3 visual variants (artifact page, like the hover prototypes) before wiring into the app. | S–M |
| 7 | **Dish twins** | "Khachapuri is Georgia's answer to pizza" — pre-generatable content, great for discovery; pairs with similar-cuisines section. | M (mostly content) |
| 9 | **Regions-explored progress** | Bottom of Tier 2 (2026-08-05): a nice add-on, not a headliner. Light up regions you've logged dishes from on the country page's regional map. Best built as a stretch goal in the progress-plates session — shares the "which dishes count as tried" derivation. Caveat: dish→region matching via `regionalOrigin`/`detectRegion()` is fuzzy; display must tolerate unmapped dishes. | M |

### G3 ✦ Know my own palate

| # | Feature | Why | Effort |
|---|---------|-----|--------|
| 4 | **Custom-dish AI enrichment (Claude API)** | From notes: auto-populate description/traits/spice when adding a custom dish — richer data feeding the palate profile. **Discussed 2026-08-05:** cost is a non-issue at personal scale (~$0.002/dish with Haiku ≈ $0.60/mo at 10/day; Haiku is sufficient for this task). Build v1 as **bring-your-own-key** (Nikita pastes her key in a settings panel, stored in localStorage, browser-direct calls) with a simple daily counter as a runaway-bug guard only. **If the app is published publicly:** move the key into a Vercel serverless proxy with per-visitor daily caps + a global monthly budget kill-switch + locked-down prompt shape; optionally keep BYO-key as the unlimited tier. Prompt/UI unchanged either way — only where the key lives. | M |
| 8 | **Personal spice affinity map** | Added 2026-08-05 from discussion. Which spices is Nikita actually drawn to, beyond the 6-axis flavor profile? **Plan:** (1) pre-generate `keySpices` per dish for all ~300 dishes (same content pipeline as dish twins / #16b — batch those together); (2) normalize into a curated ontology of ~15 spice families (chiles, warm spices, alliums, souring agents, fermented, herbs…); (3) score with **cross-cuisine repetition** (a spice recurring in loved dishes across unrelated cuisines = real signal) + **frequency weighting** (TF-IDF-style — distinctive spices score, garlic doesn't); survey answers count as signal too; (4) visualize as a D3 force layout — spice families as clusters, bubbles sized by affinity. **Research task at build time:** spice science — terpenes / shared aroma-compound data (food-pairing theory) to draw connections *between* spices ("you like citrusy terpenes: coriander, lemongrass, sichuan pepper share them"). Needs ~15–20 rated dishes before patterns beat noise. Supersedes the personal half of #16. | M–L |
| 3 | **Survey familiarity weighting** | Moved from Tier 1 to bottom of Tier 2 (2026-08-05). Nikita's trust issue: "I know Indian food better so I could be more picky." **Decided: direct question.** First time a country appears in the survey, ask "How well do you know this cuisine?" (barely / somewhat / very well) → stored per country (`foodie-cuisine-familiarity`), scales that country's answer weights (~0.5× / 1× / 1.5×) in the profile hook. Asked once per country, pre-filled on retake. Later option: show familiarity as confidence/opacity on the radar. | M |

## Tier 3 — Later (bigger or lower-leverage)

### G1 🍽 Order & learn at the table

| # | Feature | Notes |
|---|---------|-------|
| 15 | **Personalized dish recommendations** | "6–8 dishes per country for you" + "what should I try next?" — both icebox recommendation ideas, one engine; the delivery surface is #10. Survey + profile may already cover 80% of the input side. The conversational **Food Preference Discovery** (Claude interview about textures, ingredients, aversions) is the deluxe input path — evaluate after familiarity weighting (#3) ships. |

### G2 🗺 Track & explore world cuisines

| # | Feature | Notes |
|---|---------|-------|
| 12 | **Cuisine passport / badges / streaks** | Confirmed Tier 3 (2026-08-05): gamification isn't relevant right now — progress plates (#6) cover the satisfying part. Revisit after plates ship, and skeptically (streaks punish normal eating habits in a personal diary). |
| 18 | **City-level data** | Restaurants by city, not just country. De-prioritized further since the standalone Restaurants section was cut. |
| 18b | **Log-from-map flow** | Demoted from Tier 2 (2026-08-05): the Eat & Drink "+ I tried this" flow is already fast, so the saved friction is ~2 clicks — possibly icebox material. Cheap alternative worth doing instead someday: deep-link the map hover card straight to the Eat & Drink tab. |

### G3 ✦ Know my own palate

| # | Feature | Notes |
|---|---------|-------|
| 11 | **Stats dashboard / annual recap** | Fun once there's more logged data. Folds in icebox items: rating distribution ("tough critic or generous rater?"), exploration trends graph, food-journey heat map. Natural trigger: build the recap in **December** with a year of data. |
| 17 | **Ingredient discovery** | Track new-to-you ingredients encountered as you log. Needs an ingredient⇄dish mapping to be meaningful — the #8 `keySpices` data is a head start. |

### G4 📖 Cultural depth

| # | Feature | Notes |
|---|---------|-------|
| 16 | **Regional flavor profiles + cross-region similarity** | Group each region's key spices into a categorized flavor profile, and "this region tastes like {other country}'s {region}". Deepens Culture & Regions; content-heavy (5 regions × 30 countries). The *personal* spice-preference half moved up to #8; what remains here is the static regional content. |
| 16b | **"Why this dish exists"** | Moved from Tier 2 (2026-08-05). Historical/cultural context snippet per dish — same pre-generated-content pipeline as dish twins (#7) and the spice data for #8; if those content batches run anyway, generating this alongside them is nearly free. |

### Foundation

| # | Feature | Notes |
|---|---------|-------|
| 14 | **Custom collections & tags** | Organization power tools; wait for logging volume. |
| 19 | **Seasonal highlights, meal companions** | Nice-to-haves. (Pronunciation moved into #10, the at-the-restaurant view, where it actually matters.) |
| 20 | **Supabase sync / mobile app** | Platform work; unlocks multi-device but changes nothing day-to-day until then. |

---

## Inbox (unranked)

Quick captures land here; ranked into tiers during roadmap reviews.

- **Wishlist map layer** — third layer for the home map toggle (Explored / Flavor Match / **Wishlist**): countries shaded by how many want-to-try dishes you've bookmarked there. The layer plumbing already exists from flavor match. (G2)
- **Trip mode** — "I'm going to Tokyo" → must-try list + Google Maps export. Iceboxed 2026-08-05: Nikita isn't sold on the idea. Revisit only if a real trip makes it feel worth it. (G1)

---

## Suggested next session

Tier 1 top-to-bottom is roughly one session of work: #1 (heading fix) is
minutes, #2 (chip cleanup + filters) is small, #3b (mobile audit) is the meaty
one. Natural calendar trigger elsewhere: build the annual recap half of #11 in
**December**, when a year of data makes it fun. Full walkthrough of every item
completed 2026-08-05.
