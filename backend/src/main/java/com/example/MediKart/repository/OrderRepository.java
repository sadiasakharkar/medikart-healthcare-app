package com.example.MediKart.repository;

import com.example.MediKart.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

        // ✅ ADDED: Global order count for dashboard
        int countBy();

        // Get orders for a user
        List<Order> findByUserId(Long userId);

        // Get orders by status
        List<Order> findByStatus(String status);

        // Get orders in a date range
        List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

        // Search orders for a user
        @Query("SELECT o FROM Order o WHERE o.userId = :userId AND " +
                        "(LOWER(o.status) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                        "OR LOWER(o.productName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
        List<Order> searchByKeyword(@Param("userId") Long userId, @Param("keyword") String keyword);

        // Fallback for global search
        @Query("SELECT o FROM Order o WHERE " +
                        "LOWER(o.status) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                        "OR LOWER(o.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
        List<Order> search(@Param("keyword") String keyword);

        // Count orders by user
        int countByUserId(Long userId);

        // Latest 3 orders for dashboard
        List<Order> findTop3ByUserIdOrderByCreatedAtDesc(Long userId);

        // Latest 3 orders overall
        List<Order> findTop3ByOrderByCreatedAtDesc();

        // Total order amount for all users
        @Query("SELECT SUM(o.total) FROM Order o")
        Double getTotalOrderAmount();

        // Total order amount for a user
        @Query("SELECT SUM(o.total) FROM Order o WHERE o.userId = :userId")
        Double sumAmountByUserId(@Param("userId") Long userId);
}
