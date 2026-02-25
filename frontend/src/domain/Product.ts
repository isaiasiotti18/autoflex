export type ProductRawMaterialSummary = {
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
};

export interface Product {
  id: Number;
  name: String;
  value: Number;
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
