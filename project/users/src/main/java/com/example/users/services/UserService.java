package com.example.users.services;

import com.example.users.dto.CreateUserRequest;
import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final AddUserToDevicesService addUserToDevicesService;

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

    @Transactional
    public void deleteUserById(Integer id) {
        addUserToDevicesService.removeUserToDevices(id,JwtService.getCurrentToken());
        repository.deleteById(id);
    }

    @Transactional
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
        addUserToDevicesService.addUserToDevices(user.getId().toString(), JwtService.getCurrentToken());
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
