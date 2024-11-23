package com.hackerrank.candidate_service.Repository;

import com.hackerrank.candidate_service.Entity.Applied;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppliedRepository extends JpaRepository<Applied, Integer> {
    List<Applied> findByCandidateId(Integer id);
    Optional<Applied> findByCandidateIdAndAndJid(int cid, int jid);
}
