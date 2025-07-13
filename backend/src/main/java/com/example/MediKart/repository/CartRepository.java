package com.example.MediKart.repository;

import com.example.MediKart.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
