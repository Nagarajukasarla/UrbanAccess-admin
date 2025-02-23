package com.urban.server.repository;

import com.urban.server.models.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface TokenRepository extends JpaRepository<AuthToken, Long> {
    Optional<AuthToken> findByToken(String token);

    @Query("SELECT t FROM AuthToken t WHERE t.admin.id = :adminId AND t.revoked = false AND t.expiresAt > CURRENT_TIMESTAMP")
    List<AuthToken> findAllValidTokensByAdmin(Long adminId);
}