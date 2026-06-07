import Link from "next/link";
import { signOut } from "./login/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #E9E2DA" }}>
        <div
          className="mx-auto px-8 py-4 flex items-center justify-between"
          style={{ maxWidth: "1280px" }}
        >
          <div className="flex items-center gap-6">
            <Link
              href="/"
              style={{
                fontSize: "15px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#000",
                textDecoration: "none",
              }}
            >
              CurioCiudad
            </Link>
            <span style={{ color: "#E9E2DA" }}>|</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#7A736A",
              }}
            >
              Admin
            </span>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#7A736A",
                background: "none",
                border: "1px solid #E9E2DA",
                borderRadius: "100px",
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto px-8 py-10" style={{ maxWidth: "1280px" }}>
        {children}
      </main>
    </div>
  );
}
