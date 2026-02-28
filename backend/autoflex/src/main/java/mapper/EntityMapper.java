// package mapper;

// import java.util.ArrayList;
// import java.util.List;

// import domain.Product;
// import domain.ProductRawMaterial;
// import domain.RawMaterial;
// import dto.product.CreateProductDTO;
// import dto.product.ProductRawMaterialResponseDTO;
// import dto.product.ProductResponseDTO;
// import dto.rawmaterial.CreateRawMaterialDTO;
// import dto.rawmaterial.RawMaterialResponseDTO;

// public class EntityMapper {

//   public static Product toEntity(CreateProductDTO dto) {
//     return new Product(dto.name(), dto.value());
//   }

//   public static ProductResponseDTO toDTO(Product product) {
//     List<ProductRawMaterialResponseDTO> rawMaterials = new ArrayList<>();

//     for (ProductRawMaterial prm : product.getRawMaterials()) {
//       rawMaterials.add(new ProductRawMaterialResponseDTO(
//           prm.getRawMaterial().getId(),
//           prm.getRawMaterial().getName(),
//           prm.getRequiredQuantity()));
//     }

//     return new ProductResponseDTO(product.getId(), product.getName(), product.getValue(), rawMaterials);
//   }

//   public static RawMaterial toEntity(CreateRawMaterialDTO dto) {
//     return new RawMaterial(dto.name(), dto.quantity());
//   }

//   public static RawMaterialResponseDTO toDTO(RawMaterial entity) {
//     return new RawMaterialResponseDTO(entity.getId(), entity.getName(), entity.getQuantity());
//   }

// }

package mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import domain.Product;
import domain.ProductRawMaterial;
import domain.RawMaterial;
import dto.product.CreateProductDTO;
import dto.product.ProductRawMaterialResponseDTO;
import dto.product.ProductResponseDTO;
import dto.rawmaterial.CreateRawMaterialDTO;
import dto.rawmaterial.RawMaterialResponseDTO;

@Mapper(componentModel = "cdi") // Quarkus (CDI)
public interface EntityMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "rawMaterials", ignore = true)
  Product toEntity(CreateProductDTO dto);

  // Product -> ProductResponseDTO (inclui lista de matérias-primas)
  ProductResponseDTO toDTO(Product product);

  // ProductRawMaterial -> ProductRawMaterialResponseDTO
  @Mapping(target = "rawMaterialId", source = "rawMaterial.id")
  @Mapping(target = "rawMaterialName", source = "rawMaterial.name")
  @Mapping(target = "requiredQuantity", source = "requiredQuantity")
  ProductRawMaterialResponseDTO toDTO(ProductRawMaterial prm);

  // List<ProductRawMaterial> -> List<ProductRawMaterialResponseDTO>
  List<ProductRawMaterialResponseDTO> toDTOs(List<ProductRawMaterial> rawMaterials);

  @Mapping(target = "id", ignore = true)
  RawMaterial toEntity(CreateRawMaterialDTO dto);

  // RawMaterial -> RawMaterialResponseDTO
  RawMaterialResponseDTO toDTO(RawMaterial entity);
}