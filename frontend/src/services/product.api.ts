import { api } from "../services/api";
import type { CreateProductDTO, Product, UpdateProductDTO } from "../domain/Product";

const BASE_PATH = "/products";

export const productApi = {
  list: () => api.get<Product[]>(BASE_PATH),

  findById: (id: number) => api.get<Product>(`${BASE_PATH}/${id}`),

  create: (payload: CreateProductDTO) => api.post<Product>(BASE_PATH, payload),

  update: (id: number, payload: UpdateProductDTO) =>
    api.put<Product>(`${BASE_PATH}/${id}`, payload),

  remove: (id: number) => api.delete(`${BASE_PATH}/${id}`),
};
