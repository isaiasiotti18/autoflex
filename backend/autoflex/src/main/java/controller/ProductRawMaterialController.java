package controller;

import dto.productrawmaterial.ProductRawMaterialRequestDTO;
import dto.productrawmaterial.ProductRawMaterialResponse;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.ProductRawMaterialService;

@Path("/product-raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialController {

  @Inject
  ProductRawMaterialService productRawMaterialService;

  @GET
  @Path("/{id}")
  public ProductRawMaterialResponse findById(@PathParam("id") Long id) {
    return productRawMaterialService.findById(id);
  }

  @POST
  public Response create(@Valid ProductRawMaterialRequestDTO request) {
    ProductRawMaterialResponse response = productRawMaterialService.create(request);
    return Response.status(Response.Status.CREATED).entity(response).build();
  }

  @PUT
  @Path("/{id}")
  public Response update(@PathParam("id") Long id, @Valid ProductRawMaterialRequestDTO request) {
    return Response.ok(productRawMaterialService.update(id, request)).build();
  }

  @DELETE
  @Path("/{id}")
  public Response delete(@PathParam("id") Long id) {
    productRawMaterialService.delete(id);
    return Response.noContent().build();
  }
}
