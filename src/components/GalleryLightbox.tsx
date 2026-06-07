"use client";

import { useState, useEffect, useCallback } from "react";

export default function GalleryLightbox({
  main,
  galeria,
  nombre,
}: {
  main: string;
  galeria: string[];
  nombre: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const all = [main, ...galeria];
  const idx = selected ? all.indexOf(selected) : -1;

  const prev = useCallback(() => {
    if (idx > 0) setSelected(all[idx - 1]);
  }, [idx, all]);

  const next = useCallback(() => {
    if (idx < all.length - 1) setSelected(all[idx + 1]);
  }, [idx, all]);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, prev, next]);

  return (
    <>
      {/* Imagen principal */}
      <div
        className="overflow-hidden mb-3 cursor-zoom-in"
        onClick={() => setSelected(main)}
        style={{ borderRadius: "4px" }}
      >
        <img
          src={main}
          alt={nombre}
          className="w-full object-cover"
          style={{ maxHeight: "480px" }}
        />
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2">
        {galeria.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden cursor-zoom-in"
            style={{ aspectRatio: "4/3", borderRadius: "4px" }}
            onClick={() => setSelected(src)}
          >
            <img
              src={src}
              alt={`${nombre} foto ${i + 2}`}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={() => setSelected(null)}
        >
          {/* Cerrar */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              color: "#fff",
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Anterior */}
          {idx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute",
                left: "20px",
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

          <img
            src={selected}
            alt={nombre}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
          />

          {/* Siguiente */}
          {idx < all.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute",
                right: "20px",
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Siguiente"
            >
              ›
            </button>
          )}

          {/* Contador */}
          <span
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
            }}
          >
            {idx + 1} / {all.length}
          </span>
        </div>
      )}
    </>
  );
}
