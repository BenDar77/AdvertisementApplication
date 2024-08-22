package com.example.advert.controller;

import com.example.advert.dto.request.AdvertRequest;
import com.example.advert.dto.response.AdvertResponse;
import com.example.advert.model.Advert;
import com.example.advert.model.AdvertCategory;
import com.example.advert.service.AdvertService;
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
public class AdvertController {
    private final AdvertService advertService;

    @GetMapping(path = "/advert/{id}")
    public ResponseEntity<AdvertResponse> getAdvert(@PathVariable @Nonnull UUID id) {
        final AdvertResponse advertResponse= advertService.getAdvertById(id);
        return new ResponseEntity<>(advertResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/adverts")
    public ResponseEntity<List<Advert>> findAllAdverts() {
        List<Advert> adverts = advertService.getAllAdverts();
        return ResponseEntity.ok().body(adverts);
    }

    @PostMapping(path = "/advert")
    public ResponseEntity<Advert> createAdvert (@RequestBody AdvertRequest request){
        Advert advert = advertService.createAdvert(request);
        return new ResponseEntity<>(advert, HttpStatus.CREATED);
    }

    @PutMapping(path = "/advert/{id}")
    public ResponseEntity<Advert> updateAdvert (@RequestBody AdvertRequest request,
                                              @PathVariable @Nonnull UUID id){
        Advert advert = advertService.updateAdvert(id, request);
        return new ResponseEntity<>(advert, HttpStatus.OK);
    }

    @DeleteMapping(path = "/advert/{id}")
    public ResponseEntity<?> deleteAdvert(@PathVariable @Nonnull UUID id) {
        advertService.deleteAdvert(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}