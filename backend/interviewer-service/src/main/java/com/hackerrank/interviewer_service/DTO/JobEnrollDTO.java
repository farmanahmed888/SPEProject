package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobEnrollDTO {
    private Integer jobId;
    private Integer candidateId;
    private String candidateName;
}