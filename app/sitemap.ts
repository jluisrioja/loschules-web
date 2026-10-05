import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Solo rutas con contenido. /nosotros queda fuera mientras sea un placeholder.
const routes = ["", "/productos", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${SITE_URL}${route}` }));
}
