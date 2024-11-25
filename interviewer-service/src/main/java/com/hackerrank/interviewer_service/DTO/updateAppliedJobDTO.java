package com.hackerrank.interviewer_service.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class updateAppliedJobDTO {
    Integer cid;
    Integer jid;
    Date InterviewDate;
}
