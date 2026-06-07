import { ImageResponse } from "next/og";
import { getNegocio } from "@/lib/queries";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAT_LABEL: Record<string, string> = {
  comer: "Comer & Beber",
  tiendas: "Tiendas",
  actividades: "Actividades",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const negocio = await getNegocio(slug);

  const nombre = negocio?.nombre ?? "CurioCiudad";
  const cat = negocio ? (CAT_LABEL[negocio.cat] ?? negocio.cat) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FAF8F5",
        }}
      >
        {/* Left blue panel */}
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: "#0058BD",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: 44, height: 4, backgroundColor: "#E4FF22", borderRadius: 2 }} />
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.55)",
                margin: "10px 0 0",
              }}
            >
              CurioCiudad
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cat ? (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#E4FF22",
                  borderRadius: 100,
                  padding: "6px 18px",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "#000",
                  width: "fit-content",
                }}
              >
                {cat}
              </div>
            ) : null}
            <p
              style={{
                fontSize: nombre.length > 20 ? 44 : 56,
                fontWeight: 800,
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              {nombre}
            </p>
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, letterSpacing: "0.06em" }}>
            curiociudad.vercel.app
          </p>
        </div>

        {/* Right image panel */}
        {negocio?.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={negocio.img}
            alt={nombre}
            style={{ width: "50%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "#F3ECE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#E9E2DA" }} />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
