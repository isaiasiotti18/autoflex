import { useMemo, useState } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { queryKeys } from "../services/query-keys";
import { rawMaterialApi } from "../services/raw-material.api";
import { productRawMaterialApi } from "../services/product-raw-material.api";

import type { RawMaterial } from "../domain/RawMaterial";
import type {
  ProductRawMaterial,
  CreateProductRawMaterialDTO,
  UpdateProductRawMaterialDTO,
} from "../domain/ProductRawMaterial";

export function useProductRawMaterialsSection(productId: number) {
  const queryClient = useQueryClient();

  const { data: associations } = useSuspenseQuery<ProductRawMaterial[]>({
    queryKey: queryKeys.productRawMaterialsByProductId(productId),
    queryFn: () => productRawMaterialApi.listByProductId(productId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: rawMaterials } = useSuspenseQuery<RawMaterial[]>({
    queryKey: queryKeys.rawMaterials,
    queryFn: rawMaterialApi.list,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateProductRawMaterialDTO) => productRawMaterialApi.create(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.productRawMaterialsByProductId(productId),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.productById(productId) }),
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (args: { id: number; payload: UpdateProductRawMaterialDTO }) =>
      productRawMaterialApi.update(args.id, args.payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.productRawMaterialsByProductId(productId),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.productById(productId) }),
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productRawMaterialApi.remove(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.productRawMaterialsByProductId(productId),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.productById(productId) }),
      ]);
    },
  });

  const usedIds = useMemo(() => new Set(associations.map((a) => a.rawMaterialId)), [associations]);

  const availableOptions = useMemo(
    () => rawMaterials.filter((rm) => !usedIds.has(rm.id)),
    [rawMaterials, usedIds],
  );

  // no useEffect: selected id is derived if state is 0
  const [rawMaterialId, setRawMaterialId] = useState<number>(0);
  const selectedRawMaterialId = rawMaterialId || availableOptions[0]?.id || 0;

  const [requiredQuantity, setRequiredQuantity] = useState<number>(1);

  const isBusy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const add = async () => {
    if (!selectedRawMaterialId) return;
    if (!Number.isFinite(requiredQuantity) || requiredQuantity < 1) return;

    await createMutation.mutateAsync({
      productId,
      rawMaterialId: selectedRawMaterialId,
      requiredQuantity,
    });

    setRawMaterialId(0);
    setRequiredQuantity(1);
  };

  const remove = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const updateQty = async (id: number, rmId: number, qty: number) => {
    if (!Number.isFinite(qty) || qty < 1) return;

    await updateMutation.mutateAsync({
      id,
      payload: { productId, rawMaterialId: rmId, requiredQuantity: qty },
    });
  };

  return {
    associations,
    rawMaterials,
    availableOptions,
    selectedRawMaterialId,
    setRawMaterialId,
    requiredQuantity,
    setRequiredQuantity,
    add,
    remove,
    updateQty,
    isBusy,
  };
}
