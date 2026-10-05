"use client";

import { track } from "@vercel/analytics";
import { whatsappUrl } from "@/lib/site";

export type WhatsAppOrigen =
  | "header"
  | "barra-productos"
  | "producto"
  | "cierre"
  | "contacto";

type WhatsAppLinkProps = {
  message: string;
  origen: WhatsAppOrigen;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function WhatsAppLink({
  message,
  origen,
  className,
  onClick,
  children,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track("whatsapp_click", { origen });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
