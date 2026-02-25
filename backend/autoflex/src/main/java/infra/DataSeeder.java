package infra;

import domain.Product;
import domain.ProductRawMaterial;
import domain.RawMaterial;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import repository.ProductRawMaterialRepository;
import repository.ProductRepository;
import repository.RawMaterialRepository;

import java.math.BigDecimal;

@Startup
@ApplicationScoped
public class DataSeeder {

  @Inject
  RawMaterialRepository rawMaterialRepository;

  @Inject
  ProductRepository productRepository;

  @Inject
  ProductRawMaterialRepository productRawMaterialRepository;

  @Transactional
  void onStart(@Observes StartupEvent ev) {
    if (rawMaterialRepository.count() > 0)
      return;

    // ==================== RAW MATERIALS ====================

    // Metais
    RawMaterial steelWire = createRawMaterial("Steel Wire (kg)", 800);
    RawMaterial steelSheet = createRawMaterial("Steel Sheet (kg)", 600);
    RawMaterial steelBar = createRawMaterial("Steel Bar (kg)", 450);
    RawMaterial aluminum = createRawMaterial("Aluminum Ingot (kg)", 300);
    RawMaterial copper = createRawMaterial("Copper Wire (kg)", 200);
    RawMaterial zinc = createRawMaterial("Zinc (kg)", 350);

    // Plásticos
    RawMaterial hdpe = createRawMaterial("HDPE Pellets (kg)", 1000);
    RawMaterial pp = createRawMaterial("Polypropylene Pellets (kg)", 900);
    RawMaterial pvc = createRawMaterial("PVC Resin (kg)", 750);
    RawMaterial nylon = createRawMaterial("Nylon Granules (kg)", 400);

    // Borrachas
    RawMaterial rubber = createRawMaterial("Natural Rubber (kg)", 350);
    RawMaterial silicone = createRawMaterial("Silicone Compound (kg)", 250);
    RawMaterial epdm = createRawMaterial("EPDM Rubber (kg)", 300);

    // Químicos e Revestimentos
    RawMaterial galvanizing = createRawMaterial("Galvanizing Solution (L)", 400);
    RawMaterial chromePlating = createRawMaterial("Chrome Plating (L)", 200);
    RawMaterial paint = createRawMaterial("Industrial Paint (L)", 500);
    RawMaterial adhesive = createRawMaterial("Industrial Adhesive (kg)", 300);
    RawMaterial lubricant = createRawMaterial("Lubricant Oil (L)", 250);

    // Embalagens
    RawMaterial cardboard = createRawMaterial("Cardboard Box (unit)", 2000);
    RawMaterial plasticBag = createRawMaterial("Plastic Bag (unit)", 5000);
    RawMaterial shrinkWrap = createRawMaterial("Shrink Wrap (m)", 3000);

    // ==================== PRODUCTS ====================

    // Parafusos
    Product screwPhillips = createProduct("Phillips Screw 1/4\" (box 1000)", "45.00");
    Product screwSlotted = createProduct("Slotted Screw 1/4\" (box 1000)", "42.00");
    Product screwHex = createProduct("Hex Head Screw 3/8\" (box 500)", "68.00");
    Product screwSelf = createProduct("Self-Tapping Screw (box 1000)", "55.00");
    Product screwDrywall = createProduct("Drywall Screw (box 1000)", "38.00");
    Product screwWood = createProduct("Wood Screw 2\" (box 500)", "52.00");
    Product screwMachine = createProduct("Machine Screw M6 (box 500)", "75.00");
    Product screwStainless = createProduct("Stainless Steel Screw (box 500)", "120.00");

    // Pregos
    Product nailCommon = createProduct("Common Nail 3\" (box 1000)", "32.00");
    Product nailFinishing = createProduct("Finishing Nail 2\" (box 1000)", "35.00");
    Product nailRoofing = createProduct("Roofing Nail (box 500)", "48.00");
    Product nailConcrete = createProduct("Concrete Nail (box 500)", "58.00");
    Product nailBrad = createProduct("Brad Nail 1\" (box 2000)", "28.00");
    Product nailGalvanized = createProduct("Galvanized Nail 4\" (box 500)", "65.00");

    // Porcas e Arruelas
    Product nutHex = createProduct("Hex Nut M8 (box 1000)", "40.00");
    Product nutLock = createProduct("Lock Nut M8 (box 500)", "55.00");
    Product nutWing = createProduct("Wing Nut M6 (box 500)", "48.00");
    Product washerFlat = createProduct("Flat Washer 3/8\" (box 1000)", "25.00");
    Product washerSpring = createProduct("Spring Washer 3/8\" (box 1000)", "35.00");
    Product washerFender = createProduct("Fender Washer (box 500)", "30.00");

    // Parafusos Especiais
    Product bolt = createProduct("Hex Bolt 1/2\" x 3\" (box 100)", "85.00");
    Product boltCarriage = createProduct("Carriage Bolt 3/8\" (box 200)", "72.00");
    Product boltAnchor = createProduct("Anchor Bolt 5/8\" (box 50)", "95.00");
    Product threadedRod = createProduct("Threaded Rod 1m M10 (unit)", "18.00");

    // Fixadores Plásticos
    Product plugWall = createProduct("Wall Plug 8mm (box 1000)", "22.00");
    Product plugExpansion = createProduct("Expansion Plug 10mm (box 500)", "35.00");
    Product cableTie = createProduct("Cable Tie 200mm (pack 100)", "12.00");
    Product cableTieLarge = createProduct("Cable Tie 400mm (pack 100)", "18.00");
    Product cableClip = createProduct("Cable Clip (pack 500)", "15.00");
    Product wireConnector = createProduct("Wire Connector (pack 100)", "28.00");

    // Buchas e Âncoras
    Product anchorDrywall = createProduct("Drywall Anchor (box 200)", "45.00");
    Product anchorToggle = createProduct("Toggle Anchor (box 100)", "65.00");
    Product anchorSleeve = createProduct("Sleeve Anchor 3/8\" (box 50)", "78.00");
    Product anchorWedge = createProduct("Wedge Anchor 1/2\" (box 25)", "88.00");

    // Rebites
    Product rivetPop = createProduct("Pop Rivet 1/8\" (box 1000)", "38.00");
    Product rivetBlind = createProduct("Blind Rivet 3/16\" (box 500)", "45.00");
    Product rivetSteel = createProduct("Steel Rivet 1/4\" (box 500)", "52.00");
    Product rivetAluminum = createProduct("Aluminum Rivet (box 1000)", "42.00");

    // Ganchos e Grampos
    Product hookScrew = createProduct("Screw Hook 2\" (box 200)", "32.00");
    Product hookCeiling = createProduct("Ceiling Hook (box 100)", "38.00");
    Product staple = createProduct("Staple 10mm (box 5000)", "25.00");
    Product stapleHeavy = createProduct("Heavy Duty Staple (box 1000)", "35.00");
    Product clampHose = createProduct("Hose Clamp 1\" (box 100)", "48.00");

    // Itens de Vedação
    Product oring = createProduct("O-Ring Kit (100 pcs)", "55.00");
    Product gasket = createProduct("Rubber Gasket (pack 50)", "42.00");
    Product sealant = createProduct("Silicone Sealant Tube (unit)", "15.00");
    Product tape = createProduct("Teflon Tape (pack 10)", "18.00");

    // ==================== ASSOCIATIONS ====================

    // Phillips Screw
    link(screwPhillips, steelWire, 5);
    link(screwPhillips, zinc, 1);
    link(screwPhillips, galvanizing, 1);
    link(screwPhillips, cardboard, 1);

    // Slotted Screw
    link(screwSlotted, steelWire, 5);
    link(screwSlotted, zinc, 1);
    link(screwSlotted, galvanizing, 1);
    link(screwSlotted, cardboard, 1);

    // Hex Head Screw
    link(screwHex, steelBar, 4);
    link(screwHex, zinc, 2);
    link(screwHex, galvanizing, 1);
    link(screwHex, cardboard, 1);

    // Self-Tapping Screw
    link(screwSelf, steelWire, 4);
    link(screwSelf, zinc, 1);
    link(screwSelf, chromePlating, 1);
    link(screwSelf, cardboard, 1);

    // Drywall Screw
    link(screwDrywall, steelWire, 4);
    link(screwDrywall, zinc, 1);
    link(screwDrywall, paint, 1);
    link(screwDrywall, cardboard, 1);

    // Wood Screw
    link(screwWood, steelWire, 3);
    link(screwWood, zinc, 1);
    link(screwWood, galvanizing, 1);
    link(screwWood, cardboard, 1);

    // Machine Screw
    link(screwMachine, steelBar, 5);
    link(screwMachine, zinc, 2);
    link(screwMachine, chromePlating, 2);
    link(screwMachine, lubricant, 1);
    link(screwMachine, cardboard, 1);

    // Stainless Steel Screw
    link(screwStainless, steelBar, 6);
    link(screwStainless, chromePlating, 3);
    link(screwStainless, lubricant, 1);
    link(screwStainless, cardboard, 1);

    // Common Nail
    link(nailCommon, steelWire, 4);
    link(nailCommon, cardboard, 1);

    // Finishing Nail
    link(nailFinishing, steelWire, 3);
    link(nailFinishing, zinc, 1);
    link(nailFinishing, cardboard, 1);

    // Roofing Nail
    link(nailRoofing, steelWire, 5);
    link(nailRoofing, zinc, 2);
    link(nailRoofing, galvanizing, 2);
    link(nailRoofing, rubber, 1);
    link(nailRoofing, cardboard, 1);

    // Concrete Nail
    link(nailConcrete, steelBar, 6);
    link(nailConcrete, zinc, 2);
    link(nailConcrete, cardboard, 1);

    // Brad Nail
    link(nailBrad, steelWire, 2);
    link(nailBrad, plasticBag, 1);

    // Galvanized Nail
    link(nailGalvanized, steelWire, 5);
    link(nailGalvanized, zinc, 3);
    link(nailGalvanized, galvanizing, 3);
    link(nailGalvanized, cardboard, 1);

    // Hex Nut
    link(nutHex, steelBar, 3);
    link(nutHex, zinc, 1);
    link(nutHex, galvanizing, 1);
    link(nutHex, plasticBag, 1);

    // Lock Nut
    link(nutLock, steelBar, 3);
    link(nutLock, nylon, 1);
    link(nutLock, zinc, 1);
    link(nutLock, plasticBag, 1);

    // Wing Nut
    link(nutWing, steelBar, 2);
    link(nutWing, zinc, 1);
    link(nutWing, galvanizing, 1);
    link(nutWing, plasticBag, 1);

    // Flat Washer
    link(washerFlat, steelSheet, 2);
    link(washerFlat, zinc, 1);
    link(washerFlat, plasticBag, 1);

    // Spring Washer
    link(washerSpring, steelSheet, 3);
    link(washerSpring, zinc, 1);
    link(washerSpring, galvanizing, 1);
    link(washerSpring, plasticBag, 1);

    // Fender Washer
    link(washerFender, steelSheet, 2);
    link(washerFender, zinc, 1);
    link(washerFender, plasticBag, 1);

    // Hex Bolt
    link(bolt, steelBar, 8);
    link(bolt, zinc, 3);
    link(bolt, galvanizing, 2);
    link(bolt, lubricant, 1);
    link(bolt, cardboard, 1);

    // Carriage Bolt
    link(boltCarriage, steelBar, 6);
    link(boltCarriage, zinc, 2);
    link(boltCarriage, galvanizing, 2);
    link(boltCarriage, cardboard, 1);

    // Anchor Bolt
    link(boltAnchor, steelBar, 10);
    link(boltAnchor, zinc, 4);
    link(boltAnchor, galvanizing, 3);
    link(boltAnchor, cardboard, 1);

    // Threaded Rod
    link(threadedRod, steelBar, 3);
    link(threadedRod, zinc, 1);
    link(threadedRod, galvanizing, 1);
    link(threadedRod, shrinkWrap, 2);

    // Wall Plug
    link(plugWall, hdpe, 3);
    link(plugWall, plasticBag, 1);

    // Expansion Plug
    link(plugExpansion, nylon, 4);
    link(plugExpansion, plasticBag, 1);

    // Cable Tie 200mm
    link(cableTie, nylon, 2);
    link(cableTie, plasticBag, 1);

    // Cable Tie 400mm
    link(cableTieLarge, nylon, 3);
    link(cableTieLarge, plasticBag, 1);

    // Cable Clip
    link(cableClip, pp, 2);
    link(cableClip, steelWire, 1);
    link(cableClip, plasticBag, 1);

    // Wire Connector
    link(wireConnector, pp, 2);
    link(wireConnector, copper, 2);
    link(wireConnector, plasticBag, 1);

    // Drywall Anchor
    link(anchorDrywall, pp, 3);
    link(anchorDrywall, steelWire, 2);
    link(anchorDrywall, plasticBag, 1);

    // Toggle Anchor
    link(anchorToggle, steelSheet, 4);
    link(anchorToggle, zinc, 2);
    link(anchorToggle, cardboard, 1);

    // Sleeve Anchor
    link(anchorSleeve, steelBar, 6);
    link(anchorSleeve, zinc, 2);
    link(anchorSleeve, galvanizing, 2);
    link(anchorSleeve, cardboard, 1);

    // Wedge Anchor
    link(anchorWedge, steelBar, 8);
    link(anchorWedge, zinc, 3);
    link(anchorWedge, galvanizing, 2);
    link(anchorWedge, cardboard, 1);

    // Pop Rivet
    link(rivetPop, aluminum, 2);
    link(rivetPop, steelWire, 1);
    link(rivetPop, plasticBag, 1);

    // Blind Rivet
    link(rivetBlind, aluminum, 3);
    link(rivetBlind, steelWire, 2);
    link(rivetBlind, plasticBag, 1);

    // Steel Rivet
    link(rivetSteel, steelBar, 4);
    link(rivetSteel, zinc, 1);
    link(rivetSteel, plasticBag, 1);

    // Aluminum Rivet
    link(rivetAluminum, aluminum, 3);
    link(rivetAluminum, plasticBag, 1);

    // Screw Hook
    link(hookScrew, steelWire, 3);
    link(hookScrew, zinc, 1);
    link(hookScrew, galvanizing, 1);
    link(hookScrew, plasticBag, 1);

    // Ceiling Hook
    link(hookCeiling, steelBar, 4);
    link(hookCeiling, zinc, 2);
    link(hookCeiling, galvanizing, 1);
    link(hookCeiling, plasticBag, 1);

    // Staple
    link(staple, steelWire, 2);
    link(staple, galvanizing, 1);
    link(staple, cardboard, 1);

    // Heavy Duty Staple
    link(stapleHeavy, steelWire, 4);
    link(stapleHeavy, galvanizing, 2);
    link(stapleHeavy, cardboard, 1);

    // Hose Clamp
    link(clampHose, steelSheet, 3);
    link(clampHose, zinc, 2);
    link(clampHose, chromePlating, 1);
    link(clampHose, cardboard, 1);

    // O-Ring Kit
    link(oring, rubber, 2);
    link(oring, silicone, 2);
    link(oring, plasticBag, 1);

    // Rubber Gasket
    link(gasket, rubber, 3);
    link(gasket, epdm, 2);
    link(gasket, plasticBag, 1);

    // Silicone Sealant
    link(sealant, silicone, 3);
    link(sealant, adhesive, 1);
    link(sealant, pp, 1);

    // Teflon Tape
    link(tape, pvc, 2);
    link(tape, cardboard, 1);
  }

  private RawMaterial createRawMaterial(String name, int qty) {
    RawMaterial rm = new RawMaterial(name, qty);
    rawMaterialRepository.persist(rm);
    return rm;
  }

  private Product createProduct(String name, String value) {
    Product p = new Product(name, new BigDecimal(value));
    productRepository.persist(p);
    return p;
  }

  private void link(Product p, RawMaterial rm, int qty) {
    productRawMaterialRepository.persist(new ProductRawMaterial(p, rm, qty));
  }
}