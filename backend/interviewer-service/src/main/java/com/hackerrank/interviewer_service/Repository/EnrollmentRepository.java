package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.Enrollment;
import com.hackerrank.interviewer_service.Entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByCandidateIdAndJobId(Long candidateId, Long jobId);
    List<Enrollment>findByRoomId(String room);
    Optional<Enrollment> findById(Long Enroll);
    List<Enrollment> findByJobId(Long jobId);
    Enrollment findByAndCandidateNameAndAndRoomId (String cid, String roomId);
}
