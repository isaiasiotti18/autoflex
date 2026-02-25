package controller;

import java.util.List;

import dto.productrawmaterial.CreateProductRawMaterialDTO;
import dto.productrawmaterial.ProductRawMaterialResponse;
import dto.productrawmaterial.UpdateProductRawMaterialDTO;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.ProductRawMaterialService;

@Path("/product-raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialController {

  @Inject
  ProductRawMaterialService productRawMaterialService;

  @POST
  public Response create(@Valid CreateProductRawMaterialDTO dto) {
    ProductRawMaterialResponse response = productRawMaterialService.create(dto);
    return Response.status(Response.Status.CREATED).entity(response).build();
  }

  // /product-raw-materials = List all associations
  // /product-raw-material?productId = List associations for only a specific
  // product.
  @GET
  public Response list(@QueryParam("productId") Long productId) {
    List<ProductRawMaterialResponse> response = (productId != null)
        ? productRawMaterialService.listByProductId(productId)
        : productRawMaterialService.listAll();

    return Response.ok(response).build();
  }

  @GET
  @Path("/{id}")
  public Response findById(@PathParam("id") Long id) {
    return Response.ok(productRawMaterialService.findById(id)).build();
  }

  @PATCH
  @Path("/{id}")
  public Response update(@PathParam("id") Long id, @Valid UpdateProductRawMaterialDTO dto) {
    return Response.ok(productRawMaterialService.update(id, dto)).build();
  }

  @DELETE
  @Path("/{id}")
  public Response delete(@PathParam("id") Long id) {
    productRawMaterialService.delete(id);
    return Response.noContent().build();
  }
}
