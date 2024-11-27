package com.hackerrank.interviewer_service.Repository;

import com.hackerrank.interviewer_service.Entity.AllRequirements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AllRequirementRepository extends JpaRepository<AllRequirements, Long> {
    Optional<AllRequirements> findByRequirementName(String requirementName);
}
