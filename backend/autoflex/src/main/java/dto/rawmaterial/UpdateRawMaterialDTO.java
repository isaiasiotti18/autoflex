package dto.rawmaterial;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UpdateRawMaterialDTO(
    @Size(max = 150, message = "Name must not exceed 150 characters") String name,

    @Min(value = 0, message = "Quantity must be greater than or equal to 0") Integer quantity) {
}