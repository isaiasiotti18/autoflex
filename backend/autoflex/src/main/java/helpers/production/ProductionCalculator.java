package helpers.production;

import java.util.List;
import java.util.Map;

import domain.Product;
import domain.ProductRawMaterial;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductionCalculator {

  public int maxUnits(Product product, Map<Long, Integer> availableStockByRmId) {
    List<ProductRawMaterial> prms = product.getRawMaterials();
    if (prms == null || prms.isEmpty())
      return 0;

    int max = Integer.MAX_VALUE;

    for (ProductRawMaterial prm : prms) {
      if (prm.getRawMaterial() == null || prm.getRawMaterial().getId() == null)
        return 0;

      int required = prm.getRequiredQuantity() == null ? 0 : prm.getRequiredQuantity();
      if (required <= 0)
        return 0;

      int stock = Math.max(0, availableStockByRmId.getOrDefault(prm.getRawMaterial().getId(), 0));
      int possible = stock / required;

      max = Math.min(max, possible);
      if (max == 0)
        return 0;
    }

    return max == Integer.MAX_VALUE ? 0 : max;
  }

  public void consume(Product product, int units, Map<Long, Integer> availableStockByRmId) {
    if (units <= 0)
      return;

    for (ProductRawMaterial prm : product.getRawMaterials()) {
      Long rmId = prm.getRawMaterial().getId();
      int required = prm.getRequiredQuantity() == null ? 0 : prm.getRequiredQuantity();

      long consume = (long) required * (long) units; // evita overflow
      int current = Math.max(0, availableStockByRmId.getOrDefault(rmId, 0));
      int next = (int) Math.max(0L, (long) current - consume);

      availableStockByRmId.put(rmId, next);
    }
  }
}