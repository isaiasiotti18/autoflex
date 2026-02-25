package repository;

import java.util.List;
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

  public List<ProductRawMaterial> listAllWithRelations() {
    return find("""
        select prm
        from ProductRawMaterial prm
        join fetch prm.product
        join fetch prm.rawMaterial
        order by prm.id
        """).list();
  }

  public List<ProductRawMaterial> listByProductIdWithRelations(Long productId) {
    return find("""
        select prm
        from ProductRawMaterial prm
        join fetch prm.product
        join fetch prm.rawMaterial
        where prm.product.id = ?1
        order by prm.id
        """, productId).list();
  }

  public Optional<ProductRawMaterial> findByIdWithRelations(Long id) {
    return find("""
        select prm
        from ProductRawMaterial prm
        join fetch prm.product
        join fetch prm.rawMaterial
        where prm.id = ?1
        """, id).firstResultOptional();
  }
}
