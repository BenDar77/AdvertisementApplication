package com.example.advert.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class AdvertCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;

    @ManyToMany
    @JoinTable(
            name = "categorised_adverts",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn (name = "advert_id"))
    private Set<Advert> adverts = new HashSet<>();

    public void addAdvert(Advert advert){
        adverts.add(advert);
    }

    public void removeAdvert(Advert advert){
        adverts.remove(advert);
    }

}