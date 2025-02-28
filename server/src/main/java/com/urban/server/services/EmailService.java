package com.urban.server.services;

import org.springframework.http.ResponseEntity;

public interface EmailService {
    Boolean sendOTPMail(String to, String otp);
}
