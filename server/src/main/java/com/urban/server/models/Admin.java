package com.urban.server.models;

import com.urban.server.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "_admin")
public class Admin implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Remove sequence generator
    private Long id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "email", length = 256, nullable = false)
    private String email;

    @Column(name = "password", length = 256, nullable = false)
    private String password;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "image")
    private String image;

    @Enumerated(EnumType.STRING)
    Role role; // isOwner can be more specific by using Role enum

    @Column(name = "is_email_verified")
    private Boolean isEmailVerified;

    @Column(name = "division_id")
    private Long divisionId;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<AuthToken> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
