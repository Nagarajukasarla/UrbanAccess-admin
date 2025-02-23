package com.urban.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_auth_token",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_auth_token_token",
                columnNames = "token"
        )
)
public class AuthToken {

    @Id
    @SequenceGenerator(
            name = "_auth_token_id_seq",
            sequenceName = "_auth_token_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "_auth_token_id_seq"
    )
    private Long id;

    @Column(nullable = false, length = 500)
    private String token;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private boolean revoked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "admin_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_auth_token_admin")
    )
    private Admin admin;
}