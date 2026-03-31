package com.gsh.gsh.controller;

import com.gsh.gsh.dto.DoctorRequest;
import com.gsh.gsh.dto.DoctorResponse;
import com.gsh.gsh.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@Tag(name = "Doctor Management", description = "APIs for managing doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    @Operation(summary = "Create a new doctor")
    public ResponseEntity<DoctorResponse> createDoctor(@RequestBody DoctorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(doctorService.createDoctor(request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get doctor by ID")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping
    @Operation(summary = "Get all doctors")
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/specialty/{specialtyId}")
    @Operation(summary = "Get doctors by specialty")
    public ResponseEntity<List<DoctorResponse>> getDoctorsBySpecialty(@PathVariable Long specialtyId) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialty(specialtyId));
    }

    @GetMapping("/mode/{mode}")
    @Operation(summary = "Get doctors by consultation mode")
    public ResponseEntity<List<DoctorResponse>> getDoctorsByMode(@PathVariable String mode) {
        return ResponseEntity.ok(doctorService.getDoctorsByMode(mode));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a doctor")
    public ResponseEntity<DoctorResponse> updateDoctor(
            @PathVariable Long id,
            @RequestBody DoctorRequest request) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a doctor")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
