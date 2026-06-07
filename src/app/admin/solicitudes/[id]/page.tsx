import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { publicarNegocio } from "./actions";
import { rechazarSolicitud } from "@/app/admin/actions";

const DIAS: { key: string; label: string }[] = [
  { key: "lun", label: "Lunes" },
  { key: "mar", label: "Martes" },
  { key: "mie", label: "Miércoles" },
  { key: "jue", label: "Jueves" },
  { key: "vie", label: "Viernes" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" },
];

const TAGS_EXTRA = [
  "Admite mascotas", "Wi-Fi gratis", "Música en vivo", "Brunch",
  "Vegano", "Vegetariano", "Sin gluten", "Terraza",
];

const inputStyle = {
  width: "100%",
  border: "1px solid #E9E2DA",
  borderRadius: "8px",
  padding: "9px 12px",
  fontSize: "14px",
  color: "#000",
  backgroundColor: "#fff",
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#7A736A",
  marginBottom: "6px",
};

export default async function SolicitudDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: s } = await supabaseAdmin
    .from("solicitudes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!s) notFound();

  const publicarConId = publicarNegocio.bind(null, s.id);
  const rechazarConId = rechazarSolicitud.bind(null, s.id);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          style={{ fontSize: "14px", color: "#7A736A", textDecoration: "none" }}
        >
          ← Volver
        </Link>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#000" }}>
          Revisar solicitud
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Solicitud info (left) */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #E9E2DA",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "16px" }}>
            Solicitud recibida
          </p>
          <div className="flex flex-col gap-4">
            {[
              ["Negocio", s.nombre],
              ["Categoría", s.cat],
              ["Descripción", s.descripcion],
              ["Dirección", s.direccion],
              ["Teléfono", s.telefono],
              ["Web", s.web],
              ["Instagram", s.instagram],
              ["Precio", s.precio],
              ["Delivery", s.delivery ? "Sí" : "No"],
              ["Tags", Array.isArray(s.tags) ? s.tags.join(", ") : s.tags],
              ["Contacto", s.contacto_nombre],
              ["Email contacto", s.contacto_email],
              ["Mensaje", s.mensaje],
            ]
              .filter(([, v]) => v != null && v !== "")
              .map(([label, value]) => (
                <div key={label}>
                  <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "14px", color: "#000", marginTop: "2px", wordBreak: "break-word" }}>
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Form (right) */}
        <form action={publicarConId} className="lg:col-span-2 flex flex-col gap-6">
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E9E2DA",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "20px" }}>
              Datos del negocio
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Nombre</label>
                <input name="nombre" defaultValue={s.nombre} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Categoría</label>
                <select name="cat" defaultValue={s.cat} required style={inputStyle}>
                  <option value="comer">Comer & Beber</option>
                  <option value="tiendas">Tiendas</option>
                  <option value="actividades">Actividades</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label style={labelStyle}>Descripción corta</label>
                <input name="descripcion" defaultValue={s.descripcion} required style={inputStyle} />
              </div>
              <div className="sm:col-span-2">
                <label style={labelStyle}>Descripción larga</label>
                <textarea
                  name="desc_larga"
                  defaultValue={s.descripcion_larga ?? ""}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Dirección</label>
                <input name="direccion" defaultValue={s.direccion} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input name="telefono" defaultValue={s.telefono} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Web</label>
                <input name="web" type="url" defaultValue={s.web ?? ""} style={inputStyle} placeholder="https://" />
              </div>
              <div>
                <label style={labelStyle}>Instagram (@handle)</label>
                <input name="instagram" defaultValue={s.instagram ?? ""} style={inputStyle} placeholder="@usuario" />
              </div>
              <div>
                <label style={labelStyle}>Precio</label>
                <select name="precio" defaultValue={s.precio ?? ""} style={inputStyle}>
                  <option value="">Sin especificar</option>
                  <option value="$">$ — Económico</option>
                  <option value="$$">$$ — Moderado</option>
                  <option value="$$$">$$$ — Premium</option>
                </select>
              </div>
              <div className="flex items-center gap-4 self-end pb-2">
                <label className="flex items-center gap-2" style={{ fontSize: "14px", color: "#000", cursor: "pointer" }}>
                  <input type="checkbox" name="delivery" defaultChecked={s.delivery} />
                  Delivery disponible
                </label>
                <label className="flex items-center gap-2" style={{ fontSize: "14px", color: "#000", cursor: "pointer" }}>
                  <input type="checkbox" name="destacado" />
                  Destacado
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "24px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "14px" }}>
              Tags
            </p>
            <div className="flex flex-wrap gap-3">
              {TAGS_EXTRA.map((tag) => {
                const checked = Array.isArray(s.tags) ? s.tags.includes(tag) : false;
                return (
                  <label key={tag} className="flex items-center gap-2" style={{ fontSize: "14px", color: "#000", cursor: "pointer" }}>
                    <input type="checkbox" name="tags" value={tag} defaultChecked={checked} />
                    {tag}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Imagen y galería */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "24px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "20px" }}>
              Imágenes
            </p>
            <div className="flex flex-col gap-5">
              <div>
                <label style={labelStyle}>URL imagen principal</label>
                <input name="img" type="url" style={inputStyle} placeholder="https://..." />
              </div>
              <div>
                <label style={labelStyle}>URLs galería (una por línea)</label>
                <textarea name="galeria" rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={"https://...\nhttps://..."} />
              </div>
            </div>
          </div>

          {/* Horario */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "24px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "20px" }}>
              Horario
            </p>
            <div className="flex flex-col gap-3">
              {DIAS.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-4">
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#47433E", width: "90px", flexShrink: 0 }}>
                    {label}
                  </span>
                  <input
                    name={`horario_${key}`}
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="9:00 – 18:00  (vacío = Cerrado)"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              style={{
                flex: 1,
                fontSize: "15px",
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#0058BD",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                cursor: "pointer",
              }}
            >
              Publicar negocio
            </button>
            {s.estado === "pendiente" && (
              <form action={rechazarConId}>
                <button
                  type="submit"
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#9B3535",
                    backgroundColor: "#FEE2E2",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    cursor: "pointer",
                  }}
                >
                  Rechazar
                </button>
              </form>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
