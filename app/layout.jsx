import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://coordinabimconsulting.com"),
  title: "coordina BIM Consulting",
  description: "Coordinación BIM para arquitectura, ingeniería y construcción.",
};

// El <html> / <body> los define app/[locale]/layout.jsx para poder
// fijar lang por idioma. Este layout raíz sólo deja pasar el árbol.
export default function RootLayout({ children }) {
  return children;
}
