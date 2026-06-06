import Link from "next/link";
import { notFound } from "next/navigation";
import { NEGOCIOS } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/* ── Icons ─────────────────────────────────────────────────────── */

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MenuBookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ── Related card ──────────────────────────────────────────────── */

function RelatedCard({ negocio }: { negocio: (typeof NEGOCIOS)[0] }) {
  return (
    <Link href={`/negocios/${negocio.slug}`} className="group block">
      <div className="overflow-hidden" style={{ aspectRatio: "395/249" }}>
        <img
          src={negocio.img}
          alt={negocio.nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="pt-3 pb-5">
        <h3 className="mb-2" style={{ fontSize: "18px", fontWeight: 500, color: "#000" }}>
          {negocio.nombre}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {negocio.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold uppercase tracking-wide px-3 py-1"
              style={{ backgroundColor: "#F3ECE5", color: "#7A736A", borderRadius: "24px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default async function DetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const negocio = NEGOCIOS.find((n) => n.slug === slug);

  if (!negocio) notFound();

  const relacionados = NEGOCIOS.filter(
    (n) => n.id !== negocio.id && n.cat === negocio.cat
  ).slice(0, 3);

  const infoLinkStyle = {
    display: "inline-flex" as const,
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#47433E",
    textDecoration: "none",
    border: "1px solid #E9E2DA",
    borderRadius: "100px",
    padding: "6px 14px",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#7A736A",
    marginBottom: "10px",
  };

  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      {/* ── Main content ──────────────────────────────────── */}
      <div className="mx-auto px-8 py-10" style={{ maxWidth: "1280px" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8" style={{ fontSize: "13px", color: "#7A736A" }}>
          <Link href="/" style={{ color: "#7A736A", textDecoration: "none" }}>
            Todos los negocios
          </Link>
          <ChevronRight />
          <span>{negocio.catLabel}</span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left: info */}
          <div className="lg:w-[420px] shrink-0">
            <h1
              style={{
                fontFamily: "var(--font-federo)",
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 400,
                textTransform: "uppercase",
                color: "#000",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              {negocio.nombre}
            </h1>

            {(negocio.menu || negocio.web) && (
              <div className="flex flex-wrap gap-3 mb-5">
                {negocio.menu && (
                  <a href={negocio.menu} style={infoLinkStyle}>
                    <MenuBookIcon />
                    Menú
                  </a>
                )}
                {negocio.web && (
                  <a href={negocio.web} style={infoLinkStyle}>
                    <GlobeIcon />
                    Sitio web
                  </a>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {negocio.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold uppercase tracking-wide px-3 py-1"
                  style={{ backgroundColor: "#F3ECE5", color: "#7A736A", borderRadius: "24px" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hours */}
            <div className="mb-7">
              <p style={labelStyle}>Horario</p>
              <div className="flex flex-col gap-1.5">
                {negocio.horario.map(({ dia, hora }) => (
                  <div key={dia} className="flex justify-between" style={{ fontSize: "15px" }}>
                    <span style={{ color: "#000", fontWeight: 500, minWidth: "44px" }}>{dia}</span>
                    <span style={{ color: hora === "Cerrado" ? "#C0B8AF" : "#47433E" }}>{hora}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-5">
              <p style={labelStyle}>Ubicación</p>
              <div className="flex items-start gap-2" style={{ fontSize: "15px", color: "#47433E" }}>
                <span className="mt-0.5 shrink-0"><MapPinIcon /></span>
                <span>{negocio.direccion}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-8">
              <p style={labelStyle}>Teléfono</p>
              <div className="flex items-center gap-2" style={{ fontSize: "15px", color: "#47433E" }}>
                <PhoneIcon />
                <a href={`tel:${negocio.telefono}`} style={{ color: "#47433E", textDecoration: "none" }}>
                  {negocio.telefono}
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              {negocio.descLarga.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: "16px", color: "#47433E", lineHeight: 1.7 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right: gallery */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden mb-3">
              <img
                src={negocio.img}
                alt={negocio.nombre}
                className="w-full object-cover"
                style={{ maxHeight: "480px" }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {negocio.galeria.map((src, i) => (
                <div key={i} className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={src}
                    alt={`${negocio.nombre} foto ${i + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className="mt-16" style={{ backgroundColor: "#F3ECE5" }}>
        <div
          className="mx-auto px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ maxWidth: "1280px" }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-federo)",
                fontSize: "clamp(20px, 2vw, 28px)",
                fontWeight: 400,
                textTransform: "uppercase",
                color: "#000",
                lineHeight: 1.15,
                maxWidth: "480px",
              }}
            >
              ¿Quieres enterarte de los últimos descubrimientos?
            </h2>
            <p className="mt-2" style={{ fontSize: "15px", color: "#7A736A" }}>
              Recibe notificaciones de nuevos negocios suscribiéndote a nuestra lista.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 md:w-64 outline-none"
              style={{
                fontSize: "15px",
                color: "#000",
                backgroundColor: "#FAF8F5",
                border: "1px solid #D5CDC3",
                borderRadius: "100px",
                padding: "10px 18px",
              }}
            />
            <button
              type="button"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#fff",
                backgroundColor: "#0058BD",
                border: "none",
                borderRadius: "100px",
                padding: "10px 22px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      {/* ── Try something else ───────────────────────────── */}
      {relacionados.length > 0 && (
        <section className="mx-auto px-8 py-16" style={{ maxWidth: "1280px" }}>
          <h2
            className="mb-10"
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "clamp(24px, 2.5vw, 36px)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            Prueba algo más
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {relacionados.map((n) => (
              <RelatedCard key={n.id} negocio={n} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
