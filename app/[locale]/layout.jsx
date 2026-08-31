import { notFound } from "next/navigation";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { LOCALES, getDict, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEnhancements from "@/components/ClientEnhancements";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk-loaded",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const base = "https://coordinabimconsulting.com";
  return {
    title: { default: dict.meta.title, template: "%s — coordina BIM Consulting" },
    description: dict.meta.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { es: `${base}/es`, en: `${base}/en` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "en" ? "en_US" : "es_CL",
      type: "website",
      url: `${base}/${locale}`,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <ClientEnhancements />
        <Header locale={locale} />
        <main id="contenido">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
