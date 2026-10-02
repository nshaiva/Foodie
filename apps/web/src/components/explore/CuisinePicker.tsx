import { useEffect, useMemo, useRef, useState } from 'react';
import { countries, getCountryById } from '../../data/countries';
import { STOCKED_REGIONS } from '../../data/culinaryRegions';
import { systemColors } from '../../data/systemColors';
import { useDishes } from '../../hooks/useDishes';
import { PlateDot } from '../Wordmark';
import { Tray } from '../Tray';

type CountryRow = (typeof countries)[number];

/** A dish or drink anywhere in the data, as the search sees it. */
interface DishHit { key: string; name: string; line: string; country: CountryRow }

/** Every dish and drink we know, once. The entry keys match Explore's (`d:` / `b:` + name). */
let DISH_INDEX: DishHit[] | null = null;
function dishIndex(): DishHit[] {
  if (DISH_INDEX) return DISH_INDEX;
  DISH_INDEX = countries.flatMap(country => [
    ...country.popularDishes.map(d => ({ key: `d:${d.name}`, name: d.name, line: [d.englishName, country.name].filter(Boolean).join(' · '), country })),
    ...(country.popularBeverages ?? []).map(b => ({ key: `b:${b.name}`, name: b.name, line: [b.englishName, country.name].filter(Boolean).join(' · '), country })),
  ]);
  return DISH_INDEX;
}
const MAX_DISHES = 12;

/**
 * The map's search (2026-10-02), which replaced the Order well button and
 * page. At a table you need the cuisine in two taps from cold, which the map
 * alone can't give (world → continent → country), so this is a search first,
 * then the cuisines you've already eaten from, then everything by the same
 * eight culinary regions as the map. One field finds both (Nikita): a
 * cuisine flies to the country with its overview up, where "Start with
 * these" is already ranked for you; a dish flies to its country and opens
 * that dish. Rows in one surface per group, no per-row chrome: the row is
 * the tap.
 */
export function CuisinePicker({ open, onClose, onPick, onPickDish }: {
  open: boolean;
  onClose: () => void;
  onPick: (countryId: string) => void;
  onPickDish: (countryId: string, entryKey: string) => void;
}) {
  const [query, setQuery] = useState('');
  const { dishes } = useDishes();
  const input = useRef<HTMLInputElement>(null);

  // The keyboard up on a phone once the tray has risen
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => input.current?.focus(), 350);
    return () => window.clearTimeout(t);
  }, [open]);
  // A fresh search next time: the query clears on the way out
  const close = () => { setQuery(''); onClose(); };
  const pick = (id: string) => { setQuery(''); onPick(id); };
  const pickDish = (hit: DishHit) => { setQuery(''); onPickDish(hit.country.id, hit.key); };

  const dishRow = (hit: DishHit) => (
    <button
      key={`${hit.country.id}:${hit.key}`}
      type="button"
      onClick={() => pickDish(hit)}
      className="btn-press w-full flex items-center gap-3 px-3.5 min-h-12 py-2.5 text-left"
      data-dish-hit={hit.name}
    >
      <PlateDot color={hit.country.colorPalette.primary} size={14} />
      <span className="flex-1 min-w-0 flex items-baseline gap-2">
        <span className="text-[15px] font-bold leading-tight" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{hit.name}</span>
        <span className="text-[13px] truncate" style={{ color: systemColors.navyMuted }}>{hit.line}</span>
      </span>
    </button>
  );

  // Countries you've logged in, most recent first: at a restaurant you're
  // often back at a cuisine you know
  const mine = useMemo(() => {
    const latest = new Map<string, string>();
    for (const d of dishes) {
      const prev = latest.get(d.countryId);
      if (!prev || d.updatedAt > prev) latest.set(d.countryId, d.updatedAt);
    }
    return [...latest.entries()]
      .sort((a, b) => (a[1] < b[1] ? 1 : -1))
      .map(([id]) => getCountryById(id))
      .filter((c): c is CountryRow => !!c)
      .slice(0, 6);
  }, [dishes]);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return null;
    return countries
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.cuisineProfile.flavorProfile.some(f => f.toLowerCase().includes(q)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q]);
  // Dishes by name or English name, the ones that start with the query first
  const dishMatches = useMemo(() => {
    if (!q) return [];
    const starts = (s: string) => s.toLowerCase().startsWith(q);
    const has = (s: string) => s.toLowerCase().includes(q);
    return dishIndex()
      .filter(d => has(d.name) || has(d.line))
      .sort((a, b) => Number(starts(b.name)) - Number(starts(a.name)) || a.name.localeCompare(b.name))
      .slice(0, MAX_DISHES);
  }, [q]);

  const groups = useMemo(
    () => STOCKED_REGIONS.map(r => ({
      name: r.name,
      countries: r.countryIds.map(getCountryById).filter((c): c is CountryRow => !!c).sort((a, b) => a.name.localeCompare(b.name)),
    })).filter(g => g.countries.length > 0),
    [],
  );

  const row = (c: CountryRow) => (
    <button
      key={c.id}
      type="button"
      onClick={() => pick(c.id)}
      className="btn-press w-full flex items-center gap-3 px-3.5 min-h-12 py-2.5 text-left"
      data-cuisine={c.id}
    >
      <PlateDot color={c.colorPalette.primary} size={14} />
      <span className="flex-1 min-w-0 flex items-baseline gap-2">
        <span className="text-[15px] font-bold leading-tight" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>{c.name}</span>
        <span className="text-[13px] truncate" style={{ color: systemColors.navyMuted }}>
          {c.cuisineProfile.flavorProfile.slice(0, 2).map(f => f.split(' ')[0]).join(' · ')}
        </span>
      </span>
    </button>
  );

  return (
    <Tray open={open} onClose={close} title="Search" subtitle="A cuisine, or a dish on the menu in front of you">
      <div className="flex flex-col gap-4">
        <input
          ref={input}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search cuisines and dishes…"
          aria-label="Search cuisines and dishes"
          className="w-full px-4 h-12 rounded-xl border text-base bg-white focus:outline-none focus:ring-2"
          style={{ borderColor: systemColors.border, color: systemColors.navy, '--tw-ring-color': `${systemColors.tomato}55` } as React.CSSProperties}
        />
        {matches ? (
          matches.length > 0 || dishMatches.length > 0 ? (
            <>
              {matches.length > 0 && (
                <section>
                  <SectionHeading>Cuisines</SectionHeading>
                  <RowList>{matches.map(row)}</RowList>
                </section>
              )}
              {dishMatches.length > 0 && (
                <section>
                  <SectionHeading>Dishes</SectionHeading>
                  <RowList>{dishMatches.map(dishRow)}</RowList>
                </section>
              )}
            </>
          ) : (
            <p className="text-sm py-6 text-center" style={{ color: systemColors.navyMuted }}>Nothing we know matches “{query}”</p>
          )
        ) : (
          <>
            {mine.length > 0 && (
              <section>
                <SectionHeading>Your cuisines</SectionHeading>
                <RowList>{mine.map(row)}</RowList>
              </section>
            )}
            {groups.map(g => (
              <section key={g.name}>
                <SectionHeading>{g.name}</SectionHeading>
                <RowList>{g.countries.map(row)}</RowList>
              </section>
            ))}
          </>
        )}
      </div>
    </Tray>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: systemColors.navyMuted }}>{children}</h3>
  );
}

/** One surface, hairlines between rows. */
function RowList({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border overflow-hidden divide-y" style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}>
      {children}
    </div>
  );
}
