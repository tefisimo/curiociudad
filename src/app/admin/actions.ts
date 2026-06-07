"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const CAT_LABELS: Record<string, string> = {
  tiendas: "Tiendas",
  comer: "Comer & Beber",
  actividades: "Actividades",
};

function generarSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

async function verificarAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");
}

export async function aprobarSolicitud(id: number) {
  await verificarAdmin();

  const { data: sol } = await supabaseAdmin
    .from("solicitudes")
    .select("*")
    .eq("id", id)
    .single();

  if (!sol) throw new Error("Solicitud no encontrada");

  const baseSlug = generarSlug(sol.nombre);
  const { data: existente } = await supabaseAdmin
    .from("negocios")
    .select("slug")
    .eq("slug", baseSlug)
    .single();

  const slug = existente ? `${baseSlug}-${Date.now()}` : baseSlug;

  await supabaseAdmin.from("negocios").insert({
    slug,
    nombre: sol.nombre,
    cat: sol.cat,
    cat_label: CAT_LABELS[sol.cat] ?? sol.cat,
    tags: sol.tags ?? [],
    descripcion: sol.descripcion,
    desc_larga: sol.descripcion,
    img: "https://cdn.prod.website-files.com/64bb92dbd57f710d9f339706/64bb92dbd57f710d9f33981f_64b7aee992eeacec8d341a7b_Mask%2520group.png",
    galeria: [],
    destacado: false,
    horario: [],
    direccion: sol.direccion,
    telefono: sol.telefono,
    web: sol.web ?? null,
    instagram: sol.instagram ?? null,
    precio: sol.precio ?? null,
    delivery: false,
  });

  await supabaseAdmin
    .from("solicitudes")
    .update({ estado: "aprobada" })
    .eq("id", id);

  revalidatePath("/admin");
}

export async function rechazarSolicitud(id: number) {
  await verificarAdmin();

  await supabaseAdmin
    .from("solicitudes")
    .update({ estado: "rechazada" })
    .eq("id", id);

  revalidatePath("/admin");
}
