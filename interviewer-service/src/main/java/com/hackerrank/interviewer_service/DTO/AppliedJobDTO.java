package com.hackerrank.interviewer_service.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppliedJobDTO {
    private Integer id;
    private Integer candidateId;
    private Integer jobId;
    private String jobName;
    private String testScore;
    private String appliedStatus = "pending";
}
