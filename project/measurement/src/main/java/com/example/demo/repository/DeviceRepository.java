package com.example.demo.repository;

import com.example.demo.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Optional<Device> findByDeviceId(Integer deviceId);
    @Query("SELECT d FROM Device d JOIN d.measurements m WHERE m.aboveEnergyLimit = true")
    List<Device> findAllByMeasurementsAboveEnergyLimitTrue();
    void deleteByDeviceId(Integer deviceId);
}

