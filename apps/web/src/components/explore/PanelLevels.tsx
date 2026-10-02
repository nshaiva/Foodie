import { systemColors } from '../../data/systemColors';
import { FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';
import { regionLabelName } from '../../utils/regionAreas';
import type { Country, RegionalCuisine } from '../../data/types';
import { FINGERPRINT_MIN_MATCHES, regionFingerprint } from '../../utils/dishRegion';
import type { Entry, Group } from '../../utils/groupDishes';
import { DrinkStrip, TileGrid } from './DishTile';

/** "‹ Mexico": steps up one level. */
export function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="-ml-1 h-11 md:h-8 self-start inline-flex items-center gap-1 pr-2 text-sm font-semibold hover:opacity-80" style={{ color: systemColors.tomato }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      {label}
    </button>
  );
}

const brand = { fontFamily: 'var(--font-brand)' } as const;

/** How All dishes is arranged: ranked for you, or grouped by region. */
export type Arrangement = 'ranked' | 'region';

/**
 * The one control over All dishes (Nikita, 2026-10-02): a two-way toggle,
 * Ranked / Region. Ranked is the personal order Order well computes, laid out
 * as the same tiles the region view uses, so flipping it reads as re-sorting
 * one list rather than changing screens. Not a filter: the dishes never
 * change, only their arrangement, which is why it isn't a chip in the rail.
 */
export function ArrangeToggle({ value, onChange, personalized }: {
  value: Arrangement;
  onChange: (next: Arrangement) => void;
  /** Whether anything personal shaped the ranking; sets the caption's wording. */
  personalized: boolean;
}) {
  const options: [Arrangement, string][] = [['ranked', 'Ranked'], ['region', 'Region']];
  // One quiet caption says what the arrangement means (Nikita, 2026-10-02):
  // the strip's own phrase under Ranked, so the two read as the same thing
  const caption = value === 'ranked' ? (personalized ? 'picked for your palate' : 'most loved first') : 'where each comes from';
  return (
    <div className="flex items-center gap-3">
    <div role="radiogroup" aria-label="Arrange dishes" className="inline-flex self-start rounded-full border p-0.5" style={{ borderColor: systemColors.navy }} data-arrange={value}>
      {options.map(([key, label]) => {
        const on = key === value;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(key)}
            className={`h-10 md:h-8 px-4 rounded-full text-[13px] transition-colors ${on ? 'font-extrabold' : 'font-semibold'}`}
            style={on ? { backgroundColor: systemColors.navy, color: systemColors.surface } : { color: systemColors.navy }}
          >
            {label}
          </button>
        );
      })}
    </div>
    <span className="text-xs" style={{ color: systemColors.navyMuted }} data-arrange-caption>{caption}</span>
    </div>
  );
}

interface TileProps {
  colors: Country['colorPalette'];
  isWanted: (entry: Entry) => boolean;
  onOpen: (entry: Entry) => void;
  /** Under the Ranked arrangement: each tile's number. */
  rankOf?: (entry: Entry) => number | undefined;
}
interface DrinkProps {
  /** Drinks shown as the end strip; empty when there are none, or when the
   *  filters left only drinks (then they're in `groups` as tiles instead). */
  drinks: Entry[];
  whereFor: (entry: Entry) => string;
}

/**
 * All dishes: grouped by region, or one unlabelled group in rank order under
 * the Ranked arrangement. Section headers are titles, not
 * cards: the region's name in the map's italic serif, a count, and the way
 * into that region. Buckets that aren't a region ("Across Mexico") get the
 * title without the link. Empty sections are left out; every region is still
 * one tap away on the map and under "Other regions".
 */
export function AllDishesList({ groups, onOpenRegion, drinks, whereFor, countryLabel, ...tile }: TileProps & DrinkProps & {
  groups: Group[];
  onOpenRegion: (region: RegionalCuisine) => void;
  /** The country as it reads in a sentence ("the United States"). */
  countryLabel: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {groups.filter(g => g.entries.length > 0).map(group => (
        <section key={group.id} className="flex flex-col gap-3" data-section={group.label || 'all'}>
          {group.label && (
            group.region ? (
              <button type="button" onClick={() => onOpenRegion(group.region!)} className="flex items-baseline gap-2.5 text-left min-h-11 md:min-h-0" aria-label={`Open region ${regionLabelName(group.region.name)}`}>
                <span role="heading" aria-level={3} className="text-2xl italic font-semibold leading-tight" style={{ ...brand, color: systemColors.navy }}>{regionLabelName(group.region.name)}</span>
                <span className="text-sm" style={{ color: systemColors.navyMuted }}>{group.entries.length}</span>
                <span className="ml-auto flex-none text-[13px] font-semibold" style={{ color: systemColors.tomato }}>Open region ›</span>
              </button>
            ) : (
              <div className="flex items-baseline gap-2.5">
                <h3 className="text-2xl italic font-semibold leading-tight" style={{ ...brand, color: systemColors.navy }}>{group.label}</h3>
                <span className="text-sm" style={{ color: systemColors.navyMuted }}>{group.entries.length}</span>
              </div>
            )
          )}
          <TileGrid entries={group.entries} {...tile} />
        </section>
      ))}
      {/* Drinks: one section after every region, set apart by a hairline; not
          a region, so a plain heading rather than the map's italic serif */}
      {drinks.length > 0 && (
        <section className="flex flex-col gap-3 border-t pt-6" style={{ borderColor: systemColors.border }} data-section="drinks">
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-lg font-extrabold" style={{ color: systemColors.navy }}>To drink in {countryLabel}</h3>
            <span className="text-sm" style={{ color: systemColors.navyMuted }}>{drinks.length}</span>
          </div>
          <DrinkStrip entries={drinks} whereFor={whereFor} {...tile} />
        </section>
      )}
    </div>
  );
}

/**
 * The region level: a title block, not a card. Description is its first
 * sentence; the flavor chips derived from its key ingredients sit inline.
 * Then the region's tiles and a row of the other regions.
 */
export function RegionView({
  country, region, entries, counts, onOpenRegion, drinks, whereFor, ...tile
}: TileProps & DrinkProps & {
  country: Country;
  region: RegionalCuisine;
  entries: Entry[];
  counts: Record<string, number>;
  onOpenRegion: (region: RegionalCuisine) => void;
}) {
  const fingerprint = regionFingerprint(region, country.cuisineProfile.ingredientTiers);
  const chips = fingerprint.matched >= FINGERPRINT_MIN_MATCHES ? fingerprint.axes.slice(0, 4) : [];
  const firstSentence = (region.description.match(/^.*?[.!?](\s|$)/)?.[0] ?? region.description).trim();
  const others = (country.regionalVariations ?? []).filter(r => r.name !== region.name);

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2.5">
        <div className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: systemColors.navyMuted }}>Region of {country.name}</div>
        <h2 className="text-[2rem] md:text-[2.4rem] italic font-semibold leading-[1.05]" style={{ ...brand, color: systemColors.navy }}>{regionLabelName(region.name)}</h2>
        <p className="text-[15px] leading-relaxed" style={{ color: systemColors.navyLight }}>{firstSentence}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {chips.map(axis => (
            <span key={axis} className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: FLAVOR_AXIS_META[axis].color, color: '#fff' }} title="Derived from this region's key ingredients">
              {FLAVOR_AXIS_META[axis].label}
            </span>
          ))}
        </div>
      </header>

      {/* Food first; a region with only drinks (Oaxaca today) shows just the strip */}
      {(entries.length > 0 || drinks.length === 0) && (
        <section className="flex flex-col gap-3">
          <div className="text-sm font-semibold" style={{ color: systemColors.navyMuted }}>
            {entries.length === 0 ? 'No dishes recorded from this region yet.' : `${entries.length} ${entries.length === 1 ? 'dish' : 'dishes'} from here`}
          </div>
          {entries.length > 0 && <TileGrid entries={entries} {...tile} />}
        </section>
      )}
      {drinks.length > 0 && (
        <section className="flex flex-col gap-3" data-section="drinks-here">
          <h3 className="text-sm font-semibold" style={{ color: systemColors.navyMuted }}>To drink here</h3>
          <DrinkStrip entries={drinks} whereFor={whereFor} {...tile} />
        </section>
      )}

      {others.length > 0 && (
        <nav aria-label="Other regions" className="flex flex-col gap-2.5 pb-2">
          <div className="text-sm font-semibold" style={{ color: systemColors.navyMuted }}>Other regions</div>
          <div className="flex flex-wrap gap-2">
            {others.map(r => (
              <button
                key={r.name}
                type="button"
                onClick={() => onOpenRegion(r)}
                className="btn-press h-11 md:h-9 px-3.5 rounded-full border inline-flex items-center gap-1.5 text-[15px] italic"
                style={{ ...brand, backgroundColor: systemColors.surface, borderColor: systemColors.border, color: systemColors.navy }}
              >
                {regionLabelName(r.name)}
                <span className="not-italic text-xs" style={{ fontFamily: 'var(--font-body)', color: systemColors.navyMuted }}>{counts[r.name] ?? 0}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
