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
  { key: 'foundation', label: 'FOUNDATION', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'aromaticCore', label: 'AROMATIC CORE', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'flavorBuilders', label: 'FLAVOR BUILDERS', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
  { key: 'staples', label: 'STAPLES', textSize: 'text-xs', emojiSize: 'text-base', opacity: 'opacity-100' },
];

export function IngredientPyramid({ tiers, colors }: IngredientPyramidProps) {
  return (
    <div className="w-full py-4">
      <div className="flex flex-col items-center gap-5">
        {tierConfigs.map((config, tierIndex) => {
          const items = tiers[config.key];
          if (!items || items.length === 0) return null;

          return (
            <div key={config.key} className="w-full">
              {/* Tier label */}
              <div className="text-center mb-2">
                <span
                  className="text-[10px] font-semibold tracking-widest"
                  style={{ color: `${colors.primary}80` }}
                >
                  {config.label}
                </span>
              </div>

              {/* Ingredients row */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {items.map((item, index) => (
                  <div
                    key={`${config.key}-${index}`}
                    className={`flex items-center gap-1.5 ${config.opacity}`}
                  >
                    <span className={config.emojiSize}>{item.emoji}</span>
                    <span
                      className={`${config.textSize} font-medium`}
                      style={{ color: colors.text }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
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
