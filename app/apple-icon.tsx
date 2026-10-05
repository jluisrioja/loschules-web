import { logoImage } from "@/lib/logo-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rellena la transparencia con negro: fondo crema de marca.
export default function AppleIcon() {
  return logoImage({ ...size, logoWidth: 150, background: "#F3E7D3" });
}
