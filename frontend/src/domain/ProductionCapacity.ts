export type ProductionCapacityRawMaterial = {
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
};

export type ProductionCapacityItem = {
  id: number;
  name: string;
  maxUnits: number;
  value: number;
  totalValue: number;
  rawMaterials: ProductionCapacityRawMaterial[];
};

export type ProductionCapacityResponse = {
  grandTotalValue: number;
  items: ProductionCapacityItem[];
};
