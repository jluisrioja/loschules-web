import type { Metadata } from "next";

// TODO: página pendiente de contenido. Mientras tanto no se indexa ni se enlaza.
export const metadata: Metadata = {
  title: "Nosotros",
  robots: { index: false },
};

export default function Page() {
  return <div>Nosotros</div>;
}
