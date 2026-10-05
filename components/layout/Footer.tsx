"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TrackedLink from "@/components/TrackedLink";
import { RUTAS_SIN_CABECERA, esRutaActiva } from "@/components/layout/Header";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const enlace =
  "inline-flex min-h-11 items-center text-sm text-[#4A2E1F]/85 underline-offset-4 transition hover:text-[#4A2E1F] hover:underline";

export default function Footer({
  mostrarNovedades,
}: {
  mostrarNovedades: boolean;
}) {
  const pathname = usePathname();
  if (RUTAS_SIN_CABECERA.includes(pathname)) return null;

  const items = [
    { label: "Productos", href: "/productos" },
    { label: "Podcast", href: "/podcast" },
    ...(mostrarNovedades ? [{ label: "Novedades", href: "/novedades" }] : []),
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <footer
      className={`border-t border-[#E8DCCB] bg-[#F7EFE2] text-[#4A2E1F] ${
        // Las páginas de línea tienen barra fija inferior por debajo de lg: que no tape el pie.
        pathname.startsWith("/productos/") ? "pb-24 lg:pb-0" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-8 md:px-10">
        <p className="text-base font-semibold tracking-tight">Los Chules</p>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    esRutaActiva(pathname, item.href) ? "page" : undefined
                  }
                  className={enlace}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <TrackedLink
          href={INSTAGRAM_URL}
          evento="instagram_click"
          datos={{ origen: "pie" }}
          className={enlace}
        >
          {`Instagram @${INSTAGRAM_HANDLE}`}
        </TrackedLink>
      </div>
    </footer>
  );
}
