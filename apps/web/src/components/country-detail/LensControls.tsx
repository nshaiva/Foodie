import { useEffect, useRef, useState } from 'react';
import { systemColors } from '../../data/systemColors';
import { Tray } from '../Tray';
import type { DishFilters } from '../../hooks/useDishFilters';
import type { Lens } from '../../utils/groupDishes';

const LENS_LABELS: Record<Lens, string> = {
  region: 'Region',
  category: 'Type',
  none: 'Ungrouped',
};

interface LensControlsProps {
  filters: DishFilters;
  lens: Lens;
  onLensChange: (lens: Lens) => void;
  availableLenses: Lens[];
  triedCount: number;
  hasBeverages: boolean;
  /** "Clear all" also drops region focus, which lives in the URL, not in filters. */
  onClearRegion?: () => void;
}

/** One filter in the rail. `remove` is set only for filters you can turn off. */
type ChipFamily = 'diet' | 'spice' | 'popularity' | 'drink';

interface Chip {
  id: string;
  label: string;
  active: boolean;
  toggle: () => void;
  /** Excluded from the "how many things are narrowing this list" count. */
  neutral?: boolean;
  /** Which kind of filter this is; sets the chip's tint. View chips have none. */
  family?: ChipFamily;
}

// One soft tint per family. Active chips sort to the front of the rail, which
// scatters any grouping, so the family has to travel with the chip: a tint does
// that where a position can't. Resting = pale wash; active = the same hue,
// stronger, with the family color as the border.
const FAMILY_TINT: Record<ChipFamily, { rest: string; active: string; edge: string }> = {
  diet: { rest: systemColors.herbLight, active: `${systemColors.herb}55`, edge: systemColors.herb },
  spice: { rest: `${systemColors.saffron}1A`, active: `${systemColors.saffron}40`, edge: systemColors.saffron },
  popularity: { rest: systemColors.tomatoLight, active: `${systemColors.tomato}45`, edge: systemColors.tomato },
  drink: { rest: '#E4E9EF', active: '#8496AD55', edge: '#8496AD' },
};

function ChipButton({ chip }: { chip: Chip }) {
  const tint = chip.family ? FAMILY_TINT[chip.family] : undefined;
  const style = tint
    ? {
        backgroundColor: chip.active ? tint.active : tint.rest,
        borderColor: chip.active ? tint.edge : `${tint.edge}55`,
        color: systemColors.navy,
      }
    : {
        backgroundColor: chip.active ? systemColors.herbLight : systemColors.surface,
        borderColor: chip.active ? systemColors.herb : systemColors.border,
        color: chip.active ? systemColors.navy : systemColors.navyMuted,
      };
  return (
    <button
      onClick={chip.toggle}
      aria-pressed={chip.active}
      className="flex-none text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors"
      style={style}
    >
      {chip.label}
      {chip.active && (
        <span aria-hidden className="ml-1" style={{ color: systemColors.navyMuted }}>✕</span>
      )}
    </button>
  );
}

/**
 * The country page's control row: a search field and a single rail of filters.
 *
 * Every filter is a chip, and **active chips sort to the front**, so what is
 * narrowing the list is always the first thing you read — no drawer to open and
 * no separate summary row restating what you picked. An earlier version hid the
 * filters behind a gear and listed the active ones underneath it, which meant
 * three rows of controls before a single dish and a "Showing" line that arrived
 * after a line about grouping.
 *
 * Phone and desktop run the same markup and differ in one declaration: the rail
 * scrolls sideways below `md` and wraps above it. Desktop has the width, so the
 * filters a drawer would economise on are simply visible. Keeping it to a
 * breakpoint rather than a JavaScript branch means one component to reason
 * about and no second layout to keep in step.
 *
 * Grouping stays a quiet text dropdown next to the search field. It is not a
 * filter — it changes how the list is arranged, never which dishes are in it —
 * so it deliberately doesn't take the chip shape.
 */
export function LensControls({
  filters, lens, onLensChange, availableLenses, triedCount, hasBeverages,
  onClearRegion,
}: LensControlsProps) {
  const { diet, setDiet, spice, setSpice, popularity, setPopularity } = filters;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [menuOpen]);

  const toggleSpice = (value: typeof spice) => setSpice(spice === value ? 'any' : value);
  const togglePop = (value: typeof popularity) =>
    setPopularity(popularity === value ? 'any' : value);

  // Canonical order, widest reach first. Active chips are pulled to the front
  // below, so this is only the resting order.
  const chips: Chip[] = [];


  chips.push(
    {
      id: 'tried',
      label: triedCount > 0 ? `Tried (${triedCount})` : 'Tried',
      active: filters.view === 'tried',
      toggle: () => filters.setView(filters.view === 'tried' ? 'all' : 'tried'),
    },
    {
      id: 'want',
      label: 'Want to try',
      active: filters.view === 'want',
      toggle: () => filters.setView(filters.view === 'want' ? 'all' : 'want'),
    },
    { id: 'veg', family: 'diet', label: 'Vegetarian', active: diet.veg, toggle: () => setDiet({ ...diet, veg: !diet.veg }) },
    { id: 'vegan', family: 'diet', label: 'Vegan', active: diet.vegan, toggle: () => setDiet({ ...diet, vegan: !diet.vegan }) },
    { id: 'gf', family: 'diet', label: 'Gluten-free', active: diet.gf, toggle: () => setDiet({ ...diet, gf: !diet.gf }) },
    { id: 'mild', family: 'spice', label: '🌶️ Mild', active: spice === 'mild', toggle: () => toggleSpice('mild') },
    { id: 'spicy', family: 'spice', label: '🌶️🌶️ Spicy', active: spice === 'spicy', toggle: () => toggleSpice('spicy') },
    {
      id: 'local',
      family: 'popularity',
      label: '📍 Local favorite',
      active: popularity === 'local-favorite',
      toggle: () => togglePop('local-favorite'),
    },
    {
      id: 'classic',
      family: 'popularity',
      label: '📷 Tourist classic',
      active: popularity === 'tourist-classic',
      toggle: () => togglePop('tourist-classic'),
    },
    {
      id: 'dessert',
      family: 'popularity',
      label: '🍰 Dessert',
      active: filters.dessertOnly,
      toggle: () => filters.setDessertOnly(!filters.dessertOnly),
    },
  );

  if (hasBeverages) {
    chips.push(
      {
        id: 'no-alcohol',
        family: 'drink',
        label: 'No alcohol',
        active: filters.bevType === 'non-alcoholic',
        toggle: () => filters.setBevType(filters.bevType === 'non-alcoholic' ? 'any' : 'non-alcoholic'),
      },
      {
        id: 'alcohol',
        family: 'drink',
        label: 'With alcohol',
        active: filters.bevType === 'alcoholic',
        toggle: () => filters.setBevType(filters.bevType === 'alcoholic' ? 'any' : 'alcoholic'),
      },
      {
        id: 'served-hot',
        family: 'drink',
        label: '🔥 Hot drink',
        active: filters.served === 'hot',
        toggle: () => filters.setServed(filters.served === 'hot' ? 'any' : 'hot'),
      },
      {
        id: 'served-cold',
        family: 'drink',
        label: '🧊 Cold drink',
        active: filters.served === 'cold',
        toggle: () => filters.setServed(filters.served === 'cold' ? 'any' : 'cold'),
      },
    );
  }

  const activeChips = chips.filter(c => c.active);

  const clearAll = () => {
    filters.reset();
    onClearRegion?.();
  };

  const [filtersOpen, setFiltersOpen] = useState(false);

  // The tray groups by family; the rail only ever shows what's on.
  const GROUPS: { title: string; family?: ChipFamily; hint?: string }[] = [
    { title: 'Mine', hint: 'Dishes you have logged or saved' },
    { title: 'Diet', family: 'diet' },
    { title: 'Spice', family: 'spice' },
    { title: 'Ordering', family: 'popularity', hint: 'What locals order vs. the classics' },
    { title: 'Drinks', family: 'drink' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={filters.query}
          onChange={e => filters.setQuery(e.target.value)}
          placeholder="Search dishes, flavors, places…"
          aria-label="Search dishes"
          className="flex-1 min-w-[11rem] text-sm px-3 py-2 md:py-1.5 rounded-lg border"
          style={{ borderColor: systemColors.border, color: systemColors.navy }}
        />

        {/* One button for every filter; the count says how many are narrowing the list */}
        <button
          onClick={() => setFiltersOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={filtersOpen}
          className="btn-press flex-none inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 md:py-1.5 rounded-lg border"
          style={{
            borderColor: activeChips.length ? systemColors.tomato : systemColors.border,
            color: systemColors.navy,
            backgroundColor: systemColors.surface,
          }}
        >
          Filters
          {activeChips.length > 0 && (
            <span
              className="text-[0.68rem] font-bold rounded-full px-1.5 leading-4 text-white"
              style={{ backgroundColor: systemColors.tomato }}
            >
              {activeChips.length}
            </span>
          )}
        </button>

        {/* How it's arranged — quiet, and deliberately not chip-shaped */}
        {availableLenses.length > 1 && (
          <div className="relative flex-none" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="tap text-xs font-medium inline-flex items-center gap-1 px-1.5 py-0.5 rounded"
              style={{ color: systemColors.navyMuted }}
            >
              Grouped by{' '}
              <span className="font-bold" style={{ color: systemColors.navy }}>
                {LENS_LABELS[lens]}
              </span>
              <span aria-hidden>▾</span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-1 z-20 rounded-lg border shadow-sm overflow-hidden min-w-[8rem]"
                style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
              >
                {availableLenses.map(l => (
                  <button
                    key={l}
                    role="menuitemradio"
                    aria-checked={lens === l}
                    onClick={() => { onLensChange(l); setMenuOpen(false); }}
                    className="w-full text-left text-xs px-3 py-2 font-medium"
                    style={{
                      backgroundColor: lens === l ? systemColors.herbLight : 'transparent',
                      color: systemColors.navy,
                    }}
                  >
                    {LENS_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Only what's on. At rest this row doesn't exist. */}
      {activeChips.length > 0 && (
        <div className="chip-rail flex gap-1.5 md:flex-wrap" role="group" aria-label="Active filters">
          {activeChips.map(chip => (
            <ChipButton key={chip.id} chip={chip} />
          ))}
          {activeChips.length > 1 && (
            <button
              onClick={clearAll}
              className="tap flex-none text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ color: systemColors.tomato }}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <Tray
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        subtitle={activeChips.length ? `${activeChips.length} on` : 'Narrow the list'}
      >
        <div className="space-y-5">
          {GROUPS.map(group => {
            const members = chips.filter(c => c.family === group.family);
            if (members.length === 0) return null;
            return (
              <section key={group.title}>
                <h3 className="text-[0.66rem] font-bold uppercase tracking-wider mb-2" style={{ color: systemColors.navyMuted }}>
                  {group.title}
                  {group.hint && <span className="ml-2 font-normal normal-case tracking-normal">{group.hint}</span>}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {members.map(chip => <ChipButton key={chip.id} chip={chip} />)}
                </div>
              </section>
            );
          })}
          {activeChips.length > 0 && (
            <button
              onClick={() => { clearAll(); setFiltersOpen(false); }}
              className="tap text-sm font-semibold"
              style={{ color: systemColors.tomato }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </Tray>
    </div>
  );
}
