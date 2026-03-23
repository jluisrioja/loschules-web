import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Los Chules",
  description:
    "Snacks artesanales para perros hechos con amor. Empezamos con panqueques y estamos construyendo un ecosistema para perritos felices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F3E7D3] text-[#4A2E1F]`}
      >
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}