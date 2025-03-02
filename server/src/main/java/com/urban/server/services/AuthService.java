package com.urban.server.services;

import com.urban.server.request.AuthenticationRequest;
import com.urban.server.request.OTPVerificationRequest;
import com.urban.server.request.RegisterRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> register(RegisterRequest request);
    ResponseEntity<?> authenticate(AuthenticationRequest request);
    ResponseEntity<?> verifyOtp(OTPVerificationRequest request);
    ResponseEntity<String> logout(Long userId);
}
