-- ============================================================
-- CurioCiudad — Schema
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

create table if not exists negocios (
  id           bigserial primary key,
  slug         text        unique not null,
  nombre       text        not null,
  cat          text        not null check (cat in ('tiendas', 'comer', 'actividades')),
  cat_label    text        not null,
  tags         text[]      not null default '{}',
  descripcion  text        not null,
  desc_larga   text        not null,
  img          text        not null,
  galeria      text[]      not null default '{}',
  destacado    boolean     not null default false,
  horario      jsonb       not null default '[]',
  direccion    text        not null,
  telefono     text        not null,
  web          text,
  menu         text,
  instagram    text,
  precio       text        check (precio in ('€', '€€', '€€€')),
  delivery     boolean     default false,
  created_at   timestamptz default now()
);

-- Permitir lectura pública (sin auth)
alter table negocios enable row level security;

create policy "Lectura pública"
  on negocios for select
  using (true);

-- ============================================================
-- Seed — 12 negocios iniciales
-- ============================================================

insert into negocios (slug, nombre, cat, cat_label, tags, descripcion, desc_larga, img, galeria, destacado, horario, direccion, telefono, web, menu, instagram, precio, delivery) values

('cafe-velarde', 'Café Velarde', 'comer', 'Comer & Beber',
 array['Terraza','Vegano'],
 'El café de especialidad favorito del barrio. Tostados de autor y ambiente acogedor para trabajar o reunirte.',
 E'Café Velarde nació con la misión de traer la cultura del café de especialidad al corazón del barrio. Nuestros granos, seleccionados directamente de productores de origen, se tuestan semanalmente para garantizar la máxima frescura en cada taza.\n\nEl local combina una estética cálida e industrial con una terraza soleada, perfecta para el brunch del fin de semana. Ofrecemos una carta de desayunos y almuerzos elaborada con ingredientes de temporada, además de opciones veganas y sin gluten para todos los gustos.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339820_64b7ad4238122aabfd73d78a_64afc21b91b959274f6285db_Mask%252520group-3.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle Velarde 12, Madrid', '+34 910 123 456', '#', '#', '@cafevelarde', '€', false),

('mercado-norte', 'Mercado Norte', 'comer', 'Comer & Beber',
 array['Música en vivo','Vegano','Brunch','Wi-Fi gratis'],
 'Cocina de mercado con ingredientes frescos de temporada. Menú del día y carta de tapas con producto local.',
 E'Mercado Norte es mucho más que un restaurante: es un punto de encuentro para los amantes de la buena comida y la cultura local. Cada semana renovamos nuestra carta según lo que ofrecen los productores de la región, garantizando ingredientes en su punto óptimo de sabor.\n\nLos jueves y viernes por la noche contamos con música en directo que transforma la experiencia en algo verdaderamente especial. Nuestra selección de vinos naturales y cervezas artesanas complementa una propuesta gastronómica honesta y comprometida con el entorno.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33981f_64b7aee992eeacec8d341a7b_Mask%2520group.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 true,
 '[{"dia":"Lun","hora":"Cerrado"},{"dia":"Mar","hora":"13:00 – 23:00"},{"dia":"Mié","hora":"13:00 – 23:00"},{"dia":"Jue","hora":"13:00 – 00:00"},{"dia":"Vie","hora":"13:00 – 00:00"},{"dia":"Sáb","hora":"12:00 – 00:00"},{"dia":"Dom","hora":"12:00 – 18:00"}]',
 'Paseo del Norte 34, Madrid', '+34 910 234 567', '#', '#', '@mercadonorte', '€€', true),

('boveda-bistro', 'Bóveda Bistró', 'comer', 'Comer & Beber',
 array['Sin gluten','Vegetariano','Música en vivo','Terraza'],
 'Cocina mediterránea en un espacio con bóveda de piedra. Selección de vinos naturales y carta de temporada.',
 E'Instalado en una bodega del siglo XIX con bóvedas de ladrillo visto, Bóveda Bistró ofrece una experiencia gastronómica que combina historia y modernidad. La carta se inspira en la cocina mediterránea más honesta, con especial atención a las opciones vegetarianas y sin gluten.\n\nLos fines de semana, el espacio se convierte en escenario para músicos locales que crean el ambiente perfecto para una cena especial. La terraza interior, protegida y luminosa, está disponible todo el año.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339821_64b7ad42cb0b1ad4dd4c7292_64afc2300502866d088e5da5_Mask%252520group-8.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle de la Paloma 8, Madrid', '+34 910 345 678', '#', '#', '@bovedabistro', '€€€', false),

('la-roja-canteen', 'La Roja Canteen', 'comer', 'Comer & Beber',
 array['Música en vivo','Sin gluten'],
 'Tapas y raciones en un ambiente informal. Tertulia garantizada los jueves con música en directo.',
 E'La Roja Canteen es el tipo de lugar donde el tiempo pasa sin que te des cuenta. Raciones generosas, vinos de la tierra y una barra siempre animada hacen de este rincón un favorito del barrio desde que abrió sus puertas.\n\nCada jueves organizamos una sesión de música en directo con artistas locales. Los productos sin gluten están claramente identificados en la carta, y el equipo siempre está dispuesto a adaptar los platos.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33981d_64b7ad407810eb4f16635b12_64afc2c522f7af85561c5d42_Mask%252520group-5.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle Amparo 56, Madrid', '+34 910 456 789', '#', null, '@larojacanteen', '€€', false),

('pradera-roadhouse', 'Pradera Roadhouse', 'comer', 'Comer & Beber',
 array['Brunch','Wi-Fi gratis'],
 'Brunch americano con toque local. Pancakes, eggs benedict y los mejores bloody marys del barrio.',
 E'Pradera Roadhouse reimagina el brunch americano con ingredientes locales y mucho cariño. Los pancakes con maple syrup de producción propia, los eggs benedict con jamón ibérico y los bloody marys con especias de la tierra son solo algunos de los imprescindibles.\n\nEl espacio, amplio y luminoso, cuenta con Wi-Fi gratuito para los que quieren convertir el brunch en una mañana productiva. Reservas disponibles para grupos de más de 6 personas.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33981e_64b7ad41d29c585c54f190b7_64afc2d7376d3438a77c3573_Mask%252520group-7.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"Cerrado"},{"dia":"Mar","hora":"Cerrado"},{"dia":"Mié","hora":"09:00 – 17:00"},{"dia":"Jue","hora":"09:00 – 17:00"},{"dia":"Vie","hora":"09:00 – 17:00"},{"dia":"Sáb","hora":"09:00 – 18:00"},{"dia":"Dom","hora":"09:00 – 18:00"}]',
 'Calle del Pez 22, Madrid', '+34 910 567 890', '#', '#', '@praderaroadhouse', '€€', true),

('el-conejo-inquieto', 'El Conejo Inquieto', 'comer', 'Comer & Beber',
 array['Admite mascotas','Wi-Fi gratis'],
 'Ristorante de barrio con ambiente familiar. Pastas frescas artesanales y pizzas de masa madre.',
 E'El Conejo Inquieto es el italiano del barrio que todos queremos tener cerca: pastas frescas hechas a diario, pizzas de masa madre con 48 horas de fermentación y una carta de vinos italianos seleccionados con criterio.\n\nAdmitimos mascotas en la terraza y contamos con Wi-Fi gratuito en todo el local. El ambiente es relajado y familiar, ideal tanto para cenas románticas como para reuniones con amigos.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982b_64b7ae4b29a9c0d18bc1925d_Mask%2520group-1.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 true,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle Fuencarral 88, Madrid', '+34 910 678 901', '#', '#', '@elconejoinquieto', '€€', true),

('studio-indigo', 'Studio Índigo', 'tiendas', 'Tiendas',
 array['Sin gluten','Música en vivo','Vegano','Brunch'],
 'Moda y accesorios de diseñadores locales emergentes. Prendas únicas con historia y materiales sostenibles.',
 E'Studio Índigo es el espacio donde los diseñadores locales emergentes dan a conocer su trabajo. Cada pieza que encontrarás aquí está hecha con materiales sostenibles y cuenta la historia de quien la creó.\n\nOrganizamos eventos mensuales donde los diseñadores presentan sus nuevas colecciones. También ofrecemos servicio de personalización para quienes buscan una prenda verdaderamente única.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33981b_64b7ad40cdc55885e4b9ca8b_64afc2f1dcfbd99e52ea634d_Mask%252520group-2.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle Hortaleza 45, Madrid', '+34 910 789 012', '#', null, '@studioindigo', '€€€', null),

('libreria-el-farol', 'Librería El Farol', 'tiendas', 'Tiendas',
 array['Admite mascotas','Brunch'],
 'Librería independiente con café, zona de lectura y presentaciones de autores locales cada semana.',
 E'El Farol es la librería de barrio que creíamos extintas. Selección cuidada de títulos en castellano y otras lenguas, espacio de lectura con butacas cómodas, y un pequeño café donde disfrutar de la experiencia completa.\n\nCada sábado por la tarde organizamos presentaciones de autores locales y clubes de lectura. Las mascotas son bienvenidas en el espacio, siempre que sean tan tranquilas como los libros que nos rodean.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982d_64b7aea93c2fddec6fdd11b2_Mask%2520group-4.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"10:00 – 20:00"},{"dia":"Mar","hora":"10:00 – 20:00"},{"dia":"Mié","hora":"10:00 – 20:00"},{"dia":"Jue","hora":"10:00 – 20:00"},{"dia":"Vie","hora":"10:00 – 21:00"},{"dia":"Sáb","hora":"10:00 – 21:00"},{"dia":"Dom","hora":"11:00 – 15:00"}]',
 'Calle San Bernardino 3, Madrid', '+34 910 890 123', '#', null, '@libreriaelfaro', '€', null),

('casa-rooster', 'Casa Rooster', 'tiendas', 'Tiendas',
 array['Vegetariano','Terraza','Wi-Fi gratis','Vegano','Admite mascotas'],
 'Tienda de productos artesanales, especias, conservas y delicatessen de productores locales.',
 E'Casa Rooster es una tienda de delicatessen con alma de mercado. Aquí encontrarás aceites de oliva virgen extra de prensado en frío, conservas artesanales, quesos de pequeños productores y especias traídas directamente de sus países de origen.\n\nOrganizamos catas y talleres de cocina mensuales para quienes quieren aprender a sacar el máximo partido a los mejores ingredientes. La terraza exterior es perfecta para degustar nuestras tapas de temporada.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982a_64b7afac500e0f611f6749fd_Mask%2520group-2.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"09:00 – 20:00"},{"dia":"Mar","hora":"09:00 – 20:00"},{"dia":"Mié","hora":"09:00 – 20:00"},{"dia":"Jue","hora":"09:00 – 21:00"},{"dia":"Vie","hora":"09:00 – 22:00"},{"dia":"Sáb","hora":"10:00 – 22:00"},{"dia":"Dom","hora":"10:00 – 18:00"}]',
 'Calle Manuela Malasaña 16, Madrid', '+34 910 901 234', '#', null, '@casarooster', '€€', null),

('galeria-lumen', 'Galería Lumen', 'actividades', 'Actividades',
 array['Vegetariano','Wi-Fi gratis'],
 'Espacio cultural con exposiciones temporales, talleres de arte y eventos creativos cada fin de semana.',
 E'Galería Lumen es un espacio vivo dedicado al arte contemporáneo y la cultura visual. Cada mes presentamos una nueva exposición de artistas emergentes y consolidados, acompañada de un programa de actividades paralelas: visitas guiadas, charlas con los artistas y talleres prácticos.\n\nLos fines de semana organizamos talleres para todos los niveles: pintura, fotografía, ilustración, serigrafía. El espacio también está disponible para eventos privados y presentaciones corporativas.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982e_64b7aeb244695f5583d19381_Mask%2520group-5.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"Cerrado"},{"dia":"Mar","hora":"12:00 – 20:00"},{"dia":"Mié","hora":"12:00 – 20:00"},{"dia":"Jue","hora":"12:00 – 20:00"},{"dia":"Vie","hora":"12:00 – 21:00"},{"dia":"Sáb","hora":"11:00 – 21:00"},{"dia":"Dom","hora":"11:00 – 17:00"}]',
 'Calle del Barco 19, Madrid', '+34 910 012 345', '#', null, '@galerialumen', '€€', null),

('boveda-climbing', 'Bóveda Climbing', 'actividades', 'Actividades',
 array['Vegano'],
 'El rocódromo indoor más completo de la ciudad. Rutas para todos los niveles y clases grupales al atardecer.',
 E'Bóveda Climbing es el rocódromo de referencia en la ciudad. Con más de 200 rutas de dificultad variada y paredes de hasta 15 metros, es el lugar ideal tanto para iniciarse como para progresar en la escalada.\n\nOfrecemos clases grupales e individuales, alquiler de material y zona de entrenamiento específico. El equipo de monitores certificados está siempre disponible para guiarte en tu progresión. Los niños a partir de 6 años son bienvenidos en nuestras clases familiares de los sábados.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982f_64b7aedb7c0010e65f19d142_Mask%2520group-6.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 false,
 '[{"dia":"Lun","hora":"07:00 – 23:00"},{"dia":"Mar","hora":"07:00 – 23:00"},{"dia":"Mié","hora":"07:00 – 23:00"},{"dia":"Jue","hora":"07:00 – 23:00"},{"dia":"Vie","hora":"07:00 – 22:00"},{"dia":"Sáb","hora":"09:00 – 21:00"},{"dia":"Dom","hora":"09:00 – 20:00"}]',
 'Calle de Bravo Murillo 120, Madrid', '+34 910 123 789', '#', null, '@bovedaclimbing', '€€', null),

('la-terraza-rooftop', 'La Terraza Rooftop', 'actividades', 'Actividades',
 array['Admite mascotas','Terraza','Sin gluten','Vegetariano'],
 'El rooftop más especial de la ciudad. Vistas panorámicas, cócteles de autor y música los viernes.',
 E'La Terraza Rooftop es el destino perfecto para despedir la semana con estilo. Situada en la séptima planta con vistas de 360° sobre la ciudad, ofrece una experiencia única que combina coctelería de autor, pequeños platos y música en directo cada viernes y sábado.\n\nLa carta de cócteles, diseñada por nuestro head bartender, cambia con las estaciones para aprovechar los mejores ingredientes de temporada. Admitimos mascotas en toda la terraza exterior y contamos con opciones sin gluten y vegetarianas en toda la carta.',
 'https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33982b_64b7ae4b29a9c0d18bc1925d_Mask%2520group-1.png',
 array['https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339819_64b7ad3f18bead3d7864b0d5_64b7aa95691cf4b2f1fb7b00_Rectangle%2525208.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339818_64b7ad3fcdc55885e4b9ca7e_64b7aa95691cf4b2f1fb7aeb_Rectangle%2525209.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339817_64b7ad3fcdc55885e4b9ca7a_64b7aa950153a186400947f1_Rectangle%25252010-1.png','https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f339816_64b7ad3ff12bc6fafbc164ea_64b7aa9512949eb74571dfed_Rectangle%25252010.png'],
 true,
 '[{"dia":"Lun","hora":"Cerrado"},{"dia":"Mar","hora":"Cerrado"},{"dia":"Mié","hora":"18:00 – 00:00"},{"dia":"Jue","hora":"18:00 – 01:00"},{"dia":"Vie","hora":"18:00 – 02:00"},{"dia":"Sáb","hora":"16:00 – 02:00"},{"dia":"Dom","hora":"16:00 – 23:00"}]',
 'Calle Gran Vía 35, Planta 7, Madrid', '+34 910 234 890', '#', null, '@laterrazarooftop', '€€€', null);
