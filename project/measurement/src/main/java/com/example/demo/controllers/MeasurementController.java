package com.example.demo.controllers;

import com.example.demo.dto.*;
import com.example.demo.entities.Device;
import com.example.demo.entities.Measurement;
import com.example.demo.service.DeviceService;
import com.example.demo.service.MeasurementService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
@Slf4j
public class MeasurementController {

    private final DeviceService deviceService;
    private final MeasurementService measurementService;
    private final SimpMessagingTemplate messagingTemplate;
    public void sendMeasurementMessage(Integer idDevice, Measurement message) {
        messagingTemplate.convertAndSend("/devices/new",
                NewMeasurementDto.builder()
                        .idDevice(idDevice)
                        .hour(String.format("%02d:00", message.getDate().getHours()))
                        .energy(message.getEnergy())
                .build());
    }

    @PostConstruct
    public void sendDeviceMessageOnce() {
        sendDeviceMessage();
    }

    public void sendDeviceMessage() {
        List<Device> devices = deviceService.findAllByMeasurementsAboveEnergyLimitTrue();
        messagingTemplate.convertAndSend("/overEnergy",devices);
    }
    @MessageMapping("/init")
    @SendTo("/overEnergy")
    public List<Device> initSendDeviceMessage() {
        return deviceService.findAllByMeasurementsAboveEnergyLimitTrue();
    }
    @MessageMapping("/measurement")
    @SendTo("/devices")
    public List<MeasurementDto> getMeasurementByIdDeviceAndDate(@Payload MeasurementByDeviceIdAndDateDto request) {
        log.info(request.toString());
        List<MeasurementDto> result = measurementService.getMeasurementsForDeviceAndDate(request.getIdDevice(), request.getDate());
        return result;
    }


}

