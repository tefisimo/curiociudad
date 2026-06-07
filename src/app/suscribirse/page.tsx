import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Suscribirse — CurioCiudad" };

export default function SuscribirsePage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Últimos descubrimientos,<br />en tu bandeja de entrada
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "480px", marginTop: "16px" }}>
            Recibe las novedades del directorio: nuevos negocios, destacados y recomendaciones de temporada.
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "560px" }}>
        <form className="flex flex-col gap-4">
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "6px" }}>
              Tu nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              style={{ width: "100%", fontSize: "15px", color: "#000", backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "8px", padding: "10px 14px", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "6px" }}>
              Tu email *
            </label>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              style={{ width: "100%", fontSize: "15px", color: "#000", backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "8px", padding: "10px 14px", outline: "none" }}
            />
          </div>
          <button
            type="submit"
            style={{ fontSize: "15px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", backgroundColor: "#0058BD", border: "none", borderRadius: "100px", padding: "14px 32px", cursor: "pointer", marginTop: "8px", alignSelf: "flex-start" }}
          >
            Suscribirse
          </button>
          <p style={{ fontSize: "13px", color: "#7A736A" }}>
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </div>

      <SiteFooter />
    </div>
  );
}
