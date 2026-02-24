package dto.product;

import java.math.BigDecimal;

public record ProductResponseDTO(
    Long id,
    String name,
    BigDecimal value) {
}