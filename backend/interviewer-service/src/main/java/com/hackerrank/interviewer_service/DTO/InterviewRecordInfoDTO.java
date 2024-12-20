package com.hackerrank.interviewer_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewRecordInfoDTO {
    private String candidateName;
    private String roomId;
    private String positiveFeedback;
    private String negativeFeedback;
}
