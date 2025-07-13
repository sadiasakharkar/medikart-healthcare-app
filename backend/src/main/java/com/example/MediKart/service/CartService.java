package com.example.MediKart.service;

import com.example.MediKart.model.CartItem;
import java.util.List;
import java.util.Map;

/**
 * CartService defines the core operations for managing a user's shopping cart.
 */
public interface CartService {

    /**
     * Adds a product to the user's cart.
     *
     * @param userId    ID of the user
     * @param productId ID of the product
     * @param quantity  Quantity to add
     * @return The created CartItem
     */
    CartItem addToCart(Long userId, Long productId, int quantity);

    /**
     * Retrieves all items in a user's cart.
     *
     * @param userId ID of the user
     * @return List of CartItems
     */
    List<CartItem> getCartItems(Long userId);

    /**
     * Updates the quantity of a specific cart item.
     *
     * @param cartItemId ID of the cart item
     * @param quantity   New quantity
     */
    void updateQuantity(Long cartItemId, int quantity);

    /**
     * Removes a specific item from the user's cart.
     *
     * @param cartItemId ID of the cart item to remove
     */
    void removeFromCart(Long cartItemId);

    /**
     * Clears all items from the user's cart.
     *
     * @param userId ID of the user
     */
    void clearCart(Long userId);

    /**
     * Moves all items from the user's wishlist to their cart.
     *
     * @param userId ID of the user
     */
    // void moveWishlistToCart(Long userId);

    /**
     * Returns a summary of the user's cart (total items, total cost).
     *
     * @param userId ID of the user
     * @return Map containing summary details
     */
    Map<String, Double> getCartSummary(Long userId);
}