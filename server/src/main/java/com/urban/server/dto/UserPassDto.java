package com.urban.server.dto;

import com.urban.server.enums.PassStatus;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPassDto {
    private Long id;

    // For simplicity, we only store the NativeUser's id here.
    private Long nativeUserId;

    private String mrn;
    private String name;
    private int age;
    private String gender;
    private String phone;
    private String validity;
    private String type;
    private String dob;
    private PassStatus status;
    private String divisionId;
    private String adminId;
    private String processedAt;
}
