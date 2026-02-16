import type { AffinitySpectrum as AffinitySpectrumType } from '../hooks/usePersonalFlavorProfile';
import { systemColors } from '../data/systemColors';

interface AffinitySpectrumProps {
  spectrum: AffinitySpectrumType;
  title: string;
}

export function AffinitySpectrum({ spectrum, title }: AffinitySpectrumProps) {
  const { position, label, confidence, leftLabel, rightLabel } = spectrum;

  // Clamp position to 0-100
  const clampedPosition = Math.max(0, Math.min(100, position));

  return (
    <div
      className="py-2"
      style={{ opacity: 0.3 + confidence * 0.7 }}
      title={confidence < 0.5 ? 'Log more dishes to improve accuracy' : undefined}
    >
      {/* Title and label */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-gray-700">{title}</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${systemColors.tomato}15`,
            color: systemColors.tomato
          }}
        >
          {label}
        </span>
      </div>

      {/* Spectrum bar */}
      <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${systemColors.herbLight}, ${systemColors.tomato}40)`
          }}
        />

        {/* Position indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300"
          style={{
            left: `calc(${clampedPosition}% - 6px)`,
            backgroundColor: systemColors.tomato,
            borderColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{leftLabel}</span>
        <span className="text-xs text-gray-400">{rightLabel}</span>
      </div>
    </div>
  );
}
