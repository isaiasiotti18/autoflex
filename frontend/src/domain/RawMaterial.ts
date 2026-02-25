export interface RawMaterial {
  id: number;
  name: string;
  quantity: number;
}

export interface CreateRawMaterialDTO {
  name: string;
  quantity: number;
}

export interface UpdateRawMaterialDTO {
  name?: string;
  quantity?: number;
}
