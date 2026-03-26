"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8DCCB] bg-[#F3E7D3]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Los Chules"
            width={42}
            height={42}
            className="h-[40px] w-[40px] object-contain"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-[#4A2E1F]">
            Los Chules
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
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

        {/* CTA DESKTOP */}
        <Link
          href="https://wa.me/51997712366?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Los%20Chules%20%F0%9F%90%B6"
          target="_blank"
          className="hidden rounded-full bg-[#DDB45A] px-5 py-2 text-sm font-medium text-[#4A2E1F] shadow-sm transition hover:scale-[1.03] md:inline-flex"
        >
          Pedir ahora
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4A2E1F]/10 bg-white/50 text-[#4A2E1F] md:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div className="border-t border-[#E8DCCB] bg-[#F3E7D3] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-base transition ${
                    isActive
                      ? "font-semibold text-[#4A2E1F]"
                      : "text-[#4A2E1F]/80 hover:text-[#4A2E1F]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="https://wa.me/51997712366?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Los%20Chules%20%F0%9F%90%B6"
              target="_blank"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#DDB45A] px-5 py-3 text-sm font-medium text-[#4A2E1F] shadow-sm"
            >
              Pedir ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}