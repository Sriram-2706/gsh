package com.gsh.gsh.controller;

import com.gsh.gsh.dto.SlotRequest;
import com.gsh.gsh.dto.SlotResponse;
import com.gsh.gsh.service.SlotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@RequiredArgsConstructor
@Tag(name = "Slot Management", description = "APIs for managing appointment slots")
public class SlotController {

    private final SlotService slotService;

    @PostMapping
    @Operation(summary = "Create a new slot")
    public ResponseEntity<SlotResponse> createSlot(@RequestBody SlotRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(slotService.createSlot(request));
    }

    @GetMapping("/{doctorId}")
    @Operation(summary = "Get all available slots for a doctor")
    public ResponseEntity<List<SlotResponse>> getSlotsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(slotService.getAvailableSlotsByDoctor(doctorId));
    }

    @GetMapping("/by-id/{id}")
    @Operation(summary = "Get slot by ID")
    public ResponseEntity<SlotResponse> getSlotById(@PathVariable Long id) {
        return ResponseEntity.ok(slotService.getSlotById(id));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all slots")
    public ResponseEntity<List<SlotResponse>> getAllSlots() {
        return ResponseEntity.ok(slotService.getAllSlots());
    }

    @GetMapping("/doctor/{doctorId}/all")
    @Operation(summary = "Get all slots for a doctor (including booked)")
    public ResponseEntity<List<SlotResponse>> getAllSlotsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(slotService.getSlotsByDoctor(doctorId));
    }

    @GetMapping("/doctor/{doctorId}/available")
    @Operation(summary = "Get available slots for a doctor")
    public ResponseEntity<List<SlotResponse>> getAvailableSlotsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(slotService.getAvailableSlotsByDoctor(doctorId));
    }

    @GetMapping("/doctor/{doctorId}/available-range")
    @Operation(summary = "Get available slots within date range")
    public ResponseEntity<List<SlotResponse>> getAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(slotService.getAvailableSlots(doctorId, startDate, endDate));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a slot")
    public ResponseEntity<SlotResponse> updateSlot(
            @PathVariable Long id,
            @RequestBody SlotRequest request) {
        return ResponseEntity.ok(slotService.updateSlot(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a slot")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        slotService.deleteSlot(id);
        return ResponseEntity.noContent().build();
    }
}
