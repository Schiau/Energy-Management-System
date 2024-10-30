package com.schiau.App.controllers;

import com.schiau.App.entities.Device;
import com.schiau.App.services.DeviceService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@AllArgsConstructor
@Log
public class DeviceController {
    private final DeviceService deviceService;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/unsigned")
    public List<Device> getAllUnsignedDevices() {
        return deviceService.getAllUnsignedDevices();
    }

    @GetMapping("/signed/{id}")
    public List<Device> getAllSignedDevices(@PathVariable int id) {
        return deviceService.getAllSignedDevicesById(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Integer id) {
        Device device = deviceService.getDeviceById(id);
        return device != null ? ResponseEntity.ok(device) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device createdDevice = deviceService.createDevice(device);
        return createdDevice != null ? ResponseEntity.ok(createdDevice) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Integer id, @RequestBody Device device) {
        Device updatedDevice = deviceService.updateDevice(id, device);
        return updatedDevice != null ? ResponseEntity.ok(updatedDevice) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Integer id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{deviceId}/assign/{userId}")
    public ResponseEntity<Device> assignDeviceToUser(@PathVariable Integer deviceId, @PathVariable Integer userId) {
        log.info(deviceId.toString());
        log.info(userId.toString());
        var response =deviceService.assignDeviceToUser(deviceId, userId);
        if(response != null)
        {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/assign/{deviceId}")
    public ResponseEntity<Device> removeDeviceFromUser(@PathVariable Integer deviceId) {
        log.info(deviceId.toString());
        var response =deviceService.removeDeviceFromUser(deviceId);
        if(response != null)
        {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}

