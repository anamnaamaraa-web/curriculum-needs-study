create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

grant select, insert, update on public.app_state to service_role;

drop policy if exists "Service role can manage app state" on public.app_state;

create policy "Service role can manage app state"
  on public.app_state
  for all
  to service_role
  using (true)
  with check (true);

insert into public.app_state (id, payload)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;
