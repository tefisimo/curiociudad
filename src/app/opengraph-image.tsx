import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CurioCiudad — Directorio de negocios locales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0058BD",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        {/* Yellow accent bar */}
        <div style={{ display: "flex" }}>
          <div style={{ width: 56, height: 5, backgroundColor: "#E4FF22", borderRadius: 3 }} />
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Directorio de negocios locales
          </p>
          <p
            style={{
              fontSize: 96,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1,
            }}
          >
            CURIO
            <span style={{ color: "#E4FF22" }}>CIUDAD</span>
          </p>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            Los mejores negocios locales para comer, comprar y hacer cosas en tu ciudad.
          </p>
        </div>

        {/* Bottom tag */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: "#E4FF22",
              borderRadius: 100,
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "#000",
            }}
          >
            curiociudad.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
