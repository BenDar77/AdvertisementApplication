package com.example.advert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class AdvertApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdvertApplication.class, args);
	}

}



