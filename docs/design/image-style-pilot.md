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
