import type { MetadataRoute } from "next";
import { tieneNovedades } from "@/lib/novedades";
import { getLineas } from "@/lib/productos";
import { SITE_URL } from "@/lib/site";

// Solo rutas indexables con contenido. Fuera: /nosotros (placeholder) y /enlaces (noindex).
// /novedades entra solo cuando hay novedades.
const routes = [
  "",
  "/productos",
  ...getLineas().map((linea) => `/productos/${linea.slug}`),
  "/podcast",
  ...(tieneNovedades() ? ["/novedades"] : []),
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${SITE_URL}${route}` }));
}
