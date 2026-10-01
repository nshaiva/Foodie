import { systemColors } from '../../data/systemColors';
import type { Country, Dish } from '../../data/types';
import { signatureDishes } from '../../utils/signatureDishes';
import { FlavorRadarChart } from '../FlavorRadarChart';
import { DishImage } from './DishTile';
import { BlockHeading, BODY_CLASS, BODY_STYLE, CARD_CLASS, CARD_STYLE, RADAR_COLOR, SectionLabel } from './FlavorBits';

/**
 * The country level of the Explore panel (#39, layout 1B): what the food is
 * like before any list. Signature dishes first (pictures are easier to take in
 * than a chart), then a compact flavor block, then a culture teaser. No
 * search, no filters, no cards: those live one level down, in All dishes,
 * reached from "See all N ›" in the strip's header.
 *
 * The flavor and culture blocks are the condensed form of the trays their
 * links open, drawn with the same pieces (`FlavorBits`). Flavor is the tray's own
 * radar at a compact size, tappable axes and ingredient drivers included.
 */

function LinkButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="tap self-start text-sm font-semibold hover:opacity-80" style={{ color: systemColors.tomato }}>
      {children}
    </button>
  );
}

export function CountryOverview({
  country, totalCount, onSeeAll, onOpenDish, onOpenFlavor, onOpenCulture,
}: {
  country: Country;
  totalCount: number;
  onSeeAll: () => void;
  onOpenDish: (dish: Dish) => void;
  onOpenFlavor: () => void;
  onOpenCulture: () => void;
}) {
  const colors = country.colorPalette;
  const signature = signatureDishes(country);
  const intensity = country.cuisineProfile.flavorIntensity;
  const regionCount = country.regionalVariations?.length ?? 0;
  const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
  const customs = country.foodCulture.diningCustoms;

  return (
    <div className="flex flex-col gap-7 pb-4">
      <div className="flex flex-col gap-2">
        {/* On the phone the strip already names the country */}
        <div className="max-md:hidden flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full flex-none" style={{ backgroundColor: colors.primary }} aria-hidden />
          <h2 className="text-2xl font-extrabold" style={{ color: systemColors.navy }}>{country.name}</h2>
          <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>
            {country.capital}{regionCount ? ` · ${regionCount} regions` : ` · ${country.region}`}
          </span>
        </div>
        {/* Two lines at most on a phone, where the half sheet has room for little else */}
        <p className="text-[15px] leading-relaxed" style={{ color: systemColors.navyLight }}>{firstSentence(country.cuisineProfile.summary)}</p>
      </div>

      <section className="flex flex-col gap-3" aria-labelledby="start-with">
        {/* Heading and "See all" share a row; the subtitle takes its own line
            below, so a long country name never squeezes the heading onto two */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex flex-col min-w-0">
            <span className="whitespace-nowrap"><BlockHeading id="start-with">Start with these</BlockHeading></span>
            <span className="max-md:hidden text-xs" style={{ color: systemColors.navyMuted }}>The dishes {country.name} is known for</span>
          </div>
          {/* The way down to every dish: a 44px target on a phone. Padded on
              the left only, so the text ends on the column's right edge
              without a negative margin widening the column */}
          <button
            type="button"
            onClick={onSeeAll}
            className="ml-auto flex-none h-11 md:h-8 pl-3 inline-flex items-center text-sm font-semibold whitespace-nowrap rounded-lg hover:opacity-80"
            style={{ color: systemColors.tomato }}
          >
            See all {totalCount} ›
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {signature.map(dish => (
            <button key={dish.name} type="button" onClick={() => onOpenDish(dish)} className="btn-press flex flex-col gap-1.5 text-left min-w-0" data-signature={dish.name}>
              <DishImage name={dish.name} image={dish.image} colors={colors} plate={34} className="w-full aspect-square rounded-xl" />
              <span className="text-[13px] font-bold leading-tight line-clamp-2" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{dish.name}</span>
            </button>
          ))}
        </div>
      </section>

      {intensity && (
        <section className="flex flex-col gap-3" aria-labelledby="tastes-like">
          <BlockHeading id="tastes-like">What it tastes like</BlockHeading>
          <div className={`${CARD_CLASS} p-4 flex flex-col gap-2`} style={CARD_STYLE}>
            <SectionLabel>Flavor fingerprint</SectionLabel>
            <FlavorRadarChart flavorIntensity={intensity} colors={colors} ingredientTiers={country.cuisineProfile.ingredientTiers} color={RADAR_COLOR} size="compact" />
          </div>
          <LinkButton onClick={onOpenFlavor}>Full flavor fingerprint ›</LinkButton>
        </section>
      )}

      {customs && (
        <section className="flex flex-col gap-2.5" aria-labelledby="food-culture">
          <BlockHeading id="food-culture">Food culture</BlockHeading>
          <SectionLabel>Dining customs</SectionLabel>
          <p className={`${BODY_CLASS} line-clamp-4`} style={BODY_STYLE}>{customs}</p>
          <LinkButton onClick={onOpenCulture}>Meals, customs and history ›</LinkButton>
        </section>
      )}
    </div>
  );
}
