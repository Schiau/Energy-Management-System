package com.schiau.App.services;

import com.schiau.App.dto.CreateUserRequest;
import com.schiau.App.entities.Role;
import com.schiau.App.entities.User;
import com.schiau.App.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public Role getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Role) authentication.getCredentials();
    }

    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public List<User> getUsers() {
        return repository.findAll();
    }

    public User getUserById(Integer id) {
        Optional<User> user =  repository.findById(id);
        if(user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return user.get();
    }

    public void deleteUserById(Integer id) {
        repository.deleteById(id);
    }

    public User createNew(CreateUserRequest request) {
        Role role = Role.USER;
        if(request.getRole() != null) {
            role = request.getRole();
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(role)
                .build();

        if(repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        if(request.getPassword().isBlank()){
            throw new RuntimeException("Password is incorrect");
        }
        repository.save(user);
        return user;
    }

    public User updateUser(CreateUserRequest request, Integer id) {
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        existingUser.setFirstName(request.getFirstName() != null ? request.getFirstName() : existingUser.getFirstName());
        existingUser.setLastName(request.getLastName() != null ? request.getLastName() : existingUser.getLastName());
        existingUser.setEmail(request.getEmail() != null ? request.getEmail() : existingUser.getEmail());
        existingUser.setPassword(request.getPassword() != null ? encoder.encode(request.getPassword()) : existingUser.getPassword());
        existingUser.setRole(request.getRole() != null ? request.getRole() : existingUser.getRole());

        return repository.save(existingUser);
    }
}
