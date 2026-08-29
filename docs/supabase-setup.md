# Cloud sync setup (Supabase)

Cloud sync is optional. With no credentials configured the app behaves exactly
as it did before — localStorage only, no account UI — so nothing here blocks
local development.

Setting it up takes about ten minutes and costs nothing at personal scale.

## 1. Create the project

1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Pick any region close to you; the free tier is far beyond what this app needs.
3. Wait for provisioning to finish (a couple of minutes).

### Security settings during project creation

The new-project form has a **Security** section. Set it like this:

| Setting | Value | Why |
|---|---|---|
| Enable Data API | **on** | supabase-js speaks to this REST API. Off means nothing works. |
| Automatically expose new tables | **off** | Supabase's own recommendation. Costs one extra `grant` in step 2. |
| Enable automatic RLS | **on** | Safety net so a future table can't ship without row-level security. |

## 2. Create the table

Open the **SQL Editor** and run this. It creates the one table sync uses and
locks it down so each user can only ever touch their own row.

```sql
create table public.profiles (
  user_id    uuid primary key references auth.users on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read their own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Users update their own profile"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Start from zero. Supabase's default privileges hand out REFERENCES, TRIGGER
-- and TRUNCATE even when "Automatically expose new tables" is off, and TRUNCATE
-- is NOT governed by row-level security — it empties the whole table whatever
-- the policies say. Revoking first means the grant below is the complete list.
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

-- Only `authenticated` — signed-out visitors never touch this table, so `anon`
-- deliberately gets nothing. No `delete`: the app only ever upserts.
grant select, insert, update on public.profiles to authenticated;
```

### Verify it landed

```sql
select
  (select relrowsecurity from pg_class where oid = 'public.profiles'::regclass)
    as rls_enabled,
  (select count(*) from pg_policies
     where schemaname = 'public' and tablename = 'profiles')
    as policy_count,
  (select string_agg(privilege_type, ', ' order by privilege_type)
     from information_schema.role_table_grants
     where table_schema = 'public' and table_name = 'profiles'
       and grantee = 'authenticated')
    as authenticated_grants,
  (select string_agg(privilege_type, ', ' order by privilege_type)
     from information_schema.role_table_grants
     where table_schema = 'public' and table_name = 'profiles'
       and grantee = 'anon')
    as anon_grants;
```

Expect `true`, `3`, `INSERT, SELECT, UPDATE`, and an empty `anon_grants`.

**Grants and RLS are two different layers**, and you need both. Grants decide
whether a role may touch the table at all; RLS decides which rows it sees. Skip
the policies and the anon key would expose every row. Skip the `grant` and the
app fails at runtime with `permission denied for table profiles`, because
disabling automatic exposure removes the default grants Supabase used to hand
out.

This ends up tighter than Supabase's old default, which granted
select/insert/update/delete on every public table to `anon`, `authenticated`,
and `service_role`.

## 3. Configure redirect URLs

Under **Authentication → URL Configuration**, add the sites that are allowed to
receive a sign-in link:

- Site URL: your production URL (e.g. `https://foodie-henna-one.vercel.app`)
- Additional redirect URLs: `http://localhost:5173/profile` and
  `https://<your-production-domain>/profile`

Magic links silently fail to redirect if the URL isn't on this list.

## 4. Wire up the credentials

Both values are in **Project Settings → API**.

**Locally** — create `apps/web/.env` (gitignored):

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**On Vercel** — Project → Settings → Environment Variables, add the same two
names for Production and Preview, then redeploy so the build picks them up.
Vite inlines `VITE_*` variables at build time, so an existing deployment will
not pick them up without a rebuild.

## 5. Verify

1. Open `/profile`. The Account & data panel should offer an email field.
2. Enter your email, click the link in the message, and you should land back on
   `/profile` signed in.
3. Log a dish, wait a second or two, and confirm the status line reads "Synced".
4. In Supabase, open **Table Editor → profiles** and confirm your row's `data`
   column holds the dish.
5. Sign in on your phone with the same email; the dish should appear.

## How it works, and its limits

localStorage stays the source of truth for reads, so the app is fast and works
offline. The cloud row is a mirror: pushed about 1.5 seconds after your last
edit, pulled on sign-in and whenever the tab regains focus.

The whole profile is stored as one JSON document, which is what makes this
cheap to build — but it means **last write wins**. If you edit on two devices
at once, the later save overwrites the earlier one wholesale. Pull-on-focus
makes this unlikely in practice for a single person, but it is the reason to
move to per-entity tables if the app ever gets more than one user.

One case is handled specially: signing in for the first time on a device that
already has local data merges *upward*. If the cloud row is empty, local data
is pushed to it rather than being wiped by it, so signing in never costs you
dishes you already logged.

## 4. Menu-item lookup (Edge Function)

"Ask about 'X' →" on the at-the-restaurant search calls Claude through a
Supabase Edge Function, so the Anthropic key never ships to the browser. Cost
is ~$0.0015 per lookup (Haiku 4.5, ~500 tokens in / ~200 out). Four guards,
from cheapest to last resort:

| Guard | Where | Value |
|---|---|---|
| Cache by (country, dish name) | `dish_lookups` table | repeat asks are free and instant |
| Per-caller daily cap | `lookup_usage` table | **3/day anonymous (by IP), 20/day signed in** |
| Global monthly kill-switch | `lookup_budget` table | **2,000/month** (~$3), then the function refuses |
| Anthropic monthly spend limit | Anthropic Console | **set this yourself, see step 4c** |

### 4a. Tables

Run `supabase/migrations/20260829000000_menu_lookup.sql` in the SQL Editor.
It creates the three tables plus one counter function, with RLS on and every
grant revoked from `anon` / `authenticated` — only the Edge Function (service
role) can touch them.

### 4b. Deploy the function

```bash
npm i -g supabase            # once
supabase login               # once
supabase link --project-ref <your-project-ref>
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase functions deploy menu-lookup
```

The function reads `SUPABASE_URL`, `SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` from the environment Supabase injects; only the
Anthropic key is yours to set. Caps live as constants at the top of
`supabase/functions/menu-lookup/index.ts`.

### 4c. Anthropic Console spend limit (the backstop)

1. [console.anthropic.com](https://console.anthropic.com) → **Settings → Limits**.
2. Set **Monthly spend limit** to something you'd shrug at — **$10** is more
   than six times the global cap above.
3. Optionally set a lower **email alert** threshold ($5) so you hear about it
   before the hard stop.

If everything above fails at once, this is what stops the bill. The API returns
an error past the limit, which the app shows as "the lookup service is busy".

### 4d. Verify

With the app deployed, open a cuisine at `/restaurant/<ID>`, search for a dish
we don't have (e.g. "khao soi" on a country that lacks it), tap **Ask about**.
A card labelled **AI-generated** should appear with the count of lookups left
today; ask again and it should say "From a previous lookup" (cache hit).
