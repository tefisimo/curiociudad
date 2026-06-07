import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rechazarSolicitud } from "./actions";

const ESTADO_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  pendiente:  { color: "#92660A", bg: "#FEF3C7", label: "Pendiente" },
  aprobada:   { color: "#1E6E3A", bg: "#D1FAE5", label: "Aprobada" },
  rechazada:  { color: "#9B3535", bg: "#FEE2E2", label: "Rechazada" },
};

const CAT_LABEL: Record<string, string> = {
  comer: "Comer & Beber",
  tiendas: "Tiendas",
  actividades: "Actividades",
};

export default async function AdminPage() {
  const { data: solicitudes } = await supabaseAdmin
    .from("solicitudes")
    .select("*")
    .order("created_at", { ascending: false });

  const total = solicitudes?.length ?? 0;
  const pendientes = solicitudes?.filter((s) => s.estado === "pendiente").length ?? 0;
  const aprobadas = solicitudes?.filter((s) => s.estado === "aprobada").length ?? 0;
  const rechazadas = solicitudes?.filter((s) => s.estado === "rechazada").length ?? 0;

  return (
    <div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#000",
          marginBottom: "24px",
        }}
      >
        Solicitudes de registro
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total", value: total, color: "#47433E" },
          { label: "Pendientes", value: pendientes, color: "#92660A" },
          { label: "Aprobadas", value: aprobadas, color: "#1E6E3A" },
          { label: "Rechazadas", value: rechazadas, color: "#9B3535" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E9E2DA",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A" }}>
              {label}
            </p>
            <p style={{ fontSize: "32px", fontWeight: 700, color, marginTop: "4px" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      {!solicitudes || solicitudes.length === 0 ? (
        <div
          className="text-center py-20"
          style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px" }}
        >
          <p style={{ fontSize: "16px", color: "#7A736A" }}>
            No hay solicitudes todavía.
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #E9E2DA",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E9E2DA" }}>
                {["Negocio", "Categoría", "Contacto", "Fecha", "Estado", "Acciones"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#7A736A",
                      padding: "12px 16px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s, i) => {
                const estado = ESTADO_STYLE[s.estado] ?? ESTADO_STYLE.pendiente;
                const fecha = new Date(s.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit", month: "short", year: "numeric",
                });
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: i < solicitudes.length - 1 ? "1px solid #F0EAE3" : "none",
                    }}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#000" }}>{s.nombre}</p>
                      <p style={{ fontSize: "13px", color: "#7A736A", marginTop: "2px" }}>{s.direccion}</p>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#47433E" }}>
                      {CAT_LABEL[s.cat] ?? s.cat}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <p style={{ fontSize: "14px", color: "#47433E" }}>{s.contacto_nombre}</p>
                      <p style={{ fontSize: "13px", color: "#7A736A", marginTop: "2px" }}>{s.contacto_email}</p>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#7A736A", whiteSpace: "nowrap" }}>
                      {fecha}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "12px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: estado.color,
                          backgroundColor: estado.bg,
                          borderRadius: "100px",
                          padding: "3px 10px",
                        }}
                      >
                        {estado.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {s.estado === "pendiente" && (
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/solicitudes/${s.id}`}
                            style={{
                              display: "inline-block",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#fff",
                              backgroundColor: "#0058BD",
                              borderRadius: "6px",
                              padding: "6px 14px",
                              textDecoration: "none",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Revisar →
                          </Link>
                          <form action={rechazarSolicitud.bind(null, s.id)}>
                            <button
                              type="submit"
                              style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#9B3535",
                                backgroundColor: "#FEE2E2",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 14px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Rechazar
                            </button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
