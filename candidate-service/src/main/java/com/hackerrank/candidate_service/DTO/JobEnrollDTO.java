package com.hackerrank.candidate_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobEnrollDTO {
    private Long jobId;
    private Long candidateId;
    private String candidateName;
}
