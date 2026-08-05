import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FlavorRadarChart } from './FlavorRadarChart';
import { AffinitySpectrum } from './AffinitySpectrum';
import { TasteSurvey } from './TasteSurvey';
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

interface PersonalFlavorFingerprintProps {
  /** When embedded, the surrounding container supplies the title/chrome. */
  embedded?: boolean;
}

export function PersonalFlavorFingerprint({ embedded = false }: PersonalFlavorFingerprintProps) {
  const {
    personalFlavor,
    spectrums,
    topCuisines,
    totalDishes,
    surveyCount,
    hasEnoughData,
  } = usePersonalFlavorProfile();
  const [surveyOpen, setSurveyOpen] = useState(false);

  const wrapperClass = embedded ? '' : 'bg-white rounded-lg border border-gray-200 p-4 md:p-6';
  const surveyOverlay = surveyOpen ? <TasteSurvey onClose={() => setSurveyOpen(false)} /> : null;

  // Empty state — not enough taste signals yet
  if (!hasEnoughData || !personalFlavor) {
    const remaining = Math.max(0, 3 - totalDishes - surveyCount);
    return (
      <div className={wrapperClass}>
        <div className="text-center py-10">
          <div className="text-3xl mb-2" style={{ color: personalColors.primary }}>✦</div>
          <h3 className="font-semibold text-gray-900 mb-1">Your taste profile is taking shape</h3>
          <p className="text-sm text-gray-500">
            Rate {remaining} more dish{remaining !== 1 ? 'es' : ''} to reveal your Flavor Fingerprint —
            the quickest way is a taste survey of famous dishes.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setSurveyOpen(true)}
              className="text-white px-4 py-2 rounded-md text-sm transition-colors"
              style={{ backgroundColor: personalColors.primary }}
            >
              Take the taste survey
            </button>
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-sm border transition-colors"
              style={{ borderColor: '#e5e7eb', color: '#4b5563' }}
            >
              Explore cuisines
            </Link>
          </div>
        </div>
        {surveyOverlay}
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {/* Header (omitted when embedded — the container titles it) */}
      {embedded ? (
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400">
            Based on {totalDishes} logged dish{totalDishes !== 1 ? 'es' : ''}
            {surveyCount > 0 && ` · ${surveyCount} survey answer${surveyCount !== 1 ? 's' : ''}`}
          </p>
          <button
            onClick={() => setSurveyOpen(true)}
            className="text-xs underline decoration-dotted"
            style={{ color: personalColors.primary }}
          >
            {surveyCount > 0 ? 'Retake survey' : 'Take the taste survey'}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span style={{ color: personalColors.primary }}>✦</span>
            Your Flavor Fingerprint
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              Based on {totalDishes} logged dish{totalDishes !== 1 ? 'es' : ''}
              {surveyCount > 0 && ` · ${surveyCount} survey answer${surveyCount !== 1 ? 's' : ''}`}
            </span>
            <button
              onClick={() => setSurveyOpen(true)}
              className="text-xs underline decoration-dotted"
              style={{ color: personalColors.primary }}
            >
              {surveyCount > 0 ? 'Retake survey' : 'Take the taste survey'}
            </button>
          </div>
        </div>
      )}

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

      {/* How the profile is calculated */}
      <details className="mt-4 text-xs text-gray-500">
        <summary className="cursor-pointer select-none hover:text-gray-700 transition-colors">
          How this works
        </summary>
        <p className="mt-2 leading-relaxed">
          Your radar blends the flavor profiles of the cuisines you've logged.
          Rating a dish 4–5★ pulls its cuisine into your profile, 3★ is neutral,
          and 1–2★ pushes it out. Logging often and recently nudges a cuisine's
          influence, but your ratings matter most. Star ratings you set on a dish
          are your overall take; otherwise we use the average of your rated visits.
          Taste-survey answers count too, at half the strength of a logged dish.
        </p>
      </details>

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
      {surveyOverlay}
    </div>
  );
}
