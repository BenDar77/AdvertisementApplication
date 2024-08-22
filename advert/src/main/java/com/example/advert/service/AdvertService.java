package com.example.advert.service;


import com.example.advert.dto.request.AdvertRequest;
import com.example.advert.dto.response.AdvertResponse;
import com.example.advert.dto.response.AdvertCategoryResponse;
import com.example.advert.model.Advert;
import com.example.advert.model.AdvertCategory;
import com.example.advert.repository.AdvertRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdvertService {
    private final AdvertRepository advertRepository;


    public Advert createAdvert (AdvertRequest advertRequest){
        if(advertRepository.findByName(advertRequest.getName()).isPresent()){
            throw new EntityExistsException("advert with this Name already exists");
        }
        Advert advert = Advert.builder()
                .name(advertRequest.getName())
                .description(advertRequest.getDescription())
                .price(advertRequest.getPrice())
                .city(advertRequest.getCity())
                .build();
        advertRepository.save(advert);
        return advert;
    }

    public void deleteAdvert (UUID id){
        if (advertRepository.existsById(id)) {
            List<AdvertCategory> list = getAdvertsCategories(id);
            list.stream().forEach(cat -> cat.removeAdvert(advertRepository.getReferenceById(id)));
            advertRepository.deleteById(id);
            log.info("{}: Deleted advert from the database with ID: {}", this.getClass().getName(), id);
        } else {
            throw new EntityNotFoundException("Advert was not found with ID: " + id);
        }
    }

    public Advert updateAdvert (UUID id, AdvertRequest request){
        Advert advertToUpdate = advertRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Advert not found with id: " + id)
        );
        advertToUpdate.setName(request.getName());
        advertToUpdate.setPrice(request.getPrice());
        advertToUpdate.setCity(request.getCity());
        advertToUpdate.setDescription(request.getDescription());
        advertRepository.save(advertToUpdate);
        return advertToUpdate;
    }

    public AdvertResponse getAdvertById(UUID id){
        Advert advert =  advertRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Advert not found with id: " + id));
        log.debug("Fetched advert {} from database", advert.getId());
        Set<AdvertCategoryResponse> set = getAdvertsCategories(id)
                .stream()
                .map(o-> new AdvertCategoryResponse(o.getId(),o.getName()))
                .collect(Collectors.toSet());
        return AdvertResponse.builder()
                .advert(advert)
                .categories(set)
                .build();
    }

    public List<Advert> getAllAdverts() {
        return advertRepository.findAll();
    }



    public List<AdvertCategory> getAdvertsCategories (UUID AdvertId){
        return advertRepository.findAdvertsCategories(AdvertId);
    }
}