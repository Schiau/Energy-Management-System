package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date date;
    private float energy;
    private boolean aboveEnergyLimit;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "device_id")
    @ToString.Exclude
    private Device device;
}
