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
      <div className="flex items-center justify-between mb-1.5 text-[13px]">
        <span className="font-semibold" style={{ color: systemColors.navy }}>{title}</span>
        <span className="font-semibold" style={{ color: systemColors.tomato }}>{label}</span>
      </div>

      {/* Spectrum track */}
      <div className="relative h-1.5 rounded-full" style={{ backgroundColor: systemColors.saffronLight }}>
        {/* Position dot */}
        <div
          className="absolute top-1/2 rounded-full transition-all duration-300"
          style={{
            left: `${clampedPosition}%`,
            width: 14,
            height: 14,
            transform: 'translate(-50%, -50%)',
            backgroundColor: systemColors.tomato,
            border: '2px solid #fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
          }}
        />
      </div>

      {/* End labels */}
      <div className="flex justify-between mt-1 text-[11px]" style={{ color: systemColors.navyMuted }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
