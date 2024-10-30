package com.example.users.controllers;

import com.example.users.dto.CreateUserRequest;
import com.example.users.dto.RoleResponse;
import com.example.users.dto.UserDto;
import com.example.users.dto.UserResponse;
import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    @GetMapping("/role")
    public ResponseEntity<RoleResponse> isAdmin(){
        return ResponseEntity.ok(
                RoleResponse.builder()
                        .isAdmin(service.getRole().equals(Role.ADMIN))
                        .build()
        );
    }
    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser(){
        User currentUser = service.getUser();
        return ResponseEntity.ok(
                UserDto.builder()
                        .id(currentUser.getId())
                        .email(currentUser.getEmail())
                        .firstName(currentUser.getFirstName())
                        .lastName(currentUser.getLastName())
                        .password("")
                        .role(service.getRole())
                        .build()
        );
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<User> users = service.getUsers();
        List<UserDto> responsList = users.stream().map(currentUser -> {
            return UserDto.builder()
                    .id(currentUser.getId())
                    .email(currentUser.getEmail())
                    .firstName(currentUser.getFirstName())
                    .lastName(currentUser.getLastName())
                    .password("")
                    .role(currentUser.getRole())
                    .build();
        }).toList();
        return ResponseEntity.ok(responsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Integer id){
        User user = service.getUserById(id);
        return ResponseEntity.ok(
                UserDto.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .password("")
                        .role(user.getRole())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        service.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request)
    {
        try{
            System.out.println(request.getRole());
            User response = service.createNew(request);
            return ResponseEntity.ok(
                    UserResponse.builder()
                            .success(true)
                            .message("Create whit success")
                            .id(response.getId())
                            .email(response.getEmail())
                            .firstName(response.getFirstName())
                            .lastName(response.getLastName())
                            .password("")
                            .role(response.getRole())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    UserResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build()
            );
        }
    }
    @PostMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody CreateUserRequest request, @PathVariable Integer id)
    {
        try{
            User response = service.updateUser(request, id);
            return ResponseEntity.ok(
                    UserResponse.builder()
                            .success(true)
                            .message("Update whit success")
                            .id(response.getId())
                            .email(response.getEmail())
                            .firstName(response.getFirstName())
                            .lastName(response.getLastName())
                            .password("")
                            .role(response.getRole())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    UserResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build()
            );
        }
    }
}
