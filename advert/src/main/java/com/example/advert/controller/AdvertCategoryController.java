package com.example.advert.controller;

import com.example.advert.dto.request.AdvertCategoryRequest;
import com.example.advert.model.AdvertCategory;
import com.example.advert.service.AdvertCategoryService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdvertCategoryController {
    private final AdvertCategoryService categoryService;

    @GetMapping(path = "/category/{id}")
    public ResponseEntity<AdvertCategory> getAdvert(@PathVariable @Nonnull UUID id) {
        final AdvertCategory category = categoryService.getCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping(path = "/categories")
    public ResponseEntity<List<AdvertCategory>> getAllCategories() {
        final List<AdvertCategory> categories = categoryService.getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping(path = "/category")
    public ResponseEntity<AdvertCategory> createCategory(@RequestBody AdvertCategoryRequest request) {
        AdvertCategory category = categoryService.createCategory(request);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PatchMapping(path = "/category/{id}")
    public ResponseEntity<AdvertCategory> updateCategory(@RequestBody AdvertCategoryRequest request,
                                                         @PathVariable @Nonnull UUID id) {
        AdvertCategory category = categoryService.changeCategoryName(id, request.getName());
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping(path = "/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable @Nonnull UUID id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(path = "/category/{categoryId}/advert/{advertId}")
    public ResponseEntity<?> addAdvertToCategory (@PathVariable UUID categoryId,
                                                @PathVariable UUID advertId){
        categoryService.addAdvertToCategory(categoryId, advertId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path = "/category/{categoryId}/advert/{advertId}")
    public ResponseEntity<?> removeAdvertFromCategory (@PathVariable UUID categoryId,
                                                     @PathVariable UUID advertId){
        categoryService.removeAdvertFromCategory(categoryId, advertId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}