package com.gsh.gsh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotResponse {
    private Long id;
    private Long doctorId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean isBooked;
}
