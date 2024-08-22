package com.example.advert.data;

import com.example.advert.model.Advert;
import com.github.javafaker.Faker;

import com.example.advert.model.AdvertCategory;

import com.example.advert.repository.AdvertRepository;
import com.example.advert.repository.AdvertCategoryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataGenerator {

    private final AdvertRepository advertRepository;
    private final AdvertCategoryRepository categoryRepository;

    @PostConstruct
    public void generateData(){
        Faker faker = new Faker();

        for (int i = 0; i < 10; i++){
            Advert advert = new Advert();
            advert.setName(faker.job().title());
            advert.setCity(faker.country().capital());
            advert.setDescription(faker.job().keySkills());
            advert.setPrice(faker.number().numberBetween(1000,4000));

            advertRepository.save(advert);
        }

        for (int i = 0; i < 10; i++){
            AdvertCategory category = new AdvertCategory();

            category.setName(faker.job().field());
            category.addAdvert(advertRepository.findAll().get(faker.number().numberBetween(0,9)));
            category.addAdvert(advertRepository.findAll().get(faker.number().numberBetween(0,9)));

            categoryRepository.save(category);
        }


    }

}