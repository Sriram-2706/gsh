package com.gsh.gsh.controller;

import com.gsh.gsh.dto.AppointmentRequest;
import com.gsh.gsh.dto.AppointmentResponse;
import com.gsh.gsh.entity.AppointmentStatus;
import com.gsh.gsh.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointment Management", description = "APIs for managing appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @Operation(summary = "Create a new appointment")
    public ResponseEntity<AppointmentResponse> createAppointment(@RequestBody AppointmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointmentService.createAppointment(request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment by ID")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @GetMapping
    @Operation(summary = "Get all appointments")
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get appointments by patient")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(patientId));
    }

    @GetMapping("/patient/{patientId}/status/{status}")
    @Operation(summary = "Get patient appointments by status")
    public ResponseEntity<List<AppointmentResponse>> getPatientAppointmentsByStatus(
            @PathVariable Long patientId,
            @PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getPatientAppointmentsByStatus(patientId, status));
    }

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "Get appointments by doctor")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(doctorId));
    }

    @GetMapping("/doctor/{doctorId}/status/{status}")
    @Operation(summary = "Get doctor appointments by status")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointmentsByStatus(
            @PathVariable Long doctorId,
            @PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getDoctorAppointmentsByStatus(doctorId, status));
    }

    @PatchMapping("/{id}/status/{status}")
    @Operation(summary = "Update appointment status")
    public ResponseEntity<AppointmentResponse> updateAppointmentStatus(
            @PathVariable Long id,
            @PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, status));
    }

    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel an appointment")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
