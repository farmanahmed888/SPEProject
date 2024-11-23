package com.hackerrank.interviewer_service.Service;

import com.hackerrank.interviewer_service.DTO.*;
import com.hackerrank.interviewer_service.Entity.*;
import com.hackerrank.interviewer_service.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
@Service
public class InterviewServiceImp implements InterviewerService{
    private CandidateClient candidateClient;
    public void InterviewerServiceImpl(CandidateClient candidateClient) {
        this.candidateClient = candidateClient;
    }

    @Autowired
    InterviewerRepository interviewerRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    AllRequirementRepository allRequirementsRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    private InterviewRecordRepository interviewRecordRepository;

    private String generateString() {
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            if (i > 0 && i % 4 == 0) {
                stringBuilder.append("-");
            }
            // generate a random character
            char randomChar = (char) ('a' + Math.random() * ('z' - 'a' + 1));
            stringBuilder.append(randomChar);
        }

        return stringBuilder.toString();
    }

    public boolean candidateCodeEditorCheck(CandidateCheckDTO CandidateCheckDTO){
        Enrollment enroll = enrollmentRepository.findByAndCandidateNameAndAndRoomId(CandidateCheckDTO.getCandidateName(),CandidateCheckDTO.getRoomId());
        return enroll != null;
    }

    public boolean interviewerCodeEditorCheck(String email){
        Interviewer interviewer = interviewerRepository.findByEmail(email);
        return interviewer != null;
    }

    public String login(String email, String password) {
        Interviewer candidate = interviewerRepository.findByEmail(email);
        if (candidate != null && candidate.getPassword().equals(password)) {
            return candidate.getId().toString();
        }
        return null;
    }
    @Override
    public Integer activeJobsCount(Integer id){
        return jobRepository.countAllByInterviewerId(id);
    }
    @Override
    public List<Job> allactiveJobsCount(){
        return jobRepository.findAllByStatus("open");
    }

    @Override
    public String createJob(JobPostingDTO jobPostingRequest) {
        Job job = new Job();
        job.setCompany(jobPostingRequest.getCompany());
        job.setContact(jobPostingRequest.getContact());
        job.setJobDescription(jobPostingRequest.getJobDescription());
        job.setStatus(jobPostingRequest.getStatus());
        job.setRoleType(jobPostingRequest.getRoleType());
        Optional<Interviewer> interviewerOptional = interviewerRepository.findById(jobPostingRequest.getInterviewerId());
        if (interviewerOptional.isPresent()) {
            job.setInterviewer(interviewerOptional.get());

            Set<AllRequirements> allRequirements = new HashSet<>();
            for (String requirementName : jobPostingRequest.getRequirements()) {
                Optional<AllRequirements> requirementOptional = allRequirementsRepository.findByRequirementName(requirementName);
                requirementOptional.ifPresent(allRequirements::add);
            }
            job.setAllRequirements(allRequirements);

            jobRepository.save(job);
            return "Job created successfully";
        } else {
            return "Interviewer not found for the given ID";
        }
    }

    private JobInfoDTO mapJobToJobInfoDTO(Job job) {
        List<String> requirements = job.getAllRequirements().stream()
                .map(AllRequirements::getRequirementName)
                .collect(Collectors.toList());

        List<QuestionDTO> questions = job.getQuestions().stream()
                .map(this::mapQuestionToQuestionDTO)
                .collect(Collectors.toList());
        return new JobInfoDTO(
                job.getId(),
                job.getCompany(),
                job.getJobDescription(),
                job.getStatus(),
                job.getNoOfEnrollments(),
                job.getRoleType(),
                job.getInterviewer().getId(),
                requirements,
                questions
        );
    }

    private QuestionDTO mapQuestionToQuestionDTO(Question question) {
        return new QuestionDTO(
                question.getId(),
                question.getQuestion(),
                question.getTopic(),
                question.getQuestionName(),
                question.getTestcases()
        );
    }

    @Override
    public List<JobInfoDTO> getJobs(Integer id) {
        List<Job> jobs = jobRepository.findByInterviewerId(id);
        return jobs.stream()
                .filter(job -> job.getStatus().equals("open"))
                .map(this::mapJobToJobInfoDTO)
                .collect(Collectors.toList());

    }
    @Override
    public List<JobInfoDTO> getClosedJobs(Integer id) {
        List<Job> jobs = jobRepository.findByInterviewerId(id);
        return jobs.stream()
                .filter(job -> job.getStatus().equals("Closed"))
                .map(this::mapJobToJobInfoDTO)
                .collect(Collectors.toList());

    }

    private JobEnrollmentInfoDTO mapToJobEnrollmentInfoDTO(Enrollment enrollment) {
        JobEnrollmentInfoDTO jobEnrollmentInfoDTO = new JobEnrollmentInfoDTO();
        jobEnrollmentInfoDTO.setCandidateId(enrollment.getCandidateId());
        jobEnrollmentInfoDTO.setCandidateName(enrollment.getCandidateName());
        jobEnrollmentInfoDTO.setInterviewDate(enrollment.getInterviewDate());
        jobEnrollmentInfoDTO.setRoomId(enrollment.getRoomId());
        jobEnrollmentInfoDTO.setEnrollId(enrollment.getId());
        return jobEnrollmentInfoDTO;
    }

    @Override
    public List<JobEnrollmentInfoDTO> getJobEnrollments(Integer jobId) {
        List<Enrollment> enrollments = enrollmentRepository.findByJobId(jobId);
        List<JobEnrollmentInfoDTO> jobEnrollmentInfoDTOs = new ArrayList<>();

        for (Enrollment enrollment : enrollments) {
            JobEnrollmentInfoDTO dto = mapToJobEnrollmentInfoDTO(enrollment);
            if(interviewRecordRepository.findByEnrollment(enrollment)!=null){
                dto.setResultStatus(true);
            }
            jobEnrollmentInfoDTOs.add(dto);
        }
        return jobEnrollmentInfoDTOs;
    }
    @Override
    public InterviewRecord checkResults(Integer enrollId){
        Optional<Enrollment> enroll = enrollmentRepository.findById(enrollId);
        return(interviewRecordRepository.findByEnrollment(enroll.get()));
    }
    @Override
    public void scheduleInterview(ScheduleInterviewDTO dto) {
        Optional<Enrollment> enrollment = enrollmentRepository.findById(dto.getEnrollId());
        Enrollment enrollmentDate = enrollment.get();
        enrollmentDate.setInterviewDate(dto.getInterviewDate());
        enrollmentDate.setRoomId(generateString());
        enrollmentRepository.save(enrollmentDate);

        updateAppliedJobDTO updateAppliedJobDTO = new updateAppliedJobDTO();
        updateAppliedJobDTO.setCandidateId(enrollmentDate.getCandidateId());
        updateAppliedJobDTO.setJobId(enrollmentDate.getJob().getId());
        updateAppliedJobDTO.setInterviewDate(dto.getInterviewDate());
        candidateClient.updateAppliedJob(updateAppliedJobDTO);
    }
    public CountDTO counter(Integer InterviewerId){
        CountDTO dto = new CountDTO();
        dto.setActiveJobs(jobRepository.findAllByStatus("open").size());
        dto.setClosedJobs(jobRepository.findAllByStatus("closed").size());

        return dto;
    }
    @Override
    public boolean enrollInJob(JobEnrollDTO jobEnrollRequest) {
        try {
            Optional<Job> optionalJob = jobRepository.findById(jobEnrollRequest.getJobId());
            if (optionalJob.isPresent()) {
                Job job = optionalJob.get();
                job.setNoOfEnrollments(job.getNoOfEnrollments()+1);
                jobRepository.save(job);
                Enrollment enrollment = new Enrollment();
                enrollment.setCandidateId(jobEnrollRequest.getCandidateId());
                enrollment.setJob(job);
                enrollment.setCandidateName(jobEnrollRequest.getCandidateName());
                enrollmentRepository.save(enrollment);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateTestScore(UpdateTestScoreDTO updateTestScoreRequest) {
        try {
            Optional<Enrollment> optionalEnrollment = enrollmentRepository.findByCandidateIdAndJobId(
                    updateTestScoreRequest.getCandidateId(),
                    updateTestScoreRequest.getJobId());

            if (optionalEnrollment.isPresent()) {
                Enrollment enrollment = optionalEnrollment.get();
                enrollmentRepository.save(enrollment);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
    @Override
    public Optional<JobForCandidateMicroserviceDTO> getJob(Integer id) {
        Optional<Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            Job presentJob = job.get();
            JobForCandidateMicroserviceDTO jobdto = new JobForCandidateMicroserviceDTO();
            jobdto.setJobDescription(presentJob.getJobDescription());
            Set<AllRequirements> requirements = presentJob.getAllRequirements();
            List<String> req = new ArrayList<>();
            for (AllRequirements it : requirements) {
                req.add(it.getRequirementName());
            }
            jobdto.setRequirements(req);
            jobdto.setRoleType(presentJob.getRoleType());

            return Optional.of(jobdto);
        } else {
            return Optional.empty();
        }
    }
    @Override
    public void interviewResult(InterviewRecordInfoDTO dto){
        List<Enrollment> enroll = enrollmentRepository.findByRoomId(dto.getRoomId());
        if(enroll!=null && enroll.size()==1){
            InterviewRecord result = new InterviewRecord();
            result.setCandidateId(enroll.get(0).getCandidateId());
            result.setEnrollment(enroll.get(0));
            result.setPositiveFeedback(dto.getPositiveFeedback());
            result.setNegativeFeedback(dto.getNegativeFeedback());
            interviewRecordRepository.save(result);
        }
    }
    @Override
    public void closeJob(Integer jobId){
        Job job = jobRepository.findById(jobId).get();
        job.setStatus("Closed");
        jobRepository.save(job);

    }
}
