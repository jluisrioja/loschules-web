"use client";

import { track } from "@vercel/analytics";
import { whatsappUrl } from "@/lib/site";

export type WhatsAppOrigen =
  | "header"
  | "barra-productos"
  | "producto"
  | "cierre"
  | "contacto"
  | `producto-${string}`;

type WhatsAppLinkProps = {
  message: string;
  origen: WhatsAppOrigen;
  /** Id del sabor pedido, se envía junto al evento. */
  sabor?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function WhatsAppLink({
  message,
  origen,
  sabor,
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
        track("whatsapp_click", sabor ? { origen, sabor } : { origen });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
