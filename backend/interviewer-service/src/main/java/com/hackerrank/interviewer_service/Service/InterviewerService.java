package com.hackerrank.interviewer_service.Service;

import com.hackerrank.interviewer_service.DTO.*;
import com.hackerrank.interviewer_service.Entity.InterviewRecord;
import com.hackerrank.interviewer_service.Entity.Job;

import java.util.List;
import java.util.Optional;

public interface InterviewerService {
    String login(String email, String password);
    Integer activeJobsCount(Integer id);
    List<JobInfoDTO> getClosedJobs(Integer id);
    List<Job> allactiveJobsCount();
    String createJob(JobPostingDTO jobPostingRequest);

    List<JobInfoDTO> getJobs(Integer id);

    List<JobEnrollmentInfoDTO> getJobEnrollments(Integer jobId);
    void scheduleInterview(ScheduleInterviewDTO dto);
    CountDTO counter(Integer id);
    void interviewResult(InterviewRecordInfoDTO dto);
    boolean enrollInJob(JobEnrollDTO jobEnrollRequest);
    void closeJob(Integer jobId);
    boolean updateTestScore(UpdateTestScoreDTO updateTestScoreRequest);
    Optional<JobForCandidateMicroserviceDTO> getJob(Integer id);
    boolean candidateCodeEditorCheck(CandidateCheckDTO CandidateCheckDTO);
    boolean interviewerCodeEditorCheck(String interviewerEmail);
    InterviewRecord checkResults(Integer enrollId);
}
