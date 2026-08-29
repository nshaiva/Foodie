import type { ColorPalette } from '../../data/types';
import { systemColors } from '../../data/systemColors';
import { Wordmark } from '../Wordmark';
import { ProfileButton } from '../ProfileButton';
import { ProgressPlate } from '../ProgressPlate';
import type { DishProgress } from '../../utils/dishProgress';

interface CountryHeaderProps {
  name: string;
  capital: string;
  region: string;
  colors: ColorPalette;
  progress?: DishProgress;
}

export function CountryHeader({ name, capital, region, colors, progress }: CountryHeaderProps) {
  return (
    <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <Wordmark className="text-2xl" />
          <ProfileButton />
        </div>
        <h1 className="text-3xl font-bold flex items-center gap-2.5" style={{ color: systemColors.navy }}>
          {progress && progress.percent > 0 ? (
            /* Progress plate: % of popular dishes tried, in the flag tone */
            <ProgressPlate
              percent={progress.percent}
              size={30}
              color={colors.primary}
              title={`${progress.tried} of ${progress.total} dishes tried`}
            />
          ) : (
            /* Flag-tone plate: solid center, mid ring, pale rim */
            <span
              className="inline-block w-3.5 h-3.5 rounded-full"
              style={{ background: `radial-gradient(circle, ${colors.primary} 0 36%, ${colors.primary}8C 36% 60%, ${colors.primary}33 60% 100%)` }}
            />
          )}
          {name}
        </h1>
        <p className="mt-1" style={{ color: systemColors.navyMuted }}>
          {capital} · {region}
        </p>
      </div>
    </header>
  );
}
