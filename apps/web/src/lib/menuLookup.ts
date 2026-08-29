import { supabase, supabaseUrl, supabaseAnonKey } from './supabase';
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
  /** 'generic' when the name is a category (casserole, curry) rather than one dish */
  scope: 'specific' | 'generic';
  /** For a generic name: the specific dishes it most likely means here, most common first */
  likelyDishes: string[];
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
  if (!supabase || !supabaseUrl || !supabaseAnonKey) return { ok: false, error: 'not_configured' };

  // Plain fetch rather than functions.invoke(): invoke waits on the auth
  // session lock and can stall. The session token (when signed in) is what
  // gets the higher daily cap; the anon key is the guest path.
  const session = await Promise.race([
    supabase.auth.getSession().then(r => r.data.session),
    new Promise<null>(resolve => setTimeout(() => resolve(null), 1500)),
  ]);
  const token = session?.access_token ?? supabaseAnonKey;

  let res: Response;
  try {
    res = await fetch(`${supabaseUrl}/functions/v1/menu-lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: supabaseAnonKey, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ query, countryId, countryName }),
    });
  } catch {
    return { ok: false, error: 'upstream' };
  }
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    if (body?.error === 'daily_limit') return { ok: false, error: 'daily_limit', cap: body.cap, signedIn: !!body.signedIn };
    if (body?.error === 'monthly_limit') return { ok: false, error: 'monthly_limit' };
    if (body?.error === 'not_configured') return { ok: false, error: 'not_configured' };
    if (typeof body?.error === 'string' && body.error.startsWith('upstream')) return { ok: false, error: 'upstream' };
    return { ok: false, error: 'unknown' };
  }
  if (!body?.result) return { ok: false, error: 'unknown' };
  return { ok: true, result: body.result, cached: !!body.cached, remaining: body.remaining ?? 0, signedIn: !!body.signedIn };
}
