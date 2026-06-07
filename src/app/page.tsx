import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BusinessDirectory from "@/components/BusinessDirectory";
import { getNegocios } from "@/lib/queries";

export default async function Home() {
  const negocios = await getNegocios();

  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex overflow-hidden" style={{ height: "520px" }}>
        <div
          className="w-1/2 flex flex-col justify-end px-16 pb-14"
          style={{ backgroundColor: "#0058BD" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "clamp(36px, 4vw, 58px)",
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
            className="mt-5"
            style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "360px" }}
          >
            Una selección cuidada de los mejores lugares para comer, comprar y hacer cosas en tu ciudad.
          </p>
        </div>

        <div className="w-1/2 overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/64bb92dbd57f710d9f3396e0/64ef6b4e258f87650796f7d6_kayleigh-harrington-yhn4okt6ci0-unsplash.webp"
            alt="Negocios locales"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Filter bar + grid (client component) ─────────────── */}
      <BusinessDirectory negocios={negocios} />

      {/* ── Newsletter ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F3ECE5" }}>
        <div
          className="mx-auto px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
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

          <form className="flex items-center gap-3 w-full md:w-auto">
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
              type="submit"
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
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
