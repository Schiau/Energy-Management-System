package com.schiau.App.config;

import com.schiau.App.entities.Customer;
import com.schiau.App.entities.Device;
import com.schiau.App.repositories.DeviceRepository;
import com.schiau.App.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private UserRepository userRepository;
    private DeviceRepository deviceRepository;
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() != 0 || deviceRepository.count() != 0)
            return;

        Customer customer1 = Customer.builder().realId(1).build();
        Customer customer2 = Customer.builder().realId(2).build();;

        userRepository.save(customer1);
        userRepository.save(customer2);

        Device device1 = Device.builder()
                .description("Air Conditioner")
                .location("123 Elm Street")
                .energyConsumption(2.5)
                .customer(customer1)
                .build();

        Device device2 = Device.builder()
                .description("Washing Machine")
                .location("456 Oak Avenue")
                .energyConsumption(1.8)
                .customer(customer1)
                .build();

        Device device3 = Device.builder()
                .description("Refrigerator")
                .location("789 Pine Road")
                .energyConsumption(1.0)
                .customer(customer2)
                .build();


        Device device4 = Device.builder()
                .description("Microwave")
                .location("101 Maple Drive")
                .energyConsumption(1.2)
                .build();

        Device device5 = Device.builder()
                .description("Dishwasher")
                .location("202 Birch Lane")
                .energyConsumption
                        (1.5)
                .build();

        deviceRepository.save(device1);
        deviceRepository.save(device2);
        deviceRepository.save(device3);
        deviceRepository.save(device4);
        deviceRepository.save(device5);
    }
}
