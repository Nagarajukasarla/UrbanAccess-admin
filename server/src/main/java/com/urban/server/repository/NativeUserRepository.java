package com.urban.server.repository;

import com.urban.server.models.NativeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface NativeUserRepository extends JpaRepository<NativeUser, Long> {
    Optional<NativeUser> findByEmail(String email);
}
