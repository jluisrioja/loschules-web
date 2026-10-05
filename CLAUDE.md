# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web de **Los Chules** (www.loschules.com), marca artesanal peruana para perros inspirada en "Chuletas" y "Lobito". El sitio reúne todo el ecosistema de la marca:

- **Productos:** línea ChulePancakes; hoy está activo el sabor plátano (avena y plátano, pack de 6, S/ 18 + delivery).
- **Podcast:** *Guau, Qué Amor*.
- **Novedades:** anuncios y promociones, dirigidas por datos.
- **Enlaces:** página para la bio de Instagram.

No hay carrito ni backend: todo pedido se deriva a WhatsApp y el pago es por Yape. Todo el contenido visible está en español (`<html lang="es">`).

## Stack

- Next.js 16.3.8 (App Router; estáticas `○` salvo `/productos` y `/productos/[linea]`, dinámicas `ƒ` porque leen `searchParams`) · React 19.2.3 · TypeScript 5 (`strict`)
- Tailwind CSS v4 vía `@tailwindcss/postcss` (sin `tailwind.config`; se configura con `@import "tailwindcss"` en [app/globals.css](app/globals.css))
- ESLint 9 flat config con `eslint-config-next` (core-web-vitals + typescript)
- Fuente Poppins vía `next/font/google` (pesos 400–700), expuesta como `--font-poppins`
- Vercel Web Analytics (`@vercel/analytics`)
- Gestor de paquetes: npm. Node 22 (`.nvmrc`); `engines.node >=20.9` (mínimo de Next 16).

## Comandos

```bash
npm install        # instalar
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npx tsc --noEmit   # chequeo de tipos (no hay script dedicado)
```

No hay tests ni framework de testing configurado. Next 16 ya no ejecuta ESLint dentro de `next build`. El CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) ejecuta en cada PR `npm run lint`, `npx next typegen` y `npx tsc --noEmit`; `typegen` es necesario porque `next-env.d.ts` no está versionado.

Si `tsc` falla con referencias a rutas que ya no existen (`.next/types/validator.ts`), son tipos generados obsoletos: borrar `.next/` y volver a ejecutar. Solo puede haber un `next dev` por proyecto a la vez.

**Despliegue:** Vercel, confirmado por las cabeceras de producción (`Server: Vercel`, región `gru1`). No hay `vercel.json`. El dominio canónico es `https://www.loschules.com`; el apex `loschules.com` redirige a `www` con un **307**. Cambiarlo a 308 es tarea del dashboard de Vercel → Domains. La configuración del proyecto en Vercel (rama de producción, versión de Node, plan) sigue POR CONFIRMAR.

## Arquitectura

- [app/layout.tsx](app/layout.tsx) renderiza, en este orden:
  - el JSON-LD `Organization` global (`@id` `https://www.loschules.com/#organization`);
  - `<SkipLink />`;
  - `<Header mostrarNovedades />` fijo;
  - **un único** `<main id="contenido" className="pt-52 md:pt-56">`, cuyo padding (208/224 px) compensa la cabecera y es el único padding superior: las páginas usan `<div>`/`<section>` sin `pt-*` inicial;
  - `<Footer mostrarNovedades />` y `<Analytics />`.

  También declara la metadata global: `metadataBase`, `title.template`, canonical `./`, Open Graph y Twitter.
- **Rutas sin cabecera ni pie:** `RUTAS_SIN_CABECERA` en [Header.tsx](components/layout/Header.tsx) (hoy solo `/enlaces`). `Header` y `Footer` no se renderizan ahí. La página marca su contenedor con `data-sin-cabecera` y el `<main>` quita el padding con `has-[[data-sin-cabecera]]:pt-0`.
- **Rutas:**
  - `/`: inicio (hero, "Explora el ecosistema", productos, banda del podcast, novedades condicionales, banda de pedido).
  - `/productos` y `/productos/[linea]`: ver **Productos**.
  - `/podcast`: ver **Podcast**.
  - `/novedades`: ver **Novedades**. Da 404 mientras no haya contenido.
  - `/enlaces`: página para la bio de Instagram. Lleva `noindex` y está fuera del sitemap.
  - `/contacto`.
  - `/nosotros`: placeholder con `noindex`, fuera de la navegación, del inicio y del sitemap.
  - `app/not-found.tsx`: 404 en español.
  - `robots.ts`: permite todo y apunta al sitemap.
  - `sitemap.ts`: `/`, `/productos`, una URL por línea, `/podcast`, `/novedades` (solo si `tieneNovedades()`) y `/contacto`. Nunca `/enlaces` ni `/nosotros`.
  - `opengraph-image.tsx`, `icon.tsx` y `apple-icon.tsx` generan imágenes en build a partir de `public/logo.png` mediante [lib/logo-image.tsx](lib/logo-image.tsx).
- [lib/site.ts](lib/site.ts) es la **fuente única de datos de contacto**:
  - `SITE_URL`.
  - Número de WhatsApp y sus formatos visibles, `TEL_URL` y `WHATSAPP_MESSAGES.info`.
  - Instagram (`INSTAGRAM_HANDLE`, `INSTAGRAM_URL`).
  - Podcast: `SPOTIFY_SHOW_ID`, `SPOTIFY_URL`, `SPOTIFY_EMBED_URL`, y `APPLE_PODCASTS_URL`/`YOUTUBE_URL` en `null` mientras no existan.
  - Helpers `whatsappUrl(mensaje)`, `mensajePedido(linea, sabor)` y `mensajePedidoUrl(linea, sabor)`.
  - No volver a escribir estos valores en páginas o componentes.
- [lib/metadata.ts](lib/metadata.ts) exporta `pageMetadata({ title, description })`. Úsalo en cada página: un `openGraph` definido en una página reemplaza entero al del layout (imagen incluida).
- **Componentes:**
  - [components/TrackedLink.tsx](components/TrackedLink.tsx) (cliente): enlace que registra `track(evento, datos)` al hacer clic. Las URL `http(s)` se abren con `target="_blank" rel="noopener noreferrer"`; las internas usan `next/link`. Es la única lógica de analítica de clics.
  - [components/WhatsAppLink.tsx](components/WhatsAppLink.tsx): todo enlace a WhatsApp debe usarlo. Envuelve `TrackedLink` con `evento="whatsapp_click"` y `{ origen, sabor? }`. `origen` ∈ `header | barra-productos | producto | cierre | contacto | inicio | enlaces | novedades | novedades-promo | producto-<slug>`.
  - [components/PodcastPortada.tsx](components/PodcastPortada.tsx): portada cuadrada del podcast. Hoy usa el logo (TODO).
  - [components/layout/Header.tsx](components/layout/Header.tsx) (cliente):
    - Navegación: Inicio, Productos, Podcast, Novedades (solo si hay) y Contacto.
    - El activo se calcula con `esRutaActiva`, así que "Productos" queda activo también en `/productos/<slug>`.
    - CTA "Pedir ahora" visible también en móvil.
    - Menú móvil asociado a la ruta en la que se abrió (se cierra al navegar), que también se cierra con Escape.
  - [components/layout/Footer.tsx](components/layout/Footer.tsx) (cliente, porque necesita la ruta):
    - Enlaces a Productos, Podcast, Novedades (condicional), Contacto e Instagram.
    - En `/productos/<slug>` añade padding inferior para que la barra fija no lo tape.
  - [components/layout/SkipLink.tsx](components/layout/SkipLink.tsx): mueve el foco a `#contenido` sin añadir un hash al historial.
- Imágenes de producto en `public/products/chulepancakes-platano/` (`cover.png`, `detail-N.png` de 1200×1600, `title.svg` de 1150×215). Declarar siempre las dimensiones reales y un `sizes` en `next/image`. El logo es `public/logo.png` (1062×1054).
- [next.config.ts](next.config.ts) define:
  - `turbopack.root`: conservarlo.
  - `images.formats`: AVIF y WebP.
  - `headers()`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY` y `Permissions-Policy`. Sin CSP. El iframe de Spotify funciona con estas cabeceras: la `Permissions-Policy` no restringe `autoplay`, `encrypted-media`, `fullscreen` ni `picture-in-picture`, y `X-Frame-Options` solo impide que *nuestras* páginas se incrusten en otros sitios.
- Alias de import: `@/*` → raíz del repo.

## Productos

- **Modelo** ([lib/productos.ts](lib/productos.ts)), fuente única de líneas, sabores y precios:
  - `Categoria = "comida" | "otros"` (etiquetas en `CATEGORIAS`).
  - `Linea { slug, nombre, categoria, portada, galeria, sabores }`: `portada` y `galeria` son imágenes con `src`, `alt` y dimensiones reales.
  - `Sabor { id, nombre, descripcion, precio, presentacion, imagen?, logotipo? }`, con `precio` en soles. `imagen` y `logotipo` son propios del sabor (el `title.svg` actual dice "Plátano").
  - Línea actual: `chulepancakes` (comida), con los sabores `platano` (S/ 18) y `camote` (descripción y precio `null`, POR CONFIRMAR).
- **Regla del sabor activo:** un sabor solo se muestra si tiene `descripcion` **y** `precio` (`saboresActivos`). Una línea sin sabores activos no aparece en el catálogo, ni en el sitemap, ni en el inicio, y su página da 404.
- **Helpers:**
  - `getLineas(categoria?)`, `getLinea(slug)` y `saboresActivos(linea)`.
  - `getSabor(linea, id)`: si el id es inválido o el sabor está inactivo, devuelve el primer sabor activo.
  - `nombreProducto(linea, sabor)` → "ChulePancakes de plátano"
  - `formatPrecio(18)` → "S/ 18"
  - Textos generados desde los sabores activos: `nombresSabores(linea)`, `textoSabores(linea)` → "plátano y camote", `listaNatural(items, conector?)` y `cantidadEnLetras(n)`. Los usan el inicio y `/podcast`.
- **`/productos` (catálogo):**
  - Filtro `?categoria=todo|comida|otros` con enlaces de servidor, sin JS. El activo lleva `aria-current`; un valor desconocido equivale a "todo".
  - Una tarjeta por línea, más las tarjetas discontinuas "Próximamente".
- **`/productos/[linea]`:**
  - `generateStaticParams` y `notFound()`.
  - Selector `?sabor=<id>` con `<Link replace scroll={false}>`, visible solo si hay más de un sabor activo.
  - Canonical sin query.
  - JSON-LD `Product` con un `Offer` por sabor activo y `brand` referenciando la `Organization` global.
  - Barra fija de WhatsApp por debajo de `lg`.
- **`mensajePedido(linea, sabor)`** ([lib/site.ts](lib/site.ts)) devuelve `"Hola, quiero pedir ChulePancakes de plátano.\nNombre:\nCantidad:\nDirección:"`, y `mensajePedidoUrl` su enlace `wa.me`. El mensaje genérico `WHATSAPP_MESSAGES.info` ("Hola, quiero información sobre Los Chules 🐶") se usa en el "Pedir ahora" de la cabecera, la banda final del inicio, `/contacto`, `/enlaces` y el aside de `/novedades`.

### Cómo activar el camote

1. En [lib/productos.ts](lib/productos.ts), en el sabor `camote`, rellena `descripcion` (p. ej. "Avena y camote.") y `precio` (número en soles). Con esos dos campos el sabor ya se activa en todo el sitio:
   - selector de sabor;
   - subtítulos ("Dos sabores…");
   - tarjetas del inicio;
   - JSON-LD;
   - mensaje de pedido "ChulePancakes de camote".
2. Añade sus imágenes propias en `public/products/` (por ejemplo, una carpeta nueva) y apúntalas en `imagen` y `logotipo` del sabor. Sin ellas se muestra la portada del plátano (la bolsa dice "Plátano") y sin logotipo.
3. Ejecuta `npm run lint`, `npx tsc --noEmit` y `npm run build`, y revisa `/productos/chulepancakes?sabor=camote`.

## Podcast

- `/podcast` ([app/podcast/page.tsx](app/podcast/page.tsx)) tiene estas secciones:
  - Hero con portada, "Escuchar en Spotify" y los botones de Apple Podcasts y YouTube, que solo aparecen cuando sus URL dejen de ser `null` en `lib/site.ts`.
  - "La dupla", con Chuletas y Lobito, sin fotos (TODO).
  - "Episodios", con el reproductor oficial incrustado (`SPOTIFY_EMBED_URL`). No hay filas de episodios inventadas.
  - Banda oscura hacia `/productos`, con su texto generado desde los sabores activos.
- JSON-LD `PodcastSeries` con el nombre, la URL de Spotify y la presentación.
- Las salidas a Spotify registran `spotify_click` con `origen` (`podcast`, `inicio`, `enlaces` o `novedades`).

## Novedades

- [lib/novedades.ts](lib/novedades.ts) define:
  - `Novedad { id, titulo, resumen, fecha (ISO), tag: "producto" | "podcast" | "promocion" | "comunidad", imagen?, href?, promo?: { condiciones, vigenteHasta? } }`;
  - el arreglo `novedades`;
  - `getNovedades(tag?)`, por fecha descendente;
  - `getPromoVigente()`, la promo más reciente no vencida;
  - `tieneNovedades()`;
  - `formatFecha(iso)`, en es-PE (escribe "setiembre", la forma usual en Perú);
  - `mensajePromocion(novedad)`: "Hola, quiero aprovechar la promoción: <título>.", copy POR CONFIRMAR.
- **Regla de contenido vacío:** mientras `novedades` esté vacío, `/novedades` da 404 y no se enlaza desde la cabecera, el pie, el inicio ni `/enlaces`, ni aparece en el sitemap. Con un elemento, todo aparece solo:
  - la página con filtro `?tag=` (solo etiquetas con contenido);
  - el banner "Promoción vigente";
  - las tarjetas;
  - el aside "Enlaces";
  - los enlaces en la navegación y el pie;
  - la sección del inicio;
  - el botón en `/enlaces`;
  - la tarjeta de promo en `/enlaces`;
  - la entrada del sitemap;
  - `robots: index`.

### Cómo publicar una novedad

1. Añade un objeto al arreglo `novedades` de [lib/novedades.ts](lib/novedades.ts):
   - `id` único, `titulo`, `resumen`, `fecha` (`"AAAA-MM-DD"`) y `tag`.
   - Opcionalmente `imagen` (ruta en `public/`, se muestra a 200×140) y `href` (interno o externo).
   - Para promociones, `promo: { condiciones, vigenteHasta? }`. Sin `vigenteHasta`, la promo no vence.
2. Ejecuta lint, tsc y build. El build vuelve dinámica `/novedades` (lee `?tag=`) y la añade al sitemap.

## Convenciones detectadas

- Estilos 100% con utilidades de Tailwind y colores hex arbitrarios (no hay tokens de tema en Tailwind). Paleta de marca:
  - `#4A2E1F` marrón (texto / botón oscuro) · `#F3E7D3` crema (fondo) · `#F7EFE2` crema claro (fondos de tarjeta y bandas)
  - `#DDB45A` dorado (botón primario) · `#F28C28` naranja · `#8E8BB0` lavanda (acentos) · `#E8DCCB` borde
- Patrones repetidos:
  - Tarjetas `rounded-[2rem]`/`rounded-[1.5rem]` con `border-[#4A2E1F]/10 bg-white/55` y sombras `shadow-[0_..._rgba(74,46,31,0.0X)]`.
  - Botones `rounded-full` con `min-h-11` (44 px): primario dorado con texto marrón; secundario con `border-2 border-[#4A2E1F]`; oscuro marrón con texto crema. Todo hover con movimiento va bajo `motion-safe:`.
  - Contenedor `mx-auto max-w-6xl px-6 md:px-10`.
  - Filtros y selectores con enlaces y `searchParams` (sin JS). Los valores inválidos caen al valor por defecto.
- Accesibilidad:
  - Texto marrón sobre crema con opacidad mínima `/75` (con `/70` no llega a 4.5:1).
  - Áreas táctiles de 44 px como mínimo.
  - `aria-current` en el elemento activo de la navegación y los filtros.
  - El foco visible se define en `globals.css` (`@layer base`, anillo marrón con halo crema).
  - Emojis e iconos decorativos con `aria-hidden`.
- Secciones marcadas con comentarios en mayúsculas (`{/* HERO */}`, `{/* PODCAST */}`).
- Componentes con `export default function`, comillas dobles, punto y coma.
- Emojis (🐾 💬 📷 💜) forman parte del tono de marca en los textos.
- Codificación: UTF-8 **sin BOM** y finales de línea LF (`.gitattributes`: `* text=auto eol=lf`). Comprobar tildes y ñ al editar.

## Variables de entorno

Ninguna. El código no lee `process.env` y no existe `.env*` (están en `.gitignore`).

## Integraciones externas

- **WhatsApp** (`wa.me/51997712366`) con mensajes precargados URL-encoded, generados por `whatsappUrl()` desde [lib/site.ts](lib/site.ts). Si cambia el número o un mensaje, se edita solo ahí.
- **Teléfono** `tel:+51997712366`: el mismo número, mostrado como enlace en `/productos/[linea]` y `/contacto`.
- **Instagram** `@los_chules_pets`: en `/contacto`, el pie, `/enlaces`, `/novedades` y el JSON-LD `Organization`.
- **Spotify**: enlace al show y reproductor incrustado en `/podcast`.
- **Yape** solo mencionado como texto.
- **Vercel Web Analytics**: páginas vistas y estos eventos:
  - `whatsapp_click` (`origen`, `sabor?`);
  - `spotify_click` (`origen`);
  - `instagram_click` (`origen`);
  - `enlaces_click` (`destino`);
  - `novedad_click` (`id`);
  - `apple_podcasts_click` y `youtube_click`, cuando existan esos enlaces.

  Para ver datos hay que activar Web Analytics en el proyecto de Vercel. Que los eventos personalizados estén disponibles en el plan actual sigue POR CONFIRMAR.
- **Google Fonts** vía `next/font` (se descarga en build).
- **IA:** no hay ninguna lógica de IA, SDK de LLM ni llamada a APIs en el código.
- Sin formularios, CMS ni base de datos.

## Reglas

- No cambiar precio, número de WhatsApp/Yape, mensajes precargados, handle de Instagram ni textos de marca sin confirmación explícita del usuario: son datos de negocio.
- No inventar copy ni datos. Si hace falta texto nuevo, se deja un `TODO` y se pide al usuario.
- No reemplazar `public/logo.png` ni los assets de `public/products/` (no renombrar `chulepancakes-platano/`), ni generar derivados de imagen como archivos.
- Antes de dar un cambio por bueno: `npm run lint`, `npx tsc --noEmit` y `npm run build` (los tres pasan limpios).
- Revisar móvil y escritorio:
  - La cabecera cambia a menú hamburguesa por debajo de `md`.
  - La barra fija de `/productos/[linea]` aparece por debajo de `lg`.
  - `/enlaces` va sin cabecera ni pie.
- Al añadir una página nueva a la navegación:
  - Editar `getNavItems` en `Header.tsx` y los `items` de `Footer.tsx`.
  - Darle `metadata` con `pageMetadata()`.
  - Añadirla a `app/sitemap.ts`.

## Correcciones a la auditoría inicial

Ver [docs/PLAN-TECNICO.md](docs/PLAN-TECNICO.md), sección 2.

- El favicon **no** es el de Next: se reemplazó en `37875ba` y es un `.ico` propio de 48×48.
- Desde la home había **2** botones a `/nosotros`, no 3 (el tercero estaba en `Hero.tsx`, sin uso).
- Las imágenes "pesadas" no llegaban así al usuario: `next/image` ya servía WebP de 16–50 KB. El problema real era el CLS por dimensiones mal declaradas (ya resuelto).
- Vercel y el dominio `www` están confirmados por cabeceras.

## Deuda técnica / pendientes

Resuelto (rama `mejora/tecnica-completa`):

- ~~`/nosotros` enlazado desde el header y la home~~: retirado del recorrido y con `noindex`.
- ~~`<main>` anidado y doble padding superior~~.
- ~~WhatsApp y URLs duplicados~~: centralizados en `lib/site.ts`.
- ~~Componentes, `content/` y `lib/utils.ts` sin uso~~ y ~~assets de plantilla y logo duplicado~~: eliminados.
- ~~SEO mínimo~~: metadata por página, Open Graph/Twitter, canonical, `metadataBase`, sitemap, robots, iconos, 404 en español y JSON-LD.
- ~~README genérico~~.
- ~~Enlaces externos sin `rel="noopener noreferrer"`~~.
- ~~Sin analítica~~.
- ~~Sin cabeceras de seguridad~~.
- ~~`next` con advisory crítico~~: `npm audit --omit=dev` da 0.
- ~~BOM UTF-8~~ y ~~sin `engines`/`.nvmrc`/CI~~.
- ~~Constantes antiguas `PRODUCT` y `WHATSAPP_MESSAGES.pedido`~~: retiradas en la Fase 6 del ecosistema, ya sin usos.

Pendiente (depende del usuario):

- **Camote:** descripción, precio, fotos y logotipo propios (ver "Cómo activar el camote").
- **Fotos:** Chuletas y Lobito (tarjetas de "La dupla" sin imagen) y portada propia del podcast (hoy se usa el logo en `PodcastPortada`).
- **Enlaces del podcast:** `APPLE_PODCASTS_URL` y `YOUTUBE_URL` en `lib/site.ts`.
- **Contenido de Novedades:** el arreglo está vacío.
- **Copy por confirmar:**
  - el mensaje de WhatsApp de las promociones (`mensajePromocion`);
  - el texto "Vigente hasta el …" del banner de promoción;
  - el mensaje de la 404;
  - los alt descriptivos de `detail-1`/`detail-2` y de la portada del podcast.
- **`/nosotros`:** falta su contenido (copy de marca). Al tenerlo, quitar el `noindex` y volver a añadirla a la navegación y al sitemap.
- **Teléfono de `/contacto`:** el enlace mide 23 px de alto (por debajo de 44 px). No se ha tocado porque `/contacto` quedó fuera del alcance de las fases del ecosistema.
- **Inicio:** el subtítulo "Cuatro puertas de entrada, una sola marca." es fijo, aunque sin novedades se muestran 3 tarjetas.
- **Archivos de origen pesados** en `public/` (`detail-1/2.png` ≈ 2.6 MB, `logo.png` ≈ 560 KB). Optimizarlos requiere autorización.
- **Redirección apex → `www`** con 307 (configurar 308 en Vercel).
- **`npm audit` (incluyendo dev):** 5 vulnerabilidades altas en la cadena de `eslint-config-next`. No aplicar `--force`.
- **Repo dentro de OneDrive** (`node_modules` y `.next` se sincronizan).

## Plan del ecosistema

- [x] **1. Datos de productos**: `lib/productos.ts` y `mensajePedido`.
- [x] **2. Catálogo y página por línea**: `/productos` y `/productos/[linea]`.
- [x] **3. Podcast** en `/podcast` (Spotify: https://open.spotify.com/show/6wlvtKn3QbZtrYX4FTagt1).
- [x] **4. Novedades** en `/novedades`, dirigidas por datos (vacías hasta que haya contenido real).
- [x] **5. Enlaces** en `/enlaces`, dentro del sitio, para la bio de Instagram.
- [x] **6. Cabecera, pie e inicio rediseñado** (escritorio y móvil).
- [x] **7. SEO, analítica y documentación.**
