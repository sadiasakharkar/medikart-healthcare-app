package com.example.MediKart.service.impl;

import com.example.MediKart.model.User;
import com.example.MediKart.repository.UserRepository;
import com.example.MediKart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String registerUser(User user) {
        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null; // or throw custom exception if you prefer
    }

    @Override
    public String getDashboardData(Long userId) {
        return "Welcome, user #" + userId + "! Here's your dashboard summary.";
    }
}
