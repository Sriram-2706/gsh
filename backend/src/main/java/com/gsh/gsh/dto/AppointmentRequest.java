package com.gsh.gsh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private Long slotId;
    private String mode;
}
