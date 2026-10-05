"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

type TrackedLinkProps = {
  href: string;
  /** Nombre del evento de Vercel Analytics (p. ej. "whatsapp_click", "spotify_click"). */
  evento: string;
  datos?: Record<string, string>;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

// Enlace que registra un evento al hacer clic. Las URL absolutas (http/https)
// se abren en otra pestaña con rel="noopener noreferrer"; las internas usan next/link.
export default function TrackedLink({
  href,
  evento,
  datos,
  className,
  onClick,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    track(evento, datos);
    onClick?.();
  };

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
