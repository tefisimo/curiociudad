"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, null);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#000",
            }}
          >
            CurioCiudad
          </p>
          <p style={{ fontSize: "14px", color: "#7A736A", marginTop: "4px" }}>
            Panel de administración
          </p>
        </div>

        <form
          action={action}
          className="flex flex-col gap-4"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #E9E2DA",
            borderRadius: "12px",
            padding: "28px",
          }}
        >
          <div>
            <label
              htmlFor="email"
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
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                width: "100%",
                fontSize: "15px",
                color: "#000",
                backgroundColor: "#FAF8F5",
                border: "1px solid #E9E2DA",
                borderRadius: "8px",
                padding: "10px 14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
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
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                fontSize: "15px",
                color: "#000",
                backgroundColor: "#FAF8F5",
                border: "1px solid #E9E2DA",
                borderRadius: "8px",
                padding: "10px 14px",
                outline: "none",
              }}
            />
          </div>

          {state?.error && (
            <p
              style={{
                fontSize: "14px",
                color: "#9B3535",
                backgroundColor: "#FDF0F0",
                border: "1px solid #F5C6C6",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#fff",
              backgroundColor: pending ? "#7AAAD9" : "#0058BD",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              cursor: pending ? "not-allowed" : "pointer",
              marginTop: "4px",
            }}
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
