package com.example.MediKart.service.impl;

import com.example.MediKart.model.Order;
import com.example.MediKart.repository.OrderRepository;
import com.example.MediKart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public List<Order> getOrdersByDateRange(LocalDate startDate, LocalDate endDate) {
        return orderRepository.findByCreatedAtBetween(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
    }

    @Override
    public List<Order> searchOrders(String keyword) {
        return orderRepository.search(keyword);
    }

    @Override
    public long getOrderCount() {
        return orderRepository.count();
    }

    @Override
    public List<Order> getLatestOrders(int limit) {
        return orderRepository.findTop3ByOrderByCreatedAtDesc();
    }

    @Override
    public double getTotalOrderAmount() {
        return orderRepository.getTotalOrderAmount();
    }

    @Override
    public Order placeOrderFromCart(Long userId, String status, List<String> items, double total) {
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus(status);
        order.setProductName("Cart Items"); // or concatenate all item names
        order.setItems(items);
        order.setTotal(total);
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
