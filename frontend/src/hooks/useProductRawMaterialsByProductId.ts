import { useSuspenseQuery } from "@tanstack/react-query";
import { productRawMaterialApi } from "../services/product-raw-material.api";

export function useProductRawMaterialsByProductId(productId: number) {
  return useSuspenseQuery({
    queryKey: ["product-raw-materials", productId],
    queryFn: () => productRawMaterialApi.listByProductId(productId),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
