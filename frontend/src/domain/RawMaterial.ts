export interface RawMaterial {
  id: Number;
  name: String;
  quantity: String;
}

export interface CreateRawMaterialDTO {
  name: string;
  quantity: number;
}

export interface UpdateRawMaterialDTO {
  name?: string;
  quantity?: number;
}
