"use client";

import { useActionState } from "react";
import { suscribirse } from "@/app/actions/newsletter";

const initialState = { ok: false, error: null };

export default function NewsletterForm({
  variant = "inline",
}: {
  variant?: "inline" | "stacked";
}) {
  const [state, action, pending] = useActionState(suscribirse, initialState);

  if (state.ok) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "15px",
          color: variant === "inline" ? "#fff" : "#1E6E3A",
          fontWeight: 600,
        }}
      >
        <span>✓</span>
        <span>¡Listo! Te avisaremos cuando haya novedades.</span>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <form action={action} className="flex flex-col gap-4">
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#7A736A",
              marginBottom: "6px",
            }}
          >
            Tu nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            style={{
              width: "100%",
              fontSize: "15px",
              color: "#000",
              backgroundColor: "#fff",
              border: "1px solid #E9E2DA",
              borderRadius: "8px",
              padding: "10px 14px",
              outline: "none",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#7A736A",
              marginBottom: "6px",
            }}
          >
            Tu email *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            style={{
              width: "100%",
              fontSize: "15px",
              color: "#000",
              backgroundColor: "#fff",
              border: `1px solid ${state.error ? "#EF4444" : "#E9E2DA"}`,
              borderRadius: "8px",
              padding: "10px 14px",
              outline: "none",
            }}
          />
        </div>
        {state.error && (
          <p style={{ fontSize: "13px", color: "#EF4444", marginTop: "-8px" }}>
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          style={{
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#fff",
            backgroundColor: pending ? "#7A736A" : "#0058BD",
            border: "none",
            borderRadius: "100px",
            padding: "14px 32px",
            cursor: pending ? "not-allowed" : "pointer",
            marginTop: "8px",
            alignSelf: "flex-start",
            transition: "background-color 0.15s",
          }}
        >
          {pending ? "Enviando…" : "Suscribirse"}
        </button>
        <p style={{ fontSize: "13px", color: "#7A736A" }}>
          Sin spam. Puedes darte de baja en cualquier momento.
        </p>
      </form>
    );
  }

  // inline variant (homepage)
  return (
    <form action={action} className="flex items-center gap-3 w-full md:w-auto flex-wrap">
      <input
        type="email"
        name="email"
        required
        placeholder="Tu correo electrónico"
        className="flex-1 md:w-64 outline-none"
        style={{
          fontSize: "15px",
          color: "#000",
          backgroundColor: "#FAF8F5",
          border: `1px solid ${state.error ? "#EF4444" : "#D5CDC3"}`,
          borderRadius: "100px",
          padding: "10px 18px",
        }}
      />
      <button
        type="submit"
        disabled={pending}
        style={{
          fontSize: "15px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#fff",
          backgroundColor: pending ? "#7A736A" : "#0058BD",
          border: "none",
          borderRadius: "100px",
          padding: "10px 22px",
          cursor: pending ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          transition: "background-color 0.15s",
        }}
      >
        {pending ? "Enviando…" : "Suscribirse"}
      </button>
      {state.error && (
        <p style={{ fontSize: "13px", color: "#EF4444", width: "100%", paddingLeft: "4px" }}>
          {state.error}
        </p>
      )}
    </form>
  );
}
