# Community dish cards: users pay to uncover a city, everyone keeps the card

Brainstorm, 2026-10-02, from an idea Nikita's partner raised: *amortize the
cost of generating cards below the region level by letting the user who
wants them pay for them.* A diner sees a dish on a menu that isn't in our
list, or opens a region and sees no dishes for Guadalajara, and can ask the
app to generate one. The card they paid for goes into a shared pool, so the
next person who looks at Guadalajara finds it already there. Nothing here is
decided or built. Future state; not MVP.

## What already exists

Measured in the code, not assumed. More of this is built than it looks.

| Piece | State today |
|---|---|
| Generate a card for an unknown dish | **Built.** The `menu-lookup` edge function (shipped as #3) takes (dish name, country) and returns a structured card: name, English name, description, key ingredients, spice, category, dietary flags, confidence, generic-vs-specific. Haiku 4.5. Text only, no image, no region. |
| A shared pool of generated cards | **Half built.** The function caches every answer in a `dish_lookups` table keyed by (country, dish name). That cache *is* a community repository; it just isn't read by anything except the next identical lookup. |
| Cost control | **Built, as the "limit Nikita fronts".** Three guards: cache first, a daily cap per caller (3 anonymous / 20 signed in), a global monthly cap (2000), and the Anthropic console spend limit behind all of it. |
| A card in the user's own data | **Built.** Order well's "Not on the menu?" logs the lookup result as a dish with `source: 'lookup'`. It lives in `foodie-dishes`, syncs with the profile. |
| Card images | **Built as an offline script.** `scripts/generate-dish-images.mjs`, one country per run, 15 max, style C2 frozen, ~2¢ an image. Not callable from the app. |
| City positions | **Partly.** Dishes may carry `origin: { place, coordinates }` and the map floats the plate there (the plates-on-the-map work). Only dishes have coordinates; cities themselves have no list. The inbox already holds a "capital city marker" idea. |
| Dish → region | **Built.** `resolveRegion()` works from origin text at read time. A generated card with an `origin` place would land in the right region without new plumbing. |

So the new work is not "generate a card". It is: **(a) a way in from the
map at the city level, (b) a card that is full-fidelity (region, origin,
image) rather than lookup-fidelity, (c) a pool that other users can browse
and adopt, and (d) deciding who pays.**

## The number that shapes everything: a card costs about 3¢

From `content-batch-wave1.md` §4, updated with the wave 1 actuals:

| Part of a card | Cost |
|---|---|
| Text (tagline, description, origin, locality, traits; Sonnet) | under 1¢ |
| Image (`gpt-image-2.5-sunburst`, medium, style C2) | ~2¢ |
| **Full card** | **~3¢**, ~4¢ with the ~30% redo rate |
| Lookup-fidelity card (text only, Haiku) | well under 1¢ |

Against that, the payment rails:

| Way to charge | Floor per transaction | Verdict |
|---|---|---|
| Stripe card payment | 30¢ + 2.9% | **Ten times the cost of the card.** Charging per card is paying Stripe, not OpenAI. |
| Stripe, bundled (buy 25 credits for $2) | one fee per bundle | Works; a $2 pack covers ~60 cards at cost, so it's a 3x margin pack. Still needs Stripe onboarding, a webhook, a credits table, tax, refunds. |
| Bring your own API key | $0 to us | No fees, but a terrible phone-at-a-restaurant moment, and a key in `localStorage` is a key anyone with the device has. Appeals only to developer users. |
| Nikita fronts it, capped (today) | $0 to the user | The caps already exist. At 3¢ a card, **1000 user-generated cards a month is $30.** |

**The honest conclusion:** the per-card cost is so low that *the payment
machinery costs more than the thing it pays for* until there are thousands
of active users. The amortization the idea is after happens naturally the
moment generated cards are *shared*: one person's 3¢ serves everyone who
later opens that city. Sharing is the lever; payment is a later guardrail.

## Three ways in from the map

The user's question is "what's eaten *here*, that I can't see yet?" Entry
points, cheapest to most ambitious. They combine.

### A. "Add a dish" from the region, no city layer

A region's panel (and the "Across {country}" bucket) gets one quiet row at
the end of its dish list: **"Know a dish from {region} we're missing?"**
Tapping it opens the existing lookup box pre-scoped to the country and
region. The result is offered as *"Add to {region}"*, and the card is saved
with `origin: { place: <what the user typed or the model inferred> }`, so
`resolveRegion()` files it. No map change at all.

- Cheapest by far; reuses the lookup end to end.
- Misses the "I don't know what's here, show me" case; this only serves the
  person who already knows the dish.

### B. Faint city dots, hover or tap for the name, tap to uncover

Nikita's sketch. A hand-kept list of 4–8 major cities per country
(`cities` beside the region coordinates in `regionMapConfig.ts`: name,
coordinates, region). Drawn as very small, low-alpha dots at region zoom,
**below** plates and region names, so they read as texture, not markers.
Hover (desktop) or a first tap (phone) shows the name. A city with a plate
already over it needs no dot at all: the plate *is* the city.

Tapping a city **that has no dishes** opens a small sheet:

> **Guadalajara** · Western Mexico
> No dishes here yet.
> ▸ Uncover one common dish (generates a card)
> ▸ I know a dish from here… (type a name)

"Uncover" asks the model for the single best-known dish of that city
*that isn't already in the country's list* (the list is sent as the
exclusion set), builds a full card, and places it on the map at the city.
"I know a dish" is option A scoped to the city.

- Fits the plates-on-the-map rules: a city dot has one fixed spot, drawn
  always, no zoom-dependent hiding. Cities covered by a plate are simply
  omitted from the config, which is the only clutter control needed.
- Phone: a dot is not a 44px target. Make the hit area the pill that
  appears on first tap, or list the cities as a strip inside the region
  panel ("Also in this region: Guadalajara · Puerto Vallarta · Tequila")
  so the map dots are orientation and the panel does the tapping.
- Data: ~31 × 6 cities with coordinates, hand-checked like the region
  points. Half a day for the sandbox four, a couple of hours per wave after.

### C. Infinitely clickable: tap anywhere, reverse-geocode, generate

Tap any point on the land; reverse-geocode to the nearest town
(Nominatim or the TopoJSON's own admin-1 names); offer to uncover a dish
there. No city list to maintain.

- Beautiful on paper; in practice every tap already means something on the
  Explore map (sea → world, region → focus), so a third meaning fights the
  existing gestures, and most taps would land on a village with no
  distinct dish and produce a plausible-sounding invention.
- Keep it as the *paid* tier if payment ever arrives: B is free and bounded
  to real cities, C is "keep drilling, on your own credits". Not before.

**Recommendation: A now-ish, B when the plates work is stable, C never
unless payment exists.**

## The pool: from a cache to a community repository

What turns one person's card into everyone's. Three layers, each a small
step on the last.

1. **Promote the lookup cache to a `community_dishes` table.** Columns:
   country, region slug, origin place + coordinates, the full card JSON,
   image URL (Supabase Storage), `created_by` (user id; signed-in only), created
   at, `adopt_count`, `flag_count`, `status` (`live` | `hidden`). The
   function writes here on every generation. RLS: anyone reads `live`
   rows; only the function's service role writes.
2. **Explore reads it.** When a country opens, fetch its `live` community
   rows (one request, cached in memory for the session) and merge them
   into the dish list with a small **"Community"** mark on the plate and
   the card. They group by region through `resolveRegion()` like any
   dish. Offline or unconfigured Supabase: the static list only, exactly
   as today.
3. **Adopt.** Want-to-try or logging a community card copies it into the
   user's own `foodie-dishes` with `source: 'community'` and the pool
   row's id, so the user's data stays self-contained and exportable (the
   backup file must never depend on a pool row still existing).
   Adopting increments `adopt_count`; the most-adopted card for a city is
   the one its plate shows.

### Quality: the reason to go slowly

The inbox already has **"Menu lookup verifies before it invents"**: today
the function returns a confident card for any string. That item is the
**prerequisite** for a shared pool. A hallucinated private card wastes one
person's attention; a hallucinated *shared* card teaches everyone the
wrong thing, under the app's own illustration style, which makes it look
authoritative. Rules for the pool:

- Only `confidence: 'high'` cards enter the pool. Medium and low stay
  private to the person who asked, marked as unconfirmed.
- The generation prompt gets the country's full dish list as an exclusion
  set and asks for *the* most common dish of that city, not *a* dish.
  Dedupe on (country, normalized name) and on English name before
  inserting; a near-match adopts the existing row instead.
- A "Not right?" flag on every community card; three flags hide it
  pending Nikita's review. Review is a Supabase table view, no admin UI.
- Images for pool cards go through the same frozen C2 prompt rules as the
  batch, but **unreviewed**. Expect the ~30% miss rate to show. Option:
  pool cards ship text-first, and the image is generated only once a card
  has been adopted by a second person, which also halves the image spend.

## Who pays: a staged answer

| Stage | Who pays | Mechanism | When |
|---|---|---|---|
| 1 | Nikita, capped | What exists: caps per caller and per month, Anthropic/OpenAI spend limits. Add a per-user **monthly** card budget (say 10 full cards) so one enthusiast can't take the month, and the **$50 spend alert / $75 soft stop across all users** (below). | With the first version of A or B |
| 2 | Nothing new; the pool pays | Every shared card is a card nobody else has to generate. Watch the ratio of pool hits to new generations. | As the pool fills |
| 3 | The heavy user | **Credit packs** via Stripe Checkout (one hosted page, one webhook, a `credits` column): $2 for 25 cards. Free tier stays. No per-card charge, ever. | Only if monthly generation spend crosses what Nikita is willing to carry (~$30/month is ~1000 cards) |
| 3-alt | The developer user | Bring-your-own key, entered in settings, sent per request and never stored server-side. Cheap to add beside credits; not a substitute for them. | Same time as 3, if asked for |

Stripe at signup, as the idea floated, is the wrong moment: nobody enters
a card to try an app, and the first 10 cards a month should be free so
the pool fills. Payment belongs behind the cap, when it is hit.

## Spend alert: tell Nikita at $50 a month, across every user

Added 2026-10-02 from Nikita: *"if it is exceeding $50 a month, I get
notified, across all users."* This is the guardrail that makes stage 1
(Nikita fronts it, capped) safe enough to run for a long time without ever
building payment.

**What exists.** The lookup function already keeps a global monthly
counter (`lookup_budget`, one row per month, bumped before every paid call)
and refuses at 2,000 lookups. It counts calls, not money, and only lookups.

**The change.** The counter becomes a **spend ledger in cents**, shared by
every paid path (lookups, card text, card images):

- `generation_spend` table: `month`, `kind` (`lookup` | `card_text` |
  `card_image`), `n`, `cents`. Each function bumps its row *before* the
  upstream call with a fixed per-unit estimate (lookup well under 1¢,
  card text ~1¢, image 2¢), so a crash still counts the attempt. Estimates,
  not invoices: the consoles are the truth; this is an early warning.
- **Alert at $50**, one email, once per month per threshold. The bump
  function returns the new total; when it crosses a threshold the edge
  function sends the mail (Resend, or Supabase Auth's SMTP) and writes
  `alerted_50 = true` on the month row so it never repeats. A second
  threshold at **$75 hard-stops** every generation path with the existing
  `monthly_limit` outcome; lookups from the cache keep working, so the
  app degrades to "already-known dishes only" rather than breaking.
- Thresholds are secrets, not code (`SPEND_ALERT_CENTS`,
  `SPEND_STOP_CENTS`), so changing them is a redeploy of nothing.
- No admin UI. The month rows are readable in the Supabase table view;
  the email carries the breakdown by kind.

**Zero-code backstop, do it regardless:** both the Anthropic and OpenAI
consoles have monthly spend alerts and hard limits. Set $50 alerts and
~$75 limits in each. The in-app ledger adds what they can't: one number
across both providers, a breakdown by feature, and a soft stop that keeps
the app alive on cached cards.

Effort: S once the card paths exist (a table, an RPC, one mail call).

## Where it sits in the thesis

- **Primary (at the table):** option A *is* the restaurant moment, better
  than today's lookup because the card gets a region and survives for
  others. Strong.
- **Secondary (where cuisines sit):** B's city dots add a level of place
  under regions without the third navigation level that was decided
  against on 2026-09-28 (regions split over time, no state click-through).
  Dots and plates, not borders and screens. Consistent with that decision.
- **Non-goals:** the pool is *shared content*, not a social feature. No
  profiles, no follows, no comments; a card has no author shown, only a
  "Community" mark. Keep it that way or it drifts into the social
  non-goal.

## Dependencies and order

1. "Menu lookup verifies before it invents" (inbox, S–M). Gate.
2. #9 content batch finished for the countries where this ships; the pool
   should fill gaps, not substitute for the batch.
3. Plates on the map stable (it is; the fan/caps work is the current tip).
4. Then: A (S: a row, a prompt scope, an `origin` on the saved dish),
   the pool table + Explore read + adopt (M), B's city dots (M, mostly
   data), caps per user per month + the spend ledger and $50 alert (S),
   credits (M, only on demand).

## Decided 2026-10-02 (Nikita)

The open questions were answered the same day.

1. **Same look, small mark.** A community card looks exactly like a batch
   card; the only difference is a small "Community" marker on the plate and
   the card. No different rim, no different style.
2. **Image on every generation.** No text-first stage; a generated card
   gets its C2 image at once, so the plate is never a placeholder. The
   ~30% unreviewed miss rate is accepted; the flag path is the fix.
3. **Signed-in only, with per-user caps.** Anonymous users cannot generate
   into the pool. Every signed-in user has a monthly card cap. Raising a
   cap for someone who generates a lot and well is a later idea, not part
   of the first version.
4. **The city list goes deep.** Towns with a food identity (Tequila,
   Oaxaca de Juárez) belong in the list, not only major cities. Clutter
   and cost are controlled by the per-user caps, not by keeping the list
   short. The map rule still holds: a place already under a plate gets no
   dot.

**Closed 2026-10-02 (Nikita approved the defaults):** the monthly cap is
**10 full cards per signed-in user**, as a secret (`CARDS_PER_USER_MONTH`)
so it can change without a code change. Credit packs are **off the board**;
the pool is #43 in Tier 3 and payment is not part of it. Ranked the same day
as four rows: #44 verification (gate), #45 option A, #46 spend ledger, #43
the pool (see `priorities.md`).
