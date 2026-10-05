import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Proporción real de public/logo.png (1062×1054).
const LOGO_RATIO = 1054 / 1062;

// Genera en build una imagen con el logo centrado. Solo lee public/logo.png;
// no crea ni modifica archivos de imagen.
export async function logoImage({
  width,
  height,
  logoWidth,
  background,
}: {
  width: number;
  height: number;
  logoWidth: number;
  background?: string;
}) {
  const logo = await readFile(join(process.cwd(), "public/logo.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: background ?? "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          width={logoWidth}
          height={Math.round(logoWidth * LOGO_RATIO)}
          alt=""
        />
      </div>
    ),
    { width, height },
  );
}
