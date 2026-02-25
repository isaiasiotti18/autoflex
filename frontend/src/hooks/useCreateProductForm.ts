import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../services/product.api";
import type { ProductFormValues } from "../validations/product.schema";

export function useCreateProductForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ProductFormValues) => productApi.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const submit = async (values: ProductFormValues) => {
    return mutation.mutateAsync({
      name: values.name.trim(),
      value: values.value,
    });
  };

  return {
    submit,
    isPending: mutation.isPending,
  };
}
