package com.example.MediKart.service;

import com.example.MediKart.model.WishlistItem;
import java.util.List;

public interface WishlistService {
    List<WishlistItem> getWishlist(Long userId);
    WishlistItem addToWishlist(Long userId, Long productId);
    void removeFromWishlist(Long wishlistItemId);
    void clearWishlist(Long userId);
}
