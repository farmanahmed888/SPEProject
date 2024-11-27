package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostInterviewRecordDTO {
    private Long jobId;
    private Long candidateId;
    private String positiveFeedback;
    private String negativeFeedback;
    private List<String> fullfilledRequirements;
}
