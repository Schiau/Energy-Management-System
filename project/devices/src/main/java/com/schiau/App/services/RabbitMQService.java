package com.schiau.App.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.schiau.App.dto.DeviceMessageDTO;
import com.schiau.App.entities.Device;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RabbitMQService {
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public void sendDeviceMessage(Device device) {
        try {
            DeviceMessageDTO messageDTO = new DeviceMessageDTO(device.getId(), device.getEnergyConsumption());
            String jsonMessage = objectMapper.writeValueAsString(messageDTO);
            rabbitTemplate.convertAndSend("deviceQueue", jsonMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert message to JSON", e);
        }
    }
}
