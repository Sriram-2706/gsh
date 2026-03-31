package com.gsh.gsh.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "LoginRequest", description = "User login request payload")
public class LoginRequest {
    
    @Schema(description = "Registered email address", example = "john.doe@example.com")
    private String email;
    
    @Schema(description = "Account password", example = "Password@123")
    private String password;
}
