"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

async function enviarConfirmacion(email: string, nombre: string | null) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "CurioCiudad <newsletter@curiociudad.com>",
      to: email,
      subject: "¡Bienvenido/a a CurioCiudad!",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FAF8F5;">
          <h1 style="font-size:22px;font-weight:700;color:#0058BD;margin:0 0 12px;">
            ¡Gracias por suscribirte${nombre ? `, ${nombre}` : ""}!
          </h1>
          <p style="color:#47433E;font-size:15px;line-height:1.6;margin:0 0 16px;">
            Ya eres parte de la comunidad CurioCiudad. Te avisaremos cuando haya nuevos negocios,
            lugares destacados y recomendaciones de temporada.
          </p>
          <p style="color:#7A736A;font-size:13px;margin:0;">
            Si no te suscribiste, ignora este correo.
            <a href="https://curiociudad.vercel.app" style="color:#0058BD;">curiociudad.vercel.app</a>
          </p>
        </div>
      `,
    });
  } catch {
    // Email sending is non-critical — subscription is already saved
  }
}

export async function suscribirse(
  _prev: { ok: boolean; error: string | null },
  formData: FormData
): Promise<{ ok: boolean; error: string | null }> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const nombre = (formData.get("nombre") as string)?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Ingresa un email válido." };
  }

  const { error } = await supabaseAdmin
    .from("suscriptores")
    .insert({ email, nombre });

  if (error) {
    if (error.code === "23505") {
      // unique_violation — already subscribed
      return { ok: true, error: null };
    }
    return { ok: false, error: "Algo salió mal. Intenta de nuevo." };
  }

  await enviarConfirmacion(email, nombre);

  return { ok: true, error: null };
}
