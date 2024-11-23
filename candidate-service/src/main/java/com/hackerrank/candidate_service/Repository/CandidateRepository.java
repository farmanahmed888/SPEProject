package com.hackerrank.candidate_service.Repository;
import com.hackerrank.candidate_service.Entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Candidate findByEmail(String email);
}
