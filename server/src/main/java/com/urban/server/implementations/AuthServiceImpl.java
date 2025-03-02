package com.urban.server.implementations;

import com.urban.server.enums.Role;
import com.urban.server.models.Admin;
import com.urban.server.models.AuthToken;
import com.urban.server.models.OTP;
import com.urban.server.procedure.OTPVerificationProcedure;
import com.urban.server.repository.AdminRepository;
import com.urban.server.repository.OTPRepository;
import com.urban.server.repository.TokenRepository;
import com.urban.server.request.AuthenticationRequest;
import com.urban.server.request.OTPVerificationRequest;
import com.urban.server.request.RegisterRequest;
import com.urban.server.response.AuthenticationResponse;
import com.urban.server.response.LoginResponse;
import com.urban.server.services.AuthService;
import com.urban.server.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final OTPRepository otpRepository;
    private final OTPVerificationProcedure otpVerificationProcedure;
    private final EmailService emailService;
    private static final Logger logger = Logger.getLogger(AuthServiceImpl.class.getName());

    private static final int TOKEN_VALIDITY_DAYS = 1;

    @Override
    public ResponseEntity<?> register(RegisterRequest request) {
        try {
            var admin = Admin.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.ADMIN)
                    .build();

            var savedAdmin = adminRepository.save(admin);
            String token = generateAndSaveToken(savedAdmin);

            // OTP generation
            var otp = generateOTP(request.getEmail());
            if (otp.getOtp() != null) {
                // Sending the otp to email
                if (emailService.sendOTPMail(request.getEmail(), otp.getOtp())) {
                    return ResponseEntity.ok(
                            AuthenticationResponse.builder()
                                    .token(token)
                                    .build()
                    );
                }
            }

            return ResponseEntity.badRequest().build();

        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                if (e.getCause().getMessage().contains("duplicate key")) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Email Already Exist");
                }
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Bad Request");
        } catch (Exception e) {
            logger.warning(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<?> authenticate(AuthenticationRequest request) {
        try {
            var adminOptional = adminRepository.findByEmail(request.getEmail());
            if (adminOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
            }

            var admin = adminOptional.get();

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            revokeAllAdminTokens(admin);
            String token = generateAndSaveToken(admin);
            return ResponseEntity.ok(
                    LoginResponse.builder()
                            .id(admin.getId())
                            .image(admin.getImage())
                            .isOwner(admin.getRole() == Role.ADMIN)
                            .firstName(admin.getFirstname())
                            .lastName(admin.getLastname())
                            .email(admin.getEmail())
                            .token(token)
                            .build()
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<?> verifyOtp(OTPVerificationRequest request) {
        return otpVerificationProcedure.verifyOtp(request);
    }

    @Override
    public ResponseEntity<String> logout(Long userId) {
        try {
            var userOptional = adminRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
            }
            var admin = userOptional.get();
            revokeAllAdminTokens(admin);
            return ResponseEntity.ok("User Logged Out");
        } catch (Exception e) {
            logger.warning(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    private void revokeAllAdminTokens(Admin admin) {
        var validAdminTokens = tokenRepository.findAllValidTokensByAdmin(admin.getId());
        if (validAdminTokens.isEmpty()) return;

        validAdminTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validAdminTokens);
    }

    private OTP generateOTP(String email) {
        // Generate a 4-digit OTP
        String newOtp = String.format("%04d", (int)(Math.random() * 10000));
        var otp = OTP.builder()
                .email(email)
                .otp(newOtp)
                .build();
        return otpRepository.save(otp);
    }

    private String generateAndSaveToken(Admin admin) {
        var tokenValue = UUID.randomUUID().toString();
        Instant now = Instant.now();

        var token = AuthToken.builder()
                .token(tokenValue)
                .admin(admin)
                .createdAt(now)
                .expiresAt(now.plusSeconds(TOKEN_VALIDITY_DAYS * 86400))
                .revoked(false)
                .build();

        tokenRepository.save(token);
        return tokenValue;
    }

}