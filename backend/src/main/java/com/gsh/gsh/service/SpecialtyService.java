package com.gsh.gsh.service;

import com.gsh.gsh.entity.Specialty;
import com.gsh.gsh.dto.SpecialtyRequest;
import com.gsh.gsh.dto.SpecialtyResponse;
import com.gsh.gsh.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyResponse createSpecialty(SpecialtyRequest request) {
        Specialty specialty = new Specialty();
        specialty.setName(request.getName());
        Specialty saved = specialtyRepository.save(specialty);
        return toResponse(saved);
    }

    public SpecialtyResponse getSpecialtyById(Long id) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Specialty not found"));
        return toResponse(specialty);
    }

    public List<SpecialtyResponse> getAllSpecialties() {
        return specialtyRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public SpecialtyResponse updateSpecialty(Long id, SpecialtyRequest request) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Specialty not found"));
        specialty.setName(request.getName());
        Specialty updated = specialtyRepository.save(specialty);
        return toResponse(updated);
    }

    public void deleteSpecialty(Long id) {
        if (!specialtyRepository.existsById(id)) {
            throw new RuntimeException("Specialty not found");
        }
        specialtyRepository.deleteById(id);
    }

    private SpecialtyResponse toResponse(Specialty specialty) {
        return new SpecialtyResponse(specialty.getId(), specialty.getName());
    }
}
