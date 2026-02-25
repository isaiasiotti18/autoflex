package dto.productrawmaterial;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateProductRawMaterialDTO(
    @NotNull(message = "productId is required") Long productId,

    @NotNull(message = "rawMaterialId is required") Long rawMaterialId,

    @NotNull(message = "requiredQuantity is required") @Min(value = 1, message = "requiredQuantity must be >= 1") Integer requiredQuantity) {
}