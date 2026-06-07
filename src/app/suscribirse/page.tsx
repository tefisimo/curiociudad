import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterForm from "@/components/NewsletterForm";

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
        <NewsletterForm variant="stacked" />
      </div>

      <SiteFooter />
    </div>
  );
}
