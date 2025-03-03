package com.urban.server.models;

import com.urban.server.enums.PassStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_user_pass")
public class UserPass {

    @Id
    @SequenceGenerator(
            name = "_user_pass_id_seq",
            sequenceName = "_user_pass_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "_user_pass_id_seq"
    )
    private Long id;

    @Column(name = "native_user_id")
    private Long nativeUserId;
    private String mrn;
    private String name;
    private int age;
    private String gender;
    private String phone;
    private String validity;
    private String type;
    private String dob;

    @Enumerated(EnumType.STRING)
    private PassStatus status;

    @Column(name = "division_id")
    private String divisionId;

    @Column(name = "admin_id")
    private String adminId;

    @Column(name = "processed_at")
    private String processedAt;

    @Override
    public String toString() {
        return "UserPass{" +
                "id=" + id +
                ", mrn='" + mrn + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", phone='" + phone + '\'' +
                ", validity='" + validity + '\'' +
                ", type='" + type + '\'' +
                ", dob='" + dob + '\'' +
                ", status=" + status +
                ", divisionId='" + divisionId + '\'' +
                ", adminId='" + adminId + '\'' +
                ", processedAt='" + processedAt + '\'' +
                '}';
    }
}
