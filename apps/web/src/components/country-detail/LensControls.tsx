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

/** A removable summary of one thing currently narrowing the list. */
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center gap-1"
      style={{
        backgroundColor: systemColors.herbLight,
        borderColor: systemColors.herb,
        color: systemColors.navy,
      }}
      title={`Remove ${label}`}
    >
      {label}
      <span aria-hidden style={{ color: systemColors.navyMuted }}>✕</span>
    </button>
  );
}

function Pill({
  active, onClick, children, title,
}: { active?: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className="text-xs font-semibold px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors"
      style={{
        backgroundColor: active ? systemColors.herb : systemColors.surface,
        borderColor: active ? systemColors.herb : systemColors.border,
        color: active ? '#fff' : systemColors.navyMuted,
      }}
    >
      {children}
    </button>
  );
}

/**
 * The country page's control row.
 *
 * Two decisions live here and they are deliberately given different weight,
 * because they aren't the same kind of choice. **Filtering** — what subset am I
 * looking at — is the prominent segmented control. **Grouping** — how is it
 * arranged — is a quiet dropdown, since you set it rarely.
 *
 * An earlier version gave both the same row of pills, which put "Tried" and
 * "All" on screen twice meaning different things each time.
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

        {/* What you're looking at — the decision you change most */}
        <div className="flex gap-1">
          <Pill active={filters.view === 'all'} onClick={() => filters.setView('all')}>All</Pill>
          <Pill active={filters.view === 'tried'} onClick={() => filters.setView('tried')}>
            Tried{triedCount > 0 ? ` (${triedCount})` : ''}
          </Pill>
          <Pill active={filters.view === 'want'} onClick={() => filters.setView('want')}>Want</Pill>
        </div>

        {/* Refinements — icon only, so it doesn't compete */}
        <button
          onClick={() => filters.setDrawerOpen(!filters.drawerOpen)}
          aria-expanded={filters.drawerOpen}
          aria-label={`Filters${filters.activeFilterCount ? `, ${filters.activeFilterCount} active` : ''}`}
          title="Filters"
          className="relative w-8 h-8 rounded-lg border flex items-center justify-center text-sm"
          style={{
            backgroundColor: filters.drawerOpen ? systemColors.navy : systemColors.surface,
            borderColor: filters.drawerOpen ? systemColors.navy : systemColors.border,
            color: filters.drawerOpen ? systemColors.seaSalt : systemColors.navyMuted,
          }}
        >
          ⚙
          {filters.activeFilterCount > 0 && (
            <span
              className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[1rem] h-4 px-1 rounded-full text-[0.6rem] font-bold"
              style={{ backgroundColor: systemColors.herb, color: '#fff' }}
            >
              {filters.activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* How it's arranged — quiet, because you set it rarely */}
      {availableLenses.length > 1 && (
        <div className="flex justify-end" ref={menuRef}>
          <div className="relative">
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
        </div>
      )}

      {/* What's currently narrowing the list, visible without opening the drawer */}
      {(focusedRegionName || filters.activeFilterCount > 0) && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="text-[0.6rem] font-bold uppercase tracking-wider"
            style={{ color: systemColors.navyMuted }}
          >
            Showing
          </span>
          {focusedRegionName && (
            <ActiveChip label={`📍 ${getShortRegionName(focusedRegionName)}`} onRemove={onClearRegion} />
          )}
          {diet.veg && <ActiveChip label="Vegetarian" onRemove={() => setDiet({ ...diet, veg: false })} />}
          {diet.vegan && <ActiveChip label="Vegan" onRemove={() => setDiet({ ...diet, vegan: false })} />}
          {diet.gf && <ActiveChip label="Gluten-free" onRemove={() => setDiet({ ...diet, gf: false })} />}
          {spice !== 'any' && (
            <ActiveChip
              label={spice === 'mild' ? '🌶️ Mild' : spice === 'medium' ? '🌶️🌶️ Medium' : '🌶️🌶️🌶️ Hot'}
              onRemove={() => setSpice('any')}
            />
          )}
          {popularity !== 'any' && (
            <ActiveChip
              label={popularity === 'local-favorite' ? '📍 Local favorite' : '📷 Tourist classic'}
              onRemove={() => setPopularity('any')}
            />
          )}
          {filters.dessertOnly && <ActiveChip label="🍰 Dessert" onRemove={() => filters.setDessertOnly(false)} />}
          {filters.bevType !== 'any' && (
            <ActiveChip
              label={filters.bevType === 'alcoholic' ? 'With alcohol' : 'No alcohol'}
              onRemove={() => filters.setBevType('any')}
            />
          )}
          {filters.served !== 'any' && (
            <ActiveChip
              label={filters.served === 'hot' ? '🔥 Hot' : '🧊 Cold'}
              onRemove={() => filters.setServed('any')}
            />
          )}
        </div>
      )}

      {filters.drawerOpen && (
        <div
          className="rounded-xl border p-3 space-y-2"
          style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}
        >
          <FilterRow label="Diet">
            <Pill active={diet.veg} onClick={() => setDiet({ ...diet, veg: !diet.veg })} title="Vegetarian">VGT</Pill>
            <Pill active={diet.vegan} onClick={() => setDiet({ ...diet, vegan: !diet.vegan })} title="Vegan">VG</Pill>
            <Pill active={diet.gf} onClick={() => setDiet({ ...diet, gf: !diet.gf })} title="Gluten-free">GF</Pill>
          </FilterRow>

          <FilterRow label="Spice">
            {(['any', 'mild', 'medium', 'hot'] as const).map(s => (
              <Pill key={s} active={spice === s} onClick={() => setSpice(spice === s ? 'any' : s)}>
                {s === 'any' ? 'Any' : s === 'mild' ? '🌶️' : s === 'medium' ? '🌶️🌶️' : '🌶️🌶️🌶️'}
              </Pill>
            ))}
          </FilterRow>

          <FilterRow label="Who eats it">
            <Pill
              active={popularity === 'local-favorite'}
              onClick={() => setPopularity(popularity === 'local-favorite' ? 'any' : 'local-favorite')}
            >📍 Local</Pill>
            <Pill
              active={popularity === 'tourist-classic'}
              onClick={() => setPopularity(popularity === 'tourist-classic' ? 'any' : 'tourist-classic')}
            >📷 Classic</Pill>
            <Pill active={filters.dessertOnly} onClick={() => filters.setDessertOnly(!filters.dessertOnly)}>
              🍰 Dessert
            </Pill>
          </FilterRow>

          {hasBeverages && (
            <FilterRow label="Drinks">
              <Pill
                active={filters.bevType === 'non-alcoholic'}
                onClick={() => filters.setBevType(filters.bevType === 'non-alcoholic' ? 'any' : 'non-alcoholic')}
              >No alcohol</Pill>
              <Pill
                active={filters.bevType === 'alcoholic'}
                onClick={() => filters.setBevType(filters.bevType === 'alcoholic' ? 'any' : 'alcoholic')}
              >With alcohol</Pill>
              <Pill
                active={filters.served === 'hot'}
                onClick={() => filters.setServed(filters.served === 'hot' ? 'any' : 'hot')}
              >🔥 Hot</Pill>
              <Pill
                active={filters.served === 'cold'}
                onClick={() => filters.setServed(filters.served === 'cold' ? 'any' : 'cold')}
              >🧊 Cold</Pill>
            </FilterRow>
          )}

          <p className="text-[0.68rem]" style={{ color: systemColors.navyMuted }}>
            Spice and “who eats it” apply to food, so setting them hides drinks.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="text-[0.6rem] font-bold uppercase tracking-wider w-[5.5rem] flex-none"
        style={{ color: systemColors.navyMuted }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
