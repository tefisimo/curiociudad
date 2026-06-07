"use server";

import { supabase } from "@/lib/supabase";

export type FormState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

export async function enviarSolicitud(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const nombre = formData.get("nombre")?.toString().trim() ?? "";
  const cat = formData.get("cat")?.toString() ?? "";
  const descripcion = formData.get("descripcion")?.toString().trim() ?? "";
  const direccion = formData.get("direccion")?.toString().trim() ?? "";
  const telefono = formData.get("telefono")?.toString().trim() ?? "";
  const web = formData.get("web")?.toString().trim() || null;
  const instagram = formData.get("instagram")?.toString().trim() || null;
  const precio = formData.get("precio")?.toString() || null;
  const tags = formData.getAll("tags").map(String);
  const contacto_nombre = formData.get("contacto_nombre")?.toString().trim() ?? "";
  const contacto_email = formData.get("contacto_email")?.toString().trim() ?? "";

  if (!nombre || !cat || !descripcion || !direccion || !telefono || !contacto_nombre || !contacto_email) {
    return { status: "error", message: "Por favor completa todos los campos obligatorios." };
  }

  const { error } = await supabase.from("solicitudes").insert({
    nombre,
    cat,
    descripcion,
    direccion,
    telefono,
    web,
    instagram,
    precio,
    tags,
    contacto_nombre,
    contacto_email,
  });

  if (error) {
    return { status: "error", message: "Hubo un problema al enviar. Inténtalo de nuevo." };
  }

  return { status: "ok" };
}
