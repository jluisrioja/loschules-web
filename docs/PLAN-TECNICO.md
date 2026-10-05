# Plan técnico — loschules.com

Auditoría técnica del repositorio `loschules-web` (rama `main`, commit `1781474`) y del sitio en producción `https://www.loschules.com`.
Fecha: 2026-10-04. Entorno de auditoría: Windows 11, Node 22.16.0, npm 10.9.2.

No se ha modificado código fuente. Todo lo marcado **POR CONFIRMAR** no se puede determinar desde el repo ni desde las respuestas públicas del sitio.

---

## 1. Resumen ejecutivo

- **El código está sano:** `lint`, `tsc` y `build` pasan sin errores ni warnings. Las 6 rutas son estáticas y solo `Header` es Client Component.
- **El mayor problema es la conversión en móvil.** En la home, el botón principal del hero ("Conócenos") lleva a `/nosotros`, que es una página vacía. Además, el CTA de WhatsApp del header solo se ve con el menú abierto. Tampoco hay analítica, así que no se puede medir ningún pedido.
- **El SEO y la forma de compartir están casi sin hacer.** Todas las páginas se titulan "Los Chules" y no hay Open Graph, así que un enlace compartido por WhatsApp o Instagram no muestra preview. `robots.txt` y `sitemap.xml` dan 404 en producción y no hay datos estructurados.
- **Seguridad:** `next@16.1.6` tiene 1 advisory crítico y arrastra 3 altos (postcss, sharp). La corrección es un *minor* (16.3.8). Tampoco hay cabeceras de seguridad. No hay secretos en el repo ni en el historial.
- **Rendimiento aceptable:** `next/image` ya sirve WebP de 16–50 KB. Sí hay CLS por dimensiones mal declaradas y una fuente de más.
- **Mantenibilidad:** hay un `<main>` anidado con doble padding superior, el enlace de WhatsApp está repetido en 6 sitios y hay código muerto. El repo vive dentro de OneDrive (528 MB de `node_modules` sincronizándose).
- Este plan propone 9 fases cortas; las 4 primeras son de esfuerzo S y alto impacto.

---

## 2. Verificación de lo indicado en CLAUDE.md

| Afirmación en CLAUDE.md | Resultado |
|---|---|
| Despliegue en Vercel: POR CONFIRMAR | **Confirmado** por cabeceras (`Server: Vercel`, `X-Vercel-Id: gru1::…`). El dominio canónico efectivo es `www.loschules.com`: el apex redirige con **307**. La configuración del proyecto Vercel (Node, rama de producción, variables) sigue POR CONFIRMAR. |
| `/nosotros` enlazado desde "3 botones de la home" | **Corregir:** son **2** en la home ([app/page.tsx:26](../app/page.tsx#L26), [app/page.tsx:96](../app/page.tsx#L96)) más el header (desktop y móvil). El tercero está en `Hero.tsx`, que no se usa. |
| `favicon.ico` es el de Next por defecto | **Corregir:** se reemplazó en `37875ba` (25 931 → 15 406 bytes). Es un `.ico` de 48×48 propio. Lo que falta es `apple-icon`/`icon.png` (ver SEO-08). |
| Imágenes pesadas (≈2.6 MB) | **Matizar:** en origen sí pesan, pero el usuario recibe WebP optimizado. Medido en producción: `cover` w=640 → 16 KB, `detail-1` w=640 → 27 KB, `logo` w=640 → 51 KB. El impacto real está en el CLS y en el peso del repo (ver PERF-01/02). |
| `<main>` anidado y doble padding | **Confirmado** también en el HTML servido en producción. |
| WhatsApp duplicado en 6 lugares | **Confirmado** (6 `href`). Además, el número aparece como texto en 2 sitios más. |
| Código sin uso | **Confirmado:** ningún import de `components/home/*`, `content/*` ni `lib/utils.ts`. |
| BOM UTF-8 | **Confirmado** en 7 archivos (lista en EST-05). |
| `lint` y `tsc` pasan limpios | **Confirmado.** |

---

## 3. Resultados de calidad (comandos ejecutados)

| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 0 warnings. |
| `npx tsc --noEmit` | 0 errores. |
| `npm run build` | Compila en 3.6 s, sin warnings. 6 rutas, todas `○ Static`: `/`, `/_not-found`, `/contacto`, `/ecosistema`, `/nosotros`, `/productos`. Next 16 ya no muestra el tamaño por ruta; se midió a mano (ver PERF-05). |
| `npm audit` | 16 vulnerabilidades: 1 crítica, 12 altas, 2 moderadas y 1 baja. En producción (`--omit=dev`) quedan 5: 1 crítica (`next`), 3 altas y 1 moderada. |
| `npm outdated` | `next` 16.1.6 → 16.3.8 · `react`/`react-dom` 19.2.3 → 19.3.0 · `tailwindcss` 4.2.2 → 4.3.3 · mayores disponibles: `typescript` 7, `eslint` 10, `@types/node` 26. |
| Búsqueda de secretos en `git log --all -p` | Sin coincidencias, salvo nombres de paquetes como `js-tokens`. Nunca se versionó ningún `.env`. |

---

## 4. Tabla de hallazgos

Impacto: Alto / Medio / Bajo. Esfuerzo: S (< 1 h) / M (medio día) / L (> 1 día). Riesgo de regresión: probabilidad de romper algo visible al corregirlo.

### Conversión

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| CONV-01 | Conversión | El botón principal del hero ("Conócenos", estilo primario oscuro) y "Conoce nuestra historia" llevan a `/nosotros`, que renderiza solo el texto `Nosotros`. El primer clic de muchos visitantes termina en una página vacía. | [app/page.tsx:25-30](../app/page.tsx#L25-L30), [app/page.tsx:95-100](../app/page.tsx#L95-L100), [app/nosotros/page.tsx:1-3](../app/nosotros/page.tsx#L1-L3) | Alto | S (redirigir el CTA o rellenar la página) / M (página completa) | Bajo |
| CONV-02 | Conversión | En móvil (< `md`) no hay ningún CTA de WhatsApp visible en la home. El "Pedir ahora" del header está oculto (`hidden … md:inline-flex`) y solo aparece al abrir el menú. Los CTA de la home van a `/nosotros` y `/productos`. | [components/layout/Header.tsx:66](../components/layout/Header.tsx#L66), [components/layout/Header.tsx:106-113](../components/layout/Header.tsx#L106-L113) | Alto | S | Bajo |
| CONV-03 | Conversión | Sin analítica ni medición de clics en WhatsApp. No se puede saber cuántas visitas acaban en un pedido ni qué CTA funciona. | Ausencia en todo el repo: ni `@vercel/analytics`, ni `gtag`, ni `<Script>` | Alto | S | Bajo |
| CONV-04 | Conversión | En `/productos`, por debajo de `lg` (1024 px) la columna de imágenes va antes que la de información. "Pedir por WhatsApp" aparece después de 3 imágenes apiladas y no hay CTA fijo. La posición exacta en px queda POR CONFIRMAR en dispositivo. | [app/productos/page.tsx:25-66](../app/productos/page.tsx#L25-L66), [app/productos/page.tsx:92-98](../app/productos/page.tsx#L92-L98) | Medio | S | Bajo |
| CONV-05 | Conversión | El número se muestra como texto plano, sin `tel:` ni botón de copiar. Quien no tiene WhatsApp en ese dispositivo (por ejemplo, en desktop) no tiene una alternativa cómoda. | [app/productos/page.tsx:131-133](../app/productos/page.tsx#L131-L133), [app/contacto/page.tsx:27-29](../app/contacto/page.tsx#L27-L29) | Bajo | S | Bajo |
| CONV-06 | Conversión | Enlaces de WhatsApp verificados: los 6 `wa.me` están bien formados y se decodifican a mensajes válidos ("Hola, quiero información sobre Los Chules 🐶" y "Hola, quiero pedir ChulePancakes de plátano 🐶"). No hay enlaces rotos. *Informativo.* | Ver EST-02 | — | — | — |

### SEO

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| SEO-01 | SEO | Sin Open Graph ni Twitter cards (0 etiquetas en producción). Al compartir el enlace por WhatsApp o Instagram, el canal principal de la marca, no aparece imagen ni título. | [app/layout.tsx:12-16](../app/layout.tsx#L12-L16); `curl https://www.loschules.com` → 0 `og:` | Alto | S | Bajo |
| SEO-02 | SEO | Metadata solo global: las 5 páginas comparten `<title>Los Chules</title>` y la misma descripción (verificado en producción en `/` y `/productos`). Ninguna página exporta `metadata`. | [app/layout.tsx:12-16](../app/layout.tsx#L12-L16) | Alto | S | Bajo |
| SEO-03 | SEO | `robots.txt` y `sitemap.xml` devuelven **404** en producción. No existen `app/robots.ts` ni `app/sitemap.ts`. | `curl -o /dev/null -w %{http_code}` → 404 / 404 | Medio | S | Bajo |
| SEO-04 | SEO | Sin `metadataBase` ni `canonical`. Sin `metadataBase`, las URLs de OG no se resuelven a absolutas. | [app/layout.tsx:12](../app/layout.tsx#L12) | Medio | S | Bajo |
| SEO-05 | SEO | El apex `loschules.com` redirige a `www` con **307 (temporal)** en vez de 308/301, lo que diluye señales de indexación. Se configura en Vercel → Domains, no en el código. | `curl -sI https://loschules.com` → `HTTP/1.1 307`, `Location: https://www.loschules.com/` | Medio | S | Bajo |
| SEO-06 | SEO | `/nosotros` y `/ecosistema` responden 200, son indexables y no tienen contenido ni `<h1>` (*thin content*). `/ecosistema` no está enlazada en ningún sitio. | [app/nosotros/page.tsx](../app/nosotros/page.tsx), [app/ecosistema/page.tsx](../app/ecosistema/page.tsx) | Medio | S | Bajo |
| SEO-07 | SEO | Sin datos estructurados (JSON-LD `Organization`/`Product` con `Offer`). `LocalBusiness` requiere dirección o zona de reparto: POR CONFIRMAR si se quiere publicar. | 0 `application/ld+json` en producción | Medio | M | Bajo |
| SEO-08 | SEO | El nombre del producto solo existe como imagen (`title.svg`, alt "ChulePancakes"). No hay un heading con "ChulePancakes de plátano"; "Avena y plátano" es un `<p>`. | [app/productos/page.tsx:71-79](../app/productos/page.tsx#L71-L79) | Medio | S | Bajo |
| SEO-09 | SEO | Solo hay `favicon.ico` de 48×48. Faltan `apple-icon.png` (icono al guardar en iOS) e `icon.png` en alta resolución. | [app/favicon.ico](../app/favicon.ico); `<link rel="icon" … sizes="48x48">` | Bajo | S | Bajo |
| SEO-10 | SEO | La página 404 es la de Next, en inglés ("This page could not be found."), en un sitio `lang="es"`. | `.next/server/app/_not-found.html`; no existe `app/not-found.tsx` | Bajo | S | Bajo |
| SEO-11 | SEO | `lang="es"` es correcto. `es-PE` sería más preciso, pero es opcional. *Informativo.* | [app/layout.tsx:24](../app/layout.tsx#L24) | — | — | — |

### Seguridad

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| SEG-01 | Seguridad | `next@16.1.6` tiene un advisory **crítico** (request smuggling en rewrites, crecimiento del caché de `next/image`, DoS en *postponed resume*) y arrastra `postcss` y `sharp` con advisories altos. La corrección es `next@16.3.8`, mismo *major*. La exposición real en este sitio (sin rewrites, sin PPR, imágenes optimizadas por Vercel) es probablemente baja: POR CONFIRMAR. | [package.json:12](../package.json#L12); `npm audit --omit=dev` → 5 vulns (1 crit.) | Medio | S | Bajo |
| SEG-02 | Seguridad | Sin cabeceras de seguridad. Producción solo envía HSTS (lo pone Vercel, `max-age=63072000`, sin `includeSubDomains`). Faltan `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors` y `Permissions-Policy`. | [next.config.ts:4-8](../next.config.ts#L4-L8) (sin `headers()`); `curl -sI https://www.loschules.com` | Medio | S | Bajo |
| SEG-03 | Seguridad | 11 vulnerabilidades solo de desarrollo, en la cadena de `eslint-config-next` (braces, micromatch, picomatch, js-yaml…). No llegan al cliente ni al servidor. `npm audit fix` sin `--force` corrige las transitivas; el `--force` propone bajar a `eslint-config-next@14`, que **no** debe aplicarse. | [package.json:22](../package.json#L22) | Bajo | S | Bajo |
| SEG-04 | Seguridad | 7 enlaces con `target="_blank"` sin `rel="noopener noreferrer"`. Los navegadores modernos ya aplican `noopener` implícito, así que el riesgo es bajo. | [Header.tsx:65](../components/layout/Header.tsx#L65), [Header.tsx:108](../components/layout/Header.tsx#L108), [contacto:34](../app/contacto/page.tsx#L34), [contacto:53](../app/contacto/page.tsx#L53), [productos:94](../app/productos/page.tsx#L94), [productos:138](../app/productos/page.tsx#L138), [productos:182](../app/productos/page.tsx#L182) | Bajo | S | Bajo |
| SEG-05 | Seguridad | Secretos: ninguno en el árbol ni en los 14 commits del historial. `.env*` y `*.pem` están en `.gitignore`. *Informativo, OK.* | `git log --all -p` + patrones | — | — | — |

### Rendimiento

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| PERF-01 | Rendimiento | Dimensiones declaradas que no coinciden con las reales, lo que causa CLS: con `h-auto` el navegador reserva el hueco con la proporción declarada y luego salta. `cover.png` es 1200×1600 pero se declara 520×520. `detail-1/2` son 1200×1600 y se declaran 320×320. `title.svg` es 1150×215 (5.3:1) y se declara 460×150 (3.1:1). Además falta `sizes`. | [app/productos/page.tsx:33-34](../app/productos/page.tsx#L33-L34), [:47-48](../app/productos/page.tsx#L47-L48), [:59-60](../app/productos/page.tsx#L59-L60), [:74-75](../app/productos/page.tsx#L74-L75) | Medio | S | Bajo |
| PERF-02 | Rendimiento | PNG de origen sobredimensionados: `detail-1`/`detail-2` ≈ 2.6 MB, `cover` 739 KB y `logo.png` 562 KB (1062×1054, mostrado a 40–320 px). El usuario recibe WebP optimizado, pero: (a) engordan el repo; (b) `/logo.png` en crudo es público y es el candidato natural para imagen OG; (c) consumen cuota de optimización en Vercel (POR CONFIRMAR el plan). | `public/products/chulepancakes-platano/*`, `public/logo.png` | Bajo | S | Bajo |
| PERF-03 | Rendimiento | `title.svg` pesa 135 KB (35 KB gzip) y se sirve sin optimizar (`src` directo). Es texto convertido a trazos vectoriales. | [app/productos/page.tsx:71-77](../app/productos/page.tsx#L71-L77) | Bajo | S | Bajo |
| PERF-04 | Rendimiento | Poppins se carga con 5 pesos y 5 *preloads* de woff2. El peso `300` no se usa. El `700` sí, por `<strong>` en [app/page.tsx:73](../app/page.tsx#L73). | [app/layout.tsx:8](../app/layout.tsx#L8) | Bajo | S | Bajo |
| PERF-05 | Rendimiento | JS de cliente por página: 9 chunks, unos 580 KB sin comprimir y unos 173 KB gzip, igual en todas las rutas. Es casi todo el runtime de React y Next App Router; el código propio es mínimo. *Informativo.* | `.next/server/app/index.html` → `<script src>` medidos | Bajo | — | — |

### Accesibilidad

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| A11Y-01 | Accesibilidad | Contraste insuficiente (WCAG AA exige 4.5:1 en texto normal). Los links inactivos del nav desktop (`#4A2E1F/70` sobre crema, `text-sm`) dan **4.43:1**, y "+ delivery" (`/70`, `text-base`) también da 4.43:1. El resto de combinaciones de texto pasa: /75 = 5.07, /80 = 5.82, CTA dorado = 6.32, crema sobre marrón = 10.1. | [Header.tsx:53](../components/layout/Header.tsx#L53), [app/productos/page.tsx:88](../app/productos/page.tsx#L88) | Medio | S | Bajo |
| A11Y-02 | Accesibilidad | Menú móvil: no tiene `aria-controls`, no se cierra con `Escape`, no se cierra si la ruta cambia por "atrás", el foco no pasa al menú y el scroll del body no se bloquea. `aria-label` y `aria-expanded` sí están bien. | [Header.tsx:72-116](../components/layout/Header.tsx#L72-L116) | Medio | S | Bajo |
| A11Y-03 | Accesibilidad | Sin `aria-current="page"` en el link activo (solo hay estilo visual). Los dos `<nav>` no tienen `aria-label`. No hay *skip link* "Saltar al contenido". | [Header.tsx:42](../components/layout/Header.tsx#L42), [:46-57](../components/layout/Header.tsx#L46-L57), [:86](../components/layout/Header.tsx#L86) | Bajo | S | Bajo |
| A11Y-04 | Accesibilidad | Jerarquía de headings correcta en `/` y `/contacto`. En `/productos` el producto no tiene heading (ver SEO-08). `/nosotros` y `/ecosistema` no tienen `<h1>`. | [app/productos/page.tsx:79](../app/productos/page.tsx#L79) | Bajo | S | Bajo |
| A11Y-05 | Accesibilidad | Los emojis dentro de `h1`/`h2` los leen los lectores de pantalla ("huellas de patas"). Convendría envolverlos en `<span aria-hidden="true">`. | [app/page.tsx:16](../app/page.tsx#L16), [:151](../app/page.tsx#L151), [app/productos/page.tsx:172](../app/productos/page.tsx#L172) | Bajo | S | Bajo |
| A11Y-06 | Accesibilidad | Áreas táctiles: el botón hamburguesa mide 40×40 px. Cumple WCAG 2.2 AA (24 px) pero queda por debajo de los 44 px recomendados. Los links del menú móvil tienen unos 24 px de alto con 16 px de separación. | [Header.tsx:77](../components/layout/Header.tsx#L77), [:95](../components/layout/Header.tsx#L95) | Bajo | S | Bajo |
| A11Y-07 | Accesibilidad | Alt genéricos: "Detalle 1 de ChulePancakes" y "Detalle 2 de ChulePancakes" no describen la imagen. Todas las imágenes tienen alt, eso está bien. El contenido real de las fotos queda POR CONFIRMAR. | [app/productos/page.tsx:46](../app/productos/page.tsx#L46), [:58](../app/productos/page.tsx#L58) | Bajo | S | Bajo |
| A11Y-08 | Accesibilidad | Las animaciones de hover (`hover:-translate-y`, `hover:scale`) no respetan `prefers-reduced-motion`. El foco por teclado usa el *outline* por defecto del navegador, que Tailwind v4 conserva: funciona, pero no está diseñado. | Patrón repetido en todas las páginas | Bajo | S | Bajo |

### Estructura y mantenibilidad

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| EST-01 | Estructura | `<main>` anidado (HTML inválido, presente en producción) y doble padding superior: `pt-24` en el layout más `pt-28`/`md:pt-32` en cada página, es decir, 208 px en móvil y 224 px en desktop antes del contenido. Las páginas placeholder no tienen el padding de página. | [app/layout.tsx:29](../app/layout.tsx#L29), [app/page.tsx:6-8](../app/page.tsx#L6-L8), [app/productos/page.tsx:6-7](../app/productos/page.tsx#L6-L7), [app/contacto/page.tsx:5-6](../app/contacto/page.tsx#L5-L6) | Medio | S | **Medio** (cambia el espaciado visual de todas las páginas) |
| EST-02 | Estructura | El enlace de WhatsApp está hardcodeado 6 veces con 2 mensajes distintos, y el número aparece como texto 2 veces más (8 sitios en total). Instagram está en 1 sitio activo y 1 muerto. No hay una constante compartida. | [Header.tsx:64](../components/layout/Header.tsx#L64), [:107](../components/layout/Header.tsx#L107), [contacto:28](../app/contacto/page.tsx#L28), [contacto:33](../app/contacto/page.tsx#L33), [productos:93](../app/productos/page.tsx#L93), [:132](../app/productos/page.tsx#L132), [:137](../app/productos/page.tsx#L137), [:181](../app/productos/page.tsx#L181) | Medio | S | Bajo |
| EST-03 | Estructura | Código muerto sin ningún import: `components/home/Hero.tsx`, `EcosystemSection.tsx`, `FeaturedProductSection.tsx`, `content/brand.ts`, `content/home.ts` y `lib/utils.ts`. `Hero.tsx` contiene además un placeholder visible ("Aquí irá tu imagen"). | `grep` de imports → 0 coincidencias | Bajo | S | Bajo |
| EST-04 | Estructura | Assets sin uso: `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` y `logo-los-chules.png` (idéntico byte a byte a `logo.png`). Hay además un directorio `public/fonts/` vacío y sin versionar. | `cmp` → IDENTICAL; `grep` → 0 referencias | Bajo | S | Bajo |
| EST-05 | Estructura | Codificación y fin de línea: hay BOM UTF-8 en `app/contacto`, `app/productos`, `app/nosotros`, `app/ecosistema`, `content/brand.ts`, `content/home.ts` y `lib/utils.ts`. No hay `.gitattributes`, y `core.autocrlf=true` es global de la máquina, así que los finales de línea dependen del equipo que haga el commit. | `od -tx1` → `ef bb bf`; `git config core.autocrlf` → `true` | Bajo | S | Bajo |
| EST-06 | Estructura | Clases repetidas sin abstraer: el color `#4A2E1F` aparece 78 veces; tarjetas y botones se copian literalmente en cada página. Tampoco hay tokens `@theme` de Tailwind v4. | `grep -o '#[0-9A-F]{6}'` → 78× `#4A2E1F`, 16× `#F3E7D3`… | Bajo | M | Medio |
| EST-07 | Estructura | `next/link` se usa para URLs externas (`wa.me`, `instagram.com`). Funciona, pero `<a>` es lo idiomático y evita el *prefetch* y el manejo del router. | Los 7 enlaces de SEG-04 | Bajo | S | Bajo |
| EST-08 | Estructura | El README es el genérico de `create-next-app` y menciona Geist, que no se usa. | [README.md:21](../README.md#L21) | Bajo | S | Bajo |

### Despliegue y entorno

| ID | Categoría | Hallazgo | Evidencia | Impacto | Esfuerzo | Riesgo regresión |
|---|---|---|---|---|---|---|
| DEP-01 | Entorno | El repo está dentro de OneDrive. `node_modules` (528 MB, 27 815 archivos) y `.next` (98 MB) se sincronizan, y la carpeta tiene el atributo *files-on-demand* (`U`). Riesgos: errores `EPERM`/`EBUSY` en `build`/`install` por bloqueos de sincronización, lentitud y conflictos de sync. El commit `1781474 fix: fijar raíz de Turbopack` sugiere que ya hubo problemas de resolución de rutas; la causa exacta queda POR CONFIRMAR. | `du -sh node_modules .next`; `attrib node_modules` → `U`; [next.config.ts:5-7](../next.config.ts#L5-L7) | Medio | S | Bajo |
| DEP-02 | Entorno | No hay `engines` ni `.nvmrc`. Next 16 exige Node ≥ 20.9.0; en local se usa 22.16.0, `@types/node` está fijado a `^20` y la versión de Node del proyecto en Vercel queda POR CONFIRMAR. | [package.json](../package.json); `node_modules/next/package.json` → `"node": ">=20.9.0"` | Bajo | S | Bajo |
| DEP-03 | Entorno | No hay CI. Además, en Next 16 `next build` ya no ejecuta ESLint, así que el lint no se verifica en ningún paso automático; Vercel solo ejecuta `build`, que incluye TypeScript. | Ni `.github/` ni `vercel.json` | Bajo | S | Bajo |
| DEP-04 | Entorno | `main` va 1 commit por delante de `origin/main` (`1781474`, sin push), así que producción no lo incluye. Por lo demás, el contenido de producción coincide con `main` (mismo hero y misma estructura). *Informativo.* | `git branch -vv` → `ahead 1` | Bajo | — | — |
| DEP-05 | Entorno | No hay configuración de Vercel en el repo (`vercel.json`, `.vercel/`). La rama de producción, los *preview deployments*, la región y el plan quedan POR CONFIRMAR en el dashboard. Las peticiones las atiende la región `gru1` (São Paulo). | `X-Vercel-Id: gru1::…` | — | — | — |

### Observaciones sobre datos de negocio (no se propone cambiarlos)

Según las reglas del proyecto, estos puntos solo se documentan. Cualquier cambio necesita tu confirmación explícita.

- El botón **"Pedir ahora"** del header envía el mensaje genérico *"Hola, quiero información sobre Los Chules 🐶"*, no el de pedido ([Header.tsx:64](../components/layout/Header.tsx#L64)). El texto del botón y el mensaje no coinciden.
- `/productos` pide al cliente "Nombre, Cantidad, Dirección", pero el mensaje precargado no incluye esa plantilla ([app/productos/page.tsx:149-153](../app/productos/page.tsx#L149-L153)).

---

## 5. Plan por fases

Se ordena por impacto/esfuerzo. Cada fase es una rama corta desde `main` con un PR independiente.

**Validación común a todas las fases:** `npm run lint` · `npx tsc --noEmit` · `npm run build` · revisión visual en móvil (≈ 375 px) y desktop (≥ 1280 px) con `npm run dev` · revisión del *preview deployment* de Vercel antes de mergear.

### Fase 0 — Actualización de seguridad · `mejora/actualizar-next`
- **Resuelve:** SEG-01, SEG-03.
- **Archivos:** `package.json`, `package-lock.json`.
- **Cambios:** `next` y `eslint-config-next` → `16.3.8`, y `npm audit fix` **sin** `--force`. Opcional: `react`/`react-dom` → `19.3.0` en el mismo PR.
- **Validación:** validación común más `npm audit --omit=dev` (objetivo: 0 críticas y 0 altas) y navegar las 6 rutas en local con `npm run build && npm run start`.
- **Requisito previo:** decidir el push del commit pendiente `1781474` (decisión D9).

### Fase 1 — Conversión inmediata · `mejora/cta-movil-whatsapp`
- **Resuelve:** CONV-01, CONV-02, CONV-04 y CONV-05.
- **Archivos:** `app/page.tsx`, `components/layout/Header.tsx`, `app/productos/page.tsx` y, según D3, un componente nuevo `components/WhatsAppCta.tsx`.
- **Cambios:**
  - Que el CTA primario del hero no apunte a una página vacía (según D1).
  - Hacer visible el CTA de WhatsApp en móvil (según D3).
  - En `/productos`, un CTA alcanzable sin scroll largo en móvil.
  - `tel:` o botón de copiar en el número mostrado.
- **No cambia** el número ni los mensajes.
- **Validación:** validación común, emulación móvil en DevTools (CTA visible sin abrir el menú) y prueba de cada enlace en un móvil real con WhatsApp instalado.

### Fase 2 — Constante única de WhatsApp/Instagram · `mejora/whatsapp-constante`
- **Resuelve:** EST-02, EST-07, SEG-04.
- **Archivos:** nuevo `lib/site.ts` (o `content/site.ts`, según D8), `components/layout/Header.tsx`, `app/productos/page.tsx`, `app/contacto/page.tsx`.
- **Cambios:**
  - Exportar el número, los mensajes **literalmente idénticos a los actuales**, el *handle* de Instagram y un helper `whatsappUrl(mensaje)`.
  - Sustituir las 8 apariciones.
  - Enlaces externos con `<a … target="_blank" rel="noopener noreferrer">`.
- **Validación:** validación común. `grep -rn "51997712366" app components` debe dar 0 resultados fuera de `lib/site.ts`. Comparar los `href` generados en `.next/server/app/*.html` antes y después: deben ser idénticos byte a byte.
- *Nota:* conviene hacer la Fase 2 antes de la 1 si la Fase 1 añade más CTA de WhatsApp, para no crear un 9.º duplicado.

### Fase 3 — Analítica y medición de pedidos · `mejora/analitica`
- **Resuelve:** CONV-03.
- **Archivos:** `package.json`, `app/layout.tsx` y el helper/CTA de WhatsApp de la Fase 2 (evento al hacer clic).
- **Cambios:** integrar el proveedor elegido en D2 y registrar un evento `whatsapp_click` con el origen (header, producto, cierre, contacto).
- **Validación:** validación común. Ver en el dashboard del proveedor la visita y el evento desde el *preview deployment*. Comprobar que no se carga nada adicional en el primer render si el proveedor es diferido.

### Fase 4 — SEO base y previews al compartir · `mejora/seo-base`
- **Resuelve:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-06, SEO-07, SEO-08, SEO-09 y SEO-10.
- **Archivos:**
  - `app/layout.tsx`: `metadataBase: new URL("https://www.loschules.com")`, `title.template`, `openGraph`, `twitter`, `alternates.canonical`.
  - `metadata` en `app/page.tsx`, `app/productos/page.tsx`, `app/contacto/page.tsx`, `app/nosotros/page.tsx` y `app/ecosistema/page.tsx`. Las dos últimas con `robots: { index: false }` mientras sean placeholders (D1).
  - Nuevos `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx` (en español) y `app/opengraph-image.*` (D5).
  - Nuevos `app/apple-icon.png` e `app/icon.png`, generados a partir del logo existente (D5).
  - JSON-LD `Organization` + `Product`/`Offer` en `/productos`, **reutilizando** el precio y los textos actuales sin modificarlos.
  - Heading semántico con el nombre del producto (puede ser `sr-only` para no alterar el diseño).
  - **Fuera del código:** cambiar la redirección apex → `www` a 308 en Vercel → Domains (D7).
- **Validación:**
  - Validación común.
  - `curl` de `/robots.txt` y `/sitemap.xml` → 200.
  - Pegar la URL del *preview* en el [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/) y en un chat de WhatsApp: debe salir la preview.
  - [Rich Results Test](https://search.google.com/test/rich-results) sobre `/productos`.
  - Comprobar con `view-source` que cada página tiene un `<title>` distinto.
  - Tras el deploy, enviar el sitemap en Google Search Console (acceso POR CONFIRMAR).

### Fase 5 — Accesibilidad · `mejora/accesibilidad`
- **Resuelve:** A11Y-01, A11Y-02, A11Y-03, A11Y-05, A11Y-06, A11Y-07 y A11Y-08.
- **Archivos:** `components/layout/Header.tsx`, `app/layout.tsx` (skip link), `app/page.tsx`, `app/productos/page.tsx` y, opcionalmente, `app/globals.css` (estilos `:focus-visible` y `motion-reduce`).
- **Cambios:**
  - Opacidad `/70` → `/75` (5.07:1) en el nav y en "+ delivery".
  - Menú móvil: `aria-controls`, cierre con `Escape` y al cambiar `pathname`, botón de 44 px.
  - `aria-current="page"`, `aria-label` en los `<nav>`, emojis con `aria-hidden`.
  - Alt descriptivos: el texto lo propones tú, porque es copy.
  - Variantes `motion-safe:` en los hover.
- **Validación:** validación común. Lighthouse Accessibility (objetivo ≥ 95) y axe DevTools en las 4 rutas con contenido. Recorrer el sitio solo con teclado (Tab, Shift+Tab, Enter, Esc) en móvil emulado y en desktop. Prueba rápida con NVDA o VoiceOver.

### Fase 6 — Layout: `<main>` único y padding · `mejora/layout-main`
- **Resuelve:** EST-01.
- **Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/productos/page.tsx`, `app/contacto/page.tsx`, `app/nosotros/page.tsx`, `app/ecosistema/page.tsx`.
- **Cambios:** dejar un solo `<main>` (en el layout, con `id="contenido"` para el skip link) y que las páginas usen `<div>`/`<section>`. Unificar el padding superior en un solo sitio. El espaciado visual cambia; hay que decidir si se conservan los 208/224 px actuales o se reducen (D6).
- **Validación:** validación común. Capturas antes y después de las 4 rutas en 375, 768 y 1280 px. Validador W3C sobre el HTML de `next build` (0 errores de `<main>`). **Riesgo de regresión medio:** revisar especialmente el solape con el header fijo.

### Fase 7 — Imágenes y fuentes · `mejora/imagenes-cls`
- **Resuelve:** PERF-01, PERF-02, PERF-03 y PERF-04.
- **Archivos:** `app/productos/page.tsx`, `app/page.tsx`, `app/layout.tsx`, `next.config.ts` (`images.formats: ["image/avif", "image/webp"]`). Solo si D4 lo autoriza, versiones redimensionadas en `public/`.
- **Cambios:**
  - `width`/`height` reales (1200×1600 y 1150×215) y `sizes` acordes al `max-w` actual. El aspecto visual no cambia.
  - Quitar el peso `300` de Poppins.
  - Si D4 lo permite, generar derivados optimizados (por ejemplo, el logo a 640 px y las fotos a 1200 px en WebP o PNG comprimido) **conservando los originales** en una carpeta fuera de `public/` o en el historial.
- **Validación:** validación común. Lighthouse Performance en móvil sobre `/productos` (CLS < 0.1) y Network en DevTools: solo 4 woff2 precargados y proporciones correctas antes de que carguen las imágenes.

### Fase 8 — Cabeceras de seguridad · `mejora/cabeceras-seguridad`
- **Resuelve:** SEG-02.
- **Archivos:** `next.config.ts`.
- **Cambios:** `async headers()` con `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` y `Permissions-Policy` restrictiva. Una CSP básica es opcional (D10); si se añade, ponerla primero en modo `Content-Security-Policy-Report-Only`.
- **Validación:** validación común. `curl -sI` al *preview* para ver las cabeceras y [securityheaders.com](https://securityheaders.com) tras el deploy. Comprobar que siguen funcionando las fuentes, las imágenes y la analítica de la Fase 3.

### Fase 9 — Limpieza y entorno · `mejora/limpieza`
- **Resuelve:** EST-03, EST-04, EST-05, EST-08, DEP-02 y DEP-03.
- **Archivos:**
  - Borrar `components/home/*`, `content/brand.ts`, `content/home.ts` y `lib/utils.ts`. Respetar lo que se haya reutilizado en la Fase 2.
  - Borrar los 5 SVG de plantilla y `public/logo-los-chules.png`.
  - Quitar el BOM de los 7 archivos sin tocar su contenido.
  - Añadir `.gitattributes` (`* text=auto eol=lf`), `.nvmrc` (`22`), `"engines": { "node": ">=20.9" }` en `package.json` y `@types/node` alineado con la versión de Node elegida.
  - Reescribir `README.md`.
  - Opcional: `.github/workflows/ci.yml` con lint y tsc en cada PR.
- **Validación:** validación común. `git grep -l $'\xEF\xBB\xBF'` debe dar 0 resultados. Revisar tildes y ñ en `/productos` y `/contacto`.
- **Sin rama, fuera del repo (DEP-01):** mover el proyecto fuera de OneDrive, por ejemplo a `C:\dev\loschules-web`, con `git clone` desde GitHub y `npm ci`. Después, reevaluar si el `turbopack.root` de `next.config.ts` sigue haciendo falta (D11).

### Resumen de priorización

| Orden | Fase | Impacto | Esfuerzo | Depende de |
|---|---|---|---|---|
| 1 | F0 Seguridad (Next 16.3.8) | Medio | S | D9 |
| 2 | F2 Constante WhatsApp | Medio (habilita F1/F3) | S | D8 |
| 3 | F1 CTA móvil / conversión | Alto | S | D1, D3 |
| 4 | F3 Analítica | Alto | S | D2 |
| 5 | F4 SEO + OG | Alto | M | D1, D5, D7 |
| 6 | F5 Accesibilidad | Medio | S | — |
| 7 | F7 Imágenes / CLS | Medio | S | D4 |
| 8 | F6 `<main>` único | Medio | S | D6 |
| 9 | F8 Cabeceras | Medio | S | D10 |
| 10 | F9 Limpieza + entorno | Bajo | S | D11 |

---

## 6. Decisiones que necesitan tu confirmación

Ninguna de estas decisiones toca datos de negocio (precio, número de WhatsApp/Yape, Instagram, textos de marca). Si alguna acabara requiriendo copy nuevo, el texto lo aportas tú.

| ID | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D1 | ¿Qué hacer con `/nosotros` y `/ecosistema` mientras no tengan contenido? | (a) Quitar `/nosotros` del nav y apuntar los CTA del hero a `/productos`; (b) mantener los enlaces y marcar ambas con `noindex`; (c) borrar `/ecosistema`. | (a) para `/nosotros` hasta que tengas el texto, y (c) para `/ecosistema`. |
| D2 | Proveedor de analítica. | Vercel Web Analytics (sin cookies, 1 línea); GA4 (más potente, pero implica cookies y aviso de privacidad según la Ley 29733); ninguno. | Vercel Web Analytics más un evento personalizado de clic en WhatsApp. Lo que permite el plan actual de Vercel queda POR CONFIRMAR. |
| D3 | Forma del CTA de WhatsApp en móvil. | Botón flotante (FAB) en todas las páginas; barra fija inferior solo en `/productos`; mostrar "Pedir ahora" en el header también en móvil. | Mostrar el CTA del header también en móvil (cambio mínimo) más una barra fija en `/productos`. |
| D4 | ¿Autorizas generar versiones optimizadas de `logo.png` y de las fotos de producto? CLAUDE.md prohíbe reemplazar assets sin pedirlo. | Sí, conservando los originales / No. | Sí, conservando los originales. |
| D5 | Imagen para Open Graph e iconos de app. | `cover.png` recortada a 1200×630; logo sobre fondo crema; imagen generada con `opengraph-image.tsx`. | Logo sobre fondo crema `#F3E7D3` generado en código, para no crear assets nuevos. |
| D6 | Espaciado superior tras unificar `<main>`. | Conservar los 208/224 px actuales / reducirlos. | Reducir: hoy hay un hueco grande bajo el header. Validarlo con capturas. |
| D7 | Dominio canónico y redirección. | `www.loschules.com` (actual) o el apex; cambiar el 307 por 308 en Vercel. | Mantener `www` y poner 308. Requiere acceso al dashboard de Vercel. |
| D8 | Ubicación de la constante de contacto. | `lib/site.ts` o `content/site.ts`. | `lib/site.ts` (incluye helpers); `content/` se elimina en F9. |
| D9 | ¿Push del commit pendiente `1781474` (turbopack.root)? Al hacer push se dispara un deploy, si Vercel tiene auto-deploy (POR CONFIRMAR). | Push ahora / incluirlo en el PR de F0. | Incluirlo en F0. |
| D10 | Alcance de las cabeceras de seguridad. | Solo cabeceras básicas; añadir una CSP. | Solo básicas ahora. La CSP, más adelante en modo *Report-Only*. |
| D11 | ¿Mover el repo fuera de OneDrive? | Sí (`C:\dev\…`) / No. | Sí. GitHub ya hace de copia de seguridad del código. |
| D12 | ¿Añadir CI con GitHub Actions (lint y tsc en PR)? | Sí / No. | Sí, es poco trabajo (S). |

---

## 7. Fuera de alcance (no recomendado ahora)

| Tema | Por qué no ahora |
|---|---|
| Carrito, checkout o pasarela de pago | El flujo WhatsApp + Yape es una decisión de negocio y funciona con un solo producto. Añade backend, PCI y mantenimiento. |
| CMS o *headless* | Con 4 páginas y un producto, centralizar en `lib/site.ts` da el 90 % del beneficio sin infraestructura. |
| Tokens `@theme` de Tailwind y refactor masivo de clases (EST-06) | El valor es real, pero el diff tocaría cada línea de estilo y el riesgo de regresión visual es alto. Mejor hacerlo cuando se añadan páginas nuevas, empezando por extraer `Card` y `Button`. |
| Partir `Header` para reducir JS (PERF-05) | El ≈95 % de los 173 KB gzip es el runtime de React y Next, que no se puede eliminar. La ganancia sería marginal. |
| CSP estricta con *nonces* | Obliga a renderizado dinámico y se pierde el estático (`○`) de todas las rutas, que hoy es su mayor ventaja de rendimiento y coste. |
| Saltos *major* (TypeScript 7, ESLint 10, `@types/node` 26) | No aportan nada funcional al sitio y pueden romper `eslint-config-next`. Conviene esperar a que Next los soporte oficialmente. |
| Framework de tests (unitarios o E2E) | No hay lógica que testear. Lint, tsc, build y Lighthouse en el *preview* cubren el riesgo actual. Habría que reconsiderarlo si aparece lógica (formularios, carrito). |
| Fuentes autoalojadas en `public/fonts` | `next/font/google` ya las autoaloja en build y no hace peticiones a Google en runtime. La carpeta vacía puede borrarse. |
| i18n o PWA | No hay demanda indicada. El público es local (Perú). |
| Contenido de `/nosotros` | Es texto de marca: lo aportas tú. Este plan solo cubre su estructura técnica (metadata y `noindex` provisional). |
