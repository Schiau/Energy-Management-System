package com.example.users.dto;

import com.example.users.entities.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Boolean success;
    private String message;
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}

