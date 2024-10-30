package com.example.users.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private boolean success;
    private String token;
    private String error;
}
