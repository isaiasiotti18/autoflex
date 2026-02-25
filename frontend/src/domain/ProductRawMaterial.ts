export interface ProductRawMaterial {
  id: number;
  productId: number;
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
}

export interface CreateProductRawMaterialDTO {
  productId: number;
  rawMaterialId: number;
  requiredQuantity: number;
}

export interface UpdateProductRawMaterialDTO {
  productId?: number;
  rawMaterialId?: number;
  requiredQuantity?: number;
}
