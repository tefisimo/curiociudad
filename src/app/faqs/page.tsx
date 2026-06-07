import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "FAQs — CurioCiudad" };

const FAQS = [
  {
    q: "¿Cómo puedo registrar mi negocio?",
    a: "Es muy sencillo. Haz clic en 'Registrar negocio', completa el formulario con la información de tu local y nuestro equipo revisará tu solicitud. El proceso de revisión tarda entre 2 y 5 días hábiles.",
  },
  {
    q: "¿Cuánto cuesta aparecer en el directorio?",
    a: "El listado básico en CurioCiudad es completamente gratuito. Ofrecemos opciones de visibilidad adicional como el badge 'Destacado' para negocios que quieran mayor exposición. Consulta nuestra página de tarifas para más información.",
  },
  {
    q: "¿Qué significa el badge 'Destacado'?",
    a: "Los negocios destacados aparecen en posiciones preferentes dentro del directorio y se marcan visualmente con un badge amarillo. Es una forma de destacar entre el resto de listados.",
  },
  {
    q: "¿Cómo puedo actualizar la información de mi negocio?",
    a: "Escríbenos a través de la página de contacto indicando el nombre de tu negocio y los cambios que necesitas. Actualizamos la información en un plazo de 48 horas.",
  },
  {
    q: "¿Cuál es el criterio de selección?",
    a: "Revisamos cada solicitud manualmente para garantizar la calidad del directorio. Valoramos la autenticidad del negocio, la relevancia para nuestra audiencia y la calidad de la propuesta.",
  },
  {
    q: "¿Puedo solicitar que se elimine mi negocio del directorio?",
    a: "Sí, en cualquier momento. Escríbenos a través de la página de contacto y gestionaremos la baja en un plazo de 24 horas.",
  },
];

export default function FAQsPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Preguntas frecuentes
          </h1>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "720px" }}>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              style={{ backgroundColor: "#fff", border: "1px solid #E9E2DA", borderRadius: "10px", overflow: "hidden" }}
            >
              <summary
                style={{ padding: "18px 20px", fontSize: "16px", fontWeight: 600, color: "#000", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                {q}
                <span style={{ fontSize: "20px", color: "#7A736A", flexShrink: 0, marginLeft: "12px" }}>+</span>
              </summary>
              <p style={{ padding: "0 20px 18px", fontSize: "15px", color: "#47433E", lineHeight: 1.7 }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
