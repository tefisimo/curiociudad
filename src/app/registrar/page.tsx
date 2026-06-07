"use client";

import { useActionState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { enviarSolicitud, type FormState } from "./actions";
import { TAGS_EXTRA, TAGS_RAPIDOS } from "@/lib/data";

const TODOS_LOS_TAGS = [...TAGS_RAPIDOS, ...TAGS_EXTRA];

const initialState: FormState = { status: "idle" };

/* ── Estilos compartidos ───────────────────────────────────────── */

const inputStyle = {
  width: "100%",
  fontSize: "15px",
  color: "#000",
  backgroundColor: "#fff",
  border: "1px solid #E9E2DA",
  borderRadius: "8px",
  padding: "10px 14px",
  outline: "none",
};

const labelStyle = {
  display: "block" as const,
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#7A736A",
  marginBottom: "6px",
};

const sectionTitleStyle = {
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  color: "#000",
  borderBottom: "1px solid #E9E2DA",
  paddingBottom: "10px",
  marginBottom: "20px",
};

/* ── Página ────────────────────────────────────────────────────── */

export default function RegistrarPage() {
  const [state, action, pending] = useActionState(enviarSolicitud, initialState);

  if (state.status === "ok") {
    return (
      <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
        <SiteHeader />
        <div
          className="mx-auto px-8 py-24 flex flex-col items-center text-center"
          style={{ maxWidth: "560px" }}
        >
          <div
            className="mb-6 flex items-center justify-center"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#E6F4EC",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E6E3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#000",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            ¡Solicitud enviada!
          </h1>
          <p style={{ fontSize: "16px", color: "#7A736A", lineHeight: 1.7, marginBottom: "32px" }}>
            Revisaremos tu negocio y te contactaremos en los próximos días. Gracias por querer ser parte de CurioCiudad.
          </p>
          <Link
            href="/"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#fff",
              backgroundColor: "#0058BD",
              borderRadius: "100px",
              padding: "10px 24px",
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

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "12px",
            }}
          >
            Para negocios
          </p>
          <h1
            style={{
              fontFamily: "var(--font-federo)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: "600px",
            }}
          >
            Registra tu negocio
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: "480px",
              marginTop: "16px",
            }}
          >
            Completa el formulario y nuestro equipo revisará tu solicitud. Es gratis y sin compromiso.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <div className="mx-auto px-8 py-14" style={{ maxWidth: "720px" }}>
        <form action={action} className="flex flex-col gap-10">

          {/* Sección 1: Información del negocio */}
          <section>
            <p style={sectionTitleStyle}>1. Información del negocio</p>
            <div className="flex flex-col gap-5">

              <div>
                <label htmlFor="nombre" style={labelStyle}>Nombre del negocio *</label>
                <input id="nombre" name="nombre" type="text" required style={inputStyle} placeholder="Ej: Café Velarde" />
              </div>

              <div>
                <label htmlFor="cat" style={labelStyle}>Categoría *</label>
                <select id="cat" name="cat" required style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Selecciona una categoría</option>
                  <option value="comer">Comer & Beber</option>
                  <option value="tiendas">Tiendas</option>
                  <option value="actividades">Actividades</option>
                </select>
              </div>

              <div>
                <label htmlFor="descripcion" style={labelStyle}>Descripción corta *</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  required
                  rows={3}
                  maxLength={200}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Una frase que describa tu negocio (máx. 200 caracteres)"
                />
              </div>

              <div>
                <label style={labelStyle}>Rango de precio</label>
                <div className="flex gap-3">
                  {(["€", "€€", "€€€"] as const).map((p) => (
                    <label
                      key={p}
                      style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "15px", color: "#47433E" }}
                    >
                      <input type="radio" name="precio" value={p} style={{ accentColor: "#0058BD" }} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Características</label>
                <div className="flex flex-wrap gap-2">
                  {TODOS_LOS_TAGS.map((tag) => (
                    <label
                      key={tag}
                      style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", color: "#47433E" }}
                    >
                      <input type="checkbox" name="tags" value={tag} style={{ accentColor: "#0058BD" }} />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Sección 2: Ubicación y contacto del negocio */}
          <section>
            <p style={sectionTitleStyle}>2. Ubicación y contacto</p>
            <div className="flex flex-col gap-5">

              <div>
                <label htmlFor="direccion" style={labelStyle}>Dirección *</label>
                <input id="direccion" name="direccion" type="text" required style={inputStyle} placeholder="Ej: Calle Mayor 10, Madrid" />
              </div>

              <div>
                <label htmlFor="telefono" style={labelStyle}>Teléfono *</label>
                <input id="telefono" name="telefono" type="tel" required style={inputStyle} placeholder="Ej: +34 910 123 456" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="web" style={labelStyle}>Sitio web</label>
                  <input id="web" name="web" type="url" style={inputStyle} placeholder="https://..." />
                </div>
                <div>
                  <label htmlFor="instagram" style={labelStyle}>Instagram</label>
                  <input id="instagram" name="instagram" type="text" style={inputStyle} placeholder="@tunegocio" />
                </div>
              </div>

            </div>
          </section>

          {/* Sección 3: Datos de contacto */}
          <section>
            <p style={sectionTitleStyle}>3. Tus datos de contacto</p>
            <div className="flex flex-col gap-5">

              <div>
                <label htmlFor="contacto_nombre" style={labelStyle}>Tu nombre *</label>
                <input id="contacto_nombre" name="contacto_nombre" type="text" required style={inputStyle} placeholder="Nombre y apellidos" />
              </div>

              <div>
                <label htmlFor="contacto_email" style={labelStyle}>Tu email *</label>
                <input id="contacto_email" name="contacto_email" type="email" required style={inputStyle} placeholder="tu@email.com" />
              </div>

            </div>
          </section>

          {/* Error */}
          {state.status === "error" && (
            <p
              style={{
                fontSize: "14px",
                color: "#9B3535",
                backgroundColor: "#FDF0F0",
                border: "1px solid #F5C6C6",
                borderRadius: "8px",
                padding: "12px 16px",
              }}
            >
              {state.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            style={{
              fontSize: "15px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#fff",
              backgroundColor: pending ? "#7AAAD9" : "#0058BD",
              border: "none",
              borderRadius: "100px",
              padding: "14px 32px",
              cursor: pending ? "not-allowed" : "pointer",
              alignSelf: "flex-start",
              transition: "background-color 0.15s",
            }}
          >
            {pending ? "Enviando..." : "Enviar solicitud"}
          </button>

        </form>
      </div>

      <SiteFooter />
    </div>
  );
}
