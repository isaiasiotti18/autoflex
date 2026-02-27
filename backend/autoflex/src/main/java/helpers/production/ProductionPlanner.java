package helpers.production;

import java.math.BigDecimal;
import java.util.*;

import domain.Product;
import dto.production.TotalProductionResponseDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProductionPlanner {

  @Inject
  ProductionCalculator calculator;

  @Inject
  ProductionMapper mapper;

  public Map<String, Object> plan(List<Product> products) {
    Map<Long, Integer> available = buildAvailableStock(products);

    List<Product> ordered = new ArrayList<>(products);
    ordered.sort(
        Comparator.comparing(Product::getValue, Comparator.nullsLast(Comparator.naturalOrder()))
            .reversed()
            .thenComparing(Product::getId, Comparator.nullsLast(Comparator.naturalOrder())));

    List<TotalProductionResponseDTO> items = new ArrayList<>();
    BigDecimal grandTotal = BigDecimal.ZERO;

    for (Product p : ordered) {
      int units = calculator.maxUnits(p, available);
      if (units <= 0)
        continue;

      calculator.consume(p, units, available);

      TotalProductionResponseDTO dto = mapper.toDTO(p, units);
      items.add(dto);
      grandTotal = grandTotal.add(dto.totalValue());
    }

    return Map.of(
        "items", items,
        "grandTotalValue", grandTotal);
  }

  private Map<Long, Integer> buildAvailableStock(List<Product> products) {
    Map<Long, Integer> available = new HashMap<>();

    for (Product p : products) {
      if (p.getRawMaterials() == null)
        continue;

      p.getRawMaterials().forEach(prm -> {
        if (prm.getRawMaterial() == null || prm.getRawMaterial().getId() == null)
          return;

        Long rmId = prm.getRawMaterial().getId();
        int stock = prm.getRawMaterial().getQuantity() == null ? 0 : prm.getRawMaterial().getQuantity();

        // garante que estoque inicial é o do banco, uma vez só
        available.putIfAbsent(rmId, Math.max(0, stock));
      });
    }

    return available;
  }
}