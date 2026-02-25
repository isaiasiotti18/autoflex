import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rawMaterialApi } from "../services/raw-material.api";
import type { RawMaterialFormValues } from "../validations/raw-material.schema";

export function useCreateRawMaterialForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: RawMaterialFormValues) => rawMaterialApi.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["raw-materials"] });
    },
  });

  const submit = async (values: RawMaterialFormValues) => {
    return mutation.mutateAsync({
      name: values.name.trim(),
      quantity: values.quantity,
    });
  };

  return {
    submit,
    isPending: mutation.isPending,
  };
}
