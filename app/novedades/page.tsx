import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import TrackedLink from "@/components/TrackedLink";
import WhatsAppLink from "@/components/WhatsAppLink";
import { pageMetadata } from "@/lib/metadata";
import {
  TAGS_NOVEDAD,
  formatFecha,
  getNovedades,
  getPromoVigente,
  mensajePromocion,
  tieneNovedades,
  type TagNovedad,
} from "@/lib/novedades";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SPOTIFY_URL,
  WHATSAPP_MESSAGES,
} from "@/lib/site";

type Filtro = "todo" | TagNovedad;

type Props = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

// Solo se ofrecen las etiquetas con elementos; cualquier otro valor equivale a "todo".
function tagsConContenido(): TagNovedad[] {
  const presentes = new Set(getNovedades().map((novedad) => novedad.tag));
  return (Object.keys(TAGS_NOVEDAD) as TagNovedad[]).filter((tag) =>
    presentes.has(tag),
  );
}

function parseFiltro(valor: string | string[] | undefined): Filtro {
  return tagsConContenido().find((tag) => tag === valor) ?? "todo";
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...pageMetadata({
      title: "Novedades",
      description: "Anuncios, promociones y lo último de Los Chules.",
    }),
    robots: { index: tieneNovedades() },
  };
}

const fila =
  "flex min-h-12 items-center justify-between gap-4 px-5 text-sm font-medium transition hover:bg-white/60";

export default async function NovedadesPage({ searchParams }: Props) {
  if (!tieneNovedades()) notFound();

  const filtro = parseFiltro((await searchParams).tag);
  const lista = getNovedades(filtro === "todo" ? undefined : filtro);
  const promo = getPromoVigente();
  const filtros: { id: Filtro; label: string }[] = [
    { id: "todo", label: "Todo" },
    ...tagsConContenido().map((tag) => ({ id: tag, label: TAGS_NOVEDAD[tag] })),
  ];

  return (
    <div className="bg-[#F3E7D3] text-[#4A2E1F]">
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Novedades
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#4A2E1F]/80">
            Anuncios, promociones y lo último de Los Chules.
          </p>
        </div>

        {/* FILTRO */}
        <nav aria-label="Etiquetas" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {filtros.map((item) => {
              const activo = item.id === filtro;

              return (
                <li key={item.id}>
                  <Link
                    href={`/novedades?tag=${item.id}`}
                    scroll={false}
                    aria-current={activo ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border-2 border-[#4A2E1F] px-5 text-sm font-medium transition ${
                      activo
                        ? "bg-[#4A2E1F] text-[#F3E7D3]"
                        : "text-[#4A2E1F] hover:bg-white/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 flex flex-wrap items-start gap-8">
          {/* PRINCIPAL */}
          <div className="min-w-0 flex-[1_1_480px] space-y-6">
            {promo?.promo && (
              <div className="rounded-[2rem] bg-[#DDB45A] p-8 shadow-[0_14px_36px_rgba(74,46,31,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Promoción vigente
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{promo.titulo}</h2>
                <p className="mt-3 text-base leading-7">{promo.promo.condiciones}</p>
                {promo.promo.vigenteHasta && (
                  <p className="mt-2 text-sm">
                    {/* TODO: copy por confirmar */}
                    Vigente hasta el{" "}
                    <time dateTime={promo.promo.vigenteHasta}>
                      {formatFecha(promo.promo.vigenteHasta)}
                    </time>
                  </p>
                )}
                <WhatsAppLink
                  message={mensajePromocion(promo)}
                  origen="novedades-promo"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#4A2E1F] px-6 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
                >
                  Aprovechar por WhatsApp
                </WhatsAppLink>
              </div>
            )}

            <ul className="space-y-6">
              {lista.map((novedad) => {
                const contenido = (
                  <>
                    <p className="inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#4A2E1F]/80">
                      {TAGS_NOVEDAD[novedad.tag]}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold">{novedad.titulo}</h3>
                    <p className="mt-2 text-base leading-7 text-[#4A2E1F]/85">
                      {novedad.resumen}
                    </p>
                    <p className="mt-3 text-sm text-[#4A2E1F]/80">
                      <time dateTime={novedad.fecha}>{formatFecha(novedad.fecha)}</time>
                    </p>
                  </>
                );

                return (
                  <li
                    key={novedad.id}
                    className="flex flex-wrap gap-6 rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_10px_30px_rgba(74,46,31,0.05)]"
                  >
                    {novedad.imagen && (
                      <Image
                        src={novedad.imagen}
                        alt=""
                        width={200}
                        height={140}
                        sizes="200px"
                        className="h-[140px] w-[200px] shrink-0 rounded-[1.25rem] object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-[1_1_220px]">
                      {novedad.href ? (
                        <TrackedLink
                          href={novedad.href}
                          evento="novedad_click"
                          datos={{ id: novedad.id }}
                          className="block rounded-[1rem] hover:underline"
                        >
                          {contenido}
                        </TrackedLink>
                      ) : (
                        contenido
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ASIDE */}
          <aside className="w-full md:w-[300px] md:flex-none">
            <div className="overflow-hidden rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 shadow-[0_10px_30px_rgba(74,46,31,0.05)]">
              <h2 className="px-5 pb-3 pt-6 text-lg font-semibold">Enlaces</h2>
              <ul className="divide-y divide-[#4A2E1F]/10 border-t border-[#4A2E1F]/10">
                <li>
                  <TrackedLink
                    href={INSTAGRAM_URL}
                    evento="instagram_click"
                    datos={{ origen: "novedades" }}
                    className={fila}
                  >
                    Instagram @{INSTAGRAM_HANDLE}
                    <span aria-hidden="true">→</span>
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    href={SPOTIFY_URL}
                    evento="spotify_click"
                    datos={{ origen: "novedades" }}
                    className={fila}
                  >
                    Guau, Qué Amor en Spotify
                    <span aria-hidden="true">→</span>
                  </TrackedLink>
                </li>
                <li>
                  <WhatsAppLink
                    message={WHATSAPP_MESSAGES.info}
                    origen="novedades"
                    className={fila}
                  >
                    Pedidos por WhatsApp
                    <span aria-hidden="true">→</span>
                  </WhatsAppLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
