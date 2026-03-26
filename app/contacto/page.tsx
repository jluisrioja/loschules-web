import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="bg-[#F3E7D3] text-[#4A2E1F]">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-[#4A2E1F]/10 bg-white/60 px-4 py-2 text-sm text-[#4A2E1F]/75 shadow-sm">
            Hablemos 🐾
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Contacto
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#4A2E1F]/80">
            ¿Quieres pedir, hacer una consulta o saber más sobre Los Chules?
            Escríbenos y estaremos felices de ayudarte.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* WhatsApp */}
          <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_10px_30px_rgba(74,46,31,0.05)]">
            <div className="text-3xl">💬</div>
            <h2 className="mt-4 text-2xl font-semibold">WhatsApp</h2>
            <p className="mt-4 text-base leading-8 text-[#4A2E1F]/80">
              +51 997 712 366
            </p>

            <div className="mt-6">
              <Link
                href="https://wa.me/51997712366?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Los%20Chules%20%F0%9F%90%B6"
                target="_blank"
                className="inline-flex rounded-full bg-[#4A2E1F] px-6 py-3 text-sm font-medium text-[#F3E7D3] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
              >
                Escríbenos por WhatsApp
              </Link>
            </div>
          </div>

          {/* Instagram */}
          <div className="rounded-[2rem] border border-[#4A2E1F]/10 bg-white/55 p-8 shadow-[0_10px_30px_rgba(74,46,31,0.05)]">
            <div className="text-3xl">📷</div>
            <h2 className="mt-4 text-2xl font-semibold">Instagram</h2>
            <p className="mt-4 text-base leading-8 text-[#4A2E1F]/80">
              @los_chules_pets
            </p>

            <div className="mt-6">
              <Link
                href="https://instagram.com/los_chules_pets"
                target="_blank"
                className="inline-flex rounded-full border border-[#4A2E1F]/15 bg-white/70 px-6 py-3 text-sm font-medium text-[#4A2E1F] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                Ver Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#DDB45A]/18 p-8 md:p-10">
          <p className="max-w-3xl text-base leading-8 text-[#4A2E1F]/85 md:text-lg">
            También puedes escribirnos para colaboraciones, consultas o pedidos
            especiales. Estaremos encantados de leerte.
          </p>
        </div>
      </section>
    </main>
  );
}