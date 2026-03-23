import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Ecosistema", href: "/ecosistema" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8DCCB] bg-[#F3E7D3]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[#4A2E1F]"
        >
          Los Chules
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#4A2E1F] transition hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://instagram.com/los_chules_pets"
          className="rounded-2xl bg-[#DDB45A] px-5 py-2.5 text-sm font-semibold text-[#4A2E1F] transition hover:opacity-90"
        >
          Quiero el mío
        </Link>
      </div>
    </header>
  );
}