# Feature Priorities

Ranked backlog + idea inbox. Reorganized 2026-10-02, after the MVP launched.

**How to read this file.** The top is meant to be skimmed: **Now** is the
next few sessions in order, **Next** and **Later** are the ranked tiers
grouped by the goal they serve, **Inbox** is unranked captures. Each item is
one or two lines; detail lives in a linked design doc or in the
**[Appendix](#appendix)** at the bottom. Shipped work is in
[`built.md`](built.md) (the changelog) and [`implemented/`](implemented/)
(specs for shipped features). Item numbers are stable IDs, not ranks;
position is the rank.

**Ranking criteria:** alignment with the product thesis (CLAUDE.md) and
impact on the core loop (explore → log → taste profile → better exploration)
vs. build effort. When goals conflict, the restaurant moment (G1) wins.

| Goal | Theme (from the thesis) |
|---|---|
| **G1 🍽 Order & learn at the table** | *Primary*: "I'm at a restaurant trying a new cuisine, what do I order?" and learn the spices and food I'm eating |
| **G2 🗺 Track & explore world cuisines** | *Secondary*: tried / want to try / not yet; where cuisines sit in the world; how similar they are to what I've eaten |
| **G3 ✦ Know my own palate** | *Tertiary*: flavor fingerprint, spice affinity, self-knowledge |
| **G4 📖 Cultural depth** | *Quaternary*: history, customs, regions beyond the plate |
| **Foundation** | Serves the app itself (polish, infra, content) rather than one goal |

**Two standing rules** (full text in [Appendix A](#a-standing-rules)):
**done means checked on a real phone at 390px**, and **never generate in
bulk**: anything that spends money runs on the sandbox first, then one wave
at a time with a cost estimate and Nikita's go before each.

---

## Where we are

**MVP shipped** (2026-09-29 → 2026-10-01): open a country on the map, see
what its food is like, browse dishes by region, save what you want to try,
log what you tried, on a phone and on desktop. Explore is the home page, the
heart is gone, the survey and the log agree, and Mexico, China, Egypt and
India have region-first content with illustrated dishes. **Order well folded
into Explore the day after** (2026-10-02): a cuisine search on the map lands
you on the country ranked for you, and the separate restaurant page is gone.
History of the cut and build order: [Appendix B](#b-mvp-history).

**Recently shipped** (details in [`built.md`](built.md)):
- 2026-10-02 · One verdict per dish: visits hidden, "Ate it again", an optional where line (#64)
- 2026-10-02 · Cleanup: old pages and Finder duplicates deleted; zoom buttons ride above the phone sheet (#65)
- 2026-10-02 · Order well folds into Explore: personal strip, Ranked / Region toggle, "Where are you eating?" search (#42, PR #62)
- 2026-10-02 · Explore map: caps under an open fan fade
- 2026-10-01 · Explore map: dishes where they are from, calmer at every zoom (PR #54)
- 2026-10-01 · Content batch wave 1: Mexico, China, Egypt; India full pass (#9, #36, #37)
- 2026-09-30 · Order well: the restaurant view decluttered (half of #42)
- 2026-09-29 · Explore panel declutter (#39); two dish states (#40); survey reconciliation (#34 + #6); Explore as home (#41)

---

## Now: the next few sessions, in order

| # | Item | Goal | What it is | Effort |
|---|------|------|------------|--------|
| 9 | **Content batch, wave 2** | Foundation (G1/G2) | Ireland (review approved) + ~4 countries. Region design step as text → cost → Nikita's go → text → images. Generator should emit WebP and add an `ACROSS_AT` water point per country. Spec: [`designs/content-batch.md`](designs/content-batch.md). Carries #37 images and #10 em dashes. | Content, per wave |
| 38 | **Region image preview** | G1 | A strip of dish thumbnails under a region's name so "this is where the stews are" reads at a glance. Nearly free after #39; MX, CN, EG, IN have the images. | S |
| 8 | **Final mobile sweep** | Foundation | A session or two over the surfaces no MVP item touched (taste survey, profile slide-over, account & backup panel) plus cross-screen consistency. The zoom-button item shipped 2026-10-02; the filter rail's edge fade and taps while zoomed are still unverified on device. | S |

**Small follow-ups, do alongside:** the Want to try header says "0 dishes
saved" when only Favorites has content; the ranking ignores Love vs Nope on
unrated survey dishes; the profile's "Log N more dishes" count ignores
survey answers; convert any remaining dish PNGs to WebP.

---

## Next (Tier 2)

### G1 🍽 Order & learn at the table

| # | Item | What it is | Effort |
|---|------|------------|--------|
| 42 | **At a table: what's left of the restaurant flow** | The main ask shipped 2026-10-02 (PR #62): the strip is the top of your personal ranking, All dishes toggles Ranked / Region, a "Where are you eating?" search on the map replaces Order well. Left: the "at a table" context from option 3 (a lit country, the ranked list narrowed by region, where a menu-photo result lands), to judge on a real phone whether it earns its banner; and text loading before images on weak cellular. #44 and #45 ride this. Design: [`designs/order-well-into-explore.md`](designs/order-well-into-explore.md). | M |
| 29 | **Cuisine familiarity levels** (First plate · Second helping · Off-menu) | What you're offered depends on how well you know a cuisine, per country: new means fewer, more fundamental dishes; deep means the nuanced ones first. Nothing hidden, one tap shows everything. **Build together with #5**, whose declared familiarity is the cold start and permanent override. **Gated on content:** needs ~30 dishes per country (#9 is at ~20). Spec: [`designs/cuisine-familiarity-levels.md`](designs/cuisine-familiarity-levels.md). | M + content |
| 37 | **Images + taglines for every dish** | Rides #9's waves. Style C2 is fixed; dishes only, drinks later. Detail in [`designs/content-batch.md` §3](designs/content-batch.md). | Inside #9 |
| 44 | **Menu lookup verifies before it invents** | Ranked 2026-10-02 from the inbox. Match our own dishes first, then have the model check the name, and only then describe it; a miss says "we couldn't confirm this dish, closest known: X" instead of a confident invented card. Fixes the shipped lookup today and is the **gate for #43**. Rides #42's remainder. Detail: [Appendix D](#d-inbox-detail). | S-M |
| 45 | **"Know a dish from {region} we're missing?"** | Ranked 2026-10-02 (option A of [`designs/community-dish-cards.md`](designs/community-dish-cards.md)). The existing "Not on the menu?" lookup, offered from a region's list and saved with an `origin` so `resolveRegion()` files it and the plate lands on the map. The only part of #43 worth building for one user. Rides #42's remainder. | S |

### G2 🗺 Track & explore world cuisines

| # | Item | What it is | Effort |
|---|------|------------|--------|
| 1 | **Dish twins** | "Khachapuri is Georgia's answer to pizza." Pre-generatable content, rides a #9 wave once the batch is past MVP fields; pairs with the similar-cuisines section and #19. | M (content) |
| — | **Dish plates on the map: what's still open** | World-view crowding rules once many countries have images, how pins coexist with the map's colouring, personal state on plates. [`designs/dish-plates-on-the-map.md`](designs/dish-plates-on-the-map.md). | S each |
| 35 | **Phone opens on a grid of the 8 regions** (experiment) | Instead of the world map, the phone opens on eight region tiles; tap one to zoom there. Decide by feel on a device; keep one entry, delete the other. **Possibly moot** now that the phone world view is framed on the 31 cuisines' land with pins. | S |

### G3 ✦ Know my own palate

| # | Item | What it is | Effort |
|---|------|------------|--------|
| 4 | **Personal spice affinity map** | Which spices you're drawn to, beyond the six axes: `keySpices` per dish (#9) → ~15 spice families → scored by cross-cuisine repetition and TF-IDF-style distinctiveness → D3 force layout. Needs ~15-20 rated dishes. Plan in [Appendix C](#c-item-notes). | M-L |
| 5 | **Survey familiarity weighting** | First time a country appears in the survey: "How well do you know this cuisine?" (barely / somewhat / very well), stored per country, scales that country's answer weights. **Build with #29.** | M |
| 7 | **Card plate dots → dominant-flavor colors** | The dot on a dish card takes the colour of its dominant flavor axis instead of its category. **Check whether per-dish data is overkill first:** measure a `keyTraits` → region fingerprint → country cascade on the sandbox before adding a field to #9. [Appendix C](#c-item-notes). | S |

### Foundation

| # | Item | What it is | Effort |
|---|------|------------|--------|
| 10 | **Remove all em dashes** | Rides #9: the generation prompt forbids them, and each wave sweeps its countries. UI copy (20 files) can be swept any time. | S, inside #9 |
| 46 | **Spend ledger: $50 alert, $75 soft stop, across all users** | Ranked 2026-10-02 (from [`designs/community-dish-cards.md`](designs/community-dish-cards.md)). The lookup's monthly call counter becomes a cents ledger shared by every paid path; one email to Nikita at $50, generation soft-stops at $75 while cached cards keep working. Worth doing before #43: the lookup already spends money behind a call counter. **Zero-code first step, do now:** set $50 alerts and ~$75 limits in both the Anthropic and OpenAI consoles. | S |

---

## Later (Tier 3)

| # | Item | Goal | One line |
|---|------|------|----------|
| 11 | Personalized dish recommendations | G1 | "6-8 dishes per country for you" + "what next?"; one engine, delivery surface is Order well. Conversational preference interview is the deluxe input, after #5. |
| 19 | "Why this dish exists" | G4 | Historical snippet per dish, **including colonial and trade roots** (what arrived with whom, what it displaced; Nikita 2026-10-01). Rides #9, feeds #1. |
| 18 | Regional flavor profiles + cross-region similarity | G4 | "This region tastes like {other country}'s {region}". Content-heavy. |
| 15 | Stats dashboard / annual recap | G3 | Rating distribution, trends, heat map. Build the recap in **December**. |
| 16 | Ingredient discovery | G3 | New-to-you ingredients as you log; #4's `keySpices` is the head start. |
| 17 | Shareable taste-profile cards | G3 | One-way share-out image or link of data the app has. Stays clear of the social non-goal. |
| 12 | Cuisine passport / badges / streaks | G2 | Progress plates cover the satisfying part; revisit skeptically. |
| 14 | Log-from-map flow | G2 | Saves ~2 clicks; cheap alternative is a deep link from the hover card. |
| 13 | City-level data | G2 | De-prioritized since the restaurants section was cut. |
| 20 | Custom collections & tags | Foundation | Wait for logging volume. |
| 21 | Seasonal highlights, meal companions | Foundation | Nice-to-haves. |
| 22 | Normalized sync tables / mobile app | Foundation | Per-entity Postgres tables (real conflict resolution, prereq for #23) and the React Native app. Not until last-write-wins bites or a second user exists. |
| 23 | Revenue model: menu-insight data for restaurants | Foundation | Aggregate, anonymized palate + rating data for restaurants. Nothing to build now; a lens for keeping data aggregatable. |
| 43 | Community dish cards: the shared pool, adopt, city dots | G1/G2 + Foundation | A signed-in user uncovers the one dish of a city we don't cover; the card joins a shared pool with a "Community" mark that everyone sees and can adopt; faint city dots as the way in. Decisions taken 2026-10-02. **Trigger: a second user exists** (same as #22) and #9 has covered the country, so the pool fills gaps rather than replacing the batch. Gated on #44; #45 and #46 come first. Payment (credit packs) and tap-anywhere generation stay off the board. [`designs/community-dish-cards.md`](designs/community-dish-cards.md), [Appendix D](#d-inbox-detail). |

---

## Inbox (unranked)

Quick captures, grouped by goal. One line each; the full note for every item
is in [Appendix D](#d-inbox-detail). Ranked into a tier during roadmap
reviews. New ideas via `/idea` or by hand.

**G1 · at the table** (most of these fold into #42's remainder)
- **Photo of the menu → what to order**: regional read of the menu + ordering help on the dishes in front of you. L, but the most direct answer to the thesis moment on the board.
- **Order a balanced meal, with swaps**: compose an order from the cuisine's own meal structure; "more savory? this instead". Inside #42.
- **Restaurant rows show the dish's region** ("Oaxaca", "Sichuan"). S, inside #42.
- **Tap in for ingredient details**: ingredient list in the dish detail sheet once dishes carry `keySpices`. S.
- **Per-dish flavor match** ("87% you") on cards; needs `keySpices`; also the scoring ingredient for #11.
- **Trip mode**: "I'm going to Tokyo" → must-try list. Iceboxed; revisit if a real trip makes it feel worth it.

**G2 · the map**
- **Wishlist map layer**: countries shaded by bookmarked dishes. Layer plumbing exists.
- **Explored map depth gradient**: single-hue ramp by dish count instead of flat purple.
- **Flavor geography**: per-axis gradient layers, neighbour comparison, a "flavor journey" between two cuisines. Analysis in [`designs/flavor-geography.md`](designs/flavor-geography.md). Parked.

**G3 / Foundation · the profile**
- **Import food tastes from ChatGPT / Claude chats**: Foodie exposes an MCP server over the user's taste data plus a copy-paste extraction prompt; needs a server that owns the data. Nikita's preferred route.
- **Login flow?** (2026-09-30, one word; magic-link auth exists, so this is a question about the entry.)

**G4 · culture**
- **Capital city marker on the regional map.** Pure orientation aid; new per-country data.

---

# Appendix

Detail that did not earn a design doc. Skim the top of the file; come here
when you need the reasoning.

## A. Standing rules

**Done means mobile-checked.** An item isn't done until it passes on a real
phone at 390px: touch targets ≥ 44px and nothing hover-dependent; works in
all three sheet snaps (strip / half / full) where relevant; no sideways
scroll, text readable without zooming; checked on an actual device, not only
desktop devtools. (The old `/country/:id` page and Home were deleted 2026-10-02, so nothing is
left to skip.)

**Cost guardrail: never generate in bulk.** Standing rule from Nikita
(2026-09-28): anything that spends money on generation (dish images, the #9
content) runs on the **sandbox first** (Mexico, China, Ireland, Egypt; India got a
full pass on Nikita's ask 2026-10-01), gets reviewed, and only then widens **one wave at a time**
(≈5 countries, then the rest), with a cost estimate and Nikita's explicit go
**before each wave**. If a plan, script or workflow would generate for every
country in one run, stop and ask instead.

**Roadmap habits.** Discuss effort, impact and priority before building; build
only on an explicit go. On ship: entry in `built.md`, row removed here, offer
a commit (branch → PR → squash). Nikita edits this file herself mid-session:
re-read or diff before rewriting so her additions survive.

## B. MVP history

**The cut** (first 2026-08-29, re-scoped 2026-09-28): MVP proves regional
exploration on a phone and on desktop. The restaurant flow ships decluttered
but otherwise frozen: its only MVP changes were #40's heart removal, a visible
entry from Explore (#41) and the "Order well" declutter (pulled in 2026-09-30).
This narrowed focus *for MVP only*; the restaurant moment stays the primary
goal. *Superseded 2026-10-02:* Order well folded into Explore (a cuisine
search, then the country's All dishes ranked for you), so there is no
separate restaurant view any more.

**Build order** (decided 2026-09-28 with Nikita), as it played out:

1. ✅ #40 Two dish states (2026-09-29)
2. ✅ #36 Image style pilot: style C2 chosen 2026-09-29, shipped with wave 1
3. ✅ #39 Explore panel declutter (2026-09-29)
4. ⏳ #38 Region image preview (now in **Now**)
5. ✅ #41 Explore becomes the home page (2026-09-29)
6. ✅ #34 Survey reconciliation + #6 (2026-09-29)
7. ⏳ #9 Content batch in waves: wave 1 (MX, CN, EG) + India ✅ 2026-10-01; wave 2 next
8. ⏳ #8 Final mobile sweep (now in **Now**)

**Shipped from the first cut:** #3 menu lookup, #24, #31, #32, #33. **Tier 2a**
(small UX, 2026-08-29): #32, #33, #24 shipped; #10 rides #9. **Explicitly not
MVP:** #42 (first after), #29, #1, #4, #7, #19, #35, all of Tier 3, the inbox.

**The one-map trial** (2026-08-30 → 2026-09-28) that turned the map into the
app, with the wine-map borders and the phone sheet, is recorded in
[`implemented/one-map-explore.md`](implemented/one-map-explore.md).

**Next-session notes, superseded.** 2026-10-01: wave 2 → #38 → #8 (now the
order of **Now**; #42's main ask shipped the next day). 2026-09-29: steps
1, 5, 6 shipped; #36 prep text-only while the phone-map work was in flight on
`explore-mobile`; parallel code work in separate worktrees because two
sessions shared one tree. 2026-08-23: #27 shipped as a scoped exception to
#8; #9 flagged as the largest item on the board and to be costed; recap half
of #15 in December.

## C. Item notes

**#42 Rethink the restaurant flow.** Added 2026-09-28 from Nikita: the
at-the-restaurant view needs its own end-to-end user-flow pass, separate from
regional exploration. The declutter half shipped 2026-09-30 as "Order well".
**Leading direction (2026-10-02, from Nikita): collapse Order well into
Explore**, so searching or tapping a country lands you on it already ranked
for you. Two facts found while scoping: Explore's "Start with these" was
rule-picked by popularity, not personalized, so the ranking had to move into
the panel; and Explore had no country search, so a search-first "Where are
you eating?" entry with recents was a prerequisite (a table needs the cuisine
in two taps). Six options were drawn; **Nikita picked option 1, simplified:**
the four tiles are the top of the personal ranking, "See all" opens ranked
with one Ranked / Region toggle, reasons move to the dish sheet. **Shipped
the same day** (PR #62): tiles and a quiet subtitle won over rows, a caption
beside the toggle names the order, the old routes redirect and the restaurant
page is deleted. **What's left:** the "at a table" context from option 3 (a
lit country, region narrowing of the ranked list, where the menu-photo result
lands), to judge on a real phone; and text loading before images on weak
cellular. The in-place expansion question is moot: the dish sheet is the one
detail now. **Inbox ideas that belong to this remainder:** restaurant rows
show the dish's region, order a balanced meal with swaps, photo of the menu
(Appendix D); #44 and #45 are ranked alongside it.

**#29 Cuisine familiarity levels.** Added 2026-08-23. Level is per country,
never global; earned from behaviour (`countryDishProgress()` plus spread
across regions and categories) and cold-started by #5's declared familiarity,
which also overrides it permanently. Names are food-native rather than
beginner/advanced, which would rank the eater. Food only: drinks never
truncate (exactly 5 per country). The seed is already collected: the survey
offers 2 dishes per country and "Haven't tried it" is a distinct answer. A
manual per-country override (`foodie-cuisine-level`, add to `syncKeys.ts`)
always wins. Progress plates should count against the list your level shows,
else a beginner's plate never fills; where the level is displayed is open (a
label beside the plate is the obvious spot). Don't fake a level before #29
ships. Content gate: ~30 dishes per country plus `adventurousness: 1 | 2 | 3`,
both dropped from #9's MVP waves and returning with this item.

**#4 Personal spice affinity map.** Added 2026-08-05. (1) `keySpices` per
dish from #9; (2) normalize into ~15 spice families (chiles, warm spices,
alliums, souring agents, fermented, herbs…); (3) score with cross-cuisine
repetition (a spice recurring in loved dishes across unrelated cuisines is
real signal) plus frequency weighting (TF-IDF-style: distinctive spices
score, garlic doesn't); survey answers count too; (4) D3 force layout, spice
families as clusters, bubbles sized by affinity. Research at build time:
terpenes and shared aroma compounds to draw connections *between* spices
("you like citrusy terpenes: coriander, lemongrass, sichuan pepper"). Needs
~15-20 rated dishes. Supersedes the personal half of #18.

**#5 Survey familiarity weighting.** Nikita's trust issue: "I know Indian
food better so I could be more picky." Direct question, asked once per
country, pre-filled on retake; stored in `foodie-cuisine-familiarity`; weights
~0.5× / 1× / 1.5× in the profile hook. Later: familiarity as confidence or
opacity on the radar. Build with #29 so there is one notion of familiarity;
being told you're a beginner at a cuisine you grew up with is the main way
#29 insults someone.

**#7 Plate dots → dominant-flavor colors.** Same fixed axis colours as the
radar (`flavorAxisMeta.ts`), so one colour language across the page. Nikita
(2026-08-21): check whether per-dish flavor data is overkill. Cheaper sources
in order: (a) a hand-written trait → axis table over the ~40 distinct
`keyTraits`; (b) the dish's region fingerprint via `regionFingerprint()`; (c)
the country's `flavorIntensity` as the floor. Measured: (a) alone resolves
only 5 of 10 CN dishes because traits like "crispy skin" name techniques, so
(a) falling back to (b) is the likely answer. Spend a session measuring the
cascade on the sandbox before adding a field to #9. Category colours
(`categoryMeta.ts`) are the interim.

**#8 Mobile sweep.** Re-scoped 2026-09-28: no longer one audit at the end,
since every screen is now designed at 390px first. Per-item checks happen
inside each item (Appendix A); the sweep covers only what no item touched.
Found 2026-09-29: the half-height sheet covers the map's +/− zoom buttons;
pinch works, but the control should move above the sheet or hide at half.
History: moved out of Tier 1 2026-08-05 while the UI churned; #27 (the
restaurant phone pass) shipped as a scoped exception.

**#35 Phone region grid.** `CULINARY_REGIONS` and `RegionMap`'s controlled
focus already exist, so a prototype is cheap. Independent of everything else.

**#1 Dish twins.** Pairs with the similar-cuisines section; #19's colonial
and trade roots explain why neighbouring cuisines share dishes, so the two
feed each other.

**#2 Dish ↔ region cross-linking** shipped 2026-08-21 as the unified country
page; what remained was content (missing `regionalOrigin`), now handled by
#9's region-first dishes. Mexico is fixed by wave 1; Ireland's one unmatched
origin ("Rural west and north") goes with wave 2.

**#11 Recommendations.** Both icebox recommendation ideas are one engine;
survey + profile may cover 80% of the input side. The conversational Food
Preference Discovery (a Claude interview about textures, ingredients,
aversions) is the deluxe input path.

**#17 Shareable cards.** Link form needs somewhere for data to live (#22) or
state encoded in the URL; a rendered-image export could ship without either.

**#22.** Magic-link auth and whole-profile sync shipped 2026-08-20, so
multi-device works. Per-entity tables buy real conflict resolution instead of
last-write-wins and are the hard prereq for #23's cross-user aggregation.

**#23.** Hard prereqs: a multi-user product with real scale (#22 plus a public
launch) and a privacy/consent model, aggregate and anonymized only.

## D. Inbox detail

**Previews lead with flavor and vibe, not ingredients** (2026-10-01). Now a
rule in [`designs/content-batch.md`](designs/content-batch.md) §1; the Mexico
taglines written before it should be re-read against it.

**Tap in for ingredient details** (2026-10-01). The dish detail sheet (#39)
is where the ingredient list and the long description live; the card stays
flavor-first. Today the sheet shows the description and no ingredient list,
so this is a small addition once dishes carry structured ingredients
(`keySpices` from #9 is the nearest data). (G1)

**Restaurant rows show the dish's region** (2026-10-01). Each row in Order
well names where in the country the dish comes from, since region is the
thing a menu rarely tells you. Confirmed: the *dish's* region, not a guess at
the restaurant's. `resolveRegion()` already answers this. (G1, #42)

**Menu lookup verifies before it invents** (2026-10-01; ranked as **#44**, 2026-10-02). When a diner types
or later photographs a dish, first establish that it is a real dish of that
cuisine: match our own dishes (name similarity, alternate spellings, shared
words, same category), then have the model check the name, and only then
describe it. Today the lookup returns a confident AI card for any string with
a small "not confident" flag; that flag should become the default posture, so
a miss says "we couldn't confirm this dish, closest known: X". Changes the
`menu-lookup` edge function's prompt and the card copy. (G1, #42)

**Order a balanced meal, with swaps** (2026-10-01). Compose an order, not
just one dish: a rich + a bright + a starch, or whatever that cuisine's
`foodCulture.mealStructure` describes, plus "want something more savory? this
instead" swaps on the same axis. Uses the six axes and `keyTraits`; the hard
part is the interaction on a phone at the table. (G1, #42)

**Photo of the menu → what to order** (2026-10-01). Two outputs from one
photo: (a) a **regional read**: what regional cuisine this is ("broadly
Middle Eastern, but the names point to Syrian"), the share of dishes per
region and what is typical there; (b) **ordering help on the actual menu**:
which dishes match your palate, which are the fundamentals, and the
balanced-order suggestion applied to the dishes in front of you. Clarified
2026-10-01: the earlier one-word "photos?" meant this, not dish or user
photos. Needs a vision-capable call behind the existing `menu-lookup`
function (same caps, same AI-generated label), the verification rule above,
and good `regionalOrigin` coverage from #9. L. (G1, with G4 for the regional
read)

**Import food tastes from ChatGPT / Claude chats** (2026-10-01). Years of
chats already contain what someone likes, avoids and has tried. (1) Foodie
exposes an MCP server (or plain API) over the user's taste data (survey
answers, verdicts, affinities, aversions) so an assistant can write into it;
(2) a copy-paste prompt for ChatGPT / Claude: "I've connected Foodie, export
what you know about my food preferences in this schema", modeled on the
memory-extraction prompts people use. The connector stays live afterwards.
Foodie's UI must let the user see and edit what was imported. Nikita's
alternative, "build a different harness", was left open; the connector is her
preferred route. Prereqs: an account (shipped) and a server that owns the
data, which the localStorage-first model doesn't yet have. (G3 + Foundation)

**Collapse Order well into Explore** (2026-10-02). Became #42's direction
and shipped the same day (PR #62); see Appendix C and the design doc.

**Regional specificity: split regions over time, no state level**
(2026-09-28). Decided against a third map level; regions drawn where the food
changes plus `origin.place` on dishes instead. Full reasoning in
[`designs/content-batch.md`](designs/content-batch.md) §2. (G2/G4)

**Flavor geography** (parked 2026-08-23). Over the six axes a random pair of
the 31 countries sits 5.84 apart; Africa as one group scores 6.48 (worse than
random) while USA + Brazil + Argentina scores 2.31, the tightest cluster in
the data, a grill belt that doesn't touch. Four ideas: a per-axis gradient
layer (heat belt, acidity belt), neighbour comparison on a country page, a
"flavor journey" between two cuisines, surfacing discontiguous kinship.
Serves the thesis goal of how cuisines relate, which nothing answers yet.
(G2/G3)

**Wishlist map layer.** Third layer beside Explored / Flavor Match: countries
shaded by how many want-to-try dishes you've bookmarked there. (G2)

**Explored map depth gradient.** Pale lavender → deep violet by dish count;
sage stays categorical for available-but-untouched. Reuses the Flavor Match
ramp (`lerpHex`, domain stretching, gradient legend) and `dishCount` from
`useCountryActivity`. Raw count first; coverage-based later. (G2)

**Per-dish/drink flavor match.** A taste-match indicator on each card ("87%
you"). Needs per-dish flavor data richer than spiceLevel (`keySpices`); also
the scoring ingredient for Order well and #11, so it may get built as part of
those. (G1/G3)

**Capital city marker.** Small star at the capital's coordinates on the
country map, matching the icon beside the capital's name. Builds on
`RegionalMap.tsx` + `regionMapConfig.ts`; capital lat/lng is new data. (G4)

**Trip mode.** "I'm going to Tokyo" → must-try list + Google Maps export.
Iceboxed 2026-08-05: Nikita isn't sold. (G1)

**Community dish cards: uncover a city, everyone keeps the card**
(2026-10-02, from Nikita; an idea from her partner). **Ranked 2026-10-02 as
four rows:** #44 lookup verification (gate), #45 option A (Tier 2, G1, inside
#42), #46 the spend ledger (Tier 2, Foundation), #43 the pool, adopt and
city dots (Tier 3, triggered by a second user). Reasoning: with one user the
pool is "my generated cards persist on the map", which #45 gives for free;
A plus verification is the most direct S-cost improvement to the restaurant
moment. To amortize the cost of
cards below the region level, let the user who wants one pay for it: from a
region (or a faint, hover-named dot for a major city with no dishes yet) ask
the app to generate the one common dish of that place, or add a dish seen on
a menu that we don't have. The card goes into a shared pool with a
"Community" mark, shows up for everyone who opens that city, and can be
adopted into their own data. Scoping found most of it exists: the
`menu-lookup` edge function already generates a card, caches it in
`dish_lookups` (a proto-pool nobody reads), and carries the caps Nikita
fronts. The decisive number: a full card is ~3¢ (2¢ image + text), while a
Stripe charge floors at 30¢, so per-card payment costs ten times the card;
sharing is the amortization, payment is a late guardrail (credit packs
behind the free cap, never at signup). **Decided the same day:** community
cards look identical to batch cards plus a small "Community" mark; every
generated card gets its image at once (no text-first stage); only signed-in
users generate into the pool, each under a monthly cap (raising a heavy
user's cap is a later idea); the city list goes deep, towns included, with
caps rather than list length controlling cost. **Plus a spend alert across
all users:** the lookup's monthly call counter becomes a cents ledger shared
by every paid path, emails Nikita once when the month passes $50, and
soft-stops generation at $75 while cached cards keep working (console spend
alerts at both providers as the zero-code backstop). Gated on "Menu lookup
verifies before it invents". Design with three map entry points, the pool
table, adoption, quality rules and a staged who-pays answer:
[`designs/community-dish-cards.md`](designs/community-dish-cards.md).
(G1/G2 + Foundation)

**Dish plates on the map** (2026-09-29 → 2026-10-02). Mostly shipped; design
record and open items in
[`designs/dish-plates-on-the-map.md`](designs/dish-plates-on-the-map.md). (G2)
