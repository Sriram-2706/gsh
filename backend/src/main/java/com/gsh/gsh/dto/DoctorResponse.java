package com.gsh.gsh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {
    private Long id;
    private String name;
    private Long specialtyId;
    private String specialtyName;
    private String mode;
    private Integer experience;
    private Double consultationFee;
}
