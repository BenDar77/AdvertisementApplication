package com.example.advert.dto.response;

import com.example.advert.model.Advert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdvertResponse {
    private Advert advert;
    private Set<AdvertCategoryResponse> categories;
}