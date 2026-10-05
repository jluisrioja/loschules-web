// Catálogo de productos. Fuente única de líneas, sabores y precios.
// Un sabor solo se muestra si tiene descripción y precio (ver saboresActivos).

export type Categoria = "comida" | "otros";

export type Sabor = {
  id: string;
  nombre: string;
  descripcion: string | null;
  /** Precio en soles. */
  precio: number | null;
  presentacion: string;
  /** Imagen principal del sabor. Si falta, se usa la portada de la línea. */
  imagen?: string;
  /** Logotipo del producto con el sabor, si existe. */
  logotipo?: ImagenProducto;
};

export type ImagenProducto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Linea = {
  slug: string;
  nombre: string;
  categoria: Categoria;
  /** Portada de la línea (tarjeta del catálogo y respaldo de los sabores sin imagen). */
  portada: ImagenProducto;
  /** Imágenes adicionales de la línea (miniaturas de la galería). */
  galeria: ImagenProducto[];
  sabores: Sabor[];
};

export type SaborActivo = Sabor & { descripcion: string; precio: number };

export const CATEGORIAS: Record<Categoria, string> = {
  comida: "Comida",
  otros: "Otros",
};

const CHULEPANCAKES_IMG = "/products/chulepancakes-platano";

const LINEAS: Linea[] = [
  {
    slug: "chulepancakes",
    nombre: "ChulePancakes",
    categoria: "comida",
    portada: {
      src: `${CHULEPANCAKES_IMG}/cover.png`,
      alt: "ChulePancakes de plátano",
      width: 1200,
      height: 1600,
    },
    galeria: [
      {
        src: `${CHULEPANCAKES_IMG}/detail-1.png`,
        alt: "Detalle 1 de ChulePancakes",
        width: 1200,
        height: 1600,
      },
      {
        src: `${CHULEPANCAKES_IMG}/detail-2.png`,
        alt: "Detalle 2 de ChulePancakes",
        width: 1200,
        height: 1600,
      },
    ],
    sabores: [
      {
        id: "platano",
        nombre: "Plátano",
        descripcion: "Avena y plátano.",
        presentacion: "Pack de 6",
        precio: 18,
        imagen: `${CHULEPANCAKES_IMG}/cover.png`,
        logotipo: {
          src: `${CHULEPANCAKES_IMG}/title.svg`,
          alt: "ChulePancakes",
          width: 1150,
          height: 215,
        },
      },
      {
        id: "camote",
        nombre: "Camote",
        // TODO: descripción y precio POR CONFIRMAR. Mientras sean null, el sabor no se muestra.
        // TODO: sin imagen propia; usará la portada de la línea.
        descripcion: null,
        presentacion: "Pack de 6",
        precio: null,
      },
    ],
  },
];

export function saboresActivos(linea: Linea): SaborActivo[] {
  return linea.sabores.filter(
    (sabor): sabor is SaborActivo =>
      sabor.descripcion !== null && sabor.precio !== null,
  );
}

/** Líneas con al menos un sabor activo, opcionalmente filtradas por categoría. */
export function getLineas(categoria?: Categoria): Linea[] {
  return LINEAS.filter(
    (linea) =>
      saboresActivos(linea).length > 0 &&
      (categoria === undefined || linea.categoria === categoria),
  );
}

/** Línea por slug, solo si tiene algún sabor activo. */
export function getLinea(slug: string): Linea | undefined {
  return getLineas().find((linea) => linea.slug === slug);
}

/** Sabor activo por id; si no existe o está inactivo, el primer sabor activo. */
export function getSabor(
  linea: Linea,
  id?: string | null,
): SaborActivo | undefined {
  const activos = saboresActivos(linea);
  return activos.find((sabor) => sabor.id === id) ?? activos[0];
}

/** "ChulePancakes de plátano" */
export function nombreProducto(linea: Linea, sabor: Sabor): string {
  return `${linea.nombre} de ${sabor.nombre.toLocaleLowerCase("es")}`;
}

/** 18 -> "S/ 18" */
export function formatPrecio(precio: number): string {
  return `S/ ${Number.isInteger(precio) ? precio : precio.toFixed(2)}`;
}
