import { supabase } from "./supabase";
import type { Negocio } from "./data";

/* La tabla usa snake_case; mapeamos a nuestra interfaz camelCase */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Negocio {
  return {
    id: row.id,
    slug: row.slug,
    nombre: row.nombre,
    cat: row.cat,
    catLabel: row.cat_label,
    tags: row.tags ?? [],
    desc: row.descripcion,
    descLarga: row.desc_larga,
    img: row.img,
    galeria: row.galeria ?? [],
    destacado: row.destacado,
    horario: row.horario ?? [],
    direccion: row.direccion,
    telefono: row.telefono,
    web: row.web ?? undefined,
    menu: row.menu ?? undefined,
    instagram: row.instagram ?? undefined,
    precio: row.precio ?? undefined,
    delivery: row.delivery ?? undefined,
  };
}

export async function getNegocios(): Promise<Negocio[]> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function getNegocio(slug: string): Promise<Negocio | null> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getRelacionados(cat: string, excludeId: number, limit = 3): Promise<Negocio[]> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("cat", cat)
    .neq("id", excludeId)
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(mapRow);
}
