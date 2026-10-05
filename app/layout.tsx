import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SITE_NAME, openGraphBase } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const description =
  "Marca para perros hecha con amor. Empezamos con Chule Pancakes y seguimos construyendo productos para momentos felices con tu perro.";

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
        <Header />
        <main className="pt-24">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}