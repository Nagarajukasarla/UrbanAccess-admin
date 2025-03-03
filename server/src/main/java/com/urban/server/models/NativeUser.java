package com.urban.server.models;

import com.urban.server.converter.EducationJsonConverter;
import com.urban.server.converter.RouteJsonConverter;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_native_user")
public class NativeUser {

    @Id
    @SequenceGenerator(
            name = "_native_user_id_seq",
            sequenceName = "_native_user_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "_native_user_id_seq"
    )
    private Long id;

    private String surname;
    private String lastname;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    private String gender;
    private String guardian;
    private String email;
    private String phone;
    private String aadhar;

    @Column(name = "house_number")
    private String houseNumber;

    private String street;
    private String area;
    private String district;
    private String city;
    private String state;
    private String country;
    private String pincode;

    // Use converters to persist as JSONB
    @Convert(converter = RouteJsonConverter.class)
    @Column(columnDefinition = "jsonb")
    private Route route;

    @Convert(converter = EducationJsonConverter.class)
    @Column(columnDefinition = "jsonb")
    private Education education;

    @Column(name = "image_uri")
    private String imageUri;

    @Override
    public String toString() {
        return "NativeUser{" +
                "id=" + id +
                ", surname='" + surname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", gender='" + gender + '\'' +
                ", guardian='" + guardian + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", aadhar='" + aadhar + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                ", street='" + street + '\'' +
                ", area='" + area + '\'' +
                ", district='" + district + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", pincode='" + pincode + '\'' +
                ", route=" + route +
                ", education=" + education +
                ", imageUri='" + imageUri + '\'' +
                '}';
    }
}
