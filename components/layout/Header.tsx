"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WhatsAppLink from "@/components/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/site";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();
  // El menú queda asociado a la ruta en la que se abrió: si la ruta cambia
  // (enlace, atrás/adelante), se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
          <span className="text-base font-semibold tracking-tight text-[#4A2E1F] max-[359px]:sr-only">
            Los Chules
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm transition ${
                  isActive
                    ? "text-[#4A2E1F] underline underline-offset-4"
                    : "text-[#4A2E1F]/75 hover:text-[#4A2E1F]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA (visible también en móvil) */}
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.info}
            origen="header"
            className="inline-flex rounded-full bg-[#DDB45A] px-4 py-2 text-sm font-medium text-[#4A2E1F] shadow-sm transition motion-safe:hover:scale-[1.03] md:px-5"
          >
            Pedir ahora
          </WhatsAppLink>

          {/* BOTÓN MOBILE */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#4A2E1F]/10 bg-white/50 text-[#4A2E1F] md:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div
          id="menu-movil"
          className="border-t border-[#E8DCCB] bg-[#F3E7D3] px-6 py-5 md:hidden"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
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

            <WhatsAppLink
              message={WHATSAPP_MESSAGES.info}
              origen="header"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#DDB45A] px-5 py-3 text-sm font-medium text-[#4A2E1F] shadow-sm"
            >
              Pedir ahora
            </WhatsAppLink>
          </nav>
        </div>
      )}
    </header>
  );
}