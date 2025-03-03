package com.urban.server.models;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    private String degree;
    private String institution;
    private int yearOfPassing;

    @Override
    public String toString() {
        return "[degree=" + degree + ", institution=" + institution + ", yearOfPassing=" + yearOfPassing + "]";
    }

}
