# Image style pilot (#36): Mexico prep

Prepared 2026-09-28. Text only: nothing here has been generated yet. The
goal is to pick **one illustration style** on four Mexican dishes before any
wider generation. Per the MVP cost guardrail in `docs/roadmap/priorities.md`,
nothing beyond this pilot runs without a separate go.

## 1. Taglines (all 13 Mexico items)

These go on the card beside the image (#39). The full description moves
behind a tap. Rules for writing them (the #9 batch prompt reuses these):

- 40–80 characters. Say what it *is* first, then one detail that sets it apart.
- Plain nouns, no praise words ("delicious", "iconic", "beloved").
- Sentence case, no closing period, **no em dashes**.
- Never contradict the full description.

| Item | Tagline | Chars |
|---|---|---|
| Mole Poblano | Dark chili and chocolate sauce over turkey, from Puebla | 55 |
| Chiles en Nogada | Stuffed poblano in walnut cream with pomegranate | 48 |
| Pozole | Hominy and pork in a red or green chili broth | 45 |
| Tacos | Corn tortillas with al pastor, carnitas or asada | 48 |
| Tamales | Corn masa steamed in husks or banana leaf, savory or sweet | 58 |
| Guacamole | Mashed avocado with lime, cilantro and chili | 44 |
| Elote | Grilled corn with mayo, cotija, chili and lime | 46 |
| Churros | Fried dough in cinnamon sugar, dipped in chocolate | 50 |
| Horchata | Cold rice drink with cinnamon and vanilla | 41 |
| Jamaica | Tart, deep red hibiscus tea, served cold and sweet | 50 |
| Mexican Hot Chocolate | Cinnamon-spiced chocolate, frothed with a wooden molinillo | 58 |
| Mezcal | Smoky agave spirit from Oaxaca, sipped neat | 43 |
| Tequila | Blue agave spirit from Jalisco, blanco to añejo | 47 |

## 2. Style brief

**What the images are for.** Recognition first: someone should be able to
tell pozole from menudo at a glance. Mood second. They read as
*illustrations* (a depiction, not evidence), so they carry a small
"Illustration" label in the app.

**Where they appear, and at what size.** This is why the pilot is judged at
several sizes:

| Surface | Shape | Size |
|---|---|---|
| Explore tile (2B, chosen) | ~3:2 | ~230 × 150 px |
| "Start with these" strip (1B) | square | ~110 px |
| Dish detail header | ~5:3 | 540 × 320 px (desktop), 390 × 230 (phone) |
| Restaurant view rows (post-MVP, #42) | square | ~56–64 px |

**One master image per dish.** Generate at **3:2** with the dish inside the
**central square** and generous margin all round, so a single image crops to
the tile, the square strip and the detail header without cutting the food.

**Constants across every style** (these keep 600+ images looking like one app):

- One serving, centered, seen from about 45°, on a **plain warm cream
  background** (the app's panel colour, `#F6F2EA`), with no table, cloth or
  scenery.
- Only the props that belong to the dish (lime wedge, tortillas, garnish
  plate). No cutlery unless it's traditional.
- No text, lettering, logos, people or hands.
- Soft, even light. Nothing moody or dark.
- Colours stay true to the real dish. Style may simplify shapes, never
  change what the food looks like.

## 3. The three candidate styles

| | Style | Why it's a candidate | Risk |
|---|---|---|---|
| **A** | Watercolor | Warm and editorial; forgives small inaccuracies | Muddy at 64 px; soft edges lose the dish's shape |
| **B** | Flat editorial | Crisp at every size; matches the app's flat chips and plate dots; most consistent across 600 images | Can look generic or clip-art; fine garnish detail disappears |
| **C** | Ink and gouache | Clear outlines keep dishes recognizable when small; cookbook feel | Busier; ink weight varies between generations |

Style blocks (the first sentence of each prompt below):

- **A:** Loose watercolor food illustration with soft pigment blooms,
  visible paper texture, faint pencil underdrawing, natural muted colors.
- **B:** Flat editorial illustration built from simple shapes, muted
  natural palette of terracotta, sage, saffron and deep brown, subtle grain
  texture, no outlines, no gradients.
- **C:** Hand-drawn illustration with confident brown ink outlines and
  opaque matte gouache color fills, in the style of a modern illustrated
  cookbook.

Framing block (the last sentence of every prompt):

> One serving centered on a plain warm cream background, seen from a
> 45-degree angle, the food kept inside the central square of a 3:2 frame
> with generous margin, soft even light, no text, no people, no hands, no
> logos, no table or scenery.

## 4. The 12 pilot prompts

Four dishes × three styles. Generate **one image per prompt** (12 total,
well under a dollar at typical per-image prices). Paste each whole, at 3:2.

### Mole Poblano

Dish block: *a piece of turkey on a plate covered in thick, glossy,
very dark brown-black mole sauce, sprinkled with toasted sesame seeds,
a small mound of red Mexican rice beside it, two folded corn tortillas at
the edge.*

- **A1:** Loose watercolor food illustration with soft pigment blooms, visible paper texture, faint pencil underdrawing, natural muted colors. A piece of turkey on a plate covered in thick, glossy, very dark brown-black mole sauce, sprinkled with toasted sesame seeds, a small mound of red Mexican rice beside it, two folded corn tortillas at the edge. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **B1:** Flat editorial illustration built from simple shapes, muted natural palette of terracotta, sage, saffron and deep brown, subtle grain texture, no outlines, no gradients. A piece of turkey on a plate covered in thick, glossy, very dark brown-black mole sauce, sprinkled with toasted sesame seeds, a small mound of red Mexican rice beside it, two folded corn tortillas at the edge. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **C1:** Hand-drawn illustration with confident brown ink outlines and opaque matte gouache color fills, in the style of a modern illustrated cookbook. A piece of turkey on a plate covered in thick, glossy, very dark brown-black mole sauce, sprinkled with toasted sesame seeds, a small mound of red Mexican rice beside it, two folded corn tortillas at the edge. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.

### Tacos (al pastor)

Dish block: *three small street tacos on a plate, each on two stacked soft
corn tortillas, filled with red-orange marinated pork al pastor, topped
with diced white onion, chopped cilantro and a small piece of pineapple, a
lime wedge and a little bowl of green salsa beside them.*

- **A2:** Loose watercolor food illustration with soft pigment blooms, visible paper texture, faint pencil underdrawing, natural muted colors. Three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **B2:** Flat editorial illustration built from simple shapes, muted natural palette of terracotta, sage, saffron and deep brown, subtle grain texture, no outlines, no gradients. Three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **C2:** Hand-drawn illustration with confident brown ink outlines and opaque matte gouache color fills, in the style of a modern illustrated cookbook. Three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.

### Pozole (rojo)

Dish block: *a deep bowl of pozole rojo, a brick-red chili broth full of
large puffed white hominy kernels and pieces of pork, topped with shredded
green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge
and a crisp tostada beside the bowl.*

- **A3:** Loose watercolor food illustration with soft pigment blooms, visible paper texture, faint pencil underdrawing, natural muted colors. A deep bowl of pozole rojo, a brick-red chili broth full of large puffed white hominy kernels and pieces of pork, topped with shredded green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and a crisp tostada beside the bowl. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **B3:** Flat editorial illustration built from simple shapes, muted natural palette of terracotta, sage, saffron and deep brown, subtle grain texture, no outlines, no gradients. A deep bowl of pozole rojo, a brick-red chili broth full of large puffed white hominy kernels and pieces of pork, topped with shredded green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and a crisp tostada beside the bowl. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **C3:** Hand-drawn illustration with confident brown ink outlines and opaque matte gouache color fills, in the style of a modern illustrated cookbook. A deep bowl of pozole rojo, a brick-red chili broth full of large puffed white hominy kernels and pieces of pork, topped with shredded green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and a crisp tostada beside the bowl. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.

### Chiles en Nogada

Dish block: *one whole roasted green poblano pepper on a plate, stuffed and
completely covered in a smooth, thick, ivory-white walnut cream sauce,
scattered with bright red pomegranate seeds and a few flat green parsley
leaves, so the plate shows green, white and red; served plain, not battered
or fried.*

- **A4:** Loose watercolor food illustration with soft pigment blooms, visible paper texture, faint pencil underdrawing, natural muted colors. One whole roasted green poblano pepper on a plate, stuffed and completely covered in a smooth, thick, ivory-white walnut cream sauce, scattered with bright red pomegranate seeds and a few flat green parsley leaves, so the plate shows green, white and red; served plain, not battered or fried. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **B4:** Flat editorial illustration built from simple shapes, muted natural palette of terracotta, sage, saffron and deep brown, subtle grain texture, no outlines, no gradients. One whole roasted green poblano pepper on a plate, stuffed and completely covered in a smooth, thick, ivory-white walnut cream sauce, scattered with bright red pomegranate seeds and a few flat green parsley leaves, so the plate shows green, white and red; served plain, not battered or fried. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **C4:** Hand-drawn illustration with confident brown ink outlines and opaque matte gouache color fills, in the style of a modern illustrated cookbook. One whole roasted green poblano pepper on a plate, stuffed and completely covered in a smooth, thick, ivory-white walnut cream sauce, scattered with bright red pomegranate seeds and a few flat green parsley leaves, so the plate shows green, white and red; served plain, not battered or fried. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.

## 4b. Faster route: one 2×2 grid per dish (4 images, not 12)

Paste each prompt into ChatGPT as-is (square output). Each grid shows one
dish in four styles, so the comparison happens inside a single image. The
fourth cell tries a new candidate, **D: risograph print** (flat and crisp
like B, with more character to address B's clip-art risk).

Two limits. Styles bleed into each other inside one image, so judge
*differences* between cells, not exact rendering. And each cell is only
about 512 px, which is enough to pick a style but not enough for final art.
Once a style is chosen, generate the real images **one per prompt** using
the section 4 prompt for that style.

Style D block: *Risograph print illustration with two or three overprinted
flat ink colors, visible grain and slight misregistration, bold simple
shapes.*

Shared grid template (swap in the dish block):

> Generate one square image: a 2×2 grid comparing four illustration styles of the same dish, separated
> by thin cream gutters, with a small plain letter label in the top-left
> corner of each cell and no other text. The dish in every cell: {DISH
> BLOCK}. Top-left, labeled A: loose watercolor with soft pigment blooms,
> visible paper texture and faint pencil underdrawing. Top-right, labeled B:
> flat editorial illustration built from simple shapes, muted terracotta,
> sage, saffron and deep brown palette, subtle grain, no outlines, no
> gradients. Bottom-left, labeled C: confident brown ink outlines with
> opaque matte gouache fills, like a modern illustrated cookbook.
> Bottom-right, labeled D: risograph print with two or three overprinted
> flat ink colors, visible grain and slight misregistration. Keep the dish,
> its arrangement and its true colors identical across all four cells; only
> the rendering style changes. In every cell: one serving centered on a
> plain warm cream background, seen from a 45-degree angle, generous margin,
> soft even light, no people, no hands, no logos, no table or scenery.

Ready-to-paste versions:

- **G1 Mole Poblano:** Generate one square image: a 2×2 grid comparing four illustration styles of the same dish, separated by thin cream gutters, with a small plain letter label in the top-left corner of each cell and no other text. The dish in every cell: a piece of turkey on a plate covered in thick, glossy, very dark brown-black mole sauce, sprinkled with toasted sesame seeds, a small mound of red Mexican rice beside it, two folded corn tortillas at the edge. Top-left, labeled A: loose watercolor with soft pigment blooms, visible paper texture and faint pencil underdrawing. Top-right, labeled B: flat editorial illustration built from simple shapes, muted terracotta, sage, saffron and deep brown palette, subtle grain, no outlines, no gradients. Bottom-left, labeled C: confident brown ink outlines with opaque matte gouache fills, like a modern illustrated cookbook. Bottom-right, labeled D: risograph print with two or three overprinted flat ink colors, visible grain and slight misregistration. Keep the dish, its arrangement and its true colors identical across all four cells; only the rendering style changes. In every cell: one serving centered on a plain warm cream background, seen from a 45-degree angle, generous margin, soft even light, no people, no hands, no logos, no table or scenery.
- **G2 Tacos al pastor:** Generate one square image: a 2×2 grid comparing four illustration styles of the same dish, separated by thin cream gutters, with a small plain letter label in the top-left corner of each cell and no other text. The dish in every cell: three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. Top-left, labeled A: loose watercolor with soft pigment blooms, visible paper texture and faint pencil underdrawing. Top-right, labeled B: flat editorial illustration built from simple shapes, muted terracotta, sage, saffron and deep brown palette, subtle grain, no outlines, no gradients. Bottom-left, labeled C: confident brown ink outlines with opaque matte gouache fills, like a modern illustrated cookbook. Bottom-right, labeled D: risograph print with two or three overprinted flat ink colors, visible grain and slight misregistration. Keep the dish, its arrangement and its true colors identical across all four cells; only the rendering style changes. In every cell: one serving centered on a plain warm cream background, seen from a 45-degree angle, generous margin, soft even light, no people, no hands, no logos, no table or scenery.
- **G3 Pozole rojo:** Generate one square image: a 2×2 grid comparing four illustration styles of the same dish, separated by thin cream gutters, with a small plain letter label in the top-left corner of each cell and no other text. The dish in every cell: a deep bowl of pozole rojo, a brick-red chili broth full of large puffed white hominy kernels and pieces of pork, topped with shredded green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and a crisp tostada beside the bowl. Top-left, labeled A: loose watercolor with soft pigment blooms, visible paper texture and faint pencil underdrawing. Top-right, labeled B: flat editorial illustration built from simple shapes, muted terracotta, sage, saffron and deep brown palette, subtle grain, no outlines, no gradients. Bottom-left, labeled C: confident brown ink outlines with opaque matte gouache fills, like a modern illustrated cookbook. Bottom-right, labeled D: risograph print with two or three overprinted flat ink colors, visible grain and slight misregistration. Keep the dish, its arrangement and its true colors identical across all four cells; only the rendering style changes. In every cell: one serving centered on a plain warm cream background, seen from a 45-degree angle, generous margin, soft even light, no people, no hands, no logos, no table or scenery.
- **G4 Chiles en Nogada:** Generate one square image: a 2×2 grid comparing four illustration styles of the same dish, separated by thin cream gutters, with a small plain letter label in the top-left corner of each cell and no other text. The dish in every cell: one whole roasted green poblano pepper on a plate, stuffed and completely covered in a smooth, thick, ivory-white walnut cream sauce, scattered with bright red pomegranate seeds and a few flat green parsley leaves, so the plate shows green, white and red; served plain, not battered or fried. Top-left, labeled A: loose watercolor with soft pigment blooms, visible paper texture and faint pencil underdrawing. Top-right, labeled B: flat editorial illustration built from simple shapes, muted terracotta, sage, saffron and deep brown palette, subtle grain, no outlines, no gradients. Bottom-left, labeled C: confident brown ink outlines with opaque matte gouache fills, like a modern illustrated cookbook. Bottom-right, labeled D: risograph print with two or three overprinted flat ink colors, visible grain and slight misregistration. Keep the dish, its arrangement and its true colors identical across all four cells; only the rendering style changes. In every cell: one serving centered on a plain warm cream background, seen from a 45-degree angle, generous margin, soft even light, no people, no hands, no logos, no table or scenery.

**Judging a grid:** zoom out until each cell is roughly thumbnail size
(about 64 to 150 px) and ask which letter you can still name the dish in.
Then run the section 5 checklist per cell. If a dish comes out wrong in
every cell, that is a prompt problem, not a style problem: fix the dish
block before judging styles.

## 4c. Round 2: variants of C (after G1)

**G1 result (mole, 2026-09-29).** The dish passed the accuracy checklist in
every cell. As expected, the styles bled together: A came out tight rather
than loose, B came out shaded and glossy rather than flat, and D kept its
grain but not its flat inks. C was the only cell that matched its style. So
C leads, but B never got a fair test.

**Next, two images:**

1. **B1 alone** (section 4 prompt, single image). This gives flat editorial
   a fair test outside the grid. If it looks generic, C wins outright.
2. **The C-variants grid below, on tacos.** Tacos have the most fine detail
   (onion, cilantro, pineapple, salsa), so they show which variant falls
   apart at 64 px. Mole is one dark shape and reads at any size.

What the variants test: C1 is the baseline. C2 has bold outlines and
simplified detail (the bet for 64 px). C3 has fine lines and rich detail
(likely best large, worst small). C4 is a loose, off-register handmade line
(most character, but more variation between generations).

- **GC Tacos, C variants:** Generate one square image: a 2×2 grid comparing four variations of the same hand-drawn ink and gouache illustration style, separated by thin cream gutters, with a small plain letter label in the top-left corner of each cell and no other text. The dish in every cell: three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. Top-left, labeled C1: confident brown ink outlines with opaque matte gouache fills, like a modern illustrated cookbook. Top-right, labeled C2: bold, thick dark-brown ink outlines, simplified shapes with less small detail, flat gouache fills with minimal shading, designed to read clearly as a small icon. Bottom-left, labeled C3: thin, delicate brown ink linework with soft layered gouache shading and more texture detail. Bottom-right, labeled C4: loose, slightly wobbly hand-drawn brown ink line with flat gouache color that sometimes sits just off the outline, playful and handmade. Keep the dish, its arrangement and its true colors identical across all four cells; only the line and fill treatment changes. In every cell: one serving centered on a plain warm cream background, seen from a 45-degree angle, generous margin, soft even light, no people, no hands, no logos, no table or scenery.

**After choosing a variant:** rewrite that cell's description as the
frozen style block, replacing the section 3 C block. Then run the remaining
dishes (G3 pozole and G4 chiles en nogada) as single images in that style,
since the grids have done their job.

## 4d. Decision: C2 (2026-09-29)

**Chosen style: C2, bold ink and flat gouache.** Tested on mole (four-style
grid), tacos (C1–C4 variants) and pozole (C1 vs C2, plus B3 alone). C2 won
on readability at small sizes: thick outlines and simple shapes keep each
part of the dish distinct at 64 px, where C1's extra detail turns to noise.
B3 was the most attractive at full size, but without outlines its edges
depend on colour contrast alone. Comparison page:
`docs/design/prototypes/image-pilot/sizes.html`.

**Frozen style block** (replaces section 3's C block, and goes unchanged
into the #9 batch prompt):

> Hand-drawn illustration with bold, thick dark-brown ink outlines,
> simplified shapes with little small detail, and flat opaque gouache fills
> with minimal shading, clear enough to read as a small icon.

**Framing block:** unchanged from section 3.

**Pozole dish block fix.** In every pozole test the hominy came out
looking like round chickpeas. The block now says what hominy looks like:

> A deep bowl of pozole rojo, a brick-red chili broth full of large puffed
> white hominy kernels, irregular and burst open at the top like popcorn,
> not round chickpeas, with pieces of pork, topped with shredded green
> cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and
> a crisp tostada beside the bowl.

### Pilot finals: one image per prompt, 3:2

Chiles en Nogada has not been generated in any style yet, so this is its
first accuracy check (section 5).

- **F1 Mole Poblano:** Hand-drawn illustration with bold, thick dark-brown ink outlines, simplified shapes with little small detail, and flat opaque gouache fills with minimal shading, clear enough to read as a small icon. A piece of turkey on a plate covered in thick, glossy, very dark brown-black mole sauce, sprinkled with toasted sesame seeds, a small mound of red Mexican rice beside it, two folded corn tortillas at the edge. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **F2 Tacos al pastor:** Hand-drawn illustration with bold, thick dark-brown ink outlines, simplified shapes with little small detail, and flat opaque gouache fills with minimal shading, clear enough to read as a small icon. Three small street tacos on a plate, each on two stacked soft corn tortillas, filled with red-orange marinated pork al pastor, topped with diced white onion, chopped cilantro and a small piece of pineapple, a lime wedge and a little bowl of green salsa beside them. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **F3 Pozole rojo:** Hand-drawn illustration with bold, thick dark-brown ink outlines, simplified shapes with little small detail, and flat opaque gouache fills with minimal shading, clear enough to read as a small icon. A deep bowl of pozole rojo, a brick-red chili broth full of large puffed white hominy kernels, irregular and burst open at the top like popcorn, not round chickpeas, with pieces of pork, topped with shredded green cabbage, thin radish slices and a pinch of dried oregano, a lime wedge and a crisp tostada beside the bowl. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.
- **F4 Chiles en Nogada:** Hand-drawn illustration with bold, thick dark-brown ink outlines, simplified shapes with little small detail, and flat opaque gouache fills with minimal shading, clear enough to read as a small icon. One whole roasted green poblano pepper on a plate, stuffed and completely covered in a smooth, thick, ivory-white walnut cream sauce, scattered with bright red pomegranate seeds and a few flat green parsley leaves, so the plate shows green, white and red; served plain, not battered or fried. One serving centered on a plain warm cream background, seen from a 45-degree angle, the food kept inside the central square of a 3:2 frame with generous margin, soft even light, no text, no people, no hands, no logos, no table or scenery.

**Set check (2026-09-29, one 2×2 grid of all four in C2):** all four pass
section 5, and they read as one set. The hominy fix worked: the kernels now
look burst and popcorn-like. Chiles en Nogada came out right the first
time: a whole poblano under white sauce, not battered. One issue: in the
grid the food fills each cell nearly edge to edge, ignoring "generous
margin". Watch for this in the single images, since the square crops need
that margin. If it recurs, add "the plate takes up no more than 60% of the
frame width".

**Then:** if all four pass section 5 and look like one set, write dish
blocks for Mexico's other 9 items and generate them the same way (still the
sandbox). Anything beyond Mexico needs a separate go.

## 4e. The universal prompt (frozen 2026-09-29, `c2-v1`)

Every dish image, for every country, is built as:

> **{STYLE}** + **{SUBJECT}** + **{FRAMING}**

Only the subject changes from dish to dish. The style and framing are
fixed. Changing either one means a new version, and every image made
under the old version gets regenerated so the app stays one set.

- **STYLE:** Hand-drawn illustration with bold, thick dark-brown ink
  outlines, simplified shapes with little small detail, and flat opaque
  gouache fills with minimal shading, clear enough to read as a small icon.
- **FRAMING:** One serving centered on a plain warm cream background, seen
  from a 45-degree angle, the food or drink taking up no more than 60% of
  the frame width and kept inside the central square of a 3:2 frame with
  generous margin all round, soft even light, no text, no people, no hands,
  no logos, no table or scenery. (This is section 3's block plus the 60%
  cap, added because the set check filled every cell edge to edge.)

**Writing a subject** (the part the batch prompt #9 will generate for each
dish):

1. Name the vessel first: plate, bowl, glass, clay cup, molcajete, stick.
2. List what's visible, in order of how much of the frame it covers, each
   with a colour: "brick-red broth", "pale tan corn husk".
3. Add the signature detail that separates it from its lookalike: burst
   hominy, doubled tortillas, a carved molinillo.
4. End with a "not X" guard for the most likely wrong version, when there is
   one: "not battered or fried", "not round chickpeas".
5. Add one or two side items only if they're traditional (lime, salsa,
   tostada). Never a table, cutlery or scenery.

Each subject also carries a `mustShow` line and a `wrong` line, which
extend the section 5 checklist to every dish.

**Where it lives:** `docs/design/prompts/dish-images.json` holds the style,
the framing, and all 13 Mexico subjects: the 4 pilot dishes plus 9 new
ones (tamales, guacamole, elote, churros, horchata, jamaica, Mexican hot
chocolate, mezcal, tequila). Drinks use the same framing, with a glass or
cup as the vessel.

**Generating:** `scripts/generate-dish-images.mjs` reads that file and calls
the OpenAI image API (`chatgpt-image-latest`, the model ChatGPT uses, 1536×1024; `gpt-image-1` came out cruder and ignored the framing) for one country at a time.
It skips images that already exist and refuses more than 15 per run.
Output goes to `docs/design/prototypes/image-pilot/finals/<country>/` for
review, not into the app. Moving images into the app is the #39 build.

```bash
# put OPENAI_API_KEY=sk-... in .env at the repo root (gitignored)
node scripts/generate-dish-images.mjs --country MX --dry-run   # print prompts, no API call
node scripts/generate-dish-images.mjs --country MX --confirm    # all 13 (skips existing)
node scripts/generate-dish-images.mjs --country MX --skip-pilot --confirm # just the 9 new ones
node scripts/generate-dish-images.mjs --country MX --only elote --force  # redo one
```

**Generation settings (standard from 2026-09-29, now the script defaults).**
`gpt-image-2.5-sunburst`, medium quality, 1152×768, sent to the edits
endpoint with the approved C2 set (`GF-c2-set-768.png`) as a style
reference. How we got there, on tamales, tacos, mole, elote, pozole and
mezcal:
- Without a reference, every model drifted from the set (`gpt-image-1` was
  crude clip art). The reference image does most of the work.
- With the reference, medium quality looked as good as high, at about a
  quarter of the price.
- Sunburst drew pozole's hominy correctly where `chatgpt-image-latest`
  drew cauliflower-like lumps, and it matches the set.
- 1152×768 is about 2× the largest display (the ~540 px detail sheet), so
  it stays sharp on phones. Mezcal at these settings measured 1,250 input
  and 277 output tokens, **about 2¢**, so 600 dishes cost roughly $10–15.
- To fix an almost-right image, edit it ("Repaint this exact picture. Keep
  everything identical. Change only …") instead of rerolling.

**How the app crops them (tested 2026-09-29, tamales in the Explore tile).**
Images keep their generous margin so one master can crop to a square.
Each surface zooms in by as much as its shape allows: `DishImage` takes a
`zoom` prop, and the 3:2 Explore tile uses **1.35**. The zoom belongs to
the surface, not the image, so every new image gets it automatically.
That only works while the framing block stays frozen. Review every new
image at app sizes, and add "nothing clipped at tile zoom" to the
checklist. Tall drinks (glasses, cinnamon sticks) are the likeliest to
clip. If one does, add an optional per-dish `imageZoom` override in the
data rather than changing the default.

## 5. Accuracy checklist (review every image against this)

Image models tend to make these dishes look like their Tex-Mex or generic
cousins. Reject an image that shows any "wrong" sign.

| Dish | Must show | Common wrong versions |
|---|---|---|
| Mole Poblano | Near-black glossy sauce, sesame seeds, meat under the sauce | Reddish chili con carne; brown gravy; beans |
| Tacos al pastor | Soft, small, doubled corn tortillas; red-orange pork; onion + cilantro | Hard yellow U-shaped shells; lettuce, shredded yellow cheese, sour cream |
| Pozole rojo | Big white hominy kernels in red broth; cabbage and radish on top | Beans or chickpeas instead of hominy; chili con carne; ramen-like noodles |
| Chiles en Nogada | Whole green poblano under white sauce; red pomegranate; green parsley | Battered and fried chile relleno; red tomato sauce; melted yellow cheese |

## 6. How to choose

View every image at the sizes it will actually appear: shrink it to the
~150 px tile, the ~110 px square and a 64 px thumbnail, as well as full size.
Score each style on:

1. **Recognizable when small.** Can you name the dish at tile size? At 64 px?
2. **Accurate.** Did it pass the checklist on all four dishes?
3. **Consistent.** Do its four images look like one set?
4. **Fits the app.** Does it sit well on the cream panel next to the flavor chips?

The winner must pass 1 and 2 on **all four** dishes. A beautiful style that
got one dish wrong is a warning about the other 600. If two styles tie,
prefer the one that stays readable at 64 px, because the restaurant view
(#42) will reuse these images as small thumbnails.

**After choosing:** freeze the winning style block and framing block
unchanged into the #9 batch prompt, so every later wave matches the pilot.
Then generate Mexico's remaining 9 dishes in that style (still the sandbox)
and drop all 13 into the #39 build.
