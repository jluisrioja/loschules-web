import TrackedLink from "@/components/TrackedLink";
import { whatsappUrl } from "@/lib/site";

export type WhatsAppOrigen =
  | "header"
  | "barra-productos"
  | "producto"
  | "cierre"
  | "contacto"
  | "inicio"
  | "enlaces"
  | "novedades"
  | "novedades-promo"
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

// Enlace a WhatsApp con el mensaje precargado; registra whatsapp_click con su origen.
export default function WhatsAppLink({
  message,
  origen,
  sabor,
  className,
  onClick,
  children,
}: WhatsAppLinkProps) {
  return (
    <TrackedLink
      href={whatsappUrl(message)}
      evento="whatsapp_click"
      datos={sabor ? { origen, sabor } : { origen }}
      className={className}
      onClick={onClick}
    >
      {children}
    </TrackedLink>
  );
}
