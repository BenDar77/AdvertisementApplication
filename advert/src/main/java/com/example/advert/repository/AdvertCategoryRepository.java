package com.example.advert.repository;

import com.example.advert.model.AdvertCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdvertCategoryRepository extends JpaRepository<AdvertCategory, UUID> {
    Optional<AdvertCategory> findByName (String name);

}