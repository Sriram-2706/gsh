package com.gsh.gsh.repository;

import com.gsh.gsh.entity.Doctor;
import com.gsh.gsh.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialty(Specialty specialty);
    List<Doctor> findByMode(String mode);
}
