/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase project URL. Unset means cloud sync is disabled. */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase anon (publishable) key. Safe to ship in the client bundle. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
