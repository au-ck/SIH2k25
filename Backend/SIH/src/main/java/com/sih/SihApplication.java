package com.sih;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SihApplication {

	public static void main(String[] args) {
		SpringApplication.run(SihApplication.class, args);
		System.out.println("Backend is running");
	}

}
