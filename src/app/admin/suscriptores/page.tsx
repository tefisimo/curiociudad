import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function SuscriptoresPage() {
  const { data: suscriptores } = await supabaseAdmin
    .from("suscriptores")
    .select("*")
    .order("created_at", { ascending: false });

  const total = suscriptores?.length ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#000" }}>
          Suscriptores
        </h1>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#0058BD",
            backgroundColor: "#EBF3FF",
            borderRadius: "100px",
            padding: "4px 14px",
          }}
        >
          {total} {total === 1 ? "suscriptor" : "suscriptores"}
        </span>
      </div>

      {!suscriptores || suscriptores.length === 0 ? (
        <div
          className="text-center py-20"
          style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px" }}
        >
          <p style={{ fontSize: "16px", color: "#7A736A" }}>
            Aún no hay suscriptores.
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
                {["Nombre", "Email", "Fecha"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#7A736A",
                      padding: "12px 20px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suscriptores.map((s, i) => {
                const fecha = new Date(s.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: i < suscriptores.length - 1 ? "1px solid #F0EAE3" : "none",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontSize: "15px", color: "#000" }}>
                      {s.nombre ?? <span style={{ color: "#C9C2B8" }}>—</span>}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "14px", color: "#47433E" }}>
                      <a href={`mailto:${s.email}`} style={{ color: "#0058BD", textDecoration: "none" }}>
                        {s.email}
                      </a>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#7A736A", whiteSpace: "nowrap" }}>
                      {fecha}
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
