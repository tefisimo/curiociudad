-- ============================================================
-- CurioCiudad — Tabla de solicitudes de registro
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

create table if not exists solicitudes (
  id               bigserial primary key,
  nombre           text        not null,
  cat              text        not null check (cat in ('tiendas', 'comer', 'actividades')),
  descripcion      text        not null,
  direccion        text        not null,
  telefono         text        not null,
  web              text,
  instagram        text,
  precio           text        check (precio in ('€', '€€', '€€€')),
  tags             text[]      not null default '{}',
  contacto_nombre  text        not null,
  contacto_email   text        not null,
  estado           text        not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada')),
  created_at       timestamptz default now()
);

-- Solo el admin puede leer; cualquiera puede insertar
alter table solicitudes enable row level security;

create policy "Inserción pública"
  on solicitudes for insert
  with check (true);
