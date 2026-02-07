import type { CookingStep, ColorPalette } from '../data/types';

interface CookingFlowProps {
  steps: CookingStep[];
  colors: ColorPalette;
}

function StepPill({ step, colors }: { step: CookingStep; colors: ColorPalette }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap"
      style={{
        backgroundColor: `${colors.primary}15`,
        color: colors.text,
      }}
    >
      {step.emoji && <span>{step.emoji}</span>}
      <span>{step.action}</span>
    </div>
  );
}

function HorizontalArrow({ colors }: { colors: ColorPalette }) {
  return (
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
  );
}

export function CookingFlow({ steps, colors }: CookingFlowProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Cooking Flow</h3>

      {/* Desktop (lg+): Horizontal wrap */}
      <div className="hidden lg:flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <StepPill step={step} colors={colors} />
            {index < steps.length - 1 && <HorizontalArrow colors={colors} />}
          </div>
        ))}
      </div>

      {/* Tablet (sm-lg): Horizontal scroll with fade indicators */}
      <div className="hidden sm:block lg:hidden relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 px-1 pb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <StepPill step={step} colors={colors} />
                {index < steps.length - 1 && <HorizontalArrow colors={colors} />}
              </div>
            ))}
          </div>
        </div>
        {/* Fade gradients on edges */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Mobile (<sm): Vertical stack */}
      <div className="flex sm:hidden flex-col items-center gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <StepPill step={step} colors={colors} />
            {index < steps.length - 1 && (
              <span className="text-gray-400 my-1">↓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
