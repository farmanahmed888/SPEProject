package com.hackerrank.candidate_service.Service;

import com.hackerrank.candidate_service.DTO.*;
import com.hackerrank.candidate_service.Entity.Applied;
import com.hackerrank.candidate_service.Entity.Candidate;
import com.hackerrank.candidate_service.Repository.AppliedRepository;
import com.hackerrank.candidate_service.Repository.CandidateRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CandidateServiceImplementation implements CandidateService {
    @Autowired
    CandidateRepository candidateRepository;
    @Autowired
    private AppliedRepository appliedRepository;
    private InterviewerClient InterviewerClient;
    public CandidateServiceImplementation(InterviewerClient interviewerClient) {
        this.InterviewerClient = interviewerClient;
    }
    public String login(String email, String password) {
        Candidate candidate = candidateRepository.findByEmail(email);
        if (candidate != null && candidate.getPassword().equals(password)) {
            return candidate.getId().toString();
        }
        return null;
    }
    public String applyJob(JobApplyDTO jobRequest) {
        try {
            Candidate candidate = candidateRepository.findById(jobRequest.getCid())
                    .orElseThrow(() -> new EntityNotFoundException("Candidate not found with ID: " + jobRequest.getCid()));

            Applied applied = new Applied();
            applied.setCandidate(candidate);
            applied.setJid(jobRequest.getJid());
            applied.setJobName(jobRequest.getCompany_name());
            applied.setAppliedStatus(jobRequest.getApplied_status());
            appliedRepository.save(applied);

            JobEnrollDTO dto = new JobEnrollDTO();
            dto.setCandidateId(candidate.getId().longValue());
            dto.setJobId(jobRequest.getJid().longValue());
            dto.setCandidateName(candidate.getEmail());
            ResponseEntity<String> d = InterviewerClient.enrollInJob(dto);
            return "Success";
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<AppliedJobDTO> listOfAppliedJobs(Integer id) {
        List<Applied> appliedList = appliedRepository.findByCandidateId(id);

        List<AppliedJobDTO> appliedJobDTOList = new ArrayList<>();
        for (Applied applied : appliedList) {
            JobForCandidateMicroserviceDTO d = InterviewerClient.getJob(applied.getJid()).getBody().get();

            appliedJobDTOList.add(new AppliedJobDTO(
                    applied.getId(),
                    applied.getCandidate().getId(),
                    applied.getJid(),
                    applied.getJobName(),
                    d.getRoleType(),
                    d.getJobDescription(),
                    applied.getInterviewDate(),
                    applied.getAppliedStatus()
            ));
        }
        return appliedJobDTOList;
    }

    @Override
    public boolean updateAppliedJob(updateAppliedJobDTO updateAppliedJobDTO) {
        int cid = updateAppliedJobDTO.getCid();
        int jid = updateAppliedJobDTO.getJid();
        Date InterviewDate = updateAppliedJobDTO.getInterviewDate();
        Optional<Applied> appliedOptional = appliedRepository.findByCandidateIdAndAndJid(cid, jid);
        if (appliedOptional.isPresent()) {
            Applied applied = appliedOptional.get();
            applied.setAppliedStatus("Interview Scheduled");
            applied.setInterviewDate(InterviewDate);
            appliedRepository.save(applied);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateTestScore(Integer id, String testScore) {
        Optional<Applied> appliedOptional = appliedRepository.findById(id);
        if (appliedOptional.isPresent()) {
            Applied applied = appliedOptional.get();
            appliedRepository.save(applied);
            return true;
        }
        return false;
    }
}
