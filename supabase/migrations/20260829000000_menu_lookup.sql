-- Menu-item lookup (roadmap #3): cache + caps.
-- Only the Edge Function touches these tables (service role); the browser never does.

create table if not exists public.dish_lookups (
  country_id text        not null,
  query_key  text        not null,   -- normalized: lowercased, accents stripped
  query      text        not null,   -- as typed, for review
  result     jsonb       not null,
  created_at timestamptz not null default now(),
  primary key (country_id, query_key)
);

create table if not exists public.lookup_usage (
  caller text not null,              -- 'user:<uuid>' or 'ip:<addr>'
  day    date not null,
  n      int  not null default 0,   -- not `count`: PostgREST reads that as an aggregate
  primary key (caller, day)
);

create table if not exists public.lookup_budget (
  month text primary key,            -- 'YYYY-MM'
  n     int  not null default 0
);

-- One call bumps both counters atomically.
create or replace function public.bump_lookup_counters(p_caller text, p_day date, p_month text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.lookup_usage (caller, day, n) values (p_caller, p_day, 1)
    on conflict (caller, day) do update set n = public.lookup_usage.n + 1;
  insert into public.lookup_budget (month, n) values (p_month, 1)
    on conflict (month) do update set n = public.lookup_budget.n + 1;
end;
$$;

-- Lock everything down: no browser access at all.
alter table public.dish_lookups  enable row level security;
alter table public.lookup_usage  enable row level security;
alter table public.lookup_budget enable row level security;
revoke all on public.dish_lookups  from anon, authenticated;
revoke all on public.lookup_usage  from anon, authenticated;
revoke all on public.lookup_budget from anon, authenticated;
revoke all on function public.bump_lookup_counters(text, date, text) from anon, authenticated;

-- With "Automatically expose new tables" off, even service_role gets no
-- grants by default, so the Edge Function needs these explicitly.
grant all on public.dish_lookups, public.lookup_usage, public.lookup_budget to service_role;
grant execute on function public.bump_lookup_counters(text, date, text) to service_role;
notify pgrst, 'reload schema';
