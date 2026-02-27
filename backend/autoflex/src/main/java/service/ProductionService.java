package service;

import java.util.Map;

import helpers.production.ProductionPlanner;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import repository.ProductRepository;

@ApplicationScoped
public class ProductionService {

  @Inject
  ProductRepository productRepository;

  @Inject
  ProductionPlanner planner;

  @Transactional(Transactional.TxType.SUPPORTS)
  public Map<String, Object> capacity() {
    var products = productRepository.listAllWithRawMaterials();
    return planner.plan(products);
  }
}