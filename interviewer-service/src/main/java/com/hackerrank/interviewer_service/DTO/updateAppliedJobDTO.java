package com.hackerrank.interviewer_service.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class updateAppliedJobDTO {
    Integer candidateId;
    Integer jobId;
    Date InterviewDate;
}
