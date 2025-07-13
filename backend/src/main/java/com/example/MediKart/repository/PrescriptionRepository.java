package com.example.MediKart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MediKart.model.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    int countByStatus(String status); // 👈 Make sure status column exists
}
