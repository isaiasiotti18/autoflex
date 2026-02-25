import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { rawMaterialApi } from "../services/raw-material.api";
import type { RawMaterialFormValues } from "../validations/raw-material.schema";

export function useEditRawMaterialForm(rawMaterialId: number) {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["raw-materials", rawMaterialId],
    queryFn: () => rawMaterialApi.findById(rawMaterialId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (payload: RawMaterialFormValues) => rawMaterialApi.update(rawMaterialId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["raw-materials"] }),
        queryClient.invalidateQueries({ queryKey: ["raw-materials", rawMaterialId] }),
      ]);
    },
  });

  const submit = async (values: RawMaterialFormValues) => {
    return mutation.mutateAsync({
      name: values.name.trim(),
      quantity: values.quantity,
    });
  };

  return {
    rawMaterial: data,
    submit,
    isPending: mutation.isPending,
  };
}
