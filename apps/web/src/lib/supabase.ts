import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * The Supabase client, or `null` when credentials aren't configured.
 *
 * Sync is strictly additive: with no env vars the app behaves exactly as it did
 * before — localStorage only, no account UI — so local dev and preview
 * deployments don't need a backend to run.
 *
 * The anon key is designed to ship in client bundles. It grants nothing on its
 * own; row-level security on `profiles` is what restricts each user to their
 * own row. Never put the service-role key here.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isCloudConfigured = supabase !== null;

/** The single row each user owns in the `profiles` table. */
export interface ProfileRow {
  user_id: string;
  data: unknown;
  updated_at: string;
}
