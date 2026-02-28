import { api } from "./api";
import type { ProductionCapacityResponse } from "../domain/ProductionCapacity";

const BASE_PATH = "/production-capacity";

export const productionCapacityApi = {
  get: () => api.get<ProductionCapacityResponse>(BASE_PATH),
};
