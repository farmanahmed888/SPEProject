package com.hackerrank.candidate_service.Controller;

import com.hackerrank.candidate_service.DTO.*;
import com.hackerrank.candidate_service.Service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/candidate")
public class CandidateController {
    @Autowired
    private CandidateService candidateService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        String token = candidateService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User is Unauthorized");
        }
    }
    @PostMapping("/apply")
    public ResponseEntity<String> login(@RequestBody JobApplyDTO jobRequest) {
        System.out.println(jobRequest);
        String token = candidateService.applyJob(jobRequest);
        if (token != null) {
            return ResponseEntity.ok("Job application successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to apply for the job");
        }
    }
    @PostMapping("/update-applied")
    public ResponseEntity<String> updateAppliedJob(@RequestBody updateAppliedJobDTO updateAppliedJobDTO) {
        boolean updated = candidateService.updateAppliedJob(updateAppliedJobDTO);
        if (updated) {
            return ResponseEntity.ok("Applied status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update applied status.");
        }
    }
    @GetMapping("/appliedJobs/{id}")
    public ResponseEntity<List<AppliedJobDTO>> listOfAppliedJobs(@PathVariable Integer id) {
        List<AppliedJobDTO> jobs = candidateService.listOfAppliedJobs(id);
        if (jobs != null) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PatchMapping("/updateTestScore/{id}")
    public ResponseEntity<String> updateTestScore(@PathVariable Integer id, @RequestBody UpdateTestScoreDTO request) {
        boolean updated = candidateService.updateTestScore(id, request.getTestScore());
        if (updated) {
            return ResponseEntity.ok("Test score updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update test score.");
        }
    }
}
