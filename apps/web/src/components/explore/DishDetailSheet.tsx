import { useState } from 'react';
import { systemColors } from '../../data/systemColors';
import type { Beverage, Country, DietaryInfo, Dish, UserDish } from '../../data/types';
import { resolveRegion } from '../../utils/dishRegion';
import { regionLabelName } from '../../utils/regionAreas';
import { dishVerdictRating, isDerivedRating, ratedTryCount } from '../../utils/ratings';
import { countryInSentence, type Entry } from '../../utils/groupDishes';
import { RestaurantTryForm } from '../RestaurantTryForm';
import type { EntryGridActions } from '../country-detail/EntryGrid';
import { BookmarkIcon, CheckIcon, DishImage } from './DishTile';
import { BackLink } from './PanelLevels';
import { entryView } from '../../utils/entryView';

/**
 * The dish detail level (#39): every action on a dish in one place. The tile
 * that opens it is only a picture and a line; here is the large image, the
 * chips that left the tile, the full description, and the controls that used
 * to crowd the card: want to try, I tried this (straight into the rating
 * prompt), the verdict with "Log another visit", edit and delete.
 *
 * It renders inside the Explore panel like All dishes, Flavor and Culture do,
 * one level down from wherever it was opened: a "‹ {parent}" back link, the
 * image, then the body. Not an overlay; the panel (or the phone sheet) is the
 * only surface.
 */

const CATEGORY_LABEL: Record<string, string> = {
  'street-food': 'Street food',
};
const label = (c?: string) => (c ? CATEGORY_LABEL[c] ?? c.charAt(0).toUpperCase() + c.slice(1) : undefined);

const SPICE_LABEL: Record<string, string> = { mild: 'Mild heat', medium: 'Medium heat', hot: 'Hot', 'very-hot': 'Very hot' };
const VERDICT_WORD = ['', 'Not for me', 'Not really', 'It was fine', 'Liked it', 'Love it'];

type Tone = 'heat' | 'diet' | 'plain';
const TONE: Record<Tone, { bg: string; fg: string }> = {
  heat: { bg: '#F6E3DF', fg: '#8E2B1F' },
  diet: { bg: systemColors.herbLight, fg: '#3E5A3B' },
  plain: { bg: '#F1ECE2', fg: systemColors.navyLight },
};

function dietChips(d?: DietaryInfo): [string, Tone][] {
  if (!d) return [];
  const out: [string, Tone][] = [];
  if (d.isVegan) out.push(['Vegan', 'diet']);
  else if (d.isVegetarian) out.push(['Vegetarian', 'diet']);
  else if (d.isVegetarianFriendly) out.push(['Vegetarian option', 'diet']);
  if (d.isGlutenFree) out.push(['Gluten-free', 'diet']);
  if (d.isDairyFree && !d.isVegan) out.push(['Dairy-free', 'diet']);
  return out;
}

function dishChips(dish: Dish): [string, Tone][] {
  const out: [string, Tone][] = [];
  if (dish.spiceLevel && dish.spiceLevel !== 'none') out.push([SPICE_LABEL[dish.spiceLevel], 'heat']);
  if (dish.popularity === 'local-favorite') out.push(['Local favorite', 'plain']);
  if (dish.popularity === 'tourist-classic') out.push(['Tourist classic', 'plain']);
  if (dish.isStreetFood && dish.category !== 'street-food') out.push(['Street food', 'plain']);
  return [...out, ...dietChips(dish.dietary)];
}

function drinkChips(drink: Beverage): [string, Tone][] {
  const out: [string, Tone][] = [];
  out.push([drink.type === 'alcoholic' ? 'Alcoholic' : drink.type === 'both' ? 'Alcohol optional' : 'No alcohol', 'plain']);
  if (drink.servedHow) out.push([drink.servedHow === 'room temperature' ? 'Room temperature' : `Served ${drink.servedHow}`, 'plain']);
  if (drink.isStreetDrink) out.push(['Street drink', 'plain']);
  return [...out, ...dietChips(drink.dietary)];
}

function Stars({ value, size = 'text-xl' }: { value: number; size?: string }) {
  return (
    <span className={`${size} tracking-wider leading-none`} aria-label={`Rated ${value} of 5`}>
      <span style={{ color: systemColors.saffron }}>{'★'.repeat(value)}</span>
      <span style={{ color: systemColors.border }}>{'★'.repeat(5 - value)}</span>
    </span>
  );
}

const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const iconBtn = 'w-11 h-11 flex items-center justify-center rounded-full transition-colors';

/**
 * `backLabel` names the level the dish was opened from ("All dishes", the
 * region, or the country for a signature tile or map plate); `onBack` returns
 * there. Key this on the entry so the rating prompt resets between dishes.
 */
export function DishDetail({ entry, country, actions: a, backLabel, onBack }: {
  entry: Entry;
  country: Country;
  actions: EntryGridActions;
  backLabel: string;
  onBack: () => void;
}) {
  const v = entryView(entry);
  const source = entry.kind === 'dish' ? entry.dish : entry.kind === 'drink' ? entry.drink : undefined;
  const tried: UserDish | undefined = v.tried;
  const wanted = !!source && a.isOnWishlist(a.countryId, source.name);

  // Rating prompt: `initial` when it opened from "I tried this", where
  // cancelling un-logs the dish instead of leaving an accidental unrated entry
  const [prompt, setPrompt] = useState<null | { initial: boolean }>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [addingVisit, setAddingVisit] = useState(false);
  const [editingVisit, setEditingVisit] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const regionLine = (() => {
    if (!source) return entry.kind === 'custom' ? entry.userDish.region : undefined;
    const m = resolveRegion(source, country.regionalVariations, country.id);
    if (m.kind === 'region') return regionLabelName(m.region.name);
    if (m.kind === 'orphan') return m.origin;
    return `Across ${countryInSentence(country.name)}`;
  })();
  const meta = [entry.kind === 'custom' ? 'My dish' : label(source?.category), regionLine].filter(Boolean).join(' · ');
  const chips = entry.kind === 'dish' ? dishChips(entry.dish) : entry.kind === 'drink' ? drinkChips(entry.drink) : [];

  const verdict = tried ? dishVerdictRating(tried) : undefined;
  const stars = verdict !== undefined ? Math.round(verdict) : undefined;
  const derived = tried ? isDerivedRating(tried) : false;
  const visits = tried?.restaurantTries ?? [];

  const startEdit = (initial: boolean, dish?: UserDish) => {
    const d = dish ?? tried;
    setRating(d?.tasteRating ?? 0);
    setNotes(d?.notes ?? '');
    setName(d?.name ?? '');
    setPrompt({ initial });
  };

  const tryIt = () => {
    if (!source) return;
    const added = a.onAddDish({ countryId: a.countryId, name: source.name, kind: entry.kind === 'drink' ? 'drink' : undefined }) || undefined;
    setPendingId(added?.id ?? null);
    startEdit(true, added);
  };

  const targetId = tried?.id ?? pendingId;

  const save = () => {
    if (!targetId) return;
    a.onUpdateDish(targetId, {
      ...(entry.kind === 'custom' && name.trim() ? { name: name.trim() } : {}),
      notes: notes.trim() || undefined,
      tasteRating: rating || undefined,
    });
    setPrompt(null);
    setPendingId(null);
  };

  const cancel = () => {
    if (prompt?.initial && targetId) a.onDeleteDish(targetId);
    setPrompt(null);
    setPendingId(null);
  };

  const remove = () => {
    if (!tried) return;
    a.onDeleteDish(tried.id);
    setPrompt(null);
    // Your own dish has nothing left to show once it's gone
    if (entry.kind === 'custom') onBack();
  };

  const toggleWant = () => {
    if (!source) return;
    if (wanted) { const i = a.findWishlistItem(a.countryId, source.name); if (i) a.removeFromWishlist(i.id); }
    else a.addToWishlist({ countryId: a.countryId, dishName: source.name, englishName: source.englishName });
  };

  const primaryBtn = 'btn-press h-[52px] rounded-xl flex items-center justify-center gap-2 text-base font-extrabold';
  const heading = { fontFamily: 'var(--font-heading)' } as const;

  return (
    <section className="flex flex-col gap-4 pt-1" data-dish-detail="open" aria-label={v.name}>
      <BackLink label={backLabel} onClick={onBack} />
      <DishImage name={v.name} image={v.image} colors={country.colorPalette} glass={v.isDrink} plate={110} className="w-full h-[220px] md:h-[260px] flex-none rounded-2xl">
        <span className="absolute left-3.5 bottom-3 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-[0.04em]" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: systemColors.navyLight }}>Illustration</span>
      </DishImage>

      <div className="pb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          {meta && <div className="text-[13px]" style={{ color: systemColors.navyMuted }}>{meta}</div>}
          <h2 className="text-[1.65rem] md:text-3xl font-extrabold leading-tight" style={{ color: systemColors.navy }}>{v.name}</h2>
          {(v.englishName || source?.pronunciation) && (
            <div className="text-[13px]" style={{ color: systemColors.navyMuted }}>
              {[v.englishName, source?.pronunciation && `say “${source.pronunciation}”`].filter(Boolean).join(' · ')}
            </div>
          )}
          {source?.tagline && <p className="text-base font-medium leading-snug mt-1" style={{ color: systemColors.navyLight }}>{source.tagline}</p>}
        </div>

        {/* Tried: the verdict and everything that edits it */}
        {tried && !prompt && (
          <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: '#EEF3EA' }} data-verdict>
            <div className="flex items-center gap-2 text-[15px] font-bold" style={{ color: '#2F5536' }}>
              <CheckIcon size={18} />
              You've tried this{visits.length ? ` · ${visits.length} ${visits.length === 1 ? 'visit' : 'visits'}` : ''}
              <span className="ml-auto -mr-2 flex">
                <button type="button" onClick={() => startEdit(false)} className={iconBtn} style={{ color: systemColors.navyMuted }} aria-label="Edit rating and notes" title="Edit">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button type="button" onClick={remove} className={`${iconBtn} hover:text-red-600`} style={{ color: systemColors.navyMuted }} aria-label="Remove from tried" title="Remove from tried">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </span>
            </div>
            {stars ? (
              <div className="flex items-center gap-2.5 mt-1">
                <Stars value={stars} />
                <span className="text-sm font-bold" style={{ color: systemColors.tomato }}>{VERDICT_WORD[stars]}</span>
                {derived && <span className="text-xs" style={{ color: systemColors.navyMuted }}>avg of {ratedTryCount(tried)} {ratedTryCount(tried) === 1 ? 'try' : 'tries'}</span>}
              </div>
            ) : (
              <button type="button" onClick={() => startEdit(false)} className="tap mt-1 text-sm font-semibold" style={{ color: systemColors.tomato }}>☆ Rate it</button>
            )}
            {tried.source === 'survey' && !stars && (
              <p className="text-xs mt-1.5" style={{ color: systemColors.navyMuted }}>From your taste survey</p>
            )}
            {tried.notes && <p className="text-sm mt-1.5" style={{ color: systemColors.navyLight }}>{tried.notes}</p>}
          </div>
        )}

        {/* The star-rating prompt (I tried this, Rate it, or edit) */}
        {prompt && (
          <div className="rounded-2xl border px-4 py-3.5 flex flex-col gap-2.5" style={{ borderColor: systemColors.herb, backgroundColor: '#F7FAF4' }} data-rating-prompt>
            <div className="text-sm font-bold" style={{ color: systemColors.navy }}>{prompt.initial ? 'How was it?' : 'Your verdict'}</div>
            {entry.kind === 'custom' && (
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Dish name" className="w-full px-3 py-2 text-sm rounded-lg border" style={{ borderColor: systemColors.border }} />
            )}
            <div className="flex -ml-1.5" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  onClick={() => setRating(rating === n ? 0 : n)}
                  className="w-11 h-11 text-[1.7rem] leading-none"
                  style={{ color: rating >= n ? systemColors.saffron : '#D6D0C4' }}
                >
                  ★
                </button>
              ))}
              {rating > 0 && <span className="self-center ml-1 text-sm font-semibold" style={{ color: systemColors.tomato }}>{VERDICT_WORD[rating]}</span>}
            </div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Your thoughts on this dish..." className="w-full px-3 py-2 text-sm rounded-lg border" style={{ borderColor: systemColors.border }} />
            <div className="flex gap-2">
              <button type="button" onClick={save} className="btn-press h-11 px-5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: systemColors.herb }}>Save</button>
              <button type="button" onClick={cancel} className="h-11 px-4 rounded-lg text-sm font-semibold border" style={{ borderColor: systemColors.border, color: systemColors.navyLight }}>
                Cancel
              </button>
            </div>
            {prompt.initial && <p className="text-xs" style={{ color: systemColors.navyMuted }}>4 or 5 stars makes it a favorite. Cancel if you logged it by mistake.</p>}
          </div>
        )}

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {chips.map(([text, tone]) => (
              <span key={text} className="px-2.5 py-1 rounded text-[13px] font-semibold" style={{ backgroundColor: TONE[tone].bg, color: TONE[tone].fg }}>{text}</span>
            ))}
          </div>
        )}

        {source?.description && <p className="text-[15px] leading-relaxed" style={{ color: systemColors.navyLight }}>{source.description}</p>}

        {/* Visits, for a tried dish */}
        {tried && visits.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: systemColors.navyMuted }}>Visits</div>
            {visits.map(t => (
              editingVisit === t.id ? (
                <RestaurantTryForm key={t.id} existingTry={t} onSubmit={data => { a.onUpdateRestaurantTry(tried.id, t.id, data); setEditingVisit(null); }} onCancel={() => setEditingVisit(null)} />
              ) : (
                <div key={t.id} className="rounded-lg pl-3 pr-1 py-1 flex items-center gap-2 text-sm" style={{ backgroundColor: systemColors.saffronLight }}>
                  <div className="min-w-0 flex-1 py-1">
                    <span className="font-semibold" style={{ color: systemColors.navy }}>{t.restaurantName || 'Tried'}</span>
                    <span className="ml-2 text-xs" style={{ color: systemColors.navyMuted }}>{fmtDate(t.date)}</span>
                    {t.rating ? <span className="ml-2"><Stars value={t.rating} size="text-sm" /></span> : null}
                    {t.notes && <p className="text-xs mt-0.5" style={{ color: systemColors.navyLight }}>{t.notes}</p>}
                  </div>
                  <button type="button" onClick={() => setEditingVisit(t.id)} className={iconBtn} style={{ color: systemColors.navyMuted }} aria-label="Edit visit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button type="button" onClick={() => a.onDeleteRestaurantTry(tried.id, t.id)} className={`${iconBtn} hover:text-red-600`} style={{ color: systemColors.navyMuted }} aria-label="Delete visit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )
            ))}
          </div>
        )}

        {/* Actions: one place for all of them */}
        <div className="flex flex-col gap-2.5 pt-1">
          {prompt ? null : tried ? (
            addingVisit ? (
              <RestaurantTryForm onSubmit={data => { a.onAddRestaurantTry(tried.id, data); setAddingVisit(false); }} onCancel={() => setAddingVisit(false)} />
            ) : (
              <button type="button" onClick={() => setAddingVisit(true)} className={`${primaryBtn} w-full border-[1.5px]`} style={{ ...heading, borderColor: systemColors.tomato, color: systemColors.tomato, backgroundColor: systemColors.surface }}>
                Log another visit
              </button>
            )
          ) : source ? (
            <>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={toggleWant}
                  aria-pressed={wanted}
                  data-action="want"
                  className={`${primaryBtn} flex-1 border-[1.5px]`}
                  style={{ ...heading, borderColor: systemColors.saffron, backgroundColor: wanted ? '#FBF3E3' : systemColors.surface, color: '#7A5516' }}
                >
                  <BookmarkIcon size={18} filled={wanted} />
                  {wanted ? 'On your list' : 'Want to try'}
                </button>
                <button type="button" onClick={tryIt} data-action="tried" className={`${primaryBtn} flex-1 text-white`} style={{ ...heading, backgroundColor: systemColors.tomato }}>
                  <CheckIcon size={18} />
                  I tried this
                </button>
              </div>
              <p className="text-center text-[13px]" style={{ color: systemColors.navyMuted }}>You'll rate it next. 4 or 5 stars makes it a favorite.</p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
