import { systemColors } from '../../data/systemColors';
import { SimilarCuisinesSection } from './slides/SimilarCuisinesSection';
import type { ColorPalette, Country } from '../../data/types';

/** Meal structure, customs, influences, and the similar-cuisines list. */
export function FoodCultureSection({ country, colors }: { country: Country; colors: ColorPalette }) {
  const fc = country.foodCulture;
  const para = (label: string, text?: string) =>
    text ? (
      <p>
        <span className="font-bold" style={{ color: systemColors.navy }}>{label}. </span>
        {text}
      </p>
    ) : null;

  return (
    <div className="space-y-4 text-sm leading-relaxed" style={{ color: systemColors.navyMuted }}>
      {para('Meal structure', fc.mealStructure)}
      {para('Dining customs', fc.diningCustoms)}
      {para('Historical influences', fc.historicalInfluences)}
      <SimilarCuisinesSection country={country} colors={colors} />
    </div>
  );
}
