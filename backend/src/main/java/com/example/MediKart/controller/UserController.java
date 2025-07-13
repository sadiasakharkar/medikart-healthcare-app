package com.example.MediKart.controller;

import com.example.MediKart.dto.LoginRequest;
import com.example.MediKart.model.User;
import com.example.MediKart.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private int jwtExpirationMs;

    // ✅ LOGIN with JWT Token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
        }

        User user = optionalUser.get();

        String rawPassword = loginRequest.getPassword();
        String storedPassword = user.getPassword().replace("{noop}", "");

        if (!storedPassword.equals(rawPassword)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
        }

        // ✅ Generate JWT token
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("fullName", user.getFullName());
        userData.put("email", user.getEmail());
        userData.put("username", user.getUsername());
        userData.put("phone", user.getPhone());

        return ResponseEntity.ok(Map.of(
                "message", "Login successful!",
                "token", jwt,
                "user", userData));
    }

    // ✅ SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
        }

        if (user.getPhone() == null || user.getPhone().isBlank()) {
            user.setPhone("0000000000");
        }

        if (user.getUsername() == null || user.getUsername().isBlank()) {
            user.setUsername(user.getEmail().split("@")[0]);
        }

        user.setPassword("{noop}" + user.getPassword());
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Registration successful!"));
    }

    // ✅ UPDATE USER INFO
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findByEmail(updatedUser.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
        }

        User user = optionalUser.get();
        user.setFullName(updatedUser.getFullName());
        user.setPhone(updatedUser.getPhone());

        userRepository.save(user);

        Map<String, Object> updatedUserData = new HashMap<>();
        updatedUserData.put("id", user.getId());
        updatedUserData.put("fullName", user.getFullName());
        updatedUserData.put("email", user.getEmail());
        updatedUserData.put("username", user.getUsername());
        updatedUserData.put("phone", user.getPhone());

        return ResponseEntity.ok(Map.of(
                "message", "User info updated!",
                "user", updatedUserData));
    }

    // ✅ CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("newPassword");

        if (email == null || newPassword == null || email.isBlank() || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid input"));
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
        }

        User user = optionalUser.get();
        user.setPassword("{noop}" + newPassword);

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password changed successfully!"));
    }
}
