import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import {
  CATEGORIAS,
  formatPrecio,
  getLineas,
  saboresActivos,
  type Categoria,
  type Linea,
} from "@/lib/productos";

type Filtro = "todo" | Categoria;

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "comida", label: CATEGORIAS.comida },
  { id: "otros", label: CATEGORIAS.otros },
];

// Una categoría desconocida (o ausente) se trata como "todo".
function parseFiltro(valor: string | string[] | undefined): Filtro {
  return valor === "comida" || valor === "otros" ? valor : "todo";
}

const NUMEROS = ["", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis"];

function listaNatural(items: string[]) {
  return items.length <= 1
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

// "Sabor: plátano" o "Dos sabores: plátano y camote"
function subtituloSabores(linea: Linea) {
  const nombres = saboresActivos(linea).map((sabor) =>
    sabor.nombre.toLocaleLowerCase("es"),
  );
  if (nombres.length === 1) return `Sabor: ${nombres[0]}`;
  const cantidad = NUMEROS[nombres.length] ?? String(nombres.length);
  return `${cantidad} sabores: ${listaNatural(nombres)}`;
}

type Props = {
  searchParams: Promise<{ categoria?: string | string[] }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Productos",
    description: "Productos artesanales para perros.",
  });
}

export default async function ProductosPage({ searchParams }: Props) {
  const filtro = parseFiltro((await searchParams).categoria);
  const lineas = getLineas(filtro === "todo" ? undefined : filtro);

  return (
    <div className="bg-[#F3E7D3] text-[#4A2E1F]">
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        {/* ENCABEZADO */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Productos
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#4A2E1F]/80">
            Productos artesanales para perros.
          </p>
        </div>

        {/* FILTRO */}
        <nav aria-label="Categorías" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {FILTROS.map((item) => {
              const activo = item.id === filtro;

              return (
                <li key={item.id}>
                  <Link
                    href={`/productos?categoria=${item.id}`}
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

        {/* LÍNEAS */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lineas.map((linea) => (
            <li
              key={linea.slug}
              className="flex flex-col rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]"
            >
              <div className="flex items-center justify-center rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <Image
                  src={linea.portada.src}
                  alt={linea.portada.alt}
                  width={linea.portada.width}
                  height={linea.portada.height}
                  sizes="240px"
                  className="h-auto w-full max-w-[240px] object-contain"
                  priority
                />
              </div>

              <p className="mt-6 inline-flex self-start rounded-full border border-[#4A2E1F]/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#4A2E1F]/80">
                {CATEGORIAS[linea.categoria]}
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                {linea.nombre}
              </h2>

              <p className="mt-1 text-base text-[#4A2E1F]/80">
                {subtituloSabores(linea)}
              </p>

              <ul className="mt-5 divide-y divide-[#4A2E1F]/10 border-y border-[#4A2E1F]/10">
                {saboresActivos(linea).map((sabor) => (
                  <li
                    key={sabor.id}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-medium">{sabor.nombre}</span>
                    <span className="text-[#4A2E1F]/85">
                      {formatPrecio(sabor.precio)} + delivery
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/productos/${linea.slug}`}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#DDB45A] px-6 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5"
              >
                Ver {linea.nombre}
              </Link>
            </li>
          ))}

          {/* PRÓXIMAMENTE */}
          {filtro !== "otros" && (
            <li className="flex min-h-48 items-center justify-center rounded-[2rem] border-2 border-dashed border-[#4A2E1F]/25 p-8 text-center text-base font-medium text-[#4A2E1F]/80">
              Próximamente: nuevos sabores de comida
            </li>
          )}

          {filtro !== "comida" && (
            <li className="flex min-h-48 items-center justify-center rounded-[2rem] border-2 border-dashed border-[#4A2E1F]/25 p-8 text-center text-base font-medium text-[#4A2E1F]/80">
              Próximamente: productos que no son comida
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
