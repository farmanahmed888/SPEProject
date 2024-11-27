package com.hackerrank.interviewer_service.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class updateAppliedJobDTO {
    Long cid;
    Long jid;
    Date InterviewDate;
}
