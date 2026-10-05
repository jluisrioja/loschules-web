import { logoImage } from "@/lib/logo-image";

export const alt = "Los Chules";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return logoImage({ ...size, logoWidth: 460, background: "#F3E7D3" });
}
