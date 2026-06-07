"use client";

import { useState } from "react";

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={active ? "#0058BD" : "none"}
      stroke={active ? "#0058BD" : "#47433E"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export default function BookmarkButton() {
  const [guardado, setGuardado] = useState(false);

  return (
    <button
      onClick={() => setGuardado((g) => !g)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: guardado ? "#0058BD" : "#47433E",
        background: "none",
        border: "1px solid #E9E2DA",
        borderRadius: "100px",
        padding: "6px 14px",
        cursor: "pointer",
        transition: "color 0.15s, border-color 0.15s",
        borderColor: guardado ? "#0058BD" : "#E9E2DA",
      }}
      aria-label={guardado ? "Quitar de guardados" : "Guardar negocio"}
    >
      <BookmarkIcon active={guardado} />
      {guardado ? "Guardado" : "Guardar"}
    </button>
  );
}
