package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobInfoDTO {
    private Integer id;
    private String company;
    private String jobDescription;
    private String status;
    private Integer noOfEnrollments;
    private String roleType;
    private Integer interviewerId;
    private List<String> requirements;
    private List<QuestionDTO> questions;

}
