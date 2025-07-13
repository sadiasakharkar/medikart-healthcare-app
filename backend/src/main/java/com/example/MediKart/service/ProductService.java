package com.example.MediKart.service;

import com.example.MediKart.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product addProduct(Product product);

    Product updateProduct(Long id, Product updatedProduct);

    Product getProductById(Long id);

    void deleteProduct(Long id);
}
