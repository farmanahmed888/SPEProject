package com.hackerrank.candidate_service.Service;

import com.hackerrank.candidate_service.DTO.AppliedJobDTO;
import com.hackerrank.candidate_service.DTO.JobApplyDTO;
import com.hackerrank.candidate_service.DTO.updateAppliedJobDTO;

import java.util.List;

public interface CandidateService {
    String login(String email, String password);
    String applyJob(JobApplyDTO jobRequest);
    List<AppliedJobDTO> listOfAppliedJobs(Integer id);
    boolean updateAppliedJob(updateAppliedJobDTO updateAppliedJobDTO);
    boolean updateTestScore(Integer id, String testScore);
}
