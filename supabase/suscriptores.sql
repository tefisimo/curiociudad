create table if not exists suscriptores (
  id bigserial primary key,
  email text unique not null,
  nombre text,
  created_at timestamptz default now()
);

-- No RLS needed — inserts happen server-side via service role
alter table suscriptores disable row level security;
