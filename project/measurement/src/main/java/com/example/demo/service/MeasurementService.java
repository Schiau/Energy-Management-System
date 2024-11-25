package com.example.demo.service;

import com.example.demo.dto.MeasurementDto;
import com.example.demo.dto.SensorData;
import com.example.demo.entities.Device;
import com.example.demo.entities.Measurement;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.repository.MeasurementRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
@Slf4j
public class MeasurementService {
    private MeasurementRepository measurementRepository;
    private DeviceRepository deviceRepository;

    public Measurement save(SensorData sensorData) {
        Date date = new Date(sensorData.getTimestamp().getYear(), sensorData.getTimestamp().getMonth(), sensorData.getTimestamp().getDate());
        date.setHours(sensorData.getTimestamp().getHours());
        Optional<Measurement> measurement = measurementRepository.findMeasurementByDateAndDevice_DeviceId(date, sensorData.getDeviceId());
        if(measurement.isEmpty()) {
            Device device = deviceRepository.findByDeviceId(sensorData.getDeviceId()) .orElseThrow(() -> new RuntimeException("Device not found"));
            Measurement newMeasurement = Measurement.builder()
                    .energy(sensorData.getMeasurementValue())
                    .date(date)
                    .device(device)
                    .aboveEnergyLimit(device.getEnergyConsumption() <= sensorData.getMeasurementValue())
                    .build();
            return measurementRepository.save(newMeasurement);
        }
        Measurement newMeasurement = measurement.get();
        newMeasurement.setEnergy(newMeasurement.getEnergy() + sensorData.getMeasurementValue());
        newMeasurement.setAboveEnergyLimit(newMeasurement.getDevice().getEnergyConsumption() <= newMeasurement.getEnergy());
        return measurementRepository.save(newMeasurement);
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
    public List<MeasurementDto> getMeasurementsForDeviceAndDate(Integer deviceId, Date date) {
        List<Measurement> result = new ArrayList<>();
        Date baseDate = new Date(date.getTime());
        baseDate.setHours(0);
        baseDate.setMinutes(0);
        baseDate.setSeconds(0);
        for(int i=0;i<24;i++)
        {
            Date currentDate = new Date(baseDate.getTime());
            currentDate.setHours(i);
            Measurement measurement = measurementRepository.findMeasurementByDateAndDevice_DeviceId(currentDate, deviceId).orElse(null);
            if(measurement != null)
                result.add(measurement);
        }
        return result.stream().map((i  ->
                MeasurementDto.builder()
                        .hour(String.format("%02d:00", i.getDate().getHours()))
                        .energy(i.getEnergy())
                        .build()
        )).toList();
    }
}

