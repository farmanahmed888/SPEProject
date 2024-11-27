package com.hackerrank.interviewer_service.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class ScheduleInterviewDTO {
    private Long enrollId;
    private Date interviewDate;
}
