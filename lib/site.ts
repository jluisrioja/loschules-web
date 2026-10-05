// Datos de contacto de negocio. Fuente única: no duplicar en páginas ni componentes.
// Cualquier cambio de número, mensajes o handle requiere confirmación explícita.

import { nombreProducto, type Linea, type Sabor } from "@/lib/productos";

export const SITE_URL = "https://www.loschules.com";

export const WHATSAPP_NUMBER = "51997712366";
export const WHATSAPP_DISPLAY = "997 712 366";
export const WHATSAPP_DISPLAY_INTERNATIONAL = "+51 997 712 366";
export const TEL_URL = `tel:+${WHATSAPP_NUMBER}`;

export const WHATSAPP_MESSAGES = {
  info: "Hola, quiero información sobre Los Chules 🐶",
  pedido: "Hola, quiero pedir ChulePancakes de plátano 🐶",
} as const;

export const INSTAGRAM_HANDLE = "los_chules_pets";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const PRODUCT = {
  name: "ChulePancakes de plátano",
  price: 18,
  priceLabel: "S/ 18",
  currency: "PEN",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de pedido de un sabor, con los campos que completa el cliente. */
export function mensajePedido(linea: Linea, sabor: Sabor) {
  return `Hola, quiero pedir ${nombreProducto(linea, sabor)}.\nNombre:\nCantidad:\nDirección:`;
}

export function mensajePedidoUrl(linea: Linea, sabor: Sabor) {
  return whatsappUrl(mensajePedido(linea, sabor));
}
