package com.gsh.gsh.service;

import com.gsh.gsh.entity.Doctor;
import com.gsh.gsh.entity.Specialty;
import com.gsh.gsh.dto.DoctorRequest;
import com.gsh.gsh.dto.DoctorResponse;
import com.gsh.gsh.repository.DoctorRepository;
import com.gsh.gsh.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecialtyRepository specialtyRepository;

    public DoctorResponse createDoctor(DoctorRequest request) {
        Specialty specialty = specialtyRepository.findById(request.getSpecialtyId())
                .orElseThrow(() -> new RuntimeException("Specialty not found"));

        Doctor doctor = new Doctor();
        doctor.setName(request.getName());
        doctor.setSpecialty(specialty);
        doctor.setMode(request.getMode());
        doctor.setExperience(request.getExperience());
        doctor.setConsultationFee(request.getConsultationFee());

        Doctor saved = doctorRepository.save(doctor);
        return toResponse(saved);
    }

    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return toResponse(doctor);
    }

    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getDoctorsBySpecialty(Long specialtyId) {
        Specialty specialty = specialtyRepository.findById(specialtyId)
                .orElseThrow(() -> new RuntimeException("Specialty not found"));
        return doctorRepository.findBySpecialty(specialty).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getDoctorsByMode(String mode) {
        return doctorRepository.findByMode(mode).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Specialty specialty = specialtyRepository.findById(request.getSpecialtyId())
                .orElseThrow(() -> new RuntimeException("Specialty not found"));

        doctor.setName(request.getName());
        doctor.setSpecialty(specialty);
        doctor.setMode(request.getMode());
        doctor.setExperience(request.getExperience());
        doctor.setConsultationFee(request.getConsultationFee());

        Doctor updated = doctorRepository.save(doctor);
        return toResponse(updated);
    }

    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("Doctor not found");
        }
        doctorRepository.deleteById(id);
    }

    private DoctorResponse toResponse(Doctor doctor) {
        return new DoctorResponse(
                doctor.getId(),
                doctor.getName(),
                doctor.getSpecialty().getId(),
                doctor.getSpecialty().getName(),
                doctor.getMode(),
                doctor.getExperience(),
                doctor.getConsultationFee()
        );
    }
}
