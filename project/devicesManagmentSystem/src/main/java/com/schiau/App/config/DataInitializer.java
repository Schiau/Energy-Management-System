package com.schiau.App.config;

import com.schiau.App.entities.Device;
import com.schiau.App.entities.Measurement;
import com.schiau.App.repositories.DeviceRepository;
import com.schiau.App.repositories.MeasurementRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private DeviceRepository deviceRepository;
    private MeasurementRepository measurementRepository;
    @Override
    public void run(String... args) throws Exception {
        Device device1 = Device.builder()
                .deviceId(1)
                .energyConsumption(2.5)
                .build();

        Device device2 = Device.builder()
                .deviceId(2)
                .energyConsumption(1.8)
                .build();

        Device device3 = Device.builder()
                .deviceId(3)
                .energyConsumption(1.0)
                .build();

        Device device4 = Device.builder()
                .deviceId(4)
                .energyConsumption(1.2)
                .build();

        Device device5 = Device.builder()
                .deviceId(5)
                .energyConsumption(1.5)
                .build();

        deviceRepository.save(device1);
        deviceRepository.save(device2);
        deviceRepository.save(device3);
        deviceRepository.save(device4);
        deviceRepository.save(device5);
    }
}
