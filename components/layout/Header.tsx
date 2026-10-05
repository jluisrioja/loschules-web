"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WhatsAppLink from "@/components/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/site";

// Rutas sin cabecera ni pie del sitio (la página marca su contenido con data-sin-cabecera).
export const RUTAS_SIN_CABECERA = ["/enlaces"];

function getNavItems(mostrarNovedades: boolean) {
  return [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Podcast", href: "/podcast" },
    ...(mostrarNovedades ? [{ label: "Novedades", href: "/novedades" }] : []),
    { label: "Contacto", href: "/contacto" },
  ];
}

// Activo también en subrutas (/productos/chulepancakes marca "Productos").
export function esRutaActiva(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header({
  mostrarNovedades,
}: {
  mostrarNovedades: boolean;
}) {
  const pathname = usePathname();
  const navItems = getNavItems(mostrarNovedades);
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

  if (RUTAS_SIN_CABECERA.includes(pathname)) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8DCCB] bg-[#F3E7D3]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        {/* LOGO */}
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3"
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
          className="hidden items-center gap-5 md:flex lg:gap-8"
        >
          {navItems.map((item) => {
            const isActive = esRutaActiva(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm transition ${
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
            className="inline-flex min-h-11 items-center rounded-full bg-[#DDB45A] px-4 text-sm font-medium text-[#4A2E1F] shadow-sm transition motion-safe:hover:scale-[1.03] md:px-5"
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
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = esRutaActiva(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center text-base transition ${
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
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[#DDB45A] px-5 text-sm font-medium text-[#4A2E1F] shadow-sm"
            >
              Pedir ahora
            </WhatsAppLink>
          </nav>
        </div>
      )}
    </header>
  );
}