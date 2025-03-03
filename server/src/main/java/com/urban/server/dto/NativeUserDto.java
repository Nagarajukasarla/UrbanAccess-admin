package com.urban.server.dto;

import com.urban.server.models.Education;
import com.urban.server.models.Route;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NativeUserDto {
    private Long id;
    private String surname;
    private String lastname;
    private String dateOfBirth;
    private String gender;
    private String guardian;
    private String email;
    private String phone;
    private String aadhar;
    private String houseNumber;
    private String street;
    private String area;
    private String district;
    private String city;
    private String state;
    private String country;
    private String pincode;

    // These fields are stored as JSONB in the database.
    // They could be converted to separate DTOs if needed.
    private Route route;
    private Education education;

    private String imageUri;
}

