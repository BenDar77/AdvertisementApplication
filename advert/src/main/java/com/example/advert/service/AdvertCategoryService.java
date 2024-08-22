package com.example.advert.service;

import com.example.advert.dto.request.AdvertCategoryRequest;
import com.example.advert.model.Advert;
import com.example.advert.model.AdvertCategory;
import com.example.advert.repository.AdvertRepository;
import com.example.advert.repository.AdvertCategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdvertCategoryService {

    private final AdvertCategoryRepository categoryRepository;
    private final AdvertRepository advertRepository;

    public AdvertCategory createCategory(AdvertCategoryRequest categoryRequest) {
        if (categoryRepository.findByName(categoryRequest.getName()).isPresent()) {
            throw new RuntimeException("category already exists");
        }
        AdvertCategory category = AdvertCategory.builder()
                .name(categoryRequest.getName())
                .build();
        categoryRepository.save(category);
        return category;
    }

    public AdvertCategory getCategoryById(UUID id) {
        AdvertCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("category not found"));
        log.debug("Fetched category {} from database", category.getId());
        return category;
    }

    public void deleteCategory(UUID id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            log.info("{}: Deleted category from the database with ID: {}", this.getClass().getName(), id);
        } else {
            throw new EntityNotFoundException("Category was not found with ID: " + id);
        }
    }

    public List<AdvertCategory> getCategories() {
        return categoryRepository.findAll();
    }

    public AdvertCategory changeCategoryName(UUID id, String newName) {
        AdvertCategory category = getCategoryById(id);
        category.setName(newName);
        return categoryRepository.save(category);
    }

    public void addAdvertToCategory(UUID categoryId, UUID advertId) {
        AdvertCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        Advert advert = advertRepository.findById(advertId)
                .orElseThrow(() -> new EntityNotFoundException("Advert not found"));
        category.addAdvert(advert);
        categoryRepository.save(category);
    }

    public void removeAdvertFromCategory(UUID categoryId, UUID advertId) {
        AdvertCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        Advert advert = advertRepository.findById(advertId)
                .orElseThrow(() -> new EntityNotFoundException("Advert not found"));
        category.removeAdvert(advert);
        categoryRepository.save(category);
    }

}