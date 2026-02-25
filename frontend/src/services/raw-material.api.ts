import { api } from "./api";
import type {
  CreateRawMaterialDTO,
  RawMaterial,
  UpdateRawMaterialDTO,
} from "../domain/RawMaterial";

const BASE_PATH = "/raw-materials";

export const rawMaterialApi = {
  list: () => api.get<RawMaterial[]>(BASE_PATH),

  findById: (id: number) => api.get<RawMaterial>(`${BASE_PATH}/${id}`),

  create: (payload: CreateRawMaterialDTO) => api.post<RawMaterial>(BASE_PATH, payload),

  update: (id: number, payload: UpdateRawMaterialDTO) =>
    api.put<RawMaterial>(`${BASE_PATH}/${id}`, payload),

  remove: (id: number) => api.delete(`${BASE_PATH}/${id}`),
};
