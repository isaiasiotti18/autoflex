import type { RawMaterial } from "./RawMaterial";

export interface Product {
  id: Number;
  name: String;
  value: Number;
  rawMaterials: Array<RawMaterial> | [];
}
