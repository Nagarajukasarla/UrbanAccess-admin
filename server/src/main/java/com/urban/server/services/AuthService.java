package com.urban.server.services;

import com.urban.server.request.AuthenticationRequest;
import com.urban.server.request.OTPVerificationRequest;
import com.urban.server.request.RegisterRequest;
import com.urban.server.response.AuthenticationResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<AuthenticationResponse> register(RegisterRequest request);
    ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request);
    ResponseEntity<AuthenticationResponse> verifyOtp(OTPVerificationRequest request);
}
