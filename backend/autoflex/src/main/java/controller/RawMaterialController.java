package controller;

import java.util.List;

import domain.RawMaterial;
import dto.rawmaterial.CreateRawMaterialDTO;
import dto.rawmaterial.RawMaterialResponseDTO;
import dto.rawmaterial.UpdateRawMaterialDTO;
import jakarta.inject.Inject;
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
import service.RawMaterialService;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialController {

  @Inject
  RawMaterialService rawmaterialService;

  @GET
  public List<RawMaterial> list() {
    return rawmaterialService.listAll();
  }

  @GET
  @Path("/{id}")
  public Response findById(@PathParam("id") Long id) {
    RawMaterial rawmaterial = rawmaterialService.findById(id);

    if (rawmaterial == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.ok(rawmaterial).build();
  }

  @POST
  public Response create(CreateRawMaterialDTO dto) {
    RawMaterialResponseDTO created = rawmaterialService.create(dto);
    return Response.status(Response.Status.CREATED).entity(created).build();
  }

  @PUT
  @Path("/{id}")
  public Response update(@PathParam("id") Long id, UpdateRawMaterialDTO dto) {
    RawMaterialResponseDTO updated = rawmaterialService.update(id, dto);

    if (updated == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.ok(updated).build();
  }

  @DELETE
  @Path("/{id}")
  public Response delete(@PathParam("id") Long id) {
    boolean deleted = rawmaterialService.delete(id);

    if (!deleted) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.noContent().build();
  }
}
