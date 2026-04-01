package com.gsh.gsh.controller;

import com.gsh.gsh.dto.SpecialtyRequest;
import com.gsh.gsh.dto.SpecialtyResponse;
import com.gsh.gsh.service.SpecialtyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@RequiredArgsConstructor
@Tag(name = "Specialty Management", description = "APIs for managing specialties")
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    @PostMapping
    @Operation(summary = "Create a new specialty")
    public ResponseEntity<SpecialtyResponse> createSpecialty(@RequestBody SpecialtyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(specialtyService.createSpecialty(request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get specialty by ID")
    public ResponseEntity<SpecialtyResponse> getSpecialtyById(@PathVariable Long id) {
        return ResponseEntity.ok(specialtyService.getSpecialtyById(id));
    }

    @GetMapping
    @Operation(summary = "Get all specialties")
    public ResponseEntity<List<SpecialtyResponse>> getAllSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a specialty")
    public ResponseEntity<SpecialtyResponse> updateSpecialty(
            @PathVariable Long id,
            @RequestBody SpecialtyRequest request) {
        return ResponseEntity.ok(specialtyService.updateSpecialty(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a specialty")
    public ResponseEntity<Void> deleteSpecialty(@PathVariable Long id) {
        specialtyService.deleteSpecialty(id);
        return ResponseEntity.noContent().build();
    }
}
