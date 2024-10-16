package com.schiau.App.services;

import com.schiau.App.dto.AuthenticationRequest;
import com.schiau.App.dto.RegisterRequest;
import com.schiau.App.entities.Role;
import com.schiau.App.entities.User;
import com.schiau.App.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        if(repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        repository.save(user);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        return jwtService.generateToken(claims, user);
    }

    public String authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        return jwtService.generateToken(claims, user);
    }
}
