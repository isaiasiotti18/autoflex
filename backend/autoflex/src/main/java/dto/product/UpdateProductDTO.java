package dto.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record UpdateProductDTO(
    @Size(max = 150, message = "Name must not exceed 150 characters") String name,

    @DecimalMin(value = "0.01", message = "Value must be greater than 0") BigDecimal value) {
}