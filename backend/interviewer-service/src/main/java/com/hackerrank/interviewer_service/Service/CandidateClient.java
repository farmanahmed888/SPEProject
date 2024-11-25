package com.hackerrank.interviewer_service.Service;

import com.hackerrank.interviewer_service.DTO.AppliedJobDTO;
import com.hackerrank.interviewer_service.DTO.updateAppliedJobDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "candidateMicroservice")
public interface CandidateClient {
    @GetMapping("/appliedJobs/{id}")
    ResponseEntity<List<AppliedJobDTO>> listOfAppliedJobs(@PathVariable Integer id);
    @PostMapping("/candidate/update-applied")
    ResponseEntity<String> updateAppliedJob(@RequestBody updateAppliedJobDTO updateAppliedJobDTO);

}
