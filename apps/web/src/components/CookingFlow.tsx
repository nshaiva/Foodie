import type { CookingStep, ColorPalette } from '../data/types';

interface CookingFlowProps {
  steps: CookingStep[];
  colors: ColorPalette;
}

export function CookingFlow({ steps, colors }: CookingFlowProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Cooking Flow</h3>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: `${colors.primary}15`,
                color: colors.text,
              }}
            >
              {step.emoji && <span>{step.emoji}</span>}
              <span>{step.action}</span>
            </div>

            {/* Arrow (except after last step) */}
            {index < steps.length - 1 && (
              <svg
                className="w-5 h-5 mx-1 flex-shrink-0"
                style={{ color: colors.primary }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
