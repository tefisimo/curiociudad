import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BusinessDirectory from "@/components/BusinessDirectory";
import NewsletterForm from "@/components/NewsletterForm";
import { getNegocios } from "@/lib/queries";

export default async function Home() {
  const negocios = await getNegocios();

  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row overflow-hidden" style={{ minHeight: "320px" }}>
        <div
          className="w-full md:w-1/2 flex flex-col justify-end px-6 sm:px-10 md:px-16 py-10 md:pb-14"
          style={{ backgroundColor: "#0058BD", minHeight: "260px" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "clamp(28px, 4vw, 58px)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: "480px",
            }}
          >
            Los mejores negocios locales.
          </h1>
          <p
            className="mt-4"
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "360px" }}
          >
            Una selección cuidada de los mejores lugares para comer, comprar y hacer cosas en tu ciudad.
          </p>
        </div>

        <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "220px", maxHeight: "520px" }}>
          <img
            src="https://cdn.prod.website-files.com/64bb92dbd57f710d9f3396e0/64ef6b4e258f87650796f7d6_kayleigh-harrington-yhn4okt6ci0-unsplash.webp"
            alt="Negocios locales"
            className="w-full h-full object-cover"
            style={{ minHeight: "220px" }}
          />
        </div>
      </section>

      {/* ── Filter bar + grid (client component) ─────────────── */}
      <BusinessDirectory negocios={negocios} />

      {/* ── Newsletter ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F3ECE5" }}>
        <div
          className="mx-auto px-4 sm:px-8 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ maxWidth: "1280px" }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-federo)",
                fontSize: "clamp(22px, 2.5vw, 34px)",
                fontWeight: 400,
                textTransform: "uppercase",
                color: "#000",
                lineHeight: 1.15,
                maxWidth: "520px",
              }}
            >
              ¿Quieres enterarte de los últimos descubrimientos?
            </h2>
            <p className="mt-2" style={{ fontSize: "15px", color: "#7A736A" }}>
              Recibe notificaciones de nuevos negocios suscribiéndote a nuestra lista.
            </p>
          </div>

          <NewsletterForm variant="inline" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
