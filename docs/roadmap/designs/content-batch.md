# Content batch (#9): the standing spec

Status: **in progress, in waves.** Wave 1 (Mexico, China, Egypt) and India
shipped 2026-10-01; wave 2 is next. This is the spec every wave follows.
The per-wave record (region reviews, dish slates, what changed in the data)
is in [`content-batch-wave1.md`](content-batch-wave1.md). Moved out of
`priorities.md` on 2026-10-02; the history that shaped it is in §6.

Carries roadmap **#37** (images + taglines) and **#10** (no em dashes), and
finishes the content half of **#2** (every dish carries a `regionalOrigin`).

## 1. Scope per country (decided 2026-09-28 with Nikita)

- **~20 dishes**: the current ~10 plus ~10 new ones **written region-first**,
  so every region ends up with at least 2-3 dishes. This is what fixes empty
  regions and the "Across {country}" overflow (Mexico had 9 of 13 dishes
  there before wave 1).
- **Regions** for the three countries that have none: Ethiopia, Japan, Peru
  (4-6 each, with a name, a description, and `keyIngredients` specific enough
  for `regionFingerprint()` to derive chips).
- **Fields written for every dish:**
  - `tagline` (~60-80 chars) and an image prompt (#37). Taglines lead with
    **flavor and vibe, not ingredients** (Nikita, 2026-10-01): what the dish
    tastes and feels like (spices, heat, bright vs rich, comfort vs fresh,
    street vs feast), with less text. Ingredients live behind the tap, in the
    detail sheet. Rules in
    [`docs/design/image-style-pilot.md`](../../design/image-style-pilot.md).
  - `regionalOrigin` using the region's **own name as written**, so
    `resolveRegion()` matches without aliases.
  - `origin.place` (optional): a state or city ("Puebla", "Jalisco"), filled
    **only** when the dish is genuinely tied to one place; blank for widespread
    dishes (chana masala is Punjabi-associated but eaten across the north) so
    the batch never invents false precision. `locality` was folded into this
    field in wave 1; coordinates are optional and put the dish's plate on the
    map.
  - Ingredient `flavorAxes` for the countries not yet hand-mapped (the
    sandbox four plus India have them).
  - **No em dashes** anywhere in generated prose (#10).
  - Optional, because it is cheap and simply shaped: `keySpices` (feeds #4).
- **Dropped from the batch for now:** `adventurousness` and the jump to ~30
  dishes (#29), dish twins (#1), why-this-dish-exists (#19), per-dish dominant
  flavor axis (#7). Each returns when its feature is built.
- Descriptions stay around **150 characters** so a card shows them in four
  lines (measured 2026-08-29).

## 2. Region design step, before each wave

Regions are drawn **where the food actually changes**, not uniformly. Most
countries keep theirs; a few get finer (India did, 6 regions; likely Italy,
maybe Spain and Turkey); some may get fewer (Ireland). A region must pass all
three tests:

1. **The food really changes**: different staples, techniques or flavors.
   `regionFingerprint()` can flag two candidates that come out the same, a
   sign to merge them.
2. **People recognize it**: the name appears on menus and restaurant signs
   ("Punjabi", "Sichuan", "Oaxacan", "Neapolitan").
3. **It can be filled**: 2-3 dishes or more at ~20 per country.

The step is **text only**: list the wave's region changes and get Nikita's
review before anything runs. Each redrawn region needs new hand-maintained
coordinates in `regionMapConfig.ts`, another reason to redraw only where the
tests call for it. Regions can be split later without migrating user data:
a dish's region is resolved from its origin text at read time and never
stored with a log. The costs are new coordinates and redirects for old
region slugs.

**Not a third map level.** A country → region → state click-through was
discussed 2026-09-28 and rejected as navigation: at ~20 dishes a state holds
1-2 dishes, so every click lands on a near-empty screen; state borders for
31 countries plus a third camera threshold is L effort; and many countries
(Ireland, Jamaica, Georgia) have no state-level food identity. `origin.place`
and region-first regions are the substitute. Grouping by place *inside* a
region view (S-M) can be revisited alongside #29's deeper content.

## 3. Images and taglines (#37)

- **Only in style C2** (bold ink and flat gouache), chosen 2026-09-29 from the
  12-prompt pilot (#36). Illustrations were chosen over photo-real partly
  because they need a lighter accuracy review.
- **Dishes only for now**, ~20 per country × 31 ≈ 620 images; drinks keep the
  placeholder tile until after MVP.
- Money is not the real cost (about 2¢ an image; wave 1's 47 images were
  about $1). **Reviewing ~620 images for accuracy is.** Wave 1 passed 47 of
  47 on the first try against the prompt file's checks.
- Output **WebP** directly (wave 1 generated PNG and converted: 57 files,
  60 MB → 3.8 MB). ~40 KB each × 620 ≈ 25-40 MB, fine as static assets on
  Vercel.
- Generator: `scripts/generate-dish-images.mjs`, prompts in
  `docs/design/prompts/`.
- Every country with nationwide dishes needs a water point in `ACROSS_AT`
  (`plateLayout.ts`) or those dishes do not appear on the map at all.

## 4. Waves and the cost guardrail

Standing rule from Nikita (2026-09-28): **never generate in bulk.** Anything
that spends money runs on the sandbox first, gets reviewed, and only then
widens one wave at a time (≈5 countries, then the rest), with a **cost
estimate and Nikita's explicit go before each wave**. If a plan, script or
workflow would generate for every country in one run, stop and ask.

| Wave | Countries | Status |
|---|---|---|
| 1 | Mexico, China, Egypt (re-scoped from MX/CN/IE 2026-10-01) | ✅ shipped 2026-10-01, PR #54 |
| India | full pass on Nikita's ask (6 regions, 22 dishes, 22/22 images) | ✅ 2026-10-01; her local review pending ([wave1 §9](content-batch-wave1.md)) |
| 2 | Ireland (review already approved) + ~4 more | **next**: region design step → cost → go → text → images |
| 3+ | the rest, ≈5 at a time | after wave 2's review |

Each wave: region design step (text) → Nikita's review → cost estimate →
go → text generation → data review → images → image review → ship.

## 5. Measured facts worth keeping

- Before wave 1 the dataset was **294 dishes** (~9.5 per country) plus
  **155 drinks** (exactly 5 per country). The "449" figure counted both.
- Em dashes: **453 occurrences** in `data/countries/*.ts` and **20 UI
  files** as of 2026-08-23. Hand-fixing the content half would be thrown away
  by regeneration, which is why it rides the batch. UI copy can be swept any
  time.
- Map config was complete for all 28 countries with regions before the
  batch: every region had a coordinate, nothing fell back to the button grid.
- Dish → region matching without data edits: China 13/15, Mexico 4/13,
  Ireland 12/15 (the alias join in `dishRegion.ts`, 2026-08-21). Wave 1 took
  Mexico to every item resolving.

## 6. History

- **2026-08-05**: added as one consolidated batch at the MVP gate, so
  schemas and UI could stop moving first. Sandbox: Mexico + China (+ Ireland).
- **2026-08-23**: region gap measured (Ethiopia, Japan, Peru have no
  regions). Scope grew to ~30 dishes + `adventurousness` for #29.
- **2026-08-29**: #10 em dashes folded in, both halves.
- **2026-09-28**: re-scoped with Nikita to ~20 dishes, MVP fields only, in
  waves; region design step added; `locality` proposed.
- **2026-09-30**: Egypt joined the sandbox (taglines, four illustrated
  dishes).
- **2026-10-01**: wave 1 became MX/CN/EG; text and images ran; `locality`
  folded into `origin.place`; India done as a full pass. Taglines re-ruled to
  lead with flavor and vibe.
