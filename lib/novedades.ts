// Novedades (anuncios, promociones, podcast, comunidad). Dirigido por datos:
// mientras `novedades` esté vacío, /novedades da 404 y no se enlaza en ningún sitio
// (cabecera, pie, inicio, /enlaces, sitemap). Al añadir un elemento, todo aparece solo.

export type TagNovedad = "producto" | "podcast" | "promocion" | "comunidad";

export type Novedad = {
  id: string;
  titulo: string;
  resumen: string;
  /** Fecha ISO (AAAA-MM-DD). */
  fecha: string;
  tag: TagNovedad;
  /** Ruta en public/ (se muestra a 200x140). */
  imagen?: string;
  /** Enlace interno o externo del artículo. */
  href?: string;
  promo?: {
    condiciones: string;
    /** Fecha ISO de fin (incluida). Sin fecha, la promo no vence. */
    vigenteHasta?: string;
  };
};

export const TAGS_NOVEDAD: Record<TagNovedad, string> = {
  producto: "Productos",
  podcast: "Podcast",
  promocion: "Promociones",
  comunidad: "Comunidad",
};

export const novedades: Novedad[] = [];

/** Novedades por fecha descendente, opcionalmente filtradas por etiqueta. */
export function getNovedades(tag?: TagNovedad): Novedad[] {
  return novedades
    .filter((novedad) => tag === undefined || novedad.tag === tag)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** La promoción más reciente que no haya vencido. */
export function getPromoVigente(): Novedad | undefined {
  const hoy = hoyISO();
  return getNovedades().find(
    (novedad) =>
      novedad.promo &&
      (!novedad.promo.vigenteHasta || novedad.promo.vigenteHasta >= hoy),
  );
}

export function tieneNovedades(): boolean {
  return novedades.length > 0;
}

/** "2026-10-04" -> "4 de octubre de 2026" */
export function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** TODO: copy por confirmar. */
export function mensajePromocion(promo: Novedad): string {
  return `Hola, quiero aprovechar la promoción: ${promo.titulo}.`;
}
