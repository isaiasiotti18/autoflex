export type ProductRawMaterialSummary = {
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
};

export interface Product {
  id: number;
  name: string;
  value: number;
  rawMaterials: Array<ProductRawMaterialSummary> | [];
}

export interface CreateProductDTO {
  name: string;
  value: number;
}

export interface UpdateProductDTO {
  name?: string;
  value?: number;
}
