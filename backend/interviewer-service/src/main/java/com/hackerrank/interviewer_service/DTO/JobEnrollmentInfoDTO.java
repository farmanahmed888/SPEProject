package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobEnrollmentInfoDTO {
    private Long enrollId;
    private Long candidateId;
    private String candidateName;
    private String testScore;
    private Date interviewDate;
    private boolean resultStatus;
    private String roomId;
}
