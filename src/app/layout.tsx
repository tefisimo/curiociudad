import type { Metadata } from "next";
import { Inter, Federo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const federo = Federo({
  variable: "--font-federo",
  subsets: ["latin"],
  weight: "400",
});

const BASE = "https://curiociudad.vercel.app";

export const metadata: Metadata = {
  title: { default: "CurioCiudad", template: "%s — CurioCiudad" },
  description: "Una selección cuidada de los mejores negocios locales: restaurantes, tiendas y actividades en tu ciudad.",
  metadataBase: new URL(BASE),
  openGraph: {
    siteName: "CurioCiudad",
    locale: "es_VE",
    type: "website",
    url: BASE,
  },
  twitter: {
    card: "summary_large_image",
    site: "@curiociudad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${federo.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-inter, Inter, sans-serif)", backgroundColor: "#FAF8F5" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
