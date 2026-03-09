export default function LosChulesHomeV2() {
  return (
    <main className="min-h-screen bg-[#F3E7D3] text-[#4A2E1F]">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full bg-[#8E8BB0]/15 px-4 py-2 text-sm font-medium text-[#4A2E1F]">
              Hechos en casa • Con amor perruno
            </div>

            <h1
              className="text-5xl leading-none md:text-7xl"
              style={{ fontFamily: '"MANGO AC", "Poppins", sans-serif' }}
            >
              LOS CHULES
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 md:text-xl">
              Snacks artesanales para perritos felices, inspirados en momentos reales de familia,
              desayuno y amor por nuestros peludos.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/los_chules_pets"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#DDB45A] px-6 py-3 text-base font-semibold shadow-sm transition hover:scale-[1.02]"
              >
                Quiero el mío
              </a>
              <a
                href="#historia"
                className="rounded-2xl border-2 border-[#4A2E1F] px-6 py-3 text-base font-semibold transition hover:bg-[#4A2E1F] hover:text-[#F3E7D3]"
              >
                Conoce la historia
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-[#F28C28]/20 blur-2xl" />
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#8E8BB0]/20 blur-2xl" />
            <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/50 p-6 shadow-lg backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-[#FFF8EF] p-4">
                <img
                  src="/logo-los-chules.png"
                  alt="Logo Los Chules"
                  className="mx-auto h-auto max-h-[460px] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="px-6 py-6 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            'Hechos en casa',
            'Ingredientes simples',
            'Pensados para perritos',
            'Marca familiar y artesanal',
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] bg-white/60 p-5 text-center text-base font-semibold shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#8E8BB0]">
              Nuestra historia
            </p>
            <h2
              className="text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: '"MANGO AC", "Poppins", sans-serif' }}
            >
              Una marca que nació en casa
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8">
              <p>
                Los Chules nació entre desayunos caseros, panqueques recién hechos y dos perritos que
                siempre querían acercarse por un pedacito.
              </p>
              <p>
                Lo que comenzó como un momento cotidiano en familia terminó convirtiéndose en una idea
                hermosa: crear una marca cercana, simpática y hecha con cariño para compartir momentos
                felices con nuestros perros.
              </p>
              <p>
                Más que un snack, Los Chules representa ese vínculo especial entre las personas y sus
                perritos: compañía, alegría y amor del bueno.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#DDB45A]/20 p-6 shadow-sm">
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#F28C28]">Esencia</p>
                <p className="mt-2 text-lg font-medium">Cálida, familiar, artesanal y moderna.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#F28C28]">Inspiración</p>
                <p className="mt-2 text-lg font-medium">Desayunos compartidos, huellitas felices y vida en familia.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#F28C28]">Promesa</p>
                <p className="mt-2 text-lg font-medium">Construir una marca perruna honesta, linda y memorable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO PEDIR */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#4A2E1F] px-8 py-10 text-[#F3E7D3] shadow-xl md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#DDB45A]">
                ¿Cómo pedir?
              </p>
              <h2
                className="text-4xl leading-tight md:text-5xl"
                style={{ fontFamily: '"MANGO AC", "Poppins", sans-serif' }}
              >
                Escríbenos y te atendemos por directo
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#F3E7D3]/90">
                Por ahora, nuestros pedidos se coordinan directamente por Instagram para darte una atención
                cercana y mantener el espíritu artesanal de la marca.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/los_chules_pets"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#DDB45A] px-6 py-3 text-base font-semibold text-[#4A2E1F] transition hover:scale-[1.02]"
              >
                Ir a Instagram
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#F3E7D3]/40 px-6 py-3 text-base font-semibold transition hover:bg-[#F3E7D3] hover:text-[#4A2E1F]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#4A2E1F]/10 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p
              className="text-2xl"
              style={{ fontFamily: '"MANGO AC", "Poppins", sans-serif' }}
            >
              LOS CHULES
            </p>
            <p className="mt-1 text-sm text-[#4A2E1F]/70">
              Snacks artesanales para perritos felices.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-medium">
            <a
              href="https://instagram.com/los_chules_pets"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#F28C28]"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#F28C28]"
            >
              WhatsApp
            </a>
            <a href="https://loschules.com" className="transition hover:text-[#F28C28]">
              loschules.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
