package mapper;

import domain.Product;
import domain.RawMaterial;
import dto.product.CreateProductDTO;
import dto.product.ProductResponseDTO;
import dto.rawmaterial.CreateRawMaterialDTO;
import dto.rawmaterial.RawMaterialResponseDTO;

public class EntityMapper {

  public static Product toEntity(CreateProductDTO dto) {
    return new Product(dto.name(), dto.value());
  }

  public static ProductResponseDTO toDTO(Product entity) {
    return new ProductResponseDTO(entity.getId(), entity.getName(), entity.getValue());
  }

  public static RawMaterial toEntity(CreateRawMaterialDTO dto) {
    return new RawMaterial(dto.name(), dto.quantity());
  }

  public static RawMaterialResponseDTO toDTO(RawMaterial entity) {
    return new RawMaterialResponseDTO(entity.getId(), entity.getName(), entity.getQuantity());
  }

}