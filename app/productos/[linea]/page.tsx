import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import WhatsAppLink from "@/components/WhatsAppLink";
import { SITE_NAME, pageMetadata } from "@/lib/metadata";
import {
  CATEGORIAS,
  formatPrecio,
  getLinea,
  getLineas,
  getSabor,
  nombreProducto,
  saboresActivos,
  type Linea,
  type SaborActivo,
} from "@/lib/productos";
import {
  INSTAGRAM_URL,
  SITE_URL,
  TEL_URL,
  WHATSAPP_DISPLAY,
  mensajePedido,
} from "@/lib/site";

type Props = {
  params: Promise<{ linea: string }>;
  searchParams: Promise<{ sabor?: string | string[] }>;
};

function primero(valor: string | string[] | undefined) {
  return Array.isArray(valor) ? valor[0] : valor;
}

// Línea + sabor seleccionado. Un ?sabor inválido o inactivo cae al primer sabor activo.
async function resolver({ params, searchParams }: Props) {
  const linea = getLinea((await params).linea);
  if (!linea) return null;
  const sabor = getSabor(linea, primero((await searchParams).sabor));
  if (!sabor) return null;
  return { linea, sabor };
}

function descripcionSabor(sabor: SaborActivo) {
  return `${sabor.descripcion} ${sabor.presentacion}.`;
}

function jsonLd(linea: Linea) {
  const activos = saboresActivos(linea);
  const url = `${SITE_URL}/productos/${linea.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "Product",
        name: linea.nombre,
        description: activos.map(descripcionSabor).join(" "),
        image: `${SITE_URL}${linea.portada.src}`,
        url,
        brand: { "@id": `${SITE_URL}/#organization` },
        offers: activos.map((sabor) => ({
          "@type": "Offer",
          name: nombreProducto(linea, sabor),
          price: String(sabor.precio),
          priceCurrency: "PEN",
          url: `${url}?sabor=${sabor.id}`,
        })),
      },
    ],
  };
}

export function generateStaticParams() {
  return getLineas().map((linea) => ({ linea: linea.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const datos = await resolver(props);
  if (!datos) return {};
  const { linea, sabor } = datos;

  return {
    ...pageMetadata({
      title: nombreProducto(linea, sabor),
      description: descripcionSabor(sabor),
    }),
    alternates: { canonical: `/productos/${linea.slug}` },
  };
}

export default async function LineaPage(props: Props) {
  const datos = await resolver(props);
  if (!datos) notFound();
  const { linea, sabor } = datos;

  const activos = saboresActivos(linea);
  const nombre = nombreProducto(linea, sabor);
  const mensaje = mensajePedido(linea, sabor);
  const precio = formatPrecio(sabor.precio);
  const imagen = sabor.imagen
    ? { ...linea.portada, src: sabor.imagen, alt: nombre }
    : linea.portada;
  const listaSabores = activos.map((item, i) =>
    i === 0 ? item.nombre : item.nombre.toLocaleLowerCase("es"),
  );

  return (
    <div className="bg-[#F3E7D3] text-[#4A2E1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(linea)).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        {/* MIGAS */}
        <nav aria-label="Ruta de navegación" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[#4A2E1F]/80">
            <li>
              <Link
                href="/productos"
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                Productos
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#4A2E1F]">
              {linea.nombre}
            </li>
          </ol>
        </nav>

        {/* PRODUCTO */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* GALERÍA */}
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]">
              <div className="flex items-center justify-center rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <Image
                  src={imagen.src}
                  alt={imagen.alt}
                  width={imagen.width}
                  height={imagen.height}
                  sizes="(max-width: 524px) calc(100vw - 144px), 380px"
                  className="h-auto w-full max-w-[380px] object-contain"
                  priority
                />
              </div>
            </div>

            {linea.galeria.length > 0 && (
              <ul className="grid gap-5 sm:grid-cols-2">
                {linea.galeria.map((foto) => (
                  <li
                    key={foto.src}
                    className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-4 shadow-[0_10px_24px_rgba(74,46,31,0.05)]"
                  >
                    <div className="flex items-center justify-center rounded-[1.25rem] bg-[#F7EFE2] p-4">
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        width={foto.width}
                        height={foto.height}
                        sizes="220px"
                        className="h-auto w-full max-w-[220px] object-contain transition duration-200 motion-safe:hover:scale-[1.03]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* INFO */}
          <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_14px_36px_rgba(74,46,31,0.08)] md:p-10">
            <p className="inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#4A2E1F]/80">
              {CATEGORIAS[linea.categoria]}
            </p>

            {sabor.logotipo && (
              <Image
                src={sabor.logotipo.src}
                alt={sabor.logotipo.alt}
                width={sabor.logotipo.width}
                height={sabor.logotipo.height}
                className="mt-6 h-auto w-full max-w-[320px] object-contain"
              />
            )}

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {nombre}
            </h1>

            <p className="mt-3 text-lg text-[#4A2E1F]/85">Hechos en casa 🐾</p>

            {/* SELECTOR DE SABOR */}
            {activos.length > 1 && (
              <div role="group" aria-label="Sabor" className="mt-6 flex flex-wrap gap-3">
                {activos.map((item) => {
                  const activo = item.id === sabor.id;

                  return (
                    <Link
                      key={item.id}
                      href={`?sabor=${item.id}`}
                      replace
                      scroll={false}
                      aria-current={activo ? "page" : undefined}
                      className={`inline-flex min-h-12 items-center rounded-full border-2 border-[#4A2E1F] px-6 text-base font-medium transition ${
                        activo
                          ? "bg-[#4A2E1F] text-[#F3E7D3]"
                          : "text-[#4A2E1F] hover:bg-white/60"
                      }`}
                    >
                      {item.nombre}
                    </Link>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-lg text-[#4A2E1F]/85">
              {descripcionSabor(sabor)}
            </p>

            <div className="mt-6">
              <p className="text-6xl font-semibold tracking-tight">{precio}</p>
              <p className="mt-2 text-base text-[#4A2E1F]/75">+ delivery</p>
            </div>

            <div className="mt-8">
              <WhatsAppLink
                message={mensaje}
                origen={`producto-${linea.slug}`}
                sabor={sabor.id}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#DDB45A] px-7 text-base font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
              >
                Pedir por WhatsApp
              </WhatsAppLink>
              <p className="mt-3 text-sm text-[#4A2E1F]/80">Pago por Yape.</p>
            </div>

            {/* MENSAJE */}
            <div className="mt-8 rounded-[1.5rem] bg-[#F7EFE2] p-6">
              <h2 className="text-base font-semibold">
                Así llegará tu pedido a WhatsApp
              </h2>
              <p className="mt-3 whitespace-pre-line rounded-[1rem] bg-white/70 p-4 text-sm leading-6">
                {mensaje}
              </p>
              <p className="mt-3 text-sm text-[#4A2E1F]/80">
                Completas tus datos antes de enviarlo.
              </p>
            </div>
          </div>
        </div>

        {/* HISTORIA */}
        <div className="mt-16 rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_14px_36px_rgba(74,46,31,0.08)] md:p-10">
          <p className="max-w-3xl text-lg leading-8 text-[#4A2E1F]/80">
            Empezamos con ChulePancakes de plátano, hechos en casa y pensados
            para compartir un momento especial.
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-[#DDB45A]/25 p-6">
            <p className="text-sm leading-7 text-[#4A2E1F]/85">
              Nuestro primer lanzamiento está inspirado en la misma idea que dio
              origen a Los Chules: compartir momentos simples, ricos y
              especiales con quienes nos acompañan cada día.
            </p>
          </div>
        </div>

        {/* COMO PEDIR */}
        <div className="mt-16 rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_14px_36px_rgba(74,46,31,0.08)] md:p-10">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Cómo pedir
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <ol className="space-y-6">
              {[
                {
                  titulo: "Elige el sabor",
                  texto: `${listaSabores.join(" o ")}, en esta misma página.`,
                },
                {
                  titulo: "Envía el mensaje por WhatsApp",
                  texto:
                    "Llega con el producto y el sabor; solo completas nombre, cantidad y dirección.",
                },
                {
                  titulo: "Paga por Yape",
                  texto: "El delivery se suma al precio del producto.",
                },
              ].map((paso, i) => (
                <li key={paso.titulo} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4A2E1F] text-base font-semibold text-[#F3E7D3]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{paso.titulo}</h3>
                    <p className="mt-1 text-base text-[#4A2E1F]/85">
                      {paso.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="space-y-5">
              <div className="rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <p className="text-lg text-[#4A2E1F]/85">
                  Escríbenos por WhatsApp
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  <a
                    href={TEL_URL}
                    className="inline-flex min-h-11 items-center hover:underline"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <h3 className="text-lg font-semibold">Pago y entrega</h3>
                <div className="mt-4 space-y-3 text-base text-[#4A2E1F]/85">
                  <p>Pago por Yape 💜</p>
                  <p>(al mismo número)</p>
                  <p>+ delivery</p>
                  <p>Tiempo de entrega: 1 día</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CIERRE */}
        <div className="mt-16 rounded-[2rem] bg-[#4A2E1F] px-8 py-12 text-center text-[#F3E7D3] shadow-[0_20px_55px_rgba(74,46,31,0.2)] md:px-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            ChulePancakes, hechos con amor <span aria-hidden="true">🐾</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F3E7D3]/80 md:text-base">
            Nuestro primer producto ya está aquí. Escríbenos y haz tu pedido.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppLink
              message={mensaje}
              origen="cierre"
              sabor={sabor.id}
              className="inline-flex min-h-11 items-center rounded-full bg-[#DDB45A] px-6 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02]"
            >
              Pedir ahora
            </WhatsAppLink>

            <Link
              href="/contacto"
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-6 text-sm font-medium transition duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contacto
            </Link>
          </div>
        </div>

        <p className="mt-10">
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center rounded-full border-2 border-[#4A2E1F] px-5 text-sm font-medium transition hover:bg-white/60"
          >
            ← Ver todos los productos
          </Link>
        </p>

        {/* Reserva el alto de la barra fija para que no tape el final */}
        <div aria-hidden="true" className="h-20 lg:hidden" />
      </section>

      {/* BARRA FIJA MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DCCB] bg-[#F3E7D3]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">{nombre}</p>
            <p className="text-sm text-[#4A2E1F]/80">{precio} + delivery</p>
          </div>

          <WhatsAppLink
            message={mensaje}
            origen="barra-productos"
            sabor={sabor.id}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#DDB45A] px-5 text-sm font-medium text-[#4A2E1F] shadow-sm"
          >
            Pedir por WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
