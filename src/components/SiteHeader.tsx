"use client";

import { useState } from "react";
import Link from "next/link";

const navLinkStyle = {
  fontSize: "15px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  color: "#47433E",
  textDecoration: "none",
};

export default function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E9E2DA" }}>
      <div
        className="mx-auto px-4 sm:px-8 py-5 flex items-center justify-between relative"
        style={{ maxWidth: "1280px" }}
      >
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/nosotros" style={navLinkStyle}>Nosotros</Link>
          <Link href="/registrar" style={navLinkStyle}>Registrar</Link>
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            fontFamily: "var(--font-federo)",
            fontSize: "17px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#000",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          CurioCiudad
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link href="/" style={navLinkStyle}>Ver todo</Link>
          <Link href="/suscribirse" style={{ ...navLinkStyle, color: "#0058BD" }}>
            Suscribirse
          </Link>
        </nav>

        {/* Hamburger / X button */}
        <button
          className="md:hidden relative w-6 h-6"
          style={{ color: "#47433E", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className="absolute left-0 block h-[1.5px] bg-current transition-all duration-300 ease-in-out"
            style={{
              width: "24px",
              top: menuAbierto ? "11px" : "4px",
              transform: menuAbierto ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
          <span
            className="absolute left-0 block h-[1.5px] bg-current transition-all duration-300 ease-in-out"
            style={{
              width: "24px",
              top: "11px",
              opacity: menuAbierto ? 0 : 1,
              transform: menuAbierto ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="absolute left-0 block h-[1.5px] bg-current transition-all duration-300 ease-in-out"
            style={{
              width: "24px",
              top: menuAbierto ? "11px" : "18px",
              transform: menuAbierto ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          />
        </button>
      </div>

      {/* Mobile menu — always rendered, animated with max-height */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: menuAbierto ? "260px" : "0px",
          borderTop: menuAbierto ? "1px solid #E9E2DA" : "1px solid transparent",
        }}
      >
        <nav className="flex flex-col items-center gap-5 py-6">
          <Link href="/nosotros" style={navLinkStyle}>Nosotros</Link>
          <Link href="/registrar" style={navLinkStyle}>Registrar</Link>
          <Link href="/" style={navLinkStyle}>Ver todo</Link>
          <Link href="/suscribirse" style={{ ...navLinkStyle, color: "#0058BD" }}>Suscribirse</Link>
        </nav>
      </div>
    </header>
  );
}
