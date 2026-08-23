import { useEffect, useRef, useState } from 'react';
import { systemColors } from '../../data/systemColors';
import type { DishFilters } from '../../hooks/useDishFilters';
import { getShortRegionName } from '../../data/regionMapConfig';
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
  focusedRegionName?: string;
  onClearRegion: () => void;
}

/** One filter in the rail. `remove` is set only for filters you can turn off. */
interface Chip {
  id: string;
  label: string;
  active: boolean;
  toggle: () => void;
  /** Excluded from the "how many things are narrowing this list" count. */
  neutral?: boolean;
}

function ChipButton({ chip }: { chip: Chip }) {
  return (
    <button
      onClick={chip.toggle}
      aria-pressed={chip.active}
      className="flex-none text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors"
      style={{
        backgroundColor: chip.active ? systemColors.herbLight : systemColors.surface,
        borderColor: chip.active ? systemColors.herb : systemColors.border,
        color: chip.active ? systemColors.navy : systemColors.navyMuted,
      }}
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
  focusedRegionName, onClearRegion,
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

  if (focusedRegionName) {
    // Focus is set from the map or a section header, so this chip only ever
    // removes it — there is nothing sensible to turn "on" from here.
    chips.push({
      id: 'region',
      label: `📍 ${getShortRegionName(focusedRegionName)}`,
      active: true,
      toggle: onClearRegion,
    });
  }

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
    { id: 'veg', label: 'Vegetarian', active: diet.veg, toggle: () => setDiet({ ...diet, veg: !diet.veg }) },
    { id: 'vegan', label: 'Vegan', active: diet.vegan, toggle: () => setDiet({ ...diet, vegan: !diet.vegan }) },
    { id: 'gf', label: 'Gluten-free', active: diet.gf, toggle: () => setDiet({ ...diet, gf: !diet.gf }) },
    { id: 'mild', label: '🌶️ Mild', active: spice === 'mild', toggle: () => toggleSpice('mild') },
    { id: 'spicy', label: '🌶️🌶️ Spicy', active: spice === 'spicy', toggle: () => toggleSpice('spicy') },
    {
      id: 'local',
      label: '📍 Local favorite',
      active: popularity === 'local-favorite',
      toggle: () => togglePop('local-favorite'),
    },
    {
      id: 'classic',
      label: '📷 Tourist classic',
      active: popularity === 'tourist-classic',
      toggle: () => togglePop('tourist-classic'),
    },
    {
      id: 'dessert',
      label: '🍰 Dessert',
      active: filters.dessertOnly,
      toggle: () => filters.setDessertOnly(!filters.dessertOnly),
    },
  );

  if (hasBeverages) {
    chips.push(
      {
        id: 'no-alcohol',
        label: 'No alcohol',
        active: filters.bevType === 'non-alcoholic',
        toggle: () => filters.setBevType(filters.bevType === 'non-alcoholic' ? 'any' : 'non-alcoholic'),
      },
      {
        id: 'alcohol',
        label: 'With alcohol',
        active: filters.bevType === 'alcoholic',
        toggle: () => filters.setBevType(filters.bevType === 'alcoholic' ? 'any' : 'alcoholic'),
      },
      {
        id: 'served-hot',
        label: '🔥 Hot drink',
        active: filters.served === 'hot',
        toggle: () => filters.setServed(filters.served === 'hot' ? 'any' : 'hot'),
      },
      {
        id: 'served-cold',
        label: '🧊 Cold drink',
        active: filters.served === 'cold',
        toggle: () => filters.setServed(filters.served === 'cold' ? 'any' : 'cold'),
      },
    );
  }

  const activeChips = chips.filter(c => c.active);
  const restingChips = chips.filter(c => !c.active);
  const ordered = [...activeChips, ...restingChips];

  const clearAll = () => {
    filters.reset();
    if (focusedRegionName) onClearRegion();
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={filters.query}
          onChange={e => filters.setQuery(e.target.value)}
          placeholder="Search dishes, flavors, places…"
          aria-label="Search dishes"
          className="flex-1 min-w-[11rem] text-sm px-3 py-1.5 rounded-lg border"
          style={{ borderColor: systemColors.border, color: systemColors.navy }}
        />

        {/* How it's arranged — quiet, and deliberately not chip-shaped */}
        {availableLenses.length > 1 && (
          <div className="relative flex-none" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="text-xs font-medium inline-flex items-center gap-1 px-1.5 py-0.5 rounded"
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

      {/* One rail: scrolls on a phone, wraps on a desktop. Same chips either way. */}
      <div
        className="chip-rail flex gap-1.5 md:flex-wrap"
        role="group"
        aria-label="Filter dishes"
      >
        {ordered.map(chip => (
          <ChipButton key={chip.id} chip={chip} />
        ))}
        {activeChips.length > 1 && (
          <button
            onClick={clearAll}
            className="flex-none text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ color: systemColors.tomato }}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
