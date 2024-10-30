package com.example.users.dto;

import com.example.users.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}
