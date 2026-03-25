import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Los Chules",
  description:
    "Marca para perros hecha con amor. Empezamos con Chule Pancakes y seguimos construyendo productos para momentos felices con tu perro.",
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
      </body>
    </html>
  );
}