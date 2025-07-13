package com.example.MediKart.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String medicine;
    private String doctor;
    private String status; // active, expired, refilled

    private LocalDate prescriptionDate;

    private String fileName;
    private String fileType;

    @Lob
    @Column(length = 100000)
    private byte[] fileData;
}
