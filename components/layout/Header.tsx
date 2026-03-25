"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8DCCB] bg-[#F3E7D3]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Los Chules"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-[#4A2E1F]">
            Los Chules
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-[#4A2E1F] underline underline-offset-4"
                    : "text-[#4A2E1F]/70 hover:text-[#4A2E1F]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA WHATSAPP */}
        <a
          href="https://wa.me/51997712366?text=Hola%2C%20quiero%20información%20sobre%20Los%20Chules%20🐶"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#DDB45A] px-5 py-2.5 text-sm font-semibold text-[#4A2E1F] shadow-sm transition hover:scale-[1.03]"
        >
          Pedir ahora
        </a>
      </div>
    </header>
  );
}