package com.gsh.gsh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long slotId;
    private LocalDateTime slotStartTime;
    private LocalDateTime slotEndTime;
    private String mode;
    private String status;
    private LocalDateTime bookingTime;
}
