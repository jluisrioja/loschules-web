export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        Los Chules 🐶🥞
      </h1>

      <p className="text-xl text-gray-700 max-w-xl mb-6">
        Panqueques artesanales para perritos felices. Hechos en casa con
        ingredientes simples y mucho cariño.
      </p>

      <p className="text-gray-600 max-w-lg mb-10">
        Todo empezó cuando Claudia comenzó a preparar panqueques saludables en
        casa. A Chuletas y Lobito les encantaron… y así nació{" "}
        <b>Los Chules</b>.
      </p>

      <a
        href="https://instagram.com/los_chules_pets"
        target="_blank"
        rel="noreferrer"
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
      >
        Quiero el mío 🐾
      </a>

      <p className="mt-10 text-sm text-gray-500">
        Síguenos en Instagram @los_chules_pets
      </p>
    </main>
  );
}