package com.gsh.gsh.service;

import com.gsh.gsh.entity.Appointment;
import com.gsh.gsh.entity.AppointmentStatus;
import com.gsh.gsh.entity.User;
import com.gsh.gsh.entity.Doctor;
import com.gsh.gsh.entity.Slot;
import com.gsh.gsh.dto.AppointmentRequest;
import com.gsh.gsh.dto.AppointmentResponse;
import com.gsh.gsh.repository.AppointmentRepository;
import com.gsh.gsh.repository.UserRepository;
import com.gsh.gsh.repository.DoctorRepository;
import com.gsh.gsh.repository.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final SlotService slotService;

    public AppointmentResponse createAppointment(AppointmentRequest request) {
        User patient = userRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Slot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getIsBooked()) {
            throw new RuntimeException("Slot is already booked");
        }

        if (slot.getStartTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Cannot book a slot in the past");
        }

        if (!doctor.getMode().equalsIgnoreCase(request.getMode())) {
            throw new RuntimeException("Doctor mode does not match requested mode");
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setSlot(slot);
        appointment.setMode(request.getMode());
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointment.setBookingTime(LocalDateTime.now());

        Appointment saved = appointmentRepository.save(appointment);
        
        // Mark slot as booked
        slotService.markSlotAsBooked(slot.getId());

        return toResponse(saved);
    }

    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return toResponse(appointment);
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return appointmentRepository.findByPatient(patient).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return appointmentRepository.findByDoctor(doctor).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        Appointment updated = appointmentRepository.save(appointment);
        return toResponse(updated);
    }

    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        if (!appointment.getStatus().equals(AppointmentStatus.CONFIRMED)) {
            throw new RuntimeException("Cannot cancel appointment with status: " + appointment.getStatus());
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        // Mark slot as available
        slotService.markSlotAsAvailable(appointment.getSlot().getId());
    }

    public List<AppointmentResponse> getPatientAppointmentsByStatus(Long patientId, AppointmentStatus status) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return appointmentRepository.findByPatientAndStatus(patient, status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getDoctorAppointmentsByStatus(Long doctorId, AppointmentStatus status) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return appointmentRepository.findByDoctorAndStatus(doctor, status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private AppointmentResponse toResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatient().getId(),
                appointment.getPatient().getName(),
                appointment.getDoctor().getId(),
                appointment.getDoctor().getName(),
                appointment.getSlot().getId(),
                appointment.getSlot().getStartTime(),
                appointment.getSlot().getEndTime(),
                appointment.getMode(),
                appointment.getStatus().toString(),
                appointment.getBookingTime()
        );
    }
}
