import { FlavorRadarChart } from '../../FlavorRadarChart';
import { IngredientPyramid } from '../../IngredientPyramid';
import { CookingFlow } from '../../CookingFlow';
import { SimilarCuisinesSection } from './SimilarCuisinesSection';
import { systemColors } from '../../../data/systemColors';
import type { Country, ColorPalette } from '../../../data/types';

interface ProfileSlideProps {
  country: Country;
  colors: ColorPalette;
}

function TileLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: systemColors.navyMuted }}>
      {children}
    </h4>
  );
}

export function ProfileSlide({ country, colors }: ProfileSlideProps) {
  const cuisineProfile = country.cuisineProfile;
  const tile = 'bg-white rounded-2xl border border-gray-200 p-4';

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4" style={{ color: systemColors.navy }}>
        Flavor
      </h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Radar — tall feature tile */}
        <div className={`${tile} lg:row-span-2`}>
          <TileLabel>Flavor Fingerprint</TileLabel>
          <FlavorRadarChart flavorIntensity={cuisineProfile.flavorIntensity} colors={colors} />
        </div>

        {/* Ingredients — wide tile */}
        {cuisineProfile.ingredientTiers && (
          <div className={`${tile} lg:col-span-2`}>
            <TileLabel>Ingredients &amp; Spices</TileLabel>
            <IngredientPyramid tiers={cuisineProfile.ingredientTiers} colors={colors} />
          </div>
        )}

        {/* Cooking flow — wide tile */}
        {cuisineProfile.cookingFlow && cuisineProfile.cookingFlow.length > 0 && (
          <div className={`${tile} lg:col-span-2`}>
            <TileLabel>How it's cooked</TileLabel>
            <CookingFlow steps={cuisineProfile.cookingFlow} colors={colors} />
          </div>
        )}
      </div>

      {/* Similar cuisines — full width below the bento (renders its own tile) */}
      <SimilarCuisinesSection country={country} colors={colors} />
    </div>
  );
}
