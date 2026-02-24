package service;

import java.util.List;

import domain.RawMaterial;
import dto.rawmaterial.CreateRawMaterialDTO;
import dto.rawmaterial.RawMaterialResponseDTO;
import dto.rawmaterial.UpdateRawMaterialDTO;
import exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import mapper.EntityMapper;
import repository.RawMaterialRepository;

@ApplicationScoped
public class RawMaterialService {

  private final RawMaterialRepository rawMaterialRepository;

  @Inject
  public RawMaterialService(RawMaterialRepository rawMaterialRepository) {
    this.rawMaterialRepository = rawMaterialRepository;
  }

  public List<RawMaterial> listAll() {
    return rawMaterialRepository.listAll();
  }

  public RawMaterial findById(Long id) {
    return rawMaterialRepository.findByIdOptional(id)
        .orElseThrow(() -> new NotFoundException("Raw material not found"));
  }

  @Transactional
  public RawMaterialResponseDTO create(@Valid CreateRawMaterialDTO dto) {
    RawMaterial rawMaterial = EntityMapper.toEntity(dto);
    rawMaterialRepository.persist(rawMaterial);
    return EntityMapper.toDTO(rawMaterial);
  }

  @Transactional
  public RawMaterialResponseDTO update(Long id, UpdateRawMaterialDTO dto) {
    RawMaterial existingRawMaterial = rawMaterialRepository.findById(id);

    if (existingRawMaterial == null) {
      throw new NotFoundException("Raw material not found");
    }

    if (dto.name() != null) {
      existingRawMaterial.setName(dto.name());
    }

    if (dto.quantity() != null) {
      existingRawMaterial.setQuantity(dto.quantity());
    }

    return EntityMapper.toDTO(existingRawMaterial);
  }

  @Transactional
  public boolean delete(Long id) {
    return rawMaterialRepository.deleteById(id);
  }
}
