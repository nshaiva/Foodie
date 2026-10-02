# One-map Explore: how the map became the app

Status: **shipped**. Explore is `/` since 2026-09-29 (roadmap #41); the panel
redesign shipped as #39 and the phone sheet the same week. This is the design
record of the trial that got there, moved out of `priorities.md` on
2026-10-02. For what shipped and when, see [`../built.md`](../built.md).

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
