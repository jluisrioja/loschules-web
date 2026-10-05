import Image from "next/image";

// TODO: no existe portada propia del podcast. Mientras tanto se usa el logo
// (Chuletas y Lobito) sobre fondo crema, en un recuadro cuadrado.
export default function PodcastPortada({
  size,
  className = "",
}: {
  /** Lado máximo en px en escritorio. */
  size: number;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-square w-full items-center justify-center rounded-[2rem] border border-[#4A2E1F]/10 bg-[#F7EFE2] p-6 shadow-[0_14px_36px_rgba(74,46,31,0.08)] ${className}`}
      style={{ maxWidth: size }}
    >
      <Image
        src="/logo.png"
        alt="Los Chules"
        width={1062}
        height={1054}
        sizes={`(min-width: 768px) ${size - 48}px, calc(100vw - 96px)`}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
