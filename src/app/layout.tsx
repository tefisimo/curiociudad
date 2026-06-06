import type { Metadata } from "next";
import { Inter, Federo } from "next/font/google";
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

export const metadata: Metadata = {
  title: "CurioCiudad — Los mejores negocios locales",
  description: "Una selección cuidada de los mejores lugares para comer, comprar y hacer cosas en tu ciudad.",
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
      </body>
    </html>
  );
}
