package com.hackerrank.candidate_service.Service;

import com.hackerrank.candidate_service.DTO.JobEnrollDTO;
import com.hackerrank.candidate_service.DTO.JobForCandidateMicroserviceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@FeignClient(name = "interviewer-service")
public interface InterviewerClient {
    @GetMapping("/interviewer/job/{id}")
    public ResponseEntity<Optional<JobForCandidateMicroserviceDTO>> getJob(@PathVariable int id);
    @PostMapping("/interviewer/job/enroll")
    ResponseEntity<String> enrollInJob(@RequestBody JobEnrollDTO jobEnrollRequest);
}
