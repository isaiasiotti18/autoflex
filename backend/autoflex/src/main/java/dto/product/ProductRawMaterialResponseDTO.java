package dto.product;

public record ProductRawMaterialResponseDTO(
    Long rawMaterialId,
    String rawMaterialName,
    Integer requiredQuantity) {
}