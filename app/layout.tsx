import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import SkipLink from "@/components/layout/SkipLink";
import Footer from "@/components/layout/Footer";
import { tieneNovedades } from "@/lib/novedades";
import { SITE_NAME, openGraphBase } from "@/lib/metadata";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const description =
  "Marca artesanal peruana para perros. Productos artesanales, el podcast de Chuletas y Lobito y las novedades de la familia.";

// Organization global; las páginas la referencian por @id (p. ej. brand del Product).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [INSTAGRAM_URL],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  alternates: { canonical: "./" },
  openGraph: { ...openGraphBase, title: SITE_NAME, description },
  twitter: { card: "summary_large_image", title: SITE_NAME, description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} antialiased bg-[#F3E7D3] text-[#4A2E1F]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SkipLink />
        <Header mostrarNovedades={tieneNovedades()} />
        {/* Las páginas sin cabecera (data-sin-cabecera, p. ej. /enlaces) no llevan el hueco superior. */}
        <main
          id="contenido"
          tabIndex={-1}
          className="pt-52 outline-none md:pt-56 has-[[data-sin-cabecera]]:pt-0 md:has-[[data-sin-cabecera]]:pt-0"
        >
          {children}
        </main>
        <Footer mostrarNovedades={tieneNovedades()} />
        <Analytics />
      </body>
    </html>
  );
}