package dto.productrawmaterial;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import jakarta.validation.constraints.Min;

public record UpdateProductRawMaterialDTO(
    @JsonSetter(nulls = Nulls.FAIL) Long productId,

    @JsonSetter(nulls = Nulls.FAIL) Long rawMaterialId,

    @JsonSetter(nulls = Nulls.FAIL) @Min(value = 1, message = "requiredQuantity must be >= 1") Integer requiredQuantity) {
}