package repository;

import java.util.List;
import java.util.Optional;

import domain.Product;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {
  public List<Product> listAllWithRawMaterials() {
    return find("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.rawMaterials rm LEFT JOIN FETCH rm.rawMaterial")
        .list();
  }

  public Optional<Product> findByIdWithRawMaterials(Long id) {
    return find(
        "SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.rawMaterials prm LEFT JOIN FETCH prm.rawMaterial rm WHERE p.id = ?1",
        id).firstResultOptional();
  }
}
