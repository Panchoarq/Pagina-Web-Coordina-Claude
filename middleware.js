import { NextResponse } from "next/server";

const LOCALES = ["es", "en"];
const DEFAULT_LOCALE = "es";

// Rutas que no llevan prefijo de idioma.
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Detecta idioma preferido del navegador; por defecto español.
  const accept = request.headers.get("accept-language") || "";
  const preferred = accept.toLowerCase().startsWith("en") ? "en" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
