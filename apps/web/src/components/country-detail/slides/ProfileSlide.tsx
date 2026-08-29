import { FlavorRadarChart } from '../../FlavorRadarChart';
import { IngredientPyramid } from '../../IngredientPyramid';
import { systemColors } from '../../../data/systemColors';
import type { Country, ColorPalette } from '../../../data/types';

interface ProfileSlideProps {
  country: Country;
  colors: ColorPalette;
  /** Single column, no heading — for the tray, where the bento grid is too tight. */
  stacked?: boolean;
}

function TileLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: systemColors.navyMuted }}>
      {children}
    </h4>
  );
}

export function ProfileSlide({ country, colors, stacked = false }: ProfileSlideProps) {
  const cuisineProfile = country.cuisineProfile;
  const tile = 'bg-white rounded-2xl border border-gray-200 p-4';

  return (
    <div className={stacked ? '' : 'p-4 h-full overflow-y-auto'}>
      {!stacked && (
        <h2 className="text-xl font-semibold mb-4" style={{ color: systemColors.navy }}>
          Flavor
        </h2>
      )}

      {/* Bento grid on the page; one column in the tray */}
      <div className={`grid grid-cols-1 gap-4 ${stacked ? '' : 'lg:grid-cols-3'}`}>
        {/* Radar — tall feature tile */}
        <div className={`${tile} ${stacked ? '' : 'lg:row-span-2'}`}>
          <TileLabel>Flavor Fingerprint</TileLabel>
          <FlavorRadarChart
            flavorIntensity={cuisineProfile.flavorIntensity}
            colors={colors}
            ingredientTiers={cuisineProfile.ingredientTiers}
          />
        </div>

        {/* Ingredients + cooking sequence — wide tile */}
        {cuisineProfile.ingredientTiers && (
          <div className={`${tile} ${stacked ? '' : 'lg:col-span-2 lg:row-span-2'}`}>
            <TileLabel>How it comes together</TileLabel>
            <IngredientPyramid
              tiers={cuisineProfile.ingredientTiers}
              colors={colors}
              cookingFlow={cuisineProfile.cookingFlow}
            />
          </div>
        )}
      </div>
    </div>
  );
}
