"use client";

import { useState } from "react";
import Link from "next/link";

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

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
          <Link href="/" style={navLinkStyle}>
            Ver todo
          </Link>
          <Link href="/suscribirse" style={{ ...navLinkStyle, color: "#0058BD" }}>
            Suscribirse
          </Link>
        </nav>

        <button
          className="md:hidden"
          style={{ color: "#47433E", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <MenuIcon />
        </button>
      </div>

      {menuAbierto && (
        <div
          className="md:hidden px-4 sm:px-8 pb-5 flex flex-col gap-5"
          style={{ borderTop: "1px solid #E9E2DA" }}
        >
          <Link href="/nosotros" style={navLinkStyle}>Nosotros</Link>
          <Link href="/registrar" style={navLinkStyle}>Registrar</Link>
          <Link href="/" style={navLinkStyle}>Ver todo</Link>
          <Link href="/suscribirse" style={{ ...navLinkStyle, color: "#0058BD" }}>Suscribirse</Link>
        </div>
      )}
    </header>
  );
}
