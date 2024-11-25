package com.hackerrank.interviewer_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackerrank.interviewer_service.Entity.Job;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Integer> {
    List<Job> findByInterviewerId(Integer id);
    Integer countAllByInterviewerId(Integer interviewer);
    List<Job> findAllByStatus(String status);
}
