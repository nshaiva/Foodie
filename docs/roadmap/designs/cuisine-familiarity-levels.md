# Cuisine Familiarity Levels — Design Spec

Status: designed, not built (2026-08-23). Roadmap #29. Gated on #9 for content.

## What it is

What you're offered in a cuisine depends on how well you already know it.

- **First plate** — new to this cuisine. You get *fewer* options, weighted to
  the fundamentals, because standing in front of an unfamiliar menu is a moment
  of too much choice, not too little.
- **Second helping** — you've had a few things. Wider spread, deliberately
  across regions and categories, so variety is the point.
- **Off-menu** — you know this cuisine. The nuanced dishes surface first, the
  ones you'd never pick on a first visit.

Level is **per country, never global**. First plate in Ethiopian while Off-menu
in Indian is the normal case, not an edge case.

The names are food-native on purpose. "Beginner / intermediate / advanced"
ranks the eater; "first plate / second helping / off-menu" describes where you
are in a meal, and "off-menu" carries exactly the right meaning for the deep
tier: the thing you ask for once you know the place.

## Scope: food only

**Levels never apply to drinks.** All of a country's drinks always show, in the
same order, at every level.

The data settles it: there are **exactly 5 drinks per country, 155 in total**
(minimum 4 in Ethiopia, maximum 6 in India). A First plate *food* list is ~5
dishes, so a country's entire drink list is already the size of the most
truncated food list — cutting it further would leave two drinks, which isn't a
recommendation, it's a shrug.

Two other reasons it would be wrong even with more drinks. Drink familiarity
doesn't track food familiarity: someone who has never eaten Thai food has very
likely had Thai iced tea, and someone deep in Indian food may never have
touched an Indian drink. And in the moment this feature exists for — sitting at
a table deciding what to order — the drink is the small decision. Spending
choice-reduction on it buys nothing.

The one connection worth keeping: at Off-menu, a drink may carry a level-aware
line through the existing `reasons[]` mechanism, so drinks aren't silently
outside the system.

## Why it works with existing data

Three pieces already exist, so this is new terms in an existing engine rather
than a parallel one.

- **`rankDishesForOrdering()`** (`apps/web/src/utils/orderRanking.ts`) already
  scores every dish and returns human-readable `reasons[]`. Level becomes
  additional scoring terms plus a truncation rule, and the existing `reasons`
  mechanism is how a level change stays explainable.
- **`countryDishProgress()`** (`apps/web/src/utils/dishProgress.ts`) already
  computes tried/total per country by name and `englishName` — the raw input
  for an *earned* level.
- **Roadmap #5** already proposes a *declared* familiarity per country
  ("How well do you know this cuisine?" → `foodie-cuisine-familiarity`). That
  is this feature's cold start and its override. **Build the two together** —
  two independent notions of familiarity in one app is a bug waiting to happen.

The depth axis also partly exists. Across the corpus, `popularity` splits
**165 "both" / 99 "local-favorite" / 30 "tourist-classic"**, which is roughly
gateway dishes versus deeper cuts. Usable as an interim proxy, but it was
authored to answer "who eats this", not "how adventurous is this" — see the
risks.

## What the data actually holds today

**294 dishes across 31 countries, averaging 9.5 each** (min 8, max 10), plus
155 drinks — 449 items in total. That is the entire dataset; there is no deeper
bench sitting behind the UI.

*Corrected 2026-08-23: this section previously said "449 dishes, averaging
14.5", which counted `popularDishes` and `popularBeverages` together. The real
dish count is 294, so the content lift below is 9.5 → 30 per country, not
14.5 → 30 — a bigger job than first stated.*

This is the reason the feature can't be built yet. Ship the mechanism against
today's content and "Off-menu" would reorder the same nine dishes — an advanced
tier with nothing advanced in it. **This is a content problem before it is a UI
problem.**

## Algorithm

### 1. Compute the level

Earned from behaviour, seeded by declaration.

```
level(countryId) -> 'first-plate' | 'second-helping' | 'off-menu'
```

- **Count** — `countryDishProgress(country, userDishes).tried`.
- **Spread** — distinct regions and distinct categories among the tried dishes.
  Five dishes across four regions is more knowledge of a cuisine than five
  noodle dishes, and the app can already tell the difference:
  `resolveRegion()` (`utils/dishRegion.ts`) and the category grouping in
  `utils/groupDishes.ts` both operate on dishes we already match to user logs.
- **Cold start** — the survey seed and #5's declared familiarity, below.

Starting thresholds, explicitly a guess to be moved once there is real data:

| Level | Rule |
|---|---|
| First plate | ≤ 2 tried |
| Second helping | 3–7 tried |
| Off-menu | 8+ tried **and** 2+ distinct regions |

The `2+ regions` condition on the top tier is what stops someone who ate eight
Sichuan dishes from being told they know Chinese food.

### 1b. How the level gets set

Three inputs, in strict precedence order:

**1. Logged dishes — the truth, and the primary input.** What you've actually
eaten and logged, per the count and spread rules above. No new UI, and it
improves on its own as the app gets used.

**2. The taste survey — the seed, already collected.** No new question is
needed. `getSurveyDishes()` (`hooks/useTasteSurvey.ts`) already puts **2 dishes
per country** in the deck, and `TasteSurvey.tsx` already offers **"🤔 Haven't
tried it"** as an answer distinct from love / like / nope. So for every country
someone has surveyed, `foodie-taste-survey` *already records* how many of the
two offered dishes they had eaten. It is coarse — 0/2, 1/2 or 2/2 — which is
exactly what a seed should be, since logged dishes overwrite it.

**3. A manual override per country — the escape hatch, and it always wins.**
Tapping the level badge on a country page offers First plate / Second helping /
Off-menu / Auto. Stored per country under a new `foodie-cuisine-level` key,
which must be added to `data/syncKeys.ts` — it's profile data, not a per-device
view preference like `foodie-map-layer`. An override is **sticky**: never
recalculated away, no matter what gets logged afterwards.

**Precedence:** manual override → logged dishes (once ≥3 in that country) →
survey seed → First plate as the default.

#### Considered and rejected

- **A question during onboarding.** Asking about 31 cuisines before someone has
  used the app is a wall, and #5 already has the better shape: ask "how well do
  you know this cuisine?" lazily, the first time that country appears in the
  survey. One familiarity question in the product, not two.
- **Deriving it from favorites.** A favorite means you *liked* a dish, not that
  you *know* the cuisine — and you can only favorite something already logged,
  so it's largely redundant with input 1 while adding a confound. Recorded here
  so it doesn't get re-proposed as a fresh idea later.

### 2. Change what's offered

Nothing is permanently hidden. The list gets **shorter and reordered**, with a
one-tap "show everything" always present.

| Level | At-the-restaurant food list |
|---|---|
| First plate | ~5 dishes, weighted to gateway (`adventurousness: 1`, `popularity` of `tourist-classic`/`both`) |
| Second helping | ~10, deliberately spread across regions and categories |
| Off-menu | Full list, deeper dishes surfaced first |

Off-menu adds a `reasons[]` line in the existing style: *"You've had the
classics — this is what regulars order."*

## What this needs from #9

1. **A per-dish `adventurousness: 1 | 2 | 3`.** The real signal. `popularity`
   is the interim proxy.
2. **~20 additional dishes per country**, taking each from ~9.5 to roughly 30:
   the current gateway and everyday set plus ~20 regional or deeper ones. That
   is closer to tripling #9's dish content than doubling it.

Write the extra dishes with `regionalOrigin` values that match each region's
own vocabulary, so the same pass also fixes the empty regions (Brazil's Gaúcho
Country, three Mexican regions) already logged against #9.

## Risks

- **Being called a beginner at a cuisine you grew up with is insulting.**
  The manual override and #5's declared familiarity must beat the earned level
  permanently, not just until the next log.
- **The survey seed is only 2 dishes per country.** It must never *lower* a
  level that logged dishes have earned — answering "haven't tried it" about two
  dishes says almost nothing about someone who has since logged nine. Seed
  upward only, then get out of the way.
- **Truncation hides dishes at exactly the wrong moment** — someone is holding
  a real menu. "Show everything" is load-bearing: one tap, never buried.
- **`local-favorite` is not a synonym for advanced.** Plenty of local staples
  are the most approachable thing on the menu. Don't let the interim proxy
  quietly become the definition.
- **This is the first feature that changes what you see based on a judgment
  about you.** Every level change should be explainable in one sentence, which
  is why it rides `reasons[]` rather than a silent re-sort.
