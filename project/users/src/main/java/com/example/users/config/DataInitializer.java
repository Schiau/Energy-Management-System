package com.example.users.config;

import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DataInitializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        User user1 = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password(encoder.encode("password123"))
                .role(Role.USER)
                .build();

        User user2 = User.builder()
                .firstName("Jane")
                .lastName("Doe")
                .email("jane.doe@example.com")
                .password(encoder.encode("password123"))
                .role(Role.USER)
                .build();

        User admin = User.builder()
                .firstName("Admin")
                .lastName("User")
                .email("admin@example.com")
                .password(encoder.encode("password123"))
                .role(Role.ADMIN)
                .build();

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(admin);
    }
}
