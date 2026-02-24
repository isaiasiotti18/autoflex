package dto.rawmaterial;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateRawMaterialDTO(
    @NotBlank(message = "Name is required") @Size(max = 150, message = "Name must not exceed 150 characters") String name,

    @NotNull(message = "Quantity is required") @Min(value = 0, message = "Quantity must be greater than or equal to 0") Integer quantity) {
}