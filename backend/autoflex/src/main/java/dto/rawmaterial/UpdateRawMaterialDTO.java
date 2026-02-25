package dto.rawmaterial;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UpdateRawMaterialDTO(
    @JsonSetter(nulls = Nulls.FAIL) @Size(max = 150, message = "Name must not exceed 150 characters") String name,

    @JsonSetter(nulls = Nulls.FAIL) @Min(value = 0, message = "Quantity must be greater than or equal to 0") Integer quantity) {
}