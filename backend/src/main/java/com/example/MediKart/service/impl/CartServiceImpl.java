package com.example.MediKart.service.impl;

import com.example.MediKart.model.CartItem;
import com.example.MediKart.model.Product;
import com.example.MediKart.repository.CartItemRepository;
import com.example.MediKart.repository.ProductRepository;
import com.example.MediKart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public CartItem addToCart(Long userId, Long productId, int quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product product = productOpt.get();

        CartItem item = new CartItem();
        item.setUserId(userId);
        item.setProductId(productId);
        item.setProductName(product.getName());
        item.setPrice(product.getPrice());
        item.setQuantity(quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public List<CartItem> getCartItems(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);

        for (CartItem item : items) {
            Optional<Product> productOpt = productRepository.findById(item.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                item.setProductName(product.getName());
                item.setPrice(product.getPrice());
                // You can set brand, image, etc. here too if needed
                // item.setBrand(product.getBrand());
            }
        }

        return items;
    }

    @Override
    public void updateQuantity(Long cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    @Override
    public Map<String, Double> getCartSummary(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        double total = 0;
        int count = 0;

        for (CartItem item : items) {
            total += item.getPrice() * item.getQuantity();
            count += item.getQuantity();
        }

        Map<String, Double> summary = new HashMap<>();
        summary.put("totalPrice", total);
        summary.put("totalItems", (double) count);
        return summary;
    }
}
