package com.urban.server.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    public Long id;
    public boolean isOwner;
    public String email;
    public String firstName;
    public String lastName;
    public String image;
    public String token;

    @Override
    public String toString() {
        return "LoginResponse [id=" + id + "\n"
            + ", isOwner=" + isOwner + "\n"
            + ", email=" + email + "\n"
            + ", name=" + firstName + "\n"
            + ", lastName=" + lastName + "\n"
            + ", image=" + image + "\n"
            + ", token=" + token + "]";
    }
}
