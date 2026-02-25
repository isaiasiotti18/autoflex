package dto.productrawmaterial;

public record ProductRawMaterialResponse(
    Long id,
    Long productId,
    Long rawMaterialId,
    String rawMaterialName,
    Integer requiredQuantity) {
}