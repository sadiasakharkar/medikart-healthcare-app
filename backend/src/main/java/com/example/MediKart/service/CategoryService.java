package com.example.MediKart.service;

import com.example.MediKart.model.Category;
import com.example.MediKart.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        Optional<Category> optional = categoryRepository.findById(id);
        return optional.orElse(null);
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = getCategoryById(id);
        if (category != null) {
            category.setName(categoryDetails.getName());
            return categoryRepository.save(category);
        }
        return null;
    }

    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
