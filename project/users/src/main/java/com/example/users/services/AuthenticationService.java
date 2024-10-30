package com.example.users.services;

import com.example.users.dto.AuthenticationRequest;
import com.example.users.dto.RegisterRequest;
import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.repositories.UserRepository;
import jakarta.transaction.Transactional;
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
    private final AddUserToDevicesService addUserToDevicesService;
    private final AuthenticationManager authenticationManager;

    @Transactional
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
        String token = jwtService.generateToken(claims, user);

        User curentUser = repository.findByEmail(user.getEmail()).get();
        addUserToDevicesService.addUserToDevices(curentUser.getId().toString(), token);
        return token;
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
