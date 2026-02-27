package helpers.production;

import java.math.BigDecimal;
import java.util.List;

import org.jspecify.annotations.NonNull;

import domain.Product;
import dto.product.ProductRawMaterialResponseDTO;
import dto.production.TotalProductionResponseDTO;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductionMapper {

  public TotalProductionResponseDTO toDTO(Product p, int units) {
    List<@NonNull ProductRawMaterialResponseDTO> rms = p.getRawMaterials().stream()
        .map(prm -> new ProductRawMaterialResponseDTO(
            prm.getRawMaterial().getId(),
            prm.getRawMaterial().getName(),
            prm.getRequiredQuantity()))
        .toList();

    BigDecimal totalValue = (units <= 0 || p.getValue() == null)
        ? BigDecimal.ZERO
        : p.getValue().multiply(BigDecimal.valueOf(units));

    return new TotalProductionResponseDTO(
        p.getId(),
        p.getName(),
        units,
        p.getValue(),
        totalValue,
        rms);
  }
}