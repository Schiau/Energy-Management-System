package com.schiau.App.repositories;

import com.schiau.App.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    List<Device> findByCustomerIsNull();
    List<Device> findByCustomerId(Integer customerId);
}
