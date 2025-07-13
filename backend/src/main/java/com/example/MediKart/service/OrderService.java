package com.example.MediKart.service;

import com.example.MediKart.model.Order;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    List<Order> getOrdersByUserId(Long userId);

    List<Order> getOrdersByStatus(String status);

    List<Order> getOrdersByDateRange(LocalDate startDate, LocalDate endDate);

    List<Order> searchOrders(String keyword);

    long getOrderCount();

    List<Order> getLatestOrders(int limit);

    double getTotalOrderAmount();

    Order placeOrderFromCart(Long userId, String status, List<String> items, double total); // 🆕 Added
}
