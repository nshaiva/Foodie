import type { ColorPalette } from '../../data/types';
import { systemColors } from '../../data/systemColors';
import { Wordmark } from '../Wordmark';

interface CountryHeaderProps {
  name: string;
  capital: string;
  region: string;
  colors: ColorPalette;
}

export function CountryHeader({ name, capital, region, colors }: CountryHeaderProps) {
  return (
    <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="mb-2">
          <Wordmark className="text-2xl" />
        </div>
        <h1 className="text-3xl font-bold flex items-center gap-2.5" style={{ color: systemColors.navy }}>
          {/* Subtle flag-tone accent */}
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }} />
          {name}
        </h1>
        <p className="mt-1" style={{ color: systemColors.navyMuted }}>
          {capital} · {region}
        </p>
      </div>
    </header>
  );
}
