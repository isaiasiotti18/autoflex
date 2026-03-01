package domain;

import java.io.Serializable;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "product_raw_materials", uniqueConstraints = @UniqueConstraint(columnNames = { "product_id",
    "raw_material_id" }))
public class ProductRawMaterial implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "product_raw_materials_seq", sequenceName = "product_raw_materials_seq", allocationSize = 1)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "product_id", nullable = false)
  @JsonIgnore
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "raw_material_id", nullable = false)
  private RawMaterial rawMaterial;

  @Column(name = "required_quantity", nullable = false)
  private Integer requiredQuantity;

  protected ProductRawMaterial() {
    // JPA
  }

  public ProductRawMaterial(Product product, RawMaterial rawMaterial, Integer requiredQuantity) {
    this.product = Objects.requireNonNull(product, "product is required");
    this.rawMaterial = Objects.requireNonNull(rawMaterial, "rawMaterial is required");

    if (requiredQuantity == null || requiredQuantity < 1) {
      throw new IllegalArgumentException("requiredQuantity must be >= 1");
    }

    this.requiredQuantity = requiredQuantity;
  }

  public Long getId() {
    return id;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = Objects.requireNonNull(product, "product is required");
  }

  public RawMaterial getRawMaterial() {
    return rawMaterial;
  }

  public void setRawMaterial(RawMaterial rawMaterial) {
    this.rawMaterial = Objects.requireNonNull(rawMaterial, "rawMaterial is required");
  }

  public Integer getRequiredQuantity() {
    return requiredQuantity;
  }

  public void setRequiredQuantity(Integer requiredQuantity) {
    if (requiredQuantity == null || requiredQuantity < 1) {
      throw new IllegalArgumentException("requiredQuantity must be >= 1");
    }
    this.requiredQuantity = requiredQuantity;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (!(obj instanceof ProductRawMaterial other))
      return false;
    return id != null && id.equals(other.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}