package com.example.MediKart.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private Long userId;
   
    private String status;
    
    private String productName;

    private double total;

    private LocalDateTime createdAt;

    @ElementCollection
    private List<String> items; // List of item names or IDs

}
