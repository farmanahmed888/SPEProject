package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.Enrollment;
import com.hackerrank.interviewer_service.Entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    Optional<Enrollment> findByCandidateIdAndJobId(Integer candidateId, Integer jobId);
    List<Enrollment>findByRoomId(String room);
    Optional<Enrollment> findById(Integer Enroll);
    List<Enrollment> findByJobId(Integer jobId);
    Enrollment findByAndCandidateNameAndAndRoomId (String candidateId, String roomId);
}
