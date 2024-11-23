package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.Enrollment;
import com.hackerrank.interviewer_service.Entity.InterviewRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRecordRepository extends JpaRepository<InterviewRecord,Integer> {
    InterviewRecord findByEnrollment(Enrollment e);
}
