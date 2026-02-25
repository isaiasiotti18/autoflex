import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRawMaterialApi } from "../services/product-raw-material.api";

type UpdatePayload = {
  productId: number;
  rawMaterialId: number;
  requiredQuantity: number;
};

export function useUpdateProductRawMaterial(productId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (args: { id: number; payload: UpdatePayload }) =>
      productRawMaterialApi.update(args.id, args.payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["product-raw-materials", productId] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["products", productId] }),
      ]);
    },
  });

  return {
    update: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
