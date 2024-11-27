package com.hackerrank.interviewer_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackerrank.interviewer_service.Entity.Job;

import java.util.List;


public interface JobRepository  extends JpaRepository<Job, Long> {
    List<Job> findByInterviewerId(int id);
    int countAllByInterviewerId(int interviewer);
    List<Job> findAllByStatus(String status);
}