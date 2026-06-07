create table if not exists suscriptores (
  id bigserial primary key,
  email text unique not null,
  nombre text,
  created_at timestamptz default now()
);

-- RLS enabled with no public policies.
-- All access goes through supabaseAdmin (service role), which bypasses RLS.
alter table suscriptores enable row level security;
