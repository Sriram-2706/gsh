package com.gsh.gsh.repository;

import com.gsh.gsh.entity.Slot;
import com.gsh.gsh.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
    List<Slot> findByDoctor(Doctor doctor);
    List<Slot> findByDoctorAndIsBooked(Doctor doctor, Boolean isBooked);
    List<Slot> findByStartTimeAfterAndStartTimeBeforeAndDoctorAndIsBooked(
            LocalDateTime startTime, LocalDateTime endTime, Doctor doctor, Boolean isBooked);
}
