import { supabase } from './supabase';
import type { Dish } from '../data/types';

/** What the Edge Function returns for one menu item. Mirrors its zod schema. */
export interface DishLookupResult {
  name: string;
  englishName: string | null;
  description: string;
  keyIngredients: string[];
  spiceLevel: NonNullable<Dish['spiceLevel']>;
  category: Dish['category'];
  dietary: { isVegetarian: boolean; isVegan: boolean; isGlutenFree: boolean };
  confidence: 'high' | 'medium' | 'low';
}

export type LookupOutcome =
  | { ok: true; result: DishLookupResult; cached: boolean; remaining: number; signedIn: boolean }
  | { ok: false; error: 'daily_limit'; cap: number; signedIn: boolean }
  | { ok: false; error: 'monthly_limit' | 'not_configured' | 'upstream' | 'unknown' };

/**
 * Ask the menu-lookup function about one dish. Never throws; every failure is
 * a typed outcome so the UI can say exactly what happened.
 */
export async function lookupMenuItem(query: string, countryId: string, countryName: string): Promise<LookupOutcome> {
  if (!supabase) return { ok: false, error: 'not_configured' };
  const { data, error } = await supabase.functions.invoke('menu-lookup', {
    body: { query, countryId, countryName },
  });

  // supabase-js surfaces non-2xx as `error` with the response attached
  if (error) {
    const res = (error as { context?: Response }).context;
    const body = res ? await res.json().catch(() => null) : null;
    if (body?.error === 'daily_limit') return { ok: false, error: 'daily_limit', cap: body.cap, signedIn: !!body.signedIn };
    if (body?.error === 'monthly_limit') return { ok: false, error: 'monthly_limit' };
    if (body?.error === 'not_configured') return { ok: false, error: 'not_configured' };
    if (body?.error?.startsWith?.('upstream')) return { ok: false, error: 'upstream' };
    return { ok: false, error: 'unknown' };
  }
  if (!data?.result) return { ok: false, error: 'unknown' };
  return { ok: true, result: data.result, cached: !!data.cached, remaining: data.remaining ?? 0, signedIn: !!data.signedIn };
}
