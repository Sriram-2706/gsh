package com.gsh.gsh.config;

import com.gsh.gsh.entity.*;
import com.gsh.gsh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataLoader {

    private final SpecialtyRepository specialtyRepository;
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner loadData() {
        return args -> {
            // Load specialties
            if (specialtyRepository.count() == 0) {
                Specialty cardiology = new Specialty();
                cardiology.setName("Cardiology");
                specialtyRepository.save(cardiology);

                Specialty dermatology = new Specialty();
                dermatology.setName("Dermatology");
                specialtyRepository.save(dermatology);

                Specialty neurology = new Specialty();
                neurology.setName("Neurology");
                specialtyRepository.save(neurology);

                Specialty orthopedics = new Specialty();
                orthopedics.setName("Orthopedics");
                specialtyRepository.save(orthopedics);

                Specialty pediatrics = new Specialty();
                pediatrics.setName("Pediatrics");
                specialtyRepository.save(pediatrics);
            }

            // Load doctors
            if (doctorRepository.count() == 0) {
                Specialty cardiology = specialtyRepository.findByName("Cardiology").orElse(null);

                Doctor doctor1 = new Doctor();
                doctor1.setName("Dr. Rajesh Kumar");
                doctor1.setSpecialty(cardiology);
                doctor1.setMode("Online");
                doctor1.setExperience(10);
                doctor1.setConsultationFee(500.0);
                doctorRepository.save(doctor1);

                Doctor doctor2 = new Doctor();
                doctor2.setName("Dr. Priya Sharma");
                doctor2.setSpecialty(cardiology);
                doctor2.setMode("Offline");
                doctor2.setExperience(8);
                doctor2.setConsultationFee(600.0);
                doctorRepository.save(doctor2);

                Specialty dermatology = specialtyRepository.findByName("Dermatology").orElse(null);
                Doctor doctor3 = new Doctor();
                doctor3.setName("Dr. Anuj Singh");
                doctor3.setSpecialty(dermatology);
                doctor3.setMode("Online");
                doctor3.setExperience(12);
                doctor3.setConsultationFee(450.0);
                doctorRepository.save(doctor3);

                Specialty neurology = specialtyRepository.findByName("Neurology").orElse(null);
                Doctor doctor4 = new Doctor();
                doctor4.setName("Dr. Meera Patel");
                doctor4.setSpecialty(neurology);
                doctor4.setMode("Offline");
                doctor4.setExperience(15);
                doctor4.setConsultationFee(700.0);
                doctorRepository.save(doctor4);
            }

            // Load slots
            if (slotRepository.count() == 0) {
                java.util.List<Doctor> doctors = doctorRepository.findAll();
                LocalDateTime now = LocalDateTime.now();

                for (Doctor doctor : doctors) {
                    for (int i = 1; i <= 5; i++) {
                        Slot slot = new Slot();
                        slot.setDoctor(doctor);
                        slot.setStartTime(now.plusDays(i).withHour(10).withMinute(0));
                        slot.setEndTime(now.plusDays(i).withHour(10).withMinute(30));
                        slot.setIsBooked(false);
                        slotRepository.save(slot);

                        Slot slot2 = new Slot();
                        slot2.setDoctor(doctor);
                        slot2.setStartTime(now.plusDays(i).withHour(14).withMinute(0));
                        slot2.setEndTime(now.plusDays(i).withHour(14).withMinute(30));
                        slot2.setIsBooked(false);
                        slotRepository.save(slot2);
                    }
                }
            }

            // Load sample patients (users with PATIENT role)
            if (userRepository.count() == 0) {
                User patient1 = new User();
                patient1.setName("Arjun Verma");
                patient1.setEmail("arjun@example.com");
                patient1.setPassword(passwordEncoder.encode("password123"));
                patient1.setRole(Role.PATIENT);
                userRepository.save(patient1);

                User patient2 = new User();
                patient2.setName("Neha Gupta");
                patient2.setEmail("neha@example.com");
                patient2.setPassword(passwordEncoder.encode("password123"));
                patient2.setRole(Role.PATIENT);
                userRepository.save(patient2);

                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
            }
        };
    }
}
