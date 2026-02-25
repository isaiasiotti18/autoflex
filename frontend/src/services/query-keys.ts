export const queryKeys = {
  products: ["products"] as const,
  productById: (id: number) => ["products", id] as const,

  rawMaterials: ["raw-materials"] as const,
  rawMaterialById: (id: number) => ["raw-materials", id] as const,

  productRawMaterialsByProductId: (productId: number) =>
    ["product-raw-materials", productId] as const,
};
