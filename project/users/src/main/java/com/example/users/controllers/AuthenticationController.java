package com.example.users.controllers;

import com.example.users.dto.AuthenticationRequest;
import com.example.users.dto.AuthenticationResponse;
import com.example.users.dto.RegisterRequest;
import com.example.users.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        try{
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .error("")
                            .success(true)
                            .token(service.register(request))
                            .build()
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    AuthenticationResponse.builder()
                            .error(e.getMessage())
                            .success(false)
                            .token("")
                            .build(),
                    HttpStatus.CONFLICT
            );
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        try{
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .error("")
                            .success(true)
                            .token(service.authenticate(request))
                            .build()
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    AuthenticationResponse.builder()
                            .error(e.getMessage())
                            .success(false)
                            .token("")
                            .build(),
                    HttpStatus.CONFLICT
            );
        }
    }
}
