# Flavor and Geography — what the data says

Status: analysis, not a feature (2026-08-23). Produced while choosing map
groupings for #30. Kept because the findings outlive that decision.

## What was measured

Every country carries a `cuisineProfile.flavorIntensity` with six axes on a
1–10 scale (heat, acidity, sweetness, umami, aromatic, smokeEarth). Treat each
cuisine as a point in that six-dimensional space and the distance between two
cuisines is just Euclidean distance.

**A random pair of the 31 countries sits at 5.84.** That's the number every
grouping below is judged against: a group whose members average *less* than
5.84 apart is a real cluster; one that averages *more* is worse than picking
countries at random.

Scores are mean pairwise distance within the group. Lower is tighter.

## Finding 1 — flavor and geography genuinely disagree

Cluster the 31 cuisines purely on flavor, ignoring where they are, and the
groups are useless for a map:

```
(11) Japan France Italy Ireland Brazil Portugal Argentina USA Türkiye Egypt Spain
 (7) Jamaica India Indonesia Malaysia Mexico Ethiopia Pakistan
 (6) Georgia Greece Lebanon Morocco Afghanistan Azerbaijan
 (3) Nigeria China South Korea
 (2) Philippines Vietnam
 (1) Peru
 (1) Thailand
```

Japan with Ireland. Nigeria with Korea. Thailand alone. These are honest
flavor neighbours and nonsense geography, which is the point: **a map has to be
geographic, so it cannot also be a flavor clustering.** The flavor-similarity
job is already served elsewhere in the app — the flavor-match map layer and the
similar-cuisines section — and asking one surface to do both would wreck both.

## Finding 2 — continents are a bad unit for food

| Grouping | n | Spread | |
|---|---|---|---|
| Africa (one continent) | 4 | **6.48** | worse than random |
| The Americas (one) | 6 | **6.04** | worse than random |
| Latin America | 5 | **6.21** | worse than the whole Americas |
| Europe | 6 | 3.95 | tight |
| Southeast Asia | 5 | 5.27 | holds |

Africa is the single worst grouping tested. Morocco and Egypt are not
African-flavored so much as Mediterranean-and-Near-Eastern, and the numbers say
so loudly.

## Finding 3 — the tightest real clusters

| Group | n | Spread |
|---|---|---|
| **USA + Brazil + Argentina** | 3 | **2.31** |
| Brazil + Argentina | 2 | 2.24 |
| Morocco, Egypt, Türkiye, Lebanon, Georgia, Azerbaijan | 6 | **3.66** |
| Georgia + Azerbaijan + Türkiye | 3 | 3.77 |
| Europe | 6 | 3.95 |

Two stories fall out of this.

**The grill belt.** The tightest multi-country cluster in the dataset is the
USA, Brazil and Argentina — beef, smoke, sweetness, high umami, almost no chile
heat. Three cuisines that don't share a border, a language or a colonial
parent, but share a fire. It's also **discontiguous**: Mexico and the Caribbean
sit between them and are chile-forward, which is why the map for #30 has a hole
in the Americas.

**The Ottoman-Arab sphere reassembles itself.** Nobody tagged it, but Morocco
through the Caucasus scores tighter than Europe does. Preserved lemon, sumac,
pomegranate, warm spice, low heat, moderate acid — five centuries of shared
trade showing up in six numbers.

## Finding 4 — the axis extremes

| Axis | Highest | Lowest |
|---|---|---|
| Heat | Jamaica 9, Ethiopia 8, Nigeria 8 | France 1, Ireland 1 |
| Acidity | Peru 9, Philippines 9, Lebanon 8 | Japan 3, Nigeria 3 |
| Sweetness | Thailand 7, USA 7, Argentina 6 | Ethiopia 2, Pakistan 3 |
| Umami | Japan 10, South Korea 10, China 9 | Morocco 5, Peru 5 |
| Aromatic | India 10, Ethiopia 9, Morocco 9 | Ireland 3, USA 3 |
| Smoke/earth | Argentina 9, Mexico 9, Nigeria 9 | Thailand 3, Vietnam 4 |

Peru is the dataset's outlier: acidity 9 with umami 5, pairing well with
nothing. Thailand is the other one — it's the only cuisine high on heat,
acidity *and* sweetness at once, which is why pure clustering leaves it alone.

## Feature ideas this suggests

Unranked; parked in the Inbox. All of them are about **how cuisine changes as
you move across a map**, which is a question the app currently can't answer.

- **Flavor gradient layer.** A map layer per axis instead of per country: the
  heat belt, the acidity belt. You'd see chile heat rising as you cross from
  the Mediterranean into the Levant and collapsing again in Europe. The layer
  plumbing already exists (`computeAllFlavorMatches`, the gradient legend).
- **Neighbour comparison on a country page.** "Türkiye vs the cuisines around
  it" — same six axes, the neighbours faint behind yours. Teaches what's
  distinctive rather than what's present.
- **A flavor journey.** Pick two cuisines and walk the line between them:
  Morocco → Egypt → Lebanon → Georgia, watching acidity climb and heat fall.
  Closest thing to the "how do cuisines relate" thesis goal the app has.
- **Discontiguous kinship.** Surface the grill belt directly: "you like
  Argentine food; the USA and Brazil are closer to it than Peru is, despite
  the map." An honest antidote to the geographic grouping the map has to use.

## Caveats

- Six axes per country is a coarse instrument. It's one profile for all of
  China, and it was authored per country rather than measured.
- Euclidean distance weights all six axes equally. The flavor-match code
  (`components/map/flavorMatch.ts`) deliberately doesn't — it weights axes the
  user is opinionated about. Any feature built from this should reuse that
  weighting rather than the flat distance used here.
- 31 countries is small, and lopsided: 15 in Asia, 4 in Africa. Conclusions
  about Africa rest on four data points and should be revisited after the #9
  batch.
- Corpus size, for reference and corrected 2026-08-23: **294 dishes and 155
  drinks**, 449 items in total. Earlier notes described all 449 as dishes.
