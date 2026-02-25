import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRawMaterialApi } from "../services/product-raw-material.api";

type CreatePayload = {
  productId: number;
  rawMaterialId: number;
  requiredQuantity: number;
};

export function useCreateProductRawMaterial(productId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreatePayload) => productRawMaterialApi.create(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["product-raw-materials", productId] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["products", productId] }),
      ]);
    },
  });

  return {
    create: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
