import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.api";
import type { ProductFormValues } from "../validations/product.schema";

export function useEditProductForm(productId: number) {
  const queryClient = useQueryClient();

  const { data: product } = useSuspenseQuery({
    queryKey: ["products", productId],
    queryFn: () => productApi.findById(productId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (payload: ProductFormValues) => productApi.update(productId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["products", productId] }),
      ]);
    },
  });

  const submit = async (values: ProductFormValues) => {
    return mutation.mutateAsync({
      name: values.name.trim(),
      value: values.value,
    });
  };

  return {
    product,
    submit,
    isPending: mutation.isPending,
  };
}
