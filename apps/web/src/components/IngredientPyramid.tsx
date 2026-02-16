import { useState } from 'react';
import type { IngredientTiers, ColorPalette } from '../data/types';

interface IngredientPyramidProps {
  tiers: IngredientTiers;
  colors: ColorPalette;
}

interface TierConfig {
  key: keyof IngredientTiers;
  label: string;
  textSize: string;
  emojiSize: string;
  opacity: string;
}

const tierConfigs: TierConfig[] = [
  { key: 'foundation', label: 'Foundation', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'aromaticCore', label: 'Aromatic Core', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'flavorBuilders', label: 'Flavor Builders', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'staples', label: 'Staples', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
];

const tierDescriptions: Record<keyof IngredientTiers, string> = {
  foundation: "Essential ingredients - can't cook this cuisine without them",
  aromaticCore: "Signature aromatics that define the cuisine's character",
  flavorBuilders: "Supporting ingredients that add depth and complexity",
  staples: "Base starches and proteins for everyday meals"
};

export function IngredientPyramid({ tiers, colors }: IngredientPyramidProps) {
  const [activeIngredientTooltip, setActiveIngredientTooltip] = useState<string | null>(null);

  return (
    <div className="w-full py-4">
      <div className="flex flex-col items-center gap-5">
        {tierConfigs.map((config, tierIndex) => {
          const items = tiers[config.key];
          if (!items || items.length === 0) return null;

          return (
            <div key={config.key} className="w-full">
              {/* Tier label with hover tooltip */}
              <div className="text-center mb-2">
                <div className="inline-block relative group">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide cursor-default">
                    {config.label}
                  </span>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      {tierDescriptions[config.key]}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                  </div>
                </div>
              </div>

              {/* Ingredients row */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {items.map((item, index) => {
                  const ingredientKey = `${config.key}-${index}`;
                  const hasDescription = !!item.description;

                  return (
                    <div
                      key={ingredientKey}
                      className="relative group"
                      onMouseEnter={() => hasDescription && setActiveIngredientTooltip(ingredientKey)}
                      onMouseLeave={() => setActiveIngredientTooltip(null)}
                      onClick={() => hasDescription && setActiveIngredientTooltip(
                        activeIngredientTooltip === ingredientKey ? null : ingredientKey
                      )}
                    >
                      <div
                        className={`flex items-center gap-1.5 ${config.opacity} ${hasDescription ? 'cursor-pointer hover:bg-gray-50' : ''} rounded-md px-2 py-1 transition-colors`}
                      >
                        <span className={config.emojiSize}>{item.emoji}</span>
                        <span
                          className={`${config.textSize} font-medium`}
                          style={{ color: colors.text }}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Hover tooltip */}
                      {hasDescription && (
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 pointer-events-none transition-opacity ${
                            activeIngredientTooltip === ingredientKey ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                          }`}
                        >
                          <div className="bg-gray-800 text-white text-xs rounded-lg px-2 py-1.5 w-[180px] text-center shadow-lg">
                            {item.description}
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Separator line (except after last tier) */}
              {tierIndex < tierConfigs.length - 1 && (
                <div
                  className="mt-4 mx-auto h-px"
                  style={{
                    width: `${60 + tierIndex * 12}%`,
                    backgroundColor: `${colors.primary}15`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
