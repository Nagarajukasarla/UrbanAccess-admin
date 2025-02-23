package com.urban.server.implementations;

import com.urban.server.enums.Role;
import lombok.RequiredArgsConstructor;
import com.urban.server.models.Admin;
import com.urban.server.models.AuthToken;
import com.urban.server.repository.AdminRepository;
import com.urban.server.repository.TokenRepository;
import com.urban.server.request.AuthenticationRequest;
import com.urban.server.request.RegisterRequest;
import com.urban.server.response.AuthenticationResponse;
import com.urban.server.services.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    private static final int TOKEN_VALIDITY_DAYS = 1;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var admin = Admin.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();

        var savedAdmin = adminRepository.save(admin);
        String token = generateAndSaveToken(savedAdmin);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow();

        revokeAllAdminTokens(admin);
        String token = generateAndSaveToken(admin);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private String generateAndSaveToken(Admin admin) {
        String tokenValue = UUID.randomUUID().toString();
        Instant now = Instant.now();

        AuthToken token = AuthToken.builder()
                .token(tokenValue)
                .admin(admin)
                .createdAt(now)
                .expiresAt(now.plusSeconds(TOKEN_VALIDITY_DAYS * 86400))
                .revoked(false)
                .build();

        tokenRepository.save(token);
        return tokenValue;
    }

    public void revokeAllAdminTokens(Admin admin) {
        var validAdminTokens = tokenRepository.findAllValidTokensByAdmin(admin.getId());
        if (validAdminTokens.isEmpty()) return;

        validAdminTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validAdminTokens);
    }

    public void revokeToken(String token) {

    }
}