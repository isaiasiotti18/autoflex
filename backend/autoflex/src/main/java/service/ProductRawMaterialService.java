package service;

import java.util.List;

import domain.Product;
import domain.ProductRawMaterial;
import domain.RawMaterial;
import dto.productrawmaterial.CreateProductRawMaterialDTO;
import dto.productrawmaterial.ProductRawMaterialResponse;
import dto.productrawmaterial.UpdateProductRawMaterialDTO;
import exception.BusinessException;
import exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import repository.ProductRawMaterialRepository;
import repository.ProductRepository;
import repository.RawMaterialRepository;

@ApplicationScoped
public class ProductRawMaterialService {

  @Inject
  ProductRawMaterialRepository repository;

  @Inject
  ProductRepository productRepository;

  @Inject
  RawMaterialRepository rawMaterialRepository;

  private ProductRawMaterialResponse toResponse(ProductRawMaterial entity) {
    return new ProductRawMaterialResponse(
        entity.getId(),
        entity.getProduct().getId(),
        entity.getRawMaterial().getId(),
        entity.getRawMaterial().getName(),
        entity.getRequiredQuantity());
  }

  private void validateDuplicate(Long productId, Long rawMaterialId, Long excludeId) {
    repository.findByProductAndRawMaterial(productId, rawMaterialId)
        .filter(existing -> !existing.getId().equals(excludeId))
        .ifPresent(e -> {
          throw new BusinessException("RawMaterial already associated to this Product");
        });
  }

  @Transactional
  public ProductRawMaterialResponse create(CreateProductRawMaterialDTO dto) {
    validateDuplicate(dto.productId(), dto.rawMaterialId(), null);

    Product product = productRepository.findByIdOptional(dto.productId())
        .orElseThrow(() -> new NotFoundException("Product not found: " + dto.productId()));

    RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(dto.rawMaterialId())
        .orElseThrow(() -> new NotFoundException("RawMaterial not found: " + dto.rawMaterialId()));

    ProductRawMaterial entity = new ProductRawMaterial(product, rawMaterial, dto.requiredQuantity());
    repository.persist(entity);

    return toResponse(entity);
  }

  public List<ProductRawMaterialResponse> listAll() {
    return repository.listAllWithRelations()
        .stream()
        .map(this::toResponse)
        .toList();
  }

  public List<ProductRawMaterialResponse> listByProductId(Long productId) {
    return repository.listByProductIdWithRelations(productId)
        .stream()
        .map(this::toResponse)
        .toList();
  }

  public ProductRawMaterialResponse findById(Long id) {
    ProductRawMaterial entity = repository.findByIdWithRelations(id)
        .orElseThrow(() -> new NotFoundException("ProductRawMaterial not found: " + id));

    return toResponse(entity);
  }

  @Transactional
  public ProductRawMaterialResponse update(Long id, UpdateProductRawMaterialDTO dto) {
    ProductRawMaterial entity = repository.findByIdOptional(id)
        .orElseThrow(() -> new NotFoundException("ProductRawMaterial not found: " + id));

    Long currentProductId = entity.getProduct().getId();
    Long currentRawMaterialId = entity.getRawMaterial().getId();

    Long newProductId = dto.productId() != null ? dto.productId() : currentProductId;
    Long newRawMaterialId = dto.rawMaterialId() != null ? dto.rawMaterialId() : currentRawMaterialId;

    boolean relationChanged = !currentProductId.equals(newProductId)
        || !currentRawMaterialId.equals(newRawMaterialId);

    if (relationChanged) {
      validateDuplicate(newProductId, newRawMaterialId, id);

      if (!currentProductId.equals(newProductId)) {
        Product product = productRepository.findByIdOptional(newProductId)
            .orElseThrow(() -> new NotFoundException("Product not found: " + newProductId));
        entity.setProduct(product);
      }

      if (!currentRawMaterialId.equals(newRawMaterialId)) {
        RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(newRawMaterialId)
            .orElseThrow(() -> new NotFoundException("RawMaterial not found: " + newRawMaterialId));
        entity.setRawMaterial(rawMaterial);
      }
    }

    if (dto.requiredQuantity() != null) {
      entity.setRequiredQuantity(dto.requiredQuantity());
    }

    return toResponse(entity);
  }

  @Transactional
  public void delete(Long id) {
    if (!repository.deleteById(id)) {
      throw new NotFoundException("ProductRawMaterial not found: " + id);
    }
  }

}
