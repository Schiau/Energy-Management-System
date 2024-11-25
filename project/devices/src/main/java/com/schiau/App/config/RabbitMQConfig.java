package com.schiau.App.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue deviceQueue() {
        return new Queue("deviceQueue", true);
    }
}
