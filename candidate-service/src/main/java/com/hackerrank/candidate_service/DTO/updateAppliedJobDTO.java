package com.hackerrank.candidate_service.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class updateAppliedJobDTO {
    Integer cid;
    Integer jid;
    Date InterviewDate;
}
