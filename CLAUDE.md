# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web de marketing de **Los Chules** (www.loschules.com), una marca artesanal peruana de productos para perros inspirada en "Chuletas" y "Lobito". El primer producto es **ChulePancakes de plátano** (avena y plátano, pack de 6, S/ 18 + delivery). El sitio no tiene carrito ni backend: todo pedido se deriva a WhatsApp y el pago es por Yape. Todo el contenido visible está en español (`<html lang="es">`).

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

Si `tsc` falla con referencias a rutas que ya no existen (`.next/types/validator.ts`), son tipos generados obsoletos: borrar `.next/` y volver a ejecutar.

**Despliegue:** Vercel, confirmado por las cabeceras de producción (`Server: Vercel`, región `gru1`). No hay `vercel.json`. El dominio canónico es `https://www.loschules.com`; el apex `loschules.com` redirige a `www` con un **307**. Cambiarlo a 308 es tarea del dashboard de Vercel → Domains. La configuración del proyecto en Vercel (rama de producción, versión de Node, plan) sigue POR CONFIRMAR.

## Arquitectura

- [app/layout.tsx](app/layout.tsx) renderiza `<SkipLink />`, `<Header />` fijo y **un único** `<main id="contenido" className="pt-52 md:pt-56">`. Ese padding (208/224 px) compensa el header y es el único padding superior: las páginas usan `<div>`/`<section>` sin `pt-*` inicial. También declara la metadata global (`metadataBase`, `title.template`, canonical `./`, Open Graph, Twitter) y `<Analytics />`.
- Rutas:
  - `/`, `/contacto`, `/productos` (catálogo) y `/productos/[linea]` (página por línea) están completas. Ver la sección **Productos**.
  - `/nosotros` es un placeholder con `noindex`, fuera de la navegación, de la home y del sitemap.
  - `/ecosistema` se eliminó.
  - `app/not-found.tsx` es la 404 en español.
  - `robots.ts` y `sitemap.ts` generan `/robots.txt` y `/sitemap.xml`; el sitemap incluye `/`, `/productos`, una URL por línea (`/productos/<slug>`, generada desde `getLineas()`) y `/contacto`.
  - `opengraph-image.tsx`, `icon.tsx` y `apple-icon.tsx` generan en build imágenes a partir de `public/logo.png` mediante [lib/logo-image.tsx](lib/logo-image.tsx), sin modificar el logo.
- [lib/site.ts](lib/site.ts) es la **fuente única de datos de negocio**: número de WhatsApp (y sus formatos visibles), `TEL_URL`, mensajes precargados, handle y URL de Instagram, `SITE_URL` y `PRODUCT` (constante antigua, ya sin uso: el precio vive en `lib/productos.ts`). Incluye los helpers `whatsappUrl(mensaje)`, `mensajePedido(linea, sabor)` y `mensajePedidoUrl(linea, sabor)`. No volver a escribir estos valores en páginas o componentes.
- [lib/metadata.ts](lib/metadata.ts) exporta `pageMetadata({ title, description })`. Úsalo en cada página: un `openGraph` definido en una página reemplaza entero al del layout (imagen incluida).
- Client Components:
  - [components/layout/Header.tsx](components/layout/Header.tsx): `navItems`, CTA "Pedir ahora" visible también en móvil y menú móvil. El estado abierto se guarda como la ruta en la que se abrió, así que se cierra solo al cambiar de ruta. También se cierra con Escape.
  - [components/layout/SkipLink.tsx](components/layout/SkipLink.tsx): mueve el foco a `#contenido` sin añadir un hash al historial. Un hash nativo deja la página anterior pintada al pulsar "Atrás".
  - [components/WhatsAppLink.tsx](components/WhatsAppLink.tsx): todo enlace a WhatsApp debe usarlo. Registra `track("whatsapp_click", { origen, sabor? })` con `origen` ∈ `header | barra-productos | producto | cierre | contacto | producto-<slug>`; las páginas de línea envían también el id del sabor.
- Imágenes de producto en `public/products/<slug>/` (`cover.png`, `detail-N.png` de 1200×1600, `title.svg` de 1150×215). Declarar siempre las dimensiones reales y un `sizes` en `next/image`. El logo es `public/logo.png` (1062×1054).
- [next.config.ts](next.config.ts) define:
  - `turbopack.root`: conservarlo.
  - `images.formats`: AVIF y WebP.
  - `headers()`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY` y `Permissions-Policy`. Sin CSP.
- Alias de import: `@/*` → raíz del repo.

## Productos

- **Modelo** ([lib/productos.ts](lib/productos.ts)), fuente única de líneas, sabores y precios:
  - `Categoria = "comida" | "otros"` (etiquetas en `CATEGORIAS`).
  - `Linea { slug, nombre, categoria, portada, galeria, sabores }`: `portada` y `galeria` son imágenes con `src`, `alt` y dimensiones reales.
  - `Sabor { id, nombre, descripcion, precio, presentacion, imagen?, logotipo? }`, con `precio` en soles. `imagen` y `logotipo` son propios del sabor (el `title.svg` actual dice "Plátano").
  - Línea actual: `chulepancakes` (comida), con los sabores `platano` (S/ 18) y `camote` (descripción y precio `null`, POR CONFIRMAR).
- **Regla del sabor activo:** un sabor solo se muestra si tiene `descripcion` **y** `precio` (`saboresActivos`). Una línea sin sabores activos no aparece en el catálogo, ni en el sitemap, y su página da 404. Para publicar el camote basta con rellenar sus dos campos; si no tiene `imagen`, se usa la portada de la línea.
- **Helpers:**
  - `getLineas(categoria?)`
  - `getLinea(slug)`
  - `saboresActivos(linea)`
  - `getSabor(linea, id)`: si el id es inválido o el sabor está inactivo, devuelve el primer sabor activo.
  - `nombreProducto(linea, sabor)` → "ChulePancakes de plátano"
  - `formatPrecio(18)` → "S/ 18"
- **`/productos` (catálogo):**
  - Filtro `?categoria=todo|comida|otros` con enlaces de servidor, sin JS. El activo lleva `aria-current`; un valor desconocido equivale a "todo".
  - Una tarjeta por línea, más las tarjetas discontinuas "Próximamente".
- **`/productos/[linea]`:**
  - `generateStaticParams` y `notFound()`.
  - Selector `?sabor=<id>` con `<Link replace scroll={false}>`, visible solo si hay más de un sabor activo.
  - Canonical sin query.
  - JSON-LD `Organization` + `Product`, con un `Offer` por sabor activo.
  - Barra fija de WhatsApp por debajo de `lg`.
- **`mensajePedido(linea, sabor)`** ([lib/site.ts](lib/site.ts)) devuelve `"Hola, quiero pedir ChulePancakes de plátano.
Nombre:
Cantidad:
Dirección:"`, y `mensajePedidoUrl` su enlace `wa.me`. Las constantes `WHATSAPP_MESSAGES` siguen en uso en la home, el header y `/contacto`.

## Convenciones detectadas

- Estilos 100% con utilidades de Tailwind y colores hex arbitrarios (no hay tokens de tema en Tailwind). Paleta de marca:
  - `#4A2E1F` marrón (texto / botón primario) · `#F3E7D3` crema (fondo) · `#F7EFE2` crema claro (fondos de tarjeta)
  - `#DDB45A` dorado (CTA "Pedir ahora") · `#F28C28` naranja · `#8E8BB0` lavanda (acentos) · `#E8DCCB` borde
- Patrones repetidos:
  - Tarjetas `rounded-[2rem]`/`rounded-[1.5rem]` con `border-[#4A2E1F]/10 bg-white/55` y sombras `shadow-[0_..._rgba(74,46,31,0.0X)]`.
  - Botones `rounded-full` con `motion-safe:hover:-translate-y-0.5`: todo hover con movimiento va bajo `motion-safe:`.
  - Contenedor `mx-auto max-w-6xl px-6 md:px-10`.
- Accesibilidad:
  - Texto marrón sobre crema con opacidad mínima `/75` (con `/70` no llega a 4.5:1).
  - El foco visible se define en `globals.css` (`@layer base`, anillo marrón con halo crema).
  - Los emojis decorativos en headings van en `<span aria-hidden="true">`.
- Secciones marcadas con comentarios en mayúsculas (`{/* HERO */}`, `{/* CTA FINAL */}`).
- Componentes con `export default function`, comillas dobles, punto y coma.
- Emojis (🐾 💬 📷 💜) forman parte del tono de marca en los textos.
- Codificación: UTF-8 **sin BOM** y finales de línea LF (`.gitattributes`: `* text=auto eol=lf`). Comprobar tildes y ñ al editar.

## Variables de entorno

Ninguna. El código no lee `process.env` y no existe `.env*` (están en `.gitignore`).

## Integraciones externas

- **WhatsApp** (`wa.me/51997712366`) con mensajes precargados URL-encoded, generados por `whatsappUrl()` desde [lib/site.ts](lib/site.ts). Si cambia el número o un mensaje, se edita solo ahí.
- **Teléfono** `tel:+51997712366`: el mismo número, mostrado como enlace en `/productos/[linea]` y `/contacto`.
- **Instagram** `@los_chules_pets`, en [lib/site.ts](lib/site.ts) y usado en `/contacto` y en el JSON-LD.
- **Yape** solo mencionado como texto.
- **Vercel Web Analytics**: páginas vistas más el evento `whatsapp_click`. Para ver datos hay que activar Web Analytics en el proyecto de Vercel. Que los eventos personalizados estén disponibles en el plan actual sigue POR CONFIRMAR.
- **Google Fonts** vía `next/font` (se descarga en build).
- **IA:** no hay ninguna lógica de IA, SDK de LLM ni llamada a APIs en el código.
- Sin formularios, CMS ni base de datos.

## Reglas

- No cambiar precio, número de WhatsApp/Yape, mensajes precargados, handle de Instagram ni textos de marca sin confirmación explícita del usuario: son datos de negocio.
- No inventar copy. Si hace falta texto nuevo, se deja un `TODO` y se pide al usuario.
- No reemplazar `public/logo.png` ni los assets de `public/products/` sin pedirlo, y no generar derivados de imagen como archivos.
- Antes de dar un cambio por bueno: `npm run lint`, `npx tsc --noEmit` y `npm run build` (los tres pasan limpios).
- Revisar móvil y escritorio. El header cambia a menú hamburguesa por debajo de `md`, y la barra fija de `/productos/[linea]` aparece por debajo de `lg`.
- Al añadir una página nueva a la navegación, editar `navItems` en `Header.tsx`, darle `metadata` con `pageMetadata()` y añadirla a `app/sitemap.ts`.

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

Pendiente:

- Contenido de `/nosotros` (copy de marca). Al tenerlo, quitar el `noindex`, volver a añadirla a `navItems` y al sitemap, y decidir si los CTA de la home vuelven a apuntar ahí.
- Copy pendiente: mensaje de la 404 y alt descriptivos de `detail-1`/`detail-2`.
- Archivos de origen pesados en `public/` (`detail-1/2.png` ≈ 2.6 MB, `logo.png` ≈ 560 KB). No afectan al usuario gracias a `next/image`, pero sí al repo y a la cuota de optimización. Optimizarlos requiere autorización.
- Redirección apex → `www` con 307 (configurar 308 en Vercel).
- `npm audit` (incluyendo dev) sigue mostrando 5 vulnerabilidades altas en la cadena de `eslint-config-next`. Solo se corrigen con `--force`, que bajaría a `eslint-config-next@14`: no aplicar.
- Repo dentro de OneDrive (`node_modules` y `.next` se sincronizan).

## Plan del ecosistema

- [x] **1. Datos de productos**: `lib/productos.ts` y `mensajePedido`.
- [x] **2. Catálogo y página por línea**: `/productos` y `/productos/[linea]`.
- [ ] **3. Inicio rediseñado** (escritorio y móvil). Incluye pasar la home, el header y `/contacto` al nuevo mensaje de pedido o al catálogo, y retirar `PRODUCT` y `WHATSAPP_MESSAGES.pedido` si dejan de usarse.
- [ ] **4. Podcast** en `/podcast` (Spotify: https://open.spotify.com/show/6wlvtKn3QbZtrYX4FTagt1).
- [ ] **5. Enlaces** en `/enlaces`, dentro del sitio, para la bio de Instagram.
- [ ] **6. Novedades**, cuando haya contenido real.
