import Link from "next/link";
import Image from "next/image";
import PodcastPortada from "@/components/PodcastPortada";
import TrackedLink from "@/components/TrackedLink";
import WhatsAppLink from "@/components/WhatsAppLink";
import { SITE_NAME, pageMetadata } from "@/lib/metadata";
import {
  TAGS_NOVEDAD,
  formatFecha,
  getNovedades,
  tieneNovedades,
} from "@/lib/novedades";
import {
  cantidadEnLetras,
  formatPrecio,
  getLinea,
  saboresActivos,
} from "@/lib/productos";
import { SPOTIFY_URL, WHATSAPP_MESSAGES } from "@/lib/site";

const DESCRIPCION =
  "Productos artesanales, el podcast de Chuletas y Lobito y las novedades de la familia.";

// El template del layout no se aplica a su propio segmento: el título lleva la marca explícita.
export const metadata = pageMetadata({
  title: `Marca artesanal peruana para perros | ${SITE_NAME}`,
  description: DESCRIPCION,
});

const botonDorado =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[#DDB45A] px-6 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5";
const botonBorde =
  "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#4A2E1F] px-6 text-sm font-medium text-[#4A2E1F] transition duration-200 hover:bg-white/60 motion-safe:hover:-translate-y-0.5";
const enlaceFlecha =
  "inline-flex min-h-11 items-center text-sm font-semibold text-[#4A2E1F] underline-offset-4 hover:underline";

/* ICONOS (decorativos) */
const iconoProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconoBolsa() {
  return (
    <svg {...iconoProps}>
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function IconoMicrofono() {
  return (
    <svg {...iconoProps}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

function IconoMegafono() {
  return (
    <svg {...iconoProps}>
      <path d="M3 10v4h4l7 4V6l-7 4H3Z" />
      <path d="M18 9a4 4 0 0 1 0 6" />
    </svg>
  );
}

function IconoEnlace() {
  return (
    <svg {...iconoProps}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </svg>
  );
}

export default function HomePage() {
  const linea = getLinea("chulepancakes");
  const sabores = linea ? saboresActivos(linea) : [];
  const conNovedades = tieneNovedades();
  const ultimas = getNovedades().slice(0, 3);

  const puertas = [
    {
      titulo: "Productos",
      color: "bg-[#DDB45A]",
      icono: <IconoBolsa />,
      texto:
        linea && sabores.length > 1
          ? `${linea.nombre} en ${cantidadEnLetras(sabores.length)} sabores y lo que viene.`
          : `${linea?.nombre ?? "ChulePancakes"} y lo que viene.`,
      enlace: "Ver productos",
      href: "/productos",
    },
    {
      titulo: "Podcast",
      color: "bg-[#F28C28]",
      icono: <IconoMicrofono />,
      texto: "Guau, Qué Amor: los perros toman el micrófono.",
      enlace: "Escuchar",
      href: "/podcast",
    },
    ...(conNovedades
      ? [
          {
            titulo: "Novedades",
            color: "bg-[#8E8BB0]",
            icono: <IconoMegafono />,
            texto: "Anuncios, promociones y difusión.",
            enlace: "Ver novedades",
            href: "/novedades",
          },
        ]
      : []),
    {
      titulo: "Enlaces",
      color: "bg-[#E8DCCB]",
      icono: <IconoEnlace />,
      texto: "Instagram, Spotify y WhatsApp en un solo toque.",
      enlace: "Ver enlaces",
      href: "/enlaces",
    },
  ];

  return (
    <div className="bg-[#F3E7D3] text-[#4A2E1F]">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-4 py-2 text-sm text-[#4A2E1F]/80 shadow-sm">
              Marca artesanal peruana para perros
            </p>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Todo el mundo de Los Chules, en un solo lugar
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4A2E1F]/80">
              {DESCRIPCION}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/productos" className={botonDorado}>
                Explorar productos
              </Link>
              <Link href="/podcast" className={botonBorde}>
                Escuchar el podcast
              </Link>
            </div>
          </div>

          {/* Reutiliza el bloque del logo de la home anterior */}
          <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/45 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]">
            <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] bg-[#F7EFE2] p-8 md:min-h-[420px]">
              <Image
                src="/logo.png"
                alt="Los Chules"
                width={1062}
                height={1054}
                sizes="(min-width: 768px) 320px, calc(100vw - 112px)"
                className="mx-auto h-auto w-full max-w-[320px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ECOSISTEMA */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-24">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Explora el ecosistema
        </h2>
        <p className="mt-3 text-lg text-[#4A2E1F]/80">
          Cuatro puertas de entrada, una sola marca.
        </p>

        <ul
          className={`mt-8 grid grid-cols-2 gap-4 md:gap-6 ${
            puertas.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {puertas.map((puerta) => (
            <li
              key={puerta.href}
              className="flex flex-col rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-5 shadow-[0_8px_24px_rgba(74,46,31,0.04)] md:p-6"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-[#4A2E1F] ${puerta.color}`}
              >
                {puerta.icono}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{puerta.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#4A2E1F]/85">
                {puerta.texto}
              </p>
              <Link href={puerta.href} className={`${enlaceFlecha} mt-3`}>
                {puerta.enlace}
                <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* PRODUCTOS */}
      {linea && sabores.length > 0 && (
        <section
          id="productos"
          className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-16 md:px-10 md:pb-24"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Nuestros productos
              </h2>
              <p className="mt-3 text-lg text-[#4A2E1F]/80">
                {`Línea ${linea.nombre}: ${cantidadEnLetras(sabores.length)} ${
                  sabores.length === 1 ? "sabor" : "sabores"
                } por ahora, y más por venir.`}
              </p>
            </div>
            <Link href="/productos" className={enlaceFlecha}>
              Ver todos los productos<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {sabores.map((sabor) => (
              <li
                key={sabor.id}
                className="flex flex-col rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]"
              >
                <div className="flex items-center justify-center rounded-[1.5rem] bg-[#F7EFE2] p-5">
                  <Image
                    src={sabor.imagen ?? linea.portada.src}
                    alt={linea.portada.alt}
                    width={linea.portada.width}
                    height={linea.portada.height}
                    sizes="200px"
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>
                <p className="mt-5 text-sm font-medium text-[#4A2E1F]/80">
                  {linea.nombre}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{sabor.nombre}</h3>
                <p className="mt-2 text-base text-[#4A2E1F]/85">
                  {`${sabor.descripcion} ${sabor.presentacion}.`}
                </p>
                <p className="mt-3 flex-1 text-base font-semibold">
                  {formatPrecio(sabor.precio)} + delivery
                </p>
                <Link
                  href={`/productos/${linea.slug}?sabor=${sabor.id}`}
                  className={`${botonBorde} mt-5`}
                >
                  Ver detalle
                </Link>
              </li>
            ))}

            <li className="flex min-h-48 items-center justify-center rounded-[2rem] border-2 border-dashed border-[#4A2E1F]/25 p-8 text-center text-base font-medium text-[#4A2E1F]/80">
              Próximamente: nuevos sabores y productos
            </li>
          </ul>
        </section>
      )}

      {/* PODCAST */}
      <section className="bg-[#4A2E1F] text-[#F3E7D3]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[280px_1fr] md:px-10 md:py-20">
          <PodcastPortada size={280} className="mx-auto md:mx-0" />

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#F3E7D3]/85">
              El podcast
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Guau, Qué Amor
            </h2>
            <p className="mt-5 text-base leading-7 text-[#F3E7D3]/85 md:text-lg">
              Aquí los perros toman el micrófono: Chuletas y Lobito cuentan sus
              locuras familiares desde la perspectiva de cuatro patas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href={SPOTIFY_URL}
                evento="spotify_click"
                datos={{ origen: "inicio" }}
                className={botonDorado}
              >
                Escuchar en Spotify
              </TrackedLink>
              <Link
                href="/podcast"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#F3E7D3] px-6 text-sm font-medium text-[#F3E7D3] transition duration-200 hover:bg-white/10 motion-safe:hover:-translate-y-0.5"
              >
                Conocer a la dupla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOVEDADES */}
      {conNovedades && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Novedades
            </h2>
            <Link href="/novedades" className={enlaceFlecha}>
              Ver todas<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {ultimas.map((novedad) => (
              <li
                key={novedad.id}
                className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6"
              >
                <p className="inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#4A2E1F]/80">
                  {TAGS_NOVEDAD[novedad.tag]}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{novedad.titulo}</h3>
                <p className="mt-2 text-sm text-[#4A2E1F]/80">
                  <time dateTime={novedad.fecha}>{formatFecha(novedad.fecha)}</time>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PEDIDO */}
      <section className="bg-[#DDB45A]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14 md:px-10">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Haz tu pedido por WhatsApp
          </h2>
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.info}
            origen="inicio"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4A2E1F] px-7 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
          >
            Pedir ahora
          </WhatsAppLink>
        </div>
      </section>
    </div>
  );
}
