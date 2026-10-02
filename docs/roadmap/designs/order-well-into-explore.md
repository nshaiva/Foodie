# Collapsing Order well into Explore

Brainstorm, 2026-10-02, from Nikita's question: *"Is there any way to
collapse Order well with the experience that already exists? When you click
or search a country on the map, it should just take you to Mexico, already
ranked by what you'll like, instead of a separate UI."* Nothing here is
decided or built. This is the leading direction for #42 (rethink the
restaurant flow).

## What is actually different today

Two things look similar and aren't. Measured in the code, not assumed.

| | Explore country overview (`CountryOverview.tsx`) | Order well (`AtRestaurant.tsx`) |
|---|---|---|
| Entry | Map tap, or `?c=MX` in the URL. **No country search exists in Explore**; `CountryFinder.tsx` is only used by the unrouted old `Home.tsx`. | "🍽 Order well" button → cuisine picker (search + 8 culinary regions + "Your cuisines", most recent first) |
| The list | "Start with these": **4 dishes, rule-picked** by popularity and category spread (`signatureDishes.ts`). **Not personalized.** Then "See all N" → All dishes grouped by region. | **Every dish, ranked for you** by `rankDishesForOrdering`: popularity + your verdicts + want-to-try + spice fit + diet prefs, each row with a stated reason ("Matches your spice comfort", "What locals actually order"). |
| Density | 4 image tiles | ~7 text rows per phone screen, rank number, pronunciation |
| Menu | none | menu search over the ranked list; a miss offers the AI lookup; "Not on the menu?" at the bottom |
| Around the list | map, regions, flavor fingerprint, food culture, taglines, images | nothing; it is a list on a page |

So Nikita's premise ("it's already ranked by what you think I'll like") is
what we *want* to be true, and isn't yet. **Collapsing the two means moving
the personalized ranking into Explore's country level**, then deleting the
separate page. The ranking engine and its reasons are already written and
pure, so they move freely.

## The constraint the restaurant moment adds

At a table you need the cuisine in **two taps from cold**, with one hand,
on cellular. Explore today opens on the world (phone: a continent must be
chosen first, by design, #51), and a country is one more tap after that.
Three to four taps and a map animation is fine for exploring, too slow for
ordering. Whatever we pick has to add a **search-first entry** to Explore:
"Where are you eating?" with recents on top, landing straight on the
country at the sheet's half snap. That entry is also what the old picker's
"Your cuisines" becomes.

## Six ways to visualize it

Rough wireframes of every option, plus today's two surfaces and the search
entry, are on the [Order well into Explore canvas](https://claude.ai/artifact/LXK84YzzCVr3xNYGevh6i4).

Roughly cheapest to most ambitious. They combine; the recommendation at the
end picks from them.

### 1. The strip becomes personal

"Start with these" stops being rule-picked and shows the top of
`rankDishesForOrdering` instead, with the first reason as a one-liner under
each tile ("Matches your spice comfort"). "See all N" opens All dishes with
a new lens, **Ranked** (beside Region · Type · Tried), which is the Order
well list inside the panel. Order well's button becomes the search-first
country entry and `/restaurant` redirects to `/?c=<id>`. The page is
deleted.

- Cheapest: ranking moves, a lens is added, a search box is added.
- Risk: four tiles don't scan like seven rows; the ranked lens may want
  `OrderRow`'s dense rows rather than tiles. The lens can render rows.

### 2. Two postures of one panel: Browse / At the table

Same country panel, a small segmented control at its top: **Browse** (what
exists today: strip, regions, flavor, culture) and **At the table** (ranked
rows, menu search, "Not on the menu?"). The posture is remembered for the
session. The Order well button opens the search entry and lands in the
table posture.

- Keeps Order well's density and menu search intact.
- Risk: a mode switch is the thing #39 removed from the panel (the
  carousel, the trays). One more toggle is the smell the declutter was
  fighting.

### 3. "Tonight's table" as context, not a mode

You set a country as *where you are eating* (from the search entry, or a
"I'm eating here" action on a country). The whole Explore adapts while the
context is set: the header reads "At a Mexican place", the panel opens on
the ranked list, the map flies to the country with its regions lit, and
**tapping a region narrows the ranked list** ("Oaxacan place? then these").
Clearing the context returns the panel to Browse. Stored per device
(`foodie-table`, not synced, like the view prefs).

- The map becomes the answer to "what region is this restaurant?", which is
  also where the menu-photo idea (Inbox, 2026-10-01) lands its result.
- One state, no toggle: you are either at a table or you aren't.
- Risk: a sticky context that the user forgets to clear and then wonders
  why Explore looks different. Needs a visible, dismissible banner.

### 4. Ranked plates on the map

In the country view the dish plates (`MapPlates.tsx`) carry rank badges
1–N, biggest and brightest for the top picks, so the order *is* the map.
The phone sheet shows the same order as rows; tapping a row pulses its
plate so you see where in the country the dish lives.

- The most "the map is the app" version, and good on desktop.
- Risk: at a table nobody reads a map to decide; rank on a map is a
  visualization of the list, not a replacement for it. Pairs with 1 or 3,
  never alone. Also fights the standing rule that plates never move or
  restyle by state.

### 5. The sheet is the menu

Phone only. The half-snap sheet becomes the table view: ranked rows with a
menu search field pinned at its top, and the map behind it is reduced to
the country with its regions, so the sheet is what you read and the map is
the garnish. Full snap gives the dish detail. Strip snap gives back the
map.

- Reuses the three snaps that exist, no new surface.
- Risk: desktop needs its own answer (the side panel in posture 2 or 3).

### 6. Deep link only

Keep `/restaurant` as nothing but a redirect into Explore with a flag
(`/?c=MX&table=1`) that opens the panel on the ranked list and the search
entry. This is not a design, it is the URL form of 2 or 3; listed so the
routing decision is explicit. Old links keep working.

## What gets lost, and whether it matters

- **The cuisine picker grouped by eight regions.** Replaced by the map
  itself plus search with recents. The region grouping was a stand-in for
  a map.
- **One ranked sequence with no grouping.** All dishes groups by region; the
  Ranked lens must not. Rank is the only order at a table.
- **"Why it ranks here."** Must survive the move; it is the trust layer.
  Shows on the tile one-liner (1) or in the opened row/detail sheet.
- **Menu search + AI lookup.** Moves into the panel's search; the
  verification rule from the Inbox ("verify before it invents") applies.

## Nikita's pick (2026-10-02): option 1, simplified

Nikita chose the personal strip, and simplified it further:

- The overview keeps "Start with these" and "See all 13 ›". **The four tiles
  are simply the top four of the personal ranking.** No rank bubbles, no
  "For you" label, no reason lines under the tiles. Whether a quiet subtitle
  ("Picked for your palate") replaces today's "The dishes Mexico is known
  for" is open; both are drawn.
- **"See all 13" opens on the ranked order**, with one two-way toggle,
  **Ranked / Region**. Region is exactly today's All dishes. No "Ranked for
  you" heading, no extra lenses.
- The reasons ("Matches your spice comfort") move to the dish sheet as a
  single "Why it's up top for you" line, so the trust layer survives
  without touching the strip or the list.
- Open: whether the ranked list renders as the same tiles the region view
  uses (one visual language, ~8 per screen) or as Order well's dense rows
  (~9 per screen, faster at a table, but a different look from the view it
  toggles against).

Prototypes on the canvas's second page, "Strip + toggle": an interactive
board that walks overview → See all 13 → toggle (with tweaks for tiles vs
rows and the subtitle on or off), and static boards for each state.

**Built 2026-10-02** (see priorities.md, Built): tiles and the subtitle
won; a caption beside the toggle names the order; then Order well itself
was replaced by the "Where are you eating?" picker in Explore, the old
routes redirect, and the restaurant page is gone. Option 3's "at a table"
context is what remains of #42.

## Recommendation to discuss (written before the pick; kept for the record)

**3 as the model, 1 as the first step, 5 as the phone rendering, 6 for
routing.** Concretely: (a) add the search-first country entry to Explore
and point the Order well button at it; (b) make "Start with these"
personal and add the Ranked lens using Order well's rows; (c) redirect
`/restaurant` and delete `AtRestaurant.tsx`; (d) only then try the "at a
table" context with region narrowing, and judge on a real phone whether it
earns its banner. Skip 2 unless the context in 3 proves confusing. Try 4
only as a desktop flourish after everything else.

Open questions for Nikita:

1. Is the "at the table" context worth a persistent state, or is "search a
   country, see it ranked" (step 1 alone) already the whole ask?
2. Should the ranked view hide the regions/flavor/culture blocks, or push
   them below the list? (3 pushes them below; 2 hides them.)
3. Does the top-4 strip stay at all once the ranked list is one tap away,
   or does the country overview open on the ranked rows directly?
