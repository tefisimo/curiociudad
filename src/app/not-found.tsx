import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-8 py-24"
      >
        <p
          style={{
            fontFamily: "var(--font-federo)",
            fontSize: "clamp(64px, 12vw, 120px)",
            fontWeight: 400,
            color: "#E4FF22",
            lineHeight: 1,
            WebkitTextStroke: "2px #0058BD",
            marginBottom: "8px",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-federo)",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 400,
            textTransform: "uppercase",
            color: "#000",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          Página no encontrada
        </h1>
        <p style={{ fontSize: "16px", color: "#7A736A", lineHeight: 1.7, maxWidth: "400px", marginBottom: "36px" }}>
          El enlace que seguiste no existe o fue movido. Vuelve al directorio para seguir explorando.
        </p>
        <Link
          href="/"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#fff",
            backgroundColor: "#0058BD",
            borderRadius: "100px",
            padding: "12px 28px",
            textDecoration: "none",
          }}
        >
          Volver al directorio
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
