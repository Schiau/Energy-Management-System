package com.schiau.App.services;

import com.schiau.App.dto.SensorData;
import com.schiau.App.entities.Device;
import com.schiau.App.entities.Measurement;
import com.schiau.App.repositories.DeviceRepository;
import com.schiau.App.repositories.MeasurementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MeasurementService {
    private MeasurementRepository measurementRepository;
    private DeviceRepository deviceRepository;

    public void save(SensorData sensorData) {
        Date date = new Date(sensorData.getTimestamp().getYear(), sensorData.getTimestamp().getMonth(), sensorData.getTimestamp().getDay(),sensorData.getTimestamp().getHours(), 0, 0);
        Optional<Measurement> measurement = measurementRepository.findMeasurementByDateAndDevice_DeviceId(date, sensorData.getDeviceId());
        if(measurement.isEmpty()) {
            Device device = deviceRepository.findByDeviceId(sensorData.getDeviceId()) .orElseThrow(() -> new RuntimeException("Device not found"));
            Measurement newMeasurement = Measurement.builder()
                    .energy(sensorData.getMeasurementValue())
                    .date(date)
                    .device(device)
                    .aboveEnergyLimit(device.getEnergyConsumption() <= sensorData.getMeasurementValue())
                    .build();
            measurementRepository.save(newMeasurement);
            return;
        }
        Measurement newMeasurement = measurement.get();
        newMeasurement.setEnergy(newMeasurement.getEnergy() + sensorData.getMeasurementValue());
        newMeasurement.setAboveEnergyLimit(newMeasurement.getDevice().getEnergyConsumption() <= newMeasurement.getEnergy());
        measurementRepository.save(newMeasurement);
    }
    public List<Measurement> getMeasurementsAboveEnergyLimit() {
        return measurementRepository.findAllByAboveEnergyLimitTrue();
    }

    public List<Measurement> getMeasurementsAboveEnergyLimitForDevice(Integer deviceId) {
        return measurementRepository.findAllByAboveEnergyLimitTrueAndDevice_DeviceId(deviceId);
    }

    public List<Measurement> getMeasurementsForDevice(Integer deviceId) {
        return measurementRepository.findAllByDevice_DeviceId(deviceId);
    }
}
