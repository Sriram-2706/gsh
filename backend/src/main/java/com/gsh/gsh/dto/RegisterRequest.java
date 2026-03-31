package com.gsh.gsh.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "RegisterRequest", description = "User registration request payload")
public class RegisterRequest {
    
    @Schema(description = "Full name of the user", example = "John Doe")
    private String name;
    
    @Schema(description = "Email address (must be unique)", example = "john.doe@example.com")
    private String email;
    
    @Schema(description = "Password for the account", example = "Password@123")
    private String password;
    
    @Schema(description = "User role", example = "PATIENT", allowableValues = {"PATIENT", "ADMIN"})
    private String role;
}
