package com.example.MediKart.service.impl;

import com.example.MediKart.model.Product;
import com.example.MediKart.model.WishlistItem;
import com.example.MediKart.repository.ProductRepository;
import com.example.MediKart.repository.WishlistRepository;
import com.example.MediKart.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<WishlistItem> getWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @Override
    public WishlistItem addToWishlist(Long userId, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        WishlistItem item = new WishlistItem();
        item.setUserId(userId);
        item.setProduct(product);
        return wishlistRepository.save(item);
    }

    @Override
    public void removeFromWishlist(Long wishlistItemId) {
        wishlistRepository.deleteById(wishlistItemId);
    }

    @Override
    public void clearWishlist(Long userId) {
        wishlistRepository.deleteByUserId(userId);
    }
}
