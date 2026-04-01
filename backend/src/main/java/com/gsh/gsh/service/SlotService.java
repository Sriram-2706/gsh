package com.gsh.gsh.service;

import com.gsh.gsh.entity.Slot;
import com.gsh.gsh.entity.Doctor;
import com.gsh.gsh.dto.SlotRequest;
import com.gsh.gsh.dto.SlotResponse;
import com.gsh.gsh.repository.SlotRepository;
import com.gsh.gsh.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlotService {

    private final SlotRepository slotRepository;
    private final DoctorRepository doctorRepository;

    public SlotResponse createSlot(SlotRequest request) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Slot slot = new Slot();
        slot.setDoctor(doctor);
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setIsBooked(false);

        Slot saved = slotRepository.save(slot);
        return toResponse(saved);
    }

    public SlotResponse getSlotById(Long id) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        return toResponse(slot);
    }

    public List<SlotResponse> getAllSlots() {
        return slotRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<SlotResponse> getSlotsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return slotRepository.findByDoctor(doctor).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<SlotResponse> getAvailableSlotsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return slotRepository.findByDoctorAndIsBooked(doctor, false).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<SlotResponse> getAvailableSlots(Long doctorId, LocalDateTime startDate, LocalDateTime endDate) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return slotRepository.findByStartTimeAfterAndStartTimeBeforeAndDoctorAndIsBooked(
                startDate, endDate, doctor, false).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public SlotResponse updateSlot(Long id, SlotRequest request) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        slot.setDoctor(doctor);
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());

        Slot updated = slotRepository.save(slot);
        return toResponse(updated);
    }

    public void deleteSlot(Long id) {
        if (!slotRepository.existsById(id)) {
            throw new RuntimeException("Slot not found");
        }
        slotRepository.deleteById(id);
    }

    protected void markSlotAsBooked(Long slotId) {
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        slot.setIsBooked(true);
        slotRepository.save(slot);
    }

    protected void markSlotAsAvailable(Long slotId) {
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        slot.setIsBooked(false);
        slotRepository.save(slot);
    }

    private SlotResponse toResponse(Slot slot) {
        return new SlotResponse(
                slot.getId(),
                slot.getDoctor().getId(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getIsBooked()
        );
    }
}
