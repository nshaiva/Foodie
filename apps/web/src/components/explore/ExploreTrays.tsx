import { systemColors } from '../../data/systemColors';
import { countries } from '../../data/countries';
import type { Country } from '../../data/types';
import { getSimilarCuisines } from '../../utils/cuisineSimilarity';
import { FlavorRadarChart } from '../FlavorRadarChart';
import { IngredientPyramid } from '../IngredientPyramid';
import { BODY_CLASS, BODY_STYLE, CARD_CLASS, CARD_STYLE, RADAR_COLOR, SectionLabel } from './FlavorBits';

/**
 * The expanded forms of the overview's flavor and culture blocks (#39). Same
 * pieces as the condensed blocks (`FlavorBits`): white bordered cards, small
 * caps labels, the same terracotta radar at a larger size. The
 * content is the trays' existing content (the radar with its tappable axes,
 * the ingredient build view, meal structure, customs, influences, similar
 * cuisines), only restyled.
 */

export function FlavorTrayBody({ country }: { country: Country }) {
  const profile = country.cuisineProfile;
  return (
    <div className="flex flex-col gap-4">
      <div className={`${CARD_CLASS} p-4 flex flex-col gap-3`} style={CARD_STYLE}>
        <SectionLabel>Flavor fingerprint</SectionLabel>
        <FlavorRadarChart flavorIntensity={profile.flavorIntensity} colors={country.colorPalette} ingredientTiers={profile.ingredientTiers} color={RADAR_COLOR} size="fitted" />
      </div>
      {profile.ingredientTiers && (
        // Clipped sideways: the chips' hidden hover notes are wider than a
        // phone panel and would otherwise let it scroll sideways
        <div className={`${CARD_CLASS} p-4 flex flex-col gap-3 overflow-x-clip`} style={CARD_STYLE}>
          <SectionLabel>How it comes together</SectionLabel>
          <IngredientPyramid tiers={profile.ingredientTiers} colors={country.colorPalette} cookingFlow={profile.cookingFlow} />
        </div>
      )}
    </div>
  );
}

export function CultureTrayBody({ country, onOpenCountry }: { country: Country; onOpenCountry: (id: string) => void }) {
  const fc = country.foodCulture;
  // Dining customs first: it's the paragraph the overview previews
  const sections: [string, string | undefined][] = [
    ['Dining customs', fc.diningCustoms],
    ['Meal structure', fc.mealStructure],
    ['Historical influences', fc.historicalInfluences],
  ];
  const similar = getSimilarCuisines(country, countries, 3);
  return (
    <div className="flex flex-col gap-5">
      {sections.filter(([, text]) => !!text).map(([label, text]) => (
        <section key={label} className="flex flex-col gap-1.5">
          <SectionLabel>{label}</SectionLabel>
          <p className={BODY_CLASS} style={BODY_STYLE}>{text}</p>
        </section>
      ))}
      {similar.length > 0 && (
        <div className={`${CARD_CLASS} p-4 flex flex-col gap-2.5`} style={CARD_STYLE}>
          <SectionLabel>Similar cuisines</SectionLabel>
          <div className="flex flex-col gap-2">
            {similar.map(({ country: c, score, reasons }) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onOpenCountry(c.id)}
                className="btn-press text-left rounded-xl border px-3 py-2.5 min-h-11"
                style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ backgroundColor: c.colorPalette.primary }} aria-hidden />
                  <span className="text-sm font-bold" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{c.name}</span>
                  <span className="ml-auto text-xs" style={{ color: systemColors.navyMuted }}>{score}% match</span>
                </div>
                {reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {reasons.map(reason => (
                      <span key={reason} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navyLight }}>{reason}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
