package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Integer> {
}
