import Link from "next/link";

const COLUMNAS = [
  {
    titulo: "Sitio",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Ver todo", href: "/" },
      { label: "Suscribirse", href: "/suscribirse" },
      { label: "Registrar", href: "/registrar" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    titulo: "Negocios",
    links: [
      { label: "Registrar negocio", href: "/registrar" },
      { label: "Actualizar listado", href: "/contacto" },
      { label: "Destacar negocio", href: "/destacar" },
      { label: "Tarifas", href: "/tarifas" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de privacidad", href: "/privacidad" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#FAF8F5", borderTop: "1px solid #E9E2DA" }}>
      <div
        className="mx-auto px-8 py-16 flex flex-col md:flex-row gap-12 justify-between"
        style={{ maxWidth: "1280px" }}
      >
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "22px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#000",
              textDecoration: "none",
              display: "block",
            }}
          >
            CurioCiudad
          </Link>
          <p className="mt-3" style={{ fontSize: "14px", color: "#7A736A", lineHeight: 1.6 }}>
            El directorio de negocios locales<br />más cuidado de la ciudad.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          {COLUMNAS.map(({ titulo, links }) => (
            <div key={titulo}>
              <p
                className="mb-4"
                style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7A736A" }}
              >
                {titulo}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} style={{ fontSize: "15px", color: "#47433E", textDecoration: "none" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mx-auto px-8 py-5 flex items-center justify-between"
        style={{ maxWidth: "1280px", borderTop: "1px solid #E9E2DA", fontSize: "13px", color: "#7A736A" }}
      >
        <span>© 2026 CurioCiudad</span>
        <span>Directorio de negocios locales</span>
      </div>
    </footer>
  );
}
