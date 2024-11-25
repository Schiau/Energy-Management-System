package com.schiau.App.controllers;

import com.schiau.App.entities.Device;
import com.schiau.App.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MeasurementController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private DeviceService deviceService;
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public List<Device> receiveMessage(){
        return deviceService.getAllDevices();
    }

}
