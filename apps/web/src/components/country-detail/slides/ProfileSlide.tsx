import { FlavorRadarChart } from '../../FlavorRadarChart';
import { IngredientPyramid } from '../../IngredientPyramid';
import { CookingFlow } from '../../CookingFlow';
import { SimilarCuisinesSection } from './SimilarCuisinesSection';
import type { Country, ColorPalette } from '../../../data/types';

interface ProfileSlideProps {
  country: Country;
  colors: ColorPalette;
}

export function ProfileSlide({ country, colors }: ProfileSlideProps) {
  const cuisineProfile = country.cuisineProfile;

  return (
    <div className="p-4 space-y-4 h-full">
      <h2
        className="text-lg font-semibold"
        style={{ color: colors.text }}
      >
        Cuisine Profile
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* 2-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CookingFlow
              steps={cuisineProfile.cookingFlow}
              colors={colors}
            />
          </div>
        )}

        {/* Similar Cuisines */}
        <SimilarCuisinesSection
          country={country}
          colors={colors}
        />
      </div>
    </div>
  );
}
