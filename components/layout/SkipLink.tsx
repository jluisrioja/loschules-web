"use client";

// Mueve el foco al contenido sin añadir "#contenido" al historial: una entrada
// de hash nativa no la gestiona el router de Next y "Atrás" dejaría la página
// anterior pintada. Sin JS, el href funciona como ancla normal.
export default function SkipLink() {
  return (
    <a
      href="#contenido"
      onClick={(event) => {
        const target = document.getElementById("contenido");
        if (!target) return;
        event.preventDefault();
        target.focus();
      }}
      className="sr-only rounded-full bg-[#4A2E1F] px-5 py-3 text-sm font-medium text-[#F3E7D3] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
    >
      Saltar al contenido
    </a>
  );
}
