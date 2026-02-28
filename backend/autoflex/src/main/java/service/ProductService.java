package service;

import java.util.List;

import domain.Product;
import dto.product.CreateProductDTO;
import dto.product.ProductResponseDTO;
import dto.product.UpdateProductDTO;
import exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import mapper.EntityMapper;
import repository.ProductRepository;

@ApplicationScoped
public class ProductService {

  @Inject
  ProductRepository productRepository;

  @Inject
  EntityMapper mapper;

  // @Inject
  // public ProductService(ProductRepository productRepository) {
  // this.productRepository = productRepository;
  // }

  public List<ProductResponseDTO> listAll() {
    return productRepository.listAllWithRawMaterials().stream()
        .map(mapper::toDTO)
        .toList();
  }

  public ProductResponseDTO findById(Long id) {
    return productRepository.findByIdWithRawMaterials(id)
        .map(mapper::toDTO)
        .orElseThrow(() -> new NotFoundException("Product not found"));
  }

  @Transactional
  public ProductResponseDTO create(CreateProductDTO dto) {
    Product product = mapper.toEntity(dto);
    productRepository.persist(product);
    return mapper.toDTO(product);
  }

  @Transactional
  public ProductResponseDTO update(Long id, UpdateProductDTO dto) {
    Product product = productRepository.findById(id);

    if (product == null) {
      throw new NotFoundException("Product not found");
    }

    if (dto.name() != null) {
      product.setName(dto.name());
    }

    if (dto.value() != null) {
      product.setValue(dto.value());
    }

    return mapper.toDTO(product);
  }

  @Transactional
  public boolean delete(Long id) {
    return productRepository.deleteById(id);
  }
}
