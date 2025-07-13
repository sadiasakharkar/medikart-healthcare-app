package com.example.MediKart.controller;

import com.example.MediKart.repository.OrderRepository;
import com.example.MediKart.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/metrics")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // ✅ 1. Total Orders (Dynamic)
    @GetMapping("/orders/count")
    public Map<String, Integer> getOrderCount() {
        int count = orderRepository.countBy();
        return Map.of("count", count);
    }

    // ✅ 2. Active Prescriptions (Dynamic)
    @GetMapping("/prescriptions/active")
    public Map<String, Integer> getActivePrescriptions() {
        int count = prescriptionRepository.countByStatus("active");
        return Map.of("count", count);
    }

    // ✅ 3. Reward Points (💡 Dynamic Based on Total Order Amount)
    @GetMapping("/rewards/total")
    public Map<String, Integer> getRewardPoints() {
        Double totalAmount = orderRepository.getTotalOrderAmount();
        int rewardPoints = totalAmount != null ? (int) (totalAmount / 10) : 0; // ₹10 = 1 point
        return Map.of("points", rewardPoints);
    }

    // ✅ 4. Total Savings (💡 Simulated: 15% of Total Order Amount)
    @GetMapping("/savings/amount")
    public Map<String, Integer> getSavings() {
        Double totalAmount = orderRepository.getTotalOrderAmount();
        int savings = totalAmount != null ? (int) (totalAmount * 0.15) : 0; // 15% discount simulated
        return Map.of("amount", savings);
    }
}
