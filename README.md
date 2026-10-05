# loschules-web

Sitio web de **Los Chules** ([www.loschules.com](https://www.loschules.com)), marca artesanal peruana de productos para perros. No tiene carrito ni backend: los pedidos se hacen por WhatsApp y el pago es por Yape.

## Stack

- Next.js 16 (App Router, todas las rutas estáticas) · React 19 · TypeScript (`strict`)
- Tailwind CSS v4 (configurado desde `app/globals.css`, sin `tailwind.config`)
- Fuente Poppins vía `next/font/google`
- Vercel Web Analytics (`@vercel/analytics`)
- Despliegue en Vercel

## Requisitos

- Node.js 22 (ver `.nvmrc`; mínimo `>=20.9`, el que exige Next 16)
- npm

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npx tsc --noEmit   # chequeo de tipos
```

Antes de dar un cambio por bueno: `npm run lint`, `npx tsc --noEmit` y `npm run build`.
En cada pull request, GitHub Actions ejecuta lint y tsc (`.github/workflows/ci.yml`).

## Estructura

```
app/
  layout.tsx            Layout raíz: Header, <main id="contenido">, metadata global, Analytics
  page.tsx              Inicio
  productos/page.tsx    Producto (ChulePancakes), JSON-LD y barra fija de pedido en móvil
  contacto/page.tsx     WhatsApp e Instagram
  nosotros/page.tsx     Placeholder (noindex, fuera de la navegación y del sitemap)
  not-found.tsx         Página 404
  robots.ts, sitemap.ts
  opengraph-image.tsx, icon.tsx, apple-icon.tsx   Imágenes generadas desde public/logo.png
components/
  layout/Header.tsx     Navegación (navItems), CTA de WhatsApp y menú móvil
  layout/SkipLink.tsx   Enlace "Saltar al contenido"
  WhatsAppLink.tsx      Enlace a WhatsApp que registra el evento whatsapp_click
lib/
  site.ts               Datos de contacto y producto (fuente única) y helper whatsappUrl()
  metadata.ts           Helper de metadata por página (Open Graph, Twitter)
  logo-image.tsx        Generador de imágenes con el logo (OG e iconos)
public/
  logo.png
  products/<slug>/      Imágenes de producto
```

## Datos de negocio

El número de WhatsApp, los mensajes precargados, el handle de Instagram y el precio viven solo en `lib/site.ts`. No se cambian sin confirmación explícita.

## Analítica

`<Analytics />` registra las páginas vistas, y cada clic en un enlace de WhatsApp envía el evento `whatsapp_click` con su `origen` (`header`, `barra-productos`, `producto`, `cierre`, `contacto`). Para ver los datos hay que activar Web Analytics en el proyecto de Vercel.
