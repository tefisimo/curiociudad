import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Tarifas — CurioCiudad" };

const PLANES = [
  {
    nombre: "Básico",
    precio: "Gratis",
    desc: "Para negocios que quieren estar presentes en el directorio.",
    features: ["Ficha con foto y descripción", "Horarios y ubicación", "Links a web e Instagram", "Filtros por categoría y tags"],
    cta: { label: "Registrar negocio", href: "/registrar" },
    destacado: false,
  },
  {
    nombre: "Destacado",
    precio: "Consultar",
    desc: "Para negocios que quieren máxima visibilidad.",
    features: ["Todo lo del plan Básico", "Badge 'Destacado' en ficha y listado", "Posición preferente en categoría", "Inclusión en newsletter mensual", "Estadísticas de visitas"],
    cta: { label: "Contactar", href: "/contacto" },
    destacado: true,
  },
];

export default function TarifasPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Tarifas
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "480px", marginTop: "16px" }}>
            Sin sorpresas. El listado básico es siempre gratis.
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "800px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PLANES.map(({ nombre, precio, desc, features, cta, destacado }) => (
            <div
              key={nombre}
              style={{
                backgroundColor: destacado ? "#0058BD" : "#fff",
                border: `1px solid ${destacado ? "#0058BD" : "#E9E2DA"}`,
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: destacado ? "rgba(255,255,255,0.6)" : "#7A736A", marginBottom: "6px" }}>
                  {nombre}
                </p>
                <p style={{ fontFamily: "var(--font-federo)", fontSize: "36px", fontWeight: 400, color: destacado ? "#fff" : "#000" }}>
                  {precio}
                </p>
                <p style={{ fontSize: "14px", color: destacado ? "rgba(255,255,255,0.7)" : "#7A736A", marginTop: "6px", lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: destacado ? "rgba(255,255,255,0.85)" : "#47433E" }}>
                    <span style={{ color: destacado ? "#E4FF22" : "#0058BD", flexShrink: 0, marginTop: "1px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={cta.href}
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: destacado ? "#000" : "#fff",
                  backgroundColor: destacado ? "#E4FF22" : "#0058BD",
                  borderRadius: "100px",
                  padding: "12px 24px",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                {cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
