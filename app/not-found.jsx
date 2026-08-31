import Link from "next/link";

export const metadata = { title: "404" };

export default function NotFound() {
  return (
    <html lang="es">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "'Space Mono', ui-monospace, monospace",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 12 }}>
            Error 404
          </p>
          <h1 style={{ fontSize: "clamp(3rem, 12vw, 8rem)", margin: "16px 0", letterSpacing: "-0.03em" }}>
            404
          </h1>
          <p style={{ color: "#5c5c5c", marginBottom: 24 }}>
            La página no existe / Page not found.
          </p>
          <Link
            href="/es"
            style={{
              display: "inline-block",
              border: "1px solid #0a0a0a",
              padding: "14px 26px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: 12,
            }}
          >
            Inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
