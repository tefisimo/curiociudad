"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CAT_LABEL: Record<string, string> = {
  comer: "Comer & Beber",
  tiendas: "Tiendas",
  actividades: "Actividades",
};

const DIAS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];

function toSlug(nombre: string) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function publicarNegocio(solicitudId: number, formData: FormData) {
  const nombre = (formData.get("nombre") as string).trim();
  const cat = formData.get("cat") as string;

  const horario: Record<string, string> = {};
  for (const dia of DIAS) {
    const val = (formData.get(`horario_${dia}`) as string)?.trim();
    if (val) horario[dia] = val;
  }

  const tags = formData.getAll("tags") as string[];
  const galeria = ((formData.get("galeria") as string) || "")
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  let slug = toSlug(nombre);
  const { data: existente } = await supabaseAdmin
    .from("negocios")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();
  if (existente) slug = `${slug}-${Date.now()}`;

  const { error } = await supabaseAdmin.from("negocios").insert({
    slug,
    nombre,
    cat,
    cat_label: CAT_LABEL[cat] ?? cat,
    descripcion: (formData.get("descripcion") as string).trim(),
    desc_larga: (formData.get("desc_larga") as string)?.trim() || null,
    direccion: (formData.get("direccion") as string).trim(),
    telefono: (formData.get("telefono") as string).trim(),
    web: (formData.get("web") as string)?.trim() || null,
    instagram: (formData.get("instagram") as string)?.trim() || null,
    precio: (formData.get("precio") as string) || null,
    delivery: formData.get("delivery") === "on",
    tags,
    img: (formData.get("img") as string)?.trim() || "https://placehold.co/800x500/E4FF22/000?text=Foto+pronto",
    galeria,
    horario,
    destacado: formData.get("destacado") === "on",
  });

  if (error) throw new Error(error.message);

  await supabaseAdmin
    .from("solicitudes")
    .update({ estado: "aprobada" })
    .eq("id", solicitudId);

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
