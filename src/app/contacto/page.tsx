import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Contacto — CurioCiudad" };

const EMAIL = "curiociudad.ve@gmail.com";
const WHATSAPP = "584148791514";

export default function ContactoPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Contacto
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "480px", marginTop: "16px" }}>
            ¿Tienes alguna pregunta? Escríbenos y te respondemos lo antes posible.
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "560px" }}>
        <div className="flex flex-col gap-5">

          <a
            href={`mailto:${EMAIL}`}
            style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "20px 24px", textDecoration: "none" }}
          >
            <span style={{ fontSize: "24px" }}>✉️</span>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "4px" }}>Email</p>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#0058BD" }}>{EMAIL}</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "12px", padding: "20px 24px", textDecoration: "none" }}
          >
            <span style={{ fontSize: "24px" }}>💬</span>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A736A", marginBottom: "4px" }}>WhatsApp</p>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#25D366" }}>Escríbenos por WhatsApp</p>
            </div>
          </a>

          <p style={{ fontSize: "14px", color: "#7A736A", textAlign: "center", marginTop: "8px" }}>
            Respondemos en un plazo de 24–48 horas en días hábiles.
          </p>

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
