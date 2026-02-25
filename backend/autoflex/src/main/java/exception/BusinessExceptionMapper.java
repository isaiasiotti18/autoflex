package exception;

import java.time.LocalDateTime;

import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class BusinessExceptionMapper implements ExceptionMapper<BusinessException> {

  @Context
  UriInfo uriInfo;

  @Override
  public Response toResponse(BusinessException e) {
    int status = Response.Status.CONFLICT.getStatusCode();

    ErrorResponse error = new ErrorResponse(
        status,
        "Conflict",
        e.getMessage(),
        uriInfo.getPath(),
        LocalDateTime.now());

    return Response.status(status).entity(error).build();
  }
}