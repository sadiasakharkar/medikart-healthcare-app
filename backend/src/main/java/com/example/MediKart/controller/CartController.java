package com.example.MediKart.controller;

import com.example.MediKart.dto.CartRequest;
import com.example.MediKart.model.CartItem;
import com.example.MediKart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartRequest request) {
        return cartService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity());
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PutMapping("/update/{cartItemId}")
    public void updateQuantity(@PathVariable Long cartItemId, @RequestParam int quantity) {
        cartService.updateQuantity(cartItemId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
    }

    @GetMapping("/summary/{userId}")
    public Map<String, Double> getCartSummary(@PathVariable Long userId) {
        return cartService.getCartSummary(userId);
    }
}