package com.example.demo.config;


import com.example.demo.entities.Device;
import com.example.demo.entities.Measurement;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.repository.MeasurementRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private DeviceRepository deviceRepository;
    private MeasurementRepository measurementRepository;

    @Override
    public void run(String... args) throws Exception {
        Device device1 = Device.builder().deviceId(1).energyConsumption(2.5).build();
        Device device2 = Device.builder().deviceId(2).energyConsumption(1.8).build();
        Device device3 = Device.builder().deviceId(3).energyConsumption(1.0).build();
        Device device4 = Device.builder().deviceId(4).energyConsumption(1.2).build();
        Device device5 = Device.builder().deviceId(5).energyConsumption(1.5).build();

        deviceRepository.save(device1);
        deviceRepository.save(device2);
        deviceRepository.save(device3);
        deviceRepository.save(device4);
        deviceRepository.save(device5);

        LocalDateTime baseDate = LocalDateTime.of(2024, 11, 14, 0, 0);
        List<Device> devices = List.of(device1, device2, device3, device4);
        for (Device device : devices) {
            List<Measurement> measurements = new ArrayList<>();

            for (int hour = 0; hour < 24; hour++) {
                LocalDateTime timestamp = baseDate.plusHours(hour);
                Date date = Date.from(timestamp.atZone(ZoneId.systemDefault()).toInstant());
                float energy = (float) (device.getEnergyConsumption() * (0.5 + Math.random()));
                Measurement measurement = Measurement.builder()
                        .date(date)
                        .energy(energy)
                        .aboveEnergyLimit(energy >= device.getEnergyConsumption())
                        .device(device)
                        .build();

                measurements.add(measurement);
            }

            measurementRepository.saveAll(measurements);
        }
    }
}

