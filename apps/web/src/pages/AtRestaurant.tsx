import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { countries, getCountryById } from '../data/countries';
import { STOCKED_REGIONS } from '../data/culinaryRegions';
import { systemColors } from '../data/systemColors';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useDietPrefs } from '../hooks/useDietPrefs';
import { rankDishesForOrdering, type RankedDish } from '../utils/orderRanking';
import { dishVerdictRating } from '../utils/ratings';
import { shapeOrderList, matchesMenuSearch, DEFAULT_SHAPE } from '../utils/orderGrouping';
import { countryPath } from '../utils/countryPath';
import { PlateDot } from '../components/Wordmark';
import { AppBar } from '../components/AppBar';
import { MenuLookup } from '../components/MenuLookup';
import { ProfileButton } from '../components/ProfileButton';
import { UnifiedDishCard } from '../components/country-detail/UnifiedDishCard';
import type { UserDish } from '../data/types';
import { WantToTryButton } from '../components/WantToTryButton';
import { DishBlurb } from '../components/DishBlurb';

/**
 * At-the-restaurant view (#1): "I'm at a restaurant trying a new cuisine,
 * what do I order?" Mobile-first — pick the cuisine, get a ranked
 * what-to-order list, log from the table.
 */
export function AtRestaurant() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  // The router keeps the scroll offset across navigations, so a cuisine
  // tapped from far down the picker opened its list far down too
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <AppBar actions={<ProfileButton />} />

      <main className="max-w-xl mx-auto px-4 py-5">
        {country ? <OrderList countryId={country.id} /> : <CuisinePicker />}
      </main>
    </div>
  );
}

/**
 * The cuisine picker: a search, then the countries you've already eaten
 * from, then everything grouped by the same eight culinary regions as
 * Home. Rows in one surface per group, no per-card chrome; the row is the
 * tap, so there's no arrow to say so.
 */
function CuisinePicker() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { dishes } = useDishes();

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
      .filter((c): c is NonNullable<typeof c> => !!c)
      .slice(0, 6);
  }, [dishes]);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return null;
    return countries
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.cuisineProfile.flavorProfile.some(f => f.toLowerCase().includes(q))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q]);

  const groups = useMemo(
    () => STOCKED_REGIONS.map(r => ({
      name: r.name,
      countries: r.countryIds
        .map(getCountryById)
        .filter((c): c is NonNullable<typeof c> => !!c)
        .sort((a, b) => a.name.localeCompare(b.name)),
    })).filter(g => g.countries.length > 0),
    []
  );

  const row = (c: (typeof countries)[number]) => (
    <button
      key={c.id}
      onClick={() => navigate(`/restaurant/${c.id}`)}
      className="btn-press w-full flex items-center gap-3 px-3.5 py-3 text-left"
      style={{ borderColor: systemColors.border }}
    >
      <PlateDot color={c.colorPalette.primary} size={14} />
      <span className="flex-1 min-w-0 flex items-baseline gap-2">
        <span className="text-[15px] font-bold leading-tight" style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}>
          {c.name}
        </span>
        <span className="text-[13px] truncate" style={{ color: systemColors.navyMuted }}>
          {c.cuisineProfile.flavorProfile.slice(0, 2).map(f => f.split(' ')[0]).join(' · ')}
        </span>
      </span>
    </button>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: systemColors.navy }}>
        Order well
      </h1>
      <p className="text-sm mb-4" style={{ color: systemColors.navyMuted }}>
        Pick the cuisine you're eating and get the dishes worth ordering, ranked for you.
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cuisines…"
        autoFocus
        className="w-full px-4 py-3 rounded-xl border text-base bg-white focus:outline-none focus:ring-2"
        style={{ borderColor: systemColors.border, '--tw-ring-color': `${systemColors.tomato}55` } as React.CSSProperties}
      />

      {matches ? (
        matches.length > 0 ? (
          <div className="mt-4"><RowList>{matches.map(row)}</RowList></div>
        ) : (
          <p className="text-sm py-6 text-center" style={{ color: systemColors.navyMuted }}>
            No cuisine matches "{query}"
          </p>
        )
      ) : (
        <>
          {mine.length > 0 && (
            <div>
              <SectionHeading>Your cuisines</SectionHeading>
              <RowList>{mine.map(row)}</RowList>
            </div>
          )}
          {groups.map(g => (
            <div key={g.name}>
              <SectionHeading>{g.name}</SectionHeading>
              <RowList>{g.countries.map(row)}</RowList>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function OrderList({ countryId }: { countryId: string }) {
  const country = getCountryById(countryId)!;
  const {
    addDish, updateDish, deleteDish, getDishesByCountry,
    addRestaurantTry, updateRestaurantTry, deleteRestaurantTry,
  } = useDishes();
  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { personalFlavor } = usePersonalFlavorProfile();
  const { prefs } = useDietPrefs();

  const countryDishes = getDishesByCountry(countryId);
  const ranked = useMemo(
    () => rankDishesForOrdering(country, countryDishes, isOnWishlist, personalFlavor?.heat ?? null, prefs),
    [country, countryDishes, isOnWishlist, personalFlavor, prefs]
  );

  // One ranked sequence, not courses: at a table the question is "the menu has
  // things on it, which should I get", and rank is the only ordering that
  // answers it. The shape is a constant for now — #29 (familiarity levels) will
  // choose it from how well you know this cuisine, which is why it's a value.
  const { shown, hidden } = useMemo(() => shapeOrderList(ranked, DEFAULT_SHAPE), [ranked]);
  const [menuQuery, setMenuQuery] = useState('');
  // One row open at a time
  const [openRow, setOpenRow] = useState<string | null>(null);
  const visible = useMemo(
    () => shown.filter(entry => matchesMenuSearch(entry, menuQuery)),
    [shown, menuQuery]
  );
  const searching = menuQuery.trim() !== '';
  const drinks = country.popularBeverages ?? [];

  const dishCrudProps = {
    onUpdateDish: updateDish,
    onDeleteDish: deleteDish,
    onAddRestaurantTry: addRestaurantTry,
    onUpdateRestaurantTry: updateRestaurantTry,
    onDeleteRestaurantTry: deleteRestaurantTry,
  };

  const cornerActions = (dishName: string, englishName?: string) => (
    <WantToTryButton
      isOnWishlist={isOnWishlist(countryId, dishName)}
      onAdd={() => addToWishlist({ countryId, dishName, englishName })}
      onRemove={() => { const i = findWishlistItem(countryId, dishName); if (i) removeFromWishlist(i.id); }}
      compact
    />
  );

  const rowProps = (name: string, englishName: string | undefined, tried: UserDish | undefined, onTryThis: () => void) => ({
    tried,
    wanted: isOnWishlist(countryId, name),
    open: openRow === name,
    onToggle: () => setOpenRow(openRow === name ? null : name),
    onTryThis,
    cornerActions: cornerActions(name, englishName),
    crud: dishCrudProps,
  });

  const renderDish = (entry: RankedDish, rank: number) => {
    const { dish, reasons, tried } = entry;
    return (
      <OrderRow
        key={dish.name}
        rank={rank}
        accent={country.colorPalette.primary}
        name={dish.name}
        line={dish.pronunciation && `“${dish.pronunciation}”`}
        italic
        {...rowProps(dish.name, dish.englishName, tried, () => addDish({ countryId, name: dish.name, restaurantTries: [] }))}
      >
        <DishBlurb item={dish} kind="dish" country={country}>
          {reasons.length > 0 && (
            <p className="text-[13px] font-semibold" style={{ color: systemColors.herb }}>
              {reasons.slice(0, 2).join(' · ')}
            </p>
          )}
        </DishBlurb>
      </OrderRow>
    );
  };

  return (
    <div>
      <Link
        to="/restaurant"
        className="tap inline-block text-sm font-medium mb-2 btn-press"
        style={{ color: systemColors.navyMuted }}
      >
        ← All cuisines
      </Link>
      <div className="flex items-center gap-2.5 mb-1">
        <PlateDot color={country.colorPalette.primary} size={16} />
        <h1 className="text-2xl font-bold" style={{ color: systemColors.navy }}>
          Order well · {country.name}
        </h1>
      </div>
      <p className="text-sm mb-3" style={{ color: systemColors.navyMuted }}>
        Ranked for you: your ratings, what locals order, your list, your spice comfort.
      </p>

      {/* Menus abbreviate and translate, so this matches traits and categories
          as well as names — you're usually typing something half-recognised. */}
      <input
        type="search"
        value={menuQuery}
        onChange={e => setMenuQuery(e.target.value)}
        placeholder="Find something on the menu…"
        aria-label="Search this cuisine"
        className="w-full text-sm px-3 py-2.5 md:py-2 rounded-lg border mb-4"
        style={{ borderColor: systemColors.border, color: systemColors.navy }}
      />

      {visible.length > 0 && (
        <RowList>{visible.map(entry => renderDish(entry, ranked.indexOf(entry) + 1))}</RowList>
      )}

      {visible.length === 0 && (
        <div className="py-2">
          <p className="text-sm" style={{ color: systemColors.navyMuted }}>
            Nothing here matches “{menuQuery.trim()}”. It may still be on the menu —
            we only know {ranked.length} {country.name} dishes so far.
          </p>
          {/* The gap #3 closes: a real menu has sixty things and we know nine */}
          <MenuLookup
            query={menuQuery}
            countryId={countryId}
            countryName={country.name}
            onSave={r => addDish({
              countryId,
              name: r.name,
              kind: r.category === 'beverage' ? 'drink' : 'food',
              source: 'lookup',
              notes: `${r.description}${r.keyIngredients.length ? ` Likely ingredients: ${r.keyIngredients.join(', ')}.` : ''} (AI-generated)`,
              restaurantTries: [],
            })}
          />
        </div>
      )}

      {hidden > 0 && (
        <p className="text-xs mt-3" style={{ color: systemColors.navyMuted }}>
          {hidden} more not shown.
        </p>
      )}

      {!searching && drinks.length > 0 && (
        <div>
          <SectionHeading count={drinks.length}>Drinks</SectionHeading>
          <RowList>
            {drinks.map(drink => (
              <OrderRow
                key={drink.name}
                accent={country.colorPalette.primary}
                name={drink.name}
                line={drink.englishName}
                {...rowProps(
                  drink.name,
                  drink.englishName,
                  countryDishes.find(d => d.name.toLowerCase() === drink.name.toLowerCase()),
                  () => addDish({ countryId, name: drink.name, kind: 'drink', restaurantTries: [] }),
                )}
              >
                <DishBlurb item={drink} kind="drink" country={country} />
              </OrderRow>
            ))}
          </RowList>
        </div>
      )}

      {/* The escape hatch, and the honest one: our list is about nine dishes and
          a real menu has sixty, so this must never look like the whole cuisine.
          Kept visible when the search finds nothing, which is when it's needed. */}
      <Link
        to={countryPath(countryId)}
        className="flex items-center justify-between gap-3 mt-6 px-4 py-3 rounded-xl border btn-press"
        style={{ borderColor: systemColors.border, backgroundColor: systemColors.surface }}
      >
        <span>
          <span className="block text-sm font-bold" style={{ color: systemColors.navy }}>
            Not on the menu?
          </span>
          <span className="block text-xs" style={{ color: systemColors.navyMuted }}>
            See everything we know about {country.name} — regions, flavors, drinks
          </span>
        </span>
        <span className="flex-none text-sm font-bold" style={{ color: systemColors.tomato }}>→</span>
      </Link>

    </div>
  );
}

/** Quiet divider above a list. */
function SectionHeading({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <div className="flex items-baseline gap-2 mt-6 mb-2">
      <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: systemColors.navyMuted }}>
        {children}
      </h2>
      {count !== undefined && (
        <span className="text-xs" style={{ color: systemColors.navyMuted }}>{count}</span>
      )}
      <span className="flex-1 h-px" style={{ backgroundColor: systemColors.border }} />
    </div>
  );
}

/** One surface for a list of rows, hairlines between them. */
function RowList({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-2xl border divide-y overflow-hidden"
      style={{ borderColor: systemColors.border }}
    >
      {children}
    </div>
  );
}

type Crud = Pick<
  React.ComponentProps<typeof UnifiedDishCard>,
  'onUpdateDish' | 'onDeleteDish' | 'onAddRestaurantTry' | 'onUpdateRestaurantTry' | 'onDeleteRestaurantTry'
>;

/**
 * A what-to-order row: rank, name, and how to say it. At a table you scan
 * and then order out loud, so that is all the row holds; the description,
 * chips, why it ranks here, and every action (want to try, I tried this,
 * rate, edit) open in place on a tap, as in Explore's detail (#39). The row
 * carries only your status, in the same marker Explore's tiles use.
 */
function OrderRow({
  rank, accent, name, line, italic = false, tried, wanted, open,
  onToggle, onTryThis, cornerActions, crud, children,
}: {
  rank?: number;
  accent: string;
  name: string;
  /** Pronunciation for a dish (say it to the server), English name for a drink */
  line?: string;
  italic?: boolean;
  tried?: UserDish;
  wanted: boolean;
  open: boolean;
  onToggle: () => void;
  onTryThis: () => void;
  cornerActions: React.ReactNode;
  crud: Crud;
  children: React.ReactNode;
}) {
  const verdict = tried ? dishVerdictRating(tried) : undefined;
  const stars = verdict !== undefined ? Math.round(verdict) : undefined;

  return (
    <div style={{ borderColor: systemColors.border }} data-order-row={name}>
      <div className="flex items-center gap-1 pl-3.5 pr-2.5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex-1 min-w-0 flex items-center gap-3 py-3 text-left"
        >
          {rank !== undefined && (
            <span
              className="flex-none text-xs font-bold w-6 h-6 rounded-full inline-flex items-center justify-center"
              style={{ backgroundColor: `${accent}18`, color: accent }}
            >
              {rank}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span
              className="block text-[15px] font-bold leading-tight"
              style={{ color: systemColors.navy, fontFamily: 'var(--font-heading)' }}
            >
              {name}
            </span>
            {line && (
              <span className={`block text-[13px] leading-snug mt-0.5 truncate ${italic ? 'italic' : ''}`} style={{ color: systemColors.navyMuted }}>
                {line}
              </span>
            )}
          </span>
            {tried ? (
              <span
                className="flex-none h-[26px] px-2 rounded-full flex items-center gap-1 text-xs font-bold"
                style={{ backgroundColor: systemColors.herbLight, color: '#4F6B45' }}
                role="img"
                aria-label={stars ? `Tried, rated ${stars} of 5` : 'Tried'}
              >
                <CheckIcon size={13} />
                {stars ? <span style={{ color: '#9A6F12' }}>★ {stars}</span> : null}
              </span>
            ) : wanted ? (
              <span className="flex-none" role="img" aria-label="On your want-to-try list">
                <BookmarkIcon />
              </span>
            ) : null}
          <svg
            className={`flex-none w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke={systemColors.navyMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

      </div>

      {open && (
        <div className="px-3.5 pb-3.5" data-order-row-detail>
          <UnifiedDishCard
            bare
            tried={tried}
            onTryThis={onTryThis}
            cornerActions={cornerActions}
            {...crud}
          >
            {children}
          </UnifiedDishCard>
        </div>
      )}
    </div>
  );
}

function CheckIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function BookmarkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={systemColors.saffron} stroke={systemColors.saffron} strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}
