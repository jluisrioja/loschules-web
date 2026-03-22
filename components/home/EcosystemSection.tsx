export default function EcosystemSection() {
  const items = [
    {
      title: "Snacks naturales",
      description:
        "Nuestra puerta de entrada: productos simples, honestos y pensados para perritos felices.",
    },
    {
      title: "Productos y accesorios",
      description:
        "Una línea futura de objetos útiles, bonitos y funcionales para el día a día con tu mascota.",
    },
    {
      title: "Comunidad y contenido",
      description:
        "Ideas, inspiración y experiencias para celebrar el vínculo real entre perros y familias.",
    },
    {
      title: "Tecnología para mascotas",
      description:
        "Una visión de largo plazo para integrar soluciones digitales al bienestar perruno.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-[#8E8BB0]">
            Visión
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#4A2E1F] md:text-5xl">
            Mucho más que un producto
          </h2>

          <p className="mt-4 text-base leading-7 text-[#5E463A] md:text-lg">
            Los Chules se está construyendo como un ecosistema que crecerá por
            capas: productos, experiencias, comunidad y tecnología.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-[#E8DCCB] bg-[#F8F2E9] p-6 transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#4A2E1F]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5E463A]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}