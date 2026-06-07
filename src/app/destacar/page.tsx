import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Destacar negocio — CurioCiudad" };

const BENEFICIOS = [
  { icon: "⭐", titulo: "Posición preferente", desc: "Tu negocio aparece primero en su categoría y en los resultados del directorio." },
  { icon: "🏷️", titulo: "Badge Destacado", desc: "Un distintivo visual amarillo que llama la atención en la ficha y en el listado." },
  { icon: "📣", titulo: "Mayor visibilidad", desc: "Los negocios destacados reciben hasta 3 veces más visitas que los listados estándar." },
  { icon: "📩", titulo: "Inclusión en newsletter", desc: "Tu negocio aparece en la newsletter mensual que enviamos a nuestros suscriptores." },
];

export default function DestacarPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Destaca tu negocio
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "480px", marginTop: "16px" }}>
            Dale más visibilidad a tu local y llega a más clientes potenciales en tu ciudad.
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "800px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {BENEFICIOS.map(({ icon, titulo, desc }) => (
            <div key={titulo} style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "24px" }}>
              <span style={{ fontSize: "28px", display: "block", marginBottom: "12px" }}>{icon}</span>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#000", marginBottom: "6px" }}>{titulo}</p>
              <p style={{ fontSize: "14px", color: "#7A736A", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F3ECE5", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-federo)", fontSize: "22px", fontWeight: 400, textTransform: "uppercase", color: "#000", marginBottom: "12px" }}>
            ¿Te interesa?
          </h2>
          <p style={{ fontSize: "15px", color: "#7A736A", marginBottom: "20px" }}>
            Consulta nuestra página de tarifas o escríbenos directamente para más información.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tarifas" style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", backgroundColor: "#0058BD", borderRadius: "100px", padding: "10px 24px", textDecoration: "none" }}>
              Ver tarifas
            </Link>
            <Link href="/contacto" style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#47433E", backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "100px", padding: "10px 24px", textDecoration: "none" }}>
              Contactar
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
