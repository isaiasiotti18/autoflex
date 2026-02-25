package service;

import domain.Product;
import domain.ProductRawMaterial;
import domain.RawMaterial;
import dto.productrawmaterial.ProductRawMaterialRequestDTO;
import dto.productrawmaterial.ProductRawMaterialResponse;
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

  // Para CRUD da associação
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

  public ProductRawMaterialResponse findById(Long id) {
    return repository.findByIdOptional(id)
        .map(this::toResponse)
        .orElseThrow(() -> new NotFoundException("ProductRawMaterial not found: " + id));
  }

  @Transactional
  public ProductRawMaterialResponse create(ProductRawMaterialRequestDTO request) {
    validateDuplicate(request.productId(), request.rawMaterialId(), null);

    Product product = productRepository.findByIdOptional(request.productId())
        .orElseThrow(() -> new NotFoundException("Product not found: " + request.productId()));

    RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(request.rawMaterialId())
        .orElseThrow(() -> new NotFoundException("RawMaterial not found: " + request.rawMaterialId()));

    ProductRawMaterial entity = new ProductRawMaterial(product, rawMaterial, request.requiredQuantity());
    repository.persist(entity);

    return toResponse(entity);
  }

  @Transactional
  public ProductRawMaterialResponse update(Long id, ProductRawMaterialRequestDTO request) {
    ProductRawMaterial entity = repository.findByIdOptional(id)
        .orElseThrow(() -> new NotFoundException("ProductRawMaterial not found: " + id));

    boolean changed = !entity.getProduct().getId().equals(request.productId())
        || !entity.getRawMaterial().getId().equals(request.rawMaterialId());

    if (changed) {
      validateDuplicate(request.productId(), request.rawMaterialId(), id);

      Product product = productRepository.findByIdOptional(request.productId())
          .orElseThrow(() -> new NotFoundException("Product not found: " + request.productId()));

      RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(request.rawMaterialId())
          .orElseThrow(() -> new NotFoundException("RawMaterial not found: " + request.rawMaterialId()));

      entity.setProduct(product);
      entity.setRawMaterial(rawMaterial);
    }

    entity.setRequiredQuantity(request.requiredQuantity());
    return toResponse(entity);
  }

  @Transactional
  public void delete(Long id) {
    if (!repository.deleteById(id)) {
      throw new NotFoundException("ProductRawMaterial not found: " + id);
    }
  }

}
