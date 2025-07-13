package com.example.MediKart.controller;

import com.example.MediKart.model.WishlistItem;
import com.example.MediKart.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public List<WishlistItem> viewWishlist(@PathVariable Long userId) {
        return wishlistService.getWishlist(userId);
    }

    @PostMapping("/add")
    public WishlistItem addToWishlist(@RequestParam Long userId, @RequestParam Long productId) {
        return wishlistService.addToWishlist(userId, productId);
    }

    @DeleteMapping("/remove/{wishlistItemId}")
    public void removeFromWishlist(@PathVariable Long wishlistItemId) {
        wishlistService.removeFromWishlist(wishlistItemId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearWishlist(@PathVariable Long userId) {
        wishlistService.clearWishlist(userId);
    }
}
