package dto.production;

import java.math.BigDecimal;
import java.util.List;

import org.jspecify.annotations.NonNull;

import dto.product.ProductRawMaterialResponseDTO;

public record TotalProductionResponseDTO(
    Long id,
    String name,
    Integer maxUnits,
    BigDecimal value,
    BigDecimal totalValue,
    List<@NonNull ProductRawMaterialResponseDTO> rawMaterials) {
}
