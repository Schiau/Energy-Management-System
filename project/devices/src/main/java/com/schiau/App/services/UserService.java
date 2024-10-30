package com.schiau.App.services;

import com.schiau.App.entities.Customer;
import com.schiau.App.entities.Device;
import com.schiau.App.repositories.DeviceRepository;
import com.schiau.App.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    public Customer createUser(Customer user) {
        Optional<Customer> existingUser = userRepository.findByRealId(user.getRealId());
        return existingUser.orElseGet(() -> userRepository.save(user));
    }

    public void removeUserToDevices(Integer userId) {
        Optional<Customer> userOptional = userRepository.findByRealId(userId);
        if (userOptional.isPresent()) {
            Customer customer = userOptional.get();

            // Detach devices from this customer
            for (Device device : customer.getDevices()) {
                device.setCustomer(null); // Set the customer reference to null
                deviceRepository.save(device); // Save the device to update it
            }
            userOptional.ifPresent(userRepository::delete);
        }

    }
}
