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
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Los Chules"
            width={42}
            height={42}
            className="h-[42px] w-[42px] object-contain"
            priority
          />
          <span className="text-base font-medium tracking-tight text-[#4A2E1F]">
            Los Chules
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-normal transition ${
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

        <Link
          href="https://wa.me/51997712366?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Los%20Chules%20%F0%9F%90%B6"
          target="_blank"
          className="rounded-full bg-[#DDB45A] px-5 py-2 text-sm font-medium text-[#4A2E1F] transition hover:opacity-90"
        >
          Quiero el mío
        </Link>
      </div>
    </header>
  );
}