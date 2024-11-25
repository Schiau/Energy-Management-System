package com.schiau.App.services;

import com.schiau.App.dto.DeviceMessageDTO;
import com.schiau.App.entities.Device;
import com.schiau.App.repositories.DeviceRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceService {
    private DeviceRepository deviceRepository;

    private Device saveUpdateDeviceMessage(DeviceMessageDTO deviceMessageDTO) {
        Optional<Device> savedDevice = deviceRepository.findByDeviceId(deviceMessageDTO.getDeviceId());
        if(savedDevice.isEmpty())
        {
            Device device = Device.builder()
                    .deviceId(deviceMessageDTO.getDeviceId())
                    .energyConsumption(deviceMessageDTO.getEnergyConsumption())
                    .build();
            return deviceRepository.save(device);
        }

        Device device = savedDevice.get();
        device.setEnergyConsumption(deviceMessageDTO.getEnergyConsumption());
        device.setDeviceId(deviceMessageDTO.getDeviceId());
        return deviceRepository.save(device);
    }

    private void deleteDeviceMessage(DeviceMessageDTO deviceMessageDTO) {
        deviceRepository.deleteByDeviceId(deviceMessageDTO.getDeviceId());
    }

    @Transactional
    public Optional<Device> updateDevicesByDeviceMessages(DeviceMessageDTO deviceMessageDTO) {
        if(deviceMessageDTO.getEnergyConsumption().equals(-1.0))
        {
            deleteDeviceMessage(deviceMessageDTO);
            return Optional.empty();
        }else{
            return Optional.of(saveUpdateDeviceMessage(deviceMessageDTO));
        }
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }
}
