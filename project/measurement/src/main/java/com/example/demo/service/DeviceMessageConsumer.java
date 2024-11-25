package com.example.demo.service;

import com.example.demo.dto.DeviceMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class DeviceMessageConsumer {
    private final ObjectMapper objectMapper;
    private final DeviceService deviceService;
    @RabbitListener(queues = "deviceQueue")
    public void listen(String message) {
        try {
            DeviceMessageDTO data = objectMapper.readValue(message, DeviceMessageDTO.class);
            log.info("Received Message: Device ID = {}, Energy Consumption = {}", data.getDeviceId(), data.getEnergyConsumption());
            deviceService.updateDevicesByDeviceMessages(data);
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
        }
    }
}
