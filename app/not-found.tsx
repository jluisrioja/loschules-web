import type { Metadata } from "next";
import Link from "next/link";

// Next ya añade noindex a la 404; se anulan canonical y Open Graph heredados del layout.
export const metadata: Metadata = {
  title: "404",
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          404
        </h1>

        {/* TODO: mensaje de "página no encontrada" pendiente de copy de marca. */}

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#4A2E1F] px-6 py-3 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 hover:opacity-95"
          >
            Inicio
          </Link>

          <Link
            href="/productos"
            className="rounded-full border border-[#4A2E1F]/15 bg-white/60 px-6 py-3 text-sm font-medium shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-white"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}
