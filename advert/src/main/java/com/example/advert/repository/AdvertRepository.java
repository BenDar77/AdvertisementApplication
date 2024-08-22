package com.example.advert.repository;

import com.example.advert.model.Advert;
import com.example.advert.model.AdvertCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdvertRepository extends JpaRepository<Advert, UUID> {

    Page<Advert> findByNameContainingIgnoreCase(PageRequest pageRequest, String contains);
    Optional<Advert> findByName (String name);

    @Query("SELECT c FROM AdvertCategory c JOIN c.adverts b WHERE b.id = ?1")
    List<AdvertCategory> findAdvertsCategories(UUID bookId);



}