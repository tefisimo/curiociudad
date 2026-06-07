import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Nosotros — CurioCiudad" };

export default function NosotrosPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Nosotros
          </h1>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "720px" }}>
        <div className="flex flex-col gap-8" style={{ fontSize: "16px", color: "#47433E", lineHeight: 1.8 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-federo)", fontSize: "22px", fontWeight: 400, textTransform: "uppercase", color: "#000", marginBottom: "14px" }}>
              Qué es CurioCiudad
            </h2>
            <p>
              CurioCiudad nació de una idea simple: hacer más fácil descubrir los mejores negocios locales. No las grandes cadenas, sino los lugares con historia, con personalidad y con gente detrás que pone el corazón en lo que hace.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--font-federo)", fontSize: "22px", fontWeight: 400, textTransform: "uppercase", color: "#000", marginBottom: "14px" }}>
              Nuestra misión
            </h2>
            <p>
              Conectar a las personas con los negocios que merecen ser descubiertos. Creemos que las ciudades son más ricas cuando sus comercios locales prosperan, y queremos ser el puente entre ambos.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--font-federo)", fontSize: "22px", fontWeight: 400, textTransform: "uppercase", color: "#000", marginBottom: "14px" }}>
              Cómo trabajamos
            </h2>
            <p>
              Cada negocio que aparece en el directorio ha pasado por un proceso de revisión. No somos un listado automático — seleccionamos manualmente para garantizar que cada recomendación tenga valor real para quien la recibe.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
