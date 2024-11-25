package com.example.demo.repository;

import com.example.demo.entities.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    Optional<Measurement> findMeasurementByDateAndDevice_DeviceId(Date date, Integer deviceId);
    List<Measurement> findAllByAboveEnergyLimitTrue();
    List<Measurement> findAllByAboveEnergyLimitTrueAndDevice_DeviceId(Integer deviceId);
    List<Measurement> findAllByDevice_DeviceId(Integer deviceId);
}
