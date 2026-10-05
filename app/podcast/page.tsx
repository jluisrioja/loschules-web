import type { Metadata } from "next";
import Link from "next/link";
import PodcastPortada from "@/components/PodcastPortada";
import TrackedLink from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/metadata";
import { getLinea, listaNatural, nombresSabores } from "@/lib/productos";
import {
  APPLE_PODCASTS_URL,
  SPOTIFY_EMBED_URL,
  SPOTIFY_URL,
  YOUTUBE_URL,
} from "@/lib/site";

const TITULO = "Guau, Qué Amor: El Podcast";
const PRESENTACION =
  "¡Hola, humanos! Bienvenidos a Guau, Qué amor, donde los perros tomamos el micrófono.";

const DUPLA = [
  {
    nombre: "Chuletas",
    texto:
      "El calato peruano más feliz del universo. Juguetón, un poquito loco y una máquina industrial de dar besos con baba.",
  },
  {
    nombre: "Lobito",
    texto:
      "El chihuahua que gobierna la casa. Súper engreído, renegón profesional y el rey del drama.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: TITULO,
  url: SPOTIFY_URL,
  description: PRESENTACION,
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: TITULO, description: PRESENTACION });
}

// "ChulePancakes de plátano y de camote, y lo que viene." / "ChulePancakes de plátano y lo que viene."
function textoProductos() {
  const linea = getLinea("chulepancakes");
  if (!linea) return null;
  const sabores = nombresSabores(linea);
  const lista = listaNatural(sabores.map((sabor) => `de ${sabor}`));
  return `${linea.nombre} ${lista}${sabores.length > 1 ? "," : ""} y lo que viene.`;
}

const botonBorde =
  "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#4A2E1F] px-6 text-sm font-medium transition hover:bg-white/60";

export default function PodcastPage() {
  const productos = textoProductos();

  return (
    <div className="bg-[#F3E7D3] text-[#4A2E1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-[360px_1fr] md:gap-14">
          <PodcastPortada size={360} className="mx-auto md:mx-0" />

          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-4 py-2 text-sm text-[#4A2E1F]/80 shadow-sm">
              Podcast
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {TITULO}
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#4A2E1F]/80">
              {PRESENTACION}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href={SPOTIFY_URL}
                evento="spotify_click"
                datos={{ origen: "podcast" }}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#DDB45A] px-6 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
              >
                Escuchar en Spotify
              </TrackedLink>

              {APPLE_PODCASTS_URL && (
                <TrackedLink
                  href={APPLE_PODCASTS_URL}
                  evento="apple_podcasts_click"
                  datos={{ origen: "podcast" }}
                  className={botonBorde}
                >
                  Apple Podcasts
                </TrackedLink>
              )}

              {YOUTUBE_URL && (
                <TrackedLink
                  href={YOUTUBE_URL}
                  evento="youtube_click"
                  datos={{ origen: "podcast" }}
                  className={botonBorde}
                >
                  YouTube
                </TrackedLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LA DUPLA */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          La dupla
        </h2>
        <p className="mt-3 text-lg text-[#4A2E1F]/80">Dos voces, un micrófono.</p>

        {/* TODO: sin fotos de Chuletas y Lobito; las tarjetas van sin imagen. */}
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {DUPLA.map((perro) => (
            <li
              key={perro.nombre}
              className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_10px_30px_rgba(74,46,31,0.05)]"
            >
              <h3 className="text-2xl font-semibold">{perro.nombre}</h3>
              <p className="mt-3 text-base leading-7 text-[#4A2E1F]/85">
                {perro.texto}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* EPISODIOS */}
      <section className="bg-[#F7EFE2]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Episodios
          </h2>

          <iframe
            src={SPOTIFY_EMBED_URL}
            title={`Reproductor de ${TITULO} en Spotify`}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="mt-8 block w-full rounded-[1.5rem] border-0"
          />
        </div>
      </section>

      {/* PRODUCTOS */}
      {productos && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="rounded-[2rem] bg-[#4A2E1F] px-8 py-12 text-center text-[#F3E7D3] shadow-[0_20px_55px_rgba(74,46,31,0.2)] md:px-12">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Mientras escuchas, conoce nuestros productos
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#F3E7D3]/85">
              {productos}
            </p>
            <Link
              href="/productos"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#DDB45A] px-6 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
            >
              Explorar productos
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
