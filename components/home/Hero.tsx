import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-[#E8DCCB] px-4 py-2 text-sm text-[#4A2E1F]">
              Hecho en casa • Pensado en grande
            </span>

            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight tracking-tight text-[#4A2E1F] md:text-7xl">
              Un ecosistema para perritos felices
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5E463A]">
              Empezamos con snacks artesanales, pero estamos construyendo una
              marca de productos, experiencias y tecnología para fortalecer el
              bienestar y la conexión entre perros y sus familias.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="https://instagram.com/los_chules_pets"
                className="rounded-2xl bg-[#DDB45A] px-6 py-3 text-sm font-semibold text-[#4A2E1F] hover:opacity-90"
              >
                Quiero el mío
              </Link>

              <Link
                href="/nosotros"
                className="rounded-2xl border border-[#4A2E1F] px-6 py-3 text-sm font-semibold text-[#4A2E1F] hover:bg-[#4A2E1F] hover:text-[#F3E7D3]"
              >
                Conoce la historia
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E8DCCB] bg-[#F8F2E9] p-6 shadow-[0_20px_60px_rgba(74,46,31,0.08)]">
            <div className="rounded-[1.5rem] bg-[#F4EEE6] p-6">
              <div className="flex min-h-[360px] items-center justify-center rounded-[1.25rem] border border-dashed border-[#DDB45A]/50 bg-[#FFF9F2] text-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#8E8BB0]">
                    Visual principal
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-[#4A2E1F]">
                    Aquí irá tu imagen
                  </p>
                  <p className="mt-2 px-6 text-sm text-[#5E463A]">
                    Luego colocamos el logo o foto de producto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}