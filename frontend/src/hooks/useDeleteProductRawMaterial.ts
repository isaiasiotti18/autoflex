import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRawMaterialApi } from "../services/product-raw-material.api";

export function useDeleteProductRawMaterial(productId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => productRawMaterialApi.remove(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["product-raw-materials", productId] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["products", productId] }),
      ]);
    },
  });

  return {
    remove: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
