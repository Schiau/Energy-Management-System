package com.schiau.App.repositories;

import com.schiau.App.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Optional<Device> findByDeviceId(Integer deviceId);
    void deleteByDeviceId(Integer deviceId);
}
