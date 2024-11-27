package com.example.demo.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue deviceQueue() {
        return new Queue("deviceQueue", true);
    }

    @Bean
    public Queue sensorDataQueue() {
        return new Queue("sensor_data_queue", true);
    }

}
