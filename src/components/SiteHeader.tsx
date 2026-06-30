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

const barBase = {
  position: "absolute" as const,
  left: 0,
  display: "block",
  width: "24px",
  height: "1.5px",
  backgroundColor: "#47433E",
  transition: "top 300ms ease, transform 300ms ease, opacity 300ms ease",
  borderRadius: "2px",
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

        {/* Hamburger → X */}
        <button
          className="md:hidden"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          style={{
            position: "relative",
            width: "24px",
            height: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span style={{ ...barBase, top: menuAbierto ? "11px" : "4px",  transform: menuAbierto ? "rotate(45deg)"  : "rotate(0deg)"  }} />
          <span style={{ ...barBase, top: "11px",                        opacity:   menuAbierto ? 0 : 1,            transform: menuAbierto ? "scaleX(0)"     : "scaleX(1)"     }} />
          <span style={{ ...barBase, top: menuAbierto ? "11px" : "18px", transform: menuAbierto ? "rotate(-45deg)" : "rotate(0deg)"  }} />
        </button>
      </div>

      {/* Mobile menu — slides open/closed */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuAbierto ? "280px" : "0px",
          transition: "max-height 300ms ease",
          borderTop: "1px solid #E9E2DA",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "24px 16px",
            opacity: menuAbierto ? 1 : 0,
            transform: menuAbierto ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 250ms ease 50ms, transform 250ms ease 50ms",
          }}
        >
          <Link href="/nosotros" style={navLinkStyle}>Nosotros</Link>
          <Link href="/registrar" style={navLinkStyle}>Registrar</Link>
          <Link href="/" style={navLinkStyle}>Ver todo</Link>
          <Link href="/suscribirse" style={{ ...navLinkStyle, color: "#0058BD" }}>Suscribirse</Link>
        </nav>
      </div>
    </header>
  );
}
