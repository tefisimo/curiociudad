"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

function emailTemplate(nombre: string | null): string {
  const saludo = nombre ? `Hola, <strong>${nombre}</strong>` : "Hola";
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <style>@import url('https://fonts.googleapis.com/css2?family=Federo&display=swap');</style>
</head>
<body style="margin:0;padding:0;background-color:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF8F5;">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Header azul -->
          <tr>
            <td style="background-color:#0058BD;border-radius:14px 14px 0 0;padding:36px 44px 32px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#E4FF22;height:3px;width:44px;border-radius:2px;display:block;"></td>
                </tr>
              </table>
              <p style="margin:16px 0 4px;color:rgba(255,255,255,0.55);font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">
                Directorio de negocios locales
              </p>
              <p style="margin:0;color:#ffffff;font-size:28px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;line-height:1.1;font-family:'Federo',Georgia,serif;">
                CURIOCIUDAD
              </p>
            </td>
          </tr>

          <!-- Franja amarilla -->
          <tr>
            <td style="background-color:#E4FF22;height:5px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Cuerpo blanco -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 44px 36px;border-left:1px solid #E9E2DA;border-right:1px solid #E9E2DA;">

              <h1 style="margin:0 0 8px;color:#000000;font-size:24px;font-weight:700;line-height:1.25;">
                ¡Ya eres parte del directorio!
              </h1>
              <p style="margin:0 0 24px;color:#47433E;font-size:15px;line-height:1.75;">
                ${saludo},<br>
                gracias por suscribirte a CurioCiudad. Serás el primero en enterarte cuando
                lleguen nuevos negocios, lugares destacados y recomendaciones de temporada —
                siempre seleccionados con cuidado.
              </p>

              <!-- Caja destacada -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#F3ECE5;border-left:4px solid #0058BD;border-radius:0 8px 8px 0;padding:18px 22px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#7A736A;text-transform:uppercase;letter-spacing:0.10em;">
                      Mientras tanto
                    </p>
                    <p style="margin:0;font-size:15px;color:#000;line-height:1.6;">
                      Explora el directorio y descubre los mejores negocios locales de tu ciudad.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Botón CTA -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0058BD;border-radius:100px;">
                    <a href="https://curiociudad.vercel.app"
                       style="display:inline-block;padding:13px 30px;color:#ffffff;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;text-decoration:none;">
                      Explorar directorio &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F3ECE5;border:1px solid #E9E2DA;border-top:none;border-radius:0 0 14px 14px;padding:22px 44px;">
              <p style="margin:0;font-size:12px;color:#7A736A;line-height:1.7;">
                Recibiste este correo porque te suscribiste en
                <a href="https://curiociudad.vercel.app" style="color:#0058BD;text-decoration:none;">curiociudad.vercel.app</a>.
                Si no fuiste tú, simplemente ignora este mensaje.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

async function enviarConfirmacion(email: string, nombre: string | null) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "CurioCiudad <onboarding@resend.dev>",
      to: email,
      subject: "¡Bienvenido/a a CurioCiudad!",
      html: emailTemplate(nombre),
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
