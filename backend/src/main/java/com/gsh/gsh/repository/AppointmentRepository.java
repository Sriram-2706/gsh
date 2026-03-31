package com.gsh.gsh.repository;

import com.gsh.gsh.entity.Appointment;
import com.gsh.gsh.entity.User;
import com.gsh.gsh.entity.Doctor;
import com.gsh.gsh.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatientAndStatus(User patient, AppointmentStatus status);
    List<Appointment> findByDoctorAndStatus(Doctor doctor, AppointmentStatus status);
}
