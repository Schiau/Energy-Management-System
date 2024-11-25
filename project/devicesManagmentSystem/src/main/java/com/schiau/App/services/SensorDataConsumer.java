package com.schiau.App.services;

import com.schiau.App.dto.SensorData;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@AllArgsConstructor
@Slf4j
public class SensorDataConsumer {

    private final ObjectMapper objectMapper;
    private final MeasurementService measurementService;

    @RabbitListener(queues = "sensor_data_queue")
    public void listen(String message) {
        try {
            SensorData data = objectMapper.readValue(message, SensorData.class);
            log.info("Received Message: {}", data);
            measurementService.save(data);
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
        }
    }
}
