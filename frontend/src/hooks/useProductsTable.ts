import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.api";

export function useProductsTable() {
  const queryClient = useQueryClient();

  const { data: products } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: productApi.list,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  return {
    products,
    isDeleting: deleteMutation.isPending,
    handleDelete,
  };
}
