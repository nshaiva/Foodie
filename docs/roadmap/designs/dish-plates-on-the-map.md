# Dish plates on the map, world to city

Status: **mostly shipped** (2026-09-29 → 2026-10-02; see
[`../built.md`](../built.md), entries of 2026-09-29, 2026-09-30 and
2026-10-01). This records the design and what is still open. Moved out of
the `priorities.md` inbox on 2026-10-02. Serves G2: where cuisines sit in
the world.

## The idea (Nikita, 2026-09-29)

Dish illustrations float over the map at every zoom. At **world** zoom a
country shows a few small pins (its most popular illustrated dishes); at
**country** zoom every illustrated dish sits where it is from (its city, or
its region); nationwide dishes gather in an **"Across {country}"** cluster at
sea. Design options: the
[Dishes on the Map artifact](https://claude.ai/artifact/V6cqkwcAV7u5tstFBph6vj);
first preview in `docs/design/prototypes/map-dish-overlay/`.

## Rules that hold (learned the hard way)

Several tries at zoom-dependent budgets, nudges and stacks all jittered. The
rules that survived are the simplest ones, and `CLAUDE.md` now forbids the
others:

- **Every dish has one fixed spot forever**: its `origin` city; else a spot
  beside its region's name, chosen once; else a slot in the Across cluster.
  A region dish with no clear spot lands on its region's land as depth, never
  dropped (the bug that hid most of Mexico's and Egypt's region dishes on a
  phone).
- **Plates are always drawn there.** Where they overlap at the current zoom
  the most popular stays on top and the ones beneath **fade and shrink**
  (55% / 38% / 30%, the fourth on floored), nudged only far enough to show a
  crescent, and spread back to their true spots as you zoom in.
- **Region names draw above the plates**, stepping back to small quiet caps
  while plates show. Caps under an open fan fade (2026-10-02).
- Visibility changes only at the screen edge and when the whole layer fades
  at world zoom. Nothing depends on the zoom level, so nothing flickers.
- Captions show on hover only, never on touch (on a phone every plate
  labelling itself at once overlapped where dishes share a city). A tap opens
  the dish in the sheet, which names it. Captions sit on a cream pill in a
  layer above the region names and do not repeat the place ("Beijing Kaoya ·
  Beijing" is gone).
- Drinks are on the map too (Mezcal); the bob and shadow pulse stay, shadows
  off on phone.

Code: `utils/plateLayout.ts`, `components/explore/MapPlates.tsx`.

## Across {country} (decided 2026-10-01)

From the [Across Egypt canvas](https://claude.ai/artifact/X5PVFZKbBAHzdTEYbubSRA)
(copy in `docs/design/prototypes/across-cluster/`). The row of nationwide
plates at sea is gone. **Desktop: a stack**, most popular dish on top with
"+N", that fans into a ring on hover with the label dropping below the ring.
**Touch: a flower**, an "Across {country} · N dishes" pill as the hub with
every dish on the ring, since there is no hover to open a stack. Honeycomb
and coast-arc options were considered and dropped. The cluster is culled as
one unit so panning never re-fans it. `acrossRing()` in `plateLayout.ts`.
**Each country needs a water point in `ACROSS_AT`** or its nationwide dishes
do not appear at all (MX, CN, EG, IN have one; add it per wave of #9).

## Country zoom de-clutter (decided 2026-10-01, on a phone)

Boards **1 + 3** of the
[China de-clutter canvas](https://claude.ai/artifact/8FwW5wA4mXKXXNCbra3gum)
(copy in `docs/design/prototypes/china-declutter/`). Board 5's city stacks
were built first and rejected on device. Quiet caps for region names, fixed
spots, fade-and-shrink for overlaps, nothing ever dropped.

## World pins (shipped 2026-10-01)

A country gets **1-3 pins by on-screen area** (Egypt 1, Mexico 2, China 3 at
the phone's first-pins zoom), the extras being the most popular dish of the
region farthest from the pins already placed. Each pin is a region's top dish
at the exact spot it has at country zoom (the same cached placement), so
zooming in never moves one. Pins **grow with zoom** from marker to plate size
and **crossfade** into the region plates when a country opens. On the phone
pins show from the outermost zoom; a sea tap returns to the world; the world
view is a home framed on the 31 cuisines' land (no Antarctica on a tall
screen).

## Still open

- **Crowding rules for the world view** once many countries have images
  (Europe, Balkans, Southeast Asia): show a pin only where it does not overlap
  a neighbour; bigger or more-explored countries win, the rest appear on
  zoom. The by-area rule covers one country; the inter-country case is
  untested beyond MX/CN/EG/IN.
- **How world pins coexist with the map's colouring** (tried / want /
  flavor match layers).
- **Personal state on plates**: a ✓ on tried cuisines, or your own top-rated
  dish as the pin.
- The pin-size handover could become a true morph.
- Images for the remaining countries arrive with #9's waves; a country with
  no images shows no plates.
