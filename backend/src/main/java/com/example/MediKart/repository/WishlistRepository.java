package com.example.MediKart.repository;

import com.example.MediKart.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
