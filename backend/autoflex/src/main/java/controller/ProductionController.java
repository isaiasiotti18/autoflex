package controller;

import java.util.Map;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import service.ProductionService;

@Path("/production-capacity")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductionController {

  @Inject
  ProductionService productionService;

  @GET
  public Map<String, Object> capacity() {
    return productionService.capacity();
  }
}