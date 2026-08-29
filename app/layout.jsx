import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "coordina Bim Consulting — Coordinacion BIM",
  description:
    "Estudio de coordinacion BIM. Asesoria, modelado y coordinacion de proyectos de arquitectura, MEP y estructura desde el primer modelo hasta el as-built.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
