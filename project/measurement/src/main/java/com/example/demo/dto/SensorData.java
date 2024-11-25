package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SensorData {
    @JsonProperty("timestamp")
    private Date timestamp;

    @JsonProperty("device_id")
    private int deviceId;

    @JsonProperty("measurement_value")
    private float measurementValue;
}
