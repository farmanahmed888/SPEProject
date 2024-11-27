package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTestScoreDTO {
    private Long jobId;
    private Long candidateId;
    private String TestScore;
}
