import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Términos y condiciones — CurioCiudad" };

export default function TerminosPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Términos y condiciones
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
            Última actualización: junio de 2026
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "720px" }}>
        <div className="flex flex-col gap-8" style={{ fontSize: "15px", color: "#47433E", lineHeight: 1.8 }}>

          {[
            { titulo: "1. Aceptación de los términos", texto: "Al acceder y utilizar CurioCiudad, aceptas quedar vinculado por estos términos y condiciones. Si no estás de acuerdo con alguna parte de los mismos, te pedimos que no utilices nuestros servicios." },
            { titulo: "2. Uso del servicio", texto: "CurioCiudad es un directorio de negocios locales. Los usuarios pueden consultar la información de los negocios listados de forma gratuita. El uso del servicio debe realizarse de forma lícita y respetuosa." },
            { titulo: "3. Listado de negocios", texto: "Los negocios que aparecen en el directorio han solicitado su inclusión y han sido revisados por nuestro equipo. CurioCiudad no se hace responsable de la exactitud de la información proporcionada por los negocios." },
            { titulo: "4. Propiedad intelectual", texto: "Todo el contenido de CurioCiudad, incluyendo textos, imágenes y diseño, es propiedad de CurioCiudad o de sus respectivos propietarios y está protegido por la legislación de propiedad intelectual." },
            { titulo: "5. Limitación de responsabilidad", texto: "CurioCiudad no garantiza la disponibilidad continua del servicio ni la exactitud de la información. En ningún caso seremos responsables de daños derivados del uso o la imposibilidad de uso del servicio." },
            { titulo: "6. Modificaciones", texto: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en esta página." },
            { titulo: "7. Contacto", texto: "Para cualquier consulta sobre estos términos, puedes contactarnos a través de nuestra página de contacto." },
          ].map(({ titulo, texto }) => (
            <div key={titulo}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>{titulo}</h2>
              <p>{texto}</p>
            </div>
          ))}

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
