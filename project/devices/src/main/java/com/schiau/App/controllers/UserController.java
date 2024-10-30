package com.schiau.App.controllers;

import com.schiau.App.entities.Customer;
import com.schiau.App.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/{id}")
    public ResponseEntity<Customer> putUser(@PathVariable int id) {
        Customer user =new Customer();
        user.setRealId(id);
        return ResponseEntity.ok(userService.createUser(user));
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> removeUserFromDevices(@PathVariable Integer userId) {
        userService.removeUserToDevices(userId);
        return ResponseEntity.noContent().build();
    }
}
