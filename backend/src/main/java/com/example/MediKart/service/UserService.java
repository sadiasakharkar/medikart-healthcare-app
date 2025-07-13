package com.example.MediKart.service;

import com.example.MediKart.model.User;

public interface UserService {
    String registerUser(User user);
    User login(String email, String password);
    String getDashboardData(Long userId);
}
