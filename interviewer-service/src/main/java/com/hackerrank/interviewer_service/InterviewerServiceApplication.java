package com.hackerrank.interviewer_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class InterviewerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewerServiceApplication.class, args);
	}

}
