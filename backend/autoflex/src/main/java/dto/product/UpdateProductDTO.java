package dto.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

public record UpdateProductDTO(
    @JsonSetter(nulls = Nulls.FAIL) @Size(max = 150, message = "Name must not exceed 150 characters") String name,

    @JsonSetter(nulls = Nulls.FAIL) @DecimalMin(value = "0.01", message = "Value must be greater than 0") BigDecimal value) {
}