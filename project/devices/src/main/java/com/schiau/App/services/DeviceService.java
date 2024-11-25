package com.schiau.App.services;

import com.schiau.App.entities.Customer;
import com.schiau.App.entities.Device;
import com.schiau.App.repositories.DeviceRepository;
import com.schiau.App.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;

    private final UserRepository userRepository;
    private final RabbitMQService rabbitMQService;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device getDeviceById(Integer id) {
        return deviceRepository.findById(id).orElse(null);
    }

    public Device createDevice(Device device) {
        device.setCustomer(null);
        Device savedDevice = deviceRepository.save(device);
        rabbitMQService.sendDeviceMessage(savedDevice);
        return savedDevice;
    }

    public Device updateDevice(Integer id, Device device) {
        if (!deviceRepository.existsById(id)) {
            return null;
        }
        device.setId(id);
        Device savedDevice = deviceRepository.save(device);
        rabbitMQService.sendDeviceMessage(savedDevice);
        return savedDevice;
    }

    public void deleteDevice(Integer id) {
        Device device = Device.builder()
                .id(id)
                .energyConsumption(-1.0)
                .build();
        rabbitMQService.sendDeviceMessage(device);
        deviceRepository.deleteById(id);
    }

    public Device assignDeviceToUser(Integer deviceId, Integer userId) {
        Device device = deviceRepository.findById(deviceId).orElse(null);
        Customer user = userRepository.findByRealId(userId).orElse(null);

        if (device != null && user != null) {
            device.setCustomer(user);
            return deviceRepository.save(device);
        }
        return null;
    }


    public Device removeDeviceFromUser(Integer deviceId) {
        Device device = deviceRepository.findById(deviceId).orElse(null);

        if (device != null) {
            device.setCustomer(null);
            return deviceRepository.save(device);
        }
        return null;
    }

    public List<Device> getAllUnsignedDevices() {
        return deviceRepository.findByCustomerIsNull();
    }

    public List<Device> getAllSignedDevicesById(Integer customerId) {
        Optional<Customer> customerOptional = userRepository.findByRealId(customerId);
        if(customerOptional.isPresent()) {
            return customerOptional.get().getDevices();
        }
        return new ArrayList<>();
    }
}
