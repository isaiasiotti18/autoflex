package controller;

import java.util.List;

import domain.Product;
import dto.product.CreateProductDTO;
import dto.product.ProductResponseDTO;
import dto.product.UpdateProductDTO;
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
import service.ProductService;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

  @Inject
  ProductService productService;

  @GET
  public List<Product> list() {
    return productService.listAll();
  }

  @GET
  @Path("/{id}")
  public Response findById(@PathParam("id") Long id) {
    Product product = productService.findById(id);

    if (product == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.ok(product).build();
  }

  @POST
  public Response create(@Valid CreateProductDTO dto) {
    ProductResponseDTO response = productService.create(dto);
    return Response.status(Response.Status.CREATED).entity(response).build();
  }

  @PUT
  @Path("/{id}")
  public Response update(@PathParam("id") Long id, UpdateProductDTO dto) {
    ProductResponseDTO updated = productService.update(id, dto);

    if (updated == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.ok(updated).build();
  }

  @DELETE
  @Path("/{id}")
  public Response delete(@PathParam("id") Long id) {
    boolean deleted = productService.delete(id);

    if (!deleted) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.noContent().build();
  }
}
