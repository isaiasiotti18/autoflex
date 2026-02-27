import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { productionCapacityApi } from "../services/production-capacity.api";
import { queryKeys } from "../services/query-keys";
import type { ProductionCapacityResponse } from "../domain/ProductionCapacity";

export function useProductionCapacity() {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery<ProductionCapacityResponse>({
    queryKey: queryKeys.productionCapacity,
    queryFn: productionCapacityApi.get,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.productionCapacity });
  };

  return { data, refresh };
}
