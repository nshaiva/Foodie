import { systemColors } from '../../data/systemColors';
import type { ColorPalette, UserDish } from '../../data/types';
import { dishVerdictRating } from '../../utils/ratings';
import type { Entry } from '../../utils/groupDishes';
import { entryView, placeholderTint } from '../../utils/entryView';

/**
 * Explore's dish tiles (#39, layout 2B): an image, the name, a two-line
 * tagline and at most one status marker. Everything you can *do* with a dish
 * lives in the detail sheet the tile opens, so the tile itself stays a picture
 * with a caption.
 *
 * Real images don't exist yet (#36 is picking a style). Until they do, the
 * image area is a flat tint from the country's palette with a plate outline;
 * when a dish gains `image`, the same box shows it at the same size, so
 * nothing shifts when the illustrations land.
 */

/**
 * The image box. `className` sets its shape (aspect ratio or height); the
 * placeholder and a real image fill the same box.
 */
export function DishImage({
  name, image, colors, className = '', plate = 44, zoom = 1, glass = false, children,
}: {
  name: string;
  image?: string;
  colors: ColorPalette;
  className?: string;
  plate?: number;
  /** Images are generated with margin for square crops; wide boxes zoom in. */
  zoom?: number;
  /** A drink: a glass outline instead of the plate, on a warm neutral. */
  glass?: boolean;
  children?: React.ReactNode;
}) {
  const tint = placeholderTint(name, colors, glass);
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ backgroundColor: systemColors.seaSalt, backgroundImage: `linear-gradient(${tint}, ${tint})` }}
    >
      {image ? (
        <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined} />
      ) : glass ? (
        <svg width={plate} height={plate} viewBox="0 0 34 34" fill="none" stroke={systemColors.navyMuted} strokeOpacity="0.4" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <path d="M10 5h14l-1.6 22.5a1.5 1.5 0 0 1-1.5 1.4h-7.8a1.5 1.5 0 0 1-1.5-1.4z" />
          <path d="M10.7 13h12.6" />
        </svg>
      ) : (
        <svg width={plate} height={plate} viewBox="0 0 34 34" fill="none" stroke={systemColors.navyMuted} strokeOpacity="0.35" strokeWidth="1.2" aria-hidden="true">
          <circle cx="17" cy="17" r="15" />
          <circle cx="17" cy="17" r="9" />
        </svg>
      )}
      {children}
    </div>
  );
}

export function BookmarkIcon({ size = 14, filled = true, color = systemColors.saffron }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

export function CheckIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

/** The one marker a tile may carry: tried (✓ and stars) wins over want to try. */
export function StatusMarker({ tried, wanted, small = false }: { tried?: UserDish; wanted: boolean; small?: boolean }) {
  if (tried) {
    const verdict = dishVerdictRating(tried);
    const stars = verdict !== undefined ? Math.round(verdict) : undefined;
    return (
      <span
        className={`absolute rounded-full flex items-center gap-1 font-bold shadow-sm ${small ? 'top-1.5 right-1.5 h-5 px-1.5 text-[11px]' : 'top-2 right-2 h-[26px] px-2 text-xs'}`}
        style={{ backgroundColor: systemColors.surface, color: '#4F6B45' }}
        role="img"
        aria-label={stars ? `Tried, rated ${stars} of 5` : 'Tried'}
        data-status="tried"
      >
        <CheckIcon size={small ? 11 : 13} />
        {stars ? <span style={{ color: '#9A6F12' }}>★ {stars}</span> : null}
      </span>
    );
  }
  if (wanted) {
    return (
      <span
        className={`absolute rounded-full flex items-center justify-center shadow-sm ${small ? 'top-1.5 right-1.5 w-[22px] h-[22px]' : 'top-2 right-2 w-7 h-7'}`}
        style={{ backgroundColor: systemColors.surface }}
        role="img"
        aria-label="On your want-to-try list"
        data-status="want"
      >
        <BookmarkIcon size={small ? 11 : 14} />
      </span>
    );
  }
  return null;
}

export function DishTile({
  entry, colors, wanted, onOpen, wide = false,
}: {
  entry: Entry;
  colors: ColorPalette;
  wanted: boolean;
  onOpen: () => void;
  /** A region's only dish spans the row rather than leaving a half-empty one. */
  wide?: boolean;
}) {
  const v = entryView(entry);
  return (
    <button
      type="button"
      onClick={onOpen}
      // A subgrid of three rows (image, name, line): names that wrap in one
      // tile push that row down for both, so taglines stay level across a row
      className={`btn-press grid grid-rows-subgrid row-span-3 gap-y-0 content-start text-left min-w-0 ${wide ? 'col-span-2' : ''}`}
      aria-label={`${v.name}${v.tried ? ', tried' : wanted ? ', on your want-to-try list' : ''}`}
      data-tile={v.name}
    >
      <DishImage
        name={v.name}
        image={v.image}
        colors={colors}
        plate={wide ? 52 : 44}
        zoom={1.35}
        glass={v.isDrink}
        className={`w-full mb-2 rounded-2xl ${wide ? 'aspect-[3/1]' : 'aspect-[3/2]'}`}
      >
        <StatusMarker tried={v.tried} wanted={wanted} />
      </DishImage>
      <span className="text-[15px] font-bold leading-tight line-clamp-2" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{v.name}</span>
      <span data-line className="mt-0.5 text-[13px] leading-snug line-clamp-2" style={{ color: systemColors.navyMuted }}>{v.line}</span>
    </button>
  );
}

/** Two across on a phone and in the desktop panel. */
export function TileGrid({
  entries, colors, isWanted, onOpen,
}: {
  entries: Entry[];
  colors: ColorPalette;
  isWanted: (entry: Entry) => boolean;
  onOpen: (entry: Entry) => void;
}) {
  // A region's only dish keeps the standard tile: stretching it to 3:1 would
  // crop its image far harder than every other tile's.
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 [grid-auto-rows:auto]">
      {entries.map(entry => (
        <DishTile key={entry.key} entry={entry} colors={colors} wanted={isWanted(entry)} onOpen={() => onOpen(entry)} />
      ))}
    </div>
  );
}

/**
 * Drinks as one strip (#39, option 2): smaller square tiles with the name and
 * a one-line "where". A phone swipes it sideways; the desktop panel has the
 * width to wrap it into a grid, so nothing hides past its edge.
 */
export function DrinkStrip({
  entries, colors, isWanted, onOpen, whereFor,
}: {
  entries: Entry[];
  colors: ColorPalette;
  isWanted: (entry: Entry) => boolean;
  onOpen: (entry: Entry) => void;
  whereFor: (entry: Entry) => string;
}) {
  return (
    <div className="chip-rail -mx-5 px-5 scroll-px-5 flex gap-3 snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(104px,1fr))] md:gap-y-4" data-drink-strip>
      {entries.map(entry => {
        const v = entryView(entry);
        const wanted = isWanted(entry);
        return (
          <button
            key={entry.key}
            type="button"
            onClick={() => onOpen(entry)}
            className="btn-press flex-none w-28 md:w-auto snap-start flex flex-col gap-1.5 text-left min-w-0"
            aria-label={`${v.name}${v.tried ? ', tried' : wanted ? ', on your want-to-try list' : ''}`}
            data-tile={v.name}
            data-drink
          >
            <DishImage name={v.name} image={v.image} colors={colors} plate={36} glass className="w-full aspect-square rounded-xl">
              <StatusMarker tried={v.tried} wanted={wanted} small />
            </DishImage>
            <span className="text-[13px] font-bold leading-tight line-clamp-2 min-h-[2.5em]" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{v.name}</span>
            <span data-where className="text-xs truncate -mt-0.5" style={{ color: systemColors.navyMuted }}>{whereFor(entry)}</span>
          </button>
        );
      })}
    </div>
  );
}
