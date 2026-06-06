"use client";

import { useState } from "react";
import Link from "next/link";
import { NEGOCIOS, TAGS_RAPIDOS, TAGS_EXTRA, type Negocio } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/* ── Icons ─────────────────────────────────────────────────────── */

function CoatHangerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 18H3.62a1 1 0 0 1-.74-1.67L12 7" />
      <path d="M12 7V3" />
      <path d="M9.5 3h5" />
    </svg>
  );
}

function ForkKnifeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function SaveIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={active ? "#0058BD" : "none"} stroke={active ? "#0058BD" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────────────── */

const CATS = [
  { id: "tiendas", label: "Tiendas", Icon: CoatHangerIcon },
  { id: "comer", label: "Comer & Beber", Icon: ForkKnifeIcon },
  { id: "actividades", label: "Actividades", Icon: SparkleIcon },
];

/* ── BusinessCard ──────────────────────────────────────────────── */

function BusinessCard({
  negocio,
  guardado,
  onToggle,
}: {
  negocio: Negocio;
  guardado: boolean;
  onToggle: () => void;
}) {
  return (
    <Link href={`/negocios/${negocio.slug}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "395/249" }}>
        <img
          src={negocio.img}
          alt={negocio.nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {negocio.destacado && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wide px-3 py-1"
            style={{ backgroundColor: "#E4FF22", color: "#000", borderRadius: "24px" }}
          >
            Destacado
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
          className="absolute top-3 right-3 flex items-center justify-center transition-opacity duration-150"
          style={{ color: guardado ? "#0058BD" : "rgba(0,0,0,0.5)" }}
          aria-label="Guardar negocio"
        >
          <SaveIcon active={guardado} />
        </button>
      </div>

      {/* Body */}
      <div className="pt-4 pb-6">
        <h3
          className="mb-2 leading-snug"
          style={{ fontSize: "20px", fontWeight: 500, color: "#000" }}
        >
          {negocio.nombre}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {negocio.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold uppercase tracking-wide px-3 py-1"
              style={{ backgroundColor: "#F3ECE5", color: "#7A736A", borderRadius: "24px" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontSize: "15px", color: "#7A736A", lineHeight: "1.6" }}>
          {negocio.desc}
        </p>
      </div>
    </Link>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function Home() {
  const [catActiva, setCatActiva] = useState<string | null>(null);
  const [tagsRapidos, setTagsRapidos] = useState<string[]>([]);
  const [tagsExtra, setTagsExtra] = useState<string[]>([]);
  const [guardados, setGuardados] = useState<number[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [email, setEmail] = useState("");

  const toggleTagRapido = (tag: string) =>
    setTagsRapidos((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));

  const toggleTagExtra = (tag: string) =>
    setTagsExtra((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));

  const toggleGuardado = (id: number) =>
    setGuardados((p) => (p.includes(id) ? p.filter((n) => n !== id) : [...p, id]));

  const allTags = [...tagsRapidos, ...tagsExtra];

  const filtrados = NEGOCIOS.filter((n) => {
    if (catActiva && n.cat !== catActiva) return false;
    if (allTags.length > 0 && !allTags.some((t) => n.tags.includes(t))) return false;
    return true;
  });

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

      {/* ── Filter bar ───────────────────────────────────────── */}
      <div
        className="sticky top-0 z-20"
        style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E9E2DA" }}
      >
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <div className="flex items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              {CATS.map(({ id, label, Icon }) => {
                const activa = catActiva === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCatActiva(activa ? null : id)}
                    className="flex items-center gap-2 shrink-0 transition-colors duration-150"
                    style={{
                      color: "#0058BD",
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      background: "none",
                      border: "none",
                      borderBottom: activa ? "2px solid #0058BD" : "2px solid transparent",
                      paddingBottom: "2px",
                      cursor: "pointer",
                      opacity: catActiva && !activa ? 0.45 : 1,
                    }}
                  >
                    <Icon />
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {TAGS_RAPIDOS.map((tag) => {
                const activo = tagsRapidos.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTagRapido(tag)}
                    className="hidden sm:block transition-colors duration-150"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: activo ? "#fff" : "#47433E",
                      backgroundColor: activo ? "#0058BD" : "#FAF8F5",
                      border: `1px solid ${activo ? "#0058BD" : "#E9E2DA"}`,
                      borderRadius: "24px",
                      padding: "5px 14px",
                      cursor: "pointer",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}

              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center gap-2 transition-colors duration-150"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "#47433E",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FilterIcon />
                Más filtros
                <ChevronDownIcon />
              </button>
            </div>
          </div>

          {mostrarFiltros && (
            <div
              className="flex flex-wrap gap-2 pb-4"
              style={{ borderTop: "1px solid #F0EAE3", paddingTop: "14px" }}
            >
              {TAGS_EXTRA.map((tag) => {
                const activo = tagsExtra.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTagExtra(tag)}
                    className="transition-colors duration-150"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: activo ? "#fff" : "#7A736A",
                      backgroundColor: activo ? "#0058BD" : "#F3ECE5",
                      border: "none",
                      borderRadius: "24px",
                      padding: "5px 14px",
                      cursor: "pointer",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Listings ─────────────────────────────────────────── */}
      <main className="mx-auto px-8 py-12" style={{ maxWidth: "1280px" }}>
        {filtrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {filtrados.map((negocio) => (
              <BusinessCard
                key={negocio.id}
                negocio={negocio}
                guardado={guardados.includes(negocio.id)}
                onToggle={() => toggleGuardado(negocio.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-28">
            <p className="text-3xl mb-4">🔍</p>
            <p className="mb-1" style={{ fontWeight: 600, fontSize: "18px", color: "#000" }}>
              Sin resultados
            </p>
            <p style={{ fontSize: "15px", color: "#7A736A" }}>
              Prueba con otra categoría o quita algunos filtros.
            </p>
          </div>
        )}
      </main>

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

          <form
            className="flex items-center gap-3 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
