package com.example.MediKart.dto;

/**
 * DTO for handling cart addition requests from the frontend.
 */
public class CartRequest {

    private Long userId;
    private Long productId;
    private int quantity;

    // Constructors (optional but useful)
    public CartRequest() {
    }

    public CartRequest(Long userId, Long productId, int quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    // Getters
    public Long getUserId() {
        return userId;
    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    // Setters
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Optional: toString for debugging
    @Override
    public String toString() {
        return "CartRequest{" +
                "userId=" + userId +
                ", productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
