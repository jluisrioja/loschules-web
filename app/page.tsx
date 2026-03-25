import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[#F3E7D3] text-[#4A2E1F]">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-4 py-2 text-sm text-[#4A2E1F]/75 shadow-sm">
              Marca artesanal inspirada en Chuletas y Lobito
            </p>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Momentos felices, juntos 🐾
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4A2E1F]/80">
              Productos pensados para compartir, cuidar y disfrutar la vida con
              quienes más queremos.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/nosotros"
                className="rounded-full bg-[#4A2E1F] px-6 py-3 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
              >
                Conócenos
              </Link>

              <Link
                href="/productos"
                className="rounded-full border border-[#4A2E1F]/15 bg-white/60 px-6 py-3 text-sm font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                Ver productos
              </Link>
            </div>
          </div>

          {/* BLOQUE LOGO GRANDE */}
          <div className="relative rounded-[2rem] border border-[#4A2E1F]/10 bg-white/45 p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)]">
            <div className="absolute right-6 top-6 text-2xl text-[#8E8BB0]/70">
              🐾
            </div>

            <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#4A2E1F]/12 bg-[#F7EFE2] p-8">
              <div className="text-center">
                <Image
                  src="/logo.png"
                  alt="Los Chules"
                  width={320}
                  height={320}
                  className="mx-auto h-auto w-full max-w-[320px] object-contain transition duration-300 hover:scale-[1.02]"
                  priority
                />
                <p className="mt-6 text-sm text-[#4A2E1F]/55">
                  espacio visual principal para logo grande
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUE ES LOS CHULES */}
      <section className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_10px_30px_rgba(74,46,31,0.05)] md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-snug md:text-4xl">
              ¿Qué es Los Chules?
            </h2>

            <p className="mt-6 text-base leading-8 text-[#4A2E1F]/80 md:text-lg">
              <strong>
                Los Chules es una marca artesanal inspirada en nuestros perros,
                Chuletas y Lobito.
              </strong>{" "}
              Empezamos con panqueques naturales para mascotas, pero nuestra
              visión es construir una marca de productos que fomenten el
              bienestar y la conexión entre mascotas y sus dueños.
            </p>
          </div>
        </div>
      </section>

      {/* MINI HISTORIA */}
      <section className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <div className="rounded-[2rem] bg-[#F28C28]/15 p-8 shadow-[0_10px_26px_rgba(242,140,40,0.08)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xl font-medium leading-9 text-[#4A2E1F]/90 md:text-2xl">
              Todo comenzó en casa, entre desayunos, panqueques y dos perritos
              que terminaron inspirando una marca.
            </p>

            <div className="mt-6">
              <Link
                href="/nosotros"
                className="inline-flex rounded-full border border-[#4A2E1F]/15 bg-white/70 px-5 py-2.5 text-sm font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                Conoce nuestra historia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Esto recién empieza
          </h2>

          <p className="mt-5 text-base leading-8 text-[#4A2E1F]/80 md:text-lg">
            Hoy empezamos con nuestro primer producto. Mañana seguiremos
            creciendo con nuevas ideas, accesorios y experiencias para mascotas
            y sus familias.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
          <div className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_8px_24px_rgba(74,46,31,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(74,46,31,0.08)]">
            <h3 className="text-lg font-semibold">Nuevos productos</h3>
            <p className="mt-3 text-sm leading-7 text-[#4A2E1F]/75">
              Seguiremos ampliando la marca con propuestas pensadas para la vida
              diaria con nuestras mascotas.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_8px_24px_rgba(74,46,31,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(74,46,31,0.08)]">
            <h3 className="text-lg font-semibold">Accesorios</h3>
            <p className="mt-3 text-sm leading-7 text-[#4A2E1F]/75">
              Queremos crecer hacia una línea con identidad, utilidad y un estilo
              propio.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#4A2E1F]/10 bg-white/55 p-6 shadow-[0_8px_24px_rgba(74,46,31,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(74,46,31,0.08)]">
            <h3 className="text-lg font-semibold">Experiencias</h3>
            <p className="mt-3 text-sm leading-7 text-[#4A2E1F]/75">
              Más que productos, buscamos construir momentos que fortalezcan el
              vínculo con quienes nos acompañan cada día.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#4A2E1F] px-8 py-12 text-center text-[#F3E7D3] shadow-[0_20px_55px_rgba(74,46,31,0.2)] md:px-12 md:py-14">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Haz feliz a quien te acompaña cada día 🐾
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F3E7D3]/80 md:text-base">
            Descubre nuestra marca, conoce nuestra historia y mira lo que ya
            estamos empezando a construir.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/productos"
              className="rounded-full bg-[#DDB45A] px-6 py-3 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Ver productos
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