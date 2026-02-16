import { FlavorRadarChart } from '../../FlavorRadarChart';
import { IngredientPyramid } from '../../IngredientPyramid';
import { CookingFlow } from '../../CookingFlow';
import type { CuisineProfile, ColorPalette } from '../../../data/types';

interface ProfileSlideProps {
  cuisineProfile: CuisineProfile;
  colors: ColorPalette;
}

export function ProfileSlide({ cuisineProfile, colors }: ProfileSlideProps) {
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <h2
        className="text-xl font-semibold"
        style={{ color: colors.text }}
      >
        Cuisine Profile
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        {/* 2-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Flavor Fingerprint</h4>
            <FlavorRadarChart
              flavorIntensity={cuisineProfile.flavorIntensity}
              colors={colors}
            />
          </div>

          {/* Ingredient Pyramid */}
          {cuisineProfile.ingredientTiers && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Ingredients & Spices</h4>
              <IngredientPyramid
                tiers={cuisineProfile.ingredientTiers}
                colors={colors}
              />
            </div>
          )}
        </div>

        {/* Cooking Flow */}
        {cuisineProfile.cookingFlow && cuisineProfile.cookingFlow.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <CookingFlow
              steps={cuisineProfile.cookingFlow}
              colors={colors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
