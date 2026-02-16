import { Link } from 'react-router-dom';
import { FlavorRadarChart } from './FlavorRadarChart';
import { AffinitySpectrum } from './AffinitySpectrum';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import type { ColorPalette } from '../data/types';

// Personal profile color palette (purple-themed for personal identity)
const personalColors: ColorPalette = {
  primary: '#6B5B95',      // Deep purple
  secondary: '#B44A3C',    // Tomato accent
  accent: '#E2B857',       // Saffron highlight
  background: '#FAF8F3',   // Sea salt
  text: '#1F2D3D',         // Navy
};

export function PersonalFlavorFingerprint() {
  const {
    personalFlavor,
    spectrums,
    topCuisines,
    totalDishes,
    hasEnoughData,
  } = usePersonalFlavorProfile();

  // Don't render if not enough data
  if (!hasEnoughData || !personalFlavor) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span style={{ color: personalColors.primary }}>✦</span>
          Your Flavor Fingerprint
        </h3>
        <span className="text-xs text-gray-400">
          Based on {totalDishes} dish{totalDishes !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Radar Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 text-center">
            Your Flavor Profile
          </h4>
          <FlavorRadarChart
            flavorIntensity={personalFlavor}
            colors={personalColors}
          />
        </div>

        {/* Right: Affinity Spectrums */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Your Preferences
          </h4>

          {spectrums ? (
            <div className="space-y-1">
              <AffinitySpectrum spectrum={spectrums.spice} title="Spice Tolerance" />
              <AffinitySpectrum spectrum={spectrums.complexity} title="Dish Complexity" />
              <AffinitySpectrum spectrum={spectrums.activity} title="Activity Style" />
              <AffinitySpectrum spectrum={spectrums.sweetSavory} title="Sweet vs Savory" />
              <AffinitySpectrum spectrum={spectrums.richness} title="Flavor Richness" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-sm text-gray-400">
              Log {5 - totalDishes} more dish{5 - totalDishes !== 1 ? 'es' : ''} to see your preferences
            </div>
          )}
        </div>
      </div>

      {/* Footer: Top cuisines */}
      {topCuisines.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Top influences:</span>
            {topCuisines.slice(0, 3).map((cuisine, index) => (
              <Link
                key={cuisine.countryId}
                to={`/country/${cuisine.countryId}`}
                className="text-xs px-2 py-0.5 rounded-full transition-colors"
                style={{
                  backgroundColor: index === 0 ? `${personalColors.primary}20` : '#f3f4f6',
                  color: index === 0 ? personalColors.primary : '#4b5563'
                }}
              >
                {cuisine.countryName}
                <span className="text-gray-400 ml-1">
                  ({cuisine.dishCount})
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
