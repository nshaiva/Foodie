import type { ColorPalette } from '../../data/types';
import { systemColors } from '../../data/systemColors';
import { AppBar } from '../AppBar';
import { ProfileButton } from '../ProfileButton';
import { ProgressPlate } from '../ProgressPlate';
import type { DishProgress } from '../../utils/dishProgress';

interface CountryHeaderProps {
  name: string;
  capital: string;
  region: string;
  colors: ColorPalette;
  progress?: DishProgress;
  /** Pull-out controls (fingerprint, food culture) that belong with the title. */
  tools?: React.ReactNode;
  /** The cuisine in a sentence or two — the header is the intro. */
  summary?: string;
}

export function CountryHeader({ name, capital, region, colors, progress, tools, summary }: CountryHeaderProps) {
  return (
    <AppBar actions={<ProfileButton />}>
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
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p style={{ color: systemColors.navyMuted }}>
            {capital} · {region}
          </p>
          {tools && <div className="flex flex-wrap items-center gap-2">{tools}</div>}
        </div>
        {summary && (
          <p className="mt-4 text-[0.95rem] leading-relaxed" style={{ color: systemColors.navy }}>
            {summary}
          </p>
        )}
    </AppBar>
  );
}
