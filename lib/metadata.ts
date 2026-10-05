import type { Metadata } from "next";

export const SITE_NAME = "Los Chules";

// Imagen generada por app/opengraph-image.tsx (mantener tamaño y alt sincronizados).
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

// Un `openGraph` definido en una página sustituye entero al del layout
// (incluida la imagen), así que las páginas construyen su metadata con este helper.
export const openGraphBase = {
  type: "website" as const,
  locale: "es_PE",
  siteName: SITE_NAME,
  url: "./",
  images: [OG_IMAGE],
};

export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: { ...openGraphBase, title, description },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
