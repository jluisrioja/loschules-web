export default function FeaturedProductSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#E8DCCB] px-4 py-2 text-sm text-[#4A2E1F]">
              Primer lanzamiento
            </span>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#4A2E1F] md:text-5xl">
              Nuestra primera creación
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#5E463A] md:text-lg">
              Comenzamos con un producto simple pero significativo: un snack
              artesanal que representa el origen de Los Chules y marca el inicio
              de un ecosistema en expansión.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#E8DCCB] bg-white/40 p-8">
            <div className="rounded-[1.5rem] bg-[#FFF9F2] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#8E8BB0]">
                Producto actual
              </p>

              <h3 className="mt-3 text-3xl font-semibold text-[#4A2E1F]">
                Chulepancakes
              </h3>

              <p className="mt-4 text-base leading-7 text-[#5E463A]">
                Nuestro primer paso: un snack artesanal que resume el origen, la
                calidez y la visión futura de la marca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}