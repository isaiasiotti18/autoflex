import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { rawMaterialApi } from "../services/raw-material.api";

export function useRawMaterialsTable() {
  const queryClient = useQueryClient();

  const { data: rawMaterials } = useSuspenseQuery({
    queryKey: ["raw-materials"],
    queryFn: rawMaterialApi.list,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => rawMaterialApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raw-materials"] });
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this raw material?");
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete raw material:", error);
      alert("Failed to delete raw material.");
    }
  };

  return {
    rawMaterials,
    isDeleting: deleteMutation.isPending,
    handleDelete,
  };
}
