"use client";

import { useEffect, useState } from "react";

const DIAS_IDX: Record<number, string> = {
  0: "Dom",
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
};

function parseMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calcularEstado(horario: { dia: string; hora: string }[]): "abierto" | "cerrado" {
  const now = new Date();
  const diaActual = DIAS_IDX[now.getDay()];
  const entrada = horario.find((h) => h.dia === diaActual);

  if (!entrada || entrada.hora === "Cerrado") return "cerrado";

  const [abre, cierra] = entrada.hora.split(" – ");
  const ahoraMin = now.getHours() * 60 + now.getMinutes();
  const abreMin = parseMinutes(abre);
  let cierraMin = parseMinutes(cierra);
  if (cierraMin < abreMin) cierraMin += 24 * 60; // cruza medianoche

  return ahoraMin >= abreMin && ahoraMin < cierraMin ? "abierto" : "cerrado";
}

export default function EstadoAbierto({
  horario,
}: {
  horario: { dia: string; hora: string }[];
}) {
  const [estado, setEstado] = useState<"abierto" | "cerrado" | null>(null);

  useEffect(() => {
    setEstado(calcularEstado(horario));
  }, [horario]);

  if (!estado) return null;

  const abierto = estado === "abierto";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        fontWeight: 600,
        color: abierto ? "#1E6E3A" : "#9B3535",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          backgroundColor: abierto ? "#1E6E3A" : "#9B3535",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {abierto ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
