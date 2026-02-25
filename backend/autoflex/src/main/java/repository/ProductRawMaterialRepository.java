package repository;

import java.util.Optional;

import domain.ProductRawMaterial;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductRawMaterialRepository implements PanacheRepository<ProductRawMaterial> {
  public Optional<ProductRawMaterial> findByProductAndRawMaterial(Long productId, Long rawMaterialId) {
    return find("product.id = ?1 and rawMaterial.id = ?2", productId, rawMaterialId)
        .firstResultOptional();
  }
}
