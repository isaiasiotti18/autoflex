package service;

import java.util.List;

import domain.Product;
import dto.product.CreateProductDTO;
import dto.product.ProductResponseDTO;
import dto.product.UpdateProductDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import mapper.EntityMapper;
import repository.ProductRepository;

@ApplicationScoped
public class ProductService {

  private final ProductRepository productRepository;

  @Inject
  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<Product> listAll() {
    return productRepository.listAll();
  }

  public Product findById(Long id) {
    return productRepository.findById(id);
  }

  @Transactional
  public ProductResponseDTO create(CreateProductDTO dto) {
    Product product = EntityMapper.toEntity(dto);
    productRepository.persist(product);
    return EntityMapper.toDTO(product);
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

    return EntityMapper.toDTO(product);
  }

  @Transactional
  public boolean delete(Long id) {
    return productRepository.deleteById(id);
  }
}
