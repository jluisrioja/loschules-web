import type { Metadata } from "next";
import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import WhatsAppLink from "@/components/WhatsAppLink";
import { getPromoVigente, tieneNovedades } from "@/lib/novedades";
import {
  INSTAGRAM_HANDLE,
  SPOTIFY_URL,
  WHATSAPP_MESSAGES,
} from "@/lib/site";

// Página para la bio de Instagram: sin cabecera ni pie del sitio (ver data-sin-cabecera).
export const metadata: Metadata = {
  title: "Enlaces",
  description: "Marca artesanal peruana para perros",
  robots: { index: false },
};

const boton =
  "flex min-h-14 w-full items-center justify-center rounded-full px-6 text-center text-base font-medium transition duration-200 motion-safe:hover:-translate-y-0.5";
const botonBorde = `${boton} border-2 border-[#4A2E1F] text-[#4A2E1F] hover:bg-white/60`;

export default function EnlacesPage() {
  const promo = getPromoVigente();

  return (
    <div
      data-sin-cabecera
      className="min-h-screen bg-[#F3E7D3] px-6 py-12 text-[#4A2E1F]"
    >
      <section className="mx-auto flex w-full max-w-[420px] flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#4A2E1F]/10 bg-[#F7EFE2]">
          <Image
            src="/logo.png"
            alt="Los Chules"
            width={1062}
            height={1054}
            sizes="96px"
            className="h-full w-full object-contain p-1"
            priority
          />
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Los Chules</h1>
        <p className="mt-2 text-base text-[#4A2E1F]/85">
          Marca artesanal peruana para perros
        </p>
        <p className="mt-1 text-sm text-[#4A2E1F]/80">@{INSTAGRAM_HANDLE}</p>

        {promo && (
          <TrackedLink
            href="/novedades"
            evento="enlaces_click"
            datos={{ destino: "promo" }}
            className="mt-8 block w-full rounded-[2rem] bg-[#DDB45A] p-6 text-left shadow-[0_14px_36px_rgba(74,46,31,0.12)] transition hover:opacity-95"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">
              Promoción vigente
            </span>
            <span className="mt-2 block text-lg font-semibold">{promo.titulo}</span>
          </TrackedLink>
        )}

        <ul className="mt-8 w-full space-y-4">
          <li>
            <TrackedLink
              href="/productos"
              evento="enlaces_click"
              datos={{ destino: "productos" }}
              className={`${boton} bg-[#DDB45A] text-[#4A2E1F] shadow-sm`}
            >
              Explorar productos
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={SPOTIFY_URL}
              evento="spotify_click"
              datos={{ origen: "enlaces" }}
              className={`${boton} bg-[#4A2E1F] text-[#F3E7D3] shadow-sm`}
            >
              Escuchar Guau, Qué Amor
            </TrackedLink>
          </li>
          <li>
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.info}
              origen="enlaces"
              className={botonBorde}
            >
              Hacer un pedido por WhatsApp
            </WhatsAppLink>
          </li>
          {tieneNovedades() && (
            <li>
              <TrackedLink
                href="/novedades"
                evento="enlaces_click"
                datos={{ destino: "novedades" }}
                className={botonBorde}
              >
                Novedades y promociones
              </TrackedLink>
            </li>
          )}
          <li>
            <TrackedLink
              href="/"
              evento="enlaces_click"
              datos={{ destino: "inicio" }}
              className={botonBorde}
            >
              Ir a loschules.com
            </TrackedLink>
          </li>
        </ul>
      </section>
    </div>
  );
}
