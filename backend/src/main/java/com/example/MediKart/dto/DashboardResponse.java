package com.example.MediKart.dto;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private String userName;
    private int totalOrders;
    private int activePrescriptions;
    private double totalAmount;
    private int rewardPoints;
    private List<String> recentOrders;
}
