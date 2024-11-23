package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.Interviewer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewerRepository extends JpaRepository<Interviewer,Integer> {
    Interviewer findByEmail(String email);
}
