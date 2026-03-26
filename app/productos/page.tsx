import Link from "next/link";
import Image from "next/image";

export default function ProductosPage() {
  return (
    <main className="bg-[#F3E7D3] text-[#4A2E1F]">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        {/* ENCABEZADO */}
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-4 py-2 text-sm text-[#4A2E1F]/75 shadow-sm">
            Nuestro primer producto 🐾
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Productos
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#4A2E1F]/80">
            Empezamos con ChulePancakes de plátano, hechos en casa y pensados
            para compartir un momento especial.
          </p>
        </div>

        {/* PRODUCTO PRINCIPAL */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* COLUMNA VISUAL */}
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]">
              <div className="flex items-center justify-center rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <Image
                  src="/products/chulepancakes-platano/cover.png"
                  alt="ChulePancakes de plátano"
                  width={520}
                  height={520}
                  className="h-auto w-full max-w-[380px] object-contain"
                  priority
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-4 shadow-[0_10px_24px_rgba(74,46,31,0.05)]">
                <div className="flex items-center justify-center rounded-[1.25rem] bg-[#F7EFE2] p-4">
                  <Image
                    src="/products/chulepancakes-platano/detail-1.png"
                    alt="Detalle 1 de ChulePancakes"
                    width={320}
                    height={320}
                    className="h-auto w-full max-w-[220px] object-contain transition duration-200 hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-4 shadow-[0_10px_24px_rgba(74,46,31,0.05)]">
                <div className="flex items-center justify-center rounded-[1.25rem] bg-[#F7EFE2] p-4">
                  <Image
                    src="/products/chulepancakes-platano/detail-2.png"
                    alt="Detalle 2 de ChulePancakes"
                    width={320}
                    height={320}
                    className="h-auto w-full max-w-[220px] object-contain transition duration-200 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA INFO */}
          <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_14px_36px_rgba(74,46,31,0.08)] md:p-10">
            <div className="max-w-xl">
              <Image
                src="/products/chulepancakes-platano/title.svg"
                alt="ChulePancakes"
                width={460}
                height={150}
                className="h-auto w-full max-w-[380px] object-contain"
              />

              <p className="mt-6 text-2xl font-semibold">Avena y plátano</p>

              <div className="mt-6 space-y-3 text-lg text-[#4A2E1F]/85">
                <p>Pack de 6 unidades</p>
                <p>Hechos en casa 🐾</p>
              </div>

              <div className="mt-8">
                <p className="text-6xl font-semibold tracking-tight">S/ 18</p>
                <p className="mt-2 text-base text-[#4A2E1F]/70">+ delivery</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://wa.me/51997712366?text=Hola%2C%20quiero%20pedir%20ChulePancakes%20de%20pl%C3%A1tano%20%F0%9F%90%B6"
                  target="_blank"
                  className="rounded-full bg-[#4A2E1F] px-7 py-3.5 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
                >
                  Pedir por WhatsApp
                </Link>

                <Link
                  href="/contacto"
                  className="rounded-full border border-[#4A2E1F]/15 bg-white/70 px-6 py-3.5 text-sm font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  Contacto
                </Link>
              </div>

              <div className="mt-10 rounded-[1.5rem] bg-[#DDB45A]/25 p-6">
                <p className="text-sm leading-7 text-[#4A2E1F]/85">
                  Nuestro primer lanzamiento está inspirado en la misma idea que
                  dio origen a Los Chules: compartir momentos simples, ricos y
                  especiales con quienes nos acompañan cada día.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMO PEDIR */}
        <div className="mt-16 rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_14px_36px_rgba(74,46,31,0.08)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Cómo pedir
              </h2>

              <p className="mt-6 text-lg text-[#4A2E1F]/85">
                Escríbenos por WhatsApp
              </p>

              <p className="mt-2 text-4xl font-semibold tracking-tight">
                997 712 366
              </p>

              <div className="mt-8">
                <Link
                  href="https://wa.me/51997712366?text=Hola%2C%20quiero%20pedir%20ChulePancakes%20de%20pl%C3%A1tano%20%F0%9F%90%B6"
                  target="_blank"
                  className="inline-flex rounded-full bg-[#4A2E1F] px-6 py-3 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
                >
                  Ir a WhatsApp
                </Link>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <h3 className="text-lg font-semibold">Envíanos</h3>
                <ul className="mt-4 space-y-2 text-base text-[#4A2E1F]/85">
                  <li>• Nombre</li>
                  <li>• Cantidad</li>
                  <li>• Dirección</li>
                </ul>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7EFE2] p-6">
                <h3 className="text-lg font-semibold">Pago y entrega</h3>
                <div className="mt-4 space-y-3 text-base text-[#4A2E1F]/85">
                  <p>Pago por Yape 💜</p>
                  <p>(al mismo número)</p>
                  <p>+ delivery</p>
                  <p>Tiempo de entrega: 1 día</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CIERRE */}
        <div className="mt-16 rounded-[2rem] bg-[#4A2E1F] px-8 py-12 text-center text-[#F3E7D3] shadow-[0_20px_55px_rgba(74,46,31,0.2)] md:px-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            ChulePancakes, hechos con amor 🐾
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F3E7D3]/80 md:text-base">
            Nuestro primer producto ya está aquí. Escríbenos y haz tu pedido.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://wa.me/51997712366?text=Hola%2C%20quiero%20pedir%20ChulePancakes%20de%20pl%C3%A1tano%20%F0%9F%90%B6"
              target="_blank"
              className="rounded-full bg-[#DDB45A] px-6 py-3 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Pedir ahora
            </Link>

            <Link
              href="/contacto"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}