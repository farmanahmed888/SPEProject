package com.hackerrank.interviewer_service.DTO;

import lombok.Data;

@Data
public class CountDTO {
    private Integer activeJobs;
    private Integer closedJobs;
    private Integer totalEnrollments;
    private Integer totalInterview;
}
