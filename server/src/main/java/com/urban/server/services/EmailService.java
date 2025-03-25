package com.urban.server.services;

public interface EmailService {
    Boolean sendOTPMail(String to, String otp);
}

