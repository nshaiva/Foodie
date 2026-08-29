import { useState } from 'react';
import { systemColors } from '../data/systemColors';
import { isCloudConfigured } from '../lib/supabase';
import { lookupMenuItem, type DishLookupResult, type LookupOutcome } from '../lib/menuLookup';
import { dietaryChips, spiceChip } from './dishChips';

interface MenuLookupProps {
  query: string;
  countryId: string;
  countryName: string;
  /** Called with the result when the diner saves it as one of their dishes */
  onSave: (result: DishLookupResult) => void;
}

/**
 * The "we don't know this one" escape hatch on the at-the-restaurant search
 * (#3). One tap asks Claude what the menu item is and shows a card labelled
 * AI-generated; "Save to my dishes" turns it into a logged custom dish. The
 * guessed traits stay on the card and in the dish's notes — they never feed the
 * flavor profile unless the diner rates the dish themselves.
 */
export function MenuLookup({ query, countryId, countryName, onSave }: MenuLookupProps) {
  const [state, setState] = useState<{ kind: 'idle' } | { kind: 'loading' } | { kind: 'done'; outcome: LookupOutcome; for: string }>({ kind: 'idle' });
  const [saved, setSaved] = useState(false);

  if (!isCloudConfigured) return null;

  const q = query.trim();
  const ask = async () => {
    setState({ kind: 'loading' });
    setSaved(false);
    const outcome = await lookupMenuItem(q, countryId, countryName);
    setState({ kind: 'done', outcome, for: q });
  };

  // A new query invalidates the old answer
  const showing = state.kind === 'done' && state.for === q ? state : null;

  if (!showing) {
    return (
      <button
        onClick={ask}
        disabled={state.kind === 'loading'}
        className="btn-press mt-3 inline-flex items-center gap-2 text-sm font-semibold px-3.5 py-2 rounded-lg text-white disabled:opacity-60"
        style={{ backgroundColor: systemColors.tomato }}
      >
        {state.kind === 'loading' ? 'Asking…' : `Ask about “${q}” →`}
      </button>
    );
  }

  const { outcome } = showing;

  if (!outcome.ok) {
    const copy =
      outcome.error === 'daily_limit'
        ? outcome.signedIn
          ? `You've used today's ${outcome.cap} lookups. More tomorrow.`
          : `Guests get ${outcome.cap} lookups a day. Sign in from My profile for more.`
        : outcome.error === 'monthly_limit'
          ? 'Lookups are paused for the rest of the month.'
          : outcome.error === 'upstream'
            ? 'The lookup service is busy. Try again in a moment.'
            : 'Something went wrong with that lookup.';
    return (
      <p className="mt-3 text-sm" style={{ color: systemColors.navyMuted }}>{copy}</p>
    );
  }

  const r = outcome.result;
  // For a generic term, save the most likely specific dish, not the category
  const saveName = r.scope === 'generic' && r.likelyDishes?.[0] ? r.likelyDishes[0] : r.name;
  return (
    <div
      className="mt-3 rounded-xl border p-4"
      style={{ borderColor: `${systemColors.saffron}80`, backgroundColor: systemColors.surface }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 leading-tight">{r.name}</h4>
          {r.englishName && <p className="text-xs text-gray-400">{r.englishName}</p>}
        </div>
        <span
          className="flex-none text-[0.62rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
          title="Written by Claude from the name alone, not from our researched data"
        >
          AI-generated
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1.5">{r.description}</p>

      {r.keyIngredients.length > 0 && (
        <p className="text-xs mt-2" style={{ color: systemColors.navyMuted }}>
          <span className="font-semibold">Likely ingredients: </span>{r.keyIngredients.join(', ')}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {spiceChip(r.spiceLevel)}
        {dietaryChips(r.dietary)}
      </div>

      {/* A category, not a dish: name the likely specifics as plain text (no
          extra lookups, no extra tokens) and save the most likely one; the
          diner can rename it on the card if it was another. */}
      {r.scope === 'generic' && (r.likelyDishes?.length ?? 0) > 0 && (
        <p className="text-xs mt-2.5" style={{ color: systemColors.navyMuted }}>
          <span className="font-semibold">A general term. In {countryName} it usually means: </span>
          {r.likelyDishes.join(', ')}.
        </p>
      )}

      {r.confidence === 'low' && r.scope !== 'generic' && (
        <p className="text-xs mt-2 italic" style={{ color: systemColors.tomato }}>
          Not sure this is a real dish — worth asking your server.
        </p>
      )}

      <div className="flex items-center gap-4 mt-3">
        {saved ? (
          <span className="text-sm font-semibold" style={{ color: systemColors.herb }}>✓ Saved to your dishes</span>
        ) : (
          <button
            onClick={() => { onSave({ ...r, name: saveName }); setSaved(true); }}
            className="tap btn-press text-sm font-semibold"
            style={{ color: systemColors.herb }}
          >
            + Save {saveName !== r.name ? `as “${saveName}”` : 'to my dishes'}
          </button>
        )}
        <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>
          {outcome.cached ? 'From a previous lookup' : `${outcome.remaining} lookup${outcome.remaining === 1 ? '' : 's'} left today`}
        </span>
      </div>
    </div>
  );
}
