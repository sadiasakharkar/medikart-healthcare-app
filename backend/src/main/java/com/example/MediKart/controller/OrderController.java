package com.example.MediKart.controller;

import com.example.MediKart.model.Order;
import com.example.MediKart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // 1. Get all orders of a user
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId); // ✅ renamed to match service
    }

    // 2. Get orders by status only
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status); // ✅ removed userId param
    }

    // 3. Get orders within a date range (no userId in method signature)
    @GetMapping("/daterange")
    public List<Order> getOrdersByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return orderService.getOrdersByDateRange(
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)); // ✅ use LocalDate instead of LocalDateTime
    }

    // 4. Search orders by keyword
    @GetMapping("/search")
    public List<Order> searchOrders(@RequestParam String keyword) {
        return orderService.searchOrders(keyword); // ✅ removed userId
    }
}
