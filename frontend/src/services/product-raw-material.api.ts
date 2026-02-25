import { api } from "./api";
import type {
  CreateProductRawMaterialDTO,
  ProductRawMaterial,
  UpdateProductRawMaterialDTO,
} from "../domain/ProductRawMaterial";

const BASE_PATH = "/product-raw-materials";

export const productRawMaterialApi = {
  list: () => api.get<ProductRawMaterial[]>(BASE_PATH),

  listByProductId: (productId: number) =>
    api.get<ProductRawMaterial[]>(`${BASE_PATH}?productId=${productId}`),

  findById: (id: number) => api.get<ProductRawMaterial>(`${BASE_PATH}/${id}`),

  create: (payload: CreateProductRawMaterialDTO) =>
    api.post<ProductRawMaterial>(BASE_PATH, payload),

  update: (id: number, payload: UpdateProductRawMaterialDTO) =>
    api.patch<ProductRawMaterial>(`${BASE_PATH}/${id}`, payload),

  remove: (id: number) => api.delete(`${BASE_PATH}/${id}`),
};
